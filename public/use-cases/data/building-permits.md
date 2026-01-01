---
title: "Building Permits"
category: "Construction & Property Permits"
volume: "Medium"
retention: "Permanent (building records)"
slug: "building-permits"
tags: ["construction", "building-permit", "city-planning", "inspection", "contractor", "home-improvement"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 3px solid #fbc02d; background: #fffde7; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #fbc02d; color: #000; padding: 15px; text-align: center;">
    <h2 style="margin: 0; text-transform: uppercase;">CITY OF MIAMI</h2>
    <div style="font-size: 0.9em; font-weight: bold;">BUILDING DEPARTMENT</div>
  </div>

  <div style="padding: 25px;">
    <div style="text-align: center; border-bottom: 2px solid #fbc02d; padding-bottom: 10px; margin-bottom: 20px;">
      <h3 style="margin: 0; color: #333;">BUILDING PERMIT</h3>
      <div style="font-size: 1.2em; font-weight: bold; margin-top: 5px;">Permit #: BLD-2026-9928</div>
    </div>

    <div style="font-size: 0.95em; line-height: 1.5; color: #333;">
      <p><strong>Address:</strong> <span data-bracket="start" data-for="permit">]</span>4500 Ocean Drive, Miami, FL 33139<br>
      <strong>Owner:</strong> Sarah Connor</p>

      <p><strong>Description:</strong> Construction of 20'x40' In-ground Swimming Pool and Perimeter Fence.</p>

      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr>
          <td style="border: 1px solid #fbc02d; padding: 8px;"><strong>Contractor:</strong></td>
          <td style="border: 1px solid #fbc02d; padding: 8px;">Aqua-Safe Pools (Lic #9982)</td>
        </tr>
        <tr>
          <td style="border: 1px solid #fbc02d; padding: 8px;"><strong>Valuation:</strong></td>
          <td style="border: 1px solid #fbc02d; padding: 8px;">$ 85,000.00</td>
        </tr>
        <tr>
          <td style="border: 1px solid #fbc02d; padding: 8px;"><strong>Issued:</strong></td>
          <td style="border: 1px solid #fbc02d; padding: 8px;">March 15, 2026</td>
        </tr>
      </table>

      <p style="font-size: 0.8em; font-style: italic; color: #555;">
        MUST BE POSTED IN A CONSPICUOUS LOCATION VISIBLE FROM THE STREET.
      </p>
    </div>

    <div data-verify-line="permit" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: City of Miami doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:miamigov.com/permits/v/BLD9928 <span data-bracket="end" data-for="permit">]</span>
    </div>
  </div>
</div>

## Data Verified

Property address, permit number, permit type (New/Renovate/Demo), project description, contractor name/license, project valuation, issuance date, expiration date, key inspection milestones.

**Document Types:**
- **Building Permit Card:** The yellow/orange card posted at the site.
- **Certificate of Occupancy (CO):** Final proof that building is safe to inhabit.
- **Phased Approval Notice:** For large-scale projects (Foundation, Shell, Finish).

## Data Visible After Verification

Shows the issuer domain (`miamigov.com`, `nyc.gov`) and current permit status.

**Status Indications:**
- **Active** — Work authorized; inspections pending.
- **Finaled** — All work complete; inspections passed.
- **Expired** — Work must stop; renewal required.
- **Red Tagged** — Stop Work Order issued due to violation.

## Second-Party Use

The **Property Owner** or **General Contractor** benefits from verification.

**Payment Draws:** Proving to a lender that the permit is "Active" and "In Good Standing" before they release the next $100,000 construction draw.

**Resale Due Diligence:** When selling a home with a recent renovation, the owner provides a "Verified Finaled" status to the buyer, proving the work was legal and inspected.

## Third-Party Use

**Neighbors / Concerned Citizens**
**Neighborhood Integrity:** If a massive addition is being built next door, a neighbor can scan the posted permit. "Verified by City" ensures the work isn't an illegal, unpermitted project that might damage their own property.

**Mortgage Lenders**
**Asset Protection:** Verifying that the building being used as collateral for a $1M loan was constructed with all valid permits and has a legitimate "Certificate of Occupancy."

**Insurance Companies**
**Premium Accuracy:** Ensuring that the square footage and use-type of the building match the city's verified records. Unpermitted additions are often excluded from coverage.

## Verification Architecture

**The "Street-Side" Fraud Problem**

- **Fake Postings:** Using a color printer to create a fake "Building Permit" to stop neighbors from calling 311 on an illegal construction project.
- **Scope Creep:** Obtaining a permit for a "Minor Kitchen Remodel" but using the paper to hide a massive structural addition.
- **Expired Permits:** Leaving a 2023 permit card in the window to hide that the 2026 work is being done without a current permit.

**Issuer Types**

**Municipal Building Departments:** (e.g., LA Building & Safety, Chicago Dept of Buildings).
**Third-Party Inspectors:** (In some jurisdictions).

## Competition vs. Public Records Search

| Feature | OCR-to-Hash | Public GIS/Permit Map | Paper Permit Card |
| :--- | :--- | :--- | :--- |
| **Field Access** | **Instant.** Scan the paper in the window. | **Difficult.** Maps are often slow, require specific addresses, and are hard to navigate on mobile. | **Instant.** |
| **Trust** | **High.** Bound to the City's domain. | **Medium.** Easy to confuse with third-party sites. | **Zero.** Easily faked. |
| **Integrity** | **Binds Content.** Proves the *Description* matches. | **General.** Often just says "Active" without the project scope details. | **Vulnerable.** |

**Why OCR wins here:** The "Walking the Block" scenario. Neighbors and inspectors encounter construction in the physical world. OCR-to-hash turns the **Physical Artifact** (the permit card) into a **Digital Portal** to the city's latest data, closing the information gap between the sidewalk and the server.
