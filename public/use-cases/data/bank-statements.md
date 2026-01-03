---
title: "Bank Statements"
category: "Banking & Payments"
volume: "Medium"
retention: "7-10 years (loan term + disputes)"
slug: "bank-statements"
tags: ["bank", "statement", "finance", "mortgage", "kyc", "aml"]
furtherDerivations: 1
---

## What is a Bank Statement?

A **Bank Statement** is the ultimate proof of wealth. It shows exactly how much money you have and where it came from.

Lenders use them to approve mortgages. Governments use them to approve Visas. Fraudsters use "Inspect Element" or Photoshop to turn a $500 balance into $50,000 in seconds.

Verifying a bank statement directly against the bank's domain ensures that the balance on the page is the **truth**, without forcing the user to give their bank password to a risky "data scraping" app.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <div style="background: #004a99; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;">CHASE 🟦</div>
      <div style="font-size: 0.8em;">JPMorgan Chase Bank, N.A.</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.9em;">Page 1 of 4</div>
    </div>
  </div>

  <div style="padding: 30px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
      <div>
        <strong>Account Holder:</strong><br>
        <span data-bracket="start" data-for="bank">]</span><strong>WAYNE ENTERPRISES, INC.</strong><br>
        1007 Mountain Drive<br>
        Gotham City, NY 10001
      </div>
      <div style="text-align: right;">
        <strong>Account Number:</strong><br>
        ****-****-9982<br>
        <strong>Period:</strong> Mar 01 - Mar 31, 2026
      </div>
    </div>

    <h3 style="border-bottom: 2px solid #004a99; padding-bottom: 5px;">ACCOUNT SUMMARY</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr>
        <td style="padding: 8px 0;">Beginning Balance</td>
        <td style="text-align: right;">$ 1,250,000.42</td>
      </tr>
      <tr>
        <td style="padding: 8px 0;">Deposits and Additions</td>
        <td style="text-align: right;">$ 450,000.00</td>
      </tr>
      <tr>
        <td style="padding: 8px 0;">Withdrawals and Debits</td>
        <td style="text-align: right;">-$ 200,000.00</td>
      </tr>
      <tr style="font-weight: bold; border-top: 1px solid #004a99;">
        <td style="padding: 8px 0;">ENDING BALANCE</td>
        <td style="text-align: right;">$ 1,500,000.42</td>
      </tr>
    </table>

    <div style="font-size: 0.8em; color: #555; font-style: italic;">
      Verification protects every line of this statement. Alteration of balances is a federal crime.
    </div>

    <div data-verify-line="bank" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Chase doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:chase.com/statements/v/x9y8z7 <span data-bracket="end" data-for="bank">]</span>
    </div>
  </div>
</div>

## Data Verified

Account holder name, account number (masked), ending balance, total deposits, total withdrawals, statement date range, issuing branch/entity.

**Document Types:**
- **Monthly Account Statement:** Standard retail/commercial proof.
- **Verification of Deposit (VOD):** 1-page summary for lenders.
- **Transaction Receipt:** For high-value wires or transfers.

## Data Visible After Verification

Shows the issuer domain (`chase.com`, `wellsfargo.com`) and the account standing.

**Status Indications:**
- **Verified** — Statement content matches the bank's snapshot.
- **Amended** — A correction was issued for this period.
- **Inactive** — Account has been closed since this statement was issued.

## Second-Party Use

The **Bank Customer** benefits from verification.

**Mortgage Applications:** Proving to a lender that the $1.5M balance isn't a "Photoshopped PDF" but is a verified asset. This speeds up the "Pre-Approval" process significantly.

**Business Partnerships:** Proving financial liquidity to a new supplier or partner without giving them direct login access to the bank account.

**Dispute Resolution:** If a transaction is "missing" from the bank's internal record later, the verified statement serves as cryptographic proof of what the bank previously attested to.

## Third-Party Use

**Mortgage Lenders / Underwriters**
**Asset Verification:** Lenders currently use manual "bank login" scrapers (like Plaid) which many users find invasive. OCR-to-hash allows the user to simply send a PDF/Paper statement that the lender can trust without needing the user's password.

**Regulators (The Fed / FDIC)**
**Systemic Audit:** Regulators receiving a feed of statement hashes can verify that the bank isn't "running two sets of books" (i.e., telling the customer they have $1M but telling the regulator they only have $100k).

**M&A Due Diligence**
**Liquidity Verification:** Buyers in a corporate acquisition can instantly verify the target company's cash-on-hand claims by scanning recent statements.

## Verification Architecture

**The "Photoshopped Balance" Fraud Problem**

- **Balance Inflation:** Changing a $5,000 balance to $50,000 to qualify for a loan.
- **Transaction Deletion:** Removing a large "Gambling Withdrawal" or "IRS Penalty" from the statement before sending it to a landlord.
- **Fabricated Statements:** Using a realistic-looking template to create a statement for a non-existent account at a real bank.

**Issuer Types**

**Retail Banks:** (Chase, BofA, HSBC).
**Neobanks:** (Revolut, Monzo, Chime).
**Brokerage Firms:** (Schwab, Fidelity).

## Competition vs. Open Banking (Plaid/Finicity)

| Feature | OCR-to-Hash | Open Banking (Plaid) | Paper / Scanned PDF |
| :--- | :--- | :--- | :--- |
| **Privacy** | **High.** No passwords shared. No data scraping. | **Low.** Requires bank password; scrapes full history. | **Medium.** But untrusted. |
| **Integrity** | **Cryptographic.** Every line is protected. | **High.** Direct API access. | **Zero.** Easily edited. |
| **User Control** | **High.** User chooses which statement to share. | **Low.** Once linked, the app has continuous access. | **High.** |
| **Interoperability** | **Universal.** Works for any bank with a domain. | **Limited.** Only works for banks on the Plaid network. | **Manual.** |

**Why OCR wins here:** Trust without Intrusion. Many high-net-worth individuals and privacy-conscious users refuse to give their bank passwords to third-party "scrapers." OCR-to-hash provides the **same level of trust** as an API, but preserves the user's security and privacy.
