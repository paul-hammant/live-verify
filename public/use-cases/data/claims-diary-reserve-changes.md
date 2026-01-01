---
title: "Claims Diary and Reserve Change Documentation"
category: "Insurance Claims & Operations"
volume: "Medium"
retention: "Claim lifetime + 7 years"
slug: "claims-diary-reserve-changes"
tags: ["insurance-claims", "claims-diary", "loss-reserves", "adjuster-notes", "audit-trail", "reinsurance-audit"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', monospace; border: 1px solid #555; background: #fff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
    <strong>ACE INDEMNITY GROUP</strong><br>
    INTERNAL CLAIMS DIARY & RESERVE LOG<br>
    -----------------------------------
  </div>

  <div style="font-size: 0.85em; line-height: 1.4;">
    <p><strong>Claim #:</strong> 99228877-WC<br>
    <strong>Adjuster:</strong> <span data-bracket="start" data-for="diary">]</span>MIKE MILLER (ID #992)</p>

    <div style="background: #f5f5f5; padding: 10px; margin: 15px 0; border: 1px solid #ddd;">
      <strong>RESERVE CHANGE #04</strong><br>
      Date: 15 MAR 2026 14:22:01<br>
      Old Indemnity Reserve: $ 50,000.00<br>
      New Indemnity Reserve: $ 125,000.00<br>
      Change: +$ 75,000.00
    </div>

    <p><strong>ADJUSTER DIARY NOTE:</strong><br>
    Received surgery estimate from claimant's physician. Injury significantly more severe than initially reported. Case now exceeds $100k threshold; escalated to supervisor for Large Loss Review.</p>
  </div>

  <div data-verify-line="diary" style="border-top: 1px dashed #999; margin-top: 20px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Insurer doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:ace-insurance.com/claims/v/99228877-R4 <span data-bracket="end" data-for="diary">]</span>
  </div>
</div>

## Data Verified

Claim ID, adjuster name/ID, reserve category (Indemnity/Medical/Expense), change amount, previous balance, new balance, timestamp (to the second), diary note text (digest), supervisor authorization status.

**Document Types:**
- **Reserve History Log:** Summary of all financial changes.
- **Adjuster Diary Extract:** The narrative "Daily Log" of actions.
- **Large Loss Notification:** Form sent to reinsurers for big spikes.

## Data Visible After Verification

Shows the issuer domain (the Insurance Carrier) and the log standing.

**Status Indications:**
- **Verified** — Change matches the carrier's core ledger and timestamp.
- **Backdated** — **ALERT:** Log entry was created after the effective date.
- **Unauthorized** — Change was made but lacks mandatory supervisor sign-off.
- **Void** — Reserve change was reversed due to data entry error.

## Second-Party Use

The **Claims Adjuster** benefits from verification.

**Defensive Documentation:** Proving that they raised the reserve *immediately* upon receiving new medical data, defending against accusations of "Bad Faith" or "Late Reporting" during a subsequent audit or litigation.

**Escalation Proof:** Proving to a supervisor that the Large Loss Review was triggered on the exact date mandated by company policy.

## Third-Party Use

**Reinsurers**
**Reserve Audit:** Reinsurers conduct periodic "Reserve Reviews" to ensure the primary carrier isn't hiding losses by keeping reserves artificially low. OCR-to-hash allows the auditor to instantly verify the history of every reserve change without trusting a manually compiled Excel file.

**State Market Conduct Examiners**
**Claims Handling Integrity:** Verifying that the carrier isn't "Backdating" diary notes to make it look like they contacted claimants within the 14-day statutory limit when they actually waited 30 days.

**Forensic Accountants**
**Loss Development Analysis:** Verifying the "Age" of reserves to build accurate actuarial models of how long it takes for a typical claim to reach its final value.

## Verification Architecture

**The "Diary Tampering" Fraud Problem**

- **Post-Loss Engineering:** Editing a diary note from "Claimant seems fine" to "Claimant reported severe pain" after a lawsuit is filed to make the file look better.
- **Reserve Smoothing:** Hiding a $1M spike by splitting it into 10 smaller $100k changes spread across different dates.
- **Backdating:** Creating a diary entry today but dating it last month to hide a failure to respond to a legal notice.

**Issuer Types**

**Primary Insurers:** (Chubb, Zurich, AIG).
**TPAs (Third Party Administrators):** (Sedgwick, ESIS, CorVel).
**Claims Management Systems:** (Guidewire, Duck Creek).

**Privacy Salt:** Highly critical. Internal notes contain sensitive medical/legal opinions. The hash must be salted to prevent unauthorized access to claim narratives.

## Competition vs. Guidewire Audit Logs

| Feature | OCR-to-Hash | System Audit Log (Guidewire) | PDF Export |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Carrier. | **Admin-Bound.** Can be edited by DB admins. | **Zero.** Easily forged. |
| **Auditor Access** | **Universal.** Reinsurer can verify any PDF. | **Restricted.** Requires expensive licenses/login. | **Manual.** |
| **Tamper Proof** | **Cryptographic.** Proves the *Text* of the note. | **Vulnerable.** Internal logs can be "cleaned up." | **Vulnerable.** |
| **Immutability** | **High.** Once hashed, the note is fixed. | **Medium.** Database changes can be hidden. | **Zero.** |

**Why OCR wins here:** The "External Audit." Reinsurers and state regulators are external to the carrier's IT system. They don't have (and often don't want) direct access to the "Live" claims system. OCR-to-hash provides them with an **immutable proof-of-work** for the documents sent to them, ensuring the PDF they are auditing is the "Unfiltered Truth."
