#!/usr/bin/env node
/**
 * Regenerates the derivable half of `_ds_manifest.json` from what is on disk.
 *
 * The manifest used to be written by hand and checked by a separate script.
 * That check compared filenames only, so it could not see the fields nobody
 * was validating: `tokens/breakpoints.css` was missing from `globalCssPaths`
 * and five custom properties were absent from `tokens`, including the whole
 * of breakpoints.css.
 *
 * Deriving those fields removes the class of error rather than reporting it.
 * The remaining fields are authored — a viewport or a card subtitle cannot be
 * read off disk — so they are carried through untouched.
 *
 *   node scripts/generate-manifest.mjs           # rewrite the manifest
 *   node scripts/generate-manifest.mjs --check   # exit 1 if it would change
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const manifestPath = join(root, '_ds_manifest.json');
const current = JSON.parse(readFileSync(manifestPath, 'utf8'));

/** Token `kind` follows the file it is declared in. */
const KIND_BY_FILE = {
  'tokens/colors.css': 'color',
  'tokens/typography.css': 'font',
  'tokens/spacing.css': 'spacing',
  'tokens/radius.css': 'radius',
  'tokens/shadow.css': 'shadow',
  'tokens/motion.css': 'other',
  'tokens/breakpoints.css': 'other',
};

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir).sort()) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.(jsx|tsx)$/.test(entry)) out.push(relative(root, full));
  }
  return out;
}

/**
 * Named after what the file exports, not after the file. Three of them export
 * more than one component — Table alone exports four — and the manifest has
 * always listed those separately. Deriving the name from the filename would
 * silently drop them, which is how a manifest ends up describing fewer
 * components than the package actually ships.
 */
const components = walk(join(root, 'components')).flatMap((sourcePath) => {
  const src = readFileSync(join(root, sourcePath), 'utf8');
  const exported = [...src.matchAll(/^export\s+(?:function|const)\s+([A-Z][A-Za-z0-9]*)/gm)].map((m) => m[1]);
  return exported.map((name) => ({ name, sourcePath }));
});

/**
 * `styles.css` is the entry point, so its @import order is the real order.
 * A token file that stops being imported also stops being a global path,
 * which is the behaviour worth encoding.
 */
const stylesheet = readFileSync(join(root, 'styles.css'), 'utf8');
const imported = [...stylesheet.matchAll(/@import\s+["']\.\/([^"']+)["']/g)].map((m) => m[1]);
const globalCssPaths = [...imported, 'styles.css'];

/**
 * Both declarations of a token are recorded, not just the first: colors.css
 * defines each one under `:root` and again under the dark selector, and the
 * manifest has always carried both values.
 */
const tokens = [];
for (const path of imported) {
  const css = readFileSync(join(root, path), 'utf8');
  for (const m of css.matchAll(/^\s*(--ds-[A-Za-z0-9_-]+)\s*:\s*([^;]+);/gm)) {
    tokens.push({
      name: m[1],
      value: m[2].trim(),
      kind: KIND_BY_FILE[path] ?? 'other',
      definedIn: path,
    });
  }
}

// Authored fields cannot be read off disk, so they survive as-is.
const next = { ...current, components, globalCssPaths, tokens };
const serialised = `${JSON.stringify(next, null, 2)}\n`;

if (process.argv.includes('--check')) {
  if (serialised === readFileSync(manifestPath, 'utf8')) {
    console.log(`_ds_manifest.json is up to date (${components.length} components, ${tokens.length} tokens).`);
    process.exit(0);
  }
  console.error('_ds_manifest.json is stale. Run: node scripts/generate-manifest.mjs');
  process.exit(1);
}

writeFileSync(manifestPath, serialised);
console.log(`wrote _ds_manifest.json (${components.length} components, ${tokens.length} tokens)`);
