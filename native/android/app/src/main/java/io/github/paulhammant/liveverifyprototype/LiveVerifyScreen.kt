package io.github.paulhammant.liveverifyprototype

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel

@Composable
fun LiveVerifyScreen(viewModel: LiveVerifyViewModel = viewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    when (val state = uiState) {
        is LiveVerifyUiState.Camera -> {
            CameraScreen(
                isProcessing = state.progressMessage != null,
                progressMessage = state.progressMessage,
                overlay = state.overlay,
                onCapturedFile = viewModel::processCapturedFile,
                onOverlayDismiss = viewModel::dismissOverlay,
            )
        }
        is LiveVerifyUiState.Result -> {
            ResultScreen(
                result = state.result,
                progressMessage = state.progressMessage,
                overlay = state.overlay,
                onNormalizedTextChange = viewModel::updateNormalizedDraft,
                onReverify = viewModel::reverify,
                onVerifyAnother = viewModel::reset,
                onOverlayDismiss = viewModel::dismissOverlay,
            )
        }
    }
}
