# Land Surveys

**Category:** Real Estate & Property
**Volume:** Very Small
**Retention:** Permanent (property records)

## Data Verified

Property owner name, surveyor name and license number, property address, legal description (metes and bounds, lot/block, or parcel number), survey date, survey type, corner monuments and markers, boundary dimensions, easements and encroachments, flood zone determination (if included), certification statement, surveyor's seal and signature.

**Survey Types:**
- **Boundary Survey:** Establishes property lines and corners
- **ALTA/NSPS Survey:** Comprehensive survey for commercial transactions
- **Topographic Survey:** Elevation and contour mapping
- **Subdivision Survey/Plat:** Dividing land into lots
- **Construction/Staking Survey:** Layout for building construction
- **As-Built Survey:** Documents completed construction
- **Mortgage/Loan Survey:** Lender-required survey
- **Elevation Certificate:** FEMA flood zone documentation

**Multi-Page Considerations:** Survey plats are often multi-page with the drawing on one sheet and legal descriptions, certifications, and notes on others. Per-page verification prevents page substitution—particularly important when encroachment or easement pages might be removed.

## Data Visible After Verification

Shows the issuer domain (the surveying firm) and the responder text.

**Status Indications:**
- **Verified** - Survey matches surveyor's records
- **Superseded** - Newer survey has been completed
- **Expired** - Some surveys have limited validity periods
- **Amended** - Survey has been corrected or amended

**Survey Date:** Verification indicates survey date: "Verified - Survey dated [date], by [surveyor]."

## Second-Party Use (Property Owner Verifying Their Own Survey)

Property owners benefit from verification.

**Survey Authenticity:** After receiving survey from surveyor, verify it's genuine.

**Transaction Preparation:** Verify survey before providing to buyers or lenders.

**Boundary Documentation:** Maintain verified survey for boundary disputes.

**Permit Applications:** Verify survey before submitting with permit applications.

**Insurance Documentation:** Verify survey for property insurance purposes.

## Third-Party Use

**Title Companies**

Real estate transactions:

**Title Insurance:** Verify survey for title insurance underwriting.

**ALTA Policy Requirements:** Verify ALTA/NSPS survey meets requirements.

**Encumbrance Identification:** Verify surveys showing easements and encroachments.

**Closing Documentation:** Verify survey before closing.

**Lenders**

Mortgage lending:

**Loan Underwriting:** Verify survey for mortgage approval.

**Collateral Assessment:** Confirm property boundaries match loan application.

**Construction Loans:** Verify surveys for construction financing.

**Portfolio Review:** Verify surveys for loan portfolio management.

**Buyers and Sellers**

Transaction due diligence:

**Pre-Purchase Review:** Buyer verifies seller-provided survey.

**Boundary Confirmation:** Verify property includes expected features.

**Encroachment Discovery:** Verify surveys revealing encroachments.

**Disclosure Support:** Seller verifies survey supporting disclosures.

**Attorneys**

Real estate and litigation:

**Transaction Review:** Verify surveys in purchase agreements.

**Boundary Disputes:** Verify surveys in adverse possession cases.

**Easement Disputes:** Verify surveys showing disputed easements.

**Title Litigation:** Verify surveys in title claims.

**Government Agencies**

Planning and permitting:

**Building Permits:** Verify surveys with permit applications.

**Zoning Compliance:** Verify setbacks and coverage.

**Subdivision Approval:** Verify plats for subdivision approval.

**Tax Assessment:** Verify surveys for property tax purposes.

**Surveyors**

Professional practice:

**Prior Survey Review:** Verify earlier surveys before new work.

**Boundary Agreement:** Reference verified surveys in boundary agreements.

**Expert Testimony:** Verify surveys cited in expert reports.

**Professional Liability:** Verified surveys document professional work.

**Insurance Companies**

Property coverage:

**Property Insurance:** Verify surveys for underwriting.

**Flood Insurance:** Verify elevation certificates for flood coverage.

**Claims Investigation:** Verify surveys in property claims.

## Verification Architecture

**The Survey Fraud Problem**

Fraudulent surveys cause significant property disputes:

- **Forged Surveys:** Entirely fabricated surveys showing desired boundaries
- **Altered Boundaries:** Genuine surveys with modified dimensions
- **Surveyor Impersonation:** Surveys falsely attributed to licensed surveyors
- **Omitted Encumbrances:** Surveys with easements or encroachments removed
- **Date Fraud:** Old surveys presented as current
- **Page Substitution:** Replacing certification pages in multi-page surveys

OCR-to-hash addresses forgery and alteration. Surveyor license verification confirms credentials.

**Surveyors as Issuers**

Licensed surveyors issue surveys:

**Licensed Land Surveyors:** State-licensed professionals.

**Survey Companies:** Multi-surveyor firms.

**Engineering Firms:** Licensed engineers with surveying capacity.

**GIS Departments:** Some government surveys.

Each surveyor or firm maintains verification endpoints for surveys they've issued.

**Licensing and Standards**

Surveyor qualifications:

**State Licensing:** All states require surveyor licensing.

**Professional Liability Insurance:** E&O coverage requirements.

**Continuing Education:** Ongoing training requirements.

**Standards of Practice:** State and professional standards.

Verification could link to license: "Surveyor licensed in [state], license current."

**ALTA/NSPS Standards**

Commercial survey standards:

**American Land Title Association:** Title industry standards.

**National Society of Professional Surveyors:** Professional standards.

**Table A Items:** Optional survey elements.

**Certification Requirements:** Specific certification language.

**Lender/Title Requirements:** Which Table A items required.

ALTA surveys require specific verification: "Verified - ALTA/NSPS Survey with Table A items 1, 2, 3, 4, 6."

**Boundary Monuments**

Physical property markers:

**Iron Pins/Rods:** Driven metal markers.

**Concrete Monuments:** Permanent concrete markers.

**Natural Monuments:** Trees, rocks, water features.

**Witness Markers:** Markers near inaccessible corners.

**Condition Description:** Found, set, or calculated.

Survey verification confirms monument descriptions without physical inspection.

**Easements and Encroachments**

Property interests shown:

**Utility Easements:** Power, water, sewer, communications.

**Access Easements:** Right-of-way for access.

**Conservation Easements:** Development restrictions.

**Encroachments:** Structures crossing boundaries.

**Building Setback Lines:** Required distances from boundaries.

Verification notes: "Verified - Survey shows 3 easements, 1 encroachment."

**Metes and Bounds**

Legal descriptions:

**Point of Beginning:** Starting reference point.

**Bearings:** Directional measurements.

**Distances:** Length measurements.

**Monuments:** Reference points in description.

**Closure Calculation:** Mathematical verification of boundary closure.

Survey verification includes legal description confirmation.

**Plat Maps and Subdivision**

Recorded surveys:

**Subdivision Plats:** Division of land into lots.

**Recording Requirements:** Plat recording with county.

**Lot/Block References:** Simplified legal descriptions.

**Dedication:** Public road and utility dedications.

Recorded plats may have county verification separate from surveyor verification.

**Flood Zone Determinations**

FEMA mapping:

**FIRM Maps:** Flood Insurance Rate Maps.

**Elevation Certificates:** Building elevation documentation.

**LOMA/LOMR:** Map amendments and revisions.

**Flood Zone Letters:** Determinations from FEMA.

Elevation certificates are particularly important for flood insurance verification.

**Survey Currency**

When surveys age:

**Currency Requirements:** Lenders may require recent surveys.

**Recertification:** Surveyor certifies no changes since original.

**Updated Survey:** New survey if conditions have changed.

**Validity Periods:** Some uses require surveys within specific timeframes.

Verification indicates survey age: "Verified - Survey dated [date], [X] years old."

**Technology Integration**

Modern surveying:

**GPS/GNSS Surveys:** Global positioning technology.

**LiDAR:** Laser scanning for topography.

**Drone Surveys:** Aerial mapping with UAVs.

**GIS Integration:** Geographic information systems.

**Digital Plats:** Electronic recording of plats.

Digital survey files may have native verification; OCR-to-hash bridges paper plats.

