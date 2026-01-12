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

const React = require('react');
const { verifyText } = require('./verify');

/**
 * LiveVerify Button Component
 *
 * Adds a "Verify Claim" button to the message toolbar.
 * When clicked, verifies selected text against the issuer endpoint.
 */
class VerifyButton extends React.Component {
    static displayName = 'VerifyButton';

    constructor(props) {
        super(props);
        this.state = {
            isVerifying: false,
            result: null,
            showResult: false
        };
    }

    /**
     * Get the currently selected text from the document
     */
    getSelectedText() {
        const selection = document.getSelection();
        return selection ? selection.toString() : '';
    }

    /**
     * Handle verify button click
     */
    handleVerify = async () => {
        const selectedText = this.getSelectedText();

        if (!selectedText.trim()) {
            this.setState({
                result: {
                    success: false,
                    error: 'No text selected. Select claim text including the verify: URL.'
                },
                showResult: true
            });
            return;
        }

        this.setState({ isVerifying: true, showResult: true, result: null });

        try {
            const result = await verifyText(selectedText);
            this.setState({ result, isVerifying: false });
        } catch (error) {
            this.setState({
                result: {
                    success: false,
                    error: `Verification failed: ${error.message}`
                },
                isVerifying: false
            });
        }
    };

    /**
     * Close the result popover
     */
    handleClose = () => {
        this.setState({ showResult: false, result: null });
    };

    /**
     * Render the verification result
     */
    renderResult() {
        const { result, isVerifying } = this.state;

        if (isVerifying) {
            return (
                <div className="liveverify-result liveverify-pending">
                    <div className="liveverify-status">Verifying...</div>
                </div>
            );
        }

        if (!result) return null;

        const statusClass = result.success ? 'liveverify-verified' : 'liveverify-failed';
        const statusText = result.success ? 'VERIFIED' : (result.error || result.status || 'NOT VERIFIED');

        return (
            <div className={`liveverify-result ${statusClass}`}>
                <div className="liveverify-header">
                    <span className={`liveverify-badge ${result.success ? 'verified' : 'failed'}`}>
                        {result.success ? '\u2713' : '\u2717'}
                    </span>
                    <span className="liveverify-status">{statusText}</span>
                    <button className="liveverify-close" onClick={this.handleClose}>\u00D7</button>
                </div>

                {result.domain && (
                    <div className="liveverify-domain">
                        {result.success ? 'Verified by ' : 'Domain: '}
                        <strong>{result.domain}</strong>
                    </div>
                )}

                {result.certText && (
                    <div className="liveverify-section">
                        <div className="liveverify-label">Claim Text</div>
                        <div className="liveverify-text">{result.certText}</div>
                    </div>
                )}

                {result.hash && (
                    <div className="liveverify-section">
                        <div className="liveverify-label">SHA-256 Hash</div>
                        <div className="liveverify-hash">{result.hash}</div>
                    </div>
                )}

                {result.elapsed && (
                    <div className="liveverify-elapsed">
                        Verified in {result.elapsed}ms
                    </div>
                )}
            </div>
        );
    }

    render() {
        const { showResult } = this.state;

        return (
            <div className="liveverify-container">
                <button
                    className="btn btn-toolbar liveverify-btn"
                    onClick={this.handleVerify}
                    title="Verify selected claim text"
                >
                    <span className="liveverify-icon">\u2713</span>
                    Verify Claim
                </button>

                {showResult && (
                    <div className="liveverify-popover">
                        {this.renderResult()}
                    </div>
                )}
            </div>
        );
    }
}

module.exports = VerifyButton;
