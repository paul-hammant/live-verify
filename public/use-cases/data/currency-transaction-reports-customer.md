---
title: "Currency Transaction Reports (CTR) - Customer Records"
category: "Financial Compliance"
volume: "Small"
retention: "5 years (IRS/FinCEN requirement)"
slug: "currency-transaction-reports-customer"
tags: ["aml", "ctr", "fincen-form-112", "bank-secrecy-act", "cash-transaction", "financial-compliance", "kyc"]
furtherDerivations: 1
---

## What is a CTR?

In the USA, if you walk into a bank and deposit more than $10,000 in cash, the bank **must** file a **Currency Transaction Report (CTR)** with the federal government (FinCEN).

This is the law's way of tracking money laundering and drug profits. The **Customer Receipt** is your proof that you followed the law.

Lenders and tax auditors use these verified receipts to prove that a large "Gift" or "Cash Income" is legitimate and was properly reported to the government. Verified hashes prevent people from "Editing" these receipts to hide the true scale of their cash business.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #002d62; color: #fff; padding: 20px; text-align: center;">
    <h2 style="margin: 0; font-size: 1.3em;" verifiable-text="start" data-for="ctr"><span>[</span>CURRENCY TRANSACTION REPORT</h2>
    <div style="font-size: 0.8em; margin-top: 5px;">FinCEN Form 112 • Official Customer Receipt</div>
  </div>
<div style="padding: 25px;">
    <div style="border-bottom: 2px solid #002d62; padding-bottom: 10px; margin-bottom: 20px;">
      <strong>Financial Institution:</strong> BANK OF AMERICA, N.A.<br>
      <strong>Branch:</strong> 402 Market St, San Francisco, CA<br>
      <strong>Date of Filing:</strong> March 15, 2026
    </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
      <p><strong>Part I: Person Conducting Transaction</strong></p>
      <p style="background: #f9f9f9; padding: 10px; border-left: 4px solid #002d62;">
        <strong>Name:</strong> JOHN JACOB DOE<br>
        <strong>SSN/ITIN:</strong> ***-**-1234<br>
        <strong>ID:</strong> CA Driver License #*******
      </p>
<p><strong>Part II: Transaction Details</strong></p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td>Cash-In (Deposit):</td>
          <td style="text-align: right; font-weight: bold;">$ 12,500.00</td>
        </tr>
        <tr>
          <td>Account Number:</td>
          <td style="text-align: right;">****-****-9982</td>
        </tr>
      </table>
    </div>
<p style="font-size: 0.8em; color: #777; font-style: italic; margin-top: 20px;">
      This report is filed in accordance with the Bank Secrecy Act. Submission ID: 9988776655.
    </p>
<div data-verify-line="ctr" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: FinCEN/Banks don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:bankofamerica.com/compliance/v/99887766 <span verifiable-text="end" data-for="ctr">]</span>
    </div>
  </div>
</div>

## Data Verified

Customer name, SSN/TIN (redacted), identifying document number, financial institution name/branch, cash-in/cash-out amount, account number (masked), date of transaction, FinCEN filing reference ID.

**Document Types:**
- **CTR Receipt:** Issued to the customer for their records.
- **FinCEN Form 112:** The official federal filing.
- **Exempt Person Filing:** For businesses that don't require regular CTRs.

## Data Visible After Verification

Shows the issuer domain (the Bank) and the filing status.

**Status Indications:**
- **Filed** — Report has been successfully transmitted to FinCEN.
- **Corrected** — Original filing was amended (e.g., due to amount correction).
- **Rejected** — Filing was returned by FinCEN for errors.
- **Void** — Transaction reversed; filing withdrawn.

## Second-Party Use

The **Bank Customer** benefits from verification.

**Tax Audit Defense:** If the IRS questions a large $12,500 cash deposit 3 years later, the customer can provide the verified CTR receipt. This proves they followed federal "Anti-Money Laundering" laws at the time of the transaction, separating legitimate cash income from "unreported" income.

**Source of Funds:** Proving to a real estate attorney or title company that a large cash downpayment was properly reported to the government, avoiding delays in closing.

## Third-Party Use

**The IRS / FinCEN**
**Audit Integrity:** During a bank examination, federal auditors can scan random customer-held CTR receipts. Verification ensures the bank isn't "Deleting" reports from their internal database while still giving receipts to customers.

**Real Estate Attorneys**
**Compliance Vetting:** Verifying the "Source of Funds" for cash buyers to ensure the money isn't being "Laundered" through un-reported cash deposits.

**Commercial Lenders**
**Risk Management:** For cash-intensive businesses (e.g., restaurants or laundromats), lenders can verify that the company is properly reporting its cash receipts to the government, reducing the bank's regulatory risk.

## Verification Architecture

**The "Structuring" Fraud Problem**

- **Report Deletion:** A corrupt bank employee taking a bribe to "Delete" a CTR from the federal system after the customer leaves the branch. OCR-to-hash prevents this by making the customer's paper receipt a verified link to the bank's domain record.
- **Amount Tampering:** A customer editing their $50,000 CTR receipt to read $5,000 to hide the true scale of a cash transaction from their spouse or an auditor.
- **Fake Receipts:** Fraudsters creating fake "CTR Filed" papers to trick a landlord or lender into thinking their illegal cash has been "cleansed" by government reporting.

**Issuer Types**

**Retail Banks & Credit Unions.**
**Casinos:** (Who must file CTRCs for large wins/losses).
**Money Service Businesses (MSBs).**

**Privacy Salt:** ABSOLUTELY CRITICAL. CTRs contain SSNs and large dollar amounts. The hash must be salted to prevent "Guess-and-Check" searches for people making large cash moves.

## Competition vs. Internal Bank Logs

| Feature | OCR-to-Hash | Bank Internal Log | Paper Receipt |
| :--- | :--- | :--- | :--- |
| **User Access** | **Universal.** Customer can show anyone. | **Zero.** Customers can't see the bank's AML logs. | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Bank. | **System-Bound.** | **Zero.** Easily forged. |
| **Integrity** | **Cryptographic.** Binds Name + Amount. | **High.** Direct DB. | **Vulnerable.** |
| **Portability** | **High.** Verified PDF works for any 3rd party. | **None.** Requires bank intervention. | **High.** |

**Why OCR wins here:** The "External Proof." A bank's internal log is useless to a customer who needs to prove their legitimacy to a third party (like an IRS auditor or a lawyer). OCR-to-hash turns the **Bank's Internal Truth** into a **Portable Legal Artifact** that the customer can use for their own protection.