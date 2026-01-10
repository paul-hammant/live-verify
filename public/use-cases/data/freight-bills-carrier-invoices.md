---
title: "Freight Bills and Carrier Invoices"
category: "Chain of Custody & Logistics"
volume: "Large"
retention: "7-10 years (payment/audit)"
slug: "freight-bills-carrier-invoices"
tags: ["logistics", "transportation", "freight-bill", "carrier-invoice", "accounts-payable", "audit-trail", "supply-chain-finance"]
furtherDerivations: 1
---

## What is a Freight Bill?

A **Freight Bill** is the invoice from a trucking company to a shipper. It's the bill for moving goods from point A to point B.

It isn't just about the price; it records:
1.  **Fuel Surcharges:** Extra money for gas.
2.  **Detention Fees:** Penalties for making the driver wait too long.
3.  **The Proof:** Linking the bill to the original Bill of Lading.

"Logistics Phishing" is a billion-dollar crime. Hackers take over a trucker's email and send "Updated Invoices" with a different bank account. Verified hashes prevent this by linking the invoice to the carrier's **official domain**, ensuring the money goes to the real driver.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', Courier, monospace; border: 1px solid #000; background: #fff; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
  <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
    <div style="font-weight: bold; font-size: 1.2em;">SCHNEIDER NATIONAL</div>
    <div style="text-align: right;">
      Invoice #: <span verifiable-text="start" data-for="freight-inv">[</span>INV-998877-SN<br>
      Date: 15 MAR 2026
    </div>
  </div>
<div style="font-size: 0.85em; line-height: 1.4;">
    <p><strong>Shipper:</strong> Acme Manufacturing<br>
    <strong>Consignee:</strong> Global Distribution Center<br>
    <strong>B/L Number:</strong> MAE-442211</p>
<table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
      <tr style="border-bottom: 1px solid #000; font-weight: bold;">
        <th style="text-align: left;">Charge Description</th>
        <th style="text-align: right;">Amount</th>
      </tr>
      <tr>
        <td style="padding: 5px 0;">Linehaul Freight (500 Miles)</td>
        <td style="text-align: right;">$ 1,250.00</td>
      </tr>
      <tr>
        <td style="padding: 5px 0;">Fuel Surcharge (FSC)</td>
        <td style="text-align: right;">$ 312.50</td>
      </tr>
      <tr>
        <td style="padding: 5px 0;">Detention Fee (2 Hours)</td>
        <td style="text-align: right;">$ 150.00</td>
      </tr>
      <tr style="border-top: 2px solid #000; font-weight: bold;">
        <td>TOTAL AMOUNT DUE:</td>
        <td style="text-align: right;">$ 1,712.50</td>
      </tr>
    </table>
<div style="background: #eee; padding: 10px; font-size: 0.8em;">
      <strong>Payment Terms:</strong> Net 30 Days. Please remit to: Wells Fargo Lockbox #99228.
    </div>
<div data-verify-line="freight-inv" style="border-top: 1px dashed #999; margin-top: 25px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Schneider doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:schneider.com/invoices/v/SN998877 <span verifiable-text="end" data-for="freight-inv">]</span>
    </div>
  </div>
</div>

## Data Verified

Invoice number, Carrier name, Shipper name, Bill of Lading (B/L) reference, total freight charge, line-item breakdown (Linehaul, Fuel, Accessorials), payment terms, date of issuance, delivery confirmation link.

**Document Types:**
- **Freight Bill:** The official demand for payment.
- **Carrier Invoice:** (Often used interchangeably with Freight Bill).
- **Pro-Forma Freight Estimate:** For pre-shipment budgeting.
- **Supplemental Invoice:** For fees found after delivery (e.g., re-weighing).

## Data Visible After Verification

Shows the issuer domain (`schneider.com`, `swifttrans.com`, `dhl.com`) and invoice status.

**Status Indications:**
- **Outstanding** — Invoice is valid and awaiting payment.
- **Paid** — Funds have been received and applied to the ledger.
- **In-Dispute** — Customer has challenged a fee (e.g., detention charge).
- **Amended** — Replaced by a corrected version (e.g., fuel surcharge adjustment).

## Second-Party Use

The **Shipper (Customer)** benefits from verification.

**Audit Compliance:** Proving to their internal finance auditors that the $1,712 freight payment wasn't a "Fake Invoice" from a spoofed email. A verified hash from the carrier's domain removes the #1 risk in Logistics Accounts Payable: **Fraudulent Change of Bank Details.**

**Dispute Resolution:** If the carrier claims the bill is $2,000 but the verified invoice says $1,712, the shipper has cryptographically solid proof of the original agreed amount.

## Third-Party Use

**Freight Audit & Payment (FAP) Firms**
**Automated Vetting:** FAP firms (e.g., Cass Information Systems, U.S. Bank) process millions of invoices. OCR-to-hash allows them to instantly verify carrier authenticity without manual "Carrier Onboarding" or phone verification for every new small trucker.

**Factoring Companies**
**Invoice Financing:** Banks that buy carrier invoices (factoring) verify the freight bill hash to ensure the shipment is legitimate and the amount hasn't been "Padded" before they advance cash to the trucker.

**Tax Authorities**
**VAT / GST Reconciliation:** Ensuring that the tax deductions claimed for freight expenses match the verified revenue reported by the carriers.

## Verification Architecture

**The "Logistics Phishing" Fraud Problem**

- **Business Email Compromise (BEC):** Hackers taking over a trucking company's email and sending "Updated Invoices" with a different bank account. OCR-to-hash prevents this by linking the paper to the carrier's *domain*, not an email account.
- **Detention Fee Padding:** Shady drivers adding a "2-hour wait" fee ($150) to the paper invoice that wasn't authorized in the central system.
- **Ghost Invoices:** Creating a fake invoice for a shipment that was never actually picked up or delivered.

**Issuer Types**

**Asset-Based Carriers:** (Schneider, SwiftTrans, Old Dominion).
**3PL Brokers:** (C.H. Robinson, TQL).
**Supply Chain Platforms:** (e.g., Project44, FourKites).

## Competition vs. EDI (Electronic Data Interchange)

| Feature | OCR-to-Hash | EDI 210 (Invoicing) | Scanned PDF Invoice |
| :--- | :--- | :--- | :--- |
| **User Access** | **Universal.** Any small shipper/auditor. | **Restricted.** Requires heavy IT setup and VAN fees. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Carrier. | **System-Bound.** | **Zero.** Easily forged. |
| **Interoperability** | **High.** Works for any trucker with a URL. | **Low.** Small truckers don't use EDI. | **Universal.** |
| **Integrity** | **Binds Line Items.** Protects the FSC. | **Data-Only.** | **Vulnerable.** |

**Why OCR wins here:** The "Long Tail" of Trucking. While the top 100 carriers use EDI, there are 500,000 small trucking companies in the USA who only use PDF invoices. OCR-to-hash turns those **PDFs and Paper Bills** into cryptographically trusted digital artifacts, bringing "EDI-level" trust to the entire industry without the "EDI-level" cost.
