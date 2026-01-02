---
title: "Remote Online Notarizations (RON)"
category: "Notary Services"
volume: "Large"
retention: "10 years (state retention laws)"
slug: "remote-online-notarizations"
tags: ["notary", "ron", "digital-notarization", "legal-authority", "e-signing", "mortgage-closing", "identity-verification"]
---

## What is a Remote Online Notarization (RON)?

A **Remote Online Notarization (RON)** is a digital evolution of the traditional notary act. Instead of meeting in person, the signer and the notary connect via a secure video session. The notary verifies the signer's identity using "Knowledge-Based Authentication" (KBA) and "Credential Analysis" before applying an electronic seal to the document.

The problem is that a "Digital Seal" is often just a pretty image on a PDF. Fraudsters can easily copy a legitimate notary's seal image and paste it onto a forged deed or power of attorney. Verified hashes bind the **Session ID, Notary Commission, and Signer Identity** to the RON platform's domain (e.g., `notarize.com` or `notarybridge.com`).

<div style="max-width: 500px; margin: 24px auto; font-family: 'Times New Roman', serif; border: 2px solid #333; background: #fff; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); position: relative;">
  <div style="text-align: center; border-bottom: 1px solid #000; padding-bottom: 15px; margin-bottom: 20px;">
    <div style="font-weight: bold; font-size: 1.3em; text-transform: uppercase;">Remote Online Notary Certificate</div>
    <div style="font-size: 0.9em; letter-spacing: 1px;">AUTHENTICATED VIA SECURE VIDEO SESSION</div>
  </div>

  <div style="font-size: 0.95em; line-height: 1.6;">
    <p>This document was notarized remotely on <strong>MARCH 15, 2026</strong> pursuant to the laws of the <strong>STATE OF TEXAS</strong>.</p>
    
    <div style="margin: 20px 0; display: flex; align-items: flex-start; border: 1px solid #ccc; padding: 15px; background: #f9f9f9;">
      <div style="width: 80px; height: 80px; border: 2px solid #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold; text-align: center; margin-right: 20px; color: #000;">DIGITAL<br>SEAL</div>
      <div style="flex-grow: 1;">
        <strong>Notary:</strong> <span data-bracket="start" data-for="ron">]</span>SARAH J. JENKINS<br>
        <strong>Commission #:</strong> 992288-TX<br>
        <strong>Expires:</strong> 12/31/2028<br>
        <strong>Session ID:</strong> RON-8844-X92
      </div>
    </div>

    <p><strong>Signer:</strong> JOHN JACOB DOE<br>
    <strong>ID Verified via:</strong> KBA + Bio-Metric Credential Analysis</p>
  </div>

  <div style="margin-top: 30px; border-top: 1px dashed #999; padding-top: 15px; text-align: center;">
    <div style="font-size: 0.75em; color: #666; font-style: italic; margin-bottom: 10px;">
      This electronic act is recorded in the platform's digital journal. Scan to verify session integrity and notary authority.
    </div>
    <div data-verify-line="ron" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #000; font-weight: bold;"
      title="Demo only: RON platforms don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:notarize.com/v/RON8844X92 <span data-bracket="end" data-for="ron">]</span>
    </div>
  </div>
</div>

## Data Verified

Notary name, commission number, state of jurisdiction, session ID, signer name, date/time of act, document type hash, RON platform name, electronic journal entry ID.

**Document Types:**
- **RON Notarial Certificate:** The page attached to the legal document.
- **Electronic Journal Extract:** Proof of the act for court/audit.
- **Credential Analysis Report:** (Linked hash) proving the ID was scanned and passed.

## Data Visible After Verification

Shows the issuer domain (`notarize.com`, `docuverify.com`) and the act's standing.

**Status Indications:**
- **Authenticated** — The session is valid and recorded in the official journal.
- **Video Archived** — Confirmation that the required video record is retained.
- **Revoked** — **ALERT:** The notary act has been disavowed (e.g., due to reported fraud).
- **Notary Suspended** — **ALERT:** The notary's commission was inactive at the time of the act.

## Second-Party Use

The **Signer (Consumer)** benefits from verification.

**Mortgage Closing Integrity:** A homebuyer signing $500,000 in loan docs via RON can scan the notary's seal to ensure they are using a legitimate, state-authorized platform and not a phishing site designed to steal their signature and PII.

**Global Business:** An executive in London signing a contract for a New York company can provide the verified hash to prove the notarization meets "Interstate Recognition" laws without needing a physical apostille.

## Third-Party Use

**County Recorders / Registrars**
**Deed Fraud Prevention:** Before recording a property transfer, the clerk scans the RON seal. If the hash returns **"VALID - SESSION #8844,"** they know the digital signature isn't a simple "Copy-Paste" forgery.

**Lenders and Title Companies**
**Post-Closing Audit:** Instantly verifying thousands of digital loan files. OCR-to-hash ensures that every "Digital Seal" in the portfolio is backed by a real video session and a valid notary commission.

**Courts and Litigants**
**Evidence Admissibility:** In a dispute over a "Forged Signature," the court can verify the RON hash to see the exact timestamp and platform that vouches for the identity check.

## Verification Architecture

**The "Digital Xerox" Fraud Problem**

- **Seal Harvesting:** Criminals taking a screenshot of a real RON seal and using it to "notarize" fake documents.
- **Credential Spoofing:** Using a deepfake video or a stolen ID to trick a remote notary.
- **Session Fabricating:** Creating a fake "Certificate of Completion" for a session that never occurred.

**Issuer Types**

**Authorized RON Platforms.**
**State Secretary of State (SOS) Portals.**
**Large Law Firms (Internal RON).**

**Privacy Salt:** Essential. Signer names and session IDs are sensitive legal data. The hash must be salted to prevent "Journal Scraping" by unauthorized parties.

## Rationale

RON verification solves the "Digital-to-Physical" trust gap. By turning an electronic seal into a verifiable digital bridge, it ensures that "Remote" trust is just as strong as "In-Person" trust.