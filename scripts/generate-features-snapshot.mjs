#!/usr/bin/env node
// Generate a snapshot from the `web-features` package.

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

async function main() {
  let mod;
  try {
    // prefer reading the json export directly
    mod = await import('web-features/data.json', { assert: { type: 'json' } });
  } catch {
    // fallback: load the cjs-like esm entry and rely on Node APIs (works in this script)
    mod = await import('web-features');
  }

  const data = mod.default ?? mod;
  // features is an object keyed by id in web-features
  const featuresObj = data.features ?? mod.features ?? {};
  const featureEntries = Object.entries(featuresObj);
  if (featureEntries.length === 0) {
    console.warn('[snapshot] No features found in web-features export. Structure may have changed.');
  }

  /** Minimal mapping id -> baseline status */
  const snapshot = {};
  for (const [id, f] of featureEntries) {
    if (!f || !id) continue;
    const status = f.status ?? {};
    const baseline = status.baseline ?? status.baselineStatus ?? null;
    snapshot[id] = baseline === 'widely' || baseline === 'newly' ? baseline : 'none';
  }

  const outPath = resolve('src/data/features.snapshot.json');
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, JSON.stringify(snapshot, null, 2) + '\n', 'utf8');
  console.log('[snapshot] Wrote', outPath, 'with', Object.keys(snapshot).length, 'entries');
}

main().catch((err) => {
  console.error('[snapshot] Unhandled error:', err);
  process.exit(1);
});


