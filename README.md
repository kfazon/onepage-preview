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

---

## ☁️ Cloudflare Pages Setup

### 1. Spajanje GitHub repo na Cloudflare Pages

1. Idi na [dash.cloudflare.com/pages](https://dash.cloudflare.com/pages)
2. Create project → Connect GitHub repo → odaberi `kfazon/onepage-preview`
3. U settingsima projekta:
   - **Build command:** `pnpm build`
   - **Build output directory:** `apps/web/dist`
   - **Root directory:** `/`
   - **Environment variables:** `NODE_VERSION = 20`
4. Enable **Auto-deploy on push** (triggers on push to `main`)

### 2. KV Namespace setup

Namespace je već kreiran: `7ca53bc967934ad582c53cbb4b2823b4`
ID je upisan u `.wrangler-workspace.toml`.

**Za produkciju — dodaj KV binding u Pages project:**

1. Cloudflare Dashboard → Pages → `peek-preview` → **Settings** → **Functions**
2. Pod **KV Namespaces** → **Add binding**:
   - Variable name: `PREVIEWS`
   - Namespace: `peek-previews`
3. **Save** → redeploy

Za local dev, KV nije potreban (in-memory fallback radi automatski).

### 3. GitHub Secrets (za CI/CD deploy)

Potrebno samo ako Cloudflare Pages GitHub app nije spojen:

1. Cloudflare API Token: [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
   - Template: "Edit Cloudflare Workers"
   - Account: odaberi račun
   - Zone: nema potrebe

2. Account ID: vidi u URL-u Cloudflare dashboarda ili na overview stranici računa

3. Postavi secrets:
```bash
gh secret set CLOUDFLARE_API_TOKEN --body "your-token"
gh secret set CLOUDFLARE_ACCOUNT_ID --body "your-account-id"
```

### Live URL
- EN: https://peek-preview.pages.dev
- DE: https://peek-preview.pages.dev/de/
- ES: https://peek-preview.pages.dev/es/
- PL: https://peek-preview.pages.dev/pl/
