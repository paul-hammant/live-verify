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

const fs = require('fs');
const path = require('path');
const { normalizeText, sha256 } = require('../public/normalize.js');
const { cleanOcrArtifacts } = require('../public/ocr-cleanup.js');

const FIXTURES_DIR = path.join(__dirname, '..', 'normalization-hashes');

/**
 * Parse YAML-like frontmatter from markdown file
 * Simple parser - handles description, charNormalization, and ocrNormalizationRules
 */
function parseFrontmatter(content) {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

    if (!frontmatterMatch) {
        return { metadata: null, body: content };
    }

    const frontmatter = frontmatterMatch[1];
    const body = frontmatterMatch[2];

    const metadata = {};

    // Parse description
    const descMatch = frontmatter.match(/^description:\s*(.+)$/m);
    if (descMatch) {
        metadata.description = descMatch[1].trim();
    }

    // Parse charNormalization
    const charNormMatch = frontmatter.match(/^charNormalization:\s*"(.+)"$/m);
    if (charNormMatch) {
        metadata.charNormalization = charNormMatch[1];
    }

    // Parse ocrNormalizationRules (simple single-rule case)
    const ocrRulesMatch = frontmatter.match(/ocrNormalizationRules:\n((?:\s+-[^\n]+\n?)+)/);
    if (ocrRulesMatch) {
        const rules = [];
        const ruleText = ocrRulesMatch[1];
        const patternMatch = ruleText.match(/pattern:\s*"(.+)"/);
        const replacementMatch = ruleText.match(/replacement:\s*"(.*)"/);
        if (patternMatch && replacementMatch) {
            rules.push({
                pattern: patternMatch[1],
                replacement: replacementMatch[1]
            });
        }
        if (rules.length > 0) {
            metadata.ocrNormalizationRules = rules;
        }
    }

    return {
        metadata: Object.keys(metadata).length > 0 ? metadata : null,
        body
    };
}

/**
 * Extract image path from markdown image syntax ![](path.png)
 */
function extractImagePath(body) {
    const match = body.trim().match(/^!\[\]\((.+)\)$/);
    return match ? match[1] : null;
}

/**
 * Load all fixture files from normalization-hashes directory
 */
function loadFixtures() {
    const files = fs.readdirSync(FIXTURES_DIR)
        .filter(f => f.endsWith('.md') && f !== 'README.md');

    return files.map(filename => {
        const expectedHash = filename.replace('.md', '');
        const content = fs.readFileSync(path.join(FIXTURES_DIR, filename), 'utf8');
        const { metadata, body } = parseFrontmatter(content);

        // Check if this is an image fixture
        const imagePath = extractImagePath(body);

        return {
            filename,
            expectedHash,
            body: body.trimEnd(), // Remove trailing newline from file
            metadata,
            description: metadata?.description || filename,
            imagePath: imagePath ? path.join(FIXTURES_DIR, imagePath) : null
        };
    });
}

/**
 * Perform OCR on an image file using Tesseract.js
 */
async function ocrImage(imagePath) {
    const Tesseract = require('tesseract.js');
    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
    return text;
}

describe('Cross-Platform Hash Consistency', () => {
    const fixtures = loadFixtures();
    const textFixtures = fixtures.filter(f => !f.imagePath);
    const imageFixtures = fixtures.filter(f => f.imagePath);

    describe('Text fixtures (normalize → hash)', () => {
        test.each(textFixtures)(
            '$description',
            ({ expectedHash, body, metadata }) => {
                const normalized = normalizeText(body, metadata);
                const computedHash = sha256(normalized);

                expect(computedHash).toBe(expectedHash);
            }
        );
    });

    // Image fixtures: Tesseract.js is inferior to ML Kit/Vision, so these are
    // informational only for JS. Android and iOS tests do the real assertions.
    describe('Image fixtures (OCR → normalize → hash) [informational]', () => {
        test.each(imageFixtures.length ? imageFixtures : [{ description: 'no image fixtures yet', skip: true }])(
            '$description',
            async ({ expectedHash, imagePath, metadata, skip, description }) => {
                if (skip) {
                    return; // No image fixtures yet
                }

                // OCR the image
                const ocrText = await ocrImage(imagePath);

                // Clean OCR artifacts, then normalize
                const cleaned = cleanOcrArtifacts(ocrText);
                const normalized = normalizeText(cleaned, metadata);
                const computedHash = sha256(normalized);

                // Log results for comparison - Tesseract.js may differ from ML Kit/Vision
                if (computedHash !== expectedHash) {
                    console.log(`\n[${description}] Tesseract.js hash differs (expected from ML Kit/Vision):`);
                    console.log(`  Expected: ${expectedHash}`);
                    console.log(`  Got:      ${computedHash}`);
                    console.log(`  Normalized text:\n${normalized.split('\n').map(l => '    ' + l).join('\n')}`);
                }

                // Don't fail - Tesseract.js OCR quality is inferior to native mobile OCR
                // This test is informational only; Android/iOS tests are authoritative
            }
        , 60000); // 60s timeout for OCR
    });

    it('should have loaded at least 5 text fixtures', () => {
        expect(textFixtures.length).toBeGreaterThanOrEqual(5);
    });
});
