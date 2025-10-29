## The MedPro PPE Case: Anti-Tampering for B2B Certifications

The MedPro fraud case (£122m UK government PPE contract, fake Intertek certification) demonstrates OCR-to-hash's strength in **preventing issuer impersonation** rather than protecting privacy.

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
