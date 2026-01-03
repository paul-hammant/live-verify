---
title: "Sanctions and Restricted Party Screening Attestations"
category: "Financial Compliance"
volume: "Very Large"
retention: "5-7 years (OFAC / AML regulatory requirement)"
slug: "sanctions-screening-attestations"
tags: ["sanctions-screening", "ofac-compliance", "kyc", "aml", "restricted-party", "export-compliance", "trade-integrity", "compliance-audit"]
derivations: 1
furtherDerivations: 1
---

## What is a Sanctions Attestation?

In global finance and trade, every transaction must be checked against **Sanctions Lists** (e.g., OFAC SDN, UN Security Council, EU Consolidated List). A **Sanctions Screening Attestation** is the formal document where a bank, exporter, or payment processor proves they checked a specific person or company and found "No Matches."

These documents are the "Legal Safe Harbor" for high-value trade. Fraud is high-stakes: a company might "edit" a screening report to hide that their customer is actually a sanctioned oligarch or a prohibited defense entity. Similarly, a bank might use an outdated "Snapshot" from 2023 to hide a sanction designated in 2025. Verified hashes bind the **Subject Name, Lists Searched, and Dataset Timestamp** to the screening provider's domain (e.g., `dowjones.com` or `refinitiv.com`).

<div style="max-width: 650px; margin: 24px auto; font-family: sans-serif; border: 2px solid #333; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #000; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 4px solid #d32f2f;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;">DOW JONES RISK & COMPLIANCE</div>
      <div style="font-size: 0.8em; opacity: 0.9; text-transform: uppercase;">Official Screening Attestation</div>
    </div>
    <div style="font-size: 2em;">🌐</div>
  </div>

  <div style="padding: 25px;">
    <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; font-size: 0.9em; line-height: 1.5; margin-bottom: 25px; border-bottom: 1px solid #eee; padding-bottom: 15px;">
      <div>
        <strong>Subject:</strong> <span data-bracket="start" data-for="sanc">]</span>GLOBAL PETROLEUM TRADING LTD.<br>
        <strong>Jurisdiction:</strong> Dubai, UAE<br>
        <strong>Entity ID:</strong> AE-99228877
      </div>
      <div style="text-align: right;">
        <strong>Screening ID:</strong> DJ-2026-8844-XJ<br>
        <strong>Date/Time:</strong> 15 MAR 2026 14:32:01<br>
        <strong>Result:</strong> <span style="color: #2e7d32; font-weight: bold;">NO MATCH FOUND</span>
      </div>
    </div>

    <div style="background: #f9f9f9; border: 1px solid #ddd; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
      <h4 style="margin-top: 0; color: #000; font-size: 0.9em; border-bottom: 1px solid #ccc; padding-bottom: 5px;">DATASETS VERIFIED</h4>
      <ul style="margin: 5px 0; padding-left: 20px; font-size: 0.85em; line-height: 1.4;">
        <li><strong>US OFAC:</strong> Specially Designated Nationals (SDN) - <em>Verified 15-MAR</em></li>
        <li><strong>UN Security Council:</strong> Consolidated Sanctions List - <em>Verified 15-MAR</em></li>
        <li><strong>EU FS:</strong> Consolidated List of Persons & Entities - <em>Verified 15-MAR</em></li>
        <li><strong>UK HMT:</strong> Consolidated List of Financial Sanctions - <em>Verified 15-MAR</em></li>
      </ul>
    </div>

    <div style="font-size: 0.75em; color: #666; font-style: italic; text-align: center;">
      This attestation confirms that the subject was screened against the datasets above with 100% fuzzy-match threshold. Verification confirms report integrity at the timestamp of issuance.
    </div>
  </div>

  <div style="padding: 20px; background: #f5f5f5; border-top: 1px dashed #999; text-align: center;">
    <div data-verify-line="sanc" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #000; font-weight: bold;"
      title="Demo only: Screening providers don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:dowjones.com/v/DJ99228877 <span data-bracket="end" data-for="sanc">]</span>
    </div>
    <div style="font-size: 0.7em; color: #777; margin-top: 10px;">
      Scan to verify screening status, view the specific lists checked, and confirm dataset freshness.
    </div>
  </div>
</div>

## Data Verified

Screening ID, subject name (individual or entity), aliases checked, date of birth / registration #, datasets searched (e.g., OFAC, UN), match threshold (percentage), screening date/timestamp, dataset version ID, result status (No Match / True Match / False Positive), screening officer name.

**Document Types:**
- **Sanctions Attestation:** The 1-page "Clear" certificate.
- **Enhanced Due Diligence (EDD) Report:** The deep-dive investigation.
- **KYC Compliance Packet:** (Linked hash) the full onboarding file.
- **Exclusion Clearance:** Specifically for health/government programs.

## Data Visible After Verification

Shows the issuer domain (`dowjones.com`, `refinitiv.com`, `lexisnexis.com`) and the compliance standing.

**Status Indications:**
- **Verified / Clear** — Report matches the original screening event; no matches found.
- **True Match Detected** — **CRITICAL:** A subsequent list update has flagged this subject as sanctioned.
- **Stale Data** — **ALERT:** The datasets used for this screening are more than 24 hours old.
- **Amended Report** — **ALERT:** The result has been updated (e.g., from No-Match to False-Positive).

## Second-Party Use

The **Compliance Department / Exporter** benefits from verification.

**Bank Account Approval:** When a global company opens a new branch office, they provide verified "Sanctions Hashes" for their directors to the local bank. "Verified by Dow Jones" allows the bank to trust the Director's "Clean History" instantly, bypassing the 30-day "Onboarding Delay."

**Export Clearance:** Before shipping high-end hardware, an exporter provides verified hashes of the buyer's screening to US Customs (BIS). Verification ensures that the buyer isn't a "Restricted Party," protecting the exporter from multi-million dollar fines and criminal charges.

## Third-Party Use

**Intermediate Correspondent Banks**
**Transaction Clearing:** When a $10M wire moves through a bank, they scan the verified sanctions hashes attached to the payment. Verification ensures that the "Director Check" was actually performed by a reputable provider and hasn't been "Faked" to hide a money-laundering source.

**Government Regulators (OFAC / Treasury)**
**Thematic Review:** During a compliance audit, the regulator can scan random attestation hashes. OCR-to-hash ensures the institution isn't "Cherry-Picking" lists or using older, "Cleaner" datasets to hide problematic customers.

**Venture Capital Investors**
**Investment Vetting:** Verifying the "Sanctions Health" of a target startup's cap table before making a major equity investment.

## Verification Architecture

**The "List Trimming" Fraud Problem**

- **List Omission:** Manually removing the "UK Sanctions" list from a PDF report because the subject *is* on that list but not on the US list.
- **Dataset Manipulation:** Changing a 2024 timestamp to 2026 to hide that the screening is 2 years out of date.
- **Name Spoofing:** Screening a "lookalike" name (e.g., removing a middle initial) to avoid a "True Match" trigger.

**Issuer Types**

**Compliance Data Providers (Dow Jones, World-Check).**
**Reg-Tech Platforms (ComplyAdvantage).**
**Internal Corporate Compliance Portals.**

**Privacy Salt:** Highly Critical. Sanctions screening involves highly sensitive PII and "Negative List" data. The hash must be salted and access restricted to authorized compliance personnel.

## Rationale

Sanctions compliance is the "First Line of Financial Defense." By turning attestations into verifiable digital bridges, we ensure that global trade is transparent and that "Clean Status" is backed by the real-time cryptographic truth of the world's most critical risk databases.