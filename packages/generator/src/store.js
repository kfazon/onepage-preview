/**
 * Cloudflare KV-compatible store for claims and opt-outs.
 *
 * Usage:
 *   - Cloudflare Workers/Pages: pass env.PREVIEWS (KV namespace) as `kv`
 *   - Local dev: pass nothing, uses in-memory store
 *
 * @example
 *   // In Astro API route (Cloudflare):
 *   export async function GET({ platform }) {
 *     const store = createStore(platform?.env?.PREVIEWS);
 *     const claims = store.getClaims();
 *   }
 */

const KV_PREFIX = 'peek:';

function kvKey(key) {
  return `${KV_PREFIX}${key}`;
}

// ─── In-memory fallback (local dev) ───────────────────────────────────────────

let _memClaims = [];
let _memOptouts = new Set();

const memStore = {
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

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * @param {KVNamespace|object|null} kv — Cloudflare KV or in-memory fallback
 */
export function createStore(kv) {
  const store = kv || memStore;

  return {
    /**
     * @returns {{ businessName: string, email: string, claimedAt: string }[]}
     */
    async getClaims() {
      const raw = await store.get(kvKey('claims'));
      if (!raw) return [];
      try { return JSON.parse(raw); } catch { return []; }
    },

    /**
     * @returns {string[]}
     */
    async getOptouts() {
      const raw = await store.get(kvKey('optouts'));
      if (!raw) return [];
      try { return JSON.parse(raw); } catch { return []; }
    },

    /**
     * @param {string} businessName
     * @param {string} email
     */
    async addClaim(businessName, email) {
      const claims = await this.getClaims();
      // Avoid duplicates by email+business
      if (!claims.find(c => c.businessName === businessName && c.email === email)) {
        claims.push({ businessName, email, claimedAt: new Date().toISOString() });
        await store.put(kvKey('claims'), JSON.stringify(claims));
      }
      return { ok: true };
    },

    /**
     * @param {string} businessName
     */
    async addOptout(businessName) {
      const optouts = await this.getOptouts();
      if (!optouts.includes(businessName)) {
        optouts.push(businessName);
        await store.put(kvKey('optouts'), JSON.stringify(optouts));
      }
      return { ok: true };
    },

    /**
     * @param {string} businessName
     * @returns {boolean}
     */
    async isOptedOut(businessName) {
      const optouts = await this.getOptouts();
      return optouts.includes(businessName);
    },
  };
}

// ─── Legacy compat shims (use createStore instead) ──────────────────────────

/** @deprecated Use createStore().addClaim() */
export async function addClaim(businessName, email) {
  return createStore().addClaim(businessName, email);
}

/** @deprecated Use createStore().addOptout() */
export async function addOptout(businessName) {
  return createStore().addOptout(businessName);
}

/** @deprecated Use createStore().isOptedOut() */
export async function isOptedOut(businessName) {
  return createStore().isOptedOut(businessName);
}

/** @deprecated */
export async function getStore() {
  return createStore().getClaims();
}

/** @deprecated */
export async function saveStore() {}
