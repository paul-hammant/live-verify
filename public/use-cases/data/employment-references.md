---
title: "Employment References"
category: "Professional & Educational Qualifications"
volume: "Very Large"
retention: "1-7 years (hiring cycle)"
slug: "employment-references"
tags: ["employment-verification", "voe", "hr", "background-check", "hiring-fraud", "job-reference"]
furtherDerivations: 1
---

## What is an Employment Reference?

A verified employment reference proves you actually worked somewhere. It can appear as an addendum to a CV/resume, in an email after a job offer, or as a standalone VOE letter.

Fraud is common: "Reference Mills" sell fake employment letters. OCR-to-hash connects the verifier directly to the real employer's domain.

<div style="max-width: 500px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 20px;">
  <div style="font-size: 0.95em; color: #333; margin-bottom: 15px;">
    Dear Ms Miggins,<br><br>
    As requested, here are the references I mentioned:
  </div>
  <div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6;">
    <span verifiable-text="start" data-for="voe">[</span>Acme Corporation<br>
    John D. Smith<br>
    Senior Software Engineer<br>
    March 2020 – October 2025<br>
    Eligible for Rehire<br>
    <span data-verify-line="voe">vfy:acme-corp.com/hr</span> <span verifiable-text="end" data-for="voe">]</span>
  </div>
  <div style="font-size: 0.95em; color: #333; margin-top: 15px;">
    Let me know if you need anything else.<br><br>
    Best regards
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
