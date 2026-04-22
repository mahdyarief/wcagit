#!/usr/bin/env node
import { A11yEngine } from './engine.js';
import fs from 'fs';
import path from 'path';

import { formatToMarkdown } from './reporters/markdown.js';

async function main() {
  const args = process.argv.slice(2);
  const options: Record<string, string | boolean> = {};
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
        options[key] = args[i + 1];
        i++;
      } else {
        options[key] = true;
      }
    }
  }

  const engine = new A11yEngine();

  try {
    if (options.url) {
      const url = options.url as string;
      const tags = options.tags ? (options.tags as string).split(',') : undefined;
      const results = await engine.analyzeUrl(url, { tags });
      
      if (options.audit) {
        const markdown = formatToMarkdown(results);
        if (options.output) {
          const outDir = path.dirname(options.output as string);
          if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, { recursive: true });
          }
          fs.writeFileSync(options.output as string, markdown);
          console.log(`Audit report saved to ${options.output}`);
        } else {
          console.log(markdown);
        }
      } else {
        if (options.output) {
          fs.writeFileSync(options.output as string, JSON.stringify(results, null, 2));
          console.log(`Results saved to ${options.output}`);
        } else {
          console.log(JSON.stringify(results, null, 2));
        }
      }
    } else if (options.html) {
      const htmlFile = options.html as string;
      let htmlContent = htmlFile;
      if (fs.existsSync(htmlFile)) {
         htmlContent = fs.readFileSync(htmlFile, 'utf8');
      }
      const tags = options.tags ? (options.tags as string).split(',') : undefined;
      const results = await engine.analyzeHtml(htmlContent, { tags });
      console.log(JSON.stringify(results, null, 2));
    } else if (options.rules) {
      const tags = options.tags ? (options.tags as string).split(',') : undefined;
      const rules = engine.getRules(tags);
      console.log(JSON.stringify(rules, null, 2));
    } else {
      console.log(`
Usage:
  wcagit --url <url> [--tags <tags>]
  wcagit --html <html-string-or-file> [--tags <tags>]
  wcagit --rules [--tags <tags>]

Options:
  --url     Analyze a URL
  --html    Analyze an HTML string or file
  --rules   List available Axe rules
  --tags    Comma-separated list of tags (e.g., wcag2a,wcag2aa)
  --audit   Generate audit report (Markdown)
  --output  Path to save the output file
      `);
      process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
