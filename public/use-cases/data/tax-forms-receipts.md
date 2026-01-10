---
title: "Tax Forms and Wage Statements (W-2, 1099)"
category: "Financial & Legal Documents"
volume: "Very Large"
retention: "7-10 years (audit statute / social security lifecycle)"
slug: "tax-forms-receipts"
tags: ["tax", "w-2", "1099", "irs", "income-verification", "mortgage-underwriting", "tax-fraud", "wage-statement", "payroll-audit"]
furtherDerivations: 1
---

## What are Tax and Wage Statements?

In the US and many other nations, the **W-2 Wage and Tax Statement** (or its equivalent, like the P60 in the UK) is the official record of your annual income and the taxes withheld by your employer. It is the "Anchor of Truth" for your financial life.

Lenders use W-2s to approve mortgages, and tax authorities use them to verify your tax return. Fraud is rampant: criminals create "Synthetic W-2s" to claim fraudulent tax refunds, or they "edit" a real W-2 to inflate their income to qualify for a luxury home loan. Verified hashes bind the **Employee SSN, Total Wages, and Employer EIN** to the payroll provider's or the tax agency's domain (e.g., `adp.com`, `gusto.com`, or `irs.gov`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="tax">[</span>Form W-2 Wage and Tax Statement                               2025
═══════════════════════════════════════════════════════════════════

Employer EIN:           99-2288776        Control Number: CN-992288-XJ
Employer Name/Address:                    Employee SSN:   XXX-XX-1234
  ACME GLOBAL HUB, INC.
  123 FACTORY LANE, SPRINGFIELD, USA

───────────────────────────────────────────────────────────────────
1. WAGES, TIPS, OTHER COMPENSATION:                    $ 145,000.00
2. FEDERAL INCOME TAX WITHHELD:                        $  28,450.42
───────────────────────────────────────────────────────────────────

Employee Name:   JOHN D. SMITH
Address:         42 WALL STREET, NEW YORK, NY 10005

Verified extract of official payroll and tax record.

<span data-verify-line="tax">verify:adp.com/tax/v/W2-2025-SMITH1234</span> <span verifiable-text="end" data-for="tax">]</span></pre>
</div>

## Data Verified

Employer EIN, employer name, employee SSN (masked), employee name, tax year, total wages/tips, federal tax withheld, state tax withheld, Medicare/Social Security wages, control number, payroll provider ID.

**Document Types:**
- **W-2 Wage Statement:** The primary employee record.
- **1099-NEC / 1099-MISC:** For independent contractors and freelancers.
- **1098 Mortgage Interest Statement:** (Linked hash) for tax deductions.
- **Tax Return Transcript:** The official IRS summary of a filed return.

## Data Visible After Verification

Shows the issuer domain (`adp.com`, `gusto.com`, `irs.gov`) and the filing standing.

**Status Indications:**
- **Verified / Filed** — The record matches the official government and payroll data.
- **Corrected (W-2c)** — **ALERT:** An error was found; this version is void.
- **Unknown** — **CRITICAL:** Hash not found; high risk of "Synthetic W-2" fraud.
- **Amended** — A newer version of the tax return exists.

## Second-Party Use

The **Employee / Taxpayer** benefits from verification.

**Mortgage Approval Speed:** When applying for a loan, the employee shows the verified hash of their W-2. The lender can instantly see **"VERIFIED INCOME: $145,000"** from a trusted provider like ADP, bypassing the 3-day "Manual Employer Verification" call and getting the loan approved in minutes.

**Audit Protection:** A taxpayer can maintain a verified digital library of all past W-2s. During a tax audit, they can provide the verified hashes to the IRS to prove their income wasn't "fabricated" using a home printer.

## Third-Party Use

**Mortgage Lenders / Banks**
**Zero-Trust Underwriting:** Thousands of fake W-2s are submitted to banks every month. OCR-to-hash connects the underwriter directly to the payroll provider's domain, stopping "Income Inflation" fraud at the source and reducing loan default rates.

**Tax Authorities (IRS / State)**
**Refund Fraud Prevention:** Before issuing a $5,000 refund, the IRS scans the verified hash of the W-2 provided by the taxpayer. If it returns **"NOT FOUND"** or **"WAGES: $0,"** the refund is blocked, stopping "Identity Theft Refund Fraud" (ITRF).

**HR & Recruiting Firms**
**Background Vetting:** Verifying that a candidate's "Previous Salary" claim is an accurate, tax-reported fact rather than a negotiation fabrication.

## Verification Architecture

**The "Synthetic Income" Fraud Problem**

- **Income Padding:** Editing a $45,000 W-2 to read $145,000 to qualify for a larger credit limit.
- **Ghost Employers:** Creating a fake company EIN and printing W-2s for a person who never worked there.
- **Filing Omission:** Submitting a W-2 to a bank that was never actually filed with the IRS.

**Issuer Types**

**Payroll Processors (ADP, Workday, Gusto).**
**National Tax Agencies (IRS, HMRC).**
**Large Corporate HR Portals.**

**Privacy Salt:** EXTREMELY CRITICAL. Tax data is governed by strict privacy laws (Section 6103 in the US). The hash MUST be salted to prevent "Mass Income Scraping" of the tax-paying population.

## Rationale

Tax forms are the "Financial DNA" of a citizen. By turning wage statements into verifiable digital bridges, we protect the mortgage market from defaults and the government from the multi-billion dollar cost of refund fraud.