# Safety Inspection Certificates

**Category:** Safety Inspection Certificates
**Volume:** Large (aggregate)
**Retention:** 1-3 years (inspection cycles)

Building safety systems require regular inspection and certification. These certificates are often publicly displayed and represent critical life-safety compliance. Verification prevents fraudulent certificates that could mask dangerous conditions.

## Document Types

### Elevator Inspection Certificates

**Purpose:** Certifies elevator meets safety standards and is approved for operation.

**Data Verified:** Building address, elevator identification number, elevator type (passenger, freight, hydraulic, traction), inspector name and license number, inspection date, next inspection due, any deficiencies noted, maximum capacity.

**Retention:** 1-3 years (annual inspection typical)

**Public Display:** Required to be posted inside elevator car in most jurisdictions.

**Standards Compliance:** ASME A17.1 (Safety Code for Elevators and Escalators).

**Fraud Risk:** Fake certificates could allow uninspected elevators to operate, risking passenger safety.

### Fire Alarm System Certificates

**Purpose:** Certifies fire alarm system has been tested and is functional.

**Data Verified:** Building address, system type, control panel information, inspector/company name and license, inspection date, test results for all devices, deficiencies, next inspection due.

**Retention:** 1 year (annual inspection)

**Standards Compliance:** NFPA 72 (National Fire Alarm Code).

**Inspection Components:** Smoke detectors, heat detectors, pull stations, notification appliances, control panels, monitoring connections.

### Fire Sprinkler System Certificates

**Purpose:** Certifies fire sprinkler system has been tested and is operational.

**Data Verified:** Building address, system type (wet, dry, pre-action, deluge), riser locations, inspector/company name and license, inspection date, flow test results, deficiencies.

**Retention:** 1 year (annual inspection)

**Standards Compliance:** NFPA 25 (Inspection, Testing, and Maintenance of Water-Based Fire Protection Systems).

**Inspection Components:** Sprinkler heads, piping, valves, water supply, fire pump (if applicable).

### Fire Extinguisher Inspection Tags

**Purpose:** Certifies portable fire extinguishers have been inspected and are ready for use.

**Data Verified:** Extinguisher type and size, location, inspector name/company, inspection date, service performed (inspection, maintenance, hydrostatic test).

**Retention:** 1 year (annual inspection, 6-year maintenance, 12-year hydrostatic)

**Standards Compliance:** NFPA 10 (Standard for Portable Fire Extinguishers).

### Boiler and Pressure Vessel Certificates

**Purpose:** Certifies boilers and pressure vessels meet safety standards.

**Data Verified:** Building address, equipment identification, equipment type, operating pressure, inspector name and commission, inspection date, next inspection due.

**Retention:** 1-2 years (varies by jurisdiction)

**Standards Compliance:** ASME Boiler and Pressure Vessel Code, National Board Inspection Code.

### Emergency Lighting and Exit Sign Certificates

**Purpose:** Certifies emergency lighting and exit signs are functional.

**Data Verified:** Building address, number of units tested, battery backup duration, inspector name, inspection date, deficiencies.

**Retention:** 1 year

**Testing Requirements:** Monthly 30-second test, annual 90-minute test.

## Data Visible After Verification

Shows the issuer domain (the inspection company or authority) and the responder text.

**Status Indications:**
- **Current** - Inspection is current
- **Expired** - Inspection has expired
- **Deficiencies** - Passed with noted deficiencies
- **Failed** - System failed inspection
- **Pending Reinspection** - Failed, reinspection scheduled

**Compliance Status:** "Current - Next inspection due [date]."

## Second-Party Use (Building Owner Verifying Their Own Certificates)

Building owners benefit from verification.

**Compliance Documentation:** Verify all safety systems are currently inspected.

**Audit Preparation:** Verify certificates before fire marshal or insurance inspections.

**Tenant Inquiries:** Respond to tenant safety inquiries with verified documentation.

**Insurance Requirements:** Verify certificates for property insurance.

## Third-Party Use

**Fire Marshals and Fire Departments**

Fire safety oversight:

**Inspection Verification:** Verify certificates during fire inspections.

**Occupancy Approval:** Verify before issuing certificate of occupancy.

**Complaint Investigation:** Verify when investigating complaints.

**Post-Incident Investigation:** Verify compliance after fires.

**Building Departments**

Code enforcement:

**Certificate of Occupancy:** Verify safety systems before CO issuance.

**Annual Inspections:** Verify during building inspections.

**Complaint Response:** Verify during code violation investigations.

**Insurance Companies**

Property coverage:

**Underwriting:** Verify safety systems for property insurance.

**Premium Calculation:** Proper fire protection reduces premiums.

**Claims Investigation:** Verify compliance before fire claims.

**Loss Control:** Verify for risk management surveys.

**Tenants and Occupants**

Personal safety:

**Lease Decisions:** Verify building safety before signing lease.

**Elevator Safety:** Verify elevator inspection when concerned.

**Fire Safety:** Verify fire systems are properly maintained.

**Property Managers**

Building operations:

**Compliance Tracking:** Track inspection dates across portfolio.

**Vendor Management:** Verify inspection companies are providing service.

**Tenant Communication:** Communicate safety compliance.

**Prospective Buyers**

Due diligence:

**Pre-Purchase Inspection:** Verify all safety certificates before acquisition.

**Capital Planning:** Identify upcoming inspection requirements.

**Insurance Quotes:** Verify for property insurance quotes.

## Verification Architecture

**The Safety Certificate Fraud Problem**

Fraudulent safety certificates endanger lives:

- **Entirely Fake Certificates:** No inspection was performed
- **Altered Dates:** Old inspections presented as current
- **Fabricated Inspectors:** Non-existent inspection companies
- **Hidden Deficiencies:** Deficiency notes removed from certificates
- **Classification Fraud:** Certificates for wrong equipment type
- **Capacity Fraud:** Altered elevator capacity ratings

OCR-to-hash addresses forgery and alteration. Inspector license verification confirms credentials.

**Inspection Companies as Issuers**

Licensed inspection firms issue certificates:

**Elevator Inspection:** Licensed elevator inspectors (QEI certification).

**Fire Protection:** Licensed fire protection companies.

**Boiler Inspection:** National Board commissioned inspectors.

**Third-Party Inspection:** Some jurisdictions use third-party inspectors.

Each company maintains verification endpoints for certificates they issue.

**Licensing and Certification**

Inspector qualifications:

**State Licensing:** Many states license safety inspectors.

**National Certification:** QEI for elevators, NICET for fire protection.

**Insurance Requirements:** Professional liability for inspectors.

**Continuing Education:** Ongoing training requirements.

Verification could link to inspector credentials.

**Jurisdiction Variations**

Requirements differ:

**State Requirements:** State-level safety codes.

**Local Amendments:** Cities may have stricter requirements.

**Adopted Codes:** Which version of NFPA, ASME adopted.

**Inspection Frequency:** Annual, semi-annual, quarterly varies.

Verification must account for jurisdictional requirements.

**Deficiency Tracking**

When systems don't pass:

**Deficiency Lists:** Itemized problems to be corrected.

**Correction Deadlines:** Timeframes for repairs.

**Reinspection:** Follow-up inspection after corrections.

**Partial Approvals:** Some systems may operate with minor deficiencies.

Verification should indicate: "Current - 2 minor deficiencies noted, corrections verified."

**Integration with Building Systems**

Connected to other compliance:

**Certificate of Occupancy:** Safety inspections prerequisite to CO.

**Fire Department Permits:** Assembly permits require fire safety.

**Insurance Binders:** Insurers require current certificates.

**Lease Requirements:** Commercial leases may require safety compliance.

**Digital Reporting**

Modern inspection systems:

**Electronic Reports:** Inspection reports filed electronically.

**Photo Documentation:** Digital photos of inspected equipment.

**Real-Time Reporting:** Immediate report availability.

**Database Integration:** Jurisdiction databases of inspection status.

OCR-to-hash bridges paper certificates; electronic systems have native verification.

