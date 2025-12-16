package io.github.paulhammant.liveverifyprototype.core

object DocumentNormalizer {
    fun normalize(text: String, meta: VerificationMeta?): String {
        val docSpecific = applyDocSpecificNormalization(text, meta)
        val unicodeFixed = normalizeUnicodeArtifacts(docSpecific)

        val normalizedLines = unicodeFixed
            .split("\n")
            .map { normalizeLine(it) }
            .filter { it.isNotEmpty() }

        return normalizedLines.joinToString("\n")
    }

    private fun applyDocSpecificNormalization(text: String, meta: VerificationMeta?): String {
        if (meta == null) return text
        var result = text

        meta.charNormalization?.trim()?.takeIf { it.isNotEmpty() }?.let { charNormalization ->
            val groups = charNormalization.split(Regex("\\s+"))
            for (group in groups) {
                val parts = group.split("→")
                if (parts.size == 2 && parts[1].length == 1) {
                    val sourceChars = parts[0]
                    val targetChar = parts[1]
                    for (source in sourceChars) {
                        result = result.replace(source.toString(), targetChar)
                    }
                }
            }
        }

        meta.ocrNormalizationRules?.forEach { rule ->
            val pattern = rule.pattern ?: return@forEach
            val replacement = rule.replacement ?: return@forEach
            runCatching {
                val regex = Regex(pattern)
                result = regex.replace(result, replacement)
            }
        }

        return result
    }

    private fun normalizeUnicodeArtifacts(text: String): String {
        return text
            .replace("\u201C", "\"")
            .replace("\u201D", "\"")
            .replace("\u201E", "\"")
            .replace("\u2018", "'")
            .replace("\u2019", "'")
            .replace("\u00AB", "\"")
            .replace("\u00BB", "\"")
            .replace("\u2013", "-")
            .replace("\u2014", "-")
            .replace("\u00A0", " ")
            .replace("\u2026", "...")
    }

    private fun normalizeLine(input: String): String {
        var line = input

        line = line.replace(Regex("^\\s+"), "")
        line = line.replace(Regex("""^[|~`^*#+=/\\_\[\]{}]+\s*"""), "")
        line = line.replace(Regex("\\s+$"), "")
        line = line.replace(Regex("""\s*[|~`^*#+=/\\_\[\]{}]+$"""), "")
        line = line.replace(Regex("""\s+[a-z]$"""), "")
        line = line.replace(Regex("\\s+"), " ")

        return line.trim()
    }
}

