# Escrow Instructions and Closing Documents

**Category:** Real Estate & Property
**Volume:** Very Small (per transaction, but high value)
**Retention:** 7-10 years (transaction disputes, title claims)

## Data Verified

Buyer name(s), seller name(s), property address and legal description, escrow officer name, escrow company, escrow number, lender name, purchase price, earnest money amount, closing date, wire instructions, contingencies, prorations, closing costs allocation.

**Document Types:**
- **Escrow Instructions:** Detailed instructions from all parties to escrow holder
- **Closing Disclosure (CD):** TRID-required disclosure of final terms and costs
- **Settlement Statement (HUD-1):** Detailed accounting of transaction (still used for some transactions)
- **Wire Instructions:** Bank details for fund transfers
- **Closing Confirmation:** Final confirmation that transaction closed
- **Disbursement Summary:** How funds were distributed

**The Wire Fraud Problem:** Real estate wire fraud causes hundreds of millions in annual losses. Criminals intercept email communications and send fake wire instructions. Verification of wire instruction documents against escrow company records is critical.

## Data Visible After Verification

Shows the issuer domain (the escrow/title company) and the responder text.

**Status Indications:**
- **Active** - Escrow is open, transaction in progress
- **Closed** - Transaction successfully closed
- **Cancelled** - Transaction cancelled, escrow terminated
- **Disputed** - Dispute between parties, funds held
- **Amended** - Instructions have been amended

**Wire Instruction Verification:** For wire instructions specifically, verification should confirm: "These wire instructions were issued by [escrow company] for escrow #[number]."

## Second-Party Use (Transaction Parties Verifying Their Own Documents)

Buyers and sellers benefit from verification.

**Instruction Verification:** After signing escrow instructions, parties verify they're correctly recorded.

**Wire Instruction Authentication:** Before wiring funds, buyers verify wire instructions are genuine—not a fraud attempt.

**Closing Disclosure Review:** Verify CD matches agreed terms before closing.

**Disbursement Confirmation:** After closing, sellers verify disbursement matched instructions.

**Document Retention:** Maintain verified closing documents for tax and title purposes.

## Third-Party Use

**Lenders**

Loan closing:

**Closing Verification:** Lenders verify closing documents match loan terms.

**Wire Coordination:** Verify escrow wire instructions before funding.

**Settlement Review:** Verify costs and prorations are correct.

**Loan Package Verification:** Verify all required documents are genuine.

**Post-Closing Audit:** Verify closed transactions for quality control.

**Title Insurance Companies**

Title underwriting:

**Escrow Verification:** Title companies (often same as escrow) verify document authenticity.

**Premium Calculation:** Verify transaction details for premium calculation.

**Policy Issuance:** Verify closing occurred before issuing policy.

**Claims Investigation:** Verify closing documents in title claims.

**Real Estate Agents**

Transaction coordination:

**Commission Verification:** Agents verify disbursement includes correct commission.

**Client Protection:** Help clients verify wire instructions before sending funds.

**Transaction Tracking:** Verify escrow status throughout transaction.

**Dispute Resolution:** Verify documents when disputes arise.

**Attorneys**

Legal representation:

**Document Review:** Attorneys verify documents on behalf of clients.

**Closing Representation:** Verify documents at closing table.

**Dispute Litigation:** Verify documents in transaction disputes.

**Estate Transactions:** Verify documents in probate sales.

**Government Agencies**

Recording and taxes:

**Recorder's Office:** Verify documents before recording.

**Tax Assessor:** Verify sale price for assessment purposes.

**Transfer Tax:** Verify transaction details for transfer tax calculation.

**FinCEN:** Geographic Targeting Orders require transaction verification.

**Auditors and Forensic Accountants**

Financial investigation:

**Transaction Verification:** Verify real estate transactions in audits.

**Fraud Investigation:** Verify documents in suspected fraud cases.

**Divorce Proceedings:** Verify property transactions in divorces.

**Estate Accounting:** Verify transactions in estate administration.

## Verification Architecture

**The Real Estate Wire Fraud Problem**

Wire fraud in real estate is epidemic:

- **Business Email Compromise (BEC):** Criminals hack email accounts, send fake wire instructions
- **Spoofed Emails:** Emails appearing to come from escrow officers
- **Domain Spoofing:** Fake domains similar to real escrow companies
- **Last-Minute Changes:** Fraudulent "updated" wire instructions near closing
- **Social Engineering:** Phone calls claiming to be escrow officers

OCR-to-hash provides critical protection: buyers can verify wire instructions against the escrow company's records before sending funds. If the document doesn't verify, don't wire.

**Escrow/Title Companies as Issuers**

Escrow and title companies issue closing documents:

**National Title Companies:** First American, Fidelity, Old Republic, Stewart.

**Regional Companies:** Local and regional escrow/title providers.

**Attorney States:** In some states, attorneys handle closings.

**Escrow-Only Companies:** Independent escrow companies (common in California).

Each would operate verification endpoints for their issued documents.

**Wire Instruction Verification Workflow**

Specific workflow for wire fraud prevention:

1. Escrow company issues wire instructions with verification URL
2. Buyer receives instructions (email, portal, mail)
3. Before wiring, buyer verifies document against escrow company's endpoint
4. Verification confirms: escrow number, amount, receiving bank, account number
5. If verification fails, buyer calls escrow company at known number (not from email)

This breaks the wire fraud attack chain.

**TRID and Closing Disclosure**

Federal regulations require specific disclosures:

**Loan Estimate (LE):** Initial disclosure of loan terms and costs.

**Closing Disclosure (CD):** Final disclosure, must be received 3 days before closing.

**Comparison Requirements:** CD must match LE within tolerances.

**Verification Support:** Verification confirms the CD buyer received matches lender's records.

**Multi-Party Document Flow**

Closing involves multiple parties:

**Buyer → Escrow ← Seller**
**Lender → Escrow ← Title Company**
**Agents → Escrow ← Attorneys**

Each party may receive documents. Verification confirms all parties received the same documents.

**Amendment Tracking**

Escrow instructions are frequently amended:

**Contingency Removals:** Inspection, financing contingencies removed.

**Closing Date Changes:** Delays requiring amended instructions.

**Price Adjustments:** Credits, repairs affecting price.

**Party Changes:** Changes to how title is held.

Each amendment should be separately verifiable, with clear version tracking.

**Earnest Money and Deposits**

Initial deposits require documentation:

**Receipt Verification:** Verify escrow received earnest money.

**Deposit Instructions:** Verify deposit handling instructions.

**Dispute Holds:** When transactions fail, verify instructions for deposit disposition.

**Interpleader:** In disputes, verified documents support interpleader actions.

**Commercial Transaction Considerations**

Commercial real estate closings are more complex:

**Multiple Properties:** Portfolio transactions with multiple parcels.

**Entity Documentation:** Corporate resolutions, LLC authorizations.

**Due Diligence Items:** Environmental, lease, financial documentation.

**Longer Timelines:** Extended due diligence periods.

**Larger Wire Amounts:** Higher stakes for wire fraud.

**Post-Closing Verification**

After closing, verification continues to matter:

**Recording Confirmation:** Verify documents were recorded.

**Disbursement Verification:** Verify funds went to correct parties.

**Policy Issuance:** Verify title insurance was issued.

**Audit Trail:** Maintain verified documents for future reference.

**Dispute Resolution:** Verified documents support dispute resolution.

**Integration with Recording**

Recorded documents become public record:

**Document Recording:** Deeds, mortgages recorded with county.

**Recording Reference:** Book/page or document number assigned.

**Public Record Verification:** Recorded documents verifiable against county records.

**Chain of Title:** Verified documents support chain of title.
