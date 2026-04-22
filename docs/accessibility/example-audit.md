# Accessibility Audit Report

**URL:** https://example.com/
**Timestamp:** 2026-04-22T10:02:47.452Z
**Passes:** 13
**Violations:** 2
**Incomplete:** 0
**Inapplicable:** 75

## Violations

### landmark-one-main (moderate)
**Description:** Ensure the document has a main landmark
**Help:** [Document should have one main landmark](https://dequeuniversity.com/rules/axe/4.10/landmark-one-main?application=axe-puppeteer)

#### Affected Nodes
- `<html lang="en">`
  - Target: `html`
  - Summary: Fix all of the following:
  Document does not have a main landmark

### region (moderate)
**Description:** Ensure all page content is contained by landmarks
**Help:** [All page content should be contained by landmarks](https://dequeuniversity.com/rules/axe/4.10/region?application=axe-puppeteer)

#### Affected Nodes
- `<div><h1>Example Domain</h1><p>This domain is for use in documentation examples without needing permission. Avoid use in operations.</p><p><a href="https://iana.org/domains/example">Learn more</a></p></div>`
  - Target: `div`
  - Summary: Fix any of the following:
  Some page content is not contained by landmarks

## Manual Review Required

Automated tools can only catch ~30-50% of accessibility issues. Please perform the following manual checks:

- [ ] **Keyboard Navigation:** Can you navigate the entire page using only the Tab key?
- [ ] **Focus Indicator:** Is there a clear visual indicator of which element has focus?
- [ ] **Skip to Content:** Is there a "Skip to Content" link available and functional?
- [ ] **Screen Reader:** Does the page make sense when read by a screen reader? Are headings correctly used?
- [ ] **Color Contrast:** Have you verified color contrast for text over images or gradients?
