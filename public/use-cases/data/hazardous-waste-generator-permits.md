---
title: "Hazardous Waste Generator Permits"
category: "Environmental & Natural Resource Permits"
volume: "Small"
retention: "Permit term + 30 years (RCRA)"
slug: "hazardous-waste-generator-permits"
tags: ["hazmat", "rcra", "epa-id", "hazardous-waste", "environmental-compliance", "epa-permit", "pollution-prevention"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 3px solid #333; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #1a1a1a; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.1em;">U.S. ENVIRONMENTAL PROTECTION AGENCY</div>
      <div style="font-size: 0.8em; opacity: 0.8;">RCRA Subtitle C • Hazardous Waste Management</div>
    </div>
    <div style="width: 40px; height: 40px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #000; font-weight: bold; font-size: 0.7em;">EPA</div>
  </div>

  <div style="padding: 25px;">
    <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
      <h3 style="margin: 0; color: #333;">NOTICE OF REGISTRATION</h3>
      <div style="font-size: 1.2em; font-weight: bold; margin-top: 5px;">EPA ID #: <span data-bracket="start" data-for="haz-waste">]</span>NJD992288776</div>
    </div>

    <div style="font-size: 0.95em; line-height: 1.6; color: #333;">
      <p><strong>Generator:</strong> Apex Chemical Recovery, LLC<br>
      <strong>Facility Address:</strong> 4500 Industrial Way, Newark, NJ 07101</p>

      <div style="background: #f5f5f5; border: 1px solid #ddd; padding: 15px; margin: 15px 0; border-radius: 4px;">
        <p><strong>Generator Status:</strong> Large Quantity Generator (LQG)</p>
        <p><strong>Authorized Waste Streams:</strong><br>
        ✅ D001: Ignitable Waste<br>
        ✅ F003: Spent Non-Halogenated Solvents<br>
        ✅ K001: Bottom sediment sludge from wood preserving</p>
      </div>

      <p><strong>Effective Date:</strong> March 15, 2026<br>
      <strong>Compliance Status:</strong> ACTIVE / VERIFIED</p>
    </div>

    <div data-verify-line="haz-waste" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: EPA doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:epa.gov/rcrainfo/v/NJD992288776 <span data-bracket="end" data-for="haz-waste">]</span>
    </div>
  </div>
</div>

## Data Verified

Generator name, EPA ID number (RCRA ID), facility address, generator status (LQG, SQG, VSQG), authorized waste codes (D, F, K, P, U codes), effective date, last inspection date, violation status, issuing state/federal agency.

**Document Types:**
- **RCRA Notice of Registration:** The primary "Identity" for a generator.
- **Hazardous Waste Manifest (Uniform):** (Linked hash) for individual shipments.
- **Bi-Annual Report Summary:** Proving the tonnage of waste generated.
- **TSDF Acceptance Certificate:** Proving the waste was legally received.

## Data Visible After Verification

Shows the issuer domain (`epa.gov`, `dep.nj.gov`) and current compliance standing.

**Status Indications:**
- **Active** — Facility is authorized to generate and ship hazardous waste.
- **Inactive** — EPA ID has been retired; no waste may be shipped.
- **Enforcement Action** — **ALERT:** Facility under administrative order for violations.
- **Suspended** — Critical safety failure detected; transport prohibited.

## Second-Party Use

The **Facility Manager / Producer** benefits from verification.

**Vendor Vetting:** Proving to a disposal company (TSDF) that the waste they are about to pick up is coming from a "Verified LQG" with a valid EPA ID. This prevents the TSDF from rejecting the load at their gate due to "Paperwork Uncertainty."

**Insurance Defense:** Proving to an environmental liability insurer that the facility is maintaining verified, active compliance with RCRA standards, which is a condition for maintaining multimillion-dollar pollution coverage.

## Third-Party Use

**Hazardous Waste Transporters**
**Liability Transfer:** Before loading 5,000 gallons of toxic sludge, the driver scans the facility's EPA ID hash. "Verified by EPA.gov" ensures the driver isn't transporting waste for an illegal, "Ghost" operator who might disappear if a spill occurs.

**Environmental Regulators**
**Chain of Custody:** Instantly verifying that the "Waste Codes" on the paper manifest match the facility's authorized waste streams. OCR-to-hash stops "Midnight Dumping" where a facility hides toxic waste under a "General Trash" ID.

**Local Emergency Services**
**Site Intelligence:** Firefighters can scan the facility's posted notice to get a verified list of the hazardous chemicals (waste codes) stored on-site during a fire.

## Verification Architecture

**The "Illegal Dumping" Fraud Problem**

- **Identity Theft:** Small shops using a larger, legitimate company's EPA ID to dispose of toxic waste illegally to save on fees.
- **Code Falsification:** Editing a "Toxic" code (P-code) to a "Non-Hazardous" one on the paper form to avoid strict disposal rules.
- **Backdating Reports:** Altering a bi-annual report to hide that the facility exceeded its "Small Quantity" tonnage limits.

**Issuer Types**

**U.S. EPA (RCRAInfo).**
**State Environmental Agencies:** (e.g., California DTSC, NJ DEP).
**Compliance Tech Firms:** (e.g., Encamp, Intelex - hosting the hashes).

## Competition vs. EPA ECHO Database

| Feature | OCR-to-Hash | EPA ECHO Search (Public) | Scanned PDF Permit |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Cryptographic.** Binds Waste Codes to the ID. | **Data-Only.** Doesn't verify the paper doc. | **Zero.** Easily forged. |
| **Speed** | **Instant.** Scan the paper at the loading dock. | **Slow.** Requires typing 12-digit ID and navigating Gov UI. | **Instant.** |
| **Field Access** | **High.** Mobile-optimized workflow. | **Low.** Gov portals are difficult on small screens. | **Universal.** |
| **Freshness** | **Real-time.** Shows "Enforcement Holds." | **Laggy.** Database updates can take 24-72 hours. | **Static.** |

**Why OCR wins here:** The "Loading Dock" reality. Drivers and site managers work in high-stakes, industrial environments. They need a **zero-friction trust anchor**. OCR-to-hash turns the **EPA ID Certificate** into a live, trusted digital link, ensuring that "Toxic Chain of Custody" is an immutable fact from factory to furnace.
