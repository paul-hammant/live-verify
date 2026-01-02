---
title: "Purchase Orders and Delivery Notes"
category: "Business & Commerce"
volume: "Large"
retention: "Fiscal year + 7 years (tax/audit requirements)"
slug: "purchase-orders-delivery-notes"
tags: ["procurement", "supply-chain", "purchase-order", "delivery-note", "grn", "invoice-factoring", "three-way-match", "business-fraud"]
---

## What are Purchase Orders and Delivery Notes?

In B2B commerce, the **Purchase Order (PO)** is the official offer to buy, and the **Delivery Note** (or Packing Slip) is the proof that the offer was fulfilled. Together with the invoice, they form the "Three-Way Match" required for corporate payments.

These documents are high-value targets for **Invoice Factoring Fraud**. A dishonest supplier might create a fake PO from a reputable company (like Apple or Walmart) to get a multimillion-dollar "Advance" from a bank. Similarly, a buyer might "alter" a delivery note to claim they received fewer items than were actually shipped. Verified hashes bind the **Order IDs, Quantities, and Unit Prices** to the issuer's domain (e.g., `amazon.com` or `boeing.com`).

<div style="max-width: 650px; margin: 24px auto; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="padding: 25px; border-bottom: 2px solid #000; display: flex; justify-content: space-between; align-items: flex-start;">
    <div>
      <div style="font-weight: bold; font-size: 1.4em; color: #333;">ACME MANUFACTURING CORP.</div>
      <div style="font-size: 0.8em; color: #666; margin-top: 5px;">Procurement Office • 123 Factory Lane</div>
    </div>
    <div style="text-align: right;">
      <h2 style="margin: 0; color: #000; font-size: 1.5em; letter-spacing: 1px;">PURCHASE ORDER</h2>
      <div style="font-size: 1.1em; font-weight: bold; margin-top: 5px; color: #d32f2f;"># <span data-bracket="start" data-for="po">]</span>PO-2026-992288</div>
    </div>
  </div>

  <div style="padding: 25px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 0.85em;">
    <div style="border: 1px solid #eee; padding: 15px; background: #f9f9f9;">
      <strong style="text-transform: uppercase; color: #888;">Vendor:</strong><br>
      GLOBAL COMPONENTS LTD.<br>
      42 TECH PARK, SHENZHEN, CN
    </div>
    <div style="border: 1px solid #eee; padding: 15px; background: #f9f9f9;">
      <strong style="text-transform: uppercase; color: #888;">Ship To:</strong><br>
      ACME CENTRAL WAREHOUSE<br>
      DOCK 4, SPRINGFIELD, USA
    </div>
  </div>

  <div style="padding: 0 25px 25px 25px;">
    <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
      <tr style="border-bottom: 2px solid #000; background: #eee;">
        <th style="text-align: left; padding: 10px;">Item Description</th>
        <th style="text-align: center; padding: 10px;">Qty</th>
        <th style="text-align: right; padding: 10px;">Unit Price</th>
        <th style="text-align: right; padding: 10px;">Total</th>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 10px;">Titanium Fasteners - Grade 5 (Box of 100)</td>
        <td style="text-align: center; padding: 10px;">50</td>
        <td style="text-align: right; padding: 10px;">$ 120.00</td>
        <td style="text-align: right; padding: 10px;">$ 6,000.00</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 10px;">High-Pressure Seals (Spec #992)</td>
        <td style="text-align: center; padding: 10px;">200</td>
        <td style="text-align: right; padding: 10px;">$ 45.50</td>
        <td style="text-align: right; padding: 10px;">$ 9,100.00</td>
      </tr>
      <tr style="font-weight: bold; font-size: 1.1em;">
        <td colspan="3" style="text-align: right; padding: 15px;">TOTAL ORDER VALUE (USD):</td>
        <td style="text-align: right; padding: 15px; background: #ffffcc;">$ 15,100.00</td>
      </tr>
    </table>
  </div>

  <div style="padding: 20px; background: #f5f5f5; border-top: 1px solid #eee;">
    <div style="font-size: 0.75em; color: #555; text-align: center; margin-bottom: 10px; font-style: italic;">
      This PO is a legally binding offer once accepted. Scan to verify procurement authority and order integrity.
    </div>
    <div data-verify-line="po" style="border-top: 1px dashed #999; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #333; text-align: center; font-weight: bold;"
      title="Demo only: Corporations don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:acme-mfg.com/procure/v/PO2026992288 <span data-bracket="end" data-for="po">]</span>
    </div>
  </div>
</div>

## Data Verified

PO/Order number, buyer name, vendor name, item descriptions (SKUs), quantities, unit prices, total order value, ship-to address, delivery date, authorization signature ID.

**Document Types:**
- **Purchase Order (PO):** The initiating contract.
- **Delivery Note / Packing Slip:** Accompanies the physical goods.
- **Goods Received Note (GRN):** Signed by the buyer upon receipt.
- **Pro-Forma Invoice:** A preliminary bill used for customs/financing.

## Data Visible After Verification

Shows the issuer domain (`acme-mfg.com`, `apple.com`, `ge.com`) and the order standing.

**Status Indications:**
- **Open / Authorized** — Order is valid and awaiting fulfillment.
- **Partially Received** — Some items have been delivered and verified.
- **Closed / Fulfilled** — Order is completed; no further deliveries allowed.
- **Cancelled** — **ALERT:** The buyer has revoked this order.

## Second-Party Use

The **Vendor (Seller)** benefits from verification.

**Production Confidence:** Before ordering $50,000 in raw materials to fulfill a big order, the vendor scans the buyer's PO. "Verified by Acme Corp" ensures they aren't working on a "Phantom Order" created by a rogue employee or a scammer.

**Speed of Payment:** By attaching a verified "Delivery Note" hash to their invoice, the vendor allows the buyer's system to perform an instant "Three-Way Match," reducing the payment cycle from 60 days to 5 days.

## Third-Party Use

**Banks and Factoring Firms**
**Financing Security:** A vendor asks for a loan against a $1M Purchase Order. The bank scans the PO. If the hash returns **"OPEN - ISSUED BY FORTUNE 500 CO,"** they can release the funds immediately. This eliminates "Fake Invoice" fraud, which costs the industry billions.

**External Auditors**
**Inventory Audit:** During a year-end audit, the accountant scans a random sample of "Goods Received Notes." OCR-to-hash ensures the company isn't "Padding" its inventory with fake delivery paperwork.

**Customs and Tax Authorities (VAT/GST)**
**Trade Integrity:** Verifying that the value stated on the "Delivery Note" matches the price authorized on the "Purchase Order," preventing "Under-Invoicing" to evade import duties.

## Verification Architecture

**The "Paper Profit" Fraud Problem**

- **Quantity Inflation:** Changing "10 units" to "100 units" on a packing slip to get paid for goods never shipped.
- **Price Padding:** Editing a PO to show a higher price than what was agreed.
- **Ghost Orders:** Creating a fake PO from a real company to use as collateral for a bank loan.

**Issuer Types**

**Corporate Procurement Portals (ERP).**
**EDI Gateways.**
**Government Purchasing Agencies.**

**Privacy Salt:** High. Corporate trade volumes and pricing are highly sensitive "Trade Secrets." The hash must be salted to prevent competitors from mapping a company's supply chain or pricing strategy.

## Rationale

B2B commerce relies on "Document Chains." By turning each link in the chain (PO → Delivery → Invoice) into a verifiable digital bridge, we eliminate the friction and fraud that currently plague global supply chains.