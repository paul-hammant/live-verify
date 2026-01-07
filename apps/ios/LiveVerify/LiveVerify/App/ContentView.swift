// Copyright (C) 2025, Paul Hammant
// SPDX-License-Identifier: AGPL-3.0-or-later

import SwiftUI

/// Main app state
enum AppState {
    case camera
    case processing
    case result(VerificationResult)
}

/// Main content view coordinating camera, processing, and results
struct ContentView: View {
    @StateObject private var cameraService = CameraService()
    @StateObject private var pipeline = VerificationPipeline()

    @State private var appState: AppState = .camera
    @State private var capturedImage: UIImage?
    @State private var showPermissionDenied = false
    @State private var errorMessage: String?

    var body: some View {
        ZStack {
            // Main content based on state
            switch appState {
            case .camera:
                cameraContent

            case .processing:
                cameraContent
                ProcessingOverlay(step: pipeline.currentStep)

            case .result(let result):
                ResultView(
                    result: result,
                    capturedImage: capturedImage,
                    onReVerify: reVerify,
                    onVerifyAnother: resetToCamera
                )
            }
        }
        .onAppear {
            setupCamera()
        }
        .alert("Camera Access Denied", isPresented: $showPermissionDenied) {
            Button("Open Settings") {
                if let url = URL(string: UIApplication.openSettingsURLString) {
                    UIApplication.shared.open(url)
                }
            }
            Button("Cancel", role: .cancel) { }
        } message: {
            Text("Camera access is required to scan documents. Please enable it in Settings.")
        }
        .alert("Error", isPresented: .constant(errorMessage != nil)) {
            Button("OK") { errorMessage = nil }
        } message: {
            Text(errorMessage ?? "")
        }
    }

    // MARK: - Camera Content

    private var cameraContent: some View {
        Group {
            switch cameraService.permission {
            case .authorized:
                CameraView(cameraService: cameraService, onCapture: captureAndVerify)

            case .notDetermined:
                VStack(spacing: 20) {
                    Image(systemName: "camera")
                        .font(.system(size: 60))
                        .foregroundColor(.secondary)

                    Text("Camera Permission Required")
                        .font(.title2)

                    Text("Live Verify needs camera access to scan documents.")
                        .multilineTextAlignment(.center)
                        .foregroundColor(.secondary)
                        .padding(.horizontal)

                    Button("Enable Camera") {
                        Task {
                            await cameraService.requestPermission()
                            if cameraService.permission == .authorized {
                                cameraService.setupSession()
                                cameraService.startSession()
                            }
                        }
                    }
                    .buttonStyle(.borderedProminent)
                }
                .padding()

            case .denied:
                VStack(spacing: 20) {
                    Image(systemName: "camera.fill")
                        .font(.system(size: 60))
                        .foregroundColor(.red)

                    Text("Camera Access Denied")
                        .font(.title2)

                    Text("Please enable camera access in Settings to scan documents.")
                        .multilineTextAlignment(.center)
                        .foregroundColor(.secondary)
                        .padding(.horizontal)

                    Button("Open Settings") {
                        if let url = URL(string: UIApplication.openSettingsURLString) {
                            UIApplication.shared.open(url)
                        }
                    }
                    .buttonStyle(.borderedProminent)
                }
                .padding()
            }
        }
    }

    // MARK: - Actions

    private func setupCamera() {
        cameraService.checkPermission()
        if cameraService.permission == .authorized {
            cameraService.setupSession()
            cameraService.startSession()
        }
    }

    private func captureAndVerify() {
        let tapTime = Date()
        Log.d("Content", "captureAndVerify() called")
        Task.detached(priority: .userInitiated) {
            let taskStart = Date()
            Log.d("Content", "Task started (+\(Int(taskStart.timeIntervalSince(tapTime) * 1000))ms from tap)")
            do {
                // Capture photo
                Log.d("Content", "Calling capturePhoto... (+\(Int(Date().timeIntervalSince(tapTime) * 1000))ms)")
                let image = try await cameraService.capturePhoto()
                Log.d("Content", "Photo captured: \(image.size) (+\(Int(Date().timeIntervalSince(tapTime) * 1000))ms)")
                await MainActor.run {
                    capturedImage = image
                    appState = .processing
                }

                // Run verification pipeline off the main thread
                Log.d("Content", "Starting pipeline.verify...")
                let result = try await pipeline.verify(image: image)
                Log.d("Content", "Pipeline complete")

                // Show result
                await MainActor.run {
                    appState = .result(result)
                }
            } catch {
                Log.d("Content", "Error: \(error.localizedDescription)")
                await MainActor.run {
                    cameraService.isCapturing = false
                    let errorResult = VerificationResult(
                        outcome: .error(error.localizedDescription),
                        rawText: "Error: \(error.localizedDescription)",
                        normalizedText: nil,
                        hash: nil,
                        verificationURL: nil,
                        baseURL: nil
                    )
                    appState = .result(errorResult)
                }
            }
        }
    }

    private func reVerify(editedText: String) {
        guard case .result(let currentResult) = appState,
              let baseURL = currentResult.baseURL else {
            return
        }

        Task {
            do {
                await MainActor.run {
                    appState = .processing
                }

                let result = try await pipeline.reVerify(editedText: editedText, baseURL: baseURL)

                await MainActor.run {
                    appState = .result(result)
                }
            } catch {
                await MainActor.run {
                    errorMessage = error.localizedDescription
                    // Stay on result view
                }
            }
        }
    }

    private func resetToCamera() {
        capturedImage = nil
        appState = .camera
        cameraService.isCapturing = false
        cameraService.startSession()
    }
}

#Preview {
    ContentView()
}
