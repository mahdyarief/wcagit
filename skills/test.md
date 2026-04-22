---
name: wcagit-test
description: Rapid testing of snippets or components.
metadata:
  author: mahdyarief
  version: "0.1.0"
---
# wcagit-test

Use this skill for quick accessibility checks of HTML fragments or specific components.

## Workflow

1. **Test HTML Snippet:**
   - Run `wcagit --html "<div role='button'>Click me</div>"` to test a small piece of code.
   - Analyze the output for ARIA violations or semantic issues.

2. **Contrast Check:**
   - Use the `A11yEngine` utilities (if accessible via tool) or manual calculation to check color contrast.

## Commands

```bash
# Test a string
wcagit --html "<h1>Hello</h1>"

# Test a file
wcagit --html src/components/Button.tsx
```
