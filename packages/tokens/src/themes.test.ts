import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineConfig, parse, type Resolver, type TokenNormalizedSet } from '@terrazzo/parser';
import { beforeAll, describe, expect, it } from 'vitest';
import {
  type Contrast,
  contrasts,
  defaultTheme,
  modes,
  products,
  themeAttributes,
} from './index.ts';
import { contrast, type Oklch } from './palette/color.ts';

const resolverFile = new URL('./tokens/resolver.json', import.meta.url);
const statuses = ['danger', 'success', 'warning', 'info'] as const;
const coloured = ['accent', 'second', ...statuses] as const;
const surfaces = ['color.bg.page', 'color.bg.raised', 'color.bg.sunken', 'color.bg.field'];

const minimums: Record<Contrast, { text: number; border: number }> = {
  standard: { text: 4.5, border: 3 },
  high: { text: 7, border: 4.5 },
};

type Pair = [foreground: string, background: string, minimum: number];

function pairs(level: Contrast): Pair[] {
  const { text, border } = minimums[level];
  const result: Pair[] = [];
  for (const surface of surfaces) {
    result.push(['color.fg.default', surface, text], ['color.fg.muted', surface, text]);
    result.push(['color.border.field', surface, border]);
    for (const colour of coloured) {
      result.push([`color.${colour}.text`, surface, text]);
      result.push([`color.${colour}.border-strong`, surface, border]);
    }
  }
  result.push(['color.neutral.on', 'color.neutral.solid', 4.5]);
  result.push(['color.neutral.on', 'color.neutral.solid-hover', 4.5]);
  for (const colour of coloured) {
    result.push([`color.${colour}.on`, `color.${colour}.solid`, 4.5]);
    result.push([`color.${colour}.on`, `color.${colour}.solid-hover`, 4.5]);
    result.push([`color.${colour}.text`, `color.${colour}.soft`, text]);
  }
  result.push(
    ['color.fg.default', 'color.bg.hover', text],
    ['color.fg.inverse', 'color.bg.inverse', text],
    ['color.focus.ring', 'color.bg.page', border],
    ['color.focus.ring', 'color.bg.raised', border]
  );
  return result;
}

function colourOf(tokens: TokenNormalizedSet, id: string): Oklch {
  const value = tokens[id]?.$value as { colorSpace?: string; components?: number[] } | undefined;
  if (value?.colorSpace !== 'oklch' || !value.components) {
    throw new Error(`${id} does not resolve to an oklch colour`);
  }
  const [l = 0, c = 0, h = 0] = value.components;
  return { l, c, h };
}

let resolver: Resolver;

beforeAll(async () => {
  const config = defineConfig(
    { tokens: [fileURLToPath(resolverFile)] },
    { cwd: new URL('../', import.meta.url) }
  );
  const result = await parse(
    [{ filename: resolverFile, src: await readFile(resolverFile, 'utf8') }],
    { config, req: (source) => readFile(fileURLToPath(source), 'utf8'), skipLint: true }
  );
  resolver = result.resolver;
});

describe('resolver', () => {
  it('is orthogonal, so each modifier can be emitted on its own', () => {
    expect(resolver.orthogonal).toBe(true);
  });

  it('defaults to the documented theme', () => {
    expect(resolver.inputDefault).toEqual(defaultTheme);
  });

  it('names its modifiers after the theme attributes', () => {
    expect(Object.keys(resolver.source.modifiers ?? {}).sort()).toEqual(
      Object.keys(themeAttributes).sort()
    );
  });
});

const themes = products.flatMap((product) =>
  modes.flatMap((mode) => contrasts.map((level) => ({ product, mode, contrast: level })))
);

describe.each(themes)('$product, $mode, $contrast contrast', (theme) => {
  it('meets WCAG 2.2 for every text, border and focus pairing', () => {
    const tokens = resolver.apply(theme);
    const failures = pairs(theme.contrast)
      .map(([foreground, background, minimum]) => {
        const ratio = contrast(colourOf(tokens, foreground), colourOf(tokens, background));
        return { foreground, background, minimum, ratio: Number(ratio.toFixed(2)) };
      })
      .filter(({ ratio, minimum }) => ratio < minimum);
    expect(failures).toEqual([]);
  });
});
