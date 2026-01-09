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
                    .font(.system(size: 88, weight: .bold))
                    .foregroundColor(.white)

                Text(primaryLine)
                    .font(.system(size: 32, weight: .bold))
                    .foregroundColor(.white)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal)

                if let secondaryLine {
                    Text(secondaryLine)
                        .font(.title3)
                        .foregroundColor(.white.opacity(0.9))
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)
                }

                if showLinks {
                    HStack(spacing: 24) {
                        linkStyle(text: "What claim?")
                        linkStyle(text: "How to be discerning")
                    }
                    .padding(.top, 4)
                }

                if let reason = reason {
                    Text(reason)
                        .font(.body)
                        .foregroundColor(.white.opacity(0.8))
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)
                }

                Text(tapHint)
                    .font(.caption)
                    .foregroundColor(.white.opacity(0.6))
                    .padding(.top, 16)
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

    private var primaryLine: String {
        switch outcome {
        case .affirming(let domain, _):
            return "Claim verified by \(domain)"
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

    private var secondaryLine: String? {
        switch outcome {
        case .affirming:
            return nil
        case .denying(let domain, _):
            return "by \(domain)"
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

    private var showLinks: Bool {
        if case .affirming = outcome { return true }
        return false
    }

    private var tapHint: String {
        switch outcome {
        case .affirming:
            return "Tap to dismiss and scan again"
        default:
            return "Tap to continue"
        }
    }

    private func linkStyle(text: String) -> some View {
        Text(text)
            .font(.callout)
            .foregroundColor(.white)
            .underline()
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
