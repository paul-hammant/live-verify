---
title: "Aggregate Deductible and Retrospective Rating Documentation"
category: "Insurance Claims & Operations"
volume: "Small"
retention: "Policy term + 10 years"
slug: "aggregate-deductible-retrospective"
tags: ["aggregate", "deductible", "retrospective", "insurance", "risk", "management", "premium"]
derivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #000; background: #fff; padding: 0;">
  <div style="background: #000; color: #fff; padding: 15px; text-align: right;">
    <h3 style="margin: 0;">PREMIUM ADJUSTMENT STATEMENT</h3>
    <div style="font-size: 0.8em;">CONFIDENTIAL</div>
  </div>

  <div style="padding: 30px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
      <div>
        <strong>Insurer:</strong><br>
        ACE American Insurance Co.<br>
        123 Market St, Philadelphia, PA
      </div>
      <div style="text-align: right;">
        <strong>Insured:</strong><br>
        <span data-bracket="start" data-for="retro">]</span>MegaCorp Logistics, Inc.<br>
        Policy No: WC-9922-88<br>
        Adjustment Period: 3rd (36 Months)
      </div>
    </div>

    <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
      <tr style="border-bottom: 2px solid #000;">
        <th style="text-align: left; padding: 5px;">Description</th>
        <th style="text-align: right; padding: 5px;">Amount</th>
      </tr>
      <tr>
        <td style="padding: 5px;">Standard Premium</td>
        <td style="text-align: right; padding: 5px;">$2,500,000</td>
      </tr>
      <tr>
        <td style="padding: 5px;">Incurred Losses (Paid + Reserved)</td>
        <td style="text-align: right; padding: 5px;">$1,850,000</td>
      </tr>
      <tr>
        <td style="padding: 5px;">Basic Premium Factor (0.25)</td>
        <td style="text-align: right; padding: 5px;">$625,000</td>
      </tr>
      <tr>
        <td style="padding: 5px;">Converted Losses (x 1.10)</td>
        <td style="text-align: right; padding: 5px;">$2,035,000</td>
      </tr>
      <tr>
        <td style="padding: 5px;"><strong>Retrospective Premium</strong></td>
        <td style="text-align: right; padding: 5px;"><strong>$2,660,000</strong></td>
      </tr>
      <tr style="border-top: 1px solid #ccc;">
        <td style="padding: 5px;">Previously Paid</td>
        <td style="text-align: right; padding: 5px;">$2,500,000</td>
      </tr>
      <tr style="border-top: 2px solid #000; font-weight: bold;">
        <td style="padding: 5px;">ADDITIONAL PREMIUM DUE</td>
        <td style="text-align: right; padding: 5px;">$160,000</td>
      </tr>
    </table>

    <div style="margin-top: 20px; font-size: 0.8em; color: #555;">
      * Subject to Aggregate Deductible Limit of $3,000,000.
    </div>

    <div data-verify-line="retro" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Insurer doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:chubb.com/retro/v/z8x7c6 <span data-bracket="end" data-for="retro">]</span>
    </div>
  </div>
</div>

## Data Verified

Insured name, policy number, adjustment period (1st, 2nd, 3rd, etc.), incurred loss amount, total retrospective premium, amount due/returned, aggregate limit status.

**Document Types:**
- **Retrospective Premium Adjustment:** The bill/refund calculation.
- **Loss Run Report:** Detailed list of claims supporting the calculation.
- **Collateral Adjustment Notice:** Demand for Letter of Credit increase.

## Data Visible After Verification

Shows the issuer domain (the Insurance Carrier) and the document validity.

**Status Indications:**
- **Valid** — Document matches the carrier's system of record.
- **Void** — Adjustment was recalculated (common in retro plans).
- **Disputed** — The insured has formally contested this calculation.

## Second-Party Use

The **Insured** (corporate risk manager) benefits from verification.

**Internal Audit:** Proving to the CFO that the $160,000 additional premium bill is legitimate and matches the carrier's official record, justifying the wire transfer.

**Collateral negotiation:** Proving to a bank (issuing a Letter of Credit) that the required collateral amount has decreased, allowing them to release tied-up capital.

## Third-Party Use

**New Insurers (Underwriters)**
**Loss History Verification:** When a company switches insurers, the new underwriter demands "Loss Runs" (5-year history). Companies often manipulate these PDF reports to hide bad claims and get cheaper rates. Verified documents prevent this fraud.

**Reinsurers**
**Treaty Compliance:** Reinsurers need to verify that the primary carrier is calculating retro premiums correctly according to the treaty terms.

**M&A Due Diligence**
**Liability Assessment:** In a corporate acquisition, the buyer needs to know if the target company has a "ticking time bomb" of retrospective premium adjustments waiting to be billed. Verified adjustment statements reveal the true liability.

## Verification Architecture

**The "Clean Loss Run" Fraud Problem**

- **Photoshop:** Editing the "Incurred Losses" column in a PDF loss run to make a bad year look good.
- **Omission:** Deleting pages of large claims from the report.
- **Fake Paid status:** Forging a document saying "All retro premiums paid" to avoid disclosing a liability during M&A.

**Issuer Types**

**Commercial Carriers:** (Chubb, Travelers, Zurich, AIG, etc.)
**Third Party Administrators (TPAs):** (Sedgwick, Gallagher Bassett) who handle claims and issue loss runs.

## Competition vs. Broker Portals

| Feature | OCR-to-Hash | Broker Portal (Marsh/Aon) |
| :--- | :--- | :--- |
| **Cross-Carrier** | **Universal.** Works for any carrier document. | **Siloed.** Portals usually only show data for *current* placements. Hard to get historical data from 5 years ago/different broker. |
| **M&A Access** | **Easy.** Seller sends verified PDFs to Data Room. Buyer verifies. | **Hard.** Buyer cannot access Seller's private broker portal without complex permissioning. |
| **Immutability** | **High.** Hash proves the document hasn't changed. | **Medium.** Portal data changes dynamically; hard to prove "what was the loss number on Dec 31?" |

**Why OCR wins here:** M&A transactions and underwriting submissions rely on **static documents** (snapshots in time) exchanged between parties who don't share system access. "Here is our loss run as of Jan 1." OCR-to-hash makes that static snapshot trustworthy without requiring the recipient to log in to the sender's insurance portal.
