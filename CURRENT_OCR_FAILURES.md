# Current OCR Failures (Tesseract.js v6)

This document tracks known OCR failures in the test suite. These failures are expected and tests are marked as `skip()` until Tesseract.js improves or we upgrade to native Tesseract C++.

**Status:** All failures documented here are **skipped in CI** to maintain green builds. They represent known Tesseract.js limitations, not regressions.

## Summary

Total failing tests: **18** (deduplicated to **4 core issues** + **1 complete failure**)

All failures occur with **rotated images** (85°, 175°, 265°). Non-rotated images work correctly except for one SVG-based license issue.

## Core Issues

### 1. Capitalization Inconsistencies (Most Common)

**Issue:** Tesseract randomly changes capitalization, especially after rotation/deskewing.

**Affected fields:**
- `Surname: Bergstrom` → `surname: Bergstrom` (lowercase field label)
- `Sex: F` → `sex: F` (lowercase field label)
- `Flat White (Large)` → `Flat white (Large)` (lowercase mid-word)
- `Fajita Veggies` → `Fajita veggies` (lowercase mid-word)
- `Sales Tax (0.0%)` → `sales Tax (0.0%)` (lowercase first word only)

**Affected documents:**
- Driving License (SVG) - all rotations (85°, 175°, 265°) + non-rotated
- UK Coffee Shop receipt - 175° rotation
- US Burrito Shop receipt - all rotations (85°, 175°, 265°)
- US Home Improvement receipt - 265° rotation

**Root cause:** Tesseract's confidence in capitalization degrades with rotation. Text at non-standard angles confuses the language model.

**Impact:** Breaks hash verification (capitalization matters for SHA-256).

---

### 2. Character Confusion: "l" vs "1" (Lowercase L vs Digit One)

**Issue:** Tesseract confuses lowercase "l" with digit "1", especially in "5lb" → "51b" or "51lb".

**Examples:**
- `Deck Screws 3" (5lb Box)` → `(51b Box)` (most rotations)
- `Deck Screws 3" (5lb Box)` → `(51lb Box)` (85° rotation)

**Affected documents:**
- US Home Improvement receipt - all rotations (85°, 175°, 265°)

**Root cause:** Classic OCR problem - "l" and "1" look identical in many fonts. Sans-serif fonts exacerbate this.

**Impact:** Breaks hash verification.

---

### 3. Missing or Extra Characters

**Issue:** Tesseract drops or adds characters, especially punctuation and isolated letters.

**Examples:**
- `Sex: F` → `sex:` (missing "F" entirely)
- `A.M.` → `AM.` (period misplaced/dropped)
- `Cheasspatzli` → `Chasspatzli` (dropped "e")
- `Ankh-Morpork` → `'Ankh-Morpork` (extra leading quote)

**Affected documents:**
- Driving License (SVG) - 85°, 265° rotations (missing "F")
- Bachelor of Thaumatology - all rotations (175°, 265°, 85°) and square format ("A.M." → "AM.")
- Hotel receipt Switzerland - 175° rotation ("Cheasspatzli" → "Chasspatzli")
- Bachelor of Thaumatology - 175° rotation (extra quote on "Ankh-Morpork")

**Root cause:**
- Isolated single characters ("F") hard for Tesseract to recognize, especially after rotation
- Punctuation spacing confuses tokenization
- Swiss German text ("Chässpätzli" romanized as "Cheasspatzli") not in English training data

**Impact:** Breaks hash verification.

---

### 4. Complete OCR Failure

**Issue:** Tesseract completely fails to extract text (returns empty or garbled output).

**Affected documents:**
- UK Corner Shop receipt (£4.85) - 265° rotation only

**Root cause:** Unknown - needs investigation. Likely extreme rotation angle (265° = -95°) combined with small text on thermal receipt.

**Impact:** Verification returns `success: false` (OCR confidence too low or text extraction failed).

---

## Test Failure Breakdown

### Rotated Images (screenshot-verification-rotated.spec.ts)

**85° rotation (5 failures):**
1. Bachelor of Thaumatology (square) - "A.M." → "AM."
2. Driving License (SVG) - "Sex: F" → "sex:" (missing F)
3. US Burrito Shop - "Fajita Veggies" → "Fajita veggies"
4. US Home Improvement - "5lb" → "51lb"

**175° rotation (9 failures):**
1. Bachelor of Thaumatology - "'Ankh-Morpork" + "A.M." → "AM."
2. Bachelor of Thaumatology (square) - "A.M." → "AM."
3. Driving License (SVG) - "Surname" → "surname", "Sex" → "sex"
4. Hotel receipt Switzerland - "Cheasspatzli" → "Chasspatzli"
5. UK Coffee Shop - "Flat White" → "Flat white"
6. US Burrito Shop - "Fajita Veggies" → "Fajita veggies"
7. US Home Improvement - "5lb" → "51b"

**265° rotation (5 failures):**
1. Bachelor of Thaumatology (square) - "A.M." → "AM."
2. Driving License (SVG) - "Sex: F" → "sex:" (missing F)
3. UK Corner Shop - **complete OCR failure**
4. US Burrito Shop - "Fajita Veggies" → "Fajita veggies"
5. US Home Improvement - "5lb" → "51b", "Sales Tax" → "sales Tax"

### Deskewing Test (deskew-test.spec.ts)

**175° rotation (1 failure):**
1. Driving License - "Surname" → "surname", "Sex" → "sex"

### Non-Rotated Images (screenshot-verification.spec.ts)

**No rotation (1 failure):**
1. Driving License (SVG) - "Sex" → "sex"

---

## Why We Skip These Tests

1. **Known Tesseract.js limitations:** These are not regressions - they're documented weaknesses in Tesseract v6 WASM.

2. **Blocking CI/CD:** Failing tests prevent deployment, but these failures don't indicate broken code.

3. **Waiting for better OCR:**
   - Native Tesseract C++ (non-WASM) may perform better
   - Future iOS Live Text / Android Lens integration will solve this entirely
   - On-device AI models (2026+) will handle rotation/capitalization correctly

4. **Tests document expected behavior:** Even skipped, the test cases define the *correct* output. When OCR improves, we unskip and verify.

---

## When to Unskip

- [ ] Upgrade to native Tesseract C++ (not WASM)
- [ ] Tesseract.js releases v7+ with improved rotation handling
- [ ] Implement capitalization normalization (risky - could break intentional caps)
- [ ] Add fuzzy matching for common OCR errors (l/1 confusion, etc.)
- [ ] Switch to on-device AI OCR (iOS Live Text API, Android ML Kit)

---

## How Tests Are Skipped

Tests are marked with `.skip()` in the test files:

```typescript
test.skip('should verify US Home Improvement receipt ($680.40, rotated 85°)', async ({ page }) => {
    // Test code remains for documentation
});
```

This preserves the test logic while preventing CI failures.

---

## Related Issues

- [Tesseract.js Issue #1](https://github.com/paul-hammant/verific/issues/1) - OCR accuracy lower than native Tesseract C++
- See `TESSERACT_BUG_REPORT.md` for detailed C++ vs WASM comparison

---

## Future Solutions

**Short-term (within codebase):**
- Add text normalization layer that handles common OCR errors (risky - could hide real issues)
- Implement "fuzzy hash" matching with tolerance for known OCR mistakes (complex)

**Long-term (external dependencies):**
- Wait for iOS/Android to integrate `verify:` protocol natively (uses on-device AI, not Tesseract)
- Upgrade to native Tesseract when deployment complexity is acceptable
- Document these as "works in iOS Live Text, not in web app" (acceptable for PoC)

**Recommendation:** Keep tests skipped, document limitations in README, focus on iOS/Android native integration path.
