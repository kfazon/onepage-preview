/**
 * Simple JSON-based store for claims and opt-outs.
 * For MVP only — production needs Cloudflare KV or a real DB.
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const STORE_FILE = resolve(process.cwd(), 'data/previews.json');

function ensureStore() {
  const dir = resolve(process.cwd(), 'data');
  if (!existsSync(dir)) {
    import('fs').then(({ mkdirSync }) => mkdirSync(dir, { recursive: true }));
  }
  if (!existsSync(STORE_FILE)) {
    writeFileSync(STORE_FILE, JSON.stringify({ claims: [], optouts: [] }, null, 2));
  }
}

export function getStore() {
  ensureStore();
  try {
    return JSON.parse(readFileSync(STORE_FILE, 'utf-8'));
  } catch {
    return { claims: [], optouts: [] };
  }
}

export function saveStore(data) {
  ensureStore();
  writeFileSync(STORE_FILE, JSON.stringify(data, null, 2));
}

/**
 * @param {string} businessName
 * @param {string} email
 */
export function addClaim(businessName, email) {
  const store = getStore();
  store.claims.push({
    businessName,
    email,
    claimedAt: new Date().toISOString(),
  });
  saveStore(store);
  return { ok: true };
}

/**
 * @param {string} businessName
 */
export function addOptout(businessName) {
  const store = getStore();
  if (!store.optouts.includes(businessName)) {
    store.optouts.push(businessName);
    saveStore(store);
  }
  return { ok: true };
}

/**
 * @param {string} businessName
 * @returns boolean
 */
export function isOptedOut(businessName) {
  const store = getStore();
  return store.optouts.includes(businessName);
}
