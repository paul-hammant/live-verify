---
title: "Warehouse Receipts and Inventory Records"
category: "Warehousing & Inventory"
volume: "Medium-Small"
retention: "3-7 years (financial audit, loan lifecycle)"
slug: "warehouse-receipts"
tags: ["warehouse", "receipts", "logistics", "transportation", "commodity", "finance"]
---
## Data Verified

Warehouse operator name and license number, receipt number, depositor/owner name, commodity description (type, grade, quality), quantity (weight, volume, count), warehouse location and bin/lot number, receipt date, storage terms, any liens or encumbrances noted.

**Document Types:**
- **Negotiable Warehouse Receipts:** Documents of title that can be transferred, used as collateral
- **Non-Negotiable Receipts:** Delivery orders to specific named parties
- **Electronic Warehouse Receipts (EWR):** Digital versions registered in approved systems
- **Scale Tickets:** Weight documentation at delivery
- **Quality Certificates:** Grade and quality attestation

**The Collateral Problem:** Warehouse receipts are used as loan collateral worth billions. A receipt claiming 10,000 bushels of wheat is only valuable if that wheat actually exists in that warehouse. Fraudulent receipts have caused major financial losses.

## Data Visible After Verification

Shows the issuer domain (the licensed warehouse) and the responder text.

**Status Indications:**
- **Valid** - Receipt is current, goods are in storage
- **Released** - Goods have been released from storage
- **Cancelled** - Receipt has been cancelled
- **Pledged** - Receipt is pledged as collateral (lien noted)
- **Partial Release** - Some goods released, remainder in storage
- **Transferred** - Negotiable receipt transferred to new holder

**Quantity Confirmation:** Verification may indicate current quantity if partial releases have occurred.

## Second-Party Use (Depositor Verifying Their Own Receipts)

Depositors benefit from verification.

**Receipt Authenticity:** After depositing goods, verify the receipt is genuine and correctly recorded.

**Quantity Confirmation:** Verify the receipt reflects the actual quantity deposited.

**Lien Status:** Verify any liens or pledges are correctly noted.

**Storage Terms:** Confirm storage terms and fees match agreement.

**Transfer Verification:** When selling or pledging receipts, verify current status.

## Third-Party Use

**Lenders and Banks**

Commodity finance:

**Collateral Verification:** Before lending against warehouse receipts, verify goods exist.

**Ongoing Monitoring:** Periodic verification that pledged goods remain in storage.

**Release Authorization:** Verify receipts before authorizing collateral release.

**Margin Calls:** Verify current quantity when commodity prices change.

**Default Proceedings:** Verify collateral status when loans default.

**Commodity Traders and Buyers**

Purchase verification:

**Pre-Purchase Verification:** Verify goods exist before purchasing receipts.

**Title Confirmation:** Verify seller has clear title (no prior liens).

**Quality Verification:** Verify grade/quality certificates are genuine.

**Delivery Planning:** Verify goods are where claimed before arranging transport.

**Commodity Exchanges**

Trading integrity:

**Delivery Verification:** Verify receipts tendered for exchange delivery.

**Approved Warehouses:** Confirm receipts are from exchange-approved facilities.

**Position Limits:** Verify receipt holdings against position limit rules.

**Default Settlement:** Verify receipts in delivery default situations.

**Regulators**

Market oversight:

**USDA Licensing:** Verify federally licensed warehouse compliance.

**State Regulators:** State warehouse regulators verify receipt practices.

**CFTC:** Commodity futures regulators verify physical delivery documentation.

**Fraud Investigation:** Investigate suspected receipt fraud.

**Insurance Companies**

Storage coverage:

**Coverage Verification:** Verify goods descriptions for storage insurance.

**Claims Documentation:** Verify receipt authenticity for loss claims.

**Valuation:** Verify quantities for coverage amounts.

**Auditors**

Financial statement assurance:

**Inventory Verification:** Auditors confirm inventory existence via warehouse receipts.

**Existence Testing:** Third-party verification as audit evidence.

**Valuation Support:** Verify quantities and grades for valuation.

## Verification Architecture

**The Warehouse Receipt Fraud Problem**

Warehouse receipt fraud has caused spectacular losses:

- **Phantom Inventory:** Receipts issued for goods that don't exist
- **Double-Pledging:** Same goods pledged to multiple lenders
- **Quantity Inflation:** Receipts showing more goods than stored
- **Quality Fraud:** Receipts showing higher grade than actual
- **Forged Receipts:** Entirely fabricated receipts from legitimate-looking warehouses
- **Collusion:** Warehouse operators colluding with depositors

OCR-to-hash addresses forged receipts. Double-pledging requires registry-level controls. Phantom inventory requires physical verification or trusted warehouse operators.

**Licensed Warehouses as Issuers**

Warehouse licensing provides a trust foundation:

**USDA Licensed:** Federal licensing for grain and other commodities.

**State Licensed:** State licensing for various stored goods.

**Bonded Warehouses:** Customs bonded facilities for imports.

**Exchange Approved:** Commodity exchange approved delivery facilities.

Licensed warehouses would operate verification endpoints for their issued receipts.

**Electronic Warehouse Receipt Systems**

EWR systems provide centralized registries:

**USDA EWR Providers:** Approved providers maintain electronic receipt registries.

**Central Filing Systems:** Some commodities have central lien filing.

**Real-Time Status:** Electronic systems show current receipt status.

**OCR Complement:** Paper receipts can be verified against electronic registry records.

**Commodity-Specific Considerations**

Different commodities have different practices:

**Grain:** USDA licensing, grade standards, scale tickets.

**Cotton:** Warehouse receipts with classification data.

**Metals:** LME (London Metal Exchange) warehouse system.

**Petroleum:** Tank farm receipts with quality specifications.

**Frozen Foods:** Temperature-controlled storage documentation.

**Coffee/Cocoa:** Exchange-approved warehouse systems.

Each commodity sector has specific documentation standards that verification must accommodate.

**Quality and Grade Integration**

Receipts often incorporate quality data:

**Grading Certificates:** Official grade designations.

**Inspection Reports:** Third-party quality inspection.

**Sampling Documentation:** How samples were taken for grading.

**Quality Disputes:** Verification supports grade dispute resolution.

**Lien and Security Interest Recording**

Receipts as collateral require lien notation:

**UCC Filings:** Uniform Commercial Code filings for security interests.

**Receipt Endorsement:** Liens noted on negotiable receipts.

**Central Registries:** Some systems have central lien registries.

**Priority Disputes:** Verification of lien timing for priority.

Verification should indicate lien status to prevent lending against already-pledged goods.

**Physical Verification Complement**

Document verification doesn't replace physical inspection:

**Field Examinations:** Lenders conduct periodic physical inspections.

**Collateral Auditors:** Third-party collateral verification services.

**Weight Verification:** Re-weighing goods to verify quantities.

**Quality Re-Testing:** Re-grading goods to verify quality claims.

OCR-to-hash verifies the document; physical inspection verifies the goods match the document.

**International Trade Considerations**

Warehouse receipts in international trade:

**Bonded Warehouses:** Customs bonded facilities for duty deferral.

**Free Trade Zones:** FTZ warehouse documentation.

**Letters of Credit:** Warehouse receipts as LC documents.

**Trade Finance:** Receipts securing trade finance facilities.

**Multi-Jurisdiction:** Goods stored in one country, financed in another.

**Release and Delivery Procedures**

Getting goods out of storage:

**Release Orders:** Instructions to release goods.

**Partial Releases:** Releasing portion of stored goods.

**Transfer Orders:** Transferring goods to new owner without physical movement.

**Delivery Scheduling:** Coordinating delivery with transportation.

Each release should update verification status of the original receipt.
