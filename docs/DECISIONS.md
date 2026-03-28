# DECISIONS.md — OnePage Preview Platform

## 2026-03-28 — Generator architecture: embedded template strings in JS
- Decision: Templates are embedded as JS functions in `packages/generator`, not separate files.
- Rationale: Single npm package = easier to deploy as Cloudflare Worker. No file I/O needed.
- Swap path: if template files needed later, extract to `packages/templates-core`.

## 2026-03-28 — Claim/Opt-out: client-side form POST to API endpoints
- Decision: Claim (email capture) and Opt-out (remove) handled via JS fetch POST to `/api/claim` and `/api/optout`.
- Rationale: Simple MVP flow. Email capture = manual follow-up for now (no CRM).
- Store: JSON file for MVP, swap to Cloudflare KV/D1 before production outreach.

## 2026-03-28 — Three template types locked
1. `launch-teaser` — hero, benefits, social proof, CTA. For: new businesses, consultants.
2. `product-spotlight` — feature grid, comparison, FAQ. For: single-offer service businesses.
3. `event-waitlist` — agenda, speakers, map, form. For: events, workshops, pop-ups.

## 2026-03-28 — Astro output mode: server (Cloudflare adapter)
- Decision: `output: "static"` with Cloudflare Pages adapter. Static pages prerender; API routes run as Cloudflare Workers.
- Evidence: `apps/web/astro.config.mjs`

## 2026-03-28 — Monorepo: pnpm workspaces + workspace:* dependency protocol
- Decision: `@onepage/generator` exposed as local workspace package. Web app imports via package name, not relative paths.
- Evidence: `apps/web/package.json` + `packages/generator/package.json`
- Decision: Build 2–3 base templates with toggles; execute niche-by-niche.
- Rationale: higher conversion + lower support variance.
- Owner: ceo/cmo
- Evidence: docs/business/BUSINESS_PLAN.md

## 2026-03-27 — Tech baseline: Astro + Cloudflare Pages + no-CMS JSON
- Decision: Static-first stack (Astro) + Cloudflare Pages previews + JSON content.
- Rationale: lowest cost + easiest automation.
- Owner: lead_engineer

## 2026-03-27 — Governance: GitHub-first / PR-only + doc-kit
- Decision: PR preview deploy required; merge on CI+preview pass; doc-kit required.
- Owner: lead_engineer
