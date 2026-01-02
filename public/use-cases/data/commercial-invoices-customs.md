---
title: "Commercial Invoices for Customs"
category: "Customs & Trade Compliance"
volume: "Large"
retention: "7-10 years (customs audit)"
slug: "commercial-invoices-customs"
tags: ["customs", "export-import", "commercial-invoice", "trade-compliance", "hs-codes", "tariff-valuation"]
---

## What is a Customs Invoice?

When goods cross an international border, the most important paper is the **Commercial Invoice**. It's the bill from the seller to the buyer.

Customs officers use this invoice to decide how much **Tax (Duty)** to charge. If the invoice says the goods are worth $10,000, you pay less tax than if it says $100,000.

"Under-valuation" is a massive global crime. Shady importers often have the exporter send two invoices: a "Real" one for payment, and a "Fake" one with a 90% discount to show Customs. Verified invoices from the exporter's domain stop this tax evasion instantly.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', monospace; border: 1px solid #000; background: #fff; padding: 20px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1);">
  <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
    <div style="font-weight: bold; font-size: 1.2em;">COMMERCIAL INVOICE</div>
    <div style="text-align: right;">
      Invoice #: INV-998877<br>
      Date: 15 MAR 2026
    </div>
  </div>

  <div style="font-size: 0.85em; line-height: 1.4;">
    <div style="display: flex; margin-bottom: 20px;">
      <div style="width: 50%;">
        <strong>EXPORTER:</strong><br>
        <span data-bracket="start" data-for="invoice">]</span>Shenzhen Tech Components<br>
        Bldg 4, Industrial Zone 2<br>
        Shenzhen, China
      </div>
      <div style="width: 50%; padding-left: 20px;">
        <strong>IMPORTER:</strong><br>
        EuroLink Distribution, AG<br>
        Industriestrasse 42<br>
        Zurich, Switzerland
      </div>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr style="border-bottom: 1px solid #000; font-weight: bold;">
        <th style="text-align: left;">Description</th>
        <th style="text-align: center;">HS Code</th>
        <th style="text-align: right;">Value (USD)</th>
      </tr>
      <tr>
        <td style="padding: 5px 0;">Solid State Drives (512GB)</td>
        <td style="text-align: center;">8471.70</td>
        <td style="text-align: right;">$ 45,000.00</td>
      </tr>
      <tr>
        <td style="padding: 5px 0;">Microcontrollers (ARM)</td>
        <td style="text-align: center;">8542.31</td>
        <td style="text-align: right;">$ 12,500.00</td>
      </tr>
      <tr style="border-top: 2px solid #000; font-weight: bold;">
        <td colspan="2">TOTAL INVOICE VALUE:</td>
        <td style="text-align: right;">$ 57,500.00</td>
      </tr>
    </table>

    <div style="font-size: 0.8em; font-style: italic;">
      Incoterms: CIP Zurich (2020)<br>
      Country of Origin: CHINA
    </div>

    <div data-verify-line="invoice" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Exporter doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:shenzhen-tech.com/invoices/v/INV998877 <span data-bracket="end" data-for="invoice">]</span>
    </div>
  </div>
</div>

## Data Verified

Exporter name, Importer name, Invoice number, line-item descriptions, HS Codes, individual item values, total invoice value, currency, Incoterms, Country of Origin, date of issuance.

**Document Types:**
- **Commercial Invoice:** The primary document for customs valuation.
- **Pro Forma Invoice:** For pre-shipment clearance.
- **Packing List:** Detailing quantities and weights (cross-referenced).
- **Credit Memo:** For returned or damaged goods.

## Data Visible After Verification

Shows the issuer domain (the Exporter) and the invoice standing.

**Status Indications:**
- **Verified** — Content matches the exporter's official accounts receivable.
- **Cancelled** — Transaction voided; invoice should not be used for entry.
- **Amended** — A revised invoice exists (e.g., due to a price correction).
- **Payment Confirmed** — Exporter has received funds (anti-money laundering proof).

## Second-Party Use

The **Importer** benefits from verification.

**Customs Compliance:** Proving to Swiss Customs that the $57,500 value isn't a "Fake Low Value" to evade taxes. A verified invoice from the exporter's domain makes it much harder for Customs to seize the goods for "Under-valuation."

**Bank Financing:** Proving the exact purchase price to a bank to secure trade financing or to authorize a large international wire transfer.

## Third-Party Use

**Customs Authorities (CBP / HMRC)**
**Valuation Audit:** Customs sees millions of invoices. Fraudsters often provide two invoices: a "Real" high-value one for the bank, and a "Fake" low-value one for Customs. OCR-to-hash allows Customs to verify the invoice against the exporter's domain, catching valuation fraud instantly.

**Logistics Carriers (Freight Forwarders)**
**Documentation Vetting:** Verifying that the invoice provided by the shipper matches the manifest and the cargo on the truck/plane.

**Tax Auditors**
**VAT / GST Reconciliation:** Ensuring that the "Input Tax" claimed by the importer matches the "Output Tax" reported by the exporter across international borders.

## Verification Architecture

**The "Under-Valuation" Fraud Problem**

- **Price Cutting:** Editing a $100,000 invoice to read $10,000 to save $20,000 in import duties.
- **HS Code Engineering:** Changing the code for "Consumer Electronics" (high duty) to "Educational Materials" (low duty).
- **Phantom Invoices:** Creating a fake invoice to justify an international wire transfer used for money laundering.

**Issuer Types**

**Exporters / Manufacturers:** (Hosting on their own corporate domain).
**Customs Brokers:** (Providing verification services for their clients).
**Trade Platforms:** (e.g., Tradeshift, SAP Ariba).

## Competition vs. Customs ACE Portal

| Feature | OCR-to-Hash | ACE Portal (Gov) | Paper Invoice |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Trust the Exporter. | **Gov-Bound.** Trust the filing. | **Zero.** Easily forged. |
| **Verification** | **Pre-Filing.** Verify before the ship sails. | **Post-Filing.** Only verified after submission. | **Manual.** |
| **Integrity** | **Binds Line Items.** Protects every price. | **Data-Only.** Doesn't protect the paper. | **Vulnerable.** |
| **User Access** | **Universal.** Any trucker/bank can verify. | **Restricted.** Requires Gov credentials. | **Universal.** |

**Why OCR wins here:** The "Source of Truth." Government databases only know what was *filed*. If the importer files a fake document, the government database is wrong. OCR-to-hash links the verifier back to the **Exporter's accounts**, ensuring the data matches the actual financial transaction, not just the customs filing.
