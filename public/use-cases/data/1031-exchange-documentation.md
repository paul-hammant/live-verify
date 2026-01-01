--- 
title: "1031 Exchange Documentation"
category: "Real Estate & Property"
volume: "Very Small"
retention: "7-10 years (IRS audit)"
slug: "1031-exchange-documentation"
tags: ["1031", "exchange", "documentation", "real", "estate", "property", "tax"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #999; box-shadow: 2px 2px 10px rgba(0,0,0,0.1); background: #fff; padding: 0;">
  <div style="padding: 30px 40px; text-align: left;">
    <div style="border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <div style="font-size: 1.2em; font-weight: bold; text-transform: uppercase;">Equitable Exchange Services, Inc.</div>
        <div style="font-size: 0.8em; color: #555;">A Qualified Intermediary</div>
      </div>
      <div style="font-size: 0.8em;">QI License: #99-2342-CA</div>
    </div>

    <h2 style="font-size: 1.4em; text-align: center; margin: 20px 0; text-decoration: underline;">IDENTIFICATION OF REPLACEMENT PROPERTY</h2>

    <div style="font-size: 0.95em; line-height: 1.5; color: #333;">
      <p><strong>Exchanger:</strong> <span data-bracket="start" data-for="1031">]</span>Robert & Mary Smith Trust<br>
      <strong>Relinquished Property:</strong> 123 Oak Street, Springfield, IL<br>
      <strong>Date of Transfer:</strong> January 15, 2026</p>

      <p>Pursuant to Section 1031 of the Internal Revenue Code, the Exchanger hereby identifies the following replacement properties:</p>

      <ol>
        <li>456 Maple Avenue, Chicago, IL (FMV: $450,000)</li>
        <li>789 Pine Lane, Evanston, IL (FMV: $525,000)</li>
        <li>101 Cedar Drive, Naperville, IL (FMV: $475,000)</li>
      </ol>

      <p><strong>Identification Date:</strong> February 20, 2026 (Within 45-day period)</p>
    </div>

    <div style="margin-top: 40px; display: flex; justify-content: space-between;">
      <div style="border-top: 1px solid #000; width: 45%; padding-top: 5px; font-size: 0.8em;">Exchanger Signature</div>
      <div style="border-top: 1px solid #000; width: 45%; padding-top: 5px; font-size: 0.8em;">Qualified Intermediary Signature</div>
    </div>

    <div data-verify-line="1031" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: This is an illustrative example of the verification line">
      verify:equitable-exchange.com/v/8d7s9f <span data-bracket="end" data-for="1031">]</span>
    </div>
  </div>
</div>

## Data Verified

Exchanger name, relinquished property address, date of transfer, identified replacement properties (addresses and fair market values), identification date, Qualified Intermediary (QI) name and license.

**Document Types:**
- **Identification of Replacement Property** (45-day rule compliance)
- **Exchange Agreement**
- **Closing Statements** (HUD-1/ALTA) for both legs
- **Qualified Intermediary Resignation/Assignment**

## Data Visible After Verification

Shows the issuer domain (the Qualified Intermediary) and the responder text.

**Status Indications:**
- **Valid** — Document authentic, QI confirms structure is active/completed.
- **Void** — Exchange failed or was cancelled.
- **Amended** — Superseded by a later identification form (within the 45-day window).

## Second-Party Use

The **Exchanger** (taxpayer) benefits from verification.

**Audit Defense:** In an IRS audit 3 years later, the taxpayer can prove the "Identification of Replacement Property" form was indisputably created and received by the QI within the 45-day statutory window, preventing the IRS from disqualifying the exchange for "backdating" documents.

**Lender Requirements:** Proving to a lender for the replacement property that the down payment funds are legitimately coming from a 1031 exchange escrow and are not a loan.

**Title Company Coordination:** Ensuring the closing agent has the authentic exchange instructions to properly route funds.

## Third-Party Use

**IRS and Tax Authorities**

**Audit Verification:** Agents can instantly verify the authenticity and timestamp of the identification form. 1031 exchanges are high-risk audit targets; verifying that the identification list wasn't fabricated retroactively is a primary check.

**Qualified Intermediaries (QIs)**

**Internal Compliance:** Verifying their own historical documents when staff changes occur or when responding to subpoenas.

**Lenders and Financial Institutions**

**Source of Funds:** Underwriters need to verify that large incoming wires are non-debt funds from a property sale. Verified 1031 docs prove the source and tax-deferred status (impacting debt-to-income ratios since capital gains tax isn't due).

**Title and Escrow Companies**

**Settlement Accuracy:** Closing agents must follow strict instructions from the QI. Verifying the exchange agreement ensures they are paying the proceeds to the QI, not the seller (which would bust the exchange).

## Verification Architecture

**The 1031 Exchange Fraud Problem**

- **Backdating:** The most common fraud. Taxpayers missing the 45-day identification deadline and creating a document dated earlier.
- **Fake QIs:** Fraudsters setting up fake QI websites to steal exchange funds (which must be held by a third party).
- **Alteration:** Changing the property list after the fact to include the property actually purchased.

**Issuer Types**

**Qualified Intermediaries (QIs):** Specialized non-bank financial institutions that hold funds.
**Exchange Accommodators:** Entities handling reverse exchanges.

**Integration:** QIs can integrate hash generation into their document management portals (e.g., Exchange Manager Pro).

## Competition vs. QR/NFC

| Feature | OCR-to-Hash | QR Code |
| :--- | :--- | :--- |
| **Audit Trail** | **Superior.** The paper document itself is the artifact. The hash proves the *content* of the paper existed at the timestamp. | **Weak.** QR codes are often just links. They don't inherently prove the *text* surrounding them hasn't changed unless the QR contains the full text (too large). |
| **Professionalism** | **High.** A discreet `verify:` line at the bottom of a legal letter looks standard. | **Low.** A giant QR code on a formal legal designation letter looks out of place. |
| **Longevity** | **High.** Text is durable. | **Medium.** QR codes can be damaged by folding, stapling, or scanning/copying degradation. |
| **Privacy** | **High.** No data leaked until the specific hash is queried. | **Variable.** If the QR encodes the data, anyone with a camera can read it instantly without an audit trail. |

**Why OCR wins here:** 1031 documents are heavily scrutinized legal instruments. They need to look like contracts, not shipping labels. The primary "user" is often an IRS auditor years later, working from a scanned PDF or photocopy where a QR code might be illegible, but text is readable and re-typable if needed.
