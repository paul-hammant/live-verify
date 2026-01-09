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

/**
 * OCR-specific artifact cleanup functions
 * Only needed for camera/OCR verification paths, not for text selection
 */

/**
 * Clean OCR artifacts from text (border characters, trailing letters)
 * Call this BEFORE normalizeText() for OCR'd content
 * @param {string} text - Raw OCR text
 * @returns {string} Text with OCR artifacts removed
 */
function cleanOcrArtifacts(text) {
    const lines = text.split('\n');

    const cleanedLines = lines.map(line => {
        // Remove leading border artifacts (OCR from registration marks/borders)
        // Common characters: | ~ ` ^ * # + = _ \ / [ ] { }
        // Examples: "| text", "~ text", "|| text", "| | text"
        line = line.replace(/^[|~`^*#+=/\\_\[\]{}]+\s*/, '');

        // Remove trailing border artifacts (OCR from registration marks/borders)
        // Examples: "text |", "text ~", "text ||", "text | |"
        line = line.replace(/\s*[|~`^*#+=/\\_\[\]{}]+$/, '');

        // Remove trailing single lowercase letter (OCR artifact)
        // Examples: "John Doe a", "Company Name b" -> "John Doe", "Company Name"
        // Preserves uppercase like "Appendix A", "Grade A" which are likely meaningful
        line = line.replace(/\s+[a-z]$/, '');

        return line;
    });

    return cleanedLines.join('\n');
}

// Export for Node.js testing (doesn't affect browser usage)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { cleanOcrArtifacts };
}
