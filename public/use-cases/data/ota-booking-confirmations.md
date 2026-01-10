---
title: "OTA Booking Confirmations (Expedia, Booking.com)"
category: "Travel & Hospitality"
volume: "Very Large"
retention: "Travel + 1-3 years"
slug: "ota-booking-confirmations"
tags: ["ota", "booking-confirmation", "travel-logistics", "expedia", "booking-com", "itinerary-fraud", "travel-expense"]
furtherDerivations: 1
---

## What is an OTA Confirmation?

An **Online Travel Agency (OTA)** confirmation is the digital receipt issued when you book a flight, hotel, or car rental through a site like Expedia or Booking.com.

It is your "Central Itinerary." It proves:
1.  **Payment:** The price you paid (including taxes and fees).
2.  **Rights:** Which room type or flight class you are entitled to.
3.  **Status:** Whether the booking is "Confirmed" or "Pending."

**"Itinerary Padding"** is a common corporate fraud where employees "edit" their confirmation PDF to show a higher price (e.g., changing $150 to $250) or a "First Class" ticket when they actually flew "Economy." They then submit this to their company for reimbursement. Verified hashes bind the **Confirmation ID, Price, and Class of Service** to the OTA's domain.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #003580; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
  <div style="background: #003580; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.4em;" verifiable-text="start" data-for="ota">Booking.com</div>
      <div style="font-size: 0.8em; opacity: 0.8;">Official Confirmation Receipt</div>
    </div>
    <div style="font-size: 1.2em;">🏨</div>
  </div>
<div style="padding: 30px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 25px; font-size: 0.9em; color: #555;">
      <div>
        <strong>Guest:</strong> <span>[</span>SARAH JANE SMITH<br>
        <strong>Confirmation #:</strong> 9988776655
      </div>
      <div style="text-align: right;">
        <strong>Date:</strong> 15 MAR 2026<br>
        <strong>Status:</strong> CONFIRMED & PAID
      </div>
    </div>
<div style="background: #f0f4f8; padding: 15px; border: 1px solid #d1d9e6; margin-bottom: 20px;">
      <p style="font-weight: bold; margin-top: 0;">HOTEL EXCELSIOR - ZURICH</p>
      <table style="width: 100%; font-size: 0.9em;">
        <tr>
          <td>Check-in:</td>
          <td style="text-align: right;">Apr 10, 2026</td>
        </tr>
        <tr>
          <td>Check-out:</td>
          <td style="text-align: right;">Apr 15, 2026</td>
        </tr>
        <tr>
          <td>Room Type:</td>
          <td style="text-align: right;">Executive Suite (Non-Smoking)</td>
        </tr>
      </table>
    </div>
<table style="width: 100%; border-collapse: collapse; margin-bottom: 10px;">
      <tr>
        <td>Total Price (including VAT):</td>
        <td style="text-align: right; font-weight: bold; font-size: 1.2em;">CHF 1,450.00</td>
      </tr>
    </table>
<div data-verify-line="ota" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Booking.com doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:booking.com/v/9988776655 <span verifiable-text="end" data-for="ota">]</span>
    </div>
  </div>
</div>

## Data Verified

Passenger/Guest name, OTA Confirmation Number, Supplier Reference (PNR/Hotel ID), Total Price, Currency, Dates of travel, Class of Service (e.g., "Economy" vs "Business"), Cancellation policy terms, Issuing platform.

**Document Types:**
- **Booking Confirmation:** The primary PDF itinerary.
- **Payment Receipt:** Itemized tax invoice.
- **Cancellation Notice:** (Linked hash) proving a refund is due.
- **Boarding Pass:** (Linked hash) for airline segments.

## Data Visible After Verification

Shows the issuer domain (`booking.com`, `expedia.com`) and current reservation status.

**Status Indications:**
- **Confirmed/Paid** — Reservation is active and funds received.
- **Cancelled** — **ALERT:** The trip was voided (e.g., for expense fraud detection).
- **Checked-In** — Guest has arrived at the hotel/flight.
- **Refunded** — Funds returned to the original payment method.

## Second-Party Use

The **Traveler** benefits from verification.

**Expense Reimbursement:** Proving to an employer or a "Travel & Expense" platform that the $1,450 "Executive Suite" was a verified business cost and not an "Economy" room they "photoshopped" up to pocket the difference.

**Visa Applications:** Providing a verified hotel confirmation to a foreign consulate. Consulates often reject un-verified OTA printouts as "Vapor-bookings," but a verified hash on the OTA's domain provides absolute trust.

## Third-Party Use

**Corporate Finance Departments**
**Automatic Audit:** Using the hash to instantly validate itinerary data against the OTA's ledger, flagging "Screenshot Fraud" or deleted cancellation notices.

**Hotel Front Desks**
**Intake Integrity:** Instantly verifying a "Third-Party Booking" if the hotel's local system is lagging. Scanning the guest's phone hash confirms they have a valid, paid-up reservation on the Booking.com domain.

**Travel Insurers**
**Claim Substantiation:** If a traveler claims their trip was cancelled due to illness, the insurer verifies the "Cancelled" status and the "Non-refundable" price directly from the OTA hash.

## Verification Architecture

**The "JPEG Itinerary" Fraud Problem**

- **Price Padding:** Changing a $100 budget hotel receipt to $300 to get a higher reimbursement.
- **Status Faking:** Showing a "Confirmed" itinerary to get a travel visa, and then immediately cancelling the booking for a full refund.
- **Class Inflation:** Editing "Premium Economy" to "Business Class" on an airline itinerary.

**Issuer Types**

**Global OTAs:** (Expedia Group, Booking Holdings, Trip.com).
**Direct Suppliers:** (Marriott, Hilton, United, Lufthansa).
**Itinerary Aggregators:** (e.g., TripIt, Traxo).

## Competition vs. API Sync (Direct)

| Feature | OCR-to-Hash | API Sync (Direct) | Scanned PDF / Image |
| :--- | :--- | :--- | :--- |
| **User Privacy** | **High.** Share only the *one* trip. | **Low.** API access often sees the *full* history. | **High.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the OTA. | **System-Bound.** Trust the app. | **Zero.** Easily forged. |
| **Connectivity** | **Offline-Ready.** Proves the paper. | **None.** Requires live sync. | **Static.** |
| **Cost** | **Low.** Marginal implementation. | **High.** Requires complex API keys. | **Free.** |

**Why OCR wins here:** The "Hiring/Audit" reality. When a new employee joins a company, they bring their "Paper/PDF" past with them. The company doesn't want to "Sync" with the employee's private Expedia account. OCR-to-hash allows for **discrete, high-trust verification** of a single document without invading the traveler's digital life.