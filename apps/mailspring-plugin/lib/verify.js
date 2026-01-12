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
 * Verification logic for Mailspring plugin
 * Uses Node.js crypto for SHA-256 hashing
 */

const crypto = require('crypto');

/**
 * Apply document-specific normalization rules from verification-meta.json
 */
function applyDocSpecificNorm(text, metadata) {
    if (!metadata) {
        return text;
    }

    let result = text;

    // 1. Apply character normalization (compact notation: "éèêë→e àáâä→a")
    if (metadata.charNormalization) {
        const groups = metadata.charNormalization.trim().split(/\s+/);
        for (const group of groups) {
            const parts = group.split('→');
            if (parts.length === 2 && parts[1].length === 1) {
                const sourceChars = parts[0];
                const targetChar = parts[1];
                for (const sourceChar of sourceChars) {
                    const regex = new RegExp(sourceChar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                    result = result.replace(regex, targetChar);
                }
            }
        }
    }

    // 2. Apply OCR normalization rules (regex patterns)
    if (metadata.ocrNormalizationRules && Array.isArray(metadata.ocrNormalizationRules)) {
        for (const rule of metadata.ocrNormalizationRules) {
            if (rule.pattern && rule.replacement) {
                try {
                    const regex = new RegExp(rule.pattern, 'g');
                    result = result.replace(regex, rule.replacement);
                } catch (e) {
                    console.error(`Invalid regex pattern: ${rule.pattern}`, e);
                }
            }
        }
    }

    return result;
}

/**
 * Normalize text according to verification rules
 */
function normalizeText(text, metadata = null) {
    // Apply document-specific normalization FIRST
    text = applyDocSpecificNorm(text, metadata);

    // Normalize Unicode characters
    text = text.replace(/[\u201C\u201D\u201E]/g, '"');  // Curly double quotes → straight
    text = text.replace(/[\u2018\u2019]/g, "'");        // Curly single quotes → straight
    text = text.replace(/[\u00AB\u00BB]/g, '"');        // Angle quotes → straight double
    text = text.replace(/[\u2013\u2014]/g, '-');        // En/em dash → hyphen
    text = text.replace(/\u00A0/g, ' ');                // Non-breaking space → space
    text = text.replace(/\u2026/g, '...');              // Ellipsis → three periods

    // Split into lines
    const lines = text.split('\n');

    // Apply normalization rules to each line
    const normalizedLines = lines.map(line => {
        line = line.replace(/^\s+/, '');    // Remove leading spaces
        line = line.replace(/\s+$/, '');    // Remove trailing spaces
        line = line.replace(/\s+/g, ' ');   // Collapse multiple spaces
        return line;
    })
    .filter(line => line.length > 0);       // Remove blank lines

    return normalizedLines.join('\n');
}

/**
 * SHA-256 hash function (Node.js)
 */
function sha256(text) {
    return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

/**
 * Extract verification URL from selected text
 */
function extractVerificationUrl(rawText) {
    const rawLines = rawText.split('\n').map(l => l.trim());
    const verifyPattern = /(^|\s)(verify|vfy)\s*:\s*/i;

    // Scan from bottom to top
    for (let i = rawLines.length - 1; i >= 0; i--) {
        const line = rawLines[i];
        if (!line) continue;

        const match = line.match(verifyPattern);
        if (match) {
            let urlPart = line.substring(match.index + match[0].length).trim();
            const spaceIndex = urlPart.indexOf(' ');
            if (spaceIndex !== -1) {
                urlPart = urlPart.substring(0, spaceIndex);
            }

            if (urlPart.length > 0) {
                const prefix = match[2].toLowerCase() === 'vfy' ? 'vfy:' : 'verify:';
                return { url: prefix + urlPart, urlLineIndex: i };
            }
        }
    }

    return { url: null, urlLineIndex: -1 };
}

/**
 * Extract certification text (everything before the URL line)
 */
function extractCertText(rawText, urlLineIndex) {
    const rawLines = rawText.split('\n').map(l => l.trim());
    const certLines = rawLines.slice(0, urlLineIndex);

    while (certLines.length > 0 && certLines[certLines.length - 1].trim() === '') {
        certLines.pop();
    }

    let certText = certLines.join('\n');
    certText = certText.replace(/^\s*\[\s*/, '');   // Leading [
    certText = certText.replace(/\s*\]\s*$/, '');   // Trailing ]

    return certText;
}

/**
 * Convert verify:/vfy: URL to https:// URL with hash appended
 */
function buildVerificationUrl(baseUrl, hash, meta) {
    const lowerBase = baseUrl.toLowerCase();
    const suffix = (meta && meta.appendToHashFileName) ? meta.appendToHashFileName : '';

    if (lowerBase.startsWith('verify:')) {
        return `https://${baseUrl.substring(7)}/${hash}${suffix}`;
    }

    if (lowerBase.startsWith('vfy:')) {
        return `https://${baseUrl.substring(4)}/${hash}${suffix}`;
    }

    throw new Error('Invalid base URL format. Must start with verify: or vfy:');
}

/**
 * Extract domain from verification URL
 */
function extractDomain(baseUrl) {
    const lowerBase = baseUrl.toLowerCase();
    let urlPart = baseUrl;

    if (lowerBase.startsWith('verify:')) {
        urlPart = baseUrl.substring(7);
    } else if (lowerBase.startsWith('vfy:')) {
        urlPart = baseUrl.substring(4);
    } else if (lowerBase.startsWith('https://')) {
        urlPart = baseUrl.substring(8);
    }

    const slashIndex = urlPart.indexOf('/');
    return slashIndex !== -1 ? urlPart.substring(0, slashIndex) : urlPart;
}

/**
 * Fetch verification-meta.json from the base URL
 */
async function fetchVerificationMeta(baseUrl) {
    try {
        const lowerBase = baseUrl.toLowerCase();
        let httpsBase = baseUrl;

        if (lowerBase.startsWith('verify:')) {
            httpsBase = `https://${baseUrl.substring(7)}`;
        } else if (lowerBase.startsWith('vfy:')) {
            httpsBase = `https://${baseUrl.substring(4)}`;
        }

        const metaUrl = `${httpsBase}/verification-meta.json`;
        const response = await fetch(metaUrl);

        if (response.status === 200) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.log('Could not fetch verification-meta.json:', error.message);
        return null;
    }
}

/**
 * Verify hash against issuer endpoint
 */
async function verifyHash(verificationUrl, meta) {
    const domain = new URL(verificationUrl).hostname;

    try {
        const response = await fetch(verificationUrl);

        if (!response.ok) {
            if (response.status === 404) {
                return { success: false, status: 'Hash not found', domain };
            }
            return { success: false, status: `HTTP ${response.status}`, domain };
        }

        const bodyText = (await response.text()).trim();

        if (bodyText === 'OK') {
            return { success: true, status: 'VERIFIED', domain };
        }

        try {
            const json = JSON.parse(bodyText);
            if (json.status) {
                const upperStatus = json.status.toUpperCase();
                if (upperStatus === 'OK' || upperStatus === 'VERIFIED') {
                    return { success: true, status: 'VERIFIED', domain };
                }

                if (meta?.responseTypes?.[upperStatus]) {
                    const typeInfo = meta.responseTypes[upperStatus];
                    if (typeInfo.class === 'affirming') {
                        return { success: true, status: upperStatus, domain };
                    } else {
                        return { success: false, status: typeInfo.text || upperStatus, domain };
                    }
                }

                return { success: false, status: upperStatus, domain };
            }
        } catch {
            if (meta?.responseTypes) {
                const upperBody = bodyText.toUpperCase();
                const typeInfo = meta.responseTypes[upperBody];
                if (typeInfo) {
                    if (typeInfo.class === 'affirming') {
                        return { success: true, status: upperBody, domain };
                    } else {
                        return { success: false, status: typeInfo.text || upperBody, domain };
                    }
                }
            }
        }

        if (bodyText) {
            return { success: false, status: bodyText.substring(0, 50), domain };
        }

        return { success: false, status: 'Empty response', domain };

    } catch (error) {
        return { success: false, status: `Network error: ${error.message}`, domain };
    }
}

/**
 * Main verification function - verifies selected text
 */
async function verifyText(selectedText) {
    const startTime = Date.now();

    const { url: baseUrl, urlLineIndex } = extractVerificationUrl(selectedText);

    if (!baseUrl) {
        return {
            success: false,
            error: 'No verify: or vfy: URL found in selection'
        };
    }

    const domain = extractDomain(baseUrl);
    const certText = extractCertText(selectedText, urlLineIndex);

    if (!certText.trim()) {
        return {
            success: false,
            error: 'No certification text found before verify URL',
            domain
        };
    }

    const meta = await fetchVerificationMeta(baseUrl);
    const normalizedText = normalizeText(certText, meta);
    const hash = sha256(normalizedText);
    const verificationUrl = buildVerificationUrl(baseUrl, hash, meta);
    const verifyResult = await verifyHash(verificationUrl, meta);

    const elapsed = Date.now() - startTime;

    return {
        success: verifyResult.success,
        status: verifyResult.status,
        domain: verifyResult.domain,
        hash,
        verificationUrl,
        certText,
        normalizedText,
        elapsed,
        timestamp: new Date().toISOString()
    };
}

module.exports = {
    normalizeText,
    sha256,
    extractVerificationUrl,
    extractCertText,
    buildVerificationUrl,
    extractDomain,
    fetchVerificationMeta,
    verifyHash,
    verifyText
};
