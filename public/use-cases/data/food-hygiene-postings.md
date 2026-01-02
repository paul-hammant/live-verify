---
title: "Food Hygiene Postings"
category: "Food hygiene"
type: "use-case"
slug: "food-hygiene-postings"
beneficiary: "Customers"
tags: ["food-safety", "hygiene", "ratings", "restaurants", "public-health", "customers", "health-grades", "food-handler", "food-truck"]
---

# Food Hygiene Postings

**Category:** Food hygiene
**Beneficiary:** Customers
**Examples:** Ratings (0-5), health inspection grades (A/B/C), allergen info, food handler certificates, food truck permits.

Food hygiene postings are official certificates and placards that prove an establishment meets sanitary standards. These are issued by health departments following site inspections of kitchens, staff practices, and equipment.

**Where Posted:** conpicuous locations visible to customers. Typically in **front windows**, near the **entrance**, or at the **point of sale** (register). For staff-specific credentials like Food Handler Cards, these are often kept in a **manager's binder** or displayed in the **kitchen area**.

## Verification Value

**Problem:**
- **Grade Inflation:** Restaurants displaying a fake "A" or "5-star" sticker to hide a recent poor inspection result (e.g., a "C" or "1-star").
- **Ghost Grades:** Keeping old stickers from years ago because recent inspections were unfavorable.
- **Credential Fraud:** Kitchen staff using fake or "Photoshopped" Food Handler Cards to avoid taking mandatory safety exams.
- **Permit Cloning:** One food truck's valid permit being photocopied and used across an entire fleet of 5 trucks to avoid fees and inspections.

**Solution:**
Customers and inspectors can scan the placard or certificate to verify the current rating and status against official health department or certification registries. This ensures the hygiene data is accurate, real-time, and bound to the specific establishment or individual.

## Key Examples

### Health Inspection Grades (A/B/C) & Ratings (0-5)
*   **Purpose:** Simplify complex food safety audits into an easy-to-read grade for diners.
*   **Verification:** Confirms the grade matches the *most recent* inspection and isn't a fake placard designed to hide violations like vermin or improper refrigeration.

### Food Service Establishment Licenses
*   **Purpose:** The primary operating permit for restaurants, cafes, and catering facilities.
*   **Verification:** Confirms the license is active, matches the address, and that the seating capacity is within legal fire-safety limits.

### Food Handler & Manager Certificates
*   **Purpose:** Vocational credentials proving staff are trained in safe food handling and cross-contamination prevention.
*   **Verification:** Allows managers and inspectors to verify exam scores and certificate validity directly from the national registry (e.g., ServSafe).

### Food Truck & Mobile Vendor Permits
*   **Purpose:** Specialized health permits for mobile kitchens, requiring a verified "Commissary" for cleaning and propane safety checks.
*   **Verification:** Binds the permit to the specific vehicle VIN/Plate, stopping vendors from "borrowing" permits from other trucks.

## Global Variations

*   **United States:** Uses various systems (A/B/C grades in NYC/LA, numeric scores in others). Display is usually mandatory in the front window.
*   **United Kingdom:** Uses the 0-5 Star rating scheme. Display is legally mandatory in **Wales** and **Northern Ireland** (voluntary but common in England).
*   **France (Alim'confiance):** Ratings range from *Très satisfaisant* to *À corriger d'urgence*, covering restaurants, butchers, and supermarket counters.
*   **Germany:** Often requires health department inspection results to be available; some states use "Smiley" systems or color-coded barometers.

## Implementation for Issuers

**Health Departments & Credentialing Bodies:**
1.  **Generate:** Create the grade card or certificate with a `verify:` line.
2.  **Hash:** Bind the establishment ID, grade, and inspection date to the hash.
3.  **Real-Time Status:** If a facility is shut down for a violation, the verification response instantly reflects **CLOSED**, **SUSPENDED**, or **CONDEMNED**.

**Customers & Inspectors:**
1.  **Scan:** Point a smartphone at the window sticker or the staff's badge.
2.  **Verify:** "The sticker says A, but the health department database shows this facility was closed yesterday for a major violation."