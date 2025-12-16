import SwiftUI

struct ProcessingOverlay: View {
    let message: String

    var body: some View {
        ZStack {
            Color.black.opacity(0.55).ignoresSafeArea()
            VStack(spacing: 14) {
                ProgressView()
                    .progressViewStyle(.circular)
                    .tint(.white)
                    .scaleEffect(1.2)
                Text(message)
                    .font(.headline)
                    .foregroundStyle(.white)
                    .multilineTextAlignment(.center)
            }
            .padding(22)
            .background(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .fill(Color.black.opacity(0.35))
            )
            .padding()
        }
        .transition(.opacity)
    }
}

struct VerificationOverlay: View {
    let overlay: VerificationOverlayModel
    let onTap: () -> Void

    var body: some View {
        Button(action: onTap) {
            ZStack {
                Color.black.opacity(0.55).ignoresSafeArea()
                VStack(spacing: 14) {
                    icon
                    Text(overlay.title)
                        .font(.title2.weight(.semibold))
                        .foregroundStyle(.white)
                        .multilineTextAlignment(.center)

                    if !overlay.detail.isEmpty {
                        Text(overlay.detail)
                            .font(.callout)
                            .foregroundStyle(.white.opacity(0.9))
                            .multilineTextAlignment(.center)
                    }

                    if let domain = overlay.domain, !domain.isEmpty {
                        Text(domain)
                            .font(.footnote.monospaced())
                            .foregroundStyle(.white.opacity(0.8))
                            .padding(.top, 4)
                    }

                    Text("Tap to continue")
                        .font(.footnote)
                        .foregroundStyle(.white.opacity(0.8))
                        .padding(.top, 10)
                }
                .padding(22)
                .frame(maxWidth: 340)
                .background(
                    RoundedRectangle(cornerRadius: 20, style: .continuous)
                        .fill(cardColor)
                )
                .padding()
            }
        }
        .buttonStyle(.plain)
        .transition(.opacity)
    }

    private var cardColor: Color {
        switch overlay.style {
        case .affirming: return Color.green.opacity(0.85)
        case .denying: return Color.red.opacity(0.85)
        case .unknown: return Color.gray.opacity(0.85)
        }
    }

    @ViewBuilder
    private var icon: some View {
        switch overlay.style {
        case .affirming:
            Image(systemName: "checkmark")
                .font(.system(size: 52, weight: .bold))
                .foregroundStyle(.white)
        case .denying:
            Image(systemName: "xmark")
                .font(.system(size: 52, weight: .bold))
                .foregroundStyle(.white)
        case .unknown:
            Image(systemName: "questionmark")
                .font(.system(size: 52, weight: .bold))
                .foregroundStyle(.white)
        }
    }
}

