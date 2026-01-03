---
title: "Ballot Chain-of-Custody Transfer Forms"
category: "Government & Civic Documents"
volume: "Small"
retention: "Election cycle + 2-4 years"
slug: "ballot-chain-of-custody"
tags: ["election", "voting", "ballots", "chain-of-custody", "integrity", "democracy"]
derivations: 1
---

## What is a Ballot Transfer Form?

In an election, ballots are often driven from a local school (polling place) to a central counting facility. During that drive, the ballots are in a "Black Box" of risk.

The **Chain-of-Custody Form** is the paper that follows the box. It lists:
1.  **The Count:** "There are exactly 1,242 ballots in this box."
2.  **The Seal:** "The box is locked with Seal #AZ-009988."
3.  **The Witnesses:** Two people (one from each party) must sign it.

If a box arrives at the counting center with a different count or seal than what is on the verified form, the alarm is raised immediately.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #000; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #eee; padding: 15px; border-bottom: 2px solid #000; display: flex; justify-content: space-between; align-items: center;">
    <div style="font-weight: bold; font-size: 1.1em;">MARICOPA COUNTY ELECTIONS</div>
    <div style="font-size: 0.9em; font-weight: bold;">TRANSFER FORM #99228</div>
  </div>

  <div style="padding: 25px;">
    <h3 style="margin-top: 0; text-align: center; text-transform: uppercase;">Ballot Container Transfer</h3>

    <div style="font-size: 0.95em; line-height: 1.6; color: #333;">
      <p><strong>Origin:</strong> <span data-bracket="start" data-for="ballot">]</span>Precinct 402 - North High School<br>
      <strong>Destination:</strong> Central Tabulation Center</p>

      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr>
          <td style="border: 1px solid #ccc; padding: 8px;"><strong>Container ID:</strong></td>
          <td style="border: 1px solid #ccc; padding: 8px;">BOX-A-123</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 8px;"><strong>Seal Number:</strong></td>
          <td style="border: 1px solid #ccc; padding: 8px;">AZ-00998877</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 8px;"><strong>Ballot Count:</strong></td>
          <td style="border: 1px solid #ccc; padding: 8px;">1,242 Ballots</td>
        </tr>
      </table>

      <div style="margin-top: 20px; padding: 10px; border: 1px solid #000; background: #f9f9f9;">
        <strong>CUSTODIAN HANDOFF:</strong><br>
        Relinquished by: John Miller (Poll Worker)<br>
        Received by: Sarah Connor (Transport Deputy)<br>
        Timestamp: Nov 3, 2026 - 8:15 PM MST
      </div>
    </div>

    <div data-verify-line="ballot" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Elections dept doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:elections.maricopa.gov/custody/v/99228 <span data-bracket="end" data-for="ballot">]</span>
    </div>
  </div>
</div>

## Data Verified

Precinct number, Container ID, Seal Number (unique plastic/wire seal), ballot count (from machine or hand count), names of two bipartisan witnesses/custodians, precise timestamp, transfer location.

**Document Types:**
- **Transfer Log:** Used during transport from precinct to tabulation.
- **Drop Box Retrieval Form:** Documenting the 2-person pickup from ballot drop boxes.
- **Tabulation Intake Form:** Final receipt at the central counting facility.

## Data Visible After Verification

Shows the issuer domain (`maricopa.gov`, `miamidade.gov`) and the transfer status.

**Status Indications:**
- **Logged** — Origin precinct has recorded the transfer.
- **In-Transit** — Transport team has confirmed possession.
- **Received** — Central counting has verified the seal and count.
- **Seal Mismatch** — **ALERT:** Intake count or seal number does not match origin record.

## Second-Party Use

The **Election Official** or **Poll Worker** benefits from verification.

**Anti-Tampering:** Proving that the container they sealed at the high school is the *exact* same container that arrived at central counting, with an unbroken digital trail of the seal numbers and counts.

**Liability Protection:** Poll workers (often volunteers) can prove they handed off exactly 1,242 ballots to the transport deputy, preventing blame for lost ballots later.

## Third-Party Use

**Election Observers / Challengers**
**Real-Time Audit:** Political party observers can scan the transfer forms as containers arrive at the central facility. Verification ensures the forms weren't "swapped" or "re-written" during the drive.

**Media / Journalists**
**Transparency:** Fact-checking claims of "mysterious boxes appearing." Verified chain-of-custody proves where every box came from and when it was logged.

**The Courts**
**Litigation Evidence:** In an election contest, verified custody forms provide a cryptographically solid audit trail that is harder to challenge than mere photocopies.

## Verification Architecture

**The "Ballot Box" Fraud Problem**

- **Box Substitution:** Swapping a box of real ballots for a box of fake ballots during transport. The seal numbers won't match the verified origin record.
- **Count Inflation:** Changing the count on the paper form from 1,000 to 1,200 to hide extra ballots.
- **Fabricated Transfers:** Creating a fake transfer form for a non-existent precinct.

**Issuer Types**

**County Election Depts:** The primary authorities.
**Secretary of State:** (Overseeing the state-wide standards).

**Privacy Salt:** Essential. While the form doesn't name voters, it is sensitive civic data. Salting prevent enumeration of transfer IDs.

## Competition vs. Central Portals / GPS

| Feature | OCR-to-Hash | Internal Election Portal | GPS Tracking on Trucks |
| :--- | :--- | :--- | :--- |
| **Observer Access** | **High.** External parties can verify without system access. | **Zero.** Observers are never given logins to sensitive gov systems. | **None.** Proves where the truck went, not what's in the box. |
| **Integrity** | **Binds Content.** Proves the *count* and *seal* numbers. | **Vulnerable.** Internal DB can be edited by admins. | **N/A.** |
| **Offline Proof** | **Strong.** Paper form works if the counting center Wi-Fi is jammed. | **None.** | **Weak.** Requires cell signal. |

**Why OCR wins here:** Trust through Decentralization. In a polarized election, the "Opposition" does not trust the government's internal database. OCR-to-hash allows the opposition to verify the paper records against a public-facing domain without needing "Super-User" access to the voting system, creating a bipartisan trust bridge.
