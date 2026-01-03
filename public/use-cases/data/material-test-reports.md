---
title: "Material Test Reports (MTR / Mill Certs)"
category: "Product Certifications & Compliance"
volume: "Small"
retention: "10-30 years (structural integrity)"
slug: "material-test-reports"
tags: ["mtr", "mill-certificate", "steel-testing", "material-science", "structural-integrity", "asme-compliance", "metallurgy", "supply-chain-traceability"]
derivations: 1
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', Courier, monospace; border: 1px solid #000; background: #fff; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
    <strong>SHEFFIELD STEEL FORGE, LTD.</strong><br>
    CERTIFIED MATERIAL TEST REPORT (CMTR)<br>
    ---------------------------------------
  </div>

  <div style="font-size: 0.85em; line-height: 1.4;">
    <div style="display: flex; justify-content: space-between;">
      <div>
        <strong>Customer:</strong> Apex Structural Engineering<br>
        <strong>Heat Number:</strong> <span data-bracket="start" data-for="mtr">]</span>HEAT-992288-X
      </div>
      <div style="text-align: right;">
        <strong>Report #:</strong> MTR-2026-042<br>
        <strong>Date:</strong> 15 MAR 2026
      </div>
    </div>

    <div style="margin: 15px 0; border: 1px solid #000; padding: 10px; background: #f9f9f9;">
      <strong>MATERIAL SPECIFICATION: ASTM A36 / ASME SA36</strong><br>
      Product: Structural Steel I-Beam (12" x 24')<br>
      Quantity: 120 Pieces
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px; font-size: 0.9em;">
      <tr style="border-bottom: 1px solid #000; font-weight: bold;">
        <th style="text-align: left;">Element / Test</th>
        <th style="text-align: right;">Result</th>
        <th style="text-align: right;">Limit (Max)</th>
      </tr>
      <tr>
        <td>Carbon (C)</td>
        <td style="text-align: right;">0.24%</td>
        <td style="text-align: right;">0.26%</td>
      </tr>
      <tr>
        <td>Yield Strength</td>
        <td style="text-align: right;">38,500 PSI</td>
        <td style="text-align: right;">36,000 (Min)</td>
      </tr>
    </table>

    <div style="margin-top: 20px; font-size: 0.8em; font-style: italic; color: #555;">
      We hereby certify that the material has been tested and found to be in compliance with the above listed specifications.
    </div>

    <div data-verify-line="mtr" style="border-top: 1px dashed #999; margin-top: 25px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.85em; color: #555; text-align: center;"
      title="Demo only: Steel mill doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:sheffield-steel.co.uk/mtr/v/HEAT992288 <span data-bracket="end" data-for="mtr">]</span>
    </div>
  </div>
</div>

## Data Verified

Manufacturer name (the Mill), Heat Number (unique batch ID), material grade (e.g., ASTM A36), chemical composition (% of C, Mn, P, S), mechanical properties (Yield Strength, Tensile Strength, Elongation), test date, technician name, issuing lab domain.

**Document Types:**
- **Mill Test Report (MTR):** The primary birth certificate for metal.
- **Concrete Cylinder Test:** Proving curing strength at 7/28 days.
- **Weld Inspection Report:** (Linked hash) proving joint integrity.
- **Positive Material Identification (PMI):** Field verification of alloys.

## Data Visible After Verification

Shows the issuer domain (the Mill or Testing Lab) and current batch standing.

**Status Indications:**
- **Certified** — Data matches the mill's official furnace ledger.
- **Retracted** — **ALERT:** Post-shipment testing found a structural flaw in this heat.
- **Superseded** — Corrected report issued (e.g., due to typo in chemical list).
- **Invalid** — Heat number or signature mismatch.

## Second-Party Use

The **Structural Engineer / Fabricator** benefits from verification.

**Quality Control:** Proving to a project owner (e.g., a city bridge authority) that the steel being used isn't "Counterfeit" or "Sub-standard." A verified hash from the mill's domain prevents "Paperwork Gaps" that can shut down a multi-million dollar construction site for weeks.

**Legal Defense:** If a structure fails 20 years later, the fabricator has an immutable digital record proving they purchased and verified material that met all safety specs at the time of construction.

## Third-Party Use

**Building Inspectors / DOT Officers**
**Field Audit:** Walking through a job-site trailer, the inspector scans the MTRs. "Verified by Sheffield-Steel" ensures the contractor isn't using "Ghost MTRs" to hide the use of cheap, un-vetted imported steel in a critical load-bearing bridge.

**Banks / Inventory Lenders**
**Collateral Vetting:** Verifying the "Grade" and "Quality" of steel inventory before using it as collateral for a high-value loan.

**Aerospace / Defense Procurement**
**Traceability:** Ensuring 100% verified material origin for flight-critical components.

## Verification Architecture

**The "Ghost Steel" Fraud Problem**

- **Heat Number Forgery:** Laser-etching a "Premium" heat number onto a "Scrap" grade beam and creating a fake paper MTR to match.
- **Data Smoothing:** Editing a PDF to change a "0.28% Carbon" (Fail) to "0.24% Carbon" (Pass) to avoid scrapping a $50,000 batch of steel.
- **Mill Impersonation:** Small distributors creating fake MTRs on the letterhead of famous mills like Nucor or ArcelorMittal to sell un-vetted inventory.

**Issuer Types**

**Steel Mills / Foundries:** (e.g., Nucor, Nippon Steel, ArcelorMittal).
**Independent Testing Labs:** (ISO 17025 accredited).
**Material Aggregators:** (e.g., MetalTrace, Steelpoint - hosting the hashes).

## Competition vs. EDI / Blockchain (MetalBlock)

| Feature | OCR-to-Hash | Metal-Specific Blockchain | Paper Mill Cert |
| :--- | :--- | :--- | :--- |
| **Field Access** | **Instant.** Scan the paper at the yard. | **Difficult.** Requires yard workers to have private node access. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Mill. | **Consensus-Bound.** Trust the network. | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** PDFs work across all fabricators. | **Low.** Requires every link in the chain to use the same blockchain. | **Universal.** |
| **Integrity** | **Binds Content.** Protects the chemical list. | **Data-Only.** | **Vulnerable.** |

**Why OCR wins here:** The "Construction Yard" reality. Steel is heavy, dirty, and moves through a complex web of small fabricators and job-sites. They all work with paper and PDFs. OCR-to-hash turns the **Mandatory Paper Certificate** into a live digital anchor, bringing "Blockchain-level" integrity to the world of heavy metal without the massive IT overhead.
