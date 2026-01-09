# Normalization Hash Test Fixtures

Cross-platform test cases ensuring all implementations produce identical hashes.

## File Format

**Filename:** `{expected-sha256-hash}.md`

**Contents:**
```markdown
---
description: Brief description of what this tests
charNormalization: "éè→e" (optional)
ocrNormalizationRules: (optional)
  - pattern: "CHF\\s+(\\d)"
    replacement: "CHF$1"
---
The actual text to normalize goes here.
```

## How Tests Work

1. Read all `.md` files (skip README.md)
2. Parse optional YAML frontmatter as metadata
3. Extract body text (after frontmatter)
4. Call `normalizeText(body, metadata)`
5. Compute SHA-256 hash
6. Assert hash equals filename (minus `.md`)

## Adding New Test Cases

1. Create input text
2. Run through JS normalizer: `node -e "const {normalizeText,sha256}=require('./public/normalize.js'); console.log(sha256(normalizeText('your text')))"`
3. Save as `{hash}.md`

## Platforms

- JS web app: `__tests__/cross-platform-hashes.test.js`
- Android: `TextNormalizerTest.kt`
- iOS: Uses JSBridge (runs JS directly)
- Browser extension: Shares web app tests
