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

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.OkHttpClient
import okhttp3.Request
import org.json.JSONObject

/**
 * Pure functions for verification logic matching public/app-logic.js
 */
object VerificationLogic {

    private val client = OkHttpClient()

    /**
     * Result of extracting a verification URL from OCR text
     */
    data class UrlExtraction(
        val url: String?,
        val urlLineIndex: Int
    )

    /**
     * Extract verification URL from OCR raw text
     * Scans from bottom to top to find verify: or vfy: line
     *
     * @param rawText Raw OCR text
     * @return Extracted base URL and its line index
     */
    fun extractVerificationUrl(rawText: String): UrlExtraction {
        val rawLines = rawText.split("\n").map { it.trim() }

        // Match verify: or vfy: with optional spaces around colon
        val verifyPattern = Regex("""(^|\s)(verify|vfy)\s*:\s*""", RegexOption.IGNORE_CASE)

        // Scan from bottom to top
        for (i in rawLines.indices.reversed()) {
            val line = rawLines[i]
            if (line.isEmpty()) continue

            val match = verifyPattern.find(line)
            if (match != null) {
                // Extract everything after the pattern
                var urlPart = line.substring(match.range.last + 1).trim()

                // Remove ALL spaces - URLs don't have spaces, so any space is OCR artifact
                urlPart = urlPart.replace(" ", "")

                if (urlPart.isNotEmpty()) {
                    // Determine the correct prefix
                    val prefix = if (match.groupValues[2].lowercase() == "vfy") "vfy:" else "verify:"
                    return UrlExtraction(url = "$prefix$urlPart", urlLineIndex = i)
                }
            }
        }

        return UrlExtraction(url = null, urlLineIndex = -1)
    }

    /**
     * Convert verify: or vfy: URL to https:// URL with hash appended
     *
     * @param baseUrl Base URL (verify: or vfy:)
     * @param hash SHA-256 hash to append
     * @param suffix Optional suffix from meta (e.g., ".json")
     * @return Full HTTPS verification URL
     */
    fun buildVerificationUrl(baseUrl: String, hash: String, suffix: String = ""): String {
        val lowerBase = baseUrl.lowercase()

        return when {
            lowerBase.startsWith("verify:") -> {
                val withoutPrefix = baseUrl.substring(7)
                "https://$withoutPrefix/$hash$suffix"
            }
            lowerBase.startsWith("vfy:") -> {
                val withoutPrefix = baseUrl.substring(4)
                "https://$withoutPrefix/$hash$suffix"
            }
            else -> throw IllegalArgumentException("Invalid base URL format. Must start with verify: or vfy:")
        }
    }

    /**
     * Extract certification text from raw OCR text (everything before the URL line)
     *
     * @param rawText Raw OCR text
     * @param urlLineIndex Index of the URL line
     * @return Certification text
     */
    fun extractCertText(rawText: String, urlLineIndex: Int): String {
        val rawLines = rawText.split("\n").map { it.trim() }

        // Get everything before the URL line
        val certLines = rawLines.take(urlLineIndex).toMutableList()

        // Remove trailing blank lines
        while (certLines.isNotEmpty() && certLines.last().trim().isEmpty()) {
            certLines.removeAt(certLines.lastIndex)
        }

        return certLines.joinToString("\n")
    }

    /**
     * Fetch verification-meta.json from the base URL
     *
     * @param baseUrl Base URL (verify: or vfy:)
     * @return Metadata object or null if not found
     */
    suspend fun fetchVerificationMeta(baseUrl: String): JSONObject? = withContext(Dispatchers.IO) {
        try {
            val httpsBase = when {
                baseUrl.lowercase().startsWith("verify:") -> "https://${baseUrl.substring(7)}"
                baseUrl.lowercase().startsWith("vfy:") -> "https://${baseUrl.substring(4)}"
                else -> baseUrl
            }

            val metaUrl = "$httpsBase/verification-meta.json"
            val request = Request.Builder()
                .url(metaUrl)
                .build()

            val response = client.newCall(request).execute()
            if (response.isSuccessful) {
                response.body?.string()?.let { JSONObject(it) }
            } else {
                null
            }
        } catch (e: Exception) {
            null
        }
    }

    /**
     * Verify hash against the server
     *
     * @param verificationUrl Full verification URL with hash
     * @return VerificationResult indicating success/failure
     */
    suspend fun verifyHash(verificationUrl: String): VerificationResult = withContext(Dispatchers.IO) {
        try {
            val request = Request.Builder()
                .url(verificationUrl)
                .build()

            val response = client.newCall(request).execute()
            when (response.code) {
                200 -> VerificationResult.Verified(getDomainFromUrl(verificationUrl))
                404 -> VerificationResult.NotVerified("Hash not found on server")
                else -> VerificationResult.Error("Server returned ${response.code}")
            }
        } catch (e: Exception) {
            VerificationResult.Error(e.message ?: "Network error")
        }
    }

    private fun getDomainFromUrl(url: String): String {
        return try {
            val withoutProtocol = url.removePrefix("https://").removePrefix("http://")
            withoutProtocol.substringBefore("/")
        } catch (e: Exception) {
            url
        }
    }
}

/**
 * Verification result sealed class
 */
sealed class VerificationResult {
    data class Verified(val domain: String) : VerificationResult()
    data class NotVerified(val reason: String) : VerificationResult()
    data class Error(val message: String) : VerificationResult()
}
