---
title: "Dangerous Goods Transport (ADR/DOT)"
category: "Customs & Trade Compliance"
volume: "Medium"
retention: "7-30 years (safety/liability)"
slug: "dangerous-goods-transport-road"
tags: ["adr", "dot-hazmat", "dangerous-goods", "road-transport", "safety-data-sheet", "logistics", "highway-safety"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #ff9800; background: #fff; padding: 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <div style="background: #ff9800; color: #fff; padding: 15px; text-align: center;">
    <h2 style="margin: 0; text-transform: uppercase; font-size: 1.2em;">DANGEROUS GOODS TRANSPORT DOCUMENT</h2>
    <div style="font-size: 0.8em;">In accordance with ADR 5.4.1 / DOT 172.200</div>
  </div>

  <div style="padding: 20px; font-size: 0.85em;">
    <div style="display: flex; border-bottom: 1px solid #ff9800; padding-bottom: 10px; margin-bottom: 10px;">
      <div style="width: 50%; border-right: 1px solid #ff9800; padding-right: 10px;">
        <strong>1. Consignor (Shipper):</strong><br>
        <span data-bracket="start" data-for="road-dg">]</span>EuroChem Industrial, SA<br>
        Lyon, France
      </div>
      <div style="width: 50%; padding-left: 10px;">
        <strong>2. Carrier:</strong><br>
        Trans-Euro Freight, Ltd.<br>
        Berlin, Germany
      </div>
    </div>

    <div style="margin: 15px 0; background: #fff3e0; padding: 10px; border: 1px solid #ffe0b2;">
      <p style="font-weight: bold; margin: 0 0 5px 0;">HAZARDOUS MATERIALS DESCRIPTION:</p>
      <p style="font-family: monospace; font-size: 1.1em; margin: 0;">UN 1203, GASOLINE, 3, PG II, (D/E)</p>
      <p style="margin: 5px 0 0 0;">Quantity: 24,000 Liters (Bulk Tanker)</p>
    </div>

    <p><strong>3. Emergency Contact:</strong> CHEMTREC +1 703-527-3887</p>

    <div style="margin-top: 15px; font-style: italic; font-size: 0.8em; color: #555;">
      The driver confirms the vehicle is equipped with mandatory fire extinguishers and ADR/DOT placards.
    </div>

    <div data-verify-line="road-dg" style="border-top: 1px dashed #ff9800; margin-top: 20px; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.85em; color: #555; text-align: center;"
      title="Demo only: Carrier doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:trans-euro.com/dg/v/UN1203-ABC <span data-bracket="end" data-for="road-dg">]</span>
    </div>
  </div>
</div>

## Data Verified

Consignor name, Carrier ID (DOT/MC #), UN Number (e.g., UN1203), Proper Shipping Name, Hazard Class (1-9), Packing Group (I, II, III), ADR Tunnel Code (e.g., D/E), total quantity, emergency contact information, date of transport.

**Document Types:**
- **ADR Transport Document:** Standard for European road transport.
- **DOT Hazmat Manifest:** Required for U.S. highway transport.
- **SDS (Safety Data Sheet):** (Linked hash) for technical chemical properties.
- **Driver Training Certificate:** Proving the driver is "Hazmat Endorsed."

## Data Visible After Verification

Shows the issuer domain (the Shipper or Carrier) and the safety standing.

**Status Indications:**
- **Verified** — Transport document matches the official manifest.
- **In-Transit** — Goods are currently on the road.
- **Delivered** — Shipment completed; cargo transferred.
- **Restriction Active** — **ALERT:** Recent safety restriction on this chemical/route.

## Second-Party Use

The **Truck Driver / Carrier** benefits from verification.

**Roadside Inspections:** Proving to a Highway Patrol officer or Gendarmerie that the "Gasoline" declaration is verified by the shipper. This prevents the truck from being impounded due to a suspected "Paperwork Forgery" designed to hide more dangerous chemicals.

**Tunnel/Bridge Access:** Instantly proving compliance with "Tunnel Codes" (e.g., ADR Code D/E) to tunnel authorities, ensuring the truck is allowed to enter restricted infrastructure.

## Third-Party Use

**Highway Patrol / First Responders**
**Accident Response:** If a tanker crashes, firefighters scan the hash on the paperwork or vehicle. "Verified by EuroChem" provides instant, trusted confirmation of the hazard class, potentially saving lives by ensuring the correct fire-suppression method is used.

**Facility Gate Security**
**Site Safety:** A refinery or chemical plant can scan the driver's documents before opening the gate. Verification ensures the truck isn't carrying unauthorized or "Blacklisted" materials.

**Environmental Agencies**
**Liability Tracking:** Ensuring that high-risk chemicals are being moved by carriers with the verified insurance and safety records required for hazardous transport.

## Verification Architecture

**The "High-Road" Fraud Problem**

- **UN Number Tampering:** Editing a UN number for a "Highly Toxic" chemical to look like a "Low Hazard" liquid to take a shorter route through a city or tunnel.
- **Driver Impersonation:** An un-endorsed driver using a fake "Hazmat Certificate" to drive a tanker.
- **Phantom Manifests:** Creating fake DG papers to hide the illegal transport of chemical waste.

**Issuer Types**

**Chemical Shippers / Manufacturers.**
**Transport Carriers.**
**Hazmat Compliance Platforms:** (e.g., Labelmaster, DGOffice).

## Competition vs. Central Portals (ERMA)

| Feature | OCR-to-Hash | Gov Hazmat Portal | Paper Manifest |
| :--- | :--- | :--- | :--- |
| **Field Access** | **Instant.** Scan the paper at the crash site. | **Difficult.** Requires responders to have specific portal logins and stable internet. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Shipper. | **Gov-Bound.** | **Zero.** Easily forged. |
| **Connectivity** | **Strong.** Works in rural areas/dead zones. | **Fragile.** Portals often lag during emergencies. | **Offline.** |
| **Integrity** | **Binds Data.** Protects the UN Number. | **Data-Only.** | **Vulnerable.** |

**Why OCR wins here:** The "Emergency Response" reality. In a highway accident, seconds matter. First responders don't have time to navigate a government portal. OCR-to-hash turns the **Paper Manifest** into a live, trusted safety link that works anywhere there is a phone, ensuring that responders know exactly what they are dealing with before they approach the flames.
