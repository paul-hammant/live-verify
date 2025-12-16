import SwiftUI

struct ContentView: View {
    @StateObject private var viewModel = LiveVerifyViewModel()

    var body: some View {
        ZStack {
            if let scanResult = viewModel.scanResult {
                ResultView(
                    scanResult: scanResult,
                    normalizedTextDraft: $viewModel.normalizedTextDraft,
                    onReverify: { Task { await viewModel.reverify() } },
                    onReset: { viewModel.reset() }
                )
            } else {
                CameraView(
                    isProcessing: viewModel.isProcessing,
                    onCapture: { image in
                        Task { await viewModel.process(image: image) }
                    }
                )
            }

            if let message = viewModel.progressMessage {
                ProcessingOverlay(message: message)
            }

            if let overlay = viewModel.verificationOverlay {
                VerificationOverlay(overlay: overlay) {
                    viewModel.verificationOverlay = nil
                }
            }
        }
    }
}

#Preview {
    ContentView()
}

