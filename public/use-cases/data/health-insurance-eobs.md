---
title: "Health Insurance Explanation of Benefits (EOB)"
category: "Personal Lines Insurance"
volume: "Large"
retention: "7-10 years (tax/audit)"
slug: "health-insurance-eobs"
tags: ["health-insurance", "eob", "medical-billing", "hsa-fsa-compliance", "tax-deduction", "patient-responsibility", "insurance-fraud"]
furtherDerivations: 1
---

## What is an EOB?

An **Explanation of Benefits (EOB)** is the document your health insurance company sends you after a doctor's visit. It is **NOT** a bill.

It tells you:
1.  **The Discount:** How much the insurance company saved you by negotiating with the doctor.
2.  **The Payment:** Exactly how much the insurance company paid.
3.  **The Debt:** Exactly how much the doctor is legally allowed to charge you.

Verified EOBs are essential for **HSA/FSA Reimbursement**. Fraudsters often edit these PDFs to inflate their "Patient Responsibility" to trick their tax-free savings account into releasing cash. Verified hashes ensure the $70 charge matches the insurer's actual adjudication.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #005fb8; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;">ANTHEM BLUE CROSS</div>
      <div style="font-size: 0.8em;">Explanation of Benefits (EOB)</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Claim #: 99228877-BC</div>
    </div>
  </div>

  <div style="padding: 25px;">
    <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 20px; color: #555;">
      <div>
        <strong>Patient:</strong> <span data-bracket="start" data-for="eob-health">]</span>SARAH J. DOE<br>
        <strong>Provider:</strong> Westside Medical Clinic
      </div>
      <div style="text-align: right;">
        <strong>Service Date:</strong> Feb 10, 2026<br>
        <strong>Statement Date:</strong> Mar 15, 2026
      </div>
    </div>

    <table style="width: 100%; border-collapse: collapse; font-size: 0.85em;">
      <tr style="border-bottom: 2px solid #005fb8; background: #f5f5f5;">
        <th style="padding: 5px; text-align: left;">Service Description</th>
        <th style="padding: 5px; text-align: right;">Amount Billed</th>
        <th style="padding: 5px; text-align: right;">Patient Owes</th>
      </tr>
      <tr>
        <td style="padding: 5px; border-bottom: 1px solid #eee;">Office Visit (99213)</td>
        <td style="text-align: right; padding: 5px;">$ 250.00</td>
        <td style="text-align: right; padding: 5px;">$ 25.00</td>
      </tr>
      <tr>
        <td style="padding: 5px; border-bottom: 1px solid #eee;">Lab Work (Panel A)</td>
        <td style="text-align: right; padding: 5px;">$ 450.00</td>
        <td style="text-align: right; padding: 5px;">$ 45.00</td>
      </tr>
      <tr style="font-weight: bold; font-size: 1.1em;">
        <td colspan="2" style="padding: 5px;">TOTAL PATIENT RESPONSIBILITY:</td>
        <td style="text-align: right; padding: 5px;">$ 70.00</td>
      </tr>
    </table>

    <p style="margin-top: 20px; font-size: 0.8em; color: #555; font-style: italic;">
      This is NOT a bill. Use this verified record for HSA/FSA reimbursement.
    </p>

    <div data-verify-line="eob-health" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Anthem doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:anthem.com/claims/v/99228877 <span data-bracket="end" data-for="eob-health">]</span>
    </div>
  </div>
</div>

## Data Verified

Patient name, member ID (partial), provider name, service date, CPT codes (procedures), billed amount, contracted discount, insurance payment, patient responsibility (copay/deductible), date of EOB issuance.

**Document Types:**
- **Explanation of Benefits (EOB):** The primary post-service record.
- **Predetermination of Benefits:** (Linked hash) for high-cost surgery estimates.
- **HSA/FSA Substantiation Receipt:** Proving an expense was "eligible."
- **Tax-Deduction Summary:** Annual summary of patient responsibility.

## Data Visible After Verification

Shows the issuer domain (`anthem.com`, `uhc.com`) and current claim status.

**Status Indications:**
- **Processed** — Data matches the insurer's final payment decision.
- **Adjusted** — **ALERT:** Original EOB was corrected; this version is void.
- **In-Appeal** — Patient has challenged the patient responsibility amount.
- **Denied** — Payment rejected (reason code verified).

## Second-Party Use

The **Patient** benefits from verification.

**HSA/FSA Reimbursement:** Proving to a 3rd party administrator (e.g., WEX or WageWorks) that the $70 charge was a verified medical expense. Verification removes the "Substantiation Request" nightmare where workers have their debit cards frozen due to "Unreadable Paper."

**Tax Audit Protection:** Proving to the IRS that medical deductions claimed on a tax return are backed by verified, non-altered insurance records.

## Third-Party Use

**HSA / FSA Administrators**
**Automated Approval:** Instantly verifying the "Patient Responsibility" amount from a PDF upload. OCR-to-hash allows the administrator to skip the manual "Document Review" queue, releasing funds to the worker in seconds.

**Secondary Insurers (COB)**
**Coordination of Benefits:** Verifying exactly how much the primary insurer paid before calculating the secondary payment, stopping "Double-Dipping" fraud.

**Mortgage Lenders**
**Medical Debt Vetting:** If a borrower has high medical bills, lenders can verify the EOBs to ensure the debt isn't being exaggerated or hasn't already been settled.

## Verification Architecture

**The "Healthcare Fraud" Problem**

- **HSA Draining:** Editing a $10 copay to look like $1,000 to trick an FSA administrator into releasing tax-free cash for personal use.
- **Balance Billing:** Clinics pretending they didn't receive an EOB showing a contracted discount, to bill the patient for the full retail amount.
- **Double Payouts:** Submitting the same EOB to two different insurance companies (e.g., work and spouse's plan) while altering the "Primary" status.

**Issuer Types**

**Health Insurance Carriers:** (Anthem, UHC, Aetna, Cigna).
**TPA Benefit Managers.**
**Medicare / Medicaid Portals.**

**Privacy Salt:** ABSOLUTELY CRITICAL. EOBs contain sensitive medical procedure data. The hash MUST be salted to prevent "Guess-and-Check" searches for specific patient conditions.

## Competition vs. Insurance Portals

| Feature | OCR-to-Hash | Insurer Mobile App | Scanned PDF / Paper |
| :--- | :--- | :--- | :--- |
| **User Control** | **High.** Patient shares only the *Single Claim*. | **Low.** App access often reveals *full* medical history. | **Vulnerable.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Insurer. | **System-Bound.** | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** Works for any HSA provider. | **Siloed.** | **Universal.** |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires 2FA, login, and navigation. | **N/A.** |

**Why OCR wins here:** Selective Privacy. A patient needs to prove a $70 debt to their HSA provider without exposing that the visit was for a sensitive condition or a high-cost medication. OCR-to-hash turns the **Static Statement** into a portable, private "Proof of Expense."
