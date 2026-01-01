---
title: "Marine Hull & Machinery (H&M) Insurance"
category: "Specialty Insurance"
volume: "Small"
retention: "Vessel lifetime + 10 years"
slug: "marine-hull-machinery"
tags: ["marine-insurance", "h-and-m", "hull-and-machinery", "ship-finance", "imo-vessel", "maritime-safety", "lloyds", "vessel-valuation"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 2px solid #002366; background: #fff; padding: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="background: #002366; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;">GARD MARINE & ENERGY</div>
      <div style="font-size: 0.8em; opacity: 0.8;">Specialist Hull & Machinery Underwriters</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Policy #: HM-99228877-26</div>
    </div>
  </div>

  <div style="padding: 35px;">
    <h2 style="text-align: center; color: #002366; font-size: 1.4em; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 1px;">Evidence of Hull Coverage</h2>

    <div style="font-size: 1em; line-height: 1.6; color: #333;">
      <p>This document confirms that the following vessel is insured for Hull & Machinery risks:</p>

      <div style="background: #f9f9f9; border: 1px solid #ddd; padding: 15px; margin: 20px 0;">
        <strong>Vessel Name:</strong> <span data-bracket="start" data-for="hull-ins">]</span>MV OCEAN VOYAGER<br>
        <strong>IMO Number:</strong> 9988776<br>
        <strong>Flag State:</strong> Marshall Islands
      </div>

      <p><strong>Agreed Hull Value:</strong> USD 45,000,000.00<br>
      <strong>Trading Limits:</strong> Worldwide (Excl. Sanctioned Zones).<br>
      <strong>Classification:</strong> Lloyd's Register (Verified)</p>
      
      <p><strong>Effective:</strong> Jan 01, 2026 to Jan 01, 2027</p>
    </div>

    <div style="margin-top: 40px; border-top: 1px solid #ccc; padding-top: 10px; font-size: 0.8em; color: #666; font-style: italic; text-align: center;">
      Subject to the Nordic Marine Insurance Plan or Institute Time Clauses (Hull).
    </div>

    <div data-verify-line="hull-ins" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Gard doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:gard.no/hull/v/IMO9988776 <span data-bracket="end" data-for="hull-ins">]</span>
    </div>
  </div>
</div>

## Data Verified

Vessel name, IMO number (unique 7-digit ID), Flag State, agreed hull value (USD), deductible amount, classification society (e.g., ABS, DNV, LR), primary underwriter ID, effective/expiration dates, trading limit inclusions/exclusions.

**Document Types:**
- **Evidence of Hull Insurance:** Required for port entry and bank compliance.
- **Certificate of Entry:** (Linked hash) for P&I crossover items.
- **Vessel Mortgage Endorsement:** Proving the bank is the "Loss Payee."
- **Condition Survey:** (Linked hash) proving the ship is sea-worthy.

## Data Visible After Verification

Shows the issuer domain (`gard.no`, `skuld.com`, `chubb.com`) and current policy standing.

**Status Indications:**
- **In Force** — Premium paid; vessel is verified covered.
- **Suspended** — **ALERT:** Coverage paused due to class suspension or survey failure.
- **Cancelled** — Policy terminated (Extreme risk for ship-mortgage holders).
- **Lapsed** — Term ended; no renewal found.

## Second-Party Use

The **Shipowner / Operator** benefits from verification.

**Ship Finance:** Proving to a maritime lender (e.g., DNB or Nordea) that the $45M asset is "Verified Insured." Banks won't advance funds for bunker fuel or maintenance without 100% cryptographic certainty that the hull insurance is real and active.

**Port Entry:** Proving to a foreign port authority (e.g., Singapore or Rotterdam) that the vessel has the mandatory hull and pollution-related insurance to enter the harbor.

## Third-Party Use

**Ship-Mortgage Lenders**
**Collateral Protection:** H&M insurance is the only thing protecting the bank's $45M loan if the ship sinks. Verification ensures the owner hasn't "Edited" the PDF to show a $45M value when they actually only insured it for $20M to save on premiums.

**Maritime Lawyers / Arbitrators**
**Evidence Audit:** Instantly verifying the "Trading Limits" of a vessel involved in a casualty. If the ship crashed in an "Excluded Zone," the verified hash provides the definitive proof needed for the coverage dispute.

**Bunker Suppliers**
**Credit Vetting:** Verifying the insurance quality of a vessel before providing $500,000 in fuel on credit terms.

## Verification Architecture

**The "Ghost Ship" Fraud Problem**

- **Value Inflation:** Editing an agreed value from $10M to $50M to trick a bank into giving a larger ship-mortgage.
- **Exclusion Erasure:** Deleting the line that excludes "War Risk Zones" before sailing into a conflict area.
- **Classification Fraud:** Claiming the ship is "In Class" with Lloyd's Register on the paper form when their class has actually been suspended for safety failures.

**Issuer Types**

**Marine Mutuals (Clubs):** (e.g., Gard, Skuld).
**Commercial Marine Carriers:** (Chubb, Swiss Re, Munich Re).
**Lloyd's Syndicates.**

## Competition vs. Equasis / Vessel Databases

| Feature | OCR-to-Hash | Equasis / IHS Markit (Database) | Scanned PDF Policy |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Underwriter. | **Data-Bound.** Trust the 3rd party database. | **Zero.** Easily forged. |
| **Integrity** | **Cryptographic.** Binds the *Hull Value*. | **Vague.** Often only shows "Insurer Name." | **None.** |
| **Freshness** | **Real-time.** Shows if premium was paid today. | **Laggy.** Database updates can take 1-2 weeks. | **Static.** |
| **User Access** | **Universal.** Any port or lawyer can verify. | **Restricted.** Some high-tier data is pay-walled. | **Universal.** |

**Why OCR wins here:** The "Bridge" Reality. Decisions about vessel safety and finance happen in busy offices far from the ship. People work with "Closing Folders" (PDFs). OCR-to-hash turns the **Static Policy Declaration** into a live, high-authority digital anchor that is much more important for legal liability than a generic database entry.

