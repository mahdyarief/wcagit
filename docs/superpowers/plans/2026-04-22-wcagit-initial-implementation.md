# wcagit Initial Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing MCP server into a comprehensive WCAG evaluation suite named `wcagit`.

**Architecture:** A modular "Engine + Skills" setup where a TypeScript-based CLI handles the technical analysis (Axe-core + Puppeteer) and Markdown-based skills guide the agent's workflow.

**Tech Stack:** TypeScript, Node.js, Puppeteer, Axe-core.

---

### Task 1: Rebranding and Project Cleanup

**Files:**
- Modify: `package.json`
- Create: `SKILL.md` (Main entry point)
- Delete: `src/index.ts` (After refactoring logic into CLI)

- [ ] **Step 1: Update package.json metadata**
```json
{
  "name": "wcagit",
  "version": "0.1.0",
  "description": "Comprehensive WCAG Evaluation Suite for O‍pencode",
  "bin": {
    "wcagit": "dist/cli.js"
  }
}
```

- [ ] **Step 2: Create the root SKILL.md**
```markdown
---
name: wcagit
description: Comprehensive WCAG Accessibility Suite. Use for audits, rapid testing, and remediation recommendations.
metadata:
  author: mahdyarief
  version: "0.1.0"
---
# wcagit
Main entry point for WCAG evaluation. Use specialized sub-skills for specific tasks:
- `wcagit-audit`: Full site/page audits with WCAG-EM reporting.
- `wcagit-test`: Rapid testing of snippets or components.
- `wcagit-review`: Static analysis of UI code.
- `wcagit-recommend`: Fix suggestions and remediation.
```

- [ ] **Step 3: Commit changes**

---

### Task 2: Core CLI Engine

**Files:**
- Create: `src/cli.ts` (The new entry point)
- Create: `src/engine.ts` (Core Axe/Puppeteer logic)

- [ ] **Step 1: Implement the Engine class**
Refactor the logic from `src/index.ts` into a clean `A11yEngine` class that isn't tied to MCP.

- [ ] **Step 2: Implement CLI argument parsing**
Use a simple argument parser to handle `--url`, `--html`, and `--audit`.

- [ ] **Step 3: Test CLI execution**
Run: `npm run build && node dist/cli.js --url https://example.com`
Expected: Axe results in JSON format.

---

### Task 3: `wcagit-audit` Implementation

**Files:**
- Create: `skills/audit.md`
- Create: `src/reporters/markdown.ts`

- [ ] **Step 1: Define the Audit Skill**
Instruct the agent on how to run a full audit and generate a WCAG-EM report.

- [ ] **Step 2: Implement Markdown Reporter**
Create a formatter that converts Axe JSON results into a structured WCAG-EM Markdown report.

- [ ] **Step 3: Verify Audit flow**
Run audit on a test page and verify report generation in `docs/accessibility/`.

---

### Task 4: Specialized Skills (Test, Review, Recommend)

**Files:**
- Create: `skills/test.md`
- Create: `skills/review.md`
- Create: `skills/recommend.md`

- [ ] **Step 1: Define the Test Skill**
Focused on quick checks for HTML strings and contrast.

- [ ] **Step 2: Define the Review Skill**
Instructions for the agent to use `Grep` and `Read` to find accessibility antipatterns in source code without running a browser.

- [ ] **Step 3: Define the Recommend Skill**
Instructions on mapping violations to W3C Techniques and using the `Edit` tool to fix them.

---

### Task 5: Final Packaging and Verification
