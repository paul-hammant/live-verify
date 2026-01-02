---
title: "Sea waybills (non-negotiable B/L)"
category: "Shipping & Freight"
volume: "Large"
retention: "7-10 years (proof of shipment)"
slug: "sea-waybills"
tags: ["waybills", "logistics", "transportation"]
---

## What is a Sea Waybill?

A **Sea Waybill** is a receipt for cargo loaded onto a ship. Unlike a "Bill of Lading," it is not a title document (you don't need the original paper to claim the goods). It is used for shorter routes or between trusted partners.

However, it is still critical for **Trade Finance**. Banks release millions of dollars in payment when they see a valid Waybill confirming the goods have shipped.

Fraudsters create "Ghost Shipments"—fake Waybills for cargo that doesn't exist—to steal money from banks. Verified hashes allow the bank to instantly confirm with the Shipping Line (like Maersk or MSC) that the shipment is real and the document matches their system.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', Courier, monospace; border: 2px solid #333; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="border-bottom: 2px solid #333; padding: 15px; display: flex; justify-content: space-between; align-items: center;">
    <div style="font-weight: bold; font-size: 1.4em;">MAERSK LINE</div>
    <div style="font-size: 0.9em;">NON-NEGOTIABLE WAYBILL</div>
  </div>

  <div style="padding: 20px; font-size: 0.85em;">
    <div style="display: flex; border-bottom: 1px solid #ccc; padding-bottom: 10px; margin-bottom: 10px;">
      <div style="width: 50%; border-right: 1px solid #ccc; padding-right: 10px;">
        <strong>Shipper:</strong><br>
        Shenzhen Electronics Mfg.<br>
        Futian District, Shenzhen, CN
      </div>
      <div style="width: 50%; padding-left: 10px;">
        <strong>Consignee:</strong><br>
        Global Retail Imports LLC<br>
        Los Angeles, CA, USA
      </div>
    </div>

    <div style="display: flex; border-bottom: 1px solid #ccc; padding-bottom: 10px; margin-bottom: 10px;">
      <div style="width: 33%;">
        <strong>Vessel:</strong><br>
        MAERSK SEALAND
      </div>
      <div style="width: 33%;">
        <strong>Voyage:</strong><br>
        2604W
      </div>
      <div style="width: 33%;">
        <strong>B/L No:</strong><br>
        <span data-bracket="start" data-for="waybill">]</span>MAEU123456789
      </div>
    </div>

    <div style="margin: 20px 0;">
      <table style="width: 100%; border: 1px solid #ccc;">
        <tr style="background: #eee;">
          <th style="text-align: left; padding: 5px;">Container No.</th>
          <th style="text-align: left; padding: 5px;">Description</th>
          <th style="text-align: right; padding: 5px;">Gross Weight</th>
        </tr>
        <tr>
          <td style="padding: 5px;">MSKU9876543</td>
          <td style="padding: 5px;">800 CTNS CONSUMER ELECTRONICS</td>
          <td style="text-align: right; padding: 5px;">12,450 KGS</td>
        </tr>
      </table>
    </div>

    <div style="border: 1px solid #000; padding: 10px; margin-top: 20px; text-align: center; font-weight: bold;">
      SHIPPED ON BOARD: MAR 15, 2026<br>
      PORT OF LOADING: YANTIAN
    </div>

    <div data-verify-line="waybill" style="border-top: 1px dashed #999; margin-top: 20px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Maersk doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:maersk.com/tracking/v/MAEU123456 <span data-bracket="end" data-for="waybill">]</span>
    </div>
  </div>
</div>


Shipper, consignee, carrier, vessel, cargo description

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

**Shipment Tracking:** Verify documentation matches actual shipment.

**Customs Clearance:** Present verified documents to customs authorities.

**Payment Verification:** Confirm charges match agreed terms.

**Dispute Prevention:** Maintain verified records for potential disputes.

**Insurance Claims:** Provide verified documentation for cargo claims.

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

**The Sea waybills (non-negotiable B/L) Fraud Problem**

Document fraud creates significant risks:

- **Fabrication:** Entirely fake documents created from scratch
- **Alteration:** Genuine documents with modified content (dates, amounts, names)
- **Impersonation:** Documents falsely claiming to be from legitimate issuers
- **Expired/Revoked Documents:** Presenting invalid documents as current
- **Cargo Misrepresentation:** False descriptions of goods being shipped
- **Duplicate Bills:** Creating multiple originals for fraud
- **Document Mismatch:** Documents that don't match actual cargo

OCR-to-hash verification addresses fake and altered documents. Domain binding confirms the claimed issuer actually issued the document.

**Issuer Types**

Who issues these documents and operates verification endpoints?

**Carriers:** Shipping lines, airlines, trucking companies, and railroads.

**Freight Forwarders:** International freight forwarders and NVOCCs.

**Customs Brokers:** Licensed customs brokers for trade documentation.

**Port Authorities:** Port operators for terminal and cargo documents.

**System Integration**

Shipping verification integrates with trade systems:

**EDI Standards:** Electronic data interchange for trade documents (EDIFACT, X12).

**Port Community Systems:** Port system integration for cargo documentation.

**Customs Systems:** Integration with ACE, ABI, and customs clearance platforms.

**Carrier Systems:** Shipping line and freight forwarder system integration.

## Rationale

Prevents altered cargo details. Domain binding verifies carrier. Faster cargo release than negotiable B/L. Prevents consignee fraud. International shipping standard.
