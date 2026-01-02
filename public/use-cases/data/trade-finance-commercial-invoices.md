---
title: "Trade Finance: Commercial Invoices"
category: "Trade Finance"
volume: "Very Large"
retention: "7-10 years (tax / customs / audit lifecycle)"
slug: "trade-finance-commercial-invoices"
tags: ["trade-finance", "commercial-invoice", "customs-valuation", "tbml", "money-laundering", "incoterms", "export-billing", "tariff-evasion"]
---

## What is a Trade Finance Invoice?

In global commerce, the **Commercial Invoice** is the ultimate bill. It defines the value of the goods, the currency of payment, and the **Incoterms** (who pays for shipping/insurance). For a bank or a customs officer, this document is the "Proof of Value."

This document is the primary engine for **Trade-Based Money Laundering (TBML)** and **Tax Evasion**. Scammers use "Under-Invoicing" (editing a $1M invoice to show $100k) to evade import duties, or "Over-Invoicing" (editing a $10k invoice to show $1M) to illegally move large sums of cash across borders. Verified hashes bind the **Total Value, Unit Prices, and Buyer/Seller IDs** to the exporter's or the platform's domain (e.g., `samsung.com` or `tradelens.com`).

<div style="max-width: 700px; margin: 24px auto; font-family: 'Courier New', Courier, monospace; border: 1px solid #333; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="padding: 25px; border-bottom: 2px solid #000; background: #f9f9f9; display: flex; justify-content: space-between; align-items: flex-start;">
    <div>
      <div style="font-weight: bold; font-size: 1.4em;">GLOBAL TEXTILES EXPORT LTD.</div>
      <div style="font-size: 0.8em; color: #666;">VAT ID: AE-99228877 • Dubai, UAE</div>
    </div>
    <div style="text-align: right;">
      <h2 style="margin: 0; font-size: 1.2em; letter-spacing: 1px;">COMMERCIAL INVOICE</h2>
      <div style="font-size: 1.1em; font-weight: bold; margin-top: 5px;"># <span data-bracket="start" data-for="invoice">]</span>INV-2026-8844</div>
    </div>
  </div>

  <div style="padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 0.85em; line-height: 1.4; border-bottom: 1px solid #eee;">
    <div>
      <strong style="text-transform: uppercase; color: #888;">Consignee / Buyer:</strong><br>
      NEW YORK FASHION HUBS LLC<br>
      42 WALL STREET, NEW YORK, USA
    </div>
    <div style="text-align: right;">
      <strong>Date:</strong> 15 MAR 2026<br>
      <strong>Incoterms:</strong> CIF NEW YORK<br>
      <strong>Payment:</strong> L/C #992288
    </div>
  </div>

  <div style="padding: 0;">
    <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
      <tr style="background: #eee; border-bottom: 2px solid #000;">
        <th style="text-align: left; padding: 10px;">Item / HS Code</th>
        <th style="text-align: center; padding: 10px;">Qty</th>
        <th style="text-align: right; padding: 10px;">Unit Price</th>
        <th style="text-align: right; padding: 10px;">Total</th>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 10px;">100% Cotton Yarn (HS: 5205.11)</td>
        <td style="text-align: center; padding: 10px;">5,000 KG</td>
        <td style="text-align: right; padding: 10px;">$ 8.50</td>
        <td style="text-align: right; padding: 10px;">$ 42,500.00</td>
      </tr>
      <tr style="font-weight: bold; font-size: 1.1em; background: #fffbe6;">
        <td colspan="3" style="text-align: right; padding: 15px;">TOTAL INVOICE VALUE (USD):</td>
        <td style="text-align: right; padding: 15px;">$ 42,500.00</td>
      </tr>
    </table>
  </div>

  <div style="padding: 25px; background: #fdfdfd; border-top: 1px solid #000; text-align: center;">
    <div style="font-size: 0.7em; color: #555; margin-bottom: 10px; font-style: italic;">
      Verification confirms the financial integrity of this billing record against the exporter's ledger.
    </div>
    <div data-verify-line="invoice" style="border-top: 1px dashed #999; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.85em; color: #000; font-weight: bold;"
      title="Demo only: Exporters don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:globaltextiles.ae/v/INV20268844 <span data-bracket="end" data-for="invoice">]</span>
    </div>
  </div>
</div>

## Data Verified

Invoice number, exporter name/VAT ID, importer name, invoice date, itemized list of goods, HS Codes (Harmonized System), unit quantities, unit prices, total invoice value, currency (e.g., USD/EUR), Incoterms (e.g., FOB/CIF), payment terms, bank account ID.

**Document Types:**
- **Commercial Invoice:** The primary bill for customs/payment.
- **Pro-Forma Invoice:** A preliminary bill for financing.
- **Consular Invoice:** (Linked hash) certified by an embassy.
- **Credit Note:** Proof of value reduction for damaged goods.

## Data Visible After Verification

Shows the issuer domain (`samsung.com`, `zara.com`, `tradelens.com`) and the billing standing.

**Status Indications:**
- **Active / Verified** — Invoice matches the exporter's official accounts receivable.
- **Paid / Settled** — **ALERT:** The invoice has already been paid (prevents double-financing).
- **Price Mismatch** — **CRITICAL:** The value on the paper was altered from the digital truth.
- **Cancelled** — **ALERT:** The transaction was voided; this paper is worthless.

## Second-Party Use

The **Exporter (Seller)** benefits from verification.

**Bank Financing Speed:** When selling a $1M invoice to a bank (Factoring), the exporter provides the verified hash. The bank can instantly see **"VERIFIED VALUE: $1M"** on their phone, removing the 3-day "Buyer Verification" call and getting the exporter their cash today.

**Customs Defense:** If a customs officer suspects "Under-Invoicing," the exporter can show the verified "Current" hash. This proves the price on the paper is the *exact* price recorded in their audited global accounting system, stopping a costly seizure.

## Third-Party Use

**Customs & Border Protection (CBP)**
**Valuation Vetting:** Officers scan the invoice hash at the port. Verification ensures the importer hasn't "Shrunk" the value to evade 25% import tariffs, protecting the national tax revenue.

**Trade Finance Banks**
**TBML Prevention:** Banks can't manually check the market price of every item. OCR-to-hash allows their system to bulk-verify that thousands of invoices match the digital records of reputable exporters, stopping "Over-Invoicing" scams used to move criminal cash.

**Tax Authorities (VAT / GST)**
**Refund Audit:** Verifying that a company's "Input Tax Credit" claims are backed by authentic, verified invoices from legitimate suppliers.

## Verification Architecture

**The "Price Pivot" Fraud Problem**

- **Under-Invoicing:** Editing a $100,000 PDF to read $10,000 to save $22,500 in import duties.
- **Over-Invoicing:** Editing a $10,000 PDF to read $100,000 to "justify" a large outgoing wire to a shell company abroad.
- **Duplicate Financing:** Presenting the same physical invoice to three different banks for three different loans.

**Issuer Types**

**Global Corporate ERPs (SAP, Oracle).**
**EDI Hubs (e.g., OpenText, GXS).**
**Government e-Invoicing Portals (e.g., in Brazil or Italy).**

**Privacy Salt:** Highly Critical. Invoice pricing and buyer lists are sensitive business secrets. The hash must be salted and access restricted to authorized customs and banking IPs.

## Rationale

The commercial invoice is the "DNA of Global Wealth." By turning static bills into verifiable digital bridges, we protect the global tax base and the banking system from the multi-billion dollar cost of trade-based fraud.