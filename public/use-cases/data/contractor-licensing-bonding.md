# Contractor Licensing and Bonding Certificates

**Category:** Professional & Occupational Licenses
**Volume:** Medium
**Retention:** License term + 7 years

## Data Verified

Contractor name (individual or company), license number, license classification/type, bond number, bond amount, surety company, issuing state/authority, issue date, expiration date, qualifying individual (if applicable), workers' compensation policy information.

**Document Types:**
- **Contractor License:** State-issued authorization to perform contracting work
- **Contractor Bond:** Surety bond protecting against contractor default
- **Workers' Compensation Certificate:** Proof of WC coverage
- **General Liability Certificate:** Proof of liability insurance
- **Specialty Licenses:** Electrical, plumbing, HVAC, roofing endorsements

**License Classifications:** States typically have multiple classifications (General Building, General Engineering, Specialty) with different bonding requirements.

## Data Visible After Verification

Shows the issuer domain (the state licensing board) and the responder text.

**Status Indications:**
- **Active** - License is current and in good standing
- **Expired** - License has expired
- **Suspended** - License temporarily suspended
- **Revoked** - License permanently revoked
- **Inactive** - License holder has inactivated license

**Bond Status:** Verification may indicate: "License Active - Bond current ($25,000)."

## Second-Party Use (Contractor Verifying Their Own License)

Contractors benefit from verification.

**License Status:** Verify license is properly renewed and active.

**Bid Preparation:** Verify license status before submitting bids.

**Bond Confirmation:** Verify bonding meets project requirements.

**Multi-State Operations:** Verify licenses in multiple jurisdictions.

## Third-Party Use

**Property Owners**

Hiring decisions:

**Pre-Hire Verification:** Verify contractor license before signing contract.

**Bond Protection:** Confirm bond protection if contractor defaults.

**Insurance Confirmation:** Verify liability and WC coverage.

**Permit Compliance:** Ensure contractor can pull required permits.

**General Contractors**

Subcontractor management:

**Subcontractor Qualification:** Verify sub licenses before hiring.

**Project Requirements:** Ensure subs meet project specifications.

**Insurance Certificates:** Verify sub insurance coverage.

**Audit Preparation:** Document sub qualifications for audits.

**Government Agencies**

Public works:

**Bid Verification:** Verify contractor qualifications at bid opening.

**Prequalification:** Contractor prequalification programs.

**Permit Issuance:** Verify license before issuing permits.

**Enforcement:** Verify license in complaint investigations.

**Project Owners and Developers**

Commercial projects:

**Contractor Selection:** Verify qualifications for project bidding.

**Contract Requirements:** Ensure contractors meet contract specs.

**Due Diligence:** Verify credentials before major projects.

**Change Order Approval:** Verify for additional work.

**Surety Companies**

Bond issuance:

**Bond Verification:** Verify bonds they've issued remain active.

**Claim Investigation:** Verify license status during claims.

**Underwriting:** License history for new bond applications.

**Lenders**

Construction financing:

**Contractor Qualification:** Verify contractors for construction loans.

**Draw Approval:** Verify contractor status before disbursing funds.

**Default Scenarios:** Verify when considering loan workout.

## Verification Architecture

**The Contractor Fraud Problem**

Unlicensed contracting is widespread:

- **No License Operation:** Performing work without any license
- **Expired Licenses:** Using expired licenses as if current
- **Fake Licenses:** Entirely fabricated contractor licenses
- **License Borrowing:** Using another contractor's license
- **Bond Fraud:** Presenting cancelled or fake bonds
- **Classification Fraud:** Performing work outside license scope

OCR-to-hash addresses fake and altered documents. State database verification confirms current status.

**State Licensing Boards as Issuers**

Each state has contractor licensing:

**CSLB (California):** Contractors State License Board.

**DPOR (Virginia):** Department of Professional Regulation.

**State-Specific Agencies:** Varying names and structures.

**Local Requirements:** Some cities have additional requirements.

Each board operates verification endpoints for licenses they issue.

**License Classification Systems**

Different types of work:

**General Contractor (A/B):** Overall project responsibility.

**Specialty Contractors (C):** Specific trades (electrical, plumbing).

**Monetary Limits:** Some licenses have project value limits.

**Combinations:** Contractors may hold multiple classifications.

Verification should indicate classification: "Active - General Building (B), Electrical (C-10)."

**Bonding Requirements**

Protection for property owners:

**Contractor Bond:** State-mandated bond amount.

**Project-Specific Bonds:** Additional bonds for large projects.

**Payment and Performance:** Separate bonds for different protections.

**Bond Claims:** Process for making claims against bonds.

Verification should confirm bond: "Bond: $25,000 with [Surety], effective through [date]."

**Workers' Compensation**

Employee protection:

**WC Requirement:** Most states require WC for employees.

**Exemptions:** Some sole proprietors exempt.

**Certificate of Insurance:** Standard form showing coverage.

**Verification Integration:** WC status linked to license status in some states.

Verification may integrate: "WC Policy current through [date]."

**Reciprocity and Multi-State**

Cross-state recognition:

**Reciprocal Agreements:** Some states recognize other states' licenses.

**Endorsement:** Process for endorsing license in new state.

**Trade Agreements:** USMCA considerations for Canadian/Mexican contractors.

**Federal Projects:** Davis-Bacon and federal contracting requirements.

Verification should indicate jurisdiction: "California License - No automatic reciprocity."

**Disciplinary Actions**

License enforcement:

**Complaint Process:** How complaints are filed and investigated.

**Disciplinary Actions:** Warnings, fines, suspension, revocation.

**Public Record:** Most actions are public record.

**Reinstatement:** Process for restoring suspended licenses.

Verification should disclose: "Active - Previous disciplinary action 2019, resolved."

**Qualifying Individuals**

Who holds the license:

**Qualifier:** Person who passed licensing exam.

**Corporate License:** Company licensed through qualifier.

**Qualifier Changes:** Impact of qualifier leaving company.

**Multiple Qualifiers:** Some companies have multiple qualifiers.

Verification identifies: "Corporate License - Qualifier: [Name]."

**Permit Pulling Authority**

Link to building permits:

**License Required:** Contractors must be licensed to pull permits.

**Owner-Builder Exception:** Homeowners can pull own permits.

**Permit Verification:** Building departments verify contractor licenses.

**Inspection Requirements:** Licensed contractor work subject to inspection.

License verification is prerequisite to permit issuance.

