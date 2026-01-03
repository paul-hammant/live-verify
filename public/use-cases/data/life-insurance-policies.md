---
title: "Individual Life Insurance Policies"
category: "Personal Lines Insurance"
volume: "Small"
retention: "Policy lifetime (50+ years)"
slug: "life-insurance-policies"
tags: ["life-insurance", "whole-life", "term-life", "beneficiary-designation", "cash-value", "financial-planning", "estate-asset", "insurance-policy"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 2px solid #000; background: #fff; padding: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); position: relative;">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 25px;">
    <div style="font-weight: bold; font-size: 1.4em; letter-spacing: 2px; color: #003366;">NEW YORK LIFE</div>
    <div style="font-size: 0.85em; color: #666; margin-top: 5px; text-transform: uppercase;">Custom Whole Life Insurance Policy</div>
  </div>

  <h3 style="text-align: center; text-transform: uppercase; margin-bottom: 25px;">Policy Schedule</h3>

  <div style="font-size: 1em; line-height: 1.6; color: #333; text-align: justify;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
      <div>
        <strong>Policy Number:</strong> 99228877-WL<br>
        <strong>Insured:</strong> <span data-bracket="start" data-for="life-pol">]</span><strong>JOHN JACOB DOE</strong>
      </div>
      <div style="text-align: right;">
        <strong>Date of Issue:</strong><br>
        March 15, 2026
      </div>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <tr style="border-bottom: 1px solid #000; background: #f9f9f9;">
        <th style="text-align: left; padding: 8px;">Description</th>
        <th style="text-align: right; padding: 8px;">Initial Amount</th>
      </tr>
      <tr>
        <td style="padding: 8px;">Face Amount (Death Benefit)</td>
        <td style="text-align: right;">$ 1,000,000.00</td>
      </tr>
      <tr>
        <td style="padding: 8px;">Cash Value (Year 10 Projection)</td>
        <td style="text-align: right;">$ 142,500.00</td>
      </tr>
      <tr>
        <td style="padding: 8px;">Base Annual Premium</td>
        <td style="text-align: right;">$ 4,200.00</td>
      </tr>
    </table>

    <p><strong>Primary Beneficiary:</strong> Mary Alice Jacob (Spouse)<br>
    <strong>Riders:</strong> Waiver of Premium, Accidental Death (Double Indemnity).</p>
  </div>

  <div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-style: italic;">Sarah Miller, Secretary</div>
    </div>
    <div style="text-align: right; width: 45%;">
      <div style="width: 80px; height: 80px; border: 2px solid #003366; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; color: #003366; font-weight: bold; text-align: center; margin-left: auto;">ESTABLISHED<br>1845</div>
    </div>
  </div>

  <div data-verify-line="life-pol" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: New York Life doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:newyorklife.com/policy/v/99228877 <span data-bracket="end" data-for="life-pol">]</span>
  </div>
</div>

## Data Verified

Insured name, policy number, face amount (Death Benefit), policy type (Whole/Term/Universal), cash value accumulation (if applicable), primary/contingent beneficiaries, base premium, effective date, issuing carrier, active riders (e.g., Waiver of Premium).

**Document Types:**
- **Policy Schedule (Declarations):** The 1-page primary summary.
- **Beneficiary Designation Form:** Proving who gets the payout.
- **Collateral Assignment:** Proving the policy is pledged to a bank.
- **Annual Performance Summary:** Showing cash value growth.

## Data Visible After Verification

Shows the issuer domain (`newyorklife.com`, `prudential.com`, `metlife.com`) and current policy standing.

**Status Indications:**
- **In Force** — Premium paid; coverage active.
- **Lapsed** — **ALERT:** Coverage terminated due to non-payment.
- **Paid-Up** — No further premiums required to maintain coverage.
- **Pledged** — Policy has a verified lien from a third-party lender.

## Second-Party Use

The **Policyholder (Insured)** benefits from verification.

**Collateralized Loans:** Proving to a bank that their "Whole Life" policy has a verified $142,000 cash value. This allows the owner to take a low-interest "Policy Loan" or use the insurance as collateral for a mortgage without waiting weeks for a manual "Verification of Coverage" form from the insurer.

**Estate Planning:** Providing a verified "Wealth Token" to an estate attorney or trust officer, ensuring the death benefit is accurately accounted for in the family's total assets.

## Third-Party Use

**Mortgage Lenders / Private Banks**
**Asset Integrity:** Verifying the existence and value of permanent life insurance. OCR-to-hash ensures the borrower hasn't "Edited" a $10,000 term policy to look like a $1M whole-life asset to inflate their net worth.

**Divorce / Settlement Attorneys**
**Valuation Proof:** Instantly verifying the "Cash Surrender Value" of a policy during asset division in a marital dissolution.

**Institutional Lenders**
**Lien Verification:** Checking if a policy being offered as collateral already has a verified "Assignment" to a different bank.

## Verification Architecture

**The "Phantom Policy" Fraud Problem**

- **Benefit Inflation:** Editing a $100,000 policy PDF to read $1,000,000 to trick a lender or business partner.
- **Lapse Concealment:** Showing an old "In Force" paper for a policy that lapsed 2 years ago.
- **Beneficiary Tampering:** Editing the beneficiary page to change the payout from a spouse to a secret creditor or a fraudster's account.

**Issuer Types**

**National Carriers:** (New York Life, Prudential, Northwestern Mutual).
**Mutual Companies:** (Where the policyholders own the firm).
**Fraternal Benefit Societies.**

**Privacy Salt:** Highly critical. Life insurance involves family health and massive wealth. The hash MUST be salted to prevent "Guess-and-Check" searches for people with high-value policies.

## Competition vs. MIB Group (Industry DB)

| Feature | OCR-to-Hash | MIB Group (Industry Exchange) | Scanned PDF |
| :--- | :--- | :--- | :--- |
| **User Access** | **Universal.** Policyholders and banks. | **Restricted.** Only for insurance companies. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Carrier. | **Data-Bound.** Trust the aggregator. | **Zero.** Easily forged. |
| **Retention** | **50+ Years.** Archival text. | **Ephemeral.** Records often age out. | **Durable.** |
| **Integrity** | **Cryptographic.** Binds the *Beneficiary*. | **Vague.** Often only shows "Coverage exists." | **Vulnerable.** |

**Why OCR wins here:** The "Lifetime" reality. Life insurance is a 50-year asset. Digital portals change every 5 years. OCR-to-hash turns the **Static Paper Policy** (which the owner keeps in a safe) into a permanent, verifiable financial link that survives the death of IT systems and the changing of brokers.