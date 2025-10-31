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

// Test cases: screenshots from test/fixtures/screenshots/
// Tests verify OCR extraction, normalization, and hash computation
// Uses mock verification to avoid network dependencies - compares computed hash against expected hash
const testCases = [
    {
        screenshot: 'bachelor-thaumatology.png',
        expectedHash: '1cddfbb2adfa13e4562d274b59e56b946f174a0feb566622dd67a4880cf0b223',
        description: 'Bachelor of Thaumatology certificate'
    },
    {
        screenshot: 'bachelor-thaumatology-square.png',
        expectedHash: '1cddfbb2adfa13e4562d274b59e56b946f174a0feb566622dd67a4880cf0b223',
        description: 'Bachelor of Thaumatology (square format)'
    },
    {
        screenshot: 'master-applied-anthropics.png',
        expectedHash: '6725b845dcdf2490adf8d5f62e09e5f2055cb80c6200e5ccf58875c8190f4a80',
        description: 'Master of Applied Anthropics certificate'
    },
    {
        screenshot: 'doctorate-high-energy-magic.png',
        expectedHash: '09d1e6765c2dbd833e5a1f4770d9f0c9368224f7b1aed34de7a3bd5bf4d1f031',
        description: 'Doctorate in High Energy Magic certificate'
    },
    {
        screenshot: 'medical-license-revoked.png',
        expectedHash: 'b767b0558ebff1c2bc911fa69ce4e63fd7c2ba7ff7a540c6fa257a8fe6628f0a',
        description: 'Medical License certificate'
    },
    {
        screenshot: 'driving-license-nordia-svg.png',
        expectedHash: 'de34645330665a634d061e10b8368302f5d2745c0722f19b5d3b5418b326749a',
        description: 'Driving License (SVG-based)'
    },
    {
        screenshot: 'hotel-receipt-scheidegg.png',
        expectedHash: '5c8292f5d1aba28c24647068e1dba65c1baf2389eea3250533f588ca952354ed',
        description: 'Hotel receipt from Switzerland'
    },
    {
        screenshot: 'uk-coffee-shop.png',
        expectedHash: 'cb6e761f3a90513b526ffb903e9be30ddac89bb6672d0ad3bda028abeaf46c67',
        description: 'UK Coffee Shop receipt (£8.45)'
    },
    {
        screenshot: 'uk-corner-shop.png',
        expectedHash: '',
        description: 'UK Corner Shop receipt (£4.85)'
    },
    {
        screenshot: 'uk-electronics-store.png',
        expectedHash: '9b06b8cec89c0a4ce80ac1e64063ec7ae9533079b45c994aadbfe190ab0406c3',
        description: 'UK Electronics Store receipt (£847.99)'
    },
    {
        screenshot: 'us-burrito-shop.png',
        expectedHash: 'f4c1e2d19a42cb215c4d3321831b92fe77215711119c6c40323e58b20a84bcbb',
        description: 'US Burrito Shop receipt ($15.08)'
    },
    {
        screenshot: 'us-home-improvement.png',
        expectedHash: '6485a98b65e14360c778a20b415e01bb35e1cd3daa426b7db9580cf62835fb0e',
        description: 'US Home Improvement receipt ($680.40)'
    }
];

test.describe('Screenshot Verification Pipeline', () => {
    test.beforeEach(async ({ page }) => {
        // IMPORTANT: You must have a local server running before running these tests!
        // Start server with: cd public && python3 -m http.server 8000
        // Or use any other static file server on port 8000

        // Enable console logging for debugging
        page.on('console', msg => {
            if (msg.type() === 'error') {
                console.error(`[Browser Error] ${msg.text()}`);
            }
        });

        // Start local server or navigate to deployed app
        console.log('Navigating to http://localhost:8000/ (ensure server is running!)');
        await page.goto('http://localhost:8000/', { waitUntil: 'networkidle', timeout: 30000 });

        // Wait for page to fully load
        await page.waitForLoadState('domcontentloaded');

        // Check if dependencies are loading by looking at script tags
        const scriptsLoaded = await page.evaluate(() => {
            const scripts = Array.from(document.querySelectorAll('script[src]'));
            const loadedScripts = scripts.map(s => (s as HTMLScriptElement).src);
            console.log('Scripts on page:', loadedScripts);
            return loadedScripts;
        });
        console.log('Scripts loaded:', scriptsLoaded.length);

        // Wait for OpenCV, Tesseract, and app seams to load with better error reporting
        console.log('Waiting for OpenCV, Tesseract, and verificApp seams to load...');
        try {
            await page.waitForFunction(() => {
                const ready = {
                    cvReady: !!window.cvReady,
                    tesseract: !!window.Tesseract,
                    appSeams: !!window.verificApp && typeof window.verificApp.processImageCanvas === 'function'
                };
                if (!ready.cvReady || !ready.tesseract || !ready.appSeams) {
                    console.log('Waiting for dependencies:', ready);
                }
                return ready.cvReady && ready.tesseract && ready.appSeams;
            }, { timeout: 90000 }); // OpenCV + Tesseract can take time to load
            console.log('✅ All dependencies loaded');
        } catch (e) {
            // Debug: check what's actually available
            const debug = await page.evaluate(() => {
                return {
                    cvReady: !!window.cvReady,
                    tesseract: !!window.Tesseract,
                    appSeams: !!window.verificApp,
                    scripts: Array.from(document.querySelectorAll('script[src]')).map(s => (s as HTMLScriptElement).src)
                };
            });
            console.error('❌ Timeout waiting for dependencies. Current state:', debug);
            throw e;
        }
    });

    for (const testCase of testCases) {
        test(`should verify ${testCase.description}`, async ({ page }) => {
            // Base screenshots are in public/screenshots/ (shared with documentation)
            const screenshotPath = path.join(__dirname, '../public/screenshots', testCase.screenshot);

            // Check if screenshot exists
            if (!fs.existsSync(screenshotPath)) {
                test.skip(true, `Screenshot not found: ${screenshotPath}`);
                return;
            }

            // Load screenshot as base64
            const screenshotBuffer = fs.readFileSync(screenshotPath);
            const screenshotBase64 = screenshotBuffer.toString('base64');

            // Run verification pipeline using test helper
            const result = await testVerifyFromBase64(page, screenshotBase64, testCase.expectedHash);

            // Log result for debugging
            console.log(`[${testCase.description}]`, result);

            // Assert verification succeeded
            expect(result.success).toBe(true);

            // Assert hash matches expected (or discover it)
            if (testCase.expectedHash === '') {
                // Discovery mode: just log the hash for manual inspection
                console.log(`📋 DISCOVERED HASH for ${testCase.description}:`);
                console.log(`   expectedHash: '${result.hash}',`);
                console.log(`📄 NORMALIZED TEXT:`);
                console.log(result.normalized);
                console.log('---');
                // Still assert hash exists and is valid SHA-256 (64 hex chars)
                expect(result.hash).toMatch(/^[0-9a-f]{64}$/);
            } else {
                // Normal mode: assert hash matches expected
                expect(result.hash).toBe(testCase.expectedHash);
                // Assert mock verification confirmed the match
                expect(result.hashMatches).toBe(true);
            }

            // Assert normalized text is present
            expect(result.normalized).toBeTruthy();
            expect(result.normalized.length).toBeGreaterThan(0);
        });
    }
});
