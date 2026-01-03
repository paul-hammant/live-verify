---
title: "Dangerous Goods Declarations"
category: "Customs & Trade Compliance"
volume: "Small"
retention: "7-30 years (safety/liability)"
slug: "dangerous-goods-declarations"
tags: ["adr", "air-cargo", "aviation-safety", "cargo-security", "container-shipping", "dangerous-goods", "dot-hazmat", "hazmat", "hazmat-declaration", "highway-safety", "iata-dgr", "imdg-code", "imo-dgd", "logistics", "maritime-safety", "road-transport", "safety-data-sheet", "shipper-declaration"]
derivations: 3
furtherDerivations: 3
---

## What is a DG Declaration?

You cannot just put a box of Lithium batteries or chemicals on a plane. By international law, you must file a **Dangerous Goods (DG) Declaration**.

This document tells the pilot and the ground crew: "This box is dangerous. If it leaks, use *this* specific fire extinguisher."

Shady shippers often "Mis-declare" cargo—calling dangerous batteries "Toys" on the paper form to save money or bypass safety rules. This has caused multiple plane crashes. Verified hashes ensure the safety data on the paper pallet matches the certified packer's official record.

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


---

_[Content merged from: dangerous-goods-declarations-imo-icao]_


## What is an IMO Declaration?

When a shipping container full of chemicals (like Acetone or Pesticides) is put on a ship, the captain needs to know exactly where to put it. Flammable items can't be next to explosive items.

The **IMO Dangerous Goods Declaration** is the "Safety Blueprint" for the container.

Fraudsters often edit these PDFs to hide that a chemical is toxic, just to get it onto a faster ship or to save on port fees. Verified hashes allow the ship's captain and port firefighters to see the **un-altered hazard class** instantly, preventing catastrophic fires at sea.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Arial Narrow', sans-serif; border: 2px solid #000; background: #fff; padding: 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <div style="background: #000; color: #fff; padding: 10px; text-align: center;">
    <h2 style="margin: 0; text-transform: uppercase; font-size: 1.2em;">DANGEROUS GOODS DECLARATION (IMO)</h2>
    <div style="font-size: 0.8em;">In accordance with the IMDG Code and SOLAS 74</div>
  </div>

  <div style="padding: 15px; font-size: 0.85em;">
    <div style="display: flex; border-bottom: 1px solid #000; padding-bottom: 10px; margin-bottom: 10px;">
      <div style="width: 50%; border-right: 1px solid #000; padding-right: 10px;">
        <strong>1. Shipper / Exporter:</strong><br>
        <span data-bracket="start" data-for="imo-dgd">]</span>Industrial Chemicals, Gmbh.<br>
        Frankfurt, Germany
      </div>
      <div style="width: 50%; padding-left: 10px;">
        <strong>2. Consignee:</strong><br>
        Global Logistics Hub, LLC<br>
        Houston, TX, USA
      </div>
    </div>

    <div style="display: flex; border-bottom: 1px solid #000; padding-bottom: 10px; margin-bottom: 10px; background: #fdf2f2;">
      <div style="width: 33%; border-right: 1px solid #000; padding: 5px;">
        <strong>UN Number:</strong><br>
        UN 1090
      </div>
      <div style="width: 33%; border-right: 1px solid #000; padding: 5px;">
        <strong>Class:</strong><br>
        3 (Flammable)
      </div>
      <div style="width: 34%; padding: 5px;">
        <strong>Packing Group:</strong><br>
        II
      </div>
    </div>

    <p><strong>3. Proper Shipping Name:</strong> ACETONE</p>
    <p><strong>4. Container ID:</strong> MSKU-998877-6</p>

    <div style="margin-top: 15px; border: 1px solid #000; padding: 10px; font-style: italic;">
      I hereby declare that the contents of this consignment are fully and accurately described above and are classified, packaged, marked and labeled/placarded in accordance with the applicable international and national governmental regulations.
    </div>

    <div style="margin-top: 15px; display: flex; justify-content: space-between;">
      <div><strong>Signatory:</strong> Hans Muller</div>
      <div><strong>Date:</strong> 15 MAR 2026</div>
    </div>

    <div data-verify-line="imo-dgd" style="border-top: 1px dashed #999; margin-top: 20px; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.85em; color: #555; text-align: center;"
      title="Demo only: Carrier doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:hapaq-lloyd.com/dgd/v/UN1090-MSKU <span data-bracket="end" data-for="imo-dgd">]</span>
    </div>
  </div>
</div>

## Data Verified

Shipper name, Consignee name, UN Number, Class/Division, Packing Group, Proper Shipping Name, Flash point (for maritime), marine pollutant status, number/type of packages, container ID, signatory name, date.

**Document Types:**
- **IMO Dangerous Goods Declaration:** For ocean freight (IMDG Code).
- **Multimodal DG Form:** For shipments moving by road and sea.
- **Container Packing Certificate:** Proving the DG was properly braced inside the box.

## Data Visible After Verification

Shows the issuer domain (the Shipper or Carrier) and current safety status.

**Status Indications:**
- **Verified** — Declaration matches the shipper's official safety filing.
- **Accepted** — Port/Carrier has verified the physical labels and placards.
- **Blocked** — **ALERT:** Discrepancy found in hazard class; do not load.
- **Void** — Replaced by an amended declaration.

## Second-Party Use

The **Shipper (Manufacturer)** benefits from verification.

**Vessel Space Allocation:** Proving to the Ocean Carrier (e.g., Hapag-Lloyd) that the hazardous chemicals are "Verified Accurately Declared." Carriers are extremely risk-averse with DG; a verified hash prevents the container from being "Left on the Dock" due to paperwork suspicion.

**Liability Defense:** If a container leaks at sea, the shipper can prove they provided a cryptographically verified, accurate declaration of the chemical's flash point and class, defending against claims of "Negligent Misdeclaration."

## Third-Party Use

**Vessel Command (The Captain)**
**Stowage Safety:** The Captain uses the DGD to ensure flammable liquids (Class 3) aren't stored next to explosives or acids. Verification ensures the data isn't "guessed," preventing catastrophic ship-board fires.

**Port Terminal Operators**
**Emergency Response:** In the event of a leak in the terminal, firefighters scan the hash on the container door or paperwork. "Verified by Hapag-Lloyd" provides instant, trusted access to the emergency response codes (ERG).

**Marine Insurers**
**Risk Management:** Ensuring that all "Hazardous Loads" on a vessel were properly declared before writing high-value hull/cargo policies.

## Verification Architecture

**The "Phantom Chemical" Fraud Problem**

- **Class Downgrading:** Declaring a highly toxic chemical as a low-hazard one to get it onto a passenger-compatible vessel or to save on freight surcharges.
- **Flash-point Tampering:** Editing the "Flash Point" on the PDF to make a flammable liquid look safer than it is to bypass "Below Deck" storage restrictions.
- **Container Swapping:** Using a valid DGD for a safe container to hide an illegal or leaking one.

**Issuer Types**

**Chemical Manufacturers.**
**Certified DG Packers.**
**Ocean Carriers / Ship Lines.**

## Competition vs. Port Community Systems (PCS)

| Feature | OCR-to-Hash | PCS / Central Hub | Paper DGD |
| :--- | :--- | :--- | :--- |
| **Field Access** | **Instant.** Scan the paper at the gate. | **Difficult.** Requires truckers/clerks to have complex portal logins. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Trust the Shipper. | **System-Bound.** Trust the Port's IT vendor. | **Zero.** Easily forged. |
| **Connectivity** | **Strong.** Paper works at remote berths. | **Fragile.** Port IT systems often experience downtime. | **Offline.** |
| **Interoperability** | **Universal.** Works across any port/carrier. | **Siloed.** Hamburg's PCS doesn't talk to Singapore's. | **Universal.** |

**Why OCR wins here:** The "Intermodal Handoff." A chemical container moves from Factory (Truck) -> Port Gate -> Vessel -> Destination Port. At every step, a different entity takes responsibility. OCR-to-hash turns the **Existing Paper Standard** into a universal digital bridge that moves *with the cargo*, providing "Single Source of Truth" trust without needing a global IT integration.

---

_[Content merged from: dangerous-goods-transport-road]_


## What is a Hazmat Manifest?

When a truck carries hazardous materials (like Gasoline or Acid), the driver must carry a **Transport Document** (called an ADR note in Europe or a Hazmat Manifest in the US).

If the truck crashes, **First Responders** (Firefighters) look for this paper first. It tells them: "Approach from upwind" or "Do not use water on this fire."

Fraudsters often "Downgrade" the hazard on the paper form to bypass tunnel restrictions or to save on insurance. Verified hashes allow firefighters to scan the paperwork at the crash site and see the **verified hazard class** from the shipper's domain instantly.

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
