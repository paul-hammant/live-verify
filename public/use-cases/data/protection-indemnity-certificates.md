---
title: "Protection & Indemnity (P&I) Club Certificates"
category: "Specialty Insurance"
volume: "Very Small"
retention: "Policy term + 10-20 years (maritime claims lifecycle)"
slug: "protection-indemnity-certificates"
tags: ["maritime-insurance", "p-and-i-club", "vessel-insurance", "oil-pollution", "shipping-liability", "port-state-control", "imo-compliance", "marine-fraud"]
furtherDerivations: 1
---

## What is a P&I Certificate of Entry?

In the global shipping industry, **Protection & Indemnity (P&I)** is a specialized form of mutual insurance. A **Certificate of Entry** is the proof that a vessel (e.g., a container ship or oil tanker) is a member of a "Club" and is insured for high-stakes liabilities: **Oil Spills**, **Crew Injury**, **Cargo Damage**, and **Wreck Removal**. These certificates are mandatory for a ship to enter any major port.

These documents are the "Entry Ticket" to global trade. Fraud is high-stakes: owners of "Substandard Ships" (which legitimate clubs won't insure) often create fake certificates from non-existent or "Shadow" P&I clubs to trick port authorities. If such a ship has an oil spill, there is no money for cleanup, leaving the host nation with billions in damage. Verified hashes bind the **Vessel IMO Number, Gross Tonnage, and Club Name** to the International Group of P&I Clubs' or the individual club's domain (e.g., `ukpandi.com` or `gard.no`).

<div style="max-width: 650px; margin: 24px auto; font-family: 'Times New Roman', Times, serif; border: 2px solid #002d62; background: #fff; padding: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="background: #002d62; color: #fff; padding: 30px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #000;">
    <div>
      <div style="font-weight: bold; font-size: 1.5em; letter-spacing: 1px;">THE UK P&I CLUB</div>
      <div style="font-size: 0.8em; opacity: 0.9; text-transform: uppercase;">Member of the International Group of P&I Clubs</div>
    </div>
    <div style="font-size: 2em;">⚓</div>
  </div>

  <div style="padding: 25px;">
    <h2 style="text-align: center; color: #002d62; font-size: 1.4em; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">Certificate of Entry</h2>

    <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; font-size: 0.9em; line-height: 1.5; border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 20px;">
      <div>
        <strong>Vessel Name:</strong> <span data-bracket="start" data-for="pi">]</span>MV OCEAN TRADER<br>
        <strong>IMO Number:</strong> 9922887<br>
        <strong>Gross Tonnage:</strong> 42,500 GT
      </div>
      <div style="text-align: right;">
        <strong>Certificate #:</strong> UK-2026-8844<br>
        <strong>Policy Year:</strong> 2026/27<br>
        <strong>Flag:</strong> Panama
      </div>
    </div>

    <div style="background: #f0f4f8; border: 1px solid #002d62; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
      <h4 style="margin-top: 0; color: #002d62; font-size: 0.9em; border-bottom: 1px solid #ccc; padding-bottom: 5px;">VERIFIED COVERAGE LIMITS</h4>
      <table style="width: 100%; font-size: 0.85em;">
        <tr>
          <td><strong>Oil Pollution (CLC):</strong></td>
          <td style="text-align: right; font-weight: bold;">$ 1,000,000,000.00</td>
        </tr>
        <tr>
          <td><strong>Crew & Passenger Liability:</strong></td>
          <td style="text-align: right; font-weight: bold;">AS PER RULES</td>
        </tr>
        <tr>
          <td><strong>Wreck Removal:</strong></td>
          <td style="text-align: right; font-weight: bold;">FULL COVER</td>
        </tr>
      </table>
    </div>

    <div style="font-size: 0.75em; color: #666; font-style: italic; text-align: center;">
      This certificate is evidence only of the contract of insurance. Subject to the Rules of the Association. Blue Cards for CLC and Bunker Convention are linked to this hash.
    </div>
  </div>

  <div style="padding: 20px; background: #fdfdfd; border-top: 1px dashed #bbb; text-align: center;">
    <div data-verify-line="pi" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #002d62; font-weight: bold;"
      title="Demo only: P&I Clubs don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:ukpandi.com/v/IMO9922887 <span data-bracket="end" data-for="pi">]</span>
    </div>
    <div style="font-size: 0.7em; color: #999; margin-top: 10px;">
      Scan to verify Blue Card status, war risk endorsements, and club membership validity.
    </div>
  </div>
</div>

## Data Verified

IMO number, vessel name, gross tonnage, call sign, member (owner) name, certificate number, policy year, coverage limits (Oil, Bunkers, Wreck), "Blue Card" status (CLC/Bunker conventions), P&I club name, date of entry.

**Document Types:**
- **Certificate of Entry:** The primary proof of P&I membership.
- **Blue Card:** Specific certificate required for oil pollution liability.
- **Letter of Undertaking (LOU):** (Linked hash) a guarantee to prevent ship arrest.
- **War Risk Addendum:** Proving coverage for conflict zones.

## Data Visible After Verification

Shows the issuer domain (`ukpandi.com`, `gard.no`, `skuld.com`) and the vessel standing.

**Status Indications:**
- **Active Member** — Vessel is currently insured and premium is paid.
- **Terminated** — **CRITICAL:** Coverage has ended (e.g., due to vessel sale or safety breach).
- **Blue Card Suspended** — **ALERT:** The pollution-specific guarantee is no longer valid.
- **Under Sanctions** — **CRITICAL:** The vessel or owner has been flagged for international sanctions.

## Second-Party Use

The **Shipowner / Manager** benefits from verification.

**Port Entry Clearance:** Upon arrival at a port (e.g., Singapore or Rotterdam), the Master provides the verified hash of the P&I certificate. Port State Control (PSC) can instantly see **"ACTIVE - GARD"** on their tablet, bypassing the need for manual email verification and allowing the ship to dock immediately.

**Chartering Credibility:** Before a major oil company (e.g., Shell or Exxon) hires a tanker, they scan the P&I hash. Verification ensures the ship has the $1 billion pollution coverage required by their "Vetting Department."

## Third-Party Use

**Port State Control (PSC) Inspectors**
**Substandard Ship Detection:** Thousands of ships use fake "non-IG" club certificates to hide poor maintenance. OCR-to-hash connects the inspector directly to the legitimate P&I club's domain, allowing them to instantly identify and "Arrest" ships with fraudulent insurance.

**Maritime Lawyers (Admiralty)**
**Arrest Prevention:** If a ship is involved in a collision, the P&I club issues a verified "Letter of Undertaking" (LOU). The victim's lawyer scans the hash to ensure the LOU is an authentic commitment from a solvent club, preventing the need to physically seize (arrest) the ship.

**Coastal Guard / Environmental Agencies**
**Spill Response Audit:** Instantly verifying the insurance limits of a grounded vessel to determine the available budget for emergency salvage and cleanup operations.

## Verification Architecture

**The "Shadow Club" Fraud Problem**

- **Logo Mimicry:** Creating a fake certificate using the name of a famous club but with a fraudulent contact address.
- **Limit Inflation:** Changing a $10M "non-IG" limit to a $1B "International Group" limit on a PDF.
- **Sanction Hiding:** Editing a certificate to hide the true "Beneficial Owner" of a vessel from a sanctioned nation.

**Issuer Types**

**International Group (IG) P&I Clubs.**
**Fixed-Premium Marine Insurers.**
**National Maritime Authorities.**

**Privacy Salt:** Low to Medium. While vessel names are public, the specific "Claims History" and member premium rates are sensitive. The hash should be salted to protect commercial confidentiality.

## Rationale

P&I insurance is the "Global Shield" of the oceans. By turning certificates into verifiable digital bridges, we protect the world's coastlines from the catastrophic cost of un-insured oil spills and ensure that "Safety at Sea" is backed by cryptographic proof.