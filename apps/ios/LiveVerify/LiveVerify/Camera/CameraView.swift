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

import SwiftUI
import AVFoundation
import UIKit

// MARK: - Text Detection Overlay

/// Overlay view that draws yellow bounding boxes around detected text regions
struct TextDetectionOverlay: View {
    let detections: [DetectedTextRegion]
    let viewSize: CGSize

    var body: some View {
        Canvas { context, size in
            for detection in detections {
                let rect = detection.screenRect(for: viewSize)
                let path = Path(roundedRect: rect, cornerRadius: 4)

                // Fill with semi-transparent yellow
                context.fill(path, with: .color(Color.yellow.opacity(0.15)))

                // Stroke with solid yellow
                context.stroke(path, with: .color(Color.yellow), lineWidth: 2)
            }
        }
        .allowsHitTesting(false)
    }
}

// MARK: - Camera View

/// SwiftUI wrapper for camera preview
struct CameraView: View {
    @ObservedObject var cameraService: CameraService
    let onCapture: () -> Void

    var body: some View {
        GeometryReader { geometry in
            ZStack {
                // Camera preview
                CameraPreviewView(session: cameraService.session)
                    .ignoresSafeArea()

                // Capture button overlay
                VStack {
                    Spacer()

                    Button(action: {
                        // Immediately mark as capturing to prevent double-taps
                        guard !cameraService.isCapturing else {
                            Log.d("CameraView", "Capture blocked - already in progress")
                            return
                        }
                        cameraService.isCapturing = true
                        Log.d("CameraView", "Capture button tapped")
                        let tapTime = Date()
                        // Haptic feedback
                        let impactFeedback = UIImpactFeedbackGenerator(style: .heavy)
                        impactFeedback.impactOccurred()
                        onCapture()
                        let postCallDelta = Int(Date().timeIntervalSince(tapTime) * 1000)
                        Log.d("CameraView", "onCapture returned (+\(postCallDelta)ms from tap)")
                    }) {
                        ZStack {
                            Circle()
                                .fill(cameraService.isCapturing ? Color.gray : Color.white)
                                .frame(width: 70, height: 70)
                            Circle()
                                .stroke(Color.white, lineWidth: 3)
                                .frame(width: 80, height: 80)
                        }
                    }
                    .disabled(cameraService.isCapturing)
                    .accessibilityIdentifier("camera.captureButton")
                    .padding(.bottom, 30)
                }

                // Framing guide
                Rectangle()
                    .stroke(Color.white.opacity(0.5), lineWidth: 2)
                    .frame(
                        width: geometry.size.width * 0.85,
                        height: geometry.size.height * 0.6
                    )
                    .overlay(
                        Text("Frame document here")
                            .foregroundColor(.white.opacity(0.7))
                            .font(.caption)
                            .offset(y: -geometry.size.height * 0.35)
                    )
            }
        }
        .accessibilityIdentifier("camera.preview")
    }
}

/// UIViewRepresentable wrapper for AVCaptureVideoPreviewLayer
struct CameraPreviewView: UIViewRepresentable {
    let session: AVCaptureSession

    func makeUIView(context: Context) -> CameraPreviewUIView {
        let view = CameraPreviewUIView()
        view.session = session
        return view
    }

    func updateUIView(_ uiView: CameraPreviewUIView, context: Context) {
        uiView.session = session
    }
}

/// UIKit view that hosts the camera preview layer
class CameraPreviewUIView: UIView {
    var session: AVCaptureSession? {
        didSet {
            guard let session = session else { return }
            previewLayer.session = session
        }
    }

    private var previewLayer: AVCaptureVideoPreviewLayer {
        layer as! AVCaptureVideoPreviewLayer
    }

    override class var layerClass: AnyClass {
        AVCaptureVideoPreviewLayer.self
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        previewLayer.videoGravity = .resizeAspectFill
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        previewLayer.frame = bounds
        applyCurrentOrientation()
    }

    private func applyCurrentOrientation() {
        guard let connection = previewLayer.connection else { return }
        let interfaceOrientation = OrientationResolver.interfaceOrientation()
        if let resolved = OrientationResolver.captureOrientation(
            interfaceOrientation: interfaceOrientation,
            deviceOrientation: UIDevice.current.orientation
        ) {
            connection.videoOrientation = resolved
        }
    }
}

#Preview {
    CameraView(cameraService: CameraService()) {
        Log.d("Preview", "Capture pressed")
    }
}
