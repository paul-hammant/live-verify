---
title: "Client Money Segregation Confirmations"
category: "Financial Services Compliance"
volume: "Small"
retention: "7-10 years (regulatory audit)"
slug: "client-money-segregation-confirmations"
tags: ["client-money", "segregation", "cass", "custody", "ring-fencing", "investor-protection"]
---

## What is a Client Money Segregation Confirmation?

When you deposit money with a broker, investment firm, or other financial institution, your funds should be held separately from the firm's own money. If the firm goes bankrupt, your money should be protected — not mixed with the firm's assets and claimed by creditors.

Regulators require firms to segregate client money and have this audited. But clients rarely see proof. A segregation confirmation attests that as of a specific date, client funds are properly ring-fenced.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #1a5f2a; background: #f8fff8; padding: 0;">
  <div style="background: #1a5f2a; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;">CLIENT MONEY SEGREGATION CONFIRMATION</div>
    <div style="font-size: 0.8em;">CASS Compliance Attestation</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Firm:</strong> Sterling Investment Services Ltd<br>
    <strong>FCA FRN:</strong> 789012<br>
    <strong>As of Date:</strong> March 31, 2026</p>

    <div style="background: #f0fff0; padding: 15px; margin: 15px 0; border: 1px solid #1a5f2a;">
      <p style="margin: 0;"><strong>We confirm that:</strong></p>
      <p style="margin: 10px 0 0;">1. All client money is held in designated client money bank accounts</p>
      <p style="margin: 5px 0 0;">2. Client money is segregated from the firm's own funds</p>
      <p style="margin: 5px 0 0;">3. Daily reconciliations are performed per CASS 7 requirements</p>
      <p style="margin: 5px 0 0;">4. No shortfalls have been identified in the reporting period</p>
    </div>

    <p style="font-size: 0.85em; color: #666;">CASS Oversight Officer: M. Thompson<br>
    External Auditor: PwC LLP (CASS Audit Report dated April 15, 2026)</p>

    <div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      verify:sterling-investments.com/cass/SEG-2026Q1
    </div>
  </div>
</div>

## Data Verified

**Firm name**, **regulatory ID**, **confirmation date**, **segregation status**, **bank account confirmation**, **reconciliation status**, **shortfall disclosure**, **CASS officer name**, **auditor name**.

## Data Visible After Verification

**Status Indications:**
- **Confirmed** — Segregation requirements met as of date
- **Superseded** — Newer confirmation available
- **Shortfall Identified** — A deficiency has been reported (serious)
- **CASS Breach Notified** — Regulatory breach notification filed

## Why Clients Care

**Lehman Brothers (2008):** When Lehman collapsed, client money segregation failures meant billions were trapped and took years to recover. UK clients of Lehman Brothers International Europe faced massive delays because of inadequate segregation.

**MF Global (2011):** Customer funds were improperly used to cover firm losses. Clients who thought their money was segregated found it was not.

Clients want proof, not promises.

## Jurisdiction Differences

| Jurisdiction | Regulator | Rules | Terminology |
|--------------|-----------|-------|-------------|
| **UK** | FCA | CASS 6 (custody), CASS 7 (client money) | "Client money", "Designated client accounts" |
| **US** | SEC | Rule 15c3-3 (broker-dealers), CFTC segregation | "Customer segregated funds", "Reserve accounts" |
| **EU** | National + ESMA | MiFID II client asset rules | "Client funds segregation" |

All require segregation; audit and disclosure requirements vary.

## Third-Party Use

**Institutional clients** — Before depositing large sums, demand segregation confirmation
**Auditors** — Verify firm's claims match bank confirmations
**Administrators (in insolvency)** — Determine which assets are client money
**Regulators** — Spot-check compliance

## Verification Architecture

**The Problem:** Firms may provide outdated confirmations, or confirmations that overstate segregation quality. Clients have no way to verify the attestation is real and current.

**The Fix:** CASS officer and external auditor sign confirmation; firm publishes hash. Clients verify the confirmation is authentic and check for supersession/breach status. If the firm's segregation status deteriorates, verification status changes.
