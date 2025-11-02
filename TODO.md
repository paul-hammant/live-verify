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

## OCR Character Normalization for Hash Consistency

The `.verific-meta.json` standard should be extended to support configurable character normalization rules to ensure consistent SHA-256 hashes despite OCR imperfections.

### Problem
Tesseract OCR sometimes fails to correctly recognize special characters like umlauts:
- `ö` → `o`
- `ü` → `u`
- `ä` → `a`
- etc.

This causes hash mismatches even when the document content is semantically correct.

### Proposed Solution
Add a new optional field to `public/c/.verific-meta.json`:

```json
{
  "ocrNormalization": {
    "ö": "o",
    "ü": "u",
    "ä": "a",
    "Ö": "O",
    "Ü": "U",
    "Ä": "A",
    "é": "e",
    "è": "e",
    "ê": "e"
  }
}
```

### Implementation
- Apply these normalization rules **before** SHA-256 hashing
- Document issuers can define which character substitutions should be considered equivalent for verification purposes
- This allows issuers to acknowledge OCR limitations while maintaining verification integrity
- Default: no normalization (strict character matching)

### Example Use Case
For the Nordia driving license with "Bergström":
- OCR extracts: "Bergstrom"
- Normalization rule: `ö` → `o`
- Both "Bergström" and "Bergstrom" produce the same hash after normalization
- Verification succeeds despite OCR imperfection

### Files to Modify
- `public/c/.verific-meta.json` - Add schema documentation
- `public/verific-app.js` - Apply normalization before hashing
- Documentation - Explain the feature and when to use it

## Receipt Status Support

**Goal:** Support additional receipt statuses beyond OK/REVOKED

Currently, the verification system primarily handles:
- `OK` - Document is valid (green checkmark)
- `REVOKED` - Document has been revoked (red X)
- Custom response types via `.verific-meta.json`

### Proposed Receipt-Specific Statuses

Receipts could have various statuses that affect their validity:

1. **REFUNDED** - Receipt was valid but purchase was refunded
   - Should show as verified-but-refunded (orange/yellow indicator?)
   - Useful for tracking return history

2. **PAYMENT_CANCELED** - Payment was cancelled before completion
   - Should show as invalid (red)
   - Different from fraud - legitimate cancellation

3. **DISPUTED** - Payment is under dispute/chargeback
   - Should show as warning status (yellow)
   - Neither fully valid nor fully invalid

4. **EXPIRED** - Receipt/warranty expired
   - Time-based validity
   - Useful for warranty claims, return windows

5. **VOID** - Transaction was voided
   - Similar to PAYMENT_CANCELED but for completed transactions
   - Should show as invalid (red)

### Implementation Approach

The `.verific-meta.json` mechanism (already implemented in `verifyAgainstClaimedUrl()` around line 762-796) supports custom response types:

```javascript
{
  "responseTypes": {
    "REFUNDED": {
      "class": "warning",  // or new class "refunded"
      "text": "Receipt Valid - Purchase Refunded",
      "link": "https://example.com/refund-policy"
    },
    "PAYMENT_CANCELED": {
      "class": "not-found",
      "text": "Payment Cancelled",
      "link": "https://example.com/cancelled-orders"
    },
    "DISPUTED": {
      "class": "warning",
      "text": "Payment Under Dispute",
      "link": "https://example.com/disputes"
    }
  }
}
```

### Tasks

- [ ] Design UI indicators for different receipt statuses
  - Currently have: `verified` (green), `not-found` (red)
  - Add: `warning` (yellow/orange), `refunded` (blue?), `expired` (gray?)

- [ ] Update CSS in `public/index.html` for new status classes
  - `.verification-status.warning` - yellow/orange styling
  - `.verification-status.refunded` - blue styling
  - `.verification-status.expired` - gray styling

- [ ] Create example receipts with different statuses in training pages
  - Refunded receipt example
  - Cancelled payment example
  - Disputed transaction example

- [ ] Add `.verific-meta.json` examples to documentation
  - Show how merchants can define custom response types
  - Document the `class`, `text`, and `link` fields

- [ ] Consider adding status icons/emojis
  - ✅ OK
  - ❌ REVOKED / PAYMENT_CANCELED / VOID
  - ⚠️ DISPUTED
  - 🔄 REFUNDED
  - ⏰ EXPIRED

- [ ] Update E2E tests to cover various receipt statuses
  - Test with mock verification for different status responses
  - Verify correct UI rendering for each status

### Related Files

- `public/verific-app.js:762-796` - Custom response type handling
- `public/index.html` - CSS for verification status classes
- `public/training-pages/*.html` - Example documents
- `e2e/screenshot-verification.spec.ts` - E2E tests

### Notes

The current implementation already supports this via `.verific-meta.json` - just need to:
1. Document it better
2. Create visual examples
3. Add more CSS classes for different status types
4. Create training examples

This would make the system much more useful for real-world receipt verification scenarios where transactions can have various lifecycle states.
