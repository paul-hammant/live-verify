---
title: "Airline Refund Confirmations"
category: "Travel & Hospitality"
volume: "Large"
retention: "Refund + 3-7 years (financial audit)"
slug: "airline-refund-confirmations"
tags: ["airline", "refund", "credit", "memo", "travel", "finance", "audit"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 30px;">
  <div style="border-bottom: 2px solid #d32f2f; padding-bottom: 10px; margin-bottom: 20px;">
    <div style="font-weight: bold; font-size: 1.2em; color: #d32f2f;">LUFTHANSA</div>
    <div style="font-size: 0.9em;">Passenger Receipt - REFUND</div>
  </div>

  <div style="font-size: 0.9em; line-height: 1.5; color: #333;">
    <p><strong>Passenger:</strong> <span data-bracket="start" data-for="refund">]</span>HANS MULLER<br>
    <strong>Original Ticket:</strong> 220-1234567890<br>
    <strong>Refund Document:</strong> 220-9988776655</p>

    <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
      <tr>
        <td style="padding: 5px 0;">Base Fare Refund:</td>
        <td style="text-align: right;">EUR 2,500.00</td>
      </tr>
      <tr>
        <td style="padding: 5px 0;">Taxes/Fees Refund:</td>
        <td style="text-align: right;">EUR 450.00</td>
      </tr>
      <tr>
        <td style="padding: 5px 0;">Cancellation Penalty:</td>
        <td style="text-align: right;">- EUR 200.00</td>
      </tr>
      <tr style="border-top: 1px solid #000; font-weight: bold;">
        <td style="padding: 5px 0;">TOTAL REFUND:</td>
        <td style="text-align: right;">EUR 2,750.00</td>
      </tr>
    </table>

    <p style="margin-top: 20px;"><strong>Form of Payment:</strong><br>
    Credited to Mastercard ending 5544<br>
    Date: 20 March 2026</p>
  </div>

  <div data-verify-line="refund" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Airline doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:lufthansa.com/refunds/v/x9y8z7 <span data-bracket="end" data-for="refund">]</span>
  </div>
</div>

## Data Verified

Passenger name, original ticket number, refund document number (Credit Memo), refund amount, currency, penalty applied, original form of payment credited, date processed.

**Document Types:**
- **Passenger Receipt (Refund):** Standard notification to passenger.
- **Agency Credit Memo (ACM):** Issued to travel agents.
- **Electronic Miscellaneous Document (EMD):** For ancillary refunds.

## Data Visible After Verification

Shows the issuer domain (`lufthansa.com`) and refund status.

**Status Indications:**
- **Refunded** — Funds released to payment processor.
- **Pending** — Approved but not yet transmitted.
- **Reversed** — Refund cancellation (e.g., if passenger decided to keep the ticket).

## Second-Party Use

The **Passenger** or **Travel Agent** benefits from verification.

**Chargeback Defense:** Proving to a credit card company that a refund was *not* issued yet (or was insufficient), justifying a dispute.

**Reimbursement Correction:** Proving to an employer exactly how much was refunded so the correct amount can be returned to the company.

## Third-Party Use

**Corporate Finance / Audit**
**"Buy and Cancel" Fraud:** An employee buys a refundable Business Class ticket ($5k), expenses it, gets reimbursed. Then they cancel the ticket, get the refund to their personal card. The company is out $5k.
**Solution:** Auditors require verification of the ticket status. If the status is "REFUNDED" or "VOID," the employee must repay the company.

**Travel Management Companies (TMCs)**
**Commission Reconciliation:** Ensuring the airline refunded the correct amount including/excluding agent commissions.

**Tax Authorities**
**VAT Reclamation:** If a ticket was refunded, the input VAT cannot be claimed. Verification ensures tax filings match reality.

## Verification Architecture

**The "Phantom Ticket" Fraud Problem**

- **Photoshop:** Taking a real receipt for a flown flight and editing it to look like a refund (or vice versa).
- **Hidden Refunds:** Employees banking on the fact that Finance doesn't have visibility into their personal credit card refunds.

**Issuer Types**

**Airlines:** (Lufthansa, Air France, Emirates, etc.)
**IATA BSP:** (Bank Settlement Plan) which processes agent refunds.

## Competition vs. Credit Card Statements

| Feature | OCR-to-Hash | Credit Card Statement |
| :--- | :--- | :--- |
| **Detail** | **High.** Shows breakdown of tax vs fare vs penalty. | **Low.** Just shows "LUFTHANSA CR EUR 2750". |
| **Privacy** | **High.** Reveals only this transaction. | **Low.** Employee must share full bank statement (revealing personal spending) to prove the refund. |
| **Timeliness** | **Instant.** Available as soon as airline processes. | **Slow.** Refunds can take 3-10 days to appear on statements. |

**Why OCR wins here:** Privacy. Employees hate sharing their personal bank statements with Finance to prove a negative (or a positive). A verified document from the airline allows them to prove the refund details without exposing their entire financial life.
