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

import org.junit.Assert.*
import org.junit.Test
import org.junit.runner.RunWith
import org.junit.runners.Parameterized
import java.io.File

/**
 * Cross-platform hash consistency tests.
 * Reads test fixtures from /normalization-hashes/ directory.
 * These tests ensure Kotlin implementation matches JavaScript.
 */
@RunWith(Parameterized::class)
class CrossPlatformHashTest(
    private val description: String,
    private val expectedHash: String,
    private val body: String,
    private val metadata: TextNormalizer.Metadata?
) {

    companion object {
        /**
         * Find the normalization-hashes directory by walking up from current dir
         */
        private fun findFixturesDir(): File {
            var dir = File(System.getProperty("user.dir"))
            while (dir.parentFile != null) {
                val fixturesDir = File(dir, "normalization-hashes")
                if (fixturesDir.exists() && fixturesDir.isDirectory) {
                    return fixturesDir
                }
                dir = dir.parentFile
            }
            throw IllegalStateException("Could not find normalization-hashes directory")
        }

        /**
         * Parse YAML-like frontmatter from markdown content
         */
        private fun parseFrontmatter(content: String): Pair<Map<String, Any>?, String> {
            val frontmatterRegex = Regex("^---\\n([\\s\\S]*?)\\n---\\n([\\s\\S]*)$")
            val match = frontmatterRegex.find(content)

            if (match == null) {
                return Pair(null, content)
            }

            val frontmatter = match.groupValues[1]
            val body = match.groupValues[2]

            val metadata = mutableMapOf<String, Any>()

            // Parse description
            Regex("^description:\\s*(.+)$", RegexOption.MULTILINE).find(frontmatter)?.let {
                metadata["description"] = it.groupValues[1].trim()
            }

            // Parse charNormalization
            Regex("^charNormalization:\\s*\"(.+)\"$", RegexOption.MULTILINE).find(frontmatter)?.let {
                metadata["charNormalization"] = it.groupValues[1]
            }

            // Parse ocrNormalizationRules (simple single-rule case)
            Regex("ocrNormalizationRules:\\n((?:\\s+-[^\\n]+\\n?)+)").find(frontmatter)?.let { rulesMatch ->
                val ruleText = rulesMatch.groupValues[1]
                val patternMatch = Regex("pattern:\\s*\"(.+)\"").find(ruleText)
                val replacementMatch = Regex("replacement:\\s*\"(.*)\"").find(ruleText)
                if (patternMatch != null && replacementMatch != null) {
                    metadata["ocrNormalizationRules"] = listOf(
                        mapOf(
                            "pattern" to patternMatch.groupValues[1],
                            "replacement" to replacementMatch.groupValues[1]
                        )
                    )
                }
            }

            return Pair(metadata.ifEmpty { null }, body)
        }

        /**
         * Convert parsed frontmatter to TextNormalizer.Metadata
         */
        private fun toMetadata(map: Map<String, Any>?): TextNormalizer.Metadata? {
            if (map == null) return null

            val charNorm = map["charNormalization"] as? String
            @Suppress("UNCHECKED_CAST")
            val ocrRules = (map["ocrNormalizationRules"] as? List<Map<String, String>>)?.map {
                TextNormalizer.OcrRule(it["pattern"]!!, it["replacement"]!!)
            }

            return if (charNorm != null || ocrRules != null) {
                TextNormalizer.Metadata(charNorm, ocrRules)
            } else {
                null
            }
        }

        @JvmStatic
        @Parameterized.Parameters(name = "{0}")
        fun loadFixtures(): Collection<Array<Any?>> {
            val fixturesDir = findFixturesDir()
            val files = fixturesDir.listFiles { file ->
                file.name.endsWith(".md") && file.name != "README.md"
            } ?: emptyArray()

            return files.map { file ->
                val expectedHash = file.nameWithoutExtension
                val content = file.readText()
                val (frontmatter, body) = parseFrontmatter(content)
                val description = (frontmatter?.get("description") as? String) ?: file.name
                val metadata = toMetadata(frontmatter)

                arrayOf<Any?>(
                    description,
                    expectedHash,
                    body.trimEnd(),
                    metadata
                )
            }
        }
    }

    @Test
    fun `hash should match filename`() {
        val normalized = TextNormalizer.normalizeText(body, metadata)
        val computedHash = TextNormalizer.sha256(normalized)

        assertEquals(
            "Hash mismatch for: $description",
            expectedHash,
            computedHash
        )
    }
}
