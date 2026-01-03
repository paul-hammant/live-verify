---
title: "Bar Admission and Good-Standing Letters"
category: "Professional & Educational Qualifications"
volume: "Very Small"
retention: "Current + 2-5 years"
slug: "bar-admission-good-standing"
tags: ["legal", "attorney", "bar-association", "good-standing", "license", "professional"]
derivations: 1
furtherDerivations: 1
---

## What is a Good-Standing Letter?

Just because someone has a law degree doesn't mean they are allowed to practice law today. They might have been suspended for stealing client money or disbarred for ethics violations.

A **Certificate of Good Standing** is the "Live License" for a lawyer. It is issued by the Supreme Court of their state and proves they are active and compliant.

Because attorneys often move between states for specific cases, they must show these letters to foreign judges. A verified letter ensures a "fake lawyer" (identity thief) can't walk into a courtroom and represent a client.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #999; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
  <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 20px;">
    <div style="font-weight: bold; font-size: 1.4em; letter-spacing: 1px;">SUPREME COURT OF THE STATE OF NEW YORK</div>
    <div style="font-size: 0.9em; margin-top: 5px;">APPELLATE DIVISION, FIRST JUDICIAL DEPARTMENT</div>
  </div>

  <div style="font-size: 1em; line-height: 1.8; color: #000; text-align: justify;">
    <p>I, Susanna Rojas, Clerk of the Appellate Division of the Supreme Court of the State of New York, First Judicial Department, do hereby certify that</p>
    
    <p style="text-align: center; font-size: 1.3em; font-weight: bold; margin: 20px 0;"><span data-bracket="start" data-for="bar">]</span>SAUL GOODMAN</p>

    <p>was duly licensed and admitted to practice as an Attorney and Counselor-at-Law in all the courts of this State on <strong>May 15, 2010</strong>, has duly taken and subscribed the statutory oath of office, and has been enrolled in the Roll of Attorneys and Counselors-at-Law on file in my office, is currently in <strong>GOOD STANDING</strong>, and is registered with the Office of Court Administration.</p>
  </div>

  <div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <div style="width: 100px; height: 100px; border: 2px double #ccc; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7em; color: #999; font-weight: bold;">OFFICIAL<br>SEAL</div>
    </div>
    <div style="text-align: right;">
      <div style="border-top: 1px solid #000; width: 200px; padding-top: 5px;">Susanna Rojas, Clerk</div>
      <div style="font-size: 0.8em; color: #777;">March 15, 2026</div>
    </div>
  </div>

  <div data-verify-line="bar" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: State Bar doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:nycourts.gov/attorneys/v/998877 <span data-bracket="end" data-for="bar">]</span>
  </div>
</div>

## Data Verified

Attorney name, bar registration number, admission date, current status (Good Standing, Suspended, Disbarred), disciplinary history summary, issuing court/department, date of letter.

**Document Types:**
- **Certificate of Good Standing:** For out-of-state admission (Pro Hac Vice).
- **Attorney Registration Card:** Pocket ID.
- **Disciplinary History Extract:** For judicial appointments.

## Data Visible After Verification

Shows the issuer domain (`nycourts.gov`, `calbar.ca.gov`) and real-time status.

**Status Indications:**
- **Good Standing** — Active and compliant with all fees/CLE.
- **Suspended** — Temporarily barred (e.g., for non-payment or ethics).
- **Disbarred** — Permanently removed from practice.
- **Deceased** — Record closed.

## Second-Party Use

The **Attorney** benefits from verification.

**Pro Hac Vice Admission:** When an attorney needs to practice in a foreign state for one specific case, the foreign court requires a "Good Standing" letter from their home state. A verified letter prevents the 2-week delay of mailing physical paper between court clerks.

**Job Applications:** Proving to a law firm or corporate legal department that their license is active and they have no hidden disciplinary history.

## Third-Party Use

**Courts and Judges**
**Authority to Practice:** A judge can scan the attorney's ID or standing letter in the courtroom to ensure the person standing before them is actually a member of the bar and hasn't been quietly suspended.

**Banks and Lenders**
**Escrow Account Verification:** Ensuring that an attorney opening an IOLA/IOLTA (trust) account is in good standing and authorized to hold client funds.

**Clients**
**Consumer Protection:** A client can verify their lawyer's status before signing a retainer or handing over a large deposit.

## Verification Architecture

**The "Fake Lawyer" Fraud Problem**

- **Identity Theft:** A non-lawyer using the name and bar number of a real, perhaps retired, attorney to open a fake firm and steal client deposits.
- **Suspension Concealment:** An attorney who was suspended last month presenting a "Good Standing" letter they printed three months ago.
- **Fabricated Credentials:** Using a high-quality template to create a bar admission certificate for a non-existent lawyer.

**Issuer Types**

**State Supreme Courts:** (The ultimate authority in most US states).
**State Bar Associations:** (Acting as the administrative arm).
**National Registries:** (e.g., ABA National Lawyer Regulatory Data Bank).

## Competition vs. Public Search (Attorney Search)

| Feature | OCR-to-Hash | Public Attorney Search | Paper Certificate |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Binds Date.** Proves standing *as of the letter date*. | **Live.** Shows standing *today*. | **Static.** Easily faked. |
| **Efficiency** | **Instant.** Scan the paper in the courtroom. | **Slow.** Type in name, navigate results, find the right "John Smith." | **Manual.** Compare seals. |
| **Trust** | **Domain-Bound.** Bound to `nycourts.gov`. | **High.** But prone to "Similar Name" errors. | **Medium.** |

**Why OCR wins here:** Specificity. Public searches for common names (e.g., "Robert Smith") can return 50 results. OCR-to-hash binds the verification to the **specific physical document** the lawyer is holding, eliminating the "wrong person" risk and the need for manual data entry in busy courtrooms.
