# Adoption Papers and Custody Orders

**Category:** Government & Civic Documents
**Volume:** Very Small
**Retention:** Permanent (legal guardianship)

## Data Verified

Child's name (original and adopted name if changed), child's date of birth, adoptive parent(s) names, biological parent(s) names (where applicable), court name and jurisdiction, case number, judge name, order type (adoption decree, custody order, guardianship), order date, effective date, any conditions or restrictions.

**Document Types:**
- **Adoption Decrees:** Final court order establishing legal parent-child relationship
- **Interlocutory Orders:** Preliminary adoption orders before finalization
- **Custody Orders:** Court orders establishing physical and legal custody
- **Guardianship Orders:** Court-appointed guardianship of minors
- **Termination of Parental Rights:** Orders ending biological parent rights
- **Visitation Orders:** Court-ordered visitation schedules
- **Modification Orders:** Changes to existing custody arrangements
- **International Adoption Documentation:** Hague Convention and intercountry adoption papers

**Privacy and Salt:** Given the sensitive nature of child welfare documents, these should include random salt lines to prevent any attempt to identify children through hash enumeration.

## Data Visible After Verification

Shows the issuer domain (the court) and the responder text.

**Status Indications:**
- **Valid** - Order is current and in effect
- **Modified** - Superseded by subsequent order
- **Appealed** - Order under appeal
- **Vacated** - Order has been vacated
- **Expired** - Temporary order has expired

**Privacy-Preserving Response:** Verification confirms the order exists in court records without revealing sensitive details about the child or family circumstances to unauthorized parties.

## Second-Party Use (Parents Verifying Their Own Orders)

Adoptive and custodial parents benefit from verification.

**Order Authenticity:** After receiving court documents, verify they're genuine.

**School Enrollment:** Verify custody orders for school registration.

**Medical Authorization:** Verify guardianship for medical consent.

**Travel Documentation:** Verify custody orders when traveling with children.

**Insurance and Benefits:** Verify adoption for dependent coverage.

## Third-Party Use

**Schools and Educational Institutions**

Student enrollment:

**Enrollment Authorization:** Verify who can enroll child in school.

**Pickup Authorization:** Verify custody for pickup permissions.

**Record Access:** Verify who can access educational records.

**Emergency Contacts:** Verify authorized contacts.

**Healthcare Providers**

Medical treatment:

**Consent Authority:** Verify who can consent to medical treatment.

**Medical Records:** Verify who can access child's medical records.

**Emergency Treatment:** Verify custody in emergency situations.

**Insurance Verification:** Confirm coverage under custodial parent.

**Government Agencies**

Benefits and services:

**Social Security:** Verify adoption for dependent benefits.

**Immigration:** Verify adoption for citizenship purposes.

**Child Welfare:** Verify custody in protection investigations.

**Benefits Eligibility:** Determine eligibility for family services.

**Airlines and Travel**

Travel authorization:

**Unaccompanied Minors:** Verify custody for travel consent.

**International Travel:** Verify authority for child passport applications.

**Custody Disputes:** Verify custody when parents dispute travel.

**Amber Alert Prevention:** Confirm legitimate custody.

**Law Enforcement**

Child safety:

**Custody Disputes:** Verify current custody during disputes.

**Missing Children:** Verify custody in missing child situations.

**Welfare Checks:** Confirm guardianship during investigations.

**Enforcement Actions:** Verify custody for order enforcement.

**Attorneys**

Family law matters:

**Modification Proceedings:** Verify current orders before filing modifications.

**Enforcement Actions:** Verify orders before contempt proceedings.

**Interstate Matters:** UCCJEA jurisdiction verification.

**Estate Planning:** Verify custody for guardian designations.

## Verification Architecture

**The Custody Document Fraud Problem**

Fraudulent custody documents enable child endangerment:

- **Forged Custody Orders:** Fake court orders claiming custody
- **Altered Orders:** Genuine orders with modified custody terms
- **Outdated Orders:** Superseded orders presented as current
- **Jurisdiction Shopping:** Orders from wrong jurisdiction
- **Impersonation:** Documents falsely attributed to courts
- **International Abduction:** Fake documents facilitating child abduction

OCR-to-hash addresses forgery and alteration. Court record cross-reference confirms order authenticity.

**Courts as Issuers**

Family courts issue custody documents:

**State Family Courts:** State-level custody jurisdiction.

**Juvenile Courts:** Child welfare and dependency matters.

**Probate Courts:** Guardianship in some jurisdictions.

**Tribal Courts:** Custody matters under ICWA.

**Foreign Courts:** International adoption and custody.

Each court maintains verification endpoints for orders in their records.

**Uniform Child Custody Jurisdiction**

Interstate custody coordination:

**UCCJEA:** Uniform Child Custody Jurisdiction and Enforcement Act.

**Home State:** State with jurisdiction over custody matters.

**Exclusive Continuing Jurisdiction:** Which court can modify orders.

**Emergency Jurisdiction:** Temporary orders for child safety.

Verification indicates jurisdiction: "Verified - [State] has continuing jurisdiction."

**Adoption Finalization**

Adoption decree requirements:

**Consent:** Biological parent consent or termination.

**Home Study:** Social worker investigation.

**Waiting Period:** Most states require waiting period.

**Sealed Records:** Original birth certificate sealed upon adoption.

**New Birth Certificate:** Amended certificate issued.

Verification confirms finalization status: "Verified - Final Adoption Decree."

**Indian Child Welfare Act**

Special protections:

**ICWA Applicability:** Applies to custody of Native American children.

**Tribal Notification:** Required notification to tribes.

**Placement Preferences:** Priority placement with tribal families.

**Active Efforts:** Higher standard for termination of parental rights.

Verification should indicate ICWA compliance where applicable.

**International Adoption**

Cross-border considerations:

**Hague Convention:** Convention on Intercountry Adoption.

**Central Authorities:** Government agencies overseeing international adoption.

**Immigration Requirements:** IR-3, IR-4 visa categories.

**Readoption:** Some parents readopt in US courts.

**Apostille:** Authentication for foreign documents.

International adoption documents may require multi-country verification.

**Modification and Enforcement**

Custody orders change:

**Substantial Change:** Modification requires changed circumstances.

**Best Interest Standard:** Child's best interest governs.

**Relocation:** Special rules for custodial parent relocation.

**Contempt:** Enforcement of custody violations.

Verification should indicate if order has been modified: "Current order as of [date]."

**Emergency Orders**

Urgent custody situations:

**Temporary Emergency Custody:** Immediate protection orders.

**Ex Parte Orders:** Orders without hearing in emergencies.

**Protective Orders:** Domestic violence protection.

**Duration:** Emergency orders typically short-term.

Verification distinguishes emergency from permanent orders.

**Grandparent and Third-Party Rights**

Non-parent custody:

**Grandparent Visitation:** State laws vary widely.

**Third-Party Custody:** Non-parents awarded custody.

**De Facto Parent:** Recognition of functional parenting.

**Psychological Parent:** Attachment-based custody claims.

Verification confirms the type of custody arrangement: "Verified - Grandparent Visitation Order."

