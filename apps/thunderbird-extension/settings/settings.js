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

document.addEventListener('DOMContentLoaded', async () => {
    const savedMessage = document.getElementById('savedMessage');
    const options = document.querySelectorAll('.option');

    // Load saved settings
    let settings = { intrusiveness: 'maximum' };

    try {
        const result = await browser.storage.sync.get('settings');
        if (result.settings) {
            settings = { ...settings, ...result.settings };
        }
    } catch {
        // Fall back to local storage
        try {
            const result = await browser.storage.local.get('settings');
            if (result.settings) {
                settings = { ...settings, ...result.settings };
            }
        } catch (e) {
            console.error('Failed to load settings:', e);
        }
    }

    // Apply saved settings to UI
    applySettings(settings);

    // Handle intrusiveness radio changes
    options.forEach(option => {
        const radio = option.querySelector('input[type="radio"]');

        option.addEventListener('click', () => {
            radio.checked = true;
            updateOptionStyles();
            saveSettings();
        });

        radio.addEventListener('change', () => {
            updateOptionStyles();
            saveSettings();
        });
    });

    function applySettings(settings) {
        // Set intrusiveness radio
        const radio = document.querySelector(`input[name="intrusiveness"][value="${settings.intrusiveness}"]`);
        if (radio) {
            radio.checked = true;
        }
        updateOptionStyles();
    }

    function updateOptionStyles() {
        options.forEach(opt => {
            const radio = opt.querySelector('input[type="radio"]');
            if (radio.checked) {
                opt.classList.add('selected');
            } else {
                opt.classList.remove('selected');
            }
        });
    }

    async function saveSettings() {
        const intrusiveness = document.querySelector('input[name="intrusiveness"]:checked')?.value || 'maximum';

        const newSettings = {
            intrusiveness
        };

        try {
            await browser.storage.sync.set({ settings: newSettings });
        } catch {
            // Fall back to local storage
            await browser.storage.local.set({ settings: newSettings });
        }

        // Show saved message
        savedMessage.classList.add('visible');
        setTimeout(() => {
            savedMessage.classList.remove('visible');
        }, 2000);
    }
});
