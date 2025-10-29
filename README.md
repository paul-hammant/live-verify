# OCR-to-Hash Claim Verification System

**Proof of concept** implementing the approach described in: [OCR-to-Hash: A Simple Audit Trail for Physical Documents](https://paulhammant.com/2023/01/17/ocr-to-hash-simple-audit-trail-for-physical-documents/)

A **100% client-side** web app that uses phone camera OCR to verify printed claims via SHA-256 hash validation 
against URLs printed on the documents themselves. The app would verify claims of different types meaning as part of 
a general capability, meaning that the user isn't installed yet more verification apps and potentially worrying that
some of those apps themselves are mal-intended or inauthentic.

**Works via GitHub Pages** - No server application needed at the simplest level, and at the moment not even 
an installation: iOS or Android standard browser are just fine.

## What is a Claim?

A **claim** is any assertion printed on a physical document  (or up on a screen) that can be separately verified as true.

- A till (cash register) receipt claims a transaction occurred at a specific time and amount
- An academic certificate claims a degree was awarded to a named individual
- An employment letter claims someone worked at a company during specific dates
- A safety certification claims a product meets certain standards
- A medical license claims authorization to practice (or revocation thereof)
- Many more.

## How It Works

┌─────────────────────────────────┐
│                                 │
│  Some text or other that is     │
│  important to various parties   │
│  is accurate, and that          │
│  importance could be said to    │
│  be valuable. Likely there      │
│  are dates or numbers or some   │
│  non predictable in here too    │
│  verify:example.com/hashes      │
│                                 │
└─────────────────────────────────┘

1. Scans printed documents with phone camera for some rectangle subset of the larger pic
2. OCR that text (via Tesseract.js for example)
2. Extracts verification URL from the document (`verify:` changed to `https://`)
3. Normalizes other text (removes extra spaces, etc.)
4. Computes SHA-256 hash of the claim (one-way hash - important concept): `fb92e9f3086212ed68adbec9e9b32767a378cdd198b9d58b34f3c8718dbb9afe`
5. Checks the hash on the website indicated - https://example.com/hashes/fb92e9f3086212ed68adbec9e9b32767a378cdd198b9d58b34f3c8718dbb9afe is the one for the above
6. That URL existing and perhaps a text or JSON payload of "OK" is confirmation that the claim is verified.
7. Shows ✅ green "VERIFIED" or ❌ red "FAILS VERIFICATION" overlay or other affordance

**Critical transparency requirement:** The verification app MUST clearly display which domain/authority verified the claim. Not just "VERIFIED" but "VERIFIED by degrees.ed.ac.uk" or "VERIFIED by intertek.com". This is essential for trust - users need to see immediately who is vouching for the claim.

**Domain complexity:** Domains vary globally - `ed.ac.uk` is a domain (UK academic), `degrees.ed.ac.uk` is a subdomain (different authority), `foobar.com.br` is a domain (Brazil), `example.co.uk` is a domain. The verifying authority should be displayed as the full hostname from the verification URL (e.g., `degrees.ed.ac.uk`, not truncated to `ed.ac.uk`).

**Optional identity standard:** A future standard like `https://www.ed.ac.uk/~shortWhoIsThisPlainText` could provide human-readable authority information, but for now, showing the full hostname provides basic transparency about who is performing the verification.

The system allows anyone to verify these printed claims without requiring access to the issuer's internal databases.  It will work if you're scanning the same on a laptop/tablet or bigger screen, though you risk [moiré patterns](https://en.wikipedia.org/wiki/Moir%C3%A9_pattern).

Read about one way hash functions on [kikipedia](https://en.wikipedia.org/wiki/Cryptographic_hash_function)

## When OCR-to-Hash Verification Excels (vs QR Codes)

In short, if the claim is aimed at humans reading it and is printed on paper (or could be), it might be a candidate for non-blockchain tech.

Six detailed verification scenarios demonstrate OCR-to-hash advantages:

1. **[Education Credentials](Use_Case-Educational_Degrees.md)** - degree/etc verification with privacy-preserving public registries
2. **[B2B Product Certifications](Use_Case-Product_Labeling.md)** - Preventing supplier impersonation fraud (MedPro/Intertek case)
3. **[Receipt Verification](Use_Case-Sales_Recepts.md)** - Eliminating duplicate expense claims across employers
4. **[Medical Licenses](Use_Case-Medical_License.md)** - Revocable credentials with domain-binding security
5. **[Government ID Verification](Use_Case-Government_IDs.md)** - Cryptographic checks on plain text aspects (hotel checkin, traffic stop, entering a pub/bar)
6. **[Voting Ballot Proof](Use_Case-Voting_Proof.md)** - Verifiable vote counting with independent auditor confirmation

There are more potential OCR-to-Hash uses listed below.

QR and bar codes are much better for machine reading and might suit routing situations where authenticity does not need to be double checked by humans at every step.  An example would be a package already in the Fedex global distribution system. Where it is and needs to go next is the key piece aided by the QR/bar codes. It does not need to be validated over by humans. The printed destination is still on the label, but isn't used again until the last 100 meters or yards when the delivery associate has it in hand, and the recipient glances at it too for routing to individuals hopefully nearby.

### Why QR Codes FAIL for Resume/CVs

**1. Professionalism / Visual Clutter**

A CV might have 5-10 verifiable claims:
- BSc Edinburgh (2016)
- MSc Cambridge (2018)
- Worked at Google (2018-2020)
- Worked at Microsoft (2020-2023)
- AWS Certified Solutions Architect

That's **5 QR codes cluttering a professional document**. Makes the CV look amateurish or more like a flyer.

The interviewer can't read "Edinburgh University First Class Honours" by looking at a QR code, so you'd need both the QR code and the text. Whereas, OCR-to-hash keeps the - The text IS the certification, not hidden behind machine codes

**2. Privacy Exposure**

QR codes must contain either a link to the same claim on an authentic site, or the entire claim with a larger amount of pixels needed and a means to double check that with a remote service run by the degree issuing authority (the Uni/college). Do you have to log in to that site to see the same details? Log in after someone registering an account of set of accounts to use, perhaps. This all has a common challenge: how to guarantee the larger data collection isn't scrapeable.

**3. Tampering / Forging**

It is easy to deploy a QR code that points to `https://fake-edinburgh-university.com/degrees/some/plausable/path/to/certiciate.html` and the user clicking on the link to take you to that URL might miss that the domain is inauthentic however well styled the content is.

## Decision Criteria: OCR-to-Hash vs QR Code

**OCR-to-Hash is BEST when:**

| Criterion | Why It Matters | CV Example |
|-----------|----------------|------------|
| Human readability primary | Document is for humans first, verification is secondary | Interviewer reads "First Class Honours", verifies if suspicious |
| Professional appearance | Visual clutter unacceptable | CV must look polished, not technical |
| Multiple independent claims | Each claim verified separately | Degree + 3 employers + 2 certs = 6 verifications |
| Privacy-preserving | Hash should NOT be publicly visible | No public registry of "who graduated where" |
| Authorized verification only | Only parties with physical doc should verify | Only interviewer with CV in hand can verify |
| Formal certificate format | Ornate, bordered, human-readable | Matches existing certificate design patterns |
| Text already exists | Not adding verification to existing system, verification IS the text | The degree claim is the text itself |

**QR Code is BEST when:**

| Criterion | Why It Matters | Counter-example |
|-----------|----------------|-----------------|
| Machine processing primary | Humans don't need to read it | Shipping labels, inventory tags |
| Space constrained | Label too small for registration marks + text | Specimen tubes, tiny product labels |
| Speed critical | Instant scan, no OCR processing time | Boarding passes, event tickets |
| Already machine-focused | Document already uses barcodes | Retail receipts, package tracking |
| Real-time status | QR points to live page with current status | Product recall page (status changes) |
| Public verification expected | Anyone should be able to verify | Authenticity tags on luxury goods |

## The Dividing Line

**Ask yourself:** *"Would a human need to read and understand this text for the document to serve its primary purpose?"*

- **YES** → OCR-to-hash (CV, certificate, legal document, driver's license, printed receipts for store purchases)
- **NO** → QR code (shipping label, inventory tag, boarding pass)

## Strong Use Cases for OCR-to-Hash

- ✅ Academic degrees/certificates
- ✅ Professional licenses (wallet cards - medical, legal, engineering)
- ✅ Employment verification letters
- ✅ Formal certifications (safety, medical, legal documents)
- ✅ Government IDs (driver's licenses, passports) - for non-government verifiers
- ✅ Birth/death certificates, legal documents
- ✅ Court documents, notarized attestations
- ✅ Tax receipts for expense claims (prevents double-expensing)

## Where QR Codes Are Actually Better

- ❌ Shipping labels - already uses barcodes, speed matters, machine-only, highly temporal
- ❌ Price tags - retail and shippers already has barcode infrastructure
- ❌ Event tickets - speed of entry critical
- ❌ Component traceability - tiny labels, machine scanning
- ❌ Gift cards - already use barcodes/magnetic stripe

## Technology Quick Start

**Deploy to GitHub Pages:**

```bash
git push origin main
# Enable GitHub Pages in repo settings → Pages → Source: /public
# Access at: https://YOUR_USERNAME.github.io/YOUR_REPO/
```

**Run Locally:**
```bash
cd public
python3 -m http.server 8000
# Open http://localhost:8000
```

No `npm install` needed - pure HTML/CSS/JS with Tesseract.js from CDN.

## Usage

1. Open app on phone, click "Start Camera"
2. Position registration marks around document text + URL
3. Click "Capture & Verify"
4. See ✅ green "VERIFIED" or ❌ red "FAILS VERIFICATION"

## For Organizations Creating Verifiable Documents

To create verifiable documents:

1. Generate certification text
2. Normalize it (Unicode normalization + whitespace rules - see NORMALIZATION.md)
3. Compute SHA-256 hash
4. Print text within registration marks + base URL: `verify:your-org.com/c` (use Courier New font)
5. Host verification endpoint at `https://your-org.com/c/{HASH}` returning HTTP 200 + "OK" for valid hashes
6. Optional: Host `.verific-meta.json` at `https://your-org.com/c/.verific-meta.json` with OCR optimization settings

The `.verific-meta.json` file can improve OCR accuracy by providing Tesseract.js configuration and establish authority relationships:

```json
{
  "issuer": "Your Organization Name",
  "claimType": "Employment verification",
  "parentAuthorities": [
    "https://accreditation-body.org/members/your-org",
    "https://regulatory-agency.gov/licensed/your-org"
  ],
  "responseTypes": {
    "OK": {
      "class": "affirming",
      "text": "This claim is verified and authentic",
      "link": "https://your-org.com/verification-info"
    },
    "REVOKED": {
      "class": "denying",
      "text": "This credential has been revoked",
      "link": "https://your-org.com/revocation-policy.html"
    },
    "SUPERSEDED": {
      "class": "denying",
      "text": "This document has been replaced by a newer version",
      "link": "https://your-org.com/verification-updates.html"
    }
  },
  "retentionLaws": [
    {
      "jurisdiction": "European Union",
      "law": "GDPR Article 5(1)(e)",
      "link": "https://gdpr-info.eu/art-5-gdpr/",
      "summary": "Personal data kept no longer than necessary; verification data retained only if strictly necessary for legal compliance"
    },
    {
      "jurisdiction": "United States",
      "law": "Your State Privacy Act",
      "link": "https://state.gov/privacy-act",
      "summary": "Verification records retained for 7 years for audit purposes; may be disclosed to government agencies under subpoena"
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

"SUPERSEDED" would not link to a replacement SHA-256 URL that'd have "OK", nor would HTTP's 302 do the same. The point is the requester should already know the the plain-text that would culminate in a verification lookup.

**Fields:**
- `issuer` (optional) - Name of the issuing organization
- `claimType` (optional) - Type of claim (e.g., "degree", "license", "certification")
- `parentAuthorities` (optional) - Array of URLs linking to parent/accrediting organizations that authorize this issuer
- `responseTypes` (optional) - Dictionary defining possible response statuses beyond "OK", each with:
  - `class` - Either "affirming" or "denying" (determines UI color/icon)
  - `text` - Human-readable explanation of what this status means
  - `link` - URL to a page with more information about this status
- `retentionLaws` (optional) - Array of governing laws/regulations for data retention and sharing, each with:
  - `jurisdiction` - Geographic region or legal system (e.g., "European Union", "California", "Japan")
  - `law` - Name/citation of the specific law or regulation
  - `link` - URL to the official text or authoritative explanation
  - `summary` - Plain-language explanation of retention period and sharing constraints
- `tesseract` (optional) - Tesseract.js configuration for improved OCR accuracy

The app will automatically fetch this file and use the Tesseract settings if initial OCR fails (404 response).

**Parent Authorities Examples:**

The `parentAuthorities` field establishes a chain of trust through simple URL links (no PKI required):

- **University degree** → Accreditation body (e.g., regional accreditor's member list)
- **Medical license** → State medical board registry
- **Professional certification** → Certifying organization's approved training providers list
- **Food safety cert** → Health department's licensed facilities page
- **Product certification** → Standards body's certified labs directory

Example for a university: See [github.com/paul-hammant/verific/blob/main/public/c/.verific-meta.json](https://github.com/paul-hammant/verific/blob/main/public/c/.verific-meta.json

**Why This Matters:**

Europe's GDPR's has a vague "if strictly necessary" clause, but many jurisdictions have specific, concrete retention periods and explicit rules about:

- **Retention duration**: How long the issuer must/may keep the data (e.g., 4 years, 7 years, 10 years, indefinitely)
- **Mandatory sharing**: Who the data **must** be shared with (government agencies, regulators, auditors)
- **Permissible sharing**: Who the data **may** be shared with (background check companies, other employers, researchers)
- **Prohibited sharing**: What the data **cannot** be used for (e.g., "will not be sold to marketers and alike")

The `retentionLaws` field makes these rules transparent to the person whose data is being verified.

### Hash Storage vs Full-Text Storage: Legal Implications

Companies storing aspects of the data behind verifications. 

**Storing the SHA-256 hash alone** (without the underlying text) is technically easy but **practically useless**:

- The hash proves nothing without the ability to verify it (i.e., without storing the original text). 
- You cannot reconstruct the original claim from the hash. Well, not without literal magic.
- There is no value in a database of orphaned hashes

**Storing the claim text** (with or without the hash) is what organizations actually do, and **retention/sharing laws apply to this stored text**, not the hash. The laws existed and applied before this idea to verify claims using a SHA-256 system.

### Worked Example: Recruitment Portal

**Scenario:** A candidate submits their CV/resume to a recruitment portal, which includes:

- Degree certificate from Edinburgh University (First-class honours) - verified via OCR-to-hash
- Employment letter from Microsoft - verified via OCR-to-hash

**What the recruitment portal stores:**

1. ✅ The full CV/resume text (including qualification and employment claims)
2. ✅ Maybe the SHA-256 hashes from the verified documents
3. ✅ The verification base URLs that proved the claims are authentic. At least with the SHA-256 they do.  The text to verification sequence could be redone at any stage of course.

**Legal permissions - What the portal CAN do:**
- ✅ Store the CV/resume (candidate gave consent when submitting)
- ✅ Share the CV/resume with specific clients (the hiring company) cos the applicant was applyfor for a job through the portal - their entire purpose for uploading their CV/resume.
- ✅ Show verified status: "Degree verified ✓" and "Employment verified ✓" Both back to the candidate and to the prospective employer.

**Legal constraints - What the portal CANNOT do:**
- ❌ Share the CV/resume with Palantir Technologies (for example) no consent/legitimate interest.
- ❌ Sell the CV data to marketing companies
- ❌ Keep the CV indefinitely after the candidate withdraws consent (GDPR Article 17)

**Initial client conversation:**

Portal: "We have a matching candidate who graduated Edinburgh University
         with First-class honours (verified ✓) and is currently working
         at Microsoft (verified ✓). Are you interested in seeing their
         full CV?"

Client: "Yes, send over their details."

Portal: Shares the full CV. With or without verification proof - the client could or perhaps should redo the same verifications.

**What "verified ✓" means:**

- The candidate submitted physical documents (degree certificate, employment letter), OR scans there of OR the already-extracted and normalized text from the same.
- If physical scans, the portal scanned them using OCR-to-hash verification "OK" vs 404 response, etc
- The issuing organizations (Edinburgh University, Microsoft) confirmed authenticity via HTTP 200 + "OK" and that gets noted "claims made in CV all verified"

**Key insight:** The retention laws govern **the underlying text** (the CV, the degree claim, the employment history, the financial services contract/transaction), not the hash. The hash is merely a cryptographic proof that helps verify authenticity, but the legal obligations attach to the personal data being stored and shared.

## Charges for Verification: The Bloomberg Model

Organizations hosting verification endpoints may charge for verification lookups, similar to how Bloomberg charges for 
financial data queries. This creates a sustainable business model while maintaining verification integrity.

### How It Works

**Traditional caching breaks the model:**
-
- If verifiers cache "hash X = OK" responses, they only pay once
- The issuing organization loses recurring revenue
- There's no incentive to maintain the verification infrastructure

**Bloomberg-style non-caching enforcement:**
- Each verification lookup is a fresh API call
- The issuer can track usage and charge accordingly
- Prevents free-riding through cached responses

### Technical Implementation

**Rate limiting and authentication:**
```
GET https://university.edu/verify/{HASH}
Headers:
  Authorization: Bearer {API_KEY}
  X-Verifier-ID: RecruitCorp-12345
```

**Pricing models:**
- **Per-verification**: $0.001 per hash lookup
- **Monthly subscription**: Unlimited verifications for $500/month
- **Volume tiers**: Bulk discounts for high-volume verifiers

**Anti-caching measures:**

```json
{
  "hash": "09d1e6765c2dbd833e5a1f4770d9f0c9...",
  "status": "OK",
  "verified_at": "2025-01-26T14:30:00Z",
  "cache_control": "no-store, no-cache, must-revalidate",
  "pricing": {
    "cost": 0.10,
    "currency": "USD",
    "remaining_quota": 950
  }
}
```

### Why Organizations May Pay

**1. Legal liability protection:**
- Hiring someone with a fake degree → Lawsuit
- Cost of verification ($0.10) << Cost of hiring fraud ($50,000+ settlement)

**2. Competitive advantage:**
- "All candidates verified ✓" becomes a selling point
- Clients trust verified claims over unverified ones

**3. Required by regulation:**
- Healthcare: Must verify medical licenses before hiring
- Finance: Must verify certifications (CFA, CPA) before client-facing roles
- Education: Must verify teaching credentials

**4. Insurance discounts:**
- Employment practices liability insurance (EPLI) premiums reduced if using verified hiring

### Economic Sustainability

**Why this model works:**

1. **Issuers get recurring revenue** for maintaining verification infrastructure
2. **Verifiers get some legal protection** and competitive advantage
3. **Subjects (graduates, license holders) get free lookups** to verify their own credentials. And expanded GDPR would guarantee that. Expanded if not already covering similar scenarios.
4. **Public good maintained** while preventing tragedy of the commons

Perhaps resource not found (404) is always free, even if rate limit and anti-abuse technologies are always activated.

**Example: University degree verification**
- University maintains verification endpoint: $50,000/year (servers, staff)
- 10,000 verifications/year × $0.50 = $5,000 revenue
- Break-even requires higher volume OR higher per-verification price
- Solution: Tiered pricing + enterprise contracts with major employers

### Integration with .verific-meta.json

Organizations can publish their price guide in the metadata:

```json
{
  "issuer": "Unseen University",
  "verification_pricing": {
    "public_free_tier": {
      "rate_limit": "1 per month per IP address",
      "description": "Free for individuals verifying their own credentials"
    },
    "commercial_tier": {
      "cost": 0.10,
      "currency": "USD",
      "token-setup": "https://unseen-university.api-gateways.salesforce.com",
      "description": "Has volume discounts"
    }
  },
  "retentionLaws": [ ... ]
}
```

## Server-Side Implementation Costs

Organizations hosting verification endpoints can use serverless infrastructure to minimize costs while charging for verifications.

### Example: Cloudflare-based Architecture

A typical implementation using Cloudflare's edge platform:

**Architecture:**
1. **Cloudflare Workers** - Edge compute to handle incoming GET requests for `/{HASH}`
2. **Cloudflare R2** - Object storage containing the hash → status mapping (e.g., `09d1e6765c2d...` → `OK`)
3. **Stripe** (optional) - Usage metering and billing for commercial API users

**Cost breakdown per million verifications:**

| Component                                            | Cost per million GETs | Notes                                    |
|------------------------------------------------------|-----------------------|------------------------------------------|
| [R2](https://developers.cloudflare.com/r2/) read ops | $0.36                 | Object storage lookups (negligible)      |
| [Worker](https://workers.cloudflare.com/) exec       | $5.00                 | Edge compute execution (main cost)       |
| [Stripe](https://stripe.com/) usage reporting        | ≈ $0.01               | Metering API calls (if batched)          |
| **Total infrastructure cost**                        | **≈ $5.37 / million** | **~$0.0000054 per verification**         |

**Margin analysis:**

If charging **$0.10 per verification**:
- Infrastructure cost: $0.0000054
- Revenue: $0.10
- **Margin: ~99.99%** ($0.09999946 profit per verification)

If charging **$0.50 per verification** (medical licenses):
- Infrastructure cost: $0.0000054
- Revenue: $0.50
- **Margin: ~99.999%** ($0.49999946 profit per verification)

**Implications:**

1. **Premium entities can charge substantially** - Infrastructure costs are negligible compared to the value of legal attestation
2. **Many organizations will offer free verification** - The marginal cost is so low that providing free public verification is sustainable
3. **Tiered pricing makes sense** - Free tier for individuals (10/month), paid tier for commercial bulk verification
4. **Cost of doing business** - For public institutions (universities, medical boards), free verification is a rounding error in their IT budget

**Why organizations might still charge:**

- **Revenue generation** - Even at $0.10/verification, 1 million lookups = $100,000 revenue vs $5.37 costs
- **Abuse prevention** - Charging deters bulk scraping and frivolous lookups
- **Service quality** - Paid tiers get faster response times, SLA guarantees, bulk APIs
- **Regulatory funding** - Medical boards and licensing agencies can use verification fees to fund operations

**Free vs Paid decision factors:**

Organizations like universities may offer **free verification** because:

- Brand reputation ("We stand behind our degrees")
- Alumni relations (helps graduates get jobs) and they [often go on to donate back to the uni](https://wonkhe.com/blogs/what-alumni-donations-can-tell-us-about-the-relationship-between-students-and-their-universities/)
- Marginal cost is trivial ($5.37 per million accesses)

Organizations like medical boards may **charge** because:
- Legal liability protection is worth paying for
- High-frequency commercial users (hospitals, staffing agencies) can afford it
- Revenue helps fund regulatory oversight

## Larger List of Use Cases

This section documents all known and anticipated applications of OCR-to-hash verification of physical documents. Any combination of these techniques with OCR, hashing, computer vision registration marks, URL-based verification, and normalization is hereby disclosed as of **January 2025**.

### Product Certifications & Compliance

| Use Case                                                                      | Volume vs Till Receipts | Retention Period                     | Personal Data                                          | OCR-to-hash vs QR code |
|-------------------------------------------------------------------------------|-------------------------|--------------------------------------|--------------------------------------------------------|--------------------|
| Safety certifications (electrical, fire, structural, chemical)                | Small                   | 7-30 years (product lifecycle)       | Manufacturer name, facility location, inspector ID  x1 | **OCR-to-hash:** Domain binding prevents fake certifying bodies. Human-readable certificate format. Tamper-evident. |
| Medical device certifications (FDA, CE marking, ISO 13485)                    | Very Small              | 10-30 years (regulatory requirement) | Manufacturer, facility, QA personnel                   | **OCR-to-hash strong case:** Prevents MedPro-style fraud. Domain binding verifies legitimate certification body. High-stakes regulatory compliance. Similar to B2B Product Certifications detailed case. |
| Food safety certifications (HACCP, organic, kosher, halal, vegetarian, vegan) | Small                   | 2-7 years (audit cycles)             | Producer name, facility location, inspector            | **OCR-to-hash:** Domain binding prevents fake certification bodies. Consumer trust. Human-readable claims. |
| Environmental certifications (Energy Star, LEED, carbon neutral)              | Very Small              | 5-10 years (certification validity)  | Building owner, facility manager, auditor              | **OCR-to-hash:** Displayed certificates benefit from human readability. Domain binding verifies certifier. |
| Fair trade, ethical sourcing certifications                                   | Very Small              | 3-7 years (audit cycles)             | Producer cooperative name, farmer groups               | **OCR-to-hash:** Consumer verification. Domain binding prevents fake fair trade claims. Transparency. |

### Professional & Educational Qualifications

| Use Case                                                                  | Volume vs Till Receipts | Retention Period                     | Personal Data                                                       | OCR-to-hash vs QR code |
|---------------------------------------------------------------------------|-------------------------|--------------------------------------|---------------------------------------------------------------------|--------------------|
| Academic degrees (bachelor's, master's, doctorate, certificates)          | Small                   | Permanent (institutional records)    | Graduate name, date, degree field, honors                           | **OCR-to-hash strong case:** Privacy-preserving (hash not printed). Professional appearance (no QR clutter). Already detailed as CV/Education Credentials case. |
| Professional licenses (medical, legal, engineering, teaching) - revocable | Very Small              | Permanent (may show REVOKED status)  | Licensee name, license number, specialization, disciplinary history | **OCR-to-hash strong case:** Revocable status (SUSPENDED, REVOKED). Domain binding. Already detailed as Medical Licenses case. Wallet card format. |
| Continuing education credits (CME, CLE, CPE)                              | Small                   | 3-7 years (renewal cycles)           | Professional name, course completion, credits earned                | **OCR-to-hash:** Certificate format. Professional appearance. Verification for license renewal. |
| Vocational certifications (trade skills, technical training)              | Very Small              | 5-10 years (certification validity)  | Trainee name, skill area, certifying body                           | **OCR-to-hash:** Employment verification. Human-readable credentials. Domain binding verifies certifying body. |
| Industry certifications (IT, finance, construction)                       | Small                   | 3-10 years (renewal cycles)          | Certificate holder name, certification ID, specialization           | **OCR-to-hash:** Similar to CV credentials case. Professional appearance. Prevents fake certifications. |
| Training completion certificates (safety, compliance, skills)             | Small                   | 5-10 years (regulatory requirement)  | Trainee name, employer, training date, instructor                   | **OCR-to-hash:** Regulatory compliance. Employer verification. Human-readable format. |
| Apprenticeship and internship completion                                  | Very Small              | 7-10 years (employment verification) | Apprentice name, sponsor organization, dates, supervisor            | **OCR-to-hash:** Employment verification. Similar to CV employment history pattern. |
| Language proficiency certificates (TOEFL, IELTS)                          | Very Small              | 2-5 years (test validity)            | Test taker name, scores, test date, test center                     | **OCR-to-hash:** University admissions verification. Standardized certificate format. Privacy-preserving. |
| Accreditation of educational institutions                                 | Tiny                    | Permanent (institutional status)     | Institution name, accreditor, faculty lists (if detailed)           | **OCR-to-hash:** Domain binding verifies legitimate accreditor. Public trust. Displayed certificates. |
| Course transcripts and grade verification                                 | Medium-Small            | Permanent (academic records)         | Student name, courses, grades, enrollment dates                     | **OCR-to-hash:** University transfer verification. Privacy-preserving. Similar to degree verification pattern. |

### Manufacturing & Supply Chain

If not too small to print and subsequently scan - or maybe this all works with microscopes too.

| Use Case                                               | Volume vs Till Receipts | Retention Period                   | Personal Data                                         | OCR-to-hash vs QR code |
|--------------------------------------------------------|-------------------------|------------------------------------|-------------------------------------------------------|--------------------|
| Quality control inspection reports                     | Medium-Small            | 5-15 years (warranty/liability)    | Inspector name, QA manager, facility location         | **OCR-to-hash:** Full report format needs human readability. Warranty claims. Domain binding verifies manufacturer. |
| Calibration certificates for instruments               | Small                   | 5-10 years (re-calibration cycle)  | Technician name, lab certification number             | **OCR-to-hash:** Certificate format. Scientific/medical equipment verification. Regulatory compliance. |
| Material test reports (chemical composition, strength) | Small                   | 10-30 years (structural integrity) | Test engineer name, lab technician, approver          | **OCR-to-hash:** Long-term structural safety. Report format. Domain binding verifies testing lab. |
| Warehouse receipts and inventory records               | Medium-Small            | 3-7 years (financial audit)        | Warehouse manager, receiving clerk, inventory counter | **QR code may be better:** High-volume machine scanning. Speed critical. Already in barcode ecosystem. |

### Financial & Legal Documents

Some of these might not be needed.

| Use Case                                           | Volume vs Till Receipts | Retention Period                | Personal Data                                                  | OCR-to-hash vs QR code |
|----------------------------------------------------|-------------------------|---------------------------------|----------------------------------------------------------------|--------------------|
| Invoices and billing statements                    | Similar                 | 7-10 years (tax/legal)          | Buyer name, seller name, billing address, payment details      | **QR code may be better:** High volume. Already digitized. Machine processing primary. |
| Purchase orders and quotes                         | Medium                  | 5-10 years (contract disputes)  | Buyer, seller, approver names, pricing                         | **QR code may be better:** High volume. Already in digital procurement systems. |
| Warranty documents and service agreements          | Medium                  | Product lifetime + 3-10 years   | Customer name, address, product serial, service history        | **OCR-to-hash:** Consumer-facing document. Human-readable terms important. Prevents tampering. |
| Stock certificates and share transfer documents    | Small                   | Permanent (ownership records)   | Shareholder name, address, certificate numbers, transfer dates | **OCR-to-hash strong case:** Ornate certificate format. High-value assets. Prevents forgery. Domain binding verifies legitimate issuer. |
| Promissory notes and loan documents                | Medium-Small            | Loan term + 7-10 years          | Borrower name, lender, SSN/tax ID, loan amount, collateral     | **OCR-to-hash:** Legal document format. Prevents tampering with loan terms. Domain binding. |
| Property deeds and title documents                 | Small                   | Permanent (chain of title)      | Owner names, addresses, legal descriptions, liens              | **OCR-to-hash strong case:** Permanent legal records. Prevents property fraud. Chain of title verification. Human-readable. |
| Notarized documents and attestations               | Medium-Small            | 7-20 years (legal validity)     | Signatory names, notary details, witness names                 | **OCR-to-hash:** Notary stamps/seals suit OCR. Legal validity. Domain binding verifies notary. |
| Affidavits and sworn statements                    | Small                   | 10-30 years (legal proceedings) | Affiant name, address, statement details                       | **OCR-to-hash:** Legal document format. Court proceedings. Tamper-evident. |
| Power of attorney documents                        | Small                   | Duration + 10 years             | Principal name, agent name, scope of authority                 | **OCR-to-hash:** Legal authority verification. Prevents forgery. Human-readable terms critical. |
| Wills and estate documents (may return SUPERSEDED) | Small                   | Permanent (estate records)      | Testator name, beneficiaries, executor, asset details          | **OCR-to-hash strong case:** SUPERSEDED status for updated wills. Prevents forgery. Estate disputes. Human-readable. |
| Tax forms and receipts                             | Medium                  | 7-10 years (audit statute)      | Taxpayer name, SSN/tax ID, income, deductions                  | **OCR-to-hash:** Already detailed as Receipt Verification case. Tax fraud prevention. |
| Audit reports and financial statements             | Small                   | 7-10 years (regulatory)         | Company officers, auditor names, financial details             | **OCR-to-hash:** Formal report format. Regulatory compliance. Domain binding verifies auditor. |

### Healthcare & Medical Records

| Use Case                                          | Volume vs Till Receipts | Retention Period                 | Personal Data                                                         | OCR-to-hash vs QR code |
|---------------------------------------------------|-------------------------|----------------------------------|-----------------------------------------------------------------------|--------------------|
| Lab test results and pathology reports            | Medium                  | 10-30 years (medical necessity)  | Patient name, DOB, test results, ordering physician, lab technician   | **OCR-to-hash strong case:** Medical reports need human readability. Privacy-preserving. Domain binding verifies lab. Long-term records. |
| Vaccination records and immunization cards        | Medium-Small            | Lifetime (public health)         | Patient name, DOB, vaccine type, lot number, administrator            | **OCR-to-hash strong case:** Wallet card format. Prevents fake vaccination cards. International travel verification. Lifetime records. |
| Medical imaging reports (X-ray, MRI, CT scan)     | Medium                  | 10-30 years (diagnostic history) | Patient name, DOB, imaging findings, radiologist name                 | **OCR-to-hash:** Medical report format. Domain binding verifies radiologist/facility. |
| Patient consent forms and HIPAA authorizations    | Medium                  | 7-10 years post-treatment        | Patient name, DOB, authorized parties, consent scope                  | **OCR-to-hash:** Legal/medical consent. Tamper-evident. Human-readable terms critical. |
| Discharge summaries and care plans                | Medium-Small            | 10-30 years (medical records)    | Patient name, DOB, treatment details, care team, medications          | **OCR-to-hash:** Medical record format. Continuity of care. Domain binding verifies hospital. |
| Medical device implant cards (pacemakers, stents) | Small                   | Lifetime (device tracking)       | Patient name, DOB, device serial, implanting surgeon, hospital        | **OCR-to-hash strong case:** Lifetime critical device tracking. Emergency medical verification. Wallet card format. Prevents fake implant cards. |
| Allergy and medical alert cards                   | Medium-Small            | Lifetime (emergency care)        | Patient name, DOB, allergies, emergency contacts                      | **OCR-to-hash strong case:** Emergency response. Wallet cards must be human-readable. Life-saving information. |
| Blood type and donor cards                        | Medium-Small            | Lifetime (transfusion safety)    | Donor/patient name, DOB, blood type, screening results                | **OCR-to-hash:** Wallet card format. Emergency medical use. Prevents fake blood type cards. |

### Government & Civic Documents

| Use Case                                    | Volume vs Till Receipts      | Retention Period                           | Personal Data                                                   | OCR-to-hash vs QR code                                                                                                                                                                                                                            |
|---------------------------------------------|------------------------------|--------------------------------------------|-----------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Birth certificates and death certificates   | Small                        | Permanent (vital records)                  | Name, DOB/DOD, parents, place of birth/death                    | **OCR-to-hash strong case:** Prevents identity fraud, fake birth certificates for fraudulent documents. Domain binding verifies issuing jurisdiction. Ornate certificate format benefits from OCR. Permanent vital records.                       |
| Marriage licenses and divorce decrees       | Small                        | Permanent (legal status)                   | Spouse names, DOB, marriage/divorce date, jurisdiction          | **OCR-to-hash:** Legal document format. Prevents fake marriage/divorce papers. Domain binding verifies court jurisdiction. Permanent legal records.                                                                                               |
| Adoption papers and custody orders          | Very Small                   | Permanent (legal guardianship)             | Child name, DOB, adoptive/biological parents, court details     | **OCR-to-hash strong case:** High-stakes child welfare. Prevents forged custody documents. Domain binding verifies court authority. Sensitive permanent records.                                                                                  |
| Passports and visa documents                | Medium-Small                 | 10-20 years (security)                     | Full name, DOB, nationality, photo, biometrics, travel history  | **OCR-to-hash strong case:** Already a detailed case. Hotel clerks/police/border agents verify authenticity. Machine-readable zone + OCR-to-hash complement each other. Prevents fake passports. Uses SHA-512 to prevent brute-force enumeration. |
| Driver's licenses and vehicle registrations | Medium-Small                 | 5-10 years (renewal cycles)                | Name, DOB, address, photo, vehicle VIN, license plate           | **OCR-to-hash strong case:** Already a detailed case. Police/hotels/bars verify authenticity. Barcode + OCR-to-hash complement each other. Prevents fake IDs. Uses SHA-512 to prevent brute-force enumeration.                                    |
| Permits (building, business, environmental) | Small                        | 7-30 years (compliance)                    | Permit holder name, address, property details, business type    | **OCR-to-hash:** Domain binding verifies issuing authority. Prevents fake permits. Certificate format suitable for OCR. Regulatory compliance.                                                                                                    |
| Inspection reports (health, safety, fire)   | Small                        | 5-15 years (enforcement)                   | Inspector name, facility owner, violations, corrective actions  | **OCR-to-hash:** Domain binding verifies inspector/agency. Tamper-evident enforcement records. Report format suitable for OCR. Public safety.                                                                                                     |
| Court orders and judgments                  | Small                        | Permanent (legal precedent)                | Party names, case details, judgment terms, court jurisdiction   | **OCR-to-hash strong case:** Prevents forged court orders. Domain binding verifies court jurisdiction. Tamper-evident legal authority. Permanent legal precedent.                                                                                 |
| Patent and trademark certificates           | Very Small                   | 20 years (patent) / Permanent (trademark)  | Inventor/owner name, application details, claims                | **OCR-to-hash strong case:** High-value intellectual property. Prevents fake patent certificates. Domain binding verifies patent office (USPTO, EPO, etc.). Ornate certificate format suitable for OCR.                                           |
| Census forms and surveys                    | Medium-Small (census decade) | Permanent (historical records)             | Household names, ages, occupations, addresses                   | **OCR-to-hash:** Permanent historical records. Domain binding verifies census authority. Standard forms suitable for OCR. Data integrity for demographic research.                                                                                |
| Land surveys and property boundaries        | Small                        | Permanent (property rights)                | Surveyor name, property owner, legal descriptions, boundaries   | **OCR-to-hash strong case:** Prevents property disputes and fraudulent boundary claims. Domain binding verifies licensed surveyor. Permanent property rights. Technical documents suitable for OCR.                                               |

### Logistics & Transportation

| Use Case                               | Volume vs Till Receipts | Retention Period               | Personal Data                                             | OCR-to-hash vs QR code |
|----------------------------------------|-------------------------|--------------------------------|-----------------------------------------------------------|--------------------|
| Dangerous goods declarations (HAZMAT)  | Small                   | 7-30 years (safety/liability)  | Shipper name, carrier, consignee, material safety details | **OCR-to-hash strong case:** Critical safety documentation. Domain binding verifies shipper/carrier. Prevents fake HAZMAT declarations. Human-readable safety info essential. Long liability retention. |
| Bill of lading and freight documents   | Medium                  | 7-10 years (legal/financial)   | Shipper, consignee, carrier, freight forwarder            | **QR code may be better:** High-volume machine processing in logistics. Already digitized workflows. Legal document format. However, OCR-to-hash provides tamper-evidence for disputes. |
| Vehicle inspection reports             | Medium-Small            | 5-10 years (safety compliance) | Inspector name, vehicle owner, VIN, inspection station    | **OCR-to-hash:** Domain binding verifies inspection station. Prevents fake inspection certificates. Standardized forms suitable for OCR. Safety compliance. |

### Retail & Consumer Protection

| Use Case                            | Volume vs Till Receipts | Retention Period                  | Personal Data                              | OCR-to-hash vs QR code |
|-------------------------------------|-------------------------|-----------------------------------|--------------------------------------------|--------------------|
| Raffle tickets and contest entries  | Medium-Small            | 3-7 years (legal/tax compliance)  | Entrant name, contact info, entry details  | **OCR-to-hash strong case:** Prevents fake winning tickets, duplicate entries. Domain binding verifies legitimate contest operator. Tickets need human readability. Tamper-evident for prize claims. |

### Scientific & Research

| Use Case                                      | Volume vs Till Receipts | Retention Period                   | Personal Data                                                       | OCR-to-hash vs QR code |
|-----------------------------------------------|-------------------------|------------------------------------|---------------------------------------------------------------------|--------------------|
| Lab notebooks and experimental data           | Small                   | 7-30 years (research integrity)    | Researcher names, lab PI, collaborators, notebook IDs               | **OCR-to-hash strong case:** Research integrity and fraud prevention. Domain binding verifies institution. Handwritten notebooks need OCR. Tamper-evident for patent disputes. Long retention for reproducibility. |
| Peer review reports and journal submissions   | Very Small              | 5-10 years (publication records)   | Author names, reviewer names (if disclosed), affiliations           | **OCR-to-hash:** Domain binding verifies journal/publisher. Prevents fabricated peer reviews. Tamper-evident publication records. Document format suitable for OCR. |
| Research grants and funding awards            | Very Small              | 7-10 years (financial audit)       | PI name, co-investigators, institution, budget details              | **OCR-to-hash:** Domain binding verifies funding agency (NSF, NIH, etc.). Prevents fake grant awards. Formal documents suitable for OCR. Financial audit trail. |
| Ethical approval (IRB, IACUC) documents       | Very Small              | 7-30 years (regulatory compliance) | Researcher names, study participants (anonymized), protocol details | **OCR-to-hash strong case:** High-stakes human/animal subject protection. Domain binding verifies IRB/IACUC authority. Prevents fabricated ethical approvals. Long regulatory retention. |
| Data sharing agreements and material transfer | Very Small              | 7-20 years (IP/legal)              | Sharing parties, researchers, material descriptions                 | **OCR-to-hash:** Domain binding verifies institutions. Tamper-evident IP agreements. Legal document format suitable for OCR. Long retention for disputes. |
| Scientific instrument calibration records     | Very Small              | 5-10 years (data validity)         | Technician name, instrument ID, calibration standards               | **OCR-to-hash:** Domain binding verifies calibration facility. Prevents fake calibration certificates. Certificate format suitable for OCR. Data validity assurance. |
| Clinical trial enrollment and consent         | Very Small              | 25-30 years (FDA requirement)      | Participant name (coded), investigator, trial ID, consent details   | **OCR-to-hash strong case:** FDA regulatory compliance. Domain binding verifies trial sponsor. Prevents fabricated consent forms. Long retention requirement. Human subject protection. |

### Art & Collectibles

| Use Case                                       | Volume vs Till Receipts | Retention Period             | Personal Data                                                       | OCR-to-hash vs QR code |
|------------------------------------------------|-------------------------|------------------------------|---------------------------------------------------------------------|--------------------|
| Certificates of authenticity for artwork       | Small                   | Permanent (art market)       | Artist name, owner name, gallery/dealer, certificate issuer         | **OCR-to-hash strong case:** Prevents art forgery and fake certificates. Domain binding verifies gallery/artist estate. Ornate certificate format suitable for OCR. High-value market. Permanent provenance. |
| Provenance documentation and ownership history | Very Small              | Permanent (chain of title)   | Previous owners, dealers, auction houses, transfer dates            | **OCR-to-hash strong case:** Chain of title for artwork. Prevents fabricated provenance. Domain binding verifies auction houses/galleries. Permanent ownership records. Critical for art market integrity. |
| Appraisals and valuations                      | Small                   | 5-10 years (insurance/tax)   | Appraiser name, owner name, artwork details, valuation              | **OCR-to-hash:** Domain binding verifies certified appraiser. Prevents inflated valuations. Formal reports suitable for OCR. Insurance and tax documentation. |
| Edition numbers for prints and sculptures      | Very Small              | Permanent (edition tracking) | Artist name, publisher, owner, edition details                      | **OCR-to-hash:** Prevents fake edition certificates. Domain binding verifies publisher/artist estate. Certificate format suitable for OCR. Permanent edition tracking. |
| Artist signatures and stamps                   | Very Small              | Permanent (authenticity)     | Artist name, signature authenticator, verification date             | **OCR-to-hash:** Domain binding verifies authentication expert. Prevents fake authentication certificates. Human-readable format. Permanent authenticity records. |
| Auction records and sale documents             | Very Small              | Permanent (price history)    | Buyer/seller names (may be anonymized), auction house, hammer price | **OCR-to-hash:** Domain binding verifies auction house (Christie's, Sotheby's, etc.). Prevents fake sale records. Formal documents suitable for OCR. Permanent price history. |
| Conservation reports and restoration history   | Very Small              | Permanent (artwork care)     | Conservator name, owner, treatment details, facility                | **OCR-to-hash:** Domain binding verifies conservator credentials. Tamper-evident treatment history. Technical reports suitable for OCR. Permanent artwork care records. |

### Energy & Utilities

| Use Case                               | Volume vs Till Receipts | Retention Period                  | Personal Data                                                   | OCR-to-hash vs QR code |
|----------------------------------------|-------------------------|-----------------------------------|-----------------------------------------------------------------|--------------------|
| Solar panel efficiency certificates    | Very Small              | 20-30 years (system lifetime)     | System owner name, address, installer, panel specifications     | **OCR-to-hash:** Domain binding verifies installer/certifier. Certificate format suitable for OCR. Long system lifetime. Performance warranty verification. |
| Energy audits and efficiency ratings   | Very Small              | 5-10 years (improvement tracking) | Property owner, auditor name, facility details, recommendations | **OCR-to-hash:** Domain binding verifies certified auditor. Report format suitable for OCR. Energy efficiency compliance. Rebate/incentive verification. |
| Carbon credits and offset certificates | Very Small              | 7-20 years (carbon accounting)    | Credit issuer, purchaser, project details, verification body    | **OCR-to-hash strong case:** Prevents fake carbon credits. Domain binding verifies certification body. High-value trading market. Certificate format suitable for OCR. Environmental compliance. |
| Renewable energy certificates (RECs)   | Small                   | 3-7 years (compliance/trading)    | Generator name, REC purchaser, MWh details, certification body  | **OCR-to-hash:** Domain binding verifies certification body. Prevents double-counting RECs. Certificate format suitable for OCR. Regulatory compliance and trading. |

### Agriculture & Food

| Use Case                                     | Volume vs Till Receipts | Retention Period                      | Personal Data                                                       | OCR-to-hash vs QR code |
|----------------------------------------------|-------------------------|---------------------------------------|---------------------------------------------------------------------|--------------------|
| Seed certification and variety registration  | Very Small              | 5-20 years (variety tracking)         | Seed producer name, certifier, variety breeder, field location      | **OCR-to-hash:** Domain binding verifies seed certifier. Prevents fake seed certifications. Certificate format suitable for OCR. Variety tracking and IP protection. |
| Livestock health certificates and pedigrees  | Small                   | Animal lifetime + 5-10 years          | Breeder name, owner name, veterinarian, farm location               | **OCR-to-hash strong case:** Prevents fake pedigrees, health certificates. Domain binding verifies veterinarian/breed registry. High-value breeding stock. Long retention. International trade verification. |
| Harvest records and yield data               | Medium-Small            | 5-10 years (crop insurance/audit)     | Farm owner/operator, field location, harvest crew                   | **OCR-to-hash:** Domain binding verifies farm operator. Standard forms suitable for OCR. Crop insurance claims. Government audit trail. |
| Pesticide application logs                   | Small                   | 5-10 years (environmental compliance) | Applicator name/license, farm owner, field location, chemicals used | **OCR-to-hash strong case:** Environmental compliance and safety. Domain binding verifies licensed applicator. Prevents fabricated safety records. Regulatory forms suitable for OCR. Public health protection. |
| Soil test results and amendments             | Small                   | 5-10 years (nutrient management)      | Farm owner, lab name, field location, recommendations               | **OCR-to-hash:** Domain binding verifies testing lab. Lab report format suitable for OCR. Nutrient management plans. Environmental compliance. |
| Farm subsidy documentation                   | Small                   | 7-10 years (government audit)         | Farm owner name, tax ID, subsidy program, payment amounts           | **OCR-to-hash:** Domain binding verifies government agency. Prevents fake subsidy claims. Government forms suitable for OCR. Audit trail. |

### Real Estate & Property

| Use Case                              | Volume vs Till Receipts | Retention Period                 | Personal Data                                                    | OCR-to-hash vs QR code |
|---------------------------------------|-------------------------|----------------------------------|------------------------------------------------------------------|--------------------|
| Property appraisals and valuations    | Small                   | 5-10 years (financing/tax)       | Appraiser name, property owner, address, valuation details       | **OCR-to-hash:** Domain binding verifies certified appraiser. Formal reports suitable for OCR. Prevents inflated valuations. Financing and tax documentation. |
| Home inspection reports               | Small                   | 5-10 years (transaction records) | Inspector name, buyer/seller names, property address, findings   | **OCR-to-hash:** Domain binding verifies licensed inspector. Report format suitable for OCR. Transaction records. Liability protection. |
| Pest inspection certificates          | Small                   | 3-7 years (warranty/liability)   | Inspector name, property owner/address, treatment details        | **OCR-to-hash:** Domain binding verifies pest control company. Certificate format suitable for OCR. Warranty verification. Liability records. |
| Zoning and land use documents         | Very Small              | Permanent (land records)         | Property owner, address, zoning classification, jurisdiction     | **OCR-to-hash:** Domain binding verifies government authority. Official documents suitable for OCR. Permanent land records. Development rights. |
| HOA documents and bylaws              | Tiny                    | Permanent (governance)           | HOA board members, property owners (if detailed), community name | **OCR-to-hash:** Domain binding verifies HOA. Legal document format suitable for OCR. Permanent governance records. Covenant enforcement. |
| Rental agreements and lease contracts | Medium-Small            | 7-10 years post-termination      | Landlord name, tenant name, addresses, rent amount, terms        | **OCR-to-hash:** Domain binding verifies landlord/property manager. Standard contracts suitable for OCR. Dispute resolution. Tenant protection. |
| Property tax assessments              | Medium-Small            | 7-10 years (tax appeals)         | Property owner name, address, assessed value, jurisdiction       | **OCR-to-hash:** Domain binding verifies tax authority. Government forms suitable for OCR. Tax appeal records. Assessment verification. |

### Sports & Athletics

| Use Case                                       | Volume vs Till Receipts | Retention Period                    | Personal Data                                                | OCR-to-hash vs QR code |
|------------------------------------------------|-------------------------|-------------------------------------|--------------------------------------------------------------|--------------------|
| Athletic records and timing results            | Small                   | Permanent (sports history)          | Athlete name, DOB, event, time/distance, competition details | **OCR-to-hash strong case:** Prevents fabricated athletic records. Domain binding verifies timing authority/federation. Certificate/display format suitable for OCR. Permanent sports history. Record book integrity. |
| Drug testing (anti-doping) certificates        | Very Small              | 10-20 years (WADA requirements)     | Athlete name, DOB, test date, sample ID, testing authority   | **OCR-to-hash strong case:** WADA compliance. Domain binding verifies testing authority. Prevents fabricated clean tests. Regulatory forms suitable for OCR. Athlete eligibility verification. Long retention. |
| Coaching certifications and qualifications     | Very Small              | 5-10 years (certification validity) | Coach name, certification level, sport, certifying body      | **OCR-to-hash:** Domain binding verifies certifying body. Prevents fake coaching credentials. Certificate format suitable for OCR. Youth safety verification. |
| Equipment certifications (safety, performance) | Very Small              | Product lifetime (5-15 years)       | Manufacturer, certifying body, equipment specifications      | **OCR-to-hash:** Domain binding verifies certification body. Prevents fake safety certifications. Certificate format suitable for OCR. Athlete safety. Competition legality. |
| Tournament brackets and standings              | Small                   | 5-20 years (records/history)        | Participant names, teams, rankings, tournament details       | **OCR-to-hash:** Domain binding verifies tournament organizer. Printed brackets suitable for OCR. Prevents result tampering. Permanent competition records. |
| Scouting reports and player statistics         | Very Small              | 5-15 years (player development)     | Player name, DOB, scout name, performance metrics, team      | **OCR-to-hash:** Domain binding verifies scouting organization. Report format suitable for OCR. Player development tracking. Recruitment verification. |

### Charitable & Non-Profit

| Use Case                              | Volume vs Till Receipts | Retention Period                    | Personal Data                                                               | OCR-to-hash vs QR code                                                                                                                                                                                                                                                                         |
|---------------------------------------|-------------------------|-------------------------------------|-----------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Donation receipts for tax deductions  | Medium                  | 7-10 years (tax audit)              | Donor name, address, donation amount, tax ID, charity name                  | **OCR-to-hash strong case:** Prevents fake charities (domain binding verifies legitimate charity status), inflated amounts (tamper-evident), duplicate claims across tax returns (in jurisdictions with tax deductions). Similar to receipt verification + MedPro anti-impersonation patterns. |
| Volunteer hours verification          | Medium-Small            | 3-7 years (employment verification) | Volunteer name, hours worked, supervisor, organization, activities          | **OCR-to-hash:** Domain binding verifies organization. Certificate format suitable for OCR. Employment/school applications. Court-ordered community service verification.                                                                                                                      |
| Grant applications and awards         | Very Small              | 7-10 years (financial audit)        | Applicant organization, officers, grant amount, funder, project details     | **OCR-to-hash:** Domain binding verifies funding organization. Formal documents suitable for OCR. Financial audit trail. Prevents fake grant awards.                                                                                                                                           |
| 501(c)(3) status documentation        | Tiny                    | Permanent (legal status)            | Organization name, officers, board members, EIN, IRS determination          | **OCR-to-hash strong case:** Prevents fake charities. Domain binding verifies IRS/tax authority. IRS letters suitable for OCR. Permanent legal status. Donor verification. Similar to donation receipts anti-impersonation pattern.                                                            |
| Charity rating certificates           | Tiny                    | 3-5 years (rating validity)         | Organization name, rating body, financial metrics, leadership               | **OCR-to-hash:** Domain binding verifies rating agency (Charity Navigator, GiveWell, etc.). Certificate format suitable for OCR. Donor due diligence.                                                                                                                                          |

### Media & Publishing

| Use Case                                    | Volume vs Till Receipts | Retention Period                      | Personal Data                                                           | OCR-to-hash vs QR code |
|---------------------------------------------|-------------------------|---------------------------------------|-------------------------------------------------------------------------|--------------------|
| Copyright registrations and assignments     | Very Small              | Permanent (IP rights)                 | Copyright holder name, creator, registration details, jurisdiction      | **OCR-to-hash strong case:** Prevents fake copyright registrations. Domain binding verifies copyright office (US Copyright Office, etc.). Official documents suitable for OCR. Permanent IP rights. High-value legal protection. |
| Publishing contracts and royalty statements | Very Small              | 7-20 years (contract term + disputes) | Author/artist name, publisher, payment amounts, contract terms          | **OCR-to-hash:** Domain binding verifies publisher. Contracts suitable for OCR. Dispute resolution. Royalty audit trail. Tamper-evident payment records. |
| Photo credits and image licensing           | Small                   | 5-20 years (license duration)         | Photographer name, licensee, usage rights, payment details              | **OCR-to-hash:** Domain binding verifies photographer/agency. Contracts/certificates suitable for OCR. Prevents unauthorized use claims. License verification. |
| Manuscript versions and edit history        | Very Small              | 5-10 years (publication records)      | Author name, editor names, version dates, publisher                     | **OCR-to-hash:** Domain binding verifies publisher. Documents suitable for OCR. Publication records. Plagiarism disputes. Version control. |
| Fact-checking verification and sources      | Very Small              | 3-10 years (journalistic integrity)   | Fact-checker name, reporter, sources (may be confidential), publication | **OCR-to-hash strong case:** Journalistic integrity. Domain binding verifies publication/fact-checking organization. Internal documents suitable for OCR. Prevents fabricated sources. Libel defense. |

### Telecommunications

| Use Case                             | Volume vs Till Receipts | Retention Period                  | Personal Data                                                         | OCR-to-hash vs QR code |
|--------------------------------------|-------------------------|-----------------------------------|-----------------------------------------------------------------------|--------------------|
| Service agreements and SLAs          | Medium                  | 7-10 years (contract disputes)    | Customer name, address, account number, service terms, pricing        | **OCR-to-hash:** Domain binding verifies telecom provider. Standard contracts suitable for OCR. Dispute resolution. Service level verification. Tamper-evident terms. |
| Network coverage maps and guarantees | Very Small              | 3-5 years (service claims)        | Provider name, coverage area (minimal personal data)                  | **OCR-to-hash:** Domain binding verifies telecom provider. Maps/documents suitable for OCR. Service claim verification. False advertising prevention. |
| Number portability authorizations    | Medium-Small            | 3-7 years (regulatory compliance) | Customer name, phone number, previous/new carrier, authorization date | **OCR-to-hash:** Domain binding verifies carrier. Standard forms suitable for OCR. Prevents unauthorized number porting. Regulatory compliance. Fraud prevention. |

### Adaptations and questions

- **Different registration marks** - corners, edges, watermarks, ot none just proximity to `verify:` ?
- **Different hash algorithms** SHA-256 seems OK for 2025, but is a shorter one fine really? Or longer like SHA-512 or BLAKE3
- **Blockchain anchoring** Ethereum, Hedera, IOTA - does this need byzantine distributed consensus before a hash is recorded in public? 
- **Timestamp verification** Superficially, a nation state could persuade a university to back create a "Jason Bourne" MIT maths grad entry and nothing would stop them. 
- **Multi-signature** Multiple organizations could attest to something, but I can't think what that would be for.
- **Merkle tree aggregation** Batch verification of entire sets of hashes, but that might not be needed.
- **QR codes** containing hashes or verification URLs - in addition to the plain text that can be normalized and then hash verified? Maybe but why?
- **Microprinting** for forgery resistance if that's unique for each item of the production line. A QR code would do, especially if tiny.
- **Grace periods** or expiration dates - the latter should be in the text to-be-hashed. If something is cancelled ahead of schedule that should be in the response: "CANCELED on mm/dd/yy" 
- **Witness signatures** and countersignatures - digital rather than a squiggle. Maybe not, that's better for a larger blockchain solution.

### Technical Variations Disclosed

- **URL-based verification** Hash in URL path, query parameter, or fragment or a replacement var: verify:hello.com/{hash}.txt
- **HTTP-based validation** 200/404/302 status, JSON responses, XML responses?
- **Client-side verification** Built into browsers or a plugin/extension for them? A real mobile or desktop app?
- **Email attachments** with embedded verification in Thunderbird, etc?
- **Server-side verification** API endpoints microservices instead of client-side prep and a GET of a hash toward "OK"
- **PDF annotations** with verification metadata - our training pages are HTML which is a real deployment case. but PDF would need techniques too.
- **Image steganography** for hidden hashable test - could as easily be somethine else as the payload is for machine not human eyes. 

### Future Anticipated Uses

- **Supply chain finance** documents
- **Trade documents** and letters of credit
- **Customs bonds** and guarantees
- **Cross-border** e-commerce receipts

## Tech Stack

This app is all client side. 

- **OpenCV.js 4.x**: Computer vision for registration mark detection
- **Tesseract.js v5**: Client-side OCR engine
- **Web Crypto API**: SHA-256 hashing (built into browsers)
- **Playwright**: E2E testing framework
- **Jest**: Unit testing framework

The URLs to hashes are static for now, but other deployments could have dynamic APis with gateways and billing.

## Testing

```bash
npm install
npm test  # 59 unit tests + 16 E2E tests
```

See TESTING.md for details.

## Documentation

- **NORMALIZATION.md** - Detailed text normalization specification that would be interesting to other implementations.

- **LLM.md** - Complete project context for AI assistants
- **BUILDING.md** - Build instructions
- **TESTING.md** - Test documentation
- **GITHUB_PAGES.md** - Deployment guide

## License

GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later)

See LICENSE file for full text.
