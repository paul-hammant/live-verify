---
title: "Commercial General Liability (CGL) Policies"
category: "Commercial Lines Insurance"
volume: "Large"
retention: "Policy term + 10 years"
slug: "commercial-general-liability"
tags: ["cgl", "insurance-policy", "liability", "contractor-insurance", "risk-management", "commercial-insurance"]
furtherDerivations: 1
---

## What is a CGL Policy?

**Commercial General Liability (CGL)** is the "Slip and Fall" insurance for a business. It protects a company if they are sued for bodily injury or property damage (e.g., a contractor accidentally burns down a client's garage).

The **Declarations Page** is the 1-page summary showing the "Limits" (e.g., $2,000,000 per occurrence).

Business owners must show these verified limits to win contracts. Fraudsters often "Inflate" their limits on a PDF (changing $500k to $2M) to qualify for big jobs they aren't actually insured for.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #1a237e; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
  <div style="background: #1a237e; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;">THE TRAVELERS COMPANIES</div>
      <div style="font-size: 0.8em;">Commercial General Liability</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Policy #: CGL-99887766-26</div>
    </div>
  </div>

  <div style="padding: 30px;">
    <h2 style="text-align: center; color: #1a237e; font-size: 1.4em; margin-bottom: 20px; text-transform: uppercase;">Policy Declarations</h2>

    <div style="font-size: 0.9em; line-height: 1.6; color: #333;">
      <p><strong>Named Insured:</strong> <span data-bracket="start" data-for="cgl">]</span>Heavy Haulers Construction, Inc.<br>
      <strong>Business Description:</strong> Structural Steel Erection</p>

      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr style="background: #f0f4f8; border-bottom: 2px solid #1a237e;">
          <th style="text-align: left; padding: 8px;">Coverage Limits</th>
          <th style="text-align: right; padding: 8px;">Amount</th>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">Each Occurrence</td>
          <td style="text-align: right; padding: 8px; border-bottom: 1px solid #eee;">$ 2,000,000</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">General Aggregate</td>
          <td style="text-align: right; padding: 8px; border-bottom: 1px solid #eee;">$ 4,000,000</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">Products-Completed Ops</td>
          <td style="text-align: right; padding: 8px; border-bottom: 1px solid #eee;">$ 4,000,000</td>
        </tr>
      </table>

      <p style="margin-top: 20px;"><strong>Policy Period:</strong> March 01, 2026 to March 01, 2027</p>
    </div>

    <div data-verify-line="cgl" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Travelers doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:travelers.com/policy/v/CGL99887766 <span data-bracket="end" data-for="cgl">]</span>
    </div>
  </div>
</div>

## Data Verified

Named insured, business description (Class Code), coverage limits (Occurrence/Aggregate), policy number, effective/expiration dates, deductible amount, issuing carrier.

**Document Types:**
- **Policy Declarations Page:** The 1-page summary of coverage.
- **Binder:** Temporary 30-day proof of coverage.
- **Endorsement Schedule:** Listing specific changes (e.g., adding a project).

## Data Visible After Verification

Shows the issuer domain (`travelers.com`, `chubb.com`) and current policy status.

**Status Indications:**
- **In Force** — Policy is active and premiums paid.
- **Cancelled** — Coverage has been terminated (often due to non-payment or high claims).
- **Lapsed** — Renewal was not processed.
- **Pending Audit** — Coverage active but final premium subject to payroll audit.

## Second-Party Use

The **Business Owner** (Contractor) benefits from verification.

**Contract Awards:** Proving to a potential client that the company actually has the $2M/$4M limits required for a massive project. A verified "Dec Page" prevents the competitor from undercutting by using fake or cheaper, low-limit insurance.

**Lease Negotiations:** Proving to a commercial landlord that the business meets the liability insurance requirements of the lease agreement.

## Third-Party Use

**General Contractors (GCs)**
**Subcontractor Compliance:** Ensuring that every sub on the job-site is fully insured. Verification prevents the "Buy and Cancel" fraud where a sub buys a policy to get on-site and then cancels it immediately.

**Lenders / Banks**
**Risk Mitigation:** Verifying the CGL coverage of commercial borrowers to ensure they won't be bankrupted by a single lawsuit, which protects the lender's loan.

**Event Venues**
**Vendor Management:** Verifying the liability insurance of caterers, decorators, and performers before they set up on the property.

## Verification Architecture

**The "Fake Limit" Fraud Problem**

- **Ghost Policies:** Buying a policy, printing the papers, then cancelling it for a refund.
- **Limit Inflation:** Editing a $500k policy to read $2M to win a contract.
- **Class Code Fraud:** Claiming to be a "Florist" (low risk) to get a cheap rate, but showing a "Verified" looking paper to work as a "Steel Erector" (high risk).

**Issuer Types**

**Commercial Carriers:** (Travelers, Chubb, Zurich, Hartford).
**Managing General Agents (MGAs).**
**Self-Insured Groups.**

## Competition vs. Broker Confirmation Calls

| Feature | OCR-to-Hash | Manual Broker Call | Scanned PDF |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Carrier. | **Human.** Relies on the broker's assistant answering honestly. | **Zero.** Easily forged. |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Often takes 24-48 hours for a return call. | **Instant.** |
| **Availability** | **24/7.** Works on weekends/holidays. | **Business Hours Only.** | **Universal.** |
| **Integrity** | **Cryptographic.** Binds every digit. | **Vague.** "Yes, they have a policy." | **Vulnerable.** |

**Why OCR wins here:** The "Site Entrance" reality. A subcontractor arrives at a job-site on a Saturday morning. The GC's office is closed. The Sub's broker is closed. OCR-to-hash allows the site foreman to verify the Sub's insurance **on the spot**, allowing work to proceed safely and legally without delays.
