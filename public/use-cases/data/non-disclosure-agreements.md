---
title: "Non-Disclosure Agreements (NDA)"
category: "Legal & Contracts"
volume: "Large"
retention: "Duration of agreement + 5 years"
slug: "non-disclosure-agreements"
tags: ["NDA", "legal", "contracts", "confidentiality", "intellectual-property"]
---

## What is a Verified NDA?

A **Non-Disclosure Agreement (NDA)** is a contract where parties agree not to share confidential information. In high-stakes business (M&A, tech demos), proving that an NDA was signed **before** secrets were revealed is critical.

A **Verified NDA** adds a cryptographic hash to the signature page. This proves:
1.  **Existence:** The document existed on a specific date.
2.  **Integrity:** The terms (Scope, Duration) haven't been altered since signing.
3.  **Identity:** The issuer (e.g., the law firm or the Disclosing Party) attests to the signature.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', serif; border: 1px solid #ccc; background: #fff; padding: 40px;">
  <div style="text-align: center; font-weight: bold; margin-bottom: 30px; font-size: 1.2em;">MUTUAL NON-DISCLOSURE AGREEMENT</div>

  <p>This Agreement is made effective as of <strong>January 15, 2026</strong>, by and between:</p>
  
  <p><strong>Disclosing Party:</strong> Acme Corp<br>
  <strong>Receiving Party:</strong> <span data-bracket="start" data-for="nda">]</span>Consultant LLC</p>

  <p><strong>1. Confidential Information.</strong> Receiving Party shall not disclose any technical data, designs, or trade secrets...</p>
  
  <p><strong>2. Term.</strong> This protection lasts for 5 years from the date of disclosure.</p>

  <div style="margin-top: 40px; border-top: 2px solid #000; padding-top: 10px;">
    <div style="float: left; width: 45%;">
      Signed:<br>
      <em>/s/ Jane Doe, CEO</em><br>
      Acme Corp
    </div>
    <div style="float: right; width: 45%;">
      Signed:<br>
      <em>/s/ John Smith, Director</em><br>
      Consultant LLC
    </div>
    <div style="clear: both;"></div>
  </div>

  <div data-verify-line="nda" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;">
    verify:acmecorp.legal/contracts/v/nda555 <span data-bracket="end" data-for="nda">]</span>
  </div>
</div>

## Data Verified

Party names, effective date, scope of confidentiality, governing law, signatures.

**Document Types:**
- **Standard Mutual NDA:** Both sides share secrets.
- **One-Way NDA:** Only one side shares (e.g., investor pitching).
- **Employee NDA:** Part of employment contracts.

## Data Visible After Verification

Shows the issuer domain (usually the Disclosing Party or their Counsel) and the status.

**Status Indications:**
- **Active** — Agreement is in force.
- **Expired** — Term has ended.
- **Terminated** — Agreement ended early by mutual consent.

## Second-Party Use

The **Receiving Party** benefits from clarity.
- **Clear Scope:** They can verify exactly *which* version of the NDA they signed, preventing the Disclosing Party from slipping in stricter terms later.

The **Disclosing Party** benefits from proof.
- **Litigation Readiness:** In court, producing a verified, immutable copy of the NDA beats a "he-said-she-said" about which PDF was attached to an email 3 years ago.

## Third-Party Use

**Auditors / Due Diligence Teams**
**M&A:** When Acquiring Corp buys Acme Corp, they need to verify that Acme Corp actually has NDAs in place with all its contractors. Verified NDAs allow automated auditing of the IP protection status.

**Courts**
**Evidence:** Proving that the NDA was signed *before* the trade secret theft occurred.

## Verification Architecture

**The "Backdated Contract" Fraud Problem**
- **Backdating:** Signing an NDA *after* a leak happens and pretending it was signed before.
- **Page Swapping:** Replacing the "Scope" page in a multi-page physical contract to include/exclude specific technologies.

**Issuer Types**
- **Law Firms:** (e.g., "verify:coolie.com/...")
- **Corporate Legal Depts:** (e.g., "verify:google.legal/...")
- **Contract Management Platforms:** (Clm platforms acting as issuers).

## Competition vs. E-Signature (DocuSign)

| Feature | OCR-to-Hash | E-Signature (DocuSign/Adobe) |
| :--- | :--- | :--- |
| **Dependency** | **None.** Works on a printout in a file cabinet. | **High.** Requires platform access/subscription to verify long-term. |
| **Longevity** | **Permanent.** As long as the domain/hash exists. | **Variable.** What if the DocuSign account is closed? |
| **Hard Copy** | **First Class.** Designed for paper. | **Weak.** A printed DocuSign certificate is just pixels; the crypto is lost. |
| **Cost** | **Zero.** Part of the document generation. | **Per Envelope.** Subscription costs. |

**Why OCR wins here:**
Contracts often live for decades. E-signature platforms change, accounts close, and subscriptions lapse. A printed/PDF contract with an embedded hash is **self-sovereign**—it doesn't rely on a third-party SaaS vendor staying in business to prove its validity.

