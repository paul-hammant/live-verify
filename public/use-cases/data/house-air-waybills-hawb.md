---
title: "House Air Waybills (HAWB)"
category: "Shipping & Freight"
volume: "Large"
retention: "7-10 years (freight forwarder liability)"
slug: "house-air-waybills-hawb"
tags: ["logistics", "air-freight", "hawb", "freight-forwarding", "cargo-security", "trade-finance", "supply-chain"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Arial Narrow', sans-serif; border: 1px solid #000; background: #fff; padding: 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <div style="background: #000; color: #fff; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
    <div style="font-weight: bold; font-size: 1.2em;">KUEHNE+NAGEL</div>
    <div style="font-size: 0.8em; text-align: right;">HAWB No: <span data-bracket="start" data-for="hawb">]</span>KN-9988776655</div>
  </div>

  <div style="padding: 10px; font-size: 0.8em;">
    <div style="display: flex; border-bottom: 1px solid #000; padding-bottom: 10px; margin-bottom: 10px;">
      <div style="width: 50%; border-right: 1px solid #000; padding-right: 10px;">
        <strong>Shipper:</strong><br>
        Precision Instruments, SA<br>
        Geneva, Switzerland
      </div>
      <div style="width: 50%; padding-left: 10px;">
        <strong>Consignee:</strong><br>
        Apex Research Lab, LLC<br>
        Cambridge, MA, USA
      </div>
    </div>

    <div style="display: flex; border-bottom: 1px solid #000; padding-bottom: 10px; margin-bottom: 10px; background: #f9f9f9;">
      <div style="width: 33%; border-right: 1px solid #000; padding: 5px;">
        <strong>Airport of Dept:</strong><br>
        GVA (Geneva)
      </div>
      <div style="width: 33%; border-right: 1px solid #000; padding: 5px;">
        <strong>Airport of Dest:</strong><br>
        BOS (Boston)
      </div>
      <div style="width: 34%; padding: 5px;">
        <strong>MAWB No:</strong><br>
        085-99228877
      </div>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-top: 5px;">
      <tr style="border-bottom: 1px solid #000;">
        <th style="text-align: left; padding: 2px;">No. of Pieces</th>
        <th style="text-align: left; padding: 2px;">Description</th>
        <th style="text-align: right; padding: 2px;">Weight (KG)</th>
      </tr>
      <tr>
        <td style="padding: 2px;">4 Cartons</td>
        <td style="padding: 2px;">Scientific Optical Lenses</td>
        <td style="text-align: right; padding: 2px;">120.50</td>
      </tr>
    </table>

    <div style="margin-top: 15px; border-top: 1px solid #000; padding-top: 5px; font-style: italic;">
      The carrier certifies that the goods described above were received for carriage in apparent good order and condition.
    </div>

    <div data-verify-line="hawb" style="border-top: 1px dashed #999; margin-top: 20px; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.85em; color: #555; text-align: center;"
      title="Demo only: Forwarder doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:kuehne-nagel.com/hawb/v/9988776655 <span data-bracket="end" data-for="hawb">]</span>
    </div>
  </div>
</div>

## Data Verified

HAWB Number, Master Air Waybill (MAWB) number, Shipper name, Consignee name, Airport of Departure/Destination, total piece count, gross weight, cargo description (e.g., "Optical Lenses"), freight charges status (Prepaid/Collect), date of issuance, issuing forwarder ID.

**Document Types:**
- **House Air Waybill (HAWB):** Issued by the freight forwarder to the actual shipper.
- **Consolidation Manifest:** (Linked hash) grouping multiple HAWBs under one MAWB.
- **Cargo Charges Correction Advice (CCCA):** For post-flight billing changes.

## Data Visible After Verification

Shows the issuer domain (the Freight Forwarder) and current shipment status.

**Status Indications:**
- **Booked** — HAWB created; space reserved.
- **Received** — Cargo in forwarder's possession.
- **Manifested** — HAWB assigned to a flight (MAWB).
- **Delivered** — HAWB cargo handed over to consignee.
- **Void** — Replaced by a corrected waybill.

## Second-Party Use

The **Actual Shipper (SME / Manufacturer)** benefits from verification.

**Trade Finance:** Proving to a local bank that the $50,000 shipment of lenses is "Verified Manifested" on a specific flight. HAWBs are often required for payment under Letters of Credit; a verified hash prevents the bank from rejecting the document due to "Paperwork Uncertainty."

**Cargo Insurance:** Proving the exact weight and condition at the moment of handoff to the forwarder, ensuring no "Shadow Damage" is blamed on the shipper.

## Third-Party Use

**Consignees (Importers)**
**Payment Release:** A buyer in Boston can verify the HAWB provided by the Swiss seller to ensure the goods are actually in the Kuehne+Nagel system before wiring the final balance.

**Customs Brokers**
**Entry Vetting:** Verifying that the HAWB data matches the commercial invoice and the manifest before filing the entry with Customs, reducing the risk of "Data Mismatch" fines.

**Air Carriers (Airlines)**
**Consolidation Integrity:** Ensuring that the HAWB data provided by the forwarder for a consolidated pallet matches the official forwarder records.

## Verification Architecture

**The "Phantom Consolidation" Fraud Problem**

- **Fabricated HAWBs:** Small, un-vetted forwarders creating fake HAWBs for shipments that don't exist, to trick banks into providing "Trade Financing."
- **Weight Tampering:** Editing a HAWB to show 100kg instead of 1,000kg to save on high-priority air freight surcharges.
- **Description Hiding:** Changing "Hazardous Chemicals" to "Water Samples" on the HAWB to bypass airline safety restrictions.

**Issuer Types**

**Freight Forwarders (NVOCCs):** (e.g., DHL, Kuehne+Nagel, Expeditors).
**Logistics Platforms:** (e.g., Flexport, Forto).
**Cargo Community Systems (CCS).**

## Competition vs. IATA e-AWB

| Feature | OCR-to-Hash | IATA e-AWB (Cargo-XML) | Paper HAWB |
| :--- | :--- | :--- | :--- |
| **User Access** | **Universal.** Any small shipper/bank can verify. | **Restricted.** Requires complex IATA Cargo-XML messaging setup. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Forwarder. | **System-Bound.** | **Zero.** Easily forged. |
| **Interoperability** | **High.** PDFs stay verifiable across systems. | **Medium.** Requires both parties to be on the e-AWB network. | **Universal.** |
| **Integrity** | **Binds Content.** Protects the weight/count. | **Data-Only.** | **Vulnerable.** |

**Why OCR wins here:** The "Forwarder Tail." While the top 50 forwarders use e-AWB, there are 50,000 small forwarders globally who still issue PDF/Paper HAWBs. OCR-to-hash turn those **Manual Documents** into cryptographically trusted digital artifacts, bringing "Digital Logistics" trust to the entire global SME market.
