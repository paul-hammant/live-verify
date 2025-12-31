---
title: "Franchise Agreements and Disclosure Documents"
category: "Business & Commerce"
volume: "Small"
retention: "Term plus statutory retention (often 7+ years)"
slug: "franchise-agreements"
tags: ["franchise", "agreements", "business", "commerce"]
---
## Data Verified

Franchisor name and corporate details, franchisee name, franchise location/territory, initial franchise fee, ongoing royalty structure, term and renewal rights, territorial rights, Franchise Disclosure Document (FDD) receipt confirmation, state-specific addenda, effective dates.

**Document Types:**
- **Franchise Disclosure Document (FDD):** 23-item disclosure required by FTC Rule
- **Franchise Agreement:** The actual contract between franchisor and franchisee
- **State Addenda:** State-specific modifications required by registration states
- **Item 19 Financial Performance Representations:** Earnings claims (if provided)
- **Receipts:** Acknowledgment of FDD receipt and waiting period compliance
- **Amendment Documents:** Changes to existing agreements

**Multi-State Complexity:** Franchisors must register or file in many states, each with different requirements. A single franchise system may have different FDD versions for different states, plus state-specific addenda.

## Data Visible After Verification

Shows the issuer domain (the franchisor) and the responder text.

**Status Indications:**
- **Current** - This is the current FDD/agreement version
- **Superseded** - A newer version has been issued
- **Expired** - FDD has passed its 120-day update deadline
- **State-Specific** - This version is for a specific state
- **Terminated** - Franchise agreement has been terminated
- **Transferred** - Franchise has been transferred to new owner

**Version Tracking:** Verification should indicate FDD fiscal year and any amendments: "Current FDD - Fiscal Year 2024, includes Amendment 1."

## Second-Party Use (Franchisee Verifying Their Own Documents)

Franchisees benefit from verification.

**FDD Authentication:** After receiving FDD, verify it's genuine and current.

**Agreement Verification:** Verify the franchise agreement matches what was negotiated.

**State Addenda Confirmation:** Verify correct state-specific addenda are included.

**Amendment Tracking:** Verify amendments received are genuine.

**Disclosure Compliance:** Verify FDD receipt timing for 14-day waiting period.

## Third-Party Use

**Prospective Franchisees**

Pre-investment due diligence:

**FDD Verification:** Verify the FDD received is genuine and current.

**Version Currency:** Confirm this is the latest FDD, not an outdated version.

**Item 19 Verification:** Verify financial performance representations are authentic.

**Litigation History (Item 3):** Verify disclosed litigation is accurate.

**Franchisee References (Item 20):** Verify franchisee contact information.

**Franchise Attorneys**

Legal representation:

**Document Review:** Verify documents being reviewed for clients.

**Negotiation Verification:** Verify final versions match negotiated terms.

**Due Diligence:** Verify FDD during buyer due diligence.

**Dispute Documentation:** Verify documents in franchise disputes.

**State Regulators**

Franchise registration:

**Registration Compliance:** Verify FDD matches filed registration.

**Amendment Verification:** Verify amendments were properly filed.

**Complaint Investigation:** Verify FDD provided to complainants.

**Enforcement Actions:** Verify documents in enforcement proceedings.

**Lenders**

Franchise financing:

**Loan Underwriting:** Verify franchise agreement terms for loan decisions.

**SBA Franchise Directory:** Verify franchise is SBA-approved.

**Assignment Rights:** Verify lender protections in franchise agreement.

**Default Provisions:** Understand termination triggers.

**Landlords**

Real estate:

**Franchisor Involvement:** Verify franchisor approval requirements.

**Assignment Provisions:** Understand franchise assignment impacts on lease.

**Termination Impact:** What happens to lease if franchise terminates.

**Build-Out Requirements:** Verify franchisor build-out specifications.

**Franchise Resale Parties**

Franchise transfers:

**Current Agreement Verification:** Verify what agreement is being transferred.

**Amendment History:** Verify all amendments are accounted for.

**Franchisor Approval:** Verify transfer approval requirements.

**Successor Obligations:** What obligations transfer to buyer.

## Verification Architecture

**The Franchise Document Fraud Problem**

Franchise document fraud harms prospective franchisees:

- **Outdated FDDs:** Providing old FDDs missing material information
- **Altered Item 19:** Inflating or fabricating financial performance claims
- **Selective Disclosure:** Omitting required disclosures
- **Fake Addenda:** State addenda that don't match filed versions
- **Receipt Manipulation:** Backdating FDD receipts to circumvent waiting periods
- **Version Confusion:** Providing different versions to different parties

OCR-to-hash addresses alteration and version control. Verification against franchisor records confirms the document matches what was filed/registered.

**Franchisors as Issuers**

Franchisors issue and update FDDs:

**Annual Updates:** FDDs must be updated within 120 days of fiscal year end.

**Quarterly Updates:** Material changes require interim updates.

**State Filings:** Registration states require FDD filing.

**Amendment Tracking:** All amendments must be trackable.

Each franchisor operates verification endpoints for their FDDs and agreements.

**FTC Franchise Rule**

Federal disclosure requirements:

**16 CFR Part 436:** FTC Franchise Rule requirements.

**23 Disclosure Items:** Required FDD contents.

**14-Day Waiting Period:** Prospect must receive FDD 14 days before payment.

**7-Day Agreement Waiting:** Prospect must receive agreement 7 days before signing.

Verification timestamps support waiting period compliance.

**State Registration Requirements**

Some states require FDD registration:

**Registration States:** California, Illinois, Maryland, Minnesota, New York, and others.

**Filing States:** Some states require filing without full review.

**State Administrators:** State agencies review and approve FDDs.

**State-Specific Addenda:** Additional disclosures required by specific states.

Verification should indicate: "Registered in [state], effective [date]."

**Item 19 Financial Performance Representations**

Earnings claims are highly regulated:

**Optional Disclosure:** Franchisors aren't required to provide Item 19.

**Strict Requirements:** If provided, must have reasonable basis.

**Written Only:** Cannot make oral earnings claims.

**Verification Importance:** Prospective franchisees often base decisions on Item 19.

Verification of Item 19 is particularly important—altered earnings claims cause investment disasters.

**Multi-Unit and Area Development**

Complex franchise structures:

**Single-Unit Agreements:** One location per agreement.

**Multi-Unit Agreements:** Development schedules for multiple locations.

**Area Development Agreements:** Rights to develop territory.

**Master Franchise Agreements:** Rights to sub-franchise.

Each agreement type should be independently verifiable.

**Franchise Relationship Laws**

State laws protecting franchisees:

**Good Cause Termination:** Some states require good cause for termination.

**Encroachment Protection:** Protection from nearby franchisor locations.

**Renewal Rights:** Required renewal under certain conditions.

**Transfer Rights:** Limitations on transfer refusal.

Verification confirms which state law applies based on franchise location.

**Amendment and Renewal Documentation**

Franchise relationships evolve:

**Contract Amendments:** Changes to existing agreements.

**Renewal Agreements:** New agreements upon term expiration.

**Successor Agreements:** When franchise systems adopt new agreement forms.

**Addenda:** State-specific or negotiated additions.

Each document should be independently verifiable with clear succession.

**Termination and Transfer**

End of franchise relationship:

**Termination Notices:** Franchisor termination of franchise.

**Non-Renewal Notices:** Decision not to renew at term end.

**Transfer Approval:** Franchisor approval of franchise sale.

**Post-Term Obligations:** Non-compete, de-identification requirements.

Verification of termination status prevents fraudulent operation under terminated franchise.

**International Franchising**

Franchising across borders:

**Country-Specific Requirements:** Different countries have different franchise laws.

**Master Franchise Structures:** International expansion through master franchisees.

**Currency and Payment:** International fee structures.

**Local Law Compliance:** Adapting to local regulatory requirements.

Verification architecture should accommodate international variations.

**Digital FDD Distribution**

Modern FDD delivery:

**Electronic Delivery:** FDDs delivered electronically under certain conditions.

**E-Signature:** Electronic signature of franchise agreements.

**Receipt Tracking:** Electronic verification of receipt and timing.

**Version Control:** Digital systems managing FDD versions.

OCR-to-hash applies to printed FDDs; electronic systems may have native verification.
