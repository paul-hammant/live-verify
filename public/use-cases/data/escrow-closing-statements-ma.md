---
title: "M&A Settlement Statements"
category: "Business & Commerce"
volume: "Small"
retention: "Permanent (transaction record)"
slug: "escrow-closing-statements-ma"
tags: ["mergers-and-acquisitions", "escrow", "settlement-statement", "closing-packet", "corporate-finance", "dispute-resolution"]
---

## What is an M&A Settlement Statement?

When one company buys another, millions of dollars move through an **Escrow Agent**. The **Settlement Statement** is the final "Math Sheet" that everyone signs.

It lists:
1.  **The Purchase Price:** (e.g., $100,000,000).
2.  **The Holdback:** Money kept in escrow for a year to cover hidden debts.
3.  **The Payouts:** Exactly how much goes to each shareholder and lawyer.

In high-stakes deals, fraudsters (or disgruntled partners) often "Edit" the PDF statement to hide secret fees or to trick a bank into believing a deal was larger than it actually was. Verified hashes turn these private legal papers into an un-erasable proof of the deal's final math.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', serif; border: 1px solid #000; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
    <div style="font-weight: bold; font-size: 1.2em;">J.P. MORGAN ESCROW SERVICES</div>
    <div style="font-size: 0.9em;">FINAL SETTLEMENT STATEMENT</div>
  </div>

  <div style="font-size: 0.9em; line-height: 1.5; color: #333;">
    <p><strong>Deal:</strong> Project Bluebird (Acquisition of Tech-Startup, Inc.)</p>
    
    <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
      <tr>
        <td style="padding: 5px 0;">Gross Purchase Price</td>
        <td style="text-align: right; font-weight: bold;"><span data-bracket="start" data-for="ma">]</span>$ 50,000,000.00</td>
      </tr>
      <tr>
        <td style="padding: 5px 0; color: #c62828;">Indemnity Holdback (12 Months)</td>
        <td style="text-align: right; color: #c62828;">-$ 5,000,000.00</td>
      </tr>
      <tr>
        <td style="padding: 5px 0; color: #c62828;">Legal & Advisory Fees</td>
        <td style="text-align: right; color: #c62828;">-$ 750,000.00</td>
      </tr>
      <tr style="border-top: 2px solid #000; font-weight: bold;">
        <td style="padding: 5px 0;">NET CASH TO SELLERS</td>
        <td style="text-align: right;">$ 44,250,000.00</td>
      </tr>
    </table>

    <p><strong>Closing Date:</strong> March 15, 2026</p>
  </div>

  <div data-verify-line="ma" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;">
    verify:jpmorgan.com/escrow/v/BLUEBIRD-2026 <span data-bracket="end" data-for="ma">]</span>
  </div>
</div>

## Data Verified

Deal Name, Buyer/Seller entities, Gross Purchase Price, Holdback/Indemnity amounts, Working Capital adjustments, Net Payouts, Closing Date, Escrow Agent ID.

## Data Visible After Verification

Shows the issuer domain (`jpmorgan.com`, `citibank.com`) and current fund status.

**Status Indications:**
- **Settled** — All funds have been disbursed.
- **Holdback Active** — Funds are still being held in escrow.
- **Disputed** — An indemnity claim has been filed against the escrow.
- **Void** — Transaction cancelled post-signing.

## Second-Party Use

The **Selling Shareholders** benefit from verification.
- **Wealth Proof:** Proving to their personal bank that the $44M deposit was from a verified corporate acquisition, avoiding "Money Laundering" freezes.
- **Tax Accuracy:** Ensuring the IRS sees the verified "Net Payout" vs "Gross Price" to avoid over-paying capital gains tax.

## Third-Party Use

**Lenders (Acquisition Finance)**
**Funding Verification:** Ensuring that the loan funds the bank provided were actually used for the acquisition and not diverted to secret offshore accounts.

**Future Buyers (Secondary M&A)**
**History Audit:** If the company is sold again 5 years later, the new buyer can verify the original "Purchase Price" and "Holdback Release" terms from the digital hash.

## Competition vs. Virtual Data Rooms (VDR)

| Feature | OCR-to-Hash | VDR (Intralinks / Merrill) | Scanned PDF |
| :--- | :--- | :--- | :--- |
| **User Access** | **Universal.** Share with any tax auditor. | **Restricted.** Access usually revoked after 90 days. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Bank. | **System-Bound.** | **Zero.** Easily forged. |
| **Permanence** | **Permanent.** Binds the *text* forever. | **Temporary.** Portals are deal-specific. | **Durable.** |

**Why OCR wins here:**
The "Post-Deal Gap." Three years after a deal closes, the VDR is gone and the lawyers have moved on. When an IRS auditor or a new buyer asks for proof, the **Static PDF** is all that's left. OCR-to-hash turns that PDF into a permanent, verifiable "Source of Truth."

