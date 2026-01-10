---
title: "Cruise Final Folios and Statements"
category: "Travel & Hospitality"
volume: "Large"
retention: "Voyage + 3-7 years (expense)"
slug: "cruise-final-folios"
tags: ["cruise", "folio", "onboard-account", "travel-expense", "vacation-receipt", "carnival", "royal-caribbean"]
furtherDerivations: 1
---

## What is a Cruise Folio?

When you disembark from a cruise ship, you receive a **Final Guest Folio**. It is a detailed list of every dollar you spent onboard: from the "Business Internet Package" to the "Midnight Margaritas."

For business travelers, the "Folio" is a nightmare to expense. They must "Scrub" the personal fun (drinks/spa) from the legitimate business costs (internet/conference fees).

Fraud happens when employees edit their folio to hide personal spending or to inflate business costs. Verified hashes allow a company's finance department to see the **un-altered line items**, ensuring that the company only pays for the work-related parts of the trip.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #1a237e; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;" verifiable-text="start" data-for="cruise"><span>[</span>ROYAL CARIBBEAN INTERNATIONAL</div>
      <div style="font-size: 0.8em;">Final Guest Folio - <em>Wonder of the Seas</em></div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Folio #: 99228877-X</div>
    </div>
  </div>
<div style="padding: 25px;">
    <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 20px; color: #555;">
      <div>
        <strong>Guest:</strong> SARAH J. DOE<br>
        <strong>Stateroom:</strong> 12504 (Deck 12)
      </div>
      <div style="text-align: right;">
        <strong>Voyage Dates:</strong> Mar 08 - Mar 15, 2026<br>
        <strong>Reservation:</strong> L7XK9B
      </div>
    </div>
<table style="width: 100%; border-collapse: collapse; font-size: 0.85em;">
      <tr style="border-bottom: 2px solid #1a237e; background: #f5f5f5;">
        <th style="padding: 5px; text-align: left;">Description</th>
        <th style="padding: 5px; text-align: right;">Amount</th>
      </tr>
      <tr>
        <td style="padding: 5px; border-bottom: 1px solid #eee;">Internet Package - VOOM (Unlimited)</td>
        <td style="text-align: right; padding: 5px;">$ 142.50</td>
      </tr>
      <tr>
        <td style="padding: 5px; border-bottom: 1px solid #eee;">Onboard Gratuities (Pre-paid)</td>
        <td style="text-align: right; padding: 5px;">$ 112.00</td>
      </tr>
      <tr>
        <td style="padding: 5px; border-bottom: 1px solid #eee;">Chops Grille (Specialty Dining)</td>
        <td style="text-align: right; padding: 5px;">$ 55.00</td>
      </tr>
      <tr style="font-weight: bold; font-size: 1.1em;">
        <td style="padding: 5px;">TOTAL ONBOARD CHARGES:</td>
        <td style="text-align: right; padding: 5px;">$ 309.50</td>
      </tr>
    </table>
<p style="margin-top: 20px; font-size: 0.8em; color: #555; font-style: italic;">
      This statement reflects all settled charges as of the date of disembarkation.
    </p>
<div data-verify-line="cruise" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Royal Caribbean doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:royalcaribbean.com/folios/v/99228877 <span verifiable-text="end" data-for="cruise">]</span>
    </div>
  </div>
</div>

## Data Verified

Passenger name, reservation ID, ship name, voyage dates, stateroom number, itemized charges (Internet, Gratuities, Drinks, Excursions), total settled amount, payment method (last 4 digits).

**Document Types:**
- **Final Guest Folio:** Delivered under the door on the last morning.
- **Interim Statement:** For mid-cruise budget checks.
- **Shore Excursion Receipt:** Proving participation in a specific tour.
- **VAT / Tax Invoice:** For European cruises requiring tax documentation.

## Data Visible After Verification

Shows the issuer domain (`royalcaribbean.com`, `carnival.com`) and folio status.

**Status Indications:**
- **Settled** — Account paid in full; disembarkation authorized.
- **Refunded** — A credit was issued post-cruise (e.g., for a missed port).
- **Disputed** — Passenger has formally challenged a charge.
- **Amended** — A revised folio exists (e.g., after a post-cruise correction).

## Second-Party Use

The **Cruise Guest** benefits from verification.

**Business Expense Reimbursement:** Proving to an employer that the $142.50 charge for "Internet Package" was a verified business cost and not a series of cocktails. Verification separates "Work Expenses" from "Personal Luxury" on a complex multi-page folio.

**Tax Compliance:** Differentiating between non-deductible personal travel and deductible business components (e.g., a "Seminar at Sea" registration fee) using verified, non-alterable line items.

## Third-Party Use

**Corporate Expense Platforms (SAP Concur / Expensify)**
**Automatic Audit:** The platform can scan the folio hash to instantly validate line items against the cruise line's official ledger, flagging "Photoshopped" upgrades or deleted personal charges.

**Travel Insurers**
**Claim Substantiation:** If a passenger falls ill and needs to prove they didn't consume their "Pre-paid Excursions," the verified folio provides proof of credit or lack thereof from the cruise line.

**Banks (Credit Card Disputes)**
**Resolution:** Instantly verifying the "Final Settled Amount" during a "Double-Charge" dispute, bypassing the 30-day manual evidence cycle.

## Verification Architecture

**The "Folio Scrubbing" Fraud Problem**

- **Personal Charge Deletion:** Employees editing their cruise folio to "delete" the Casino and Bar charges before sending it to Finance for reimbursement of the Internet and Gratuities.
- **Fabricated Credits:** Adding a fake "Onboard Credit" to a receipt to get cash back from an insurance claim.
- **Reservation Theft:** Using a template to create a fake folio for a trip the traveler never actually took to claim business travel deductions.

**Issuer Types**

**Cruise Lines:** (Royal Caribbean, Carnival, NCL, MSC).
**River Cruise Operators:** (Viking, AmaWaterways).
**Onboard Payment Systems:** (e.g., OceanMedallion).

## Competition vs. Credit Card Statements

| Feature | OCR-to-Hash | Credit Card Statement | Scanned PDF Folio |
| :--- | :--- | :--- | :--- |
| **Granularity** | **High.** Shows specific items (Wifi vs Alcohol). | **Zero.** Just shows "CARNIVAL CRUISES $1,200". | **High.** But untrusted. |
| **Integrity** | **Cryptographic.** Binds every line item. | **High.** But lacks detail. | **Zero.** Easily edited. |
| **Privacy** | **Selective.** Share only the verified extract. | **Low.** Exposes all other personal spending on the card. | **Vulnerable.** |
| **Freshness** | **Instant.** Verified at disembarkation. | **Laggy.** Charges often aggregate at the end. | **Static.** |

**Why OCR wins here:** The "Scrubbing" problem. Corporate finance departments hate cruise folios because they are 10 pages long and full of personal "fun" spending. OCR-to-hash allows an employee to provide a **Verified Extract** of just the business items, giving the company 100% trust without the employee needing to share their "Bar Tab" with their boss.
