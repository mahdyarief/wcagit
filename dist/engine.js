import puppeteer from 'puppeteer';
import AxePuppeteer from '@axe-core/puppeteer';
import axe from 'axe-core';
export class A11yEngine {
    async getBrowser() {
        return await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    }
    async analyzeUrl(url, options = {}) {
        const { tags = ['wcag2aa', 'wcag21aa', 'wcag22aa'], width = 1280, height = 800 } = options;
        const browser = await this.getBrowser();
        try {
            const page = await browser.newPage();
            await page.setViewport({ width, height });
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
            const axeBuilder = new AxePuppeteer(page);
            if (tags && tags.length > 0) {
                axeBuilder.withTags(tags);
            }
            const result = await axeBuilder.analyze();
            // Perform additional AAA checks
            const aaaInsights = await this.performAAAChecks(page);
            return {
                ...this.formatResults(result),
                aaaInsights
            };
        }
        finally {
            await browser.close();
        }
    }
    async performAAAChecks(page) {
        return await page.evaluate(() => {
            const insights = {
                targetSizeViolations: [],
                readingLevel: null
            };
            // 1. Target Size (AAA 2.5.5 - 44x44px)
            const interactives = document.querySelectorAll('button, a, input, [role="button"]');
            interactives.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.width < 44 || rect.height < 44) {
                    insights.targetSizeViolations.push({
                        html: el.outerHTML.substring(0, 100),
                        size: `${Math.round(rect.width)}x${Math.round(rect.height)}`
                    });
                }
            });
            // 2. Simple Reading Complexity (Basic syllable/word count)
            const text = document.body.innerText || '';
            const words = text.split(/\s+/).filter(w => w.length > 0);
            const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
            if (words.length > 0 && sentences.length > 0) {
                // Very rough Flesch-Kincaid approximation
                const avgSentenceLength = words.length / sentences.length;
                insights.readingLevel = {
                    wordCount: words.length,
                    sentenceCount: sentences.length,
                    complexityScore: Math.round(avgSentenceLength) // High score = potentially complex
                };
            }
            // 3. Motion Interaction (AAA 2.3.3)
            const hasMotionQuery = Array.from(document.styleSheets).some(sheet => {
                try {
                    return Array.from(sheet.cssRules).some(rule => rule.cssText.includes('prefers-reduced-motion'));
                }
                catch (e) {
                    return false;
                }
            });
            insights.hasMotionQuery = hasMotionQuery;
            return insights;
        });
    }
    async analyzeHtml(html, options = {}) {
        const { tags, width = 1280, height = 800 } = options;
        const browser = await this.getBrowser();
        try {
            const page = await browser.newPage();
            await page.setViewport({ width, height });
            await page.setContent(html, { waitUntil: 'networkidle0' });
            const axeBuilder = new AxePuppeteer(page);
            if (tags && tags.length > 0) {
                axeBuilder.withTags(tags);
            }
            const result = await axeBuilder.analyze();
            return this.formatResults(result);
        }
        finally {
            await browser.close();
        }
    }
    getRules(tags) {
        return tags && tags.length > 0 ? axe.getRules(tags) : axe.getRules();
    }
    formatResults(result) {
        return {
            violations: result.violations.map((violation) => ({
                id: violation.id,
                impact: violation.impact || 'unknown',
                description: violation.description,
                help: violation.help,
                helpUrl: violation.helpUrl,
                affectedNodes: violation.nodes.map((node) => ({
                    html: node.html,
                    target: node.target,
                    failureSummary: node.failureSummary || ''
                }))
            })),
            incomplete: result.incomplete.map((inc) => ({
                id: inc.id,
                impact: inc.impact || 'unknown',
                description: inc.description,
                help: inc.help,
                helpUrl: inc.helpUrl,
                affectedNodes: inc.nodes.map((node) => ({
                    html: node.html,
                    target: node.target,
                    failureSummary: node.failureSummary || ''
                }))
            })),
            passesCount: result.passes.length,
            incompleteCount: result.incomplete.length,
            inapplicableCount: result.inapplicable.length,
            timestamp: result.timestamp,
            url: result.url,
            testEngine: {
                name: result.testEngine.name,
                version: result.testEngine.version
            },
            testRunner: result.testRunner,
            testEnvironment: result.testEnvironment,
        };
    }
    // Color contrast utilities
    parseColor(color) {
        color = color.trim().toLowerCase();
        if (color.startsWith('#')) {
            if (color.length === 4) {
                return {
                    r: parseInt(color[1] + color[1], 16),
                    g: parseInt(color[2] + color[2], 16),
                    b: parseInt(color[3] + color[3], 16)
                };
            }
            else if (color.length === 7) {
                return {
                    r: parseInt(color.substring(1, 3), 16),
                    g: parseInt(color.substring(3, 5), 16),
                    b: parseInt(color.substring(5, 7), 16)
                };
            }
        }
        const rgbMatch = color.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
        if (rgbMatch) {
            return {
                r: parseInt(rgbMatch[1], 10),
                g: parseInt(rgbMatch[2], 10),
                b: parseInt(rgbMatch[3], 10)
            };
        }
        throw new Error(`Unsupported color format: ${color}`);
    }
    calculateContrastRatio(color1, color2) {
        const luminance = (rgb) => {
            const a = [rgb.r, rgb.g, rgb.b].map(v => {
                v /= 255;
                return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
            });
            return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
        };
        const l1 = luminance(color1);
        const l2 = luminance(color2);
        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        return parseFloat(ratio.toFixed(2));
    }
}
