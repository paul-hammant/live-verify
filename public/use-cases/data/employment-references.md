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

<div style="max-width: 550px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 20px;">
  <div style="font-size: 0.85em; color: #555; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">
    <strong>From:</strong> john.smith@gmail.com<br>
    <strong>To:</strong> miggins@newco.com<br>
    <strong>Subject:</strong> Re: References for Senior Engineer role
  </div>
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
    <span data-verify-line="voe">verify:acme-corp.com/staff</span> <span verifiable-text="end" data-for="voe">]</span>
  </div>
  <div style="font-size: 0.95em; color: #333; margin-top: 15px;">
    Let me know if you need anything else.<br><br>
    Best regards
  </div>
</div>

<div style="max-width: 550px; margin: 24px auto; font-family: 'Times New Roman', serif; border: 1px solid #999; background: #fff; padding: 40px 40px 20px 40px; position: relative;">
  <h3 style="margin: 0 0 20px 0; font-size: 1.1em; text-transform: uppercase; letter-spacing: 1px;">References</h3>
  <div style="font-size: 0.95em; line-height: 1.6; color: #333;">
    <div style="font-family: 'Courier New', monospace; background: #f0f0f0; padding: 12px; border: 1px solid #ccc; font-size: 0.95em; color: #999; line-height: 1.5; margin-bottom: 15px;">
      StartupCo<br>
      John D. Smith<br>
      Junior Developer<br>
      June 2014 – August 2016<br>
      <span style="color: #bbb;">no verification available</span>
    </div>
    <div style="font-family: 'Courier New', monospace; background: #f0f0f0; padding: 12px; border: 1px solid #ccc; font-size: 0.95em; color: #999; line-height: 1.5; margin-bottom: 15px;">
      Widget Industries<br>
      John D. Smith<br>
      Project Manager<br>
      September 2016 – February 2020<br>
      <span style="color: #bbb;">no verification available</span>
    </div>
    <div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 12px; border: 1px solid #999; font-size: 0.95em; color: #000; line-height: 1.5; margin-bottom: 15px;">
      <span verifiable-text="start" data-for="voe2">[</span>Acme Corporation<br>
      John D. Smith<br>
      Senior Software Engineer<br>
      March 2020 – October 2025<br>
      Eligible for Rehire<br>
      <span data-verify-line="voe2">verify:acme-corp.com/staff</span> <span verifiable-text="end" data-for="voe2">]</span>
    </div>
  </div>
  <div style="position: absolute; bottom: 10px; left: 40px; right: 40px; font-size: 0.75em; color: #777; display: flex; justify-content: space-between;">
    <span>john_smith_cv.pdf</span>
    <span>Page 4 of 4</span>
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

## Peer References

Unlike formal VOE letters from HR departments, **peer references** are colleague-to-colleague attestations—similar to LinkedIn recommendations but cryptographically verifiable. See [prior art discussion of mine](https://gist.github.com/paul-hammant/3375fec8e204f0c7567d4daea1fe48ef).

The verify URL points to the *referee's* domain, not the employer's. This reflects that the claim is personal ("I worked with this person") rather than institutional ("This person was employed here").

<div style="max-width: 550px; margin: 24px auto; font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6;">
  <span verifiable-text="start" data-for="peer">[</span>I, Paul Hammant, worked for Kevin Behr in<br>
  his role as CIO of HedgeServ in New York City<br>
  in 2015 and 2016<br>
  <span data-verify-line="peer">verify:paulhammant.com/refs</span> <span verifiable-text="end" data-for="peer">]</span>
</div>

**Use Cases:**
- **Professional Networking:** A former colleague attests to working with you, verifiable against their personal site.
- **Freelance/Contract Work:** When no formal HR department exists, peers can vouch for project collaboration.
- **Reference Chains:** Multiple peer attestations from different people build a web of trust.

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
