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

const DEFAULT_SETTINGS = {
    intrusiveness: 'maximum',
    autoScanPages: false,
    autoVerify: false
};

document.addEventListener('DOMContentLoaded', async () => {
    const options = document.querySelectorAll('.option');
    const radios = document.querySelectorAll('input[name="intrusiveness"]');
    const checkboxOptions = document.querySelectorAll('.checkbox-option');
    const savedMessage = document.getElementById('savedMessage');

    // Load current settings
    const settings = await loadSettings();

    // Set radio button state
    selectOption(settings.intrusiveness);

    // Set checkbox states
    checkboxOptions.forEach(opt => {
        const settingName = opt.dataset.setting;
        const checkbox = opt.querySelector('input[type="checkbox"]');
        if (settings[settingName]) {
            checkbox.checked = true;
            opt.classList.add('enabled');
        }
    });

    // Handle radio option clicks
    options.forEach(option => {
        option.addEventListener('click', async () => {
            const value = option.dataset.value;
            selectOption(value);
            await saveSettings({ intrusiveness: value });
            showSavedMessage();
        });
    });

    // Handle radio changes (for keyboard navigation)
    radios.forEach(radio => {
        radio.addEventListener('change', async () => {
            selectOption(radio.value);
            await saveSettings({ intrusiveness: radio.value });
            showSavedMessage();
        });
    });

    // Handle checkbox option clicks
    checkboxOptions.forEach(opt => {
        opt.addEventListener('click', async (e) => {
            // Don't double-toggle if clicking the checkbox itself
            if (e.target.type === 'checkbox') return;

            const checkbox = opt.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
            updateCheckboxOption(opt, checkbox.checked);
            await saveSettings({ [opt.dataset.setting]: checkbox.checked });
            showSavedMessage();
        });

        const checkbox = opt.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', async () => {
            updateCheckboxOption(opt, checkbox.checked);
            await saveSettings({ [opt.dataset.setting]: checkbox.checked });
            showSavedMessage();
        });
    });

    function selectOption(value) {
        options.forEach(opt => {
            const isSelected = opt.dataset.value === value;
            opt.classList.toggle('selected', isSelected);
            opt.querySelector('input[type="radio"]').checked = isSelected;
        });
    }

    function updateCheckboxOption(opt, checked) {
        opt.classList.toggle('enabled', checked);
    }

    function showSavedMessage() {
        savedMessage.classList.add('visible');
        setTimeout(() => {
            savedMessage.classList.remove('visible');
        }, 2000);
    }
});

async function loadSettings() {
    try {
        const result = await chrome.storage.sync.get('settings');
        return { ...DEFAULT_SETTINGS, ...result.settings };
    } catch {
        return DEFAULT_SETTINGS;
    }
}

async function saveSettings(settings) {
    try {
        const current = await loadSettings();
        await chrome.storage.sync.set({
            settings: { ...current, ...settings }
        });
    } catch (error) {
        console.error('Failed to save settings:', error);
    }
}
