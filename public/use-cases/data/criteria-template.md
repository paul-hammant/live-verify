# Use Case Criteria and Template

This document defines the criteria for OCR-to-hash verification use cases and the standard template for documenting them.

## What Makes a Good Use Case

A document type is a good candidate for OCR-to-hash verification when:

1. **Paper or printable origin** - The document exists as a physical artifact or is routinely printed from digital systems. Pure-digital documents with native cryptographic verification (blockchain records, digitally-signed PDFs with intact signatures) don't need this bridge.

2. **Authoritative issuer** - There's a clear issuing authority who can operate a verification endpoint bound to their domain.

3. **Verification need** - Third parties need to confirm authenticity, or the document holder (second party) wants to prove their document is genuine.

4. **Fraud risk** - Forgery, alteration, or misrepresentation of the document causes real harm.

5. **Retention period** - The document has meaningful shelf life (days to permanent).

## The Parties

### Issuer (First Party)
The authority that creates and signs the document. They:
- Generate the document with verification line
- Maintain the hash database
- Operate the verification endpoint at their domain
- May submit hashes systematically to regulators or oversight bodies

Examples: banks, hospitals, universities, courts, notaries, insurers, government agencies.

### Second Party
The subject and/or first recipient of the document. They:
- Receive the original document from the issuer
- Are typically the subject of the document (their name, their data)
- Are often, but not always, the legal beneficiary
- May verify their own document to confirm it's genuine
- May pass the document onward (printed or scanned) to third parties

The second party is the person the claim was originally passed to. They verify "Is this document about me actually what the issuer sent?" Or at least "mine" somehow.

Examples: the employee (reference letter), the patient (lab results), the property owner (deed), the policyholder (insurance policy), the borrower (loan documents).

Note: "Beneficiary" is often inaccurate. A borrower is the subject of loan documents but is an obligor. A judgment debtor receives the court order against them—they're the second party but decidedly not the beneficiary. The second party is defined by receipt and subject matter, not by whether the document is favorable to them.

### Third Parties
Anyone who receives the document after the second party, or who receives hashes systematically. Third-party verification happens in two modes:

**Ad-hoc verification:** Someone presents a document, the third party scans and verifies.
- Employer verifying a job applicant's degree
- Landlord verifying a tenant's pay stubs
- Bank verifying a customer's identity document (KYC)
- Court verifying an expert witness report

**Systematic hash receipt:** By statute, regulation, or contract, issuers submit hashes in bulk to oversight bodies. These third parties may never see original documents—they maintain verification capability for audits, compliance, or future disputes.
- Banks submit statement hashes to regulators (Fed, OCC, FDIC)
- Insurers submit policy hashes to state insurance commissioners
- Clinical trial sponsors submit consent hashes to FDA
- Pharmaceutical companies submit batch record hashes to regulators
- Professional licensing boards share credential hashes

Systematic recipients often receive hashes in merkle trees or batch submissions, enabling efficient verification of large document populations.  Maybe a blockchain or maybe something that merkle tree-like but without distributed byzantine concensus features.

## Template Structure

Each use case document should include:

```markdown
# [Document Type]

**Category:** [Category name]
**Volume:** [Very Small / Small / Medium / Large / Very Large]
**Retention:** [Typical retention period and why]

## Data Verified

[List the data elements captured in the verification line. These are the text elements that become part of the hash—NOT visual elements like seals, watermarks, or photos.]

**Document Types:** [If multiple subtypes exist, list them]

[Any special considerations: multi-page handling, privacy salt, OCR challenges]

## Data Visible After Verification

Shows the issuer domain and the responder text.

**Status Indications:**
- **[Status]** - [What it means]
[List all relevant statuses: Valid, Expired, Revoked, Superseded, etc.]

[Any additional information the verification response might include]

## Second-Party Use

[How does the document subject/recipient benefit from verification?]

**[Use case]:** [Description]
[List 3-5 key second-party verification scenarios]

## Third-Party Use

[Organize by stakeholder type. For each:]

**[Stakeholder Category]**

[Context for this stakeholder type]

**[Specific use]:** [Description]
[List 3-5 verification scenarios for this stakeholder]

[Repeat for all relevant third-party categories]

## Verification Architecture

**The [Document Type] Fraud Problem**

[Describe the specific fraud patterns this verification addresses:
- Fabrication (entirely fake documents)
- Alteration (genuine documents with modified content)
- Impersonation (documents falsely attributed to legitimate issuers)
- Expired/revoked presented as current
- Page substitution (for multi-page documents)
- Other document-specific fraud patterns]

**[Issuer Type] as Issuers**

[Who issues these documents and operates verification endpoints?]

[List major issuer categories with examples]

**[Integration/Compliance Topic]**

[Relevant standards, regulations, or system integrations]

[Additional architecture sections as needed for the document type]
```

## Special Considerations

### Multi-Page Documents
For documents routinely exceeding a few pages (contracts, reports, policies), note that per-page verification prevents page substitution attacks. Each page carries its own verification line. A final page would list all the hashes of the prior pages and its own verification link. Or a maybe not the last page.

### Privacy Salt
For documents containing sensitive personal information where hash enumeration attacks are a concern (identity documents, medical records, immigration documents), note that issuers should add random salt lines to raise entropy.

### OCR Challenges
For documents with decorative typography, handwriting, or complex layouts (art certificates, historical documents), note any special considerations for OCR-optimized design.

### Seals, Stamps, and Visual Elements
Physical security features (embossed seals, ink stamps, holograms, photos) are NOT part of the OCR verification. These remain as anti-forgery features on the physical document. Only text elements appear in the verification line.

### Real-Time vs. Batch Verification
Some use cases require real-time verification (insurance at point of claim, credentials at security checkpoint). Others can tolerate batch processing (regulatory audits, periodic compliance checks). Note timing requirements where relevant.

### Systematic Hash Submission
Where issuers routinely submit hashes to regulators or oversight bodies (by statute or contract), describe:
- Who receives the hashes
- In what format (raw list, merkle tree, blockchain - public or not)
- For what purpose (audit, compliance, dispute resolution)
- Any third-party witnesses or attestation requirements
- When audits apply, what is the nature of those?

## Volume Guidelines

- **Very Small:** Hundreds to low thousands per year globally
- **Small:** Thousands to tens of thousands per year
- **Medium:** Tens of thousands to hundreds of thousands per year
- **Large:** Hundreds of thousands to millions per year
- **Very Large:** Millions to billions per year

## Retention Guidelines

Document why the retention period matters:
- Regulatory requirement (cite regulation if known)
- Statute of limitations
- Business/audit cycle
- Permanent records (vital records, property, credentials)
