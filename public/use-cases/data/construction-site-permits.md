---
title: "Construction Site Permits"
category: "Construction Permits"
type: "use-case"
slug: "construction-site-permits"
beneficiary: "Neighbors/Public"
tags: ["construction", "permits", "building", "fenced-off", "site-centric", "demolition", "electrical", "plumbing", "hvac", "grading"]
---

# Construction Site Permits

**Category:** Construction Site Permits
**Beneficiary:** Neighbors/public
**Examples:** Project scope, building authorizations, demolition notices, trade-specific permits (electrical, plumbing, HVAC), grading authorizations, well drilling.

Construction site permits cover work that is typically **fenced off from the public right-of-way**. While the work occurs on private property, these permits must be displayed so that neighbors, inspectors, and potential buyers can verify that the project is authorized, safe, and adhering to the approved scope.

**Where Posted:** Typically placed in **site windows**, taped to **temporary construction fences**, or held in **weatherproof displays** zip-tied to the primary site entrance.

## Verification Value

**Problem:**
- **Unlicensed/Illegal Work:** Contractors working without permits or using "Photoshop" permits to hide illegal structural changes from the city or neighbors.
- **Scope Creep:** Doing work beyond what was authorized (e.g., building a 3-story structure when only 2 were approved).
- **Safety Risks:** Using fake electrical or plumbing permits to bypass critical fire and health safety inspections.
- **Midnight Work:** Performing un-inspected grading or demolition work over a weekend to avoid fees or oversight.

**Solution:**
Scanning the posted permit allows neighbors and inspectors to verify the **authorized project scope**, **contractor licensing**, and **real-time inspection status** against the municipal database. This ensures the "Mechanical Heart" and structural integrity of the building are verified safe.

## Key Examples

### Building & Structural Permits
*   **Purpose:** Authorize new construction, additions, or major renovations inside the property line.
*   **Verification:** Confirms the project description (e.g., "2-story addition") matches the work being done.

### Demolition & Hazmat Permits
*   **Purpose:** Authorize the removal of structures.
*   **Verification:** Ensures utility cut-offs (gas/electric) are verified and hazardous materials (asbestos/lead) have been cleared before work begins.

### Trade Permits (Electrical, Plumbing, HVAC)
*   **Purpose:** Specific authorizations for technical and safety-critical systems.
*   **Verification:** Confirms the specific work (e.g., "200 Amp Panel Upgrade") was done by a licensed professional and passed mandatory safety inspections.

### Grading, Land Disturbance & Well Drilling
*   **Purpose:** Authorize moving soil or drilling for water.
*   **Verification:** Binds the specific "Cut & Fill" volume and ensures erosion controls are in place to prevent mudslides or environmental damage.

## Implementation for Issuers

**Municipal Building Departments:**
1.  **Issue:** Provide the permittee with a high-resolution card containing a `verify:` line.
2.  **Hash:** Bind the project scope, address, and contractor license to the hash.
3.  **Real-Time Status:** If a "Stop Work Order" is issued for a violation, the verification response instantly shows **RED TAGGED** or **SUSPENDED**.

**The Public:**
1.  **Scan:** Point a smartphone at the permit on the construction fence.
2.  **Verify:** "The card says 'Kitchen Remodel', but the city database says 'Approved for 3-Story Addition'—let's check the plans."
