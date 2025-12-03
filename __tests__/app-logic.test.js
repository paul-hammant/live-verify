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

// Mock canvas for testing (avoids need for jsdom)
class MockCanvas {
    constructor() {
        this.width = 0;
        this.height = 0;
    }
    getContext() {
        return {
            translate: jest.fn(),
            rotate: jest.fn(),
            drawImage: jest.fn()
        };
    }
}

// Mock document.createElement for canvas
global.document = {
    createElement: (tag) => {
        if (tag === 'canvas') {
            return new MockCanvas();
        }
        throw new Error(`Unexpected createElement: ${tag}`);
    }
};

const {
    rotateCanvas,
    extractVerificationUrl,
    extractCertText,
    hashMatchesUrl,
    buildVerificationUrl
} = require('../public/app-logic.js');

describe('App Logic - Pure Functions', () => {
    describe('rotateCanvas', () => {
        let sourceCanvas;

        beforeEach(() => {
            sourceCanvas = new MockCanvas();
            sourceCanvas.width = 100;
            sourceCanvas.height = 200;
        });

        it('should preserve dimensions at 0 degrees', () => {
            const rotated = rotateCanvas(sourceCanvas, 0);
            expect(rotated.width).toBe(100);
            expect(rotated.height).toBe(200);
        });

        it('should swap dimensions at 90 degrees', () => {
            const rotated = rotateCanvas(sourceCanvas, 90);
            expect(rotated.width).toBe(200);
            expect(rotated.height).toBe(100);
        });

        it('should preserve dimensions at 180 degrees', () => {
            const rotated = rotateCanvas(sourceCanvas, 180);
            expect(rotated.width).toBe(100);
            expect(rotated.height).toBe(200);
        });

        it('should swap dimensions at 270 degrees', () => {
            const rotated = rotateCanvas(sourceCanvas, 270);
            expect(rotated.width).toBe(200);
            expect(rotated.height).toBe(100);
        });

        it('should normalize 360 degrees to 0', () => {
            const rotated = rotateCanvas(sourceCanvas, 360);
            expect(rotated.width).toBe(100);
            expect(rotated.height).toBe(200);
        });

        it('should normalize 450 degrees to 90', () => {
            const rotated = rotateCanvas(sourceCanvas, 450);
            expect(rotated.width).toBe(200);
            expect(rotated.height).toBe(100);
        });

        it('should normalize negative degrees (-90 = 270)', () => {
            const rotated = rotateCanvas(sourceCanvas, -90);
            expect(rotated.width).toBe(200);
            expect(rotated.height).toBe(100);
        });

        it('should normalize negative degrees (-180)', () => {
            const rotated = rotateCanvas(sourceCanvas, -180);
            expect(rotated.width).toBe(100);
            expect(rotated.height).toBe(200);
        });

        it('should return a new canvas instance', () => {
            const rotated = rotateCanvas(sourceCanvas, 90);
            expect(rotated).not.toBe(sourceCanvas);
        });
    });

    describe('extractVerificationUrl', () => {


        it('should return null for http (not https)', () => {
            const rawText = `Text
http://example.com`;

            const result = extractVerificationUrl(rawText);
            expect(result.url).toBeNull();
            expect(result.urlLineIndex).toBe(-1);
        });

        it('should accept verify: URLs', () => {
            const rawText = `Certification text
verify:paul-hammant.github.io/live-verify/c`;

            const result = extractVerificationUrl(rawText);
            expect(result.url).toBe('verify:paul-hammant.github.io/live-verify/c');
            expect(result.urlLineIndex).toBe(1);
        });

        it('should remove spaces from verify: URL', () => {
            const rawText = `Text
v e r i f y : e x a m p l e . c o m / v e r i f i c`;

            const result = extractVerificationUrl(rawText);
            expect(result.url).toBe('verify:example.com/verification');
        });

        it('should accept VERIFY: in any case', () => {
            const rawText = `Text
VERIFY:EXAMPLE.COM/PATH`;

            const result = extractVerificationUrl(rawText);
            expect(result.url).toBe('VERIFY:EXAMPLE.COM/PATH');
        });

        it('should discard OCR garbage below verify: line (real-world example)', () => {
            const rawText = `Unseen University |
Ankh-Morpork
Bachelor of Thaumatology
Awarded to: Ponder Stibbons
Date: Grune 23, A.M. 2024
Archchancellor: Mustrum Ridcully
Registrar: Rincewind (Wizzard)
verify:paul-hammant.github.io/live-verify/c
ee a SE AA i Aa A A Re Xe NE Ne ea`;

            const result = extractVerificationUrl(rawText);
            expect(result.url).toBe('verify:paul-hammant.github.io/live-verify/c');
            expect(result.urlLineIndex).toBe(7);
        });

        // vfy: prefix tests (shortened alternative to verify:)
        it('should accept vfy: URLs', () => {
            const rawText = `Certification text
vfy:paul-hammant.github.io/live-verify/c`;

            const result = extractVerificationUrl(rawText);
            expect(result.url).toBe('vfy:paul-hammant.github.io/live-verify/c');
            expect(result.urlLineIndex).toBe(1);
        });

        it('should remove spaces from vfy: URL', () => {
            const rawText = `Text
v f y : e x a m p l e . c o m / v e r i f i c`;

            const result = extractVerificationUrl(rawText);
            expect(result.url).toBe('vfy:example.com/verification');
        });

        it('should accept VFY: in any case', () => {
            const rawText = `Text
VFY:EXAMPLE.COM/PATH`;

            const result = extractVerificationUrl(rawText);
            expect(result.url).toBe('VFY:EXAMPLE.COM/PATH');
        });

        it('should accept vfy: in mixed case', () => {
            const rawText = `Text
VfY:example.com/path`;

            const result = extractVerificationUrl(rawText);
            expect(result.url).toBe('VfY:example.com/path');
        });

        it('should discard OCR garbage below vfy: line', () => {
            const rawText = `Unseen University
Bachelor of Thaumatology
Awarded to: Ponder Stibbons
vfy:paul-hammant.github.io/live-verify/c
random OCR garbage text`;

            const result = extractVerificationUrl(rawText);
            expect(result.url).toBe('vfy:paul-hammant.github.io/live-verify/c');
            expect(result.urlLineIndex).toBe(3);
        });
    });

    describe('extractCertText', () => {
        it('should extract text before URL line', () => {
            const rawText = `Line 1
Line 2
Line 3
https://example.com`;

            const result = extractCertText(rawText, 3);
            expect(result).toBe('Line 1\nLine 2\nLine 3');
        });

        it('should remove trailing blank lines from cert text', () => {
            const rawText = `Line 1
Line 2


https://example.com`;

            const result = extractCertText(rawText, 4);
            expect(result).toBe('Line 1\nLine 2');
        });

        it('should handle cert text with no trailing blanks', () => {
            const rawText = `Line 1
Line 2
https://example.com`;

            const result = extractCertText(rawText, 2);
            expect(result).toBe('Line 1\nLine 2');
        });

        it('should handle single line cert text', () => {
            const rawText = `Single Line
https://example.com`;

            const result = extractCertText(rawText, 1);
            expect(result).toBe('Single Line');
        });

        it('should handle empty cert text (URL on first line)', () => {
            const rawText = `https://example.com`;

            const result = extractCertText(rawText, 0);
            expect(result).toBe('');
        });

        it('should preserve blank lines within cert text', () => {
            const rawText = `Line 1

Line 3
https://example.com`;

            const result = extractCertText(rawText, 3);
            expect(result).toBe('Line 1\n\nLine 3');
        });
    });

    describe('hashMatchesUrl', () => {
        const hash = '09d1e6765c2dbd833e5a1f4770d9f0c9368224f7b1aed34de7a3bd5bf4d1f031';

        it('should return true when hash is in URL', () => {
            const url = `https://example.com/c/${hash}`;
            expect(hashMatchesUrl(url, hash)).toBe(true);
        });

        it('should return false when hash is not in URL', () => {
            const url = 'https://example.com/c/differenthash123';
            expect(hashMatchesUrl(url, hash)).toBe(false);
        });

        it('should return false for empty URL', () => {
            expect(hashMatchesUrl('', hash)).toBe(false);
        });

        it('should handle partial hash matches correctly', () => {
            const partialHash = '09d1e676';
            const url = `https://example.com/c/${hash}`;
            expect(hashMatchesUrl(url, partialHash)).toBe(true);
        });

        it('should be case sensitive', () => {
            const upperHash = hash.toUpperCase();
            const url = `https://example.com/c/${hash}`;
            expect(hashMatchesUrl(url, upperHash)).toBe(false);
        });
    });

    describe('buildVerificationUrl', () => {
        const hash = '09d1e6765c2dbd833e5a1f4770d9f0c9368224f7b1aed34de7a3bd5bf4d1f031';

        it('should convert verify: to https:// and append hash', () => {
            const baseUrl = 'verify:paul-hammant.github.io/live-verify/c';
            const result = buildVerificationUrl(baseUrl, hash);
            expect(result).toBe(`https://paul-hammant.github.io/live-verify/c/${hash}`);
        });


        it('should handle VERIFY: in uppercase', () => {
            const baseUrl = 'VERIFY:example.com/path';
            const result = buildVerificationUrl(baseUrl, hash);
            expect(result).toBe(`https://example.com/path/${hash}`);
        });

        it('should handle verify: with mixed case', () => {
            const baseUrl = 'VeRiFy:example.com/path';
            const result = buildVerificationUrl(baseUrl, hash);
            expect(result).toBe(`https://example.com/path/${hash}`);
        });

        it('should preserve case in domain and path', () => {
            const baseUrl = 'verify:Example.COM/VeRiFiC';
            const result = buildVerificationUrl(baseUrl, hash);
            expect(result).toBe(`https://Example.COM/VeRiFiC/${hash}`);
        });

        it('should handle verify: without trailing slash', () => {
            const baseUrl = 'verify:example.com';
            const result = buildVerificationUrl(baseUrl, hash);
            expect(result).toBe(`https://example.com/${hash}`);
        });

        // vfy: prefix tests
        it('should convert vfy: to https:// and append hash', () => {
            const baseUrl = 'vfy:paul-hammant.github.io/live-verify/c';
            const result = buildVerificationUrl(baseUrl, hash);
            expect(result).toBe(`https://paul-hammant.github.io/live-verify/c/${hash}`);
        });

        it('should handle VFY: in uppercase', () => {
            const baseUrl = 'VFY:example.com/path';
            const result = buildVerificationUrl(baseUrl, hash);
            expect(result).toBe(`https://example.com/path/${hash}`);
        });

        it('should handle vfy: with mixed case', () => {
            const baseUrl = 'VfY:example.com/path';
            const result = buildVerificationUrl(baseUrl, hash);
            expect(result).toBe(`https://example.com/path/${hash}`);
        });

        it('should preserve case in domain and path for vfy:', () => {
            const baseUrl = 'vfy:Example.COM/VeRiFiC';
            const result = buildVerificationUrl(baseUrl, hash);
            expect(result).toBe(`https://Example.COM/VeRiFiC/${hash}`);
        });

        it('should handle vfy: without trailing slash', () => {
            const baseUrl = 'vfy:example.com';
            const result = buildVerificationUrl(baseUrl, hash);
            expect(result).toBe(`https://example.com/${hash}`);
        });

        it('should correctly remove exactly 4 characters from vfy: prefix', () => {
            // vfy: is 4 characters, verify: is 7 characters
            const vfyUrl = 'vfy:domain.com/path';
            const verifyUrl = 'verify:domain.com/path';

            const vfyResult = buildVerificationUrl(vfyUrl, hash);
            const verifyResult = buildVerificationUrl(verifyUrl, hash);

            // Both should produce the same https URL
            expect(vfyResult).toBe(`https://domain.com/path/${hash}`);
            expect(verifyResult).toBe(`https://domain.com/path/${hash}`);
            expect(vfyResult).toBe(verifyResult);
        });
    });
});
