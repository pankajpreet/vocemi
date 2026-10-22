const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

const hits = new Map<string, number[]>();

/** True when the caller is still inside the limit. */
export function rateLimit(key: string, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}
