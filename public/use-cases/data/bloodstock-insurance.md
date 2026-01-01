---
title: "Bloodstock Insurance (Racehorses)"
category: "Specialty Insurance"
volume: "Very Small"
retention: "Horse lifetime (15-25 years)"
slug: "bloodstock-insurance"
tags: ["horse-racing", "bloodstock", "insurance", "lloyds", "mortality", "breeding", "livestock"]
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 2px solid #002366; background: #fff; padding: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="background: #002366; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;">LLOYD'S OF LONDON</div>
      <div style="font-size: 0.8em;">Specialist Bloodstock Syndicate 1967</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Policy #: B-9988-BS-26</div>
    </div>
  </div>

  <div style="padding: 35px;">
    <h2 style="text-align: center; color: #002366; font-size: 1.4em; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 1px;">Certificate of Bloodstock Insurance</h2>

    <div style="font-size: 1em; line-height: 1.6; color: #333;">
      <p>This is to certify that insurance has been effected on the following animal:</p>

      <div style="background: #f9f9f9; border: 1px solid #ddd; padding: 15px; margin: 20px 0;">
        <strong>Animal Name:</strong> <span data-bracket="start" data-for="horse">]</span>"MIDNIGHT RUNNER" (2022 Colt)<br>
        <strong>Sire/Dam:</strong> Galileo / Urban Sea<br>
        <strong>Registration:</strong> Weatherbys ID #992288
      </div>

      <p><strong>Insured Value:</strong> $ 12,500,000.00 (Twelve Million Five Hundred Thousand USD)</p>
      
      <p><strong>Coverage:</strong> All Risks of Mortality, including Infertility & Theft.<br>
      <strong>Territory:</strong> Worldwide, including transit.</p>

      <p><strong>Effective:</strong> 01 JAN 2026 to 01 JAN 2027</p>
    </div>

    <div style="margin-top: 40px; border-top: 1px solid #ccc; padding-top: 10px; font-size: 0.8em; color: #666; font-style: italic;">
      Subject to veterinary certificate of health dated within 30 days of inception.
    </div>

    <div data-verify-line="horse" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Lloyd's Syndicate doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:lloyds-bloodstock.com/v/B9988BS <span data-bracket="end" data-for="horse">]</span>
    </div>
  </div>
</div>

## Data Verified

Horse name, pedigree (Sire/Dam), registration number (Weatherbys/Jockey Club), insured value, coverage type (Mortality, AS&I - Accident, Sickness & Infertility), effective dates, syndicate identification.

**Document Types:**
- **Mortality Certificate:** The primary proof of value and coverage.
- **Veterinary Certificate of Health:** Required for policy inception (linked hash).
- **Stallion Infertility Certificate:** For breeding stock valuation.
- **Syndicate Share Certificate:** Proof of partial ownership.

## Data Visible After Verification

Shows the issuer domain (`lloyds-bloodstock.com`, `starr.com`) and policy standing.

**Status Indications:**
- **In Force** — Premium paid; horse is covered.
- **Suspended** — Pending veterinary re-exam (e.g., after injury).
- **Claim Paid** — Horse has died; policy settled.
- **Void** — Misrepresentation of value found.

## Second-Party Use

The **Horse Owner** or **Syndicate Manager** benefits from verification.

**Auction Sales:** Proving to potential buyers at Tattersalls or Keeneland that the yearling being sold for $2M is already fully insured for that amount by a top-tier syndicate.

**Breeding Contracts:** Proving to the owner of a champion mare that the stallion has "AS&I" (Infertility) insurance, ensuring that stud fees are protected if the stallion becomes unable to breed.

**International Transit:** Proving coverage to specialized equine air-freight companies (e.g., IRT) during high-stakes transcontinental shipping.

## Third-Party Use

**Auction Houses**
**Seller Vetting:** Verifying the insurance value of horses being consigned. If a seller claims a horse is worth $10M, but the verified insurance is only for $1M, it triggers a red flag for valuation fraud.

**Banks (Lenders)**
**Equine Financing:** Thoroughbreds are often used as collateral for multimillion-dollar loans. Banks verify the "Mortality" insurance to ensure the loan is protected if the horse dies.

**Racecourse Authorities**
**Entry Compliance:** Ensuring all competing horses meet the minimum liability/medical insurance requirements.

## Verification Architecture

**The "Phantom Stallion" Fraud Problem**

- **Value Padding:** Editing a $100,000 policy to look like a $1,000,000 policy to inflate the horse's value before a private sale.
- **Hidden Injuries:** Keeping an active mortality certificate while hiding a career-ending injury that has already "Suspended" the actual coverage.
- **Ownership Scams:** Forging a certificate to claim ownership of a famous horse to solicit "investments" in a fake syndicate.

**Issuer Types**

**Lloyd's Syndicates:** (Specializing in Bloodstock).
**Managing General Agents (MGAs):** (e.g., Markel, Great American).
**Equine Registries:** (Weatherbys, The Jockey Club).

## Competition vs. Registry Databases

| Feature | OCR-to-Hash | Jockey Club Registry | Paper Certificate |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Binds Value.** Proves the *insured amount*. | **Binds Identity.** Proves *who* the horse is. | **Zero.** Easily faked. |
| **Confidentiality** | **High.** Only the specific policy is verified. | **Low.** Many registries are public or easily queried. | **Medium.** |
| **Speed** | **Instant.** Scan the paper at the stable. | **Slow.** Requires login/subscription. | **Instant.** |
| **Financial Link** | **Yes.** Directly links the horse to the money. | **No.** Registries don't track insurance data. | **Vulnerable.** |

**Why OCR wins here:** Context. A registry knows the horse's name and parents. But only the Underwriter knows the **Insured Value**. OCR-to-hash turns the "Mortality Certificate" into a real-time financial link that proves exactly how much the horse is worth in the eyes of the market's professional risk-takers.
