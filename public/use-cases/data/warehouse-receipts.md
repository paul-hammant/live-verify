---
title: "Warehouse Receipts & Inventory Warrants"
category: "Warehousing & Inventory"
volume: "Medium-Small"
retention: "7-10 years (financial audit, loan lifecycle)"
slug: "warehouse-receipts"
tags: ["logistics", "trade-finance", "commodities", "warehouse", "fraud-prevention"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', Courier, monospace; border: 4px double #000; background: #fffbe6; padding: 20px;">
  <div style="text-align: center; border-bottom: 1px solid #000; padding-bottom: 10px; margin-bottom: 15px;">
    <strong>METRO STORAGE & LOGISTICS</strong><br>
    ROTTERDAM TERMINAL • SHED 42
  </div>
  <div style="font-size: 0.9em; line-height: 1.4;">
    <p><strong>Warrant No:</strong> MSL-ROT-88429<br>
    <strong>Depositor:</strong> Global Metals Trading Corp<br>
    <strong>Date:</strong> 14-OCT-2025</p>
    
    <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
      <tr style="border-bottom: 1px solid #000;">
        <td style="padding: 4px;"><strong>Commodity</strong></td>
        <td style="padding: 4px;"><strong>Grade</strong></td>
        <td style="padding: 4px;"><strong>Net Wgt</strong></td>
      </tr>
      <tr>
        <td style="padding: 4px;">Copper Cathodes</td>
        <td style="padding: 4px;">Grade A (LME)</td>
        <td style="padding: 4px;">498.24 MT</td>
      </tr>
    </table>
    
    <p><strong>Location:</strong> Bay 12, Stack 4-9<br>
    <strong>Brand:</strong> Codelco<br>
    <strong>Seal Numbers:</strong> 9941A - 9982A</p>

    <div style="margin-top: 15px; border: 2px solid #d00; color: #d00; padding: 5px; text-align: center; font-weight: bold; transform: rotate(-2deg);">
      NON-NEGOTIABLE COPY
    </div>

    <div style="margin-top: 15px; font-size: 0.8em; text-align: center;">
      <strong>Verify authenticity and lien status:</strong><br>
      verify:warrants.metro-logistics.com/check
    </div>
  </div>
</div>

## Data Verified

**Warehouse Operator** (Issuer), **Depositor** (Current Owner), **Commodity Details** (Grade, Brand, Crop Year), **Weights** (Gross/Net), **Storage Location** (Specific Shed/Bay), **Warrant Number**, **Rent/Storage Paid To Date**.

**Document Types:**
- **Electronic Warehouse Receipt (EWR):** The legal title document.
- **Holding Certificate:** Proof of possession (often used for insurance).
- **Release Order:** Authorization to move goods out.
- **Weight Note / Assay Report:** Technical verification of quality (often attached).

**Physical vs. Digital:** While commodities markets are moving toward blockchain, paper/PDF receipts are still widely used in emerging markets and mid-tier trade. This use case bridges the gap, allowing a paper receipt to be cryptographically verified against the warehouse's digital ledger.

## Data Visible After Verification

Shows the issuer domain (The Warehouse Operator) and the responder text.

**Status Indications:**
- **Valid / Clear** - Goods are in the warehouse; no liens registered.
- **Pledged** - Goods are held, but pledged to a bank (cannot be sold/moved).
- **Released** - Goods have already left the warehouse (document is historic only).
- **Cancelled** - Receipt voided (e.g., converted to different format).
- **Warrant Blocked** - Under legal dispute or customs hold.

## Second-Party Use (The Trader/Owner)

Commodity traders benefit from instant credibility.

**Proof of Ownership:** A trader selling 500 tonnes of copper can email the PDF receipt to a buyer. The buyer scans it and sees "Verified by [Warehouse]" immediately, proving the trader actually owns the metal.
**Insurance auditing:** Traders must insure goods in storage. Verified receipts provide indisputable proof of asset location and value to underwriters.

## Third-Party Use

**Trade Finance Banks**
*The $100 Million Risk*
Banks lend massive sums against commodities inventory.
*   **Preventing Double Financing:** A fraudster might take one receipt for 100 tonnes of coffee and show it to Bank A and Bank B to get two loans. With OCR-to-hash, if Bank A registers a "Pledge" on the hash, Bank B scans the document and sees **"Status: PLEDGED to [Bank A]"**.
*   **The "Fresh Air" Scam:** Fraudsters create PDF receipts for metal that doesn't exist. Verification checks the hash against the *Warehouse's* database. If the warehouse didn't issue it, the hash returns 404.

**Warehouse Operators**
*Liability Protection*
*   **Release Integrity:** Before releasing goods to a truck driver presenting a "Release Order," the warehouse clerk scans the order. If the hash doesn't match the internal system (e.g., the quantity was altered from 10 pallets to 50), the release is stopped.

**Inspection Agencies (SGS, Bureau Veritas)**
*Quality Control*
*   Inspectors verify that the goods described in the receipt match what is physically in the shed before issuing their own quality findings.

**Customs Authorities**
*Bonded Warehouses*
*   Customs officers verify that goods in bonded warehouses (duty unpaid) haven't been illicitly moved. The status **"Bonded: Yes"** confirms the tax liability status.

## Verification Architecture

**The "Painted Rocks" Fraud Problem**
Recent high-profile frauds (e.g., the Trafigura nickel case) involved receipts for containers that held painted stones instead of nickel.
*   **Limitations:** OCR-to-hash verifies the *document* is authentic to the warehouse. It does not verify the *warehouse* isn't lying or incompetent.
*   **The Fix:** However, it *does* prevent **Documentary Fraud** (altering a genuine receipt to show higher weights) and **Impersonation** (creating a receipt from a fake warehouse).
*   **Domain Binding:** The `verify:` URL binds the receipt to `metro-logistics.com`. A fraudster cannot generate a valid hash for that domain without hacking the warehouse's database.

**Lien Registry Integration**
This is the "killer app" for this use case.
1.  **Issue:** Warehouse issues Receipt #123.
2.  **Pledge:** Owner pledges Receipt #123 to JPMorgan.
3.  **Update:** Warehouse updates the status of Hash(#123) to "PLEDGED - JPMorgan".
4.  **Check:** Owner tries to sell the receipt to a Buyer. Buyer scans it, sees "PLEDGED," and refuses to pay until the lien is cleared.

**Dynamic Fields vs. Static Hash**
Commodities change (shrinkage, humidity loss).
*   The paper document represents the state *at issuance*.
*   The verification response can include **"Current Status"** metadata.
    *   *Paper says:* "Weight: 1000kg"
    *   *Verification says:* "Valid. Current Weight: 998kg (evaporation loss recorded 12-Nov)."

**UCC-7 and Electronic Documents**
In the US, UCC Article 7 governs warehouse receipts. An OCR-to-hash system helps satisfy the requirement for "control" of an electronic document of title by providing a singular, verifiable authoritative record hosted by the issuer.