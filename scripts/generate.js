#!/usr/bin/env node
/**
 * Peek Preview CLI
 * Usage:
 *   node scripts/generate.js --input data.json
 *   node scripts/generate.js --input '{"name":"Nova Cafe","tagline":"Best coffee in Zagreb","template":"launch-teaser"}'
 */

import { generatePreview } from '../packages/generator/src/index.js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const args = process.argv.slice(2);
const inputArg = args.find((a) => a === '--input' || a === '-i');
const outputArg = args.find((a) => a === '--output' || a === '-o');
const inputIdx = args.indexOf(inputArg);
const outputIdx = args.indexOf(outputArg);

let input;
if (inputArg && inputIdx !== -1) {
  const val = args[inputIdx + 1];
  try {
    input = JSON.parse(readFileSync(resolve(val), 'utf-8'));
  } catch {
    input = JSON.parse(val);
  }
} else {
  console.error('Usage: node scripts/generate.js --input <json-or-file> [--output <file>]');
  process.exit(1);
}

const result = generatePreview(input);

if (!result.ok) {
  console.error('Generation failed:', result.error);
  process.exit(1);
}

if (outputArg && outputIdx !== -1) {
  const { writeFileSync } = await import('fs');
  const outPath = resolve(args[outputIdx + 1]);
  writeFileSync(outPath, result.html);
  console.log(`✅ Written: ${outPath}`);
  console.log(`   Template: ${result.template}`);
  console.log(`   Generated: ${result.meta.generatedAt}`);
} else {
  console.log(result.html);
}
