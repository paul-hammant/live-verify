---
title: "Commercial Insurance Policy Documents"
category: "Insurance Claims & Operations"
volume: "Medium-Large"
retention: "Policy term + 7-10 years"
slug: "insurance-policy-documents"
tags: ["commercial-insurance", "policy-declarations", "endorsements", "certificate-of-insurance", "coi-verification", "risk-management", "compliance-audit"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #333; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #333; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;">MARSH McLENNAN</div>
      <div style="font-size: 0.8em; opacity: 0.8;">Commercial Lines Placement Summary</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Client Ref: 99228877</div>
    </div>
  </div>

  <div style="padding: 30px;">
    <h2 style="text-align: center; color: #333; font-size: 1.4em; margin-bottom: 20px; text-transform: uppercase;">Policy Evidence Portfolio</h2>

    <div style="font-size: 0.9em; line-height: 1.6; color: #333;">
      <p><strong>Insured:</strong> <span data-bracket="start" data-for="ins-pol">[</span>Global Logistics Solutions, Corp.<br>
      <strong>Period:</strong> March 01, 2026 to March 01, 2027</p>

      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr style="background: #f5f5f5; border-bottom: 2px solid #333;">
          <th style="text-align: left; padding: 8px;">Line of Coverage</th>
          <th style="text-align: right; padding: 8px;">Primary Limit</th>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">General Liability (Chubb)</td>
          <td style="text-align: right; padding: 8px; border-bottom: 1px solid #eee;">$ 2,000,000</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">Workers Comp (Travelers)</td>
          <td style="text-align: right; padding: 8px; border-bottom: 1px solid #eee;">$ 1,000,000</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">Cyber Liability (AIG)</td>
          <td style="text-align: right; padding: 8px; border-bottom: 1px solid #eee;">$ 5,000,000</td>
        </tr>
      </table>

      <p style="font-size: 0.8em; color: #555;"><strong>Note:</strong> All policies include Waivers of Subrogation and Primary/Non-Contributory endorsements as required by Master Service Agreement.</p>
    </div>

    <div data-verify-line="ins-pol" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Broker/Carrier doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:marsh.com/portfolio/v/99228877 <span data-bracket="end" data-for="ins-pol">]</span>
    </div>
  </div>
</div>

## Data Verified

Insured name, policy numbers across multiple lines (GL, WC, Auto, Cyber), individual coverage limits, effective/expiration dates per line, deductible structures, endorsement presence (e.g., Additional Insured), issuing carriers (NAIC codes), Broker ID.

**Document Types:**
- **Evidence of Commercial Insurance:** The master summary for large clients.
- **Policy Declarations (Dec Pages):** The 1-2 page line-specific summaries.
- **Schedule of Forms:** (Linked hash) listing all 50+ endorsements in the file.
- **Premium Audit Report:** Proving the final adjusted cost.

## Data Visible After Verification

Shows the issuer domain (`marsh.com`, `aon.com`, `chubb.com`) and the status of the entire portfolio.

**Status Indications:**
- **All Active** — Every policy in the summary is current and premium-paid.
- **Segment Cancelled** — **ALERT:** One specific line (e.g., Cyber) has lapsed.
- **Superseded** — Mid-term changes occurred; download new evidence.
- **Audit Pending** — Policy active but final payroll figures unverified.

## Second-Party Use

The **Insured Business** benefits from verification.

**Master Service Agreement (MSA) Compliance:** Proving to a Fortune 500 client that the business has the complex, multi-layered insurance required by the contract. A verified "Portfolio Summary" prevents the client's procurement team from rejecting the vendor due to "Missing Endorsements."

**Credit Line Renewal:** Providing verified proof of total asset protection to a lender, ensuring the company's risk is properly mitigated before capital is released.

## Third-Party Use

**Enterprise Procurement / Vendor Teams**
**Continuous Monitoring:** Instead of manually checking 1,000 separate COIs every year, procurement software can scan the hashes. If a "Segment Cancelled" alert appears on a vendor's hash, the system automatically blocks their access to sensitive data or sites.

**General Contractors (GCs)**
**Site Compliance:** Verifying that a large subcontractor has all three mandatory lines (GL, WC, Auto) verified active before they move a crane onto the project.

**M&A Due Diligence**
**Legacy Audit:** Instantly verifying the "Retroactive Dates" and "Tail Coverage" of a target company's historical insurance portfolio.

## Verification Architecture

**The "Document Gaps" Fraud Problem**

- **Selective Deletion:** Editing a multi-line summary to hide that the "Cyber" policy was cancelled for poor security.
- **Ghost Endorsements:** Claiming a policy has a "Waiver of Subrogation" on the summary sheet when the underlying policy actually excludes it.
- **Limit Inflation:** Changing a $1M "Umbrella" limit to $10M to meet a high-stakes contract requirement.

**Issuer Types**

**Global Brokerages:** (Marsh, Aon, WTW).
**Multi-Line Carriers:** (Chubb, Travelers, Liberty Mutual).
**Compliance Risk Platforms:** (e.g., myCOI, CertFocus - hosting the hashes).

## Competition vs. ACORD Data Feeds

| Feature | OCR-to-Hash | ACORD IVANS (Carrier Feed) | Scanned PDF Summary |
| :--- | :--- | :--- | :--- |
| **Interoperability** | **Universal.** Works across all brokers/carriers. | **Limited.** Only for agencies on the IVANS network. | **Universal.** |
| **Integrity** | **Cryptographic.** Binds the *Endorsements*. | **Data-Only.** Doesn't protect the actual doc. | **Zero.** Easily forged. |
| **Freshness** | **Real-time.** Shows if cancelled *today*. | **Laggy.** Often 24-48 hours behind. | **Static.** |
| **User Control** | **High.** Business shares only the *Summary*. | **Low.** Lenders see full raw data. | **High.** |

**Why OCR wins here:** The "Contractual Reality." Large businesses don't buy insurance from a single app; they buy through brokers who assemble a "Portfolio" from 5 different carriers. OCR-to-hash turns that **Broker Summary** into a live digital anchor that provides "Single Source of Truth" trust for a complex, multi-carrier risk strategy.

