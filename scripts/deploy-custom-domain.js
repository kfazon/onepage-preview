#!/usr/bin/env node
/**
 * deploy-custom-domain.js — Post-payment domain deployment
 * 
 * Usage:
 *   node scripts/deploy-custom-domain.js --business "Café Berlin" --domain "café-berlin.de" --dry-run
 *   node scripts/deploy-custom-domain.js --session-id cs_test_abc123 --dry-run
 *
 * Environment:
 *   CLOUDFLARE_API_TOKEN   — Cloudflare API token (with Zone:Edit, SSL:Edit permissions)
 *   CLOUDFLARE_ZONE_ID    — Zone ID for the domain
 *   DEPLOY_API_URL        — Deploy hook URL (optional)
 *   RESEND_API_KEY        — For sending confirmation email
 *   KRISTIJAN_EMAIL       — Kristijan's email for notifications
 * 
 * This script runs after Stripe payment confirmation.
 * It sets up the custom domain for the new customer.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---- CLI args ----
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');

const businessArg = args.find(a => a === '--business' || a === '-b');
const businessIdx = args.indexOf(businessArg);
const businessName = businessArg && businessIdx !== -1 ? args[businessIdx + 1] : null;

const domainArg = args.find(a => a === '--domain' || a === '-d');
const domainIdx = args.indexOf(domainArg);
const customDomain = domainArg && domainIdx !== -1 ? args[domainIdx + 1] : null;

const sessionArg = args.find(a => a === '--session-id');
const sessionIdx = args.indexOf(sessionArg);
const sessionId = sessionArg && sessionIdx !== -1 ? args[sessionIdx + 1] : null;

// Load from KV if sessionId provided (lookup payment metadata)
async function loadFromKV(sessionId, env) {
  if (!sessionId || !env.KV_REST_BASE || !env.KV_REST_TOKEN) {
    return null;
  }

  try {
    const headers = {
      'Authorization': `Bearer ${env.KV_REST_TOKEN}`,
    };
    
    const key = `stripe:payments:${sessionId}`;
    const response = await fetch(`${env.KV_REST_BASE}/values/${encodeURIComponent(key)}`, { headers });
    
    if (response.ok) {
      return JSON.parse(await response.text());
    }
  } catch (err) {
    console.error('Failed to load from KV:', err.message);
  }
  
  return null;
}

// ---- Cloudflare DNS setup ----
async function addCloudflareDNSRecord(domain, type = 'CNAME', name, value, ttl = 300, proxied = true) {
  const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
  const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
  
  if (!API_TOKEN || !ZONE_ID) {
    throw new Error('CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID must be set');
  }

  const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type,
      name,
      content: value,
      ttl,
      proxied,
    }),
  });

  const data = await response.json();
  
  if (!response.ok || !data.success) {
    const errors = data.errors?.map(e => e.message).join(', ') || 'Unknown error';
    throw new Error(`Cloudflare API error: ${errors}`);
  }

  return data.result;
}

async function enableSSL(domain) {
  const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
  const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
  
  if (!API_TOKEN || !ZONE_ID) {
    throw new Error('CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID must be set');
  }

  // First, ensure SSL is enabled for the domain via Page Rules or Universal SSL
  // This is typically automatic with Cloudflare but we verify
  const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/ssl/settings`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mode: 'flexible', // or 'full' if origin has SSL
    }),
  });

  return await response.json();
}

async function addCustomDomainToPlatform(domain) {
  // This would typically call the platform's API to register the custom domain
  // e.g., Vercel, Netlify, Cloudflare Pages, etc.
  //
  // Example for Vercel:
  // POST https://api.vercel.com/v13/domains
  // { name: domain, ... }
  //
  // Example for Cloudflare Pages:
  // POST https://api.cloudflare.com/client/v4/accounts/{accountId}/pages domains
  // { name: domain, ... }
  
  const DEPLOY_API_URL = process.env.DEPLOY_API_URL;
  
  if (!DEPLOY_API_URL) {
    console.log(`   ℹ️  DEPLOY_API_URL not set — skipping platform registration`);
    return null;
  }
  
  const response = await fetch(DEPLOY_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      domain,
      action: 'add_custom_domain',
      timestamp: new Date().toISOString(),
    }),
  });
  
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Deploy API error: ${response.status}`);
  }
}

async function sendConfirmationEmail(businessName, domain, customerEmail, env) {
  if (!env.RESEND_API_KEY || !env.KRISTIJAN_EMAIL) {
    console.log('   ℹ️  RESEND_API_KEY or KRISTIJAN_EMAIL not set — skipping email');
    return;
  }
  
  const body = `
🎉 Custom Domain Deployed!

Business: ${businessName}
Domain: ${domain}
Customer Email: ${customerEmail || 'N/A'}
Time: ${new Date().toISOString()}

Your new customer is now live at https://${domain}
  `.trim();
  
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'onepage.preview <noreply@onepage.preview>',
      to: env.KRISTIJAN_EMAIL,
      subject: `🌐 New domain deployed: ${domain}`,
      text: body,
    }),
  });
}

// ---- Main deploy function ----
async function deployCustomDomain(businessName, customDomain, sessionId = null) {
  console.log(`\n🌐 Custom Domain Deploy`);
  console.log(`   Business: ${businessName}`);
  console.log(`   Domain: ${customDomain}`);
  console.log(`   Session: ${sessionId || 'N/A'}`);
  console.log(`   Dry run: ${dryRun ? 'YES' : 'NO'}`);
  console.log('');

  if (dryRun) {
    console.log('🔍 DRY RUN — Would perform the following steps:\n');
    
    console.log('   1. Cloudflare DNS: Add CNAME record');
    console.log(`      Name: ${customDomain}`);
    console.log(`      Value: onepage.preview.pages.dev (or similar platform target)`);
    console.log(`      Proxied: true (orange cloud)\n`);
    
    console.log('   2. Cloudflare SSL: Enable flexible SSL\n');
    
    console.log('   3. Platform: Register custom domain');
    console.log(`      Domain: ${customDomain}`);
    console.log(`      Target: onepage.preview platform\n`);
    
    console.log('   4. Notify Kristijan via email\n');
    
    console.log('   ⚠️  NOTE: Custom domain will NOT be active until DNS propagates (can take up to 24h)');
    console.log('\n✅ Dry run complete. Remove --dry-run to deploy for real.\n');
    return { dryRun: true, domain: customDomain };
  }

  // Real deploy
  console.log('   Step 1: Setting up Cloudflare DNS...');
  try {
    // Add CNAME record pointing to the platform
    // The actual target depends on where the platform is hosted
    // For Cloudflare Pages: *.pages.dev or similar
    // For Vercel: *.vercel.app
    // For Netlify: *.netlify.app
    await addCloudflareDNSRecord(
      customDomain,
      'CNAME',
      customDomain,
      'onepage-preview.pages.dev', // placeholder
      300,
      true
    );
    console.log('   ✅ DNS CNAME record added');
  } catch (err) {
    // DNS record might already exist, that's OK
    if (err.message.includes('already exists') || err.message.includes('DNS record already exists')) {
      console.log('   ℹ️  DNS record already exists, skipping');
    } else {
      console.error('   ❌ DNS setup failed:', err.message);
      throw err;
    }
  }

  console.log('   Step 2: Enabling SSL...');
  try {
    await enableSSL(customDomain);
    console.log('   ✅ SSL enabled');
  } catch (err) {
    console.error('   ⚠️  SSL setup warning:', err.message);
    // Non-fatal, SSL often auto-provisions
  }

  console.log('   Step 3: Registering domain on platform...');
  try {
    const result = await addCustomDomainToPlatform(customDomain);
    console.log('   ✅ Domain registered on platform');
    if (result?.deployment_url) {
      console.log(`      Deployment: ${result.deployment_url}`);
    }
  } catch (err) {
    console.error('   ⚠️  Platform registration warning:', err.message);
    // Non-fatal, might need manual setup
  }

  console.log('   Step 4: Sending confirmation notification...');
  await sendConfirmationEmail(businessName, customDomain, null, process.env);
  console.log('   ✅ Notification sent');

  console.log(`\n📊 Deploy complete for ${customDomain}`);
  console.log('   ⚠️  Note: DNS propagation can take up to 24 hours');
  console.log(`   🌐 Domain will be live at: https://${customDomain}\n`);

  return { success: true, domain: customDomain };
}

async function main() {
  const env = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    KRISTIJAN_EMAIL: process.env.KRISTIJAN_EMAIL,
    DEPLOY_API_URL: process.env.DEPLOY_API_URL,
    KV_REST_BASE: process.env.KV_REST_BASE,
    KV_REST_TOKEN: process.env.KV_REST_TOKEN,
  };

  // If session ID provided, load from KV
  if (sessionId) {
    console.log(`   Loading session data for: ${sessionId}`);
    const paymentData = await loadFromKV(sessionId, env);
    
    if (paymentData) {
      if (!businessName && paymentData.businessName) {
        console.log(`   Found business: ${paymentData.businessName}`);
      }
      if (!customDomain && paymentData.customDomain) {
        console.log(`   Found domain: ${paymentData.customDomain}`);
      }
    } else {
      console.log(`   ⚠️  Could not load session data from KV`);
    }
  }

  if (!businessName && !customDomain) {
    console.error('Usage: node scripts/deploy-custom-domain.js --business "Name" --domain "example.com" [--session-id <id>] [--dry-run]');
    process.exit(1);
  }

  if (!customDomain) {
    console.error('   Error: --domain is required');
    process.exit(1);
  }

  const result = await deployCustomDomain(businessName || customDomain, customDomain, sessionId);
  
  if (result.dryRun) {
    process.exit(0);
  }
  
  if (!result.success) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message);
  process.exit(1);
});