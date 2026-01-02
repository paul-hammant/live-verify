---
title: "Repeat Events Permits"
category: "Event & Temporary Use Permits"
type: "use-case"
slug: "repeat-events-permits"
beneficiary: "Customers/Public"
tags: ["repeat-events", "recurring", "farmers-market", "street-vending", "parklet", "sidewalk-dining", "vendor", "commercial"]
---

# Repeat Events Permits

**Category:** Repeat Events Permits
**Beneficiary:** Customers/public
**Examples:** Farmers market vendor permits, street vending authorizations, recurring sidewalk dining (parklets), merchandise displays.

Repeat events permits authorize recurring commercial activities that occur on a regular schedule (e.g., every weekend) or for a multi-month season. These permits bridge the gap between permanent brick-and-mortar licenses and one-off event permits.

**Where Posted:** Typically on the **stall or booth structure**, in a **front window** (for parklets), or worn as a **lanyard ID** by the vendor.

## Verification Value

**Problem:**
- **Product Reselling Fraud:** Vendors at farmers markets buying wholesale warehouse produce and selling it as "Local Organic" for a markup.
- **Unauthorized Squatting:** Street vendors operating in "No-Vending" zones or without paying required seasonal fees.
- **Safety Hazards:** Illegal parklets or sidewalk displays that block ADA access or lack mandatory concrete barriers to protect diners from traffic.
- **Permit Cloning:** One valid seasonal permit being photocopied and shared across a fleet of trucks or stalls.

**Solution:**
Shoppers, neighbors, and market managers can scan the permit to verify the **authorized products**, **approved location**, and **seasonal validity**. This ensures the vendor is a "Certified Producer" and is adhering to safety and zoning standards.

## Key Examples

### Farmers Market Vendor Permits
*   **Purpose:** Prove the farmer actually grew the food being sold (Certified Producer status).
*   **Verification:** Confirms the specific "Authorized Products" list, preventing wholesale reselling and protecting real local farmers.

### Street Vending & Sidewalk Merchandise
*   **Purpose:** Authorize the sale of goods or food on public sidewalks.
*   **Verification:** Ensures the vendor has passed mandatory health inspections and is operating within their assigned "Zone" or "District."

### Seasonal Outdoor Dining & Parklets
*   **Purpose:** Authorization for semi-permanent wooden platforms or sidewalk tables.
*   **Verification:** Crucial for verifying safety scope (barriers, ADA ramps) and ensuring the restaurant is paying for the public parking space used.

## Country-Specific Variations

*   **United States:** Market associations (e.g., GrowNYC) and City Public Works departments are the primary issuers. Many cities use color-coded seasonal cards for booths.
*   **Germany:** Weekly markets (*Wochenmarkt*) have strict regulations on local sourcing and display of certificates.
*   **United Kingdom:** Requires specific "Street Trading" licenses which must be displayed.

## Implementation for Issuers

**Market Associations & Planning Depts:**
1.  **Issue:** Provide the vendor with a durable seasonal card containing a `verify:` line.
2.  **Hash:** Bind the vendor's farm location, authorized product list, and site assignment to the hash.
3.  **Audit:** Market managers can use OCR-to-hash to verify every stall in minutes during setup.

**Customers & Residents:**
1.  **Scan:** Point a smartphone at the stall card while shopping.
2.  **Verify:** "This stall claims these are 'Local Peppers', but the verified permit says they are only authorized to sell 'Root Vegetables'."
