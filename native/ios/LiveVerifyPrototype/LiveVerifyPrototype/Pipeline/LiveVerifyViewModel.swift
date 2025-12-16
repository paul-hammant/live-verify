import Foundation
import UIKit

@MainActor
final class LiveVerifyViewModel: ObservableObject {
    @Published var progressMessage: String?
    @Published var scanResult: ScanResult?
    @Published var normalizedTextDraft: String = ""
    @Published var verificationOverlay: VerificationOverlayModel?

    var isProcessing: Bool { progressMessage != nil }

    private let pipeline = LiveVerifyPipeline()

    func reset() {
        progressMessage = nil
        scanResult = nil
        normalizedTextDraft = ""
        verificationOverlay = nil
    }

    func process(image: UIImage) async {
        reset()

        do {
            let result = try await pipeline.run(image: image) { [weak self] message in
                Task { @MainActor in
                    self?.progressMessage = message
                }
            }

            progressMessage = nil
            scanResult = result
            normalizedTextDraft = result.normalizedText
            verificationOverlay = VerificationOverlayModel.from(outcome: result.verificationOutcome)
        } catch {
            progressMessage = nil
            scanResult = ScanResult.failedCapture(image: image, error: error)
            verificationOverlay = .init(
                style: .denying,
                title: "Verification Failed",
                detail: error.localizedDescription,
                domain: nil
            )
        }
    }

    func reverify() async {
        guard var current = scanResult, let baseURL = current.baseURL else {
            return
        }

        progressMessage = "Re-verifying…"
        defer { progressMessage = nil }

        do {
            let meta = current.meta
            let normalized = DocumentNormalizer.normalize(normalizedTextDraft, meta: meta)
            let hash = SHA256Hasher.hashHex(normalized)
            let verificationURL = try VerifyLineParser.buildVerificationURL(baseURL: baseURL, hash: hash)
            let outcome = try await VerificationClient().verify(verificationURL: verificationURL, baseURL: baseURL, meta: meta)

            current.normalizedText = normalized
            current.hashHex = hash
            current.verificationURL = verificationURL
            current.verificationOutcome = outcome
            scanResult = current
            verificationOverlay = VerificationOverlayModel.from(outcome: outcome)
        } catch {
            verificationOverlay = .init(
                style: .denying,
                title: "Verification Failed",
                detail: error.localizedDescription,
                domain: nil
            )
        }
    }
}

