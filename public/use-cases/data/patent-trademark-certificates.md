# Patent and Trademark Certificates

**Category:** Government & Civic Documents
**Volume:** Very Small
**Retention:** 20 years (patents) / Permanent (trademarks with renewal)

## Data Verified

**Patents:** Patent number, inventor name(s), assignee/owner name, application date, issue date, title of invention, patent type (utility, design, plant), jurisdiction, expiration date, claims (key claims or claim count).

**Trademarks:** Registration number, mark (word, design, or combined), owner name, registration date, goods/services classification (Nice Classification), jurisdiction, renewal dates, status.

**Document Types:**
- **Patent Grants:** Official certificates of patent issuance
- **Trademark Registrations:** Certificates of trademark registration
- **Assignment Records:** Documentation of IP ownership transfers
- **Renewal Certificates:** Proof of maintenance fee payment or trademark renewal
- **International Registrations:** PCT patents, Madrid Protocol trademarks

**Ornate Format:** Patent and trademark certificates are often decorative, formal documents with seals and signatures. The ornate format is suitable for OCR verification—the combination of formal text and official markings creates distinctive hashable content.

## Data Visible After Verification

Shows the issuer domain (the patent/trademark office) and the responder text.

**Status Indications:**
- **Active** - Patent/trademark is in force
- **Expired** - Patent term has ended or trademark not renewed
- **Lapsed** - Maintenance fees not paid (patents)
- **Abandoned** - Application abandoned before issuance
- **Cancelled** - Trademark cancelled
- **Under Reexamination** - Patent validity under review
- **Opposition Pending** - Trademark opposition in process

**Public Ledger Link:** Patent and trademark offices maintain public databases (USPTO, EPO, WIPO). Verification response should link to the official register entry.

## Second-Party Use (Owner Verifying Their Own IP)

IP owners benefit from verifying their certificates.

**Certificate Authenticity:** After receiving patent grants or trademark registrations, owners verify documents are genuine.

**Status Confirmation:** Owners verify their IP rights are active and maintained.

**Renewal Tracking:** Before renewal deadlines, owners verify current status.

**Portfolio Management:** Companies managing large IP portfolios verify individual assets.

**Transaction Preparation:** Before licensing or selling IP, owners verify documentation.

## Third-Party Use

**Investors and Acquirers**

IP valuation and due diligence:

**M&A Due Diligence:** Acquirers verify target company IP portfolios.

**Investment Decisions:** VCs and investors verify startup IP claims.

**Valuation Support:** IP valuation firms verify rights being valued.

**Collateral Verification:** Lenders taking IP as collateral verify ownership and status.

**SPAC/IPO:** Pre-public offering IP verification.

**Licensees and Partners**

Licensing verification:

**License Validity:** Licensees verify licensor actually owns the licensed IP.

**Exclusivity Verification:** Exclusive licensees verify no conflicting grants.

**Sublicense Authority:** Sublicensees verify the sublicensor's rights.

**Royalty Audits:** During royalty audits, licensees verify underlying IP status.

**Litigation Parties**

IP disputes:

**Infringement Cases:** Plaintiffs verify their IP rights before asserting infringement.

**Invalidity Defenses:** Defendants verify patent/trademark registration details.

**Ownership Disputes:** Parties verify chains of title.

**Declaratory Judgment:** Parties seeking declaratory relief verify IP status.

**Expert Witnesses:** IP experts verify documents they're analyzing.

**Customs and Border Protection**

Counterfeit interdiction:

**Recordation Verification:** Customs verifies IP recorded for border enforcement.

**Seizure Authority:** Before seizing goods, customs verifies trademark registrations.

**Parallel Import Disputes:** Verification of trademark ownership in different jurisdictions.

**Competitors**

Competitive intelligence:

**Freedom to Operate:** Companies verify competitor IP before product launches.

**Design-Around:** Engineers verify patents they're designing around.

**Prior Art Searches:** Verifying cited prior art patents.

**Watch Services:** IP watch services verify new registrations.

**Standards Bodies**

Standards-essential patents:

**SEP Declarations:** Standards bodies verify declared essential patents.

**FRAND Licensing:** Verification supports fair licensing obligations.

**Patent Pool Management:** Pool administrators verify contributed patents.

## Verification Architecture

**The IP Fraud Problem**

IP documentation fraud occurs in various contexts:

- **Fabricated Patents:** Fake patent certificates for non-existent patents
- **Altered Certificates:** Genuine certificates with modified owners, dates, or scope
- **Assignment Fraud:** Fake assignment documents claiming ownership
- **Status Misrepresentation:** Claiming active rights when lapsed or expired
- **Jurisdiction Confusion:** Foreign patents misrepresented as domestic coverage

OCR-to-hash addresses fabricated and altered certificates. Status verification requires checking with the issuing office. Assignment chain verification requires full chain of title review.

**Patent/Trademark Offices as Issuers**

National and regional IP offices:

**USPTO:** US Patent and Trademark Office—patents and trademarks.

**EPO:** European Patent Office—European patents.

**EUIPO:** EU Intellectual Property Office—EU trademarks and designs.

**WIPO:** World Intellectual Property Organization—PCT patents, Madrid trademarks.

**National Offices:** Each country has its own IP office.

Each office would operate verification endpoints for documents they issue.

**Existing Database Integration**

IP offices maintain extensive databases:

**USPTO PAIR/TSDR:** Public patent and trademark databases.

**EPO Espacenet:** European and worldwide patent database.

**WIPO Global Brand Database:** International trademark search.

**Google Patents:** Comprehensive patent search.

These databases confirm registration exists; OCR-to-hash confirms document authenticity.

**Assignment and Chain of Title**

IP ownership changes through assignments:

**Recorded Assignments:** USPTO records assignments in assignment database.

**Chain of Title:** Complete chain from inventor to current owner.

**Security Interests:** IP can be pledged as loan collateral.

**Bankruptcy Transfers:** IP transferred in bankruptcy proceedings.

Verification should confirm current owner based on recorded assignments, not just original issuance.

**Maintenance and Renewal**

IP rights require maintenance:

**Patent Maintenance Fees:** Periodic fees to keep patents in force (3.5, 7.5, 11.5 years in US).

**Trademark Renewals:** Periodic renewals and use declarations.

**Lapse and Revival:** Lapsed rights may sometimes be revived.

**Grace Periods:** Late fees for payment within grace periods.

Verification must reflect current status including maintenance history.

**International IP Systems**

International agreements create complex rights:

**PCT (Patents):** Patent Cooperation Treaty allows single application designating multiple countries.

**Paris Convention:** Priority rights between countries.

**Madrid Protocol (Trademarks):** International trademark registration system.

**Hague Agreement (Designs):** International design registration.

A PCT application enters "national phase" in each designated country, creating separate national patents. Verification must specify which national right is being verified.

**Patent Families**

Related patents across jurisdictions:

**Family Identification:** Same invention protected in multiple countries.

**Priority Claims:** Patents claiming priority from earlier applications.

**Continuation/Divisional:** Related US applications from parent applications.

**Equivalents:** Corresponding patents in different jurisdictions.

Verification of one family member doesn't verify others—each must be independently verified.

**Trademark Classes**

Trademarks are registered for specific goods/services:

**Nice Classification:** International classification system (45 classes).

**Scope Limitation:** Trademark rights limited to registered classes.

**Likelihood of Confusion:** Similar marks may coexist in different classes.

**Class Verification:** Verification should confirm classes covered by registration.

**Pending Applications**

Applications before grant/registration:

**Patent Applications:** Published applications don't yet grant rights.

**Trademark Applications:** ITU (Intent to Use) applications before use.

**Prosecution Status:** Applications may be rejected, amended, or abandoned.

**Provisional Rights:** Some jurisdictions provide provisional rights from publication.

Verification should clearly distinguish granted rights from pending applications.

**Trade Secrets Consideration**

Not all IP is registered:

**Trade Secrets:** Unregistered but protected confidential information.

**Unregistered Trademarks:** Common law trademark rights from use.

**No Certificate:** These rights don't have certificates to verify.

**Contractual Protection:** NDAs and employment agreements protect trade secrets.

OCR-to-hash applies to registered IP; trade secrets require different protection mechanisms.
