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
 * LiveVerify Mailspring Plugin - Main Entry Point
 *
 * Adds a "Verify Claim" button to the message toolbar that verifies
 * selected text against issuer endpoints.
 */

const VerifyButton = require('./verify-button.jsx');

module.exports = {
    /**
     * Called when the plugin is activated
     */
    activate() {
        // Register the verify button in the message viewer toolbar
        ComponentRegistry.register(VerifyButton, {
            role: 'MessageListHeaders'
        });

        // Also register for thread toolbar (when viewing a thread)
        ComponentRegistry.register(VerifyButton, {
            role: 'message:BodyHeader'
        });
    },

    /**
     * Called to serialize plugin state (not used)
     */
    serialize() {
        return {};
    },

    /**
     * Called when the plugin is deactivated
     */
    deactivate() {
        ComponentRegistry.unregister(VerifyButton);
    }
};
