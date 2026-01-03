---
title: "Building Safety Postings"
category: "Site & Equipment Safety"
type: "use-case"
slug: "building-safety-postings"
beneficiary: "Occupants/Public"
tags: ["building-safety", "inspection", "certificates", "elevator", "fire-safety", "evacuation", "public-safety", "occupants"]
derivations: 1
furtherDerivations: 1
---

## What are Building Safety Postings?

In every modern building, safety is governed by a layer of "Compliance Paper." From the **Elevator Inspection Certificate** in the cab to the **Fire Extinguisher Tags** (mandated by OSHA 29 CFR 1910.157 and NFPA 10) in the hallway, these documents are the only way for the public to know if the equipment they are using is safe and maintained.

The problem is that these papers are easy to fake, "Pencil Whip" (signing without inspecting), or simply leave expired for years. A landlord might keep a 2023 certificate on the wall to hide the fact that the elevator failed its 2025 brake test.

OCR-to-hash allows a tenant, visitor, or fire marshal to scan the posting to verify: **"Is this equipment currently certified safe by the city or an authorized inspector?"**

<div style="max-width: 500px; margin: 24px auto; font-family: 'Times New Roman', serif; border: 4px solid #000; background: #fff; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); position: relative;">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 20px;">
    <div style="font-weight: bold; font-size: 1.3em; text-transform: uppercase;">Department of Buildings</div>
    <div style="font-size: 1em; letter-spacing: 1px;">ELEVATOR INSPECTION CERTIFICATE</div>
  </div>

  <div style="font-size: 0.9em; line-height: 1.6;">
    <p><strong>Building Address:</strong> 42 SKYSCRAPER PLAZA, NEW YORK, NY<br>
    <strong>Device ID:</strong> <span data-bracket="start" data-for="elevator">]</span>ELV-992288-B (Car #2)<br>
    <strong>Capacity:</strong> 3,500 LBS / 22 PERSONS</p>

    <div style="margin: 20px 0; padding: 15px; border: 1px solid #ccc; background: #f9f9f9;">
      <div style="text-align: center; font-weight: bold; text-decoration: underline; margin-bottom: 10px;">CERTIFICATION OF SAFETY</div>
      This device has been inspected and found to be in compliance with the Safety Code for Elevators and Escalators (ASME A17.1).
    </div>

    <p><strong>Inspection Date:</strong> MARCH 15, 2026<br>
    <strong>Expires:</strong> MARCH 15, 2027<br>
    <strong>Inspector:</strong> ROBERT J. MILLER (License #992)</p>
  </div>

  <div data-verify-line="elevator" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Municipalities don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:dob.city.gov/v/ELV992288B <span data-bracket="end" data-for="elevator">]</span>
  </div>
</div>

## Data Verified

Equipment ID (Serial Number), building address, capacity/rating, inspector name/license, date of inspection, expiration date, safety code version (e.g., ASME A17.1), maintenance company name.

**Document Types:**
- **Elevator/Escalator Certificate:** Posted in the cab or lobby.
- **Fire Extinguisher Tag:** Yellow/Green tag hanging from the nozzle.
- **Pool/Spa Sanitation Rating:** Posted at the facility entrance.
- **Boiler/Pressure Vessel Permit:** In the mechanical room.

## Data Visible After Verification

Shows the issuer domain (`dob.city.gov`, `fire-marshal.gov`) and the real-time status.

**Status Indications:**
- **Certified Safe** — Equipment is current and passed all tests.
- **Red Tagged** — **CRITICAL:** Equipment failed inspection and is unsafe for use.
- **Expired** — Inspection is overdue; use at own risk.
- **Inactive** — Equipment has been decommissioned.

## Second-Party Use

The **Building Owner / Property Manager** benefits from verification.

**Liability Protection:** By maintaining a verified "Chain of Safety," the owner can prove to insurers and courts that they met all mandatory safety standards, defending against "Negligence" lawsuits if an accident occurs.

**Maintenance Audit:** The owner can scan the tags left by their sub-contractors (e.g., the elevator repair firm) to ensure the tech actually updated the city's database and didn't just scribble on a piece of paper.

## Third-Party Use

**Building Occupants / Tenants**
**Personal Safety:** A parent entering an elevator with their child can scan the certificate. If it returns **"RED TAGGED - FAILED BRAKE TEST,"** they can choose to exit the car immediately and report the landlord.

**Fire Marshals / Inspectors**
**Rapid Compliance Check:** During a surprise walkthrough, an inspector can scan 50 fire extinguishers in minutes. OCR-to-hash prevents "Tag Swapping" (moving a good tag from a new unit to an old one).

**Insurance Underwriters**
**Risk Pricing:** Insurers can verify that a building's life-safety systems are actually current before renewing a commercial liability policy.

## Verification Architecture

**The "Ghost Certificate" Fraud Problem**

- **Expired Stays:** Keeping an old certificate in the elevator frame but using a PDF editor to change "2024" to "2026."
- **Pencil Whipping:** An inspector signing a fire tag today but dating it "Yesterday" to meet a quota, or signing without visiting the site.
- **Serial Swapping:** Using one "Pass" certificate for multiple identical machines across different floors.

**Issuer Types**

**Municipal Building Departments.**
**State Safety Boards (Boilers/Elevators).**
**Certified Third-Party Inspection Firms.**

**Privacy Salt:** Low. Building safety info is generally public record. However, equipment IDs should be salted to prevent competitors from mapping a city's entire infrastructure density.

## Rationale

Building safety is about "Passive Trust." By turning every safety placard into a live, verifiable bridge to the regulator, we empower the public to enforce the codes that protect their lives.