package io.github.paulhammant.liveverifyprototype.core

import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Test

class DocumentNormalizerTest {
    @Test
    fun normalizesUnicodeQuotesDashesEllipsis() {
        val raw = "“Hello”—world…"
        val normalized = DocumentNormalizer.normalize(raw, meta = null)
        assertEquals("\"Hello\"-world...", normalized)
    }

    @Test
    fun stripsBorderArtifactsAndWhitespace() {
        val raw = "   |  John   Doe  |   \n\n"
        val normalized = DocumentNormalizer.normalize(raw, meta = null)
        assertEquals("John Doe", normalized)
    }

    @Test
    fun removesTrailingSingleLowercaseLetterArtifact() {
        val raw = "Company Name a\nAppendix A"
        val normalized = DocumentNormalizer.normalize(raw, meta = null)
        assertEquals("Company Name\nAppendix A", normalized)
    }

    @Test
    fun appliesCharNormalizationAndRegexRulesFromMeta() {
        val json = """
            {
              "charNormalization": "éèêë→e òóôö→o",
              "ocrNormalizationRules": [
                { "pattern": "CHF\\s+(\\d)", "replacement": "CHF$1" }
              ]
            }
        """.trimIndent()

        val meta = Json { ignoreUnknownKeys = true }.decodeFromString(VerificationMeta.serializer(), json)
        val raw = "Hôtel CHF 1"
        val normalized = DocumentNormalizer.normalize(raw, meta)
        assertEquals("Hotel CHF1", normalized)
    }
}
