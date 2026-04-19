#!/usr/bin/env node
/**
 * batch-generate.js — Generate previews in batch from CSV
 * 
 * Usage:
 *   node scripts/batch-generate.js --input data/leads.csv --dry-run
 *   node scripts/batch-generate.js --input data/leads.csv
 *
 * Environment:
 *   PREVIEW_API_URL — Base URL of the preview API (default: http://localhost:4321/api/preview)
 * 
 * Input CSV columns:
 *   name, address, phone, category, lang, email
 *
 * Output:
 *   data/leads_with_preview.csv — input + preview_url column added
 */

import { createRequire } from 'module';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const PREVIEW_API_URL = process.env.PREVIEW_API_URL || 'http://localhost:4321/api/preview';

// ---- CLI args ----
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const inputArg = args.find(a => a === '--input' || a === '-i');
const inputIdx = args.indexOf(inputArg);
const inputPath = inputArg && inputIdx !== -1 ? resolve(args[inputIdx + 1]) : null;

if (!inputPath) {
  console.error('Usage: node scripts/batch-generate.js --input <csv> [--dry-run]');
  process.exit(1);
}

if (!existsSync(inputPath)) {
  console.error(`File not found: ${inputPath}`);
  process.exit(1);
}

// ---- CSV parser ----
function parseCSV(path) {
  const content = readFileSync(path, 'utf-8');
  const lines = content.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  return lines.slice(1).map(line => {
    // Simple CSV split — handles quoted fields
    const vals = [];
    let inQuote = false;
    let current = '';
    for (const ch of line) {
      if (ch === '"') {
        inQuote = !inQuote;
      } else if (ch === ',' && !inQuote) {
        vals.push(current.trim().replace(/^"|"$/g, ''));
        current = '';
      } else {
        current += ch;
      }
    }
    vals.push(current.trim().replace(/^"|"$/g, ''));
    
    const obj = {};
    headers.forEach((h, i) => { obj[h] = vals[i] || ''; });
    return obj;
  });
}

function buildLeadPayload(lead) {
  // Derive business name cleanly
  const name = lead.name || lead.business_name || 'My Business';
  const slug = (name || '').toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  
  // Map language to template
  const lang = lead.lang || 'en';
  const category = lead.category || 'other';
  
  // Build address string
  const address = lead.address || '';
  
  return {
    name,
    tagline: `${name} — ${category}`,
    address,
    phone: lead.phone || '',
    category,
    lang,
    // email is NOT included in public payload for privacy
  };
}

async function generatePreview(lead) {
  const payload = buildLeadPayload(lead);
  
  const response = await fetch(PREVIEW_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`API ${response.status}: ${await response.text()}`);
  }

  const data = await response.json();
  
  // The API returns { previewUrl, template, generatedAt }
  return {
    previewUrl: data.previewUrl || data.url || '',
    template: data.template || 'unknown',
    generatedAt: data.generatedAt || new Date().toISOString(),
  };
}

async function main() {
  console.log(`\n🖼️  Batch Preview Generator`);
  console.log(`   Input: ${inputPath}`);
  console.log(`   API:   ${PREVIEW_API_URL}`);
  console.log(`   Dry run: ${dryRun ? 'YES (API calls skipped)' : 'NO'}`);
  console.log('');

  const leads = parseCSV(inputPath);
  console.log(`   Loaded ${leads.length} leads from CSV\n`);

  const langCounts = { de: 0, es: 0, pl: 0, en: 0, other: 0 };
  leads.forEach(l => {
    const lang = l.lang || 'other';
    langCounts[lang] = (langCounts[lang] || 0) + 1;
  });
  console.log('   Languages:', Object.entries(langCounts).map(([k, v]) => `${k}=${v}`).join(', '));
  console.log('');

  if (dryRun) {
    console.log('🔍 DRY RUN — Would generate previews for:\n');
    leads.slice(0, 5).forEach((lead, i) => {
      const payload = buildLeadPayload(lead);
      console.log(`   [${i + 1}] ${lead.name || 'unnamed'} (${lead.lang || 'en'}) — ${lead.category || 'other'}`);
      console.log(`       Tagline: ${payload.tagline}`);
      console.log(`       Phone: ${lead.phone || 'n/a'} | Address: ${lead.address || 'n/a'}`);
    });
    if (leads.length > 5) console.log(`   ... and ${leads.length - 5} more`);
    console.log(`\n   Total: ${leads.length} previews`);
    console.log(`   Estimated time: ~${Math.ceil(leads.length)} seconds at 1 req/sec`);
    console.log('\n✅ Dry run complete. Remove --dry-run to generate for real.\n');
    return;
  }

  // Real mode
  const results = [];
  const errors = [];

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    process.stdout.write(`   [${i + 1}/${leads.length}] ${lead.name || 'unnamed'}... `);

    try {
      // Rate limit: 1 req/sec
      if (i > 0) {
        await new Promise(r => setTimeout(r, 1000));
      }

      const result = await generatePreview(lead);
      console.log(`✅ ${result.previewUrl} (${result.template})`);
      
      results.push({
        ...lead,
        preview_url: result.previewUrl,
        preview_template: result.template,
        generated_at: result.generatedAt,
      });
    } catch (err) {
      console.log(`❌ ${err.message}`);
      errors.push({ lead, error: err.message });
      results.push({
        ...lead,
        preview_url: 'ERROR',
        preview_template: 'ERROR',
        generated_at: new Date().toISOString(),
        error: err.message,
      });
    }
  }

  // Write output CSV
  const outputPath = resolve(__dirname, '../data/leads_with_preview.csv');
  const headers = ['name', 'address', 'phone', 'category', 'lang', 'email', 'preview_url', 'preview_template', 'generated_at', 'error'];
  const lines = [headers.join(',')];
  
  results.forEach(r => {
    const row = headers.map(h => {
      const val = r[h] || '';
      // Escape quotes and wrap in quotes if contains comma or quote
      if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return `"${val}"`;
    });
    lines.push(row.join(','));
  });

  writeFileSync(outputPath, lines.join('\n'));

  console.log(`\n📊 Results: ${leads.length} processed`);
  console.log(`   Success: ${results.filter(r => r.preview_url && r.preview_url !== 'ERROR').length}`);
  console.log(`   Errors: ${errors.length}`);
  console.log(`   Output: ${outputPath}\n`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});