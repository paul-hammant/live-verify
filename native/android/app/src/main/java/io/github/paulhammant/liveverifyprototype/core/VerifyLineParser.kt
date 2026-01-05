package io.github.paulhammant.liveverifyprototype.core

import java.net.URI

object VerifyLineParser {
    data class ExtractedUrl(
        val url: String,
        val urlLineIndex: Int,
    )

    fun extractVerificationUrl(rawText: String): ExtractedUrl? {
        val rawLines = rawText.split("\n").map { it.trim() }

        for (i in rawLines.indices.reversed()) {
            val line = rawLines[i]
            if (line.isBlank()) continue

            val lineNoSpaces = line.replace(Regex("\\s+"), "")
            val lower = lineNoSpaces.lowercase()

            val isCorruptedPrefix =
                lower.startsWith("verity:") ||
                    lower.startsWith("vty:") ||
                    lower.startsWith("verily:") ||
                    lower.startsWith("veryfy:")

            if (
                lower.startsWith("verify:") ||
                lower.startsWith("vfy:") ||
                isCorruptedPrefix
            ) {
                var normalized = lineNoSpaces
                if (isCorruptedPrefix) {
                    val colonIndex = normalized.indexOf(':')
                    if (colonIndex >= 0 && colonIndex + 1 < normalized.length) {
                        normalized = "vfy:" + normalized.substring(colonIndex + 1)
                    }
                }
                return ExtractedUrl(url = normalized, urlLineIndex = i)
            }
        }

        return null
    }

    fun extractCertText(rawText: String, urlLineIndex: Int): String {
        val rawLines = rawText.split("\n").map { it.trim() }
        if (urlLineIndex < 0) return rawText

        val certLines = rawLines.take(urlLineIndex).toMutableList()
        while (certLines.isNotEmpty() && certLines.last().isBlank()) {
            certLines.removeAt(certLines.lastIndex)
        }
        return certLines.joinToString("\n")
    }

    fun httpsBaseUrlString(baseUrl: String): String {
        val lower = baseUrl.lowercase()
        return when {
            lower.startsWith("verify:") -> "https://" + baseUrl.substring("verify:".length)
            lower.startsWith("vfy:") -> "https://" + baseUrl.substring("vfy:".length)
            else -> throw IllegalArgumentException("Invalid base URL format. Must start with verify: or vfy:")
        }
    }

    fun buildVerificationUrl(baseUrl: String, hash: String): URI {
        val httpsBase = httpsBaseUrlString(baseUrl)
        return URI.create("$httpsBase/$hash")
    }

    fun buildMetaUrl(baseUrl: String): URI {
        val httpsBase = httpsBaseUrlString(baseUrl)
        return URI.create("$httpsBase/verification-meta.json")
    }
}

