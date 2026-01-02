---
title: "Number portability authorizations"
category: "Business & Commerce"
volume: "Small"
retention: "3-7 years (regulatory compliance)"
slug: "number-portability-authorizations"
tags: ["number", "portability", "authorizations", "telecommunications"]
---

## What is a Porting Authorization?

When you switch from AT&T to T-Mobile but keep your same phone number, you are "Porting" your number. To do this, you must sign a **Number Portability Authorization (LOA)**.

This document is the "Key" to your digital identity.

**SIM Swapping** is a major crime where hackers forge these authorizations to steal your phone number. Once they have your number, they can reset your bank passwords and steal your money. Verified hashes from the carrier's domain ensure that a "Porting Request" is a **Verified Intent** from the real owner, not a hacker with a fake PDF.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #333; background: #fff; padding: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #000; color: #fff; padding: 15px; text-align: center; margin-bottom: 20px;">
    <h2 style="margin: 0; text-transform: uppercase; font-size: 1.2em;">LETTER OF AGENCY (LOA)</h2>
    <div style="font-size: 0.8em;">FOR NUMBER PORTABILITY</div>
  </div>
  <div style="font-size: 0.95em; line-height: 1.6;">
    <p>I, <span data-bracket="start" data-for="port">]</span><strong>JOHN JACOB DOE</strong>, authorize the porting of my telephone number <strong>(555) 123-4567</strong> from AT&T to T-Mobile.</p>
    <p><strong>Account #:</strong> 9988776655<br>
    <strong>Address:</strong> 123 Maple St, Anytown, USA</p>
    <div data-verify-line="port" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;">
      verify:att.com/porting/v/9988776655 <span data-bracket="end" data-for="port">]</span>
    </div>
  </div>
</div>


## Data Visible After Verification

Shows the issuer domain and the responder text (e.g., "Valid ID" or "Denied").

**Status Indications:**
- **Valid** - Document verified and current
- **Expired** - Document has reached expiration
- **Revoked** - Document has been revoked or cancelled
- **Superseded** - A newer version exists

The verification response may include additional context such as issue date, expiration date, or document serial numbers.

## Second-Party Use

The document holder (subject/recipient) benefits from verification.

**Document Authenticity:** Verify received documents are genuine and properly issued.

**Third-Party Presentation:** Provide verified documentation when required.

**Compliance Requirements:** Meet regulatory or contractual documentation requirements.

**Record Keeping:** Maintain verified records for future reference or audits.

**Dispute Prevention:** Establish authenticity to prevent future challenges.

## Third-Party Use

**Auditors and Compliance Officers**

Internal and external audits:

**Financial Audits:** Verify documents during financial statement audits.

**Compliance Audits:** Validate documentation for regulatory compliance.

**Internal Controls:** Test document authenticity in control assessments.

**Fraud Investigations:** Verify documents in fraud examinations.

**Third-Party Audits:** Validate vendor and partner documentation.

## Verification Architecture

**The Number portability authorizations Fraud Problem**

Document fraud creates significant risks:

- **Fabrication:** Entirely fake documents created from scratch
- **Alteration:** Genuine documents with modified content (dates, amounts, names)
- **Impersonation:** Documents falsely claiming to be from legitimate issuers
- **Expired/Revoked Documents:** Presenting invalid documents as current

OCR-to-hash verification addresses fake and altered documents. Domain binding confirms the claimed issuer actually issued the document.

**Issuer Types**

Who issues these documents and operates verification endpoints?

**Primary Issuers:** Organizations with direct authority to issue these documents.

**Licensed Professionals:** Professionals authorized to create and certify documents.

**Government Agencies:** Federal, state, or local agencies with jurisdiction.

**Industry Bodies:** Trade associations and professional organizations.

**System Integration**

Verification integrates with relevant systems:

**Issuer Systems:** Core operational systems generate verification hashes at document creation.

**Industry Standards:** Existing data standards extended to include verification.

**Regulatory Systems:** Government databases for systematic hash receipt and oversight.

**Third-Party Platforms:** Industry portals and platforms enable verification access.

## Rationale

Domain binding verifies carrier. Standard forms suitable for OCR. Prevents unauthorized number porting. Regulatory compliance. Fraud prevention.
