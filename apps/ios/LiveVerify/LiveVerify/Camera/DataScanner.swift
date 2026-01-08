// Copyright (C) 2025, Paul Hammant
// SPDX-License-Identifier: AGPL-3.0-or-later

import SwiftUI
import UIKit
import VisionKit
import Vision

/// DataScannerViewController wrapper for SwiftUI
/// Uses DataScanner for live UI, then VNRecognizeTextRequest for per-line text extraction
struct DataScanner: UIViewControllerRepresentable {

    @Binding var isScanning: Bool
    @Binding var scannedText: String

    func makeUIViewController(context: Context) -> DataScannerViewController {
        let controller = DataScannerViewController(
            recognizedDataTypes: [.text()],
            qualityLevel: .accurate,
            recognizesMultipleItems: true,
            isHighFrameRateTrackingEnabled: true,
            isHighlightingEnabled: true
        )

        controller.delegate = context.coordinator
        context.coordinator.scanner = controller

        return controller
    }

    func updateUIViewController(_ uiViewController: DataScannerViewController, context: Context) {
        if isScanning {
            if !uiViewController.isScanning {
                try? uiViewController.startScanning()
                Log.d("DataScanner", "Started scanning")
            }
        } else {
            if uiViewController.isScanning {
                uiViewController.stopScanning()
                Log.d("DataScanner", "Stopped scanning")
            }
        }
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    class Coordinator: NSObject, DataScannerViewControllerDelegate {
        var parent: DataScanner
        weak var scanner: DataScannerViewController?

        init(_ parent: DataScanner) {
            self.parent = parent
        }

        func dataScanner(_ dataScanner: DataScannerViewController, didTapOn item: RecognizedItem) {
            // User tapped - capture photo and run VNRecognizeTextRequest for per-line text
            // Only process the tapped region, not the entire viewfinder

            // Get bounds of tapped item
            // RecognizedItem.Bounds has corner points, convert to CGRect
            let itemBounds: CGRect
            switch item {
            case .text(let text):
                let bounds = text.bounds
                let minX = min(bounds.topLeft.x, bounds.bottomLeft.x)
                let maxX = max(bounds.topRight.x, bounds.bottomRight.x)
                let minY = min(bounds.topLeft.y, bounds.topRight.y)
                let maxY = max(bounds.bottomLeft.y, bounds.bottomRight.y)
                itemBounds = CGRect(x: minX, y: minY, width: maxX - minX, height: maxY - minY)
                Log.d("DataScanner", "Tapped text region: \(itemBounds)")
            case .barcode:
                Log.d("DataScanner", "Tapped barcode - ignoring")
                return
            @unknown default:
                Log.d("DataScanner", "Unknown item type")
                return
            }

            Task {
                do {
                    guard let scanner = self.scanner else {
                        Log.d("DataScanner", "No scanner reference")
                        return
                    }

                    // Capture still photo
                    let rawImage = try await scanner.capturePhoto()
                    Log.d("DataScanner", "Captured photo: \(rawImage.size), orientation: \(rawImage.imageOrientation.rawValue)")

                    // Normalize image orientation (render to remove rotation metadata)
                    guard let normalizedImage = self.normalizeOrientation(rawImage) else {
                        Log.d("DataScanner", "Failed to normalize image orientation")
                        return
                    }
                    Log.d("DataScanner", "Normalized image: \(normalizedImage.size)")

                    // Get view size for coordinate conversion
                    let viewSize = await MainActor.run { scanner.view.bounds.size }
                    Log.d("DataScanner", "View size: \(viewSize)")

                    // Crop to tapped region (accounting for aspect fill)
                    guard let croppedImage = self.cropToRegion(
                        image: normalizedImage,
                        viewBounds: itemBounds,
                        viewSize: viewSize
                    ) else {
                        Log.d("DataScanner", "Failed to crop image")
                        return
                    }
                    Log.d("DataScanner", "Cropped image: \(croppedImage.size)")

                    // Run OCR only on cropped region
                    let text = await self.recognizeText(in: croppedImage)
                    Log.d("DataScanner", "Recognized text:\n\(text)")

                    await MainActor.run {
                        self.parent.scannedText = text
                    }
                } catch {
                    Log.d("DataScanner", "Photo capture failed: \(error)")
                }
            }
        }

        /// Normalize image orientation by rendering to a new context
        private func normalizeOrientation(_ image: UIImage) -> UIImage? {
            guard image.imageOrientation != .up else { return image }

            UIGraphicsBeginImageContextWithOptions(image.size, false, image.scale)
            image.draw(in: CGRect(origin: .zero, size: image.size))
            let normalizedImage = UIGraphicsGetImageFromCurrentImageContext()
            UIGraphicsEndImageContext()
            return normalizedImage
        }

        /// Crop image to view bounds, accounting for aspect fill display mode
        private func cropToRegion(image: UIImage, viewBounds: CGRect, viewSize: CGSize) -> UIImage? {
            guard let cgImage = image.cgImage else { return nil }

            let imageSize = image.size

            // Calculate aspect fill scale and offset
            // Aspect fill: scale to fill view, crop overflow
            let scaleX = imageSize.width / viewSize.width
            let scaleY = imageSize.height / viewSize.height
            let scale = min(scaleX, scaleY)  // Aspect fill uses min to ensure full coverage

            // Calculate the visible portion of the image in the view
            let visibleImageWidth = viewSize.width * scale
            let visibleImageHeight = viewSize.height * scale

            // Offset from center (aspect fill centers the content)
            let offsetX = (imageSize.width - visibleImageWidth) / 2
            let offsetY = (imageSize.height - visibleImageHeight) / 2

            Log.d("DataScanner", "Aspect fill - scale: \(scale), offset: (\(offsetX), \(offsetY))")

            // Convert view coordinates to image coordinates
            let padding: CGFloat = 0.2  // 20% padding
            let paddedBounds = viewBounds.insetBy(
                dx: -viewBounds.width * padding,
                dy: -viewBounds.height * padding
            )

            var cropRect = CGRect(
                x: offsetX + paddedBounds.minX * scale,
                y: offsetY + paddedBounds.minY * scale,
                width: paddedBounds.width * scale,
                height: paddedBounds.height * scale
            )

            Log.d("DataScanner", "Crop rect before clamping: \(cropRect)")

            // Clamp to image bounds
            cropRect = cropRect.intersection(CGRect(origin: .zero, size: imageSize))

            Log.d("DataScanner", "Crop rect after clamping: \(cropRect)")

            guard !cropRect.isEmpty else { return nil }

            // Convert to CGImage coordinates (need to scale by screen scale)
            let cgCropRect = CGRect(
                x: cropRect.minX * image.scale,
                y: cropRect.minY * image.scale,
                width: cropRect.width * image.scale,
                height: cropRect.height * image.scale
            )

            guard let croppedCGImage = cgImage.cropping(to: cgCropRect) else { return nil }

            return UIImage(cgImage: croppedCGImage, scale: image.scale, orientation: .up)
        }

        /// Run VNRecognizeTextRequest on image and return per-line text
        private func recognizeText(in image: UIImage) async -> String {
            guard let cgImage = image.cgImage else { return "" }

            return await withCheckedContinuation { continuation in
                let request = VNRecognizeTextRequest { request, error in
                    if let error = error {
                        Log.d("DataScanner", "VNRecognizeTextRequest error: \(error)")
                        continuation.resume(returning: "")
                        return
                    }

                    guard let observations = request.results as? [VNRecognizedTextObservation] else {
                        continuation.resume(returning: "")
                        return
                    }

                    Log.d("DataScanner", "VNRecognizeTextRequest found \(observations.count) lines")

                    // Extract text with both X and Y for sorting
                    var lines: [(text: String, x: CGFloat, y: CGFloat)] = []
                    for observation in observations {
                        if let candidate = observation.topCandidates(1).first {
                            let centerX = (observation.boundingBox.minX + observation.boundingBox.maxX) / 2
                            let centerY = (observation.boundingBox.minY + observation.boundingBox.maxY) / 2
                            Log.d("DataScanner", "  Line: '\(candidate.string.prefix(20))...' x=\(centerX) y=\(centerY)")
                            lines.append((text: candidate.string, x: centerX, y: centerY))
                        }
                    }

                    // Sort by reading order: top-to-bottom (descending Y), then left-to-right (ascending X)
                    // But image orientation varies, so try: ascending X first (for landscape)
                    lines.sort { $0.x > $1.x }
                    let result = lines.map { $0.text }.joined(separator: "\n")
                    continuation.resume(returning: result)
                }

                request.recognitionLevel = .accurate
                request.usesLanguageCorrection = true

                let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
                do {
                    try handler.perform([request])
                } catch {
                    Log.d("DataScanner", "VNImageRequestHandler error: \(error)")
                    continuation.resume(returning: "")
                }
            }
        }

        func dataScanner(_ dataScanner: DataScannerViewController, didAdd addedItems: [RecognizedItem], allItems: [RecognizedItem]) {
            Log.d("DataScanner", "Detected \(allItems.count) items")
        }
    }
}

/// Check if DataScanner is available on this device
extension DataScanner {
    static var isSupported: Bool {
        DataScannerViewController.isSupported
    }

    static var isAvailable: Bool {
        DataScannerViewController.isAvailable
    }
}
