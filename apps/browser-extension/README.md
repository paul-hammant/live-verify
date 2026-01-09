# LiveVerify Browser Extension

Verify selected text against issuer endpoints using SHA-256 hashing. Select text containing a `verify:` URL, right-click, and instantly verify authenticity.

## Installation (Development)

### Chrome / Edge

1. Open `chrome://extensions` (or `edge://extensions`)
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select this folder: `apps/browser-extension`

### Firefox

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on...**
3. Select `manifest.json` from this folder

## Usage

1. Select text that includes a `verify:` or `vfy:` URL line:
   ```
   [Global Tech Exports, Inc.
   400 Silicon Valley Blvd
   San Jose, CA 95134
   verify:example.com/c/abc123 ]
   ```

2. Right-click → **Verify Selection**
   Or use keyboard: `Cmd+Shift+V` (Mac) / `Ctrl+Shift+V` (Windows/Linux)

3. Check the result:
   - **Badge** on extension icon (green ✓ or red ✗)
   - **Notification** (depending on settings)
   - **Click icon** for full details

## Settings

Click the extension icon → **Settings** to choose notification level:

| Level | Behavior |
|-------|----------|
| **Maximum** | System notification (persistent) + badge |
| **Standard** | System notification (auto-dismiss) + badge |
| **Minimal** | Badge only |

## Testing Locally

Serve the main project:

```bash
cd /path/to/live-verify/public
python3 -m http.server 8000
```

Then visit:
- Training pages: `http://localhost:8000/training-pages/`
- Use cases: `http://localhost:8000/use-cases/view.html?doc=air-waybills`

## How It Works

1. Extracts `verify:` or `vfy:` URL from selection
2. Strips `[` and `]` visual markers
3. Normalizes remaining text (Unicode, whitespace)
4. Computes SHA-256 hash
5. Fetches `https://{domain}/{path}/{hash}`
6. Displays result based on HTTP response

## File Structure

```
browser-extension/
├── manifest.json        # Extension manifest (v3)
├── background.js        # Service worker
├── shared/
│   ├── normalize.js     # Text normalization + hashing
│   └── verify.js        # URL extraction + verification
├── popup/
│   ├── popup.html       # Results popup
│   └── popup.js
├── settings/
│   ├── settings.html    # Settings page
│   └── settings.js
└── icons/               # Extension icons
```

## Browser Compatibility

| Browser | Status |
|---------|--------|
| Chrome | ✓ Supported |
| Edge | ✓ Supported |
| Firefox | ✓ Supported |
| Safari | Requires Xcode wrapper (future) |

## License

AGPL-3.0-or-later
