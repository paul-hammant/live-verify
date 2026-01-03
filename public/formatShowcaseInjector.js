/**
 * Format Showcase Injector
 * Cycles through different document format representations (Gmail, PDF, etc.)
 * with a 2-second delay between transitions
 */

function initFormatShowcase() {
    // Find all format showcase containers
    const showcases = document.querySelectorAll('[data-format-showcase]');

    showcases.forEach(showcase => {
        const formats = JSON.parse(showcase.getAttribute('data-format-showcase'));
        const docContent = showcase.getAttribute('data-doc-content') || '';
        const verifyLine = showcase.getAttribute('data-verify-line') || '';

        // Extract inner HTML if it exists (the mockup div)
        const innerMockup = showcase.innerHTML.trim();

        let currentFormatIndex = 0;
        const transitionDuration = 5000; // 5 seconds
        let countdownEl = null;

        const render = () => {
            const format = formats[currentFormatIndex];
            showcase.innerHTML = getFormatHtml(format, docContent, verifyLine, innerMockup);

            // Add countdown timer
            countdownEl = showcase.querySelector('[data-countdown]');
            if (countdownEl) {
                updateCountdown(0);
            }
        };

        const updateCountdown = (elapsed) => {
            if (!countdownEl) return;
            const remaining = transitionDuration - elapsed;
            const percentage = (remaining / transitionDuration) * 100;
            countdownEl.style.width = percentage + '%';
        };

        // Initial render
        render();

        // Rotation with countdown
        let startTime = Date.now();
        const rotationInterval = setInterval(() => {
            const now = Date.now();
            const elapsed = now - startTime;

            updateCountdown(elapsed);

            if (elapsed >= transitionDuration) {
                currentFormatIndex = (currentFormatIndex + 1) % formats.length;
                render();
                startTime = Date.now();
            }
        }, 50); // Update countdown every 50ms for smooth effect
    });
}

function getFormatHtml(format, docContent, verifyLine, innerMockup = '') {
    switch(format) {
        case 'gmail':
            return getGmailFormat(docContent, verifyLine, innerMockup);
        case 'pdf':
            return getPdfFormat(docContent, verifyLine, innerMockup);
        case 'email-attachment':
            return getEmailAttachmentFormat(docContent, verifyLine, innerMockup);
        case 'sms':
            return getSmsFormat(docContent, verifyLine, innerMockup);
        case 'whatsapp':
            return getWhatsAppFormat(docContent, verifyLine, innerMockup);
        case 'discord':
            return getDiscordFormat(docContent, verifyLine, innerMockup);
        default:
            return `<div>Unknown format: ${format}</div>`;
    }
}

function getGmailFormat(docContent, verifyLine, innerMockup = '') {
    const content = innerMockup || docContent;
    return `
    <div style="background: #f5f5f5; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0; font-family: Arial, sans-serif;">
        <!-- Countdown Bar -->
        <div style="height: 2px; background: #e8e8e8; overflow: hidden;">
            <div data-countdown style="height: 100%; background: linear-gradient(90deg, #4285f4, #1a73e8); width: 100%; transition: width 0.05s linear;"></div>
        </div>

        <!-- Gmail Header - Standardized Height 80px -->
        <div style="background: white; padding: 12px 16px; border-bottom: 1px solid #e8e8e8; min-height: 80px; display: flex; flex-direction: column; justify-content: center;">
            <div style="font-size: 14px; color: #202124;">
                <strong>From:</strong> <span style="color: #1a73e8;">sender@example.com</span>
            </div>
            <div style="font-size: 13px; color: #5f6368; margin-top: 4px;">
                <strong>Subject:</strong> Document Verification
            </div>
            <div style="font-size: 12px; color: #80868b; margin-top: 4px;">
                <strong>Date:</strong> Today at 9:42 AM
            </div>
        </div>

        <!-- Gmail Body with Mockup -->
        <div style="background: white; padding: 20px;">
            ${content}
        </div>

        <!-- Format Indicator -->
        <div style="background: #f5f5f5; padding: 8px 16px; border-top: 1px solid #ddd; font-size: 11px; color: #80868b; text-align: center;">
            📧 Gmail Format
        </div>
    </div>
    `;
}

function getPdfFormat(docContent, verifyLine, innerMockup = '') {
    const content = innerMockup || docContent;
    return `
    <div style="background: #fff; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow-x: hidden;">
        <!-- Countdown Bar -->
        <div style="height: 2px; background: #e8e8e8; overflow: hidden;">
            <div data-countdown style="height: 100%; background: linear-gradient(90deg, #d32f2f, #b71c1c); width: 100%; transition: width 0.05s linear;"></div>
        </div>

        <!-- PDF Header Bar - Standardized Height 80px -->
        <div style="background: #fff; padding: 12px 16px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; min-height: 80px;">
            <div style="font-size: 12px; color: #666; font-weight: 500;">
                📄 Document.pdf
            </div>
            <div style="font-size: 11px; color: #999;">
                Page 1 of 1
            </div>
        </div>

        <!-- PDF Document Content with Mockup -->
        <div style="background: #f9f9f9; padding: 20px; font-family: 'Times New Roman', Georgia, serif; color: #333; word-break: break-word; overflow-wrap: break-word; max-width: 100%; box-sizing: border-box;">
            ${content}
        </div>

        <!-- PDF Footer -->
        <div style="background: #f5f5f5; padding: 8px 16px; border-top: 1px solid #ddd; font-size: 11px; color: #80868b; text-align: center;">
            📄 PDF Format
        </div>
    </div>
    `;
}

function getEmailAttachmentFormat(docContent, verifyLine, innerMockup = '') {
    const content = innerMockup || docContent;
    return `
    <div style="background: #f5f5f5; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0; font-family: Arial, sans-serif;">
        <!-- Email Attachment Header -->
        <div style="background: white; padding: 16px; border-bottom: 1px solid #e8e8e8;">
            <div style="font-size: 13px; color: #202124; margin-bottom: 8px;">
                <strong>Attachment:</strong>
            </div>
            <div style="background: #f8f9fa; padding: 10px 12px; border: 1px solid #dadce0; border-radius: 4px; display: inline-block;">
                <span style="font-size: 13px; color: #1a73e8;">📎 AnnuityPricingCertification.eml</span>
                <span style="font-size: 11px; color: #80868b; margin-left: 8px;">(123 KB)</span>
            </div>
        </div>

        <!-- Email Content Preview -->
        <div style="background: white; padding: 20px; color: #202124; font-size: 13px;">
            <div style="border: 1px solid #e8e8e8; padding: 15px; border-radius: 4px; background: #fafafa; margin-bottom: 15px;">
                <div style="font-weight: bold; margin-bottom: 10px;">Email Header:</div>
                <div style="font-family: 'Courier New', monospace; font-size: 11px; color: #666;">
                    From: issuer@example.com<br>
                    To: holder@example.com<br>
                    Subject: Your Annuity Pricing Certification<br>
                    Date: ${new Date().toLocaleDateString()}
                </div>
            </div>

            <div style="border: 1px solid #e8e8e8; padding: 15px; background: #fffaf0; font-size: 12px; line-height: 1.6;">
                <strong>Embedded Certificate:</strong>
                <div style="margin-top: 10px; font-family: 'Courier New', monospace; font-size: 11px;">
                    ${docContent}
                </div>
                <div style="margin-top: 10px; padding: 8px; background: white; border-left: 3px solid #ff9800; padding-left: 10px;">
                    <span style="color: #f57c00; font-weight: bold;">▶ Verification:</span><br>
                    <span style="font-family: 'Courier New', monospace; font-size: 11px; color: #d84315;">${verifyLine}</span>
                </div>
            </div>
        </div>

        <!-- Format Indicator -->
        <div style="background: #f5f5f5; padding: 8px 16px; border-top: 1px solid #ddd; font-size: 11px; color: #80868b; text-align: center;">
            📧 Email Attachment Format
        </div>
    </div>
    `;
}

function getSmsFormat(docContent, verifyLine, innerMockup = '') {
    const content = innerMockup || docContent;
    return `
    <div style="background: #fff; border: 1px solid #ddd; border-radius: 12px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 400px;">
        <!-- Countdown Bar -->
        <div style="height: 2px; background: #e8e8e8; overflow: hidden; border-radius: 12px 12px 0 0;">
            <div data-countdown style="height: 100%; background: linear-gradient(90deg, #2196f3, #1976d2); width: 100%; transition: width 0.05s linear;"></div>
        </div>

        <!-- SMS Header - Standardized Height 80px -->
        <div style="background: #f5f5f5; padding: 12px 16px; border-bottom: 1px solid #ddd; border-radius: 12px 12px 0 0; min-height: 80px; display: flex; flex-direction: column; justify-content: center;">
            <div style="font-size: 13px; font-weight: 500; color: #202124;">
                📱 SMS Message
            </div>
            <div style="font-size: 11px; color: #80868b; margin-top: 4px;">
                From: +1 (555) 0123
            </div>
        </div>

        <!-- SMS Content -->
        <div style="padding: 16px; background: white; font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #202124;">
            ${content}
        </div>

        <!-- SMS Footer -->
        <div style="background: #f5f5f5; padding: 8px 16px; border-top: 1px solid #ddd; font-size: 10px; color: #80868b; text-align: center; border-radius: 0 0 12px 12px;">
            SMS Format
        </div>
    </div>
    `;
}

function getWhatsAppFormat(docContent, verifyLine, innerMockup = '') {
    const content = innerMockup || docContent;
    return `
    <div style="background: #ece5dd; border: 1px solid #ddd; border-radius: 12px; margin: 20px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <!-- Countdown Bar -->
        <div style="height: 2px; background: #d0d0d0; overflow: hidden; border-radius: 12px 12px 0 0;">
            <div data-countdown style="height: 100%; background: linear-gradient(90deg, #25d366, #20ba61); width: 100%; transition: width 0.05s linear;"></div>
        </div>

        <!-- WhatsApp Header - Standardized Height 80px -->
        <div style="background: #ece5dd; padding: 12px 16px; min-height: 80px; display: flex; flex-direction: row; align-items: center; justify-content: space-between; border-bottom: 1px solid #d0d0d0;">
            <div>
                <div style="font-size: 12px; color: #666; font-weight: 600;">Document Verification</div>
                <div style="font-size: 11px; color: #888; margin-top: 4px;">Last seen 2 hours ago</div>
            </div>
            <div style="font-size: 32px; line-height: 1; flex-shrink: 0;">💬</div>
        </div>

        <!-- WhatsApp Content with Mockup -->
        <div style="background: #ece5dd; padding: 12px;">
            <!-- Wrapped in a message bubble style -->
            <div style="background: white; padding: 10px 14px; border-radius: 18px; border-bottom-left-radius: 4px; margin-bottom: 8px; font-size: 13px; line-height: 1.4; color: #333;">
                ${content}
            </div>
        </div>

        <!-- WhatsApp Footer -->
        <div style="text-align: center; font-size: 10px; color: #888; padding: 8px; border-top: 1px solid #d0d0d0;">
            💬 WhatsApp Format
        </div>
    </div>
    `;
}

function getDiscordFormat(docContent, verifyLine, innerMockup = '') {
    const content = innerMockup || docContent;
    return `
    <div style="background: #36393f; border: 1px solid #202225; border-radius: 8px; margin: 20px 0; font-family: 'Segoe UI', Arial, sans-serif; color: #dcddde; overflow: hidden;">
        <!-- Countdown Bar -->
        <div style="height: 2px; background: #202225; overflow: hidden;">
            <div data-countdown style="height: 100%; background: linear-gradient(90deg, #5865f2, #4752c4); width: 100%; transition: width 0.05s linear;"></div>
        </div>

        <!-- Discord Header - Standardized Height 80px -->
        <div style="background: #2c2f33; padding: 12px 16px; border-bottom: 1px solid #202225; min-height: 80px; display: flex; flex-direction: column; justify-content: center;">
            <div style="font-size: 13px; font-weight: 500;">
                #verification-alerts
            </div>
            <div style="font-size: 11px; color: #72767d; margin-top: 4px;">
                Verification Bot — Today 3:45 PM
            </div>
        </div>

        <!-- Discord Message -->
        <div style="padding: 16px; background: #36393f;">
            <div style="display: flex; gap: 12px;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: #5865f2; flex-shrink: 0;"></div>
                <div style="flex: 1;">
                    <div style="font-weight: 500; font-size: 13px;">
                        Verification Bot
                        <span style="color: #72767d; font-size: 12px; font-weight: normal; margin-left: 4px;">BOT</span>
                    </div>
                    <div style="margin-top: 6px; font-size: 13px; line-height: 1.5; max-width: 500px;">
                        ${content}
                    </div>
                </div>
            </div>
        </div>

        <!-- Discord Footer -->
        <div style="background: #2c2f33; padding: 8px 16px; font-size: 11px; color: #72767d; text-align: center; border-top: 1px solid #202225;">
            🎮 Discord Message Format
        </div>
    </div>
    `;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormatShowcase);
} else {
    initFormatShowcase();
}
