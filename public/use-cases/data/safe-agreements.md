---
title: "SAFE Agreements (Simple Agreement for Future Equity)"
category: "Investment & Fintech"
volume: "Small"
retention: "Permanent (convertible security lifecycle)"
slug: "safe-agreements"
tags: ["venture-capital", "startup-funding", "safe-agreement", "y-combinator", "convertible-equity", "cap-table-integrity", "investment-fraud", "equity-financing"]
furtherDerivations: 1
---

## What is a SAFE Agreement?

A **Simple Agreement for Future Equity (SAFE)** is the standard contract used by Silicon Valley startups to raise "Seed" capital. An investor gives the company cash now (e.g., $500,000) in exchange for the right to receive shares later, when the company raises a "Priced Round" (Series A). It is a convertible security governed by a **Valuation Cap** and a **Discount Rate**.

These documents are the "Keys to the Cap Table." Fraud is high-stakes: a founder might "edit" a SAFE to change a $10M valuation cap to a $20M cap before showing it to a new investor, effectively stealing equity from the original backer. Similarly, a founder might "hide" an existing SAFE to make the company look more attractive to a buyer. Verified hashes bind the **Valuation Cap, Purchase Amount, and Investor Name** to the startup's or the law firm's domain (e.g., `stripeatlas.com` or `ycombinator.com`).

<div style="max-width: 650px; margin: 24px auto; font-family: 'Times New Roman', Times, serif; border: 1px solid #999; background: #fff; padding: 50px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.4em; text-transform: uppercase; letter-spacing: 1px;" verifiable-text="start" data-for="safe">Simple Agreement for Future Equity</div>
    <div style="font-size: 1em; font-style: italic;">(Post-Money Valuation Cap)</div>
  </div>
<div style="font-size: 1.1em; line-height: 1.6; color: #000; text-align: justify;">
    <p>THIS CERTIFIES THAT in exchange for the payment by <span style="text-decoration: underline;">SEQUOIA CAPITAL</span> (the "Investor") of <strong>$ 1,000,000.00</strong> (the "Purchase Amount") on March 15, 2026,</p>
<p><strong>VERIFIC INC.</strong> (the "Company"), a Delaware corporation, hereby issues to the Investor the right to certain shares of the Company's Capital Stock, subject to the terms set forth below.</p>
<div style="margin: 25px 0; border: 2px solid #000; padding: 20px; background: #fdfdfd;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding-bottom: 10px;"><strong>Post-Money Valuation Cap:</strong></td>
          <td style="text-align: right; font-weight: bold; padding-bottom: 10px;">$ <span>[</span>20,000,000.00</td>
        </tr>
        <tr>
          <td><strong>Discount Rate:</strong></td>
          <td style="text-align: right; font-weight: bold;">20.0 %</td>
        </tr>
      </table>
    </div>
<p style="font-size: 0.9em; font-style: italic; color: #444;">"This SAFE is one of a series of SAFEs issued by the Company. Any unauthorized alteration of the Valuation Cap or Discount Rate renders this instrument void."</p>
  </div>
<div style="margin-top: 50px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 40%;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-size: 0.8em; font-style: italic;">Founder Signature</div>
    </div>
    <div style="text-align: right; width: 40%;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-size: 0.8em; font-style: italic;">Investor Signature</div>
    </div>
  </div>
<div style="padding: 20px; background: #f9f9f9; border: 1px dashed #999; margin-top: 40px; text-align: center;">
    <div data-verify-line="safe" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #000; font-weight: bold;"
      title="Demo only: Startup law firms don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:verific.io/safe/v/SEQ2026-9922 <span verifiable-text="end" data-for="safe">]</span>
    </div>
    <div style="font-size: 0.7em; color: #666; margin-top: 10px;">
      Scan to verify equity conversion terms, view the signed board resolution, and check for 'Pro-Rata Right' side letters.
    </div>
  </div>
</div>

## Data Verified

Purchase amount, valuation cap (post-money or pre-money), discount rate, investor name, company name (jurisdiction), date of issuance, series ID, side letter status (Yes/No), board authorization ID, law firm file reference.

**Document Types:**
- **Post-Money SAFE:** The modern YC standard.
- **Pre-Money SAFE:** Used in older or specialized rounds.
- **Convertible Note:** (Linked hash) debt that converts to equity.
- **Pro-Rata Side Letter:** Proving the investor's right to maintain ownership.

## Data Visible After Verification

Shows the issuer domain (`verific.io`, `ycombinator.com`, `stripe.com`) and the security standing.

**Status Indications:**
- **Outstanding / Valid** — The SAFE is authentic and awaiting conversion.
- **Converted** — **ALERT:** This SAFE has already been converted into Series A Preferred stock.
- **Amended** — **ALERT:** Terms have been changed via a subsequent agreement.
- **Rescinded** — **CRITICAL:** The investment was returned or cancelled due to breach.

## Second-Party Use

The **Startup Founder** benefits from verification.

**Investor Relations:** When raising a "Bridge Round," the founder can provide the verified hashes of all existing SAFEs to new investors. "Verified by Y Combinator" or "Verified by Wilson Sonsini" ensures the new investors that the "Cap Table" isn't a fabrication, removing the "Due Diligence" friction and closing the round faster.

**Banking Compliance:** Proving the "Source of Funds" to a bank after a $5M seed raise. A verified SAFE hash allows the bank to see the legitimate venture capital source, preventing an AML (Anti-Money Laundering) account freeze.

## Third-Party Use

**Venture Capital Firms (The Investors)**
**Portfolio Auditing:** A VC fund managing 500 startups can automatically scan the verified hashes of every SAFE in their vault. Verification ensures that the startups haven't "Quietly edited" the valuation caps in their internal files, protecting the fund's limited partners (LPs).

**M&A Law Firms**
**Due Diligence:** During the acquisition of a startup, the buyer's lawyers scan the verified hashes of every equity instrument. This ensures that there are no "Hidden SAFEs" that will "pop up" and dilute the buyer after the deal closes.

**Secondary Markets (e.g., Forge / EquityZen)**
**Vetting Integrity:** Verifying the "Terms of Conversion" for a SAFE before allowing it to be traded on a secondary platform.

## Verification Architecture

**The "Cap Table Padding" Fraud Problem**

- **Valuation Cap Inflation:** Changing a "$5M cap" to a "$15M cap" on a PDF to trick a new investor into accepting a higher price.
- **Side Letter Hiding:** Removing a "Pro-Rata Right" or a "Most Favored Nation" (MFN) clause from a PDF before showing it to a buyer.
- **Duplicate Issuance:** Selling the same 10% of the company to two different investors using two separate SAFE documents.

**Issuer Types**

**Startup ERPs (Carta, Pulley, AngelList).**
**Startup Law Firms.**
**Venture Accelerators (Y Combinator, Techstars).**

**Privacy Salt:** Highly Critical. Investment amounts and valuation caps are sensitive "Trade Secrets." The hash must be salted and access restricted to authorized investors and legal counsel.

## Rationale

SAFEs are the "Digital Contracts" of the innovation economy. By turning them into verifiable digital bridges, we protect the integrity of the cap table and ensure that "Ownership" is based on the digital truth of the deal, not the creative editing of a founder.