# Property Deeds

**Category:** Real Estate & Property
**Volume:** Tiny (per transaction, but millions recorded annually)
**Retention:** Permanent (ownership records)

## Data Verified

Grantor name (seller), grantee name (buyer), property address, legal description (metes and bounds, lot/block, or parcel number), consideration amount, notary acknowledgment, recording information (book/page or document number), deed type (warranty, quitclaim, grant, special warranty).

For multi-page deeds, there would be one verification per page. Legal descriptions often span multiple pages and are prime targets for alteration.

**Scanning Considerations:** Deeds are typically multi-page documents with complex legal descriptions, boundary references, and notary blocks. Flatbed scanning is preferred. The notary acknowledgment and recording stamp pages are particularly important to verify.

## Data Visible After Verification

Shows the issuer domain (the county recorder or land registry) and the responder text (e.g., "Verified" or "Denied").

**Status Indications:** Beyond simple verification, responses may indicate:
- **Verified - Current** - Deed is the current record of ownership
- **Verified - Superseded** - Deed was valid but a subsequent deed has been recorded
- **Verified - Encumbered** - Deed is valid but subject to recorded liens or encumbrances
- **Denied - Fraudulent Recording** - Deed was recorded but has been marked as fraudulent

**Public Ledger Link:** The verification response may include a link to the property's chain of title in the recorder's database, showing this deed's place in the ownership history.

## Second-Party Use (Property Owner Verifying Their Own Deed)

Property owners benefit from verifying deeds they hold.

**Document Authenticity:** After closing, owners can verify the recorded deed matches what was signed. Prevents clerical errors or alterations between signing and recording.

**Fraud Detection:** Owners can periodically verify no fraudulent deeds have been recorded against their property (deed fraud where criminals record fake transfers).

**Refinancing Preparation:** Before refinancing, owners can verify their ownership deed is authentic and current.

**Estate Planning:** Property owners can verify deeds are accurate before incorporating them into estate plans or trusts.

**Boundary Disputes:** In neighbor disputes, owners can verify the legal description in their deed matches the recorded version.

## Third-Party Use

**Title Companies and Title Insurance**

Title search, insurance underwriting:

**Chain of Title Verification:** Title examiners can verify each deed in the chain of title is authentic, not a fabrication inserted to create apparent ownership.

**Current Owner Confirmation:** Title companies can verify the seller's deed is genuine and current before insuring a new transaction.

**Claims Investigation:** When title claims arise, insurers can verify whether challenged deeds are authentic.

**Lien Priority:** Verifying recording dates and deed authenticity helps establish lien priority in competing claims.

**Lenders and Mortgage Companies**

Mortgage origination and servicing:

**Collateral Verification:** Lenders can verify the deed showing borrower ownership is authentic before funding loans.

**Subordination Requests:** When processing subordination agreements, lenders can verify existing deeds and liens.

**Foreclosure Proceedings:** Lenders can verify chain of title before initiating foreclosure.

**REO Sales:** When selling foreclosed properties, lenders can verify deed authenticity for buyers.

**Real Estate Attorneys and Closing Agents**

Transaction facilitation:

**Closing Preparation:** Attorneys can verify all deeds in the transaction chain are authentic before closing.

**Deed Drafting:** After recording, attorneys can verify the recorded version matches what was drafted.

**Dispute Resolution:** In property disputes, attorneys can verify which deeds are authentic recordings.

**Estate Administration:** Attorneys handling estates can verify property deeds for probate.

**Government Agencies**

Tax assessment, land use, condemnation:

**Property Tax Assessment:** Assessors can verify ownership for tax billing purposes.

**Eminent Domain:** Agencies can verify ownership before initiating condemnation proceedings.

**Permit Issuance:** Building departments can verify applicant ownership before issuing permits.

**Environmental Remediation:** Agencies can verify ownership chains for Superfund or contamination liability.

**Buyers and Their Agents**

Due diligence before purchase:

**Seller Verification:** Buyers can verify the seller actually owns the property via authentic deed.

**Legal Description Accuracy:** Buyers can verify the legal description matches the physical property they're purchasing.

**Encumbrance Discovery:** Verification responses indicating encumbrances alert buyers to potential issues.

## Verification Architecture

**The Deed Fraud Problem**

Property deed fraud takes several forms:

- **Forged Deeds:** Criminals forge owner signatures to transfer property to themselves or accomplices
- **Identity Theft:** Criminals impersonate owners using stolen identities to execute valid-looking deeds
- **Vacant Property Scams:** Targeting vacant properties where owners are unlikely to notice fraudulent recordings
- **Equity Stripping:** Recording fraudulent deeds to obtain loans against stolen equity
- **Double Sales:** Selling the same property to multiple buyers before any recording

OCR-to-hash addresses forged and altered deeds at the document level. The county recorder's verification endpoint confirms whether a deed was actually recorded in the official chain of title.

**County Recorders as Issuers**

In the US, property recording is typically a county function:

**3,000+ Jurisdictions:** Each US county (or equivalent) maintains its own recording system.

**Recording Standards:** Most recorders accept documents meeting state statutory requirements, but systems vary widely.

**Technology Variation:** Some counties have modern digital systems; others still use paper books.

**Verification Endpoints:** Each recorder would need to operate a verification endpoint, or delegate to a state or national aggregator.

**Aggregation Options**

Given the fragmented recording landscape:

**State-Level Coordination:** States could operate aggregated verification for all counties, similar to how some states have unified court systems.

**Title Plant Operators:** Major title insurers maintain parallel records (title plants) for title searching. These could operate as verification aggregators with recorder cooperation.

**National Standards Body:** ALTA (American Land Title Association) or PRIA (Property Records Industry Association) could coordinate verification standards.

**Blockchain Land Registries:** Some jurisdictions have experimented with blockchain-based land registries. These could serve as verification infrastructure.

**Legal Description Challenges**

Legal descriptions present unique OCR challenges:

**Metes and Bounds:** Narrative descriptions with bearings, distances, and monuments. Complex text that must be exactly correct.

**Lot and Block:** References to recorded plats. Simpler but requires accurate numbers.

**Parcel Numbers:** Assessor parcel numbers used in some jurisdictions. Numeric and relatively OCR-friendly.

**Multi-Page Descriptions:** Large parcels may have legal descriptions spanning several pages. Per-page verification prevents page substitution.

For deed verification, exact character-for-character matching of legal descriptions is critical—a single character change could describe a different property.

**Chain of Title Considerations**

Deeds exist in chains of ownership:

**Supersession:** When property transfers, the new deed supersedes but doesn't invalidate the old deed. Both are valid documents; the verification response should indicate current vs. historical status.

**Parallel Chains:** When property is subdivided, multiple current deeds may derive from a single parent deed.

**Merger:** When adjacent parcels are combined, multiple deeds may be superseded by a single new deed.

The verification response should contextualize the deed within the chain: "Verified - Superseded by recording 2024-123456" or "Verified - Current owner of record."

**Lien and Encumbrance Integration**

Deeds don't exist in isolation:

**Mortgages and Deeds of Trust:** Security instruments affecting the property.

**Easements:** Rights of way and use restrictions.

**Liens:** Tax liens, mechanic's liens, judgment liens.

**Covenants:** Restrictive covenants running with the land.

A comprehensive verification response might indicate: "Deed Verified - Subject to recorded encumbrances (see chain of title link)."

**Recording Lag Considerations**

Unlike instantaneous digital transactions, deed recording has inherent delays:

**Gap Period:** Between signing and recording, the deed is valid but not yet in the public record.

**Recording Queue:** Recorders may have backlogs; documents are recorded in order received.

**Index Delay:** Even after recording, indexing for search may take additional time.

Verification can only confirm recorded documents. Unrecorded deeds (valid between parties but not yet public) cannot be verified until recording completes.
