import { readFileSync } from 'node:fs';
import { products } from '@zigordev/tokens';
import { describe, expect, it } from 'vitest';
import { tokensCss } from '../../scripts/tokens.ts';
import { emailTheme, hex, parseBlocks, pixels, renderThemes, resolve } from './themes.ts';

const sample = `@layer ds.tokens {
  :root { --ds-a: var(--ds-b); --ds-b: 1rem; }
  :root[data-product="gpool"] { --ds-b: 2px; }
  @media (prefers-color-scheme: dark) {
    :root:not([data-mode="light"]) { --ds-b: 9px; }
  }
}`;

describe('parseBlocks', () => {
  it('reads the declarations of each root block and skips nested media rules', () => {
    const blocks = parseBlocks(sample);
    expect(blocks.get(':root')).toEqual({ '--ds-a': 'var(--ds-b)', '--ds-b': '1rem' });
    expect(blocks.get(':root[data-product="gpool"]')).toEqual({ '--ds-b': '2px' });
    expect(blocks.size).toBe(2);
  });
});

describe('resolve', () => {
  it('follows var() references', () => {
    expect(resolve('--ds-a', { '--ds-a': 'var(--ds-b)', '--ds-b': '4px' })).toBe('4px');
  });

  it('fails on a missing or circular token', () => {
    expect(() => resolve('--ds-x', {})).toThrow('--ds-x is not defined');
    expect(() => resolve('--ds-a', { '--ds-a': 'var(--ds-a)' })).toThrow('circular');
  });
});

describe('hex and pixels', () => {
  it('turns colours into hex and lengths into pixels', () => {
    expect(hex('oklch(100% 0 0)')).toBe('#ffffff');
    expect(pixels('0.25rem')).toBe('4px');
    expect(pixels('9999px')).toBe('9999px');
    expect(() => pixels('1em')).toThrow('not a rem or px length');
  });
});

describe('emailTheme', () => {
  it('gives each product its accent and radius from the tokens', () => {
    const cv = emailTheme(tokensCss, 'cv');
    const gpool = emailTheme(tokensCss, 'gpool');
    expect(cv.colors.accent).toMatch(/^#[0-9a-f]{6}$/);
    expect(gpool.colors.accent).not.toBe(cv.colors.accent);
    expect(cv.radius.button).toBe('4px');
    expect(gpool.radius.button).toBe('9999px');
    expect(cv.width).toBe('640px');
  });
});

describe('the generated themes', () => {
  it('match the built tokens, so run pnpm --filter @zigordev/email run generate', () => {
    const generated = readFileSync(new URL('../generated/themes.ts', import.meta.url), 'utf8');
    expect(generated).toBe(renderThemes(tokensCss, products));
  });
});
