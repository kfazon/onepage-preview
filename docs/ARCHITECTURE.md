# Architecture

## Overview
Monorepo for one-page preview generation (Peek product).

```text
Browser → Cloudflare Pages → Astro web app
                         → KV store (preview data)
```

## Components

### Blitz — Landing page mockups
- Fast landing page mockups for outreach
- Generated on-demand for cold outreach campaigns
- Blitz agent handles design → delivery pipeline

### apps/web — Astro web app
- Preview front-end
- Serves generated preview pages
- Handles domain routing

### packages/generator — generation orchestration
- Batch generation scripts
- Template processing

### packages/templates-core — shared templates
- Template primitives and components

## Delivery Workflow
1. **Task Brief** → stored in `docs/evidence/<TASK_ID>/brief.md`
2. **Execution** → Blitz/Pixel/Midas agents deliver changes
3. **Delivery Report** → stored in `docs/evidence/<TASK_ID>/report.md`
4. **GitHub push** → source of truth updated

## Evidence System
- `docs/evidence/<TASK_ID>/` — task-scoped evidence folder
- `brief.md` — task brief template (Goal, Context, Constraints, Done-When)
- `report.md` — delivery report template (Summary, Changes, Verification)
- `TEMPLATE/` folder — reusable brief/report patterns

## Data/API flows
1. User input → generator → preview page
2. Preview stored in KV
3. Custom domain routes to preview

## Dependencies
- Astro
- Cloudflare Pages + Workers
- KV store
- Stripe (payments)
- Resend (email)

## Failure modes
- KV store unavailable → in-memory fallback
- Domain not propagated → CNAME misconfiguration

## Decisions
See `docs/DECISIONS.md`