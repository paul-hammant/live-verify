---
title: "Certificates of Origin (General & Regional)"
category: "Customs & Trade Compliance"
volume: "Medium"
retention: "Shipment + 7-10 years"
slug: "certificates-of-origin"
tags: ["trade-compliance", "customs", "export", "import", "logistics", "tariff-benefits", "origin-verification"]
---

## What is a Certificate of Origin?

A **Certificate of Origin (CO)** is a document used in international trade to prove exactly where a product was manufactured.

It's not just for geography—it's for **Taxes**. If a company ships microprocessors from the USA to South Korea, they might pay 0% duty (tax) if they have a verified CO. If they don't have one, they might pay 10% or more.

Fraudsters often "Launder" products—shipping goods from a high-tax country (like China) to a neutral country (like Vietnam) and creating a fake CO to avoid paying US or EU duties.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #333; background: #fff; padding: 0;">
  <div style="background: #333; color: #fff; padding: 10px; text-align: center;">
    <h3 style="margin: 0; text-transform: uppercase;">CERTIFICATE OF ORIGIN</h3>
    <div style="font-size: 0.8em;">U.S. CHAMBER OF COMMERCE • WASHINGTON D.C.</div>
  </div>

  <div style="padding: 20px; font-size: 0.8em;">
    <div style="display: flex; border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 10px;">
      <div style="width: 50%; border-right: 1px solid #333; padding-right: 10px;">
        <strong>1. Exporter:</strong><br>
        <span data-bracket="start" data-for="origin-us">]</span>Texas Instruments, Inc.<br>
        12500 TI Blvd, Dallas, TX 75243
      </div>
      <div style="width: 50%; padding-left: 10px;">
        <strong>2. Consignee:</strong><br>
        Samsung Electronics<br>
        Suwon, South Korea
      </div>
    </div>

    <p><strong>3. Country of Origin:</strong> UNITED STATES OF AMERICA</p>
    
    <p><strong>4. Description of Goods:</strong><br>
    Integrated Circuits (Microprocessors)<br>
    HS Code: 8542.31<br>
    Weight: 450 KG</p>

    <div style="margin-top: 20px; border: 1px solid #000; padding: 10px;">
      <strong>CERTIFICATION:</strong><br>
      The U.S. Chamber of Commerce certifies that the goods described above originated in the country shown in box 3.
      <br><br>
      Date: 15 March 2026<br>
      Authorized Signature: <em>M. J. Smith</em>
    </div>

    <div data-verify-line="origin-us" style="border-top: 1px dashed #999; margin-top: 25px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.85em; color: #555; text-align: center;"
      title="Demo only: US Chamber doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:uschamber.com/v/TXTI-2026-09 <span data-bracket="end" data-for="origin-us">]</span>
    </div>
  </div>
</div>

## Data Verified

Exporter name, Consignee name, declared Country of Origin, HS Code (Harmonized System), product weight/quantity, Certificate ID number, issuing chamber/authority, date of certification.

**Document Types:**
- **Generic Certificate of Origin:** For countries without a specific FTA.
- **USMCA Certification:** For trade between US, Mexico, and Canada.
- **GSP Certificate (Form A):** For preferential treatment for developing nations.

## Data Visible After Verification

Shows the issuer domain (`uschamber.com`, `iccwbo.org`) and current certificate status.

**Status Indications:**
- **Verified** — Certificate is authentic and active in the Chamber database.
- **Void** — Certificate has been cancelled (e.g., due to trade dispute).
- **Superseded** — Replaced by a corrected certificate.
- **Alert** — Associated with a known "Origin Fraud" scheme.

## Second-Party Use

The **Exporter** or **Manufacturer** benefits from verification.

**Tariff Exemption:** Proving to foreign customs that the high-value electronics are US-origin, qualifying for 0% duty under a trade agreement. Verification prevents "Customs Holds" that can delay supply chains for weeks.

**Brand Protection:** Proving the "Country of Manufacture" to consumers and retailers, protecting the "Made in USA" or "Swiss Made" premium.

## Third-Party Use

**Customs Authorities (CBP / KCS)**
**Compliance Enforcement:** Instantly verifying that the "Country of Origin" on the paper invoice matches the official Chamber of Commerce record. This stops "Tariff Engineering" where high-tariff goods are mislabeled.

**Freight Forwarders**
**Documentation Vetting:** Verifying the CO before the ship departs to ensure all export paperwork is compliant, preventing port rejections at the destination.

**Procurement Teams**
**Sourcing Transparency:** Large corporations (e.g., Apple, BMW) can verify the origin claims of their tier-2 and tier-3 suppliers to ensure compliance with ethical sourcing and trade laws.

## Verification Architecture

**The "Origin Laundering" Fraud Problem**

- **Transshipment:** Shipping goods from a sanctioned country to a neutral country and swapping the paper CO to hide the true origin.
- **HS Code Fraud:** Changing the code from a high-tax category to a low-tax one.
- **Fake Stamps:** Forging the physical rubber stamp of a legitimate Chamber of Commerce.

**Issuer Types**

**National Chambers of Commerce.**
**Board of Trade.**
**Government Trade Ministries.**

## Competition vs. Blockchain (TradeLens)

| Feature | OCR-to-Hash | TradeLens / GSBN | Paper COI |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the local Chamber. | **Consensus-Bound.** Trust the network. | **Zero.** Easily forged. |
| **Adoption** | **High.** Works with existing paper/PDF docs. | **Low.** Requires every party to join the blockchain. | **Universal.** |
| **Integrity** | **Binds Content.** Proves the *Country* matches. | **Data-Only.** | **Vulnerable.** |
| **Cost** | **Low.** Standard web infra. | **Very High.** Seven-figure implementation costs. | **None.** |

**Why OCR wins here:** Ease of Entry. While "Global Trade Blockchains" are the future, most of the world's trade still runs on paper. OCR-to-hash provides **Blockchain-level security** for today's paper-based reality, allowing any small-town Chamber of Commerce to offer cryptographic verification for just a few dollars a month in hosting costs.