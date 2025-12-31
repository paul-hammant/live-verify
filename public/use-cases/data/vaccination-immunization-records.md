---
title: "Vaccination and Immunization Records"
category: "Healthcare & Medical Records"
volume: "Medium-Small"
retention: "Lifetime (public health records)"
slug: "vaccination-immunization-records"
tags: ["vaccination", "immunization", "records", "healthcare", "medical"]
---
## Data Verified

Patient name, date of birth, vaccine name/type, vaccine manufacturer, lot number, dose number (for multi-dose series), administration date, administering provider name and facility, next dose due date (if applicable), contraindications or exemptions.

**Document Types:**
- **Immunization Cards:** Wallet-sized cards recording vaccinations (CDC "white card" for COVID-19)
- **Official Certificates:** State or national immunization certificates
- **International Certificates:** WHO International Certificate of Vaccination (Yellow Card/Carte Jaune)
- **School Immunization Records:** Forms required for school enrollment
- **Digital Passes:** QR-code based digital vaccination credentials

**Wallet Card Format:** Immunization cards are designed for portability. The compact format with structured data fields is well-suited for OCR verification. Cards can include verification URLs or QR codes.

## Data Visible After Verification

Shows the issuer domain (the healthcare provider, pharmacy, or public health department) and the responder text.

**Status Indications:**
- **Verified** - Vaccination record matches provider records
- **Series Incomplete** - Additional doses required
- **Booster Due** - Primary series complete but booster recommended
- **Exemption on File** - Medical or other exemption documented
- **Revoked** - Record withdrawn (administered in error, wrong patient)

**Public Ledger Link:** Many jurisdictions maintain immunization registries (IIS - Immunization Information Systems). Verification may link to the patient's entry in the state registry.

## Second-Party Use (Patient Verifying Their Own Records)

Patients benefit from verifying their immunization records.

**Record Authenticity:** Patients can verify vaccination cards received from providers are genuine and correctly recorded.

**Registry Confirmation:** Patients can confirm their vaccinations are recorded in state immunization registries.

**Pre-Travel Verification:** Before international travel, patients verify vaccination records meet destination requirements.

**Series Completion:** Patients verify their multi-dose series status before final doses.

**Historical Records:** Adults can verify childhood immunization records for employment or education.

## Third-Party Use

**Schools and Universities**

Enrollment requirements:

**K-12 Enrollment:** Schools verify student immunization records meet state requirements.

**College Enrollment:** Universities require vaccination records for dormitory housing and enrollment.

**Exemption Verification:** Schools verify exemption documentation when students claim exemptions.

**Outbreak Response:** During outbreaks, schools may need to verify vaccination status rapidly.

**International Students:** Students from other countries need vaccination verification.

**Employers**

Occupational health:

**Healthcare Workers:** Hospitals require extensive vaccination documentation (hepatitis B, MMR, varicella, flu, COVID-19).

**Childcare Workers:** Childcare facilities may require staff vaccinations.

**Food Handlers:** Some jurisdictions require food handler vaccinations.

**Laboratory Workers:** Research institutions require vaccinations for workers with pathogen exposure.

**Military and First Responders:** Enhanced vaccination requirements for certain positions.

**Immigration Authorities**

Visa and entry requirements:

**Visa Applications:** Immigrant visas require vaccination against specified diseases.

**Adjustment of Status:** Green card applicants must demonstrate vaccinations.

**International Travel:** Some countries require proof of yellow fever or other vaccinations.

**Refugee Processing:** Refugees undergo vaccination screening.

**Border Entry:** COVID-19 pandemic demonstrated border entry vaccination requirements.

**Healthcare Providers**

Clinical care:

**Pre-Procedure Verification:** Some procedures require current vaccination status.

**Immunocompromised Patients:** Providers verify household contact vaccination status.

**Vaccine Administration:** Before administering vaccines, providers verify prior doses.

**Contraindication Checking:** Records of adverse reactions affect future vaccination decisions.

**Travel Medicine:** Travel clinics verify current status before recommending travel vaccines.

**Daycare and Camps**

Child program enrollment:

**Daycare Enrollment:** Childcare facilities verify child vaccination records.

**Summer Camps:** Resident camps require vaccination documentation.

**Sports Programs:** Youth sports may require certain vaccinations.

**Exemption Management:** Programs verify exemption documentation.

**Public Health Authorities**

Population health:

**Registry Management:** State immunization registries verify provider-reported data.

**Coverage Monitoring:** Public health tracks population vaccination coverage.

**Outbreak Investigation:** Contact tracing requires verification of vaccination status.

**School Audits:** Health departments audit school compliance with vaccination requirements.

## Verification Architecture

**The Vaccination Fraud Problem**

Vaccination fraud became prominent during COVID-19:

- **Fabricated Cards:** Entirely fake vaccination cards
- **Altered Cards:** Genuine cards with modified dates, names, or vaccine types
- **Stolen Lot Numbers:** Using valid lot numbers on fake cards
- **Provider Impersonation:** Cards claiming administration by providers who didn't give them
- **Registry Fraud:** Healthcare workers entering false data into immunization registries

OCR-to-hash addresses fabricated and altered cards. The domain binding verifies the card came from an actual healthcare provider. Registry fraud requires provider authentication and audit controls.

**Providers as Issuers**

Multiple entities administer vaccines:

**Healthcare Providers:** Physicians, clinics, and hospitals.

**Pharmacies:** CVS, Walgreens, and independent pharmacies administer many vaccines.

**Public Health Departments:** County and city health departments.

**Employers:** Occupational health clinics.

**Schools:** School-based vaccination clinics.

**Mass Vaccination Sites:** During pandemics, temporary sites.

Each administering entity could operate verification endpoints, or verification could occur through immunization registries.

**Immunization Information Systems (IIS)**

State registries are central to verification:

**State IIS:** Nearly all states maintain immunization registries.

**IIS Interoperability:** CDC's IZ Gateway enables interstate data sharing.

**Provider Reporting:** Providers are generally required to report to IIS.

**Consumer Access:** Most states allow patients to access their own IIS records.

**IIS as Verification Endpoint:** State registries could serve as authoritative verification endpoints, regardless of where vaccination occurred.

**International Certificate Standards**

International travel requires recognized documentation:

**WHO Yellow Card:** International Certificate of Vaccination or Prophylaxis for yellow fever and other diseases.

**SMART Health Cards:** Digital vaccination credentials using FHIR and verifiable credentials standards.

**EU Digital COVID Certificate:** European standard for COVID vaccination proof.

**ICAO VDS-NC:** International Civil Aviation Organization Visible Digital Seal for Non-Constrained environments.

OCR-to-hash can complement these digital standards for paper-based verification or as fallback when digital systems unavailable.

**SMART Health Cards**

Digital vaccination credentials:

**Technical Standard:** Based on FHIR, W3C Verifiable Credentials, and JOSE cryptographic standards.

**QR Code Format:** Credentials encoded as QR codes on paper or in apps.

**Issuer Verification:** QR codes are cryptographically signed by issuers.

**OCR Complement:** Paper SMART Health Cards include both QR and human-readable text. OCR-to-hash verifies the text portion.

**Widespread Adoption:** Used by many US states, Canada, and internationally.

**Privacy Considerations**

Vaccination records are protected health information:

**HIPAA:** Verification must comply with HIPAA privacy rules.

**Minimum Necessary:** Verification should confirm vaccination status without revealing unnecessary medical details.

**Consumer Consent:** Patients should control who can verify their records.

**Exemption Privacy:** Medical exemption reasons should not be disclosed through verification.

**De-identification:** Public health surveillance uses de-identified data.

**Audit Trails:** Access to vaccination records should be logged.

**Lot Number Tracking**

Lot numbers serve multiple purposes:

**Recall Response:** If vaccine lots are recalled, lot numbers identify affected recipients.

**Adverse Event Investigation:** VAERS reports include lot numbers.

**Supply Chain Verification:** Lot numbers confirm vaccines came from legitimate supply chains.

**Anti-Counterfeiting:** Valid lot number formats and ranges help detect counterfeits.

Verification can confirm lot numbers match legitimate manufacturer ranges without requiring real-time manufacturer database access.

**Multi-Dose Series**

Many vaccines require multiple doses:

**Primary Series:** Initial doses to establish immunity.

**Boosters:** Additional doses to maintain immunity.

**Interval Requirements:** Minimum and maximum intervals between doses.

**Series Completion:** Requirements for "fully vaccinated" status.

Verification should indicate series status: "Verified - Primary series complete" or "Verified - Dose 1 of 2, Dose 2 due [date]."

**Childhood vs. Adult Records**

Record management differs by age:

**Childhood Records:** Generally maintained by pediatricians and reported to IIS.

**School Requirements:** Verified at school enrollment.

**Adult Records:** May be fragmented across multiple providers.

**Record Reconstruction:** Adults may need to reconstruct records from multiple sources.

**Lifetime Records:** IIS are increasingly maintaining lifetime records rather than just childhood.

Verification should work regardless of when vaccination occurred, though historical records may have less complete data.
