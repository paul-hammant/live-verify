---
title: "Immigration Status Documents"
category: "Immigration & Visa Documents"
volume: "Medium (aggregate)"
retention: "Varies by document type (visa validity to permanent)"
slug: "immigration-status-documents"
tags: ["immigration", "status", "documents", "visa"]
---
Immigration documents determine legal status, work authorization, and residency rights. Verification is critical for employers (I-9 compliance), educational institutions, government agencies, and the individuals themselves. Privacy salt is particularly important for these sensitive documents.

## Document Types

### Green Cards (I-551 Permanent Resident Cards)

**Purpose:** Proves lawful permanent resident status in the United States.

**Data Verified:** Full name, sex, Alien registration number (A-number), date of birth, card validity dates (from-to), country of birth, resident since date.


**Physical Card Considerations:** Holders don't need to carry the physical card at all times for domestic travel. OCR-to-hash verification reduces the need to carry the original while maintaining proof of status.

**Fraud Prevention:** Fake green cards are used for unauthorized employment and identity fraud. Domain binding to USCIS prevents impersonation.

### Citizenship and Naturalization Certificates

**Purpose:** Proves acquisition of citizenship through naturalization or derivation.

**Data Verified:** Full name, date of birth, country of origin/former nationality, naturalization date, certificate number, issuing USCIS office.


**Document Types:**
- **N-550/N-570:** Certificate of Naturalization (for those who naturalized)
- **N-560/N-561:** Certificate of Citizenship (for derived/acquired citizenship)

**Critical Uses:** Required for passport applications, proving citizenship for federal employment, voter registration.

**Privacy Salt:** Given permanent retention and sensitivity, salt lines prevent hash enumeration attacks.

### Work Visas (H-1B, L-1, O-1, TN)

**Purpose:** Authorizes temporary employment in specific job categories.

**Data Verified:** Full name, visa type/classification, passport number, employer name, validity period, I-94 admission number.


**Visa Categories:**
- **H-1B:** Specialty occupation (requires bachelor's degree)
- **L-1A/L-1B:** Intracompany transferees (managers/specialized knowledge)
- **O-1:** Extraordinary ability in sciences, arts, business
- **TN:** USMCA professionals (Canada/Mexico)
- **E-1/E-2:** Treaty traders and investors

**I-9 Compliance:** Employers must verify work authorization. OCR-to-hash enables verification without physical document handling.

### Student Visas (F-1, J-1, M-1)

**Purpose:** Authorizes study at approved educational institutions.

**Data Verified:** Full name, date of birth, nationality, school/program name, SEVIS ID number, program dates, visa validity.


**Related Documents:**
- **I-20:** Certificate of Eligibility for F-1 status
- **DS-2019:** Certificate of Eligibility for J-1 status
- **I-94:** Arrival/departure record

**Work Authorization:** Students may work under CPT (Curricular Practical Training) or OPT (Optional Practical Training)—these must also be verified.

### Employment Authorization Documents (EAD)

**Purpose:** Authorizes employment for categories that require separate work permission.

**Data Verified:** Full name, date of birth, photo reference, A-number, category code, validity dates, USCIS receipt number.


**Who Gets EADs:**
- Asylum applicants and asylees
- Adjustment of status applicants
- F-1 students on OPT
- H-4 and L-2 dependent spouses (certain cases)
- DACA recipients
- TPS holders

**Card Format:** Credit-card-sized with photo, similar to green card.

### Visa Approval Notices and Stamps

**Purpose:** Confirms visa approval from consular or immigration authorities.

**Data Verified:** Full name, passport number, visa type, validity period, issuing post/authority, annotation number.


**Document Types:**
- **Visa Stamp:** Affixed to passport at consulate
- **I-797 Approval Notice:** USCIS approval of petition
- **I-94:** Arrival/departure record (electronic since 2013)
- **Port of Entry Stamp:** CBP admission stamp

**Multi-Page:** I-797 approval notices can be multi-page with petition details.

### I-94 Arrival/Departure Records

**Purpose:** Documents lawful admission to the United States.

**Data Verified:** Full name, passport number, nationality, admission date, admission class, admitted until date, I-94 number.


**Electronic I-94:** Since 2013, I-94 is typically electronic for air/sea arrivals, printable from CBP website. Land border crossings may still receive paper I-94.

## Data Visible After Verification

Shows the issuer domain (USCIS, CBP, State Department) and the responder text.

**Status Indications:**
- **Valid** - Document is current and status is active
- **Expired** - Document has expired
- **Revoked** - Status has been revoked
- **Pending** - Application is pending (for EAD, etc.)

**Status Confirmation:** Verification may indicate: "Valid - H-1B status through [date]."

## Second-Party Use (Individual Verifying Their Own Documents)

Document holders benefit from verification.

**Status Confirmation:** Verify immigration status is correctly recorded.

**Employment Preparation:** Verify work authorization before starting new job.

**Travel Preparation:** Verify status before international travel.

**Renewal Timing:** Verify document validity dates for renewal planning.

**Reduced Physical Carry:** Verification reduces need to carry original documents.

## Third-Party Use

**Employers**

I-9 compliance:

**Employment Verification:** Verify work authorization for new hires.

**Reverification:** Verify when work authorization expires.

**E-Verify:** Integration with E-Verify system.

**ICE Compliance:** Ensure compliance with immigration enforcement.

**Audit Preparation:** Maintain verified documentation for audits.

**Educational Institutions**

Student status:

**Enrollment Verification:** Verify student visa status at enrollment.

**SEVIS Compliance:** Maintain accurate SEVIS records.

**Work Authorization:** Verify CPT/OPT authorization.

**Status Changes:** Monitor status changes during enrollment.

**Government Agencies**

Benefits and services:

**Benefits Eligibility:** Verify immigration status for benefits.

**Driver's License:** Verify status for REAL ID compliance.

**Professional Licensing:** Verify work authorization for licensure.

**Security Clearances:** Verify status for cleared positions.

**Healthcare Providers**

Coverage verification:

**Insurance Eligibility:** Verify status for coverage eligibility.

**Medicaid/Medicare:** Verify status for program eligibility.

**Emergency Treatment:** EMTALA applies regardless of status.

**Landlords**

Housing applications:

**Identity Verification:** Verify immigration documents for rental applications.

**Right to Rent:** UK-style right-to-rent verification.

**Fair Housing:** Must apply criteria consistently.

**Financial Institutions**

Account opening:

**KYC Compliance:** Know Your Customer identity verification.

**Account Opening:** Verify immigration documents for account eligibility.

**Loan Applications:** Verify status for loan eligibility.

## Verification Architecture

**The Immigration Document Fraud Problem**

Immigration fraud has serious consequences:

- **Counterfeit Documents:** Fake green cards, EADs, visa stamps
- **Altered Documents:** Genuine documents with changed dates or status
- **Impersonation:** Using another person's legitimate documents
- **Expired as Current:** Presenting expired documents as valid
- **Fabricated Status:** Creating false immigration records
- **Employment Fraud:** Unauthorized workers using fraudulent documents

OCR-to-hash addresses document alteration. USCIS/CBP domain binding prevents impersonation of government issuers.

**Government Agencies as Issuers**

Multiple agencies issue immigration documents:

**USCIS:** Green cards, EADs, naturalization certificates, approval notices.

**CBP:** I-94 records, entry stamps, parole documents.

**State Department:** Visa stamps in passports, issued at consulates.

**ICE:** Immigration enforcement documents.

Each agency can operate verification endpoints for documents they issue.

**SAVE and E-Verify Integration**

Existing verification systems:

**SAVE:** Systematic Alien Verification for Entitlements (government benefits).

**E-Verify:** Employment eligibility verification (employers).

**SEVIS:** Student and Exchange Visitor Information System.

OCR-to-hash complements these systems by verifying document authenticity before system queries.

**Privacy and Salt Requirements**

Immigration documents are highly sensitive:

**Identity Protection:** Documents contain PII and immigration status.

**Discrimination Risk:** Status information could enable discrimination.

**Safety Concerns:** Some status holders face persecution in home countries.

**Random Salt Lines:** Raise entropy to defeat hash guessing attacks.

Verification should confirm document existence without revealing full contents.

**Document Renewal and Succession**

Immigration status evolves:

**Green Card Renewal:** 10-year renewal cycle.

**EAD Renewal:** Often annual renewal.

**Visa Extensions:** Status extensions through I-797.

**Status Adjustment:** Changing from one status to another.

Verification should indicate: "Valid - Supersedes prior EAD issued [date]."

**International Equivalents**

Similar documents worldwide:

**UK:** Biometric Residence Permits, visa vignettes.

**EU:** Residence cards, Schengen visas.

**Canada:** PR cards, work permits, study permits.

**Australia:** Visa grant notices, ImmiCards.

Verification architecture can accommodate international immigration documents.

**Automatic Status Determination**

Some status is automatic:

**Derivative Status:** Spouse/children derive status from principal.

**Citizenship by Birth:** Born in US or to US citizen parents.

**Automatic Renewal:** Some benefits extend automatically.

These may not have separate documents but still need verification.

**Sensitive Categories**

Special handling for:

**Asylum Seekers:** Persecution concerns in home country.

**DACA Recipients:** Discretionary protection.

**TPS Holders:** Temporary Protected Status.

**U Visa Holders:** Crime victims.

Verification must protect these individuals from exposure.

