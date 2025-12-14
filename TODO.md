# TODO

## Browser Native Verification API

**Critical for Real-World Deployment**: Verific's security model fundamentally requires browser-native implementation. A JavaScript library bundled with an app cannot provide authentic verification.

### The Problem
- JS libraries can be modified by malicious apps
- Users cannot trust verification results from app-bundled code
- Authentic verification requires OS/browser-level trust anchors

### The Solution: Browser Native API
Lobby major browser vendors (Google, Apple, Microsoft, Mozilla) to implement native verification APIs:

```javascript
// Proposed Browser API
const result = await navigator.verification.verify(imageBlob, {
  expectedDomain: 'paul-hammant.github.io',
  allowedIssuers: ['unseen-u.discworld']
});

// Browser performs:
// 1. OCR extraction (using OS-level OCR)
// 2. Hash computation (in trusted browser code)
// 3. Verification against claimed URL (with certificate validation)
// 4. Returns cryptographically signed result
```

### Why Browser Vendors Should Care
- **Anti-fraud**: Combat fake receipts, certifications, licenses
- **Privacy**: Verification without uploading documents to servers
- **Accessibility**: On-device verification for offline/poor connectivity
- **Standards**: Could become W3C standard like WebAuthn

### Implementation Path
1. **W3C Proposal**: Draft spec for Web Verification API
2. **Origin Trial**: Partner with Chrome team for origin trial
3. **Cross-Browser**: Apple (WebKit), Mozilla (Gecko), Microsoft (Edge)
4. **Fallback**: Verific.js as polyfill until native support available

### Files to Create
- `docs/browser-api-proposal.md` - Detailed API specification
- `docs/vendor-pitch.md` - Pitch deck for browser vendors
- `docs/security-model.md` - Why JS libraries can't provide authentic verification

### Related Work
- WebAuthn (authentication standard)
- Credential Management API
- Payment Request API (similar trust model requirements)

## ✅ OCR Character Normalization for Hash Consistency

**Status: COMPLETED** - Implemented and documented

### What Was Built
Character normalization via `.verification-meta.json` to ensure consistent SHA-256 hashes despite OCR imperfections with special characters (umlauts, accents, etc.).

### Implementation
- **Implemented in:** `public/doc-specific-normalization.js` and `public/normalize.js`
- **Configuration:** `charNormalization` field in `.verification-meta.json`
- **Syntax:** Compact notation `"éèêë→e àáâä→a ìíîï→i òóôö→o ùúûü→u ñ→n ç→c"`
- **Example:** `public/examples/.verification-meta.json` (Swiss hotel receipts with diacritics)
- **Documentation:** LLM.md:220-263

### How It Works
```json
{
  "charNormalization": "éèêë→e àáâä→a ìíîï→i òóôö→o ùúûü→u ñ→n ç→c"
}
```

Applied before SHA-256 hashing, allowing issuers to define which character substitutions should be considered equivalent for verification purposes.

## ✅ Receipt Status Support

**Status: COMPLETED** - Core functionality implemented and documented

### What Was Built
Custom response types via `responseTypes` in `.verification-meta.json`, supporting arbitrary statuses beyond OK/REVOKED.

### Implementation
- **Implemented in:** `public/live-verify-app.js` (verification response handling)
- **Configuration:** `responseTypes` field in `.verification-meta.json`
- **Example:** `public/c/.verification-meta.json` (OK/GRADUATED/REVOKED statuses)
- **Documentation:** Technical_Concepts.md:194-260

### How It Works
```json
{
  "responseTypes": {
    "REFUNDED": {
      "class": "warning",
      "text": "Receipt Valid - Purchase Refunded",
      "link": "https://example.com/refund-policy"
    },
    "GRADUATED": {
      "class": "affirming",
      "text": "Student successfully graduated",
      "link": "https://unseen-u.discworld/explanations/Graduated.html"
    }
  }
}
```

Supports arbitrary statuses with custom CSS classes, display text, and optional documentation links.

---

## Enhancements (Future Work)

### Receipt Status Visual Enhancements

The responseTypes mechanism is working, but could benefit from more polished UI examples:

**Potential additions:**
- [ ] More CSS status classes (currently has `affirming`, `denying`, `warning`)
  - Add: `refunded` (blue), `expired` (gray), `disputed` (yellow)
- [ ] Training page examples showing different receipt statuses
  - Refunded receipt example
  - Cancelled payment example
  - Disputed transaction example
- [ ] Status icon/emoji conventions
  - ✅ OK/GRADUATED
  - ❌ REVOKED/VOID
  - ⚠️ DISPUTED/WARNING
  - 🔄 REFUNDED
  - ⏰ EXPIRED
- [ ] E2E tests for various receipt statuses

**Related files:**
- `public/camera-app/index.html` - Add more CSS classes
- `public/training-pages/*.html` - Add more status examples
- `e2e/screenshot-verification.spec.ts` - Add status coverage
