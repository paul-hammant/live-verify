---
title: "Permanent residence cards (Green Card, ILR, PR)"
category: "Immigration & Visa Documents"
volume: "Small"
retention: "10 years (card validity) + permanent"
slug: "permanent-residence-cards"
tags: ["permanent", "residence", "cards", "immigration", "visa", "documents"]
---

## What is a Green Card?

A **Permanent Resident Card** (commonly known as a **Green Card**) is the document proving that a non-citizen is authorized to live and work in the US indefinitely.

It is the most high-value identity card in the country.

Because it grants the right to work and receive government benefits, Green Cards are the #1 target for "High-End Forgery." Black-market cards look perfect to the eye. OCR-to-hash turns the **Physical Card** into a live link to the USCIS database, allowing an employer or bank to see if the card has been **Revoked or Reported Stolen** today.

<div style="max-width: 400px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; border-radius: 12px; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
  <div style="background: #002d62; color: #fff; padding: 15px; text-align: center; display: flex; align-items: center; justify-content: space-between;">
    <div>
      <div style="font-weight: bold; font-size: 1.1em;">U.S. CITIZENSHIP & IMMIGRATION</div>
      <div style="font-size: 0.8em;">Permanent Resident Card (I-551)</div>
    </div>
    <div style="font-size: 1.5em;">🦅</div>
  </div>
  <div style="padding: 20px; display: flex;">
    <div style="width: 100px; height: 125px; background: #eee; margin-right: 15px; display: flex; align-items: center; justify-content: center;">[PHOTO]</div>
    <div style="flex-grow: 1;">
      <strong>Name:</strong> <span data-bracket="start" data-for="pr">]</span>DOE, JOHN JACOB<br>
      <strong>USCIS #:</strong> 992-288-776<br>
      <strong>Expires:</strong> 01/01/2030
      <div data-verify-line="pr" style="border-top: 1px dashed #999; margin-top: 20px; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.75em;">
        verify:uscis.gov/v/992288776 <span data-bracket="end" data-for="pr">]</span>
      </div>
    </div>
  </div>
</div>


**Privacy Salt:** Sensitive personal information requires random salt in verification lines to prevent hash enumeration.

## Data Visible After Verification

Shows the issuer domain and the responder text (e.g., "Valid ID" or "Denied").

**Status Indications:**
- **Valid** - Document verified and current
- **Expired** - Document has reached expiration
- **Revoked** - Document has been revoked or cancelled
- **Superseded** - A newer version exists

The verification response may include additional context such as issue date, expiration date, or document serial numbers.

## Second-Party Use

The document holder (subject/recipient) benefits from verification.

**Status Confirmation:** Verify immigration documents after receipt from authorities.

**Employment Authorization:** Confirm work authorization for I-9 compliance.

**Travel Planning:** Verify travel document validity before international trips.

**Status Changes:** Confirm application outcomes and new status.

**Family Petitions:** Provide verified status for dependent applications.

## Third-Party Use

**Employers**

Hiring and compliance verification:

**Pre-Employment Screening:** Verify credentials during hiring process.

**I-9 Compliance:** Verify work authorization and identity documents.

**Credential Verification:** Confirm professional licenses and certifications.

**Health Requirements:** Verify health-related documentation for workplace safety.

**Background Checks:** Integrate verification into background check processes.

**Government Agencies**

Compliance enforcement and administration:

**Inspection Verification:** Field agents verify permits and licenses at sites.

**Enforcement Actions:** Confirm documentation before enforcement.

**Benefit Eligibility:** Verify supporting documents for benefits administration.

**Compliance Audits:** Audit documentation for regulatory compliance.

**Interagency Coordination:** Share verified documents across agencies.

**Healthcare Providers**

Medical care and coordination:

**Medical History:** Verify patient-provided medical records and test results.

**Treatment Planning:** Confirm diagnostic results for treatment decisions.

**Specialist Referrals:** Validate records when coordinating care.

**Insurance Authorization:** Verify coverage and authorization documents.

**Compliance Requirements:** Confirm vaccination and health screening records.

**Educational Institutions**

Admissions and enrollment:

**Transfer Credits:** Verify transcripts for transfer credit evaluation.

**Graduate Admissions:** Validate undergraduate credentials for graduate programs.

**Professional Programs:** Confirm prerequisite credentials for professional schools.

**International Students:** Verify foreign credentials for admissions and visa support.

**Scholarship Awards:** Validate academic credentials for scholarship eligibility.

## Verification Architecture

**The Permanent residence cards (Green Card, ILR, PR) Fraud Problem**

Document fraud creates significant risks:

- **Fabrication:** Entirely fake documents created from scratch
- **Alteration:** Genuine documents with modified content (dates, amounts, names)
- **Impersonation:** Documents falsely claiming to be from legitimate issuers
- **Expired/Revoked Documents:** Presenting invalid documents as current

OCR-to-hash verification addresses fake and altered documents. Domain binding confirms the claimed issuer actually issued the document.

**Issuer Types**

Who issues these documents and operates verification endpoints?

**USCIS:** U.S. Citizenship and Immigration Services for immigration documents.

**DOS:** Department of State for passports and consular documents.

**CBP:** Customs and Border Protection for entry/exit documentation.

**Foreign Governments:** International authorities for foreign-issued documents.

**System Integration**

Verification integrates with relevant systems:

**Issuer Systems:** Core operational systems generate verification hashes at document creation.

**Industry Standards:** Existing data standards extended to include verification.

**Regulatory Systems:** Government databases for systematic hash receipt and oversight.

**Third-Party Platforms:** Industry portals and platforms enable verification access.

**Privacy Considerations**

Sensitive personal information requires special handling:

**Privacy Salt:** Random salt added to verification lines prevents hash enumeration attacks.

**Minimum Disclosure:** Verification response reveals only necessary information.

**Access Controls:** Verification endpoints implement appropriate access restrictions.

**Audit Logging:** Verification attempts logged for security and compliance.

## Photo Return: Defeating High-Grade Clones

Verification responses can include **USCIS's authoritative photo** of the cardholder — not just "valid/invalid" but the actual face on file.

**Why This Matters:**

Green Cards are the highest-value identity document in America. A perfect clone with a swapped photo could fool any employer or bank — until verification returns the **original photo** from USCIS, exposing the mismatch.

| Attack | Without Photo Return | With Photo Return |
|--------|---------------------|-------------------|
| **Photo-swap clone** | Employer sees valid hash, accepts card | Text verifies, but returned photo doesn't match person presenting |
| **Stolen card + lookalike** | Thief finds someone who looks similar, uses stolen card | USCIS photo reveals the difference |

**The Doppelganger Attack (The "Woman in Cabin 10" Problem)**

Sophisticated fraudsters search social media for facial lookalikes, recruit a doppelganger, then steal a victim's Green Card details. The clone card shows the doppelganger's (similar) face, and the returned photo is "close enough" to pass casual HR inspection.

*This attack — finding lookalikes via social media facial matching — was dramatized in "The Woman in Cabin 10" (2025), where antagonists recruited a doppelganger to impersonate a billionaire.*

**Countermeasure: Geo-Anomaly Detection**

USCIS can monitor verification request patterns:
- Card verified in New York at 9am, then Los Angeles at 10am? Flagged.
- Card verified by 20 different employers in one month? Flagged.
- Card verified repeatedly for I-9 purposes while holder is abroad? Flagged.

Immigration authorities can trigger investigations when verification patterns suggest a cloned card is in circulation — potentially catching fraud rings before victims even know their identity was compromised.

## Rationale

Prevents fake permanent residence cards. Domain binding verifies immigration authority. Employment eligibility verification (I-9). Benefits eligibility. Travel document. For privacy, issuers can add a random salt line to raise entropy and defeat guessing attacks. High-value fraud target.
