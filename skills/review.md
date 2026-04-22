---
name: wcagit-review
description: Static analysis of UI code.
metadata:
  author: mahdyarief
  version: "0.1.0"
---
# wcagit-review

Use this skill to review source code for accessibility issues without running a browser.

## Workflow

1. **Search for Antipatterns:**
   - Use `Grep` to find common accessibility and UI issues:
     - `role="button"` without `tabindex` or keyboard handlers.
     - `<img>` tags without `alt`, `width`, or `height` attributes.
     - `autofocus` attribute usage (especially on mobile).
     - `outline-none` without `focus-visible` replacements.
     - `transition: all` (should be specific properties).
     - `onPaste` with `preventDefault`.

2. **Structural Review:**
   - Use `Read` to examine the heading hierarchy (`h1` through `h6`).
   - Check if form labels are correctly associated with inputs (`htmlFor`).
   - Refer to `reference/wcag-guidelines.md` for WCAG criteria mappings (including AAA criteria like Target Size and Reading Level).
   - Refer to `reference/web-interface-guidelines.md` for UI/UX best practices and **AAA Excellence points** (Typography, Cognitive Load, and Undo mechanisms).

3. **Provide Feedback:**
   - Report issues in `file:line` format (e.g., `src/Button.tsx:42 - icon button missing aria-label`).
   - State the issue and location concisely. Skip long explanations unless the fix is non-obvious.
