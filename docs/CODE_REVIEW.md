# CODE_REVIEW.md

## 8. Maintainability and code-quality improvements

### No automated tests or CI configuration

- **Affected:** [package.json (line 5)](../package.json#L5), repository root
- **Issue:** There are no unit, integration, browser, accessibility, or CI checks.
- **Why it matters:** Contact validation, static-data relationships, focus behavior, and route generation can regress despite lint/build passing.
- **Recommended change:** Add focused tests for form validation/actions, content relationships, route smoke checks, and keyboard navigation; run lint, typecheck, tests, and build in CI.
- **Expected impact:** Safer future changes.
- **Status:** Recommended; contact-flow tests should be required.

### Logging is console-only and unstructured

- **Affected:** [contact-mailer.ts (line 49)](../src/lib/contact-mailer.ts#L49), [error.tsx (line 8)](../src/app/error.tsx#L8)
- **Issue:** Errors are only written to server or browser consoles. There is no central reporting, request correlation, or alerting.
- **Why it matters:** Production failures may go unnoticed.
- **Recommended change:** Add structured server logging and an error-monitoring service; avoid logging unnecessary personal data.
- **Expected impact:** Faster detection and diagnosis.
- **Status:** Recommended before launch.
