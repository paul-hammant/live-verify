import SwiftUI
import UIKit

struct ResultView: View {
    let scanResult: ScanResult
    @Binding var normalizedTextDraft: String
    let onReverify: () -> Void
    let onReset: () -> Void

    @State private var tab: Tab = .captured

    enum Tab: String, CaseIterable, Identifiable {
        case captured = "Captured"
        case extracted = "Extracted Text"
        case normalized = "Normalized"

        var id: String { rawValue }
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 14) {
                    verificationCard
                    hashCard
                    contentCard
                    disclaimerCard
                }
                .padding(16)
            }
            .navigationTitle("Result")
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Verify Another") { onReset() }
                }
            }
        }
    }

    private var verificationCard: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Verification Status")
                .font(.headline)

            HStack(alignment: .firstTextBaseline) {
                Circle()
                    .fill(statusColor)
                    .frame(width: 10, height: 10)
                Text(scanResult.verificationOutcome.displayText)
                    .font(.body.weight(.semibold))
            }

            if let host = scanResult.verificationOutcome.authorityHost {
                Text(host)
                    .font(.footnote.monospaced())
                    .foregroundStyle(.secondary)
            }

            if let url = scanResult.verificationURL {
                Text(url.absoluteString)
                    .font(.footnote.monospaced())
                    .foregroundStyle(.secondary)
                    .textSelection(.enabled)
            }

            if let policyLink = scanResult.verificationOutcome.policyLink {
                Link("Issuer policy / details", destination: policyLink)
            }
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(
            RoundedRectangle(cornerRadius: 14, style: .continuous)
                .fill(statusColor.opacity(0.08))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 14, style: .continuous)
                .strokeBorder(statusColor.opacity(0.25))
        )
    }

    private var hashCard: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("SHA-256")
                .font(.headline)

            if let hash = scanResult.hashHex {
                Text(hash)
                    .font(.footnote.monospaced())
                    .textSelection(.enabled)

                HStack {
                    Button("Copy Hash") {
                        UIPasteboard.general.string = hash
                    }
                    .buttonStyle(.bordered)

                    Spacer()

                    Button("Re-verify") { onReverify() }
                        .buttonStyle(.borderedProminent)
                }
            } else {
                Text("No hash available.")
                    .foregroundStyle(.secondary)
            }
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(
            RoundedRectangle(cornerRadius: 14, style: .continuous)
                .fill(Color(.secondarySystemBackground))
        )
    }

    private var contentCard: some View {
        VStack(alignment: .leading, spacing: 10) {
            Picker("View", selection: $tab) {
                ForEach(Tab.allCases) { tab in
                    Text(tab.rawValue).tag(tab)
                }
            }
            .pickerStyle(.segmented)

            Group {
                switch tab {
                case .captured:
                    Image(uiImage: scanResult.image)
                        .resizable()
                        .scaledToFit()
                        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))

                case .extracted:
                    Text(scanResult.rawText ?? "(no OCR text)")
                        .font(.footnote.monospaced())
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .textSelection(.enabled)

                case .normalized:
                    TextEditor(text: $normalizedTextDraft)
                        .font(.footnote.monospaced())
                        .frame(minHeight: 220)

                    Text("Edit normalized text to fix OCR errors; then tap Re-verify.")
                        .font(.footnote)
                        .foregroundStyle(.secondary)
                }
            }
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(
            RoundedRectangle(cornerRadius: 14, style: .continuous)
                .fill(Color(.secondarySystemBackground))
        )
    }

    private var disclaimerCard: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Note")
                .font(.headline)
            Text("Only the OCR’d text (after normalization rules) is checked against the issuer endpoint. Screenshots of “Verified” overlays are not proof of anything.")
                .font(.footnote)
                .foregroundStyle(.secondary)
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(
            RoundedRectangle(cornerRadius: 14, style: .continuous)
                .fill(Color(.secondarySystemBackground))
        )
    }

    private var statusColor: Color {
        switch scanResult.verificationOutcome.classification {
        case .affirming: return .green
        case .denying: return .red
        case .unknown: return .gray
        }
    }
}

