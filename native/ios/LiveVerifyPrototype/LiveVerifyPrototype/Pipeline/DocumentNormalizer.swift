import Foundation

enum DocumentNormalizer {
    static func normalize(_ text: String, meta: VerificationMeta?) -> String {
        let withDocSpecific = applyDocSpecificNormalization(text, meta: meta)
        let withUnicodeFixes = normalizeUnicodeArtifacts(withDocSpecific)
        let normalizedLines = withUnicodeFixes
            .split(separator: "\n", omittingEmptySubsequences: false)
            .map { normalizeLine(String($0)) }
            .filter { !$0.isEmpty }
        return normalizedLines.joined(separator: "\n")
    }

    private static func applyDocSpecificNormalization(_ text: String, meta: VerificationMeta?) -> String {
        guard let meta else { return text }
        var result = text

        if let charNormalization = meta.charNormalization {
            let groups = charNormalization.split(whereSeparator: \.isWhitespace).map(String.init)
            for group in groups {
                let parts = group.split(separator: "→", omittingEmptySubsequences: false).map(String.init)
                guard parts.count == 2, parts[1].count == 1 else { continue }
                let sourceChars = parts[0]
                let target = parts[1]
                for ch in sourceChars {
                    result = result.replacingOccurrences(of: String(ch), with: target)
                }
            }
        }

        if let rules = meta.ocrNormalizationRules {
            for rule in rules {
                guard let pattern = rule.pattern, let replacement = rule.replacement else { continue }
                do {
                    let regex = try NSRegularExpression(pattern: pattern, options: [])
                    let range = NSRange(result.startIndex..., in: result)
                    result = regex.stringByReplacingMatches(in: result, options: [], range: range, withTemplate: replacement)
                } catch {
                    continue
                }
            }
        }

        return result
    }

    private static func normalizeUnicodeArtifacts(_ text: String) -> String {
        var result = text
        result = result
            .replacingOccurrences(of: "\u{201C}", with: "\"")
            .replacingOccurrences(of: "\u{201D}", with: "\"")
            .replacingOccurrences(of: "\u{201E}", with: "\"")
            .replacingOccurrences(of: "\u{2018}", with: "'")
            .replacingOccurrences(of: "\u{2019}", with: "'")
            .replacingOccurrences(of: "\u{00AB}", with: "\"")
            .replacingOccurrences(of: "\u{00BB}", with: "\"")
            .replacingOccurrences(of: "\u{2013}", with: "-")
            .replacingOccurrences(of: "\u{2014}", with: "-")
            .replacingOccurrences(of: "\u{00A0}", with: " ")
            .replacingOccurrences(of: "\u{2026}", with: "...")
        return result
    }

    private static func normalizeLine(_ line: String) -> String {
        var result = line

        result = result.replacingOccurrences(of: #"^\s+"#, with: "", options: .regularExpression)

        result = result.replacingOccurrences(
            of: #"^[|~`^*#+=/\\_\[\]{}]+\s*"#,
            with: "",
            options: .regularExpression
        )

        result = result.replacingOccurrences(of: #"\s+$"#, with: "", options: .regularExpression)

        result = result.replacingOccurrences(
            of: #"\s*[|~`^*#+=/\\_\[\]{}]+$"#,
            with: "",
            options: .regularExpression
        )

        result = result.replacingOccurrences(of: #"\s+[a-z]$"#, with: "", options: .regularExpression)

        result = result.replacingOccurrences(of: #"\s+"#, with: " ", options: .regularExpression)

        return result.trimmingCharacters(in: .whitespacesAndNewlines)
    }
}

