# Leo for Deathcare

Leo for Deathcare is an FTC Funeral Rule compliance workspace for independent funeral homes by Linganore Technologies.

**Production app:** [`leo-app/`](leo-app/) — Next.js + Clerk + Neon + Stripe. See [`leo-app/README.md`](leo-app/README.md).

**Legacy prototype:** Open `index.html` in a browser (or `node .claude/static-server.mjs`) for design-partner demos without accounts.

## What It Does

- Audits uploaded or pasted GPL, CPL, and OBCPL text against a founder-draft FTC Funeral Rule v1 rule pack.
- Extracts text from uploaded PDFs in-browser with local PDF.js assets and flags scanned PDFs that have no readable text layer.
- Supports multiple documents per audit and detects GPL, CPL, and OBCPL document types.
- Checks mandatory disclosure presence, itemized pricing categories, casket and outer burial container list signals, effective-date hygiene, provider identity fields, and citation-backed fixes.
- Flags package-pricing math variance against detected component prices.
- Captures evidence snippets for findings and exports reports with citations, evidence references, recommended fixes, and review decisions.
- Adds a finding detail drawer and local human review queue for accept, dismiss, and escalate decisions with reviewer notes.
- Adds an editable corrected GPL draft builder and export.
- Saves local audit history and action logs in browser storage.
- Adds a quick-check mode for a limited audit preview flow.
- Adds a lightweight state checklist profile for federal baseline, Connecticut, New York, Pennsylvania, and New Jersey.
- Compares public website pricing text against the submitted GPL.
- Exports a plain-text pilot compliance report and corrected-template draft.

## MVP Notes

This is a front-end pilot tool, not legal advice and not a substitute for attorney or regulator review. Browser-side PDF parsing requires a selectable text layer; scanned PDFs still need OCR in a production backend.

## Next Build Steps

1. Add real PDF extraction with a server-side parser.
2. Store document versions and audit histories per funeral home.
3. Expand state-specific rule packs with counsel-reviewed text.
4. Add authenticated digital GPL hosting and acknowledgement logs.
5. Build crawler-based website monitoring.
