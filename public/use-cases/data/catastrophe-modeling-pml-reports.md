---
title: "Catastrophe Modeling and PML Reports"
category: "Actuarial & Insurance Mathematics"
volume: "Very Small"
retention: "5-10 years (capital planning)"
slug: "catastrophe-modeling-pml-reports"
tags: ["catastrophe-modeling", "pml", "actuarial", "reinsurance", "risk-management", "solvency", "rms", "air-worldwide"]
furtherDerivations: 1
---

## What is a PML Report?

A **Probable Maximum Loss (PML)** report is a "Scientific Guess" of how much money an insurance company could lose in a disaster.

A specialized firm (like RMS) uses weather data and building locations to say: "In a 1-in-100 year hurricane, you will likely lose $142 million."

This number is the lifeblood of the insurance market. Reinsurers use it to decide how much to charge for coverage. If a broker "Games the Model" (edits the PDF) to show a lower loss, they are tricking the market into taking too much risk for too little money.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Helvetica Neue', Helvetica, sans-serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.2em; color: #000;" verifiable-text="start" data-for="pml"><span>[</span>RMS (Risk Management Solutions)</div>
    <div style="text-align: right; font-size: 0.8em; color: #666;">
      Model Version: 21.0 (RiskLink)<br>
      March 15, 2026
    </div>
  </div>
<h3 style="text-align: center; text-transform: uppercase; letter-spacing: 1px; color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">Probable Maximum Loss (PML) Report</h3>
<div style="font-size: 0.9em; line-height: 1.6; color: #333; margin-top: 20px;">
    <p><strong>Insured:</strong> Global Real Estate Trust, REIT<br>
    <strong>Portfolio:</strong> US Coastal Tier 1 (142 Properties)</p>
<div style="background: #f9f9f9; padding: 15px; border: 1px solid #eee; margin: 20px 0;">
      <table style="width: 100%; font-size: 0.95em;">
        <tr style="border-bottom: 1px solid #ddd;">
          <th style="text-align: left; padding: 5px;">Return Period</th>
          <th style="text-align: right; padding: 5px;">PML (Gross)</th>
        </tr>
        <tr>
          <td style="padding: 5px;">1-in-100 Year (Hurricane)</td>
          <td style="text-align: right; padding: 5px;">$ 142,500,000</td>
        </tr>
        <tr>
          <td style="padding: 5px;">1-in-250 Year (Hurricane)</td>
          <td style="text-align: right; padding: 5px;">$ 285,000,000</td>
        </tr>
        <tr>
          <td style="padding: 5px;">1-in-500 Year (Earthquake)</td>
          <td style="text-align: right; padding: 5px;">$ 412,000,000</td>
        </tr>
      </table>
    </div>
<p style="font-style: italic; font-size: 0.85em;">Certified by: Robert Miller, Senior Catastrophe Modeler</p>
  </div>
<div data-verify-line="pml" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: RMS doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:rms.com/reports/v/GRET-2026-99 <span verifiable-text="end" data-for="pml">]</span>
  </div>
</div>

## Data Verified

Modeling firm name, model version (e.g., RMS RiskLink 21), portfolio ID, number of locations, specific return period estimates (100yr, 250yr, 500yr PML), average annual loss (AAL), date of run, certification status.

**Document Types:**
- **PML Summary Report:** 1-2 page extract for underwriters.
- **Detailed Loss Analysis (DLA):** Full output file.
- **Exposure Data Audit:** Verification that the building data (COPE) is accurate.

## Data Visible After Verification

Shows the issuer domain (`rms.com`, `air-worldwide.com`) and the report status.

**Status Indications:**
- **Verified** — Model run matches the firm's official record.
- **Outdated** — Model version has been retired; new run required.
- **In-Dispute** — Exposure data (COPE) found to be inaccurate.
- **Invalid** — Serial number or parameters mismatch.

## Second-Party Use

The **Insurance Broker** or **REIT Manager** benefits from verification.

**Market Submission:** Proving to a panel of 20+ reinsurers that the $285M "1-in-250 PML" figure isn't a fabricated number from a "Lite" model, but is a verified result from a top-tier firm. This builds trust and reduces the "Risk Premium" charged by reinsurers.

**Investor Transparency:** Proving to REIT shareholders that the company's exposure to climate risk is accurately modeled and verified.

## Third-Party Use

**Reinsurers**
**Capacity Allocation:** Reinsurers rely on these numbers to decide how much "Cat Limit" to deploy to a specific client. Verification prevents "Model Gaming" where a broker might manipulate parameters to show a lower PML and get a cheaper rate.

**Rating Agencies (S&P / Moody's)**
**Solvency Analysis:** Ensuring that the PMLs used in capital adequacy models are authentic and haven't been altered.

**Mortgage Lenders (Commercial)**
**Collateral Protection:** Banks lending on coastal towers verify the PML to ensure the project has enough insurance to survive a "1-in-500" event.

## Verification Architecture

**The "Model Gaming" Fraud Problem**

- **Parameter Tampering:** Manually editing the "Demand Surge" or "Storm Surge" flags in the PDF report to lower the PML by 20%.
- **Location Omission:** Deleting the most high-risk properties (e.g., Miami beach-front) from the portfolio run to artificially lower the aggregate loss number.
- **Fabricated Certificates:** Shady boutique firms claiming to use "RMS Models" but actually providing a guess-work estimate on fake letterhead.

**Issuer Types**

**Model Vendors:** (RMS, AIR Worldwide, CoreLogic).
**Actuarial Consultants:** (Guy Carpenter, Aon Benfield, Willis Re).
**In-House Modeling Units:** (For large carriers like Chubb).

## Competition vs. API Data Feeds

| Feature | OCR-to-Hash | API Integration | Scanned PDF Report |
| :--- | :--- | :--- | :--- |
| **User Experience** | **Universal.** Scan the report in the "Submission Pack." | **Hard.** Requires complex software integration between Broker and Reinsurer. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Modeler. | **System-Bound.** Trust the data feed. | **Zero.** Easily forged. |
| **Interoperability** | **High.** Works across 50+ different reinsurers. | **Low.** Every firm has a different platform (Touchstone vs RiskLink). | **Universal.** |
| **Cost** | **Low.** Standard web infra. | **Very High.** Seven-figure software licenses. | **None.** |

**Why OCR wins here:** The "Market Cycle." In the high-speed "Renewal Season" (e.g., Jan 1), thousands of "Submission Packs" (PDFs) are emailed across the globe. Reinsurers don't have the time or tech to link APIs with every single broker. OCR-to-hash provides **API-level trust** for the existing PDF-based workflow.
