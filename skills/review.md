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
   - Use `Grep` to find common accessibility issues:
     - `role="button"` without `tabindex` or keyboard handlers.
     - `<img>` tags without `alt` attributes.
     - `autofocus` attribute usage.
     - Hardcoded color values in CSS that might have contrast issues.

2. **Structural Review:**
   - Use `Read` to examine the heading hierarchy (`h1` through `h6`).
   - Check if form labels are correctly associated with inputs.
   - Refer to `reference/wcag-guidelines.md` for specific criteria mappings.

3. **Provide Feedback:**
   - Report issues in `file:line` format with clear explanations.
