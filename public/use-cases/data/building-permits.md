# Building Permits

**Category:** Construction & Property Permits
**Volume:** Medium
**Retention:** Permanent (building records)

## Data Verified

Permit number, permit type (new construction, renovation, demolition, electrical, plumbing, mechanical), property address and parcel number, property owner name, contractor name and license number, project description, scope of work, valuation, issue date, expiration date, approved plans reference, required inspections, special conditions.

**Permit Types:**
- **Building Permits:** Structural work, new construction, major renovations
- **Electrical Permits:** Electrical system work
- **Plumbing Permits:** Plumbing and gas piping
- **Mechanical Permits:** HVAC systems
- **Demolition Permits:** Structure demolition
- **Grading Permits:** Site grading and excavation
- **Special Use Permits:** Conditional uses

**Site Posting Requirement:** Many jurisdictions require permits to be posted at construction sites. Verification allows anyone passing a site to confirm the displayed permit is genuine.

## Data Visible After Verification

Shows the issuer domain (the building department or permitting authority) and the responder text.

**Status Indications:**
- **Active** - Permit is valid and work may proceed
- **Expired** - Permit validity period has lapsed
- **Finaled** - All inspections passed, work complete
- **Suspended** - Permit suspended pending compliance
- **Revoked** - Permit revoked for violations
- **Voided** - Permit cancelled (project not started)

**Inspection Status:** Verification may indicate inspection status: "Active - 3 of 7 inspections passed" or "Final inspection pending."

## Second-Party Use (Permit Holder Verifying Their Own Permits)

Property owners and contractors benefit from verification.

**Permit Authenticity:** After receiving permits, holders verify they're genuine and correctly recorded.

**Scope Confirmation:** Permit holders verify permitted scope matches their project plans.

**Expiration Tracking:** Before expiration, holders verify permit status.

**Inspection Scheduling:** Verify inspection requirements before scheduling.

**Compliance Documentation:** Maintain verified permit records for compliance files.

## Third-Party Use

**Building Inspectors and Code Enforcement**

Inspection and compliance:

**Field Verification:** Inspectors arriving at sites verify posted permits are genuine.

**Scope Verification:** Inspectors confirm work being done matches permitted scope.

**Stop Work Orders:** Before issuing stop work, inspectors verify permit status.

**Complaint Investigation:** When investigating complaints, inspectors verify what's permitted.

**Contractors and Subcontractors**

Project coordination:

**Job Site Verification:** Contractors verify permits are in place before starting work.

**Subcontractor Protection:** Subs verify the GC has obtained required permits.

**Lien Rights:** Permit verification supports mechanics lien claims.

**License Compliance:** Verify they're listed as permitted contractor.

**Real Estate Professionals**

Property transactions:

**Due Diligence:** Buyers verify permitted improvements match actual construction.

**Disclosure Support:** Sellers document permitted work.

**Unpermitted Work Detection:** Verification reveals what was and wasn't permitted.

**Title Issues:** Unpermitted work can cloud title or affect insurability.

**Appraisers:** Verify permitted square footage and improvements.

**Lenders and Insurance**

Risk assessment:

**Construction Loans:** Lenders verify permits before disbursing construction draws.

**Homeowners Insurance:** Insurers may verify permitted work for coverage.

**Property Insurance:** Commercial property coverage may depend on permitted occupancy.

**Appraisal Support:** Appraisers verify permitted improvements.

**Neighbors and Community**

Transparency:

**Adjacent Property Owners:** Neighbors verify scope of nearby construction.

**Community Groups:** Verify projects match approved plans.

**NIMBY Concerns:** Verification confirms projects are within permitted scope.

**Code Violation Reporting:** Basis for reporting suspected violations.

**Utility Companies**

Service provision:

**Connection Permits:** Utilities verify permits before connecting new service.

**Electrical Service:** Electric utilities verify electrical permits.

**Gas Service:** Gas utilities verify plumbing permits for gas work.

**Meter Installation:** Verify permits before installing meters.

## Verification Architecture

**The Permit Fraud Problem**

Unpermitted construction is common and costly:

- **Fake Permits:** Fraudulent permit documents posted at sites
- **Altered Permits:** Genuine permits with modified scope or expiration
- **Expired Permits:** Continuing work under expired permits
- **Permit Sharing:** Using one property's permit for work at another
- **Contractor Fraud:** Contractors claiming permits they haven't obtained
- **Scope Creep:** Work exceeding permitted scope

OCR-to-hash addresses fake and altered permits. Verification confirms permits are genuine and current. Scope compliance requires comparing actual work to permitted plans.

**Building Departments as Issuers**

Local government permitting:

**Municipal Building Departments:** Cities issue permits for their jurisdiction.

**County Building Departments:** Counties cover unincorporated areas.

**State Agencies:** Some states handle certain permits (e.g., state fire marshal).

**Special Districts:** Some areas have special permitting authorities.

Each jurisdiction operates its own permitting system and could provide verification endpoints.

**Permit System Integration**

Many jurisdictions use commercial permit systems:

**Accela:** Widely used government software platform.

**Tyler Munis/Incode:** Municipal management systems with permitting.

**OpenGov:** Cloud-based government technology.

**SmartGov:** Permit management software.

These systems could generate verification hashes at permit issuance, enabling standardized verification across jurisdictions.

**Inspection Workflow**

Permits require inspections:

**Scheduled Inspections:** Foundation, framing, rough electrical/plumbing/mechanical, final.

**Inspection Results:** Pass, fail, partial.

**Re-Inspection:** Failed inspections require correction and re-inspection.

**Certificate of Occupancy:** Final inspection leads to CO issuance.

Verification should indicate inspection progress and results.

**Contractor License Verification**

Permits connect to contractor licensing:

**Licensed Contractors:** Many permits require licensed contractors.

**License Verification:** Permit verification could link to contractor license status.

**Workers Comp/Insurance:** Contractors must maintain coverage.

**Disciplinary Actions:** License suspensions affect permit validity.

**Plan Review and Approved Plans**

Permits reference approved plans:

**Plan Check:** Plans reviewed before permit issuance.

**Approved Plan Set:** Stamped plans become part of permit.

**Plan Revisions:** Changes require revised approval.

**As-Built Drawings:** Final drawings documenting actual construction.

Verification confirms the permit exists; plan compliance requires comparing work to approved plans.

**Expiration and Extension**

Permits have limited validity:

**Standard Validity:** Typically 6 months to 2 years.

**Extension Requests:** Extensions available before expiration.

**Work Progress Requirements:** Some permits require demonstrated progress.

**Abandonment:** Inactive permits may be voided.

Verification must reflect current expiration status.

**Certificate of Occupancy**

Final step in permit process:

**CO Issuance:** Building department issues CO after final inspection.

**Temporary CO:** Partial occupancy while work continues.

**Change of Use:** New occupancy type requires new CO.

**CO Verification:** Buyers and tenants verify CO status.

CO is a separate document from the permit but closely related—verification might cover both.

**Historic Districts and Special Requirements**

Some areas have additional requirements:

**Historic Preservation:** Historic district review before permits.

**Coastal Development:** Coastal commission permits.

**Environmental Review:** CEQA/NEPA for larger projects.

**HOA Approval:** Some areas require HOA approval before permits.

Verification should indicate any special approvals required or obtained.

**Multi-Permit Projects**

Large projects require multiple permits:

**Master Permit:** Overall project permit.

**Trade Permits:** Separate electrical, plumbing, mechanical permits.

**Phased Projects:** Permits for each construction phase.

**Permit Bundles:** Verification might cover related permit sets.

**Cross-Jurisdictional Issues**

Some projects span jurisdictions:

**City/County Boundaries:** Projects crossing boundaries need multiple permits.

**State Preemption:** Some permits (e.g., accessibility) have state oversight.

**Federal Requirements:** Federal buildings have different permitting.

**Tribal Lands:** Tribal sovereignty affects permitting.

Verification must specify which jurisdiction issued the permit being verified.
