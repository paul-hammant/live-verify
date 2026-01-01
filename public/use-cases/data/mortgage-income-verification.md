---
title: "Mortgage Income Verification (W-2, Pay Stubs)"
category: "Real Estate & Property"
volume: "Large"
retention: "7-10 years (loan term + disputes)"
slug: "mortgage-income-verification"
tags: ["mortgage-underwriting", "income-verification", "paystub", "w-2", "loan-approval", "fannie-mae-compliance", "real-estate-finance", "fraud-prevention"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', Courier, monospace; border: 1px solid #ccc; background: #fdfdfd; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
  <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
    <div style="font-weight: bold; font-size: 1.2em;">ACME GLOBAL HUB, INC.</div>
    <div style="text-align: right;">
      Earnings Statement<br>
      Period: 03/01/26 - 03/15/26
    </div>
  </div>

  <div style="font-size: 0.9em; line-height: 1.4;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
      <div>
        <strong>Employee:</strong> <span data-bracket="start" data-for="income">]</span><strong>JOHN JACOB DOE</strong><br>
        <strong>Address:</strong> 123 Maple St, Anytown, USA
      </div>
      <div style="text-align: right;">
        <strong>Emp ID:</strong> 992288<br>
        <strong>Pay Date:</strong> 03/15/2026
      </div>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
      <tr style="border-bottom: 1px solid #000; font-weight: bold;">
        <th style="text-align: left;">Earnings Description</th>
        <th style="text-align: right;">Hours</th>
        <th style="text-align: right;">Current Amount</th>
        <th style="text-align: right;">YTD Amount</th>
      </tr>
      <tr>
        <td style="padding: 5px 0;">Regular Salary</td>
        <td style="text-align: right;">80.00</td>
        <td style="text-align: right;">$ 6,041.67</td>
        <td style="text-align: right;">$ 30,208.35</td>
      </tr>
      <tr>
        <td style="padding: 5px 0;">Bonus / Incentive</td>
        <td style="text-align: right;">-</td>
        <td style="text-align: right;">$ 500.00</td>
        <td style="text-align: right;">$ 1,500.00</td>
      </tr>
      <tr style="border-top: 2px solid #000; font-weight: bold;">
        <td colspan="2">NET PAY DISTRIBUTION:</td>
        <td style="text-align: right; color: #2e7d32;">$ 4,850.42</td>
        <td style="text-align: right;">$ 24,252.10</td>
      </tr>
    </table>

    <div style="background: #eee; padding: 10px; font-size: 0.8em; font-style: italic; text-align: center;">
      Verification confirms the earnings and withholdings match the employer's certified payroll ledger.
    </div>

    <div data-verify-line="income" style="border-top: 1px dashed #999; margin-top: 25px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Acme Corp doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:acme-global.com/payroll/v/992288-2026-05 <span data-bracket="end" data-for="income">]</span>
    </div>
  </div>
</div>

## Data Verified

Employee name, SSN/TIN (redacted), employer name, pay period dates, gross earnings, net pay, itemized withholdings (Taxes/401k), Year-to-Date (YTD) totals, issuing payroll provider ID, date of payment.

**Document Types:**
- **Pay Stub (Earnings Statement):** The primary bi-weekly income proof.
- **W-2 Wage & Tax Statement:** For annual aggregate verification.
- **1099-NEC / 1099-MISC:** For independent contractors.
- **Verification of Income (VOI):** Formal summary from HR.

## Data Visible After Verification

Shows the issuer domain (`adp.com`, `gusto.com`, `acme-global.com`) and current record status.

**Status Indications:**
- **Verified** — Pay details match the official payroll system ledger.
- **Amended** — A correction was issued for this pay period.
- **Final** — (For W-2) Statement matches the federal filing with the IRS.
- **Void** — Check/ACH reversed due to error or fraud.

## Second-Party Use

The **Borrower (Employee)** benefits from verification.

**Mortgage Pre-Approval:** Proving to a lender that their $145,000/year salary claim is a verified fact. A verified hash from the employer's domain allows the underwriter to trust the "Pay Stub" instantly, bypassing the 3-day manual "Verbal VOE" process.

**Auto / Personal Loans:** Proving income stability to a lender without having to wait for their HR department to return a phone call. The verified PDF acts as an "Instant Proof of Funds."

## Third-Party Use

**Mortgage Underwriters**
**Zero-Trust Vetting:** Income fraud is the most common cause of mortgage failure. OCR-to-hash ensures the applicant hasn't "Photoshopped" a $4,000 net pay into a $14,000 net pay. Underwriters can scan the hash to see the real number from the payroll provider's domain.

**Fannie Mae / Freddie Mac Auditors**
**Portfolio Audit:** Instantly verifying the "Quality of Income" in a pool of 10,000 loans by scanning the original pay stub hashes.

**Government Agencies (IRS / HUD)**
**Anti-Fraud Enforcement:** Ensuring that income claims made for government-backed loans or tax credits match the verified corporate records.

## Verification Architecture

**The "Income Padding" Fraud Problem**

- **Numerical Tampering:** Editing a PDF paystub to change a $2,000 net pay to $12,000 to qualify for a larger home.
- **YTD Inflation:** Increasing the "Year-to-Date" total to hide that the borrower was recently unemployed for 6 months.
- **Fabricated Employers:** Creating a fake company website and fake paystubs to "Verify" that an unemployed person has a high-paying job.

**Issuer Types**

**Payroll Processors:** (ADP, Gusto, Paychex, Rippling).
**Corporate HR Depts:** (Hosting on their own `/payroll` domain).
**Tax Portals.**

**Privacy Salt:** ABSOLUTELY CRITICAL. Salary and tax data is highly sensitive. The hash MUST be salted to prevent "Brute Force" searching of a company's entire payroll to see who makes the most money.

## Competition vs. The Work Number (Equifax)

| Feature | OCR-to-Hash | The Work Number | Scanned PDF / Paper |
| :--- | :--- | :--- | :--- |
| **User Privacy** | **High.** Employee shares only the *Single Paystub*. | **Low.** Lenders see full historical data pool. | **High.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Employer. | **Data-Bound.** Trust the aggregator. | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** Works for any small firm with a URL. | **Limited.** Only for large firms who pay for TWN. | **Universal.** |
| **Cost** | **Low.** Standard web infra. | **Very High.** Lenders pay $50-$100 per check. | **None.** |

**Why OCR wins here:** The "Local Business" reality. Millions of people work for small firms that aren't on "The Work Number." They rely on "Persistent Paper" paystubs. OCR-to-hash turns those **Manual Artifacts** into "Fortune 500" level trust artifacts, bringing modern security to the entire housing economy.
