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
