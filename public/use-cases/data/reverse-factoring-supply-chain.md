---
title: "Reverse Factoring (Supply Chain Finance) Documentation"
category: "Trade Finance"
volume: "Small"
retention: "7-10 years (audit trail / financial cycle)"
slug: "reverse-factoring-supply-chain"
tags: ["supply-chain-finance", "reverse-factoring", "trade-finance", "invoice-financing", "ar-audit", "corporate-treasury", "banking-fraud", "supplier-payment"]
derivations: 1
furtherDerivations: 1
---

## What is Reverse Factoring?

In high-volume supply chains, **Reverse Factoring** (or Supply Chain Finance) allows a supplier to get paid early by a bank, based on the credit rating of their massive buyer (e.g., Apple, Walmart, or Boeing). The bank pays the supplier $98 today for a $100 invoice, and the buyer pays the bank $100 in 60 days.

These documents are the "Trade Collateral." Fraud is high-stakes: a dishonest supplier might create "Phantom Invoices" using a buyer's branding to trick a bank into releasing multimillion-dollar early payments. Similarly, they might "double-factor" the same invoice at two different banks. Verified hashes bind the **Invoice ID, Approved Amount, and Payment Date** to the funding bank's or the buyer's domain (e.g., `citidirect.com` or `hsbc.com`).

<div style="max-width: 650px; margin: 24px auto; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #004a99; color: #fff; padding: 25px; display: flex; justify-content: space-between; align-items: center; border-bottom: 4px solid #000;">
    <div>
      <div style="font-weight: bold; font-size: 1.4em; letter-spacing: 1px;">CITI SUPPLY CHAIN FINANCE</div>
      <div style="font-size: 0.8em; opacity: 0.9;">Trade & Working Capital Solutions</div>
    </div>
    <div style="text-align: right;">
      <div style="font-weight: bold; font-size: 0.9em;">APPROVAL ADVICE</div>
      <div style="font-size: 0.7em;">Batch: <span data-bracket="start" data-for="factor">]</span>SCF-2026-992288</div>
    </div>
  </div>

  <div style="padding: 25px;">
    <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; font-size: 0.9em; line-height: 1.5; margin-bottom: 25px; border-bottom: 1px solid #eee; padding-bottom: 15px;">
      <div>
        <strong>Buyer:</strong> GOLIATH AEROSPACE CORP.<br>
        <strong>Supplier:</strong> PRECISION PARTS LTD.<br>
        <strong>Supplier ID:</strong> #992288-XJ
      </div>
      <div style="text-align: right;">
        <strong>Total Approved:</strong> $ 1,250,000.00<br>
        <strong>Early Pay Date:</strong> 15 MAR 2026<br>
        <strong>Maturity Date:</strong> 15 MAY 2026
      </div>
    </div>

    <div style="background: #f9f9f9; padding: 15px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 20px;">
      <h4 style="margin-top: 0; color: #004a99; font-size: 0.9em; border-bottom: 1px solid #ccc; padding-bottom: 5px;">VERIFIED APPROVED INVOICES</h4>
      <table style="width: 100%; font-size: 0.85em;">
        <tr>
          <td><strong>INV-9922-A (Turbine Parts)</strong></td>
          <td style="text-align: right; font-weight: bold;">$ 750,000.00</td>
        </tr>
        <tr>
          <td><strong>INV-9922-B (Control Systems)</strong></td>
          <td style="text-align: right; font-weight: bold;">$ 500,000.00</td>
        </tr>
        <tr style="border-top: 1px solid #ddd;">
          <td><strong>Total Early Payment (Verified):</strong></td>
          <td style="text-align: right; font-weight: bold; color: #2e7d32;">$ 1,225,000.00</td>
        </tr>
      </table>
      <div style="font-size: 0.75em; color: #666; margin-top: 10px; text-align: center;">(Total minus 2.0% Discounting Charge)</div>
    </div>

    <div style="font-size: 0.8em; color: #666; font-style: italic; border-top: 1px solid #eee; padding-top: 10px;">
      This approval advice is a verified extract of the CitiDirect SCF portal. Any alteration of invoice amounts or dates renders this financing void.
    </div>
  </div>

  <div style="padding: 20px; background: #f5f5f5; border-top: 1px solid #004a99; text-align: center;">
    <div data-verify-line="factor" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #000; font-weight: bold;"
      title="Demo only: Banks don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:citi.com/scf/v/SCF99228877 <span data-bracket="end" data-for="factor">]</span>
    </div>
    <div style="font-size: 0.7em; color: #777; margin-top: 10px;">
      Scan to verify invoice approval status, discount rates, and upcoming maturity dates.
    </div>
  </div>
</div>

## Data Verified

Batch ID, funding bank name, buyer name, supplier name, itemized invoice numbers, gross invoice amounts, early payment date, maturity date (when buyer pays), discount rate (APR/Fees), net payout amount, bank officer ID.

**Document Types:**
- **Approval Advice:** Proving the buyer has "Ok'd" the invoices for payment.
- **Supplier Financing Agreement:** The overarching legal framework.
- **Assignment of Proceeds:** (Linked hash) moving the legal debt to the bank.
- **Payoff Letter:** Proof that the buyer has settled the debt with the bank.

## Data Visible After Verification

Shows the issuer domain (`citi.com`, `jpmorgan.com`, `taulia.com`) and the financing standing.

**Status Indications:**
- **Funded / Paid** — Cash has been disbursed to the supplier.
- **Approved / Pending** — Buyer has verified the goods; bank is awaiting drawdown.
- **Matured / Settled** — **ALERT:** The buyer has already paid the bank; this paper is historic.
- **In Dispute** — **CRITICAL:** The buyer has flagged the invoices for "Quality Issues."

## Second-Party Use

The **Supplier (The Payee)** benefits from verification.

**Working Capital Speed:** When negotiating a "Material Purchase" from a raw-goods vendor (e.g., steel or plastic), the supplier shows the verified "Citi Approval" hash. The vendor can instantly see **"VERIFIED: $1.25M"** from a top-tier bank, giving them the confidence to ship materials on credit because they know the supplier's cash is coming in 48 hours.

**Audit Compliance:** Proving to their own shareholders and auditors that their "Factored Income" is based on legitimate, buyer-approved invoices, removing the risk of "Revenue Padding" accusations.

## Third-Party Use

**Bank Auditors / Regulators**
**Systemic Risk Audit:** Verifying that the bank's "Trade Finance" portfolio is backed by authentic, buyer-verified assets. OCR-to-hash ensures the bank isn't funding "Phantom Invoices" created by a collusive supplier and employee.

**Credit Rating Agencies (Moody's / S&P)**
**Liquidity Analysis:** Verifying the "Financing Pipeline" of a corporate buyer to ensure their "Accounts Payable" are accurately reported and haven't been hidden using off-balance-sheet factoring.

**Secondary Debt Investors**
**Portfolio Due Diligence:** Before buying a "Slice" of a bank's supply chain debt, the investor scans random hashes. Verification ensures the maturity dates and amounts match the original digital approvals.

## Verification Architecture

**The "Phantom Invoice" Fraud Problem**

- **Double-Financing:** Selling the same verified invoice to Citi and then secretly trying to sell it to HSBC.
- **Amount Inflation:** Editing an approved "$100,000" advice to read "$1,000,000" to get a larger advance.
- **Return Hiding:** Getting paid early for an invoice but then secretly accepting a "Goods Return" from the buyer, leaving the bank with worthless collateral.

**Issuer Types**

**Global Transaction Banks.**
**Supply Chain Finance Platforms (e.g., Taulia, Greensill-successors).**
**Corporate Treasury Portals.**

**Privacy Salt:** Highly Critical. Corporate trade volumes and supplier lists are extremely sensitive "Trade Secrets." The hash must be salted and access restricted to authorized financial institutions.

## Rationale

Supply Chain Finance is the "Oil" of global manufacturing. By turning approval advice into verifiable digital bridges, we protect the banks from multi-billion dollar fraud and ensure that capital flows to legitimate suppliers with cryptographic certainty.