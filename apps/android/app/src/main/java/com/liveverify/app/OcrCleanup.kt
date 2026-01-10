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

package com.liveverify.app

/**
 * OCR-specific artifact cleanup functions.
 * Matches public/ocr-cleanup.js - keep in sync.
 */
object OcrCleanup {

    /**
     * Clean OCR artifacts from text (border characters, trailing letters).
     * Call this BEFORE normalizeText() for OCR'd content.
     *
     * @param text Raw OCR text
     * @return Text with OCR artifacts removed
     */
    fun cleanOcrArtifacts(text: String): String {
        val lines = text.split("\n")

        val cleanedLines = lines.map { line ->
            var cleaned = line

            // Remove leading border artifacts (OCR from registration marks/borders)
            // Common characters: | ~ ` ^ * # + = _ \ / [ ] { }
            cleaned = cleaned.replace(Regex("^[|~`^*#+=/\\\\\\[\\]{}]+\\s*"), "")

            // Remove trailing border artifacts
            cleaned = cleaned.replace(Regex("\\s*[|~`^*#+=/\\\\\\[\\]{}]+$"), "")

            // Remove trailing single lowercase letter (OCR artifact)
            // Preserves uppercase like "Appendix A", "Grade A" which are likely meaningful
            cleaned = cleaned.replace(Regex("\\s+[a-z]$"), "")

            cleaned
        }

        return cleanedLines.joinToString("\n")
    }
}
