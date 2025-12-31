# Passports and Visa Documents

**Category:** Government & Civic Documents
**Volume:** Medium-Small
**Retention:** 10-20 years (security requirements)

## Data Verified

Full name, date of birth, nationality, passport/visa number, issue and expiry dates, issuing authority, visa type and conditions. The machine-readable zone (MRZ) contains structured data that complements the human-readable text.

**Photo and Biometrics:** While OCR-to-hash verifies the text content, the photograph and any embedded biometric data (in e-Passports) require separate verification mechanisms. The hash confirms the document text matches what was issued; facial recognition or chip reading confirms the bearer matches the document.

**Privacy and Salt:** Given the sensitivity of passport data and the relatively small set of possible values (names, dates, nationalities), issuers may add a random salt line to raise entropy and defeat brute-force guessing attacks against the hash.

## Data Visible After Verification

Shows the issuer domain (the passport authority or consulate) and the responder text (e.g., "Valid" or "Denied").

**Status Indications:**
- **Valid** - Document is current and in good standing
- **Expired** - Document has passed its validity period
- **Revoked** - Document has been cancelled (lost, stolen, or holder no longer entitled)
- **Replaced** - A newer document has been issued to this holder

**Public Ledger Link:** For countries maintaining transparent passport registries, the verification response may link to a public record confirming the document's place in the national issuance system.

## Second-Party Use (Traveler Verifying Their Own Documents)

Travelers benefit from verifying their own identity documents.

**Document Authenticity:** Before international travel, holders can verify their passport is genuine and correctly issued. Catches errors before arriving at immigration.

**Visa Verification:** After receiving visas (stickers or stamps), holders can verify the visa is authentic and correctly entered into the issuing country's system.

**Replacement Confirmation:** When receiving emergency or replacement travel documents, holders can verify authenticity before relying on them for travel.

**Fraud Detection:** If identity theft is suspected, holders can check whether documents bearing their identity have been legitimately issued.

## Third-Party Use

**Border Control and Immigration**

Primary inspection at ports of entry:

**Document Authentication:** Immigration officers can verify passports and visas are genuine, complementing chip reading and UV/IR inspection.

**Watchlist Cross-Reference:** Verification confirms the document exists in the issuing country's system; separate watchlist checks confirm the bearer is permitted entry.

**Visa Validity:** Officers can confirm visas were actually issued by the claimed consulate with the claimed conditions.

**Overstay Detection:** For visa holders, verification can confirm the document hasn't been revoked due to overstay elsewhere.

**Airlines and Carriers**

Check-in and boarding:

**Advance Passenger Information:** Airlines collecting API data can verify documents before passengers board, reducing denied boardings and carrier fines.

**Interactive API (iAPI):** Real-time document verification at check-in catches problems before departure.

**Visa Waiver Eligibility:** Airlines can verify ESTA, ETA, or eVisitor authorizations are valid.

**Liability Prevention:** Carriers face fines for transporting improperly documented passengers. Verification reduces exposure.

**Hotels and Accommodation**

Guest registration:

**Police Registration:** Many countries require hotels to verify and record guest identity documents. OCR-to-hash provides verification without storing document copies.

**Fraud Prevention:** Hotels can detect forged documents used for fraudulent bookings or check-in under false identities.

**Compliance Documentation:** Hotels can record verification results for police reporting requirements.

**Financial Institutions**

KYC and anti-money laundering:

**Customer Onboarding:** Banks can verify identity documents during account opening.

**High-Value Transactions:** Wire transfers and large withdrawals may require document re-verification.

**Correspondent Banking:** Banks can verify documents provided by correspondent bank customers.

**Sanctions Screening:** Document verification confirms the identity being screened is genuine.

**Employers**

Work authorization verification:

**Right to Work:** Employers can verify passports and work visas for employment eligibility.

**Ongoing Monitoring:** Employers can re-verify as visa expiry dates approach.

**Audit Evidence:** Verification records demonstrate due diligence in immigration compliance.

**Consular Services**

Overseas citizen services:

**Emergency Documents:** Consulates can verify identity before issuing emergency travel documents.

**Visa Applications:** Consulates can verify passports submitted with visa applications.

**Notarial Services:** Consular officers can verify identity documents before performing notarial acts.

## Verification Architecture

**The Document Fraud Problem**

Travel document fraud spans a spectrum:

- **Counterfeit Documents:** Entirely fabricated passports from non-existent issuance
- **Altered Documents:** Genuine documents with modified data (photo substitution, date changes)
- **Impostor Use:** Genuine documents used by someone other than the rightful holder
- **Fraudulently Obtained:** Genuine documents obtained through identity theft or corruption
- **Look-Alike Fraud:** Using a genuine document belonging to a similar-looking person

OCR-to-hash addresses counterfeits and alterations. Impostor use requires biometric or photo matching. Fraudulent obtainment is an issuance problem beyond document verification.

**National Authorities as Issuers**

Each country's passport authority is the natural issuer:

**Passport Offices:** National passport agencies (State Department, Home Office, etc.) would operate verification endpoints for their issued passports.

**Consulates:** For visas and consular documents, each consulate or a central visa authority would operate verification.

**E-Passport Infrastructure:** Countries with e-Passports already have PKI infrastructure for chip verification. OCR-to-hash could complement this for the visual inspection zone.

**Interoperability Considerations**

Cross-border verification requires coordination:

**ICAO Standards:** The International Civil Aviation Organization sets passport standards. Could extend to verification endpoint standards.

**Bilateral Agreements:** Countries might bilaterally agree to accept each other's verification endpoints for visa-free travel arrangements.

**INTERPOL Integration:** INTERPOL's Stolen and Lost Travel Documents (SLTD) database could integrate with verification infrastructure.

**Regional Cooperation:** Schengen, Five Eyes, or other regional groupings might operate shared verification infrastructure.

**Machine-Readable Zone (MRZ) and OCR**

Passports have standardized MRZs designed for optical reading:

**TD3 Format:** Standard passport MRZ (two lines of 44 characters).

**Check Digits:** MRZ includes check digits that validate the OCR read before verification lookup.

**Complementary Verification:** MRZ reading confirms data integrity; OCR-to-hash confirms document authenticity.

**Data Page Focus:** For verification purposes, the data page (with MRZ, photo, and biographical data) is the critical content. Other pages (visas, stamps) may have separate verification needs.

**Privacy and Security**

Passport verification raises significant privacy concerns:

**Tracking Risk:** A global verification system could enable tracking of passport holder movements.

**Query Logging:** Who queried which passport when creates sensitive surveillance potential.

**Enumeration Attacks:** Without rate limiting and authentication, attackers could probe for valid passport numbers.

**Mitigation Approaches:**
- Cryptographic authentication of verification requesters
- Rate limiting and anomaly detection
- Query logging with strict access controls
- Salt lines in document text to prevent hash pre-computation
- Verification responses that confirm authenticity without revealing holder details

**Visa Stickers and Stamps**

Beyond passports, visas present additional considerations:

**Sticker Visas:** Full-page visa stickers can be verified as documents in their own right.

**Stamp Visas:** Entry/exit stamps may be too brief for meaningful OCR-to-hash verification.

**Electronic Visas:** E-visas exist only digitally; the authorization letter or printout can be verified.

**Visa Conditions:** Verification response should indicate visa type and conditions (work authorized, duration, single/multiple entry).
