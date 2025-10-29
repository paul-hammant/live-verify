## Claimed degrees and certs on CV/Resume

Employment and education verification on a CV/resume are an ideal use case for OCR-to-hash. Here's why:

Key criteria: Personal claim with an expectation of privacy in the public record. Each is one-off. A need to be cheaply verifiable for decades.

**What would be on the CV:**

```
┌─────────────────────────────────┐
│                                 │
│  Edinburgh University           │
│  Bachelor of Computer Science   │
│  First Class Honours            │
│  Awarded: July 2020             │
│  To: Tim Berners-Lee, Junior    │
│  verify:degrees.ed.ac.uk        │
│                                 │
└─────────────────────────────────┘
```

The **hash is NOT printed** on the CV. It's a function of all the other text so it would be impossible to do so. Only the base URL appears.  As it happens the above fits a templater that mal-intending groups could brute-force "Tim Berners-Lee Junior" is replaceable for other names toward a SHA-256 calc and a HTTP-GET on degrees.ed.ac.uk. Someone could quickly write Python to test thousands a second (notwithstanding rate limits).  If these facts were valuable enough a reference number would be inserted too, or maybe random chars that are OCR-able (for something that's way more valuable than "I've a degree").

**Interview workflow:**

1. Interviewer has printed CV in hand
2. Opens phone app, scans the registration-marked section
3. App OCRs text, normalizes it, computes hash from the certification text
4. App builds full URL: `https://degrees.ed.ac.uk/{computed_hash}`
5. Fetches URL taking advantage of the setup of degrees.ed.ac.uk not having or needing accounts/logins to access.
6. The fetch yields a `200` http response, and the entire content could be blank or `OK` to signal verification success.
7. Interviewer sees that on the phone app and pencils "✓ verified" on the CV themselves. Recruitment intermediaries may have done that too

**Why this is privacy-preserving:**

- There is nothing a search engine may hold that would direct you back to the same `OK`
- Only someone who has a printed version of the CV (or a scan/pic of it) can initiate claim verification
- No public registry of who has what degree (just verification on demand)
- GDPR compliant: interviewer has legitimate interest in verification. `ebe51417c7a506ee09763e055590858568b841f238cb6462818709cfbfebbdca` is not PII, or personal or private. Of course, a prospective employer retaining the CV itself has to be GDPR complaint if in the EU/UK.

Note ebe51417c7a506ee09763e055590858568b841f238cb6462818709cfbfebbdca is the SHA-256 of `Edinburgh ... Junior` above.

**This same privacy-preserving pattern equally applies to:**

**Claimed Credentials:**
- Academic degrees (bachelor's, master's, doctorate)
- Professional certifications (AWS, CPA, CFA, etc.)
- Training completions
- Language proficiency certificates (TOEFL, IELTS)

**Claimed Work History:**
- Employment verification letters
- Volunteer work verification

All share the key criteria: personal claims with privacy expectations, one-off documents, need for long-term verifiability (decades), and hash-not-printed verification.
