---
title: "Escrow Instructions and Closing Documents"
category: "Real Estate & Property"
volume: "Very Small (per transaction, but high value)"
retention: "7-10 years (transaction disputes, title claims)"
slug: "escrow-closing-documents"
tags: ["real-estate-closing", "escrow-instructions", "wire-fraud-prevention", "trid-compliance", "closing-disclosure", "settlement-statement"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #000; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 25px;">
    <div style="font-weight: bold; font-size: 1.2em;">FIRST AMERICAN TITLE COMPANY</div>
    <div style="font-size: 0.85em; color: #666;">Official Wire Instructions & Closing Package</div>
  </div>

  <div style="font-size: 1em; line-height: 1.6; color: #333;">
    <h3 style="text-align: center; text-transform: uppercase; margin-bottom: 20px;">Escrow Wire Instructions</h3>
    
    <div style="background: #fdf2f2; border: 2px solid #d32f2f; padding: 15px; margin: 20px 0;">
      <p style="color: #d32f2f; font-weight: bold; margin-top: 0;">⚠️ MANDATORY VERIFICATION REQUIRED</p>
      <p>Before wiring any funds, scan the hash below to verify these bank details directly against our secure server.</p>
      
      <strong>Beneficiary Bank:</strong> <span data-bracket="start" data-for="escrow-wire">]</span>Wells Fargo, N.A.<br>
      <strong>Account Name:</strong> First American Escrow Account<br>
      <strong>Account #:</strong> ****-****-9988<br>
      <strong>Routing #:</strong> 123456789<br>
      <strong>Ref (Escrow #):</strong> 2026-992288
    </div>

    <p style="font-size: 0.85em; font-style: italic;">
      Verification protects against business email compromise (BEC) and fake instruction swaps.
    </p>
  </div>

  <div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-style: italic;">Elena Rossi, Escrow Officer</div>
    </div>
    <div style="text-align: right; width: 45%;">
      <div style="width: 80px; height: 80px; border: 2px solid #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold; text-align: center; margin-left: auto;">ESCROW<br>SEAL</div>
    </div>
  </div>

  <div data-verify-line="escrow-wire" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: First American doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:firstam.com/escrow/v/2026-992288 <span data-bracket="end" data-for="escrow-wire">]</span>
  </div>
</div>

## Data Verified

Escrow number, Property address, Buyer/Seller names, Beneficiary Bank name, Routing/Account numbers, exact wire amount authorized, Escrow Officer ID, date of issuance.

**Document Types:**
- **Wire Instructions:** The high-risk "Target #1" for fraudsters.
- **Closing Disclosure (CD):** Proving the final $ amounts.
- **ALTA Settlement Statement:** Detailed breakdown of all fees.
- **Grant Deed:** (Linked hash) for recording verification.

## Data Visible After Verification

Shows the issuer domain (`firstam.com`, `fnf.com`, `stewart.com`) and current status.

**Status Indications:**
- **Authorized** — Bank details match the official firm record.
- **Urgent: Changed** — **ALERT:** Instructions have been updated; do not use old ones.
- **Closed** — Escrow complete; funds should not be sent.
- **Invalid** — Serial number or bank data mismatch (High fraud risk).

## Second-Party Use

The **Buyer / Seller** benefits from verification.

**Wire Fraud Prevention:** Proving to themselves that the email they just received isn't a "Spoof" from a hacker. By scanning the hash on the PDF, the buyer gets 100% confirmation from the escrow company's domain that the bank details are real *before* they wire $250,000 into the void.

**Lender Coordination:** Proving to the bank's wire desk that the instructions provided by the borrower are verified authentic by the title company.

## Third-Party Use

**The Buyer's Bank (Sending Bank)**
**Fraud Vetting:** Before executing a high-value real estate wire, the bank's fraud team can scan the instructions. "Verified by First American" provides the green light needed to bypass additional "Confirm by Phone" delays.

**Mortgage Lenders**
**Closing Integrity:** Ensuring that the "Closing Disclosure" in the loan file is the exact same one signed by the borrower and the escrow officer, with no secret "fees" or altered payouts.

**Title Insurers**
**Risk Underwriting:** Verifying that the instructions and payouts followed the verified legal chain to avoid future "Mechanics Lien" or "Unsatisfied Mortgage" claims.

## Verification Architecture

**The "Real Estate Wire" Fraud Problem**

- **Business Email Compromise (BEC):** Hackers taking over an escrow officer's email and sending "Updated Wire Instructions" with their own bank account. This causes $400M+ in losses annually.
- **PDF Scams:** Scammers sending fake "Closing Disclosures" to borrowers to steal the downpayment.
- **Settlement Tampering:** Editing a PDF to change the "Seller Payout" to a fraudster's account.

**Issuer Types**

**National Title Companies:** (First American, Fidelity, Old Republic).
**Regional Escrow Firms.**
**Attorney Closers:** (In "Attorney States").

**Privacy Salt:** Highly critical. Closings involve SSNs and large sums. The hash must be salted to prevent "Guessing" escrow numbers to see transaction values.

## Competition vs. Secure Portals (Qualia)

| Feature | OCR-to-Hash | Secure Portal (Qualia/CertifID) | Scanned PDF / Email |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Firm. | **System-Bound.** Trust the vendor. | **Zero.** Easily forged. |
| **Accessibility** | **Universal.** No login needed to verify. | **Difficult.** Requires buyer to create an account/password. | **Instant.** |
| **Integrity** | **Binds Content.** Protects the account #. | **Data-Only.** | **Vulnerable.** |
| **Hardware** | **Universal.** Any smartphone. | **Technical.** Often requires desktop browser. | **Manual.** |

**Why OCR wins here:** The "Moment of Action." A buyer is standing at their bank's wire desk. They are nervous. They don't want to struggle with a "Secure Portal" login or a forgotten password. OCR-to-hash turns the **Printed Wire Instructions** into a live, high-speed trust bridge, providing "Bank-Grade" security with "Paper-Grade" simplicity.
