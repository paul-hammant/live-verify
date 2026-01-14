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
 * Helper functions for diagnostic display features.
 */
object DiagnosticHelper {

    /**
     * Appends a return symbol (⏎) to each line for visual debugging.
     * This helps users see exactly where line breaks are in OCR output.
     */
    fun withReturnSymbols(text: String): String {
        return text.lines().joinToString("\n") { "$it\u23CE" }
    }

    /**
     * Formats a SHA-256 hash for display, optionally truncating with ellipsis.
     * @param hash The full 64-character hex hash
     * @param maxLength Maximum display length (0 = no truncation)
     * @return Formatted hash string
     */
    fun formatHash(hash: String, maxLength: Int = 0): String {
        if (maxLength <= 0 || hash.length <= maxLength) {
            return hash
        }
        val halfLen = (maxLength - 3) / 2
        return "${hash.take(halfLen)}...${hash.takeLast(halfLen)}"
    }
}
