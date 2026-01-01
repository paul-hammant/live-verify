---
title: "Airline Upgrade Confirmations"
category: "Travel & Hospitality"
volume: "Medium"
retention: "Flight + 1-3 years"
slug: "airline-upgrade-confirmations"
tags: ["airline", "upgrade", "receipt", "business-class", "expense", "travel"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0;">
  <div style="background: #000040; color: #fff; padding: 20px; text-align: center;">
    <h3 style="margin: 0;">UNITED AIRLINES</h3>
    <div style="font-size: 0.9em; margin-top: 5px;">UPGRADE CONFIRMATION</div>
  </div>

  <div style="padding: 30px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 0.9em;">
      <div>
        <strong>Confirmation:</strong> L7XK9B<br>
        <strong>Ticket:</strong> 016-29384756
      </div>
      <div style="text-align: right;">
        <strong>Date:</strong> 12 SEP 2026
      </div>
    </div>

    <div style="font-size: 1.1em; line-height: 1.5; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 20px; margin-bottom: 20px;">
      <p><strong>Passenger:</strong> <span data-bracket="start" data-for="upgrade">]</span>SARAH CONNOR</p>
      <p><strong>Flight:</strong> UA 926 (SFO to FRA)<br>
      <strong>Upgrade:</strong> Economy &rarr; Polaris Business</p>
      
      <p><strong>Payment Summary:</strong></p>
      <table style="width: 100%;">
        <tr>
          <td>Cash Co-Pay:</td>
          <td style="text-align: right;">$ 550.00</td>
        </tr>
        <tr>
          <td>Miles Redemeed:</td>
          <td style="text-align: right;">20,000 Miles</td>
        </tr>
      </table>
    </div>

    <div style="font-size: 0.9em; color: #555;">
      <strong>Upgrade Status:</strong> CONFIRMED<br>
      <strong>Seat:</strong> 12A
    </div>

    <div data-verify-line="upgrade" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Airline doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:united.com/receipts/v/x9y8z7 <span data-bracket="end" data-for="upgrade">]</span>
    </div>
  </div>
</div>

## Data Verified

Passenger name, original ticket number, confirmation code, flight details, from/to class of service, cash payment amount, miles redeemed, date of transaction.

**Document Types:**
- **Cash Upgrade Receipt:** Paid fully in cash/card at check-in.
- **Mileage Upgrade Award:** Receipt showing miles + co-pay.
- **Complimentary Upgrade Notice:** Elite status upgrade (usually $0 value).

## Data Visible After Verification

Shows the issuer domain (`united.com`) and the upgrade validity.

**Status Indications:**
- **Confirmed** — Upgrade was processed and paid.
- **Refunded** — Passenger cancelled or was downgraded (e.g., equipment swap).
- **Waitlisted** — Request made but not yet cleared (not a valid receipt for expense yet).

## Second-Party Use

The **Business Traveler** benefits from verification.

**Expense Justification:** Proving to an employer that the $550 charge was for a *policy-compliant* upgrade (e.g., "flights over 8 hours") and not an unauthorized splurge.

**Tax Records:** Differentiating between business expenses (the cash co-pay) and personal costs (using personal miles), which can be complex for tax deductions.

## Third-Party Use

**Corporate Finance / Auditors**
**Policy Compliance:** Companies often have strict rules: "We pay for Economy, you can upgrade with your own points." A receipt showing "$5,000" for a Business Class ticket looks suspicious. A verified receipt showing "Economy Fare + $0 Upgrade (Miles)" clarifies that the company only paid for the base fare.

**Project Clients**
**Billable Expenses:** Consultants billing travel to clients need indisputable proof of costs. Clients often reject "Business Class" invoices. A verified receipt showing the breakdown (Base Fare vs Upgrade) allows the consultant to bill the Base Fare to the client while absorbing the upgrade cost personally.

**Travel Management Companies (TMCs)**
**Spend Tracking:** Ensuring that "invisible" spend (upgrades bought directly from the airline app, bypassing the TMC) is captured in total travel cost reporting.

## Verification Architecture

**The "Fake Upgrade" Fraud Problem**

- **Photoshop:** Editing an Economy receipt to look like a Business Class ticket to claim a higher reimbursement.
- **Refund Schemes:** Buying a fully refundable First Class ticket, printing the receipt, expensing it, then refunding it and flying Economy. Verification reveals the "Refunded" status.

**Issuer Types**

**Airlines:** (United, American, Delta, Emirates, etc.)
**Upgrade Auctions:** (Plusgrade) third-party platforms used by many airlines for bidding on upgrades.

## Competition vs. Credit Card Statements

| Feature | OCR-to-Hash | Credit Card Statement |
| :--- | :--- | :--- |
| **Granularity** | **High.** Shows "Upgrade SFO-LHR" distinct from "Baggage". | **Low.** Just shows "UNITED AIRLINES $550". |
| **Context** | **Full.** Shows Class of Service (Economy -> Business). | **None.** No flight details or class info. |
| **Mileage Info** | **Yes.** Shows miles burned (crucial for value calculations). | **No.** Only shows cash. |

**Why OCR wins here:** Credit card statements are too vague for strict corporate travel policies. They prove *payment* but not *product*. A verified receipt proves exactly *what* was purchased, preventing policy violations disguised as generic airline charges.
