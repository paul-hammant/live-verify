import AVFoundation
import Foundation
import UIKit

@MainActor
final class CameraService: NSObject, ObservableObject {
    let session = AVCaptureSession()

    @Published var lastErrorMessage: String?
    @Published var isRunning: Bool = false

    var onPhoto: ((UIImage) -> Void)?

    private let photoOutput = AVCapturePhotoOutput()
    private var isConfigured = false

    func start() async {
        lastErrorMessage = nil

        do {
            let granted = await requestCameraAccessIfNeeded()
            guard granted else {
                lastErrorMessage = "Camera permission not granted."
                return
            }

            if !isConfigured {
                try configureSession()
                isConfigured = true
            }

            if !session.isRunning {
                session.startRunning()
            }
            isRunning = session.isRunning
        } catch {
            lastErrorMessage = error.localizedDescription
        }
    }

    func stop() {
        if session.isRunning {
            session.stopRunning()
        }
        isRunning = session.isRunning
    }

    func capturePhoto() {
        guard isConfigured else { return }
        let settings = AVCapturePhotoSettings()
        settings.flashMode = .off
        photoOutput.capturePhoto(with: settings, delegate: self)
    }

    private func requestCameraAccessIfNeeded() async -> Bool {
        switch AVCaptureDevice.authorizationStatus(for: .video) {
        case .authorized:
            return true
        case .notDetermined:
            return await withCheckedContinuation { continuation in
                AVCaptureDevice.requestAccess(for: .video) { granted in
                    continuation.resume(returning: granted)
                }
            }
        default:
            return false
        }
    }

    private func configureSession() throws {
        session.beginConfiguration()
        session.sessionPreset = .photo

        let device = AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: .back)
        guard let device else {
            throw CameraError.noCameraAvailable
        }

        let input = try AVCaptureDeviceInput(device: device)
        guard session.canAddInput(input) else {
            throw CameraError.cannotAddInput
        }
        session.addInput(input)

        guard session.canAddOutput(photoOutput) else {
            throw CameraError.cannotAddOutput
        }
        session.addOutput(photoOutput)

        session.commitConfiguration()
    }
}

extension CameraService: AVCapturePhotoCaptureDelegate {
    nonisolated func photoOutput(_ output: AVCapturePhotoOutput, didFinishProcessingPhoto photo: AVCapturePhoto, error: Error?) {
        if let error {
            Task { @MainActor in
                self.lastErrorMessage = error.localizedDescription
            }
            return
        }

        guard let data = photo.fileDataRepresentation(), let image = UIImage(data: data) else {
            Task { @MainActor in
                self.lastErrorMessage = "Could not capture photo."
            }
            return
        }

        Task { @MainActor in
            self.onPhoto?(image)
        }
    }
}

enum CameraError: LocalizedError {
    case noCameraAvailable
    case cannotAddInput
    case cannotAddOutput

    var errorDescription: String? {
        switch self {
        case .noCameraAvailable:
            return "No camera available on this device."
        case .cannotAddInput:
            return "Could not configure camera input."
        case .cannotAddOutput:
            return "Could not configure camera output."
        }
    }
}

