// Copyright (C) 2025, Paul Hammant
// SPDX-License-Identifier: AGPL-3.0-or-later

import SwiftUI

/// Overlay shown during verification processing
struct ProcessingOverlay: View {
    let step: String

    var body: some View {
        ZStack {
            Color.black.opacity(0.7)
                .ignoresSafeArea()

            VStack(spacing: 20) {
                ProgressView()
                    .scaleEffect(1.5)
                    .tint(.white)

                Text(step)
                    .foregroundColor(.white)
                    .font(.headline)
            }
            .padding(40)
            .background(
                RoundedRectangle(cornerRadius: 20)
                    .fill(Color.black.opacity(0.8))
            )
        }
        .accessibilityIdentifier("overlay.processing")
    }
}

/// Overlay shown for verification result
struct VerificationResultOverlay: View {
    let outcome: VerificationOutcome
    let onDismiss: () -> Void

    var body: some View {
        ZStack {
            backgroundColor
                .ignoresSafeArea()

            VStack(spacing: 20) {
                Image(systemName: iconName)
                    .font(.system(size: 80))
                    .foregroundColor(.white)

                Text(title)
                    .font(.largeTitle.bold())
                    .foregroundColor(.white)

                if let domain = domain {
                    Text("by \(domain)")
                        .font(.title3)
                        .foregroundColor(.white.opacity(0.9))
                }

                if let reason = reason {
                    Text(reason)
                        .font(.body)
                        .foregroundColor(.white.opacity(0.8))
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)
                }

                Text("Tap to continue")
                    .font(.caption)
                    .foregroundColor(.white.opacity(0.6))
                    .padding(.top, 20)
            }
        }
        .onTapGesture {
            onDismiss()
        }
        .accessibilityIdentifier("overlay.verificationResult")
    }

    private var backgroundColor: Color {
        switch outcome {
        case .affirming:
            return Color.green
        case .denying, .noVerifyURL:
            return Color.red
        case .networkError, .error:
            return Color.orange
        }
    }

    private var iconName: String {
        switch outcome {
        case .affirming:
            return "checkmark.circle.fill"
        case .denying, .noVerifyURL:
            return "xmark.circle.fill"
        case .networkError:
            return "wifi.exclamationmark"
        case .error:
            return "exclamationmark.triangle.fill"
        }
    }

    private var title: String {
        switch outcome {
        case .affirming(_, let status):
            return status
        case .denying:
            return "VERIFICATION FAILED"
        case .noVerifyURL:
            return "NO VERIFY URL"
        case .networkError:
            return "NETWORK ERROR"
        case .error:
            return "ERROR"
        }
    }

    private var domain: String? {
        switch outcome {
        case .affirming(let domain, _), .denying(let domain, _):
            return domain
        case .noVerifyURL, .networkError, .error:
            return nil
        }
    }

    private var reason: String? {
        switch outcome {
        case .affirming:
            return nil
        case .denying(_, let reason):
            return reason
        case .noVerifyURL:
            return "No verify: or vfy: URL found in the scanned text"
        case .networkError(let error):
            return error.localizedDescription
        case .error(let message):
            return message
        }
    }
}

#Preview("Processing") {
    ProcessingOverlay(step: "Recognizing text...")
}

#Preview("Verified") {
    VerificationResultOverlay(
        outcome: .affirming(domain: "example.com", status: "VERIFIED")
    ) { }
}

#Preview("Failed") {
    VerificationResultOverlay(
        outcome: .denying(domain: "example.com", reason: "Hash not found")
    ) { }
}
