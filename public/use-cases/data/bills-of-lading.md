---
title: "Bills of Lading"
category: "Shipping & Freight"
volume: "Medium"
retention: "Shipment completion plus 7-10 years (disputes, customs audits)"
slug: "bills-of-lading"
tags: ["bills", "lading", "logistics", "transportation"]
---
## Data Verified

Shipper name and address, consignee name and address, notify party, origin port/location, destination port/location, vessel name and voyage number, booking number, container numbers, seal numbers, cargo description, gross weight, package count, freight terms (prepaid/collect), B/L number.

**Document Types:** Several B/L variants exist:
- **Master Bill of Lading (MBL):** Issued by ocean carriers for container shipments
- **House Bill of Lading (HBL):** Issued by freight forwarders for consolidated shipments
- **Sea Waybill:** Non-negotiable alternative to B/L
- **Multimodal/Combined Transport:** Covers multiple transport modes

**Scanning Considerations:** The front page of a B/L contains the critical routing and cargo information in standardized layouts. Port terminals and customs offices can verify this page quickly. Detailed cargo manifests on subsequent pages may require flatbed scanning.

## Data Visible After Verification

Shows the issuer domain (the carrier or forwarder) and the responder text.

**Status Indications:**
- **Verified** - B/L is genuine and current
- **Surrendered** - Original B/L has been surrendered for cargo release
- **Amended** - B/L has been amended; later version exists
- **Switch B/L Issued** - Original replaced with a switch B/L
- **Telex Released** - Original surrendered electronically; cargo released at destination

**Public Ledger Link:** The verification response may link to the B/L's position in a shipping platform or carrier's manifest, demonstrating the shipment exists within the carrier's operational records.

## Second-Party Use (Shipper Verifying Their Own B/L)

Shippers benefit from verifying bills of lading they receive.

**Document Authenticity:** After cargo is loaded, shippers receive B/Ls from carriers or forwarders. Verification confirms these are genuine.

**Terms Verification:** Shippers can verify B/L terms match the booking—correct ports, cargo description, container numbers.

**Letter of Credit Compliance:** When payment requires documentary compliance, shippers verify B/Ls meet L/C requirements before presentation.

**Insurance Documentation:** Cargo insurance claims require authentic B/Ls. Verification before shipping creates audit trail.

**Freight Disputes:** If freight charge disputes arise, shippers have verified evidence of original terms.

## Third-Party Use

**Consignees and Importers**

Cargo receipt:

**Authenticity Before Payment:** Importers paying against documents (D/P terms) verify B/Ls before releasing payment to shippers.

**Cargo Release:** Consignees presenting B/Ls for cargo pickup can verify they hold genuine documents.

**Customs Clearance:** Customs brokers acting for consignees verify B/Ls match carrier records.

**Damage Claims:** If cargo arrives damaged, verified B/Ls document what the carrier received.

**Banks and Trade Finance**

Documentary collections and letters of credit:

**Document Examination:** Banks examining documents under L/Cs verify B/L authenticity before paying.

**Title Document:** Negotiable B/Ls are documents of title. Banks taking B/Ls as security verify they're genuine.

**Discrepancy Review:** When alleged discrepancies arise, banks verify the original B/L terms.

**Trade Finance Platforms:** Platforms processing trade documents integrate B/L verification.

**Port Terminals and Warehouses**

Cargo handling:

**Release Authorization:** Terminals releasing cargo verify the B/L presented matches their records.

**Delivery Order Issuance:** Before issuing delivery orders, terminals verify B/L authenticity.

**Container Tracking:** Terminal operators can verify container movements against B/L documentation.

**Warehouse Receipts:** Bonded warehouses receiving cargo verify B/Ls before accepting custody.

**Customs Authorities**

Trade compliance:

**Import Declaration:** Customs verifies B/L authenticity when processing import entries.

**Valuation:** B/L terms (freight prepaid/collect) affect dutiable value calculations.

**Origin Verification:** B/L routing supports origin claims for preferential duty rates.

**Manifest Matching:** Customs matches B/Ls against advance manifest filings.

**Marine Insurance**

Cargo coverage:

**Coverage Attachment:** Marine insurance attaches when cargo is loaded. B/L is evidence of loading.

**Claims Documentation:** Cargo claims require authentic B/Ls documenting shipment details.

**Subrogation:** Insurers pursuing subrogation against carriers verify B/L terms.

**General Average:** In general average situations, cargo interests prove their position via verified B/Ls.

**Freight Forwarders**

Logistics coordination:

**Master B/L Verification:** Forwarders issuing house B/Ls verify the underlying master B/L.

**Carrier Relations:** Forwarders verify B/Ls received from carriers before issuing house documents.

**Consolidation Documentation:** LCL (less than container load) shipments require matching multiple house B/Ls to a master B/L.

## Verification Architecture

**The B/L Fraud Problem**

Bill of lading fraud is a significant trade risk:

- **Fabricated B/Ls:** Entirely fake documents claiming non-existent shipments
- **Ante-Dated B/Ls:** B/Ls with false loading dates to meet L/C deadlines
- **Claused vs. Clean:** Altering damage notations (clausing) to appear clean
- **Quantity Fraud:** B/Ls showing more cargo than actually loaded
- **Multiple Originals Fraud:** Issuing more than the stated set of originals
- **Switch B/L Fraud:** Illegitimate switch B/Ls to redirect cargo

OCR-to-hash addresses fabrication and alteration. Ante-dating and quantity fraud require verification against carrier loading records. Original set control is a separate document management challenge.

**Carriers and Forwarders as Issuers**

Different parties issue different B/L types:

**Ocean Carriers:** Maersk, MSC, CMA CGM, and other carriers issue master B/Ls. They have operational systems that could generate verification hashes.

**NVOCCs and Freight Forwarders:** Issue house B/Ls against carrier master B/Ls. Forwarder verification endpoints confirm house B/L authenticity.

**Multimodal Operators:** Issue combined transport documents covering multiple modes.

**Carrier Alliances:** Alliance partners (2M, Ocean Alliance, THE Alliance) might coordinate verification infrastructure.

**Shipping Platform Integration**

Digital shipping platforms are transforming B/L handling:

**TradeLens:** Maersk/IBM platform tracking shipments across carriers. Could integrate B/L verification.

**GSBN (Global Shipping Business Network):** Carrier consortium for digital documentation.

**DCSA (Digital Container Shipping Association):** Industry standards for electronic B/Ls.

**Bolero and essDOCS:** Electronic B/L platforms with legal frameworks for digital documents.

These platforms handle electronic B/Ls; OCR-to-hash provides verification for paper B/Ls that still predominate in many trades.

**Original B/L Sets**

Negotiable B/Ls are issued in sets of originals (typically 3/3):

**Original Control:** All originals must be surrendered for cargo release. Verification should indicate how many originals exist and their status.

**Presentation:** When one original is presented, others become void. Verification can indicate "Original presented/surrendered."

**Lost Originals:** Letter of indemnity procedures for lost originals. Verification can confirm whether originals remain outstanding.

**Telex Release and Electronic B/L**

Alternatives to physical original B/Ls:

**Telex Release:** Shipper surrenders originals at origin; carrier telexes destination to release without original presentation. Verification shows "Telex Released."

**Sea Waybill:** Non-negotiable from issuance. Named consignee receives cargo without presenting originals.

**Electronic B/L:** Legal frameworks (CMI Rules, Bolero, essDOCS) enable electronic negotiable documents. Verification transitions from document-level to transaction-level.

**Switch B/L Considerations**

Switch B/Ls replace originals in transit:

**Legitimate Use:** Traders using switch B/Ls to hide origin or maintain confidentiality of trade relationships.

**Verification Chain:** Both original and switch B/L should be verifiable. Verification response should indicate "Replaced by switch B/L [number]" or "Switch B/L replacing [original number]."

**Fraud Risk:** Switch B/L abuse for cargo misdirection. Verification helps detect unauthorized switches.

**Port and Terminal Integration**

Verification at cargo handling points:

**Gate Operations:** Terminals verify B/Ls when truckers arrive for pickup.

**Vessel Operations:** Stevedores verify B/Ls against cargo manifests during loading.

**Customs Inspections:** Inspectors verify B/Ls during physical examinations.

**Free Trade Zones:** FTZ operators verify B/Ls for zone admission.

Real-time verification at these points prevents fraudulent cargo release.

**Multimodal Considerations**

When shipments involve multiple transport modes:

**Combined Transport B/L:** Single document covering ocean, rail, and truck segments. Verification confirms the entire routing.

**Transshipment Points:** At transshipment, verification confirms cargo is authorized to continue.

**Inland Carriers:** Trucking companies and railroads receiving cargo from ports can verify the B/L authorizing inland movement.

**Intermodal Equipment:** Verification can be tied to container and chassis interchange.
