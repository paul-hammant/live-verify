import Foundation
import UIKit

struct LiveVerifyPipeline {
    private let recognizer: TextRecognizer
    private let client: VerificationClient

    init(recognizer: TextRecognizer = TextRecognizer(), client: VerificationClient = VerificationClient()) {
        self.recognizer = recognizer
        self.client = client
    }

    func run(image: UIImage, progress: @escaping (String) -> Void) async throws -> ScanResult {
        progress("Reading text (OCR)…")
        let rawText = try await recognizer.recognizeText(in: image)

        progress("Finding verify line…")
        guard let extracted = VerifyLineParser.extractVerificationURL(from: rawText) else {
            throw LiveVerifyError.noVerifyLineFound
        }

        let baseURL = extracted.url
        let certText = VerifyLineParser.extractCertText(from: rawText, urlLineIndex: extracted.urlLineIndex)

        progress("Fetching issuer rules…")
        let meta = await client.fetchVerificationMeta(baseURL: baseURL)

        progress("Normalizing…")
        let normalized = DocumentNormalizer.normalize(certText, meta: meta)

        progress("Hashing…")
        let hashHex = SHA256Hasher.hashHex(normalized)

        progress("Verifying…")
        let verificationURL = try VerifyLineParser.buildVerificationURL(baseURL: baseURL, hash: hashHex)
        let outcome = try await client.verify(verificationURL: verificationURL, baseURL: baseURL, meta: meta)

        return ScanResult(
            image: image,
            rawText: rawText,
            certText: certText,
            normalizedText: normalized,
            hashHex: hashHex,
            baseURL: baseURL,
            verificationURL: verificationURL,
            meta: meta,
            verificationOutcome: outcome
        )
    }
}

enum LiveVerifyError: LocalizedError {
    case noVerifyLineFound
    case unableToReadImage
    case invalidBaseURL
    case invalidVerificationURL

    var errorDescription: String? {
        switch self {
        case .noVerifyLineFound:
            return "No verify: line found in the OCR text."
        case .unableToReadImage:
            return "Could not read the captured image."
        case .invalidBaseURL:
            return "The verify: line could not be converted into a valid HTTPS URL."
        case .invalidVerificationURL:
            return "Could not build a verification URL from the verify: line and hash."
        }
    }
}
