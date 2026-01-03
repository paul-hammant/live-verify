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
8. [Deployment Architecture](#deployment-architecture-air-gapped-originals-public-hashes)
9. [Independent Witnessing & Stateful Verification](#independent-witnessing--stateful-verification)

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

**Default: SHA-256** - Used for most documents (degrees, receipts, certifications).

**Properties:**
- **256-bit output** - 64 hexadecimal characters.
- **One-way function** - Cannot reconstruct original text from hash.
- **Collision-resistant** - Probability of two different texts producing same hash: ~1 in 2^256 (effectively zero).
- **Fast** - Computes in milliseconds on modern phones.

### Flexible Algorithm Choice

While SHA-256 is the recommended default, different use cases may prefer stronger or weaker alternatives. The preferred algorithm for a domain is specified in its [`.verification-meta.json`](#extended-response-with-metadata) file.

**SHA-512 for High-Security Documents** (Government IDs, Passports):
- **Why upgrade:** Provides significantly higher collision resistance and better long-term "future-proofing" against theoretical quantum computing threats.
- **Tradeoff:** Produces 128 hex characters (longer URLs).

**Weaker/Faster Algorithms** (Low-value, high-volume micro-transactions):
- In rare cases where extreme speed or minimal URL length is required for non-critical claims (e.g., short-lived loyalty points), an organization might choose a faster algorithm or a truncated hash, provided the entropy is managed to prevent brute-force guessing.

**Verification apps must:**
1. Check for a `hashAlgorithm` specification in the issuer's `.verification-meta.json`.
2. Fall back to SHA-256 if no algorithm is specified.

### Configuring via .verification-meta.json

Organizations specify their hash algorithm choice in the root-level configuration:

```json
{
  "hashAlgorithm": "SHA-512",
  "description": "Government ID uses stronger hash for long-term security"
}
```

**Hash not printed on document:**
Critical privacy property - the hash is **never** printed on the physical document. Only the base verification URL (`verify:example.com/c`) appears. This prevents hash enumeration from public photos and ensures privacy.

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

**Using `.verification-meta.json` configuration:**

Organizations can host `https://example.com/c/.verification-meta.json` to define custom response types and suggest more integrated participation:

```json
{
  "integrationLinks": {
    "website": "https://example.com/verify-help",
    "iosApp": "https://apps.apple.com/app/example-verify",
    "androidApp": "https://play.google.com/store/apps/details?id=com.example.verify"
  },
  "responseTypes": {
    "SUPERSEDED": {
      "class": "denying",
      "text": "This document has been replaced by a newer version",
      "link": "https://example.com/verification-updates.html"
    }
  }
}
```

This allows the verifier's generic app to suggest the issuer's dedicated app for a more rich experience (e.g., real-time notifications or biometric integration).

See [README.md: For Organizations Creating Verifiable Documents](README.md#for-organizations-creating-verifiable-documents) for complete `.verification-meta.json` specification.

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

## Dynamic Badges & Worker Verification

In some high-volume use cases (delivery drivers, utility workers, field inspectors), the "document" being verified is a **Dynamic Badge** or wearable pendant.

### e-Ink Badges

Static ID cards can be easily photographed or forged. Next-generation worker verification uses **e-Ink badges** that can display a rotating "Salt" or a specific "Session ID" linked to the worker's current task.

**Typical Use Cases:**
- **[Police Officer Verification](public/use-cases/data/police-officer-verification.md):** Preventing impersonation during traffic stops or home visits.
- **[Delivery & Courier Verification](public/use-cases/data/delivery-courier-verification.md):** High-volume interactions where route-specific salts protect driver privacy.
- **[Utility & Field Worker Verification](public/use-cases/data/utility-field-worker-verification.md):** Verifying authorized access for meter readers and repair crews.
- **[Social Services Worker Verification](public/use-cases/data/social-services-worker-verification.md):** Ensuring the legitimacy of officials conducting sensitive home visits.
- **[Hotel & Vacation Rental Staff](public/use-cases/data/hotel-staff-verification.md):** Verifying maintenance and room-service workers at the guest's door.

**How it works:**
1.  **Task Assignment:** A driver starts a delivery shift. Their phone app syncs a unique salt to their e-Ink badge via Bluetooth.
2.  **Visual Presentation:** The worker shows the badge through a window or doorbell camera. The badge displays their name, ID, and the current session salt.
3.  **No-Friction Verification:** The recipient scans the badge. The salt ensures that a simple photocopy of the badge won't verify. The hash lookup returns the worker's current duty status and assignment.

### Pre-Notification Integration

Where a recipient already has a relationship with the issuer (e.g., an Amazon customer expecting a package), the verification details can be pushed to the recipient's phone via SMS, email, or a mobile app **before** the worker arrives.

- **Synced Metadata:** The "Verification Line" on the driver's e-Ink badge matches the details sent in the "Out for Delivery" notification.
- **Participatory Security:** The recipient can verify the driver's authority without needing to interact or open the door, increasing safety for both parties.

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

## Deployment Architecture: Air-Gapped Originals, Public Hashes

**Critical principle for organizations:** The hash database should be completely separate from the original credential data.

### The Security Model

**What's sensitive (private tier - secure zone):**
- Original credential records (graduate names, degree details, photos)
- Student information systems, medical license databases
- Personally identifiable information (PII)
- Application data, correspondence, supporting documents

**What's public (public-facing tier - verification service):**
- Just the hashes and their verification status (OK/REVOKED)
- No names, no details, no PII
- Hash reveals nothing about the document content (one-way function)

**12-factor / cloud-native perspective:**
- Verification service: stateless, auto-scaling, treats hash database as attached resource (backing service)
- Hash database: managed service (DynamoDB, Cloud SQL, etc.) or static storage (S3, Cloud Storage)
- Config: environment variables for database connection strings
- Security: VPC/security groups, IAM roles, not traditional "DMZ"

### Production Architecture

**Recommended deployment pattern:**

```
┌─────────────────────────────────────────┐
│  PRIVATE TIER (Secure Zone)            │
│  • Air-gapped or VPC-isolated          │
│  • No public internet access           │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Original Records Database       │   │
│  │ • Graduate names, details       │   │
│  │ • Degree types, honors, dates   │   │
│  │ • Photos, signatures            │   │
│  └─────────────────────────────────┘   │
│              │                          │
│              │ Hash generation          │
│              │ (batch or real-time)     │
│              ▼                          │
│  ┌─────────────────────────────────┐   │
│  │ Hash Generator                  │   │
│  │ • Reads original records        │   │
│  │ • Applies normalization         │   │
│  │ • Computes SHA-256 hashes       │   │
│  │ • Generates static files OR     │   │
│  │ • Syncs to verification database│   │
│  └─────────────────────────────────┘   │
│              │                          │
└──────────────┼──────────────────────────┘
               │ One-way transfer
               │ (hashes only, no PII)
               ▼
┌─────────────────────────────────────────┐
│  PUBLIC-FACING TIER                    │
│  • Exposed to internet                 │
│  • Stateless, auto-scaling             │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Verification Data Store         │   │
│  │ (Backing Service)               │   │
│  │ • Static files (S3/CDN) OR      │   │
│  │ • Database (DynamoDB, Cloud SQL)│   │
│  │ • {hash} → status only          │   │
│  │ • No names, no PII              │   │
│  └─────────────────────────────────┘   │
│              │                          │
│              │ HTTPS requests           │
│              ▼                          │
│  ┌─────────────────────────────────┐   │
│  │ Verification Service            │   │
│  │ • Stateless (12-factor)         │   │
│  │ • Static server OR serverless   │   │
│  │ • Config via environment vars   │   │
│  │ • Public internet access        │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Why This Matters

**If the hash database is compromised:**
- Attacker gets a list of SHA-256 hashes
- Hashes are one-way (cannot reverse to get names/details)
- No PII exposed, no privacy breach
- Worst case: Attacker knows "these credentials exist" but not who they belong to

**If the original records database is compromised:**
- This is a serious breach (PII exposed)
- But: Air-gapping makes this much harder to achieve
- The hash database remains unaffected (different system)

### Deployment Option 1: Static Files

**Simple, scalable, zero database vulnerabilities:**

Generate static files in the secure zone, transfer to DMZ:

```bash
# In secure zone, run once per day/week:
./generate-hashes.sh

# Creates:
# public/c/abc123.../index.html  → "OK"
# public/c/def456.../index.html  → "OK"
# public/c/xyz789.../index.html  → "REVOKED"

# Transfer to public-facing tier (one-way sync):
rsync -av --delete public/ public-server:/var/www/degrees/
# Or: aws s3 sync public/ s3://degrees-bucket/

# Public server just serves static files - no database, no queries
```

**Benefits:**
- No database in public tier (nothing to query, nothing to steal)
- Infinitely scalable (CDN can cache everything)
- No SQL injection, no database vulnerabilities
- Can't be compromised to modify statuses (read-only filesystem / object storage)
- Cheap to host (GitHub Pages, Cloudflare Pages, S3 + CloudFront, Cloud Storage + CDN)

### Hash Updates: One-Way Flow

**When a credential status changes (revoked, suspended):**

1. **Private tier:** Update status in original records database
2. **Private tier:** Regenerate affected hash file(s)
3. **Transfer:** Push updated static files to public tier
4. **Public tier:** Overwrite old files (or blue/green deployment)

**Never:** Allow public tier to query back into private tier
**Never:** Store PII in public-facing services
**Never:** Allow public internet to reach secure zone

### Example: University Degree Verification

**University of Edinburgh deploys like this:**

**Private tier (internal network, VPC-isolated):**
- Student records database (Oracle, PostgreSQL, whatever)
- Alumni data, graduation dates, honors, photos
- Generate hashes nightly: `cron: 0 2 * * * /usr/local/bin/generate-degree-hashes.sh`
- Creates 50,000 static files (one per graduate)
- Transfers to public tier via one-way sync (rsync, S3 sync, etc.)

**Public-facing tier (degrees.ed.ac.uk):**
- Static hosting (Nginx, Apache, S3+CloudFront, Cloud Storage+CDN)
- 50,000 tiny files: `/c/{hash}/index.html` containing "OK"
- If student's degree is revoked: file contents change to `{"status": "REVOKED"}`
- No database, no application server, no state (12-factor backing service pattern)

### Cost and Scale

**Static file approach scales incredibly well:**

- **10,000 graduates:** 10,000 tiny files (~50 bytes each = 500 KB total)
- **100,000 graduates:** 100,000 files (~5 MB total)
- **1,000,000 graduates:** 1M files (~50 MB total)

**Hosting cost:** $0 (GitHub Pages) to $1-5/month (Cloudflare, AWS S3)

**Performance:** CDN caches everything, sub-10ms response times globally

### Deployment Option 2: Dynamic Database

**Sophisticated, flexible, real-time updates:**

Many organizations prefer a database in the DMZ for dynamic queries:

```
DMZ:
  ┌─────────────────────────┐
  │ Read-Only Hash Database │
  │ • PostgreSQL, DynamoDB  │
  │ • Hash → Status lookup  │
  │ • No PII, just hashes   │
  └─────────────────────────┘
           │
           ▼
  ┌─────────────────────────┐
  │ Serverless Function     │
  │ • AWS Lambda            │
  │ • Cloudflare Workers    │
  │ • Queries hash database │
  └─────────────────────────┘
```

**Advantages of dynamic approach:**
- **Real-time updates:** Revoke a credential, instant effect (no file regeneration)
- **Scale:** Millions of credentials without filesystem limits
- **Flexibility:** Complex queries (e.g., "all credentials issued in 2024")
- **Analytics:** Track verification counts, geographic patterns, peak times
- **Metadata:** Return dynamic info (last verified timestamp, verification count)
- **Standards:** Many organizations already have database expertise/infrastructure
- **Granular control:** Per-hash access logging, rate limiting, abuse detection

**Tradeoffs vs static:**
- Need to secure database (SQL injection, access control, etc.)
- Slightly higher hosting cost ($10-50/month vs $0-5/month)
- More complex infrastructure (database + application server/serverless)
- Database is a target (though still only contains hashes, no PII)

**Critical security rule (same as static):**
- Database in DMZ contains **only hashes + statuses**
- No PII, no names, no details
- Air-gapped secure zone generates the data
- One-way flow: secure zone → DMZ (never reverse)

**Popular serverless stacks for dynamic approach:**
- **AWS:** DynamoDB (hash table) + Lambda (API) + CloudFront (CDN)
- **Google Cloud:** Firestore + Cloud Functions + Cloud CDN
- **Azure:** Cosmos DB + Azure Functions + Front Door
- **Cloudflare:** Workers KV (edge database) + Workers (serverless)

These architectures auto-scale, have built-in security, and cost pennies per million requests.

### Choosing Between Static and Dynamic

**Both approaches are valid.** Choose based on your needs:

| Factor | Static Files | Dynamic Database |
|--------|-------------|------------------|
| **Simplicity** | ✅ Extremely simple | ⚠️ More complex |
| **Cost** | ✅ $0-5/month | ⚠️ $10-50/month |
| **Scale** | ✅ Up to ~1M files | ✅ Unlimited |
| **Update speed** | ⚠️ Batch (hourly/daily) | ✅ Real-time |
| **Security surface** | ✅ Read-only files | ⚠️ Database to secure |
| **CDN caching** | ✅ Perfect for CDN | ⚠️ Cache invalidation needed |
| **Analytics** | ❌ No tracking | ✅ Full analytics |
| **Expertise needed** | ✅ Basic web hosting | ⚠️ Database + app server |
| **Failure modes** | ✅ Few moving parts | ⚠️ DB/app can fail |

**Common choices:**
- **Universities:** Static (simple, cheap, sufficient for daily/weekly updates)
- **Medical boards:** Dynamic (real-time revocations critical)
- **Government DMVs:** Dynamic (millions of licenses, frequent updates)
- **Small certifiers:** Static (hundreds of certs, rarely revoked)
- **Financial institutions:** Dynamic (analytics, audit trails, compliance)

**Hybrid approach (best of both):**

Some sophisticated organizations use both:

```
Secure Zone:
  └─> Generate hashes
       ├─> Push to static CDN (fast, global, cached)
       └─> Sync to database (analytics, real-time admin)

Public queries:
  └─> CDN serves static files (99% of traffic, cached)

Admin/analytics:
  └─> Database API (real-time stats, not public)
```

This gives CDN speed + database flexibility without exposing the database to public traffic.

### Disaster Recovery

**If DMZ is completely destroyed:**
1. Original records are safe (air-gapped)
2. Regenerate all hashes from secure zone
3. Redeploy to new DMZ infrastructure
4. Back online within hours

**If secure zone is compromised (worst case):**
1. Hash database in DMZ continues serving (verification still works)
2. Restore secure zone from backups
3. Investigate breach, revoke affected credentials
4. Regenerate hashes, push updates to DMZ

### Summary: Separation of Concerns

**Original documents:** Never lose these. Air-gapped, backed up, secured.

**Hash database:** Can be public-facing, static files, cheaply hosted. If stolen, reveals nothing (hashes are one-way).

**The magic:** Public can verify credentials without ever accessing the private data. Universities, medical boards, governments can offer instant verification without exposing student/patient/citizen records.

---

## Independent Witnessing & Stateful Verification

While the underlying text of a claim is static, its **legal or financial standing** can change over time.

### Stateful Verification

A verification endpoint can return different statuses during the lifecycle of a document.

**Example: Hotel Receipt Lifecycle**
1.  **Day 0 (Checkout):** Guest receives receipt for $500. Hash endpoint returns `{"status": "OK"}`.
2.  **Day 3 (Dispute):** Guest complains about a broken AC. Hotel agrees to a $100 refund.
3.  **Day 4 (Update):** The hotel updates their internal system. The **same hash** endpoint now returns `{"status": "AMENDED"}` (or `PARTIAL_REFUND`).

This allows external parties (like corporate finance or tax authorities) to see the *current* reality of a claim even if they only possess the *original* document. Note that specific refund amounts are typically NOT returned in the JSON to preserve privacy; the status change simply signals that the original total is no longer the final net amount.

### Independent Witnessing Services

To prevent issuers from "rewriting history" (e.g., deleting a verification record to hide a mistake), some implementations use a **Secondary Witness**.

**How it is communicated:**
There are two primary methods for identifying the witness service:

1.  **Explicitly on the document:** The physical document includes a second line or alias:
    ```
    verify:hotel-chain.com/c
    witness:independent-audit.org/w
    ```
2.  **Discovery via Issuer Response:** The primary verification GET request returns the witness URL as metadata in its response:
    ```json
    {
      "status": "OK",
      "witness": "https://independent-audit.org/w"
    }
    ```

**How it works:**
1.  **Issuance:** When the issuer creates the document, they send the hash to an independent third-party service (the Witness).
2.  **Anchoring:** The Witness stores the hash and a timestamp, often "anchoring" it to a public ledger (blockchain or certificate transparency log).
3.  **Verification:** The verifier app primarily checks the issuer's endpoint for current status. If witness information is available, the app provides an **option** to also check the Witness service to prove the document existed and was valid on its claimed issuance date.

**Benefits & Reasons for Existence:**
-   **Immutable Timestamps (Neutral Ground):** Proves a receipt or certificate wasn't backdated by the issuer or holder. The Witness provides a non-repudiable "Proof of Existence" at a specific point in time.
-   **Anti-Deletion / Issuer Longevity:** If an issuer goes out of business, deletes their records, or is compromised, the Witness service remains as a neutral proof that the document was once authoritative.
-   **Collusion Resistance:** Prevents an issuer and holder from colluding to create a "fake historical" record. If it wasn't witnessed on day zero, it can't be claimed as valid on day 100.
-   **Anti-Dishonesty (Conflict of Interest):** Prevents an issuer who is also the "Payor" from later denying a valid claim for financial gain. For example, if a Lottery Commission informs a user they won a jackpot via a digital or printed receipt, an independent witness prevents the Commission from later deleting the record or claiming "no one won" to keep the prize money.
-   **Audit Integrity:** Provides a neutral "third party" for resolving disputes between two parties (e.g., Guest vs. Hotel) without requiring one to trust the other's internal database.
-   **Public Transparency (Optional):** For government or high-stakes certifications, a Witness can publish hashes to a public ledger, allowing anyone to verify the volume and issuance rate of credentials without seeing PII.

---

## Summary

**Key takeaways:**

1. **Registration marks** - Black borders help computer vision find the scannable region
2. **Normalization** - Ensures consistent hashing despite OCR variations
3. **Domain binding** - Verification text specifies trusted authority, prevents impersonation
4. **Hash algorithms** - SHA-256 default, SHA-512 for high-security (passports)
5. **Response formats** - Simple "OK" or rich JSON with status/photo/metadata (keep minimal in practice)
6. **Photo encoding** - Base64 prevents enumeration, preserves privacy
7. **OCR challenges** - Works great for plain text today, on-device AI will handle ornate documents soon
8. **Deployment architecture** - Air-gap original records, publish only hashes to DMZ/public; static files ideal

**For implementation details:**
- Text normalization rules: [NORMALIZATION.md](NORMALIZATION.md)
- Creating verifiable documents: [README.md: For Organizations](README.md#for-organizations-creating-verifiable-documents)
- Computer vision detection: [public/cv/detectSquares.js](public/cv/detectSquares.js)
- Domain authority extraction: [public/domain-authority.js](public/domain-authority.js)

**Related documentation:**
- [Multi_Representation_Verification.md](Multi_Representation_Verification.md) - How one legal claim can have unlimited text representations
- [Verification_Charges.md](Verification_Charges.md) - Business models for free vs paid verification
- [LLM.md](LLM.md) - Complete project context for AI assistants
