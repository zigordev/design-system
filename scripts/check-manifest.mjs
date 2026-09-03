#!/usr/bin/env node
/**
 * Verifies `_ds_manifest.json` against what is actually on disk.
 *
 * This repository has no build and no dependencies, so the usual CI — compile,
 * lint, test — has nothing to bite on. The failure mode it does have is drift:
 * a component is added, renamed or deleted and the manifest is not updated, so
 * consumers vendoring the design system get a manifest that points at a file
 * that no longer exists. That is what this checks.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const manifest = JSON.parse(readFileSync(join(root, '_ds_manifest.json'), 'utf8'));

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.(jsx|tsx)$/.test(entry)) out.push(relative(root, full));
  }
  return out;
}

const declared = new Set((manifest.components ?? []).map((c) => c.sourcePath));
const onDisk = new Set(walk(join(root, 'components')));

const missing = [...declared].filter((p) => !onDisk.has(p)).sort();
const undeclared = [...onDisk].filter((p) => !declared.has(p)).sort();

for (const p of missing) console.error(`manifest declares a component that does not exist: ${p}`);
for (const p of undeclared) console.error(`component on disk is not in the manifest: ${p}`);

if (missing.length || undeclared.length) {
  console.error(`\n${missing.length + undeclared.length} manifest problem(s).`);
  process.exit(1);
}

const entries = (manifest.components ?? []).length;
// Entries and files differ legitimately: a file may export more than one
// component (Toast and ToastRegion share Toast.jsx), so both counts are shown
// rather than one being asserted against the other.
console.log(`manifest matches disk: ${entries} components across ${declared.size} files.`);
