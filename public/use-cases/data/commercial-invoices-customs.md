---
title: "Commercial Invoices for Customs"
category: "Customs & Trade Compliance"
volume: "Very Large"
retention: "7-10 years (customs audit cycle)"
slug: "commercial-invoices-customs"
tags: ["customs", "export-import", "commercial-invoice", "trade-compliance", "hs-codes", "tariff-valuation", "duty-evasion-prevention"]
furtherDerivations: 1
---

## What is a Customs Invoice?

When goods cross an international border, the most important document is the **Commercial Invoice**. It is the formal bill from the seller to the buyer, but it also acts as the primary "Declaration of Value" for the government.

Customs officers use this invoice to decide:
1.  **HS Classification:** What is the product? (e.g., "Integrated Circuit").
2.  **Valuation:** What is it worth? (e.g., "$50,000").
3.  **Duty/Tax:** How much tax is owed? (e.g., 5% of value).

**"Under-valuation"** is a massive global trade crime. Shady importers often have the exporter send two invoices: a "Real" one for payment, and a "Fake" one with a 90% discount to show Customs. This allows them to evade millions in import duties. **"Tariff Engineering"** is another risk, where the HS code is edited on the paper to a low-duty category. Verified hashes bind the **Exporters' ledger value and the HS Code** to the manufacturer's or the trade platform's domain.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', monospace; border: 1px solid #000; background: #fff; padding: 20px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1);">
  <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
    <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="invoice">[</span>COMMERCIAL INVOICE</div>
    <div style="text-align: right;">
      Invoice #: INV-998877-XK<br>
      Date: March 15, 2026
    </div>
  </div>
<div style="font-size: 0.85em; line-height: 1.4;">
    <div style="display: flex; margin-bottom: 20px;">
      <div style="width: 50%;">
        <strong>EXPORTER (SELLER):</strong><br>
        Shenzhen Tech Components, Ltd.<br>
        Building 4, High-Tech Park<br>
        Shenzhen, GD, China
      </div>
      <div style="width: 50%; padding-left: 20px;">
        <strong>IMPORTER (BUYER):</strong><br>
        EuroLink Distribution, AG<br>
        Industriestrasse 42<br>
        Zurich, CH-8001, Switzerland
      </div>
    </div>
<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr style="border-bottom: 1px solid #000; font-weight: bold;">
        <th style="text-align: left;">Description of Goods</th>
        <th style="text-align: center;">HS Code</th>
        <th style="text-align: right;">Value (USD)</th>
      </tr>
      <tr>
        <td style="padding: 5px 0;">Solid State Drives (512GB Enterprise)</td>
        <td style="text-align: center;">8471.70</td>
        <td style="text-align: right;">$ 45,000.00</td>
      </tr>
      <tr>
        <td style="padding: 5px 0;">Microcontrollers (ARM Cortex-M4)</td>
        <td style="text-align: center;">8542.31</td>
        <td style="text-align: right;">$ 12,500.00</td>
      </tr>
      <tr style="border-top: 2px solid #000; font-weight: bold; font-size: 1.1em;">
        <td colspan="2">TOTAL INVOICE VALUE:</td>
        <td style="text-align: right;">$ 57,500.00</td>
      </tr>
    </table>
<div style="font-size: 0.8em; font-style: italic;">
      Incoterms: CIP Zurich (2020)<br>
      Country of Origin: CHINA<br>
      Container: MSKU-992288-0
    </div>
<div data-verify-line="invoice" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Exporter doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:sz-tech.com/invoices/v/INV998877 <span verifiable-text="end" data-for="invoice">]</span>
    </div>
  </div>
</div>

## Data Verified

Exporter/Seller name, Importer/Buyer name, Invoice number, Line-item descriptions, HS Codes, Unit/Total values, Currency (e.g., USD), Incoterms, Country of Origin, Date of issuance, Container/Reference number.

**Document Types:**
- **Commercial Invoice:** The primary document for customs and payment.
- **Pro Forma Invoice:** For pre-shipment clearance or deposits.
- **Consular Invoice:** Verified by a destination embassy.
- **Credit Memo:** (Linked hash) proving a reduction in value for damaged goods.

## Data Visible After Verification

Shows the issuer domain (the Exporter or their ERP system) and current invoice status.

**Status Indications:**
- **Verified** — Content matches the exporter's official accounts receivable.
- **Paid** — Funds have been received (anti-money laundering proof).
- **Cancelled** — **ALERT:** Transaction voided; invoice is invalid for customs entry.
- **Amended** — A revised invoice exists (linked hash to latest price correction).

## Second-Party Use

The **Importer (Buyer)** benefits from verification.

**Customs Defense:** Proving to Swiss or US Customs that the $57,500 value isn't a "Fake Low Value" to evade taxes. A verified invoice from the exporter's domain makes it impossible for Customs to accuse the importer of "Valuation Fraud" without challenging the exporter directly.

**Trade Financing:** Providing a verified invoice to a bank to secure a Letter of Credit or to authorize a large international wire transfer.

## Third-Party Use

**Customs Authorities (CBP / HMRC / Zoll)**
**Enforcement:** Customs sees millions of invoices daily. OCR-to-hash allows an officer to verify the invoice against the exporter's domain in 5 seconds, catching "Double Invoicing" where high-tariff goods are mislabeled or under-valued on the paper document.

**Lenders and Factoring Firms**
**Asset Verification:** Verifying the "Account Receivable" value of an invoice before lending against it, stopping "Invoicing Fraud" in trade finance.

**Tax Auditors**
**VAT / GST Reconciliation:** Ensuring that the "Export Value" reported by the shipper matches the "Import Value" reported by the buyer across international borders.

## Verification Architecture

**The "Double Invoice" Fraud Problem**

- **Value Stripping:** Editing a $100,000 invoice to read $10,000 to save $20,000 in duties.
- **Code Engineering:** Changing the HS code for "Luxury Goods" to "Basic Materials."
- **Phantom Invoices:** Creating a fake invoice to justify an international wire used for money laundering.

**Issuer Types**

**Exporting Manufacturers:** (Primary source of truth).
**Customs Brokers:** (Managing verification for their clients).
**Trade Platforms:** (e.g., Flexport, Tradeshift, SAP Ariba).

## Competition vs. Customs Single Windows (ACE)

| Feature | OCR-to-Hash | ACE Portal (Gov) | Private EDI |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Trust the Exporter. | **Gov-Bound.** Trust the filing. | **Network-Bound.** |
| **Integrity** | **Binds line items.** Protects prices. | **Data-Only.** Doesn't protect paper. | **High.** |
| **User Access** | **Universal.** Any trucker/bank can verify. | **Restricted.** Requires Gov credentials. | **Siloed.** |
| **Freshness** | **Real-time.** Shows "Cancelled" status. | **Laggy.** Updates take 24-48 hours. | **Live.** |

**Why OCR wins here:** The "Source of Truth." Government databases only know what was *filed*. If the importer files a fake document, the government database reflects the fake. OCR-to-hash links the verifier back to the **Exporter's accounting ledger**, ensuring the data matches the actual financial transaction.