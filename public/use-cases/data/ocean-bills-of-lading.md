---
title: "Ocean Bills of Lading (B/L)"
category: "Shipping & Freight"
volume: "Large"
retention: "7-10 years (legal title / statute of limitations)"
slug: "ocean-bills-of-lading"
tags: ["shipping", "logistics", "bill-of-lading", "trade-finance", "customs-compliance", "maritime-fraud", "document-of-title"]
---

## What is an Ocean Bill of Lading?

The **Ocean Bill of Lading (B/L)** is arguably the most critical document in global commerce. It serves three distinct legal functions:
1.  **Receipt for Goods:** Proving the carrier received the cargo in the stated condition.
2.  **Evidence of Contract:** Outlining the terms of carriage between the shipper and the line.
3.  **Document of Title:** (In "Negotiable" form) The physical paper *is* the ownership of the cargo. Whoever holds the original B/L can claim the containers at the port.

This "Negotiable" status makes the B/L a prime target for high-stakes fraud. Criminals use "Phantom B/Ls" to steal entire shiploads of cargo, or "Double-Finance" the same B/L at two different banks to get two multimillion-dollar loans. Verified hashes bind the **Container IDs, Vessel Name, and Consignee** to the shipping line's domain (e.g., `maersk.com`).

<div style="max-width: 700px; margin: 24px auto; font-family: 'Arial Narrow', sans-serif; border: 1px solid #000; background: #fff; padding: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="background: #002d62; color: #fff; padding: 15px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <div style="font-weight: bold; font-size: 1.4em; letter-spacing: 1px;">MAERSK LINE</div>
      <div style="font-size: 0.7em; opacity: 0.8;">A.P. Moller-Maersk A/S • Esplanaden 50, Copenhagen</div>
    </div>
    <div style="text-align: right;">
      <div style="font-weight: bold; font-size: 1.1em;">BILL OF LADING</div>
      <div style="font-size: 0.8em; opacity: 0.9;">NEGOTIABLE ORIGINAL</div>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid #000;">
    <div style="padding: 10px; border-right: 1px solid #000; font-size: 0.75em; line-height: 1.3;">
      <strong style="text-transform: uppercase; font-size: 0.8em; color: #666;">Shipper:</strong><br>
      GLOBAL COFFEE EXPORTERS LTD.<br>
      AVENIDA PAULISTA 1234<br>
      SÃO PAULO, BRAZIL
    </div>
    <div style="padding: 10px; font-size: 0.75em; line-height: 1.3;">
      <strong style="text-transform: uppercase; font-size: 0.8em; color: #666;">B/L Number:</strong><br>
      <div style="font-size: 1.2em; font-weight: bold;"><span data-bracket="start" data-for="bl">]</span>MAE-9988776655</div>
    </div>
  </div>

  <div style="padding: 10px; border-bottom: 1px solid #000; font-size: 0.75em; line-height: 1.3;">
    <strong style="text-transform: uppercase; font-size: 0.8em; color: #666;">Consignee (to the order of):</strong><br>
    JPMORGAN CHASE BANK, N.A.<br>
    FOR THE ACCOUNT OF: NEW YORK ROASTERS LLC
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; border-bottom: 1px solid #000; font-size: 0.7em; text-transform: uppercase; text-align: center;">
    <div style="padding: 5px; border-right: 1px solid #000;"><strong>Vessel:</strong><br>Maersk Mc-Kinney</div>
    <div style="padding: 5px; border-right: 1px solid #000;"><strong>Port of Loading:</strong><br>Santos, Brazil</div>
    <div style="padding: 5px; border-right: 1px solid #000;"><strong>Port of Discharge:</strong><br>New York, USA</div>
    <div style="padding: 5px;"><strong>Final Destination:</strong><br>Newark, NJ</div>
  </div>

  <div style="padding: 15px;">
    <table style="width: 100%; border-collapse: collapse; font-size: 0.8em;">
      <tr style="border-bottom: 1px solid #eee;">
        <th style="text-align: left; padding: 5px;">Container / Seal No.</th>
        <th style="text-align: left; padding: 5px;">Description of Packages and Goods</th>
        <th style="text-align: right; padding: 5px;">Gross Weight</th>
      </tr>
      <tr>
        <td style="padding: 10px 5px;">MSKU-992288-7<br>ML-BR-442211</td>
        <td style="padding: 10px 5px;">320 BAGS ARABICA COFFEE BEANS<br>(GRADE A / WASHED / 2026 CROP)</td>
        <td style="padding: 10px 5px; text-align: right;">19,200 KG</td>
      </tr>
    </table>
  </div>

  <div style="margin: 20px; padding: 15px; border: 2px solid #d00; border-radius: 4px; color: #d00; text-align: center; font-weight: bold; transform: rotate(-1deg); opacity: 0.8;">
    RELEASE CARGO ONLY UPON PRESENTATION OF THIS ORIGINAL DOCUMENT
  </div>

  <div style="padding: 20px; background: #f9f9f9; border-top: 1px solid #000;">
    <div style="font-size: 0.7em; color: #555; text-align: center; margin-bottom: 10px; font-style: italic;">
      Verification confirms the issuance of this title document by the carrier. Alteration of cargo details renders this B/L void.
    </div>
    <div data-verify-line="bl" style="border-top: 1px dashed #999; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #002d62; text-align: center; font-weight: bold;"
      title="Demo only: Maersk doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:maersk.com/bl/v/MAE9988776655 <span data-bracket="end" data-for="bl">]</span>
    </div>
  </div>
</div>

## Data Verified

B/L number, carrier name, shipper name, consignee name (or "To Order"), vessel name, port of loading, port of discharge, container numbers, seal numbers, description of goods, weight/volume, date of lading, freight status (Prepaid/Collect).

**Document Types:**
- **Negotiable B/L:** The actual document of title.
- **Sea Waybill:** A non-negotiable receipt (used when title isn't traded).
- **House B/L:** Issued by a freight forwarder (rather than the ship line).
- **Switch B/L:** Re-issued midway to hide the original shipper (high risk).

## Data Visible After Verification

Shows the issuer domain (`maersk.com`, `msc.com`, `cmacgm.com`) and the title standing.

**Status Indications:**
- **Valid / Outstanding** — B/L is active; cargo is in transit or at port awaiting claim.
- **Accomplished** — **ALERT:** The cargo has already been picked up; this paper is now historic only.
- **Cancelled** — B/L voided (e.g., due to a "Switch B/L" or correction).
- **Blocked** — **ALERT:** Cargo is under legal or customs hold.

## Second-Party Use

The **Importer (Buyer) / Notify Party** benefits from verification.

**Payment Security:** Before paying a foreign supplier $200,000 for a shipment of coffee, the importer scans the B/L. If the hash returns **"VALID - ISSUED BY MAERSK,"** they know the supplier actually loaded the cargo and isn't just sending a "Photoshopped PDF" to steal the money.

**Port Clearance:** The trucker arriving at the Newark terminal scans the paper B/L. "Verified by Maersk" ensures they won't be turned away at the gate for having a fake or mismatched document.

## Third-Party Use

**Trade Finance Banks**
**Letter of Credit (L/C) Compliance:** Banks only release payment if the B/L perfectly matches the L/C terms. Verified hashes eliminate the "Manual Discrepancy" check, allowing for instant, automated payment triggers. It also prevents "Double Financing" fraud where a borrower uses one B/L to get loans from two different banks.

**Customs Authorities**
**Manifest Audit:** Verifying that the cargo description on the physical B/L matches the carrier's digital manifest, preventing "Misdeclaration of Goods" (e.g., hiding high-duty electronics inside a "Used Clothes" container).

**Marine Insurers**
**Claims Verification:** In the event of a "General Average" or "Cargo Loss" claim, the insurer verifies the original B/L to confirm the value and description of the insured assets.

## Verification Architecture

**The "Phantom Cargo" Fraud Problem**

- **Template Forgery:** Using a shipping line's branding to create a B/L for a ship that doesn't exist or a voyage that never happened.
- **Switch B/L Fraud:** Using a second B/L to sell the same cargo to two different buyers.
- **Status Hiding:** Presenting an "Accomplished" B/L (where cargo was already delivered) to a bank as if it were still "Outstanding" to get a loan.

**Issuer Types**

**Ocean Carriers (Vessel Operators).**
**Non-Vessel Operating Common Carriers (NVOCCs).**
**Port Authorities.**

**Privacy Salt:** Essential. Container contents and trade routes are highly sensitive business secrets. The hash must be salted to prevent competitors from "Scraping" a rival's trade volume.

## Rationale

Ocean B/L verification is the "Holy Grail" of supply chain security. By bridging the gap between the physical paper (required by maritime law) and the digital record, it solves the "Multi-Billion Dollar Trust Problem" at the heart of global trade.