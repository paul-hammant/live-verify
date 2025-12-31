---
title: "Notarized Documents and Attestations"
category: "Financial & Legal Documents"
volume: "Medium-Small"
retention: "7-20 years (legal validity, notary journal requirements)"
slug: "notarized-documents"
tags: ["notarized", "documents", "financial", "legal"]
---
## Data Verified

Signatory name(s), notary public name, notary commission number, notary commission expiration date, notary seal/stamp details, notarization date, jurisdiction (state/county), document type being notarized, notarial act type (acknowledgment, jurat, oath, copy certification), venue (where notarization occurred).

**Notarial Act Types:**
- **Acknowledgment:** Signer acknowledges signing voluntarily (most common for deeds)
- **Jurat:** Signer swears/affirms content is true (affidavits)
- **Oath/Affirmation:** Verbal pledge without written document
- **Copy Certification:** Notary certifies copy matches original
- **Signature Witnessing:** Notary witnesses signing
- **Protest:** Commercial paper protest (rare, specialized)

**The Seal/Stamp Problem:** Notary seals are easily counterfeited with modern printing technology. Verification against the notary's records and state commission database provides assurance beyond visual seal inspection.

## Data Visible After Verification

Shows the issuer domain (the notary or state notary authority) and the responder text.

**Status Indications:**
- **Verified** - Notarization matches notary journal records
- **Commission Expired** - Notary's commission was expired at time of notarization
- **Commission Suspended** - Notary commission was suspended
- **Commission Revoked** - Notary commission has been revoked
- **Not Found** - No matching record in notary journal
- **Notary Deceased** - Notary is deceased (successor custodian holds records)

**Journal Reference:** Verification may link to the notary's journal entry for the specific notarization.

## Second-Party Use (Signer Verifying Their Own Notarization)

Document signers benefit from verification.

**Notarization Authenticity:** After signing, parties verify the notarization was properly recorded.

**Commission Verification:** Confirm the notary had a valid commission.

**Record Keeping:** Maintain verified notarization records for personal files.

**Transaction Completion:** Verify notarization before relying on document.

**Remote Notarization:** Especially important for RON (Remote Online Notarization) to verify digital records.

## Third-Party Use

**Courts and Legal Proceedings**

Evidence authentication:

**Document Admission:** Courts verify notarization before admitting documents.

**Affidavit Verification:** Verify sworn statements are properly notarized.

**Deed Challenges:** Real estate title disputes may question notarization.

**Will Contests:** Probate courts verify will notarization.

**Fraud Investigation:** Investigate suspected notarial fraud.

**Real Estate and Title Companies**

Property transactions:

**Deed Verification:** Title companies verify notarization on deeds.

**Mortgage Documents:** Lenders verify notarization on loan documents.

**Closing Document Review:** Verify all documents properly notarized.

**Title Insurance:** Defective notarization can cloud title.

**Foreign Document Authentication:** Verify notarization before apostille.

**Financial Institutions**

Account and transaction documentation:

**Signature Cards:** Banks verify notarization on signature authorities.

**Power of Attorney:** Verify POA notarization before honoring.

**Beneficiary Changes:** Verify notarization on beneficiary designations.

**Trust Documents:** Verify trust instrument notarization.

**Loan Documents:** Verify borrower document notarization.

**Government Agencies**

Official document processing:

**Passport Applications:** Verify notarized supporting documents.

**Immigration Documents:** Verify affidavit notarization.

**Professional Licensing:** Verify application notarization.

**Land Records:** Recording offices verify notarization before recording.

**Vital Records:** Verify notarization on corrections or amendments.

**Attorneys**

Legal practice:

**Client Documents:** Attorneys verify documents brought by clients.

**Opposing Party Documents:** Verify notarization on opponent's submissions.

**Transaction Closings:** Verify all parties' documents.

**Estate Planning:** Verify estate document notarization.

**Litigation Support:** Verify documents in discovery.

**Employers**

Employment documentation:

**I-9 Compliance:** Some employers use notaries for I-9 verification.

**Employment Agreements:** Verify notarization on significant contracts.

**Background Checks:** Verify notarized authorization forms.

## Verification Architecture

**The Notarial Fraud Problem**

Notarial fraud is common and serious:

- **Fake Seals:** Counterfeit notary stamps easily obtained
- **Expired Commissions:** Notarizing after commission expires
- **Improper Venue:** Notarizing outside commissioned jurisdiction
- **Signer Not Present:** Notarizing without signer present
- **Identity Fraud:** Notarizing for impostors
- **Backdating:** Dating notarization earlier than actual date
- **Blank Documents:** Notarizing incomplete documents

OCR-to-hash addresses fake seals and altered notarization text. Commission verification confirms notary was properly commissioned. Presence and identity require notary diligence.

**Notaries as Issuers**

Individual notaries maintain records:

**Notary Journals:** Notaries must maintain journals of notarial acts.

**Journal Entries:** Date, type, signer, document type, identification used.

**Journal Retention:** Required retention periods vary by state.

**Journal Production:** Journals may be subpoenaed.

Each notary could operate a verification endpoint for their journal entries.

**State Secretary of State Integration**

States commission and regulate notaries:

**Commission Database:** States maintain notary commission databases.

**Commission Verification:** Public can verify commission status.

**Disciplinary Actions:** Suspensions and revocations recorded.

**Electronic Notary Registries:** States registering electronic and RON notaries.

State databases confirm commission status; notary journals confirm specific acts.

**Remote Online Notarization (RON)**

Digital notarization creates verification opportunities:

**Audio-Video Recording:** RON sessions are recorded.

**Digital Certificates:** Electronic signatures with digital certificates.

**Knowledge-Based Authentication:** Identity verification questions.

**Credential Analysis:** ID document verification.

**Tamper-Evident Seals:** Digital seals on electronic documents.

**RON Platform Records:** Platform maintains session records.

RON inherently creates more verifiable records than traditional notarization.

**Notary Signing Agents**

Specialized notaries for loan closings:

**NSA Certification:** Additional training for loan documents.

**Signing Services:** Companies deploying NSAs to closings.

**Background Checks:** NSAs often undergo additional screening.

**E&O Insurance:** Errors and omissions coverage requirements.

**Platform Integration:** Signing services maintain completion records.

**Apostille and Authentication Chains**

International document use requires authentication:

**Apostille:** Hague Convention certification of notarization.

**Embassy Legalization:** Non-Hague countries require embassy authentication.

**Certificate Chain:** Document → Notary → County Clerk → Secretary of State → Apostille.

**Chain Verification:** Each link in chain can be verified.

OCR-to-hash could verify each document in the authentication chain.

**Notary Bond and Insurance**

Financial protection:

**Surety Bond:** Most states require notary bonds.

**E&O Insurance:** Professional liability coverage.

**Bond Claims:** Victims of notarial misconduct may claim against bond.

**Insurance Verification:** Verify notary maintained required coverage.

**Journal Record Requirements**

Journal requirements vary by state:

**Required Entries:** Minimum information required in journal.

**Paper vs. Electronic:** Some states allow electronic journals.

**Thumbprints:** Some states require signer thumbprints.

**Journal Security:** Requirements for protecting journals.

**Successor Custodians:** Who holds journals when notary dies or moves.

**Retired Notaries:** How long journals must be retained after commission ends.

**Multi-State and Federal Notaries**

Some notaries have special jurisdiction:

**Multi-State Remote:** Some RON laws allow notarizing for signers in other states.

**Federal Notaries:** Military notaries, federal employee notaries.

**Diplomatic Notaries:** Consular notarial acts.

**Tribal Notaries:** Notaries commissioned by tribal authorities.

Verification must account for non-standard commission types.

**Document-Specific Notarization**

Different documents have different requirements:

**Deeds:** Most require acknowledgment.

**Affidavits:** Require jurat (sworn statement).

**Powers of Attorney:** Acknowledgment, often specific statutory form.

**Wills:** Self-proving affidavit requirements vary by state.

**Corporate Documents:** May require specific officer attestation.

Verification should confirm appropriate notarial act for document type.

**Notarial Wording Requirements**

States require specific language:

**Statutory Forms:** Many states provide required notarial certificate wording.

**Venue Statement:** Location of notarization.

**Notary Signature Block:** Required elements in signature block.

**Defective Certificates:** Incorrect wording may void notarization.

**Curative Statutes:** Some states have curative statutes for minor defects.

Verification confirms the notarization was recorded; certificate adequacy may require legal analysis.
