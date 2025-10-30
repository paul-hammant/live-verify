# TODO

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
