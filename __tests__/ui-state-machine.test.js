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
        appCode = fs.readFileSync(path.join(__dirname, '..', 'public', 'live-verify-app.js'), 'utf8');
    });

    describe('Initial state in HTML', () => {
        it('HTML should have retake button hidden by default', () => {
            const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'camera-app', 'index.html'), 'utf8');

            // Retake button should have style="display: none;" in HTML
            expect(html).toMatch(/<button[^>]*id="retakeBtn"[^>]*style="display:\s*none;"/);
        });

        it('HTML should have capture button hidden by default', () => {
            const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'camera-app', 'index.html'), 'utf8');

            // Capture button should have style="display: none;" in HTML
            expect(html).toMatch(/<button[^>]*id="captureBtn"[^>]*style="display:\s*none;"/);
        });

        it('HTML should have stop camera button disabled by default', () => {
            const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'camera-app', 'index.html'), 'utf8');

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
        it('should hide capture button during processing', () => {
            // Find the captureBtn click handler
            const captureHandler = appCode.match(/captureBtn\.addEventListener\('click',[\s\S]*?\n\}\);/);
            expect(captureHandler).not.toBeNull();

            const handlerCode = captureHandler[0];

            // Capture button should be hidden while processing
            expect(handlerCode).toMatch(/captureBtn\.style\.display = 'none'/);
        });
    });

    describe('Capture button click handler - error path', () => {
        it('should show failure overlay after processing error', () => {
            // Find the captureBtn click handler's catch block
            const captureHandler = appCode.match(/captureBtn\.addEventListener\('click',[\s\S]*?\n\}\);/);
            expect(captureHandler).not.toBeNull();

            const handlerCode = captureHandler[0];

            // Error handler should surface failure to the user (retake becomes visible after failure overlay tap)
            expect(handlerCode).toMatch(/showFailureOverlay\('Processing error'\)/);
        });

        it('failure overlay tap handler should show retake button', () => {
            const failureOverlayHandler = appCode.match(/failureOverlay\.addEventListener\('click',[\s\S]*?\n\}\);/);
            expect(failureOverlayHandler).not.toBeNull();

            const handlerCode = failureOverlayHandler[0];
            expect(handlerCode).toMatch(/retakeBtn\.style\.display = ''/);
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
    });

    describe('Successful verification flow', () => {
        it('should show success overlay on OK response', () => {
            // Find the verification success code (in verifyAgainstClaimedUrl function)
            const verifyFunction = appCode.match(/async function verifyAgainstClaimedUrl[\s\S]*?(?=\n\/\/|$)/);
            expect(verifyFunction).not.toBeNull();

            const functionCode = verifyFunction[0];

            // Success path should trigger camera-native overlay UX
            expect(functionCode).toMatch(/showSuccessOverlay\(authority\)/);
        });
    });

    describe('State transitions count', () => {
        it('should have exactly 1 place that shows retake button', () => {
            // Count occurrences of retakeBtn.style.display = ''
            const matches = appCode.match(/retakeBtn\.style\.display = ''/g);
            expect(matches).not.toBeNull();
            expect(matches.length).toBe(1); // Failure overlay tap handler
        });

        it('should have exactly 5 places that hide retake button', () => {
            // Count occurrences of retakeBtn.style.display = 'none'
            const matches = appCode.match(/retakeBtn\.style\.display = 'none'/g);
            expect(matches).not.toBeNull();
            expect(matches.length).toBe(5);
        });
    });
});
