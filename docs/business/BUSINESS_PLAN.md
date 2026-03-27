# One‑Page Preview Sites — Business Plan (v0.1)

## 1) Concept
Generate **free preview one‑page websites** for businesses with no website. Send preview link as outreach. Offer paid upgrade to go live on their domain + ongoing hosting/maintenance.

## 2) Wedge strategy: niche‑by‑niche (recommended)
We do **one niche at a time** to maximize conversion and reduce support variance.

### Why niche‑by‑niche
- Copy and section structure matches buyer intent (higher reply/close)
- Cleaner automation (schema mapping)
- Lower support cost (repeatable edits)

### Implementation discipline
We **do not** create 20 bespoke templates. We create **2–3 base templates** with **variant toggles** per niche:
- Base A: Services (call/quote)
- Base B: Booking (beauty/wellness)
- Base C: Portfolio/Event (showcase/inquiry)

Per niche we define:
- template + toggles
- copy blueprint
- required fields schema
- outreach pack (email/DM)

## 3) Target segments (initial)
- Home services (plumber/electrician/HVAC) — recommended first niche
- Salons/beauty/wellness
- Restaurants/cafes
- Wedding vendors
- Coaches/consultants

## 4) Offer + pricing (illustrative)
- Setup: 150€ one‑time
- Subscription: 25€/mo baseline
- Upsells: 49€/99€/149€ tiers (SEO, booking, edits)

## 5) Funnel assumptions (starting point)
- leads/month: 500
- preview view rate: 25%
- reply rate: 6%
- close rate from replies: 25%
- net conversion: 0.25%–1.5% (improve by niche targeting)

## 6) Unit economics (illustrative)
- Year‑1 revenue/customer: 150 + 12×25 = 450€
- 24‑month gross CLTV: 150 + 24×25 = 750€
- Biggest risk is support time; mitigate with strict scope + paid edit packages.

## 7) Tech/hosting plan (baseline)
- Astro static output
- Cloudflare Pages hosting
- No‑CMS (business profile JSON + theme JSON)
- PR preview deploy per generated site
- Form endpoint via serverless (Worker) + anti‑spam

## 8) Design approach (use existing skills)
Design quality is a differentiator; we will use our installed skills:
- `ui-ux-design` → structure + heuristics
- `superdesign/frontend-design-3` (Superdesign) → visual polish + spacing/typography
- `web` → implementation

Process:
1) Pick base template A/B/C skeleton
2) Run Superdesign pass (layout rhythm, type scale, CTA hierarchy)
3) Lock tokens: colors, fonts, components
4) Create niche variants via toggles (no new design system per niche)

## 9) Legal/ethical checklist (minimum)
- Opt‑out/remove link on every preview
- Unsubscribe on every email
- Disclosure: generated from public info
- No fake reviews/testimonials

## 10) KPIs
- outreach sent, open rate, click‑through
- claim rate, upgrade rate
- MRR, churn
- support minutes/site/month

## 11) MVP roadmap (2–3 weeks)
Week 1: 3 base templates + schema + generator
Week 2: preview deploy + forms + analytics events + SEO
Week 3: domain automation + QA checks + ops docs
