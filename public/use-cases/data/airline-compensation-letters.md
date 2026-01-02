---
title: "Airline Compensation Letters (EU261)"
category: "Travel & Hospitality"
volume: "Medium"
retention: "Compensation + 3-7 years"
slug: "airline-compensation-letters"
tags: ["airline", "compensation", "eu261", "delay", "cancellation", "insurance"]
---

## What is an Airline Compensation Letter?

Under regulations like **EU261** (Europe) or similar laws in Canada/UK, airlines must pay cash compensation (up to €600) for delays or cancellations within their control.

However, airlines often deny claims citing "Extraordinary Circumstances" (e.g., Weather, ATC strikes). When this happens, passengers need a formal **Determination Letter** to:
1.  **Claim Travel Insurance:** Insurers won't pay until the airline officially refuses.
2.  **Sue:** Small claims courts need proof of the airline's final position.

Verifying these letters prevents passengers from faking denials to defraud insurers ("Double Dipping").

<div style="max-width: 600px; margin: 24px auto; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; border: 1px solid #ccc; background: #fff; padding: 40px;">
  <div style="text-align: right; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.2em; color: #002244;">BRITISH AIRWAYS</div>
    <div style="font-size: 0.8em; color: #555;">Customer Relations</div>
  </div>

  <div style="margin-bottom: 30px;">
    <strong>Date:</strong> 15 March 2026<br>
    <strong>Ref:</strong> <span data-bracket="start" data-for="comp">]</span>BA-2026-998877<br>
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
      verify:ba.com/claims/v/x9y8z7 <span data-bracket="end" data-for="comp">]</span>
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
