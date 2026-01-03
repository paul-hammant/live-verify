---
title: "Homeowners Insurance Declarations Page"
category: "Real Estate & Property"
volume: "Large"
retention: "Policy term + 7 years (claims, mortgage audits)"
slug: "homeowners-renters-insurance"
tags: ["adjuster-report", "condo-insurance", "damage-estimate", "dec-page", "dwelling-coverage", "escrow-audit", "fraud-prevention", "hazard-insurance", "homeowners-insurance", "mortgage-compliance", "property-casualty", "property-claim", "real-estate-closing", "renters-insurance", "restoration-audit", "risk-management"]
---

## What is a Dec Page?

Your homeowners insurance policy is a dense book, but the **Declarations Page** (or "Dec Page") is the 1-page summary that matters most.

It proves to your bank that your house is protected against fire, wind, and theft. It lists:
1.  **The Limits:** How much the company will pay to rebuild ($450k).
2.  **The Deductible:** How much you pay out of pocket ($1,000).
3.  **The Bank:** Who gets paid first (the Mortgagee).

Fraud happens when owners "edit" the PDF to show a higher limit to satisfy a bank's loan requirements while actually paying for a cheaper, low-limit policy. Verified hashes allow lenders to see the **live coverage status** on the insurer's domain instantly.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #007bff; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #007bff; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;">STATE FARM 🔴</div>
      <div style="font-size: 0.8em; opacity: 0.9;">Homeowners Policy Declarations</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Policy #: 99-BC-9922-8</div>
    </div>
  </div>

  <div style="padding: 25px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 25px;">
      <div>
        <strong>Insured:</strong><br>
        <span data-bracket="start" data-for="ho-dec">]</span><strong>JANE A. DOE</strong><br>
        123 Maple Street<br>
        Anytown, USA 12345
      </div>
      <div style="text-align: right;">
        <strong>Policy Period:</strong><br>
        Jan 01, 2026 - Jan 01, 2027<br>
        <strong>Form:</strong> HO-3 (Special)
      </div>
    </div>

    <h3 style="border-bottom: 2px solid #007bff; padding-bottom: 5px; color: #007bff;">COVERAGES & LIMITS</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 0.9em;">
      <tr>
        <td style="padding: 8px 0;"><strong>A. Dwelling</strong></td>
        <td style="text-align: right;">$ 450,000.00</td>
      </tr>
      <tr>
        <td style="padding: 8px 0;"><strong>C. Personal Property</strong></td>
        <td style="text-align: right;">$ 225,000.00</td>
      </tr>
      <tr>
        <td style="padding: 8px 0;"><strong>L. Personal Liability</strong></td>
        <td style="text-align: right;">$ 300,000.00</td>
      </tr>
      <tr style="border-top: 1px solid #ddd;">
        <td style="padding: 8px 0;">Deductible (All Perils)</td>
        <td style="text-align: right;">$ 1,000.00</td>
      </tr>
    </table>

    <div style="font-size: 0.85em; color: #555;">
      <strong>Mortgagee:</strong> Bank of America, N.A. (ISAOA/ATIMA) • Loan #88776655
    </div>

    <div data-verify-line="ho-dec" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: State Farm doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:statefarm.com/policy/v/99BC99228 <span data-bracket="end" data-for="ho-dec">]</span>
    </div>
  </div>
</div>

## Data Verified

Named insured, property address, dwelling limit (Coverage A), personal property limit (Coverage C), liability limit, deductible amount, policy form (HO-3/HO-5), effective/expiration dates, Mortgagee Clause (Lienholder info), issuing carrier.

**Document Types:**
- **Declarations Page (Dec Page):** The primary 1-2 page summary.
- **Binder:** Temporary proof for new home closings.
- **Evidence of Property Insurance:** Specifically for lenders.
- **Endorsement Schedule:** Listing specific riders (e.g., jewelry/flood).

## Data Visible After Verification

Shows the issuer domain (`statefarm.com`, `geico.com`) and current policy standing.

**Status Indications:**
- **In Force** — Premium paid; policy active.
- **Pending Cancellation** — **ALERT:** Notice sent for non-payment.
- **Expired** — Coverage ended; no renewal found.
- **Amended** — A revised Dec Page exists (e.g., due to a limit increase).

## Second-Party Use

The **Homeowner (Insured)** benefits from verification.

**Escrow Audit Defense:** Proving to a mortgage servicer that the premium amount on the "Dec Page" is the **Verified Correct Amount**. This prevents the servicer from "Shorting" the escrow account or over-charging the homeowner based on an outdated or misread PDF.

**Claim Substantiation:** Proving the exact coverage limits at the time of a loss, ensuring the adjuster can't "Misinterpret" the paper policy to lower a payout.

## Third-Party Use

**Mortgage Lenders / Servicers**
**Force-Placed Insurance Prevention:** Lenders currently spend millions manually calling brokers to verify that a policy hasn't lapsed. OCR-to-hash allows for **automated continuous monitoring**. If a policy is cancelled, the hash status updates instantly, allowing the lender to notify the borrower *before* force-placing expensive insurance.

**Real Estate Closing Agents**
**Clear to Close:** Instantly verifying that the buyer's new policy meets the lender's "Replacement Cost" requirements during the high-pressure 24 hours before a closing.

**Home Service Contractors**
**Liability Check:** Verifying a client's "Personal Liability" limit before performing high-risk work (e.g., large tree removal) on the property.

## Verification Architecture

**The "Mortgage Fraud" Problem**

- **Ghost Policies:** Buying a policy to get the "Dec Page" needed for a loan closing, then immediately cancelling it for a refund.
- **Limit Inflation:** Editing a $250k policy to read $500k to meet a lender's loan-to-value (LTV) requirements.
- **Mortgagee Erasure:** Removing the bank's name from the "Mortgagee Clause" to prevent the bank from receiving a claim check.

**Issuer Types**

**Direct Carriers:** (State Farm, Allstate, Geico).
**Agency Networks:** (Hosting verified hashes for local agents).
**Insurtech Platforms:** (Lemonade, Hippo).

## Competition vs. Broker Portals

| Feature | OCR-to-Hash | Broker Portal | Scanned PDF / Paper |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Cryptographic.** Binds the *Address* to the *Limit*. | **System-Bound.** | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** Works across all carriers. | **Siloed.** Hard to aggregate 50 different logins. | **Universal.** |
| **Freshness** | **Real-time.** Shows if cancelled *today*. | **Laggy.** Often 24-48 hours behind. | **Static.** |
| **Audit-ability** | **High.** Digital trail for regulators. | **Low.** Internal only. | **Manual.** |

**Why OCR wins here:** The "Handoff Gap." Insurance is a private contract, but it's a **Public Requirement** for the mortgage industry. OCR-to-hash turns the **Private Policy** into a portable, cryptographically trusted asset that can be safely shared with banks and lawyers without exposing the homeowner's full medical or financial history.


---

_[Content merged from: homeowners-renters-claims]_


## What is a Property Claim?

If your kitchen floods or a tree falls on your roof, you file a **Property Claim** with your insurance company. An adjuster visits and creates a **Repair Estimate**.

This estimate is the "Checkbook" for the repairs. It tells the contractor exactly what the insurance company has agreed to pay for (e.g., "$12,450 for the kitchen").

Fraud is common: dishonest contractors sometimes "edit" the PDF to add $5,000 in non-existent damage to get more money from the insurer. Verified hashes protect the **adjuster's original math**, ensuring that the money goes toward real repairs and not into a scammer's pocket.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #d32f2f; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;">ALLSTATE INSURANCE</div>
      <div style="font-size: 0.8em;">Property Claims Services</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Claim #: 99228877-PROP</div>
    </div>
  </div>

  <div style="padding: 25px;">
    <h3 style="margin-top: 0; color: #d32f2f; border-bottom: 2px solid #d32f2f; padding-bottom: 5px;">REPAIR ESTIMATE & PROOF OF LOSS</h3>

    <div style="font-size: 0.9em; line-height: 1.6; color: #333;">
      <p><strong>Insured:</strong> <span data-bracket="start" data-for="prop-claim">]</span>SARAH J. DOE<br>
      <strong>Property:</strong> 123 Maple St, Anytown, USA</p>

      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr style="background: #f5f5f5; border-bottom: 1px solid #d32f2f;">
          <th style="text-align: left; padding: 8px;">Damage Category</th>
          <th style="text-align: right; padding: 8px;">Estimated RCV</th>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">Dwelling (Water Damage - Kitchen)</td>
          <td style="text-align: right; padding: 8px; border-bottom: 1px solid #eee;">$ 12,450.00</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">Personal Property (Electronics)</td>
          <td style="text-align: right; padding: 8px; border-bottom: 1px solid #eee;">$ 2,100.00</td>
        </tr>
        <tr style="font-weight: bold; background: #ffebee;">
          <td style="padding: 8px;">NET CLAIM TOTAL:</td>
          <td style="text-align: right; padding: 8px;">$ 14,550.00</td>
        </tr>
      </table>

      <p style="margin-top: 20px;"><strong>Adjuster:</strong> Robert Miller (ID #992)<br>
      <strong>Restoration Firm:</strong> ServePro of Anytown (Verified)</p>
    </div>

    <div data-verify-line="prop-claim" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Allstate doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:allstate.com/claims/v/99228877 <span data-bracket="end" data-for="prop-claim">]</span>
    </div>
  </div>
</div>

## Data Verified

Insured name, property address, Claim ID, estimated Replacement Cost Value (RCV), Actual Cash Value (ACV), deductible amount, adjuster name/ID, restoration contractor name, date of loss, date of estimate.

**Document Types:**
- **Adjuster's Estimate:** Detailed line-items (Xactimate output).
- **Proof of Loss:** Final signed attestation of damages.
- **Certificate of Completion:** Signed by the owner post-repair.
- **Contents Inventory:** Verified list of destroyed items.

## Data Visible After Verification

Shows the issuer domain (`allstate.com`, `libertymutual.com`) and current claim standing.

**Status Indications:**
- **Approved** — Estimate matches the carrier's system; funds authorized.
- **Supplemented** — **ALERT:** A newer estimate #2 exists; this version is void.
- **Paid** — Funds have been issued to the insured/contractor.
- **Closed** — Claim file completed and liability discharged.

## Second-Party Use

The **Homeowner / Renter** benefits from verification.

**Contractor Oversight:** Proving to a restoration company (e.g., ServePro) exactly what the insurance company agreed to pay for (e.g., "Hardwood replacement" vs "Laminate"). Verification prevents "Bait and Switch" where a contractor charges the insurer for high-end materials but installs cheap ones.

**Mortgage Compliance:** Proving to a lender that the insurance funds are being used for verified repairs to protect the bank's collateral.

## Third-Party Use

**Restoration Contractors**
**Payment Assurance:** Before starting a $14,000 kitchen tear-down, the contractor scans the adjuster's estimate. "Verified by Allstate" gives them the confidence that the funds are actually authorized and they won't be left with an unpaid bill.

**Secondary Buyers (Real Estate)**
**CLUE Report Integrity:** A buyer can verify the history of past claims on a house. OCR-to-hash ensures the seller isn't "Hiding" a $50,000 mold claim by providing a fake, low-value repair receipt.

**Special Investigative Units (SIU)**
**Fraud Detection:** Instantly identifying "Estimate Padding" where a dishonest contractor or policyholder edits the PDF to add $5,000 in non-existent damage.

## Verification Architecture

**The "Disaster Padding" Fraud Problem**

- **RCV Inflation:** Editing a $1,200 TV claim to read $12,000 on the contents list.
- **Supplement Forgery:** Creating a fake "Supplement #1" PDF to get extra cash for "Hidden Damage" that doesn't exist.
- **Photo Recycling:** Using photos of a fire from a different house to claim a loss on an insured property.

**Issuer Types**

**Primary Insurers:** (Allstate, State Farm, USAA).
**Independent Adjusting Firms:** (e.g., Crawford & Co, Eberl).
**Estimating Software:** (e.g., Xactimate/Verisk - hosting the underlying data hashes).

## Competition vs. CLUE Reports (LexisNexis)

| Feature | OCR-to-Hash | CLUE Report (LexisNexis) | Scanned PDF Estimate |
| :--- | :--- | :--- | :--- |
| **Granularity** | **High.** Shows line-item repairs. | **Low.** Often just says "Water Loss - $14k." | **High.** But untrusted. |
| **Speed** | **Real-time.** Available as soon as approved. | **Laggy.** Updates take 30-90 days. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Insurer. | **Data-Bound.** Trust the aggregator. | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** Works for any contractor. | **Restricted.** Requires expensive data access. | **Universal.** |

**Why OCR wins here:** Detail and Immediacy. A CLUE report is a historical summary. But a **Restoration Contractor** needs the specific, verified details of *this* claim *today* to start work. OCR-to-hash turns the **Static Estimate** into a live, trusted clinical link that bridges the gap between the insurer and the construction crew.


---

_[Content merged from: homeowners-renters-insurance]_


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