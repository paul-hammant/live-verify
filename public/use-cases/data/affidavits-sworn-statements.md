# Affidavits and Sworn Statements

**Category:** Financial & Legal Documents
**Volume:** Small
**Retention:** 10-30 years (legal proceedings)

## Data Verified

Affiant name, affiant address, statement date, jurisdiction (venue), specific statements of fact, signature, notary name, notary commission number, notarization date, any exhibits or attachments referenced.

**Document Types:**
- **General Affidavit:** Sworn statement of facts
- **Affidavit of Identity:** Confirming identity for legal purposes
- **Affidavit of Heirship:** Identifying heirs in estate matters
- **Affidavit of Residence:** Confirming domicile or residence
- **Affidavit of Service:** Confirming legal document delivery
- **Self-Proving Affidavit:** Attached to wills for probate
- **Financial Affidavit:** Sworn statement of financial condition
- **Affidavit of Support:** Immigration sponsorship (I-864)
- **Small Estate Affidavit:** For simplified estate administration

**Perjury Implications:** Affidavits are made under penalty of perjury. Verification prevents post-signing alteration that could expose affiants to perjury claims for statements they didn't actually make.

## Data Visible After Verification

Shows the issuer domain (notary, court, or legal entity) and the responder text.

**Status Indications:**
- **Verified** - Affidavit matches notary's records
- **Withdrawn** - Affiant has withdrawn the statement
- **Superseded** - Replaced by amended affidavit
- **Expired** - Time-limited affidavit has expired

**Verification Context:** May indicate purpose: "Verified - Affidavit of Service in Case No. [X]."

## Second-Party Use (Affiant Verifying Their Own Statement)

Affiants benefit from verification.

**Statement Accuracy:** Verify the sworn statement matches what was signed.

**Filing Preparation:** Verify affidavit before submitting to court or agency.

**Protection Against Alteration:** Document that statement wasn't changed after signing.

**Records Retention:** Maintain verified copies for personal records.

## Third-Party Use

**Courts**

Legal proceedings:

**Motion Support:** Verify affidavits supporting or opposing motions.

**Evidence Submission:** Verify affidavits offered as evidence.

**Default Judgments:** Verify affidavits of service for defaults.

**Summary Judgment:** Verify affidavits in dispositive motions.

**Contempt Proceedings:** Verify affidavits in enforcement actions.

**Opposing Parties**

Litigation:

**Discovery Verification:** Verify affidavits produced in discovery.

**Deposition Preparation:** Verify affidavits before deposing affiant.

**Impeachment Material:** Verify prior affidavits for inconsistencies.

**Response Preparation:** Verify affidavits being responded to.

**Government Agencies**

Administrative matters:

**Immigration (USCIS):** Verify affidavits of support.

**Tax Authorities:** Verify financial affidavits.

**Licensing Boards:** Verify affidavits supporting applications.

**Benefits Agencies:** Verify affidavits for benefit claims.

**Law Enforcement:** Verify affidavits supporting investigations.

**Financial Institutions**

Banking and lending:

**Loan Applications:** Verify financial affidavits.

**Account Access:** Verify affidavits of identity for account access.

**Estate Settlement:** Verify small estate affidavits.

**Fraud Investigation:** Verify affidavits in fraud claims.

**Attorneys**

Legal practice:

**Client Verification:** Verify affidavits prepared for clients.

**Opposing Counsel:** Verify affidavits received from opposing parties.

**Real Estate Closing:** Verify affidavits required for closing.

**Title Clearing:** Verify affidavits of heirship.

**Insurance Companies**

Claims processing:

**Claim Support:** Verify affidavits supporting insurance claims.

**Fraud Investigation:** Verify affidavits in suspected fraud.

**Subrogation:** Verify affidavits in subrogation actions.

## Verification Architecture

**The Affidavit Fraud Problem**

Fraudulent affidavits undermine legal processes:

- **Forged Affidavits:** Entirely fabricated sworn statements
- **Altered Statements:** Genuine affidavits with modified facts
- **Signature Forgery:** Statements not actually signed by affiant
- **Notary Fraud:** False notarization of unsworn statements
- **Date Manipulation:** Backdating or forward-dating affidavits
- **Exhibit Substitution:** Replacing exhibits after execution

OCR-to-hash addresses fabrication and alteration. Notary verification confirms proper execution.

**Notaries and Courts as Issuers**

Multiple parties verify affidavits:

**Notaries Public:** Primary authenticators of affidavits.

**Court Filing Systems:** Courts receiving filed affidavits.

**E-Notarization Platforms:** Online notarization services.

**Law Firms:** Attorneys supervising affidavit execution.

Each maintains verification endpoints for affidavits they've authenticated.

**Notarization Requirements**

Proper execution elements:

**Personal Appearance:** Affiant must appear before notary.

**Identification:** Notary must verify affiant identity.

**Oath/Affirmation:** Affiant must swear to truth of statements.

**Signature:** Affiant signs in notary's presence.

**Notarial Certificate:** Notary completes certificate with seal.

Verification confirms: "Verified - Notarized by [notary], commission #[X]."

**Jurat vs. Acknowledgment**

Two different notarial acts:

**Jurat:** Affiant swears oath to truth of document (required for affidavits).

**Acknowledgment:** Affiant acknowledges signing document (for deeds, etc.).

**Proper Form:** Affidavits require jurat, not acknowledgment.

Verification distinguishes: "Verified - Jurat by [notary]."

**Exhibits and Attachments**

Affidavits often incorporate documents:

**Exhibit References:** "See Exhibit A attached hereto."

**Exhibit Marking:** Initials and exhibit labels.

**Integration:** Exhibits become part of sworn statement.

**Per-Page Verification:** Each exhibit page should be verifiable.

Verification indicates exhibits: "Verified - Affidavit with 3 exhibits (A-C)."

**Electronic Affidavits**

Digital execution:

**Remote Online Notarization (RON):** Electronic notarization via video.

**Electronic Signatures:** E-signatures meeting legal requirements.

**Platform Records:** E-notarization platform audit trails.

**Jurisdictional Acceptance:** Varies by state and purpose.

RON platforms may have native verification; OCR-to-hash bridges paper affidavits.

**Affidavit of Service**

Proving legal notice:

**Personal Service:** Direct delivery to party.

**Substituted Service:** Delivery to authorized person.

**Service by Mail:** Mailing with declaration.

**Process Server Information:** Server's identity and credentials.

Service affidavits are critical—verification prevents fraudulent claims of service.

**Financial Affidavits**

Sworn financial statements:

**Divorce Proceedings:** Required in family law cases.

**Loan Applications:** Supporting financial disclosures.

**Bankruptcy:** Sworn schedules of assets and liabilities.

**Business Transactions:** Financial representations.

Financial affidavit verification may be particularly important given monetary stakes.

**Immigration Affidavits**

USCIS requirements:

**I-864 Affidavit of Support:** Financial sponsorship guarantee.

**I-751 Affidavit:** Joint petition for removing conditions.

**Relationship Evidence:** Affidavits supporting relationship claims.

**Good Moral Character:** Character reference affidavits.

Immigration affidavits have specific USCIS requirements and long retention.

**Self-Proving Affidavits**

Will execution:

**Attached to Will:** Simplifies probate by pre-proving execution.

**Witness Statements:** Witnesses swear to proper execution.

**Notarization:** Makes affidavit self-proving.

**Probate Efficiency:** Avoids need to locate witnesses later.

Self-proving affidavits should verify with the will they prove.

**Amendment and Withdrawal**

Correcting sworn statements:

**Supplemental Affidavit:** Adding information.

**Corrected Affidavit:** Fixing errors.

**Withdrawal:** Formally withdrawing statement.

**Effect on Prior Affidavit:** Original may remain in record.

Verification reflects status: "Verified - Original affidavit; see supplemental affidavit dated [date]."

