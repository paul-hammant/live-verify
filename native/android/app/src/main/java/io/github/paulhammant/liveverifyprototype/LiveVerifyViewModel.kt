package io.github.paulhammant.liveverifyprototype

import android.app.Application
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import io.github.paulhammant.liveverifyprototype.core.DocumentNormalizer
import io.github.paulhammant.liveverifyprototype.core.Sha256Hasher
import io.github.paulhammant.liveverifyprototype.core.VerificationClient
import io.github.paulhammant.liveverifyprototype.core.VerificationClassification
import io.github.paulhammant.liveverifyprototype.core.VerificationMeta
import io.github.paulhammant.liveverifyprototype.core.VerificationOutcome
import io.github.paulhammant.liveverifyprototype.core.VerifyLineParser
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import java.io.File
import java.net.URI

class LiveVerifyViewModel(application: Application) : AndroidViewModel(application) {
    private val ocr = MlKitTextRecognizer(application)
    private val client = VerificationClient()

    private val _uiState: MutableStateFlow<LiveVerifyUiState> =
        MutableStateFlow(LiveVerifyUiState.Camera(progressMessage = null, overlay = null))
    val uiState: StateFlow<LiveVerifyUiState> = _uiState

    fun reset() {
        _uiState.value = LiveVerifyUiState.Camera(progressMessage = null, overlay = null)
    }

    fun dismissOverlay() {
        _uiState.update { state ->
            when (state) {
                is LiveVerifyUiState.Camera -> state.copy(overlay = null)
                is LiveVerifyUiState.Result -> state.copy(overlay = null)
            }
        }
    }

    fun updateNormalizedDraft(text: String) {
        _uiState.update { state ->
            when (state) {
                is LiveVerifyUiState.Camera -> state
                is LiveVerifyUiState.Result -> state.copy(result = state.result.copy(normalizedDraft = text))
            }
        }
    }

    fun processCapturedFile(file: File) {
        viewModelScope.launch {
            val bitmap = BitmapFactory.decodeFile(file.absolutePath)
            if (bitmap == null) {
                showFailureOverlay("Could not read captured image.")
                return@launch
            }

            _uiState.value = LiveVerifyUiState.Camera(progressMessage = "Reading text (OCR)…", overlay = null)

            val rawText = runCatching { ocr.recognizeTextFromFile(file) }.getOrElse { e ->
                val outcome = VerificationOutcome(
                    httpStatus = null,
                    statusCode = null,
                    displayText = e.localizedMessage ?: "OCR failed",
                    classification = VerificationClassification.DENYING,
                    authorityHost = null,
                    policyLink = null,
                    rawBody = null,
                )
                _uiState.value = LiveVerifyUiState.Result(
                    result = ScanResultUi(
                        capturedBitmap = bitmap,
                        rawText = null,
                        certText = null,
                        normalizedText = "",
                        normalizedDraft = "",
                        hashHex = null,
                        baseUrl = null,
                        verificationUrl = null,
                        meta = null,
                        outcome = outcome,
                    ),
                    progressMessage = null,
                    overlay = OverlayModel.fromOutcome(outcome),
                )
                return@launch
            }

            val extracted = VerifyLineParser.extractVerificationUrl(rawText)
            if (extracted == null) {
                val outcome = VerificationOutcome(
                    httpStatus = null,
                    statusCode = null,
                    displayText = "No verify: line found in the OCR text.",
                    classification = VerificationClassification.DENYING,
                    authorityHost = null,
                    policyLink = null,
                    rawBody = null,
                )
                _uiState.value = LiveVerifyUiState.Result(
                    result = ScanResultUi(
                        capturedBitmap = bitmap,
                        rawText = rawText,
                        certText = null,
                        normalizedText = "",
                        normalizedDraft = "",
                        hashHex = null,
                        baseUrl = null,
                        verificationUrl = null,
                        meta = null,
                        outcome = outcome,
                    ),
                    progressMessage = null,
                    overlay = OverlayModel.fromOutcome(outcome),
                )
                return@launch
            }

            val baseUrl = extracted.url
            val certText = VerifyLineParser.extractCertText(rawText, extracted.urlLineIndex)

            _uiState.value = LiveVerifyUiState.Camera(progressMessage = "Fetching issuer rules…", overlay = null)
            val meta = client.fetchVerificationMeta(baseUrl)

            _uiState.value = LiveVerifyUiState.Camera(progressMessage = "Normalizing…", overlay = null)
            val normalized = DocumentNormalizer.normalize(certText, meta)

            _uiState.value = LiveVerifyUiState.Camera(progressMessage = "Hashing…", overlay = null)
            val hashHex = Sha256Hasher.hashHex(normalized)

            _uiState.value = LiveVerifyUiState.Camera(progressMessage = "Verifying…", overlay = null)
            val verificationUrl = runCatching { VerifyLineParser.buildVerificationUrl(baseUrl, hashHex) }.getOrElse {
                val outcome = VerificationOutcome(
                    httpStatus = null,
                    statusCode = null,
                    displayText = "Could not build a verification URL from the verify: line and hash.",
                    classification = VerificationClassification.DENYING,
                    authorityHost = null,
                    policyLink = null,
                    rawBody = null,
                )
                _uiState.value = LiveVerifyUiState.Result(
                    result = ScanResultUi(
                        capturedBitmap = bitmap,
                        rawText = rawText,
                        certText = certText,
                        normalizedText = normalized,
                        normalizedDraft = normalized,
                        hashHex = hashHex,
                        baseUrl = baseUrl,
                        verificationUrl = null,
                        meta = meta,
                        outcome = outcome,
                    ),
                    progressMessage = null,
                    overlay = OverlayModel.fromOutcome(outcome),
                )
                return@launch
            }

            val outcome = runCatching { client.verify(verificationUrl, meta) }.getOrElse { e ->
                VerificationOutcome(
                    httpStatus = null,
                    statusCode = null,
                    displayText = e.localizedMessage ?: "Network error",
                    classification = VerificationClassification.DENYING,
                    authorityHost = verificationUrl.host,
                    policyLink = null,
                    rawBody = null,
                )
            }

            _uiState.value = LiveVerifyUiState.Result(
                result = ScanResultUi(
                    capturedBitmap = bitmap,
                    rawText = rawText,
                    certText = certText,
                    normalizedText = normalized,
                    normalizedDraft = normalized,
                    hashHex = hashHex,
                    baseUrl = baseUrl,
                    verificationUrl = verificationUrl,
                    meta = meta,
                    outcome = outcome,
                ),
                progressMessage = null,
                overlay = OverlayModel.fromOutcome(outcome),
            )
        }
    }

    fun reverify() {
        val state = _uiState.value
        if (state !is LiveVerifyUiState.Result) return
        val baseUrl = state.result.baseUrl ?: return

        viewModelScope.launch {
            _uiState.update {
                (it as? LiveVerifyUiState.Result)?.copy(progressMessage = "Re-verifying…") ?: it
            }

            val meta = state.result.meta
            val normalized = DocumentNormalizer.normalize(state.result.normalizedDraft, meta)
            val hashHex = Sha256Hasher.hashHex(normalized)
            val verificationUrl = runCatching { VerifyLineParser.buildVerificationUrl(baseUrl, hashHex) }.getOrNull()

            val outcome = if (verificationUrl != null) {
                runCatching { client.verify(verificationUrl, meta) }.getOrElse { e ->
                    VerificationOutcome(
                        httpStatus = null,
                        statusCode = null,
                        displayText = e.localizedMessage ?: "Network error",
                        classification = VerificationClassification.DENYING,
                        authorityHost = verificationUrl.host,
                        policyLink = null,
                        rawBody = null,
                    )
                }
            } else {
                VerificationOutcome(
                    httpStatus = null,
                    statusCode = null,
                    displayText = "Could not build a verification URL from the verify: line and hash.",
                    classification = VerificationClassification.DENYING,
                    authorityHost = null,
                    policyLink = null,
                    rawBody = null,
                )
            }

            _uiState.value = LiveVerifyUiState.Result(
                result = state.result.copy(
                    normalizedText = normalized,
                    hashHex = hashHex,
                    verificationUrl = verificationUrl,
                    outcome = outcome,
                ),
                progressMessage = null,
                overlay = OverlayModel.fromOutcome(outcome),
            )
        }
    }

    private fun showFailureOverlay(message: String) {
        val outcome = VerificationOutcome(
            httpStatus = null,
            statusCode = null,
            displayText = message,
            classification = VerificationClassification.DENYING,
            authorityHost = null,
            policyLink = null,
            rawBody = null,
        )
        _uiState.value = LiveVerifyUiState.Camera(progressMessage = null, overlay = OverlayModel.fromOutcome(outcome))
    }
}

data class ScanResultUi(
    val capturedBitmap: Bitmap,
    val rawText: String?,
    val certText: String?,
    val normalizedText: String,
    val normalizedDraft: String,
    val hashHex: String?,
    val baseUrl: String?,
    val verificationUrl: URI?,
    val meta: VerificationMeta?,
    val outcome: VerificationOutcome,
)

sealed interface LiveVerifyUiState {
    data class Camera(
        val progressMessage: String?,
        val overlay: OverlayModel?,
    ) : LiveVerifyUiState

    data class Result(
        val result: ScanResultUi,
        val progressMessage: String?,
        val overlay: OverlayModel?,
    ) : LiveVerifyUiState
}

data class OverlayModel(
    val style: Style,
    val title: String,
    val detail: String,
    val domain: String?,
) {
    enum class Style { AFFIRMING, DENYING, UNKNOWN }

    companion object {
        fun fromOutcome(outcome: VerificationOutcome): OverlayModel {
            return when (outcome.classification) {
                VerificationClassification.AFFIRMING -> OverlayModel(
                    style = Style.AFFIRMING,
                    title = if (outcome.displayText.isBlank()) "Claim Verified" else outcome.displayText,
                    detail = "",
                    domain = outcome.authorityHost,
                )
                VerificationClassification.DENYING -> OverlayModel(
                    style = Style.DENYING,
                    title = "Verification Failed",
                    detail = outcome.displayText,
                    domain = null,
                )
                VerificationClassification.UNKNOWN -> OverlayModel(
                    style = Style.UNKNOWN,
                    title = "Verification Inconclusive",
                    detail = outcome.displayText,
                    domain = outcome.authorityHost,
                )
            }
        }
    }
}

