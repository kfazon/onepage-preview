/**
 * Cloudflare KV-compatible store for claims and opt-outs.
 *
 * Uses direct KV REST API when KV_REST_BASE + KV_AUTH_TOKEN are configured.
 * Falls back to platform.env.PREVIEWS (KV binding) if available.
 * Falls back to in-memory store for local dev.
 *
 * Environment variables needed for direct KV API:
 *   KV_REST_BASE=https://api.cloudflare.com/client/v4/accounts/{accountId}/storage/kv/namespaces/{namespaceId}
 *   KV_REST_TOKEN=your CF API token (Bearer auth)
 */

const KV_PREFIX = 'peek:';

// ─── In-memory fallback (local dev) ───────────────────────────────────────────

let _memClaims = [];
let _memOptouts = new Set();

const memStore = {
  async _get(key) { return null; },
  async _put(key, value) {},
  async get(key) {
    if (key === kvKey('claims')) return JSON.stringify(_memClaims);
    if (key === kvKey('optouts')) return JSON.stringify([..._memOptouts]);
    return null;
  },
  async put(key, value) {
    if (key === kvKey('claims')) _memClaims = JSON.parse(value);
    if (key === kvKey('optouts')) _memOptouts = new Set(JSON.parse(value));
  },
};

// ─── KV REST API store (works everywhere with env vars) ──────────────────────

function kvRestStore(baseUrl, authToken) {
  const headers = {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  };

  return {
    async _get(key) {
      try {
        const res = await fetch(`${baseUrl}/values/${encodeURIComponent(key)}`, { headers });
        if (res.ok) return await res.text();
        return null;
      } catch { return null; }
    },
    async _put(key, value) {
      try {
        await fetch(`${baseUrl}/values/${encodeURIComponent(key)}`, {
          method: 'PUT',
          headers,
          body: value,
        });
      } catch {}
    },
    async get(key) {
      const val = await this._get(key);
      return val || null;
    },
    async put(key, value) {
      await this._put(key, value);
    },
  };
}

// ─── Platform KV binding store (Cloudflare Workers/Pages) ─────────────────────

function platformKvStore(kv) {
  return {
    async _get(key) { return null; },
    async _put(key, value) {},
    async get(key) { return kv.get(key); },
    async put(key, value) { await kv.put(key, value); },
  };
}

// ─── Store factory ────────────────────────────────────────────────────────────

/**
 * @param {KVNamespace|object|null} kv — Cloudflare KV binding (platform.env.PREVIEWS)
 * @param {object} env — env object with KV_REST_BASE, KV_REST_TOKEN, CF_ACCOUNT_ID
 */
export function createStore(kv, env = {}) {
  // Prefer direct KV REST API if configured (works in any environment)
  if (env.KV_REST_BASE && env.KV_REST_TOKEN) {
    const store = kvRestStore(env.KV_REST_BASE, env.KV_REST_TOKEN);
    return buildStoreApi(store);
  }

  // Fall back to KV binding (Workers/Pages)
  if (kv) {
    const store = platformKvStore(kv);
    return buildStoreApi(store);
  }

  // Last resort: in-memory (local dev)
  return buildStoreApi(memStore);
}

function buildStoreApi(store) {
  return {
    async getClaims() {
      const raw = await store.get(kvKey('claims'));
      if (!raw) return [];
      try { return JSON.parse(raw); } catch { return []; }
    },

    async getOptouts() {
      const raw = await store.get(kvKey('optouts'));
      if (!raw) return [];
      try { return JSON.parse(raw); } catch { return []; }
    },

    async addClaim(businessName, email) {
      const claims = await this.getClaims();
      if (!claims.find(c => c.businessName === businessName && c.email === email)) {
        claims.push({ businessName, email, claimedAt: new Date().toISOString() });
        await store.put(kvKey('claims'), JSON.stringify(claims));
      }
      return { ok: true };
    },

    async addOptout(businessName) {
      const optouts = await this.getOptouts();
      if (!optouts.includes(businessName)) {
        optouts.push(businessName);
        await store.put(kvKey('optouts'), JSON.stringify(optouts));
      }
      return { ok: true };
    },

    async isOptedOut(businessName) {
      const optouts = await this.getOptouts();
      return optouts.includes(businessName);
    },
  };
}

function kvKey(key) { return `${KV_PREFIX}${key}`; }

// ─── Legacy compat shims ─────────────────────────────────────────────────────

/** @deprecated Use createStore(kv, env).addClaim() */
export async function addClaim(businessName, email) {
  return createStore().addClaim(businessName, email);
}

/** @deprecated Use createStore(kv, env).addOptout() */
export async function addOptout(businessName) {
  return createStore().addOptout(businessName);
}

/** @deprecated Use createStore(kv, env).isOptedOut() */
export async function isOptedOut(businessName) {
  return createStore().isOptedOut(businessName);
}

/** @deprecated */
export async function getStore() { return createStore().getClaims(); }

/** @deprecated */
export async function saveStore() {}
