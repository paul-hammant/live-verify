---
title: "Auto Insurance Declarations Pages"
category: "Personal Lines Insurance"
volume: "Medium"
retention: "Policy term + 7 years (claims)"
slug: "auto-insurance-policies"
tags: ["auto", "insurance", "policies", "personal", "lines", "dec-page"]
---

## What is a Declarations Page?

An insurance policy can be 50 pages of legal jargon. The **Declarations Page** (or "Dec Page") is the one-page summary that actually matters. It lists:
1.  **Limits:** How much the company will pay (e.g., $100k/$300k).
2.  **Deductibles:** How much you pay out of pocket ($500).
3.  **Drivers:** Exactly who is covered.

Lenders (for car loans) and landlords often require a copy of the Dec Page. Fraudsters often "Photoshopping" these pages to show higher coverage limits than they actually have to win contracts or satisfy loan requirements.

<div style="max-width: 600px; margin: 24px auto; font-family: Arial, sans-serif; border: 1px solid #333; background: #fff; padding: 30px;">
  <div style="display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px;">
    <div style="font-weight: bold; font-size: 1.2em;">PROGRESSIVE</div>
    <div style="text-align: right; font-size: 0.8em;">POLICY DECLARATIONS<br>Renewal: Mar 15, 2026</div>
  </div>

  <div style="font-size: 0.9em; line-height: 1.4;">
    <p><strong>Named Insured:</strong> <span data-bracket="start" data-for="autodec">]</span>John Doe<br>
    456 Oak Lane, Austin, TX 78701</p>

    <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
      <tr style="background: #eee;">
        <th style="text-align: left; padding: 5px;">Coverage</th>
        <th style="text-align: right; padding: 5px;">Limits</th>
      </tr>
      <tr>
        <td style="padding: 5px;">Bodily Injury Liability</td>
        <td style="text-align: right; padding: 5px;">$ 250,000 / $ 500,000</td>
      </tr>
      <tr>
        <td style="padding: 5px;">Property Damage</td>
        <td style="text-align: right; padding: 5px;">$ 100,000</td>
      </tr>
      <tr>
        <td style="padding: 5px;">Collision Deductible</td>
        <td style="text-align: right; padding: 5px;">$ 500</td>
      </tr>
    </table>

    <p><strong>Vehicle:</strong> 2024 Ford F-150 (VIN ...9922)</p>
  </div>

  <div data-verify-line="autodec" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;">
    verify:progressive.com/v/dec/998877 <span data-bracket="end" data-for="autodec">]</span>
  </div>
</div>

## Data Verified

Named insured, policy limits, deductibles, VIN, effective dates, premium amount, lienholder name.

## Data Visible After Verification

Shows the issuer domain (`progressive.com`) and the policy status.

**Status Indications:**
- **Active** — Policy is current.
- **Cancelled** — Policy terminated.
- **Pending** — Renewal in process.

## Second-Party Use

The **Policyholder** benefits from verification.
- **Loan Compliance:** Proving to a bank that they have the required "Full Coverage" for their car loan.
- **Job Requirements:** Gig workers (Uber/DoorDash) proving they have the correct insurance tier.

## Third-Party Use

**Lenders (Auto Finance)**
**Collateral Protection:** Banks can scan the Dec Page provided by the borrower to ensure the "Loss Payee" is correctly listed and the deductibles aren't too high.

**Attorneys (Personal Injury)**
**Demand Letters:** When an accident happens, lawyers need to know the *true* policy limits. Verification prevents "Ghost Limits" fraud where a driver claims to have $1M in coverage but only has the state minimum.

## Competition vs. ACORD Certificates

| Feature | OCR-to-Hash | ACORD 25 (Standard) |
| :--- | :--- | :--- |
| **Trust** | **Cryptographic.** Bound to insurer. | **Visual.** Prone to easy editing. |
| **Speed** | **Instant.** Scan and verify. | **Slow.** Requires calling the broker. |
| **Integrity** | **Binds Content.** | **Binds Nothing.** Just a template. |

**Why OCR wins here:**
The Dec Page is the source of truth. ACORD forms are just summaries written by brokers. OCR-to-hash allows the **Source Document** to be verified directly against the **Carrier**, cutting out the middleman and the potential for "Summary Errors."

