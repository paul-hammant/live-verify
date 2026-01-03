# LLM Context: OCR-to-Hash Verification System

## Project Overview

Proof-of-concept implementations demonstrating **Text-to-Hash** verification (often called **OCR-to-hash**) for resolving fraud or disputes. The pipeline is `Input -> normalization -> hash -> GET`.

### Permutations:
- **OCR Path:** Camera or image clip -> OCR -> normalized-text -> hash -> GET.
- **Selection Path:** Selected digital text -> normalization -> hash -> GET.

### Integration Vision:
These capabilities are designed for building into camera apps, browsers (mobile/desktop), email clients, PDF viewers, messaging systems (SMS, WhatsApp, iMessage), and collaboration tools (Slack, Discord).

### POC 1: Camera-Based Document Verification
`public/camera-app/index.html` — Point camera at physical document, OCR extracts text, normalizes, hashes, verifies against issuer's endpoint.

### POC 2: In-Page Text Selection Verification
`public/text-selection-verify.js` — Select text on webpage, right-click "Verify?", computes hash, checks issuer endpoint.

### Additional Modes
See [VERIFICATION-MODES.md](./VERIFICATION-MODES.md) for detailed permutations and the platform integration roadmap.

## Key Design Decisions

### 1. No Backend Server Required
- **Initial approach**: Built with Express backend + in-memory hash database
- **Final approach**: Pure client-side verification against URLs printed on documents
- **Why**: Can deploy to GitHub Pages for free, works offline, no infrastructure needed

### 2. URL-Based Verification (Not Local Database)
The document itself contains:
- Certification text within black square registration marks
- Verification base URL printed below the text (e.g., `verify:paul-hammant.github.io/live-verify/c`)

The app:
1. Uses **OpenCV.js** to detect the black square registration marks
2. Crops to the rectangle defined by the marks
3. Tries **multi-orientation OCR** (0°, 90°, 270°, 180°) and picks the best result
4. Extracts the base URL from the last line of OCR text (accepts `verify:` or `https://` prefix)
5. Removes URL line from certification text
6. Normalizes remaining text (Unicode normalization + whitespace rules)
7. Computes SHA-256 hash
8. **Builds full verification URL** by converting `verify:` to `https://` and appending the hash
9. Fetches the URL and verifies HTTP 200 + "OK" in response
10. Shows green "VERIFIED" or red "FAILS VERIFICATION" overlay on camera

### 3. No Hardcoded Hashes in the App
- We do **NOT** maintain a local database of valid hashes in the app
- Trust model: The organization that controls the domain (e.g., `paul-hammant.github.io`) is trusted
- Hash database is pre-built and deployed to GitHub Pages at `/c/{hash}/index.html`
- If hash matches URL AND endpoint returns 200 + "OK" → verified
- If hash doesn't match URL OR endpoint fails → verification fails

## File Structure

```
live-verify/
├── public/                          # Deploy this folder to GitHub Pages
│   ├── camera-app/index.html        # Camera UI with registration marks overlay
│   ├── styles.css                   # Responsive design, mobile-first
│   ├── normalize.js                 # Text normalization + SHA-256 (TESTED)
│   ├── app-logic.js                 # Pure functions for URL extraction, rotation (TESTED)
│   ├── live-verify-app.js             # Main app logic (camera, OCR, verification)
│   ├── test-normalization.html      # Interactive test page for normalization
│   ├── cv/
│   │   ├── geometry.js              # OpenCV geometry utilities (TESTED)
│   │   └── detectSquares.js         # Registration mark detection (TESTED via E2E)
│   ├── training-pages/              # Training certificates for testing
│   │   ├── index.html               # Landing page
│   │   ├── bachelor-thaumatology.html
│   │   ├── master-applied-anthropics.html
│   │   └── doctorate-high-energy-magic.html
│   ├── c/
│   │   ├── .verification-meta.json       # Document normalization rules + OCR settings (optional)
│   │   └── {hash}/index.html        # Static verification endpoints (200 + "OK")
│   └── hashes.json                  # Hash database metadata
│
├── build-hashes.js                  # Build tool: generates hash database
├── generate-training-pages.js       # Build tool: generates training pages
│
├── ocr-hash.test.js                 # Jest: normalize.js tests (30 tests)
├── app-logic.test.js                # Jest: app-logic.js tests (29 tests)
├── cv-geometry.test.js              # Jest: geometry.js tests
├── detectSquares.node.test.js       # Jest: placeholder tests
│
├── e2e/
│   ├── cv-detect.spec.ts            # Playwright: registration mark detection (8 tests)
│   ├── cv-ocr.spec.ts               # Playwright: OCR integration (8 tests)
│   └── cv-harness.html              # Test harness for E2E tests
│
├── test/fixtures/                   # Test images
│   ├── should-detect/               # Images with valid registration marks
│   ├── should-not-detect/           # Images without marks
│   └── mixed/                       # Mixed test cases
│
├── .github/workflows/
│   └── deploy.yml                   # CI/CD: runs tests, deploys to GitHub Pages
│
├── README.md                        # User-facing documentation
├── TESTING.md                       # Test documentation
├── NORMALIZATION.md                 # Detailed normalization rules
├── BUILDING.md                      # Build instructions
└── LLM.md                           # This file
```

## Use Cases Content

~450 use case documents in `public/use-cases/data/*.md`. Each has YAML frontmatter:

```yaml
---
title: "Document Title"
category: "Category Name"
type: "use-case"  # or "rollup" for aggregates
slug: "document-slug"
volume: "Medium"
retention: "7 years"
---
```

**Key files:**
- `public/use-cases/data/criteria-template.md` — Template + guidance for writing use cases. Covers: good use case criteria, party definitions (issuer/second/third), fraud patterns, status indications, common objections.
- `scripts/migrate-use-cases.js` — Regenerates `public/use-cases/data/index.json` from .md frontmatter. Run after adding/editing use cases.
- `public/use-cases/view.html` — Client-side markdown viewer. Access via `view.html?doc=slug-name`.

**Workflow:** Edit .md files → run `node scripts/migrate-use-cases.js` → index.json updated.

**Important:** Always run `node scripts/migrate-use-cases.js` before committing changes to use-cases. The generated `index.json` must be kept in sync with the .md files.

**Categories:** 40 categories. Large ones split (Insurance→Specialty/Claims/Bonds, Logistics→Shipping/Customs/Warehouse/Fleet, Banking→Payments/Compliance/Trade/Fintech).

## Core Logic

### Text Normalization Rules (NORMALIZATION.md)

**Step 1: Unicode Character Normalization**
```javascript
// Normalize Unicode characters that OCR might produce
text = text.replace(/[“”„]/g, '"');  // Curly double quotes → straight
text = text.replace(/[‘’]/g, "'");        // Curly single quotes → straight
text = text.replace(/[«»]/g, '"');        // Angle quotes → straight double
text = text.replace(/[–—]/g, '-');        // En/em dash → hyphen
text = text.replace(/\u00A0/g, ' ');                // Non-breaking space → space
text = text.replace(/\u2026/g, '...');              // Ellipsis → three periods
```

**Step 2: Line-by-Line Normalization**
```javascript
const lines = text.split('\n');
const normalizedLines = lines.map(line => {
    line = line.replace(/^\s+/, '');    // Remove leading spaces
    line = line.replace(/\s+$/, '');    // Remove trailing spaces
    line = line.replace(/\s+/g, ' ');   // Collapse multiple spaces
    return line;
})
.filter(line => line.length > 0);       // REMOVE blank lines
```

**Step 3: Final Assembly**
```javascript
return normalizedLines.join('\n');      // No trailing newline
```

### SHA-256 Hashing

**Input Encoding:** UTF-8
**Output Encoding:** Hex (lowercase)
**HMAC:** No (plain SHA-256)

**Browser implementation:**
```javascript
async function sha256(text) {
    const encoder = new TextEncoder();              // UTF-8 encoding
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;                                 // lowercase hex
}
```

**Node.js implementation (for tests):**
```javascript
function sha256(text) {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}
```

### Computer Vision: Registration Mark Detection

Uses **OpenCV.js** to detect black square registration marks:

1. Convert image to grayscale
2. Apply Gaussian blur
3. Adaptive thresholding
4. Find contours
5. Filter for square-like shapes (aspect ratio ~1.0, area > threshold)
6. Select best 4 squares that form a rectangle
7. Apply perspective transform to crop and deskew

**Key files:**
- `public/cv/geometry.js` - Geometry utilities (orderCorners, etc.)
- `public/cv/detectSquares.js` - Detection algorithm

### Multi-Orientation OCR

Since users may hold the camera sideways, the app tries OCR at multiple orientations:

```javascript
const orientations = [
    { rotation: 0, canvas: cropped },                // Most likely (portrait)
    { rotation: 270, canvas: rotateCanvas(cropped, 270) },  // Landscape right
    { rotation: 90, canvas: rotateCanvas(cropped, 90) },    // Landscape left
    { rotation: 180, canvas: rotateCanvas(cropped, 180) }   // Upside down (rare)
];

// Try in order: 0°, 270°, 90°, 180°
// Pick FIRST orientation that achieves high confidence (early exit optimization)
for (const { rotation, canvas } of orientations) {
    const result = await Tesseract.recognize(canvas.toDataURL(), 'eng');
    const confidence = result.data.confidence || 0;

    if (confidence > HIGH_CONFIDENCE_THRESHOLD) {
        // Good enough - use this orientation
        bestResult = result;
        bestRotation = rotation;
        break;
    }
}
```

### High-Resolution Capture

Uses **ImageCapture API** when available for higher resolution than video frames:

```javascript
if ('ImageCapture' in window) {
    const ic = new ImageCapture(track);
    const photo = await ic.takePhoto();           // Returns high-res Blob
    imageBitmap = await createImageBitmap(photo);
}
```

Falls back to canvas capture from video element if ImageCapture not supported.

### Verification Logic

**Verification URL schemes: `verify:` and `vfy:`**

Documents should print base URLs using either the long `verify:` scheme or the short `vfy:` alias instead of `https://`:
- Example (long): `verify:paul-hammant.github.io/live-verify/c`
- Example (short): `vfy:paul-hammant.github.io/live-verify/c`

The app converts either form to `https://` and appends the computed hash:
- `verify:example.com/c` → `https://example.com/c/{hash}`
- `vfy:example.com/c` → `https://example.com/c/{hash}`

This keeps printed documents concise while remaining explicit that the URL is for verification.

**Document-Specific Normalization (`.verification-meta.json`):**

Issuers can optionally provide document-specific normalization rules and OCR optimization hints at the base URL by hosting a `.verification-meta.json` file:

```json
{
  "description": "Example .verification-meta.json for hotel receipts with Swiss Franc formatting",
  "charNormalization": "éèêë→e àáâä→a ìíîï→i òóôö→o ùúûü→u ñ→n ç→c",
  "ocrNormalizationRules": [
    {
      "pattern": "CHF\\s+(\\d)",
      "replacement": "CHF$1",
      "description": "Remove space between CHF currency code and amount"
    }
  ],
  "tesseract": {
    "lang": "eng",
    "psm": 6,
    "oem": 1,
    "tessedit_char_whitelist": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0-9 .,-/:()",
    "preserve_interword_spaces": "1"
  }
}
```

If the app finds this file at `https://example.com/c/.verification-meta.json`, it applies the rules in this order:

**1. Text Normalization Rules (applied before standard normalization):**
- `charNormalization`: Compact notation for character mappings (e.g., `éèêë→e` means é→e, è→e, ê→e, ë→e)
  - Use cases: Diacritic removal, known OCR misreads
  - Example: Swiss hotel receipts where `Chéasspätzli` should normalize to `Cheasspatzli`
- `ocrNormalizationRules`: Regex-based structural cleanup (applied after character normalization)
  - Use cases: Whitespace from HTML rendering, date formatting artifacts
  - Example: `CHF\s+(\d)` → `CHF$1` removes spaces between currency code and amount

**2. OCR Optimization (optional Tesseract settings):**
- `lang`: OCR language model (e.g., "eng", "eng+fra")
- `psm`: Page segmentation mode (6 = uniform block of text)
- `oem`: OCR engine mode (1 = LSTM neural net only)
- `tessedit_char_whitelist`: Allowed characters (reduces false positives)
- `preserve_interword_spaces`: Keeps spaces between words intact

**3. Data Retention & Compliance Rules (optional but recommended):**

Issuers can specify legal/regulatory requirements for how verification apps must handle captured data:

```json
{
  "compliance": {
    "dataRetention": {
      "capturedImage": "DELETE_IMMEDIATELY",
      "ocrText": "DELETE_AFTER_VERIFICATION",
      "verificationHash": "NONE",
      "verificationResult": "RETAIN_7_DAYS",
      "auditLog": "RETAIN_1_YEAR"
    },
    "auditLogging": {
      "description": "Context-aware audit logging for healthcare verification. Hospitals are high-stress environments where verification can happen at any time—not just key treatment moments. Family members may challenge credentials during adversarial care disputes, safety concerns, or general distrust.",
      "logStructure": {
        "timestamp": "ISO 8601 format",
        "verificationResult": "VALID, SUSPENDED, EXPIRED, or UNKNOWN",
        "verifierRole": "Staff member / Family member / Visitor",
        "patientContext": "Patient identifier (hash or MRN, NOT plain name)",
        "treatmentContext": "Unit/area (ICU/OR/etc), NOT detailed medical info",
        "verifiedPersonRole": "Doctor title, specialty (e.g., 'Cardiologist'), NOT name/license number",
        "verificationContext": "Routine check / Pre-procedure consent / Care dispute / Safety concern / Unscheduled visit / Distrust/adversarial encounter",
        "purposeOfVerification": "Why verification was sought at this moment"
      },
      "examples": [
        {
          "timestamp": "2025-01-03T08:30:00Z",
          "scenario": "Routine pre-procedure verification",
          "verificationResult": "VALID",
          "verifierRole": "Family member",
          "patientContext": "Patient_8847",
          "treatmentContext": "OR preparation, pre-operative",
          "verifiedPersonRole": "Cardiologist (Arizona-licensed, on-duty)",
          "verificationContext": "Pre-procedure consent",
          "purposeOfVerification": "Family member confirming surgeon credentials before cardiothoracic procedure"
        },
        {
          "timestamp": "2025-01-03T14:45:00Z",
          "scenario": "Adversarial encounter during care dispute",
          "verificationResult": "VALID",
          "verifierRole": "Family member",
          "patientContext": "Patient_8847",
          "treatmentContext": "CCU",
          "verifiedPersonRole": "Cardiologist (Arizona-licensed, on-duty)",
          "verificationContext": "Care dispute/distrust",
          "purposeOfVerification": "Family member challenges physician credentials during disagreement over treatment plan"
        },
        {
          "timestamp": "2025-01-03T23:15:00Z",
          "scenario": "Safety concern, unscheduled visit",
          "verificationResult": "VALID",
          "verifierRole": "Family member",
          "patientContext": "Patient_8847",
          "treatmentContext": "CCU night shift",
          "verifiedPersonRole": "Nurse (RN, on-duty)",
          "verificationContext": "Unscheduled visit/safety check",
          "purposeOfVerification": "Family member verifies aide credentials during unexpected 11 PM entry to verify legitimacy of unannounced care"
        }
      ],
      "retention": "1 year (HIPAA medical record retention). Audit logs may document adversarial encounters—this is expected and appropriate when family members exercise verification rights during disputes over care."
    },
    "applicableLaws": [
      {
        "name": "HIPAA Privacy Rule",
        "condition": "if patient data visible in capture",
        "regulation": "45 CFR §164.500",
        "canonical": "https://www.hhs.gov/hipaa/for-professionals/privacy/index.html",
        "impact": "Captured badge images containing patient information must be deleted immediately. Audit logs retained for 1 year per medical record requirements."
      },
      {
        "name": "GDPR",
        "condition": "if EU user or data processed in EU",
        "articles": "Articles 5-6 (Processing Principles), Article 35 (Data Protection Impact Assessment)",
        "canonical": "https://gdpr-info.eu/",
        "impact": "Data minimization required. Only non-identifiable role/specialty verified, no provider names. User consent required before processing."
      },
      {
        "name": "CCPA",
        "condition": "if California resident",
        "statute": "California Consumer Privacy Act §1798.100+",
        "canonical": "https://oag.ca.gov/privacy/ccpa",
        "impact": "Consumer right to know/delete. Audit logs tied to patient encounter (not provider-identifiable). No sale of verification data."
      }
    ],
    "purposeLimitation": "Verification only. Cannot use captured data for ML training, analytics, or secondary purposes. Audit logs tied to specific patient encounters for treatment/compliance purposes only.",
    "dataMinimization": "App should not transmit captured image to issuer. Only hash and verification result. Audit logs must not include provider names, license numbers, or provider-specific identifiers—only role/specialty and verification status.",
    "userConsent": "App must notify user that verification data is being processed and retained per this policy. For family members: 'Your verification of this provider will be logged in patient's medical record as: [family member] verified [provider role] at [timestamp]'",
    "incidentReporting": "If verification app is compromised, issuer domain operator must be notified within 24 hours.",
    "contextualAwareness": "Verification audit logs should distinguish between: staff member verifying peer (internal audit), family member verifying provider (patient safety), visitor verification (security). Each has different retention and privacy implications.",
    "abuseProtection": {
      "description": "Protections against 'First Amendment auditors' and bad-faith verification abuse. Verification is legitimate, but systematic harassment via verification is not.",
      "reasonableVerification": [
        "Family member verifying provider once before treatment",
        "Citizen verifying officer legitimacy during traffic stop",
        "Patient verifying nurse during unexpected room entry",
        "Staff member verifying peer credentials occasionally"
      ],
      "harassmentPatterns": [
        "Same person verifying same staff member 5+ times in one shift (tracking)",
        "Repeated verification attempts with incrementally delayed times (movement mapping)",
        "Systematic attempts to verify all staff at facility (roster enumeration attack)",
        "Verification requests targeting specific individuals based on name/identity (targeted harassment)",
        "Flood verification attempts to probe endpoint vulnerabilities"
      ],
      "rateLimiting": {
        "perUser": "Maximum 3 verification requests per user per staff member per 24 hours (app-level user consent)",
        "perStaff": "CRITICAL: Monitor badge verification frequency at facility level. Alert security if same staff member receives 5+ verification attempts in 5 minutes (real-time targeting detection). This is NOT app-level rate limiting—this is facility monitoring triggering immediate security response.",
        "perIPAddress": "NOT EFFECTIVE in practice (all facility staff behind NAT share same public IP). Do NOT rely on IP-based rate limiting.",
        "escalation": "Upon detection of rapid verification attempts on a staff member: (1) Consider alerting facility security to conduct welfare check on staff member's location, (2) Notify staff member and management, (3) Document incident for potential harassment/stalking report to law enforcement if pattern continues."
      },
      "legalFramework": {
        "description": "Emerging laws protect staff from verification-based harassment. Issuers should document abuse prevention in compliance metadata.",
        "applicableStatutes": [
          {
            "law": "Harassment/Cyberstalking Statutes",
            "applies": "Repeated verification attempts targeting specific person may constitute harassment or stalking under state law (varies by jurisdiction)"
          },
          {
            "law": "Workplace Violence Prevention Laws",
            "applies": "Healthcare facilities, law enforcement can restrict verification in abusive/confrontational contexts under workplace safety rules"
          },
          {
            "law": "Interference with Public Employees",
            "applies": "Some jurisdictions: deliberately provoking confrontations via verification scanning may constitute interference with officer/employee duties"
          },
          {
            "law": "Computer Fraud & Abuse Act (CFAA)",
            "applies": "US law: automated verification scraping or flood attacks may constitute 'unauthorized access' under CFAA §1030"
          }
        ]
      },
      "appGuidance": [
        "Apps should display rate-limit warnings: 'You've verified this person 3 times today. Additional requests may be flagged as suspicious.'",
        "Apps should NOT enable batch verification or allow scripts to automate verification requests",
        "Apps should warn users if verification pattern resembles stalking/tracking (same person multiple times, different times)",
        "Apps should provide 'report abuse' button if user believes verification is being weaponized against staff member"
      ],
      "issuerGuidance": [
        "Facility-level monitoring: Issuers (hospitals, police departments) must actively monitor verification endpoint for rapid-fire attempts on single staff members. Set alerts at 5+ attempts in 5 minutes.",
        "Real-time dispatch: Upon alert, consider automatic notification of facility security to conduct welfare check on staff member's location. Do NOT wait for staff to self-report harassment—treat rapid verification as potential active targeting and escalate accordingly.",
        "App-level guidance: Transparent rate limiting in .verification-meta.json for user consent (3 per day), but do NOT rely on app to stop abuse—facility monitoring is primary defense.",
        "Documentation: Log all verification patterns (who verified whom, when, from where if available). Correlate with any harassment/threat reports. This becomes evidence if legal escalation needed.",
        "Policy clarification: Document that 'legitimate verification for lawful purpose' (one scan before treatment, one check during traffic stop) is protected. Systematic targeting (20+ attempts, movement tracking, roster enumeration) is not."
      ]
    },
    "progressiveGuidance": {
      "description": "Context-sensitive guidance URLs triggered at verification frequency thresholds. Allows issuers to provide educational, warning, and legal framework resources at escalating frequency levels. Apps track verification attempts per staff member and offer corresponding guidance URLs.",
      "implementation": "App tracks cumulative verification attempts for same staff member and presents guidance URL (as modal, banner, or link) when threshold is reached. Frequency counter resets per 24-hour period.",
      "thresholds": [
        {
          "requestNumber": 1,
          "guidanceUrl": "https://issuer-domain.org/guidance/first-verification",
          "purpose": "Educational: explain legitimate verification use cases and appropriate contexts",
          "exampleContent": "What is verification? When is it appropriate? This badge proves this person is authorized to be here. You can verify them for lawful purposes like confirming credentials before treatment, checking during security incident, or during care discussions."
        },
        {
          "requestNumber": 3,
          "guidanceUrl": "https://issuer-domain.org/guidance/repeated-verification",
          "purpose": "Warning: notify user that repeated verification may indicate concerning pattern",
          "exampleContent": "You've verified this person 3 times in the last 24 hours. If you're verifying the same person repeatedly without a specific new reason, this may be flagged by facility security as a potential targeting or stalking pattern."
        },
        {
          "requestNumber": 10,
          "guidanceUrl": "https://issuer-domain.org/guidance/harassment-law",
          "purpose": "Legal framework: explain harassment/stalking statutes and escalation procedures",
          "exampleContent": "Repeated verification attempts may constitute harassment or stalking under state law. Facility security monitors for patterns like 5+ attempts in 5 minutes (real-time targeting). If you believe someone is using verification to harass staff, report to facility security or law enforcement."
        }
      ],
      "exampleImplementation": {
        "scenario": "User verifies same staff member multiple times",
        "firstRequest": {
          "requestCount": 1,
          "action": "Show educational guidance: display banner or modal linking to first guidance URL",
          "userExperience": "'This badge is verified. Learn when verification is appropriate.' [Learn more]"
        },
        "thirdRequest": {
          "requestCount": 3,
          "action": "Show warning guidance: display banner or modal linking to repeated verification guidance",
          "userExperience": "'You've verified this person 3 times. Repeated verification without new reason may be flagged.' [Learn more]"
        },
        "tenthRequest": {
          "requestCount": 10,
          "action": "Show legal guidance: display prominent notice with escalation procedures",
          "userExperience": "'Repeated verification attempts may violate harassment or stalking laws. See facility security.' [Legal Framework]"
        }
      },
      "designNotes": "Progressive guidance avoids hard-coded warnings in app code. Instead, issuers customize guidance URLs for their jurisdiction, organization, and context. URLs can link to facility-specific policies, legal frameworks, abuse reporting forms, or educational materials. This approach provides flexibility while maintaining consistent user experience across different issuer domains.",
      "adoptionNote": "Progressive guidance is optional and best suited for jurisdictions with specific legal frameworks around verification rights or organizations with documented verification abuse patterns. Most issuers will omit these URLs entirely to keep verification flows streamlined and user-friendly. The primary abuse defense is facility-level monitoring (detecting rapid-fire attempts and triggering security welfare checks), not user-facing warnings. Don't enable progressive guidance unless you have a specific reason."
    },
    "notes": "Healthcare credentials: Captured badge image must not be stored if it contains patient-visible information. Audit logs MUST be contextualized to patient encounter, not provider-centric. Police credentials: Do not retain verification requests or movement tracking. All contexts: Verification is legitimate for authorized purposes, but systematic harassment via verification is not and may violate harassment/stalking laws. Progressive guidance is optional—most issuers will omit it to keep flows clean."
  }
}
```

This is particularly useful for:
- Documents with diacritics or special characters that need consistent normalization
- Receipt formats with known whitespace issues (e.g., HTML tabs rendering as spaces)
- Specialized documents with known character sets (e.g., employment letters won't have `@#$%^&*`)
- High-security credentials (healthcare, law enforcement, government IDs) requiring strict compliance
- Multi-jurisdictional deployments needing GDPR, HIPAA, CCPA compliance

**Full verification requires these checks:**

```javascript
// Extract base URL (verify: or https://)
const { url: baseUrl, urlLineIndex } = extractVerificationUrl(rawText);

// Build full URL with hash
const fullVerificationUrl = buildVerificationUrl(baseUrl, hash);
// If baseUrl = "verify:example.com/c", result = "https://example.com/c/{hash}"
// If baseUrl = "https://example.com/c", result = "https://example.com/c/{hash}"

async function verifyAgainstClaimedUrl(claimedUrl, computedHash) {
    // Check 1: Hash in URL
    if (!hashMatchesUrl(claimedUrl, computedHash)) {
        showOverlay('red', 'FAILS VERIFICATION');
        return;
    }

    // Check 2 & 3: Fetch URL and verify response
    const response = await fetch(claimedUrl);

    if (response.status !== 200) {
        showOverlay('red', 'FAILS VERIFICATION');
        return;
    }

    const body = await response.text();
    if (!body.includes('OK')) {
        // Show actual status (e.g., "REVOKED")
        const status = body.trim().toUpperCase().substring(0, 50);
        showOverlay('red', status);
        return;
    }

    // All checks passed
    showOverlay('green', 'VERIFIED');
}
```

## Test Coverage

### Unit Tests (Jest) - 68 tests

**ocr-hash.test.js (30 tests):**
- Text normalization (whitespace, Unicode characters)
- SHA-256 hashing
- Registration mark positioning
- Full verification flow

**app-logic.test.js (38 tests):**
- Canvas rotation (0°, 90°, 180°, 270°, negative angles)
- URL extraction (space removal, validation, verify: and https:// prefixes)
- Certification text extraction
- Hash matching logic
- buildVerificationUrl (converts verify: to https:// with hash appended)

**cv-geometry.test.js:**
- Corner ordering
- Square candidate scoring

**detectSquares.node.test.js:**
- Placeholder tests (fixtures exist)

### E2E Tests (Playwright) - 16 tests

**e2e/cv-detect.spec.ts (8 tests):**
- Detection on should-detect fixtures ✓
- Detection on mixed fixtures ✓
- Non-detection on should-not-detect fixtures ✓

**e2e/cv-ocr.spec.ts (8 tests):**
- OCR on cropped regions ✓
- Text extraction and normalization ✓

### Test Commands

```bash
npm test              # All tests (unit + E2E)
npm run test:unit     # Jest only
npm run test:e2e      # Playwright only
```

## Training Pages

Three fictional Unseen University certificates (Terry Pratchett universe) for testing:

1. **Bachelor of Thaumatology** - Ponder Stibbons
   - Hash: `1cddfbb2adfa13e4562d274b59e56b946f174a0feb566622dd67a4880cf0b223`

2. **Master of Applied Anthropics** - Esk Weatherwax
   - Hash: `6725b845dcdf2490adf8d5f62e09e5f2055cb80c6200e5ccf58875c8190f4a80`

3. **Doctorate in High Energy Magic** - Adrian Turnipseed
   - Hash: `09d1e6765c2dbd833e5a1f4770d9f0c9368224f7b1aed34de7a3bd5bf4d1f031`

All have corresponding verification endpoints at `/c/{hash}/index.html`

## Dependencies

### Runtime (Loaded from CDN)
- **Tesseract.js v5**: OCR engine (~2MB WASM)
- **OpenCV.js 4.x**: Computer vision for registration mark detection (~8MB)
- **Web Crypto API**: Built into browsers for SHA-256

### Development (npm install)
- **Jest 29**: Testing framework
- **@playwright/test**: E2E testing
- **jsdom**: DOM environment for Jest
- **jest-environment-jsdom**: jsdom integration for Jest

### NOT Used
- ~~Express/CORS~~ (no server needed)
- ~~better-sqlite3~~ (no database needed)

## Build Process

### Generate Hash Database

```bash
node build-hashes.js
```

Creates:
- `public/hashes.json` - Metadata for all hashes
- `public/c/{hash}/index.html` - Verification endpoints
- Updates build timestamp in `public/live-verify-app.js`

### Generate Training Pages

```bash
node generate-training-pages.js
```

Creates HTML pages for the three training certificates.

## Deployment

### GitHub Pages (Current)
1. Push to GitHub
2. GitHub Actions runs tests
3. Deploys `public/` folder to `https://paul-hammant.github.io/live-verify/`

### Local Testing
```bash
cd public
python3 -m http.server 8000
# Visit http://localhost:8000
```

**Note:** HTTPS required for camera access. Use GitHub Pages or ngrok for mobile testing.

## CORS Considerations

The app performs a **full fetch** of verification URLs:
- If CORS allows: Fetches and checks for HTTP 200 + "OK" in body
- If CORS blocks: Shows "CANNOT VERIFY - Network error or CORS restriction"

Most verification endpoints need CORS headers:
```
Access-Control-Allow-Origin: *
```

GitHub Pages provides this automatically.

## UI/UX Features

### Camera Controls
- Enable Camera → Stop Camera
- Floating shutter button (center of viewfinder)
- Resolution fallback: 4K → 1080p → 720p

### Result Display (Tabbed Interface)
1. **Captured Image** - Cropped & oriented image with "Copy Image" button
2. **Extracted Text** - Raw OCR output
3. **Normalized Text** - After normalization rules applied

### Status Indicators
- 📷 Ready to scan
- ✅ Camera active
- 📸 Capturing...
- 🧭 Detecting registration square...
- 🔄 Detecting text orientation...
- 🔧 Normalizing text...
- 🔐 Generating hash...
- 🌐 Verifying against claimed URL...
- ✅ VERIFIED / ❌ FAILS VERIFICATION

### Easter Egg
Click the app title to see build timestamp.

## Recent Development (Jan 2025)

### Progress Bar Timing Fix
- **Issue:** Progress bar appeared before camera shutter
- **Fix:** Reordered code to capture image first, then show processing

### Test Coverage Expansion
- Added `app-logic.test.js` (29 tests) for pure functions
- Extracted testable logic from `live-verify-app.js`
- All production browser code now tested (except DOM/API-dependent code)

### Documentation Updates
- Added SHA-256 parameters to NORMALIZATION.md (UTF-8 input, hex lowercase output, no HMAC)
- Updated implementation notes to reflect test coverage

### Code Deduplication
- Created `public/normalize.js` as single source of truth
- Removed duplicate normalization from `live-verify-app.js` and test pages
- Build tool mirrors the same logic

## Known Limitations

1. **OCR accuracy**: Tesseract isn't perfect, may need retries
2. **Registration marks**: Must be visible and form a clear rectangle
3. **Lighting**: Poor lighting affects both detection and OCR quality
4. **Camera quality**: Works best with modern phone cameras
5. **HTTPS required**: Camera API needs HTTPS (GitHub Pages provides this)
6. **Wide-angle lens**: Some phones capture wide FOV, reducing text pixel density
7. **iOS zoom**: No zoom control available on iOS Safari

## Architecture Rationale

1. **No server costs**: Static files on GitHub Pages = free
2. **Privacy**: No data sent to servers, everything processed locally
3. **Offline capable**: After initial load, works without internet (except URL verification)
4. **Mobile-first**: Designed for phone cameras
5. **Simple deployment**: Just push to GitHub
6. **Transparent**: All code visible, no black boxes
7. **Scalable**: Each org hosts their own verification endpoints
8. **Testable**: 68 unit tests + 16 E2E tests, all production code tested

## How Certification Agencies Use This

1. **Generate certification text**
2. **Normalize it** using same rules (Unicode + whitespace)
3. **Compute SHA-256 hash**
4. **Create base URL for printing**: `verify:your-org.com/c`
5. **Print text + registration marks + base URL** on document (use Courier New font for verify: URL)
6. **Host endpoint** at `https://your-org.com/c/{hash}` returning:
   - HTTP 200 status
   - Body containing "OK" (or "REVOKED" to fail verification)
   - CORS header: `Access-Control-Allow-Origin: *`
7. **Optional: Host `.verification-meta.json`** at `https://your-org.com/c/.verification-meta.json` with:
   - Document-specific normalization rules (`charNormalization` for diacritics, `ocrNormalizationRules` for regex cleanup)
   - Optional Tesseract OCR optimization settings
   - Character whitelist specific to your document type (in `tesseract` section)

Note: The document shows `verify:your-org.com/c` but the app converts this to `https://your-org.com/c/{hash}` when fetching.

## Development Guidelines

### No Defensive Coding for Dependencies

This project enforces a **fail-loudly** philosophy for dependencies. We DO NOT use defensive coding patterns like:

```javascript
// ❌ BAD - Silent fallbacks
try {
    const psl = require('psl');
} catch (e) {
    console.warn('psl not available, using fallback');
}

// ❌ BAD - typeof checks
if (typeof require !== 'undefined') {
    const psl = require('psl');
}

// ❌ BAD - || fallbacks
const psl = window.psl || require('psl');
```

Instead, dependencies MUST be available or the app fails:

```javascript
// ✅ GOOD - Fail loudly if psl not available
const psl = (typeof window !== 'undefined' && window.psl) || require('psl');
```

**Why:**
- Silent failures in production are worse than loud failures in development
- Missing dependencies should be caught during build/test, not in production
- Defensive fallbacks hide configuration problems

**How we enforce this:**
- ESLint rules (`eslint.config.js`) forbid defensive patterns
- Run `npm run lint` to check for violations
- CI should fail if linting fails

**How we handle browser vs Node.js:**
- Browser: Load from CDN (see `<script>` tags in `index.html`)
- Node.js tests: `npm install` provides dependencies
- Both environments get the same code - no fallbacks


## Trust Model

The app verifies:
1. ✅ Computed hash matches the hash in the URL
2. ✅ URL endpoint exists (HTTP 200)
3. ✅ Endpoint confirms validity (body contains "OK")

**Trust assumption:** The domain owner (e.g., `intertek.com`) won't host fake verification endpoints.

**Attack resistance:**
- Can't forge a URL with correct hash without the original text
- Can't alter text without changing the hash
- Can't use someone else's hash because OCR'd URL won't match

## If Returning to This Project

### Quick Start
```bash
npm install
npm test                    # Should see 68 + 16 tests pass
```

### Key Files to Review
- `public/live-verify-app.js` - Main app logic
- `public/normalize.js` - Normalization (tested)
- `public/app-logic.js` - Pure functions (tested)
- `public/cv/detectSquares.js` - Computer vision
- `ocr-hash.test.js` - Test cases showing expected behavior
- `app-logic.test.js` - More test cases
- `NORMALIZATION.md` - Complete normalization spec

### Common Tasks
- **Add training page:** Edit `generate-training-pages.js`, run it, add hash to `build-hashes.js`
- **Change normalization:** Update `public/normalize.js`, verify tests pass
- **Fix detection:** Adjust thresholds in `public/cv/detectSquares.js`
- **Add fixture:** Place PNG in `test/fixtures/should-detect/`, add `.txt` with expected text

## Use-Case-Specific Implementation Nuances

**This section addresses practical considerations for specific organization types.**

### Healthcare Facilities: The Credentialing Complexity

**Key Nuance:** Healthcare adds regulatory layers that hotels don't have.

- **Credential Verification vs. Identity Verification:** Your patients need to know both "who is this person?" (identity) and "are they licensed?" (credential). The e-Ink badge solves the second; photo handles the first. Budget time for staff training that this is *not* the same as traditional photo ID checks
- **License Boards Integration:** If you want real-time license status (suspended, expired, active), you need to either:
  - Partner with state medical/nursing boards for API access (complex, 3-6 months)
  - Pre-generate badge hashes daily from board data (requires daily hash rebuilds)
  - Use hash-based status (simpler, but less real-time)
- **Abusive Patient Escalation:** You will get calls from staff saying "A patient scanned my badge 10 times in 2 hours." Rate limiting prevents this at the app level, but you need security/HR procedures to actually *respond*. Budget time for legal review of harassment policy *before* deployment
- **HIPAA Audit Log Retention:** Your audit logs documenting "Dr. Smith was verified at 2:15 PM in CCU" are medical records. They stay for 6 years minimum under HIPAA. Budget data storage; don't assume it's negligible
- **Timeline Expectation:** Healthcare implementation is 12-18 months (vs. 6-12 months for hotels), mostly due to regulatory review and credentialing integration

### Police Departments: The Officer Safety Paradox

**Key Nuance:** Verification helps citizens, but exposes officers to doxing. You must solve this or face officer resistance.

- **Privacy-Protective Claim vs. Badge Display:** The breakthrough is that your badge can show "Officer A 1332" (for identification) but the verification claim never includes the badge number. Instead, it verifies "NYC Police Department officer, active duty, authorized for traffic enforcement" (anonymized, role-based). This is *the* critical architectural choice. Without this, you cannot ethically deploy to officers working organized crime, narcotics, or undercover
- **Rotating Salt Non-Negotiable:** If your police department issues static badges with permanent hashes, you've created a searchable database. A suspect verifies an officer's hash, then can verify it repeatedly to track the officer's movements (Brixton, then Peckham, then Westminster = movement trail). You must use ephemeral hashes (10-minute rotation) or officers will resist
- **Federal vs. Local:** FBI, ATF, and federal agents have even higher operational security needs. If you deploy to federal LEO, your verification system cannot expose operational assignment or task force affiliation. Design around this from day one
- **Citizen Verification Expectations:** Not all citizens will understand why they can verify an officer is real but can't see the officer's full name. Budget time for public education. Some will feel this is "opaque." Address this in your messaging
- **Timeline Expectation:** 9-15 months, heavily back-loaded with officer buy-in and operational security review

### Hotels & Vacation Rentals: The Counterfeiting Problem

**Key Nuance:** Your biggest risk is printed counterfeits. E-Ink doesn't help if counterfeits are in circulation.

- **Badge Replacement Logistics:** When you switch to e-Ink, you have old plastic badges in circulation. You need a *sunset policy* — plastic badges stop working on Date X. Without this, guests see both types and may not understand which is real. Budget 3-6 months to get all staff switched over; shorter timelines will have parallel authentication confusion
- **Guest Training:** Not all guests will carry phones or understand how to scan. Some will ask staff to do it for them (defeats the purpose). Budget time for signage ("You can scan our staff badges using the hotel app") and guest education
- **Turnover Reality:** If you have 50% staff turnover annually, issuing new badges for half your staff every year is normal ops. If you have 20% turnover, badge distribution isn't a burden. Know your baseline
- **Third-Party Contractors:** Housekeeping, maintenance, laundry, food service contractors may not want e-Ink badges if they work multiple hotels. Will you mandate it? Provide it? Ensure contracts allow it? This is an underestimated friction point
- **Timeline Expectation:** 6-10 months for hotels (shorter than healthcare/police because fewer regulatory constraints)

### Residential Buildings & Apartment Management: The Burden of Proof

**Key Nuance:** You're asking residents to trust a system they didn't choose, for contractors they didn't hire.

- **Resident Adoption:** Unlike hotels, residents have limited incentive to scan contractor badges if they're expecting the work. The value proposition ("Are you sure you want to let a stranger in?") only works if residents are naturally skeptical. Know your resident demographics before deploying
- **Work Order Integration:** For e-Ink verification to work, your badge system must tie to your work order system. A contractor shows up with badge for unit 412 on Friday 9-5, but there's no work order in the system. Now the resident won't let them in *correctly*, but you have a service gap. Budget time for integrating badges with your maintenance scheduling software
- **Contractor Resistance:** Many plumbers, electricians, and HVAC companies work multiple buildings. They won't want separate badges for each. Provide lanyards, centralized distribution, or other solutions to reduce friction
- **Insurance & Liability:** If a contractor commits theft and claims "But I was verified, so that proves I was authorized," your insurance may have questions. Work with your insurance and legal counsel on liability implications *before* deployment
- **Timeline Expectation:** 8-12 months (contractor coordination adds friction)

### Event Venues & Hospitality: The Temporary Logistics Challenge

**Key Nuance:** You're managing hundreds of workers you'll never see again. Verification is useful, but only if you have a process to issue badges quickly.

- **Just-In-Time Badge Printing:** Unlike permanent staff, event contractors arrive 2-3 days before setup. You don't have time for a 3-week badge process. You need *rapid printing* (24 hours or less) or a kiosk system for on-site badge generation. Budget for this upfront
- **Multi-Company Coordination:** If setup involves 5 different contractors (security, catering, AV, talent handlers, event staff), they all need badges issued by 5 different companies. Who coordinates? Who enforces policy? One company won't adopt if others don't, and vice versa. This is a *coordination problem*, not a technology problem
- **Post-Event Badge Destruction:** After the event, you have 500 single-use e-Ink badges. Do you recycle? Destroy? Store? Budget for disposal and secure destruction (GDPR/privacy regulation applies)
- **Timeline Expectation:** 6-9 months to implement, but with higher ongoing logistics burden (each event = badge coordination cycle)

---

## Related Concepts

- Estonia's KSI blockchain (mentioned in blog post)
- Merkle trees for audit trails
- NFT-less verification (no blockchain needed for basic use case)
- The Medpro/Intertek fraud case that inspired this
- OpenCV.js for web-based computer vision
- Independent Witnessing and Stateful Verification (see Technical_Concepts.md)

## License

GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later)

All code requires AGPL license header. Run `./add-license-headers.sh` to add missing headers.
