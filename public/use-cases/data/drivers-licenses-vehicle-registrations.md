# Driver's Licenses and Vehicle Registrations

**Category:** Government & Civic Documents
**Volume:** Medium-Small
**Retention:** 5-10 years (renewal cycles)

## Data Verified

**Driver's License:** Full name, date of birth, address, license number, license class, endorsements, restrictions, expiration date, issue date, photo (reference), signature, organ donor status.

**Vehicle Registration:** Owner name, vehicle make/model/year, Vehicle Identification Number (VIN), license plate number, registration expiration, title status, lien holder information.

**Document Types:**
- **Standard Driver's License:** Basic driving privileges
- **Commercial Driver's License (CDL):** Commercial vehicle operation
- **Learner's Permit:** Provisional driving authorization
- **Motorcycle Endorsement:** Two-wheel vehicle authorization
- **REAL ID:** Federal facility/flight compliant identification
- **Enhanced License:** Passport-alternative border crossing
- **Vehicle Registration Card:** Proof of vehicle registration
- **Vehicle Title:** Ownership document (not typically carried)

**Privacy Salt:** Given the sensitivity of identity documents, issuers can add random salt lines to raise entropy and defeat hash guessing attacks.

## Data Visible After Verification

Shows the issuer domain (the state DMV or motor vehicle agency) and the responder text.

**Status Indications:**
- **Valid** - License/registration is current and active
- **Expired** - Document has expired
- **Suspended** - License privileges suspended
- **Revoked** - License revoked (more severe than suspension)
- **Cancelled** - Registration cancelled

**Verification Response:** May include expiration confirmation: "Valid through [date]."

## Second-Party Use (Holder Verifying Their Own Documents)

License and vehicle owners benefit from verification.

**Authenticity Confirmation:** Verify license/registration after receiving from DMV.

**Renewal Verification:** Confirm renewal was properly processed.

**Status Check:** Verify status before travel or employment.

**Dispute Resolution:** Verify document status when challenging actions.

## Third-Party Use

**Law Enforcement**

Traffic enforcement and investigation:

**Traffic Stops:** Verify license validity during stops.

**Investigations:** Verify identity during investigations.

**Accident Response:** Verify license and registration at accident scenes.

**Warrant Service:** Confirm identity during arrests.

**Background Checks:** Verify driving status for investigations.

**Employers**

Employment requirements:

**Driving Jobs:** Verify valid license for delivery, trucking positions.

**CDL Verification:** Confirm commercial license for trucking employers.

**Insurance Requirements:** Verify license status for company vehicle use.

**MVR Reports:** Motor vehicle records verification.

**Age Verification**

Restricted purchases:

**Bars and Restaurants:** Verify age for alcohol service.

**Tobacco/Cannabis Retailers:** Age verification for restricted products.

**Casinos and Gaming:** Age verification for gambling.

**Event Venues:** Age-restricted events and venues.

**Hotels and Lodging**

Guest verification:

**Check-In Verification:** Verify ID at hotel registration.

**Car Rental Pickup:** Verify license before vehicle release.

**Age Requirements:** Verify driver age for vehicle rental.

**Financial Institutions**

Identity verification:

**Account Opening:** Verify identity for new accounts.

**Transaction Verification:** Verify identity for large transactions.

**Loan Applications:** Identity verification for credit decisions.

**Notarization:** Verify identity for notarial acts.

**Vehicle Transactions**

Buying and selling:

**Title Transfer:** Verify registration before purchase.

**Lien Verification:** Confirm vehicle is free of liens.

**Dealer Transactions:** Verify registration status at dealerships.

**Private Sales:** Buyer verification before purchase.

**Insurance Companies**

Coverage and claims:

**Policy Underwriting:** Verify driving status for auto insurance.

**Claims Investigation:** Verify license status at time of accident.

**Rate Calculation:** Driving record affects premiums.

**Vehicle Coverage:** Verify vehicle registration for coverage.

**TSA and Transportation Security**

Airport and transit:

**REAL ID Compliance:** Verify REAL ID status for domestic flights.

**ID Authentication:** Verify identity at security checkpoints.

**Transportation Security:** Verify for access to secured areas.

## Verification Architecture

**The Fake ID Problem**

Fraudulent IDs are widespread:

- **Complete Fakes:** Entirely fabricated licenses from non-existent states or persons
- **Altered Licenses:** Genuine licenses with modified birthdates or addresses
- **Photo Substitution:** Real license with different person's photo
- **Borrowed Licenses:** Using someone else's genuine license
- **Expired Presented as Current:** Expired licenses with altered dates
- **Cancelled Registration:** Cancelled registrations presented as valid

OCR-to-hash addresses alterations. DMV database verification confirms current status.

**DMVs and Motor Vehicle Agencies as Issuers**

State agencies issue these documents:

**State DMVs:** Department of Motor Vehicles (most states).

**BMV:** Bureau of Motor Vehicles (some states).

**MVA:** Motor Vehicle Administration (Maryland).

**RMV:** Registry of Motor Vehicles (Massachusetts).

**Secretary of State:** Issues licenses in some states.

Each state agency operates verification endpoints for documents they issue.

**Barcode and OCR Complementarity**

Dual verification approaches:

**PDF417 Barcode:** Machine-readable data on license back.

**OCR-to-Hash:** Verification of printed text on license face.

**Complementary Verification:** Both methods working together.

**Discrepancy Detection:** Differences between barcode and printed text indicate tampering.

Verification can confirm: "Barcode and printed data match; verified."

**REAL ID Compliance**

Federal identification standards:

**REAL ID Act:** Federal minimum standards for state IDs.

**Star Marking:** Real ID-compliant licenses marked with star.

**Document Verification:** Requirements for identity documents at issuance.

**Federal Facility Access:** Required for federal buildings and domestic flights.

Verification indicates REAL ID status: "Verified - REAL ID compliant."

**Commercial Driver's License (CDL)**

Special verification needs:

**CDLIS:** Commercial Driver's License Information System.

**Medical Certification:** DOT medical examiner certification.

**Endorsements:** Hazmat, passenger, tank vehicle, etc.

**Disqualifications:** Federal disqualification rules.

**Cross-State Verification:** National CDL database.

CDL verification may include: "CDL Valid - Class A, Hazmat endorsement, medical current."

**AAMVA Verification Services**

Industry infrastructure:

**American Association of Motor Vehicle Administrators:** Standards body.

**NMVTIS:** National Motor Vehicle Title Information System.

**ID Verification Services:** AAMVA-provided verification.

**State Interchange:** Cross-state information sharing.

AAMVA infrastructure supports verification across states.

**Vehicle Identification Numbers (VIN)**

Vehicle tracking:

**17-Character VIN:** Unique vehicle identifier.

**VIN Decoding:** Make, model, year, specifications.

**Title History:** NMVTIS title records.

**Recall Status:** Safety recall information.

**Salvage/Flood:** Damage history indicators.

Verification may include VIN status: "Registration verified - VIN clean, no salvage history."

**Suspension and Revocation**

License status changes:

**Suspension:** Temporary removal of privileges.

**Revocation:** Termination of privileges.

**Reinstatement:** Process to restore privileges.

**Point Systems:** Accumulation of violations.

**Interstate Compact:** Information sharing between states.

Real-time status verification prevents use of suspended licenses.

**Registration Renewal and Lien Status**

Vehicle documentation:

**Annual Renewal:** Most states require annual registration renewal.

**Emissions Compliance:** Some states require emissions testing.

**Insurance Verification:** Registration tied to insurance status.

**Lien Holder:** Financed vehicles show lien holder.

**Lien Release:** Documentation when loan paid off.

Verification indicates: "Registered through [date], lien holder: [bank]."

**International Considerations**

Cross-border recognition:

**International Driving Permit (IDP):** Translation document for foreign driving.

**Foreign License Conversion:** Exchanging foreign for domestic license.

**Visiting Driver Privileges:** How long foreign licenses are valid.

**NAFTA Trucking:** Commercial driving across borders.

Verification architecture may need to accommodate international documents.

**Digital Driver's Licenses**

Emerging technology:

**Mobile Driver's License (mDL):** Smartphone-based credentials.

**ISO 18013-5:** International standard for mDL.

**State Pilots:** Several states testing digital licenses.

**Verification Challenges:** How to verify digital credentials.

Digital licenses have native verification; OCR-to-hash applies to physical cards.

