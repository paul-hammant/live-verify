---
title: "KYC Identity Verification Documents"
category: "Financial Compliance"
volume: "Medium"
retention: "5-10 years post-relationship"
slug: "kyc-identity-verification"
tags: ["kyc", "aml", "identity-verification", "bank-onboarding", "customer-due-diligence", "financial-crime", "digital-id"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1); overflow: hidden;">
  <div style="background: #002d62; color: #fff; padding: 20px; display: flex; align-items: center; justify-content: space-between;">
    <div>
      <div style="font-weight: bold; font-size: 1.1em;">REVOLUT BANK</div>
      <div style="font-size: 0.8em; opacity: 0.8;">Customer Onboarding & Identity Vetting</div>
    </div>
    <div style="font-size: 1.5em;">🏦</div>
  </div>

  <div style="padding: 25px; display: flex;">
    <div style="width: 120px; margin-right: 20px;">
      <div style="width: 120px; height: 150px; background: #eee; border: 1px solid #ccc; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #777;">[PHOTO]</div>
    </div>
    <div style="flex-grow: 1;">
      <h3 style="margin: 0; color: #002d62;">VERIFIED CUSTOMER PROFILE</h3>
      <div style="font-size: 1.1em; font-weight: bold; margin: 10px 0;"><span data-bracket="start" data-for="kyc-id">]</span>DOE, JOHN JACOB</div>
      
      <div style="font-size: 0.9em; color: #333; line-height: 1.5;">
        <strong>Document:</strong> US Passport #*******1234<br>
        <strong>DOB:</strong> May 15, 1985<br>
        <strong>PEP Status:</strong> CLEAR (Non-Political)<br>
        <strong>Sanctions:</strong> CLEAR (OFAC/HMT)
      </div>
    </div>
  </div>

  <div style="padding: 0 25px 25px 25px;">
    <div style="background: #f9f9f9; border: 1px solid #eee; padding: 10px; font-size: 0.85em; color: #555;">
      <strong>Bank Attestation:</strong> This identity has been verified against government databases and biometric liveness checks. Profile ID: REV-99228877.
    </div>
    <div data-verify-line="kyc-id" style="border-top: 1px dashed #999; margin-top: 15px; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Revolut doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:revolut.com/compliance/v/99228877 <span data-bracket="end" data-for="kyc-id">]</span>
    </div>
  </div>
</div>

## Data Verified

Full name, date of birth, residential address, primary ID number (Passport/SSN), nationality, PEP (Politically Exposed Person) status, adverse media flag, sanctions list status (OFAC/EU), biometric liveness confirmation, date of onboarding.

**Document Types:**
- **KYC Passport/ID Extract:** Summary of the primary ID check.
- **Proof of Address Summary:** (Linked hash) for utility/bill verification.
- **Selfie Liveness Certificate:** Proving the user was physically present.
- **W-8BEN / W-9 Form:** (Linked hash) for tax identity.

## Data Visible After Verification

Shows the issuer domain (`revolut.com`, `chase.com`, `coinbase.com`) and current compliance standing.

**Status Indications:**
- **Verified** — Identity is current and background checks are clear.
- **Restricted** — **ALERT:** Identity verified but account limited due to risk.
- **Suspended** — Potential fraud or expired ID; re-verification required.
- **Blacklisted** — Associated with known criminal activity.

## Second-Party Use

The **Bank Customer** benefits from verification.

**Fast Onboarding:** Proving to a second financial institution (e.g., a mortgage lender or a crypto exchange) that they have already passed a rigorous "Bank-Grade" KYC check at a tier-1 institution. This prevents the "2-week wait" for redundant document processing.

**Identity Protection:** Proving their verified status to a third party (like a high-end landlord) without handing over a full copy of their private Passport or SSN card. The verified hash acts as a "Privacy Shield."

## Third-Party Use

**Mortgage Lenders / Neobanks**
**Reciprocal KYC:** Instantly verifying the identity claims of an applicant by scanning the hash from their primary bank. This allows for "One-Click Onboarding" across the financial ecosystem.

**FinCEN / Regulators**
**Compliance Audit:** During a bank examination, federal auditors can scan random customer files. "Verified by Revolut" ensures the bank isn't "Ghosting" their KYC duties by maintaining fake or un-vetted accounts.

**Crypto Exchanges**
**Fiat Gateway:** Verifying the source identity of a user before allowing large-scale crypto-to-fiat transfers.

## Verification Architecture

**The "Synthetic Identity" Fraud Problem**

- **Identity Fabrication:** Using a mix of real and fake data to create a "Synthetic Person" who doesn't exist. Verification against the bank domain prevents this.
- **Photo Substitution:** Using a stolen ID number but editing the photo on the PDF to match the fraudster.
- **Revocation Hiding:** A user whose account was closed for money laundering yesterday using their old "Verified" paper summary to open a new account today.

**Issuer Types**

**Retail Banks.**
**Digital Wallets / Neobanks.**
**KYC Service Providers:** (e.g., Onfido, Jumio, Persona - hosting the hashes).

**Privacy Salt:** ABSOLUTELY CRITICAL. Identity data is the ultimate target for hackers. The hash MUST be salted to prevent "Brute Force" searching of the entire bank population.

## Competition vs. ID Verification APIs (Onfido)

| Feature | OCR-to-Hash | KYC API (Jumio/Onfido) | Scanned PDF ID |
| :--- | :--- | :--- | :--- |
| **User Privacy** | **High.** User shares only the *Vetted Profile*. | **Low.** Requires uploading raw ID photos to the cloud. | **High.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Bank. | **System-Bound.** Trust the vendor. | **Zero.** Easily forged. |
| **Interoperability** | **High.** Works across all banks. | **Low.** Every bank uses a different API vendor. | **Universal.** |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires 30-120 seconds for AI processing. | **N/A.** |

**Why OCR wins here:** The "Privacy Paradox." Banks don't want to store raw ID photos forever because of liability. Users don't want to upload them to 10 different sites. OCR-to-hash turns the **Vetted Result** into a portable, cryptographically trusted asset that carries the bank's "Authority" without the bank's "Data Liability."
