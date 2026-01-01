---
title: "Wire Transfer Confirmations (SWIFT/Fedwire)"
category: "Banking & Payments"
volume: "Medium-Small"
retention: "7-10 years (audit trail, regulatory requirements)"
slug: "wire-transfer-documentation"
tags: ["wire-transfer", "swift", "fedwire", "banking", "finance", "fraud-prevention", "bec"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', monospace; border: 1px solid #333; background: #fdfdfd; padding: 20px;">
  <div style="border-bottom: 1px dashed #333; padding-bottom: 10px; margin-bottom: 15px;">
    <strong>OUTGOING WIRE TRANSFER NOTIFICATION</strong><br>
    <span style="font-size: 0.8em;">GOLIATH NATIONAL BANK</span>
  </div>
  <div style="font-size: 0.85em; line-height: 1.4;">
    <p><strong>Ref:</strong> IMAD-20251015-A8849201<br>
    <strong>Date:</strong> 2025-10-15 14:32:01 EST<br>
    <strong>Amount:</strong> $4,250,000.00 USD</p>

    <p><strong>Originator:</strong> MegaCorp Holdings LLC<br>
    <strong>Beneficiary:</strong> Global Supply Partners Ltd<br>
    <strong>Beneficiary Bank:</strong> HSBC London<br>
    <strong>Account:</strong> ************8842</p>

    <p><strong>Status:</strong> COMPLETED / FEDWIRE CONFIRMED</p>

    <div style="margin-top: 15px; border: 1px solid #ccc; background: #eee; padding: 8px; text-align: center;">
      <strong>Verify execution status:</strong><br>
      verify:wires.goliathbank.com/trace
    </div>
  </div>
</div>

## Data Verified
**IMAD/OMAD Number** (Fedwire) or **TRN** (SWIFT), **Amount**, **Currency**, **Date/Time**, **Originator Name**, **Beneficiary Name**, **Beneficiary Bank**, **Status** (Sent/Completed/Failed).

## Data Visible After Verification
**Status Indications:** `COMPLETED`, `PENDING`, `CANCELLED`, `RETURNED`.
**Note:** Verification confirms the bank *executed* the order. It does not prove the beneficiary wasn't a fraudster (if the sender was tricked), but it proves the document isn't a Photoshop job.

## Third-Party Use
**Real Estate Closings:** Title companies verify incoming wires before releasing deeds.
**M&A Closings:** Lawyers verify funds transfer before releasing signature pages.
**Vendor Payments:** Suppliers verify payment confirmation before shipping goods.

## Verification Architecture
**The Fraud:** Business Email Compromise (BEC). Fraudsters send fake wire confirmations to delay discovery while they launder the money.
**The Fix:** Domain binding to the *Sending Bank*. A fake PDF cannot hash to `goliathbank.com`.
**Privacy Salt:** Wire details are sensitive. A random `Trace ID` acts as salt.
