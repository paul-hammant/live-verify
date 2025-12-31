---
title: "Letters of Credit"
category: "Banking & Financial Services"
volume: "Small (but high-value transactions)"
retention: "7-10 years (transaction lifecycle plus disputes)"
slug: "letters-of-credit"
tags: ["letters", "credit", "banking", "financial", "services"]
---
## Data Verified

Issuing bank name and address, beneficiary (seller/exporter) name, applicant (buyer/importer) name, credit amount and currency, payment terms (sight, usance, deferred), expiry date, required documents list, shipping terms, port of loading/discharge, goods description, LC number.

**Document Complexity:** Letters of credit are formal banking instruments with precise legal language. Every term matters—a typo in goods description or shipping deadline can invalidate the credit.

**Amendments:** LCs are frequently amended during transactions. Each amendment is a separate document requiring verification.

## Data Visible After Verification

Shows the issuer domain (the issuing bank) and the responder text.

**Status Indications:**
- **Valid** - LC is current and available for drawing
- **Amended** - This version has been superseded by an amendment
- **Expired** - LC has passed its validity period
- **Fully Drawn** - All available credit has been utilized
- **Cancelled** - LC was cancelled before expiry

**Public Ledger Link:** The verification response may include a link to the LC's position in a trade finance registry or the issuing bank's published LC index, demonstrating the commitment exists within the bank's obligations.

## Second-Party Use (Beneficiary Verifying Received LC)

Exporters/sellers receiving LCs benefit from verification.

**Authenticity Confirmation:** Before shipping goods worth potentially millions, exporters need confidence the LC is genuine and the issuing bank will pay.

**Terms Verification:** Exporters can verify the LC terms match the sales contract—amount, goods description, shipping dates, required documents.

**Amendment Tracking:** As amendments arrive, beneficiaries can verify each amendment is authentic and correctly modifies the original.

**Advising Bank Confirmation:** When receiving LCs through advising banks, beneficiaries can independently verify against the issuing bank's records.

**Discrepancy Prevention:** Careful verification of LC terms before shipping prevents documentary discrepancies that lead to payment refusal.

## Third-Party Use

**Advising and Confirming Banks**

LC transmission and confirmation:

**Advising Authenticity:** Banks advising LCs to beneficiaries can verify authenticity before forwarding. Traditionally done via SWIFT key verification; OCR-to-hash provides additional confirmation.

**Confirmation Decisions:** Banks asked to confirm (guarantee) an LC can verify its authenticity and terms before adding their confirmation.

**Amendment Processing:** Each amendment needs verification before advising to the beneficiary.

**Discrepancy Resolution:** When documents are rejected, advising banks can verify the original LC terms the issuing bank claims were violated.

**Negotiating and Paying Banks**

Document examination and payment:

**LC Validity:** Before examining documents and paying, negotiating banks verify the LC exists and is available for drawing.

**Drawing Against Terms:** Banks verify documents presented comply with LC terms as originally issued (not an altered version).

**Partial Shipments:** For partial shipment LCs, banks verify remaining available balance before each payment.

**Reimbursement Claims:** When claiming reimbursement from issuing banks, negotiating banks can prove they paid against a verified, authentic LC.

**Issuing Banks**

Risk management and compliance:

**Duplicate Detection:** Issuing banks can detect if their LC has been altered or duplicated for fraudulent presentation.

**Applicant Disputes:** When importers dispute LC terms, banks can prove what was actually issued.

**Regulatory Reporting:** Trade finance reporting to regulators can reference verified LC hashes.

**Audit Trail:** Internal audit can verify LCs in the portfolio match issued documents.

**Insurance Companies**

Trade credit and marine insurance:

**Coverage Verification:** Trade credit insurers can verify LC terms when underwriting exporter risk.

**Claims Processing:** When LCs aren't honored, insurers can verify the original LC terms and alleged discrepancies.

**Marine Cargo Insurance:** Insurers covering shipped goods can verify the LC and shipping terms.

**Customs and Trade Authorities**

Trade facilitation and compliance:

**Goods Description:** Customs can verify goods declarations against LC terms.

**Valuation:** LC amount provides evidence of transaction value for duty assessment.

**Trade Finance Compliance:** Authorities monitoring trade-based money laundering can verify LC authenticity.

**Sanctions Screening:** LCs can be verified before processing to confirm they don't involve sanctioned parties.

## Verification Architecture

**The LC Fraud Problem**

LC fraud is a significant trade finance risk:

- **Fabricated LCs:** Entirely fake LCs from non-existent banks or forged from real banks
- **Altered LCs:** Genuine LCs with modified amounts, terms, or dates
- **Duplicate Drawings:** Same LC used for multiple fraudulent shipments
- **Confirming Bank Fraud:** Fake confirmations added to weak LCs
- **Document Fraud:** Genuine LC but fraudulent documents presented (separate from LC verification)

OCR-to-hash addresses fabrication and alteration at the LC level. Document fraud (fake bills of lading, inspection certificates) requires verification of each underlying document.

**Issuing Banks as Issuers**

The issuing bank is the natural verification endpoint:

**SWIFT Network:** Most LCs are transmitted via SWIFT. Banks already have secure messaging infrastructure.

**Correspondent Relationships:** Banks have existing trust relationships that could extend to verification.

**Trade Finance Platforms:** Banks increasingly use trade finance platforms (Contour, we.trade, Komgo) that could integrate verification.

**API Integration:** Major trade finance banks could offer verification APIs for their issued LCs.

**UCP 600 Considerations**

The Uniform Customs and Practice for Documentary Credits (UCP 600) governs LC transactions:

**Document Examination Standard:** UCP 600 requires documents to be examined on their face. OCR-to-hash verification complements visual examination.

**Issuing Bank Obligations:** The issuing bank's obligation is defined by the LC terms. Verification confirms those terms.

**Amendment Rules:** Amendments require beneficiary consent. Verification of amendment authenticity supports the consent process.

**Original Documents:** UCP 600 addresses requirements for original documents. OCR-to-hash can verify originals weren't altered after issuance.

**SWIFT and MT700**

LCs are transmitted using standardized SWIFT messages:

**MT700:** Standard format for issuing documentary credits. Could include hash of the visual LC document.

**MT710:** Advice of third bank's documentary credit.

**MT720:** Transfer of documentary credit.

**MT707:** Amendment to documentary credit.

SWIFT message authentication already provides transmission security; OCR-to-hash provides document-level verification for the human-readable LC.

**Trade Finance Platform Integration**

Blockchain and platform approaches to trade finance:

**Contour:** Corda-based LC platform with major bank participation. Could integrate OCR-to-hash for physical document verification.

**we.trade:** Trade finance platform for European banks.

**Marco Polo:** Trade finance network for open account transactions.

**TradeLens:** Maersk/IBM shipping platform with document tracking.

These platforms handle electronic LCs; OCR-to-hash provides verification for physical documents that still accompany many transactions.

**Standby Letters of Credit**

Standby LCs (SBLCs) have distinct verification needs:

**Guarantee Function:** SBLCs serve as guarantees rather than payment mechanisms.

**Longer Validity:** SBLCs may remain valid for years, requiring ongoing verification capability.

**Performance vs. Financial:** Some SBLCs guarantee performance, others guarantee payment.

**ISP98 Rules:** Standby credits often operate under ISP98 rather than UCP 600.

**Multi-Bank Transactions**

Complex LCs involve multiple banks:

**Issuing Bank → Advising Bank → Confirming Bank → Beneficiary**

Each bank in the chain can verify the underlying LC. A confirming bank's confirmation is a separate document that could also be verified.

**Transferable LCs:** When LCs are transferred to second beneficiaries, the transfer document requires verification.

**Back-to-Back LCs:** Traders using back-to-back LCs need to verify both the master LC they receive and the LC they issue to suppliers.
