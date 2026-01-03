---
title: "NVOCC (Non-Vessel Operating Common Carrier) Tariffs"
category: "Chain of Custody & Logistics"
volume: "Medium"
retention: "Tariff validity + 7 years (FMC compliance)"
slug: "nvocc-tariffs"
tags: ["shipping", "logistics", "nvocc", "fmc-compliance", "freight-rates", "tariff-filing", "maritime-regulation", "trade-integrity"]
derivations: 1
furtherDerivations: 1
---

## What is an NVOCC Tariff?

A **Non-Vessel Operating Common Carrier (NVOCC)** is a freight forwarder that buys space on ships and resells it to shippers. By US law (**FMC Regulations**), NVOCCs must publish their **Tariffs**—the official prices they charge for shipping. These rates must be filed publicly and applied equally to all similarly situated customers.

The problem is that freight rates are volatile. To win business, some NVOCCs "edit" their tariff sheets to show a lower "filed" rate than they actually reported to the government, or they add "hidden surcharges" that aren't in the legal tariff. Verified hashes bind the **Route, Rate, and Surcharge Codes** to the carrier's official tariff domain (e.g., `expeditors.com` or `flexport.com`), ensuring that the price on the paper matches the price filed with the regulator.

<div style="max-width: 650px; margin: 24px auto; font-family: 'Arial Narrow', sans-serif; border: 1px solid #000; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #333; color: #fff; padding: 15px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.3em;">GLOBAL FREIGHT LOGISTICS</div>
      <div style="font-size: 0.75em; opacity: 0.8;">FMC OTI License: #0992288N • Public Tariff #042</div>
    </div>
    <div style="text-align: right;">
      <div style="font-weight: bold; font-size: 1em;">RATE FILING</div>
      <div style="font-size: 0.7em;">Ref: <span data-bracket="start" data-for="tariff">]</span>GFL-SHA-LAX-2026</div>
    </div>
  </div>

  <div style="padding: 25px;">
    <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; font-size: 0.9em; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px;">
      <div>
        <strong>Origin:</strong> Shanghai, China (CNSHA)<br>
        <strong>Destination:</strong> Los Angeles, USA (USLAX)<br>
        <strong>Commodity:</strong> General Cargo (NOS)
      </div>
      <div style="text-align: right;">
        <strong>Effective Date:</strong> MARCH 15, 2026<br>
        <strong>Expiration Date:</strong> APRIL 14, 2026<br>
        <strong>Service:</strong> Port-to-Port
      </div>
    </div>

    <table style="width: 100%; border-collapse: collapse; font-size: 0.9em; margin-bottom: 25px;">
      <tr style="border-top: 2px solid #000; border-bottom: 1px solid #000; background: #f5f5f5;">
        <th style="text-align: left; padding: 10px;">Cost Component</th>
        <th style="text-align: center; padding: 10px;">Basis</th>
        <th style="text-align: right; padding: 10px;">Amount</th>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 10px;">Ocean Freight (All-In)</td>
        <td style="text-align: center; padding: 10px;">Per 40' HC</td>
        <td style="text-align: right; padding: 10px;">$ 3,250.00</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 10px;">Bunker Adjustment (BAF)</td>
        <td style="text-align: center; padding: 10px;">Per 40' HC</td>
        <td style="text-align: right; padding: 10px;">$ 420.00</td>
      </tr>
      <tr style="font-weight: bold; background: #ffffcc;">
        <td colspan="2" style="text-align: right; padding: 10px;">TOTAL FILED RATE:</td>
        <td style="text-align: right; padding: 10px;">$ 3,670.00</td>
      </tr>
    </table>

    <div style="font-size: 0.75em; color: #666; line-height: 1.4; border: 1px solid #ccc; padding: 10px; background: #fff;">
      <strong>FMC Compliance:</strong> This rate has been filed with the Federal Maritime Commission. Any deviations or unauthorized surcharges are subject to civil penalties under the Shipping Act of 1984.
    </div>
  </div>

  <div style="padding: 20px; background: #f9f9f9; border-top: 1px solid #333; text-align: center;">
    <div data-verify-line="tariff" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #000; font-weight: bold;"
      title="Demo only: NVOCCs don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:gfreight.com/tariffs/v/SHA-LAX-2026 <span data-bracket="end" data-for="tariff">]</span>
    </div>
    <div style="font-size: 0.7em; color: #777; margin-top: 10px; font-style: italic;">
      Scan to verify the filed rate integrity, effective dates, and FMC regulatory compliance status.
    </div>
  </div>
</div>

## Data Verified

Tariff number, FMC license number, route (Origin/Destination ports), container type (e.g., 40' HC), commodity description, effective date, expiration date, base freight rate, individual surcharge amounts (BAF, CAF, PSS), total filed value, filing timestamp.

**Document Types:**
- **Tariff Rate Filing:** The primary public pricing record.
- **Service Contract Addendum:** Negotiated rates for large shippers.
- **Booking Confirmation:** (Linked hash) proving the rate was applied.
- **Invoice:** Final bill reflecting the filed tariff.

## Data Visible After Verification

Shows the issuer domain (`gfreight.com`, `expeditors.com`, `flexport.com`) and the filing standing.

**Status Indications:**
- **Current / Filed** — Rate is active and matches the official FMC filing.
- **Expired** — The validity period for this specific rate has passed.
- **Amended** — **ALERT:** A corrected or updated rate filing exists.
- **Disputed** — **ALERT:** The regulator has flagged this tariff for investigation.

## Second-Party Use

The **Shipper (Exporters / Importers)** benefits from verification.

**Billing Protection:** Before paying a $50,000 ocean freight invoice, the shipper scans the original tariff hash. "Verified by Global Freight" ensures that the NVOCC isn't "Padding" the bill with surcharges that were never filed with the government, preventing over-payment.

**Audit Compliance:** Large shippers can maintain a verified library of all rates used. During a corporate audit, they can prove that their logistics spending was transparent and met all US Shipping Act requirements.

## Third-Party Use

**Federal Maritime Commission (FMC) Inspectors**
**Rapid Vetting:** During an audit of an NVOCC's records, the inspector can scan random invoices. OCR-to-hash ensures the invoice prices match the public tariff filings, stopping "Secret Rebates" or "Off-Book Deals" that distort market competition.

**Trade Finance Banks**
**Valuation Integrity:** Banks lending against "Goods in Transit" scan the verified tariffs to ensure that the "Shipping Costs" (which impact the collateral value) are accurate and legally defensible.

**Customs Brokers**
**Valuation Proof:** Providing verified tariff hashes to customs to prove the "Landings Cost" of goods for accurate duty calculation.

## Verification Architecture

**The "Invisible Fee" Fraud Problem**

- **Surcharge Padding:** Manually adding a "$200 Congestion Surcharge" to a PDF that wasn't in the filed tariff.
- **Backdating Filings:** Editing a tariff to change the "Effective Date" to hide an illegal over-charge from a prior month.
- **Rebate Hiding:** Showing a high rate on the public tariff while secretly giving a lower, un-filed rate to a preferred customer.

**Issuer Types**

**Global NVOCCs.**
**Tariff Publishing Services (e.g., Descartes, Catapult).**
**National Maritime Regulators.**

**Privacy Salt:** Essential. Specific customer names and trade volumes are sensitive business secrets. The hash must be salted to prevent competitors from mapping a rival's cargo flow.

## Rationale

NVOCC tariffs are the "Rules of the Road" for global trade. By turning static price sheets into verifiable digital bridges, we ensure that the transparency required by law is backed by cryptographic proof, protecting shippers and fair competition.