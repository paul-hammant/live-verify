# Remote online notarizations (RON)

**Category:** Notary Services
**Volume:** Large
**Retention:** 10 years (state retention laws)

## Data Verified

Signer name, video session ID, notary name, notary commission number, electronic journal entry, document type, session date/time, RON platform name

## Data Visible After Verification

Shows the issuer domain and the responder text (e.g., "Valid ID" or "Denied").

**Status Indications:**
- **Valid** - Document verified and current
- **Expired** - Document has reached expiration
- **Revoked** - Document has been revoked or cancelled
- **Superseded** - A newer version exists

The verification response may include additional context such as issue date, expiration date, or document serial numbers.

## Second-Party Use

The document holder (subject/recipient) benefits from verification.

**Document Authenticity:** Verify received documents are genuine and properly issued.

**Third-Party Presentation:** Provide verified documentation when required.

**Compliance Requirements:** Meet regulatory or contractual documentation requirements.

**Record Keeping:** Maintain verified records for future reference or audits.

**Dispute Prevention:** Establish authenticity to prevent future challenges.

## Third-Party Use

**Courts and Legal Professionals**

Litigation and legal proceedings:

**Evidence Authentication:** Verify documents submitted as evidence.

**Discovery Verification:** Confirm authenticity of documents in discovery.

**Dispute Resolution:** Validate contested documents in litigation.

**Due Diligence:** Verify documentation in transactions and investigations.

**Expert Testimony:** Support expert opinions with verified documentation.

**Auditors and Compliance Officers**

Internal and external audits:

**Financial Audits:** Verify documents during financial statement audits.

**Compliance Audits:** Validate documentation for regulatory compliance.

**Internal Controls:** Test document authenticity in control assessments.

**Fraud Investigations:** Verify documents in fraud examinations.

**Third-Party Audits:** Validate vendor and partner documentation.

## Verification Architecture

**The Remote online notarizations (RON) Fraud Problem**

Document fraud creates significant risks:

- **Fabrication:** Entirely fake documents created from scratch
- **Alteration:** Genuine documents with modified content (dates, amounts, names)
- **Impersonation:** Documents falsely claiming to be from legitimate issuers
- **Expired/Revoked Documents:** Presenting invalid documents as current

OCR-to-hash verification addresses fake and altered documents. Domain binding confirms the claimed issuer actually issued the document.

**Issuer Types**

Who issues these documents and operates verification endpoints?

**Primary Issuers:** Organizations with direct authority to issue these documents.

**Licensed Professionals:** Professionals authorized to create and certify documents.

**Government Agencies:** Federal, state, or local agencies with jurisdiction.

**Industry Bodies:** Trade associations and professional organizations.

**System Integration**

Verification integrates with relevant systems:

**Issuer Systems:** Core operational systems generate verification hashes at document creation.

**Industry Standards:** Existing data standards extended to include verification.

**Regulatory Systems:** Government databases for systematic hash receipt and oversight.

**Third-Party Platforms:** Industry portals and platforms enable verification access.

## Rationale

Prevents fake RON certifications in electronic notarizations. Domain binding verifies RON platform and notary legitimacy. COVID-19 pandemic accelerated RON adoption for contactless transactions. Electronic journal verification for audit trails. Prevents remote notary fraud through tamper-evident records. Audio/video recording authentication proves signer identity verification. Critical for remote transactions where electronic notarization replaces in-person notarization with equivalent legal validity.
