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

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { testVerifyFromBase64 } from './test-helpers.js';

// Configure longer timeout for these tests (OCR can be slow)
test.setTimeout(120000); // 2 minutes per test

test.describe('OCR Character Normalization', () => {
    test.beforeEach(async ({ page }) => {
        // Enable console logging for debugging
        page.on('console', msg => {
            if (msg.type() === 'error') {
                console.error(`[Browser Error] ${msg.text()}`);
            }
        });

        // Start local server
        console.log('Navigating to http://localhost:8000/ (ensure server is running!)');
        await page.goto('http://localhost:8000/', { waitUntil: 'networkidle', timeout: 30000 });

        // Wait for dependencies
        console.log('Waiting for OpenCV, Tesseract, and verificApp seams to load...');
        await page.waitForFunction(() => {
            const ready = {
                cvReady: !!window.cvReady,
                tesseract: !!window.Tesseract,
                appSeams: !!window.verificApp && typeof window.verificApp.processImageCanvas === 'function'
            };
            return ready.cvReady && ready.tesseract && ready.appSeams;
        }, { timeout: 90000 });
        console.log('✅ All dependencies loaded');
    });

    test('should normalize German characters in hotel receipt', async ({ page }) => {
        const screenshotPath = path.join(__dirname, '../public/screenshots/hotel-receipt-scheidegg.png');

        // Load screenshot as base64
        const screenshotBuffer = fs.readFileSync(screenshotPath);
        const screenshotBase64 = screenshotBuffer.toString('base64');

        // Inject OCR normalization rules from .verific-meta.json
        // Note: OCR may misread German umlauts as other accented characters
        const injectedMeta = {
            "description": "Test .verific-meta.json for hotel receipts with Swiss Franc formatting",
            "charNormalization": "éèêë→e àáâä→a ìíîï→i òóôö→o ùúûü→u ñ→n ç→c",
            "ocrNormalizationRules": [
                {
                    "pattern": "CHF\\s+(\\d)",
                    "replacement": "CHF$1",
                    "description": "Remove space between CHF currency code and amount"
                }
            ]
        };

        // Expected normalized text (with é→e and CHF space removed)
        const expectedNormalizedText = `Rech. Nr. 4572 30.07.2007/13:29:17
Bar Tisch 7/01
2x Latte Macchiato a 4.50 CHF9.00
1x Gloki a 5.00 CHF5.00
1x Schweinschnitzel a 22.00 CHF22.00
1x Cheasspatzli a 18.50 CHF18.50
Total: CHF54.50
Incl. 7.6% MwSt 54.50 CHF: 3.85
Entspricht in Euro 36.33 EUR`;

        // Run verification pipeline
        const result = await testVerifyFromBase64(page, screenshotBase64, '', injectedMeta);

        // Log for debugging
        console.log('📄 Normalized text:', result.normalized);
        console.log('📄 Raw text:', result.rawText);

        // Assert verification succeeded
        expect(result.success).toBe(true);
        expect(result.normalized).toBe(expectedNormalizedText);
        expect(result.baseUrl).toBe('vfy:rcpt.bergwelt-grindelwald.com');

        // Verify that OCR normalization was applied (é → e in Chéasspatzli → Cheasspatzli)
        expect(result.normalized).toContain('Cheasspatzli');
        expect(result.rawText).toContain('Chéasspatzli');
    });
});
