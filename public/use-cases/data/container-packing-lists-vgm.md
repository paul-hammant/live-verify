---
title: "Container Packing Lists and Weight Certificates (VGM)"
category: "Chain of Custody & Logistics"
volume: "Large"
retention: "Shipment + 7 years"
slug: "container-packing-lists-vgm"
tags: ["shipping", "logistics", "vgm", "solas", "container", "maritime-safety", "packing-list"]
derivations: 1
---

## What is a VGM Declaration?

When a massive cargo ship is loaded, the captain needs to know exactly how heavy every container is. If the ship is "top-heavy" or unbalanced, it can capsize and sink in a storm.

The **Verified Gross Mass (VGM)** is the official weight certificate for a container. By international law (SOLAS), no container can be put on a ship without one.

Shippers often "Guess" the weight to save the $50 fee for a certified scale. This "Guesswork" has led to several high-profile shipwrecks. Verified hashes ensure that the weight on the paper matches the official scale record at the port.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Arial Narrow', sans-serif; border: 1px solid #000; background: #fff; padding: 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <div style="background: #002d62; color: #fff; padding: 10px; text-align: center;">
    <h2 style="margin: 0; text-transform: uppercase; font-size: 1.2em;">SOLAS VGM DECLARATION</h2>
    <div style="font-size: 0.8em;">Verified Gross Mass Certificate</div>
  </div>

  <div style="padding: 20px;">
    <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 20px;">
      <div>
        <strong>Container #:</strong> <span data-bracket="start" data-for="vgm">]</span>MSKU-123456-7<br>
        <strong>Seal #:</strong> MAE-998877
      </div>
      <div style="text-align: right;">
        <strong>Booking #:</strong> 99228877<br>
        <strong>Date:</strong> 15 MAR 2026
      </div>
    </div>

    <div style="font-size: 0.95em; line-height: 1.6; color: #333; border: 1px solid #000; padding: 15px; margin-bottom: 20px;">
      <p><strong>Verified Gross Mass (VGM):</strong></p>
      <div style="text-align: center; font-size: 1.8em; font-weight: bold; color: #002d62;">24,550.00 KG</div>
      
      <p style="margin-top: 15px;"><strong>Shipper:</strong> Global Furniture Exports, Ltd.<br>
      <strong>Method:</strong> Method 1 (Weighing the entire container)</p>
    </div>

    <div style="font-size: 0.8em; color: #555; text-align: justify;">
      This declaration is made in accordance with the IMO SOLAS Regulation VI/2. The signatory certifies that the mass has been verified using calibrated and certified equipment.
    </div>

    <div style="margin-top: 30px; border-top: 1px solid #000; padding-top: 5px; font-size: 0.85em;">
      <strong>Authorized Signatory:</strong> <em>Robert J. Miller</em>
    </div>

    <div data-verify-line="vgm" style="border-top: 1px dashed #999; margin-top: 25px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.85em; color: #555; text-align: center;"
      title="Demo only: Shipper portal doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:global-furniture.com/vgm/v/MSKU123456 <span data-bracket="end" data-for="vgm">]</span>
    </div>
  </div>
</div>

## Data Verified

Container ID, Seal ID, Booking number, Verified Gross Mass (VGM) in KG/LB, weighing method (Method 1 vs Method 2), shipper name, scale operator ID, scale certification status, date of weighing.

**Document Types:**
- **SOLAS VGM Certificate:** Required for every container loaded onto a ship.
- **Detailed Packing List:** Listing contents of the container.
- **Intermodal Equipment Provider (IEP) Log:** For chassis weight reconciliation.

## Data Visible After Verification

Shows the issuer domain (the Shipper or Weighing Facility) and current weight status.

**Status Indications:**
- **VGM Confirmed** — Weight matches the official scale record.
- **Mismatch Alert** — **ALERT:** Port scale and Shipper VGM differ by > 500kg.
- **Superseded** — Container was re-weighted (e.g., after transshipment).
- **Void** — Scale found to be out of calibration.

## Second-Party Use

The **Shipper (Exporter)** benefits from verification.

**Vessel Loading:** Proving to the Carrier (e.g., Maersk or MSC) that the VGM is authentic. If the carrier suspects a fake weight, they will refuse to load the container, causing massive delays. A verified VGM hash prevents "Paper Rejections" at the terminal gate.

**Liability Protection:** In the event of a vessel accident (e.g., ship capsizing or losing containers), the shipper can prove they provided a cryptographically verified, accurate weight, defending against claims of "Overloading."

## Third-Party Use

**Ocean Carriers (Vessel Command)**
**Vessel Stability:** The Chief Officer uses VGM data to plan the ship's stability (stowage plan). Verification ensures the data isn't "guessed" or fabricated, preventing catastrophic capsizing events.

**Port Terminal Operators**
**Gate Verification:** Automated gate systems can scan the VGM hash on the driver's tablet/paper. If it verifies, the container is allowed into the stack. If not, it is sent to the "Trouble Parking" area.

**Marine Insurers**
**Risk Management:** Ensuring that the project cargo they are insuring was accurately weighed and packed, reducing the risk of cargo shifting during storms.

## Verification Architecture

**The "Guessing" Fraud Problem**

- **Weight Guessing:** Shippers writing a "Guess" on the paper to avoid the $50 cost of using a certified scale.
- **Misdeclaration:** Artificially lowering the weight on the paper to save on freight costs (since freight is often calculated by weight).
- **PDF Editing:** Changing the weight from 30,000kg to 20,000kg to meet the ship's maximum deck load limit.

**Issuer Types**

**Exporters / Shippers:** (Using Method 2 - adding up weights).
**Public Scale Facilities:** (Using Method 1 - weighing the whole truck).
**Logistics Platforms:** (INTTRA, GTNexus - who aggregate VGM data).

## Competition vs. EDI Messaging (VERMAS)

| Feature | OCR-to-Hash | EDI VERMAS Message | Paper VGM Form |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Shipper. | **System-Bound.** Relies on the message not being corrupted. | **Zero.** Easily forged. |
| **Visibility** | **Visual.** The trucker can see it's verified. | **Invisible.** Happens between back-end systems. | **Visual.** |
| **Field Access** | **Instant.** Scan the paper at the gate. | **None.** Driver has no access to EDI logs. | **Manual.** |
| **Connectivity** | **Strong.** Works via simple web URL. | **Fragile.** Requires heavy B2B EDI infrastructure. | **Offline.** |

**Why OCR wins here:** The "Trucker Reality." While the big carriers use EDI, the individual trucker arriving at the terminal gate often carries a **Paper Folder** of documents. OCR-to-hash turns that paper folder into a trusted digital portal, ensuring the gate clerk and the driver are seeing the same verified weight as the carrier's stability officer.
