# Power of Attorney Documents

**Category:** Financial & Legal Documents
**Volume:** Small
**Retention:** Duration of authority plus 10 years (potential disputes)

## Data Verified

Principal name (person granting authority), agent/attorney-in-fact name, scope of authority (general, limited, specific powers), effective date, expiration date (if any), springing conditions (if any), witness names, notarization details (notary name, commission, date), any limitations or restrictions.

**Document Types:**
- **General Power of Attorney:** Broad authority over financial and legal matters
- **Limited/Special Power of Attorney:** Authority for specific transactions or purposes
- **Durable Power of Attorney:** Remains effective if principal becomes incapacitated
- **Springing Power of Attorney:** Becomes effective upon specified conditions (usually incapacity)
- **Healthcare Power of Attorney:** Authority over medical decisions (often combined with advance directive)
- **Financial Power of Attorney:** Authority limited to financial matters

**The Scope Problem:** The most critical aspect of POA verification is confirming the agent has authority for the specific action being attempted. A POA for real estate transactions doesn't authorize healthcare decisions.

## Data Visible After Verification

Shows the issuer domain (the notary, attorney, or registry) and the responder text.

**Status Indications:**
- **Valid** - POA is currently effective
- **Revoked** - Principal has revoked the authority
- **Expired** - POA has passed its expiration date
- **Suspended** - Authority temporarily suspended (e.g., pending investigation)
- **Superseded** - A newer POA has replaced this one
- **Principal Deceased** - POA terminated by principal's death

**Scope Indication:** Verification should indicate scope of authority: "Valid - Authority: Real Estate Transactions Only" or "Valid - General Financial Authority."

## Second-Party Use (Principal Verifying Their Own POA)

Principals benefit from verifying their POA documents.

**Document Authenticity:** After executing a POA, principals verify it's correctly recorded.

**Current Status:** Principals confirm their POA is still effective and hasn't been improperly modified.

**Revocation Confirmation:** After revoking a POA, principals verify the revocation is recorded.

**Agent Verification:** Principals can verify what authority they've actually granted to agents.

**Estate Planning Review:** During periodic reviews, principals verify POA documents remain current.

## Third-Party Use

**Financial Institutions**

Account access and transactions:

**Account Access:** Banks verify POA before allowing agents to access principal's accounts.

**Transaction Authority:** Before executing transactions, banks verify the POA covers the specific action.

**New Account Opening:** Some POAs authorize opening new accounts. Banks verify this specific authority.

**Investment Changes:** Brokerages verify POA authority before agents make investment decisions.

**Safe Deposit Access:** Banks verify POA authorizes safe deposit box access.

**Elder Abuse Prevention:** Banks may use verification to detect potentially fraudulent POAs.

**Healthcare Providers**

Medical decisions:

**Treatment Consent:** Healthcare facilities verify healthcare POA before accepting agent consent for treatment.

**End-of-Life Decisions:** Critical decisions require verified healthcare proxy authority.

**Medical Records Access:** HIPAA authorizations and healthcare POAs for records access.

**Facility Admission:** Nursing homes and assisted living facilities verify POA for admission decisions.

**Emergency Care:** Emergency departments may need rapid POA verification for incapacitated patients.

**Real Estate Professionals**

Property transactions:

**Sale Authority:** Title companies verify POA before allowing agents to sign sale documents.

**Purchase Authority:** Lenders verify POA for agents executing mortgages on behalf of principals.

**Listing Authority:** Real estate agents may verify POA before listing property.

**Lease Execution:** Landlords verify POA before accepting agents signing leases for principals.

**Government Agencies**

Benefits and official matters:

**Social Security:** SSA verifies representative payee and POA authority.

**Tax Filing:** IRS accepts POA for tax matters (Form 2848). Verification confirms authority.

**Property Tax:** County offices may accept POA for property tax matters.

**DMV Transactions:** Vehicle registration and title transfers may allow POA.

**Other Agents and Fiduciaries**

Coordination among representatives:

**Co-Agents:** When multiple agents are named, each can verify the other's authority.

**Successor Agents:** When primary agents can't serve, successors verify their authority.

**Professional Fiduciaries:** Trust companies and professional fiduciaries verify POA authority.

**Guardian Coordination:** When guardianship is later established, guardians verify prior POA status.

## Verification Architecture

**The POA Fraud Problem**

Power of attorney fraud is particularly harmful, often targeting vulnerable adults:

- **Forged POAs:** Entirely fabricated documents with forged signatures
- **Coerced POAs:** POAs obtained through undue influence or duress
- **Altered POAs:** Genuine POAs with modified scope or agent names
- **Expired/Revoked POAs:** Using POAs that are no longer valid
- **Scope Overreach:** Agents claiming authority beyond what the POA grants

OCR-to-hash addresses forgery and alteration. Coercion is a substantive validity issue beyond document verification. Scope verification requires comparing the requested action against documented authority.

**Issuers and Registries**

Multiple parties might operate verification endpoints:

**Notaries:** Notaries who notarize POAs could maintain verification records.

**Attorneys:** Attorneys who draft POAs could operate verification for documents they prepare.

**State Registries:** Some states maintain POA registries (New York, North Carolina have statutory POA recording).

**County Recorders:** POAs for real estate are often recorded with county recorders.

**Healthcare Registries:** Some states maintain advance directive/healthcare POA registries.

**Revocation Infrastructure**

POA revocation is critical:

**Principal Revocation:** Principals may revoke POAs at any time (while competent).

**Revocation Notice:** Revocation should be communicated to agents, institutions, and registries.

**Third-Party Reliance:** Institutions that relied on a POA before receiving revocation notice may be protected.

**Verification Updates:** Revocation must immediately update verification responses.

**Death Termination:** POAs terminate upon principal's death (except for certain estate administration purposes).

The verification system must handle revocation in near-real-time to prevent fraud by agents using revoked authority.

**Durable vs. Non-Durable**

Durability affects validity:

**Non-Durable POA:** Terminates if principal becomes incapacitated. Verification should indicate durability status.

**Durable POA:** Continues despite principal incapacity. Most modern POAs are durable.

**Springing POA:** Only becomes effective upon incapacity. Verification must indicate whether springing conditions have been triggered.

**Capacity Determination:** For springing POAs, who determines incapacity? The POA document should specify (often requires physician certification).

**Uniform Power of Attorney Act**

Many states have adopted the Uniform Power of Attorney Act (UPOAA):

**Statutory Forms:** UPOAA provides model forms. Standardization aids OCR and verification.

**Agent Duties:** UPOAA defines agent fiduciary duties.

**Third-Party Acceptance:** UPOAA requires third parties to accept valid POAs (reducing arbitrary refusals).

**Liability Protection:** UPOAA provides liability protection for third parties accepting POAs in good faith.

Verification supports UPOAA's goal of facilitating POA acceptance while reducing fraud.

**Elder Abuse Detection**

POA fraud often targets seniors:

**Financial Exploitation:** Agents misusing authority for personal benefit.

**Isolation Tactics:** Fraudsters isolating seniors from family while obtaining POAs.

**Undue Influence:** Taking advantage of cognitive decline to obtain broad authority.

**Red Flags:** Verification systems might flag patterns suggesting abuse (new POA for elderly principal, unfamiliar agent, immediately followed by large transactions).

Financial institutions, adult protective services, and law enforcement can use verification as one tool in elder abuse detection.

**Healthcare POA Considerations**

Healthcare decisions have unique characteristics:

**HIPAA Compliance:** Healthcare POA verification must comply with HIPAA privacy rules.

**Emergency Situations:** Healthcare facilities may need rapid verification in emergency situations.

**Do Not Resuscitate:** DNR orders and end-of-life decisions require verified authority.

**Mental Health:** Some jurisdictions have special POA provisions for mental health treatment decisions.

**Research Consent:** Consent for research participation on behalf of incapacitated individuals.

**Competing Authority:** When healthcare POA agents disagree with family members, verification confirms who has legal authority.

**Multi-Jurisdictional Use**

POAs may be used across state lines:

**Recognition:** States generally recognize out-of-state POAs, but requirements vary.

**Form Differences:** State-specific form requirements may affect acceptance.

**Recording Requirements:** Some states require POAs to be recorded for certain uses.

**International POAs:** POAs for use in foreign countries may need apostille or consular authentication.

Verification can help third parties confirm authority regardless of where the POA was executed.
