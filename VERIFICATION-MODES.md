# Verification Modes: OCR-to-Hash Applications

The OCR-to-hash verification concept supports multiple verification modes beyond camera-based document scanning. This document describes the different ways content can be verified.

## Mode 1: Camera-Based Document Verification (Current Implementation)

**Physical documents with printed verification lines**

### How It Works

1. User holds physical document in front of camera
2. App detects black square registration marks (corners of verification region)
3. App extracts text within registration marks via OCR
4. App normalizes text and computes SHA-256 hash
5. App builds full verification URL: `https://issuer.com/c/{hash}`
6. App fetches URL and confirms HTTP 200 + "OK" response
7. Result displayed as green "VERIFIED" overlay on camera

### Key Features
- Physical registration marks define clear boundaries
- OCR operates only on marked region
- Works with any camera-capable device
- Offline-first (processes locally before verification)
- Multi-orientation OCR (handles camera rotation)

### Ideal For
- Government-issued credentials (driver's license, passport)
- University degrees, certificates
- Medical reports, lab results
- Insurance policies, financial documents
- Legal documents, notarizations
- Professional licenses
- Any document printed with registration marks and verification line

---

## Mode 2: Web-Based Text Selection Verification (Proposed)

**User-selected text from web pages with external verification display**

### How It Works

1. User visits a web page containing text to verify
2. User selects/highlights the text they want to verify
3. Browser extension or web app captures selection
4. App normalizes selected text using same rules as documents
5. App computes SHA-256 hash
6. App builds verification URL with hash
7. **Critical difference:** Verification result displays in **browser UI outside the content pane**
8. Result cannot be faked by page manipulations

### Key Architecture Differences from Document Mode

**Selection without borders:**
- User manually selects content (no registration marks needed)
- Selection boundaries defined by text cursor, not image detection
- Works on any text source (web pages, PDFs, documents)

**Verification result display:**
- Result shown in browser extension popup, toolbar, or dedicated pane
- **NOT injected into page DOM** (prevents content manipulation)
- Uses browser's native UI elements
- Shows in persistent location user can trust

**Text source possibilities:**
- Direct web page text (HTML)
- PDF viewer selections
- Document viewer selections
- Social media post excerpts
- News article quotes

### Security Model

**Prevents two classes of attacks:**

1. **Page manipulation by attacker:**
   - Attacker cannot modify page to show fake "VERIFIED" result
   - Verification appears outside attackable content
   - User sees result in trusted browser UI

2. **Content spoofing:**
   - If user selects text and sees "VERIFIED", that exact text was hashed
   - Cannot be different from displayed text (unlike camera mode where OCR could misread)
   - Verification result tied to user's exact selection

### Trust Anchors

- **Domain trust:** Same as document mode (issuer domain)
- **Browser trust:** Native UI location (address bar, extension icon, sidebar)
- **User selection:** User controls what text is verified
- **Exact match:** Hashed text must exactly match selected text

### Use Cases

**News & Media Verification**
- Verify exact quote from news article
- Confirm tweet or social media post content
- Validate claim in blog post or research paper
- Track when article text was changed

**Contract & Legal Document Verification**
- Verify specific clause from contract
- Confirm terms in license agreement
- Validate legal document excerpt
- Track contract revisions

**Scientific & Research**
- Verify quote from published paper
- Confirm methodology description
- Validate data claim or result
- Track research publication versions

**Social Media & Online Discussion**
- Verify what someone actually wrote
- Confirm quote in forum post
- Validate testimonial or review
- Create immutable record of post content

**Content Attribution**
- Link to authoritative source of quote
- Track original publication date
- Document where quote appeared
- Prevent quote misattribution

### Workflow Example: News Quote Verification

**Scenario:** Reader encounters news article with controversial quote

1. Reader selects the controversial quote with mouse/keyboard
2. Click browser extension icon
3. Extension shows: "Verify this selection?"
4. User clicks "Verify"
5. Extension computes hash and builds URL
6. Browser shows result in extension popup:
   ```
   ✅ VERIFIED
   Source: example-news.com
   Hash: 3f4a7b9c...
   Verified: 2025-12-31
   ```
7. Result links to original article source
8. User can share link with verification URL to prove exact quote

### Implementation Considerations

**Browser Capabilities Required:**
- Text selection access (DOM Selection API)
- Extension/userscript environment or bookmarklet
- Access to Tesseract or native text extraction
- Network access for verification fetch
- UI element injection capability

**Mobile Browser Support:**

The web selection mode must work on **mobile browsers** where extensions are limited:

**iOS Safari Limitations:**
- No content blocking extensions
- Limited JavaScript injection
- No persistent background script
- **Workaround:** Bookmarklet approach
  - User adds "Verify This" bookmark with JavaScript code
  - Select text → tap bookmark → verification in new tab/modal
  - Similar to mobile-friendly web tools (Pocket, Instapaper)
  - Result shown in trusted iOS browser UI (notification or popup)

**Android Chrome/Firefox:**
- Some support for extensions (limited)
- Better JavaScript injection capabilities
- Service Worker support
- **Implementations:**
  - Native extension (full-featured)
  - Bookmarklet (fallback for all browsers)
  - Web app with bookmarklet launcher

**Universal Bookmarklet Approach** (works everywhere):

```javascript
javascript:(function(){
  if(window.getSelection){
    let text = window.getSelection().toString().trim();
    if(text.length > 0) {
      // Send to live-verify verification page
      let encoded = encodeURIComponent(text);
      window.open('https://live-verify.example.com/verify?text=' + encoded, 'verify-modal', 'width=500,height=600');
    } else {
      alert('Please select text to verify');
    }
  }
})();
```

**Mobile-Optimized Result Display:**
- Modal or new tab (don't navigate away from source)
- Results shown in scrollable panel
- "Copy verification link" button (share with others)
- "Back to source" button
- QR code of verification URL (for offline sharing)

**Cross-Browser Consistency:**
- Desktop: Extension + bookmarklet support
- Tablet: Bookmarklet primary, extension secondary
- Mobile: Bookmarklet only (most compatible)
- All platforms: Fall back to manual URL entry

**Performance on Mobile:**
- Hashing (SHA-256) is fast even on older phones
- OCR/Tesseract can be heavy - optional for mode 2
- Prefer simple text extraction from selections
- Minimal UI for slower networks

**Text Normalization:**
- Same Unicode normalization as document mode
- Same whitespace rules
- Handles HTML entity decoding (if from web page)
- Consistent across sources

**Verification Endpoint Response:**
- Same format as document mode
- Status: "OK" (verified), "REVOKED" (content no longer valid), etc.
- Optional: timestamp, version number, source metadata

**Source Metadata** (optional)
- Publication date from web page
- Author/publication information
- URL of source page
- Excerpt location (paragraph number, section)

### Technical Challenges

1. **Text extraction varies by source**
   - HTML copy-paste may include formatting
   - PDF text extraction inconsistent
   - Word processors may include metadata
   - Solution: normalize aggressively

2. **Web content changes frequently**
   - Article text updates
   - Edits and corrections
   - Removal/archival
   - Solution: issuer maintains version history

3. **Multi-language text**
   - Unicode normalization rules differ
   - Diacritics handling per language
   - Solution: same as document mode (universal rules)

4. **Linking to context**
   - Verification proves text hash, not source
   - Additional step: prove verified text came from claimed source
   - Solution: issuer includes source URL in verification response

---

## Mode 3: Real-Time Document Streaming (Future)

**Continuous verification of document content as it's presented**

### Concept
- Document or content stream provides continuous hash updates
- Each section/page has its own verification line
- Verifier sees continuous "VERIFIED" as content flows
- Prevents page substitution in real-time scenarios

### Use Cases
- Live video of credential (over video call)
- Real-time document transmission (fax replacement)
- Streaming legal proceedings (court record)
- Continuous content broadcast (government publication)

---

## Mode 4: Batch Verification (Systematic Hash Receipt)

**Organizations receiving hashes in bulk from issuers**

### How It Works

By regulation or contract, issuers submit hashes to oversight bodies:
- Banks submit statement hashes to regulators
- Insurance companies submit policy hashes to commissioners
- Trial sponsors submit consent hashes to FDA
- Universities submit degree hashes to credentialing bodies

### Recipients

Systematic recipients (never see original documents):
- Maintain verification capability for audits
- Enable compliance checking
- Support future dispute resolution
- Detect altered documents in bulk

### Delivery Formats

- Raw hash list (simple CSV/JSON)
- Merkle tree (efficient batch verification)
- Blockchain (some jurisdictions)
- Dedicated database (regulatory portal)

---

## Comparison Matrix

| Aspect | Camera Document | Web Selection | Real-Time Stream | Batch Receipt |
|--------|-----------------|---------------|------------------|---------------|
| **What's Verified** | Printed document text | User-selected web text | Content stream | Historical hashes |
| **User Action** | Hold document in front of camera | Select text on page | Monitor content flow | Query hash database |
| **Registration Marks** | Required (define boundary) | Not used (user selects) | Built into source | Not applicable |
| **Result Display** | Camera overlay | Browser UI (outside page) | Continuous overlay | Database response |
| **Tampering Risk** | OCR misreads, fake registration marks | Page manipulation, fake selection | Stream manipulation | None (historical) |
| **Timeline** | Immediate (document snapshot) | Immediate (text selection) | Continuous (streaming) | Historical (batch) |
| **Best For** | Physical credentials | Web content quotes | Live presentations | Regulatory audit |
| **Issuer Infrastructure** | Simple (hash endpoint) | Simple (hash endpoint) | Streaming endpoint | Batch submission |
| **User Device** | Camera-capable phone | Browser + extension | Camera + display | Network access |

---

## Cross-Mode Architecture

All modes share:

1. **Text Normalization Rules** (`normalize.js`)
   - Unicode character mapping
   - Whitespace collapsing
   - Line-by-line processing
   - Language-agnostic rules

2. **SHA-256 Hashing**
   - UTF-8 input encoding
   - Hex lowercase output
   - No HMAC or salt (unless document-specific)

3. **Verification Model**
   - Issuer operates endpoint at domain
   - Hash in URL → issuer domain must authenticate
   - Response: HTTP 200 + "OK" means verified
   - Response: HTTP 200 + other text = status (REVOKED, EXPIRED, etc.)

4. **Trust Anchor**
   - Domain ownership (not distributed consensus)
   - HTTPS for communication security
   - CORS headers for browser access
   - Optional: `.verification-meta.json` for document-specific rules

---

## Future Directions

**Hybrid Verification**
- Combine camera document + web reference
- Verify document matches web source
- Detect divergence between document and web version

**Progressive Verification**
- Partial verification (section of document)
- Multi-layer verification (page + document + issuer)
- Attestation chains (endorser confirms issuer)

**Cryptographic Signatures**
- Issuer digitally signs hashes
- Third parties verify issuer's key
- Public key infrastructure (PKI) integration

**Decentralized Verification**
- Issuer publishes hashes to public ledger
- Multiple parties can independently verify
- No single point of failure

---

## Implementation Priority

1. **Mode 1 (Camera):** ✅ Complete
2. **Mode 2 (Web Selection):** 🔄 Proposed
3. **Mode 3 (Real-Time):** 📋 Future
4. **Mode 4 (Batch):** 📋 Future

Mode 2 (Web Selection) is the next logical step, as it:
- Reuses all normalization and hashing logic
- Addresses major use case (quote/content verification)
- Requires minimal new infrastructure
- Provides browser security model (external result display)
