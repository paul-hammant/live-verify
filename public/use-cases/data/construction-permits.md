---
title: "Construction Permits"
category: "Construction Permits"
type: "use-case"
slug: "construction-permits"
beneficiary: "Neighbors/Public"
tags: ["construction", "permits", "building", "zoning", "public-notice", "neighbors", "demolition", "electrical", "plumbing", "hvac", "grading"]
---

# Construction Permits

**Category:** Construction Permits
**Beneficiary:** Neighbors/public
**Examples:** Appeal rights, project scope, building authorizations, demolition notices, trade-specific permits (electrical, plumbing, HVAC), grading authorizations.

Construction permits are official authorizations issued by municipal building departments. They must be physically displayed at the job site to prove that the work meets safety codes, zoning laws, and environmental regulations.

**Where Posted:** Conspicuous locations **visible from the public right-of-way** (e.g., street or sidewalk). Typically placed in **windows**, taped to **fences**, or held in **weatherproof displays** zip-tied to the site entrance.

## Verification Value

**Problem:**
- **Unlicensed/Illegal Work:** Contractors working without permits or homeowners using "Photoshop" permits to hide illegal work from the city or neighbors.
- **Scope Creep:** Doing work beyond what was authorized (e.g., building a 3-story structure when only 2 were approved).
- **Fraudulent Appeal Rights:** Hiding or misstating the window for neighbors to object (especially critical in jurisdictions like France).
- **Safety Risks:** Using fake electrical or plumbing permits to bypass fire and health safety inspections.

**Solution:**
Neighbors, inspectors, and potential buyers can scan the posted permit to verify its details against the municipal database. This confirms the project scope, expiration date, contractor licensing, and legal appeal periods are accurate.

## Key Examples

### Building & Structural Permits
*   **Purpose:** Authorize new construction, additions, or major renovations.
*   **Verification:** Confirms the project description (e.g., "2-story addition") matches the work being done.

### Demolition & Hazmat Permits
*   **Purpose:** Authorize the removal of structures.
*   **Verification:** Ensures utility cut-offs (gas/electric) are verified and hazardous materials (asbestos/lead) have been cleared. Prevents "midnight demolitions" of historic buildings.

### Trade Permits (Electrical, Plumbing, HVAC)
*   **Purpose:** Specific authorizations for technical and safety-critical work.
*   **Verification:** Confirms the work (e.g., "200 Amp Panel Upgrade" or "4-ton Heat Pump") was done by a licensed professional and passed safety inspections.

### Grading & Land Disturbance
*   **Purpose:** Authorize moving large volumes of soil.
*   **Verification:** Binds the specific "Cut & Fill" volume and ensures erosion controls (SWPPP) are in place to prevent mudslides or runoff.

### Zoning & Public Notices
*   **Purpose:** Inform the community of proposed changes or commercial signage.
*   **Verification:** Critical for neighbors to see the exact deadline to file an appeal or objection.

## Global Variations

*   **France (Permis de Construire):** Extremely strict. A panel (>80cm) must be displayed for 2 continuous months to start the appeal period. Verification prevents developers from "editing" dates to shorten the neighbor's window to sue.
*   **Germany (Bauschild):** Construction signs are required for larger projects, listing the *Bauherr* (owner), architect, and contractor.
*   **United Kingdom:** Planning notices are often yellow cards posted on lamp posts for 21 days. Building control verifies safety at specific stages (foundation, roof).
*   **United States:** Uses various colored cards (Yellow/Orange) that must be visible from the street. Inspectors sign the physical card at each stage.

## Implementation for Issuers

**Municipal Building Departments:**
1.  **Generate:** Create a permit card with a `verify:` line.
2.  **Hash:** Bind the project scope, address, and contractor info to the hash.
3.  **Real-Time Status:** If a "Stop Work Order" is issued, the verification response instantly shows **RED TAGGED** or **SUSPENDED**.

**Public & Inspectors:**
1.  **Scan:** Point a smartphone at the permit in the window or on the fence.
2.  **Verify:** "The card says 'Minor Renovation', but the city says 'Full Demolition'—we need to report this."