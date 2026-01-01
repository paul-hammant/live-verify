---
title: "Health Inspection Grades and Scores"
category: "Food & Beverage Permits"
volume: "Very Large"
retention: "3 years (inspection history)"
slug: "health-inspection-grades"
tags: ["food-safety", "health-grade", "nyc-health-grade", "restaurant-inspection", "public-health", "sanitation-rating", "consumer-trust"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1); overflow: hidden;">
  <div style="background: #002d62; color: #fff; padding: 15px; text-align: center;">
    <h2 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">NYC HEALTH DEPARTMENT</h2>
    <div style="font-size: 0.85em; opacity: 0.9;">Bureau of Food Safety and Community Sanitation</div>
  </div>

  <div style="padding: 40px; text-align: center;">
    <div style="margin-bottom: 25px;">
      <div style="font-size: 8em; font-weight: bold; line-height: 1; color: #002d62;">A</div>
      <div style="font-size: 1.2em; font-weight: bold; color: #002d62; margin-top: -10px;">SANITARY GRADE</div>
    </div>

    <div style="font-size: 1.1em; line-height: 1.6; color: #333; margin-bottom: 20px;">
      <strong>Establishment:</strong> <span data-bracket="start" data-for="health-grade">]</span>Joe's Pizza Palace, LLC<br>
      <strong>Address:</strong> 123 Bleecker St, New York, NY
    </div>

    <div style="display: flex; justify-content: space-around; font-size: 0.9em; color: #555; background: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
      <div>
        <strong>Points:</strong> 8
      </div>
      <div>
        <strong>Inspection Date:</strong> Mar 15, 2026
      </div>
      <div>
        <strong>CAMIS #:</strong> 99228877
      </div>
    </div>

    <div style="font-size: 0.8em; color: #777; font-style: italic;">
      This grade must be displayed in the front window. Verification confirms the score matches the NYC Open Data registry.
    </div>

    <div data-verify-line="health-grade" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: NYC DOHMH doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:nyc.gov/health/v/99228877 <span data-bracket="end" data-for="health-grade">]</span>
    </div>
  </div>
</div>

## Data Verified

Restaurant legal name, CAMIS ID number, premises address, inspection date, total violation points, assigned grade (A/B/C), inspection type (Initial/Re-inspection), inspector ID, date of grade issuance.

**Document Types:**
- **Sanitary Grade Card:** The blue "A" card in the window.
- **Grade Pending Notice:** Used during the adjudication period.
- **Full Inspection Report:** Detailing specific violations (linked hash).
- **Closed Notice:** (Linked hash) proving the city shut the facility down.

## Data Visible After Verification

Shows the issuer domain (`nyc.gov`, `lacounty.gov`) and current inspection standing.

**Status Indications:**
- **Active Grade** — Grade is verified and matches the latest inspection.
- **Grade Pending** — **ALERT:** Re-inspection occurred; new grade under review.
- **Closed** — **ALERT:** Facility was shut down by the health department.
- **Outdated** — Inspection is > 12 months old; re-visit required.

## Second-Party Use

The **Restaurant Owner** benefits from verification.

**Customer Trust:** Proving to diners that the "A" in the window is verified by the city. This stops the "Grade Fraud" where a restaurant whose grade dropped to a "C" yesterday keeps an old "A" card in the window to avoid losing business.

**Landlord Compliance:** Proving to a commercial landlord that the tenant is maintaining the "Verified High Standards" required by the lease agreement.

**Financing:** Providing verified inspection history to a lender or investor during a business sale or expansion.

## Third-Party Use

**Consumers (Diners)**
**Public Safety:** Before walking into a restaurant, a diner scans the grade card. "Verified by NYC.gov" ensure the grade isn't a "Photoshopped" fabrication and allows the diner to see the *exact* violation points (e.g., "Rats" vs "No Hairnets").

**Food Delivery Platforms (Uber Eats / DoorDash)**
**Merchant Vetting:** Platforms can automatically verify the health grades of all their restaurant partners. A verified "C" or "Closed" status triggers an immediate delisting from the app, protecting consumers.

**Health Inspectors (Field)**
**Enforcement:** An inspector walking the street can scan window cards. If a restaurant is displaying a fake "A" when the database says "Grade Pending," the inspector issues an immediate fraud citation.

## Verification Architecture

**The "Window Grading" Fraud Problem**

- **Grade Falsification:** A restaurant that received a "C" (High violation) printing their own fake "A" card to trick the public.
- **Status Concealment:** Keeping a "Grade Pending" card up for 6 months to hide a failing score while fighting it in court.
- **Address Swapping:** Taking an "A" card from a clean flagship location and displaying a copy at a dirty satellite location.

**Issuer Types**

**Municipal Health Departments:** (NYC DOHMH, LA County DPH).
**State Health Departments.**
**Third-Party Safety Raters:** (e.g., Steritech - for private audits).

**Privacy Salt:** Critical. Restaurant scores are public, but the hash must be salted to prevent "Mass Scraping" of inspector IDs or specific non-public violation notes.

## Competition vs. Open Data Portals (NYC OpenData)

| Feature | OCR-to-Hash | NYC OpenData Search | Scanned PDF Report |
| :--- | :--- | :--- | :--- |
| **Field Access** | **Instant.** Scan the card in the window. | **Difficult.** Requires typing the name/address and navigating maps. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the City. | **Database.** High trust but manual. | **Zero.** Easily forged. |
| **Freshness** | **Real-time.** Shows if closed *today*. | **Laggy.** Datasets often refresh every 24-48 hours. | **Static.** |
| **Integrity** | **Binds Identity.** Links Card to CAMIS #. | **Data-Only.** | **Vulnerable.** |

**Why OCR wins here:** The "Hungry Moment." Diners make decisions in 10 seconds while standing on the sidewalk. They aren't going to type "123 Bleecker Street" into a government portal. OCR-to-hash turns the **Physical Grade Card** into a live, high-speed safety link, making public health data accessible at the exact moment it's needed most.
