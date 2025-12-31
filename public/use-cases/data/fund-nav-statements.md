---
title: "Fund NAV Statements and Capital Account Statements"
category: "Investment & Wealth Management"
volume: "Medium (daily for many funds, monthly/quarterly for others)"
retention: "7-10 years (tax, audit, dispute resolution)"
slug: "fund-nav-statements"
tags: ["fund", "statements", "investment", "wealth", "management"]
---
## Data Verified

Fund name, fund administrator name, investor name, account/investor ID, statement date, NAV per share/unit, shares/units held, capital account value, period performance, management fee, performance fee (if applicable), any redemption or subscription activity.

**Document Types:**
- **Daily NAV Statements:** Hedge funds, liquid alternatives
- **Monthly Capital Account Statements:** Private equity, hedge funds
- **Quarterly Statements:** Private equity, venture capital, real estate funds
- **Annual K-1/Tax Statements:** Tax reporting documents
- **Redemption/Subscription Confirmations:** Transaction confirmations

**The Madoff Lesson:** Bernie Madoff self-administered his fund—no independent third party verified or issued statements. Modern institutional practice requires third-party administrators precisely because self-issued statements invite fraud. OCR-to-hash verification adds another layer: even with a third-party administrator, investors can verify the statement they received actually came from that administrator.

## Data Visible After Verification

Shows the issuer domain (the fund administrator) and the responder text.

**Status Indications:**
- **Verified** - Statement matches administrator records
- **Restated** - A corrected statement has been issued
- **Preliminary** - Subject to final NAV calculation
- **Audited** - Year-end audited figures

**NAV Confirmation:** Verification may confirm key figures: "Verified - NAV $127.43 as of [date]."

## Second-Party Use

Investors (limited partners, shareholders) are the second party.

**Statement Authenticity:** Verify the statement received actually came from the administrator, not fabricated by a fraudulent GP.

**Tax Preparation:** Verify statements before providing to tax preparers.

**Personal Records:** Maintain verified statements for wealth tracking.

**Estate Planning:** Verified statements for estate valuation.

**Due Diligence on New Investments:** Verify prior statements from managers seeking additional capital.

## Third-Party Use

**Auditors and Accountants**

Tax and financial audit:

**Tax Return Preparation:** Verify K-1s and statements for tax filings.

**Personal Financial Statements:** Verify fund holdings for net worth statements.

**Estate Valuation:** Verify for estate tax purposes.

**Audit Support:** Verify statements during personal or entity audits.

**Family Offices**

Consolidated wealth management:

**Aggregation:** Verify statements across multiple fund investments.

**Performance Tracking:** Verify reported returns match independent calculations.

**Manager Due Diligence:** Verify statements when evaluating managers.

**Reporting to Principals:** Verify before including in family reports.

**Institutional Investors**

Pension funds, endowments, foundations:

**Portfolio Reporting:** Verify alternative investment holdings.

**Board Reporting:** Verify figures for investment committee reports.

**Regulatory Filings:** Verify for required disclosures.

**Manager Monitoring:** Ongoing verification of manager-reported values.

**Fund-of-Funds**

Multi-manager investing:

**NAV Calculation:** Verify underlying fund NAVs for FoF valuation.

**Investor Reporting:** Verify before reporting to own investors.

**Lookthrough Analysis:** Verify for exposure analysis.

**Prime Brokers and Lenders**

Secured lending:

**Collateral Valuation:** Verify NAV for fund-level credit facilities.

**Margin Calculations:** Verify for prime brokerage margin.

**Covenant Monitoring:** Verify NAV for loan covenant compliance.

**Regulators (Limited Cases)**

Where applicable:

**SEC Registered Funds:** Mutual funds, registered closed-end funds.

**ERISA Plans:** Pension fund alternative investments.

**Insurance Companies:** Statutory filings for insurer investments.

Note: Unlike banks submitting to the Fed, hedge funds generally have no statutory requirement to submit NAV hashes to regulators. Verification is contractual (between fund, administrator, and investor) rather than statutory.

## Verification Architecture

**The Fund Valuation Fraud Problem**

NAV fraud takes several forms:

- **Fabricated Statements:** Entirely fake statements (the Madoff pattern)
- **Inflated Valuations:** Overstating illiquid asset values
- **Stale Pricing:** Using outdated prices for hard-to-value assets
- **Side Pocket Manipulation:** Misrepresenting side pocket values
- **Fee Miscalculation:** Incorrect management or performance fees
- **Fictitious Performance:** Reporting returns that didn't occur

OCR-to-hash addresses fabricated statements by verifying the administrator actually issued them. Valuation accuracy remains a separate auditing function.

**Fund Administrators as Issuers**

Third-party administrators issue NAV statements:

**Major Administrators:** SS&C, Citco, Northern Trust, BNY Mellon, State Street, MUFG.

**Specialist Administrators:** HedgeServ, Apex Group, Alter Domus.

**Bank Administrators:** Large bank trust and custody divisions.

Each administrator operates verification endpoints for statements they issue.

**Why No Statutory Hash Submission?**

Unlike banks and insurers:

**Accredited Investors:** Hedge fund investors are (theoretically) sophisticated enough to perform their own due diligence.

**Private Offerings:** Reg D exemptions mean less regulatory oversight.

**No Systemic Risk (Supposedly):** Individual fund failures don't threaten the financial system (unlike bank runs).

**Contractual Protections:** LPAs and subscription docs define administrator requirements.

The policy assumption is that the super-wealthy can look after themselves. Madoff showed this assumption's limits, but statutory hash submission remains unlikely.

**Contractual Verification Architecture**

Without statutory requirements, verification is contractual:

**LPA Requirements:** Partnership agreements may specify administrator requirements.

**Investor Rights:** Side letters may grant additional verification rights.

**Operational Due Diligence:** Institutional investors verify administrator practices pre-investment.

**Annual Audits:** Fund audits verify NAV accuracy (but after the fact).

OCR-to-hash adds real-time verification that statements came from the claimed administrator.

**NAV Calculation Process**

How NAVs are calculated:

**Pricing Sources:** Bloomberg, Reuters, broker quotes, valuation firms.

**Fair Value Hierarchy:** Level 1 (quoted), Level 2 (observable), Level 3 (unobservable).

**Administrator Independence:** Administrator should price independently of GP.

**Pricing Committees:** Governance for illiquid asset valuation.

Verification confirms the administrator issued the statement; it doesn't validate the underlying pricing methodology.

**Statement Frequency**

Different fund types:

**Daily:** Liquid hedge funds, mutual funds, ETFs.

**Monthly:** Most hedge funds.

**Quarterly:** Private equity, venture capital, real estate funds.

**Annual:** Final audited statements.

High-frequency statements (daily) benefit most from automated verification.

**Performance Reporting Standards**

Industry standards:

**GIPS:** Global Investment Performance Standards.

**ILPA Guidelines:** Institutional Limited Partners Association standards.

**AIMA DDQs:** Alternative Investment Management Association due diligence questionnaires.

Verification supports compliance with these standards by confirming statement authenticity.

