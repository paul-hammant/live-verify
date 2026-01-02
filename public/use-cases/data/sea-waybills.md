---
title: "Sea Waybills (Non-Negotiable B/L)"
category: "Shipping & Freight"
volume: "Very Large"
retention: "7-10 years (proof of shipment / tax audit)"
slug: "sea-waybills"
tags: ["logistics", "shipping", "sea-waybill", "non-negotiable", "ocean-freight", "customs-clearance", "supply-chain-fraud", "cargo-receipt"]
---

## What is a Sea Waybill?

A **Sea Waybill** is a non-negotiable receipt for cargo loaded onto an ocean vessel. Unlike a "Negotiable Bill of Lading," a Sea Waybill is not a document of title—the consignee (buyer) doesn't need to present the original paper to claim the goods. It is used when the parties trust each other and want to avoid the "Paperwork Delay" of mailing physical B/Ls around the world.

While simpler than a B/L, it is still a high-stakes legal proof of shipment. Fraud is common in **Trade Finance**: an exporter might "edit" a Sea Waybill to show 1,000 pallets instead of 100 to get a higher payout from a buyer or a bank. Similarly, shady shippers might hide the presence of dangerous goods. Verified hashes bind the **Container IDs, Gross Weight, and Shipped-on-Board Date** to the carrier's domain (e.g., `maersk.com` or `msc.com`).

<div style="max-width: 650px; margin: 24px auto; font-family: 'Arial Narrow', sans-serif; border: 1px solid #000; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #002d62; color: #fff; padding: 15px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <div style="font-weight: bold; font-size: 1.4em; letter-spacing: 1px;">MAERSK LINE</div>
      <div style="font-size: 0.7em; opacity: 0.8; text-transform: uppercase;">A.P. Moller-Maersk A/S • Copenhagen</div>
    </div>
    <div style="text-align: right;">
      <div style="font-weight: bold; font-size: 1.1em;">SEA WAYBILL</div>
      <div style="font-size: 0.7em; opacity: 0.9;">NON-NEGOTIABLE RECEIPT</div>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid #000;">
    <div style="padding: 10px; border-right: 1px solid #000; font-size: 0.75em; line-height: 1.3;">
      <strong style="text-transform: uppercase; color: #666;">Shipper:</strong><br>
      SHENZHEN ELECTRONICS MFG LTD.<br>
      FUTIAN DISTRICT, SHENZHEN, CN
    </div>
    <div style="padding: 10px; font-size: 0.75em; line-height: 1.3;">
      <strong style="text-transform: uppercase; color: #666;">Waybill Number:</strong><br>
      <div style="font-size: 1.2em; font-weight: bold;"><span data-bracket="start" data-for="way">]</span>MAE-9988-7766-55</div>
    </div>
  </div>

  <div style="padding: 10px; border-bottom: 1px solid #000; font-size: 0.75em; line-height: 1.3;">
    <strong style="text-transform: uppercase; color: #666;">Consignee:</strong><br>
    GLOBAL RETAIL IMPORTS LLC, LOS ANGELES, CA, USA
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; border-bottom: 1px solid #000; font-size: 0.7em; text-transform: uppercase; text-align: center;">
    <div style="padding: 5px; border-right: 1px solid #000;"><strong>Vessel:</strong><br>Maersk Sealand</div>
    <div style="padding: 5px; border-right: 1px solid #000;"><strong>Voyage:</strong><br>2604W</div>
    <div style="padding: 5px; border-right: 1px solid #000;"><strong>Port of Loading:</strong><br>Yantian, CN</div>
    <div style="padding: 5px;"><strong>Place of Delivery:</strong><br>Los Angeles, USA</div>
  </div>

  <div style="padding: 15px;">
    <table style="width: 100%; border-collapse: collapse; font-size: 0.8em;">
      <tr style="border-bottom: 1px solid #eee;">
        <th style="text-align: left; padding: 5px;">Container / Seal No.</th>
        <th style="text-align: left; padding: 5px;">Description of Goods</th>
        <th style="text-align: right; padding: 5px;">Gross Weight</th>
      </tr>
      <tr>
        <td style="padding: 10px 5px;">MSKU-9876-543<br>SEAL: 884422</td>
        <td style="padding: 10px 5px;">800 CARTONS CONSUMER ELECTRONICS<br>(SMARTPHONES / TABLETS)</td>
        <td style="padding: 10px 5px; text-align: right;">12,450 KG</td>
      </tr>
    </table>
  </div>

  <div style="margin: 10px 20px; border: 1px solid #000; padding: 10px; text-align: center; font-weight: bold; font-size: 0.9em; background: #f9f9f9;">
    SHIPPED ON BOARD: MARCH 15, 2026
  </div>

  <div style="padding: 20px; background: #fdfdfd; border-top: 1px solid #000; text-align: center;">
    <div data-verify-line="way" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #002d62; font-weight: bold;"
      title="Demo only: Maersk doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:maersk.com/v/MAE9988776655 <span data-bracket="end" data-for="way">]</span>
    </div>
    <div style="font-size: 0.7em; color: #666; margin-top: 10px; font-style: italic;">
      Scan to verify Shipped-on-Board status, container seal integrity, and consignee authorization.
    </div>
  </div>
</div>

## Data Verified

Waybill number, carrier name, shipper name, consignee name, notify party, vessel name, voyage number, port of loading, port of discharge, container numbers, seal numbers, description of goods, gross weight, shipped-on-board date, freight status.

**Document Types:**
- **Sea Waybill:** The primary non-negotiable receipt.
- **Express Release:** Proof that goods can be released without paper.
- **Booking Confirmation:** (Linked hash) the pre-loading intent.
- **Freight Invoice:** Final bill tied to the waybill weight.

## Data Visible After Verification

Shows the issuer domain (`maersk.com`, `msc.com`, `cosco.com`) and the shipment standing.

**Status Indications:**
- **Shipped on Board** — Goods are verified as loaded onto the vessel.
- **Delivered / Released** — **ALERT:** The cargo has already been picked up.
- **Amended** — **ALERT:** An error in weight or cargo description was corrected.
- **Hold Active** — **CRITICAL:** Cargo is under a customs or carrier lien.

## Second-Party Use

The **Importer (Buyer) / Notify Party** benefits from verification.

**Customs Clearance Speed:** When the ship is 3 days from port, the importer provides the verified hash of the Sea Waybill to the local Customs authority. The officer can instantly see **"VERIFIED WEIGHT: 12,450 KG"** on their screen, allowing the shipment to clear "Pre-Arrival" and removing the need for a physical inspection at the dock.

**Accounts Payable Approval:** The importer's finance system scans the verified waybill. "Verified by Maersk" ensures the goods were actually shipped on 15 MAR, triggering the final payment to the supplier without waiting for a manual email confirmation.

## Third-Party Use

**Freight Forwarders / 3PLs**
**Inland Handoff:** Before a trucker picks up the container at the terminal, the terminal operator scans the waybill hash. Verification ensures the trucker is working for the correct consignee and that the container has been legally "Released" by the ship line.

**Trade Finance Banks**
**Risk Management:** While Sea Waybills don't convey title, banks still use them to track "Goods in Transit." Verified hashes allow the bank to monitor the status of $100M+ in global inventory in real-time, protecting their open-account credit lines.

**Insurance Claims Adjusters**
**Damage Verification:** If cargo is damaged, the insurer verifies the original "Gross Weight" and "Seal Number" on the waybill hash to ensure the damage didn't occur during a secondary inland transit.

## Verification Architecture

**The "Paper Pirate" Fraud Problem**

- **Weight Padding:** Editing a PDF to show 10% more weight to over-charge a buyer for raw materials.
- **Date Back-Dating:** Changing a 20 MAR "Shipped" date to 15 MAR to meet a contractual "Cancel Date."
- **Identity Swapping:** Editing the "Consignee Name" on a PDF to trick a terminal into releasing a container to a thief.

**Issuer Types**

**Global Ocean Carriers.**
**Digital Freight Platforms (e.g., Flexport).**
**Port Community Hubs.**

**Privacy Salt:** Essential. Specific buyer names and high-value cargo weights are sensitive trade secrets. The hash must be salted to prevent "Trade Lane Mapping" by competitors.

## Rationale

Sea Waybills are the "High-Speed Rail" of maritime paper. By turning static receipts into verifiable digital bridges, we ensure that the "Trust" required for express shipping is backed by cryptographic proof, protecting the global supply chain from the high cost of manual auditing.