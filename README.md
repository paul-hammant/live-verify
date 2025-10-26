# OCR-to-Hash Claim Verification System

**Proof of concept** implementing the approach described in: [OCR-to-Hash: A Simple Audit Trail for Physical Documents](https://paulhammant.com/2023/01/17/ocr-to-hash-simple-audit-trail-for-physical-documents/)

A **100% client-side** web app that uses phone camera OCR to verify printed claims via SHA-256 hash validation against URLs printed on the documents themselves.

**Works on GitHub Pages** - No server needed!

## What is a Claim?

A **claim** is any assertion printed on a physical document  (or up on a screen) that can be separately verified:

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
6. Shows ✅ green "VERIFIED" or ❌ red "FAILS VERIFICATION" overlay or other affordance

The system allows anyone to verify these printed claims without requiring access to the issuer's internal databases.  It will work if you're scanning the same on a laptop/tablet or bigger screen, though you risk [moiré patterns](https://en.wikipedia.org/wiki/Moir%C3%A9_pattern).

Read about one way hash functions on [kikipedia](https://en.wikipedia.org/wiki/Cryptographic_hash_function)

## When OCR-to-Hash Verification Excels (vs QR Codes)

In short, if the claim is aimed at humans reading it and is printed on paper (or could be), it might be a candidate for non-blockchain tech.

Six detailed verification scenarios demonstrate OCR-to-hash advantages:

1. **Education Credentials** - degree/etc verification with privacy-preserving public registries
2. **B2B Product Certifications** - Preventing supplier impersonation fraud (MedPro/Intertek case)
3. **Receipt Verification** - Eliminating duplicate expense claims across employers
4. **Medical Licenses** - Revocable credentials with domain-binding security
5. **Government ID Verification** - Cryptographic checks on plain text aspects (hotel checkin, traffic stop, entering a pub/bar)
6. **Voting Ballot Proof** - Verifiable vote counting with independent auditor confirmation

There are more potential OCR-to-Hash uses listed below.

QR and bar codes are much better for machine reading and might suit routing situations where authenticity does not need to be double checked by humans at every step.  An example would be a package already in the Fedex global distribution system. Where it is and needs to go next is the key piece aided by the QR/bar codes. It does not need to be validated over by humans. The printed destination is still on the label, but isn't used again until the last 100 meters or yards when the delivery associate has it in hand, and the recipient glances at it too for routing to individuals hopefully nearby.

### The CV/Resume Case: A Perfect Example

Employment and education verification on a CV/resume are an ideal use case for OCR-to-hash. Here's why:

Key criteria: Personal claim with an expectation of privacy in the public record. Each is one-off. A need to be cheaply verifiable for decades.

**What's printed on the CV:**

```
┌─────────────────────────────────┐
│                                 │
│  Edinburgh University           │
│  Bachelor of Computer Science   │
│  First Class Honours            │
│  Awarded: June 2020             │
│  To: Tim Berners-Lee, Junior    │
│  verify:degrees.ed.ac.uk        │
│                                 │
└─────────────────────────────────┘
```

**Critical detail:** The **hash is NOT printed** on the CV. Only the base URL appears.

**Interview workflow:**

1. Interviewer has printed CV in hand
2. Opens phone app, scans the registration-marked section
3. App OCRs text, normalizes it, computes hash from the certification text
4. App builds full URL: `https://degrees.ed.ac.uk/{computed_hash}`
5. Fetches URL taking advantage of the setup of degrees.ed.ac.uk not having or needing accounts/logins to access.
6. The fetch yields a `200` http response, and the entire content could be blank or `OK` to signal verification success.
7. Interviewer sees that on the phone app and pencils "✓ verified" on the CV themselves. Recruitment intermediaries may have done that too

**Why this is privacy-preserving:**

- There is nothing a search engine may hold that would direct you back to the same `OK`
- Only someone who has a printed version of the CV (or a scan/pic of it) can initiate claim verification
- No public registry of who has what degree (just verification on demand)
- GDPR compliant: interviewer has legitimate interest in verification. `ebe51417c7a506ee09763e055590858568b841f238cb6462818709cfbfebbdca` is not PII, or personal or private. Of course, a prospective employer retaining the CV itself has to be GDPR complaint if in the EU/UK.

Note ebe51417c7a506ee09763e055590858568b841f238cb6462818709cfbfebbdca is the SHA-256 of `Edinburgh ... Junior` above.

**This same privacy-preserving pattern equally applies to:**

**Claimed Credentials:**
- Academic degrees (bachelor's, master's, doctorate)
- Professional certifications (AWS, CPA, CFA, etc.)
- Training completions
- Language proficiency certificates (TOEFL, IELTS)

**Claimed Work History:**
- Employment verification letters
- Volunteer work verification

All share the key criteria: personal claims with privacy expectations, one-off documents, need for long-term verifiability (decades), and hash-not-printed verification.

### Why QR Codes FAIL for Resume/CVs

TODO: shorten

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

**3. Tampering**

- Easy to print a QR code that points to `https://fake-university.com/fake-endpoint`
- With OCR-to-hash, the text must match the hash computation
- Can't fake "Edinburgh University" text and have it verify against MIT's endpoint, or vice versa

**4. Format Evolution**

- If university changes URL structure, all CVs with hardcoded QR URLs break
- With OCR-to-hash, the base URL can change (re-print CV), but old CVs still work if university maintains redirects
- Better yet: candidate keeps "official transcript letter" with verification marks; can reprint CV as needed

**5. Multiple Claims**

- Each claim needs independent verification (one might be revoked while others valid)
- QR approach: 5 ugly QR codes
- OCR approach: 5 bordered sections with readable text, each with their own `verify:` line

## The MedPro PPE Case: Anti-Tampering for B2B Certifications

The MedPro fraud case (£122m UK government PPE contract, fake Intertek certifications) demonstrates OCR-to-hash's strength in **preventing issuer impersonation** rather than protecting privacy.

Key criteria: Produce/company have no expectation of privacy. Many thousands in production run. Certification ahead of bulk shipment - that needs to be verifiable for years.

### The Bulk Shipment Certificate: Where OCR-to-Hash Excels

**What's printed on the certificate:**

```
┌────────────────────────────────────────┐
│                                        │
│  INTERTEK TESTING SERVICES             │
│  Product Safety Certification          │
│                                        │
│  Product: Disposable PPE Gowns         │
│  Manufacturer: MedPro Ltd              │
│  Test Code: SHAT06648491               │
│  Standards: ISO 13485, CE Marked       │
│  Date: March 1, 2020                   │
│                                        │
│  verify:intertek.com/certifications    │
│                                        │
└────────────────────────────────────────┘
```

**Critical detail:** The printed **text itself determines which domain gets queried**. You can't print "INTERTEK" and have it verify against a fake domain.

**Procurement workflow:**

1. UK Government procurement officer receives shipment with certificate
2. Opens phone app, scans the registration-marked certification section
3. App OCRs text including "INTERTEK TESTING SERVICES"
4. App normalizes text, computes hash from the full certification claim
5. App builds verification URL: `https://intertek.com/certifications/{computed_hash}`
6. Fetches URL → **404 response** (certificate never issued by Intertek)
7. Officer flags shipment as fraudulent before accepting delivery, or starting "returns" paperwork and emailing the bosses. 
2. Perhaps customs agents for the same flow, but that "impound" rather than "reject".

**Why this prevents forgery:**

- **Anti-impersonation:** Can't change "Intertek" to "FakeTestLab" without changing the hash
- **Domain binding:** The certification text forces verification against `intertek.com`
- **No certificate database needed:** Intertek only hosts hashes for certs they actually issued
- **Detects fraud immediately:** Fake cert code `SHAT06648491` → 404 from real Intertek domain
- **Human readable:** Procurement officer READS the cert details, not just scanning a code

### Why QR Codes FAIL for B2B Certificates

**1. Issuer Impersonation Risk**

- MedPro's supplier prints the certificate AND the QR code together
- QR can point to `https://intertek-verifications.com/SHAT06648491` (fake lookalike domain)
- Officer would need to manually verify domain after scanning
- Easy to overlook domain spoofing in rushed procurement

**2. Forgery is Trivial**

- Print professional-looking certificate on letterhead
- Add QR code pointing to attacker-controlled server
- Server responds "Valid certification ✓"
- No cryptographic binding between text and verification endpoint

**3. Text Tampering Undetected**

- Could change "ISO 13485" to "ISO 9001" on printed cert
- QR code verification still succeeds (points to attacker server)
- OCR-to-hash would detect text change → different hash → verification fails

**4. No Offline Verification**

- Can't read certification details from QR code
- Must trust the scanned URL destination
- OCR-to-hash shows human-readable claim before verification

### The Three-Document Reality: A Hybrid Approach

**1. Fabric Label (sewn into garment)**
- **Size:** Tiny (~2cm x 5cm), wrinkles, fades with washing
- **Content:**
  ```
    ┌──────────────────────────────┐
    │ MedPro medical gowm 2020-18b │
    │ Intertek CE Certified        │
    │ ISO 13485 Compliant          │
    │ Test: SHAT06648491           │
    │ verify:intertek.com/ppe      │
    └──────────────────────────────┘
  ```
- **Current limitation:** Registration marks too large for tiny labels
- **Future OCR-to-hash:** **User-guided framing** could enable verification
  - App shows rectangle overlay on viewfinder
  - User positions label within frame
  - App crops to frame boundaries, applies OCR
  - No CV detection needed - just perspective correction
  - Works on any background, any label size
- **Timing:** Verification at delivery (before washing fades text)
- **Alternative:** Minimal info on label, verification via bulk certificate instead

**2. Bulk Shipment Certificate (B2B - the fraud vector)**
- **Format:** Formal certificate on letterhead
- **Verifier:** Government procurement officer with physical certificate
- **Privacy needed:** No (B2B transaction)
- **Verdict:** **OCR-to-hash WINS** - prevents issuer impersonation, human-readable, forgery-resistant

**3. Consumer Pamphlet (inside packaging)**
- **Format:** Paper insert, A5 size, plenty of space
- **Verifier:** Healthcare worker or consumer
- **Verdict:** **Use BOTH** - they serve different purposes
  - **OCR-to-hash section:** Cryptographic verification of certification claim
    ```
    ┌────────────────────────────┐
    │ Medical gowm 2020-18b      │
    │ MedPro Ltd, Isle of Man    │
    │ For UK NHS use in COVID-19 │
    │ Pandemic. Not for resale.  │
    │ Intertek CE Certified      │
    │ ISO 13485 Compliant        │
    │ Test: SHAT06648491         │
    │ verify:intertek.com/ppe    │
    └────────────────────────────┘
    ```
  - **QR code separately:** Links to additional product information
    - Usage instructions
    - Real-time recall status (can show "RECALLED")
    - Product specifications
    - Manufacturer contact info
    - Safety data sheets
- **Why both:** OCR-to-hash proves authenticity, QR provides convenience and live updates
- **User choice:** Scan verification rectangle for trust, scan QR for information

### Anti-Impersonation: The Hidden Criterion

The MedPro case reveals a criterion not about privacy:

**OCR-to-hash prevents certification fraud by:**
- Binding the issuer name (in text) to the verification domain
- Making text tampering detectable (hash changes)
- Forcing verification against the claimed issuer's actual domain

**This matters when:**
- Document issuer might be fraudulent (claiming to have third-party certification)
- B2B transactions where forgery has high stakes
- Legal/compliance documents where tampering must be detectable

**This doesn't matter when:**
- Issuer is trusted (university issuing its own degrees)
- Consumer convenience verification (just want quick check)
- Real-time status more important than forgery resistance

## Point-of-Sale Receipt Case: Preventing Double-Expensing

Expense fraud costs UK businesses [£1.3 billion annually](https://www.expensein.com/blog/expense-fraud/). OCR-to-hash prevents double-expensing by making each receipt's text cryptographically verifiable and uniquely claimable.

Key criteria: Business transaction with no privacy expectation. One-off transaction. Needs verifiable for tax/audit period (7 years). Hash must be unique to prevent duplicate claims.

### The Receipt: Where OCR-to-Hash Prevents Fraud

**What's printed on the receipt:**

```
┌─────────────────────────────┐
│ Starbucks Coffee            │
│ 123 Main St, Edinburgh      │
│ 27 Jan 2025    09:45:23     │
│                             │
│ Latte         £4.50         │
│ Croissant     £3.00         │
│ ─────────────────           │
│ Subtotal      £7.50         │
│ VAT (20%)     £1.50         │
│ ─────────────────           │
│ Total         £9.00         │
│                             │
│ Card: ****1234              │
│ Txn: #STB-EDI-45829         │
│ VAT Reg: GB123456789        │
│                             │
│ verify:starbucks.com/tx     │
└─────────────────────────────┘
```

**Critical details:**
- The **transaction details make the hash unique**: Date, time, items, total, VAT/sales tax, transaction ID all contribute to the hash
- **VAT (or sales tax) must be in the hash**: Prevents tampering with tax amounts and enables government audit trail

**Note for US readers:** Value-Added-Tax (VAT) is Sales tax

**Expense workflow (read-only verification):**

1. Employee scans receipt with phone app
2. App OCRs full receipt text (items, subtotal, VAT/sales tax, total, date, transaction ID)
3. App normalizes text, computes hash: `a7f3e92b...`
4. App verifies receipt exists: `GET https://rx.starbucks.com/a7f3e92b...`
5. Starbucks server responds: **200 OK + "OK"** (receipt is valid)
6. Employee submits expense claim with verified hash
7. Finance department sees "✓ Verified against Starbucks"

**Duplicate claim detection (requires additional infrastructure):**

The simple GET verification above only confirms the receipt exists. To prevent double-expensing, one of these deployment models is needed:

**Option A: Employer tracks claims internally**
- Expense system maintains database of claimed receipt hashes
- Second claim of same hash → flagged as duplicate
- No mutation needed on merchant's server
- Simple, but each employer tracks independently

**Option B: Third-party clearinghouse (recommended)**
- ExpenseClear.com receives hash from POS systems
- First employee to claim registers with clearinghouse
- Second attempt → clearinghouse returns "Already claimed"
- See "Deployment Models" section below for details

**Why this prevents fraud:**

- **Unique hash per transaction:** Can't forge a different transaction with same hash (timestamp + transaction ID ensure uniqueness)
- **Tamper-evident:** Change "£7.50" to "£75.00" → different hash → verification fails
- **Tax tampering detected:** Can't under-report VAT/sales tax amount without changing hash
- **Photocopies detected:** Same text → same hash → duplicate claim caught (if using clearinghouse or internal tracking)
- **Domain binding:** Receipt text must verify against claimed merchant's actual domain

### Why QR Codes FAIL for Receipt Verification

**1. Static QR Enables Duplicate Claims**

- Receipt printed with QR: `https://starbucks.com/verify?ref=STB-45829`
- Employee expenses receipt → QR verifies "OK"
- Employee photocopies receipt + QR → **QR still verifies "OK"**
- No cryptographic binding prevents duplicate expense claims
- Merchant would need to track ref codes, but employee could claim at different times/companies

**2. Reference ID Privacy Leak**

- QR encodes transaction ref `STB-EDI-45829`
- Anyone scanning QR can query: items purchased, location, time
- Employee's purchase history potentially accessible
- With OCR-to-hash: hash reveals nothing about transaction content

**3. Forgery Risk**

- Print fake receipt + QR pointing to attacker-controlled server
- Server responds "Valid receipt ✓"
- Finance department fooled unless they manually check domain
- OCR-to-hash: receipt text must verify against claimed merchant's domain

**4. Receipt Tampering Undetected**

- Change "£7.50" to "£75.00" on printed receipt
- QR still points to original transaction verification
- QR verifies "OK" despite altered amount
- OCR-to-hash: altered text → different hash → verification fails

### The Thermal Receipt Problem: QR as Supplement

**Challenge:** Thermal receipts fade over time (3-6 months)

**Hybrid approach:**
```
┌─────────────────────────────┐
│ Starbucks Coffee            │
│ [transaction details]       │
│                             │
│ verify:starbucks.com/tx     │
│                             │
│ [QR code to PDF archive]    │
└─────────────────────────────┘
```

- **OCR-to-hash section:** Verify immediately after purchase (while text readable)
- **QR code:** Links to permanent PDF archive of receipt (for warranty/returns)
- **Best practice:** Employee scans for expense verification before receipt fades
- **QR benefit:** Long-term proof of purchase even after thermal text degrades

### Who Benefits from Receipt Verification

**Employees:**
- Prove expenses are authentic without keeping paper receipts
- Can't be accused of duplicate claiming (verification proves first claim)

**Employers:**
- Eliminate duplicate expense fraud (saves UK businesses £1.3bn/year)
- No need to maintain internal receipt database
- Automated verification reduces manual audit effort

**Merchants:**
- Reduce disputes ("I never bought this!")
- Build trust with business customers
- Minimal infrastructure cost (just host hashes)

### Deployment Models for Receipt Verification

The basic OCR-to-hash verification (GET request confirms receipt exists) is straightforward, but **preventing duplicate expense claims** requires additional infrastructure. Here are the practical deployment models:

### Employer-Only Tracking, or vendor managing expenses for that employer

**How it works:**
- Merchant hosts verification endpoint: `GET https://rx.starbucks.com/{hash}` → 200 OK
- Employer's expense system maintains internal database of claimed receipt hashes
- First claim: Hash stored in employer's database after merchant stores linkback:

  ```bash
  # Expensify (say they are running expenses for MSFT) registers the claim on the receipt after the employee files expenses.
  POST https://rx.starbucks.com/{hash}/claim
  Body: {
    "claimingSystem": "https://expensify.microsoft.com/receipts",
  }
  → 202 Accepted + "Claimant stored"

  ```
- Second claim from SAME domain: Rejected immediately
- Second claim from DIFFERENT domain: **Allowed, but logged for audit**

### Another scenario: Consultancy fraud (say WorksThought Inc - WT)

WorksThought consults to Google and Microsoft in a city that has both.

If Microsoft doesn't manage expenses for WorksThought staff, legitimately WT registers claims with merchants. But unscrupulously could bill multiple clients for the same expense:

```
Invoice to Google: £9 (receipt hash a7f3e92b...)
Invoice to Amazon: £9 (receipt hash a7f3e92b... - same receipt!)
WorksThought pockets extra £9
```

**Merchant's record shows only one claim:**
```json
{
  "hash": "a7f3e92b...",
  "claims": [
    {
      "claimant": "https://expenses.WorksThought.com/receipts",
      "claimed_at": "2025-01-27T14:30:00Z"
    }
  ]
}
```

**No red flag at Starbucks** - they only see one legitimate claim.

**Auditor review (periodic, not real-time):**

Like "hedge fund administrators" detecting possible Ponzi schemes on behalf of hedge fund investors, an independent auditor cross-checks:
1. **Merchant records** (what WT claimed from Starbucks)
2. **Client invoices** (what WT billed to Google and Amazon)

```bash

# Auditor queries clients' expense systems
GET https://expenses.google.com/api/invoices?vendor=WorksThought&since=2025-01-01
GET https://expenses.amazon.com/api/invoices?vendor=WorksThought&since=2025-01-01

# Auditor extracts receipt hashes from both invoices
# Finds: Hash a7f3e92b... appears on BOTH Google and Amazon invoices

# Cross-check with Starbucks
GET https://rx.starbucks.com/a7f3e92b.../claims
→ Shows: Only claimed once by WorksThought.com

# FRAUD DETECTED:
# - TW claimed £9 once from Starbucks
# - TW billed £9 to Google
# - TW billed £9 to Amazon (same hash!)
# - TW received £18 for one £9 expense
```
After each of Amazon and Google asking WT who their expense auditor was at the time of signing 
their contract. they register themselves with that auditor. 

the auditor contacts Google AND Amazon directly (bypassing WorksThought) for a batch
pickup of expenses claimed. Then the correlation is done, and exceptions fed back to them. Likely 
WT pays a fine. Maybe worst case there's a civil case. Most likely there is none of those ever as
the class of fraud dissappears.

**Audit would likely be retrospective:** It doesn't really need to be real-time. Auditor reviews weekly or monthly, flags anomalies, contacts affected clients. Even months-old fraud detection has value for:
- No doubt there are 2x clawback provisions in contracts
- Criminal fraud prosecution (7-year statute of limitations) are a possibility if it goes beyond occasional, but this class of fraud disappears, and likely the nation-state moves this to civil from criminal because of this self defense mechanism.
- Termination of consultancy agreements
- Reputation damage / blacklisting

**Pros:**
- No coordination between merchants needed
- No third-party dependencies (unless using external auditor as consultancies would likely need to)
- Employer has full control over their expense data
- Expense fraud diminishes
- Audit trail enables retrospective fraud detection

**Cons:**
- Each employer maintains some infrastructure for this, or has to outsource
- Cross-client fraud requires auditor function (not automatic blocking)
- Legitimate multi-project claims may be flagged (requires investigation)

**Use case:** Small/medium businesses with in-house expense systems, consultancies with multiple clients

### More authoritarian model: Government-Mandated Registry

**Regulatory requirement:**
```
HMRC (UK) IRS (USA) regulation: All businesses with >£100K/$100K annual revenue
must publish receipt hashes for VAT/sales tax audit purposes.
```

**Dual-endpoint architecture:**

1. **Public merchant endpoint**:
   ```bash
   GET https://rx.starbucks.com/a7f3e92b...
   → 200 OK + "OK"
   ```

2. **Government tax registry** (for audit):
   ```bash
   # POS submits to tax authority (UK example with VAT)
   POST https://expenses.hmrc.gov.uk
   Headers: Authorization: Bearer {GOV_GATEWAY_TAX_ID_TOKEN}
   Body: {
     "hash": "https://rx.starbucks.com/a7f3e92b...",
     "subtotal": 7.50,
     "accountingRef": "HB/e/433/1235",
     "vat_amount": 1.50,
     "vat_rate": 0.20,
     "timestamp": "2025-01-27T09:45:23Z"
   }
   → 202 Accepted

   # US example with sales tax
   POST https://itin-exps.irs.gov
   Headers: Authorization: Bearer {ITIN_ACC_ACCESS_TOKEN}
   Body: {
     "hash": "https://rx.starbucks.com/a7f3e92b...",
     "subtotal": 10.00,
     "accountingRef": 288177322,
     "sales_tax_amount": 0.85,
     "sales_tax_rate": 0.085,
     "timestamp": "2025-01-27T14:30:00Z"
   }
   → 202 Accepted
   ```
The system would need to allow have some state management - expens filed, paid, and perhaps even reimbursed if applicable.

**Benefits:**
- **Tax audit trail:** Government tracks all VAT/sales tax collected
- **Fraud detection:** Merchant can't under-report tax (hash proves amount charged)
- **Duplicate prevention:** Government flags multiple expense claims for same receipt
- **Long-term archive:** Government maintains records beyond company bankruptcy

**Existing examples:**
- 
- **Sweden's Kontrollenheten:** Digital cash registers required since 2010
- **Italy's electronic invoicing:** All B2B/B2C invoices submitted to Agenzia delle Entrate
- **Estonia's KSI blockchain:** Government records secured by hash-based verification

### Bankruptcy & Archive Handling

**Problem:** Merchant goes bankrupt, verification endpoint dies. Solution: government picks up data to serve (read only)

```bash
# While merchant alive
GET https://rx.starbucks.com/{hash} → 200 OK

# After bankruptcy
GET https://rx.starbucks.com/{hash} → 404
# Fallback to government archive
GET https://archived-receipts-as-went-bust-in-2028.hmrc.gov.uk/starbucks.com/{hash} → 200 OK
```
- Government maintains archived hashes for bankrupt companies
- Retention: 7 years (tax audit statute of limitations)
- Only accessible after company's domain expires

## Medical License Verification

**Like degrees above**, but with critical difference: **licenses can be REVOKED**.

Medical licenses are printed wallet cards with registration marks. Verification workflow identical to CV/degree verification:
1. Hospital HR scans doctor's license card with phone
2. App OCRs: Name, license number, specialization, state board
3. Computes hash, verifies: `GET https://medical-board.state.gov/licenses/{hash}`
4. Response: `200 OK` with status and base64-encoded photo

**Key advantage over QR codes:** Can't fake "Dr. Jane Smith, License #12345" text and have it verify against wrong person's endpoint. Text itself determines whose license gets verified (domain binding).

### Government ID Verification Response Format

For identity documents (medical licenses, driver's licenses, passports), the verification response should include the holder's photo as base64-encoded data **embedded in the response body**, NOT as a separate photo URL.

**Why base64 encoding (not photo URLs):**
- Photo URLs create an enumeration vector (someone could try sequential IDs)
- Only someone with the physical document can compute the hash
- Maintains privacy-preserving property of the system
- No separate endpoint to scrape or attack

**Response format:**

```json
{
  "status": "OK",
  "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
  "issue_date": "2022-03-15",
  "expiry_date": "2027-03-15"
}
```

**Status codes:**
- **OK** - License/ID is valid and in good standing (includes photo unless holder opted out)
- **SUSPENDED** - License temporarily suspended (includes photo unless holder opted out)
- **REVOKED** - License permanently revoked (includes photo unless holder opted out)
- **STOLEN** - Document reported stolen (**photo removed**, includes mailing instructions)
- **EXPIRED** - Document past expiration date (includes photo unless holder opted out)
- **REPLACED** - Superseded by newer document (includes photo of new document, not old one)

**Example use cases:**
- **Medical licenses:** Hospital HR verifies doctor's credentials before hiring
- **Driver's licenses:** Police officer verifies during traffic stop, hotel clerk verifies at check-in, bartender verifies age
- **Passports:** Hotel clerk verifies guest identity, customs officer verifies at border

The photo returned in the response allows the verifier to match the document holder to the photograph on file, preventing someone from using a stolen or cloned document with someone else's credentials.

**Pricing (State Medical Boards):**
- Hospitals/staffing agencies: $500-$1,000/month (high-volume verifiers)
- Background check companies: Annual enterprise license
- Patients verifying their doctor: Free tier (1-10 verifications/year)
- Infrastructure cost: ~$0.000005 per verification (negligible)
- Revenue justification: Legal liability protection worth far more than $0.50/verification

Already covered in "Strong Use Cases" section below - this is just pricing elaboration.

## Government ID Verification: Bridging the Non-Government Gap

Non-digital IDs, that is.

Government-to-government passport control works well (machine-readable zones, biometric chips, shared databases). But **non-government entities have no cryptographic way to verify ID authenticity** - they're stuck with visual inspection, which can't detect sophisticated forgeries or stolen documents.

Key criteria: Government-issued credential with photo. Needs verification by non-government parties (hotels, police, bars). Can be SUSPENDED, REVOKED, or STOLEN. Privacy-preserving (no public enumeration of who has what ID).

### Driver's Licenses and Passports: Real-World Verification Gap

Both driver's licenses and passports share the same verification workflow and challenges. Here's how OCR-to-hash solves the non-government verification gap:

**Driver's License Example:**

```
┌─────────────────────────────────┐
│                                 │
│  STATE OF CALIFORNIA            │
│  DRIVER LICENSE                 │
│                                 │
│  <PHOTO     DL A1234567         │
│   NOT PA    Jane Smith          │
│   -RT OF    123 Main St         │
│   OCR TXT>  Los Angeles, CA     │
│                                 │
│  DOB: 03/15/1990                │
│  ISS: 01/20/2022                │
│  EXP: 03/15/2027                │
│                                 │
│  verify:dmv.ca.gov/dl           │
│                                 │
└─────────────────────────────────┘
```

**Passport Example (SHA-512 for international security):**

```
┌─────────────────────────────────┐
│                                 │
│  UNITED KINGDOM OF              │
│  GREAT BRITAIN AND              │
│  NORTHERN IRELAND               │
│                                 │
│  <PHOTO not part of OCR text>   │
│                                 │
│  Type: P                        │
│  Surname: SMITH                 │
│  Given names: JANE ELIZABETH    │
│  Nationality: BRITISH CITIZEN   │
│  Date of birth: 15 MAR 1990     │
│  Passport No.: 123456789        │
│  Date of issue: 20 JAN 2020     │
│  Date of expiry: 20 JAN 2030    │
│                                 │
│  verify:passports.gov.uk        │
│                                 │
└─────────────────────────────────┘
   [Machine-readable zone .....]
```

**Critical details:**

- The hash is NOT printed on the ID. Only the base URL appears. Hash inside the OCR'd text would change the hash anyway. 
- Passports likely use SHA-512 (64 hex chars) to make brute-force photo enumeration utterly futile
- Photo not part of hashed text (enables photo opt-out during transition period)

**Hotel check-in workflow (same for both):**

1. Guest presents ID (driver's license or passport) at front desk
2. Clerk opens phone app, scans registration-marked section
3. App OCRs text: Name, DOB, ID number, dates, etc (not the machine-readable zone)
4. App normalizes text, computes hash (SHA-512 for DL and passports)
5. App builds URL: `https://dmv.ca.gov/dl/{hash}` or `https://passports.gov.uk/{hash}`
6. Government responds with JSON including status and base64-encoded photo (maybe)
7. App displays verification result + photo match confirmation
8. Clerk compares displayed photo to guest's face and physical ID photo

**Verification scenarios:**

**Scenario 1: Valid license**
```json
{
  "status": "OK",
  "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
  "issue_date": "2022-01-20",
  "expiry_date": "2027-03-15"
}
```
→ Clerk sees green "VERIFIED" + photo matches guest

**Scenario 2: Suspended license (DUI, unpaid tickets)**
```json
{
  "status": "SUSPENDED",
  "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
  "reason": "Pending dangerous driving court case"
}
```
→ Clerk sees orange "SUSPENDED" warning (hotel may still allow check-in, but flags for manager review)

**Scenario 3: Stolen license**
```json
{
  "status": "STOLEN",
  "reported_stolen": "2025-01-15",
  "instructions": "Cut ID in half and mail to: DMV Lost/Stolen Unit, PO Box 12345, Sacramento CA 95814. Also call local police"
}
```
→ Clerk sees red "STOLEN" - holder should not possess this document (potential identity theft)
→ **Photo removed from response** - prevents misuse of stolen ID holder's photo
→ Clerk advised to confiscate, cut in half, and return to DMV

**Scenario 4: Forged license (text doesn't match any DMV record)**
```
GET https://dmv.ca.gov/dl/{computed_hash}
→ 404 Not Found
```
→ Clerk sees red "FAILS VERIFICATION" - license is fake or text was tampered with

**Scenario 5: Valid license with photo opt-out (transition period)**
```json
{
  "status": "OK",
  "photo": "opted out"
}
```
→ Clerk sees green "VERIFIED (no photo)" - license is valid but holder chose privacy
→ Clerk compares physical ID photo to person (traditional visual verification)

**Why this solves the verification gap:**

- **Hotels:** Can detect stolen IDs and forgeries at check-in (reduces fraud, liability)
- **Police:** Traffic stops can verify license authenticity instantly (detects fake IDs, suspended licenses)
- **Bars/clubs:** Age verification with confidence (no fake IDs accepted)
- **Rental agencies:** Verify driver's license before handing over $50K vehicle
- **Banks:** Account opening with cryptographic ID verification
- **Privacy-conscious citizens:** Can opt out of photo sharing during transition period (first 20-30 years)

**Why QR codes FAIL for government IDs:**

**1. Photo enumeration risk**
- QR code might contain: `https://dmv.ca.gov/verify?id=A1234567`
- Anyone can try sequential IDs: `A1234566`, `A1234567`, `A1234568`...
- Scraper could download entire DMV photo database
- With OCR-to-hash: Only someone with physical license can compute hash → no enumeration vector

**2. Cloning attack**
- Thief steals license, makes photocopy with their own photo
- Copies the QR code from real license
- QR verifies "OK" because it points to real license record
- No cryptographic binding between printed text/photo and QR code
- With OCR-to-hash: Changing photo changes the hash → verification fails

**3. Domain spoofing**
- Fake license prints QR pointing to `https://dmv-california.com/verify` (lookalike domain)
- Clerk scans QR, sees "Valid" on attacker's server
- Hard to spot domain spoofing in quick interaction
- With OCR-to-hash: Text determines domain ("STATE OF CALIFORNIA" → `dmv.ca.gov`)

**4. Doesn't solve government-to-non-government gap**
- Machine-readable zone on passports works for border control (government-to-government)
- But hotel clerk has no access to government passport database
- QR code alone doesn't provide cryptographic verification
- OCR-to-hash enables non-government entities to verify authentically

**Coexistence with machine-readable zones (passports):**
- **Machine-readable zone:** For government border control (biometric chips, facial recognition at automated gates)
- **OCR-to-hash verification:** For non-government entities (hotels, car rentals, banks)
- **Both use same document:** MRZ at bottom, verification URL at top
- **Complementary, not competing:** Different use cases, different verifiers
- **GeoIP possibilities:** "Our citizen is elsewhere, call local police" if someone tries to use a passport that's simultaneously being used in another country

### Who Benefits from Government ID Verification

**Hotels & Accommodations:**
- Detect stolen passports/licenses before check-in - could be the guest would trash a room an not pay on exit.
- Reduce identity theft and credit card fraud
- Liability protection (verified guest identity)
- Insurance discounts for verified ID check-in

**Police & Law Enforcement:**
- Instant verification during traffic stops
- Detect fake IDs, suspended licenses, stolen documents
- Faster processing (no radio call to dispatch to check records)
- Works even with poor network (cache recent verifications)

**Bars & Age-Restricted Venues:**
- Eliminate fake IDs (no more visual inspection guesswork)
- Legal protection (cryptographic proof of age verification)
- Faster entry (scan + verify in 10 seconds)
- Reduce underage drinking liability

**Car Rental Agencies:**
- Verify driver's license before handing over vehicle
- Check for suspensions/revocations (DUI, unpaid tickets)
- Reduce fraud (stolen identity rentals)
- Insurance claims protection (driver was verified)

**Banks & Financial Institutions:**
- Account opening with cryptographic ID verification
- Know Your Customer (KYC) compliance
- Reduce identity theft in account applications
- Regulatory compliance (verified ID required for accounts)

**ID Holders (Citizens):**
- Faster verification at hotels, bars, rentals ?
- Reduced risk of identity theft (no ID enumeration)
- Privacy-preserving (no public registry of who has what ID), notwithstanding the fact tha each country you visit stores a lot about you already.
- Can verify own ID status likely "free tier" eternally

### Privacy & Security Properties

**Privacy-preserving:**
- Hash never printed on ID (unlike QR code with embedded ID number)
- No public enumeration of IDs (can't scrape all licenses by trying sequential numbers)
- Only someone with physical ID can compute hash and verify
- Photo returned in base64 (not via URL that could be enumerated)

**Domain binding:**
- Text determines which government agency gets queried
- Can't print "STATE OF CALIFORNIA" and have it verify against attacker's domain
- Cryptographic binding between printed text and verification endpoint

**Revocation capability:**
- IDs can return SUSPENDED, REVOKED, STOLEN status
- Enables real-time status checks beyond expiration date
- Lost/stolen IDs can be flagged immediately after reported

**Photo verification:**
- Base64-encoded photo returned in verification response (for OK and SUSPENDED status)
- Photo **removed from response** for STOLEN status (prevents misuse of victim's photo)
- Verifier compares returned photo to: (a) person presenting ID, (b) photo on physical ID
- Prevents someone from using stolen ID with their own photo printed on it
- SHA-512 would make the attempt to brute-force URLs in order to get photos utterly futile (64 hex chars)

**Photo opt-out (transition period):**
- During first few decades of rollout, ID holder can specify "no photo in verification response"
- Allows privacy-conscious individuals to adopt OCR-to-hash verification without photo sharing
- Response includes `"photo_included": false` flag to indicate holder's preference
- Verifier relies on physical ID photo comparison only (traditional visual verification)
- After widespread adoption (20-30 years), photo inclusion becomes mandatory for security
- Gradual cultural shift: privacy concerns addressed through opt-out, then normalized over time

### Deployment Considerations

**Government infrastructure:**
- DMV/passport agencies host verification endpoints
- Store hash → (status + photo) mapping in database
- Likely free for citizens checking own IDs (1-10 verifications/month)
- May charge commercial users (hotels, rental agencies) for high-volume verification

**International travel:**
- Each country hosts their own passport verification endpoints
- `verify:gov.uk/passports`, `verify:state.gov/passports` (US), etc.
- No international coordination needed (each sovereign nation controls own data)
- Hotels can verify any nationality's passport (same OCR-to-hash workflow)

**Backwards compatibility:**
- New IDs printed with `verify:` URL + registration marks
- Old IDs without verification still valid (visual inspection as fallback)
- Gradual rollout over 5-10 year renewal cycle
- No infrastructure shock (existing systems continue working)

**Status reporting:**
- Citizens can report lost/stolen IDs online → status changes to STOLEN immediately
- Photo **automatically removed** from STOLEN responses to protect victim
- Response includes instructions: "Cut ID in half and mail to [issuing agency address]"
- Finder/clerk advised to confiscate and return to issuing agency
- DUI/traffic violations → status changes to SUSPENDED automatically
- Expiration date tampering detected (hash doesn't match → 404)

**Photo opt-out management:**
- ID holders can opt out of photo inclusion during transition period (first 20-30 years)
- Opt-out managed through DMV/passport agency website or in-person
- Response returns `"photo": "opted out"` instead of base64 photo data
- Verifiers fall back to traditional visual verification (compare physical photo to person)
- After transition period, photo inclusion becomes mandatory for security
- Encourages adoption: privacy-conscious individuals can verify authenticity without photo sharing

## Voting Ballot Proof: Verifiable Vote Counting

Election integrity depends on voters being able to confirm their vote was counted. OCR-to-hash enables individual vote verification through independent auditors without compromising ballot secrecy.

Key criteria: Democratic process requiring voter confidence. One-off transaction per election. Needs verification by voter and independent auditors. Privacy-preserving (no public registry of who voted what). Tamper-evident audit trail.

### The Ballot Proof Chit: Where OCR-to-Hash Enables Trust

**What's printed on the proof chit (given to voter after casting ballot):**

```
┌─────────────────────────────────┐
│                                 │
│  2028 Presidential Election     │
│  Polling Station: PS-CA-SF-042  │
│  Date: November 5, 2028         │
│  Time: 14:32:17 PST             │
│                                 │
│  Ballot ID: B7F3E2A19C4D        │
│  Transaction: TX-94881-2028     │
│                                 │
│  Vote cast for: Newsome/AOC     │
│                                 │
│  Your vote has been recorded    │
│                                 │
│  verify:election-50.ey.com      │
│                                 │
└─────────────────────────────────┘
```

**Critical details:**
- As for all, the hash is NOT printed on the chit. Only the base URL appears.
- Ballot contents ARE included (voter's choices printed on their proof chit)
- Transaction ID and timestamp make the hash unique
- Voter can verify their specific ballot was counted exactly as cast
- Independent auditor (Ernst & Young in this example) hosts verification endpoint
- Voter keeps chit private (like a receipt) to maintain ballot secrecy

**Voter verification workflow:**

1. Voter casts ballot electronically or paper ballot is scanned
2. System prints proof chit with ballot ID, transaction details, AND voter's choices
4. **Later (hours/days after polls close)**, voter scans chit with phone app
5. App OCRs text: Election name, polling station, date, time, ballot ID, transaction ID, vote choices
6. App normalizes text, computes hash (SHA-256)
7. App builds URL: `https://election-50.ey.com/{computed_hash}`
8. Independent auditor (E&Y) responds with verification status "✓ YOUR VOTE WAS COUNTED"
9. Voter sees that in Verific app.

→ Voter sees red "404 not found - please flatten your vote chit and scan again" 

1. Voter tries again and again.
2. At some point, they might have to get the state election board involved.

**Why this solves some election integrity concerns:**

- **Voter confidence:** Each voter can verify their vote was counted
- **Independent auditor:** Verification hosted by third-party firm (E&Y, Deloitte, PwC), not government
- **Ballot secrecy preserved:** Chit proves vote was counted
- **Public auditability:** Statistical reconciliation possible (total verified votes = total counted votes)
- **No blockchain needed:** Simple hash verification sufficient for individual voter confirmation

The software that does the tallying that isn't the auditors might still need to be verified as good. Perhaps 
that's E&Y again.

#### Verific beats QR codes for voting proof

Voter can't read "2028 Presidential Election, November 5" by looking at QR code, and if there's text 
beside the QR code purporting to be the same as what's linked-to by the QR code, the voter would have
to go to the link, check the authenticity of the domain (Ey.com: it was not apparent before then) and 
then all the details matching on the printed chit vs what is on the screen. 

OCR-to-hash keeps the ballot proof human-readable, but secondarily verifiable
- Increases voter trust through transparency

#### Other Benefits

**Voters:**
- Confirm their vote was counted in the official tally
- Peace of mind that their democratic participation mattered
- Can report discrepancies if verification fails
- Ballot secrecy preserved (chit doesn't reveal voting choices)

**Election Officials:**
- Increased public confidence in election integrity
- Reduced unfounded fraud claims (voters can verify themselves)
- Tamper-evident audit trail
- Automatic statistical reconciliation (verified ballots = counted ballots)

**Independent Auditors (E&Y, Deloitte, PwC, etc.):**
- Provide trusted third-party verification separate from government
- Maintain voter confidence through brand reputation
- Can cross-check totals against official results
- Flag discrepancies for investigation

**Political Campaigns:**
- Higher voter confidence → higher turnout
- Reduced post-election disputes
- Transparent process reduces legitimacy challenges
- Can encourage supporters to verify their votes were counted

**Democracy:**
- Strengthens electoral integrity through verifiable voting
- Reduces effectiveness of fraud (voters will notice missing ballots)
- Increases trust in democratic institutions
- Tamper-evident without blockchain complexity

### Deployment Considerations

**Infrastructure:**
- Independent auditor (E&Y, Deloitte, PwC) hosts verification endpoints
- Store hash → (ballot_id + timestamp + status) mapping
- Free for voters to verify their own ballot (unlimited checks)
- Government contracts with auditor for election verification services

**Ballot secrecy protection:**
- Chit includes: election name, polling station, date/time, ballot ID, transaction ID, AND voter's choices
- Hash computed from all chit content (including vote cast)
- Voter can verify their exact ballot was counted correctly
- Ballot secrecy maintained by voter keeping chit private (like a receipt)
- No public database of who voted for whom (only voter + auditor can verify individual ballot)

**Timeline:**
- Chits printed immediately after ballot cast
- Verification available after polls close (prevents real-time vote buying)
- Auditor updates status: PROCESSING → COUNTED (within hours of polls closing)
- Verification remains available for 7-10 years (election record retention)

**Security:**
- Transaction IDs include timestamp + random nonce (prevents duplicate chits)
- Polling station ID prevents ballot-box stuffing from other locations
- Auditor endpoint rate-limited to prevent scraping
- Statistical reconciliation: sum of verified ballots = official tally

**Transparency:**
- Auditor publishes aggregate statistics (total ballots verified per polling station)
- Does NOT publish individual ballot hashes (prevents enumeration)
- Government publishes official tally + number of chits issued per station
- Discrepancies flagged for investigation

**Why independent auditor (not government) hosts verification:**
- Separates ballot counting (government) from verification (third party)
- Reduces trust requirements (voters don't need to trust single entity)
- Brand reputation incentivizes accuracy (E&Y wouldn't risk credibility)
- Enables multiple auditors (different auditors for different jurisdictions)


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
