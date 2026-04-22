export function formatToMarkdown(results) {
    let md = `# Accessibility Audit Report\n\n`;
    md += `**URL:** ${results.url}\n`;
    md += `**Timestamp:** ${results.timestamp}\n`;
    md += `**Passes:** ${results.passesCount}\n`;
    md += `**Violations:** ${results.violations.length}\n`;
    md += `**Incomplete:** ${results.incompleteCount}\n`;
    md += `**Inapplicable:** ${results.inapplicableCount}\n\n`;
    if (results.violations.length > 0) {
        md += `## Violations\n\n`;
        results.violations.forEach((violation) => {
            md += `### ${violation.id} (${violation.impact})\n`;
            md += `**Description:** ${violation.description}\n`;
            md += `**Help:** [${violation.help}](${violation.helpUrl})\n\n`;
            md += `#### Affected Nodes\n`;
            violation.affectedNodes.forEach((node) => {
                md += `- \`${node.html}\`\n`;
                md += `  - Target: \`${node.target.join(', ')}\`\n`;
                md += `  - Summary: ${node.failureSummary}\n`;
            });
            md += `\n`;
        });
    }
    else {
        md += `## No automated violations found! 🎉\n\n`;
    }
    if (results.incomplete && results.incomplete.length > 0) {
        md += `## Incomplete Tests (Manual Verification Required)\n\n`;
        md += `Axe could not automatically determine if these rules pass or fail. Please review them manually:\n\n`;
        results.incomplete.forEach((inc) => {
            md += `### ${inc.id}\n`;
            md += `**Description:** ${inc.description}\n`;
            md += `**Help:** [${inc.help}](${inc.helpUrl})\n\n`;
            md += `#### Nodes to Review\n`;
            inc.affectedNodes.forEach((node) => {
                md += `- \`${node.html}\`\n`;
                md += `  - Summary: ${node.failureSummary}\n`;
            });
            md += `\n`;
        });
    }
    if (results.aaaInsights) {
        md += `## AAA Excellence Insights\n\n`;
        if (results.aaaInsights.targetSizeViolations.length > 0) {
            md += `### 2.5.5 Target Size (Level AAA)\n`;
            md += `The following interactive elements are smaller than the recommended 44x44px:\n`;
            results.aaaInsights.targetSizeViolations.forEach((v) => {
                md += `- \`${v.html}\` (Current size: ${v.size})\n`;
            });
            md += `\n`;
        }
        if (results.aaaInsights.readingLevel) {
            md += `### 3.1.5 Reading Level (Level AAA)\n`;
            md += `- **Word Count:** ${results.aaaInsights.readingLevel.wordCount}\n`;
            md += `- **Avg Sentence Length:** ${results.aaaInsights.readingLevel.complexityScore} words\n`;
            if (results.aaaInsights.readingLevel.complexityScore > 20) {
                md += `> ⚠️ **Caution:** Long sentences detected. Consider simplifying for better cognitive accessibility.\n`;
            }
            md += `\n`;
        }
        md += `### 2.3.3 Animation from Interactions (Level AAA)\n`;
        if (results.aaaInsights.hasMotionQuery) {
            md += `✅ Detected \`prefers-reduced-motion\` media query in CSS.\n\n`;
        }
        else {
            md += `❌ No \`prefers-reduced-motion\` detected. Consider adding it to disable non-essential animations.\n\n`;
        }
    }
    md += `## Manual Review Checklist\n\n`;
    md += `Automated tools can only catch ~30-50% of accessibility issues. Please perform the following manual checks:\n\n`;
    md += `- [ ] **Keyboard Navigation:** Can you navigate the entire page using only the Tab key?\n`;
    md += `- [ ] **Focus Indicator:** Is there a clear visual indicator of which element has focus?\n`;
    md += `- [ ] **Skip to Content:** Is there a "Skip to Content" link available and functional?\n`;
    md += `- [ ] **Screen Reader:** Does the page make sense when read by a screen reader? Are headings correctly used?\n`;
    md += `- [ ] **Color Contrast:** Have you verified color contrast for text over images or gradients?\n`;
    // Dynamic checks based on page content
    const hasImages = results.violations.some((v) => v.id.includes('image') || v.id.includes('alt')) ||
        results.incomplete.some((v) => v.id.includes('image') || v.id.includes('alt'));
    if (hasImages) {
        md += `- [ ] **Image Alt Text:** Review images to ensure alt text is meaningful and not redundant.\n`;
    }
    const hasVideo = results.url.includes('video') || results.incomplete.some((v) => v.id.includes('video'));
    if (hasVideo) {
        md += `- [ ] **Video/Audio:** Ensure captions and transcripts are available for all media content.\n`;
    }
    return md;
}
