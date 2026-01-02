---
title: "Ocean bills of lading (B/L) - negotiable/non-negotiable"
category: "Shipping & Freight"
volume: "Large"
retention: "7-10 years (legal title)"
slug: "ocean-bills-of-lading"
tags: ["ocean", "bills", "lading", "logistics", "transportation"]
---

## What is an Ocean Bill of Lading?

An **Ocean Bill of Lading (B/L)** is the most important paper in global trade. It is a **Document of Title**, meaning whoever holds the original paper "owns" the cargo in the container.

It serves three roles:
1.  **Receipt:** Proving the ship captain received the goods.
2.  **Contract:** Defining the shipping price and rules.
3.  **Title:** The "Key" to claim the goods at the destination port.

Because this paper represents **Ownership**, it is a high-value target for forgery. Thieves use "Phantom B/Ls" to steal $100,000 containers of electronics. Verified hashes ensure the paper in the trucker's hand matches the ship line's official record.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Arial Narrow', sans-serif; border: 1px solid #000; background: #fff; padding: 0;">
  <div style="background: #002d62; color: #fff; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
    <div style="font-weight: bold; font-size: 1.2em;">MAERSK LINE</div>
    <div style="font-size: 0.8em;">B/L No: <span data-bracket="start" data-for="ocean-bl">]</span>MAE-9988776655</div>
  </div>
  <div style="padding: 20px; font-size: 0.85em;">
    <p><strong>Shipper:</strong> Global Coffee Exporters<br>
    <strong>Vessel:</strong> MAERSK MC-KINNEY<br>
    <strong>Cargo:</strong> 200 Bags Arabica Coffee</p>
    <div data-verify-line="ocean-bl" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;">
      verify:maersk.com/bl/v/9988776655 <span data-bracket="end" data-for="ocean-bl">]</span>
    </div>
  </div>
</div>


## Data Visible After Verification

Shows the issuer domain and the responder text (e.g., "Valid ID" or "Denied").

**Status Indications:**
- **Valid** - Document verified and current
- **Expired** - Document has reached expiration
- **Revoked** - Document has been revoked or cancelled
- **Superseded** - A newer version exists

The verification response may include additional context such as issue date, expiration date, or document serial numbers.

## Second-Party Use

The document holder (subject/recipient) benefits from verification.

**Document Authenticity:** Verify received documents are genuine and properly issued.

**Third-Party Presentation:** Provide verified documentation when required.

**Compliance Requirements:** Meet regulatory or contractual documentation requirements.

**Record Keeping:** Maintain verified records for future reference or audits.

**Dispute Prevention:** Establish authenticity to prevent future challenges.

## Third-Party Use

**Insurance Companies**

Underwriting and claims processing:

**Policy Underwriting:** Verify supporting documents during policy issuance.

**Claims Verification:** Validate documentation during claims processing.

**Risk Assessment:** Confirm permits, licenses, and certifications for risk evaluation.

**Fraud Detection:** Identify fraudulent documentation in claims or applications.

**Coverage Disputes:** Reference verified documents in coverage determination.

**Customs and Border Authorities**

International trade compliance:

**Import Clearance:** Verify shipping documents for customs clearance.

**Duty Assessment:** Validate commercial invoices and declarations.

**Trade Compliance:** Confirm certificates of origin and trade documents.

**Security Screening:** Verify cargo documentation for security.

**Export Controls:** Validate export documentation and licenses.

**Freight Forwarders and Carriers**

Logistics and transportation:

**Shipment Acceptance:** Verify documents before accepting cargo.

**Carrier Handoffs:** Validate documentation at transfer points.

**Liability Determination:** Reference verified documents for claims.

**Route Planning:** Confirm documentation for transit requirements.

**Delivery Confirmation:** Verify documents at final delivery.

## Verification Architecture

**The Ocean bills of lading (B/L) - negotiable/non-negotiable Fraud Problem**

Document fraud creates significant risks:

- **Fabrication:** Entirely fake documents created from scratch
- **Alteration:** Genuine documents with modified content (dates, amounts, names)
- **Impersonation:** Documents falsely claiming to be from legitimate issuers
- **Expired/Revoked Documents:** Presenting invalid documents as current

OCR-to-hash verification addresses fake and altered documents. Domain binding confirms the claimed issuer actually issued the document.

**Issuer Types**

Who issues these documents and operates verification endpoints?

**Primary Issuers:** Organizations with direct authority to issue these documents.

**Licensed Professionals:** Professionals authorized to create and certify documents.

**Government Agencies:** Federal, state, or local agencies with jurisdiction.

**Industry Bodies:** Trade associations and professional organizations.

**System Integration**

Verification integrates with relevant systems:

**Issuer Systems:** Core operational systems generate verification hashes at document creation.

**Industry Standards:** Existing data standards extended to include verification.

**Regulatory Systems:** Government databases for systematic hash receipt and oversight.

**Third-Party Platforms:** Industry portals and platforms enable verification access.

## Rationale

Negotiable B/L is document of title - tampering changes cargo ownership. Domain binding verifies carrier/freight forwarder. Prevents fake B/L fraud (cargo theft). Letter of credit compliance. Multi-page: B/L often multi-page - per-page verification prevents altering cargo details.
