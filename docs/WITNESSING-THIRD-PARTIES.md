# Witnessing and Third Parties

## Party Model

### First Party (Issuer)
Creates and signs the document. Examples: hotel, employer, bank, insurance company.

### Second Party (Recipient)
Receives it, **keeps it**, and **may later** hand it to third parties for various reasons.

The "keeps it" is important because:

1. **Personal record** - They have their own verified copy of what was agreed
2. **Peace of mind** - They can check it themselves anytime
3. **Future optionality** - IF a dispute arises, they have proof ready

Most of the time, the document just sits in their inbox or file drawer. The verification value is latent - it's there *if needed*.

The second party benefits from verification even if they never show it to anyone:
- "I can confirm this matches what the issuer's system recorded"
- "I know this hasn't been altered since I received it"
- "If I ever need to prove something, I'm covered"

The third-party handoff is a *potential* use, not the primary one.

### Third Party (Verifier)
Receives the document from the second party and verifies authenticity. Examples: employer (expense reimbursement), regulator (complaint), credit card company (chargeback), lawyer (evidence).

The third party doesn't go to the first party directly - they receive the document **from the second party** and use the hash to verify it's authentic without needing to contact the first party.

This is the core value: **portable proof** that the second party can hand to anyone, and anyone can verify independently.

---

## Witnessing Architecture

A jurisdiction may require the first party to retain a **witnessing firm** for regulatory compliance.

### Witnessing Firm (Jurisdiction-Mandated)

- Receives all hashes from first party, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (amounts, dates, confirmation numbers)
- Does **NOT** receive plaintext (names, personal details)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to second/third parties during disputes, or as expert witness testimony in legal proceedings

This gives:
- **Non-repudiation**: First party can't deny issuing the hash
- **Timestamp proof**: Hash existed at a specific time
- **Privacy**: Witness can't read personal details
- **Regulatory audit**: Jurisdiction can inspect the witness ledger
- **Resilience**: Verification works even if first party's systems go down

### Public Blockchain (Fourth Non-Party)

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing:

- Ultimate immutability guarantee
- Decentralized trust anchor
- Cross-jurisdictional verification
- Long-term archival independent of any single firm

The public blockchain is a "non-party" - it's infrastructure, not a participant in the transaction.

---

## Architecture Diagram

```
┌─────────────┐    hash + structured data    ┌──────────────────┐
│ First Party │ ───────────────────────────► │  Witnessing Firm │
│  (Issuer)   │                              │                  │
└──────┬──────┘                              └────────┬─────────┘
       │                                              │
       │ full document                                │ periodic rollups
       │                                              ▼
       │                                     ┌──────────────────┐
       │                                     │ Public Blockchain│
       │                                     │   (non-party)    │
       │                                     └────────┬─────────┘
       │                                              │
       │                                              │ hash verification
       ▼                                              │ (any path)
┌──────────────┐                                      │
│ Second Party │ ◄────────────────────────────────────┘
│ (Recipient)  │
└──────┬───────┘
       │
       │ hands document (if needed)
       ▼
┌──────────────┐
│ Third Party  │
│  (verifier)  │
└──────────────┘
```

## Verification Paths

The second party (or any third party) can verify a document hash against:

1. **First party's domain** - Direct check against issuer's published hash
2. **Witnessing firm** - Independent confirmation of hash existence and timestamp
3. **Public blockchain** - Ultimate trust anchor via rollup inclusion proof

Multiple paths provide redundancy and varying levels of trust assurance.
