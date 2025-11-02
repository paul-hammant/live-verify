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

// Expected text for assertions
const DRIVING_LICENSE_TEXT = `Licence No.: DL-NL-847629
surname: Bergstrom
Given Names: Karin
Date of Birth: 15 MAR 1987
Address: Hafjord 42, Nordia
sex: F
Issued: 22 JUN 2023
Expires: 21 JUN 2031
Permitted: AM, Al, A, B, C`;

// Deskewing pipeline:
// 1. Deskew (using OpenCV only) detects ~-5° angle → rotates by ~+5° → image is now at 180° (upside down but straight)
// 2. Tesseract tries OCR at 0°, 90°, 270°, 180° on that deskewed image
// 3. Tesseract finds best confidence at 180° rotation
// 4. Our code rotates the cropped canvas by 180° (verific-app.js line 436): cropped = rotateCanvas(cropped, 180)
// 5. The rotated canvas is saved to croppedImage.src (verific-app.js line 440)
// 6. Test keeps the text from the most confident rotation of #2 (the 180° OCR result) and the rotated image from #4

test.describe('Deskewing Functionality', () => {
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

    test('should deskew 175° rotated driving license', async ({ page }) => {
        const screenshotPath = path.join(__dirname, '../test/fixtures/screenshots/driving-license-nordia-svg-rotated-175.png');

        // Load screenshot as base64
        const screenshotBuffer = fs.readFileSync(screenshotPath);
        const screenshotBase64 = screenshotBuffer.toString('base64');

        // Run verification pipeline
        const result = await testVerifyFromBase64(page, screenshotBase64, '6d4d0801211cf98ccee9cd7caf0c32b62337a36f4d978f56238444ccd7ad462d');

        // Save cropped image for inspection
        if (result.croppedImageData) {
            const base64Data = result.croppedImageData.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');
            const outputPath = path.join(__dirname, '../tmp/cropped-deskew-175.png');
            fs.writeFileSync(outputPath, buffer);
            console.log(`💾 Saved deskewed cropped image to ${outputPath}`);
        }

        // Log result for debugging (omit croppedImageData - too verbose)
        const { croppedImageData, ...resultForLogging } = result;
        console.log('Result:', resultForLogging);

        // Assert verification succeeded
        expect(result.success).toBe(true);

        // Assert normalized text matches expected
        expect(result.normalized).toBe(DRIVING_LICENSE_TEXT);
    });
});
