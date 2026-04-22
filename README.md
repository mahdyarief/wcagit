# wcagit - Comprehensive Web Accessibility Evaluation Suite

`wcagit` is a native O‍pencode skill plugin and CLI tool designed to provide comprehensive Web Accessibility testing, auditing, and remediation recommendations.

## Features

- **Automated Scanning**: Powered by `axe-core` and `puppeteer`.
- **WCAG-EM Reporting**: Generates structured Markdown reports following the W3C Evaluation Methodology.
- **Specialized Skills**: Integrated O‍pencode skills for Auditing, Testing, Reviewing, and Recommending accessibility fixes.
- **Static Analysis**: Guided workflows for manual and static code reviews.

## Installation

```bash
npm install
npm run build
```

## CLI Usage

### Analyze a URL
```bash
wcagit --url https://example.com --audit --output docs/accessibility/report.md
```

### Analyze HTML
```bash
wcagit --html "<h1>Hello</h1>"
```

### List Rules
```bash
wcagit --rules --tags wcag2aa
```

## O‍pencode Skills

- `wcagit-audit`: Perform full site audits with WCAG-EM reporting.
- `wcagit-test`: Rapidly test snippets or live components.
- `wcagit-review`: Static analysis of source code for accessibility antipatterns.
- `wcagit-recommend`: Get remediation suggestions mapped to W3C techniques.

## License
MIT
