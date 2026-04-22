---
name: wcagit-recommend
description: Fix suggestions and remediation.
metadata:
  author: mahdyarief
  version: "0.1.0"
---
# wcagit-recommend

Use this skill to suggest and apply fixes for accessibility violations.

## Workflow

1. **Map Violations:**
   - For each violation found in `wcagit-audit` or `wcagit-review`, map it to a W3C Success Criterion.
   - Use `docs/reference/wcag-guidelines.md` as the primary reference for mapping.

2. **Develop Fixes:**
   - Propose code changes that resolve the violation while maintaining functionality.
   - Refer to [W3C Techniques](https://www.w3.org/WAI/WCAG21/Techniques/) for guidance.

3. **Apply Fixes:**
   - Use the `Edit` or `Write` tools to apply the fixes to the source code.

4. **Verify:**
   - Re-run `wcagit-test` or `wcagit-audit` to ensure the fix resolved the issue and didn't introduce new ones.
