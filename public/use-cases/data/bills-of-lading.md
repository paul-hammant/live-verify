---
title: "Bills of Lading (Ocean/Multimodal)"
category: "Shipping & Freight"
volume: "Large"
retention: "Shipment completion plus 7-10 years (disputes, customs audits)"
slug: "bills-of-lading"
tags: ["shipping", "logistics", "maritime", "trade-finance", "bill-of-lading", "bol", "cargo"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Arial Narrow', sans-serif; border: 1px solid #000; background: #fff; padding: 0;">
  <div style="background: #002d62; color: #fff; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
    <div style="font-weight: bold; font-size: 1.2em;">MAERSK LINE</div>
    <div style="font-size: 0.8em; text-align: right;">B/L No: <span data-bracket="start" data-for="bol">]</span>MAE-9988776655</div>
  </div>

  <div style="padding: 10px; font-size: 0.8em;">
    <div style="display: flex; border-bottom: 1px solid #000;">
      <div style="width: 50%; border-right: 1px solid #000; padding: 5px;">
        <strong>Shipper:</strong><br>
        Global Coffee Exporters<br>
        Santos, Brazil
      </div>
      <div style="width: 50%; padding: 5px;">
        <strong>Consignee:</strong><br>
        Artisan Roasters Corp.<br>
        Brooklyn, NY, USA
      </div>
    </div>

    <div style="display: flex; border-bottom: 1px solid #000; background: #f9f9f9;">
      <div style="width: 33%; border-right: 1px solid #000; padding: 5px;">
        <strong>Vessel:</strong><br>
        MAERSK MC-KINNEY
      </div>
      <div style="width: 33%; border-right: 1px solid #000; padding: 5px;">
        <strong>Port of Loading:</strong><br>
        SANTOS, BRAZIL
      </div>
      <div style="width: 34%; padding: 5px;">
        <strong>Port of Discharge:</strong><br>
        NEW YORK, USA
      </div>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-top: 5px;">
      <tr style="border-bottom: 1px solid #000;">
        <th style="text-align: left; padding: 2px;">Container No.</th>
        <th style="text-align: left; padding: 2px;">Description</th>
        <th style="text-align: right; padding: 2px;">Weight (KG)</th>
      </tr>
      <tr>
        <td style="padding: 2px;">MSKU 123456-7</td>
        <td style="padding: 2px;">200 BAGS ARABICA COFFEE</td>
        <td style="text-align: right; padding: 2px;">12,000.00</td>
      </tr>
    </table>

    <div style="margin-top: 15px; border-top: 1px solid #000; padding-top: 5px; font-style: italic;">
      RECEIVED by the Carrier the Goods as specified above in apparent good order and condition.
    </div>

    <div data-verify-line="bol" style="border-top: 1px dashed #999; margin-top: 20px; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.85em; color: #555; text-align: center;"
      title="Demo only: Maersk doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:maersk.com/bl/v/9988776655 <span data-bracket="end" data-for="bol">]</span>
    </div>
  </div>
</div>

## Data Verified

B/L Number, shipper, consignee, vessel name, voyage number, port of loading/discharge, container numbers, seal numbers, cargo description, gross weight, date of loading (shipped on board).

**Document Types:**
- **Original Bill of Lading (OBL):** Negotiable document of title.
- **Sea Waybill:** Non-negotiable; for trusted parties.
- **House B/L:** Issued by a freight forwarder (NVOCC).
- **Switch B/L:** Re-issued in transit for trade secrecy.

## Data Visible After Verification

Shows the issuer domain (the Carrier or Forwarder) and current shipment status.

**Status Indications:**
- **Issued** — Document created; cargo received.
- **Shipped on Board** — Cargo physically on the vessel.
- **Surrendered** — OBL returned to carrier for release.
- **Released** — Cargo handed over at destination.
- **Void** — Replaced by a Switch B/L or cancelled.

## Second-Party Use

The **Shipper** or **Exporter** benefits from verification.

**Trade Finance (L/C):** Proving to a bank that the B/L being presented for payment under a Letter of Credit is authentic and hasn't been altered (e.g., changing the "Shipped on Board" date to meet a deadline).

**Payment Assurance:** A buyer in NYC can verify the B/L provided by the Brazilian seller to ensure the goods are actually on a Maersk ship before wiring the final balance.

## Third-Party Use

**Banks (Trade Finance)**
**Collateral Verification:** Negotiable B/Ls are documents of title (they represent the cargo). Banks taking B/Ls as security need to verify they are real and not "Phantom B/Ls" created by fraudsters.

**Port Terminals**
**Release Authorization:** Before releasing a $50,000 container to a trucker, the terminal clerk scans the B/L. "Verified by Maersk" prevents "fictitious pickup" where thieves use fake paper docs to steal cargo.

**Customs Authorities**
**Enforcement:** Verifying that the weight and description on the B/L match the import manifest, catching smuggling or tax evasion.

## Verification Architecture

**The "Phantom Cargo" Fraud Problem**

- **Fabricated B/Ls:** Creating high-quality fakes of Maersk/MSC documents for cargo that doesn't exist, used to defraud banks out of millions in "financing."
- **Ante-Dating:** Changing the date on the B/L from June 5th to June 1st to comply with a Letter of Credit that expired on the 2nd.
- **Switch B/L Abuse:** Using a fake switch B/L to redirect cargo to a different port for theft.

**Issuer Types**

**Ocean Carriers:** (Maersk, MSC, Hapag-Lloyd).
**NVOCCs:** (DHL, Kuehne+Nagel).
**Maritime Platforms:** (TradeLens, GSBN).

## Competition vs. Electronic B/L (eBL)

| Feature | OCR-to-Hash | eBL Platform (Bolero/WAVE) | Paper BOL |
| :--- | :--- | :--- | :--- |
| **Connectivity** | **Offline-Ready.** Proves the paper at the gate. | **Fragile.** Requires all parties to be on the same platform. | **Manual.** Relies on watermarks. |
| **Trust** | **Domain-Bound.** Trust the Carrier directly. | **Closed Loop.** Trust the platform provider. | **Visual.** Very easy to forge. |
| **Interoperability** | **Universal.** Works for any carrier with a domain. | **Siloed.** Bolero users can't easily talk to WAVE users. | **Universal.** |

**Why OCR wins here:** The "Platform War." The shipping industry is currently fighting over 5 different eBL standards. OCR-to-hash bypasses the war by providing a **universal digital overlay** for the one thing everyone already uses: the paper (or PDF) Bill of Lading.
