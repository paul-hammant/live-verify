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

import Foundation

/// OCR-specific artifact cleanup functions.
/// Matches public/ocr-cleanup.js - keep in sync.
enum OcrCleanup {

    /// Clean OCR artifacts from text (border characters, trailing letters).
    /// Call this BEFORE normalizeText() for OCR'd content.
    ///
    /// - Parameter text: Raw OCR text
    /// - Returns: Text with OCR artifacts removed
    static func cleanOcrArtifacts(_ text: String) -> String {
        let lines = text.components(separatedBy: "\n")

        let cleanedLines = lines.map { line -> String in
            var cleaned = line

            // Remove leading border artifacts (OCR from registration marks/borders)
            // Common characters: | ~ ` ^ * # + = _ \ / [ ] { }
            if let match = cleaned.range(of: "^[|~`^*#+=/\\\\\\[\\]{}]+\\s*", options: .regularExpression) {
                cleaned.removeSubrange(match)
            }

            // Remove trailing border artifacts
            if let match = cleaned.range(of: "\\s*[|~`^*#+=/\\\\\\[\\]{}]+$", options: .regularExpression) {
                cleaned.removeSubrange(match)
            }

            // Remove trailing single lowercase letter (OCR artifact)
            // Preserves uppercase like "Appendix A", "Grade A" which are likely meaningful
            if let match = cleaned.range(of: "\\s+[a-z]$", options: .regularExpression) {
                cleaned.removeSubrange(match)
            }

            return cleaned
        }

        return cleanedLines.joined(separator: "\n")
    }
}
