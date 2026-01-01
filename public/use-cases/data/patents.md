---
title: "Patent Registrations"
category: "Intellectual Property Law"
type: "use-case"
volume: "Medium"
retention: "20 years (utility/plant), 15 years (design)"
slug: "patents"
tags: ["patent", "intellectual-property", "USPTO", "EPO", "invention"]
---

# Patent Registrations

## Data Verified

Patent number, title of invention, inventor name(s), assignee/owner (may differ from inventor), application date, issue date, patent type (utility, design, plant), jurisdiction, expiration date, maintenance fee status.

**For the full patent document:** The certificate should include the SHA256 hash of the complete patent PDF (specification, claims, drawings), binding the registration to the exact granted document.

**Document Types:**
- **Patent Grants** — Official certificates of patent issuance
- **Assignment Records** — Ownership transfers (inventor → company, sale, etc.)
- **Maintenance Fee Receipts** — Proof of annuity/maintenance payment
- **International Patents** — PCT applications, national phase entries
- **Continuation/Divisional** — Related patent family documents

## Data Visible After Verification

**Status Indications:**
- **Valid** — Patent in force, maintenance fees current
- **Expired** — Term ended or maintenance lapsed
- **Abandoned** — Application abandoned before grant
- **Invalidated** — Patent invalidated by court or patent office
- **Pending** — Application filed, not yet granted

## Second-Party Use

**Inventor verification:** Confirming patent grant is genuine before licensing discussions.

**Assignment confirmation:** Verifying ownership transfer documents before corporate transactions.

**Portfolio valuation:** Patent holder confirming validity for M&A due diligence.

## Third-Party Use

**Licensing negotiations:** Potential licensees verifying patent validity before signing agreements.

**Litigation support:** Courts verifying patent status in infringement cases.

**Investment due diligence:** VCs/acquirers verifying IP portfolio claims.

**Freedom-to-operate:** Companies verifying competitor patent status before product launch.

## Verification Architecture

**The Patent Fraud Problem**

- Fake patent certificates claiming inventions never granted
- Altered assignee names to claim false ownership
- Expired patents presented as in-force
- Fabricated continuation chains
- Maintenance fee lapses hidden
- Claim scope disputes (which version of claims was granted?)

**Patent Document Binding**

The certificate should include:

```
Patent PDF SHA256: a1b2c3d4e5f6...
```

This binds to the exact granted document—specification, claims, and drawings. Prevents disputes over claim amendments during prosecution or post-grant proceedings.

**Patent Offices as Issuers**

- USPTO (United States)
- EPO (European Patent Office)
- JPO (Japan), KIPO (Korea), CNIPA (China)
- WIPO (PCT international applications)
- National patent offices worldwide

**Integration:** Patent databases (Espacenet, Google Patents) could cross-reference verification endpoints.
