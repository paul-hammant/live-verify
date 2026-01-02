---
title: "SAFE agreements (Simple Agreement for Future Equity)"
category: "Investment & Fintech"
volume: "Very Small"
retention: "Permanent (convertible security)"
slug: "safe-agreements"
tags: ["safe", "agreements", "banking", "financial", "services"]
---

## What is a SAFE?

A **Simple Agreement for Future Equity (SAFE)** is the standard way Silicon Valley startups raise money. Investors give cash now (e.g., $100k) for the right to get shares later (when the company grows).

Because these are private contracts (often just PDFs), fraud is rampant. A founder might sell 50% of their company to Investor A, then "forget" to tell Investor B and sell the same 50% again.

**Verified SAFEs** lock the terms (Valuation Cap, Discount) into a hash. Investors can scan the document to confirm their $100k actually purchased the equity they were promised, and that the "Cap Table" is accurate.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', serif; border: 1px solid #999; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.4em; text-transform: uppercase;">Simple Agreement for Future Equity</div>
    <div style="font-size: 1em; font-style: italic;">(SAFE)</div>
  </div>

  <div style="font-size: 1.1em; line-height: 1.6; color: #000;">
    <p><strong>THIS CERTIFIES THAT</strong> in exchange for the payment by <span style="text-decoration: underline;">Sequoia Capital</span> (the "Investor") of $ <span style="text-decoration: underline;">1,000,000.00</span> (the "Purchase Amount") on <span style="text-decoration: underline;">January 15, 2026</span>,</p>

    <p><strong>Verific Inc.</strong> (the "Company"), hereby issues to the Investor the right to certain shares of the Company's Capital Stock, subject to the terms set forth below.</p>

    <div style="margin: 20px 0; border: 1px solid #000; padding: 15px;">
      <table style="width: 100%;">
        <tr>
          <td style="padding-bottom: 10px;"><strong>Valuation Cap:</strong></td>
          <td style="text-align: right; padding-bottom: 10px;">$ <span data-bracket="start" data-for="safe">]</span>20,000,000.00</td>
        </tr>
        <tr>
          <td><strong>Discount Rate:</strong></td>
          <td style="text-align: right;">20%</td>
        </tr>
      </table>
    </div>

    <p>This SAFE is one of a series of such instruments issued by the Company. Any unauthorized alteration of the Valuation Cap or Purchase Amount shall render this instrument void.</p>
  </div>

  <div style="margin-top: 40px; display: flex; justify-content: space-between;">
    <div style="border-top: 1px solid #000; width: 45%; padding-top: 5px;">
      <div style="font-size: 0.9em;">Paul Graham</div>
      <div style="font-size: 0.8em; font-style: italic;">Founder, Verific Inc.</div>
    </div>
    <div style="border-top: 1px solid #000; width: 45%; padding-top: 5px;">
      <div style="font-size: 0.9em;">Roelof Botha</div>
      <div style="font-size: 0.8em; font-style: italic;">Partner, Sequoia Capital</div>
    </div>
  </div>

  <div data-verify-line="safe" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
    title="Demo only: YC SAFE platform doesn't yet offer verification&#10;endpoints, so this is illustrative">
    verify:ycombinator.com/safe/v/2881992 <span data-bracket="end" data-for="safe">]</span>
  </div>
</div>


Investor name, company, investment amount, valuation cap, discount

**Multi-Page Handling:** Documents may span multiple pages. Per-page verification prevents page substitution attacks.

## Data Visible After Verification

Shows the issuer domain and the responder text (e.g., "Valid ID" or "Denied").

**Status Indications:**
- **Valid** - Document verified and current
- **Expired** - Document has reached expiration
- **Revoked** - Document has been revoked or cancelled
- **Superseded** - A newer version exists

The verification response may include additional context such as issue date, expiration date, or document serial numbers.

## Second-Party Use

The document holder (subject/recipient) benefits from verification.

**Record Verification:** Confirm financial documents match expectations.

**Tax Preparation:** Provide verified documentation for tax filing.

**Audit Support:** Maintain verified records for potential audits.

**Dispute Resolution:** Use verified documents to resolve discrepancies.

**Loan Applications:** Present verified financial documentation to lenders.

## Third-Party Use

**Regulators and Oversight Bodies**

Regulatory compliance and oversight:

**Systematic Hash Receipt:** Receive hashes in bulk for regulatory oversight.

**Audit Verification:** Verify documents during routine or targeted audits.

**Compliance Monitoring:** Monitor issuer compliance with documentation requirements.

**Investigation Support:** Verify documents during fraud or compliance investigations.

**Consumer Protection:** Verify consumer-facing documents for protection enforcement.

**Lenders and Financial Institutions**

Credit underwriting and risk assessment:

**Loan Underwriting:** Verify financial and property documents during loan applications.

**Collateral Verification:** Confirm documentation for secured lending.

**Credit Decisions:** Validate income, employment, and asset documentation.

**Insurance Requirements:** Verify insurance coverage for loan requirements.

**Fraud Prevention:** Detect fraudulent documentation in loan applications.

**Courts and Legal Professionals**

Litigation and legal proceedings:

**Evidence Authentication:** Verify documents submitted as evidence.

**Discovery Verification:** Confirm authenticity of documents in discovery.

**Dispute Resolution:** Validate contested documents in litigation.

**Due Diligence:** Verify documentation in transactions and investigations.

**Expert Testimony:** Support expert opinions with verified documentation.

## Verification Architecture

**The SAFE agreements (Simple Agreement for Future Equity) Fraud Problem**

Document fraud creates significant risks:

- **Fabrication:** Entirely fake documents created from scratch
- **Alteration:** Genuine documents with modified content (dates, amounts, names)
- **Impersonation:** Documents falsely claiming to be from legitimate issuers
- **Expired/Revoked Documents:** Presenting invalid documents as current
- **Income Inflation:** Inflating income or assets on financial documents
- **Photoshop Fraud:** Digital manipulation of statements and documents
- **Shell Company Documents:** Documents from fake or shell entities

OCR-to-hash verification addresses fake and altered documents. Domain binding confirms the claimed issuer actually issued the document.

**Issuer Types**

Who issues these documents and operates verification endpoints?

**Banks and Credit Unions:** Depository institutions for account documents.

**Investment Firms:** Brokerage and investment management firms.

**Insurance Companies:** Insurers for policy and claims documents.

**Accounting Firms:** CPAs and audit firms for financial statements.

**System Integration**

Verification integrates with relevant systems:

**Issuer Systems:** Core operational systems generate verification hashes at document creation.

**Industry Standards:** Existing data standards extended to include verification.

**Regulatory Systems:** Government databases for systematic hash receipt and oversight.

**Third-Party Platforms:** Industry portals and platforms enable verification access.

## Rationale

Prevents fake SAFE agreements (startup fraud). Domain binding verifies startup/platform. Tamper-evident investment terms. Conversion event verification. Cap table integrity. High-value convertible securities.
