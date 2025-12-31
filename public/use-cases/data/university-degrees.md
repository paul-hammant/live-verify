# University Degrees and Transcripts

**Category:** Professional & Educational Qualifications
**Volume:** Large
**Retention:** Permanent

## Data Verified

Student name, degree title, major/field of study, graduation date, university name, honors/distinctions, GPA (if included), course listings (for transcripts).

For multi-page transcripts, there would be one verification per page.

**Scanning Considerations:** Transcripts with dense course listings and small fonts may benefit from flatbed scanning rather than phone cameras. Degree certificates with ornate designs, seals, and signatures are typically single-page and camera-friendly.

## Data Visible After Verification

Shows the issuer domain (the university) and the responder text (e.g., "Verified" or "Denied").

**Public Ledger Link:** The verification response may include a link to the credential's entry in a consortium ledger. Universities participating in shared verification networks can demonstrate that a degree was issued as part of a graduating class cohort, not fabricated as an isolated record.

## Second-Party Use (Graduate Verifying Their Own Credentials)

Graduates benefit from being able to verify credentials they hold.

**Diploma Mill Detection:** Graduates from legitimate institutions can prove their degree is real when employers or licensing boards question unfamiliar university names. The verification URL points to an .edu domain or recognized institution, not a fly-by-night operation.

**Damaged or Aged Documents:** Physical degrees fade, get water-damaged, or are lost in moves. A graduate can verify that their weathered document still matches what the university issued, or identify if a replacement certificate is authentic.

**International Use:** When using credentials abroad, graduates can demonstrate authenticity without waiting for slow apostille processes. The verification provides immediate confirmation while official channels complete.

**Personal Records:** Graduates maintaining career portfolios can verify their archived copies remain authentic, useful when applying for senior positions decades after graduation.

## Third-Party Use

**Employers Verifying Candidate Credentials**

The primary external use case is employment background checks:

**Prevents Credential Fraud:** Fake degrees are trivially easy to create—diploma mills sell them openly. Verification through the university's domain confirms the institution actually conferred the degree.

**Instant Verification:** Traditional verification requires contacting registrars, paying fees, and waiting days or weeks. OCR-to-hash verification is immediate, reducing time-to-hire.

**Domain Binding:** The verification URL binds the credential to the university's domain. A fraudster cannot create a convincing "Harvard degree" without controlling harvard.edu's verification endpoint.

**Bulk Hiring:** Organizations hiring many graduates (consulting firms, large employers) can verify credentials at scale without overwhelming university registrar offices.

**Graduate Schools and Professional Programs**

Admissions offices verifying applicant credentials:

**Prerequisite Verification:** Graduate programs can confirm applicants hold the undergraduate degrees they claim, with the correct major and graduation date.

**GPA Confirmation:** For programs with GPA thresholds, transcript verification confirms the stated GPA matches what the institution recorded.

**Transfer Credit:** When accepting transfer credits, institutions can verify the sending institution actually awarded those courses and grades.

**Professional Licensing Boards**

Medical boards, bar associations, engineering societies, and teaching credential offices:

**Educational Requirements:** Professional licenses require specific degrees. Boards can verify applicants hold required credentials before issuing licenses to practice.

**Ongoing Verification:** Some professions require periodic re-verification. OCR-to-hash enables efficient batch verification of practitioner credentials.

**Cross-Jurisdictional Recognition:** When professionals move between states or countries, licensing bodies can verify foreign credentials without lengthy international verification processes.

**Immigration Authorities**

Visa and immigration processing:

**Skilled Worker Visas:** H-1B, skilled worker, and points-based immigration systems require educational credentials. Immigration officers can verify degrees are genuine.

**Student Visa Transitions:** When students transition from student visas to work authorization, immigration can verify the claimed degree was actually conferred.

**Credential Evaluation Services:** Organizations like WES that evaluate foreign credentials can verify source documents before issuing equivalency assessments.

## Verification Architecture

**The Diploma Mill Problem**

Credential fraud operates at multiple levels:

- **Complete Fabrication:** Entirely fake universities with professional-looking websites
- **Degree Mills:** "Universities" that grant degrees for payment without meaningful study
- **Impersonation:** Using another person's legitimate degree
- **Alteration:** Modifying dates, honors, or degree titles on legitimate documents

OCR-to-hash addresses fabrication, mills, and alteration. The verification URL must resolve to a domain the issuing institution controls. Diploma mills could theoretically set up verification endpoints, but domain reputation and registry checks (is this an accredited .edu?) provide additional signals.

**Consortium Approaches**

Rather than each university operating independent verification, several models exist:

**National Student Clearinghouse (US Model):** A central nonprofit that receives enrollment and graduation data from participating institutions. Could serve as a verification endpoint aggregator—universities submit hashes, Clearinghouse provides unified verification infrastructure.

**Government Registries:** Some countries maintain national degree registries (India's National Academic Depository, for example). These could host verification endpoints for all recognized institutions.

**University Consortiums:** Groups like the Big Ten, Ivy League, or Russell Group could operate shared verification infrastructure, reducing per-institution costs while maintaining institutional control.

**Blockchain Experiments:** MIT, University of Melbourne, and others have experimented with blockchain-based credentials. The OCR-to-hash approach is complementary—the printed document can reference a verification URL that checks against blockchain-anchored hashes.

**Revocation and Updates**

Unlike bank statements (which are point-in-time records), academic credentials can be revoked:

- **Academic Misconduct:** Degrees rescinded for plagiarism, cheating, or fraud discovered after graduation
- **Administrative Error:** Degrees awarded in error and subsequently withdrawn
- **Institutional Closure:** When institutions close, credential verification must continue

The verification response should clearly indicate status: "Verified," "Revoked," or "Institution Closed—Contact [successor organization]." Revocation dates and reasons may optionally be included.

**Transcript Considerations**

Transcripts present additional challenges:

- **Multi-Page Documents:** Course listings may span many pages. Per-page verification prevents page substitution (swapping in better grades from a different semester).
- **Cumulative vs. Term:** Students may have multiple transcript versions (each semester vs. final cumulative). Each version should be independently verifiable.
- **Unofficial vs. Official:** The distinction matters less with OCR-to-hash—if the hash verifies, the content is what the university issued regardless of paper stock or "official" stamps.
