---
title: "Employment Reference Letters & VOE"
category: "Professional & Educational Qualifications"
volume: "Very Large"
retention: "1-7 years (hiring cycle)"
slug: "employment-reference-letters"
tags: ["employment-verification", "voe", "hr", "background-check", "hiring-fraud", "job-reference"]
derivations: 1
furtherDerivations: 1
---

## What is a VOE Letter?

A **Verification of Employment (VOE)** letter is the official paper from an employer's HR department proving that you actually worked there.

Lenders need these letters to approve home loans. Recruiters need them to verify your resume.

Fraud is common: "Nanny Mills" or "Reference Mills" sell fake employment letters from real-looking companies for a fee. OCR-to-hash connects the recruiter directly to the real employer's domain, ensuring that "Senior Software Engineer" role actually happened.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 25px;">
    <div style="font-weight: bold; font-size: 1.2em;">ACME CORPORATION</div>
    <div style="font-size: 0.85em; color: #666;">Global Human Resources Operations</div>
  </div>

  <h3 style="text-align: center; text-transform: uppercase; margin-bottom: 20px;">Verification of Employment (VOE)</h3>

  <div style="font-size: 1em; line-height: 1.6; color: #333; text-align: justify;">
    <p>To Whom It May Concern,</p>
    <p>This document serves as an official confirmation of the employment history for the individual named below:</p>

    <div style="margin: 20px 0; border-left: 4px solid #000; padding-left: 20px; background: #f9f9f9; padding-top: 10px; padding-bottom: 10px;">
      <p><strong>Employee:</strong> <span data-bracket="start" data-for="voe">]</span><strong>John D. Smith</strong><br>
      <strong>Position:</strong> Senior Software Engineer<br>
      <strong>Dates:</strong> March 1, 2020 to October 31, 2025<br>
      <strong>Status:</strong> Voluntary Separation / Eligible for Rehire</p>
    </div>

    <p>This verification is issued directly from the Acme Corp HR Information System (HRIS).</p>
  </div>

  <div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <div style="border-top: 1px solid #000; width: 200px; padding-top: 5px; font-style: italic;">Human Resources Dept.</div>
      <div style="font-size: 0.8em; color: #777;">March 15, 2026</div>
    </div>
    <div style="text-align: right; font-size: 0.8em; color: #777;">
      Ref #: VERF-992288
    </div>
  </div>

  <div data-verify-line="voe" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Acme Corp doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:acme-corp.com/hr/v/992288-JDS <span data-bracket="end" data-for="voe">]</span>
  </div>
</div>

## Data Verified

Employee name, legal employer name, job title/role, start date, end date (or "Present"), rehire eligibility status, reason for departure (voluntary/involuntary), salary (optional/linked hash), HRIS reference ID.

**Document Types:**
- **Verification of Employment (VOE):** Standard 1-page form.
- **Reference Letter:** Narrative letter from a supervisor.
- **Experience Certificate:** (Common in India/Middle East).
- **Separation Notice:** Final proof of departure.

## Data Visible After Verification

Shows the issuer domain (`acme-corp.com`, `workday.com`) and current worker standing.

**Status Indications:**
- **Verified** — Record matches the company's official HRIS file.
- **Revoked** — Reference withdrawn (e.g., discovery of post-departure misconduct).
- **Superseded** — Replaced by a corrected version (e.g., date correction).
- **Fraud Alert** — **ALERT:** Reference ID associated with a known "Reference Mill."

## Second-Party Use

The **Employee (Applicant)** benefits from verification.

**Background Check Speed:** Proving their work history instantly to a new employer. A verified hash allows the recruiter to skip the "Manual Phone Tag" with HR departments, reducing the time-to-hire from 10 days to 10 seconds.

**Mortgage Approval:** Proving income stability to a lender. Banks often reject VOE letters if the phone number on the letterhead doesn't match a Google search. A verified hash from the corporate domain removes this doubt.

## Third-Party Use

**Hiring Managers / Recruiters**
**Fraud Prevention:** Nanny/Reference mills sell fake employment letters for a fee. OCR-to-hash connects the recruiter directly to the real employer's domain, stopping "Fake Resume" fraud at the source.

**Background Check Firms (Checkr / Sterling)**
**Automation:** Firms can use the verification hash to automatically clear employment history checks, significantly lowering their manual labor costs.

**Immigration Authorities**
**Work Visa Vetting:** Verifying the "Specialty Occupation" claims of an H-1B or L-1 applicant by confirming their prior job titles and duties against the employer's verified record.

## Verification Architecture

**The "Reference Mill" Fraud Problem**

- **Fabricated Letters:** Entirely fake companies (with real-looking websites) providing fake references for a fee.
- **Title Inflation:** Changing "Junior Intern" to "Senior Lead" on a PDF to get a higher salary at a new job.
- **Date Stretching:** Altering a 3-month tenure to look like a 3-year tenure.

**Issuer Types**

**Corporations:** (e.g., Google, Amazon, local SMBs).
**HRIS Platforms:** (Workday, SAP SuccessFactors, ADP).
**Verification Utilities:** (The Work Number / Equifax).

**Privacy Salt:** Critical. Employment data is sensitive. The hash must be salted to prevent "Guessing" names of employees to see their departure reasons.

## Competition vs. The Work Number (Equifax)

| Feature | OCR-to-Hash | The Work Number | Manual Phone Check |
| :--- | :--- | :--- | :--- |
| **User Privacy** | **High.** Employee controls the document share. | **Low.** Lenders see full historical data pool. | **Medium.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Employer. | **Data-Bound.** Trust the aggregator. | **Human.** Prone to social engineering. |
| **Interoperability** | **Universal.** Works for any company with a URL. | **Limited.** Only for large firms who pay for TWN. | **Universal.** |
| **Cost** | **Low.** Standard web infra. | **Very High.** Lenders pay $50-$100 per check. | **High.** Costs in human time. |

**Why OCR wins here:** Reach. Small and medium businesses (SMBs) aren't on The Work Number. They rely on "Persistent Paper" reference letters. OCR-to-hash allows a small 5-person law firm or a local bakery to provide the same level of cryptographic trust as a Fortune 500 company.
