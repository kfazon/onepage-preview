# Peek — Runbook
**Version:** 1.0 | **Date:** 2026-04-19 | **Owner:** Maestro

---

## Purpose

Operational procedures for running Peek day-to-day. This is what we actually DO to make money.

---

## Daily Operations

### Morning (08:00-09:00)

1. **Check Resend dashboard**
   - Delivery rates (target: >95%)
   - Bounce rates (max: 5%)
   - Open rates (target: >35%)
   - Click rates (target: >3%)

2. **Check KV store for new claims**
   ```bash
   curl -X GET "https://peek-preview.pages.dev/api/claims" 2>/dev/null | jq
   ```
   Or check Resend webhook notifications

3. **Check Stripe dashboard**
   - New payments?
   - Failed payments?
   - Churn?

4. **Check Google Sheets CRM**
   - New inbound leads from form?
   - LinkedIn responses?
   - Claims from preview pages?

### After Morning Check

**If new claims:** Follow up with personalized email within 2 hours.

**If new payments:** Contact customer to confirm domain preference.

**If issues:** Fix immediately — don't let problems sit.

---

## Weekly Operations (Monday)

### 1. Review Metrics

Create weekly report:

```
WEEKLY REPORT — [Week Number]

OUTREACH:
- Emails sent: [X]
- Open rate: [X]%
- Click rate: [X]%
- Bounce rate: [X]%
- Claims: [X]
- Claim rate: [X]%

SALES:
- Active conversations: [X]
- Awaiting payment: [X]
- Paid: [X]
- Revenue: €[X]

FINANCIAL:
- MRR: €[X]
- New customers: [X]
- Churn: [X]
- CAC: €[X]
```

### 2. A/B Test Analysis

- Which subject lines won?
- Which send times worked best?
- What claim rate by vertical (restaurants vs salons vs tradesmen)?
- Adjust next week's strategy based on data

### 3. Data Refresh

- Apollo.io: Export new leads for next week
- Update CRM with latest status
- Archive leads with "no_response" after day 30

### 4. Plan Next Week

- How many emails to send?
- Which market (DE/ES/PL)?
- Which vertical?
- Content/messaging tweaks?

---

## Campaign Setup Procedure

### New Cold Email Campaign (ES/PL)

**Step 1: Get Data**
```bash
# 1. Export from Apollo.io
# 2. Clean in Google Sheets (remove duplicates, verify format)
# 3. Save to data/apollo-[market]-[date].csv
```

**Step 2: Generate Previews**
```bash
node scripts/batch-generate.js \
  --input=data/apollo-es-2000.csv \
  --output=data/es-previews.csv \
  --lang=es \
  --dry-run=false
```

**Step 3: Test First**
```bash
# Send to 20 test emails first
node scripts/outreach-email.js \
  --input=data/es-previews.csv \
  --market=es \
  --limit=20 \
  --dry-run=true
```

**Step 4: Full Send**
```bash
node scripts/outreach-email.js \
  --input=data/es-previews.csv \
  --market=es \
  --dry-run=false
```

**Step 5: Track Results**
- Day 1: Open rate
- Day 4: Click rate
- Day 7: Claims
- Day 14: Sales

---

## New Customer Flow

### Pre-Payment

1. Lead submits claim form
2. Kristijan sends personalized email with Stripe Checkout Link
3. Customer clicks → Stripe Checkout
4. Customer pays → webhook fires

### Post-Payment

```
1. Kristijan receives: "NEW PAYMENT: Café Morgenrot"
2. Kristijan asks customer: "Which domain do you want?"
3. Customer: "cafemorgenrot.de"
4. Kristijan:
   a. Checks if domain available → registers if not (€10-15/yr)
   b. Adds DNS: CNAME cafemorgenrot.de → peek-preview.pages.dev
   c. Cloudflare Pages: Add custom domain cafemorgenrot.de
   d. Wait for SSL (automatic via Cloudflare)
   e. Test: https://cafemorgenrot.de → should show preview
5. Kristijan sends email: "Your site is live: https://cafemorgenrot.de"
6. Add customer to CRM → "paid" status
```

### DNS Setup (Manual)

In Cloudflare Dashboard:
1. Domain registered elsewhere: Add CNAME record pointing to `peek-preview.pages.dev`
2. Cloudflare Pages → Custom domains → Add `cafemorgenrot.de`
3. Wait 5-10 minutes for SSL certificate

### Verification

```bash
curl -sI https://cafemorgenrot.de | head -1
# Expected: HTTP/2 200

# Also check:
curl -s https://cafemorgenrot.de | grep -o "Café Morgenrot"
# Should show business name
```

---

## Customer Support

### Claim Questions

Response template:
```
Hallo,

vielen Dank für Ihr Interesse an Peek!

Ihre Vorschau finden Sie hier → [preview_link]

Wenn Sie die Seite live schalten möchten, kostet das €149/Monat 
— inklusive:
✓ Ihr eigener Domain
✓ SSL-Zertifikat
✓ Hosting
✓ Kein Peek-Branding

Einfach hier klicken → [stripe_checkout_link]

Fragen? Schreiben Sie mir jederzeit.

Viele Grüße,
[Kristijan]
```

### Payment Issues

1. Check Stripe dashboard for failed payments
2. Email customer: "Ihre Zahlung ist fehlgeschlagen — klicken Sie hier zum erneuten Versuch: [stripe_checkout_link]"
3. If repeated failures: offer invoice-based payment (bank transfer)

### Opt-Out Requests

When someone unsubscribes:
1. Immediately remove from outreach list
2. Do NOT send any more emails
3. Remove from Apollo.io list if present
4. Update CRM status: "opted_out"

---

## Invoice流程 (Billing)

### Kristijan's Invoice Template

For EU B2B (reverse charge):

```
Rechnung / Invoice

Von / From:
[KRISTIJAN'S COMPANY NAME]
[Address]
[City, Postal Code]
VAT ID: [USt-IdNr.]

An / To:
[CUSTOMER COMPANY]
[Address]
[City, Postal Code]
VAT ID: [customer VAT if provided]

Rechnungsnummer / Invoice Number: [INV-YYYY-MM-XXX]
Datum / Date: [YYYY-MM-DD]
Leistungszeitraum / Service Period: [YYYY-MM-DD to YYYY-MM-DD]

---------------------------------------------------

Leistung / Service                          Betrag / Amount
---------------------------------------------------
Peek Go Live — [Business Name]              €149,00
Website-Hosting + Domain                    inkl.
SSL-Zertifikat                              inkl.
---------------------------------------------------
Netto / Net:                                €149,00
MwSt / VAT:                                 0,00 (reverse charge)
---------------------------------------------------
Gesamt / Total:                             €149,00
---------------------------------------------------

Zahlungsbedingungen / Payment Terms: 14 Tage / 14 days
IBAN: [Kristijan's IBAN]
BIC: [Kristijan's BIC]

Hinweis / Note: VAT reverse charge — Art. 196 EU VAT Directive.
The recipient is liable for VAT in their country of establishment.

Konditionen / Terms:
- Vertragslaufzeit: 12 Monate / Contract period: 12 months
- Kündigung: 30 Tage im Voraus / Cancellation: 30 days notice
```

---

## Troubleshooting

### Preview not loading
- Check if preview URL is correct
- Verify preview was generated (check KV store)
- Try regenerating with fresh data

### Email not delivered
- Check Resend dashboard for bounces
- Remove bounced emails immediately
- Verify sender email format (no special chars)

### Payment not working
- Check Stripe Checkout Link is correct
- Verify price matches expected (€149 for DE)
- Check if customer used valid card
- Offer alternative: bank transfer invoice

### Domain not working
- Check DNS propagation (can take up to 48h)
- Verify CNAME record is correct
- Check Cloudflare Pages custom domain status
- Test with: `dig cafemorgenrot.de` or `nslookup cafemorgenrot.de`

### KV Store issues
- Check if KV binding is connected (Cloudflare Dashboard)
- Verify namespace ID matches in wrangler.toml
- Local dev uses in-memory fallback — always works locally

---

## Escalation

**If anything goes wrong with:**
- Legal issues (Abmahnungen, GDPR complaints)
- Stripe account issues
- Major technical problems

**→ Tell Kristijan immediately**

Small issues → handle autonomously.

---

*Last updated: 2026-04-19 15:15 GMT+2*