# Wills and Estate Documents

**Category:** Financial & Legal Documents
**Volume:** Small
**Retention:** Permanent (estate records)

## Data Verified

Testator name, beneficiary names, executor/personal representative name, asset descriptions, specific bequests, residuary clauses, witness names and signatures, will execution date, revision/codicil number (if applicable), attorney or notary information.

**Document Types:** Estate documents include:
- **Last Will and Testament:** Primary testamentary document
- **Codicils:** Amendments to existing wills
- **Trusts:** Living trusts, testamentary trusts, special needs trusts
- **Pour-Over Wills:** Wills directing assets into trusts

**Multi-Page Considerations:** Wills are frequently multi-page documents. Per-page verification prevents page substitution attacks—a critical concern when different pages may benefit different parties. The signature page and witness attestation are particularly important to verify.

## Data Visible After Verification

Shows the issuer domain (the attorney, notary, or court) and the responder text.

**Status Indications:**
- **Valid** - Will is the current testamentary document on file
- **Superseded** - A later will or codicil has replaced this document
- **Revoked** - Will has been explicitly revoked
- **Probated** - Will has been admitted to probate
- **Contested** - Will is subject to pending legal challenge

**SUPERSEDED Status:** This status is critical for wills. Testators frequently update their wills, and executing an outdated will defeats the testator's final wishes. Verification must clearly indicate when a newer version exists.

## Second-Party Use (Testator Verifying Their Own Will)

Testators benefit from verifying their own estate documents.

**Document Authenticity:** After will execution, testators can verify the document is correctly registered with their attorney or a will registry.

**Current Version Confirmation:** Testators can confirm which version of their will is on record, particularly after amendments or codicils.

**Safe Deposit Verification:** When retrieving wills from safe deposit boxes or safes, testators can verify the document hasn't been tampered with.

**Estate Planning Review:** During periodic estate planning reviews, testators verify documents match their current intentions.

## Third-Party Use

**Executors and Personal Representatives**

Estate administration:

**Will Authenticity:** Before petitioning for probate, executors verify the will is genuine and current.

**Latest Version:** Executors must locate the most recent will. Verification showing "Superseded" status indicates a later will exists.

**Codicil Confirmation:** When codicils are presented, executors verify they're genuine amendments, not forgeries.

**Asset Distribution:** Before distributing assets, executors verify the will's terms match what the testator actually signed.

**Probate Courts**

Estate proceedings:

**Admission to Probate:** Courts can verify wills submitted for probate are authentic before admitting them.

**Will Contests:** When heirs contest wills, courts can verify the authenticity of competing documents.

**Formal vs. Informal Probate:** Verification supports both formal proceedings and informal probate.

**Ancillary Probate:** Courts handling ancillary probate in other jurisdictions can verify the original will.

**Beneficiaries and Heirs**

Inheritance verification:

**Bequest Verification:** Beneficiaries can verify they're named in the current, authentic will.

**Contest Evaluation:** Before contesting a will, potential heirs can verify its authenticity.

**Trust Distributions:** Trust beneficiaries can verify trust documents governing their distributions.

**Family Disputes:** In disputed estates, all parties can verify document authenticity.

**Financial Institutions**

Asset transfer and account closure:

**Account Release:** Banks can verify executor authority comes from an authentic, probated will.

**Safe Deposit Access:** Before granting executor access to safe deposit boxes, banks verify will authenticity.

**Investment Accounts:** Brokerages transferring assets to estates verify will documentation.

**Life Insurance:** Insurers can verify beneficiary designations against will terms.

**Attorneys and Estate Planners**

Professional services:

**Document Custody:** Attorneys holding original wills can verify copies match originals.

**Will Updates:** When drafting new wills, attorneys verify the prior will being superseded.

**Client Verification:** Attorneys can verify documents purportedly from other attorneys.

**Malpractice Defense:** Attorneys can prove what documents they actually prepared.

## Verification Architecture

**The Will Fraud Problem**

Testamentary fraud takes several forms:

- **Forged Wills:** Entirely fabricated wills with forged signatures
- **Altered Wills:** Genuine wills with modified beneficiaries, amounts, or terms
- **Page Substitution:** Replacing pages in genuine wills to change bequests
- **Codicil Fraud:** Fake codicils purporting to amend genuine wills
- **Suppression:** Hiding valid wills to have earlier (favorable) versions probated
- **Undue Influence:** While not document fraud, verification creates audit trail

OCR-to-hash addresses forgery, alteration, and page substitution. The SUPERSEDED status combats suppression by ensuring the latest version is discoverable.

**Issuers and Custodians**

Several parties might operate verification endpoints:

**Estate Attorneys:** Attorneys who draft wills could maintain verification endpoints for documents they prepare.

**Will Registries:** Some jurisdictions maintain official will registries. These are natural verification endpoints.

**Courts:** Probate courts that receive wills for filing could operate verification.

**Bar Associations:** State bar associations might coordinate verification across member attorneys.

**Will Registry Integration**

Some jurisdictions maintain will registries:

**US State Registries:** Several states offer voluntary will registration (e.g., Virginia, Ohio, California).

**International Registries:** Some countries maintain national will registries.

**Private Registries:** Commercial services like US Will Registry allow voluntary registration.

**Registry as Verification Endpoint:** Registries already track wills; adding verification endpoints is a natural extension. Registration establishes the will's existence and date; verification confirms document authenticity.

**Version Control for Wills**

Wills are living documents that change:

**Codicils:** Formal amendments that modify but don't replace the original will. Each codicil should be independently verifiable.

**Republication:** Some testators republish entire wills rather than using codicils.

**Revocation:** Wills can be revoked by physical destruction, subsequent will, or formal revocation.

The verification system must handle versioning:
- Original will: "Verified - Current" or "Verified - Superseded by codicil dated [date]"
- Codicil: "Verified - Amends will dated [date]"
- Revoked will: "Verified document - Status: REVOKED by [method] on [date]"

**Witness Attestation**

Will execution requires witnesses:

**Witness Blocks:** The attestation clause and witness signatures are critical components.

**Witness Verification:** Witnesses could potentially verify their signatures were genuine.

**Self-Proving Affidavits:** Many wills include notarized self-proving affidavits. These could be separately verified.

**Notary Verification:** Notary acknowledgments could link to notary verification endpoints.

**Holographic Wills**

Handwritten wills present unique challenges:

**No Attorney Involvement:** Holographic wills may have no attorney to operate a verification endpoint.

**Court Filing:** Courts admitting holographic wills to probate could serve as verification endpoints.

**Handwriting Verification:** OCR-to-hash verifies the document content; handwriting analysis confirms authenticity separately.

**State Law Variation:** Holographic will validity varies by jurisdiction.

**Privacy Considerations**

Wills contain highly sensitive information:

**Pre-Death Privacy:** During the testator's lifetime, will contents are typically private.

**Post-Death Disclosure:** After death, wills become public through probate.

**Verification Without Disclosure:** Verification can confirm a will is authentic without revealing its contents to unauthorized parties.

**Beneficiary Notification:** Some systems might allow beneficiaries to verify they're included without seeing full will contents.

**Living Trust Considerations:** Living trusts may not go through probate, maintaining privacy even after death. Verification endpoints must balance privacy with legitimate verification needs.
