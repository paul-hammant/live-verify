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

const { normalizeText } = require('../public/normalize.js');
const { cleanOcrArtifacts } = require('../public/ocr-cleanup.js');

// Helper that applies OCR cleanup then normalization (for OCR'd content)
const ocrNormalize = (text) => normalizeText(cleanOcrArtifacts(text));

describe('OCR Cleanup - Trailing Single Character Artifacts', () => {
    it('should remove trailing single character artifacts from OCR', () => {
        // Real example from MIT PhD credential OCR
        const extractedText = `Massachusetts Institute of Technology
Doctor of Philosophy in Computer Science
Hareld J Finch a
Dates: September 1980 - June 1985
Honors: Summa Cum Laude
Certificate Number : MIT-CS-PHD-1985-042
Registrar ID: REG-85-CSAIL-0142`;

        const normalized = ocrNormalize(extractedText);

        // The " a" should be removed from "Hareld J Finch a"
        expect(normalized).toContain('Hareld J Finch');
        expect(normalized).not.toContain('Hareld J Finch a');

        // Full expected output
        const expected = `Massachusetts Institute of Technology
Doctor of Philosophy in Computer Science
Hareld J Finch
Dates: September 1980 - June 1985
Honors: Summa Cum Laude
Certificate Number : MIT-CS-PHD-1985-042
Registrar ID: REG-85-CSAIL-0142`;

        expect(normalized).toBe(expected);
    });

    it('should remove trailing single letters that are OCR artifacts', () => {
        const testCases = [
            { input: 'John Doe a', expected: 'John Doe' },
            { input: 'Jane Smith b', expected: 'Jane Smith' },
            { input: 'Company Name x', expected: 'Company Name' },
            { input: 'Certificate 123 z', expected: 'Certificate 123' },
        ];

        testCases.forEach(({ input, expected }) => {
            const result = ocrNormalize(input);
            expect(result).toBe(expected);
        });
    });

    it('should NOT remove meaningful single letters at end of line', () => {
        // These should be preserved as they're meaningful (uppercase letters)
        // OCR cleanup only removes trailing lowercase letters
        const testCases = [
            'Appendix A',
            'Section B',
            'Grade A',
            'Plan B',
            'Vitamin D',
        ];

        testCases.forEach(input => {
            const result = ocrNormalize(input);
            expect(result).toBe(input);
        });
    });

    it('should remove multiple trailing single character artifacts', () => {
        const input = `Line one a
Line two b
Line three c`;

        const expected = `Line one
Line two
Line three`;

        const result = ocrNormalize(input);
        expect(result).toBe(expected);
    });
});
