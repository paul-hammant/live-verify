import SwiftUI
import UIKit

struct CameraView: View {
    let isProcessing: Bool
    let onCapture: (UIImage) -> Void

    @StateObject private var camera = CameraService()

    var body: some View {
        ZStack(alignment: .bottom) {
            CameraPreview(session: camera.session)
                .ignoresSafeArea()
                .overlay(alignment: .top) {
                    header
                }

            shutterBar
        }
        .onAppear {
            camera.onPhoto = onCapture
            Task { await camera.start() }
        }
        .onDisappear {
            camera.stop()
        }
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("Live Verify prototype")
                .font(.headline)
                .foregroundStyle(.white)

            Text("On-device OCR → SHA-256 → issuer GET")
                .font(.subheadline)
                .foregroundStyle(.white.opacity(0.85))

            if let error = camera.lastErrorMessage {
                Text(error)
                    .font(.footnote)
                    .foregroundStyle(.yellow)
                    .padding(.top, 6)
            }
        }
        .padding(.horizontal, 16)
        .padding(.top, 12)
        .padding(.bottom, 10)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(.black.opacity(0.35))
    }

    private var shutterBar: some View {
        HStack {
            Button {
                Task { await camera.start() }
            } label: {
                Image(systemName: "camera.fill")
                    .font(.system(size: 18, weight: .semibold))
                    .padding(14)
                    .background(.black.opacity(0.35))
                    .clipShape(Circle())
            }
            .buttonStyle(.plain)

            Spacer()

            Button {
                camera.capturePhoto()
            } label: {
                ZStack {
                    Circle()
                        .strokeBorder(.white, lineWidth: 4)
                        .frame(width: 78, height: 78)
                    Circle()
                        .fill(.white.opacity(isProcessing ? 0.25 : 0.9))
                        .frame(width: 62, height: 62)
                }
                .padding(.vertical, 12)
            }
            .buttonStyle(.plain)
            .disabled(isProcessing || !camera.isRunning)

            Spacer()

            Button {
                camera.stop()
            } label: {
                Image(systemName: "stop.fill")
                    .font(.system(size: 18, weight: .semibold))
                    .padding(14)
                    .background(.black.opacity(0.35))
                    .clipShape(Circle())
            }
            .buttonStyle(.plain)
        }
        .padding(.horizontal, 26)
        .padding(.bottom, 26)
    }
}
