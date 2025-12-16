import Foundation
import UIKit

enum VerificationClassification: String, Codable {
    case affirming
    case denying
    case unknown
}

struct VerificationOutcome: Equatable {
    var httpStatus: Int?
    var statusCode: String?
    var displayText: String
    var classification: VerificationClassification
    var authorityHost: String?
    var policyLink: URL?
    var rawBody: String?
}

struct ScanResult {
    var image: UIImage
    var rawText: String?
    var certText: String?
    var normalizedText: String
    var hashHex: String?
    var baseURL: String?
    var verificationURL: URL?
    var meta: VerificationMeta?
    var verificationOutcome: VerificationOutcome

    static func failedCapture(image: UIImage, error: Error) -> ScanResult {
        ScanResult(
            image: image,
            rawText: nil,
            certText: nil,
            normalizedText: "",
            hashHex: nil,
            baseURL: nil,
            verificationURL: nil,
            meta: nil,
            verificationOutcome: .init(
                httpStatus: nil,
                statusCode: nil,
                displayText: error.localizedDescription,
                classification: .denying,
                authorityHost: nil,
                policyLink: nil,
                rawBody: nil
            )
        )
    }
}

struct VerificationOverlayModel: Identifiable, Equatable {
    enum Style: String, Equatable {
        case affirming
        case denying
        case unknown
    }

    let id: UUID = UUID()
    let style: Style
    let title: String
    let detail: String
    let domain: String?

    static func from(outcome: VerificationOutcome) -> VerificationOverlayModel {
        switch outcome.classification {
        case .affirming:
            return VerificationOverlayModel(
                style: .affirming,
                title: outcome.displayText.isEmpty ? "Claim Verified" : outcome.displayText,
                detail: "",
                domain: outcome.authorityHost
            )
        case .denying:
            return VerificationOverlayModel(
                style: .denying,
                title: "Verification Failed",
                detail: outcome.displayText,
                domain: nil
            )
        case .unknown:
            return VerificationOverlayModel(
                style: .unknown,
                title: "Verification Inconclusive",
                detail: outcome.displayText,
                domain: outcome.authorityHost
            )
        }
    }
}
