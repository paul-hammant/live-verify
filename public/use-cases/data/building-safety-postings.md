---
title: "Building Safety Postings"
category: "Building safety"
type: "use-case"
slug: "building-safety-postings"
beneficiary: "Occupants/Public"
tags: ["building-safety", "inspection", "certificates", "elevator", "fire-safety", "evacuation", "public-safety", "occupants"]
---

# Building Safety Postings

**Category:** Building safety
**Beneficiary:** Occupants/public
**Examples:** Elevator certificates, fire extinguisher tags, emergency evacuation maps, boiler permits, pool health ratings.

Building safety postings are official inspection certificates and safety diagrams that must be displayed within a facility to prove it meets mandatory life-safety codes. These documents provide assurance to tenants, visitors, and workers that the building's critical systems are professionally maintained and safe for use.

**Where Posted:** Highly visible locations near the equipment or area being certified. Typically in **building lobbies**, **inside elevator cabs**, **mechanical rooms**, **hallways**, and **near exit doors**.

## Verification Value

**Problem:**
- **Expired/Ghost Certificates:** Building owners keeping old certificates on the wall to hide missed inspection cycles or failed safety tests.
- **"Pencil Whipping":** Shady inspectors signing off on safety checks (e.g., a 90-minute battery test for emergency lights) without actually performing them.
- **Diagram Tampering:** Landlords "self-editing" evacuation maps to hide blocked exits or hide the fact that a floor plan has been illegally subdivided.
- **Forged Signatures:** Counterfeit certificates used to avoid high maintenance costs for elevators or fire suppression systems.

**Solution:**
Occupants and fire marshals can scan the placard or tag to verify the **real-time status** against the city's or the service company's official database. For maps, the verification result serves the **official approved diagram**, allowing for a direct visual comparison.

## Key Examples

### Elevator, Escalator & Moving Walkway Certificates
*   **Purpose:** Certify the machines are safe for passenger use and meet ASME standards.
*   **Verification:** Confirms the serial number matches the equipment and that the capacity rating hasn't been altered.

### Fire Safety (Extinguishers, Alarms, Sprinklers)
*   **Purpose:** Prove that life-saving equipment is functional and professionally inspected.
*   **Verification:** Prevents "tag swapping" where a valid tag is moved from a new extinguisher to an old, dead one.

### Emergency Evacuation Maps
*   **Purpose:** Display official exit routes and assembly points approved by the Fire Marshal.
*   **Verification:** The served result of the hash is the **official approved diagram** itself. This allows users to visually compare the map on their phone to the one on the wall to expose "self-edited" versions.

### Mechanical & Utility (Boilers, Backflow, HVAC, Cooling Towers)
*   **Purpose:** Ensure high-pressure vessels, drinking water, and indoor air quality meet health and safety standards.
*   **Verification:** Crucial for verifying "Rough-In" passes and current safety ratings for high-risk industrial equipment. Legionella testing for cooling towers prevents disease outbreaks.

### Public Health (Pools, Spas, Gyms)
*   **Purpose:** Display sanitation and safety ratings for recreational facilities.
*   **Verification:** Prevents disease outbreaks (e.g., Legionella) by ensuring health department records match the posted "Verified" status.

## Country-Specific Variations

*   **United States:** State Boards (Boilers, Elevators) and Municipal Fire/Building Departments are primary issuers. NFPA and ASME standards are strictly enforced.
*   **United Kingdom:** Requires specific certification for lifts and pressure systems (PSSR), along with displayed fire risk assessments.
*   **Germany:** **TÜV** or **DEKRA** stickers are ubiquitous on machinery and elevator panels as proof of rigorous safety audits.

## Implementation for Issuers

**City Safety Bureaus & Engineering Firms:**
1.  **Issue:** Provide the building owner with a certificate or decal containing a `verify:` line.
2.  **Hash:** Bind the equipment ID, inspection date, and safety parameters (e.g., PSI, Capacity) to the hash.
3.  **Real-Time Status:** If a system fails a test, the verification response instantly shows **FAILED**, **RED TAGGED**, or **UNSAFE**.

**The Public & Tenants:**
1.  **Scan:** Point a smartphone at the elevator card or lobby map.
2.  **Verify:** "The phone shows this elevator was red-tagged yesterday—let's take the stairs."
