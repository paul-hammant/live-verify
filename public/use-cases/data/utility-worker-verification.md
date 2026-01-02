---
title: "Utility worker verification (gas/electric/water)"
category: "Personal Safety & Service Verification"
volume: "Large"
retention: "Service + 1-3 years (access records)"
slug: "utility-worker-verification"
tags: ["utility", "worker", "verification", "personal", "safety", "service", "home-security", "fraud-prevention"]
---

## What is Utility Worker Verification?

Criminals posing as **Utility Workers** (Gas, Electric, Water) is one of the most common methods for gaining entry to private homes for burglary, assault, or "Shakedown" scams. These fraudsters often target the elderly, claiming a "Gas Leak" or an "Urgent Meter Inspection" to bypass locks.

Legitimate utility workers often have badges that are easily forged with a home printer. Even if the badge is real, the resident has no way of knowing if the worker is actually on a scheduled shift or if their employment was terminated yesterday.

OCR-to-hash allows a homeowner to scan the worker's ID badge to verify: **"Is this person an active employee of this specific utility, and is there a valid service order for this address today?"**

<div style="max-width: 400px; margin: 24px auto; font-family: sans-serif; border: 2px solid #0066cc; border-radius: 10px; background: #fff; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
  <div style="background: #0066cc; color: #fff; padding: 15px; display: flex; align-items: center; justify-content: space-between;">
    <div style="font-weight: bold; font-size: 1.2em; letter-spacing: 1px;">CONSOLIDATED EDISON</div>
    <div style="font-size: 0.7em; text-align: right; opacity: 0.9;">AUTHORIZED<br>FIELD SERVICE</div>
  </div>

  <div style="padding: 20px; display: flex; border-bottom: 1px solid #eee;">
    <div style="width: 100px; margin-right: 15px;">
      <div style="width: 100px; height: 125px; background: #eee; border: 1px solid #ccc; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 0.7em; text-align: center;">[PHOTO ID]</div>
    </div>
    <div style="flex-grow: 1;">
      <div style="font-size: 0.75em; color: #777; text-transform: uppercase;">Employee Name</div>
      <div style="font-size: 1.1em; font-weight: bold; margin: 0 0 10px 0; color: #333;"><span data-bracket="start" data-for="utility">]</span>DAVID R. CHEN</div>
      
      <div style="font-size: 0.75em; color: #777; text-transform: uppercase;">Employee ID</div>
      <div style="font-size: 1em; font-weight: bold; margin: 0 0 10px 0;">ID: NY-992288</div>
      
      <div style="font-size: 0.75em; color: #777; text-transform: uppercase;">Specialization</div>
      <div style="font-size: 0.9em; font-weight: bold; color: #d32f2f;">GAS OPERATIONS</div>
    </div>
  </div>

  <div style="padding: 15px; background: #f9f9f9;">
    <div style="font-size: 0.7em; color: #555; text-align: center; margin-bottom: 10px; line-height: 1.3;">
      Scan to verify current employment status and field access authorization.
    </div>
    <div data-verify-line="utility" style="border-top: 1px dashed #999; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #0066cc; text-align: center; font-weight: bold;"
      title="Demo only: Utility companies don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:coned.com/v/NY992288-DRC <span data-bracket="end" data-for="utility">]</span>
    </div>
  </div>
</div>

## Data Verified

Worker name, employee ID, company name, service specialization (Gas/Electric/Steam), photograph (via hash), expiration date, background check status, vehicle fleet number.

**Document Types:**
- **Employee ID Badge:** Worn on the lanyard.
- **Service Order / Job Ticket:** Printed or on-tablet proof of work.
- **Notice of Entry:** Left on the door for scheduled maintenance.

## Data Visible After Verification

Shows the issuer domain (`coned.com`, `pge.com`, `nationalgrid.com`) and the worker's status.

**Status Indications:**
- **Active Duty** — Worker is currently on shift and assigned to field tasks.
- **Verified Dispatch** — (If linked to order) A service order exists for this zip code/street today.
- **Terminated** — **ALERT:** Person is no longer an employee.
- **Fraud Alert** — **ALERT:** This ID has been flagged for misuse.

## Second-Party Use

The **Homeowner / Resident** benefits from verification.

**Vulnerable Population Protection:** An elderly person living alone receives a knock from a "Gas Inspector." Instead of opening the door, they ask the worker to hold their ID to the window. They scan it and see **"ACTIVE DUTY: David Chen"** on their phone, allowing them to safely grant access.

**Anti-Scam:** A "Water Dept" worker demands $100 to "Fix a high-pressure valve" immediately. The resident scans the ID. If it returns **"OFF DUTY"** or **"UNKNOWN,"** they know it's a shakedown and call the police.

**Privacy:** Residents can verify the worker's authority without needing to call a busy call center or providing their own account details to the worker.

## Third-Party Use

**Police Departments**
**Scam Investigation:** When a "Utility Scam" is reported, police can use the verified hashes to determine if the ID used was a forged version of a real employee or a completely fabricated entity.

**Apartment Building Security**
**Access Logging:** Front-desk staff can scan every utility worker who enters the building, creating a cryptographically verified log of exactly who had access to the building's infrastructure (pipes, wiring) and when.

## Verification Architecture

**The "High-Viz" Fraud Problem**

- **Camouflage:** Scammers wearing generic "Safety Green" vests and hard hats to look professional.
- **Fake Emergencies:** Claiming a "Gas Leak" to create panic and bypass resident caution.
- **ID Clipping:** Using a generic "Contractor" badge from an office supply store to impersonate a utility employee.

**Issuer Types**

**Investor-Owned Utilities (IOUs).**
**Municipal Water/Power Departments.**
**Sub-contractor Firms.**

**Privacy Salt:** Critical. The hash must be salted to prevent competitor reconnaissance or data harvesting of employee rosters.

## Rationale

Utility worker verification is about "Personal Safety at the Door." By allowing a resident to instantly cross-reference a physical badge with a digital corporate record, it neutralizes the primary weapon of home-invasion scammers: the fake uniform.