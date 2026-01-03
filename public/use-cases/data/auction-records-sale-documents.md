---
title: "Auction Records and Sale Documents"
category: "Art, Media & Publishing"
volume: "Very Small"
retention: "Permanent (price history)"
slug: "auction-records-sale-documents"
tags: ["auction", "price-history", "hammer-price", "provenance", "collectibles", "sales-receipt"]
derivations: 1
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 2px 2px 10px rgba(0,0,0,0.05);">
  <div style="text-align: right; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.4em; color: #000;">PHILLIPS</div>
    <div style="font-size: 0.8em; color: #666;">NEW YORK • 432 PARK AVENUE</div>
  </div>

  <div style="font-size: 0.95em; line-height: 1.6; color: #333;">
    <h3 style="text-align: center; text-transform: uppercase; margin-bottom: 20px;">Purchase Statement</h3>

    <p><strong>Sale:</strong> NY010126 - Modern Masterpieces<br>
    <strong>Date:</strong> 15 March 2026<br>
    <strong>Bidder #:</strong> <span data-bracket="start" data-for="auction">]</span>9988</p>

    <div style="margin: 20px 0; border-top: 2px solid #000; padding-top: 15px;">
      <table style="width: 100%;">
        <tr>
          <td><strong>Lot 42:</strong> <em>The Electric Violin</em> (1962)</td>
          <td style="text-align: right;">$ 1,200,000.00</td>
        </tr>
        <tr>
          <td>Buyer's Premium:</td>
          <td style="text-align: right;">$ 300,000.00</td>
        </tr>
        <tr>
          <td>Sales Tax (8.875%):</td>
          <td style="text-align: right;">$ 133,125.00</td>
        </tr>
        <tr style="border-top: 1px solid #000; font-weight: bold; font-size: 1.1em;">
          <td>TOTAL AMOUNT DUE:</td>
          <td style="text-align: right;">$ 1,633,125.00</td>
        </tr>
      </table>
    </div>

    <p style="font-style: italic; font-size: 0.9em;">Payment received in full. Title transferred upon clearance of funds.</p>

    <div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <div style="border-top: 1px solid #000; width: 180px; padding-top: 5px;">Auction House Controller</div>
      </div>
      <div style="text-align: right; font-size: 0.8em; color: #777;">
        Invoice #: INV-9982-X
      </div>
    </div>
  </div>

  <div data-verify-line="auction" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Phillips doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:phillips.com/sales/v/NY010126-42 <span data-bracket="end" data-for="auction">]</span>
  </div>
</div>

## Data Verified

Auction house name, sale ID, lot number, artwork title/artist, hammer price, buyer's premium, total price, bidder ID (redacted/partial), date of sale, payment status.

**Document Types:**
- **Purchase Statement / Invoice:** Proving ownership and price paid.
- **Settlement Statement:** For the seller (net proceeds).
- **Price Result List:** Public list of hammer prices for a specific sale.

## Data Visible After Verification

Shows the issuer domain (`phillips.com`, `sothebys.com`) and the sale confirmation.

**Status Indications:**
- **Paid** — Funds received; title transfer verified.
- **Withdrawn** — The sale was cancelled or the item returned (e.g., authenticity dispute).
- **In-Dispute** — Payment or authenticity being litigated.

## Second-Party Use

The **Buyer** (Collector) benefits from verification.

**Estate Valuation:** Proving the "Fair Market Value" to the IRS based on a verified auction hammer price (which is the gold standard for valuation).

**Collateralized Loans:** Proving to a bank exactly what was paid for a piece last week to secure a loan based on that cost basis.

**Insurance Coverage:** Establishing the "Agreed Value" for a policy based on a verified purchase price.

## Third-Party Use

**Insurance Underwriters**
**Value Verification:** Preventing "over-insurance" where a buyer claims they paid $5M for a work they actually won for $1M. Verification of the hammer price ensures the policy limit is accurate.

**Tax Authorities (Capital Gains)**
**Cost Basis Audit:** When the collector sells the work 10 years later, the tax authority can verify the original "Purchase Statement" to confirm the starting cost basis for capital gains tax.

**Art Market Researchers**
**Price Transparency:** Verifying that "record-breaking prices" reported in the media are authentic and matched by actual paid invoices, preventing "shill bidding" or fabricated price reports.

## Verification Architecture

**The "Hammer Price" Fraud Problem**

- **Price Pumping:** Creating a fake auction invoice showing a $5M price for a piece actually worth $50k, to trick a lender or a future buyer.
- **Tax Evasion:** Fabricating an invoice with a *lower* price to reduce sales tax or import duties.
- **Identity Theft:** Using a real auction invoice from a famous collector to "legitimize" a fake version of the same painting.

**Issuer Types**

**Major Auction Houses:** (Phillips, Christie's, Sotheby's, Bonhams).
**Online Platforms:** (Artsy, LiveAuctioneers, Heritage Auctions).

## Competition vs. Public Price Databases

| Feature | OCR-to-Hash | Public Database (Artnet/Artprice) | Private PDF / Invoice |
| :--- | :--- | :--- | :--- |
| **Privacy** | **High.** Only the specific buyer/lot is verified. | **Low.** Everyone sees the price (but not who bought it). | **None.** Easily forged with Photoshop. |
| **Authority** | **Direct.** Binds the paper to the house's domain. | **Indirect.** Relies on third-party scrapers/reporters. | **Subjective.** "Is this signature real?" |
| **Detail** | **Full.** Includes premium, tax, and bidder ID. | **Partial.** Often just hammer price + premium. | **Full.** But untrusted. |

**Why OCR wins here:** An auction invoice is a private financial document. While the *price* might be public, the *fact that you paid it* is private. OCR-to-hash allows a collector to prove their cost basis to a bank or tax office without the house needing to publish private bidder data to a public database.
