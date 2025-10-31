# Technical Concepts: OCR-to-Hash Verification

This document explains technical concepts referenced across multiple use case documents. Read this first to understand how OCR-to-hash verification works under the hood.

## Table of Contents

1. [Registration Marks](#registration-marks)
2. [Text Normalization](#text-normalization)
3. [Domain Binding](#domain-binding)
4. [Hash Algorithms](#hash-algorithms)
5. [Response Formats](#response-formats)
6. [Photo Encoding](#photo-encoding)
7. [OCR Challenges](#ocr-challenges)

---

## Registration Marks

**What they are:** Black borders drawn around verifiable text to help computer vision algorithms detect the scannable region.

**Visual example:**
```
┌─────────────────────────────────┐  ← Black border registration marks
│                                 │    (3px solid black CSS border)
│  Bachelor of Science            │
│  Computer Science               │
│  Jane Smith, 2018               │
│  verify:degrees.ed.ac.uk/c      │
│                                 │
└─────────────────────────────────┘
```

**How they work:**
1. **OpenCV.js** detects contours (outlines of shapes)
2. Finds the largest quadrilateral (4-sided polygon)
3. Extracts the region inside this quadrilateral
4. Sends extracted region to Tesseract.js for OCR

**Why needed:**
- **Prevents OCR of wrong text** - Without registration marks, Tesseract might OCR the entire page (headers, footers, adjacent text)
- **Improves accuracy** - Knowing the boundary helps OCR focus on the relevant region
- **Enables perspective correction** - Can detect tilted documents and rotate them

**Standard implementation:**
- **Border width:** 3px solid black (CSS: `border: 3px solid black;`)
- **Variance testing:** Some training pages use 10px borders to test robustness
- **Detection algorithm:** OpenCV `findContours()` with area thresholding

**Alternative approaches:**
- **Corner marks only** - ┌ └ ┐ ┘ instead of full border (saves ink)
- **Proximity to `verify:` URL** - If no registration marks, just OCR text near the `verify:` line
- **QR code hybrid** - Use QR code to indicate scannable region boundaries

See [bachelor-thaumatology-square.html](public/training-pages/bachelor-thaumatology-square.html) for example with decorative text OUTSIDE the scannable area.

---

## Text Normalization

**Why needed:** OCR engines may introduce inconsistencies (extra spaces, line breaks, case variations). Normalization ensures the same text always produces the same hash.

**Normalization rules** (see [NORMALIZATION.md](NORMALIZATION.md) for complete specification):

1. **Unicode NFC normalization** - Combines accented characters (é → e + combining accent)
2. **Trim leading/trailing whitespace** - `"  text  "` → `"text"`
3. **Collapse multiple spaces** - `"hello    world"` → `"hello world"`
4. **Remove leading/trailing pipe characters** - `"|text|"` → `"text"` (OCR artifacts from registration mark borders)
5. **Preserve case** - `"Edinburgh"` ≠ `"edinburgh"` (case matters unless document specifies otherwise)
6. **Preserve punctuation** - `"Bachelor of Science"` ≠ `"Bachelor of Science,"`

**Example:**

**Original OCR output:**
```
|  Bachelor  of Science
   Computer Science
   Jane Smith, 2018  |
```

**After normalization:**
```
Bachelor of Science
Computer Science
Jane Smith, 2018
```

**Critical detail:** Organizations must document their normalization rules so verifiers can reproduce the exact hash. If Edinburgh prints "Honours" but you normalize to "Honors" (US spelling), verification will fail.

**Privacy implication:** Normalization doesn't change the meaning but changes the hash. Two identical documents with different whitespace will have different hashes - this is actually a **feature** for preventing hash enumeration attacks.

---

## Domain Binding

**Core concept:** The verification text itself determines which domain to query for verification. This prevents issuer impersonation.

**How it works:**

**Document contains:**
```
Bachelor of Science
Computer Science
Jane Smith
verify:degrees.ed.ac.uk/c
```

**Verification process:**
1. OCR extracts text including `verify:degrees.ed.ac.uk/c`
2. App normalizes text (removes `verify:` line for hashing)
3. Computes SHA-256: `abc123def456...`
4. Constructs URL: `https://degrees.ed.ac.uk/c/abc123def456...`
5. Fetches URL - only `degrees.ed.ac.uk` can return "OK"

**Why this prevents fraud:**

**Attack attempt:** Someone creates fake degree from `fake-university.com`:
```
Bachelor of Science
Computer Science
Jane Smith
verify:fake-university.com/c
```

**What happens:**
- Hash computes correctly
- App queries `https://fake-university.com/c/{hash}`
- Fake server returns "OK"
- **BUT** - App displays: ❌ **VERIFIED by fake-university.com**
- User sees immediately this is NOT from Edinburgh University

**Key insight:** You can't change the `verify:` URL without changing the hash. If you photoshop "verify:degrees.ed.ac.uk/c" onto a fake document, the hash won't match Edinburgh's database.

**Domain authority display:**

The app MUST show the verifying domain prominently:
- ✅ **VERIFIED by degrees.ed.ac.uk** (clear)
- ❌ **VERIFIED** (dangerous - user doesn't know who verified)

**Subdomain nuances:**
- `ed.ac.uk` - University of Edinburgh (UK academic domain)
- `degrees.ed.ac.uk` - Subdomain for degree verification (different authority)
- `example.co.uk` - UK company domain
- `foobar.com.br` - Brazilian company domain

The verification app uses the **Public Suffix List** to correctly identify the full hostname, not truncate to just `ed.ac.uk`.

See [public/domain-authority.js](public/domain-authority.js) for implementation.

---

## Hash Algorithms

**Default: SHA-256** - Used for most documents (degrees, receipts, certifications)

**Properties:**
- **256-bit output** - 64 hexadecimal characters
- **One-way function** - Cannot reconstruct original text from hash
- **Collision-resistant** - Probability of two different texts producing same hash: ~1 in 2^256 (effectively zero)
- **Fast** - Computes in milliseconds on modern phones

**Example hash:**
```
Input: "Bachelor of Science\nComputer Science\nJane Smith, 2018"
SHA-256: fb92e9f3086212ed68adbec9e9b32767a378cdd198b9d58b34f3c8718dbb9afe
```

**SHA-512 for high-security documents** (government IDs, passports):

**Why upgrade:**
- **Prevents brute-force enumeration** - Attacker trying to guess valid hashes would need 2^512 attempts instead of 2^256
- **Future-proof** - Quantum computers may eventually threaten SHA-256, SHA-512 provides more headroom
- **Passport biometrics** - Higher security standard matches passport security requirements

**Used in:**
- **Passports** - See [Use_Case-Government_IDs.md](Use_Case-Government_IDs.md)
- **Driver's licenses** - In some jurisdictions

**Tradeoff:** SHA-512 produces 128 hex characters (longer URLs) vs SHA-256's 64 characters.

**BLAKE3 consideration (future):**
- Even faster than SHA-256
- Better parallelization on modern CPUs
- Not yet as widely supported in browsers

**Hash not printed on document:**

Critical privacy property - the hash is **never** printed on the physical document. Only the base verification URL (`verify:example.com/c`) appears. This prevents:
- **Hash enumeration** - Can't scrape hashes from public photos of documents
- **Direct lookup** - Need physical document text to compute hash
- **Privacy preservation** - No public registry of "who has what credential"

---

## Response Formats

Organizations can return different response types from verification endpoints:

### Simple Text Response

**Simplest implementation:**
```
GET https://degrees.ed.ac.uk/c/abc123def456...
Response: 200 OK
Body: OK
```

App displays: ✅ **VERIFIED by degrees.ed.ac.uk**

**Invalid hash:**
```
GET https://degrees.ed.ac.uk/c/invalid_hash...
Response: 404 Not Found
```

App displays: ❌ **FAILS VERIFICATION**

### JSON Response (Recommended)

**For credentials with revocation capability (medical licenses, security clearances):**

```json
{
  "status": "OK",
  "issuer": "California Medical Board",
  "issued_date": "2018-06-23",
  "expiry_date": "2026-06-23",
  "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  "link": "https://mbc.ca.gov/verification-info.html"
}
```

**Possible status values:**
- `"OK"` - Valid, active credential
- `"REVOKED"` - Credential has been revoked (malpractice, disciplinary action)
- `"SUSPENDED"` - Temporarily suspended (pending investigation)
- `"EXPIRED"` - Credential has expired (needs renewal)
- `"STOLEN"` - Reported stolen (remove photo from response for privacy)
- `"REPLACED"` - Superseded by newer version (wills, estate documents)

**Status display:**
- `"OK"` → ✅ Green **VERIFIED by mbc.ca.gov**
- `"REVOKED"` → ❌ Red **REVOKED by mbc.ca.gov**
- `"SUSPENDED"` → ⚠️ Yellow **SUSPENDED by mbc.ca.gov**

See [Use_Case-Medical_License.md](Use_Case-Medical_License.md) for detailed JSON schema.

### Extended Response with Metadata

**Using `.verific-meta.json` configuration:**

Organizations can host `https://example.com/c/.verific-meta.json` to define custom response types:

```json
{
  "responseTypes": {
    "SUPERSEDED": {
      "class": "denying",
      "text": "This document has been replaced by a newer version",
      "link": "https://example.com/verification-updates.html"
    },
    "PENDING": {
      "class": "neutral",
      "text": "Verification pending - contact issuer",
      "link": "https://example.com/contact.html"
    }
  }
}
```

See [README.md: For Organizations Creating Verifiable Documents](README.md#for-organizations-creating-verifiable-documents) for complete `.verific-meta.json` specification.

---

## Photo Encoding

**Why Base64 instead of URL:** Privacy and security.

### The Problem with Photo URLs

**Bad approach:**
```json
{
  "status": "OK",
  "photo_url": "https://mbc.ca.gov/photos/12345.jpg"
}
```

**Attacks this enables:**
1. **Photo enumeration** - Attacker can iterate `/photos/1.jpg`, `/photos/2.jpg`, ... and download entire database
2. **Privacy violation** - Photo URLs may be guessable or publicly accessible
3. **Tracking** - Server can log who accessed which photo URLs

### Base64 Encoding Solution

**Correct approach:**
```json
{
  "status": "OK",
  "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgID..."
}
```

**Benefits:**
1. **No enumeration** - Can't guess other photos without knowing their hashes
2. **Privacy** - Photo only revealed when someone has physical document
3. **No tracking** - Server doesn't know who viewed which photos
4. **Offline capability** - Photo embedded in response, no second network request

**How it works:**
- Photograph converted to Base64 string
- Embedded directly in JSON response
- Browser decodes and displays automatically
- Typical photo size: 20-50 KB (reasonable for mobile networks)

**Photo opt-out mechanism** (government IDs):

During transition period (20-30 years), some individuals may opt out of photo verification:

```json
{
  "status": "OK",
  "photo": null,
  "photo_opt_out": true,
  "issued_date": "2015-03-10"
}
```

App displays: ✅ **VERIFIED by dmv.ca.gov** (no photo, issued before photo mandate)

See [Use_Case-Government_IDs.md](Use_Case-Government_IDs.md) lines 236-242 for cultural transition discussion.

---

## OCR Challenges

**Current technology (Tesseract.js v5)** works reliably with:

### ✅ Works Well Today

| Document Type | Why It Works |
|---------------|--------------|
| Till receipts | Monospace fonts, thermal printing, structured format |
| Business letters | Standard fonts (Arial, Times), clean layout |
| CV/resume claims | Plain text, simple formatting |
| Medical license wallet cards | Government standard fonts, plain design |
| Simple certificates | Designed with OCR in mind |

### ❌ Struggles With

| Document Type | Challenge | Example |
|---------------|-----------|---------|
| Ornate degree certificates | Gothic/blackletter fonts, calligraphy | University names like "𝓤𝓷𝓲𝓿𝓮𝓻𝓼𝓲𝓽𝔂" |
| Embossed seals | Raised ink, shadows | Official university seals |
| Gold foil elements | Reflective surfaces confuse OCR | Decorative borders, emblems |
| Handwritten signatures | Cursive writing | Official signatures |
| Aged documents | Faded ink, yellowed paper | Historical certificates |
| Small text on fabric | Size constraints, texture | Product labels (2cm × 5cm) |

### Specific Challenge: Fabric Labels

**Problem:** Product safety certifications sewn into garments (2cm × 5cm label):

```
┌────────────────┐
│ Certified Safe │  ← Too small for registration marks
│ Intertek.com   │  ← Standard fonts work
│ verify:...     │
└────────────────┘
```

**Solution:** User-guided framing instead of registration marks:
1. App shows targeting reticle
2. User aligns label within frame manually
3. OCR processes just the framed region
4. Works without registration marks

See [Use_Case-Product_Labeling.md](Use_Case-Product_Labeling.md) lines 79-99.

### Challenge: Thermal Receipt Fading

**Problem:** Thermal receipts fade over months/years:

**Original (2024):**
```
In-N-Out Burger
Total: $45.67
```

**After 6 months (2024):**
```
In-   ut Bur  r     ← Faded sections
Tot  : $  .67      ← Partial readability
```

**Solutions:**
1. **Hybrid approach** - Print both OCR-to-hash text AND QR code with same hash
2. **Immediate scanning** - Scan receipt when issued (before fading)
3. **Photo archive** - Store high-resolution photo alongside hash
4. **Longer retention** - Restaurant keeps hash valid for 7+ years even if receipt fades

See [Use_Case-Sales_Receipts.md](Use_Case-Sales_Receipts.md) lines 106-124.

### Future: On-Device AI (2026+)

**Apple Intelligence, Google Gemini, Samsung Galaxy AI** will handle:
- Ornate certificates with decorative fonts
- Handwritten signatures and notes
- Aged documents with faded ink
- Multiple languages simultaneously
- Complex layouts with background patterns

**Still 100% on-device** - maintains privacy guarantee.

See [README.md: Privacy-First Architecture](README.md#privacy-first-architecture-why-client-side-ocr-matters) for detailed discussion.

---

## Summary

**Key takeaways:**

1. **Registration marks** - Black borders help computer vision find the scannable region
2. **Normalization** - Ensures consistent hashing despite OCR variations
3. **Domain binding** - Verification text specifies trusted authority, prevents impersonation
4. **Hash algorithms** - SHA-256 default, SHA-512 for high-security (passports)
5. **Response formats** - Simple "OK" or rich JSON with status/photo/metadata
6. **Photo encoding** - Base64 prevents enumeration, preserves privacy
7. **OCR challenges** - Works great for plain text today, on-device AI will handle ornate documents soon

**For implementation details:**
- Text normalization rules: [NORMALIZATION.md](NORMALIZATION.md)
- Creating verifiable documents: [README.md: For Organizations](README.md#for-organizations-creating-verifiable-documents)
- Computer vision detection: [public/cv/detectSquares.js](public/cv/detectSquares.js)
- Domain authority extraction: [public/domain-authority.js](public/domain-authority.js)

**Related documentation:**
- [Degree_Certificate_Dual_Hash.md](Degree_Certificate_Dual_Hash.md) - How universities support ornate + plain-text claims
- [Verification_Charges.md](Verification_Charges.md) - Business models for free vs paid verification
- [LLM.md](LLM.md) - Complete project context for AI assistants
