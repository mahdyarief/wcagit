# Design Spec: wcagit - Comprehensive Web Accessibility Evaluation Suite

**Status:** Draft
**Date:** 2026-04-22
**Author:** mahdyarief

## 1. Overview
`wcagit` is a native O‍pencode skill plugin designed to provide comprehensive Web Accessibility testing, auditing, and remediation recommendations. It moves beyond simple automated scanning by incorporating the W3C WCAG-EM (Evaluation Methodology) into a semi-automated agentic workflow.

The core goal is to enable an AI agent to perform high-quality accessibility audits that catch both automated and manual-only violations.

## 2. Architecture
The plugin follows a modular "Engine + Skills" architecture:

- **Skills Layer:** A set of specialized markdown-based instructions that guide the agent through different stages of accessibility evaluation.
- **Engine Layer:** A Node.js-based CLI tool that wraps `axe-core` and `puppeteer` to perform technical analysis and data gathering.
- **Reporting Layer:** A generator that produces WCAG-EM compliant reports in Markdown format.

## 3. Skill Definitions

### 3.1 `wcagit-audit` (The Evaluation Engine)
- **Primary Tool:** `scripts/wcagit-cli.js --audit <url>`
- **Workflow:**
    1. Define scope (URL, pages, WCAG version).
    2. Run automated scan using Axe-core.
    3. Generate "Manual Review Tasks" based on the page structure (e.g., "Check: Is the 'Skip to Content' link functional?").
    4. Compile results into a structured WCAG-EM report.
- **Output:** `docs/accessibility/audit-YYYY-MM-DD.md`

### 3.2 `wcagit-review` (Static Analysis)
- **Workflow:**
    1. Read source code/UI components.
    2. Check for "Static Failures" (missing alt text, redundant ARIA, hardcoded color contrast issues in CSS).
    3. Provide inline feedback in `file:line` format.

### 3.3 `wcagit-test` (Component Unit Testing)
- **Workflow:**
    1. Test specific HTML fragments or live components.
    2. Verify specific success criteria (e.g., Color Contrast, ARIA validity).

### 3.4 `wcagit-recommend` (Remediation)
- **Workflow:**
    1. Map audit violations to specific W3C Techniques.
    2. Suggest/Apply code fixes using `Edit` or `Write` tools.

## 4. Technical Engine (CLI)
A consolidated CLI tool built in TypeScript:
- **`--url`**: Target URL for full rendering scans.
- **`--html`**: Target HTML string for quick component tests.
- **`--tags`**: Filter by WCAG version/level (wcag2a, wcag2aa, wcag21aa, etc.).
- **`--format`**: Output format (json for agent, md for report).

## 5. Success Criteria
- [ ] Successfully performs automated scan of a URL.
- [ ] Produces a Markdown report following WCAG-EM structure.
- [ ] Correctly identifies static accessibility issues in source code.
- [ ] Provides valid W3C-compliant code fixes.
