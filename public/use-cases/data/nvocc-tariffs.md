---
title: "NVOCC (Non-Vessel Operating Common Carrier) tariffs"
category: "Shipping & Freight"
volume: "Small"
retention: "Tariff validity + 7 years"
slug: "nvocc-tariffs"
tags: ["nvocc", "tariffs", "logistics", "transportation"]
---

## What is an NVOCC Tariff?

An **NVOCC** (Non-Vessel Operating Common Carrier) is a company that sells space on ships but doesn't own the ships. They are the "Middlemen" of global trade.

By US law (**FMC Regulations**), these companies must publish their **Tariffs**—the official prices they charge for shipping a container. They are not allowed to "secretly" over-charge or under-charge.

Fraud happens when an NVOCC edits its tariff sheet to hide "rebates" or to fake a price hike to a customer. Verified hashes allow shippers to scan the price sheet and see the **verified, filed rate** from the carrier's official public tariff domain.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Arial Narrow', sans-serif; border: 1px solid #000; background: #fff; padding: 0;">
  <div style="background: #333; color: #fff; padding: 10px; text-align: center;">
    <h2 style="margin: 0; text-transform: uppercase; font-size: 1.1em;">EXPEDITORS TARIFF #042</h2>
    <div style="font-size: 0.8em;">FMC REGISTRATION: 016228</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em;">
    <p><strong>Route:</strong> <span data-bracket="start" data-for="tariff">]</span>Shanghai (CNSHA) to Los Angeles (USLAX)</p>
    <p><strong>Rate (per 40' High Cube):</strong> $ 3,250.00 (All-In)<br>
    <strong>Effective Date:</strong> March 15, 2026</p>
    <div data-verify-line="tariff" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;">
      verify:expeditors.com/tariffs/v/SHA-LAX-42 <span data-bracket="end" data-for="tariff">]</span>
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

**The NVOCC (Non-Vessel Operating Common Carrier) tariffs Fraud Problem**

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

FMC (Federal Maritime Commission) tariff filing requirement. Domain binding verifies NVOCC. Prevents unauthorized tariff changes. Rate dispute documentation. Service contract verification.
