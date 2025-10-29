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
 * UI State Machine Tests
 *
 * Tests the button visibility state transitions in the camera UI.
 * These tests verify the logic of state transitions by testing
 * the functions that manipulate button visibility.
 */

const fs = require('fs');
const path = require('path');

describe('UI State Machine - Code Analysis', () => {
    let appCode;

    beforeAll(() => {
        // Load the actual app code
        appCode = fs.readFileSync(path.join(__dirname, '..', 'public', 'app-url-based.js'), 'utf8');
    });

    describe('Initial state in HTML', () => {
        it('HTML should have retake button hidden by default', () => {
            const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');

            // Retake button should have style="display: none;" in HTML
            expect(html).toMatch(/<button[^>]*id="retakeBtn"[^>]*style="display:\s*none;"/);
        });

        it('HTML should have capture button hidden by default', () => {
            const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');

            // Capture button should have style="display: none;" in HTML
            expect(html).toMatch(/<button[^>]*id="captureBtn"[^>]*style="display:\s*none;"/);
        });

        it('HTML should have stop camera button disabled by default', () => {
            const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');

            // Stop camera button should be disabled
            expect(html).toMatch(/<button[^>]*id="stopCamera"[^>]*disabled/);
        });
    });

    describe('resetCameraUI function', () => {
        it('should exist and reset buttons to initial state', () => {
            // Verify the function exists
            expect(appCode).toMatch(/function resetCameraUI\(\)/);

            // Verify it sets startCameraBtn visible
            expect(appCode).toMatch(/resetCameraUI[\s\S]*?startCameraBtn\.style\.display = ''/);

            // Verify it hides captureBtn
            expect(appCode).toMatch(/resetCameraUI[\s\S]*?captureBtn\.style\.display = 'none'/);

            // Verify it hides retakeBtn
            expect(appCode).toMatch(/resetCameraUI[\s\S]*?retakeBtn\.style\.display = 'none'/);

            // Verify it disables stopCameraBtn
            expect(appCode).toMatch(/resetCameraUI[\s\S]*?stopCameraBtn\.disabled = true/);
        });
    });

    describe('Camera start button click handler', () => {
        it('should hide retake button when camera starts', () => {
            // Find the startCameraBtn click handler - need to match until the closing of the async function
            const startCameraHandler = appCode.match(/startCameraBtn\.addEventListener\('click', async \(\) => \{[\s\S]*?\n\}\);/);
            expect(startCameraHandler).not.toBeNull();

            const handlerCode = startCameraHandler[0];

            // Verify retakeBtn is hidden when camera starts (bug fix on line 246)
            expect(handlerCode).toMatch(/retakeBtn\.style\.display = 'none'/);

            // Should NOT show retake button
            expect(handlerCode).not.toMatch(/retakeBtn\.style\.display = ''\s*;/);
        });

        it('should show capture button when camera starts', () => {
            const startCameraHandler = appCode.match(/startCameraBtn\.addEventListener\('click', async \(\) => \{[\s\S]*?\n\}\);/);
            const handlerCode = startCameraHandler[0];

            // captureBtn should be shown
            expect(handlerCode).toMatch(/captureBtn\.style\.display = 'flex'/);
        });
    });

    describe('Capture button click handler - success path', () => {
        it('should show retake button after successful capture', () => {
            // Find the captureBtn click handler
            const captureHandler = appCode.match(/captureBtn\.addEventListener\('click',[\s\S]*?\n\}\);/);
            expect(captureHandler).not.toBeNull();

            const handlerCode = captureHandler[0];

            // Verify retakeBtn is shown after success (line 562)
            expect(handlerCode).toMatch(/retakeBtn\.style\.display = ''/);
        });
    });

    describe('Capture button click handler - error path', () => {
        it('should show retake button after processing error (bug fix)', () => {
            // Find the captureBtn click handler's catch block
            const captureHandler = appCode.match(/captureBtn\.addEventListener\('click',[\s\S]*?\n\}\);/);
            expect(captureHandler).not.toBeNull();

            const handlerCode = captureHandler[0];

            // Extract the catch block
            const catchBlock = handlerCode.match(/catch\s*\([^)]*\)\s*\{[\s\S]*?\n    \}/);
            expect(catchBlock).not.toBeNull();

            const catchCode = catchBlock[0];

            // Verify retakeBtn is shown in error handler (line 592 - bug fix)
            expect(catchCode).toMatch(/retakeBtn\.style\.display = ''/);

            // Should NOT have the old comment that said user needs to stop/restart
            expect(catchCode).not.toMatch(/Don't show button - user needs to stop\/restart camera/);
        });

        it('error handler should make retake button visible, not hidden', () => {
            const captureHandler = appCode.match(/captureBtn\.addEventListener\('click',[\s\S]*?\n\}\);/);
            const handlerCode = captureHandler[0];
            const catchBlock = handlerCode.match(/catch\s*\([^)]*\)\s*\{[\s\S]*?\n    \}/);
            const catchCode = catchBlock[0];

            // After error, retakeBtn must be visible (empty string, not 'none')
            const retakeDisplayMatch = catchCode.match(/retakeBtn\.style\.display = '([^']*)'/);
            expect(retakeDisplayMatch).not.toBeNull();
            expect(retakeDisplayMatch[1]).toBe(''); // Empty string = visible
        });
    });

    describe('Retake button click handler', () => {
        it('should hide retake button and show capture button', () => {
            // Find the retakeBtn click handler
            const retakeHandler = appCode.match(/retakeBtn\.addEventListener\('click',[\s\S]*?\}\);/);
            expect(retakeHandler).not.toBeNull();

            const handlerCode = retakeHandler[0];

            // Verify retakeBtn is hidden
            expect(handlerCode).toMatch(/retakeBtn\.style\.display = 'none'/);

            // Verify captureBtn is shown
            expect(handlerCode).toMatch(/captureBtn\.style\.display = 'flex'/);
        });

        it('should reset button text to "Retake"', () => {
            const retakeHandler = appCode.match(/retakeBtn\.addEventListener\('click',[\s\S]*?\}\);/);
            const handlerCode = retakeHandler[0];

            // Verify text is reset
            expect(handlerCode).toMatch(/retakeBtn\.textContent = 'Retake'/);
        });
    });

    describe('Successful verification flow', () => {
        it('should show verifyAnotherBtn and disclaimer on success', () => {
            // Find the verification success code (in verifyAgainstClaimedUrl function)
            const verifyFunction = appCode.match(/async function verifyAgainstClaimedUrl[\s\S]*?(?=\n\/\/|$)/);
            expect(verifyFunction).not.toBeNull();

            const functionCode = verifyFunction[0];

            // Look for the success case where it shows disclaimer and verify another button
            expect(functionCode).toMatch(/verificationDisclaimer\.style\.display = 'block'/);
            expect(functionCode).toMatch(/verifyAnotherBtn\.style\.display = 'inline-block'/);
        });
    });

    describe('State transitions count', () => {
        it('should have exactly 2 places that show retake button', () => {
            // Count occurrences of retakeBtn.style.display = ''
            const matches = appCode.match(/retakeBtn\.style\.display = ''/g);
            expect(matches).not.toBeNull();
            expect(matches.length).toBe(2); // Line 562 (success), line 592 (error)
        });

        it('should have exactly 4 places that hide retake button', () => {
            // Count occurrences of retakeBtn.style.display = 'none'
            const matches = appCode.match(/retakeBtn\.style\.display = 'none'/g);
            expect(matches).not.toBeNull();
            expect(matches.length).toBe(4); // resetCameraUI, startCamera handler, retake handler, verifyAnother handler
        });
    });
});
