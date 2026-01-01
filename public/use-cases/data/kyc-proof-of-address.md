---
title: "KYC Proof of Address Documents"
category: "Financial Compliance"
volume: "Large"
retention: "5-10 years post-relationship"
slug: "kyc-proof-of-address"
tags: ["kyc", "aml", "proof-of-address", "utility-bill", "bank-onboarding", "financial-crime", "address-verification"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #004a99; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;">CON-EDISON</div>
      <div style="font-size: 0.8em; opacity: 0.8;">Utility Bill & Proof of Service</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Account #: 9922887766</div>
    </div>
  </div>

  <div style="padding: 30px;">
    <div style="border-bottom: 2px solid #004a99; padding-bottom: 10px; margin-bottom: 20px;">
      <h3 style="margin: 0; color: #333;">SERVICE ADDRESS</h3>
      <div style="font-size: 1.1em; font-weight: bold; margin-top: 5px; color: #004a99;">
        <span data-bracket="start" data-for="address">]</span>123 Bleecker Street, Apt 4B<br>
        New York, NY 10012
      </div>
    </div>

    <div style="font-size: 0.95em; line-height: 1.6; color: #333;">
      <p><strong>Customer:</strong> JOHN JACOB DOE</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr>
          <td><strong>Billing Period:</strong></td>
          <td style="text-align: right;">Feb 01 - Mar 01, 2026</td>
        </tr>
        <tr>
          <td><strong>Total Amount Due:</strong></td>
          <td style="text-align: right;">$ 142.50</td>
        </tr>
        <tr>
          <td><strong>Service Status:</strong></td>
          <td style="text-align: right; color: #2e7d32; font-weight: bold;">ACTIVE</td>
        </tr>
      </table>
    </div>

    <div style="margin-top: 25px; padding: 10px; background: #f9f9f9; border: 1px solid #eee; font-size: 0.8em; color: #555; font-style: italic; text-align: center;">
      Verification confirms the address and residency status match the utility company's official billing records.
    </div>

    <div data-verify-line="address" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Con-Ed doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:coned.com/billing/v/9922887766 <span data-bracket="end" data-for="address">]</span>
    </div>
  </div>
</div>

## Data Verified

Customer name, full service address, billing period dates, total amount due (numerical), account status (Active/Closed), issuing utility/bank name, date of issuance.

**Document Types:**
- **Utility Bill:** (Electric, Water, Gas).
- **Telecom Bill:** (Mobile, Internet).
- **Bank / Credit Card Statement:** (Linked hash) for address proof.
- **Council Tax / Property Tax Bill:** (High trust).

## Data Visible After Verification

Shows the issuer domain (`coned.com`, `verizon.com`, `chase.com`) and current account standing.

**Status Indications:**
- **Verified** — Address and name match the official billing file.
- **Closed** — Account is terminated; address may be outdated.
- **Disconnected** — **ALERT:** Service stopped; residency may be fraudulent.
- **Amended** — A correction was issued for this billing period.

## Second-Party Use

The **Bank Customer / Tenant** benefits from verification.

**Digital Onboarding:** Proving their current residence to a Neobank (e.g., Revolut or Chime) without having to "Wait for a paper letter in the mail." A verified hash from the utility domain removes the #1 cause of KYC rejection: **Unreadable or Outdated Utility Bills.**

**Visa / Residency:** Proving local residency to a foreign embassy or consulate using a verified, cryptographically trusted document.

## Third-Party Use

**Neobanks / Crypto Exchanges**
**Instant Address Match:** Automatically verifying the "Address String" provided in the signup form against the verified utility hash. OCR-to-hash allows for **Zero-Human-Review** onboarding of customers, even those with thin credit files.

**Mortgage Lenders**
**Residency Audit:** Verifying that a borrower is actually living in their primary residence (and not using it as an undisclosed rental) by checking the verified utility status.

**Government Agencies (DMV)**
**Proof of Residency:** Verifying address claims for Real ID issuance without requiring physical paper folders.

## Verification Architecture

**The "Photoshopped Bill" Fraud Problem**

- **Address Forgery:** Scammers taking a real Con-Ed bill and editing the "Apt 4B" to match a more desirable or expensive address to commit bank fraud.
- **Identity Swapping:** Editing the name on a valid bill to match a stolen identity.
- **Date Alteration:** Editing a 2022 bill to read "March 2026" to hide that the person moved away 4 years ago.

**Issuer Types**

**Utility Companies.**
**Telecom Providers.**
**Municipal Tax Authorities.**
**Retail Banks.**

**Privacy Salt:** Critical. Addresses are PII. The hash must be salted to prevent "Mass Mapping" of a city's residents by scanning the utility domain.

## Competition vs. Address Verification APIs (Experian)

| Feature | OCR-to-Hash | Address API (Experian/Loqate) | Scanned PDF / Paper |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Cryptographic.** Binds the *Name* to the *Address*. | **Vague.** Only proves the address *exists*. | **Zero.** Easily forged. |
| **Trust Anchor** | **Domain-Bound.** Bound to the Utility. | **Data-Bound.** Trust the aggregator. | **Visual.** |
| **Privacy** | **High.** User shares only the *Bill Summary*. | **Low.** Lenders see full credit history. | **High.** |
| **Coverage** | **Universal.** Works for any small utility with a URL. | **Limited.** Only for people with credit records. | **Universal.** |

**Why OCR wins here:** The "Thin File" problem. Millions of people (young people, expats, immigrants) don't have enough credit history for Experian to verify their address. But they **all** have a utility or mobile bill. OCR-to-hash allows them to use their **Service Reality** as a verified trust signal, bypassing the need for a legacy credit score.
