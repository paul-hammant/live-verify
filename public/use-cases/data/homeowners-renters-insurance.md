---
title: "Homeowners and Renters Insurance Policies"
category: "Personal Lines Insurance"
volume: "Medium"
retention: "Policy lifetime + 10 years"
slug: "homeowners-renters-insurance"
tags: ["homeowners-insurance", "renters-insurance", "property-casualty", "hazard-insurance", "condo-insurance", "mortgage-compliance", "risk-management"]
---

## What is Homeowners Insurance?

For most families, their home is their biggest financial asset. **Homeowners Insurance** ensures that if the house burns down, the insurance company will pay to rebuild it.

The **Declarations Page** is the "Proof of Safety." It shows the bank that the loan is protected.

Because these papers are required for every mortgage, "Ghost Policy" fraud is a major problem: people buy a policy to get the paper for the bank closing, then cancel it the next day for a refund. Verified hashes allow lenders to perform **automated annual audits** to ensure the policy is still active today.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Helvetica', Arial, sans-serif; border: 2px solid #003366; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #003366; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;">LIBERTY MUTUAL</div>
      <div style="font-size: 0.8em; opacity: 0.9;">Home & Tenant Protection Policy</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Policy #: HO-99228877-26</div>
    </div>
  </div>

  <div style="padding: 25px;">
    <h2 style="text-align: center; color: #003366; font-size: 1.4em; margin-bottom: 20px; text-transform: uppercase;">Insurance Declarations</h2>

    <div style="font-size: 0.9em; line-height: 1.6; color: #333;">
      <p><strong>Named Insured:</strong> <span data-bracket="start" data-for="ho-pol">]</span>Sarah Jane Smith<br>
      <strong>Location:</strong> 4500 Skyline Blvd, Unit 12A, Austin, TX</p>

      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr style="background: #f0f4f8; border-bottom: 2px solid #003366;">
          <th style="text-align: left; padding: 8px;">Coverage Description</th>
          <th style="text-align: right; padding: 8px;">Limit</th>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">A. Dwelling</td>
          <td style="text-align: right; padding: 8px; border-bottom: 1px solid #eee;">$ 350,000.00</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">C. Personal Property</td>
          <td style="text-align: right; padding: 8px; border-bottom: 1px solid #eee;">$ 175,000.00</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">L. Personal Liability (Each Occurrence)</td>
          <td style="text-align: right; padding: 8px; border-bottom: 1px solid #eee;">$ 500,000.00</td>
        </tr>
      </table>

      <p style="margin-top: 20px;"><strong>Policy Period:</strong> March 01, 2026 to March 01, 2027<br>
      <strong>Annual Premium:</strong> $ 1,242.00</p>
    </div>

    <div style="margin-top: 30px; border: 1px solid #ccc; padding: 10px; font-size: 0.8em; color: #555; background: #fafafa;">
      <strong>Mortgagee:</strong> Wells Fargo Bank, N.A. (ISAOA/ATIMA) • Loan #99887766
    </div>

    <div data-verify-line="ho-pol" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Liberty Mutual doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:libertymutual.com/policy/v/HO99228877 <span data-bracket="end" data-for="ho-pol">]</span>
    </div>
  </div>
</div>

## Data Verified

Named insured, property address, dwelling limit (Cov A), personal property limit (Cov C), liability limit, deductible amount, policy form (HO-3, HO-4, HO-6), effective/expiration dates, Mortgagee/Lienholder name, issuing carrier.

**Document Types:**
- **Declarations Page:** The primary summary for lenders and owners.
- **HO-4 Tenant Policy:** Specifically for renters (no dwelling cover).
- **HO-6 Unit-Owner Policy:** Specifically for condominiums.
- **Evidence of Property Insurance:** Formal proof for bank files.

## Data Visible After Verification

Shows the issuer domain (`libertymutual.com`, `statefarm.com`, `lemonade.com`) and current policy standing.

**Status Indications:**
- **In Force** — Premium paid; policy is active.
- **Pending Cancellation** — **ALERT:** Notice sent due to non-payment or high risk.
- **Expired** — Term ended; no active coverage found.
- **Amended** — A newer version of the Dec Page exists.

## Second-Party Use

The **Homeowner / Renter** benefits from verification.

**Escrow Management:** Proving to a mortgage servicer that the premium on the "Dec Page" is verified authentic. This prevents the servicer from "Over-collecting" for escrow or accidentally triggering "Force-placed" insurance due to a misread PDF.

**Lease Requirements:** Proving to a landlord that the renter's liability insurance meets the $500k requirement of the lease agreement.

## Third-Party Use

**Mortgage Lenders / Servicers**
**Collateral Protection:** Verifying that the $350k dwelling coverage is verified active and that the bank is correctly listed as "Mortgagee." OCR-to-hash allows for **automated annual audits** of thousands of borrower policies without manual data entry.

**Real Estate Closing Agents**
**Clear-to-Close:** Instantly verifying the insurance status of a new homebuyer in the final 24 hours before a closing, ensuring the lender's funding requirements are met.

**Property Managers**
**Liability Tracking:** Ensuring every tenant in a large complex has verified, active insurance to cover damage to the building.

## Verification Architecture

**The "Mortgage Fraud" Problem**

- **Buy and Cancel:** Buying a policy to get the "Dec Page" for a loan closing, then immediately cancelling it for a refund. Verification shows the "Cancelled" status instantly.
- **Limit Inflation:** Editing a $100k policy PDF to read $400k to meet a lender's loan-to-value (LTV) rules.
- **Lienholder Erasure:** Removing the bank's name from the policy to prevent the bank from receiving a payout check after a fire.

**Issuer Types**

**National Carriers:** (State Farm, Allstate, Liberty Mutual).
**Direct-to-Consumer Insurtechs:** (Lemonade, Hippo, Kin).
**State Insurance Pools:** (e.g., California FAIR Plan).

## Competition vs. ACORD Data Feeds

| Feature | OCR-to-Hash | ACORD Data Pool (IVANS) | Scanned PDF |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Cryptographic.** Binds the *Address* to the *Limit*. | **Data-Only.** Doesn't verify the actual paper doc. | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** Works across all carriers. | **Limited.** Only for agencies on the IVANS network. | **Universal.** |
| **Freshness** | **Real-time.** Shows if cancelled *today*. | **Laggy.** Often 24-48 hours behind. | **Static.** |
| **User Control** | **High.** Homeowner shares only what is needed. | **Low.** Lenders see the full data stream. | **High.** |

**Why OCR wins here:** The "Closing Table" reality. In a real estate deal, trust must move between a Buyer, a Seller, a Bank, and a Title Co. They don't all share the same API. OCR-to-hash turns the **Paper Document** into a portable, cryptographically trusted link that bridges the gap between the insurer and the closing table.