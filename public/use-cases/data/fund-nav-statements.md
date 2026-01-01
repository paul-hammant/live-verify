---
title: "Fund NAV and Capital Account Statements"
category: "Investment & Fintech"
volume: "Medium"
retention: "7-10 years (tax, audit, dispute resolution)"
slug: "fund-nav-statements"
tags: ["hedge-fund", "private-equity", "nav-statement", "fund-administration", "wealth-management", "madoff-prevention", "asset-valuation"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #002d62; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;">CITCO FUND SERVICES</div>
      <div style="font-size: 0.8em; opacity: 0.8;">Independent Fund Administrator</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Statement ID: NAV-992288-26</div>
    </div>
  </div>

  <div style="padding: 30px;">
    <h3 style="margin-top: 0; color: #002d62; border-bottom: 2px solid #002d62; padding-bottom: 5px;">MONTHLY CAPITAL ACCOUNT STATEMENT</h3>

    <div style="font-size: 0.9em; line-height: 1.6; color: #333;">
      <p><strong>Fund:</strong> <span data-bracket="start" data-for="nav">]</span>Titan Alpha Hedge Fund, LP<br>
      <strong>Investor:</strong> Wayne Family Foundation</p>

      <div style="background: #f0f4f8; padding: 15px; border: 1px solid #d1d9e6; margin: 15px 0;">
        <table style="width: 100%; font-size: 0.95em;">
          <tr>
            <td><strong>Period Ending:</strong></td>
            <td style="text-align: right;">March 31, 2026</td>
          </tr>
          <tr>
            <td><strong>NAV per Share:</strong></td>
            <td style="text-align: right;">$ 1,242.50</td>
          </tr>
          <tr>
            <td><strong>Ending Balance:</strong></td>
            <td style="text-align: right; font-weight: bold;">$ 12,500,000.00</td>
          </tr>
        </table>
      </div>

      <p style="font-size: 0.85em;"><strong>Performance (MTD):</strong> +4.2%<br>
      <strong>Performance (YTD):</strong> +12.8%</p>
    </div>

    <div style="margin-top: 30px; border: 1px solid #ccc; padding: 10px; font-size: 0.8em; color: #555; background: #fafafa; font-style: italic;">
      This statement is issued by Citco as an independent third party. Verification confirms the NAV and performance match the administrator's official books and records.
    </div>

    <div data-verify-line="nav" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Citco doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:citco.com/statements/v/NAV992288 <span data-bracket="end" data-for="nav">]</span>
    </div>
  </div>
</div>

## Data Verified

Fund name, investor name, account ID, period end date, Net Asset Value (NAV) per share, total units/shares held, ending capital balance, management/performance fees deducted, monthly/yearly performance %, issuing administrator name.

**Document Types:**
- **Monthly Capital Account Statement:** For hedge funds/private equity.
- **NAV Notice:** Daily/weekly updates for liquid alts.
- **Audit Confirmation:** (Linked hash) for year-end verification.
- **K-1 Tax Statement:** Proving the reported income to the IRS.

## Data Visible After Verification

Shows the issuer domain (`citco.com`, `ssctech.com`, `apexgroup.com`) and the statement standing.

**Status Indications:**
- **Final** — Statement matches the administrator's official month-end close.
- **Preliminary** — Subject to final pricing of illiquid assets.
- **Audited** — Figures match the year-end report from a Big 4 auditor.
- **Restated** — **ALERT:** A prior error was found; this statement is outdated.

## Second-Party Use

The **Investor (Limited Partner)** benefits from verification.

**Madoff Prevention:** Ensuring that the "Statement" the investor receives isn't a fake PDF created by the Fund Manager. By verifying the hash against the **Independent Administrator's** domain (e.g., `citco.com`), the investor has cryptographic proof that a neutral third party is actually calculating the NAV.

**Collateralized Loans:** Proving to a bank (e.g., Goldman or Morgan Stanley) that the $12.5M fund holding is verified and liquid. This allows high-net-worth individuals to borrow against their private equity holdings with 100% bank trust.

## Third-Party Use

**Prime Brokers / Lenders**
**Margin Calculation:** Instantly verifying the NAV of a fund's shares when those shares are pledged as collateral for a margin loan. OCR-to-hash ensures the borrower hasn't "Edited" the PDF to show a 20% higher value.

**External Auditors**
**Portfolio Confirmation:** During a multi-family office audit, scanning the hashes of 50 different fund investments to ensure the consolidated wealth statement is accurate.

**Tax Authorities (IRS)**
**Wealth Audit:** Verifying the "Cost Basis" and "Fair Market Value" of private holdings during a high-value estate or income tax audit.

## Verification Architecture

**The "Phantom Fund" Fraud Problem**

- **Self-Administration Fraud:** Fund managers writing their own "Statements" on fake administrator letterhead to hide massive losses or theft (The Bernie Madoff Pattern).
- **Valuation Padding:** Editing a PDF to change an "Estimated" value of a private company into a "Final" verified high value.
- **Fee Hiding:** Removing the line item for "Performance Fees" to make the net return look higher to potential new investors.

**Issuer Types**

**Third-Party Administrators (TPAs):** (Citco, SS&C, Northern Trust, Apex).
**Custodian Banks:** (BNY Mellon, State Street).
**Big 4 Auditors:** (For the annual "Audited NAV" hash).

## Competition vs. Investor Portals

| Feature | OCR-to-Hash | Investor Portal (CitcoOne) | Scanned PDF Statement |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Administrator. | **System-Bound.** Trust the portal vendor. | **Zero.** Easily forged. |
| **Integrity** | **Cryptographic.** Binds every digit. | **High.** Direct DB access. | **Vulnerable.** |
| **User Access** | **Universal.** Share with any bank/auditor. | **Restricted.** Lenders never get portal access. | **Universal.** |
| **Madoff Protection** | **High.** Separates Manager from Admin. | **Medium.** Manager might control the portal. | **Zero.** |

**Why OCR wins here:** The "External Leverage" reality. High-end investors move their money based on paper/PDF statements shared with banks and lawyers. These third parties **do not have logins** to the fund's private administrator portal. OCR-to-hash turns the **Private Statement** into a portable, cryptographically trusted asset that carries its own proof of truth.

