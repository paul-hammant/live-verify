---
title: "Resort Fees and Mandatory Hotel Disclosures"
category: "Travel & Hospitality"
volume: "Large"
retention: "Stay + 3-7 years (statute of limitations / tax)"
slug: "resort-fees-mandatory-charges"
tags: ["hospitality", "hotel", "resort-fee", "consumer-protection", "ftc-compliance", "drip-pricing", "travel-fraud"]
furtherDerivations: 1
---

## What are Mandatory Resort Fee Disclosures?

In the hospitality industry, "Drip Pricing" is a major consumer protection issue. This occurs when a hotel advertises a $150 room rate, but then forces the guest to pay a mandatory $45 "Resort Fee" at check-in that was hidden or poorly disclosed.

Government regulators (like the FTC) now require these fees to be clearly disclosed at the time of booking. However, hotels sometimes "forget" to disclose them, or they present a "Disclosure Form" at the front desk that differs from the one agreed to online. Verified hashes bind the **Mandatory Fee Amounts and Included Services** to the hotel brand's domain (e.g., `mgmresorts.com` or `hilton.com`), providing an immutable record of the price agreement.

<div style="max-width: 500px; margin: 24px auto; font-family: 'Georgia', serif; border: 1px solid #999; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #1a237e; color: #fff; padding: 20px; text-align: center;">
    <div style="font-size: 1.4em; font-weight: bold; letter-spacing: 2px;">THE GRAND AZURE RESORT</div>
    <div style="font-size: 0.7em; opacity: 0.8; text-transform: uppercase; margin-top: 5px;">MANDATORY FEE DISCLOSURE & RECEIPT</div>
  </div>
<div style="padding: 25px; font-size: 0.9em; line-height: 1.5; color: #333;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
      <div>
        <strong>Guest:</strong> <span data-bracket="start" data-for="resort">[</span>JOHN DOE<br>
        <strong>Conf #:</strong> AZ-99228877
      </div>
      <div style="text-align: right;">
        <strong>Dates:</strong> 15-18 MAR 2026<br>
        <strong>Room:</strong> 1242 (King)
      </div>
    </div>
<p style="font-style: italic; color: #666; font-size: 0.85em;">
      In accordance with consumer protection laws, the following mandatory daily charges are included in your stay:
    </p>
<table style="width: 100%; margin: 15px 0; border-collapse: collapse;">
      <tr style="border-bottom: 1px solid #ccc;">
        <th style="text-align: left; padding: 8px;">Charge Description</th>
        <th style="text-align: right; padding: 8px;">Daily Amount</th>
      </tr>
      <tr>
        <td style="padding: 8px;">Mandatory Resort Fee (Wi-Fi, Pool, Gym)</td>
        <td style="text-align: right; padding: 8px;">$ 45.00</td>
      </tr>
      <tr>
        <td style="padding: 8px;">Local Tourism Assessment Tax</td>
        <td style="text-align: right; padding: 8px;">$ 12.50</td>
      </tr>
      <tr style="font-weight: bold; background: #f5f5f5;">
        <td style="padding: 8px;">TOTAL MANDATORY DAILY FEES:</td>
        <td style="text-align: right; padding: 8px;">$ 57.50</td>
      </tr>
    </table>
<div style="font-size: 0.75em; color: #777; margin-top: 15px;">
      Total mandatory fees for 3 nights: <strong>$ 172.50</strong>
    </div>
  </div>
<div style="padding: 20px; background: #f9f9f9; border-top: 1px solid #eee; text-align: center;">
    <div data-verify-line="resort" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #1a237e; font-weight: bold;"
      title="Demo only: Hotels don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:grandazure.com/fees/v/AZ99228877 <span data-bracket="end" data-for="resort">]</span>
    </div>
    <div style="font-size: 0.7em; color: #999; margin-top: 10px; font-style: italic;">
      Scan to verify mandatory fee disclosure authenticity and compliance status.
    </div>
  </div>
</div>

## Data Verified

Guest name, confirmation number, room type, stay dates, itemized mandatory fee amounts, total mandatory charge, disclosure timestamp, hotel ID.

**Document Types:**
- **Guest Folio (Bill):** The final receipt showing all charges.
- **Pre-Arrival Disclosure:** Emailed or on-screen proof of price.
- **Check-in Acknowledgment:** The paper signed at the front desk.

## Data Visible After Verification

Shows the issuer domain (`marriott.com`, `expedia.com`, `caesars.com`) and the pricing standing.

**Status Indications:**
- **Verified Disclosure** — Pricing matches the hotel's official rate-file.
- **Refunded** — **ALERT:** The resort fee was waived/refunded (important for expense claims).
- **Rate Mismatch** — **ALERT:** The paper bill does not match the online disclosure.
- **Void** — Reservation cancelled.

## Second-Party Use

The **Hotel Guest** benefits from verification.

**Dispute Resolution:** If a guest sees an unexpected $200 charge on their credit card after checkout, they can use the verified hash of their "Disclosure Receipt" to prove to their bank that the charge was never disclosed or authorized.

**Expense Reimbursement:** Proving to an employer that the "Resort Fee" was a mandatory condition of the stay and not an optional "Spa Purchase," ensuring the expense is fully reimbursed.

## Third-Party Use

**Credit Card Issuers (Banks)**
**Chargeback Adjudication:** When a customer disputes a hotel charge for "Unfair Pricing," the bank scans the hotel's verified disclosure. If the hash returns **"VERIFIED DISCLOSURE - $45/day,"** the bank can deny the chargeback instantly.

**Travel Management Companies (TMCs)**
**Compliance Auditing:** Ensuring that the hotel rates paid by their corporate clients match the negotiated "No Resort Fee" contracts. OCR-to-hash allows for automated, bulk auditing of thousands of guest folios.

**Consumer Protection Agencies (FTC / AG)**
**Enforcement Data:** Verifying patterns of non-disclosure by specific hotel chains using aggregated verified hashes from consumer complaints.

## Verification Architecture

**The "Drip Pricing" Fraud Problem**

- **Hidden Fee Insertion:** Adding a mandatory fee at the last step of checkout that wasn't in the initial quote.
- **Folio Alteration:** Changing a "Gym Fee" (optional) to a "Resort Fee" (mandatory) on the final bill to hide a policy violation.
- **Bait and Switch:** Offering a low rate on a third-party site but refusing to honor it without a "mandatory supplement" at check-in.

**Issuer Types**

**Hotel Property Management Systems (PMS).**
**Online Travel Agencies (OTAs) like Expedia/Booking.**
**Corporate Travel Portals.**

**Privacy Salt:** Essential. Guest names and stay dates are private. The hash must be salted to prevent "Guest Tracking" by unauthorized parties.

## Rationale

Resort fee verification brings "Price Transparency" to the final mile of travel. By turning the hotel bill into a verifiable digital bridge, it protects consumers from hidden charges and helps banks resolve disputes with cryptographic certainty.