---
title: "Electrical Permits and Certificates"
category: "Construction & Property Permits"
volume: "Medium"
retention: "Permanent (building records)"
slug: "electrical-permits"
tags: ["construction", "electrical-permit", "fire-safety", "licensed-electrician", "city-inspection", "nec-compliance"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 3px solid #ffeb3b; background: #fffde7; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #ffeb3b; color: #000; padding: 15px; text-align: center;">
    <h2 style="margin: 0; text-transform: uppercase;">CITY OF PHOENIX</h2>
    <div style="font-size: 0.9em; font-weight: bold;">PLANNING & DEVELOPMENT DEPT</div>
  </div>

  <div style="padding: 25px;">
    <div style="text-align: center; border-bottom: 2px solid #ffeb3b; padding-bottom: 10px; margin-bottom: 20px;">
      <h3 style="margin: 0; color: #333;">ELECTRICAL PERMIT</h3>
      <div style="font-size: 1.2em; font-weight: bold; margin-top: 5px;">Permit #: ELE-2026-99228</div>
    </div>

    <div style="font-size: 0.95em; line-height: 1.5; color: #333;">
      <p><strong>Job Address:</strong> <span data-bracket="start" data-for="electric">]</span>123 Desert Lane, Phoenix, AZ 85001<br>
      <strong>Owner:</strong> Mike Miller</p>

      <p><strong>Work Scope:</strong> Main Panel Upgrade (200 Amp), New Circuit for EV Charger, Solar Inverter Tie-in.</p>

      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr>
          <td style="border: 1px solid #fdd835; padding: 8px;"><strong>Electrician:</strong></td>
          <td style="border: 1px solid #fdd835; padding: 8px;">Sparky's Power, LLC (Lic #9982)</td>
        </tr>
        <tr>
          <td style="border: 1px solid #fdd835; padding: 8px;"><strong>Status:</strong></td>
          <td style="border: 1px solid #fdd835; padding: 8px; font-weight: bold; color: #2e7d32;">ROUGH-IN PASSED</td>
        </tr>
        <tr>
          <td style="border: 1px solid #fdd835; padding: 8px;"><strong>Issued:</strong></td>
          <td style="border: 1px solid #fdd835; padding: 8px;">March 15, 2026</td>
        </tr>
      </table>

      <p style="font-size: 0.8em; font-style: italic; color: #555;">
        MUST BE CONSPICUOUSLY POSTED NEAR THE SERVICE ENTRANCE.
      </p>
    </div>

    <div data-verify-line="electric" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: City of Phoenix doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:phoenix.gov/permits/v/ELE99228 <span data-bracket="end" data-for="electric">]</span>
    </div>
  </div>
</div>

## Data Verified

Job address, permit number, contractor name/license, specific work scope (e.g., "Main Panel Upgrade"), amperage rating, solar/EV inclusion, inspection status (Rough/Final), date of issuance, city inspector ID.

**Document Types:**
- **Electrical Permit Card:** Posted at the main panel.
- **Certificate of Final Inspection:** Proving the work is safe and code-compliant.
- **Solar Installation Clearance:** Required for utility grid tie-in.

## Data Visible After Verification

Shows the issuer domain (`phoenix.gov`, `ladbs.org`) and current safety status.

**Status Indications:**
- **Active** — Work authorized; permit current.
- **Rough-In Passed** — Wiring verified safe before walls are closed.
- **Final Passed** — Project complete and safe for energized use.
- **Expired** — Permit lapsed; work must stop.
- **Red Tagged** — **ALERT:** Unsafe wiring found; power may be disconnected.

## Second-Party Use

The **Homeowner** or **Business Owner** benefits from verification.

**Fire Safety Assurance:** Proving to themselves (and their family) that the electrician they hired actually pulled a permit and that the city inspector has verified the work as non-combustible. Scanning the hash on the panel gives the owner direct confirmation from the city.

**Home Sale:** Providing verified proof of electrical permits to a buyer during a home inspection, proving that the "DIY Solar" or "Basement Remodel" was legally done and inspected.

## Third-Party Use

**Electrical Inspectors**
**Field Integrity:** An inspector arriving for a "Final" can scan the card to see the verified "Rough-In Pass" from their colleague. This prevents "Paper Forgery" where a contractor fakes a rough-in signature to hide unsafe wiring behind drywall.

**Fire Investigators**
**Post-Fire Forensic:** If an electrical fire occurs, investigators scan the panel permit. Verification proves if the circuit that started the fire was ever officially permitted or if it was an illegal, unverified addition.

**Utility Companies (APS / SRP)**
**Service Connection:** Verifying the "Final Pass" before "Turning on the juice" for a new solar array or main panel upgrade.

## Verification Architecture

**The "Bootleg Wiring" Fraud Problem**

- **Signature Forgery:** Contractors using a fake rubber stamp to "sign off" on their own inspections on the paper permit card.
- **Scope Creep:** Pulling a permit for "1 New Outlet" but using the paper to hide a full, uninspected kitchen rewire.
- **Expired Licenses:** Shady electricians using a valid contractor's license number on a fake permit PDF.

**Issuer Types**

**Municipal Building Departments.**
**State Electrical Boards.**
**Electrical Cooperatives / Utilities.**

## Competition vs. Permit Search Portals

| Feature | OCR-to-Hash | City Online Portal | Scanned PDF Permit |
| :--- | :--- | :--- | :--- |
| **Field Access** | **Instant.** Scan the card on the wall. | **Difficult.** Requires navigating complex municipal UIs on a phone. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the City. | **Database.** High trust but manual. | **Zero.** Easily forged. |
| **Integrity** | **Binds Work Scope.** Protects the details. | **General.** Often just says "Active" without the amperage/scope. | **Vulnerable.** |
| **Hardware** | **Universal.** Any phone camera. | **Technical.** Requires laptop/stable 5G. | **Visual.** |

**Why OCR wins here:** The "Panel Door" reality. Electrical permits live on the inside of cabinet doors in dark garages. OCR-to-hash turns that **Static Piece of Paper** into a live safety dashboard, allowing homeowners and inspectors to verify electrical integrity at the exact point of risk.
