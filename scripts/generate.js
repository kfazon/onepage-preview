#!/usr/bin/env node
/**
 * generate.js — Preview generation CLI
 * 
 * Usage:
 *   node scripts/generate.js --input data.json
 *   node scripts/generate.js --input '{"name":"Nova Cafe","tagline":"Best coffee in Zagreb","lang":"de"}'
 *   node scripts/generate.js --input data.json --output preview.html
 *   node scripts/generate.js --input data.json --dry-run
 *   node scripts/generate.js --input '{"name":"Hair Salon","lang":"es"}' --output out.html
 *
 * Input: JSON file path or inline JSON string with fields:
 *   name, tagline, address, phone, category, lang, template (optional)
 *
 * Output: HTML to stdout or file
 */

import { createRequire } from 'module';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Import generator
import { generatePreview } from '../packages/generator/src/index.js';

// ---- CLI args ----
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');

const inputArg = args.find(a => a === '--input' || a === '-i');
const inputIdx = args.indexOf(inputArg);

const outputArg = args.find(a => a === '--output' || a === '-o');
const outputIdx = args.indexOf(outputArg);

const templateArg = args.find(a => a === '--template' || a === '-t');
const templateIdx = args.indexOf(templateArg);
const overrideTemplate = templateArg && templateIdx !== -1 ? args[templateIdx + 1] : null;

if (!inputArg || inputIdx === -1) {
  console.error('Usage: node scripts/generate.js --input <json-or-file> [--output <file>] [--template <name>] [--dry-run]');
  console.error('');
  console.error('Examples:');
  console.error('  node scripts/generate.js --input \'{"name":"Café Berlin","lang":"de"}\'');
  console.error('  node scripts/generate.js --input data/my-business.json --output preview.html');
  console.error('  node scripts/generate.js --input data/business.json --dry-run');
  process.exit(1);
}

const inputVal = args[inputIdx + 1];
let input;

try {
  if (existsSync(resolve(inputVal))) {
    // It's a file path
    input = JSON.parse(readFileSync(resolve(inputVal), 'utf-8'));
    console.log(`📄 Loaded input from file: ${inputVal}`);
  } else {
    // Try as inline JSON
    input = JSON.parse(inputVal);
  }
} catch (err) {
  console.error(`Failed to parse input: ${err.message}`);
  process.exit(1);
}

// Apply template override if provided
if (overrideTemplate) {
  input.template = overrideTemplate;
}

console.log(`\n🖼️  Peek Preview Generator`);
console.log(`   Name: ${input.name || 'unnamed'}`);
console.log(`   Language: ${input.lang || 'en'}`);
console.log(`   Category: ${input.category || 'other'}`);
if (input.template) console.log(`   Template: ${input.template}`);
console.log(`   Dry run: ${dryRun ? 'YES' : 'NO'}`);
console.log('');

if (dryRun) {
  console.log('🔍 DRY RUN — Would generate preview with:');
  console.log(`   Name: ${input.name || 'unnamed'}`);
  console.log(`   Tagline: ${input.tagline || '(auto-generated)'}`);
  console.log(`   Address: ${input.address || 'n/a'}`);
  console.log(`   Phone: ${input.phone || 'n/a'}`);
  console.log(`   Category: ${input.category || 'other'}`);
  console.log(`   Language: ${input.lang || 'en'}`);
  console.log('\n✅ Dry run complete. Remove --dry-run to generate for real.\n');
  process.exit(0);
}

const result = generatePreview(input);

if (!result.ok) {
  console.error(`❌ Generation failed: ${result.error}`);
  process.exit(1);
}

console.log(`✅ Generated: ${result.template}`);
console.log(`   Lang: ${result.meta?.lang || 'unknown'}`);
console.log(`   At: ${result.meta?.generatedAt || 'unknown'}`);

if (outputArg && outputIdx !== -1) {
  const outPath = resolve(args[outputIdx + 1]);
  writeFileSync(outPath, result.html);
  console.log(`\n📝 Written: ${outPath} (${result.html.length} bytes)`);
} else {
  // Write to stdout
  process.stdout.write(result.html);
}