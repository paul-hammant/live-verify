---
title: "Dangerous Goods Declarations (IMO/ICAO)"
category: "Customs & Trade Compliance"
volume: "Medium"
retention: "Shipment + 5-10 years"
slug: "dangerous-goods-declarations-imo-icao"
tags: ["imo-dgd", "imdg-code", "dangerous-goods", "maritime-safety", "container-shipping", "hazmat-declaration", "logistics"]
---

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