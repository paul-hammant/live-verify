import Foundation
import UIKit
import Vision

struct TextRecognizer {
    func recognizeText(in image: UIImage) async throws -> String {
        try await Task.detached(priority: .userInitiated) {
            guard let cgImage = image.cgImage else {
                throw LiveVerifyError.unableToReadImage
            }

            let request = VNRecognizeTextRequest(completionHandler: nil)
            request.recognitionLevel = .accurate
            request.usesLanguageCorrection = false
            request.minimumTextHeight = 0.01

            let handler = VNImageRequestHandler(
                cgImage: cgImage,
                orientation: image.cgImagePropertyOrientation,
                options: [:]
            )

            try handler.perform([request])
            let observations = request.results ?? []

            let sorted = observations.sorted { a, b in
                let ay = a.boundingBox.midY
                let by = b.boundingBox.midY
                if abs(ay - by) > 0.02 {
                    return ay > by
                }
                return a.boundingBox.minX < b.boundingBox.minX
            }

            let lines = sorted.compactMap { observation -> String? in
                observation.topCandidates(1).first?.string
            }

            return lines.joined(separator: "\n")
        }.value
    }
}

private extension UIImage {
    var cgImagePropertyOrientation: CGImagePropertyOrientation {
        CGImagePropertyOrientation(imageOrientation)
    }
}

private extension CGImagePropertyOrientation {
    init(_ uiOrientation: UIImage.Orientation) {
        switch uiOrientation {
        case .up: self = .up
        case .down: self = .down
        case .left: self = .left
        case .right: self = .right
        case .upMirrored: self = .upMirrored
        case .downMirrored: self = .downMirrored
        case .leftMirrored: self = .leftMirrored
        case .rightMirrored: self = .rightMirrored
        @unknown default: self = .up
        }
    }
}
