# onepage-preview

Monorepo for one-page preview generation.

## Structure

- `apps/web` — Astro web app (preview/front-end)
- `packages/generator` — generation orchestration package
- `packages/templates-core` — shared template primitives/components
- `docs` — project docs and planning artifacts

## Quick start

```bash
pnpm install
pnpm --filter @onepage/web dev
```
