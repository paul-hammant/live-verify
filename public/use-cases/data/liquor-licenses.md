---
title: "Liquor Licenses"
category: "Food & Beverage Permits"
volume: "Medium-Small"
retention: "License term (1-3 years)"
slug: "liquor-licenses"
tags: ["liquor-license", "abc-board", "alcohol-vending", "restaurant-compliance", "bar-permit", "public-safety", "tied-house-laws"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 3px solid #333; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
  <div style="background: #1a1a1a; color: #fff; padding: 15px; text-align: center; display: flex; align-items: center; justify-content: center;">
    <div style="width: 40px; height: 40px; background: #fff; color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px;">ABC</div>
    <div>
      <h2 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">ALCOHOLIC BEVERAGE CONTROL</h2>
      <div style="font-size: 0.8em; opacity: 0.8;">OFFICIAL ON-SALE GENERAL LICENSE</div>
    </div>
  </div>

  <div style="padding: 25px;">
    <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
      <h3 style="margin: 0; color: #333;">LICENSE NUMBER: <span data-bracket="start" data-for="liquor">]</span>47-992288</h3>
    </div>

    <div style="font-size: 0.95em; line-height: 1.6; color: #333;">
      <p><strong>Licensee:</strong> The Tipsy Tavern, LLC<br>
      <strong>Premises:</strong> 123 Bleecker Street, New York, NY 10012</p>

      <div style="background: #f9f9f9; border: 1px solid #ddd; padding: 10px; margin: 15px 0; border-radius: 4px;">
        <p><strong>License Class:</strong> Type 47 (Restaurant / Bar)<br>
        <strong>Authorized Hours:</strong> 08:00 AM to 02:00 AM Daily</p>
        <p><strong>Capacity:</strong> 125 Persons (Seated)</p>
      </div>

      <p><strong>Issue Date:</strong> January 15, 2026<br>
      <strong>Expiration Date:</strong> January 14, 2027</p>
    </div>

    <div style="margin-top: 25px; border: 1px solid #ccc; padding: 10px; font-size: 0.8em; color: #555; background: #fafafa; font-style: italic; text-align: center;">
      This license must be displayed in a conspicuous location visible to the public. Verification confirms the license matches the state's active registry.
    </div>

    <div data-verify-line="liquor" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: ABC Board doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:abc.ny.gov/v/47-992288 <span data-bracket="end" data-for="liquor">]</span>
    </div>
  </div>
</div>

## Data Verified

Licensee name (individual/entity), premises address, license number, license type (Type 47, 48, etc.), authorized hours of operation, seating/occupancy capacity, expiration date, disciplinary flag status, issuing state/local agency.

**Document Types:**
- **On-Premises License:** For restaurants and bars.
- **Off-Premises License:** For liquor stores and groceries.
- **Catering Authorization:** For off-site alcohol service.
- **Temporary Event Permit:** (Linked hash) for 1-day festivals.

## Data Visible After Verification

Shows the issuer domain (`abc.ny.gov`, `abc.ca.gov`) and current status.

**Status Indications:**
- **Active** — License is valid and in good standing.
- **Suspended** — **ALERT:** Operation prohibited due to safety or legal violation.
- **Revoked** — Permanently barred from alcohol sales.
- **Pending Renewal** — Expired but renewal in process.

## Second-Party Use

The **Establishment Owner (Licensee)** benefits from verification.

**Lease Negotiations:** Proving to a potential landlord that they hold a "Verified Active Type 47" license. In some markets, a liquor license is worth $500,000+; a verified hash prevents the landlord from fearing a "Fake License" scam during a business sale.

**Wholesale Purchasing:** Proving verified status to alcohol distributors (e.g., Southern Glazer's) to authorize large inventory orders. Distributors are legally barred from selling to unlicensed vendors.

## Third-Party Use

**Alcohol Distributors**
**Compliance Vetting:** Automatically verifying the licenses of 1,000+ retail customers. OCR-to-hash allows the distributor to stop delivery *instantly* if a retailer's license is suspended by the state, protecting the distributor's own multi-billion dollar license.

**Law Enforcement (NYPD / LAPD)**
**Field Adjudication:** During an 11 PM compliance check, an officer scans the window license. "Verified by ABC" ensure the bar isn't using a "Homemade License" or an old "Catering Permit" to run a full-service nightclub.

**Business Buyers (M&A)**
**Valuation Vetting:** Verifying the "Good Standing" and "Capacity" of a license before buying a restaurant.

## Verification Architecture

**The "Speakeasy" Fraud Problem**

- **Ghost Licenses:** Creating a fake ABC card for a non-existent or un-vetted basement bar.
- **Hours Tampering:** Editing a "12:00 AM" closing time to "04:00 AM" on the paper license to trick the local police.
- **License Renting:** An unlicensed person using a retired owner's physical license paper. Verification shows the *Entity Name* which won't match the new operator.

**Issuer Types**

**State Alcoholic Beverage Control (ABC) Boards.**
**Municipal Liquor Commissions.**
**State Departments of Revenue.**

## Competition vs. Public Registry Search

| Feature | OCR-to-Hash | ABC Online Search | Scanned PDF / Window Card |
| :--- | :--- | :--- | :--- |
| **Field Access** | **Instant.** Scan the paper in the window. | **Difficult.** Requires typing the License # and navigating old UIs. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the ABC Board. | **Database.** High trust but manual. | **Zero.** Easily forged. |
| **Integrity** | **Binds Hours.** Protects the data. | **General.** Often just says "Active" without the fine-print hours. | **Vulnerable.** |
| **Hardware** | **Universal.** Any smartphone camera. | **Technical.** Requires laptop/dedicated search. | **Visual.** |

**Why OCR wins here:** The "Front Window" reality. Liquor licenses are legally required to be posted in the window. Citizens and officers encounter them in the physical world. OCR-to-hash turns that **Window Display** into a live digital checkpoint, ensuring that "Public Safety" data is as accessible as the front door.
