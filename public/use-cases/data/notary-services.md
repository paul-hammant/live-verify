---
title: "Notary Public Services"
category: "Notary Services"
volume: "Very Large (aggregate)"
retention: "7-10 years (statutory journal requirement)"
slug: "notary-services"
tags: ["notary", "acknowledgment", "jurat", "notarial-act", "identity-verification", "legal-witness", "document-authentication", "commission-fraud"]
---

## What are Notary Services?

A **Notary Public** is a government-appointed official who acts as an impartial witness. Their primary job is to prevent fraud by verifying the identity of someone signing a high-stakes document (like a **Deed**, **Will**, or **Power of Attorney**). They record every act in a mandatory "Notary Journal."

The problem is that the "Notary Seal" (the ink stamp or embossed circle) is a physical feature that is easily forged using a $20 custom stamp maker. Even a real seal doesn't prove that the person whose name is on the paper actually appeared before the notary. OCR-to-hash allows a recipient to scan the notary's seal or certificate to verify: **"Is this a legitimate commissioned official, and does this specific act exist in their digital or physical journal?"**

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Times, serif; border: 1px solid #000; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); position: relative;">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.2em; text-transform: uppercase;">Notary Acknowledgment</div>
    <div style="font-size: 0.9em; font-style: italic;">Official Certificate of Act</div>
  </div>

  <div style="font-size: 1em; line-height: 1.6; color: #000; text-align: justify;">
    <p>State of <strong>CALIFORNIA</strong><br>
    County of <strong>LOS ANGELES</strong></p>

    <p>On March 15, 2026 before me, <span data-bracket="start" data-for="notary">]</span><strong>SARAH J. JENKINS</strong>, Notary Public, personally appeared <strong>JOHN JACOB DOE</strong>, who proved to me on the basis of satisfactory evidence to be the person whose name is subscribed to the within instrument.</p>
    
    <p>I certify under PENALTY OF PERJURY under the laws of the State of California that the foregoing paragraph is true and correct.</p>
  </div>

  <div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <div style="border-top: 1px solid #000; width: 200px; padding-top: 5px; font-style: italic;">Sarah Jenkins</div>
      <div style="font-size: 0.8em; color: #777;">Commission #: 992288-CA<br>Expires: Dec 31, 2028</div>
    </div>
    <div style="text-align: right;">
      <div style="width: 100px; height: 100px; border: 2px solid #000; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold; text-align: center; transform: rotate(-10deg);">NOTARY<br>OFFICIAL<br>SEAL</div>
    </div>
  </div>

  <div style="padding: 20px; background: #f9f9f9; border: 1px dashed #999; margin-top: 40px; text-align: center;">
    <div data-verify-line="notary" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #000; font-weight: bold;"
      title="Demo only: Individual notaries don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:sarahnotary.com/v/ACT2026-9922 <span data-bracket="end" data-for="notary">]</span>
    </div>
    <div style="font-size: 0.7em; color: #666; margin-top: 10px;">
      Scan to verify notary commission standing, witness authority, and journal entry integrity.
    </div>
  </div>
</div>

## Data Verified

Notary name, commission number, state of jurisdiction, expiration date, signer name, type of act (Acknowledgment/Jurat), date of act, identification method (e.g., Driver's License), journal entry ID, document description (hash).

**Document Types:**
- **Acknowledgment:** For deeds and contracts.
- **Jurat:** (Sworn statement) for affidavits.
- **Certified Copy:** Proving a copy matches the original.
- **Apostille:** (Linked hash) for international recognition.

## Data Visible After Verification

Shows the issuer domain (the Notary or a Platform like Notarize) and the act's standing.

**Status Indications:**
- **Verified / Authenticated** — The act is recorded in the official notary journal.
- **Commission Expired** — **ALERT:** The notary's commission has lapsed since the act.
- **Revoked** — **CRITICAL:** The notary's commission was voided for misconduct.
- **Not Found** — **CRITICAL:** This specific act was never recorded (indicates seal forgery).

## Second-Party Use

The **Signer (Consumer)** benefits from verification.

**Deed Fraud Defense:** An elderly homeowner can maintain a verified hash of their "House Deed." If a scammer tries to file a forged deed at the county office, the verified hash of the *legitimate* notary act provides the owner with the proof needed to stop the theft.

**Contract Finality:** Proving to a business partner that a signature was properly witnessed by a commissioned official, removing the risk of a "He-Said-She-Said" dispute in court later.

## Third-Party Use

**County Recorders / Registrars**
**Vetting Integrity:** Before recording a property transfer, the clerk scans the notary's seal hash. Verification ensures the "Sarah Jenkins" on the stamp is a real, active notary and isn't a "Phantom Commission" created by a fraudster.

**Lenders and Title Companies**
**Closing Audit:** Verifying that thousands of loan documents in a portfolio were actually notarized according to state law, protecting the bank's security interest.

**Foreign Consulates**
**Legalization Speed:** Verifying that a US-based affidavit is authentic before issuing an Apostille or Consular Legalization for use in another country.

## Verification Architecture

**The "Rubber Stamp" Fraud Problem**

- **Seal Harvesting:** Criminals buying a used notary embosser at an antique shop and using it to forge documents.
- **Commission Masking:** Continuing to notarize using a physical "Valid" stamp after the state revoked the commission for fraud.
- **Journal Erasure:** Signing a document today but refusing to record it in the mandatory journal to hide the signer's identity.

**Issuer Types**

**Individual Notaries (Professional Portals).**
**Large Law Firms / Banks (Internal Notaries).**
**RON (Remote Online Notary) Platforms.**

**Privacy Salt:** Essential. Signer names and legal document titles are highly sensitive. The hash must be salted to prevent "Journal Scraping" by unauthorized data brokers.

## Rationale

Notarization is the "Trust Link" of the legal system. By turning static stamps into verifiable digital bridges, we ensure that "Witnessing" is backed by cryptographic proof, protecting the public from the multi-billion dollar cost of document forgery.