# Scripts — onepage.preview

Automated tooling for lead generation, outreach, and deployment.

## Scripts Overview

| Script | Purpose |
|--------|---------|
| `generate.js` | Generate a single preview HTML from JSON input |
| `batch-generate.js` | Batch-generate previews from a CSV of leads |
| `outreach-email.js` | Send email sequences via Resend (3-email cadence) |
| `apollo-scrape.js` | Scrape business leads from Apollo.io |
| `deploy-custom-domain.js` | Set up custom domain after Stripe payment |
| `webhook.js` | Stripe webhook handler (runs in Cloudflare Pages) |

---

## Quick Start

### 1. Generate a Preview

```bash
# Inline JSON
node scripts/generate.js --input '{"name":"Café Berlin","lang":"de"}'

# From file
node scripts/generate.js --input data/my-lead.json --output preview.html

# Dry run (shows what would happen)
node scripts/generate.js --input '{"name":"Test","lang":"pl"}' --dry-run
```

### 2. Batch Generate Previews

```bash
# Required CSV columns: name, address, phone, category, lang, email
# Output: data/leads_with_preview.csv

node scripts/batch-generate.js --input data/leads.csv
node scripts/batch-generate.js --input data/leads.csv --dry-run

# Rate limited to 1 req/sec
```

### 3. Send Outreach Emails

```bash
# Day 0 (welcome email)
node scripts/outreach-email.js --input data/leads_with_preview.csv --day 0

# Day 3 follow-up
node scripts/outreach-email.js --input data/leads_with_preview.csv --day 3

# Day 10 final reminder
node scripts/outreach-email.js --input data/leads_with_preview.csv --day 7

# Dry run (preview first 5, no emails sent)
node scripts/outreach-email.js --input data/leads_with_preview.csv --dry-run

# Rate limited to 50 emails/minute
```

### 4. Scrape Apollo for Leads

```bash
# Scrape all categories for Germany (2000 target)
node scripts/apollo-scrape.js --country DE

# Scrape specific category
node scripts/apollo-scrape.js --country PL --category restaurants

# Set custom limit
node scripts/apollo-scrape.js --country ES --limit 500

# Dry run
node scripts/apollo-scrape.js --country DE --dry-run

# Output: data/apollo-{country}-{category}.csv
# Columns: business_name, email, phone, address, city, country, domain, website_found
```

### 5. Deploy Custom Domain (post-payment)

```bash
node scripts/deploy-custom-domain.js \
  --business "Café Berlin" \
  --domain "cafe-berlin.de"

# From Stripe session ID (loads metadata from KV)
node scripts/deploy-custom-domain.js --session-id cs_test_abc123

# Dry run
node scripts/deploy-custom-domain.js --business "Test" --domain "test.de" --dry-run
```

---

## Environment Variables

```bash
# Resend (email sending)
export RESEND_API_KEY=re_xxxxxxxxxxxxx
export KRISTIJAN_EMAIL=kristijan@example.com

# Apollo (lead scraping)
export APOLLO_API_KEY=your-apollo-api-key

# Stripe webhook (handled by platform, but documented here)
export STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# Cloudflare (custom domain DNS setup)
export CLOUDFLARE_API_TOKEN=your-cloudflare-token
export CLOUDFLARE_ZONE_ID=your-zone-id

# KV Store (Cloudflare Workers/Pages)
export KV_REST_BASE=https://api.cloudflare.com/client/v4/accounts/ACCOUNTID/storage/kv/namespaces/NAMESPACEID
export KV_REST_TOKEN=your-kv-rest-token

# Deploy webhook (optional)
export DEPLOY_API_URL=https://api.yourplatform.com/deploy

# Preview API (for batch-generate)
export PREVIEW_API_URL=http://localhost:4321/api/preview
```

---

## File Structure

```
scripts/
├── generate.js          # Single preview generator
├── batch-generate.js    # CSV batch preview generator
├── outreach-email.js    # Resend email sequence sender
├── apollo-scrape.js     # Apollo.io lead scraper
├── deploy-custom-domain.js  # Post-payment domain setup

data/                     # Generated CSV files (gitignored)
├── leads.csv             # Your input leads
├── leads_with_preview.csv  # Leads + preview URLs
├── apollo-de.csv         # Apollo scraped DE leads
├── apollo-es.csv         # Apollo scraped ES leads
├── apollo-pl.csv         # Apollo scraped PL leads
└── emails_sent.csv      # Log of sent emails

../apps/web/src/pages/api/
└── webhook.js           # Stripe webhook handler
```

---

## Workflow

```
Apollo Scrape → batch-generate → outreach-email (Day 0) → outreach-email (Day 3) → outreach-email (Day 7)
                                      ↓
                                  Payment? → deploy-custom-domain.js → webhook.js (Stripe)
```

1. **Apollo** → scrape businesses without websites in DE/ES/PL
2. **batch-generate** → generate preview URLs for each lead
3. **outreach-email --day 0** → send welcome email with preview link
4. **outreach-email --day 3** → follow-up for non-openers/clickers
5. **outreach-email --day 7** → final reminder before expiry
6. **Payment** → Stripe webhook triggers deploy of custom domain

---

## Notes

- All scripts use ES modules (`import`/`export`)
- All external API keys via environment variables (never hardcoded)
- All CSVs output to `data/` folder
- All scripts support `--dry-run` for safe testing
- Email templates are also in `docs/email-templates/` as Markdown for easy editing
- Apollo scrape targets businesses **without** websites (filter: `website_found=NO`)

---

## Testing

```bash
# Check all scripts are syntactically valid
node --check scripts/generate.js
node --check scripts/batch-generate.js
node --check scripts/outreach-email.js
node --check scripts/apollo-scrape.js
node --check scripts/deploy-custom-domain.js

# Dry runs (no real API calls)
node scripts/generate.js --input '{"name":"Test"}' --dry-run
node scripts/batch-generate.js --input data/leads.csv --dry-run
node scripts/outreach-email.js --input data/leads.csv --dry-run
node scripts/apollo-scrape.js --country DE --dry-run
```