package io.github.paulhammant.liveverifyprototype.core

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Test

class VerifyLineParserTest {
    @Test
    fun extractVerificationUrl_basicVerifyPrefix() {
        val raw = """
            Firstname Middlename Lastname has a degree.

            verify:issuer.example.com/claims
        """.trimIndent()

        val extracted = VerifyLineParser.extractVerificationUrl(raw)
        assertNotNull(extracted)
        assertEquals("verify:issuer.example.com/claims", extracted?.url)
        assertEquals(2, extracted?.urlLineIndex)
    }

    @Test
    fun extractVerificationUrl_toleratesSpacesInsidePrefix() {
        val raw = """
            Something something
            ve r i f y : issuer.example.com/claims
        """.trimIndent()

        val extracted = VerifyLineParser.extractVerificationUrl(raw)
        assertEquals("verify:issuer.example.com/claims", extracted?.url)
    }

    @Test
    fun extractVerificationUrl_normalizesCorruptedPrefixToVfy() {
        val raw = """
            Certification text line
            veryfy:issuer.example.com/claims
        """.trimIndent()

        val extracted = VerifyLineParser.extractVerificationUrl(raw)
        assertEquals("vfy:issuer.example.com/claims", extracted?.url)
    }

    @Test
    fun extractCertText_excludesVerifyLineAndTrailingBlanks() {
        val raw = """
            Line 1
            Line 2

            verify:issuer.example.com/claims
        """.trimIndent()

        val extracted = VerifyLineParser.extractVerificationUrl(raw)!!
        val cert = VerifyLineParser.extractCertText(raw, extracted.urlLineIndex)
        assertEquals("Line 1\nLine 2", cert)
    }

    @Test
    fun buildVerificationUrl_appendsHash() {
        val url = VerifyLineParser.buildVerificationUrl("verify:issuer.example.com/claims", "abc123")
        assertEquals("https://issuer.example.com/claims/abc123", url.toString())
    }
}

