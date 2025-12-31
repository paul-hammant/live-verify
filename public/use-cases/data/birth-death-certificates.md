---
title: "Birth and Death Certificates"
category: "Government & Civic Documents"
volume: "Small (per certificate, but billions exist globally)"
retention: "Permanent (vital records)"
slug: "birth-death-certificates"
tags: ["birth", "death", "certificates", "government", "civic", "documents"]
---
## Data Verified

**Birth Certificates:** Name, date of birth, place of birth, parents' names, registration number, issuing jurisdiction.

**Death Certificates:** Name, date of death, place of death, cause of death (may be redacted for privacy), registration number, issuing jurisdiction.

**Document Formats:** Vital records come in various formats—long-form (full details), short-form (summary), certified copies with raised seals, and commemorative versions. All formats can be verified if the issuing vital records office supports OCR-to-hash.

## Data Visible After Verification

Shows the issuer domain (the vital records office or government agency) and the responder text (e.g., "Verified" or "Denied").

**Status Indications:** Beyond simple verification, responses may indicate:
- **Verified** - Record matches vital records registry
- **Amended** - Original record has been legally amended (name change, adoption, correction)
- **Superseded** - A newer version of this record exists
- **Sealed** - Record exists but details are restricted (adoption, court order)

**Public Ledger Link:** For jurisdictions maintaining public vital records registries, the verification response may link to the registry entry, demonstrating the record is part of the official vital statistics system.

## Second-Party Use (Individual Verifying Their Own Certificate)

Individuals benefit from verifying vital records they hold.

**Document Authenticity:** When obtaining certified copies from vital records offices, individuals can verify the document is genuine before relying on it for important transactions.

**Replacement Verification:** After ordering replacement certificates (for lost or damaged originals), individuals can confirm the replacement is authentic.

**Genealogical Records:** Family historians can verify historical vital records obtained from archives or third-party services are genuine, not fabrications.

**Cross-Reference:** Individuals can verify that copies held by different family members or in different locations are consistent with the official record.

**Estate Documentation:** Executors can verify death certificates before filing with courts, banks, or insurance companies.

## Third-Party Use

**Government Agencies**

Passport offices, immigration authorities, social services:

**Passport Applications:** Passport agencies can verify birth certificates submitted with applications are genuine, preventing identity document fraud.

**Immigration Processing:** USCIS and immigration authorities can verify birth and death certificates in visa, citizenship, and benefit applications.

**Social Security:** SSA can verify birth certificates for number assignment and death certificates for benefit termination.

**Benefit Eligibility:** Government benefit programs can verify vital records without contacting each issuing jurisdiction.

**Employers and Background Check Companies**

Identity verification and employment eligibility:

**I-9 Verification:** Birth certificates are List C documents for employment eligibility verification. Employers can verify authenticity.

**Background Checks:** Background screening companies can verify vital records provided by candidates.

**Identity Confirmation:** For high-security positions, employers can verify foundational identity documents.

**Financial Institutions**

Banks, insurance companies, estate processing:

**Account Opening:** Banks performing identity verification can confirm birth certificate authenticity for CDD/KYC purposes.

**Life Insurance Claims:** Insurers can verify death certificates before paying beneficiaries, preventing fraudulent claims.

**Estate Processing:** Banks can verify death certificates before releasing assets to estates.

**Pension Termination:** Pension funds can verify death certificates before stopping payments.

**Legal Proceedings**

Courts, attorneys, estate administration:

**Probate:** Courts can verify death certificates in estate proceedings.

**Custody and Family Law:** Courts can verify birth certificates establishing parentage.

**Identity Disputes:** In contested identity cases, courts can verify foundational vital records.

**Inheritance Claims:** Attorneys can verify birth and death certificates establishing inheritance rights.

**Healthcare**

Hospitals, public health, vital statistics:

**Birth Registration:** Hospitals can verify birth certificates they generate match vital records registry entries.

**Death Reporting:** Healthcare facilities can verify death certificates filed with vital statistics offices.

**Public Health Research:** Epidemiologists can verify vital records in research datasets.

## Verification Architecture

**The Identity Document Fraud Problem**

Birth certificate fraud enables cascading identity theft:

- **Fabricated Certificates:** Entirely fake documents from non-existent people
- **Stolen Identities:** Using deceased persons' birth certificates to assume their identity
- **Altered Documents:** Modifying dates, names, or parents on genuine certificates
- **Fraudulent Replacements:** Obtaining replacement certificates using fraudulent claims

OCR-to-hash addresses fabrication and alteration. The verification response can indicate if the named individual is deceased (cross-referencing death records), addressing stolen identity scenarios.

**Vital Records Offices as Issuers**

Vital records are issued by various levels of government:

**US Structure:** Each state maintains vital records, with counties sometimes handling registration. The National Center for Health Statistics (NCHS) coordinates standards but doesn't issue certificates.

**International Variation:** Some countries have national vital records systems; others are regional or local.

**Historical Records:** Older records may predate current vital records offices. Archives and historical societies may hold originals.

**Verification Architecture Options**

**State-Level Endpoints:** Each state vital records office operates its own verification endpoint. Requires querying the correct jurisdiction.

**National Coordination:** A national coordinator (NCHS in the US, or a new entity) could aggregate verification across states, similar to how EVVE (Electronic Verification of Vital Events) works for government-to-government verification.

**International Standards:** ICAO (for travel documents) or Hague Conference (for apostilles) could coordinate international vital records verification standards.

**Privacy Considerations**

Vital records contain sensitive information:

**Death Records:** Cause of death may be redacted in verification responses, confirming the record exists without revealing medical information.

**Adoption Records:** Sealed adoption records require special handling. Verification may confirm a record exists without revealing original birth details.

**Court-Ordered Sealing:** Some records are sealed by court order. Verification response indicates the record is sealed rather than non-existent.

**Survivor Privacy:** Death certificates may not reveal survivor names in verification responses.

The verification response can confirm document authenticity while respecting privacy restrictions: "Verified - Details restricted by law."

**Amendments and Corrections**

Vital records can be amended:

- **Name Changes:** Marriage, divorce, or court-ordered name changes
- **Adoption:** Original birth certificates sealed, amended certificates issued
- **Gender Marker Changes:** Some jurisdictions allow birth certificate amendment
- **Error Corrections:** Typographical or factual corrections

The verification response should indicate if the verified document is the current version or has been superseded by an amendment. Both the original and amended versions may be valid—they hash to different values but both exist in the registry.

**Apostille and International Use**

For international use, vital records typically require apostille or embassy legalization:

**Apostille Integration:** The apostille (itself a document) could include OCR-to-hash verification, confirming both the underlying vital record and the apostille are genuine.

**Embassy Verification:** Consular sections could use OCR-to-hash to verify vital records before issuing visas or citizenship services.

**Hague Convention Coordination:** The 125+ Hague Apostille Convention member countries could coordinate verification standards for cross-border vital records.

**Historical Records**

Records predating modern vital statistics systems present challenges:

**Church Records:** Baptismal and burial records served as vital records before civil registration. These could be verified if religious institutions adopt OCR-to-hash.

**Archive Holdings:** Historical vital records in state and local archives could be verified if archives operate verification endpoints.

**Genealogical Services:** Commercial genealogy services (Ancestry, FamilySearch) could verify records they've digitized, with clear indication these are historical copies rather than official certificates.
