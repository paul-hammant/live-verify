---
title: "Homeowners Insurance Declarations Page"
category: "Real Estate & Property"
volume: "Large"
retention: "Policy term + 7 years (claims, mortgage audits)"
slug: "homeowners-insurance-declarations"
tags: ["homeowners-insurance", "dec-page", "mortgage-compliance", "dwelling-coverage", "hazard-insurance", "escrow-audit", "real-estate-closing"]
---

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
