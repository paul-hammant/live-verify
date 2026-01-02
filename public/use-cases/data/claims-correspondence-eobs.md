---
title: "Claims Correspondence and EOBs"
category: "Insurance Claims & Operations"
volume: "Large"
retention: "Claim term + 7-10 years"
slug: "claims-correspondence-eobs"
tags: ["insurance", "claims", "eob", "healthcare-billing", "provider-dispute", "audit-trail", "compliance"]
---

## What is an EOB?

An **Explanation of Benefits (EOB)** is the document your health insurance company sends you after you visit a doctor. It is **NOT** a bill.

It is a detailed breakdown showing:
1.  **The Discount:** How much the insurance company forced the doctor to lower their price.
2.  **The Payment:** Exactly how much the insurance company paid.
3.  **The Debt:** Exactly how much you (the patient) are still allowed to be billed.

Verified EOBs are critical for stopping "Balance Billing"—when a hospital tries to charge a patient for the "Discount" amount that the insurance company already negotiated away.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #005fb8; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;">UNITEDHEALTHCARE</div>
      <div style="font-size: 0.8em;">Explanation of Benefits (EOB)</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Claim #: 99228877-EOB</div>
    </div>
  </div>

  <div style="padding: 25px;">
    <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 20px;">
      <div>
        <strong>Patient:</strong> <span data-bracket="start" data-for="eob">]</span>SARAH J. DOE<br>
        <strong>Provider:</strong> Mercy General Hospital
      </div>
      <div style="text-align: right;">
        <strong>Service Date:</strong> Feb 10, 2026<br>
        <strong>Statement Date:</strong> Mar 15, 2026
      </div>
    </div>

    <table style="width: 100%; border-collapse: collapse; font-size: 0.85em;">
      <tr style="border-bottom: 2px solid #005fb8; background: #f5f5f5;">
        <th style="padding: 5px; text-align: left;">Description</th>
        <th style="padding: 5px; text-align: right;">Amount</th>
      </tr>
      <tr>
        <td style="padding: 5px; border-bottom: 1px solid #eee;">Billed Amount</td>
        <td style="text-align: right; padding: 5px;">$ 1,200.00</td>
      </tr>
      <tr>
        <td style="padding: 5px; border-bottom: 1px solid #eee;">Plan Discount (Contracted)</td>
        <td style="text-align: right; padding: 5px;">-$ 400.00</td>
      </tr>
      <tr>
        <td style="padding: 5px; border-bottom: 1px solid #eee;">Your Plan Paid</td>
        <td style="text-align: right; padding: 5px;">-$ 640.00</td>
      </tr>
      <tr style="font-weight: bold; font-size: 1.1em;">
        <td style="padding: 5px;">YOU OWE (Patient Responsibility):</td>
        <td style="text-align: right; padding: 5px;">$ 160.00</td>
      </tr>
    </table>

    <p style="margin-top: 20px; font-size: 0.8em; color: #555; font-style: italic;">
      This is NOT a bill. This is your record of how the claim was processed.
    </p>

    <div data-verify-line="eob" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: UHC doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:uhc.com/claims/v/99228877 <span data-bracket="end" data-for="eob">]</span>
    </div>
  </div>
</div>

## Data Verified

Patient name, member ID (partial), provider name, service date, claim number, billed amount, allowed amount, plan paid amount, patient responsibility (deductible/copay), adjustment reason codes.

**Document Types:**
- **Explanation of Benefits (EOB):** Post-service summary.
- **Predetermination Letter:** Pre-service cost estimate.
- **Appeal Decision Letter:** Proving a denied claim was overturned.
- **Subrogation Questionnaire:** Investigating 3rd party liability.

## Data Visible After Verification

Shows the issuer domain (`uhc.com`, `aetna.com`) and claim status.

**Status Indications:**
- **Processed** — Data matches the carrier's final adjudication.
- **In-Appeal** — Patient has formally challenged the calculation.
- **Reversed** — Claim was re-processed; this EOB is void.
- **Denied** — Payment rejected (reason provided).

## Second-Party Use

The **Patient** benefits from verification.

**Billing Disputes:** Proving to a hospital's billing department that the insurance company *actually* allowed a 40% discount, preventing the hospital from "Balance Billing" the patient for the full amount. A verified EOB is much harder for a hospital to ignore than a standard PDF.

**Flexible Spending Accounts (FSA/HSA):** Providing verified proof of "Patient Responsibility" to an HSA administrator to release tax-free funds without manual review.

## Third-Party Use

**Healthcare Providers (Clinics)**
**Reconciliation:** Verifying that the EOB provided by the patient matches what the insurer claims to have paid, spotting "Paper Check" vs "Electronic" discrepancies.

**Secondary Insurers**
**COB (Coordination of Benefits):** When a patient has two insurance plans, the secondary plan needs to see the "Verified Primary EOB" to calculate their share accurately.

**Mortgage Lenders**
**Medical Debt Audit:** If a borrower has large medical bills, lenders can verify the "Patient Responsibility" EOBs to ensure the debt isn't being exaggerated or hasn't already been paid by insurance.

## Verification Architecture

**The "Phantom Bill" Fraud Problem**

- **Balance Billing:** Hospitals pretending they didn't receive an EOB or that the "Allowed Amount" was higher to collect more from the patient.
- **PDF Alteration:** Patients editing a $100 copay to read $1,000 to drain their HSA/FSA for cash.
- **Duplicate Claims:** Using an old EOB to claim reimbursement from two different insurance companies (e.g., personal and work policies).

**Issuer Types**

**Health Insurers:** (UHC, Anthem, Aetna, Cigna).
**TPA Administrators:** (For self-insured employer plans).
**Government Payers:** (Medicare / Medicaid).

**Privacy Salt:** Highly critical. EOBs contain sensitive clinical and financial data. The hash must be salted to prevent "Guess-and-Check" attacks.

## Competition vs. Patient Portals

| Feature | OCR-to-Hash | Insurance Portal (Login) | Paper EOB |
| :--- | :--- | :--- | :--- |
| **User Control** | **High.** Share one specific EOB. | **Low.** Giving portal access reveals *full* medical history. | **Medium.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Insurer. | **System-Bound.** | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** Works across all carriers. | **Siloed.** | **Universal.** |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires 2FA, login, navigation. | **N/A.** |

**Why OCR wins here:** Selective Privacy. A patient needs to prove a $160 debt to a hospital or lender without exposing that they also had a psychiatric visit or a high-cost medication listed elsewhere in their portal history. OCR-to-hash turns the **Static Statement** into a portable, private "Proof of Payment."
