---
title: "Capital Adequacy Attestations"
category: "Financial Services Compliance"
volume: "Small"
retention: "7-10 years (regulatory audit)"
slug: "capital-adequacy-attestations"
tags: ["capital", "solvency", "basel", "crd", "regulatory", "banking", "insurance", "prudential"]
---

## What is a Capital Adequacy Attestation?

Financial institutions must hold enough capital to absorb losses and remain solvent. Regulators require periodic attestations that the firm meets minimum capital requirements.

These attestations are filed privately with regulators (competitive sensitivity), but counterparties — other banks, clearing houses, large clients — often need assurance that a firm is adequately capitalized before doing business with them.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #003366; background: #fff; padding: 0;">
  <div style="background: #003366; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;">CAPITAL ADEQUACY ATTESTATION</div>
    <div style="font-size: 0.8em;">Prudential Regulatory Confirmation</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Firm:</strong> Meridian Capital Partners LLP<br>
    <strong>FRN:</strong> 123456<br>
    <strong>Attestation Date:</strong> March 31, 2026</p>

    <div style="background: #f0f4f8; padding: 15px; margin: 15px 0; border-left: 3px solid #003366;">
      <p style="margin: 0;"><strong>We hereby attest that as of the above date:</strong></p>
      <p style="margin: 10px 0 0;">• The firm meets all applicable capital requirements under FCA MIFIDPRU</p>
      <p style="margin: 5px 0 0;">• CET1 Ratio exceeds minimum threshold</p>
      <p style="margin: 5px 0 0;">• No capital buffer breaches have occurred in the reporting period</p>
    </div>

    <p style="font-size: 0.85em; color: #666;">Signed: J. Morrison, Chief Financial Officer<br>
    Countersigned: External Auditor (Deloitte LLP)</p>

    <div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      verify:meridian-capital.com/regulatory/CAP-2026Q1
    </div>
  </div>
</div>

## Data Verified

**Firm name**, **regulatory ID** (FRN/CRD/SEC number), **attestation date**, **capital ratio confirmation** (CET1, Tier 1, Total Capital), **buffer compliance**, **signatory names**, **external auditor confirmation**.

## Data Visible After Verification

**Status Indications:**
- **Confirmed** — Attestation is current and accurate
- **Superseded** — Newer attestation available
- **Under Review** — Regulatory inquiry in progress
- **Breach Notified** — Capital buffer breach has been reported to regulator

## Why Not a Public Registry?

Capital ratios are competitively sensitive. A firm trading at exactly minimum capital is technically compliant but may be seen as weak. Regulators receive private filings; firms disclose some ratios publicly in annual reports, but point-in-time attestations are not in public registries.

## Jurisdiction Differences

| Jurisdiction | Regulator | Framework | Public Disclosure |
|--------------|-----------|-----------|-------------------|
| **UK** | PRA/FCA | MIFIDPRU, Basel III.1 | Annual Pillar 3 reports (partial) |
| **US** | Fed, OCC, FDIC | Basel III, Dodd-Frank | Call Reports (banks), Form X-17A-5 (broker-dealers) |
| **EU** | ECB, national | CRD IV/CRR | Pillar 3 disclosures (partial) |

US bank Call Reports are public; UK/EU Pillar 3 reports are periodic and backward-looking. Point-in-time attestations between counterparties are not covered.

## Third-Party Use

**Counterparty banks** — Before entering large derivative positions or extending credit lines
**Clearing houses** — Membership requirements, margin calculations
**Institutional clients** — Prime brokerage relationships, custody arrangements
**Rating agencies** — Input to credit ratings (though they typically access more detail)

## Verification Architecture

**The Problem:** Firms may provide attestations that overstate their capital position, or provide stale attestations after capital has deteriorated.

**The Fix:** CFO/auditor signs attestation; firm publishes hash. Counterparty verifies the attestation is current and hasn't been altered. Revocation/supersession status shows if capital position has changed.
