---
name: wcagit-audit
description: Full site/page audits with WCAG-EM reporting.
metadata:
  author: mahdyarief
  version: "0.1.0"
---
# wcagit-audit

Use this skill to perform a comprehensive accessibility audit of a website or a specific page.

## Workflow

1. **Initialization:**
   - Define the scope of the audit (URL, specific pages, WCAG version/level).
   - Create a directory for the audit reports: `docs/accessibility/`.

2. **Automated Scanning:**
   - Run the automated scan using `wcagit --url <URL> --audit`.
   - Analyze the violations found by Axe.

3. **Manual Verification:**
   - For each page, perform manual checks that automated tools might miss:
     - Keyboard navigation (tab order, focus visible).
     - "Skip to main content" link.
     - Screen reader testing (meaningful link text, correct heading hierarchy).
     - Meaningful alt text for complex images.

4. **Reporting:**
   - Compile all findings into a structured WCAG-EM report.
   - Use the `docs/accessibility/audit-YYYY-MM-DD.md` filename.

## Audit Command

```bash
wcagit --url <URL> --tags wcag2aa
```
