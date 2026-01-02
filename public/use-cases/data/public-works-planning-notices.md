---
title: "Public Works and Planning Notices"
category: "Construction Permits"
type: "use-case"
slug: "public-works-planning-notices"
beneficiary: "Neighbors/Public"
tags: ["zoning", "planning-permission", "public-right-of-way", "street-works", "utility-digs", "scaffolding", "tree-removal", "public-notice"]
---

# Public Works and Planning Notices

**Category:** Public Works & Planning Notices
**Beneficiary:** Neighbors/public
**Examples:** Appeal rights, planning permission, utility digs, scaffolding, street repairs, tree removal.

These notices concern **changes affecting the public right-of-way**, whether temporary (like a sidewalk shed) or permanent (like a rezoning application or planning permission). They inform the community of their legal rights to object and ensure that work blocking public access is authorized and insured.

**Where Posted:** Highly visible locations facing the street. Typically on **lamp posts**, taped to **sidewalk scaffolding**, or displayed on **barricades** blocking the public road.

## Verification Value

**Problem:**
- **Fake Parking/Works Signs:** Creating fake "No Parking" or "Utility Work" signs to clear a street for a private event without city authorization.
- **Fraudulent Appeal Rights:** Hiding or misstating the window for neighbors to object to a new development (especially critical in jurisdictions like France).
- **Uninsured Street Work:** Utility companies or contractors digging up the street without a verified permit, creating liability for the city.
- **Unauthorized Tree Removal:** Illegally removing heritage or street trees under the guise of un-verified "emergency" work.

**Solution:**
Neighbors and pedestrians can scan the notice to verify the **exact deadlines for appeal**, the **legal hours of street closure**, and the **insurance status** of the contractor. This ensures that changes to the public environment are transparent and legally binding.

## Key Examples

### Planning Permission & Zoning Notices
*   **Purpose:** Inform the public of proposed permanent changes to land use or building character.
*   **Verification:** Critical for neighbors to see the *exact* deadline to file an objection or appeal. Prevents developers from "editing" dates to shorten the legal window to sue.

### Utility & Street Works (Works Permits)
*   **Purpose:** Authorize scaffolding, sidewalk sheds, utility digs, and street repairs.
*   **Verification:** Allows pedestrians to verify that the "sidewalk shed" blocking their path is legal, safe, and has active insurance.

### Tree Removal & Environmental Changes
*   **Purpose:** Authorize the removal of heritage trees or protected vegetation.
*   **Verification:** Ensures the specific tree species and diameter match the environmental clearance issued by the urban forestry department.

## Regional Variations

*   **France (Permis de Construire):** Extremely strict. A panel must be visible from the road for 2 continuous months to start the legal appeal clock. Verification locks the date and prevents "backdating" fraud.
*   **United Kingdom:** Planning notices are traditionally yellow cards posted on lamp posts for a 21-day consultation period.
*   **United States:** Uses various placards for "No Parking" (Temporary) and "Public Hearing" (Zoning) that must be clearly visible from the sidewalk.

## Implementation for Issuers

**City Planning & Public Works Depts:**
1.  **Generate:** Create the official notice PDF with a `verify:` line.
2.  **Hash:** Bind the appeal deadline, specific street boundaries, and project description to the hash.
3.  **Transparency:** Scanning the hash could show the full digital application and any high-res renderings of the proposed change.

**Neighbors & Pedestrians:**
1.  **Scan:** Point a smartphone at the yellow notice on the lamp post.
2.  **Verify:** "The sign says I have until the 15th to appeal, and the city registry confirms that date is accurate."
