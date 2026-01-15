# Verification Response Format

This document defines the standard response format for Live Verify endpoints.

## Core Principle: Never Echo Claim Content

**Verification endpoints NEVER echo back the document's content.**

The verifier already has the document—they just scanned or selected it. They can see the name, license number, employer, amounts, dates, etc. The endpoint's job is to confirm authenticity, not repeat what's already visible.

| Wrong | Right |
|-------|-------|
| Return `"subject_name": "Jennifer Hughes"` | Verifier already sees the name on the document |
| Return `"license_number": "SOL-2019-44821"` | Verifier already sees the license number |
| Return `"amount": "USD 1,250,000"` | Verifier already sees the amount |

**What endpoints SHOULD return:**
- **Status** — Is this document authentic and current? (`OK`, `REVOKED`, `EXPIRED`)
- **Actionable context** — Information the verifier needs but doesn't have (see below)

## The Simple Case: Plain Text OK

For the simplest verification scenarios, an endpoint may return:

```
HTTP/1.1 200 OK
Content-Type: text/plain

OK
```

This is sufficient when:
- The verifier only needs to know "is this authentic?"
- No additional context improves the verification
- The document type doesn't have meaningful status variations

The verifier app checks: `status === 200 && body.includes('OK')` → show green "VERIFIED".

## Standard JSON Response

For verification scenarios that need more than `OK`, endpoints return JSON:

```json
{
  "status": "OK"
}
```

That's it for most cases. The document itself contains all the content; the endpoint just confirms it's authentic.

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | **Required.** The verification result. See [Status Codes](#status-codes). |

### Actionable Context (Not Content Echo)

Some scenarios benefit from **actionable context**—information the verifier needs but doesn't have from the document itself:

| Field | When Appropriate | Why It's Not Echo |
|-------|------------------|-------------------|
| `photo_url` | Identity credentials (badges) | Verifier compares to person in front of them |
| `current_destination` | Delivery workers | Dynamic; confirms driver is at right address |
| `message` | Any failure status | Human-readable explanation of why verification failed |

### Photo URL Security

If returning a `photo_url`, it should:

1. **Use hash-based filenames** — Not `/photos/1332.jpg` (enumerable), but `/photos/a3f2b8c9d4e5...jpg` (requires knowing the hash)
2. **Include no-cache headers** — Prevent browsers/proxies from retaining photos after the credential is revoked
3. **Optionally be time-limited** — URL could include a short-lived token, expiring after the verification session

**Examples:**
```json
{
  "status": "OK",
  "photo_url": "/photos/{hash}}.jpg"
}
```

```json
{
  "status": "OK",
  "photo_url": "/{hash}.jpg"
}
```

Relative paths are preferred—the client already knows the issuer domain from the verification URL. The client resolves `/photos/{hash}.jpg` against the same domain it just queried.

Full URLs are also valid if the photo is hosted elsewhere:
```json
{
  "status": "OK",
  "photo_url": "https://cdn.officers.police.uk/5bae46076bc23bb356231b60075c1304996289797c9351cbde641f8af116bfce.jpg"
}
```

The photo endpoint should return:
```
Cache-Control: no-store, no-cache, must-revalidate
Pragma: no-cache
Expires: 0
```

This prevents:
- **Enumeration attacks** — Can't iterate through `/photos/1.jpg`, `/photos/2.jpg`
- **Stale photo caching** — Revoked credentials don't leave cached photos behind
- **Dynamic photo serving** — if the e-ink ID for the holder has a salt that is changing on some basis, then the photos with the same hash appear/disappear on the same basis (or last only seconds longer)
- **Roster building** — Can't scrape all employee photos by guessing URLs

**Example: Delivery Worker (actionable context)**
```json
{
  "status": "OK",
  "photo_url": "https://associates.dpd.co.uk/photos/2621.jpg",
  "current_destination": "221B Baker St, London NW1 6XE"
}
```

The homeowner at 221B Baker St can:
1. Compare the photo to the person at their door
2. Confirm the destination matches their address

This is actionable—it helps them decide whether to open the door. It's not echoing the badge content.

**Example: Police Officer (minimal response)**
```json
{
  "status": "OK",
  "photo_url": "https://officers.police.uk/photos/7b6aa80ef223f4da8fc00f81b77ff0afa7686f6454836a6bd9489f62e8e3a1fa.jpg"
}
```

The citizen can compare the photo to the officer. They don't need the endpoint to tell them the officer's name or badge number—that's on the warrant card they just scanned.

**Example: Financial Document (status only)**
```json
{
  "status": "OK"
}
```

The bank confirms the proof-of-funds letter is authentic. The verifier already has the letter with the amount, date, and account holder name.

**Example: Success with guidance**
```json
{
  "status": "OK",
  "message": "Licensed MD in Texas — compare photo to confirm identity",
  "photo_url": "/photo/a3f2b8c9d4e5f6a7"
}
```

`status: "OK"` is the machine-readable verdict. The `message` provides human-readable guidance—what the verifier should do next.

**Example: Failure with explanation**
```json
{
  "status": "SUSPENDED",
  "message": "License suspended pending disciplinary hearing"
}
```

For failures, `message` explains *why* verification failed—context the verifier wouldn't otherwise have.

## Status Codes

### Universal Statuses

| Status       | Meaning                                           | Verifier Action                                     |
|--------------|---------------------------------------------------|-----------------------------------------------------|
| `OK`         | Document is authentic and current                 | Show green "VERIFIED"                               |
| `EXPIRED`    | Document was valid but has passed its expiry date | Show amber warning; request fresh document          |
| `REVOKED`    | Document was explicitly invalidated by issuer     | Show red "REVOKED"; do not trust                    |
| `SUPERSEDED` | A newer version of this document exists           | Show amber; request updated document                |
| `404`        | Hash not found                                    | Show red "NOT FOUND"; possible forgery or OCR error |

### Domain-Specific Statuses

Endpoints may return statuses specific to their document type. These should be self-explanatory and actionable:

| Domain                | Example Statuses                                                   |
|-----------------------|--------------------------------------------------------------------|
| **Employment**        | `TERMINATED`, `ON_LEAVE`, `CONTRACTOR_ENDED`                       |
| **Licensing**         | `SUSPENDED`, `DISBARRED`, `UNDER_INVESTIGATION`, `EXPIRED_LICENSE` |
| **Insurance**         | `LAPSED`, `AUDIT_PENDING`, `SEGMENT_LAPSED`                        |
| **Identity/Access**   | `NOT_SCHEDULED`, `INVALID_UNIT`, `OFF_DUTY`, `SUSPENDED`           |
| **Background Checks** | `ALERT`, `REVIEW_REQUIRED`                                         |

### Status Code Design Principles

1. **Self-documenting:** A verifier unfamiliar with the domain should understand the implication
2. **Actionable:** Each status implies a clear next step
3. **Conservative:** When in doubt, return a more cautious status
4. **No false positives:** Never return `OK` unless the document is genuinely valid

## Error Responses

For errors (as opposed to negative verification results), return appropriate HTTP status codes:

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": "MALFORMED_HASH",
  "message": "Hash must be 64 hexadecimal characters"
}
```

```json
HTTP/1.1 429 Too Many Requests
Content-Type: application/json

{
  "error": "RATE_LIMITED",
  "message": "Too many verification requests",
  "retry_after": 60
}
```

```json
HTTP/1.1 503 Service Unavailable
Content-Type: application/json

{
  "error": "ISSUER_UNAVAILABLE",
  "message": "Upstream issuer system is temporarily unavailable"
}
```

| HTTP Status   | Use Case                                           |
|---------------|----------------------------------------------------|
| `200`         | Verification completed (even if result is REVOKED) |
| `400`         | Malformed request (bad hash format)                |
| `404`         | Hash not found in database                         |
| `429`         | Rate limit exceeded                                |
| `500`         | Internal server error                              |
| `503`         | Upstream dependency unavailable                    |

**Note:** A `404` for a hash lookup is a verification result (document not found), not an error.
It should return HTTP 404 with optional JSON body explaining the result. Some 404s will happen after OCR
errors in the camera apps, and people will get used to trying again after repositioning the phone.

## Post-Verification Actions

Some use cases benefit from **post-verification actions**—optional follow-up the verifier can take after confirming authenticity. These are returned as part of the response.

### Pattern 1: Follow-Up Form for Recording

For scenarios with power dynamics or accountability needs, the response can include a URL for the verifier to optionally record the interaction:

```json
{
  "status": "OK",
  "message": "Licensed building inspector — City of Chicago",
  "follow_up_url": "/inspect/report/992288",
  "follow_up_prompt": "Optionally record details of this inspection visit or interaction"
}
```

The app offers to open this URL (embedded WebView or external browser). The issuer's web app handles the actual form—could be a simple single page or a multi-step flow. When complete, the page tells the user they can close the tab and return to the app.

**The "never discouraged" principle:** The badge holder should never tell the verifier "you don't need to do that" or "that's only for complaints." The option to record is always appropriate, even for routine visits. The existence of the option is itself a deterrent.

**Use cases with follow-up forms:**
- **Building inspectors** — Homeowner records visit; bribery deterrent
- **Healthcare workers** — Patient/family records interaction; staffing evidence
- **Hotel staff** — Guest records room entry; harassment deterrent
- **Residential contractors** — Resident records service visit; theft deterrent
- **Home service providers** — Homeowner records work quality

### Pattern 2: Verification ID for Accountability

For high-stakes interactions (especially law enforcement), the response includes a verification ID that creates mutual accountability:

```json
{
  "status": "OK",
  "message": "Active Metropolitan Police officer",
  "verification_id": "VRF-2026-01-12-14:32:07-7k3m9x2p",
  "complaint_url": "/complaints?ref=VRF-2026-01-12-14:32:07-7k3m9x2p"
}
```

**What this enables:**

| Party | Benefit |
|-------|---------|
| **Citizen** | One-click complaint path; timestamp proof; no badge number to remember |
| **Officer** | Exoneration evidence; harassment pattern detection; frivolous complaint filtering |
| **Department** | Correlation analytics; abuse detection; audit trail |

The verification event IS the record—the department already has it. The ID lets the citizen reference it later.

### Pattern 3: Link to Existing Infrastructure

For professions with established public registries, return a link rather than a POST form:

```json
{
  "status": "OK",
  "more_info": "https://lawsociety.org.uk/public/solicitor/SOL-2019-44821"
}
```

**Use cases with link only:**
- **Bar admission** — Link to bar association profile (disciplinary history, complaint channel)
- **Professional licenses** — Link to licensing board's public registry
- **Medical licenses** — Link to state medical board lookup

### When to Use Each Pattern

| Pattern | When Appropriate |
|---------|------------------|
| **POST form** | Power dynamic exists; verifier is alone; accountability matters (inspector at door, staff in hotel room) |
| **Verification ID** | High-stakes interaction; mutual accountability needed (law enforcement, government officials) |
| **Link only** | Robust complaint/information channels already exist (bar associations, licensing boards) |
| **None** | Simple document verification; no ongoing relationship (proof of funds, employment reference) |

## Privacy Tiers in Responses

For identity credentials (badges), endpoints may vary what **actionable context** they return:

| Privacy Level  | Response Contains      | Example Use Case                        |
|----------------|------------------------|-----------------------------------------|
| **Minimal**    | `status` only          | Undercover officers, witness protection |
| **Standard**   | `status` + `photo_url` | Most identity credentials               |

Note: Even "full disclosure" scenarios don't echo document content—the verifier already has that. The question is whether to include a photo URL for visual confirmation.

See [E-Ink ID Cards: Privacy Tiers](../public/use-cases/e-ink-id-cards.md#privacy-tiers-stakes-and-risk) for guidance on when each tier is appropriate.

## Client Response Handling

Verification endpoints may return either plain text or JSON. Client software must handle both formats gracefully—there is no content negotiation.

### Plain Text Responses

```
HTTP/1.1 200 OK
Content-Type: text/plain

OK
```

Client handling:

| Response Body    | Client Interpretation              | Display                                                                |
|------------------|------------------------------------|------------------------------------------------------------------------|
| `""` (empty)     | Verified                           | Translate to local language: "Verified", "Vérifié", "Verificado", etc. |
| `"OK"`           | Verified                           | Translate to local language, as above                                  |
| Any other string | Not verified; string is the reason | Display the string as-is (may be non-English)                          |

**Examples of non-OK plain text:**
- `EXPIRED`
- `REVOKED`
- `Licence suspendue` (French issuer)
- `Documento scaduto` (Italian issuer)
- `Not currently employed`

The client should display these strings verbatim—they are human-readable messages from the issuer explaining why verification failed.

### JSON Responses

```
HTTP/1.1 200 OK
Content-Type: application/json

{ "status": "OK", ... }
```

Client handling:

1. Parse JSON
2. Check `status` field
3. If `status === "OK"` → show localized-to-user "Verified" + any additional fields
4. If `status !== "OK"` → show the status value (and optional `message` field if present)

### Detection Logic

Client pseudocode:

```javascript
const contentType = response.headers.get('Content-Type') || '';
const body = await response.text();

if (contentType.includes('application/json')) {
  // JSON response
  const json = JSON.parse(body);
  if (json.status === "OK") {
    showVerified(json);  // Green + localized "Verified" + actionable context
  } else {
    showFailed(json.status, json.message);  // Red + status string
  }
} else {
  // Plain text response (text/plain or missing Content-Type)
  const trimmed = body.trim();
  if (trimmed === "" || trimmed === "OK") {
    showVerified();  // Green + localized "Verified"
  } else {
    showFailed(trimmed);  // Red + the literal string
  }
}
```

### Why No Content Negotiation

1. **Simpler servers:** Issuers can return whatever format is easiest for them
2. **Graceful degradation:** A minimal issuer returns `OK`; a sophisticated issuer returns rich JSON
3. **Internationalization at the right layer:** Issuers can return failure messages in their local language; clients handle success localization

## CORS and Security

Verification endpoints should enable open CORS:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS
```

### Why Open CORS Is Recommended

**Not all clients need CORS:**

| Client Type              | CORS Needed?                             |
|--------------------------|------------------------------------------|
| Native mobile app        | No                                       |
| Browser extension        | No (uses `host_permissions` in manifest) |
| PWA / web-based verifier | Yes                                      |
| Server-side proxy        | No                                       |

However, enabling open CORS ensures **anyone can build a verification tool**—no gatekeeping on who can verify documents.

**The hash is the access control:**

To query a verification endpoint, you need the SHA-256 hash. To have the hash, you must have:
- The original electronic document, or
- A photograph/scan/print of it

If someone already has the document (or photographed it), returning `OK` or `REVOKED` doesn't leak new information. 
The hash itself is the credential—CORS doesn't expand the attack surface, 
nor can the original document be reverse engineered from the hash.

**Enumeration attacks:**

Could an attacker brute-force hashes via browser? Theoretically, but:
- SHA-256 has 2^256 possible values—random guessing is futile
- Rate limiting (see below) blocks automated enumeration
- The attacker gains nothing without knowing what document a hash represents

### When Issuers Might Restrict CORS

Some issuers may have legitimate reasons to limit which apps can verify:

- **Corporate control:** "Only our official app verifies our documents" - still very hard to get right.
- **Audit requirements:** "We need to know who is verifying"
- **Contractual obligations:** "Verification is part of a paid service"

This is an issuer choice. However, restricting CORS reduces the public good value of verification—a document that can only be verified by one app is less trustworthy than one anyone can verify.

### Recommendation

Enable open CORS unless you have a specific reason not to. The hash already gates access; CORS restrictions add friction without adding security.

## Caching

Responses may include cache headers, but verifiers should generally make fresh requests:

```
Cache-Control: no-cache, must-revalidate
```

For rotating-salt credentials (e-ink badges), responses are inherently non-cacheable as the salt changes frequently.

For static credentials, short caching (e.g., 60 seconds) may be acceptable but risks serving stale revocation status.

## Example: Full Response Lifecycle

**Request:**
```
GET https://lawsociety.org.uk/v/a3f2b8c9d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1
```

**Success Response:**
```
HTTP/1.1 200 OK
Content-Type: text/plain

OK
```

Or with JSON:
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "OK"
}
```

The verifier already has the solicitor's certificate showing name, license number, firm, admission date. The endpoint just confirms it's authentic.

**Failure Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "SUSPENDED",
  "message": "License suspended pending disciplinary hearing"
}
```

The `message` explains *why* verification failed—information the verifier wouldn't otherwise have.

**Not Found Response:**
```json
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "status": "NOT_FOUND",
  "message": "No document matches this hash"
}
```

Of course, 404 responses from a web server/app may have no content/payload at all, and that's valid too.