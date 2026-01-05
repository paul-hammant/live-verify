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
 * Pure functions for app logic that can be tested with Jest
 */

/**
 * Rotate canvas by degrees (for orientation correction)
 * @param {HTMLCanvasElement} sourceCanvas - The source canvas to rotate
 * @param {number} degrees - Rotation angle (0, 90, 180, 270)
 * @returns {HTMLCanvasElement} - New rotated canvas
 */
function rotateCanvas(sourceCanvas, degrees) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Normalize degrees to 0, 90, 180, 270
    degrees = ((degrees % 360) + 360) % 360;

    // Swap dimensions for 90/270 degree rotations
    if (degrees === 90 || degrees === 270) {
        canvas.width = sourceCanvas.height;
        canvas.height = sourceCanvas.width;
    } else {
        canvas.width = sourceCanvas.width;
        canvas.height = sourceCanvas.height;
    }

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(degrees * Math.PI / 180);
    ctx.drawImage(sourceCanvas, -sourceCanvas.width / 2, -sourceCanvas.height / 2);

    return canvas;
}

/**
 * Extract verification URL from OCR raw text
 * Scans from bottom to top to find verify: or https line, discarding OCR garbage below it
 * @param {string} rawText - Raw OCR text
 * @returns {{url: string|null, urlLineIndex: number}} - Extracted base URL and its line index, or {url: null, urlLineIndex: -1} if not found
 */
function extractVerificationUrl(rawText) {
    const rawLines = rawText.split('\n').map(l => l.trim());

    // Match verify: or vfy: at line start OR preceded by space (to skip leading OCR garbage)
    const verifyPattern = /(^|\s)(verify|vfy):/i;

    // Scan from bottom to top to find the verify: or vfy: line
    // Everything below it is likely OCR garbage from dust/artifacts
    for (let i = rawLines.length - 1; i >= 0; i--) {
        const line = rawLines[i];
        if (!line) continue; // Skip empty lines

        const match = line.match(verifyPattern);
        if (match) {
            // Found a match - extract everything after the colon
            const colonIndex = line.indexOf(':', match.index);
            if (colonIndex === -1) continue;

            // Get text after colon - URL must start immediately (no space after colon)
            let urlPart = line.substring(colonIndex + 1);

            // Reject if there's a space immediately after the colon
            if (urlPart.length === 0 || /^\s/.test(urlPart)) {
                continue;
            }

            // Strip trailing garbage (anything after a space)
            const spaceIndex = urlPart.indexOf(' ');
            if (spaceIndex !== -1) {
                urlPart = urlPart.substring(0, spaceIndex);
            }

            if (urlPart.length > 0) {
                // Determine the correct prefix
                const prefix = match[2].toLowerCase() === 'vfy' ? 'vfy:' : 'verify:';

                return {
                    url: prefix + urlPart,
                    urlLineIndex: i
                };
            }
        }
    }

    // Expected failure: no verification URL found in OCR text
    return {
        url: null,
        urlLineIndex: -1
    };
}

/**
 * Convert verify: or vfy: URL to https:// URL with hash appended
 * @param {string} baseUrl - Base URL (either "verify:example.com/path", "vfy:example.com/path", or "https://example.com/path")
 * @param {string} hash - SHA-256 hash to append
 * @returns {string} - Full HTTPS verification URL
 */
function buildVerificationUrl(baseUrl, hash) {
    const lowerBase = baseUrl.toLowerCase();

    // If it starts with verify:, convert to https://
    if (lowerBase.startsWith('verify:')) {
        const withoutPrefix = baseUrl.substring(7); // Remove "verify:"
        return `https://${withoutPrefix}/${hash}`;
    }

    // If it starts with vfy:, convert to https://
    if (lowerBase.startsWith('vfy:')) {
        const withoutPrefix = baseUrl.substring(4); // Remove "vfy:"
        return `https://${withoutPrefix}/${hash}`;
    }

    // This should not be reached if extractVerificationUrl is working correctly
    throw new Error('Invalid base URL format. Must start with verify: or vfy:');
}

/**
 * Extract certification text from raw OCR text (everything before the URL line)
 * @param {string} rawText - Raw OCR text
 * @param {number} urlLineIndex - Index of the URL line
 * @returns {string} - Certification text (lines before URL, trailing blanks removed)
 */
function extractCertText(rawText, urlLineIndex) {
    const rawLines = rawText.split('\n').map(l => l.trim());

    // Get certification text - everything before the URL line
    // The verify:/vfy: line is NOT included in what gets hashed (normalized text)
    const certLines = rawLines.slice(0, urlLineIndex);

    // Remove trailing blank lines
    while (certLines.length > 0 && certLines[certLines.length - 1].trim() === '') {
        certLines.pop();
    }

    return certLines.join('\n');
}

/**
 * Check if computed hash matches the claimed URL
 * @param {string} claimedUrl - The claimed verification URL
 * @param {string} computedHash - The computed SHA-256 hash
 * @returns {boolean} - True if hash is found in URL
 */
function hashMatchesUrl(claimedUrl, computedHash) {
    return claimedUrl.includes(computedHash);
}

/**
 * Fetch verification-meta.json from the base URL
 * @param {string} baseUrl - Base URL (verify:, vfy:, or https://)
 * @returns {Promise<Object|null>} - Metadata object or null if not found
 */
async function fetchVerificMeta(baseUrl) {
    try {
        // Convert verify: or vfy: to https:// if needed
        let httpsBase = baseUrl;
        const lowerBase = baseUrl.toLowerCase();

        if (lowerBase.startsWith('verify:')) {
            httpsBase = `https://${baseUrl.substring(7)}`;
        } else if (lowerBase.startsWith('vfy:')) {
            httpsBase = `https://${baseUrl.substring(4)}`;
        }

        // Fetch verification-meta.json
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

// Export for Node.js testing (doesn't affect browser usage)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        rotateCanvas,
        extractVerificationUrl,
        extractCertText,
        hashMatchesUrl,
        buildVerificationUrl,
        fetchVerificMeta
    };
}
