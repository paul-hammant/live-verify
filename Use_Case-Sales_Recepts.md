
## Point-of-Sale Receipt Case: Preventing Double-Expensing

Expense fraud costs UK businesses [£1.3 billion annually](https://www.expensein.com/blog/expense-fraud/). OCR-to-hash prevents double-expensing by making each receipt's text cryptographically verifiable and uniquely claimable.

Key criteria: Business transaction with no privacy expectation. One-off transaction. Needs verifiable for tax/audit period (7 years). Hash must be unique to prevent duplicate claims.

### The Receipt: Where OCR-to-Hash Prevents Fraud

**What's printed on the receipt:**

```
┌─────────────────────────────┐
│ Starbucks Coffee            │
│ 123 Main St, Edinburgh      │
│ 27 Jan 2025    09:45:23     │
│                             │
│ Latte         £4.50         │
│ Croissant     £3.00         │
│ ─────────────────           │
│ Subtotal      £7.50         │
│ VAT (20%)     £1.50         │
│ ─────────────────           │
│ Total         £9.00         │
│                             │
│ Card: ****1234              │
│ Txn: #STB-EDI-45829         │
│ VAT Reg: GB123456789        │
│                             │
│ verify:starbucks.com/tx     │
└─────────────────────────────┘
```

**Critical details:**
- The **transaction details make the hash unique**: Date, time, items, total, VAT/sales tax, transaction ID all contribute to the hash
- **VAT (or sales tax) must be in the hash**: Prevents tampering with tax amounts and enables government audit trail

**Note for US readers:** Value-Added-Tax (VAT) is Sales tax

**Expense workflow (read-only verification):**

1. Employee scans receipt with phone app
2. App OCRs full receipt text (items, subtotal, VAT/sales tax, total, date, transaction ID)
3. App normalizes text, computes hash: `a7f3e92b...`
4. App verifies receipt exists: `GET https://rx.starbucks.com/a7f3e92b...`
5. Starbucks server responds: **200 OK + "OK"** (receipt is valid)
6. Employee submits expense claim with verified hash
7. Finance department sees "✓ Verified against Starbucks"

**Duplicate claim detection (requires additional infrastructure):**

The simple GET verification above only confirms the receipt exists. To prevent double-expensing, one of these deployment models is needed:

**Option A: Employer tracks claims internally**
- Expense system maintains database of claimed receipt hashes
- Second claim of same hash → flagged as duplicate
- No mutation needed on merchant's server
- Simple, but each employer tracks independently

**Option B: Third-party clearinghouse (recommended)**
- ExpenseClear.com receives hash from POS systems
- First employee to claim registers with clearinghouse
- Second attempt → clearinghouse returns "Already claimed"
- See "Deployment Models" section below for details

**Why this prevents fraud:**

- **Unique hash per transaction:** Can't forge a different transaction with same hash (timestamp + transaction ID ensure uniqueness)
- **Tamper-evident:** Change "£7.50" to "£75.00" → different hash → verification fails
- **Tax tampering detected:** Can't under-report VAT/sales tax amount without changing hash
- **Photocopies detected:** Same text → same hash → duplicate claim caught (if using clearinghouse or internal tracking)
- **Domain binding:** Receipt text must verify against claimed merchant's actual domain

### Why QR Codes FAIL for Receipt Verification

**1. Static QR Enables Duplicate Claims**

- Receipt printed with QR: `https://starbucks.com/verify?ref=STB-45829`
- Employee expenses receipt → QR verifies "OK"
- Employee photocopies receipt + QR → **QR still verifies "OK"**
- No cryptographic binding prevents duplicate expense claims
- Merchant would need to track ref codes, but employee could claim at different times/companies

**2. Reference ID Privacy Leak**

- QR encodes transaction ref `STB-EDI-45829`
- Anyone scanning QR can query: items purchased, location, time
- Employee's purchase history potentially accessible
- With OCR-to-hash: hash reveals nothing about transaction content

**3. Forgery Risk**

- Print fake receipt + QR pointing to attacker-controlled server
- Server responds "Valid receipt ✓"
- Finance department fooled unless they manually check domain
- OCR-to-hash: receipt text must verify against claimed merchant's domain

**4. Receipt Tampering Undetected**

- Change "£7.50" to "£75.00" on printed receipt
- QR still points to original transaction verification
- QR verifies "OK" despite altered amount
- OCR-to-hash: altered text → different hash → verification fails

### The Thermal Receipt Problem: QR as Supplement

**Challenge:** Thermal receipts fade over time (3-6 months)

**Hybrid approach:**
```
┌─────────────────────────────┐
│ Starbucks Coffee            │
│ [transaction details]       │
│                             │
│ verify:starbucks.com/tx     │
│                             │
│ [QR code to PDF archive]    │
└─────────────────────────────┘
```

- **OCR-to-hash section:** Verify immediately after purchase (while text readable)
- **QR code:** Links to permanent PDF archive of receipt (for warranty/returns)
- **Best practice:** Employee scans for expense verification before receipt fades
- **QR benefit:** Long-term proof of purchase even after thermal text degrades

### Who Benefits from Receipt Verification

**Employees:**
- Prove expenses are authentic without keeping paper receipts
- Can't be accused of duplicate claiming (verification proves first claim)

**Employers:**
- Eliminate duplicate expense fraud (saves UK businesses £1.3bn/year)
- No need to maintain internal receipt database
- Automated verification reduces manual audit effort

**Merchants:**
- Reduce disputes ("I never bought this!")
- Build trust with business customers
- Minimal infrastructure cost (just host hashes)

### Deployment Models for Receipt Verification

The basic OCR-to-hash verification (GET request confirms receipt exists) is straightforward, but **preventing duplicate expense claims** requires additional infrastructure. Here are the practical deployment models:

### Employer-Only Tracking, or vendor managing expenses for that employer

**How it works:**
- Merchant hosts verification endpoint: `GET https://rx.starbucks.com/{hash}` → 200 OK
- Employer's expense system maintains internal database of claimed receipt hashes
- First claim: Hash stored in employer's database after merchant stores linkback:

  ```bash
  # Expensify (say they are running expenses for MSFT) registers the claim on the receipt after the employee files expenses.
  POST https://rx.starbucks.com/{hash}/claim
  Body: {
    "claimingSystem": "https://expensify.microsoft.com/receipts",
  }
  → 202 Accepted + "Claimant stored"

  ```
- Second claim from SAME domain: Rejected immediately
- Second claim from DIFFERENT domain: **Allowed, but logged for audit**

### Another scenario: Consultancy fraud (say WorksThought Inc - WT)

WorksThought consults to Google and Microsoft in a city that has both.

If Microsoft doesn't manage expenses for WorksThought staff, legitimately WT registers claims with merchants. But unscrupulously could bill multiple clients for the same expense:

```
Invoice to Google: £9 (receipt hash a7f3e92b...)
Invoice to Amazon: £9 (receipt hash a7f3e92b... - same receipt!)
WorksThought pockets extra £9
```

**Merchant's record shows only one claim:**
```json
{
  "hash": "a7f3e92b...",
  "claims": [
    {
      "claimant": "https://expenses.WorksThought.com/receipts",
      "claimed_at": "2025-01-27T14:30:00Z"
    }
  ]
}
```

**No red flag at Starbucks** - they only see one legitimate claim.

**Auditor review (periodic, not real-time):**

Like "hedge fund administrators" detecting possible Ponzi schemes on behalf of hedge fund investors, an independent auditor cross-checks:
1. **Merchant records** (what WT claimed from Starbucks)
2. **Client invoices** (what WT billed to Google and Amazon)

```bash

# Auditor queries clients' expense systems
GET https://expenses.google.com/api/invoices?vendor=WorksThought&since=2025-01-01
GET https://expenses.amazon.com/api/invoices?vendor=WorksThought&since=2025-01-01

# Auditor extracts receipt hashes from both invoices
# Finds: Hash a7f3e92b... appears on BOTH Google and Amazon invoices

# Cross-check with Starbucks
GET https://rx.starbucks.com/a7f3e92b.../claims
→ Shows: Only claimed once by WorksThought.com

# FRAUD DETECTED:
# - TW claimed £9 once from Starbucks
# - TW billed £9 to Google
# - TW billed £9 to Amazon (same hash!)
# - TW received £18 for one £9 expense
```
After each of Amazon and Google asking WT who their expense auditor was at the time of signing
their contract. they register themselves with that auditor.

the auditor contacts Google AND Amazon directly (bypassing WorksThought) for a batch
pickup of expenses claimed. Then the correlation is done, and exceptions fed back to them. Likely
WT pays a fine. Maybe worst case there's a civil case. Most likely there is none of those ever as
the class of fraud dissappears.

**Audit would likely be retrospective:** It doesn't really need to be real-time. Auditor reviews weekly or monthly, flags anomalies, contacts affected clients. Even months-old fraud detection has value for:
- No doubt there are 2x clawback provisions in contracts
- Criminal fraud prosecution (7-year statute of limitations) are a possibility if it goes beyond occasional, but this class of fraud disappears, and likely the nation-state moves this to civil from criminal because of this self defense mechanism.
- Termination of consultancy agreements
- Reputation damage / blacklisting

**Pros:**
- No coordination between merchants needed
- No third-party dependencies (unless using external auditor as consultancies would likely need to)
- Employer has full control over their expense data
- Expense fraud diminishes
- Audit trail enables retrospective fraud detection

**Cons:**
- Each employer maintains some infrastructure for this, or has to outsource
- Cross-client fraud requires auditor function (not automatic blocking)
- Legitimate multi-project claims may be flagged (requires investigation)

**Use case:** Small/medium businesses with in-house expense systems, consultancies with multiple clients

### More authoritarian model: Government-Mandated Registry

**Regulatory requirement:**
```
HMRC (UK) IRS (USA) regulation: All businesses with >£100K/$100K annual revenue
must publish receipt hashes for VAT/sales tax audit purposes.
```

**Dual-endpoint architecture:**

1. **Public merchant endpoint**:
   ```bash
   GET https://rx.starbucks.com/a7f3e92b...
   → 200 OK + "OK"
   ```

2. **Government tax registry** (for audit):
   ```bash
   # POS submits to tax authority (UK example with VAT)
   POST https://expenses.hmrc.gov.uk
   Headers: Authorization: Bearer {GOV_GATEWAY_TAX_ID_TOKEN}
   Body: {
     "hash": "https://rx.starbucks.com/a7f3e92b...",
     "subtotal": 7.50,
     "accountingRef": "HB/e/433/1235",
     "vat_amount": 1.50,
     "vat_rate": 0.20,
     "timestamp": "2025-01-27T09:45:23Z"
   }
   → 202 Accepted

   # US example with sales tax
   POST https://itin-exps.irs.gov
   Headers: Authorization: Bearer {ITIN_ACC_ACCESS_TOKEN}
   Body: {
     "hash": "https://rx.starbucks.com/a7f3e92b...",
     "subtotal": 10.00,
     "accountingRef": 288177322,
     "sales_tax_amount": 0.85,
     "sales_tax_rate": 0.085,
     "timestamp": "2025-01-27T14:30:00Z"
   }
   → 202 Accepted
   ```
The system would need to allow have some state management - expens filed, paid, and perhaps even reimbursed if applicable.

**Benefits:**
- **Tax audit trail:** Government tracks all VAT/sales tax collected
- **Fraud detection:** Merchant can't under-report tax (hash proves amount charged)
- **Duplicate prevention:** Government flags multiple expense claims for same receipt
- **Long-term archive:** Government maintains records beyond company bankruptcy

**Existing examples:**
- 
- **Sweden's Kontrollenheten:** Digital cash registers required since 2010
- **Italy's electronic invoicing:** All B2B/B2C invoices submitted to Agenzia delle Entrate
- **Estonia's KSI blockchain:** Government records secured by hash-based verification

### Bankruptcy & Archive Handling

**Problem:** Merchant goes bankrupt, verification endpoint dies. Solution: government picks up data to serve (read only)

```bash
# While merchant alive
GET https://rx.starbucks.com/{hash} → 200 OK

# After bankruptcy
GET https://rx.starbucks.com/{hash} → 404
# Fallback to government archive
GET https://archived-receipts-as-went-bust-in-2028.hmrc.gov.uk/starbucks.com/{hash} → 200 OK
```
- Government maintains archived hashes for bankrupt companies
- Retention: 7 years (tax audit statute of limitations)
- Only accessible after company's domain expires

