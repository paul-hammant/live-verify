---
title: "Dangerous Goods Declarations (Air Cargo)"
category: "Customs & Trade Compliance"
volume: "Small"
retention: "7-30 years (safety/liability)"
slug: "dangerous-goods-declarations-air"
tags: ["dangerous-goods", "air-cargo", "iata-dgr", "hazmat", "aviation-safety", "shipper-declaration", "cargo-security"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Arial Narrow', sans-serif; border: 2px solid #d32f2f; background: #fff; padding: 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <div style="background: #d32f2f; color: #fff; padding: 10px; text-align: center;">
    <h2 style="margin: 0; text-transform: uppercase; font-size: 1.2em;">SHIPPER'S DECLARATION FOR DANGEROUS GOODS</h2>
    <div style="font-size: 0.8em;">In Compliance with IATA Dangerous Goods Regulations (DGR)</div>
  </div>

  <div style="padding: 15px; font-size: 0.8em;">
    <div style="display: flex; border-bottom: 1px solid #d32f2f; padding-bottom: 10px; margin-bottom: 10px;">
      <div style="width: 50%; border-right: 1px solid #d32f2f; padding-right: 10px;">
        <strong>Shipper:</strong><br>
        <span data-bracket="start" data-for="dgr">]</span>Lithium-Power Tech, Ltd.<br>
        Shenzhen, China
      </div>
      <div style="width: 50%; padding-left: 10px;">
        <strong>Air Waybill No:</strong> 016-99228877<br>
        <strong>Page:</strong> 1 of 1
      </div>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
      <tr style="background: #fdf2f2; border-bottom: 1px solid #d32f2f;">
        <th style="text-align: left; padding: 5px;">UN Number</th>
        <th style="text-align: left; padding: 5px;">Description</th>
        <th style="text-align: center; padding: 5px;">Class</th>
        <th style="text-align: center; padding: 5px;">Pkg Grp</th>
      </tr>
      <tr>
        <td style="padding: 5px;">UN 3480</td>
        <td style="padding: 5px;">Lithium Ion Batteries (Section IA)</td>
        <td style="text-align: center; padding: 5px;">9</td>
        <td style="text-align: center; padding: 5px;">II</td>
      </tr>
    </table>

    <div style="margin-top: 10px; border: 1px solid #000; padding: 10px; font-style: italic;">
      I declare that all of the applicable air transport requirements have been met. The goods are in proper condition for carriage by air according to the applicable International and National Government Regulations.
    </div>

    <div style="margin-top: 15px; display: flex; justify-content: space-between;">
      <div><strong>Signatory:</strong> Wang Wei (Certified Packer)</div>
      <div><strong>Date:</strong> 15 MAR 2026</div>
    </div>

    <div data-verify-line="dgr" style="border-top: 1px dashed #d32f2f; margin-top: 20px; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.85em; color: #555; text-align: center;"
      title="Demo only: Airline doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:iata-dgr.org/v/016-99228877 <span data-bracket="end" data-for="dgr">]</span>
    </div>
  </div>
</div>

## Data Verified

Shipper name, Air Waybill (AWB) number, UN Number (e.g., UN3480), Proper Shipping Name, Hazard Class (1-9), Packing Group (I, II, III), Net Quantity per package, emergency contact number, signatory name, date of declaration.

**Document Types:**
- **Shipper's Declaration (DGD):** The primary red-bordered legal form.
- **Cargo Aircraft Only (CAO) Notice:** For goods prohibited on passenger planes.
- **NOTOC (Notice to Captain):** (Linked hash) proving the pilot was informed of the hazmat on board.

## Data Visible After Verification

Shows the issuer domain (the Shipper, Airline, or IATA Validator) and current safety status.

**Status Indications:**
- **Verified** — Declaration matches the certified packer's official log.
- **Accepted for Carriage** — Airline has performed the "Acceptance Checklist" and verified the goods.
- **Suspended** — Recalled/Blocked (e.g., due to battery fire safety alert).
- **Invalid** — Signatory not authorized or details mismatch.

## Second-Party Use

The **Shipper (Manufacturer)** benefits from verification.

**Vessel Acceptance:** Proving to the Airline (e.g., Lufthansa Cargo) that the batteries were packed and declared by a "Verified Certified Professional." This prevents the cargo from being rejected at the airport warehouse due to "Paperwork Inconsistency."

**Liability Protection:** In the event of an in-flight fire, the shipper can prove they provided a cryptographically verified, accurate declaration of the hazard level, defending against "Willful Misdeclaration" criminal charges.

## Third-Party Use

**Airline Loadmasters / Pilots**
**Flight Safety:** The Captain uses the DGD data to calculate fire suppression needs and cargo placement. Verification ensures the data isn't "guessed" or fabricated, preventing catastrophic mid-air incidents.

**Ground Handlers (Swissport / Menzies)**
**Acceptance Check:** Warehouse staff scan the hash while walking the floor. "Verified by IATA System" allows them to instantly trust the paper without calling the shipper's office.

**Insurance Companies**
**Aviation Liability:** Verifying that all hazardous cargo on a lost aircraft was properly declared and met all IATA safety standards before paying out a multimillion-dollar hull claim.

## Verification Architecture

**The "Phantom Batteries" Fraud Problem**

- **Misclassification:** Declaring dangerous Lithium batteries as "General Cargo" or "Toys" on the paper form to save on freight costs and bypass safety checks.
- **Quantity Inflation:** Shipping 500kg of chemicals but only declaring 50kg on the paper to meet "Passenger Plane" limits.
- **Signature Forgery:** Forging the signature of a certified "Dangerous Goods Professional" who never actually saw the cargo.

**Issuer Types**

**Certified Shippers.**
**Specialist Packing Firms.**
**Airlines / Carriers.**
**IATA:** (Providing the global validation framework).

## Competition vs. e-DGD (Electronic Data)

| Feature | OCR-to-Hash | e-DGD (IATA Digital) | Paper DGD Form |
| :--- | :--- | :--- | :--- |
| **Field Access** | **Instant.** Scan the paper on the pallet. | **Hard.** Requires warehouse staff to have tablet access to IATA's private cloud. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Shipper/Packer. | **Platform-Bound.** Trust the IATA central hub. | **Zero.** Easily forged. |
| **Connectivity** | **Strong.** Paper works inside lead-shielded warehouses. | **Fragile.** Requires 100% 5G/Wi-Fi coverage on the tarmac. | **Offline.** |
| **Integrity** | **Binds Content.** Proves the *UN Number* matches. | **Data-Only.** | **Vulnerable.** |

**Why OCR wins here:** The "Warehouse reality." Air cargo hubs are massive, metal-clad buildings where Wi-Fi is spotty and staff move fast. They rely on the "Persistent Paper" attached to the boxes. OCR-to-hash turns that paper into a **Live Safety Link**, ensuring the person loading the plane has the same verified data as the person who packed the box.
