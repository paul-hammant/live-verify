// Copyright (C) 2025, Paul Hammant
// SPDX-License-Identifier: AGPL-3.0-or-later

import SwiftUI

/// Tab selection for result display
enum ResultTab: String, CaseIterable {
    case captured = "Captured"
    case extracted = "Extracted"
    case normalized = "Normalized"
}

/// View displaying verification results with tabs
struct ResultView: View {
    let result: VerificationResult
    let capturedImage: UIImage?
    let onReVerify: (String) -> Void
    let onVerifyAnother: () -> Void

    @State private var selectedTab: ResultTab = .captured
    @State private var editedText: String = ""

    var body: some View {
        VStack(spacing: 0) {
            // Verification status banner
            statusBanner
                .accessibilityIdentifier("result.verificationStatus")

            // Tab picker
            Picker("View", selection: $selectedTab) {
                ForEach(ResultTab.allCases, id: \.self) { tab in
                    Text(tab.rawValue).tag(tab)
                }
            }
            .pickerStyle(.segmented)
            .padding()

            // Tab content
            TabView(selection: $selectedTab) {
                capturedTab
                    .tag(ResultTab.captured)

                extractedTab
                    .tag(ResultTab.extracted)

                normalizedTab
                    .tag(ResultTab.normalized)
            }
            .tabViewStyle(.page(indexDisplayMode: .never))

            // Hash display
            if let hash = result.hash {
                hashSection(hash: hash)
            }

            // Action buttons
            actionButtons
        }
        .onAppear {
            editedText = result.normalizedText ?? ""
        }
    }

    // MARK: - Status Banner

    private var statusBanner: some View {
        HStack {
            Image(systemName: statusIcon)
                .font(.title2)

            VStack(alignment: .leading) {
                Text(statusTitle)
                    .font(.headline)

                if let domain = statusDomain {
                    Text("by \(domain)")
                        .font(.caption)
                        .opacity(0.8)
                }
            }

            Spacer()
        }
        .padding()
        .foregroundColor(.white)
        .background(statusColor)
    }

    private var statusIcon: String {
        switch result.outcome {
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

    private var statusTitle: String {
        switch result.outcome {
        case .affirming(_, let status):
            return status
        case .denying(_, let reason):
            return "FAILED: \(reason)"
        case .noVerifyURL:
            return "No verify: URL found"
        case .networkError(let error):
            return "Network error: \(error.localizedDescription)"
        case .error(let message):
            return message
        }
    }

    private var statusDomain: String? {
        switch result.outcome {
        case .affirming(let domain, _), .denying(let domain, _):
            return domain
        default:
            return nil
        }
    }

    private var statusColor: Color {
        switch result.outcome {
        case .affirming:
            return .green
        case .denying, .noVerifyURL:
            return .red
        case .networkError, .error:
            return .orange
        }
    }

    // MARK: - Tabs

    private var capturedTab: some View {
        ScrollView {
            VStack {
                if let image = capturedImage {
                    Image(uiImage: image)
                        .resizable()
                        .scaledToFit()
                        .frame(maxHeight: 400)
                        .cornerRadius(8)
                        .padding()

                    Button(action: copyImage) {
                        Label("Copy Image", systemImage: "doc.on.doc")
                    }
                    .buttonStyle(.bordered)
                } else {
                    Text("No image captured")
                        .foregroundColor(.secondary)
                        .padding()
                }
            }
        }
    }

    private var extractedTab: some View {
        ScrollView {
            Text(result.rawText)
                .font(.system(.body, design: .monospaced))
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding()
                .background(Color(.systemGray6))
                .cornerRadius(8)
                .padding()
        }
    }

    private var normalizedTab: some View {
        VStack {
            TextEditor(text: $editedText)
                .font(.system(.body, design: .monospaced))
                .frame(minHeight: 200)
                .border(Color.gray.opacity(0.3))
                .padding()

            HStack {
                Button("Re-verify") {
                    onReVerify(editedText)
                }
                .buttonStyle(.borderedProminent)
                .accessibilityIdentifier("result.reVerifyButton")

                Text("Edit to fix OCR errors")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            .padding(.horizontal)

            Spacer()
        }
    }

    // MARK: - Hash Section

    private func hashSection(hash: String) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("SHA-256 Hash")
                .font(.caption)
                .foregroundColor(.secondary)

            HStack {
                Text(hash)
                    .font(.system(.caption, design: .monospaced))
                    .lineLimit(1)
                    .truncationMode(.middle)
                    .accessibilityIdentifier("result.hashValue")

                Button(action: { copyHash(hash) }) {
                    Image(systemName: "doc.on.doc")
                }
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(8)
        .padding(.horizontal)
    }

    // MARK: - Action Buttons

    private var actionButtons: some View {
        Button("Verify Another") {
            onVerifyAnother()
        }
        .buttonStyle(.borderedProminent)
        .padding()
        .accessibilityIdentifier("result.verifyAnotherButton")
    }

    // MARK: - Actions

    private func copyImage() {
        guard let image = capturedImage else { return }
        UIPasteboard.general.image = image
    }

    private func copyHash(_ hash: String) {
        UIPasteboard.general.string = hash
    }
}

#Preview {
    ResultView(
        result: VerificationResult(
            outcome: .affirming(domain: "example.com", status: "VERIFIED"),
            rawText: "Test University\nJohn Doe\nFirst Class Honours\nverify:example.com/c",
            normalizedText: "Test University\nJohn Doe\nFirst Class Honours",
            hash: "abc123def456...",
            verificationURL: "https://example.com/c/abc123",
            baseURL: "verify:example.com/c"
        ),
        capturedImage: nil,
        onReVerify: { _ in },
        onVerifyAnother: { }
    )
}
