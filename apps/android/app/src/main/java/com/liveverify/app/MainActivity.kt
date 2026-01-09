/*
    Copyright (C) 2025, Paul Hammant

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

package com.liveverify.app

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageCapture
import androidx.camera.core.ImageCaptureException
import androidx.camera.core.ImageProxy
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import com.liveverify.app.databinding.ActivityMainBinding
import kotlinx.coroutines.launch
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private var imageCapture: ImageCapture? = null
    private lateinit var cameraExecutor: ExecutorService
    private val textRecognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)

    private val requestPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { isGranted ->
        if (isGranted) {
            startCamera()
        } else {
            Toast.makeText(this, R.string.permission_denied, Toast.LENGTH_LONG).show()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        cameraExecutor = Executors.newSingleThreadExecutor()

        setupUI()
        checkCameraPermission()
    }

    private fun setupUI() {
        binding.captureBtn.setOnClickListener {
            captureAndVerify()
        }

        binding.dismissResultBtn.setOnClickListener {
            hideResult()
        }
    }

    private fun checkCameraPermission() {
        when {
            ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.CAMERA
            ) == PackageManager.PERMISSION_GRANTED -> {
                startCamera()
            }
            else -> {
                requestPermissionLauncher.launch(Manifest.permission.CAMERA)
            }
        }
    }

    private fun startCamera() {
        val cameraProviderFuture = ProcessCameraProvider.getInstance(this)

        cameraProviderFuture.addListener({
            val cameraProvider = cameraProviderFuture.get()

            val preview = Preview.Builder()
                .build()
                .also {
                    it.setSurfaceProvider(binding.cameraPreview.surfaceProvider)
                }

            imageCapture = ImageCapture.Builder()
                .setCaptureMode(ImageCapture.CAPTURE_MODE_MAXIMIZE_QUALITY)
                .build()

            val cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA

            try {
                cameraProvider.unbindAll()
                cameraProvider.bindToLifecycle(
                    this,
                    cameraSelector,
                    preview,
                    imageCapture
                )
                binding.captureBtn.isEnabled = true
                updateStatus(getString(R.string.status_ready))
            } catch (e: Exception) {
                Log.e(TAG, "Camera binding failed", e)
            }
        }, ContextCompat.getMainExecutor(this))
    }

    private fun captureAndVerify() {
        val imageCapture = imageCapture ?: return

        binding.captureBtn.isEnabled = false
        showProcessing(true)
        updateStatus(getString(R.string.status_processing))

        imageCapture.takePicture(
            ContextCompat.getMainExecutor(this),
            object : ImageCapture.OnImageCapturedCallback() {
                override fun onCaptureSuccess(image: ImageProxy) {
                    processImage(image)
                }

                override fun onError(exception: ImageCaptureException) {
                    Log.e(TAG, "Capture failed", exception)
                    showProcessing(false)
                    binding.captureBtn.isEnabled = true
                    showError("Capture failed: ${exception.message}")
                }
            }
        )
    }

    private fun processImage(imageProxy: ImageProxy) {
        updateStatus(getString(R.string.status_recognizing))

        val mediaImage = imageProxy.image
        if (mediaImage == null) {
            imageProxy.close()
            showError("Failed to get image")
            return
        }

        val inputImage = InputImage.fromMediaImage(
            mediaImage,
            imageProxy.imageInfo.rotationDegrees
        )

        textRecognizer.process(inputImage)
            .addOnSuccessListener { visionText ->
                imageProxy.close()
                processRecognizedText(visionText.text)
            }
            .addOnFailureListener { e ->
                imageProxy.close()
                Log.e(TAG, "Text recognition failed", e)
                showError("Text recognition failed: ${e.message}")
            }
    }

    private fun processRecognizedText(rawText: String) {
        Log.d(TAG, "OCR Text:\n$rawText")

        // Extract verification URL
        val urlResult = VerificationLogic.extractVerificationUrl(rawText)
        if (urlResult.url == null) {
            showError("No verification URL found in image")
            return
        }

        Log.d(TAG, "Found URL: ${urlResult.url} at line ${urlResult.urlLineIndex}")

        // Extract certification text
        val certText = VerificationLogic.extractCertText(rawText, urlResult.urlLineIndex)
        Log.d(TAG, "Cert text:\n$certText")

        // Normalize and hash
        val normalizedText = TextNormalizer.normalizeText(certText)
        val hash = TextNormalizer.sha256(normalizedText)
        Log.d(TAG, "Hash: $hash")

        updateStatus(getString(R.string.status_verifying))

        // Build verification URL and verify
        lifecycleScope.launch {
            try {
                // Fetch meta for suffix
                val meta = VerificationLogic.fetchVerificationMeta(urlResult.url!!)
                val suffix = meta?.optString("appendToHashFileName") ?: ""

                val verificationUrl = VerificationLogic.buildVerificationUrl(
                    urlResult.url!!,
                    hash,
                    suffix
                )
                Log.d(TAG, "Verification URL: $verificationUrl")

                val result = VerificationLogic.verifyHash(verificationUrl)
                showResult(result)
            } catch (e: Exception) {
                Log.e(TAG, "Verification failed", e)
                showError("Verification failed: ${e.message}")
            }
        }
    }

    private fun showResult(result: VerificationResult) {
        showProcessing(false)

        when (result) {
            is VerificationResult.Verified -> {
                binding.resultIcon.text = "✓"
                binding.resultIcon.setTextColor(getColor(R.color.verified_green))
                binding.resultText.text = getString(R.string.result_verified)
                binding.resultDomain.text = result.domain
                binding.resultDomain.visibility = View.VISIBLE
            }
            is VerificationResult.NotVerified -> {
                binding.resultIcon.text = "✗"
                binding.resultIcon.setTextColor(getColor(R.color.not_verified_red))
                binding.resultText.text = getString(R.string.result_not_verified)
                binding.resultDomain.text = result.reason
                binding.resultDomain.visibility = View.VISIBLE
            }
            is VerificationResult.Error -> {
                binding.resultIcon.text = "!"
                binding.resultIcon.setTextColor(getColor(R.color.not_verified_red))
                binding.resultText.text = getString(R.string.result_error)
                binding.resultDomain.text = result.message
                binding.resultDomain.visibility = View.VISIBLE
            }
        }

        binding.resultOverlay.visibility = View.VISIBLE
    }

    private fun hideResult() {
        binding.resultOverlay.visibility = View.GONE
        binding.captureBtn.isEnabled = true
        updateStatus(getString(R.string.status_ready))
    }

    private fun showError(message: String) {
        showProcessing(false)
        binding.captureBtn.isEnabled = true
        updateStatus(message)
        Toast.makeText(this, message, Toast.LENGTH_LONG).show()
    }

    private fun showProcessing(show: Boolean) {
        binding.processingIndicator.visibility = if (show) View.VISIBLE else View.GONE
    }

    private fun updateStatus(status: String) {
        binding.statusText.text = status
    }

    override fun onDestroy() {
        super.onDestroy()
        cameraExecutor.shutdown()
        textRecognizer.close()
    }

    companion object {
        private const val TAG = "LiveVerify"
    }
}
