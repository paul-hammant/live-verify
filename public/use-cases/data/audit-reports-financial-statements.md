---
title: "Audit Reports and Financial Statements"
category: "Financial & Legal Documents"
volume: "Small"
retention: "7-10 years (regulatory requirements)"
slug: "audit-reports-financial-statements"
tags: ["audit", "financial-statements", "opinion", "cpa", "pcaob", "compliance"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 2px 2px 15px rgba(0,0,0,0.05);">
  <div style="text-align: right; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.2em; color: #000;">PRICEWATERHOUSECOOPERS LLP</div>
    <div style="font-size: 0.8em; color: #666;">300 Madison Avenue, New York, NY 10017</div>
  </div>

  <h3 style="text-align: center; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">Report of Independent Registered Public Accounting Firm</h3>

  <div style="font-size: 0.95em; line-height: 1.6; text-align: justify; color: #333;">
    <p>To the Board of Directors and Shareholders of <span data-bracket="start" data-for="audit">]</span><strong>WAYSTAR ROYCO CORP.</strong></p>

    <p><strong>Opinions on the Financial Statements</strong></p>
    <p>We have audited the accompanying consolidated balance sheets of Waystar Royco Corp. as of <strong>December 31, 2025</strong> and 2024. In our opinion, the consolidated financial statements present fairly, in all material respects, the financial position of the Company.</p>

    <p><strong>Basis for Opinion</strong></p>
    <p>These financial statements are the responsibility of the Company's management. Our responsibility is to express an opinion on the Company's financial statements based on our audits. We are a public accounting firm registered with the PCAOB.</p>
  </div>

  <div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="border-top: 1px solid #000; width: 200px; padding-top: 5px;">PricewaterhouseCoopers LLP</div>
    <div style="font-size: 0.8em; color: #777;">February 24, 2026</div>
  </div>

  <div data-verify-line="audit" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: PwC doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:pwc.com/audit/v/WAYSTAR-2025 <span data-bracket="end" data-for="audit">]</span>
  </div>
</div>

## Data Verified

Company name, fiscal year-end, audit opinion type (Unqualified, Qualified, Adverse, Disclaimer), Lead Partner name, audit firm office, material findings summary, consolidated totals (Revenue, Net Income).

**Document Types:**
- **Audited Financial Statements (10-K):** For public companies.
- **Single Audit Report:** For non-profits receiving federal grants.
- **Review Engagement Letter:** For mid-sized private companies (lower assurance than audit).
- **Compilation Report:** Most basic form of accounting service.

## Data Visible After Verification

Shows the issuer domain (the Audit Firm) and the current opinion status.

**Status Indications:**
- **Final** — Audit completed and opinion issued.
- **Withdrawn** — Firm has retracted the opinion (e.g., discovery of management fraud).
- **Superseded** — Restated financials have been issued.
- **Subject to Internal Review** — Opinion under internal quality control review.

## Second-Party Use

The **Audited Company** benefits from verification.

**Investor Relations:** Proving to institutional investors that the "PDF of the audit" on the company website is the exact version signed by the Big 4 firm, with no "last minute" edits to the footnotes.

**M&A Due Diligence:** Providing a buyer with a verified audit history in a virtual data room, allowing the buyer to bypass manual confirmation with the audit firm.

## Third-Party Use

**Lenders / Banks**
**Covenant Monitoring:** Banks require audited financials to ensure loan covenants (e.g., Debt-to-Equity ratios) are met. Verification prevents companies from "window dressing" the financials before sending them to the bank.

**Stock Exchanges (NYSE/NASDAQ)**
**Listing Compliance:** Ensuring that filed reports match the auditor's official records, preventing "Wirecard-style" fabricated audit letters.

**Government Grantors**
**Compliance:** Agencies (e.g., USAID, NIH) verify that non-profits have passed their mandatory "Single Audit" before releasing grant funds.

## Verification Architecture

**The "Phantom Audit" Fraud Problem**

- **Fabricated Opinion Letters:** Fraudulent companies creating fake PwC or EY letterhead and writing their own "Unqualified Opinion."
- **Footnote Removal:** Deleting a "Going Concern" warning or a "Related Party Transaction" footnote from the final PDF to hide financial distress from lenders.
- **Date Alteration:** Presenting a 2023 audit as a 2025 audit by changing the numbers and dates in the PDF.

**Issuer Types**

**The Big Four:** (Deloitte, EY, KPMG, PwC).
**Mid-Tier Firms:** (BDO, Grant Thornton, RSM).
**PCAOB:** (The regulatory oversight body).

## Competition vs. SEC EDGAR Database

| Feature | OCR-to-Hash | SEC EDGAR (Public) | Private PDF |
| :--- | :--- | :--- | :--- |
| **Trust** | **Cryptographic.** Bound to the Auditor's domain. | **High.** But only for public companies. | **None.** Easily edited. |
| **Coverage** | **Universal.** Works for private company audits. | **Limited.** Does not cover private firms or non-profits. | **Full.** |
| **Integrity** | **Binds Content.** Proves every word matches. | **Database-Bound.** Relies on the filing being correct. | **Vulnerable.** |

**Why OCR wins here:** Private companies and non-profits do not file with the SEC. Their audits are "Private Documents" shared with specific lenders and donors. OCR-to-hash allows these private documents to be cryptographically verified without making them public on a government database.
