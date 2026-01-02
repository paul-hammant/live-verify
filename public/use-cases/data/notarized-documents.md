---
title: "Notarized Documents"
category: "Notary Services"
volume: "Very Large"
retention: "Permanent (legal validity)"
slug: "notarized-documents"
tags: ["notary", "jurat", "acknowledgment", "apostille", "legalization", "sworn-statement", "witnessing"]
---

## What is a Notarization?

A **Notarization** is the official act of a Notary Public—an officer of the state—verifying that a person signing a document is who they say they are.

It is the "Final Seal" of trust for life's most important moments:
1.  **Buying a Home:** Signing loan documents.
2.  **Parental Consent:** Allowing a child to travel internationally.
3.  **Legal Affidavits:** Swearing to facts in a court case.

**"Notary Fraud"** is a low-tech, high-impact crime. Criminals buy fake rubber stamps online for $20 or use "Photoshop" to move a real stamp from an old document to a new, forged one. They use these "Official" documents to steal identities, property, or even children.

OCR-to-hash binds the **Notary's commission number, the signer's name, and the specific date** to the state's or the notary platform's domain. A fake stamp creates a hash that fails verification, instantly exposing the document as un-vetted.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', serif; border: 1px solid #999; background: #fff; padding: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="font-size: 1.1em; line-height: 1.6; color: #000;">
    <p style="text-align: right; font-size: 0.9em;">STATE OF FLORIDA<br>COUNTY OF MIAMI-DADE</p>
    
    <p>The foregoing instrument was acknowledged before me this 15th day of March, 2026, by <span data-bracket="start" data-for="notary">]</span><strong>ROBERT J. MILLER</strong>, who is personally known to me or who has produced a Driver License as identification.</p>
  </div>

  <div style="margin-top: 40px; display: flex; align-items: flex-start; justify-content: space-between;">
    <div style="width: 200px; border: 2px solid #000; padding: 10px; text-align: center; font-family: sans-serif; font-size: 0.75em; line-height: 1.3;">
      <div style="font-weight: bold; text-transform: uppercase;">Jane Doe</div>
      NOTARY PUBLIC<br>
      STATE OF FLORIDA<br>
      Comm# HH 992288<br>
      Expires: 12/31/2029
    </div>
    <div style="flex-grow: 1; margin-left: 30px; border-bottom: 1px solid #000; padding-top: 40px; font-style: italic; font-size: 0.9em;">
      Notary Signature
    </div>
  </div>

  <div data-verify-line="notary" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
    title="Demo only: Florida Secretary of State doesn't yet offer verification&#10;endpoints, so this is illustrative">
    verify:flsos.gov/notary/v/HH992288 <span data-bracket="end" data-for="notary">]</span>
  </div>
</div>

## Data Verified

Signer name, Notary name, Commission Number, Jurisdiction (State/County), Type of Notarial Act (Acknowledgment vs. Jurat), Identification Method (ID vs. Knowledge), Expiration Date of Commission, Date of Act.

**Document Types:**
- **Acknowledgment:** Signer declares they signed the document voluntarily.
- **Jurat:** Signer swears or affirms that the contents are true.
- **Copy Certification:** Notary verifies a copy is a true reproduction.
- **Apostille:** (Linked hash) for international recognition.

## Data Visible After Verification

Shows the issuer domain (the Secretary of State or a Remote Online Notary platform) and the commission status.

**Status Indications:**
- **Verified** — The notary session is authentic and recorded in the journal.
- **Revoked** — **ALERT:** The notary's commission has been suspended for misconduct.
- **Expired** — The notary performed the act after their commission lapsed.
- **Journal Mismatch** — **ALERT:** Notary is active, but this specific document ID isn't in their log.

## Second-Party Use

**The Citizen (Signer)** benefits from verification.

**International Travel:** Proving to an airline or a foreign customs agent that a "Parental Consent" letter is verified. Without instant verification, a single parent traveling with a child can be detained for hours while the agent tries to "Verify the Stamp."

**Loan Processing:** Ensuring your notarized "Source of Funds" letter is verified, preventing a 24-hour delay in a mortgage closing.

## Third-Party Use

**County Recorders**
**Recording Security:** Before accepting a deed for recording, the clerk scans the notary seal. "Verified by flsos.gov" ensure the deed isn't being filed by a "Serial Forger" using a fake stamp.

**Foreign Embassies**
**Legalization:** Speeding up the Apostille process by verifying the underlying state notary act instantly, reducing wait times from weeks to seconds.

**Hospital Administrators**
**Directive Validity:** Verifying a "Do Not Resuscitate" (DNR) or Medical Power of Attorney at the bedside during a life-safety crisis.

## Verification Architecture

**The "Rubber Stamp" Fraud Problem**

- **Stamp Theft:** Using a legitimate notary's stolen stamp to authorize a fraudulent document.
- **Post-Dated Notarization:** Notaries signing a document months *after* the signer has left (illegal in all jurisdictions).
- **Template Forgery:** Creating a completely fake "Seal of the State" to trick people into trusting a contract.

**Issuer Types**

**Secretaries of State:** (The primary regulating authority in the USA).
**Remote Online Notary (RON) Platforms:** (e.g., Proof, Notarize - hosting the cryptographically secure session hashes).
**National Notary Associations.**

## Competition vs. Embossed Seals

| Feature | OCR-to-Hash | Physical Embosser | Hologram Sticker |
| :--- | :--- | :--- | :--- |
| **Integrity** | **High.** Binds to the Signer Name. | **Zero.** Doesn't protect the text. | **Zero.** |
| **Audit-ability** | **Instant.** Links to the Journal. | **Manual.** Requires calling the Notary. | **Manual.** |
| **Global Use** | **Seamless.** Scannable anywhere. | **Hard.** Hard to see on a scanned PDF. | **Hard.** |
| **Cost** | **Free.** (Software based). | **High.** Physical tool required. | **High.** per-use cost. |

**Why OCR wins here:** The "Scanned PDF" reality. Most notarized documents today are shared as emails and PDFs, where physical "Indentations" from an embosser are invisible. OCR-to-hash turns the **Digital Image** of the stamp into a live, verifiable trust anchor, bringing the office of the Notary into the 21st century.