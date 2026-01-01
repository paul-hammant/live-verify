---
title: "Copyright Registrations"
category: "Intellectual Property Law"
type: "use-case"
volume: "Medium"
retention: "Life + 70 years (individual), 95 years (work for hire)"
slug: "copyrights"
tags: ["copyright", "intellectual-property", "registration", "media", "creative-works"]
---

# Copyright Registrations

## Data Verified

Registration number, title of work, author/creator name(s), copyright claimant/owner (may differ from creator—work for hire, assignments), creation date, publication date, registration date, type of work (literary, musical, dramatic, visual, audiovisual, sound recording), jurisdiction.

**For media files (songs, films, software):** The registration should include the SHA256 hash of the deposited media file, binding the registration to a specific version.

**Document Types:**
- **Registration Certificates** — Official copyright registration
- **Assignment Records** — Ownership transfers (creator → publisher, etc.)
- **Work-for-Hire Agreements** — Documentation of employer ownership
- **Termination Notices** — Author termination of transfer rights (35-year rule)
- **Recordation Documents** — Recorded transfers and licenses

Note: Creator ≠ rights holder. Work-for-hire, assignments, and transfers mean the copyright owner is often not the original creator.

## Data Visible After Verification

**Status Indications:**
- **Valid** — Registration on file
- **Transferred** — Ownership transferred (new owner info)
- **Terminated** — Author exercised termination rights
- **Expired** — Copyright term ended (public domain)
- **Disputed** — Ownership under legal dispute

## Second-Party Use

**Rights confirmation:** Creator/owner verifying their registration is genuine and current.

**Licensing negotiations:** Rights holder confirming ownership before licensing discussions.

**Dispute preparation:** Owner gathering verified documentation for infringement claims.

## Third-Party Use

**Licensing verification:** Licensees verifying licensor actually owns the rights.

**Platform content ID:** Streaming services verifying ownership claims for content.

**Publishing contracts:** Publishers verifying author's rights before acquisition.

**Litigation support:** Courts verifying registration claims in infringement cases.

**Estate planning:** Heirs verifying inherited copyright status.

## Verification Architecture

**The Copyright Fraud Problem**

- False ownership claims (claiming rights to others' works)
- Fabricated registration certificates
- Altered assignment chains
- Claiming exclusive rights when only holding non-exclusive license
- Misrepresenting work-for-hire status
- Version disputes (which version was actually registered?)

**Media File Binding**

For songs, films, software, and other digital works, the registration certificate should include:

```
Media SHA256: a1b2c3d4e5f6...
```

This binds the registration to a specific file, preventing:
- Claims that a modified version is the registered work
- Disputes over which version was deposited
- After-the-fact alterations presented as original

**Copyright Offices as Issuers**

- US Copyright Office (copyright.gov)
- UK Intellectual Property Office
- WIPO (international treaties)
- National copyright offices/registries

Note: Copyright exists automatically upon creation in Berne Convention countries. Registration is optional but provides legal advantages (statutory damages, attorney fees in US).

**Integration:** Content ID systems, rights management databases, collecting societies (ASCAP, BMI, PRS) could cross-reference verification.
