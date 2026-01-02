---
title: "Workplace Postings"
category: "Workplace Postings"
type: "use-case"
slug: "workplace-postings"
beneficiary: "Employees"
tags: ["workplace", "labor-law", "safety", "mandatory", "employees", "osha", "fmla", "eeoc", "nlra"]
---

# Workplace Postings

**Category:** Workplace Postings
**Beneficiary:** Employees
**Examples:** OSHA, working hours, maternity protection, minimum wage, FMLA, EEO, unionization rights.

Mandatory workplace postings are government-required notices that inform workers of their rights regarding safety, wages, discrimination, and leave. 

**Where Posted:** Conspicuous locations accessible to all employees, typically **employee breakrooms**, **hallways**, near **time clocks**, or in **common areas**.

## Verification Value

**Problem:**
- **Outdated Information:** Employers may fail to update posters when laws change (e.g., minimum wage increases or the PUMP Act expansion), leading to $10,000+ fines.
- **Fabrication/Alteration:** Managers may "edit" posters to hide rights (e.g., changing "12 weeks" of FMLA leave to "4 weeks" or altering "tipped wage" amounts).
- **Compliance Scams:** Private vendors scaring businesses into buying $200 bundles of posters that are actually free from the government.

**Solution:**
Employees can scan the poster to verify it is the **current, un-altered official version** directly from the issuing authority (e.g., `dol.gov`, `osha.gov`, `eeoc.gov`). This ensures they are not being misled about their legal protections.

## Key Examples

### Health & Safety (OSHA)
*   **Purpose:** Inform workers of their right to a safe workplace and how to report hazards anonymously.
*   **Risk:** Fake posters might omit the right to request an inspection or list an internal HR number instead of the official OSHA hotline.

### Wages & Hours (FLSA)
*   **Purpose:** Display current federal/state minimum wage and overtime rules.
*   **Risk:** "Wage theft" via altered posters that misstate the "Tip Credit" or overtime eligibility.

### Employee Rights & Leave (FMLA, PUMP Act)
*   **Purpose:** Detail rights to unpaid, job-protected leave for family/medical reasons or lactation accommodations.
*   **Risk:** Employers inflating eligibility requirements (e.g., claiming 2,000 hours worked instead of the legal 1,250) to discourage leave.

### Discrimination & Organizing (EEOC, NLRA)
*   **Purpose:** Protect against discrimination and guarantee the right to organize or join a union.
*   **Risk:** Sanitized posters that remove mention of specific protected classes or the right to strike.

## Global Variations

*   **United States:** Focuses on federal (DOL, EEOC) and state-level labor department requirements. Includes specialized notices like the Polygraph Protection Act.
*   **France (Affichages Obligatoires):** Includes *Convention collective*, *Règlement intérieur*, and strict *Harcèlement* (anti-harassment) disclosures.
*   **Germany (Aushangpflichtige Gesetze):** Laws like *Mutterschutzgesetz* (maternity) and *Arbeitszeitgesetz* (hours) must be posted or made digitally accessible.
*   **United Kingdom:** Requires the official **Health & Safety Law** poster and the **Employer's Liability Insurance Certificate**.

## Implementation for Issuers

**Regulatory Bodies (DOL, OSHA):**
1.  **Generate:** Create the official PDF with a `verify:` line.
2.  **Hash:** Bind the text content to the hash.
3.  **Publish:** Host the endpoint confirming the version status (Current/Outdated).

**Employers:**
1.  **Print & Post:** Use official free versions.
2.  **Audit:** Periodically scan posters to ensure they haven't been superseded by new legislation.
