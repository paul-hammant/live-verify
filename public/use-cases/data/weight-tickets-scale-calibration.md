---
title: "Weight Tickets and Scale Calibration"
category: "Warehousing & Inventory"
volume: "Large"
retention: "Shipment + 3-7 years (tax/audit/dispute)"
slug: "weight-tickets-scale-calibration"
tags: ["logistics", "shipping", "weight-ticket", "scale-ticket", "dot-compliance", "freight-fraud", "trade-measurement", "bulk-commodities"]
furtherDerivations: 1
---

## What are Weight Tickets?

In the shipping and bulk commodity industries (e.g., grain, scrap metal, gravel), the **Weight Ticket** is the "Cash Receipt" for the cargo. It records the weight of a truck when full (Gross) and when empty (Tare) to determine the weight of the goods (Net).

Because weight determines the price of multimillion-dollar shipments, these tickets are a primary target for **Weight Fraud**. A dishonest driver might "edit" a 40,000 lb ticket to read 45,000 lbs to over-charge a buyer. Similarly, they might use a "Ghost Ticket" from a non-existent scale to steal cargo. Verified hashes bind the **Gross/Tare Weights, Plate Number, and Timestamp** to the scale operator's domain (e.g., `catscale.com` or `pilotflyingj.com`).

<div style="max-width: 450px; margin: 24px auto; font-family: 'Courier New', Courier, monospace; border: 2px solid #333; background: #fffbe6; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="padding: 20px; border-bottom: 1px dashed #333; text-align: center; background: #fffbe6;">
    <div style="font-weight: bold; font-size: 1.3em;">MIDWEST CERTIFIED SCALES</div>
    <div style="font-size: 0.8em; opacity: 0.9;">NIST Handbook 44 Compliant • Scale ID: #9922-A</div>
  </div>
<div style="padding: 20px;">
    <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 20px;">
      <div>
        <strong>Ticket #:</strong> <span verifiable-text="start" data-for="weight">[</span>WT-2026-8844<br>
        <strong>Plate:</strong> ABC-1234 (IL)<br>
        <strong>Unit:</strong> TRUCK-42
      </div>
      <div style="text-align: right;">
        <strong>Date:</strong> 15 MAR 2026<br>
        <strong>Time:</strong> 14:32:01<br>
        <strong>Location:</strong> JOLIET, IL
      </div>
    </div>
<table style="width: 100%; border-collapse: collapse; font-size: 1em; margin-bottom: 20px;">
      <tr>
        <td style="padding: 5px;">GROSS WEIGHT:</td>
        <td style="text-align: right; font-weight: bold;">78,450 LB</td>
      </tr>
      <tr>
        <td style="padding: 5px;">TARE WEIGHT:</td>
        <td style="text-align: right; font-weight: bold;">32,100 LB</td>
      </tr>
      <tr style="border-top: 2px solid #333; font-size: 1.2em;">
        <td style="padding: 10px 5px;"><strong>NET WEIGHT:</strong></td>
        <td style="text-align: right; padding: 10px 5px; color: #d32f2f;"><strong>46,350 LB</strong></td>
      </tr>
    </table>
<div style="font-size: 0.75em; color: #555; text-align: center; font-style: italic;">
      This weight is certified accurate by a licensed Weighmaster. Verification protects trade integrity.
    </div>
  </div>
<div style="padding: 15px; background: #fff; border-top: 1px solid #333; text-align: center;">
    <div data-verify-line="weight" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #000; font-weight: bold;"
      title="Demo only: Scale operators don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:midwest-scales.com/v/WT20268844 <span verifiable-text="end" data-for="weight">]</span>
    </div>
  </div>
</div>

## Data Verified

Ticket number, scale ID, facility location, date/time, vehicle plate/VIN, gross weight, tare weight, net weight, weighmaster name/ID, calibration expiration date.

**Document Types:**
- **Public Weighmaster Ticket:** The primary commercial record.
- **Axle Weight Report:** For DOT axle-load compliance.
- **Scale Calibration Certificate:** (Linked hash) proving the scale is accurate.
- **Automatic Manifest:** For unattended unmanned scales.

## Data Visible After Verification

Shows the issuer domain (`catscale.com`, `pilotj.com`, `loves.com`) and the ticket standing.

**Status Indications:**
- **Verified / Certified** — Weight data matches the scale's original digital log.
- **Out of Calibration** — **ALERT:** Scale was overdue for mandatory NIST testing at the time of weighing.
- **Voided** — **ALERT:** Ticket was cancelled (e.g., due to a re-weigh).
- **Plate Mismatch** — **ALERT:** The physical plate on the truck doesn't match the verified hash.

## Second-Party Use

The **Driver / Fleet Manager** benefits from verification.

**DOT Roadside Defense:** During a roadside inspection for "Overweight" violations, the driver shows the verified hash of their scale ticket. The Trooper can instantly see **"VERIFIED 78,450 LBS"** from a certified scale, proving the truck is legally under the 80,000 lb limit and preventing a $2,000 fine.

**Billing Speed:** By attaching a verified weight hash to their invoice, the carrier allows the shipper's system to perform an instant "Weight Audit," reducing the time to get paid from 30 days to 24 hours.

## Third-Party Use

**Shippers and Receivers**
**Inventory Integrity:** A factory receiving 100 trucks of scrap metal per day can't manually verify every ticket. OCR-to-hash allows their system to bulk-verify all incoming tickets. If a driver attempts to "Padding" a ticket with an extra 5,000 lbs, the system flags the fraud instantly.

**State Departments of Agriculture (Weights & Measures)**
**Market Audit:** Verifying that public scales are correctly recording weights and that "Scale Tickets" aren't being fabricated to hide the sale of un-taxed commodities.

**Insurance Companies**
**Accident Forensics:** In a crash involving a heavy truck, the insurer verifies the last weight ticket to determine if the vehicle was "Overloaded," which can significantly impact liability and stopping-distance calculations.

## Verification Architecture

**The "Phantom Pound" Fraud Problem**

- **Tare Tampering:** Weighing the truck empty with a full fuel tank, but weighing it full with an empty tank to inflate the "Net" weight.
- **PDF Inflation:** Editing a "42,000 lb" net weight to read "48,000 lb" before invoicing the buyer.
- **Facility Spoofing:** Creating a fake ticket from a reputable scale operator to hide the fact that the goods were never weighed.

**Issuer Types**

**Certified Public Scales (CAT Scale).**
**Privately Owned Industrial Scales.**
**Port Authority Scales.**

**Privacy Salt:** Essential. License plates and high-value cargo weights are private business data. The hash must be salted to prevent "Traffic Mapping" by competitors.

## Rationale

Weight is the "Truth of Trade." By turning scale tickets into verifiable digital bridges, we protect the billions of dollars in commerce that rely on accurate measurement and ensure that "What You Pay For" is "What You Get."