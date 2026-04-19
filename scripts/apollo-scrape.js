#!/usr/bin/env node
/**
 * apollo-scrape.js — Apollo.io data scraper for lead generation
 * 
 * Usage:
 *   node scripts/apollo-scrape.js --country DE --dry-run
 *   node scripts/apollo-scrape.js --country DE --category restaurants
 *   node scripts/apollo-scrape.js --country DE --limit 2000
 *
 * Environment:
 *   APOLLO_API_KEY — Apollo API key
 * 
 * Output:
 *   data/apollo-{country}-{category}.csv
 *   Columns: business_name, email, phone, address, city, country, domain, website_found
 *
 * Categories searched:
 *   restaurants, cafes, salons, tradesmen (builders, plumbers, electricians)
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---- CLI args ----
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const limitArg = args.find(a => a === '--limit');
const limitIdx = args.indexOf(limitArg);
const limit = limitArg && limitIdx !== -1 ? parseInt(args[limitIdx + 1], 10) : 2000;

const countryArg = args.find(a => a === '--country');
const countryIdx = args.indexOf(countryArg);
const country = countryArg && countryIdx !== -1 ? args[countryIdx + 1].toUpperCase() : 'DE';

const categoryArg = args.find(a => a === '--category');
const categoryIdx = args.indexOf(categoryArg);
const category = categoryArg && categoryIdx !== -1 ? args[categoryIdx + 1] : null;

// ---- Country config ----
const COUNTRY_CONFIG = {
  DE: {
    lang: 'de',
    city: 'Berlin',
    region: 'Berlin',
    categories: ['restaurants', 'cafes', 'salons', 'tradesmen'],
    defaultCategory: 'restaurants',
  },
  ES: {
    lang: 'es',
    city: 'Madrid',
    region: 'Community of Madrid',
    categories: ['restaurants', 'cafes', 'salons', 'tradesmen'],
    defaultCategory: 'restaurants',
  },
  PL: {
    lang: 'pl',
    city: 'Warsaw',
    region: 'Masovian Voivodeship',
    categories: ['restaurants', 'cafes', 'salons', 'tradesmen'],
    defaultCategory: 'restaurants',
  },
};

const config = COUNTRY_CONFIG[country] || COUNTRY_CONFIG.DE;

// ---- Category to Apollo query mapping ----
const CATEGORY_QUERIES = {
  restaurants: {
    q: 'restaurant OR restaurant bar OR bistro',
    subcategories: ['restaurants', 'food', 'dining'],
  },
  cafes: {
    q: 'cafe OR coffee shop OR café OR espresso bar',
    subcategories: ['cafes', 'coffee shops', 'bakeries'],
  },
  salons: {
    q: 'hair salon OR beauty salon OR barber shop OR nail salon',
    subcategories: ['beauty salons', 'hair salons', 'barbers'],
  },
  tradesmen: {
    q: 'plumber OR electrician OR builder OR handyman OR contractor',
    subcategories: ['plumbers', 'electricians', 'construction', 'contractors'],
  },
};

// ---- Apollo API helpers ----
const APOLLO_BASE = 'https://api.apollo.io/v1';

async function apolloRequest(endpoint, body) {
  const API_KEY = process.env.APOLLO_API_KEY;
  if (!API_KEY) throw new Error('APOLLO_API_KEY environment variable is not set');

  const response = await fetch(`${APOLLO_BASE}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Apollo API ${response.status}: ${text}`);
  }

  return await response.json();
}

async function searchPeople(query, page = 1) {
  // Apollo people search endpoint
  return await apolloRequest('/people/search', {
    q: query,
    page,
    per_page: 25,
    // Filter for businesses (no personal email domains)
    // We're looking for company/org contacts, not personal
  });
}

async function enrichContact(email) {
  try {
    return await apolloRequest('/people/enrich', { email });
  } catch {
    return null;
  }
}

// Note: Apollo organization search is more appropriate for B2B business data
async function searchOrganizations(category, countryCode) {
  const query = CATEGORY_QUERIES[category]?.q || category;
  
  return await apolloRequest('/organizations/search', {
    q: query,
    locations: [countryCode],
    per_page: 100,
  });
}

// ---- Build CSV row ----
function orgToRow(org) {
  const website = org.primary_domain || org.domain || '';
  const hasWebsite = website.length > 0 && 
    !website.includes('facebook.com') && 
    !website.includes('instagram.com') &&
    !website.includes('linkedin.com') &&
    !website.includes('.myshopify.com') &&
    !website.includes('squarespace.com') &&
    !website.includes('wix.com') &&
    !website.includes('wordpress.com');

  return {
    business_name: org.name || '',
    email: '',  // Will be enriched separately
    phone: org.phone_numbers?.[0] || '',
    address: org.street_address || '',
    city: org.city || '',
    country: country,
    domain: website,
    website_found: hasWebsite ? 'YES' : 'NO',
  };
}

// ---- Scrape all categories for a country ----
async function scrapeCountry(country, targetCount = 2000) {
  const results = [];
  const categories = category ? [category] : config.categories;

  console.log(`\n🌐 Apollo Scrape — ${country}`);
  console.log(`   Target: ${targetCount} businesses (no website)`);
  console.log(`   Categories: ${categories.join(', ')}`);
  console.log(`   Dry run: ${dryRun ? 'YES' : 'NO'}`);
  console.log('');

  for (const cat of categories) {
    console.log(`\n   📂 Category: ${cat}`);
    
    let page = 1;
    let hasMore = true;
    let catCount = 0;

    while (hasMore && results.length < targetCount * 1.5 && catCount < Math.ceil(targetCount / categories.length) * 2) {
      if (dryRun) {
        console.log(`      Page ${page} — DRY RUN, would fetch 100 orgs`);
        await new Promise(r => setTimeout(r, 200));
        page++;
        catCount += 100;
        continue;
      }

      try {
        const data = await searchOrganizations(cat, country);
        const orgs = data.organizations || [];

        if (orgs.length === 0) {
          hasMore = false;
          break;
        }

        console.log(`      Page ${page}: got ${orgs.length} orgs`);
        
        for (const org of orgs) {
          const row = orgToRow(org);
          // Only collect businesses WITHOUT website
          if (row.website_found === 'NO' && row.business_name) {
            results.push(row);
            catCount++;
          }
        }

        hasMore = data.pagination?.has_more || false;
        page++;

        // Rate limit: be nice to Apollo
        await new Promise(r => setTimeout(r, 500));
      } catch (err) {
        console.log(`      ❌ Page ${page}: ${err.message}`);
        hasMore = false;
      }
    }

    console.log(`      Total ${cat}: ${catCount} leads (${results.filter(r => r.country === country).length} total for country)`);
  }

  return results;
}

// ---- Write CSV ----
function writeCSV(rows, path) {
  const headers = ['business_name', 'email', 'phone', 'address', 'city', 'country', 'domain', 'website_found'];
  const lines = [headers.join(',')];
  
  rows.forEach(r => {
    const line = headers.map(h => {
      const val = r[h] || '';
      if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return `"${val}"`;
    }).join(',');
    lines.push(line);
  });

  writeFileSync(path, lines.join('\n'));
}

async function main() {
  const targetCount = Math.ceil(limit / COUNTRY_CONFIG[country]?.categories?.length || 4) * (category ? 1 : COUNTRY_CONFIG[country]?.categories?.length || 4);
  
  const results = await scrapeCountry(country, limit);

  // Filter: only NO website
  const noWebsite = results.filter(r => r.website_found === 'NO');
  
  // Take only what we need
  const final = noWebsite.slice(0, limit);

  const catSuffix = category ? `-${category}` : '';
  const outputPath = resolve(__dirname, `../data/apollo-${country.toLowerCase()}${catSuffix}.csv`);
  writeCSV(final, outputPath);

  console.log(`\n📊 Apollo Scrape Results for ${country}:`);
  console.log(`   Total collected: ${results.length}`);
  console.log(`   Without website (target): ${noWebsite.length}`);
  console.log(`   Written: ${final.length}`);
  console.log(`   Output: ${outputPath}`);
  
  if (dryRun) {
    console.log('\n🔍 Sample rows (first 3):');
    final.slice(0, 3).forEach(r => {
      console.log(`   - ${r.business_name} | ${r.city} | domain: ${r.domain || 'none'}`);
    });
  }

  console.log('\n✅ Done.\n');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});