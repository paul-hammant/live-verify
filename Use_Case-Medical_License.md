## Medical License Verification

**Like degrees above**, but with critical difference: **licenses can be REVOKED**.

Medical licenses are printed wallet cards with registration marks. Verification workflow identical to CV/degree verification:
1. Hospital HR scans doctor's license card with phone
2. App OCRs: Name, license number, specialization, state board
3. Computes hash, verifies: `GET https://medical-board.state.gov/licenses/{hash}`
4. Response: `200 OK` with status and base64-encoded photo

**Key advantage over QR codes:** Can't fake "Dr. Jane Smith, License #12345" text and have it verify against wrong person's endpoint. Text itself determines whose license gets verified (domain binding).

### Government ID Verification Response Format

For identity documents (medical licenses, driver's licenses, passports), the verification response should include the holder's photo as base64-encoded data **embedded in the response body**, NOT as a separate photo URL.

**Why base64 encoding (not photo URLs):**
- Photo URLs create an enumeration vector (someone could try sequential IDs)
- Only someone with the physical document can compute the hash
- Maintains privacy-preserving property of the system
- No separate endpoint to scrape or attack

**Response format:**

```json
{
  "status": "OK",
  "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
  "issue_date": "2022-03-15",
  "expiry_date": "2027-03-15"
}
```

**Status codes:**
- **OK** - License/ID is valid and in good standing (includes photo unless holder opted out)
- **SUSPENDED** - License temporarily suspended (includes photo unless holder opted out)
- **REVOKED** - License permanently revoked (includes photo unless holder opted out)
- **STOLEN** - Document reported stolen (**photo removed**, includes mailing instructions)
- **EXPIRED** - Document past expiration date (includes photo unless holder opted out)
- **REPLACED** - Superseded by newer document (includes photo of new document, not old one)

**Example use cases:**
- **Medical licenses:** Hospital HR verifies doctor's credentials before hiring
- **Driver's licenses:** Police officer verifies during traffic stop, hotel clerk verifies at check-in, bartender verifies age
- **Passports:** Hotel clerk verifies guest identity, customs officer verifies at border

The photo returned in the response allows the verifier to match the document holder to the photograph on file, preventing someone from using a stolen or cloned document with someone else's credentials.

**Pricing (State Medical Boards):**
- Hospitals/staffing agencies: $500-$1,000/month (high-volume verifiers)
- Background check companies: Annual enterprise license
- Patients verifying their doctor: Free tier (1-10 verifications/year)
- Infrastructure cost: ~$0.000005 per verification (negligible)
- Revenue justification: Legal liability protection worth far more than $0.50/verification

Already covered in "Strong Use Cases" section below - this is just pricing elaboration.
