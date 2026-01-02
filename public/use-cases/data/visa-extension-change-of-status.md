---
title: "Visa Extensions and Change of Status approvals"
category: "Immigration & Visa Documents"
volume: "Medium"
retention: "New status validity + 7 years"
slug: "visa-extension-change-of-status"
tags: ["immigration", "visa-extension", "change-of-status", "i-797", "uscis", "h1b-extension", "work-authorization", "legal-stay"]
---

## What is a Visa Extension Approval?

When a person in the US on a temporary visa (e.g., H-1B, F-1, or B-2) wants to stay longer or switch to a different visa type, they file a **Change of Status (COS)** or **Extension of Stay (EOS)**. The approval arrives as an **I-797A Notice of Action**, often with a new paper I-94 attached at the bottom.

These documents are the "Proof of Legal Presence." Fraud is rampant: people whose extensions were denied often "edit" a 2024 approval into a 2026 approval to hide their illegal overstay and trick employers or landlords into believing they are still in status. Verified hashes bind the **Receipt Number, New Expiration Date, and Visa Class** to the `uscis.gov` domain.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #f4f4f4; padding: 15px; border-bottom: 1px solid #ccc; display: flex; align-items: center; justify-content: space-between;">
    <div>
      <div style="font-weight: bold; font-size: 1.1em; color: #333;">I-797A | NOTICE OF ACTION</div>
      <div style="font-size: 0.7em; color: #666;">DEPARTMENT OF HOMELAND SECURITY • U.S. CITIZENSHIP AND IMMIGRATION SERVICES</div>
    </div>
    <div style="width: 45px; height: 45px; background: #999; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: bold; font-size: 0.6em; text-align: center;">DHS</div>
  </div>

  <div style="padding: 25px;">
    <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; font-size: 0.9em; line-height: 1.5; margin-bottom: 25px; border-bottom: 1px solid #eee; padding-bottom: 15px;">
      <div>
        <strong>Receipt Number:</strong> <span data-bracket="start" data-for="extension">]</span>WAC-26-992-28877<br>
        <strong>Petitioner:</strong> GOLIATH TECH SOLUTIONS INC.<br>
        <strong>Beneficiary:</strong> JOHN JACOB DOE
      </div>
      <div style="text-align: right;">
        <strong>Notice Date:</strong> MARCH 15, 2026<br>
        <strong>Class:</strong> H-1B1<br>
        <strong>Case Type:</strong> I-129 Extension
      </div>
    </div>

    <div style="background: #e8f5e9; border: 1px solid #c8e6c9; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
      <h4 style="margin-top: 0; color: #2e7d32; font-size: 0.9em; border-bottom: 1px solid #c8e6c9; padding-bottom: 5px; text-transform: uppercase;">Approval Notice</h4>
      <p style="font-size: 0.9em; color: #333;">
        The above petition for an extension of stay has been approved. The beneficiary's status is extended from <strong>03/15/2026</strong> to <strong>03/14/2029</strong>.
      </p>
    </div>

    <div style="border: 2px dashed #ccc; padding: 10px; text-align: center; font-size: 0.8em; color: #666;">
      [ NEW DETACHABLE I-94 RECORD ATTACHED BELOW ]
    </div>
  </div>

  <div style="padding: 20px; background: #fdfdfd; border-top: 1px dashed #999; text-align: center;">
    <div data-verify-line="extension" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #002d62; font-weight: bold;"
      title="Demo only: USCIS doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:uscis.gov/v/i797/WAC2699228877 <span data-bracket="end" data-for="extension">]</span>
    </div>
    <div style="font-size: 0.7em; color: #999; margin-top: 10px; font-style: italic;">
      Scan to verify case approval, new validity dates, and work authorization class.
    </div>
  </div>
</div>

## Data Verified

Receipt number (e.g., WAC/LIN/EAC), petitioner/employer name, beneficiary name, case type (I-129/I-539), notice date, approval dates (start/end), new visa class (e.g., H-1B, O-1, L-1), I-94 number (linked), issuing office ID.

**Document Types:**
- **I-797A Notice of Action:** (With I-94) The primary approval for those in the US.
- **I-797B Notice of Action:** (Without I-94) Approval for those abroad.
- **Form I-94 Arrival/Departure Record:** (Linked hash) the underlying stay record.
- **SEVIS Form I-20:** (Linked hash) for students extending their program.

## Data Visible After Verification

Shows the issuer domain (`uscis.gov`) and the real-time case standing.

**Status Indications:**
- **Approved / Active** — The extension is valid and the subject is in legal status.
- **Case Reopened** — **ALERT:** The approval is under post-decision review.
- **Revoked** — **CRITICAL:** The approval has been cancelled (e.g., due to job loss or fraud).
- **Unknown** — **CRITICAL:** Hash not found; high risk of a "Synthetic Notice" forgery.

## Second-Party Use

The **Employee (Beneficiary)** benefits from verification.

**Employment Onboarding (I-9):** An H-1B worker switching jobs can show the verified hash of their "Transfer Approval." The new employer's HR manager can instantly see **"APPROVED - H-1B"** on their phone, allowing the worker to start immediately without the fear of a $10,000 "Illegal Hiring" fine.

**Driver's License Renewal:** DMVs require proof of legal stay to renew a Real ID. Providing a verified hash of the I-797A allows the DMV clerk to bypass the 10-day "SAVE" database delay and issue the license on the spot.

## Third-Party Use

**Employers / HR Managers**
**Zero-Trust Vetting:** Thousands of fake I-797s are sold globally every year. OCR-to-hash connects the manager directly to the USCIS record in seconds, stopping "Status Hiding" where a terminated employee tries to get a new job using an edited notice.

**Landlords / Leasing Agents**
**Eligibility Check:** Verifying that a non-citizen applicant has the verified legal status to remain in the US for the duration of a 12-month lease.

**International Travel Checkpoints**
**Boarding Prep:** Verifying that a traveler who has an expired visa in their passport actually has a verified, active extension notice before allowing them to board a flight back to the US.

## Verification Architecture

**The "Date Stretch" Fraud Problem**

- **Validity Inflation:** Changing a 2024 expiration date to 2027 on a PDF to hide an overstay.
- **Class Swapping:** Editing a "B-2" (Tourist - No Work) notice into an "H-1B" (Worker) notice.
- **Notice Fabrication:** Creating a fake "Approval Notice" for a case that was actually denied.

**Issuer Types**

**U.S. Citizenship and Immigration Services (USCIS).**
**DHS SAVE System (Backend Source).**

**Privacy Salt:** Highly Critical. Case numbers and names are protected under the Privacy Act. The hash must be salted to prevent "Case Scraping" by unauthorized data brokers.

## Rationale

Visa extensions are the "Oxygen of Legal Presence." By turning notices into verifiable digital bridges, we protect the US labor market from fraud and ensure that legal residents can live and work without unfair administrative delays.