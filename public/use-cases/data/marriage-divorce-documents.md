# Marriage and Divorce Documents

**Category:** Government & Civic Documents
**Volume:** Small
**Retention:** Permanent (legal status)

## Data Verified

**Marriage Documents:** Spouse names, dates of birth, marriage date, officiant name, witness names, county/jurisdiction, license number, certificate number.

**Divorce Documents:** Party names, marriage date, divorce/dissolution date, case number, court and jurisdiction, judge name, property division (summary), custody provisions (if applicable).

**Document Types:**
- **Marriage License:** Authorization to marry (before ceremony)
- **Marriage Certificate:** Proof of marriage (after ceremony)
- **Divorce Decree/Judgment:** Final court order dissolving marriage
- **Annulment Decree:** Court order voiding marriage
- **Legal Separation Order:** Court order for legal separation
- **Domestic Partnership Certificate:** Non-marriage partnership registration
- **Civil Union Certificate:** Civil union documentation

## Data Visible After Verification

Shows the issuer domain (the county clerk or court) and the responder text.

**Status Indications:**
- **Valid** - Marriage is current/Divorce is final
- **Pending** - Divorce pending, not yet final
- **Annulled** - Marriage annulled
- **Amended** - Document has been amended/corrected

**Verification Response:** "Valid - Marriage Certificate, [County], [Date]."

## Second-Party Use (Spouses Verifying Their Own Documents)

Spouses benefit from verification.

**Document Authenticity:** Verify marriage/divorce certificate is genuine.

**Name Change:** Verify marriage certificate for name change documentation.

**Immigration:** Verify for immigration petitions.

**Benefits Enrollment:** Verify for spouse benefit enrollment.

**Estate Planning:** Verify marital status for estate documents.

## Third-Party Use

**Government Agencies**

Benefits and services:

**Social Security:** Verify for spousal/survivor benefits.

**Immigration (USCIS):** Verify for marriage-based petitions.

**Tax Authorities:** Verify marital status for filing status.

**Military:** Verify for dependent benefits.

**Passport Office:** Verify for name change on passports.

**Employers**

Benefits administration:

**Spouse Benefits:** Verify marriage for benefit enrollment.

**Life Insurance:** Verify marriage for beneficiary changes.

**COBRA:** Verify qualifying events.

**Family Leave:** Verify for FMLA eligibility.

**Financial Institutions**

Account and loan decisions:

**Joint Accounts:** Verify marriage for joint account opening.

**Mortgage Applications:** Verify marital status for lending.

**Divorce Proceedings:** Verify divorce for account changes.

**Estate Settlement:** Verify marital status for inheritance.

**Insurance Companies**

Coverage decisions:

**Policy Changes:** Verify marriage/divorce for policy updates.

**Beneficiary Changes:** Verify for beneficiary modifications.

**Claims Processing:** Verify marital status at time of loss.

**Premium Calculations:** Marital status affects some premiums.

**Attorneys**

Legal proceedings:

**Estate Matters:** Verify marital status for probate.

**Property Transactions:** Verify for spousal consent requirements.

**Family Law:** Verify prior marriages in new divorces.

**Immigration:** Verify for immigration petitions.

**Real Estate**

Property transactions:

**Spousal Consent:** Verify marriage for homestead waiver.

**Title Requirements:** Verify marital status for deed requirements.

**Divorce Settlements:** Verify divorce for property transfers.

## Verification Architecture

**The Marriage/Divorce Fraud Problem**

Document fraud enables various schemes:

- **Fake Marriages:** Fraudulent certificates for immigration
- **Bigamy Concealment:** Hiding prior marriages
- **Divorce Fraud:** Claiming to be divorced when still married
- **Date Manipulation:** Altering marriage/divorce dates
- **Jurisdiction Shopping:** Fake documents from lenient jurisdictions
- **Identity Fraud:** Fraudulent documents for identity purposes

OCR-to-hash addresses forgery and alteration. Court/county verification confirms authenticity.

**Courts and Counties as Issuers**

Local authorities issue these documents:

**County Clerks:** Issue marriage licenses and certificates.

**Courts:** Issue divorce decrees and annulments.

**Vital Records:** State vital records offices maintain copies.

**Online Copies:** Many jurisdictions offer online certified copies.

Each authority operates verification endpoints for documents they issue.

**Marriage License vs. Certificate**

Two distinct documents:

**License:** Issued before ceremony, authorizes marriage.

**Certificate:** Issued after ceremony, proves marriage occurred.

**Return:** Officiant returns signed license to county for certificate.

**Timing:** License has validity period; certificate is permanent.

Verification must distinguish between the two.

**Divorce Decree Components**

Divorce decrees contain multiple elements:

**Dissolution Order:** Court order dissolving marriage.

**Property Division:** Asset and debt division.

**Custody Provisions:** Child custody and visitation.

**Support Orders:** Alimony and child support.

**Name Restoration:** Restoration of prior name.

Full decree may be multi-page with extensive provisions.

**Waiting Periods and Effective Dates**

Timing considerations:

**Marriage Waiting Period:** Some states require waiting after license.

**Divorce Waiting Period:** Mandatory separation periods.

**Interlocutory Decree:** Preliminary divorce, not yet final.

**Effective Date:** When divorce becomes final.

Verification must reflect actual effective date.

**Interstate Recognition**

Full Faith and Credit:

**Marriage Recognition:** States recognize valid out-of-state marriages.

**Divorce Recognition:** States recognize valid out-of-state divorces.

**Jurisdictional Requirements:** Divorce requires residency/jurisdiction.

**Foreign Marriages/Divorces:** Recognition varies.

Verification should indicate: "Valid - [Jurisdiction] recognizes [other state] marriage."

**Common Law Marriage**

Non-ceremonial marriage:

**States Recognizing:** Colorado, Iowa, Kansas, Montana, and others.

**Elements:** Cohabitation, holding out as married, intent.

**Documentation Challenge:** No certificate, but may obtain affidavit.

**Verification Difficulty:** Harder to verify than licensed marriage.

Common law marriages may require different verification approach.

**Amendment and Correction**

Document changes:

**Name Correction:** Correcting spelling errors.

**Date Correction:** Correcting date errors.

**Delayed Registration:** Late registration of marriage.

**Amended Certificates:** Updated certificates after corrections.

Verification should indicate amendments: "Valid - Amended [date]."

**International Documents**

Foreign marriage/divorce:

**Apostille:** Authentication for Hague Convention countries.

**Consular Authentication:** For non-Hague countries.

**Translation:** Certified translation requirements.

**Recognition Requirements:** Requirements for US recognition.

Verification architecture must accommodate international documents.

**Privacy Considerations**

Sensitive information:

**Divorce Details:** Property, custody, support information.

**Domestic Violence:** Sealed records in DV cases.

**Identity Protection:** Information that could enable identity theft.

Verification confirms document exists without revealing sensitive details.

