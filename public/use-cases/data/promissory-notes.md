# Promissory Notes and Loan Documents

**Category:** Financial & Legal Documents
**Volume:** Medium-Small
**Retention:** Loan term + 7-10 years

## Data Verified

Borrower name, lender name, principal amount, interest rate, payment terms (amount, frequency, due date), loan date, maturity date, collateral description (if secured), default provisions, prepayment terms, signatures, any endorsements.

**Document Types:**
- **Simple Promissory Note:** Basic promise to pay
- **Secured Promissory Note:** Note secured by collateral
- **Demand Note:** Payable on demand
- **Installment Note:** Regular periodic payments
- **Balloon Note:** Small payments with large final payment
- **Convertible Note:** Converts to equity (startups)
- **Mortgage Note:** Note secured by real property
- **Auto Loan Note:** Note secured by vehicle

**Negotiable Instrument:** Promissory notes may be negotiable instruments under UCC Article 3, meaning they can be transferred by endorsement.

## Data Visible After Verification

Shows the issuer domain (the lender) and the responder text.

**Status Indications:**
- **Active** - Loan is current and in repayment
- **Paid in Full** - Loan has been satisfied
- **Default** - Borrower is in default
- **Accelerated** - Full balance due immediately
- **Discharged** - Discharged in bankruptcy
- **Modified** - Terms have been modified

**Balance Information:** Verification may indicate: "Active - Current, next payment [date]."

## Second-Party Use (Borrower Verifying Their Own Note)

Borrowers benefit from verification.

**Term Confirmation:** Verify loan terms match what was agreed.

**Rate Verification:** Confirm interest rate is correctly recorded.

**Payment Tracking:** Verify payments are properly credited.

**Payoff Verification:** Verify loan is shown as paid after payoff.

**Dispute Documentation:** Document loan terms for disputes.

## Third-Party Use

**Note Purchasers**

Secondary market:

**Due Diligence:** Verify note before purchasing.

**Terms Confirmation:** Confirm stated terms match original.

**Status Verification:** Verify current payment status.

**Chain of Endorsement:** Verify proper endorsement chain.

**Courts**

Legal proceedings:

**Collection Cases:** Verify note in debt collection litigation.

**Bankruptcy Proceedings:** Verify claims in bankruptcy.

**Foreclosure:** Verify note in foreclosure actions.

**Standing Verification:** Confirm plaintiff owns the note.

**Borrower Attorneys**

Debtor representation:

**Terms Verification:** Verify terms client is disputing.

**Rate Confirmation:** Verify disclosed APR and rates.

**TILA Compliance:** Verify Truth in Lending disclosures.

**Fraud Investigation:** Verify in predatory lending cases.

**Collateral Holders**

Secured lending:

**Security Interest:** Verify note matches UCC filing.

**Priority Disputes:** Verify note terms in priority contests.

**Lien Perfection:** Verify note supports security interest.

**Successor Lenders**

Loan acquisition:

**Portfolio Purchase:** Verify notes in portfolio acquisitions.

**Servicing Transfer:** Verify when servicing rights transfer.

**Modification Verification:** Verify modification terms.

**Regulators**

Consumer protection:

**Rate Cap Compliance:** Verify rates within legal limits.

**Disclosure Requirements:** Verify required disclosures present.

**Fair Lending:** Verify in discrimination investigations.

## Verification Architecture

**The Promissory Note Fraud Problem**

Note fraud causes significant harm:

- **Forged Notes:** Entirely fabricated loan documents
- **Altered Terms:** Genuine notes with changed rates or amounts
- **Unauthorized Modification:** Changes not agreed by borrower
- **Assignment Fraud:** False claims of note ownership
- **Double Assignment:** Same note sold to multiple parties
- **Lost Note Fraud:** False "lost note" claims in foreclosure

OCR-to-hash addresses forgery and alteration. Lender verification confirms authentic terms.

**Lenders as Issuers**

Various lenders issue notes:

**Banks and Credit Unions:** Traditional financial institutions.

**Mortgage Companies:** Residential and commercial lenders.

**Auto Finance Companies:** Vehicle lenders.

**Private Lenders:** Individual and hard money lenders.

**Peer-to-Peer Platforms:** Online lending platforms.

Each lender operates verification endpoints for notes they issue.

**Negotiability and Endorsement**

UCC Article 3 requirements:

**Holder in Due Course:** Protection for good faith purchasers.

**Endorsement Chain:** Tracking note transfers.

**Allonge:** Additional page for endorsements.

**Bearer vs. Order:** How note may be transferred.

Verification should track endorsement: "Original Lender: [X], Current Holder: [Y]."

**Secured vs. Unsecured**

Collateral considerations:

**Mortgage Notes:** Secured by real property.

**Auto Notes:** Secured by vehicle.

**Equipment Notes:** Secured by equipment.

**Unsecured Notes:** No collateral.

Verification may reference: "Secured by [collateral], UCC filed [date]."

**Loan Modification**

Changes to original terms:

**Rate Modification:** Interest rate changes.

**Term Extension:** Extending maturity date.

**Principal Reduction:** Reducing amount owed.

**Forbearance:** Temporary payment relief.

Modified notes should verify as: "Modified [date] - Original [terms], Modified [terms]."

**Default and Acceleration**

When borrowers fail to pay:

**Payment Default:** Missing scheduled payments.

**Cross-Default:** Default on related obligations.

**Acceleration Clause:** Full balance due immediately.

**Cure Rights:** Opportunity to cure before acceleration.

Verification should indicate: "Default - Accelerated [date]."

**Bankruptcy Considerations**

Insolvency impact:

**Automatic Stay:** Collection efforts halted.

**Proof of Claim:** Creditor files claim with court.

**Discharge:** Personal liability may be discharged.

**Secured Claims:** Collateral protects secured portion.

Verification may indicate: "Discharged in bankruptcy [date]" or "Bankruptcy stay in effect."

**Satisfaction and Release**

Loan payoff:

**Satisfaction of Note:** Lender marks note paid.

**Lien Release:** Security interest released.

**Payoff Letter:** Statement of payoff amount.

**Recording:** Release recorded for real property.

Post-payoff verification: "Paid in Full [date]."

**State Law Variations**

Lending regulations vary:

**Usury Laws:** Maximum interest rate limits.

**Disclosure Requirements:** State-specific disclosures.

**Foreclosure Procedures:** Judicial vs. non-judicial.

**Consumer Protections:** State consumer lending laws.

Verification confirms compliance: "Valid under [state] law."

**Electronic Notes**

Digital lending:

**E-Note:** Electronic promissory note.

**E-Signature:** Electronic signature on note.

**MERS:** Mortgage Electronic Registration System.

**Transferable Records:** UCC Article 9 electronic records.

Electronic notes may have native verification; OCR-to-hash bridges paper notes.

