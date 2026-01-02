---
title: "PEP Declarations (Politically Exposed Persons)"
category: "Financial Services Compliance"
volume: "Medium"
retention: "5-10 years post-relationship"
slug: "pep-declarations"
tags: ["pep", "politically-exposed", "aml", "kyc", "corruption", "enhanced-due-diligence"]
---

## What is a PEP Declaration?

A **Politically Exposed Person (PEP)** is someone in a prominent public position — or their close family/associates. PEPs are higher risk for money laundering and corruption because of their access to public funds and influence.

Financial institutions must identify PEPs and apply enhanced due diligence. The **PEP declaration** is a self-disclosure where individuals confirm whether they are (or are not) a PEP, and if so, provide details about their role.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #8B0000; background: #fff; padding: 0;">
  <div style="background: #8B0000; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;">POLITICALLY EXPOSED PERSON DECLARATION</div>
    <div style="font-size: 0.8em;">Enhanced Due Diligence Disclosure</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Name:</strong> Alexander Volkov<br>
    <strong>Date of Birth:</strong> [Redacted]<br>
    <strong>Declaration Date:</strong> January 10, 2026</p>

    <div style="background: #fff5f5; padding: 15px; margin: 15px 0; border: 1px solid #8B0000;">
      <p style="margin: 0;"><strong>I declare that:</strong></p>
      <p style="margin: 10px 0 0;">☑ I AM a Politically Exposed Person</p>
      <p style="margin: 10px 0 0;"><strong>Role:</strong> Deputy Minister of Transport, [Country]</p>
      <p style="margin: 5px 0 0;"><strong>Period:</strong> 2018 – Present</p>
      <p style="margin: 5px 0 0;"><strong>Source of Wealth:</strong> Government salary, family inheritance (declared)</p>
    </div>

    <p style="font-size: 0.85em; color: #666;">I confirm this information is accurate and undertake to notify the firm of any changes to my PEP status.</p>

    <div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      verify:privatbank-kyc.com/pep/AV-2026-0110
    </div>
  </div>
</div>

## Data Verified

**Declarant name**, **declaration date**, **PEP status** (yes/no), **role/position** (if PEP), **country**, **period of office**, **relationship type** (self, family member, close associate), **source of wealth summary**.

## Data Visible After Verification

**Status Indications:**
- **Current** — Declaration on file, individual remains client
- **Updated** — PEP status has changed (new declaration supersedes)
- **Relationship Ended** — Account closed
- **Under Review** — Enhanced due diligence in progress

## Who is a PEP?

| Category | Examples |
|----------|----------|
| **Domestic PEP** | Ministers, MPs, senior civil servants, military officers, judges |
| **Foreign PEP** | Same roles in other countries |
| **International Organization PEP** | UN officials, World Bank executives, EU commissioners |
| **Family Members** | Spouse, children, parents, siblings of PEPs |
| **Close Associates** | Business partners, advisors, beneficial owners linked to PEPs |

## Jurisdiction Differences

| Jurisdiction | Regulator | Framework | Key Differences |
|--------------|-----------|-----------|-----------------|
| **UK** | FCA | MLR 2017, JMLSG Guidance | Domestic PEPs treated as lower risk than foreign |
| **US** | FinCEN | BSA, CDD Rule | Focus on foreign PEPs; no explicit domestic PEP rule |
| **EU** | National FIUs | AMLD 4/5/6 | All PEPs (domestic and foreign) require EDD |

US is notably weaker on domestic PEPs — a US senator opening a bank account in the US faces less scrutiny than the same senator opening an account in London.

## Third-Party Use

**Banks/investment firms** — Onboarding and ongoing due diligence
**Compliance officers** — Risk assessment and EDD decisions
**Auditors** — Verifying AML program effectiveness
**Regulators** — Thematic reviews of PEP handling
**Correspondent banks** — Assessing downstream relationships

## Verification Architecture

**The Problem:**
- Individuals may falsely deny PEP status to avoid scrutiny
- Declarations may be backdated or altered
- Firms may claim they obtained declarations that don't exist

**The Fix:** Declaration is hashed at signing. Both firm and individual retain copies. If disputed (e.g., "I disclosed my role; they ignored it"), verification proves exactly what was declared and when.

**Note:** Verification confirms the declaration exists and is authentic — it does NOT confirm the declaration is truthful. Cross-referencing with PEP databases (World-Check, Dow Jones) remains necessary.
