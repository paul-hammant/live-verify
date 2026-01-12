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
 * Verification logic for Thunderbird extension
 * Adapted for Thunderbird MailExtension (no ES modules)
 */

/**
 * Extract verification URL from selected text
 * Scans from bottom to top to find verify: or vfy: line
 * @param {string} rawText - Raw selected text
 * @returns {{url: string|null, urlLineIndex: number}}
 */
function extractVerificationUrl(rawText) {
    const rawLines = rawText.split('\n').map(l => l.trim());

    // Match verify: or vfy: with optional spaces around colon
    const verifyPattern = /(^|\s)(verify|vfy)\s*:\s*/i;

    // Scan from bottom to top
    for (let i = rawLines.length - 1; i >= 0; i--) {
        const line = rawLines[i];
        if (!line) continue;

        const match = line.match(verifyPattern);
        if (match) {
            let urlPart = line.substring(match.index + match[0].length).trim();

            // Strip trailing garbage after space
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
 * Also strips [ and ] bracket markers used for visual cues
 * @param {string} rawText - Raw selected text
 * @param {number} urlLineIndex - Index of the URL line
 * @returns {string} Certification text
 */
function extractCertText(rawText, urlLineIndex) {
    const rawLines = rawText.split('\n').map(l => l.trim());
    const certLines = rawLines.slice(0, urlLineIndex);

    // Remove trailing blank lines
    while (certLines.length > 0 && certLines[certLines.length - 1].trim() === '') {
        certLines.pop();
    }

    let certText = certLines.join('\n');

    // Strip [ and ] bracket markers (visual cues for users)
    // These appear at start of verifiable text and end (before verify: line)
    certText = certText.replace(/^\s*\[\s*/, '');  // Leading [
    certText = certText.replace(/\s*\]\s*$/, '');  // Trailing ]

    return certText;
}

/**
 * Convert verify:/vfy: URL to https:// URL with hash appended
 * @param {string} baseUrl - Base URL
 * @param {string} hash - SHA-256 hash
 * @param {Object} [meta] - Optional verification-meta.json
 * @returns {string} Full HTTPS verification URL
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
 * @param {string} baseUrl - Base URL (verify:, vfy:, or https://)
 * @returns {string} Domain name
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

    // Extract domain (everything before first /)
    const slashIndex = urlPart.indexOf('/');
    return slashIndex !== -1 ? urlPart.substring(0, slashIndex) : urlPart;
}

/**
 * Fetch verification-meta.json from the base URL
 * @param {string} baseUrl - Base URL
 * @returns {Promise<Object|null>} Metadata or null
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
 * @param {string} verificationUrl - Full verification URL
 * @param {Object} meta - Optional metadata for response interpretation
 * @returns {Promise<{success: boolean, status: string, domain: string}>}
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

        // Check for simple "OK" response
        if (bodyText === 'OK') {
            return { success: true, status: 'VERIFIED', domain };
        }

        // Try to parse as JSON
        try {
            const json = JSON.parse(bodyText);
            if (json.status) {
                const upperStatus = json.status.toUpperCase();
                if (upperStatus === 'OK' || upperStatus === 'VERIFIED') {
                    return { success: true, status: 'VERIFIED', domain };
                }

                // Check custom responseTypes from meta
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
            // Not JSON, check plain text against responseTypes
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

        // Default for non-OK body
        if (bodyText) {
            return { success: false, status: bodyText.substring(0, 50), domain };
        }

        return { success: false, status: 'Empty response', domain };

    } catch (error) {
        return { success: false, status: `Network error: ${error.message}`, domain };
    }
}
