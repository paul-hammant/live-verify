# Dangerous goods declarations for air cargo (DGR)

**Category:** Logistics & Transportation
**Volume:** Small
**Retention:** 7-30 years (safety/liability)

## Data Verified

Shipper, airline, consignee, hazmat classification, packing group, emergency contact

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

**The Dangerous goods declarations for air cargo (DGR) Fraud Problem**

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

IATA Dangerous Goods Regulations (DGR) compliance. Domain binding verifies shipper/DG-certified packer. Prevents fake DGR (aircraft safety risk). Long liability retention. Aviation safety critical.
