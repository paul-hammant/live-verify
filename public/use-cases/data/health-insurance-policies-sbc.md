---
title: "Health Insurance Summary of Benefits (SBC)"
category: "Personal Lines Insurance"
volume: "Medium"
retention: "Policy term + 7 years"
slug: "health-insurance-policies-sbc"
tags: ["health-insurance", "sbc", "aca-compliance", "summary-of-benefits", "coverage-verification", "healthcare-reform", "medical-policy"]
furtherDerivations: 1
---

## What is an SBC?

Under the Affordable Care Act (ACA), every health insurance plan must provide a **Summary of Benefits and Coverage (SBC)**. It is a standardized 8-page document that allows you to compare plans fairly ("Apples to Apples").

It lists your **Deductible**, your **Copay**, and what you pay for an **ER visit**.

Fraud happens during the sales process: some brokers edit the SBC PDF to show a "$500 Deductible" when the actual plan has a "$5,000 Deductible." Verified hashes turn the SBC into a live link to the insurer's official filing, ensuring you are buying the coverage you were promised.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #005fb8; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;">AETNA HEALTH</div>
      <div style="font-size: 0.8em; opacity: 0.8;">Summary of Benefits and Coverage (SBC)</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Form #: SBC-2026-NY-99</div>
    </div>
  </div>

  <div style="padding: 25px;">
    <div style="border-bottom: 2px solid #005fb8; padding-bottom: 10px; margin-bottom: 20px;">
      <h2 style="margin: 0; color: #333; font-size: 1.3em;">PLAN: BRONZE PPO 1000</h2>
      <div style="font-size: 0.9em; color: #666;">Coverage for: Individual & Family | Plan Period: 01/01/26 - 12/31/26</div>
    </div>

    <div style="font-size: 0.9em; line-height: 1.6; color: #333;">
      <p>This is only a summary. For more information, see <span data-bracket="start" data-for="health-sbc">[</span><strong>www.aetna.com</strong>.</p>

      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr style="background: #f5f5f5; border-bottom: 1px solid #005fb8;">
          <th style="text-align: left; padding: 8px;">Important Questions</th>
          <th style="text-align: left; padding: 8px;">Answers</th>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Individual Deductible?</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">$ 1,000 In-network / $ 5,000 Out-of-network</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Out-of-Pocket Limit?</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">$ 8,500 In-network / $ 15,000 Out-of-network</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Network Provider?</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">Yes. See Aetna Open Access Network.</td>
        </tr>
      </table>
    </div>

    <div style="margin-top: 25px; padding: 10px; background: #e3f2fd; border: 1px solid #90caf9; font-size: 0.8em; color: #0d47a1; font-style: italic; text-align: center;">
      This SBC is a verified extract of the Aetna Bronze PPO policy filed with the NY Dept of Financial Services.
    </div>

    <div data-verify-line="health-sbc" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Aetna doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:aetna.com/sbc/v/BRONZE-1000-NY <span data-bracket="end" data-for="health-sbc">]</span>
    </div>
  </div>
</div>

## Data Verified

Plan name, network ID, individual/family deductibles, out-of-pocket maximums, primary care copay, specialist copay, emergency room fees, pharmacy tiers, policy effective/expiration dates, state of filing.

**Document Types:**
- **Summary of Benefits and Coverage (SBC):** Standardized 8-page ACA disclosure.
- **Certificate of Coverage:** The full legal policy book.
- **Evidence of Coverage (EOC):** Specific to Medicare Advantage plans.
- **Glossary of Health Coverage:** Standardized federal terminology.

## Data Visible After Verification

Shows the issuer domain (`aetna.com`, `anthem.com`, `uhc.com`) and the plan status.

**Status Indications:**
- **Current** — Plan is verified and matches the federal/state filing.
- **Superseded** — **ALERT:** Plan terms were amended mid-year; view new SBC.
- **Recalled** — Plan withdrawn from the market.
- **Disputed** — Specific benefit trigger being challenged by regulators.

## Second-Party Use

The **Policyholder (Subscriber)** benefits from verification.

**Doctor Office Vetting:** Proving to a new specialist that their "Bronze PPO" actually has a $40 specialist copay and not a 50% coinsurance. A verified hash from the insurer prevents "Office Staff Errors" where they misread a complex PDF and demand a larger payment upfront.

**Employer Choice:** During "Open Enrollment," an employee can verify the claims made by different insurance brokers to ensure the "Low Deductible" plan is actually verified by the carrier and not an outdated version.

## Third-Party Use

**Healthcare Providers (Hospitals)**
**Revenue Cycle Management:** Instantly verifying the "Deductible" and "Out-of-Pocket" limits before scheduling a $20,000 procedure. OCR-to-hash connects the hospital's billing system directly to the insurer's verified plan definitions.

**HR / Benefit Platforms**
**Automated Onboarding:** Using the SBC hash to automatically populate the benefit details into a new employee's portal, ensuring zero data-entry errors.

**Mortgage Lenders**
**Expense Audit:** Verifying the "Family Deductible" amount when calculating a borrower's emergency reserve requirements.

## Verification Architecture

**The "Standardized Confusion" Fraud Problem**

- **Deductible Lowering:** Editing a $5,000 deductible PDF to read $500 to trick a hospital into providing care without an upfront deposit.
- **Network Misrepresentation:** editing the "Network" section to include a prestigious hospital system that isn't actually part of the plan.
- **Outdated SBCs:** A broker using a 2024 SBC to sell a 2026 plan that has significantly worse coverage.

**Issuer Types**

**Health Insurers:** (Aetna, Blue Cross, Kaiser).
**State Insurance Commissioners:** (e.g., NY DFS, CA CDI - who approve the filings).
**Federal Centers for Medicare & Medicaid Services (CMS).**

**Privacy Salt:** Critical. Plan names and deductibles are sensitive. The hash must be salted to prevent "Market Mapping" of all premium levels in a specific zip code.

## Competition vs. Healthcare.gov (Federal Registry)

| Feature | OCR-to-Hash | Healthcare.gov / CMS Search | Scanned PDF SBC |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Insurer. | **Gov-Bound.** Bound to the US Gov. | **Zero.** Easily forged. |
| **Integrity** | **Binds Details.** Protects the copay $ amounts. | **Data-Only.** Doesn't verify the paper doc. | **Vulnerable.** |
| **Speed** | **Instant.** Scan the paper in the lobby. | **Slow.** Requires finding the Plan ID and navigating Gov UI. | **Instant.** |
| **Coverage** | **Universal.** Works for private "Off-Market" plans. | **Limited.** Only for Exchange-based plans. | **Full.** |

**Why OCR wins here:** The "Lobby Moment." Patients decide to see a doctor while standing at the front desk. They aren't going to log into a federal government database to check a copay. OCR-to-hash turns the **Mandatory SBC Printout** into a live, trusted clinical link, ensuring the patient and the doctor are on the same page regarding costs.