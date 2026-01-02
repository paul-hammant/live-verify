---
title: "Energy Audits and Efficiency Ratings"
category: "Energy & Utilities"
volume: "Very Small"
retention: "5-10 years (improvement tracking)"
slug: "energy-audits-efficiency-ratings"
tags: ["energy-audit", "energy-efficiency", "green-building", "hvac-efficiency", "utility-rebates", "esg-reporting", "hers-rating"]
---

## What is an Efficiency Rating?

An **Energy Performance Certificate (EPC)** or HERS rating is like a "Nutrition Label" for a building. It tells you exactly how much electricity and gas the building uses to stay warm or cool.

For an office tower or a house, a high rating (like an **A-Rating**) is worth thousands of dollars in lower utility bills and higher resale value.

"Greenwashing" is common: owners sometimes edit their certificates to turn a "C" into an "A" to attract tenants or qualify for government tax breaks. Verified hashes allow a tenant or buyer to scan the paper in the lobby and see the **unfiltered energy math** from the auditor's database.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #2e7d32; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #2e7d32; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;">SUSTAINABLE BUILDINGS DEPT.</div>
      <div style="font-size: 0.8em;">Official Energy Efficiency Rating</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Rating ID: EER-2026-9922</div>
    </div>
  </div>

  <div style="padding: 25px;">
    <h3 style="margin-top: 0; color: #2e7d32; border-bottom: 2px solid #2e7d32; padding-bottom: 5px;">ENERGY PERFORMANCE CERTIFICATE (EPC)</h3>

    <div style="font-size: 0.9em; line-height: 1.6; color: #333;">
      <p><strong>Property:</strong> <span data-bracket="start" data-for="energy">]</span>4500 Skyline Blvd, Unit 402, Austin, TX 78701<br>
      <strong>Asset Type:</strong> Commercial Office (Class A)</p>

      <div style="display: flex; align-items: center; justify-content: center; margin: 20px 0;">
        <div style="width: 100px; height: 100px; border-radius: 50%; border: 8px solid #2e7d32; display: flex; align-items: center; justify-content: center; font-size: 2em; font-weight: bold; color: #2e7d32;">A</div>
        <div style="margin-left: 20px;">
          <div style="font-weight: bold;">RATING: EXCELLENT</div>
          <div style="font-size: 0.8em;">Carbon Intensity: 12.4 kgCO2/m&sup2;</div>
        </div>
      </div>

      <p><strong>Certified Auditor:</strong> Dr. Aris Vrettos (RESNET #9982)<br>
      <strong>Audit Date:</strong> March 15, 2026</p>
    </div>

    <div style="margin-top: 25px; padding: 10px; background: #f1f8e9; border: 1px solid #c5e1a5; font-size: 0.8em; color: #33691e; font-style: italic; text-align: center;">
      This rating is a verified record of energy use intensity (EUI) and insulation R-values.
    </div>

    <div data-verify-line="energy" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Energy Dept doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:city-energy.gov/ratings/v/EER9922 <span data-bracket="end" data-for="energy">]</span>
    </div>
  </div>
</div>

## Data Verified

Property address, asset type, numerical efficiency score (e.g., HERS index), carbon intensity (kgCO2/m²), primary HVAC efficiency ratings, auditor name/accreditation, date of audit, expiration date of rating.

**Document Types:**
- **Energy Performance Certificate (EPC):** Mandatory for sales/leases in the EU/UK.
- **HERS Rating Certificate:** Home Energy Rating System (US standard).
- **Utility Rebate Application:** Verified proof of efficiency upgrade.
- **Blower Door Test Report:** Proving airtightness for building codes.

## Data Visible After Verification

Shows the issuer domain (`energy.gov`, `resnet.us`, `epa.gov`) and rating status.

**Status Indications:**
- **Current** — Rating matches the auditor's latest certified run.
- **Outdated** — Building has been remodeled or audit is > 10 years old.
- **In-Progress** — Auditor has performed site-visit; final data pending.
- **Disputed** — Occupant has reported energy use inconsistent with rating.

## Second-Party Use

The **Property Owner / Developer** benefits from verification.

**Lease Negotiations:** Proving to a "Fortune 500" tenant that the office has a "Verified A-Rating." Major companies now have "Net Zero" mandates and won't sign a lease without verified energy proof.

**Utility Rebates:** Proving to a utility company (e.g., PG&E or Con Edison) that a high-efficiency HVAC system was actually installed and verified, triggering a $5,000+ rebate instantly.

**Mortgage Discounts:** Qualifying for "Green Mortgages" (lower APR) by providing verified energy efficiency proof to the lender.

## Third-Party Use

**Commercial Tenants**
**Operational Costs:** Before signing a 10-year lease, a tenant scans the EPC in the lobby. "Verified by City Energy" ensures they won't be hit with a $50,000/year "Energy Surprise" due to a fake rating.

**Mortgage Lenders**
**Collateral Quality:** Lenders for commercial property verify the EPC to ensure the asset remains compliant with emerging "Carbon Tax" or "Building Performance Standard" laws.

**Municipal Code Enforcement**
**Compliance:** Verifying that a new building meets the "Energy Code" promises made during the permitting phase.

## Verification Architecture

**The "Greenwashing" Fraud Problem**

- **Score Inflation:** Editing a "C-Rating" to read "A-Rating" on a PDF to attract higher rents.
- **Auditor Impersonation:** Creating a fake report on the letterhead of a reputable energy firm like Stantec or AECOM.
- **Reuse Fraud:** Using an old report for a neighboring building to hide that the current building has outdated insulation.

**Issuer Types**

**Accrediting Bodies:** (e.g., RESNET, BPI).
**Government Agencies:** (e.g., UK MHCLG for EPCs).
**Utility Companies.**

## Competition vs. Central Databases (Energy Star)

| Feature | OCR-to-Hash | Portfolio Manager (EPA) | Scanned PDF Report |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Auditor/Gov. | **Database.** Direct from source. | **Zero.** Easily forged. |
| **Integrity** | **Binds Details.** Protects the Carbon Intensity. | **Data-Only.** Doesn't verify the paper. | **Vulnerable.** |
| **Speed** | **Instant.** Scan the paper in the lobby. | **Slow.** Requires property ID and manual lookup. | **Instant.** |
| **Accessibility** | **Open.** Any tenant or buyer can verify. | **Difficult.** Portals often require owner permission. | **Universal.** |

**Why OCR wins here:** The "Lobby Entrance" reality. EPCs are often posted in building lobbies. A prospective tenant or visitor wants to trust that rating *now*. OCR-to-hash turns the **Physical Rating Poster** into a live, trusted digital link, ensuring the building's "Green" status is a cryptographically verified fact.
