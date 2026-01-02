---
title: "Licensed Premises Postings"
category: "Licensed premises"
type: "use-case"
slug: "licensed-premises-postings"
beneficiary: "Customers/Regulators"
tags: ["alcohol-license", "liquor-license", "occupancy", "operating-hours", "compliance"]
---

# Licensed Premises Postings

**Category:** Licensed premises
**Beneficiary:** Customers/regulators
**Examples:** Alcohol license, operating hours, occupancy capacity.

Businesses serving alcohol or operating under specific municipal licenses must display their credentials prominently. These documents authorize specific activities (e.g., selling spirits) within restricted parameters.

**Where Posted:** Typically in the **front window**, near the **entrance**, or directly **behind the bar/counter** where it is visible to the public and regulators.

## Verification Value

**Problem:**
- **Hours Tampering:** A bar editing a "12:00 AM" closing time to "02:00 AM" on the paper license to trick local police.
- **Ghost Licenses:** Displaying a counterfeit license for an unlicensed "speakeasy."
- **Over-Capacity:** Using a fake occupancy certificate to host 200 people when the fire code only allows 100.
- **License Renting:** An unlicensed operator using a retired owner's physical paper license; verification reveals the name of the entity doesn't match the current operator.

**Solution:**
Customers, neighbors, and law enforcement can scan the license to verify it matches the active state or municipal registry. This confirms the legal hours, capacity limits, and disciplinary status (e.g., active vs. suspended).

## Key Examples

### Alcohol Licenses (Liquor Licenses)
*   **Purpose:** Prove authorization to sell beer, wine, or spirits on or off-premises.
*   **Verification:** Prevents use of "homemade" or expired cards. Confirms the specific license class (e.g., "Restaurant" vs. "Nightclub").

### Operating Hours & Occupancy
*   **Purpose:** State the legal closing time and the maximum number of people allowed inside.
*   **Verification:** Vital for public safety and noise control. Allows neighbors to verify if a bar is staying open past its legal limit.

### Business & Professional Permits
*   **Purpose:** General business licenses or specialized permits for things like amplified sound or sidewalk seating.

## Regional Variations

*   **United States:** State ABC (Alcoholic Beverage Control) boards issue specific cards that must be posted. Many cities also require a "Public Assembly" permit showing occupancy.
*   **United Kingdom:** **Premises Licence** summaries must be displayed, showing permitted hours and conditions, along with the details of the Personal Licence holder.
*   **France:** Alcohol licenses are categorized (I-IV) and must be displayed along with price lists (*Affichage des prix*).
*   **Germany:** *Gaststättenkonzession* (operating license) and *Öffnungszeiten* (opening hours) where regulated.

## Implementation for Issuers

**ABC Boards / Municipalities:**
1.  **Issue:** Provide the licensee with a high-resolution card containing a `verify:` line.
2.  **Hash:** Bind the license number, entity name, and authorized hours to the hash.
3.  **Real-Time Status:** If a license is suspended for a violation, the verification response instantly reflects "SUSPENDED".

**Public & Enforcement:**
1.  **Scan:** Check the window card from the sidewalk.
2.  **Verify:** "The sign says open until 4 AM, but the verified registry says 2 AM."
