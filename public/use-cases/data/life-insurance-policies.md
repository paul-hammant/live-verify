---
title: "Life Insurance Policies"
category: "Personal Lines Insurance"
volume: "Small"
retention: "Policy lifetime (50+ years)"
slug: "life-insurance-policies"
tags: ["life", "insurance", "policies", "personal", "lines"]
---
## Data Verified

Insured name, date of birth, policy number, policy type, face amount (death benefit), premium amount and frequency, beneficiary names and designations, policy date and effective date, underwriting class, any riders or endorsements, cash value provisions (for permanent policies), insurer name.

**Policy Types:**
- **Term Life:** Coverage for specified period (10, 20, 30 years)
- **Whole Life:** Permanent coverage with cash value
- **Universal Life:** Flexible premium permanent insurance
- **Variable Life:** Investment-linked permanent insurance
- **Variable Universal Life:** Combines variable and universal features
- **Final Expense/Burial:** Smaller policies for end-of-life costs
- **Group Life:** Employer-provided coverage

**Multi-Page Considerations:** Life insurance policies are often lengthy documents (30-100+ pages) with numerous riders. Per-page verification prevents page substitution—particularly critical for beneficiary designation pages and coverage amount pages.

## Data Visible After Verification

Shows the issuer domain (the insurance company) and the responder text.

**Status Indications:**
- **In Force** - Policy is active and current
- **Lapsed** - Policy terminated for non-payment
- **Surrendered** - Policy voluntarily terminated
- **Paid-Up** - No further premiums required
- **Matured** - Policy reached maturity date
- **Claim Pending** - Death claim submitted
- **Claim Paid** - Death benefit distributed

**Coverage Confirmation:** Verification may indicate: "In Force - $500,000 death benefit."

## Second-Party Use (Policyholder Verifying Their Own Policy)

Policyholders benefit from verification.

**Policy Authenticity:** After receiving policy from agent/insurer, verify it's genuine.

**Coverage Confirmation:** Verify coverage amount matches application.

**Beneficiary Verification:** Verify beneficiary designations are correctly recorded.

**Premium Verification:** Verify premium amounts and due dates.

**Rider Confirmation:** Verify optional riders are attached as purchased.

## Third-Party Use

**Beneficiaries**

Death benefit claims:

**Pre-Death Verification:** Verify policy exists and is in force.

**Claim Filing:** Verify policy details for death claim.

**Beneficiary Confirmation:** Verify beneficiary designation.

**Coverage Amount:** Confirm death benefit amount.

**Contestability Status:** Verify policy is past contestability period.

**Estate Attorneys**

Probate and estate planning:

**Estate Inventory:** Verify policies for estate valuation.

**Trust Funding:** Verify policies owned by or payable to trusts.

**Policy Loans:** Verify outstanding policy loans.

**Tax Planning:** Verify ownership for estate tax purposes.

**Will Coordination:** Ensure policy designations align with estate plan.

**Financial Advisors**

Planning and review:

**Coverage Analysis:** Verify existing coverage for needs analysis.

**Policy Review:** Verify policy performance and status.

**Replacement Decisions:** Verify existing policy before recommending replacement.

**Portfolio Integration:** Verify policies as part of financial plan.

**Lenders**

Collateral and credit:

**Collateral Assignment:** Verify policies assigned as loan collateral.

**Policy Loans:** Verify available cash value for policy loans.

**Credit Life:** Verify policies covering loan balances.

**Business Loans:** Verify key person policies for business lending.

**Insurers**

Industry coordination:

**Policy Replacement:** Verify existing coverage for replacement regulations.

**Reinstatement:** Verify policy status for reinstatement requests.

**Reinsurance:** Verify policies for reinsurance purposes.

**Fraud Investigation:** Verify policies in suspected fraud cases.

**Divorce Attorneys**

Marital dissolution:

**Marital Asset:** Verify policy cash value for asset division.

**Beneficiary Changes:** Verify beneficiary status during divorce.

**Support Security:** Verify policies securing alimony/child support.

**QDRO Alternative:** Life insurance in lieu of retirement division.

**Business Partners**

Business insurance:

**Buy-Sell Agreements:** Verify policies funding buy-sell agreements.

**Key Person Insurance:** Verify coverage on key employees.

**Partnership Dissolution:** Verify policies upon partner death.

**Loan Guarantee Support:** Verify policies supporting business loans.

**Courts**

Legal proceedings:

**Divorce Proceedings:** Verify policies in asset division.

**Creditor Claims:** Verify policies in debt collection.

**Interpleader Actions:** Verify policies with competing claimants.

**Beneficiary Disputes:** Verify designation in beneficiary litigation.

## Verification Architecture

**The Life Insurance Fraud Problem**

Fraudulent policies enable various schemes:

- **Forged Policies:** Entirely fake policies from non-existent insurers
- **Altered Coverage:** Genuine policies with inflated death benefits
- **Beneficiary Fraud:** Policies with altered beneficiary designations
- **Lapse Misrepresentation:** Lapsed policies presented as in force
- **Premium Fraud:** Policies with falsified premium status
- **Impersonation:** Policies falsely attributed to major insurers

OCR-to-hash addresses forgery and alteration. Insurer verification confirms current status.

**Insurance Companies as Issuers**

Life insurers issue and verify policies:

**Major Carriers:** MetLife, Prudential, Northwestern Mutual, New York Life.

**Stock Companies:** Publicly traded insurers.

**Mutual Companies:** Policyholder-owned insurers.

**Fraternal Organizations:** Fraternal benefit societies.

Each company operates verification endpoints for policies they issue.

**MIB Group (Medical Information Bureau)**

Industry database:

**MIB Database:** Underwriting information shared among insurers.

**Policy Existence:** Confirmation that coverage exists.

**Underwriting History:** Prior application information.

**Fraud Prevention:** Detection of multiple applications.

MIB data complements insurer-specific verification.

**Beneficiary Designations**

Who receives the death benefit:

**Primary Beneficiary:** First in line for benefit.

**Contingent Beneficiary:** Receives if primary predeceases.

**Irrevocable Beneficiary:** Cannot be changed without consent.

**Revocable Beneficiary:** Can be changed by policyholder.

**Per Stirpes/Per Capita:** How benefit divides among descendants.

Beneficiary verification is critical: "Verified - Primary beneficiary: [name]."

**Policy Loans and Liens**

Encumbrances on policies:

**Policy Loans:** Loans against cash value.

**Collateral Assignments:** Policy assigned as loan security.

**Automatic Premium Loans:** Cash value used for unpaid premiums.

**Lien Recording:** Liens against policy death benefit.

Verification should indicate: "In Force - Outstanding policy loan: $[X]."

**Incontestability**

Time-limited contestability:

**Contestability Period:** Typically first two years.

**Suicide Clause:** Suicide exclusion period.

**Material Misrepresentation:** Basis for contest.

**Post-Contestability:** Insurer cannot contest after period expires.

Verification may indicate: "In Force - Past contestability period."

**Grace Periods and Lapse**

Policy termination:

**Grace Period:** Time to pay overdue premium (typically 30-31 days).

**Lapse Notice:** Required notice before lapse.

**Reinstatement:** Restoring lapsed policy.

**Automatic Premium Loan:** Prevents lapse using cash value.

Real-time status verification critical: policies can lapse unexpectedly.

**Cash Value and Surrender**

Permanent policy values:

**Cash Value:** Accumulated policy value.

**Surrender Value:** Net value if policy terminated.

**Paid-Up Insurance:** Reduced coverage without further premiums.

**Extended Term:** Term coverage using cash value.

Verification may indicate: "In Force - Current cash value: $[X]."

**Riders and Endorsements**

Policy modifications:

**Accidental Death:** Additional benefit for accidental death.

**Waiver of Premium:** Waives premiums upon disability.

**Accelerated Death Benefit:** Access to benefits while living.

**Long-Term Care Rider:** LTC benefits within life policy.

**Child Term Rider:** Coverage on children.

Per-page verification covers rider pages: "Verified - Includes waiver of premium, ADB riders."

**Group Life Insurance**

Employer-provided coverage:

**Certificate of Coverage:** Employee's evidence of group coverage.

**Basic and Supplemental:** Employer-paid and voluntary coverage.

**Conversion Rights:** Convert to individual policy upon termination.

**Portability:** Continue coverage after leaving employer.

Group certificates should be verifiable through employer/insurer.

**Life Settlements and Viaticals**

Secondary market transactions:

**Life Settlement:** Selling policy for more than surrender value.

**Viatical Settlement:** Sale by terminally ill insured.

**Investor Verification:** Buyers verify policy before purchase.

**Continuing Premium:** Investors verify ongoing status.

Life settlement investors need ongoing verification of policy status.

**Retention and Historical Policies**

Very long document lifetime:

**50+ Year Retention:** Policies may be in force for decades.

**Historical Records:** Insurers maintain records for century or more.

**Merger Succession:** Policies from acquired companies.

**Demutualization:** Mutual company conversions.

Verification must accommodate very old policies from predecessor companies.

