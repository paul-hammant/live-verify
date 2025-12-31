# Notary Public Services

**Category:** Notary Services
**Volume:** Large (aggregate across all notarial acts)
**Retention:** Varies by act type (7 years to permanent)

Notary publics serve as impartial witnesses and authentication officials for a wide range of legal documents. Nearly every notarial act is an ideal candidate for OCR-to-hash verification—the notary's name, commission number, jurisdiction, and notarization date are text elements captured in the verification line.

**Note on Notary Seals:** The traditional embossed or inked notary seal is a visual/physical security feature, not OCR-readable text. The seal remains on the document as anti-forgery protection, but the verification line captures the textual data elements (notary name, commission number, expiration, jurisdiction) rather than the seal image itself.

## Types of Notarial Acts

### Acknowledgments

**Purpose:** Signer acknowledges they signed a document voluntarily and are who they claim to be.

**Common Uses:**
- Real estate deeds and mortgages
- Powers of attorney
- Trust documents
- Vehicle title transfers
- Business formation documents

**Data Verified:** Signer name, date of birth, notary name, notary commission number, commission expiration, jurisdiction, document type, acknowledgment date.

**Retention:** Permanent (real estate and legal records)

**Fraud Prevention:** Deed fraud costs billions annually. Forged acknowledgments enable property theft. Verification prevents fake notarizations on fraudulent deeds.

### Jurats

**Purpose:** Affiant swears or affirms that the contents of a document are true under penalty of perjury.

**Common Uses:**
- Affidavits and sworn statements
- Depositions
- Interrogatory answers
- Immigration forms
- Insurance claim statements

**Data Verified:** Affiant name, date of birth, notary name, notary commission number, commission expiration, jurisdiction, jurat date.

**Retention:** 7-20 years (legal proceedings)

**Fraud Prevention:** Prevents forged sworn statements that could be used in litigation. Protects affiants from having statements altered after signing.

### Copy Certifications

**Purpose:** Notary certifies that a copy is a true and accurate reproduction of an original document.

**Common Uses:**
- Birth certificate copies
- Passport copies for immigration
- Diploma and transcript copies
- Business record copies
- Insurance policy copies

**Data Verified:** Document holder name, original document description, notary name, notary commission number, commission expiration, jurisdiction, certification date.

**Retention:** Copy purpose + 7-10 years

**Fraud Prevention:** Prevents submission of altered copies in official proceedings. Certified copy fraud can enable identity theft and credential fraud.

**State Variations:** Some states (like California) prohibit notaries from certifying copies of certain government documents that can only be certified by the issuing agency.

### Oaths and Affirmations

**Purpose:** Notary administers a verbal oath (sworn to God) or affirmation (secular equivalent) that the person will tell the truth.

**Common Uses:**
- Court testimony
- Security clearance applications
- Government employment applications
- Public office swearing-in
- Witness depositions

**Data Verified:** Person's name, notary name, notary commission number, commission expiration, jurisdiction, administration date.

**Retention:** 7-20 years (legal validity)

**Fraud Prevention:** Establishes legally binding commitment to truthfulness. Verification confirms oath was properly administered.

### Signature Witnessing

**Purpose:** Notary witnesses the signing of a document and verifies signer identity.

**Common Uses:**
- Wills and codicils
- Contracts and agreements
- Trust documents
- Medical directives
- Business contracts

**Data Verified:** Signer name, witness name (if separate), notary name, notary commission number, commission expiration, jurisdiction, document type, witnessing date.

**Retention:** Document lifetime + 10-20 years

**Fraud Prevention:** Will contests often hinge on whether execution was proper. Verified witness certifications prove valid execution.

### Protests (Commercial Paper)

**Purpose:** Formal notice that a negotiable instrument (check, promissory note) was presented and dishonored.

**Common Uses:**
- Dishonored checks
- Unpaid promissory notes
- Non-accepted drafts
- International bill of exchange protests

**Data Verified:** Instrument details (check/note number, amount), payee name, protest reason (dishonored/non-payment), notary name, notary commission number, commission expiration, jurisdiction, protest date.

**Retention:** 7-10 years (commercial law, UCC)

**Fraud Prevention:** Establishes legal notice of dishonor under UCC Article 3. Critical for commercial collection proceedings.

## Data Visible After Verification

Shows the issuer domain (the notary or notary service platform) and the responder text.

**Status Indications:**
- **Verified** - Notarial act matches notary's journal records
- **Commission Expired** - Notary's commission has since expired (act may still be valid)
- **Not Found** - No matching record in notary's journal
- **Revoked** - Notary's commission was revoked

**Commission Link:** Verification may link to state commission database: "Verified - Commission current through [date]."

## Second-Party Use (Document Holder Verifying Notarization)

Signers and document holders benefit from verification.

**Execution Confirmation:** Verify notarization was properly recorded.

**Filing Preparation:** Verify notarization before submitting to government agencies.

**Transaction Security:** Verify notarized documents in real estate and business transactions.

**Records Retention:** Maintain verified copies of notarized documents.

## Third-Party Use

**Title Companies and Real Estate**

Property transactions:

**Deed Verification:** Verify notarization on deeds before recording.

**Mortgage Documents:** Verify notarization on loan documents.

**Chain of Title:** Verify historical notarizations in title chain.

**Fraud Prevention:** Detect forged notarizations before recording.

**Courts**

Legal proceedings:

**Evidence Admission:** Verify notarization on submitted affidavits.

**Motion Support:** Verify sworn statements supporting motions.

**Probate:** Verify notarizations on wills and estate documents.

**Contempt Proceedings:** Verify affidavits of service.

**Government Agencies**

Official submissions:

**USCIS Immigration:** Verify notarized supporting documents.

**State Filings:** Verify notarized business formation documents.

**Tax Authorities:** Verify notarized tax declarations.

**Licensing Boards:** Verify notarized application documents.

**Financial Institutions**

Banking and lending:

**Loan Documents:** Verify notarized mortgage and loan documents.

**Account Access:** Verify notarized powers of attorney.

**Wire Transfers:** Verify notarized authorization for large transfers.

**Estate Settlement:** Verify notarized estate documents.

**Attorneys**

Legal practice:

**Document Review:** Verify notarizations on client documents.

**Discovery:** Verify notarized documents produced in litigation.

**Closings:** Verify notarizations at real estate closings.

**Due Diligence:** Verify notarized documents in transactions.

## Verification Architecture

**The Notary Fraud Problem**

Notary fraud enables many other crimes:

- **Commission Fraud:** Using expired or fake notary commissions
- **Signature Forgery:** Notary stamp applied without proper procedure
- **Identity Fraud:** Notarizing without proper identification
- **Journal Fraud:** Falsifying or failing to maintain journals
- **Remote Fraud:** Notarizing without personal appearance (pre-RON)
- **Seal Theft:** Using stolen notary seals

OCR-to-hash addresses document alteration after notarization. Commission verification confirms the notary was valid at time of act.

**Notaries as Issuers**

Notaries maintain verification records:

**Individual Notaries:** Personal journal records.

**Notary Signing Services:** Companies employing multiple notaries.

**Title Companies:** In-house notaries.

**RON Platforms:** Remote Online Notarization services with digital records.

**State Commissions:** State databases of commissioned notaries.

Each notary or platform operates verification endpoints for acts they've performed.

**State Commission Databases**

State-level verification:

**Secretary of State:** Most states maintain commission databases.

**Public Search:** Many allow public commission verification.

**Commission Status:** Active, expired, suspended, revoked.

**Commission Details:** Commission number, expiration, county.

Verification can link to state database: "Notary commission verified active in [state]."

**Notary Journals**

Record-keeping requirements:

**Journal Entry:** Most states require journal of notarial acts.

**Entry Contents:** Date, type of act, signer name, ID type, document type.

**Retention:** Typically 7-10 years after commission expires.

**Thumbprints:** Some states require signer thumbprints.

Journal entries provide the verification source for OCR-to-hash.

**Remote Online Notarization (RON)**

Digital notarization:

**Video Conference:** Notarization via video call.

**Identity Verification:** Knowledge-based authentication, credential analysis.

**Recording:** Session recording retained.

**Digital Seal:** Electronic notary stamp.

**State Authorization:** Varying state acceptance.

RON platforms have native digital verification; OCR-to-hash bridges paper outputs from RON sessions.

**Apostille and Authentication**

International recognition:

**Apostille:** Hague Convention authentication for international use.

**Chain Authentication:** Notarization → County Clerk → Secretary of State → Apostille.

**Consular Legalization:** For non-Hague countries.

Each link in the authentication chain can be independently verified.

**E-Notarization vs. RON**

Two different technologies:

**E-Notarization:** In-person notarization with electronic journal/seal.

**RON:** Fully remote notarization via video.

**Hybrid:** Electronic documents signed in-person with notary.

Each approach has different verification mechanisms.

**Notary Bonds and Insurance**

Financial protection:

**Surety Bond:** Required in most states (typically $10,000-$25,000).

**E&O Insurance:** Errors and omissions coverage.

**Bond Claims:** Injured parties can claim against bond.

**Coverage Limits:** Bond may not cover full damages.

Verification may indicate bond status: "Notary bonded, bond current."

**Multi-State Practice**

Notaries across jurisdictions:

**State-Specific Commission:** Each state issues separate commission.

**Border Area Practice:** Some states allow reciprocity.

**RON Interstate:** RON may allow serving signers in other states.

**Federal Land:** Special rules for federal land within states.

Verification must identify which state commission governs the act.

**Training and Testing Requirements**

Notary qualifications:

**Education Requirements:** Vary by state (none to 6 hours).

**Examination:** Some states require exam.

**Background Checks:** Criminal background screening.

**Renewal Training:** Continuing education in some states.

Commission verification implicitly confirms the notary met state requirements.

