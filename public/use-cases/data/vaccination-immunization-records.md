---
title: "Vaccination and Immunization Records"
category: "Healthcare & Medical Records"
volume: "Very Large"
retention: "Lifetime (health & public safety history)"
slug: "vaccination-immunization-records"
tags: ["healthcare", "immunization", "vaccination-card", "cdc-white-card", "public-health", "travel-requirements", "school-enrollment", "medical-fraud", "phi-security"]
furtherDerivations: 1
---

## What are Immunization Records?

An **Immunization Record** (often a wallet card like the CDC "White Card" or a state-issued certificate) is the official proof that a person has received specific vaccines. These records are the "Gates of Entry" for **K-12 Schooling**, **University Dorms**, and **International Travel** to countries with endemic diseases like Yellow Fever.

The problem is that physical cards are easy to fake. During the COVID-19 pandemic, a massive black market emerged for "Fake White Cards," where people used real lot numbers on forged paper to bypass employment and travel rules. Similarly, students sometimes "edit" their childhood MMR records to meet college requirements. Verified hashes bind the **Patient Name, Vaccine Lot Number, and Date of Administration** to the provider's or the health department's domain (e.g., `cvs.com`, `cdc.gov`, or `doh.wa.gov`).

<div style="max-width: 450px; margin: 24px auto; font-family: sans-serif; border: 2px solid #ccc; border-radius: 8px; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #f4f4f4; padding: 15px; border-bottom: 1px solid #ccc; display: flex; align-items: center; justify-content: space-between;">
    <div>
      <div style="font-weight: bold; font-size: 1.1em; color: #333;" verifiable-text="start" data-for="vax"><span>[</span>COVID-19 Vaccination Record Card</div>
      <div style="font-size: 0.7em; color: #666;">Please keep this record card, which includes medical information about the vaccines you have received.</div>
    </div>
    <div style="width: 40px; height: 40px; background: #999; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: bold; font-size: 0.6em; text-align: center;">CDC</div>
  </div>
<div style="padding: 20px;">
    <div style="border-bottom: 1px solid #000; padding-bottom: 10px; margin-bottom: 15px;">
      <div style="font-size: 0.9em;"><strong>Patient Name:</strong> SMITH, SARAH JANE</div>
      <div style="font-size: 0.9em;"><strong>Date of Birth:</strong> 05/15/1985</div>
    </div>
<table style="width: 100%; border-collapse: collapse; font-size: 0.8em; text-align: left;">
      <tr style="border-bottom: 1px solid #000;">
        <th style="padding: 5px;">Vaccine</th>
        <th style="padding: 5px;">Product / Lot</th>
        <th style="padding: 5px;">Date</th>
        <th style="padding: 5px;">Healthcare Professional</th>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 8px 5px;">COVID-19</td>
        <td style="padding: 8px 5px;">PFZ / 992288</td>
        <td style="padding: 8px 5px;">15 MAR 26</td>
        <td style="padding: 8px 5px;">CVS #042</td>
      </tr>
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 8px 5px;">MMR</td>
        <td style="padding: 8px 5px;">MSD / 887766</td>
        <td style="padding: 8px 5px;">10 JUN 25</td>
        <td style="padding: 8px 5px;">Springfield Clinic</td>
      </tr>
    </table>
  </div>
<div style="padding: 15px; background: #fffbe6; border-top: 1px dashed #999; text-align: center;">
    <div data-verify-line="vax" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #000; font-weight: bold;"
      title="Demo only: Healthcare providers don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:cvs.com/vax/v/SMITH992288 <span verifiable-text="end" data-for="vax">]</span>
    </div>
    <div style="font-size: 0.65em; color: #666; margin-top: 8px; font-style: italic;">
      Scan to verify lot authenticity, administration date, and provider authority. PHI protected.
    </div>
  </div>
</div>

## Data Verified

Patient full name, date of birth, vaccine type/manufacturer (e.g., Pfizer/Moderna), lot number, dose number (1st/2nd/Booster), administration date, healthcare provider name/facility ID, state immunization registry ID.

**Document Types:**
- **Vaccination Card:** The physical wallet-sized record.
- **State Immunization Certificate:** Formal printout for school.
- **Yellow Card (International):** For WHO-regulated diseases.
- **Digital Health Pass:** (Linked hash) SMART Health Card equivalent.

## Data Visible After Verification

Shows the issuer domain (`cvs.com`, `cdc.gov`, `doh.state.gov`) and the health standing.

**Status Indications:**
- **Verified / Recorded** — The dose matches the original provider's digital record.
- **Lot Recalled** — **ALERT:** The specific vaccine lot has been flagged for a safety issue.
- **Invalid Lot** — **CRITICAL:** The lot number on the card does not exist or was never sent to this provider.
- **Series Incomplete** — **ALERT:** Additional doses are required for "Fully Vaccinated" status.

## Second-Party Use

The **Patient / Parent** benefits from verification.

**School Onboarding Speed:** A parent enrolling a child in a new school provides the verified hash of the kid's "Yellow Card." The school registrar can instantly see **"VERIFIED - MMR & POLIO"** on their phone, removing the 5-day delay of calling the pediatrician's office.

**Travel Confidence:** Before a high-stakes international trip, a traveler scans their own card. "Verified by CDC" provides them with the assurance that their paperwork will pass border inspection, preventing a traumatic refusal of entry at a foreign airport.

## Third-Party Use

**University Registrars / K-12 Admin**
**Fraud Filtering:** Every fall, schools receive thousands of vaccine cards. OCR-to-hash allows the system to instantly filter for only verified, provider-backed records, protecting the student population from "Outbreak Risk" caused by fraudulent immunization claims.

**Airlines / Border Security**
**Health Protocol Vetting:** Automatically checking the verified hashes of "Yellow Cards" for passengers arriving from endemic zones (e.g., Yellow Fever). Verification ensures the certificates aren't "Port-Side Forgeries."

**Employers (Healthcare / Senior Care)**
**Safety Compliance:** Verifying that 100% of staff have verified, active flu or COVID boosters to protect vulnerable patients.

## Verification Architecture

**The "Kitchen Table" Fraud Problem**

- **Lot Number Harvesting:** Using a real lot number from a friend's card to create a fake card for oneself.
- **Date Masking:** Changing a 2022 vaccination date to 2026 to bypass a "Recent Booster" requirement.
- **Provider Mimicry:** Using a reputable pharmacy's logo on a fake card to avoid taking a mandatory vaccine.

**Issuer Types**

**National Health Agencies (CDC).**
**State Immunization Registries (IIS).**
**Pharmacy Retailers (CVS, Walgreens).**

**Privacy Salt:** EXTREMELY CRITICAL. Vaccination data is Protected Health Information (PHI). The hash MUST be salted to prevent "Mass Health Mapping" or the targeting of individuals based on their vaccination status.

## Rationale

Immunization records are the "Physical Firewall" of public health. By turning static cards into verifiable digital bridges, we protect the community from the return of preventable diseases and ensure that "Public Safety" is backed by the cryptographic truth of the clinic.