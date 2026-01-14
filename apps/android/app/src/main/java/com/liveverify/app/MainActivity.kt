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
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Matrix
import android.graphics.RectF
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.annotation.OptIn
import androidx.appcompat.app.AppCompatActivity
import androidx.camera.core.CameraSelector
import androidx.camera.core.ExperimentalGetImage
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.ImageCapture
import androidx.camera.core.ImageCaptureException
import androidx.camera.core.ImageProxy
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.Text
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import com.google.android.material.tabs.TabLayout
import com.google.android.material.tabs.TabLayoutMediator
import com.liveverify.app.databinding.ActivityMainBinding
import kotlinx.coroutines.launch
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private var imageCapture: ImageCapture? = null
    private var imageAnalysis: ImageAnalysis? = null
    private lateinit var cameraExecutor: ExecutorService
    private val textRecognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)

    // Diagnostic data - stored after capture for display
    private var capturedBitmap: Bitmap? = null
    private var rawOcrText: String = ""
    private var normalizedText: String = ""
    private var computedHash: String = ""

    // Selected text block from tap
    private var selectedBlock: TextOverlayView.TextBlock? = null

    // Diagnostic adapter for ViewPager2
    private lateinit var diagnosticAdapter: DiagnosticAdapter

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

        // Handle tap selection on text overlay
        binding.textOverlay.onBlockSelected = { block ->
            selectedBlock = block
            if (block != null) {
                updateStatus("Tap capture to verify selected text")
                binding.captureBtn.text = getString(R.string.capture_selected)
            } else {
                updateStatus(getString(R.string.status_ready))
                binding.captureBtn.text = getString(R.string.capture_verify)
            }
        }

        // Set up diagnostic ViewPager2 with tabs
        diagnosticAdapter = DiagnosticAdapter()
        binding.diagnosticPager.adapter = diagnosticAdapter

        val tabTitles = arrayOf(
            getString(R.string.tab_captured),
            getString(R.string.tab_extracted),
            getString(R.string.tab_normalized)
        )
        TabLayoutMediator(binding.diagnosticTabs, binding.diagnosticPager) { tab, position ->
            tab.text = tabTitles[position]
        }.attach()
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

            // Add image analysis for live text detection
            imageAnalysis = ImageAnalysis.Builder()
                .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
                .build()
                .also { analysis ->
                    analysis.setAnalyzer(cameraExecutor) { imageProxy ->
                        analyzeImage(imageProxy)
                    }
                }

            val cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA

            try {
                cameraProvider.unbindAll()
                cameraProvider.bindToLifecycle(
                    this,
                    cameraSelector,
                    preview,
                    imageCapture,
                    imageAnalysis
                )
                binding.captureBtn.isEnabled = true
                updateStatus(getString(R.string.status_ready))
            } catch (e: Exception) {
                Log.e(TAG, "Camera binding failed", e)
            }
        }, ContextCompat.getMainExecutor(this))
    }

    @OptIn(ExperimentalGetImage::class)
    private fun analyzeImage(imageProxy: ImageProxy) {
        val mediaImage = imageProxy.image
        if (mediaImage == null) {
            imageProxy.close()
            return
        }

        val inputImage = InputImage.fromMediaImage(
            mediaImage,
            imageProxy.imageInfo.rotationDegrees
        )

        // ML Kit returns bounding boxes in rotated coordinate space
        // So we need to pass the rotated dimensions
        val rotationDegrees = imageProxy.imageInfo.rotationDegrees
        val isRotated = rotationDegrees == 90 || rotationDegrees == 270
        val analysisWidth = if (isRotated) imageProxy.height else imageProxy.width
        val analysisHeight = if (isRotated) imageProxy.width else imageProxy.height

        textRecognizer.process(inputImage)
            .addOnSuccessListener { visionText ->
                // Update overlay on main thread
                runOnUiThread {
                    binding.textOverlay.setDetectedText(
                        visionText,
                        analysisWidth,
                        analysisHeight,
                        rotationDegrees
                    )
                }
            }
            .addOnFailureListener { e ->
                Log.e(TAG, "Live text detection failed", e)
            }
            .addOnCompleteListener {
                imageProxy.close()
            }
    }

    private fun captureAndVerify() {
        val imageCapture = imageCapture ?: return

        binding.captureBtn.isEnabled = false
        showProcessing(true)
        updateStatus(getString(R.string.status_processing))

        // Clear overlay during capture
        binding.textOverlay.clearBlocks()

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

    @OptIn(ExperimentalGetImage::class)
    private fun processImage(imageProxy: ImageProxy) {
        updateStatus(getString(R.string.status_recognizing))

        val mediaImage = imageProxy.image
        if (mediaImage == null) {
            imageProxy.close()
            showError("Failed to get image")
            return
        }

        // Convert to bitmap for storage and potential cropping
        val buffer = imageProxy.planes[0].buffer
        val bytes = ByteArray(buffer.remaining())
        buffer.get(bytes)
        var bitmap = BitmapFactory.decodeByteArray(bytes, 0, bytes.size)

        // Apply rotation if needed
        if (imageProxy.imageInfo.rotationDegrees != 0) {
            val matrix = Matrix()
            matrix.postRotate(imageProxy.imageInfo.rotationDegrees.toFloat())
            bitmap = Bitmap.createBitmap(bitmap, 0, 0, bitmap.width, bitmap.height, matrix, true)
        }

        // Crop to selected region if one was selected
        val block = selectedBlock
        if (block != null) {
            val paddedBounds = binding.textOverlay.addPadding(block.originalBounds)
            bitmap = cropBitmap(bitmap, paddedBounds)
        }

        // Store for diagnostic display
        capturedBitmap = bitmap

        val inputImage = InputImage.fromMediaImage(
            mediaImage,
            imageProxy.imageInfo.rotationDegrees
        )

        // If we have a selected block, OCR the cropped bitmap instead
        val imageToProcess = if (block != null && capturedBitmap != null) {
            InputImage.fromBitmap(capturedBitmap!!, 0)
        } else {
            inputImage
        }

        textRecognizer.process(imageToProcess)
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

    private fun cropBitmap(bitmap: Bitmap, bounds: RectF): Bitmap {
        val left = bounds.left.toInt().coerceIn(0, bitmap.width - 1)
        val top = bounds.top.toInt().coerceIn(0, bitmap.height - 1)
        val width = bounds.width().toInt().coerceIn(1, bitmap.width - left)
        val height = bounds.height().toInt().coerceIn(1, bitmap.height - top)

        return Bitmap.createBitmap(bitmap, left, top, width, height)
    }

    private fun processRecognizedText(rawText: String) {
        // Store raw OCR text for diagnostic display
        this.rawOcrText = rawText
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
        normalizedText = TextNormalizer.normalizeText(certText)
        computedHash = TextNormalizer.sha256(normalizedText)
        Log.d(TAG, "Hash: $computedHash")

        updateStatus(getString(R.string.status_verifying))

        // Build verification URL and verify
        lifecycleScope.launch {
            try {
                // Fetch meta for suffix
                val meta = VerificationLogic.fetchVerificationMeta(urlResult.url)
                val suffix = meta?.optString("appendToHashFileName") ?: ""

                val verificationUrl = VerificationLogic.buildVerificationUrl(
                    urlResult.url,
                    computedHash,
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

        // Show diagnostic info
        showDiagnosticInfo()
    }

    private fun showDiagnosticInfo() {
        // Log diagnostic info
        Log.d(TAG, "=== DIAGNOSTIC INFO ===")
        Log.d(TAG, "Raw OCR text with return symbols:\n${DiagnosticHelper.withReturnSymbols(rawOcrText)}")
        Log.d(TAG, "Normalized text:\n$normalizedText")
        Log.d(TAG, "Hash: $computedHash")
        Log.d(TAG, "=======================")

        // Populate diagnostic tabs
        diagnosticAdapter.capturedImage = capturedBitmap
        diagnosticAdapter.extractedText = rawOcrText
        diagnosticAdapter.normalizedText = normalizedText
        diagnosticAdapter.computedHash = computedHash
    }

    private fun hideResult() {
        binding.resultOverlay.visibility = View.GONE
        binding.captureBtn.isEnabled = true
        binding.captureBtn.text = getString(R.string.capture_verify)
        selectedBlock = null
        updateStatus(getString(R.string.status_ready))

        // Clear diagnostic data
        capturedBitmap = null
        rawOcrText = ""
        normalizedText = ""
        computedHash = ""
    }

    private fun showError(message: String) {
        showProcessing(false)

        // Show error in result overlay so user can see diagnostic tabs
        binding.resultIcon.text = "!"
        binding.resultIcon.setTextColor(getColor(R.color.not_verified_red))
        binding.resultText.text = getString(R.string.result_error)
        binding.resultDomain.text = message
        binding.resultDomain.visibility = View.VISIBLE
        binding.resultOverlay.visibility = View.VISIBLE

        // Show diagnostic info in tabs
        showDiagnosticInfo()
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
