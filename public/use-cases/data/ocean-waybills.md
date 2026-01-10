---
title: "Bills of Lading"
category: "Chain of Custody & Logistics"
volume: "Large"
retention: "Shipment completion plus 7-10 years (disputes, customs audits)"
slug: "ocean-shipping-waybills"
tags: ["bill-of-lading", "bol", "cargo", "cargo-receipt", "customs-clearance", "customs-compliance", "document-of-title", "logistics", "maritime", "maritime-fraud", "non-negotiable", "ocean-freight", "sea-waybill", "shipping", "supply-chain-fraud", "trade-finance"]
furtherDerivations: 3
---

## What is a Bill of Lading?

A **Bill of Lading (B/L)** is the most important document in global trade. It is distinct from an Air Waybill because it is a **Document of Title**. This means the paper document itself represents **ownership** of the goods.

Whoever holds the original "negotiable" B/L effectively owns the cargo. This makes it high-stakes:
1.  **Receipt:** Proof the ship captain received the cargo.
2.  **Contract:** The shipping agreement.
3.  **Title:** The physical "key" to claim the goods at the destination port.

Losing the original B/L is a disaster (requires court bonds to fix), which is why verification of the paper is so critical.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Arial Narrow', sans-serif; border: 1px solid #000; background: #fff; padding: 0;">
  <div style="background: #002d62; color: #fff; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
    <div style="font-weight: bold; font-size: 1.2em;" verifiable-text="start" data-for="bol"><span>[</span>MAERSK LINE</div>
    <div style="font-size: 0.8em; text-align: right;">B/L No: MAE-9988776655</div>
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
      verify:maersk.com/bl/v/9988776655 <span verifiable-text="end" data-for="bol">]</span>
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


---

_[Content merged from: ocean-bills-of-lading]_


## What is an Ocean Bill of Lading?

The **Ocean Bill of Lading (B/L)** is arguably the most critical document in global commerce. It serves three distinct legal functions:
1.  **Receipt for Goods:** Proving the carrier received the cargo in the stated condition.
2.  **Evidence of Contract:** Outlining the terms of carriage between the shipper and the line.
3.  **Document of Title:** (In "Negotiable" form) The physical paper *is* the ownership of the cargo. Whoever holds the original B/L can claim the containers at the port.

This "Negotiable" status makes the B/L a prime target for high-stakes fraud. Criminals use "Phantom B/Ls" to steal entire shiploads of cargo, or "Double-Finance" the same B/L at two different banks to get two multimillion-dollar loans. Verified hashes bind the **Container IDs, Vessel Name, and Consignee** to the shipping line's domain (e.g., `maersk.com`).

<div style="max-width: 700px; margin: 24px auto; font-family: 'Arial Narrow', sans-serif; border: 1px solid #000; background: #fff; padding: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="background: #002d62; color: #fff; padding: 15px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <div style="font-weight: bold; font-size: 1.4em; letter-spacing: 1px;" verifiable-text="start" data-for="bl"><span>[</span>MAERSK LINE</div>
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
      <div style="font-size: 1.2em; font-weight: bold;">MAE-9988776655</div>
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
      verify:maersk.com/bl/v/MAE9988776655 <span verifiable-text="end" data-for="bl">]</span>
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

---

_[Content merged from: sea-waybills]_


## What is a Sea Waybill?

A **Sea Waybill** is a non-negotiable receipt for cargo loaded onto an ocean vessel. Unlike a "Negotiable Bill of Lading," a Sea Waybill is not a document of title—the consignee (buyer) doesn't need to present the original paper to claim the goods. It is used when the parties trust each other and want to avoid the "Paperwork Delay" of mailing physical B/Ls around the world.

While simpler than a B/L, it is still a high-stakes legal proof of shipment. Fraud is common in **Trade Finance**: an exporter might "edit" a Sea Waybill to show 1,000 pallets instead of 100 to get a higher payout from a buyer or a bank. Similarly, shady shippers might hide the presence of dangerous goods. Verified hashes bind the **Container IDs, Gross Weight, and Shipped-on-Board Date** to the carrier's domain (e.g., `maersk.com` or `msc.com`).

<div style="max-width: 650px; margin: 24px auto; font-family: 'Arial Narrow', sans-serif; border: 1px solid #000; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #002d62; color: #fff; padding: 15px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <div style="font-weight: bold; font-size: 1.4em; letter-spacing: 1px;" verifiable-text="start" data-for="way"><span>[</span>MAERSK LINE</div>
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
      <div style="font-size: 1.2em; font-weight: bold;">MAE-9988-7766-55</div>
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
      verify:maersk.com/v/MAE9988776655 <span verifiable-text="end" data-for="way">]</span>
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