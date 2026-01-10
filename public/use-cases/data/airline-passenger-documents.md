---
title: "Airline Ancillary Fee Receipts"
category: "Travel & Hospitality"
volume: "Very Large"
retention: "Flight + 1-3 years"
slug: "airline-passenger-documents"
tags: ["airline", "airport", "amex", "ancillary", "audit", "baggage", "business-class", "cancellation", "compensation", "credit", "delay", "eu261", "expense", "finance", "insurance", "lounge", "memo", "priority-pass", "receipt", "refund", "seat", "travel", "upgrade", "wifi"]
furtherDerivations: 5
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', monospace; border: 1px dashed #999; background: #fff; padding: 20px;">
  <div style="text-align: center; margin-bottom: 20px;">
    <strong verifiable-text="start" data-for="receipt">DELTA AIR LINES</strong><br>
    ELECTRONIC RECEIPT<br>
    ---------------------------------
  </div>
<div style="font-size: 0.9em; line-height: 1.4;">
    <p><strong>Passenger:</strong> <span>[</span>JOHN DOE<br>
    <strong>Ticket #:</strong> 006-2345678901<br>
    <strong>Date:</strong> 15MAR26</p>
<p><strong>Itinerary:</strong><br>
    DL123 JFK-LHR</p>
<p><strong>Ancillary Services:</strong></p>
    <table style="width: 100%; font-size: 1em;">
      <tr>
        <td>1st Checked Bag</td>
        <td style="text-align: right;">$ 35.00</td>
      </tr>
      <tr>
        <td>Comfort+ Upgrade</td>
        <td style="text-align: right;">$ 79.00</td>
      </tr>
      <tr>
        <td>In-Flight Wi-Fi</td>
        <td style="text-align: right;">$ 10.00</td>
      </tr>
      <tr>
        <td style="border-top: 1px dashed #000;"><strong>TOTAL PAID</strong></td>
        <td style="text-align: right; border-top: 1px dashed #000;"><strong>$ 124.00</strong></td>
      </tr>
    </table>
<p><strong>Payment:</strong><br>
    Visa ending in 1234<br>
    Auth: 998877</p>
  </div>
<div data-verify-line="receipt" style="border-top: 1px dashed #999; margin-top: 20px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Airline doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:delta.com/receipts/v/x9y8z7 <span verifiable-text="end" data-for="receipt">]</span>
  </div>
</div>

## Data Verified

Passenger name, ticket number, flight details, specific service types (baggage, seat, wifi, meal), fee amounts, total paid, payment method (last 4 digits).

**Document Types:**
- **Baggage Receipt:** Issued at check-in kiosk or drop desk.
- **Seat Upgrade Receipt:** Issued at gate or online.
- **In-Flight Purchase Receipt:** Emailed or printed for food/wifi.
- **Lounge Access Receipt:** Day pass purchase.

## Data Visible After Verification

Shows the issuer domain (`delta.com`) and the receipt details.

**Status Indications:**
- **Valid** — Receipt matches airline records.
- **Refunded** — The fee was refunded (e.g., if the bag was lost or wifi didn't work), invalidating the expense claim.
- **Void** — Transaction cancelled.

## Second-Party Use

The **Business Traveler** benefits from verification.

**Expense Reimbursement:** Proving to their employer that the $79 "Comfort+" charge was for a seat upgrade (policy compliant) and not for an in-flight cocktail (policy violation).

**Tax Deductions:** Self-employed individuals keeping rock-solid audit trails for business travel expenses.

## Third-Party Use

**Corporate Expense Platforms (Concur, Expensify)**
**Automatic Audit:** The platform can scan the receipt hash to confirm validity, flagging duplicates or fakes automatically. "Verified by Delta" adds a trust layer above standard OCR.

**Employers / Finance Teams**
**Fraud Detection:** Employees sometimes use "receipt generator" websites to create fake baggage receipts for $50/trip. Verification stops this immediately because the fake receipt won't exist in the airline's database.

**Tax Authorities (IRS/HMRC)**
**Audit Compliance:** Verifying that "travel expenses" were actually incurred and not just fabricated for deductions.

## Verification Architecture

**The "Fake Expense" Fraud Problem**

- **Receipt Generators:** Websites that generate realistic-looking receipts for any airline.
- **Double Dipping:** Submitting the same receipt to two different employers (e.g., for a consultant working two jobs).
- **Refund Fraud:** Buying a refundable ticket/service, printing the receipt, claiming the expense, then cancelling/refunding the service. Verification reveals the "Refunded" status.

**Issuer Types**

**Airlines:** (Delta, AA, United, BA, etc.)
**Service Providers:** (Gogo Inflight, Clear, LoungeBuddy)

## Competition vs. Corporate Cards

| Feature | OCR-to-Hash | Corporate Card Feed |
| :--- | :--- | :--- |
| **Granularity** | **High.** Shows exactly *what* was bought (Wifi vs Alcohol). | **Low.** Often just shows "DELTA AIR LINES $15.00". |
| **Coverage** | **Universal.** Works for personal cards used for business. | **Limited.** Only works if the employee uses the mandatory corporate card. |
| **Immediacy** | **Instant.** Scan receipt immediately. | **Laggy.** Card feeds can take days to sync. |
| **Cash/Kiosk** | **Yes.** Covers kiosk prints. | **No.** Misses cash or non-integrated payments. |

**Why OCR wins here:** While Level 3 credit card data tries to provide line-item detail, it is notoriously unreliable for travel ancillary fees. A verified receipt provides the definitive "Itemized" proof required by strict expense policies.


---

_[Content merged from: airline-compensation-letters]_


## What is an Airline Compensation Letter?

Under regulations like **EU261** (Europe) or similar laws in Canada/UK, airlines must pay cash compensation (up to €600) for delays or cancellations within their control.

However, airlines often deny claims citing "Extraordinary Circumstances" (e.g., Weather, ATC strikes). When this happens, passengers need a formal **Determination Letter** to:
1.  **Claim Travel Insurance:** Insurers won't pay until the airline officially refuses.
2.  **Sue:** Small claims courts need proof of the airline's final position.

Verifying these letters prevents passengers from faking denials to defraud insurers ("Double Dipping").

<div style="max-width: 600px; margin: 24px auto; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; border: 1px solid #ccc; background: #fff; padding: 40px;">
  <div style="text-align: right; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.2em; color: #002244;" verifiable-text="start" data-for="comp">BRITISH AIRWAYS</div>
    <div style="font-size: 0.8em; color: #555;">Customer Relations</div>
  </div>
<div style="margin-bottom: 30px;">
    <strong>Date:</strong> 15 March 2026<br>
    <strong>Ref:</strong> <span>[</span>BA-2026-998877<br>
    <strong>Passenger:</strong> Sarah Jones
  </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
    <p>Dear Ms. Jones,</p>
<p><strong>Re: Flight BA123 London to New York on 14 March 2026</strong></p>
<p>We are writing regarding your claim for compensation following the cancellation of the above flight.</p>
<p>Our records confirm that this cancellation was due to an operational issue within our control. Therefore, in accordance with EU Regulation 261/2004, we are pleased to confirm that you are entitled to compensation.</p>
<p><strong>Compensation Amount:</strong> € 600.00</p>
    <p><strong>Payment Status:</strong> Initiated via Bank Transfer</p>
<p>Please accept our apologies for the disruption to your journey.</p>
<p>Sincerely,</p>
    <p><em>Customer Relations Team</em><br>British Airways</p>
  </div>
<div data-verify-line="comp" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Airline doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:ba.com/claims/v/x9y8z7 <span verifiable-text="end" data-for="comp">]</span>
  </div>
</div>

## Data Verified

Passenger name, flight number, disruption date, claim reference number, decision (Approved/Denied), compensation amount, regulation cited (EU261, UK261, DOT), payment status.

**Document Types:**
- **Compensation Offer:** Letter confirming payout.
- **Denial Letter:** "Extraordinary Circumstances" rejection (needed for insurance).
- **Delay Verification:** Proof of delay duration (for employer/insurance).

## Data Visible After Verification

Shows the issuer domain (`ba.com`) and the claim status.

**Status Indications:**
- **Paid** — Compensation was issued.
- **Denied** — Claim rejected (reason provided, e.g., "Weather").
- **Pending** — Under review.

## Second-Party Use

The **Passenger** benefits from verification.

**Travel Insurance Claims:** Insurers often require a "denial letter" from the airline before they will pay out for trip interruption. A verified denial letter proves the airline refused to pay, unlocking the insurance payout.

**Employer Proof:** Proving to a boss that the missed meeting was indeed due to a flight cancellation and not oversleeping.

## Third-Party Use

**Travel Insurers**
**Double-Dipping Prevention:** Fraudsters claim €600 from the airline AND €600 from the insurer for the same delay. Verification allows the insurer to check: "Did the airline pay?" If the status is "Paid," the insurer reduces their payout accordingly.

**Claims Management Companies (e.g., AirHelp)**
**Automated Onboarding:** Instead of asking passengers to forward emails or scan PDFs that need manual review, the agency can scan the verification link to instantly ingest the claim details and validity.

**Small Claims Courts**
**Evidence:** In disputes, a verified letter from the airline admitting fault (or denying it for invalid reasons) is powerful evidence.

## Verification Architecture

**The "Fake Denial" Fraud Problem**

- **Fabricated Denials:** Creating a fake letter from the airline saying "We won't pay because of weather" to trick a travel insurer into paying out (when the airline actually WOULD have paid if asked).
- **Fake Approvals:** Creating a fake offer letter to show a claims agency to get them to take the case (or to borrow money against the expected payout).

**Issuer Types**

**Airlines:** (Ryanair, EasyJet, Lufthansa, etc.)
**ADR Bodies:** (Alternative Dispute Resolution entities like CEDR)

## Competition vs. Email / Portals

| Feature | OCR-to-Hash | Forwarded Email | Airline Portal |
| :--- | :--- | :--- | :--- |
| **Authenticity** | **Cryptographic.** Sender verified by domain. | **Weak.** Emails are easily edited/spoofed. | **High.** But requires login credentials. |
| **Sharing** | **Easy.** Send the link or paper to insurer. | **Messy.** Forwarding chains, PDF attachments. | **Hard.** Can't give insurer your airline password. |
| **Privacy** | **Selective.** Share only the specific letter. | **Low.** Email headers expose metadata. | **Low.** Portal access exposes full history. |

**Why OCR wins here:** It creates a portable, verifiable "Token of Truth" about a specific claim that can be handed to insurers, lawyers, or employers without sharing login credentials or relying on easily forged emails.


---

_[Content merged from: airline-refund-confirmations]_


<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 30px;">
  <div style="border-bottom: 2px solid #d32f2f; padding-bottom: 10px; margin-bottom: 20px;">
    <div style="font-weight: bold; font-size: 1.2em; color: #d32f2f;" verifiable-text="start" data-for="refund">LUFTHANSA</div>
    <div style="font-size: 0.9em;">Passenger Receipt - REFUND</div>
  </div>
<div style="font-size: 0.9em; line-height: 1.5; color: #333;">
    <p><strong>Passenger:</strong> <span>[</span>HANS MULLER<br>
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
      verify:lufthansa.com/refunds/v/x9y8z7 <span verifiable-text="end" data-for="refund">]</span>
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


---

_[Content merged from: airline-upgrade-confirmations]_


<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0;">
  <div style="background: #000040; color: #fff; padding: 20px; text-align: center;">
    <h3 style="margin: 0;" verifiable-text="start" data-for="upgrade">UNITED AIRLINES</h3>
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
      <p><strong>Passenger:</strong> <span>[</span>SARAH CONNOR</p>
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
      verify:united.com/receipts/v/x9y8z7 <span verifiable-text="end" data-for="upgrade">]</span>
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


---

_[Content merged from: airport-lounge-access-confirmations]_


<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #222; color: #fff; padding: 0;">
  <div style="background: #d4af37; color: #000; padding: 15px; text-align: center;">
    <h3 style="margin: 0;" verifiable-text="start" data-for="lounge">PRIORITY PASS</h3>
    <div style="font-size: 0.9em;">VISIT CONFIRMATION</div>
  </div>
<div style="padding: 30px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="font-size: 1.2em; font-weight: bold;">The Club at SJC A15</div>
      <div style="color: #ccc;">San Jose Int'l (SJC)</div>
    </div>
<div style="font-size: 0.9em; line-height: 1.6; color: #eee; border-top: 1px dashed #555; border-bottom: 1px dashed #555; padding: 15px 0;">
      <p><strong>Member:</strong> <span>[</span>JAMES BOND<br>
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
      verify:prioritypass.com/visits/v/x9y8z7 <span verifiable-text="end" data-for="lounge">]</span>
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
