---
title: "Airport Lounge Access Confirmations"
category: "Travel & Hospitality"
volume: "Large"
retention: "Visit + 1-3 years"
slug: "airport-lounge-access-confirmations"
tags: ["airport", "lounge", "priority-pass", "amex", "receipt", "travel", "expense"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #222; color: #fff; padding: 0;">
  <div style="background: #d4af37; color: #000; padding: 15px; text-align: center;">
    <h3 style="margin: 0;">PRIORITY PASS</h3>
    <div style="font-size: 0.9em;">VISIT CONFIRMATION</div>
  </div>

  <div style="padding: 30px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="font-size: 1.2em; font-weight: bold;">The Club at SJC A15</div>
      <div style="color: #ccc;">San Jose Int'l (SJC)</div>
    </div>

    <div style="font-size: 0.9em; line-height: 1.6; color: #eee; border-top: 1px dashed #555; border-bottom: 1px dashed #555; padding: 15px 0;">
      <p><strong>Member:</strong> <span data-bracket="start" data-for="lounge">]</span>JAMES BOND<br>
      <strong>Card Number:</strong> ************1234</p>

      <p><strong>Date:</strong> 10 OCT 2026<br>
      <strong>Time In:</strong> 14:30 PM</p>

      <p><strong>Guests:</strong> 2<br>
      <strong>Visit ID:</strong> 9988776655</p>

      <div style="margin-top: 15px; padding: 10px; background: #333; border-radius: 4px;">
        <div style="display: flex; justify-content: space-between;">
          <div>Guest Fee (x2):</div>
          <div>$ 64.00</div>
        </div>
        <div style="display: flex; justify-content: space-between; font-weight: bold; margin-top: 5px; color: #d4af37;">
          <div>TOTAL CHARGED:</div>
          <div>$ 64.00</div>
        </div>
      </div>
    </div>

    <div data-verify-line="lounge" style="border-top: 1px dashed #555; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #aaa; text-align: center;"
      title="Demo only: Lounge network doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:prioritypass.com/visits/v/x9y8z7 <span data-bracket="end" data-for="lounge">]</span>
    </div>
  </div>
</div>

## Data Verified

Member name, lounge name/location, date/time of entry, number of guests, total fee charged, visit reference ID.

**Document Types:**
- **Visit Receipt:** Email/printout after entry.
- **Day Pass Purchase:** Receipt for buying a one-time pass (e.g., United Club one-time pass).
- **Membership Renewal:** Annual fee receipt.

## Data Visible After Verification

Shows the issuer domain (`prioritypass.com`, `loungekey.com`, `amex.com`) and transaction status.

**Status Indications:**
- **Valid** — Visit confirmed and billed.
- **Comped** — Visit verified but fee waived (important for expenses).
- **Void** — Transaction cancelled/refunded.

## Second-Party Use

The **Business Traveler** benefits from verification.

**Expense Reimbursement:** Proving that the $64 charge was for "Client Entertainment" (guests brought into the lounge) rather than personal indulgence.

**Billing Disputes:** Proving you didn't enter the lounge if charged erroneously (e.g., "I was at the gate, here is my boarding pass scan time").

## Third-Party Use

**Employers / Finance Teams**
**Policy Compliance:** Many companies pay for the employee's entry but *not* for guests (unless they are clients). A verified receipt showing "Guests: 2" allows Finance to ask "Who were these guests?" and verify client meetings.

**Tax Authorities**
**Deductibility:** Lounge access can be a business expense, but "lavish or extravagant" entertainment is scrutinized. Verified receipts provide the audit trail needed.

**Project Clients**
**Re-billing:** If a consultant charges lounge access to a client project, the client demands proof. Verified receipts prevent "padding" the invoice with personal relaxation costs.

## Verification Architecture

**The "Phantom Guest" Fraud Problem**

- **Padding Expenses:** Changing "Guests: 0" to "Guests: 2" on a PDF receipt to claim an extra $64 reimbursement.
- **Fake Receipts:** Using a template to create a lounge receipt for a trip where the traveler actually sat at the gate.

**Issuer Types**

**Networks:** (Priority Pass, LoungeKey, DragonPass)
**Airlines:** (Admirals Club, SkyClub, United Club)
**Credit Cards:** (Amex Centurion)

## Competition vs. Credit Card Statements

| Feature | OCR-to-Hash | Credit Card Statement |
| :--- | :--- | :--- |
| **Guest Detail** | **High.** Shows "Guests: 2". | **None.** Just shows "$64.00". |
| **Location** | **Exact.** "The Club at SJC". | **Vague.** "PRIORITY PASS HONG KONG". |
| **Time** | **Exact.** Proves you were there during the delay. | **Date Only.** |

**Why OCR wins here:** Context. A credit card charge is just a number. A verified lounge receipt proves *who* was with you and *where* you were, turning a generic charge into a justifiable business expense.
