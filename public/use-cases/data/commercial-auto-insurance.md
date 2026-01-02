---
title: "Commercial Auto Insurance Policies"
category: "Commercial Lines Insurance"
volume: "Medium"
retention: "Policy term + 7 years"
slug: "commercial-auto-insurance"
tags: ["commercial-auto", "fleet-insurance", "logistics", "dot-compliance", "trucking", "hired-non-owned"]
---

## What is Fleet Insurance?

When a company owns 100 trucks or vans, they don't buy 100 individual car insurance policies. They buy a **Commercial Auto Fleet Policy**.

Every driver carries a **Proof of Insurance** card. Unlike personal insurance, these cards must list the company's **DOT Number** and often include a federal **MCS-90** filing which guarantees the public is protected if a heavy truck causes an accident.

Fraud is common: fleet owners often "delete" expensive-to-insure trucks from their policy to save money, but keep the old paper cards in the glovebox to fool DOT inspectors. OCR-to-hash allows an inspector to verify that **this specific VIN** is still covered today.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #004d40; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #004d40; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;">PROGRESSIVE COMMERCIAL</div>
      <div style="font-size: 0.8em;">Fleet & Logistics Division</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Policy #: CA-992288-26</div>
    </div>
  </div>

  <div style="padding: 25px;">
    <h2 style="text-align: center; color: #004d40; font-size: 1.4em; margin-bottom: 20px; text-transform: uppercase;">Proof of Commercial Insurance</h2>

    <div style="font-size: 0.9em; line-height: 1.6; color: #333;">
      <p><strong>Insured:</strong> <span data-bracket="start" data-for="com-auto">]</span>Lightning Logistics, LLC<br>
      <strong>DOT Number:</strong> 1234567</p>

      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr style="background: #e8f5e9; border-bottom: 2px solid #004d40;">
          <th style="text-align: left; padding: 8px;">Vehicle / VIN</th>
          <th style="text-align: right; padding: 8px;">Liability Limit</th>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">2024 Freightliner Cascadia<br><small>VIN: 1FUJA...5544</small></td>
          <td style="text-align: right; padding: 8px; border-bottom: 1px solid #eee;">$ 1,000,000 CSL</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">2025 Ford F-550 Box Truck<br><small>VIN: 1FDRF...9922</small></td>
          <td style="text-align: right; padding: 8px; border-bottom: 1px solid #eee;">$ 1,000,000 CSL</td>
        </tr>
      </table>

      <p><strong>Coverage Includes:</strong> MCS-90 Endorsement, Hired & Non-Owned Auto.</p>
      <p><strong>Policy Period:</strong> Jan 01, 2026 to Jan 01, 2027</p>
    </div>

    <div data-verify-line="com-auto" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Progressive Commercial doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:progressive.com/commercial/v/CA992288 <span data-bracket="end" data-for="com-auto">]</span>
    </div>
  </div>
</div>

## Data Verified

Business name, DOT number, specific vehicle VINs, combined single limit (CSL), cargo liability, effective/expiration dates, MCS-90 status, hired/non-owned auto inclusion.

**Document Types:**
- **Commercial ID Card:** For the glovebox of every fleet vehicle.
- **Form MCS-90:** Federal filing for public liability (trucking).
- **Scheduled Auto List:** Detailing every covered VIN.
- **Hired/Non-Owned Certificate:** For businesses using employees' personal cars.

## Data Visible After Verification

Shows the issuer domain (`progressive.com`, `travelers.com`) and fleet status.

**Status Indications:**
- **In Force** — Fleet is fully covered.
- **Vehicle Excluded** — **ALERT:** This specific VIN was removed from the policy.
- **Cancelled** — Policy terminated (e.g., for safety score or non-payment).
- **Expired** — Term ended.

## Second-Party Use

The **Fleet Owner** benefits from verification.

**DOT Inspections:** Proving to a roadside inspector that the MCS-90 filing is active and the vehicle is verified insured. This prevents "Out-of-Service" orders due to paperwork confusion.

**Broker Onboarding:** Speeding up the process of joining a logistics network (e.g., C.H. Robinson) by providing a "Verified Fleet Token" that automatically validates all VINs.

## Third-Party Use

**Roadside DOT Inspectors**
**Enforcement:** Instantly confirming that a heavy truck hasn't been "dropped" from the policy. Fleet owners often keep 100 trucks on the road while only paying for 50. OCR-to-hash verification of the VIN-specific card stops this "Ghost Fleet" fraud.

**Logistics Brokers**
**Risk Management:** Verifying the cargo and liability insurance of a carrier before dispatching a $500,000 load.

**Shipping Hubs / Warehouses**
**Gate Access:** Ensuring that any truck entering the facility has verified liability coverage, protecting the facility owner from accidents on their property.

## Verification Architecture

**The "Ghost Fleet" Fraud Problem**

- **Selective Deletion:** Removing high-risk drivers or aging trucks from the policy to save money, but keeping the old "Policy Summary" paper to show at checkpoints.
- **VIN Tampering:** Editing a "Clean" VIN onto a card for an uninsured, damaged vehicle.
- **MCS-90 Forgery:** Fabricating the federal filing needed for interstate commerce.

**Issuer Types**

**Commercial Carriers:** (Progressive, Travelers, Zurich).
**State DOTs:** (As the oversight body).
**Fleet Platforms:** (Samsara, Motive - integrating insurance verification into the ELD).

## Competition vs. FMCSA SAFER Database

| Feature | OCR-to-Hash | FMCSA SAFER (Public) | Paper Fleet List |
| :--- | :--- | :--- | :--- |
| **VIN Detail** | **High.** Verifies *this specific truck*. | **Low.** Often only shows "Policy Active" for the whole company. | **High.** But untrusted. |
| **Freshness** | **Real-time.** Queries the insurer's live fleet file. | **Laggy.** Federal records can lag by weeks. | **Static.** |
| **Accessibility** | **Open.** Any warehouse or broker can verify. | **Public.** But limited data. | **Manual.** |

**Why OCR wins here:** The "VIN Specificity" problem. Government databases like SAFER prove a company *has* insurance, but they rarely list the 500 individual VINs. OCR-to-hash allows a verifier to prove that **this specific VIN** is covered *today*, closing the gap between corporate-level filings and vehicle-level reality.
