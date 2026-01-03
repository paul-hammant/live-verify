---
title: "Certificates of Insurance (COI) for Contractors"
category: "Commercial Lines Insurance"
volume: "Large"
retention: "Contract term + 3-7 years"
slug: "certificates-of-insurance-contractors"
tags: ["insurance", "coi", "acord-25", "contractor", "liability", "compliance", "construction"]
furtherDerivations: 1
---

## What is a Contractor COI?

If you hire a plumber to fix a leak or a massive construction crew to build a skyscraper, you need to see their **Certificate of Insurance (COI)**.

This one-page paper (usually an ACORD 25 form) is the "Proof of Protection." It says: "If this contractor breaks your house or if a worker gets hurt, the insurance company will pay, not you."

COI fraud is rampant. Contractors often buy a policy for one day, print the COI, and then cancel the policy immediately. They show the "valid" paper to get hired, but they are actually uninsured. OCR-to-hash provides a "Live Status" check to see if the policy was cancelled yesterday.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #999; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #eee; padding: 10px; border-bottom: 1px solid #000; display: flex; justify-content: space-between; align-items: center;">
    <div style="font-weight: bold; font-size: 1.1em;">ACORD<sub>&reg;</sub> 25</div>
    <div style="font-size: 0.8em; font-weight: bold;">CERTIFICATE OF LIABILITY INSURANCE</div>
  </div>

  <div style="padding: 20px;">
    <div style="display: flex; margin-bottom: 15px;">
      <div style="width: 50%; border: 1px solid #000; padding: 5px; font-size: 0.8em;">
        <strong>PRODUCER:</strong><br>
        Marsh McLennan Agency<br>
        123 Main St, Boston, MA
      </div>
      <div style="width: 50%; border: 1px solid #000; border-left: none; padding: 5px; font-size: 0.8em;">
        <strong>INSURED:</strong><br>
        <span data-bracket="start" data-for="coi">[</span>Apex Construction Services, LLC<br>
        400 Industrial Way<br>
        Oakland, CA 94621
      </div>
    </div>

    <table style="width: 100%; border-collapse: collapse; font-size: 0.75em; border: 1px solid #000;">
      <tr style="background: #f5f5f5; border-bottom: 1px solid #000;">
        <th style="padding: 2px; text-align: left; border-right: 1px solid #000;">Type of Insurance</th>
        <th style="padding: 2px; text-align: left; border-right: 1px solid #000;">Policy Number</th>
        <th style="padding: 2px; text-align: right;">Limits</th>
      </tr>
      <tr>
        <td style="padding: 2px; border-right: 1px solid #000;">General Liability</td>
        <td style="padding: 2px; border-right: 1px solid #000;">GL-99887766</td>
        <td style="padding: 2px; text-align: right;">$ 1,000,000</td>
      </tr>
      <tr>
        <td style="padding: 2px; border-right: 1px solid #000;">Workers Comp</td>
        <td style="padding: 2px; border-right: 1px solid #000;">WC-44221100</td>
        <td style="padding: 2px; text-align: right;">Statutory</td>
      </tr>
    </table>

    <div style="margin-top: 15px; border: 1px solid #000; padding: 5px; font-size: 0.8em;">
      <strong>CERTIFICATE HOLDER:</strong><br>
      The City of Oakland<br>
      1 Frank Ogawa Plaza, Oakland, CA
    </div>

    <div data-verify-line="coi" style="border-top: 1px dashed #999; margin-top: 20px; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.7em; color: #555; text-align: center;"
      title="Demo only: Insurer doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:marsh.com/coi/v/99887766 <span data-bracket="end" data-for="coi">]</span>
    </div>
  </div>
</div>

## Data Verified

Insured name, policy numbers (GL, Auto, Umbrella, WC), coverage limits, effective/expiration dates, certificate holder name, producer/broker ID, issuing carrier (NAIC code).

**Document Types:**
- **ACORD 25:** Certificate of Liability Insurance (Standard).
- **ACORD 28:** Evidence of Commercial Property Insurance.
- **Waiver of Subrogation:** Critical construction endorsement.
- **Additional Insured Endorsement:** Adding the property owner to the policy.

## Data Visible After Verification

Shows the issuer domain (the Broker or Carrier) and the certificate standing.

**Status Indications:**
- **Valid** — Policies are in force and match the broker's system.
- **Cancelled** — One or more policies have been terminated.
- **Superseded** — An updated certificate has been issued (e.g., due to a limit change).
- **Expired** — The policies listed have reached their term end.

## Second-Party Use

The **Insured Contractor** benefits from verification.

**Site Access:** Proving to a security guard or project manager at a high-security construction site (e.g., a data center or airport) that their insurance is verified active. This prevents the "Monday Morning Lockout" where a crew is turned away because the office hasn't manually confirmed their COI yet.

**Bid Submissions:** Providing a verified COI with a project bid to prove "Insure-ability" and professionalism.

## Third-Party Use

**Project Owners / Developers**
**Liability Protection:** Ensuring that every contractor on a $100M project is fully insured. Verification prevents the common fraud where a contractor provides a COI, gets the contract, and then cancels the policy to save money.

**Compliance Platforms (Procore / Complia)**
**Automated Vetting:** These platforms can use the verification hash to instantly validate thousands of COIs, reducing the need for manual "Broker Verification Calls."

**Insurance Brokers**
**Workflow Efficiency:** Reducing the volume of "Is this COI real?" phone calls from third parties by providing a self-service verification URL.

## Verification Architecture

**The "Fake COI" Fraud Problem**

- **Ghost Policies:** A contractor buys a policy for 1 day, prints the COI, then cancels the policy for a full refund. They carry the paper COI for 12 months.
- **Limit Inflation:** Editing a $1M policy PDF to read $10M to qualify for a larger project.
- **Date Stretching:** Changing an expired 2025 date to 2026.
- **Fabricated Endorsements:** Claiming "Additional Insured" status on the paper COI when the endorsement was never actually purchased.

**Issuer Types**

**Insurance Brokers:** (Marsh, Aon, local agencies).
**Direct Carriers:** (Geico, Progressive, State Farm).
**Compliance Tech:** (Certificate management vendors).

## Competition vs. Central Databases (ACORD)

| Feature | OCR-to-Hash | ACORD Data Pool | Paper COI |
| :--- | :--- | :--- | :--- |
| **User Access** | **Universal.** Any site foreman/owner can verify. | **Restricted.** Requires expensive industry membership. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Broker/Insurer. | **Centralized.** Trust the ACORD database. | **Zero.** Easily forged. |
| **Integrity** | **Binds Content.** Proves the *Limits* match. | **Data-Only.** Doesn't verify the actual paper document. | **Vulnerable.** |
| **Freshness** | **Real-time.** Queries the broker's live file. | **Laggy.** Depends on batch uploads. | **Static.** |

**Why OCR wins here:** The "Handoff Gap." ACORD data pools are for insurance companies talking to each other. But in the real world, a property owner needs to trust the piece of paper they are holding from a contractor. OCR-to-hash turns that paper into a **Live Link** to the source of truth, closing the gap between industry databases and the physical world.
