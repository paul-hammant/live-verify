import Foundation

enum VerifyLineParser {
    struct ExtractedURL {
        let url: String
        let urlLineIndex: Int
    }

    static func extractVerificationURL(from rawText: String) -> ExtractedURL? {
        let rawLines = rawText.split(separator: "\n", omittingEmptySubsequences: false).map { String($0).trimmingCharacters(in: .whitespacesAndNewlines) }

        for index in rawLines.indices.reversed() {
            let line = rawLines[index]
            if line.isEmpty { continue }

            let lineNoSpaces = line.replacingOccurrences(of: #"\s+"#, with: "", options: .regularExpression)
            let lower = lineNoSpaces.lowercased()

            let prefixes = [
                "verify:",
                "vfy:",
                "verity:",
                "vty:",
                "verily:",
                "veryfy:",
            ]

            guard prefixes.contains(where: { lower.hasPrefix($0) }) else { continue }

            var normalized = lineNoSpaces
            if lower.hasPrefix("verity:") || lower.hasPrefix("vty:") || lower.hasPrefix("verily:") || lower.hasPrefix("veryfy:") {
                if let colonIndex = normalized.firstIndex(of: ":") {
                    let afterColon = normalized[normalized.index(after: colonIndex)...]
                    normalized = "vfy:" + afterColon
                }
            }

            return ExtractedURL(url: normalized, urlLineIndex: index)
        }

        return nil
    }

    static func extractCertText(from rawText: String, urlLineIndex: Int) -> String {
        let rawLines = rawText.split(separator: "\n", omittingEmptySubsequences: false).map { String($0).trimmingCharacters(in: .whitespacesAndNewlines) }
        guard urlLineIndex >= 0 else { return rawText }

        var certLines = Array(rawLines.prefix(urlLineIndex))
        while let last = certLines.last, last.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
            certLines.removeLast()
        }
        return certLines.joined(separator: "\n")
    }

    static func httpsBaseURLString(from baseURL: String) throws -> String {
        let lower = baseURL.lowercased()
        if lower.hasPrefix("verify:") {
            return "https://" + String(baseURL.dropFirst("verify:".count))
        }
        if lower.hasPrefix("vfy:") {
            return "https://" + String(baseURL.dropFirst("vfy:".count))
        }
        throw LiveVerifyError.invalidBaseURL
    }

    static func buildVerificationURL(baseURL: String, hash: String) throws -> URL {
        let httpsBase = try httpsBaseURLString(from: baseURL)
        guard let url = URL(string: httpsBase + "/" + hash) else {
            throw LiveVerifyError.invalidVerificationURL
        }
        return url
    }

    static func buildMetaURL(baseURL: String) throws -> URL {
        let httpsBase = try httpsBaseURLString(from: baseURL)
        guard let url = URL(string: httpsBase + "/verification-meta.json") else {
            throw LiveVerifyError.invalidBaseURL
        }
        return url
    }
}
