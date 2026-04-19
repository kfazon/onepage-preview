# Peek — MASTER PLAN v3.0
**Status:** Full Strategic Revision | **Date:** 2026-04-19 | **Version:** 3.0

---

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Legal Compliance — Country by Country](#2-legal-compliance--country-by-country)
3. [Product Audit — What's Good / What Needs Fixing](#3-product-audit--whats-good--what-needs-fixing)
4. [What AI Can Do Without Kristijan](#4-what-ai-can-do-without-kristijan)
5. [What Requires Kristijan's Action](#5-what-requires-kristijans-action)
6. [Revenue Projections — Realistic](#6-revenue-projections--realistic)
7. [Go-to-Market Roadmap](#7-go-to-market-roadmap)
8. [Outreach Playbooks](#8-outreach-playbooks)
9. [Product Roadmap](#9-product-roadmap)
10. [TODO Tracking](#10-todo-tracking)

---

## 1. Executive Summary

**Peek** is a micro-SaaS that auto-generates one-page website previews for local businesses without websites, then converts them to paid hosting customers.

**Current state:** MVP is functional. Build works, pages render, multi-language is active. KV store ready but not connected. No Stripe, no email infrastructure, no B2B data. **Revenue: €0.**

**Goal:** Kristijan operates this solo. Maximize revenue. AI does the work; Kristijan just signs contracts and receives payments.

**Core insight from this session:** Google killed free Business Profile websites in March 2024. This creates a massive gap — millions of DE/ES/PL businesses that had free Google sites now have nothing. Peek can fill that gap. But DE/Austrian legal constraints require inbound-only approach (no mass cold email).

---

## 2. Legal Compliance — Country by Country

### Research Sources
- German UWG (Gesetz gegen den unlauteren Wettbewerb) §7
- Austrian TKG (Telekommunikationsgesetz) §174
- EU ePrivacy Directive / GDPR Article 6(1)(f) legitimate interest
- DSGVO (German GDPR implementation)

### 🇩🇪 Germany

**Rules for B2B cold email:**

1. **§7(3) UWG — The key exception:** You CAN send unsolicited commercial emails to businesses (B2B) WITHOUT prior consent if:
   - The email address was obtained in the context of a **sale of goods or services** to the recipient, OR
   - The recipient is a **company** (not a consumer/individual)
   - The sender uses the address for **direct marketing of similar products/services**
   - The recipient was given **opportunity to opt-out** at time of collection AND in every email
   - The sender clearly identifies as advertising in the email

2. **For sole traders (Gewerbetreibende, Einzelunternehmer):** They are treated as private individuals under DSGVO. Email marketing requires **prior consent (double opt-in)**. Cannot use §7(3) UWG exception for them.

3. **Required elements in every email:**
   - Clear identification as advertising
   - Opt-out link (one-click unsubscribe)
   - Physical postal address of sender
   - Privacy policy link
   - If sole trader: "This email was sent to [email] from public business registry"

4. **Forbidden:**
   - Pre-checked consent boxes
   - Dark patterns (hidden cancel buttons, etc.)
   - False sender names or subject lines
   - Emails to private individuals without consent

5. **Penalties:**
   - UWG violations: Up to €300,000 per violation
   - GDPR violations: Up to €20M or 4% of global annual revenue
   - Competitors can send cease-and-desist letters (Abmahnungen) — common abuse vector

**Safe approach for DE:**
- ✅ Existing customers (after GDPR disclosure at collection)
- ✅ LinkedIn warm outreach (professional context)
- ✅ Inbound (form on landing page, they opt-in)
- ✅ Email to GmbH, UG, AG company addresses (B2B, not sole traders)
- ❌ Mass cold email to Gewerbetreibende (sole traders) — requires double opt-in
- ❌ Generic purchased email lists for DE

### 🇦🇹 Austria

**Rules (TKG §174):**
- Sending unsolicited commercial emails (including SMS) **requires prior consent** (opt-in)
- Applies to both B2B and B2C
- No "soft" B2B exception like in some countries
- Must check "Robinson list" (RTR EEG Liste) before sending
- Penalties: Up to €50,000 (TKG) + GDPR penalties

**Safe approach for AT:**
- ✅ Inbound only (opt-in form on website)
- ✅ LinkedIn outreach
- ❌ Mass cold email — NOT LEGAL

### 🇪🇸 Spain

**Rules:**
- LOPD-GDD (Spanish GDPR) + LSSI (Ley de Servicios de la Sociedad de la Información)
- B2B cold email allowed under **legitimate interest** (GDPR Art. 6(1)(f))
- Must include:
  - Identification of sender (company name, address)
  - Clear commercial purpose
  - Easy opt-out mechanism
  - Privacy policy link
- Cannot email individuals (personas físicas) without consent
- Can email empresas (companies/businesses)

**Safe approach for ES:**
- ✅ B2B cold email (companies, SL, SA, SL)
- ✅ Mass email campaigns with proper opt-out
- ❌ Emails to personal Gmail/Hotmail accounts of individuals

### 🇵🇱 Poland

**Rules:**
- UODO (Urząd Ochrony Danych Osobowych) + GIODO implementation
- RODO (Polish GDPR) — same framework as EU GDPR
- Direct marketing via email requires consent OR legitimate interest
- B2B: Can use legitimate interest if email is on business domain
- Must provide easy opt-out

**Safe approach for PL:**
- ✅ B2B cold email to company domains
- ✅ Mass campaigns with proper setup
- ❌ Personal email addresses without consent

### Summary Table

| Country | Cold Email (B2B) | Mass Email | Required | Notes |
|:---|:---|:---|:---|:---|
| 🇩🇪 DE | ✅ GmbH/AG only | ❌ Sole traders | Opt-out + address | UWG §7(3) — sale context or not individual |
| 🇦🇹 AT | ❌ NO | ❌ NO | Opt-in + check Robinson list | TKG §174 — strict |
| 🇪🇸 ES | ✅ Yes | ✅ Yes | Opt-out + address | GDPR legitimate interest |
| 🇵🇱 PL | ✅ Yes | ✅ Yes | Opt-out + address | GDPR legitimate interest |
| 🇭🇷 HR | ✅ Yes | ✅ Yes | Opt-out + address | GDPR legitimate interest |
| 🇬🇧 UK | ✅ Yes | ✅ Yes | Opt-out + address | PECR + GDPR |

---

## 3. Product Audit — What's Good / What Needs Fixing

### ✅ Working Components

| Component | Status | Notes |
|:---|:---|:---|
| Generator (`packages/generator/src/index.js`) | ✅ Excellent | 3 templates, 5 languages (DE, ES, PL, HR, EN), robust HTML output |
| Multi-language COPY | ✅ Good | All key UI strings translated |
| Landing pages (`/`, `/de/`, `/es/`, `/pl/`) | ✅ Good | EN and DE are comprehensive, ES/PL exist but less detailed |
| KV Store | ✅ Code ready | In-memory fallback works, Cloudflare KV binding ready |
| CI/CD | ✅ Working | GitHub Actions → Cloudflare Pages |
| Preview API (`/api/preview`) | ✅ Working | GET and POST both functional |
| Claim API (`/api/claim`) | ✅ Working | Validates, stores, returns JSON |
| Opt-out API (`/api/optout`) | ✅ Working | Removes from list |
| Demos page | ✅ Working | Shows all 3 template types |
| Local dev setup | ✅ Working | `pnpm install && pnpm dev` works |

### ⚠️ Needs Fixing

| Issue | Priority | Fix |
|:---|:---|:---|
| **EN pricing says "29€/mo"** — should say €149 for DE market | HIGH | Landing page pricing doesn't match business plan. EN says €29/79, DE says €149/299. ES and PL also need correct pricing. |
| **No Stripe integration** | HIGH | No checkout links, no payment flow. Cannot convert. |
| **No email capture form** | HIGH | /de/ page has "Request a preview" email button but no actual form. Should capture email before sending preview. |
| **No Impressum** | HIGH | Germany requires legal Impressum on all commercial websites. Missing. |
| **No Privacy Policy** | HIGH | GDPR requires privacy policy. Must be in DE language for DE market. |
| **KV binding not connected** | MEDIUM | Need manual setup in Cloudflare Dashboard — Kristijan must do this |
| **No analytics/tracking** | MEDIUM | No UTM parameters on preview links, no event tracking |
| **ES and PL landing pages** | MEDIUM | Exist but less polished than EN/DE. Need proper pricing and CTAs. |
| **No "request preview" flow** | MEDIUM | We send previews TO businesses, but we don't have a form for businesses to REQUEST a preview (inbound lead) |

### ❌ Missing (for full product-market fit)

| Feature | Priority | Notes |
|:---|:---|:---|
| Stripe Checkout links | CRITICAL | Without this, we cannot accept payments |
| Resend + email sequences | CRITICAL | Cannot do outreach without email infrastructure |
| Apollo.io data | CRITICAL | Cannot do cold email without B2B data |
| Automated preview generation from business name | MEDIUM | Currently need manual `generatePreview()` call with full data |
| Custom domain deploy flow | MEDIUM | After payment, how does customer get their domain working? |
| Customer dashboard | LOW | Owner wants to see/manage their page |
| Analytics dashboard | LOW | We want to see open rates, click rates |

---

## 4. What AI Can Do Without Kristijan

**All of this is ready to execute immediately:**

### Documentation
- [ ] Write comprehensive updated BUSINESS_PLAN.md v3.0
- [ ] Write LEGAL_COMPLIANCE.md with country-by-country rules
- [ ] Update ACQUISITION_PLAN.md with legal-safe approaches
- [ ] Update RUNBOOK.md with step-by-step operations
- [ ] Write OUTREACH_PLAYBOOK.md (DE safe, ES/PL cold email)
- [ ] Update METRICS.md with actual funnel metrics to track
- [ ] Update DECISIONS.md with all decisions from this session

### Code (Pixel sub-agent tasks)
- [ ] **Fix pricing mismatch** — EN landing page currently shows €29/79 instead of market-correct pricing
- [ ] **Add Impressum page** — required for DE, must be a real page
- [ ] **Add Privacy Policy** — GDPR-compliant, multi-language
- [ ] **Add "Request Preview" email capture form** — on /de/ and other landing pages
- [ ] **Create Stripe-ready checkout infrastructure** — add checkout links to pricing sections, prepare webhook handlers
- [ ] **Add UTM tracking to all preview URLs** — for analytics
- [ ] **Create batch generation script** — CSV input → 100 previews
- [ ] **Add cookie consent banner** — GDPR requirement
- [ ] **Polish ES and PL landing pages** — match quality of EN/DE

### Design / UX
- [ ] Improve the preview widget in landing pages to show actual working preview
- [ ] Add testimonials/social proof sections to landing pages
- [ ] Create email template designs (copy) ready for Resend

### Automation Setup (without actual Resend/Apollo)
- [ ] Write the full outreach script (ready to run when Resend API key is available)
- [ ] Write the batch preview generation script (ready to run when Apollo data is available)
- [ ] Write the Stripe webhook handler (ready to test when Stripe keys are available)

---

## 5. What Requires Kristijan's Action

**Only these things need Kristijan:**

1. **Cloudflare KV Binding** — Go to Cloudflare Dashboard → Pages project "peek-preview" → Settings → Functions → KV Namespaces → Add binding "PREVIEWS" → namespace "peek-previews" (ID: 7ca53bc967934ad582c53cbb4b2823b4)
2. **Stripe Account** — Create or connect existing → Create 3 Checkout Links (DE €149/mo, ES €99/mo, PL €59/mo)
3. **Resend Account** — Create account ($20/mj) → Add API key to repo secrets
4. **Apollo.io Account** — Create account ($49/mj) → Export B2B data for DE/ES/PL
5. **Legal Review** — Have a lawyer or use a legal template service to verify Impressum/Privacy Policy is correct for DE

---

## 6. Revenue Projections — Realistic

Based on cold email benchmarks from research:

### Realistic Funnel (cold email to B2B in ES/PL)

```
For 1,000 emails sent (ES/PL market):
├── 1,000 delivered
│   ├── 400 open (40% open rate)
│   │   ├── 50 click (12.5% click rate)
│   │   │   ├── 5 claim (10% of clicks → "I want this")
│   │   │   │   ├── 2 reply to follow-up (40%)
│   │   │   │   │   └── 1 payment (50% close rate from reply)
│   │   │   └── 45 no claim
│   │   └── 350 no click
│   └── 600 not opened

Result: 1 paying customer per 1,000 emails = 0.1% conversion
Revenue: €99 (ES) or €59 (PL) per customer

Cost per customer:
- Apollo.io: ~$0.005 per contact = $5 per 1,000 contacts
- Resend: $20/mj ÷ 50,000 emails = $0.0004 per email
- Time: ~30 min for 1,000 emails (automation)
```

### Revenue Scenarios

**Conservative (inbound + limited warm outreach):**

| Period | Customers | MRR | Notes |
|:---|:---|:---|:---|
| Month 1-2 | 0-2 | €0-298 | Setup only |
| Month 3-4 | 3-6 | €447-894 | First inbound from SEO |
| Month 6 | 8-12 | €1,192-1,788 | LinkedIn + SEO active |
| Month 12 | 20-30 | €2,978-4,467 | Multiple channels |
| Year 2 | 50-70 | €7,437-10,413 | Full automation |

**Moderate (cold email ES+PL at scale):**

| Period | Emails Sent | Customers | MRR |
|:---|:---|:---|:---|
| Month 1-2 | 0 | 0-2 | €0-298 |
| Month 3-4 | 2,000 | 5-10 | €743-1,490 |
| Month 6 | 6,000 | 15-22 | €2,232-3,273 |
| Month 9 | 12,000 | 30-40 | €4,464-5,952 |
| Month 12 | 18,000 | 50-60 | €7,437-8,924 |

**Ambitious (full cold email, multiple markets):**

| Period | Emails Sent | Customers | MRR |
|:---|:---|:---|:---|
| Month 3 | 3,000 | 10-15 | €1,488-2,232 |
| Month 6 | 10,000 | 30-40 | €4,464-5,952 |
| Month 9 | 20,000 | 55-70 | €8,181-10,413 |
| Month 12 | 30,000 | 90-120 | €13,393-17,856 |

**Industry benchmark:** Median micro-SaaS takes 2.75 years to reach $83K MRR ($1M ARR). Solo operator realistic maximum: $5K-$8K MRR in year 1.

**Peek realistic maximum (solo, full time):** €5,000-8,000 MRR in year 1 if executed perfectly.

---

## 7. Go-to-Market Roadmap

### Phase 0 — Setup & Documentation (Week 1-2) — AI does this now

**Tasks:**
- [ ] Write all documentation (this plan, legal doc, outreach playbook)
- [ ] Fix pricing on EN landing page
- [ ] Create Impressum page
- [ ] Create Privacy Policy page
- [ ] Add email capture form to /de/
- [ ] Add UTM tracking to preview links
- [ ] Add cookie consent banner
- [ ] Commit all changes to git

**Kristijan:**
- [ ] KV binding in Cloudflare Dashboard
- [ ] Stripe account setup (can happen in parallel)

### Phase 1 — DE Market (Legal-Safe) (Week 3-8)

**Strategy:** Inbound + warm outreach (NO mass cold email for DE)

**Channels:**
1. **SEO** — "kostenlose Website für [business type] in [city]" keywords
   - Create 10-20 landing pages for DE cities + business types
   - Target: restaurants, cafés, hair salons in Berlin, Hamburg, Munich

2. **LinkedIn outreach** — 10-20 warm connections/day to business owners
   - Personal message with preview link
   - Not mass automated — personal, human approach

3. **Referrals** — Ask every customer for referrals

4. **Inbound form** — "Request your free preview" on landing page
   - AI follows up personally when leads come in

**Target:** 3-5 DE paying customers by end of week 8

### Phase 2 — ES + PL Market (Week 5-12)

**Strategy:** Cold email enabled (legitimate interest + B2B)

**Channels:**
1. **Apollo.io data** — 2,000 businesses per market (ES + PL)
2. **Resend email sequences** — 3-email drip
3. **A/B testing** — subject lines, send times, CTA variations

**Target:** 10-15 paying customers across ES + PL

### Phase 3 — Scale (Month 4-6)

**Channels:**
1. FR + IT landing pages
2. Cold email at volume (5,000+/month)
3. Partnership channel (accountants, business associations)
4. Referral program (existing customers get incentives)

**Target:** 25+ customers, €3,500+ MRR

---

## 8. Outreach Playbooks

### 8.1 DE — Legal-Safe Outreach (LinkedIn + Inbound)

**LinkedIn Approach:**
```
1. Find business owners in DE (restaurants, cafés, salons, tradesmen)
   → Use LinkedIn Sales Navigator or manual search
   → Focus on: Berlin, Hamburg, Munich, Cologne, Düsseldorf

2. Connect request:
   "Hi [Name], I noticed [Business Name] in [City] — we actually built 
   a free preview site for businesses like yours. Would you like to see it?"

3. If they respond yes → send preview link + "claim" CTA

4. Follow up once if no response (after 3-4 days)

5. Track in spreadsheet: Name, Business, City, LinkedIn, Preview URL, Status
```

**Inbound Approach (SEO):**
```
1. Create landing pages targeting:
   - "Website für Friseur Berlin" → shows example preview for fictional salon
   - "Kostenlose Website für Restaurant München"
   - "One-Page Website für Handwerker Hamburg"

2. On page: "Want a free preview for YOUR business? Enter your email →"

3. When email comes in → AI generates preview + sends via email

4. Follow up sequence (3 emails):
   - Day 0: Here is your preview
   - Day 3: Did you get a chance to look?
   - Day 10: Last chance / urgency
```

### 8.2 ES + PL — Cold Email Sequence

**Email 1 (Day 0):**

Subject variants:
- "Así podría verse la web de [Nombre del negocio]"
- "Hemos creado una web gratuita para [Nombre]"
- "[Nombre del negocio] — tu web gratuita está lista"

```
Hola [Nombre],

He creado una vista previa gratuita para [Nombre del negocio].

Puedes verla aquí → [preview_link]

¿Qué incluye tu vista previa:
✓ Tu nombre, dirección y horarios
✓ Una página profesional para tu negocio
✓ Mapa de ubicación
✓ Formulario de contacto

Todo gratis. Sin compromiso.

Si te gusta, puedes activarla por €99/mes — con tu propio dominio,
sin marca de Peek, y hosting incluido.

¿Quieres verla? → [preview_link]

Saludos,
El equipo Peek

---

Para darte de baja: [optout_link]
Peek · [dirección de la empresa]
```

**Email 2 (Day 3 — no click on Email 1):**
```
Hola [Nombre],

Quería saber si tuviste oportunidad de ver la vista previa
para [Nombre].

Aquí está → [preview_link]

La página estará disponible unos días más.

Si tienes alguna pregunta, escríbeme.

Saludos,
Peek

---
Baja: [optout_link]
```

**Email 3 (Day 10 — no claim):**
```
Hola [Nombre],

La vista previa para [Nombre] expira pronto.

Aquí la tienes una última vez → [preview_link]

Precio especial de lanzamiento: €99/mes
- Tu propio dominio (ej: tudominio.es)
- Sin marca de Peek
- SSL incluido
- Hosting profesional

Si te interesa, solo tienes que hacer clic → [stripe_checkout_link]

Saludos,
Peek

---
Baja: [optout_link]
```

### 8.3 GDPR Compliance Language (Required in every email)

Add to EVERY email footer:

```
Peek | [Kristijan's legal company address]
Privacy Policy: https://peek-preview.pages.dev/privacy
Unsubscribe: [optout_link]

Este email fue enviado a [email] porque generamos una vista previa 
gratuita para [nombre del negocio] usando información disponible 
públicamente en registros comerciales. Si no deseas recibir más 
emails de Peek, haz clic aquí: [optout_link]
```

---

## 9. Product Roadmap

### Must-Have (Before First Customer)

- [ ] **Stripe Checkout links** — 3 tiers (DE €149, ES €99, PL €59)
- [ ] **Impressum page** (DE requirement)
- [ ] **Privacy Policy** (GDPR)
- [ ] **Cookie consent banner**
- [ ] **"Request preview" email capture form**
- [ ] **KV binding connected to Cloudflare Pages**

### Should-Have (Before Revenue > €2K/mo)

- [ ] **Batch preview generation script** (CSV → 100 previews)
- [ ] **Email sequence automation** (Resend)
- [ ] **CRM spreadsheet** (lead tracking)
- [ ] **Analytics dashboard** (open/click/conversion rates)
- [ ] **Custom domain deploy flow** (post-payment)

### Nice-to-Have (Before €5K+ MRR)

- [ ] **Customer dashboard** (manage their page)
- [ ] **Content editor** (change text, images)
- [ ] **Multi-page support** (Growth tier)
- [ ] **API access** (for partners)
- [ ] **Mobile app** (basic)

---

## 10. TODO Tracking

### AI Tasks (Executing now, no Kristijan needed)

- [ ] **COMMIT:** git commit + push all local changes
- [ ] **FIX:** EN landing page pricing (€149/€299, not €29/€79)
- [ ] **CREATE:** `/impressum` page (legal for DE)
- [ ] **CREATE:** `/privacy` page (GDPR-compliant, DE version)
- [ ] **CREATE:** Email capture form on `/de/` landing page
- [ ] **ADD:** UTM tracking to all preview URLs
- [ ] **ADD:** Cookie consent banner
- [ ] **WRITE:** BUSINESS_PLAN.md v3.0
- [ ] **WRITE:** LEGAL_COMPLIANCE.md
- [ ] **WRITE:** OUTREACH_PLAYBOOK.md
- [ ] **UPDATE:** ACQUISITION_PLAN.md
- [ ] **UPDATE:** RUNBOOK.md
- [ ] **UPDATE:** DECISIONS.md
- [ ] **CREATE:** Stripe-ready checkout code (without live keys)
- [ ] **CREATE:** Batch generation script (ready to run)
- [ ] **POLISH:** ES and PL landing pages

### Kristijan Tasks (Needs action)

- [ ] **KV binding** — Cloudflare Dashboard setup
- [ ] **Stripe account** — Create or connect
- [ ] **Resend account** — Create + add API key
- [ ] **Apollo.io account** — Create + export data
- [ ] **Legal review** — Verify Impressum/Privacy Policy

---

## Appendix: Competitive Positioning

| Competitor | Price | Model | Weakness |
|:---|:---|:---|:---|
| Localo.com | $39-249/mj | SEO tool + website builder | Expensive, requires signup, no outreach |
| Google (former) | Free | GBP website builder | **Discontinued March 2024** — huge gap! |
| Wix/Squarespace | $25-49/mj | Self-service | 2-5h work required, language barrier |
| Carrd.co | $19/yr | One-page builder | No automation, no outreach |
| Web agencies (DE) | €500-5,000 | Full-service | Expensive, slow (weeks), custom |
| Peek (us) | €59-149/mj | Auto-preview + hosting | New, unproven, no existing customers |

**Our differentiator:** The only product that **auto-generates a preview and sends it to the business owner** before they even ask. Zero friction. Free to see, then low price to go live.

---

*Last updated: 2026-04-19 15:00 GMT+2*