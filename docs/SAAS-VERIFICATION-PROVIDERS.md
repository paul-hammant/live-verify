# SaaS Verification Providers

## The Opportunity

OCR-to-hash verification requires someone to operate a verification endpoint at a trusted domain. Large organizations (banks, governments, corporations) can host their own, but vast categories of issuers cannot:

- Individuals (freelancers, landlords, private sellers)
- Small businesses without IT resources
- Civic organizations (HOAs, clubs, societies, churches)
- Local government bodies (town councils, school boards)
- Professional practitioners (solo attorneys, accountants, doctors)

This creates an opportunity for **SaaS verification providers** - companies that host verification endpoints on behalf of issuers who lack their own infrastructure.

## White-Label Domain Model

The simplest approach: issuers use the provider's domain directly.

```
verify:witnessco.com/v/abc123
verify:docuverify.io/hash/7f3a2b...
verify:certchain.com/c/acme-corp/8847
```

This works but has a trust limitation: verifiers must trust both the SaaS provider AND the issuer. The provider's domain becomes the trust anchor, not the issuer's.

## Custom Domain Model (Recommended)

Better: providers offer custom domain support so issuers appear under their own identity.

```
verify:contracts.acme-corp.com/v/8847
verify:hr.smallbiz.com/references/4421
verify:records.oakstreet-hoa.org/minutes/2026-01
```

The issuer controls the domain (via DNS CNAME or similar), the provider operates the infrastructure. Verifiers see the issuer's domain as the trust anchor.

**Implementation:**
- Issuer registers domain or subdomain
- Points DNS to provider's infrastructure
- Provider handles SSL certificates (Let's Encrypt, etc.)
- Provider hosts hash database on issuer's behalf
- Issuer manages their hashes via provider's dashboard/API

## Multi-Tenant Architecture

Providers serve many issuers from shared infrastructure:

```
┌─────────────────────────────────────────────────────────┐
│                  SaaS Provider Infrastructure           │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ acme.com     │  │ smallbiz.com │  │ hoa.org      │  │
│  │ CNAME ──────►│  │ CNAME ──────►│  │ CNAME ──────►│  │
│  │              │  │              │  │              │  │
│  │ Hashes: 1.2M │  │ Hashes: 847  │  │ Hashes: 156  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                         │
│  Shared: SSL termination, hash lookup, status API,     │
│          revocation, analytics, audit logs             │
└─────────────────────────────────────────────────────────┘
```

## Use Cases by Category

**Employment & HR:**
- Small business employment references
- Freelancer project verifications
- Contractor work history

**Real Estate:**
- Landlord lease agreements
- Property management documents
- HOA meeting minutes and bylaws

**Legal & Contracts:**
- Solo practitioner client documents
- Small firm contracts and agreements
- Mediation and arbitration records

**Financial:**
- Private loan agreements
- Family financial arrangements
- Small business invoices and receipts

**Civic & Community:**
- Club and society governance
- Religious organization records
- Local government minutes
- School and PTA documents

**Professional Services:**
- Consultant deliverables
- Audit and inspection reports
- Professional certifications

## Business Models

**Subscription Tiers:**
- Free: Limited hashes, provider subdomain only
- Basic: Custom domain, moderate volume
- Professional: Higher volume, API access, analytics
- Enterprise: Unlimited, SLA, dedicated support

**Per-Document:**
- Pay-per-hash for occasional users
- Bulk pricing for high-volume periods
- Event-based (e.g., annual meeting minutes)

**White-Label Resale:**
- Law firms offering to clients
- Accountants for business clients
- HR platforms for employee documents
- Property management for landlords

**API Integration:**
- Contract management platforms
- HRIS systems
- Document management systems
- Legal practice software

## Trust Considerations

**Provider Reputation:**
Verifiers must trust that the provider:
- Won't fabricate hashes
- Won't delete hashes improperly
- Maintains uptime and availability
- Preserves records for required retention periods

**Issuer Accountability:**
Even with custom domains, the issuer remains accountable for:
- What documents they hash
- Accuracy of document content
- Proper revocation when needed

**Audit Trails:**
Providers should maintain:
- Hash submission timestamps
- Revocation history
- Access logs (who verified what, when)
- Issuer authentication records

## Regulatory Considerations

Some industries may require:
- Data residency (hashes stored in specific jurisdictions)
- Retention guarantees (minimum years before deletion)
- Audit access for regulators
- Escrow arrangements for provider failure

Providers serving regulated industries (healthcare, finance, legal) should document compliance capabilities.

## Competitive Landscape

This space is nascent. Potential entrants include:
- Existing e-signature platforms (DocuSign, Adobe Sign)
- Notary platforms (Notarize, NotaryCam)
- Legal tech companies
- Blockchain/timestamping services pivoting to simpler models
- New startups purpose-built for OCR-to-hash

The key differentiator will be **simplicity** - making it trivially easy for a sole proprietor or small organization to get verification endpoints operational.

## Getting Started (For Providers)

1. **Core Infrastructure:**
   - Hash database (simple key-value, or append-only log)
   - HTTP endpoint returning status for hash lookups
   - SSL/TLS termination with custom domain support

2. **Issuer Onboarding:**
   - Self-service signup
   - Domain verification (DNS TXT record)
   - Dashboard for hash management

3. **Developer Experience:**
   - API for programmatic hash submission
   - Webhooks for verification events
   - SDKs for common languages/platforms

4. **Trust Building:**
   - Transparency reports
   - Third-party audits
   - Published uptime and retention commitments
