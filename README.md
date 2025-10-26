# OCR-to-Hash Claim Verification System

**Proof of concept** implementing the approach described in: [OCR-to-Hash: A Simple Audit Trail for Physical Documents](https://paulhammant.com/2023/01/17/ocr-to-hash-simple-audit-trail-for-physical-documents/)

A **100% client-side** web app that uses phone camera OCR to verify printed claims via SHA-256 hash validation against URLs printed on the documents themselves.

**Works on GitHub Pages** - No server needed!

## What is a Claim?

A **claim** is any assertion printed on a physical document that can be independently verified:

- A till (cash register) receipt claims a transaction occurred at a specific time and amount
- An academic certificate claims a degree was awarded to a named individual
- An employment letter claims someone worked at a company during specific dates
- A safety certification claims a product meets certain standards
- A medical license claims authorization to practice (or revocation thereof)

## How It Works

1. Scans printed documents with phone camera (OCR via Tesseract.js)
2. Extracts verification URL from the document
3. Normalizes text (removes extra spaces, etc.)
4. Computes SHA-256 hash of the claim
5. Checks if hash matches the URL printed on the document
6. Shows ✅ green "VERIFIED" or ❌ red "FAILS VERIFICATION" overlay

The system allows anyone to verify these printed claims without requiring access to the issuer's internal databases.

## Example: Point-of-Sale Receipt

A till (cash register) receipt is a **claim** that:
- A sale was completed
- Payment was received for specific items
- The transaction occurred at a specific date/time
- The merchant accepted the payment

The holder of the receipt may be:
- The customer who paid (proof of purchase for warranty/returns)
- An employee expensing the transaction (proof for reimbursement)
- An auditor verifying the merchant's records

By printing a `verify:` URL on the receipt, the merchant allows anyone to verify the claim's authenticity without revealing the merchant's internal transaction database. The same receipt cannot be expensed twice because the hash is unique to that exact transaction.

## Example: Safety Certification

A physical document with registration marks containing:
```
This gown was certified by Intertek
on March 1, 2022 for MedPro Ltd of
Douglas, Isle of Man.
UK medical standards Abc123, Def456
apply. #SHA10664849l
Description of gown: one piece,
tie behind, neck loop, spunbond
polypropylene, splash resistant
sterile, double wrapped.

verify:intertek.com/certifications
```

The app verifies the hash computed from the normalized text matches the verification endpoint controlled by Intertek.

## Quick Start

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

"SUPERSEDED" would not link to a replacement SHA-256 URL that'd have "OK", nor would HTTP's 302 do the same. The point is the requester should already know the the plain-text that would culminate in a verification looup.

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

Organizations hosting verification endpoints may charge for verification lookups, similar to how Bloomberg charges for financial data queries. This creates a sustainable business model while maintaining verification integrity.

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

### Why Organizations Would Pay

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

### Real-World Example: Medical License Verification

State Medical Board pricing. Maybe higher than the 10 cents of Universities.

**Who pays:**
- Hospitals verifying new hires: $1,000/month subscription
- Background check companies: Annual enterprise license
- Patients verifying their doctor: one free a year, maybe 

As technology systems, these would have rate limiting and abuse prevention.

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

### Bloomberg Comparison

**Bloomberg Terminal model:**
- $24,000/year per user
- Access to real-time financial data
- No caching allowed - data must be re-fetched?
- Enforced through technical and legal means. TODO and whistleblower incentive?

**OCR-to-hash verification model:**
- $500-$10,000/year depending on volume
- Access to real-time credential verification
- No caching allowed - must verify fresh each time
- Enforced through API rate limiting and terms of service

**Key difference:** Bloomberg provides *data*, verification provides *attestation* in a much smaller payload. The value of each comparatively is perhaps eternally debatable.

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

## Possible Use Cases

This section documents all known and anticipated applications of OCR-to-hash verification of physical documents. Any combination of these techniques with OCR, hashing, computer vision registration marks, URL-based verification, and normalization is hereby disclosed as of **January 2025**.

### Product Certifications & Compliance
 
- **Safety certifications** (electrical, fire, structural, chemical)
- **Medical device certifications** (FDA, CE marking, ISO 13485)
- **Food safety certifications** (HACCP, organic, kosher, halal, vegetarian, vegan)
- **Environmental certifications** (Energy Star, LEED, carbon neutral)
- **Product authenticity** (luxury goods, pharmaceuticals, electronics)
- **Ingredient lists** and **nutrition labels** verification
- **Batch/lot tracking** with production date and facility
- **Recall notices** and safety warnings, though one could argue a QR code to the page (bookmarkable URL) detailing the recall is what's required.
- **Expiration date authenticity** for perishables and medications
- **Fair trade**, **ethical sourcing** certifications

### Professional & Educational Qualifications
- **Academic degrees** (bachelor's, master's, doctorate, certificates)
- **Professional licenses** (medical, legal, engineering, teaching) - these are revocable, so you might see "REVOKED" instead of "OK" for the hash URL
- **Continuing education credits** (CME, CLE, CPE)
- **Vocational certifications** (trade skills, technical training)
- **Industry certifications** (IT, finance, construction)
- **Training completion** certificates (safety, compliance, skills)
- **Apprenticeship** and **internship** completion
- **Language proficiency** certificates (TOEFL, IELTS)
- **Accreditation** of educational institutions, though it doesn't seem like there's too many of them for a per-country/state/province list to be applicable (regular web page).
- **Course transcripts** and grade verification - see [hedd.ac.uk](https://hedd.ac.uk/) for UK, but this could all be more streamlined.

### Manufacturing & Supply Chain

If not too small to print and subsequently scan - or maybe this all works with microscopes too.

- **Bill of materials** (BOM) verification (if not too long)
- **Component traceability** in assemblies
- **Quality control** inspection reports
- **Calibration certificates** for instruments
- **Material test reports** (chemical composition, strength)
- **Chain of custody** documentation
- **Shipping manifests** and packing lists
- **Warehouse receipts** and inventory records
- **Serialized component tracking** (blockchain integration)
- **Counterfeit prevention** for spare parts

### Financial & Legal Documents

Some of these might not be needed.

- **Receipts** (consumer purchases, business expenses - a safeguard against the same receipt being expensed more than once, maybe)
- **Invoices** and billing statements
- **Contracts** (sales, service, employment, lease)
- **Purchase orders** and quotes
- **Warranty documents** and service agreements
- **Insurance policies** and claims documentation
- **Stock certificates** and share transfer documents
- **Derivative contracts** and options agreements
- **Promissory notes** and loan documents
- **Property deeds** and title documents
- **Notarized documents** and attestations
- **Affidavits** and sworn statements
- **Power of attorney** documents
- **Wills** and estate documents. A law-firm (or state holder of estate plans) might answer "SUPERSEDED" insyead of "OK") 
- **Tax forms** and receipts, though forms can be very long and maybe unsuitable.
- **Audit reports** and financial statements

### Healthcare & Medical Records
- **Prescriptions** and medication orders
- **Lab test results** and pathology reports
- **Vaccination records** and immunization cards
- **Medical imaging reports** (X-ray, MRI, CT scan)
- **Patient consent forms** and HIPAA authorizations
- **Referral letters** and specialist consultations
- **Discharge summaries** and care plans
- **Medical device implant cards** (pacemakers, stents)
- **Allergy** and **medical alert** cards
- **Blood type** and **donor** cards

### Government & Civic Documents
- **Birth certificates** and death certificates
- **Marriage licenses** and divorce decrees
- **Adoption papers** and custody orders
- **Passports** and visa documents
- **Driver's licenses** and vehicle registrations
- **Permits** (building, business, environmental)
- **Inspection reports** (health, safety, fire)
- **Court orders** and judgments
- **Patent** and **trademark** certificates
- **Voting ballots** and election results (paper trail)
- **Census forms** and surveys
- **Land surveys** and property boundaries

### Logistics & Transportation
- **Shipping labels** and tracking numbers
- **Customs declarations** and export licenses
- **Dangerous goods declarations** (HAZMAT)
- **Temperature logs** for cold chain
- **Delivery confirmation** and proof of receipt
- **Bill of lading** and freight documents
- **Vehicle inspection** reports
- **Flight manifests** and cargo lists
- **Container seals** and tamper evidence

### Retail & Consumer Protection
- **Product labels** and packaging information
- **Price tags** and promotional offers
- **Return authorizations** and RMA numbers
- **Gift cards** and vouchers
- **Loyalty cards** and membership cards
- **Coupons** and rebate forms
- **Raffle tickets** and contest entries
- **Event tickets** and admission passes

### Scientific & Research
- **Lab notebooks** and experimental data
- **Peer review** reports and journal submissions
- **Research grants** and funding awards
- **Ethical approval** (IRB, IACUC) documents
- **Data sharing agreements** and material transfer
- **Scientific instrument** calibration records
- **Clinical trial** enrollment and consent
- **Specimen labels** and biobank records

### Art & Collectibles
- **Certificates of authenticity** for artwork
- **Provenance** documentation and ownership history
- **Appraisals** and valuations
- **Edition numbers** for prints and sculptures
- **Artist signatures** and stamps
- **Auction records** and sale documents
- **Conservation reports** and restoration history

### Energy & Utilities
- **Utility bills** (electric, gas, water)
- **Meter readings** and consumption logs
- **Solar panel** efficiency certificates
- **Energy audits** and efficiency ratings
- **Carbon credits** and offset certificates
- **Renewable energy certificates** (RECs)

### Agriculture & Food
- **Seed certification** and variety registration
- **Livestock** health certificates and pedigrees
- **Harvest records** and yield data
- **Pesticide application** logs
- **Soil test results** and amendments
- **Farm subsidy** documentation
- **Animal feed** labels and composition

### Real Estate & Property
- **Property appraisals** and valuations
- **Home inspection** reports
- **Pest inspection** certificates
- **Zoning** and land use documents
- **HOA** documents and bylaws
- **Rental agreements** and lease contracts
- **Property tax** assessments

### Sports & Athletics
- **Athletic records** and timing results
- **Drug testing** (anti-doping) certificates
- **Coaching certifications** and qualifications
- **Equipment certifications** (safety, performance)
- **Tournament brackets** and standings
- **Scouting reports** and player statistics

### Charitable & Non-Profit
- **Donation receipts** for tax deductions
- **Volunteer hours** verification
- **Grant applications** and awards
- **501(c)(3) status** documentation
- **Charity rating** certificates

### Media & Publishing
- **Copyright registrations** and assignments
- **Publishing contracts** and royalty statements
- **Photo credits** and image licensing
- **Manuscript versions** and edit history
- **Fact-checking** verification and sources

### Telecommunications
- **Service agreements** and SLAs
- **Network coverage** maps and guarantees
- **Data usage** statements
- **Number portability** authorizations

### Combinations & Multi-Factor Verification

All of the above can be combined with:
- **Multiple registration marks** (corners, edges, watermarks)
- **Multiple hash algorithms** (SHA-256, SHA-512, BLAKE3)
- **Blockchain anchoring** (Bitcoin, Ethereum, Hedera, IOTA)
- **Timestamp verification** (RFC 3161, blockchain timestamps)
- **Multi-signature** requirements (multiple organizations attest)
- **Merkle tree aggregation** (batch verification)
- **QR codes** containing hashes or verification URLs
- **NFC tags** with embedded hashes
- **Holographic** elements for physical security
- **Microprinting** for forgery resistance
- **UV-reactive** or **thermochromic** inks
- **Serialization** and unique identifiers
- **Revocation lists** and CRLs
- **Grace periods** and expiration dates
- **Multi-language** text normalization
- **Multi-page** document aggregation
- **Hierarchical** verification (document chains)
- **Witness signatures** and countersignatures
- **Federated verification** across organizations
- **Zero-knowledge proofs** of authenticity without revealing content
- **Differential privacy** for statistical verification
- **Homomorphic encryption** for encrypted verification

### Technical Variations Disclosed

- **Computer vision registration marks** (squares, circles, triangles, custom shapes)
- **Multi-orientation OCR** (0°, 90°, 180°, 270° with confidence scoring)
- **Unicode text normalization** (quotes, dashes, spaces, ellipsis)
- **URL-based verification** (hash in URL path, query parameter, or fragment)
- **HTTP-based validation** (200/404 status, JSON responses, XML responses)
- **Client-side verification** (browser, mobile app, desktop app)
- **Server-side verification** (API endpoints, microservices)
- **Offline verification** (local database, cached responses)
- **Progressive Web Apps** for installation
- **Native mobile apps** (iOS, Android)
- **Command-line tools** for batch processing
- **Browser extensions** for inline verification
- **Email attachments** with embedded verification
- **PDF annotations** with verification metadata
- **Image steganography** for hidden hashes
- **Audio steganography** (hash encoded in ultrasonic audio)
- **Augmented reality** overlays for verification status

### Future Anticipated Uses

- **Smart contract** integration (automatic execution on verification)
- **IoT device** certificates and firmware verification
- **3D printing** files and STL authenticity
- **Genetic sequence** data verification
- **Satellite imagery** and geospatial data authentication
- **Biometric** template verification (encrypted hashes)
- **AI model** weights and training data provenance
- **Software bill of materials** (SBOM) verification
- **Container images** and Docker registries
- **Package manager** signatures (npm, pip, cargo)
- **Executable binaries** and code signing
- **Configuration files** and infrastructure-as-code
- **Database schemas** and migrations
- **API specifications** (OpenAPI, GraphQL schemas)
- **Machine-readable** regulations and compliance rules
- **Self-sovereign identity** credentials
- **Verifiable credentials** (W3C standard)
- **Decentralized identifiers** (DIDs)
- **Supply chain finance** documents
- **Trade documents** and letters of credit
- **Customs bonds** and guarantees
- **Cross-border** e-commerce receipts

## Tech Stack

- **OpenCV.js 4.x**: Computer vision for registration mark detection
- **Tesseract.js v5**: Client-side OCR engine
- **Web Crypto API**: SHA-256 hashing (built into browsers)
- **Playwright**: E2E testing framework
- **Jest**: Unit testing framework

## Testing

```bash
npm install
npm test  # 59 unit tests + 16 E2E tests
```

See TESTING.md for details.

## Documentation

- **LLM.md** - Complete project context for AI assistants
- **NORMALIZATION.md** - Detailed text normalization specification
- **BUILDING.md** - Build instructions
- **TESTING.md** - Test documentation
- **GITHUB_PAGES.md** - Deployment guide

## License

GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later)

See LICENSE file for full text.
