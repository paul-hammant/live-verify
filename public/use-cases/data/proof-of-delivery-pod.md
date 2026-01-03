---
title: "Proof of Delivery (POD) and Delivery Receipts"
category: "Chain of Custody & Logistics"
volume: "Very Large"
retention: "Delivery + 3-7 years (statute of limitations)"
slug: "proof-of-delivery-pod"
tags: ["logistics", "shipping", "pod", "delivery-receipt", "supply-chain", "dispute-resolution", "freight-fraud"]
furtherDerivations: 1
---

## What is a Proof of Delivery (POD)?

In the logistics industry, the **Proof of Delivery (POD)** is the legal evidence that a shipment was successfully handed over to the recipient. It acts as the "Off-Ramp" for liability: once the POD is signed, the carrier is typically no longer responsible for the goods.

Fraud is rampant in high-value shipping (electronics, pharmaceuticals). Dishonest receivers may claim **"Goods Never Received"** despite signing for them, or dishonest drivers may forge a signature to hide a theft or a late delivery. Verified hashes bind the **Tracking Number, Timestamp, and Recipient Name** to the carrier's domain, creating an indisputable audit trail.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Arial Narrow', sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #ffcc00; color: #000; padding: 15px; display: flex; justify-content: space-between; align-items: center;">
    <div style="font-weight: bold; font-size: 1.5em; letter-spacing: -1px;">DHL EXPRESS</div>
    <div style="text-align: right;">
      <div style="font-weight: bold; font-size: 0.9em;">DELIVERY RECEIPT</div>
      <div style="font-size: 0.7em;">Official Record of Handoff</div>
    </div>
  </div>
<div style="padding: 25px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 25px; border-bottom: 1px solid #eee; padding-bottom: 15px;">
      <div>
        <div style="font-size: 0.7em; color: #888; text-transform: uppercase;">Waybill Number</div>
        <div style="font-size: 1.2em; font-weight: bold;"><span data-bracket="start" data-for="pod">[</span>JD-9922-8877-66</div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 0.7em; color: #888; text-transform: uppercase;">Delivery Date/Time</div>
        <div style="font-size: 1.1em; font-weight: bold;">15 MAR 2026 • 14:22 GMT</div>
      </div>
    </div>
<div style="font-size: 0.9em; line-height: 1.6; color: #333;">
      <div style="margin-bottom: 15px;">
        <strong>Consignee:</strong> GLOBAL TECH SOLUTIONS, INC.<br>
        <strong>Address:</strong> 42 Innovation Way, London, UK
      </div>
<table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr style="background: #f9f9f9; border-bottom: 1px solid #eee;">
          <th style="text-align: left; padding: 8px; font-size: 0.8em;">Items</th>
          <th style="text-align: center; padding: 8px; font-size: 0.8em;">Qty</th>
          <th style="text-align: right; padding: 8px; font-size: 0.8em;">Status</th>
        </tr>
        <tr>
          <td style="padding: 8px;">Network Server Rack - 4U</td>
          <td style="text-align: center; padding: 8px;">3</td>
          <td style="text-align: right; padding: 8px; color: #2e7d32; font-weight: bold;">INTACT</td>
        </tr>
      </table>
<div style="margin-top: 20px; display: flex; align-items: center; border: 1px solid #eee; padding: 15px; background: #fffbe6;">
        <div style="flex-grow: 1;">
          <strong>Signed By:</strong> <span style="font-family: cursive; font-size: 1.2em;">Sarah Jenkins</span><br>
          <span style="font-size: 0.8em; color: #666;">Security Supervisor (Emp #992)</span>
        </div>
        <div style="width: 60px; height: 60px; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; font-size: 0.5em; color: #999; text-align: center;">ID PHOTO<br>LOGGED</div>
      </div>
    </div>
<div data-verify-line="pod" style="border-top: 1px dashed #bbb; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #d40511; text-align: center; font-weight: bold;"
      title="Demo only: DHL doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:dhl.com/pod/v/JD9922887766 <span data-bracket="end" data-for="pod">]</span>
    </div>
  </div>
</div>

## Data Verified

Waybill/Tracking number, carrier ID, consignee name, delivery address, quantity of items, condition status (Intact/Damaged), recipient signature (via hash), delivery photo (via hash), GPS coordinates of handoff, driver ID.

**Document Types:**
- **Electronic POD (ePOD):** Generated on the driver's handheld device.
- **Paper Delivery Receipt:** The traditional "Carbon Copy" signed at the dock.
- **Door-Drop Photo Proof:** For residential deliveries without signature.

## Data Visible After Verification

Shows the issuer domain (`dhl.com`, `fedex.com`, `maersk.com`) and the delivery standing.

**Status Indications:**
- **Delivered** — Goods successfully handed over and signed for.
- **Refused** — Recipient rejected the shipment (e.g., due to damage).
- **Returned** — Goods back in carrier possession.
- **Contested** — **ALERT:** Recipient has filed a claim of non-delivery.

## Second-Party Use

The **Consignee (Receiver)** benefits from verification.

**Inventory Integrity:** A warehouse manager receiving 500 pallets can scan the driver's POD to ensure the "Quantity Received" digitally recorded matches what is on the paper before the driver leaves the site.

**Payment Authorization:** Accounts Payable departments use verified PODs as the "Trigger" to pay vendor invoices. A verified hash removes the 3-day delay of waiting for a scanned paper copy to arrive in the system.

## Third-Party Use

**Shippers (The Sender)**
**Revenue Recognition:** Under accounting rules (ASC 606), a company can't book revenue until delivery occurs. Verified PODs provide the "Audit-Proof" evidence needed for quarterly financial reporting.

**Insurance Underwriters**
**Claims Adjudication:** When a $50,000 server goes missing, the insurer scans the POD. If the hash returns **"DELIVERED - SIGNATURE VERIFIED,"** they can deny the claim and focus on internal theft at the destination.

**Customs Brokers**
**Import Clearance:** Proving to tax authorities that goods entered the country and were delivered to the registered importer, preventing "Diversion Fraud."

## Verification Architecture

**The "Phantom Delivery" Fraud Problem**

- **Signature Forgery:** Drivers signing "John Doe" and keeping the goods.
- **Quantity Tampering:** A receiver changing "10 Boxes" to "8 Boxes" on the paper after the driver leaves to claim a shortage.
- **Backdating:** Changing the delivery date to avoid "Late Delivery" penalties in a service contract.

**Issuer Types**

**Global Logistics Integrators.**
**Local Last-Mile Couriers.**
**Internal Corporate Fleets.**

**Privacy Salt:** Essential. Tracking numbers and addresses are sensitive. The hash must be salted to prevent "Tracking Number Harvesting" by data scrapers.

## Rationale

Proof of Delivery is the "Closing Link" in the global supply chain. OCR-to-hash turns a fleeting physical event (the handoff) into a permanent, verifiable digital fact, reducing billions in "Loss and Dispute" costs annually.