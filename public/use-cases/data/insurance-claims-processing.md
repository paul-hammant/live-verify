---
title: "Claims Correspondence and EOBs"
category: "Insurance Claims & Operations"
volume: "Large"
retention: "Claim term + 7-10 years"
slug: "insurance-claims-processing"
tags: ["adjuster-notes", "audit-trail", "bad-faith", "claims", "claims-diary", "compliance", "eob", "full-and-final", "healthcare-billing", "insurance", "insurance-claims", "legal-contract", "liability", "loss-reserves", "provider-dispute", "reinsurance-audit", "release", "settlement"]
derivations: 3
furtherDerivations: 3
---

## What is an EOB?

An **Explanation of Benefits (EOB)** is the document your health insurance company sends you after you visit a doctor. It is **NOT** a bill.

It is a detailed breakdown showing:
1.  **The Discount:** How much the insurance company forced the doctor to lower their price.
2.  **The Payment:** Exactly how much the insurance company paid.
3.  **The Debt:** Exactly how much you (the patient) are still allowed to be billed.

Verified EOBs are critical for stopping "Balance Billing"—when a hospital tries to charge a patient for the "Discount" amount that the insurance company already negotiated away.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #005fb8; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;">UNITEDHEALTHCARE</div>
      <div style="font-size: 0.8em;">Explanation of Benefits (EOB)</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Claim #: 99228877-EOB</div>
    </div>
  </div>

  <div style="padding: 25px;">
    <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 20px;">
      <div>
        <strong>Patient:</strong> <span data-bracket="start" data-for="eob">]</span>SARAH J. DOE<br>
        <strong>Provider:</strong> Mercy General Hospital
      </div>
      <div style="text-align: right;">
        <strong>Service Date:</strong> Feb 10, 2026<br>
        <strong>Statement Date:</strong> Mar 15, 2026
      </div>
    </div>

    <table style="width: 100%; border-collapse: collapse; font-size: 0.85em;">
      <tr style="border-bottom: 2px solid #005fb8; background: #f5f5f5;">
        <th style="padding: 5px; text-align: left;">Description</th>
        <th style="padding: 5px; text-align: right;">Amount</th>
      </tr>
      <tr>
        <td style="padding: 5px; border-bottom: 1px solid #eee;">Billed Amount</td>
        <td style="text-align: right; padding: 5px;">$ 1,200.00</td>
      </tr>
      <tr>
        <td style="padding: 5px; border-bottom: 1px solid #eee;">Plan Discount (Contracted)</td>
        <td style="text-align: right; padding: 5px;">-$ 400.00</td>
      </tr>
      <tr>
        <td style="padding: 5px; border-bottom: 1px solid #eee;">Your Plan Paid</td>
        <td style="text-align: right; padding: 5px;">-$ 640.00</td>
      </tr>
      <tr style="font-weight: bold; font-size: 1.1em;">
        <td style="padding: 5px;">YOU OWE (Patient Responsibility):</td>
        <td style="text-align: right; padding: 5px;">$ 160.00</td>
      </tr>
    </table>

    <p style="margin-top: 20px; font-size: 0.8em; color: #555; font-style: italic;">
      This is NOT a bill. This is your record of how the claim was processed.
    </p>

    <div data-verify-line="eob" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: UHC doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:uhc.com/claims/v/99228877 <span data-bracket="end" data-for="eob">]</span>
    </div>
  </div>
</div>

## Data Verified

Patient name, member ID (partial), provider name, service date, claim number, billed amount, allowed amount, plan paid amount, patient responsibility (deductible/copay), adjustment reason codes.

**Document Types:**
- **Explanation of Benefits (EOB):** Post-service summary.
- **Predetermination Letter:** Pre-service cost estimate.
- **Appeal Decision Letter:** Proving a denied claim was overturned.
- **Subrogation Questionnaire:** Investigating 3rd party liability.

## Data Visible After Verification

Shows the issuer domain (`uhc.com`, `aetna.com`) and claim status.

**Status Indications:**
- **Processed** — Data matches the carrier's final adjudication.
- **In-Appeal** — Patient has formally challenged the calculation.
- **Reversed** — Claim was re-processed; this EOB is void.
- **Denied** — Payment rejected (reason provided).

## Second-Party Use

The **Patient** benefits from verification.

**Billing Disputes:** Proving to a hospital's billing department that the insurance company *actually* allowed a 40% discount, preventing the hospital from "Balance Billing" the patient for the full amount. A verified EOB is much harder for a hospital to ignore than a standard PDF.

**Flexible Spending Accounts (FSA/HSA):** Providing verified proof of "Patient Responsibility" to an HSA administrator to release tax-free funds without manual review.

## Third-Party Use

**Healthcare Providers (Clinics)**
**Reconciliation:** Verifying that the EOB provided by the patient matches what the insurer claims to have paid, spotting "Paper Check" vs "Electronic" discrepancies.

**Secondary Insurers**
**COB (Coordination of Benefits):** When a patient has two insurance plans, the secondary plan needs to see the "Verified Primary EOB" to calculate their share accurately.

**Mortgage Lenders**
**Medical Debt Audit:** If a borrower has large medical bills, lenders can verify the "Patient Responsibility" EOBs to ensure the debt isn't being exaggerated or hasn't already been paid by insurance.

## Verification Architecture

**The "Phantom Bill" Fraud Problem**

- **Balance Billing:** Hospitals pretending they didn't receive an EOB or that the "Allowed Amount" was higher to collect more from the patient.
- **PDF Alteration:** Patients editing a $100 copay to read $1,000 to drain their HSA/FSA for cash.
- **Duplicate Claims:** Using an old EOB to claim reimbursement from two different insurance companies (e.g., personal and work policies).

**Issuer Types**

**Health Insurers:** (UHC, Anthem, Aetna, Cigna).
**TPA Administrators:** (For self-insured employer plans).
**Government Payers:** (Medicare / Medicaid).

**Privacy Salt:** Highly critical. EOBs contain sensitive clinical and financial data. The hash must be salted to prevent "Guess-and-Check" attacks.

## Competition vs. Patient Portals

| Feature | OCR-to-Hash | Insurance Portal (Login) | Paper EOB |
| :--- | :--- | :--- | :--- |
| **User Control** | **High.** Share one specific EOB. | **Low.** Giving portal access reveals *full* medical history. | **Medium.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Insurer. | **System-Bound.** | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** Works across all carriers. | **Siloed.** | **Universal.** |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires 2FA, login, navigation. | **N/A.** |

**Why OCR wins here:** Selective Privacy. A patient needs to prove a $160 debt to a hospital or lender without exposing that they also had a psychiatric visit or a high-cost medication listed elsewhere in their portal history. OCR-to-hash turns the **Static Statement** into a portable, private "Proof of Payment."


---

_[Content merged from: claims-diary-reserve-changes]_


## What is a Claims Diary?

When an insurance adjuster handles a claim, they keep a "Diary"—a minute-by-minute log of every phone call, every medical report, and every financial change.

A **Reserve Change** is when the adjuster says: "Wait, this injury is worse than we thought; we need to set aside $100,000 more to pay for it."

In lawsuits, these diaries are "Evidence Item #1." If an insurance company is accused of "Bad Faith" (ignoring a claim), the diary is the only way to prove they were actually working on it. Verified hashes prevent companies from "Backdating" diary notes after a lawsuit is filed to make themselves look better.

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


---

_[Content merged from: claims-settlement-agreements]_


## What is a Settlement Agreement?

A **Settlement Agreement** (or Release) is the final contract that ends a legal dispute. It says: "The insurance company pays you $25,000, and in exchange, you promise never to sue them again for this accident."

These documents are the "Finish Line" of the legal system.

Because they trigger large payments, they are targets for "PDF alteration." A dishonest person might edit a $10,000 agreement to read $50,000 to trick their partners or a bank. Verified hashes ensure that the **final dollar amount** and the **release terms** cannot be changed after the signatures are dry.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #999; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
  <div style="text-align: center; margin-bottom: 30px;">
    <h3 style="text-decoration: underline; text-transform: uppercase; margin: 0;">SETTLEMENT AGREEMENT AND RELEASE</h3>
  </div>

  <div style="font-size: 1em; line-height: 1.6; color: #000; text-align: justify;">
    <p>This Settlement Agreement and Release (the "Agreement") is entered into as of March 15, 2026, by and between:</p>
    
    <p><strong>RELEASOR:</strong> <span data-bracket="start" data-for="settle">]</span>SARAH J. DOE<br>
    <strong>RELEASEE:</strong> ACME INDEMNITY INSURANCE CO.</p>

    <p>In consideration of the sum of <strong>TWENTY-FIVE THOUSAND DOLLARS ($25,000.00)</strong>, the Releasor hereby releases and forever discharges the Releasee from any and all claims arising out of the incident occurring on or about June 1, 2025.</p>

    <p>This Agreement represents a full and final settlement of the disputed claims. No further liability exists on the part of the Releasee.</p>
  </div>

  <div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px;">Sarah J. Doe</div>
      <div style="font-size: 0.8em; color: #777;">Releasor</div>
    </div>
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px;">Michael Miller, Adjuster</div>
      <div style="font-size: 0.8em; color: #777;">For Acme Indemnity</div>
    </div>
  </div>

  <div data-verify-line="settle" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Insurer doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:acme-insurance.com/legal/v/DOE-9922 <span data-bracket="end" data-for="settle">]</span>
  </div>
</div>

## Data Verified

Releasor name, Releasee name, settlement amount (numerical and text), incident date, Claim ID, effective date of agreement, signature status of both parties.

**Document Types:**
- **Full and Final Release:** Ending all current and future liability.
- **Partial Release:** For specific segments (e.g., Property Damage only).
- **Structure Settlement Annuity:** For long-term payouts.
- **Stipulation of Discontinuance:** To close a court case.

## Data Visible After Verification

Shows the issuer domain (the Insurance Carrier or Law Firm) and current legal status.

**Status Indications:**
- **Fully Executed** — Signed by all parties and funds authorized.
- **Payment Pending** — Agreement valid; check en route.
- **Void** — Superseded by a new agreement or retracted.
- **In-Litigation** — Release being challenged in court (e.g., for "Bad Faith").

## Second-Party Use

The **Claimant** (Releasor) benefits from verification.

**Anti-Tampering:** Ensuring that the "Release Terms" or "Settlement Amount" aren't altered by a third party (like an unscrupulous broker or attorney) after the claimant has signed the paper.

**Mortgage / Loan Approval:** Proving to a lender that a "Legal Dispute" listed on their credit report has been "Verified Settled" and the funds have been received, improving their debt-to-income profile.

## Third-Party Use

**Reinsurers**
**Claim Closure Audit:** Reinsurers verify that the primary carrier actually secured a "Verified Release" before paying out their share of a multimillion-dollar loss. This prevents "Leaky Settlements" where the carrier pays but forgets to get a signed release.

**Banks / Lienholders**
**Lien Satisfaction:** Verifying that the settlement amount includes the mandatory payment to the lienholder (e.g., the auto lender or medical provider).

**The Courts**
**Case Dismissal:** A judge can scan the verification hash on a "Stipulation of Discontinuance" to ensure it matches the insurer's records before officially closing the court docket.

## Verification Architecture

**The "PDF Alteration" Fraud Problem**

- **Amount Inflation:** An attorney taking a $10,000 settlement agreement and editing the PDF to read $50,000 to show their partners (while only paying the client $10k).
- **Date Forgery:** Editing an old 2023 release to appear as if it covers a 2026 incident.
- **Scope Erasure:** Deleting "Future Medicals" exclusions from the release text to keep the door open for more claims.

**Issuer Types**

**Insurance Carriers:** (Allstate, Zurich, Chubb).
**Defense Law Firms:** (Hosting on behalf of their carrier clients).
**Structured Settlement Firms.**

## Competition vs. Court Dockets (PACER)

| Feature | OCR-to-Hash | Court Docket (PACER) | Scanned PDF Release |
| :--- | :--- | :--- | :--- |
| **Privacy** | **High.** Private settlements stay private. | **Low.** Everything is public record (if filed). | **Medium.** |
| **Granularity** | **High.** Shows exact dollar amounts. | **Low.** Many settlements are "Confidential" in court. | **Vulnerable.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Payer. | **Gov-Bound.** | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** PDFs stay verifiable. | **Siloed.** Requires PACER login/fees. | **Manual.** |

**Why OCR wins here:** Privacy. Most insurance settlements are **confidential** and never appearing on a public court docket. OCR-to-hash allows the parties to have "Court-Grade" trust in the private agreement without exposing the settlement terms to the general public.
