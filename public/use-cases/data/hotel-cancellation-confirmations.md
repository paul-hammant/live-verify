---
title: "Hotel Cancellation & Refund Receipts"
category: "Travel & Hospitality"
volume: "Very Large"
retention: "Cancellation Date + 3-7 years"
slug: "hotel-cancellation-confirmations"
tags: ["hotel-cancellation", "refund-receipt", "travel-expense", "hospitality", "booking-dispute", "expense-fraud", "travel-insurance"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 2px solid #a3b18a; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
  <div style="text-align: center; border-bottom: 1px solid #a3b18a; padding-bottom: 10px; margin-bottom: 25px;">
    <div style="font-weight: bold; font-size: 1.4em; color: #3a5a40;">THE GRAND HOTEL - PARIS</div>
    <div style="font-size: 0.85em; color: #588157; margin-top: 5px;">OFFICIAL CANCELLATION NOTICE</div>
  </div>

  <div style="font-size: 1em; line-height: 1.6; color: #333; text-align: justify;">
    <p>This document confirms the cancellation of your reservation. A refund has been processed to your original payment method.</p>

    <div style="margin: 20px 0; background: #f9f9f9; padding: 15px; border: 1px solid #eee; font-size: 0.95em;">
      <strong>Guest:</strong> <span data-bracket="start" data-for="hotel-cancel">]</span>Madame E. Dubois<br>
      <strong>Booking Ref:</strong> GHP-47291-ED<br>
      <strong>Refund Amount:</strong> € 1,200.00
    </div>

    <p><strong>Cancellation Date:</strong> June 28, 2025<br>
    <strong>Policy:</strong> Free cancellation (48h prior to arrival).<br>
    <strong>Status:</strong> REFUNDED & CLOSED</p>
  </div>

  <div style="margin-top: 40px; text-align: right;">
    <div style="border-top: 1px solid #000; width: 200px; display: inline-block; padding-top: 5px; font-size: 0.9em; color: #777;">Reservations Manager</div>
  </div>

  <div data-verify-line="hotel-cancel" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: The Grand Hotel doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:grandhotelparis.com/v/GHP-47291 <span data-bracket="end" data-for="hotel-cancel">]</span>
  </div>
</div>

## Data Verified

Guest name, booking reference ID, original stay dates, cancellation timestamp, refund amount, refund method, cancellation fee (if any), policy terms (Non-refundable vs Free), issuing hotel/OTA name.

**Document Types:**
- **Cancellation Confirmation:** Proving the room was released.
- **Refund Receipt:** Proving the cash was sent back to the card.
- **Voucher / Credit Note:** For non-refundable bookings.
- **No-Show Waiver:** (Linked hash) proving the hotel waived the fee.

## Data Visible After Verification

Shows the issuer domain (`marriott.com`, `booking.com`) and current status.

**Status Indications:**
- **Refunded** — Funds returned to the original payment method.
- **Credit Active** — Refund issued as a travel voucher.
- **No Refund Due** — Cancellation outside the free window.
- **Disputed** — Refund currently under chargeback or litigation.

## Second-Party Use

The **Guest (Traveler)** benefits from verification.

**Expense Reimbursement:** Proving to an employer's finance department that a €1,200 charge was actually refunded. This prevents "Double-Dipping" fraud where an employee pockets the refund while still claiming the original expense.

**Chargeback Defense:** If a bank mistakenly denies a refund, the traveler has a verified, non-alterable proof of the hotel's promise to pay.

## Third-Party Use

**Corporate Finance Teams**
**Audit Integrity:** Instantly verifying thousands of cancellation receipts. OCR-to-hash allows systems like SAP Concur to automatically flag "Ghost Refunds" where an employee provides a fake PDF to hide a personal credit.

**Travel Insurers**
**Claim Adjudication:** Verifying the "Non-Refundable" status of a booking before paying out a trip interruption claim. If the hotel already issued a verified refund, the insurer avoids an overpayment.

**Banks / Credit Card Networks**
**Fraud Investigation:** Verifying the authenticity of a refund receipt provided by a merchant during a dispute.

## Verification Architecture

**The "Ghost Refund" Fraud Problem**

- **Refund Inflation:** Editing a €100 refund to read €1,000 to trick an employer into believing a larger credit was applied.
- **Date Alteration:** Changing a "Late Cancellation" (with fees) to look like an "Early Cancellation" (no fees) to defraud the hotel.
- **Fabricated Confirmations:** Using a template to create a fake cancellation for a trip that was never taken, to claim "Trip Interruption" money from an insurer.

**Issuer Types**

**Hotel Chains:** (Marriott, Hilton, Accor).
**Online Travel Agencies (OTAs):** (Booking.com, Expedia).
**Global Distribution Systems (GDS):** (Amadeus, Sabre).

## Competition vs. In-App Notifications

| Feature | OCR-to-Hash | App Notification | Scanned PDF / Email |
| :--- | :--- | :--- | :--- |
| **User Privacy** | **High.** Share only the *Cancellation*. | **Low.** App access reveals *full* stay history. | **Vulnerable.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Hotel. | **System-Bound.** | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** Works for any insurer/employer. | **Zero.** Insurers don't have logins to your Hilton app. | **Universal.** |
| **Audit-ability** | **High.** Creates a digital audit trail. | **None.** For external parties. | **Low.** |

**Why OCR wins here:** The "External Audit." Hotels and travelers exist in different financial ecosystems than their employers and insurers. They don't all share the same API. OCR-to-hash turns the **Static Confirmation** into a portable, trusted artifact that bridges the gap between the hospitality industry and the world of corporate finance.
