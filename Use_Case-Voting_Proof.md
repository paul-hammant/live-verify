## Voting Ballot Proof: Verifiable Vote Counting

Election integrity depends on voters being able to confirm their vote was counted. OCR-to-hash enables individual vote verification through independent auditors without compromising ballot secrecy.

Key criteria: Democratic process requiring voter confidence. One-off transaction per election. Needs verification by voter and independent auditors. Privacy-preserving (no public registry of who voted what). Tamper-evident audit trail.

### The Ballot Proof Chit: Where OCR-to-Hash Enables Trust

**What's printed on the proof chit (given to voter after casting ballot):**

```
┌─────────────────────────────────┐
│                                 │
│  2028 Presidential Election     │
│  Polling Station: PS-CA-SF-042  │
│  Date: November 5, 2028         │
│  Time: 14:32:17 PST             │
│                                 │
│  Ballot ID: B7F3E2A19C4D        │
│  Transaction: TX-94881-2028     │
│                                 │
│  Vote cast for: Newsome/AOC     │
│                                 │
│  Your vote has been recorded    │
│                                 │
│  verify:election-50.ey.com      │
│                                 │
└─────────────────────────────────┘
```

**Critical details:**
- As for all, the hash is NOT printed on the chit. Only the base URL appears.
- Ballot contents ARE included (voter's choices printed on their proof chit)
- Transaction ID and timestamp make the hash unique
- Voter can verify their specific ballot was counted exactly as cast
- Independent auditor (Ernst & Young in this example) hosts verification endpoint
- Voter keeps chit private (like a receipt) to maintain ballot secrecy

**Voter verification workflow:**

1. Voter casts ballot electronically or paper ballot is scanned
2. System prints proof chit with ballot ID, transaction details, AND voter's choices
4. **Later (hours/days after polls close)**, voter scans chit with phone app
5. App OCRs text: Election name, polling station, date, time, ballot ID, transaction ID, vote choices
6. App normalizes text, computes hash (SHA-256)
7. App builds URL: `https://election-50.ey.com/{computed_hash}`
8. Independent auditor (E&Y) responds with verification status "✓ YOUR VOTE WAS COUNTED"
9. Voter sees that in Verific app.

→ Voter sees red "404 not found - please flatten your vote chit and scan again"

1. Voter tries again and again.
2. At some point, they might have to get the state election board involved.

**Why this solves some election integrity concerns:**

- **Voter confidence:** Each voter can verify their vote was counted
- **Independent auditor:** Verification hosted by third-party firm (E&Y, Deloitte, PwC), not government
- **Ballot secrecy preserved:** Chit proves vote was counted
- **Public auditability:** Statistical reconciliation possible (total verified votes = total counted votes)
- **No blockchain needed:** Simple hash verification sufficient for individual voter confirmation

The software that does the tallying that isn't the auditors might still need to be verified as good. Perhaps
that's E&Y again.

#### Verific beats QR codes for voting proof

Voter can't read "2028 Presidential Election, November 5" by looking at QR code, and if there's text
beside the QR code purporting to be the same as what's linked-to by the QR code, the voter would have
to go to the link, check the authenticity of the domain (Ey.com: it was not apparent before then) and
then all the details matching on the printed chit vs what is on the screen.

OCR-to-hash keeps the ballot proof human-readable, but secondarily verifiable
- Increases voter trust through transparency

#### Other Benefits

**Voters:**
- Confirm their vote was counted in the official tally
- Peace of mind that their democratic participation mattered
- Can report discrepancies if verification fails
- Ballot secrecy preserved (chit doesn't reveal voting choices)

**Election Officials:**
- Increased public confidence in election integrity
- Reduced unfounded fraud claims (voters can verify themselves)
- Tamper-evident audit trail
- Automatic statistical reconciliation (verified ballots = counted ballots)

**Independent Auditors (E&Y, Deloitte, PwC, etc.):**
- Provide trusted third-party verification separate from government
- Maintain voter confidence through brand reputation
- Can cross-check totals against official results
- Flag discrepancies for investigation

**Political Campaigns:**
- Higher voter confidence → higher turnout
- Reduced post-election disputes
- Transparent process reduces legitimacy challenges
- Can encourage supporters to verify their votes were counted

**Democracy:**
- Strengthens electoral integrity through verifiable voting
- Reduces effectiveness of fraud (voters will notice missing ballots)
- Increases trust in democratic institutions
- Tamper-evident without blockchain complexity

### Deployment Considerations

**Infrastructure:**
- Independent auditor (E&Y, Deloitte, PwC) hosts verification endpoints
- Store hash → (ballot_id + timestamp + status) mapping
- Free for voters to verify their own ballot (unlimited checks)
- Government contracts with auditor for election verification services

**Ballot secrecy protection:**
- Chit includes: election name, polling station, date/time, ballot ID, transaction ID, AND voter's choices
- Hash computed from all chit content (including vote cast)
- Voter can verify their exact ballot was counted correctly
- Ballot secrecy maintained by voter keeping chit private (like a receipt)
- No public database of who voted for whom (only voter + auditor can verify individual ballot)

**Timeline:**
- Chits printed immediately after ballot cast
- Verification available after polls close (prevents real-time vote buying)
- Auditor updates status: PROCESSING → COUNTED (within hours of polls closing)
- Verification remains available for 7-10 years (election record retention)

**Security:**
- Transaction IDs include timestamp + random nonce (prevents duplicate chits)
- Polling station ID prevents ballot-box stuffing from other locations
- Auditor endpoint rate-limited to prevent scraping
- Statistical reconciliation: sum of verified ballots = official tally

**Transparency:**
- Auditor publishes aggregate statistics (total ballots verified per polling station)
- Does NOT publish individual ballot hashes (prevents enumeration)
- Government publishes official tally + number of chits issued per station
- Discrepancies flagged for investigation

**Why independent auditor (not government) hosts verification:**
- Separates ballot counting (government) from verification (third party)
- Reduces trust requirements (voters don't need to trust single entity)
- Brand reputation incentivizes accuracy (E&Y wouldn't risk credibility)
- Enables multiple auditors (different auditors for different jurisdictions)
