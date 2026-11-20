import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { tokensCss } from '../../scripts/tokens.ts';
import { emailTheme, hex, parseBlocks, pixels, renderTheme, resolve } from './themes.ts';

const sample = `@layer ds.tokens {
  :root { --ds-a: var(--ds-b); --ds-b: 1rem; }
  :root[data-mode="light"] { --ds-b: 2px; }
  @media (prefers-color-scheme: light) {
    :root[data-mode="system"] { --ds-b: 9px; }
  }
}`;

describe('parseBlocks', () => {
  it('reads the declarations of every root block, including those inside media queries', () => {
    const blocks = parseBlocks(sample);
    expect(blocks.get(':root')).toEqual({ '--ds-a': 'var(--ds-b)', '--ds-b': '1rem' });
    expect(blocks.get(':root[data-mode="light"]')).toEqual({ '--ds-b': '2px' });
    expect(blocks.get(':root[data-mode="system"]')).toEqual({ '--ds-b': '9px' });
    expect(blocks.size).toBe(3);
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

function lightness(colour: string): number {
  return Number.parseInt(colour.slice(1, 3), 16);
}

describe('emailTheme', () => {
  it('takes the light mode of the brand from the tokens', () => {
    const theme = emailTheme(tokensCss);
    expect(theme.colors.accent).toMatch(/^#[0-9a-f]{6}$/);
    expect(lightness(theme.colors.page)).toBeGreaterThan(lightness(theme.colors.text));
    expect(theme.radius.button).toBe('4px');
    expect(theme.radius.card).toBe('6px');
    expect(theme.width).toBe('640px');
  });
});

describe('the generated theme', () => {
  it('matches the built tokens, so run pnpm --filter @zigordev/email run generate', () => {
    const generated = readFileSync(new URL('../generated/theme.ts', import.meta.url), 'utf8');
    expect(generated).toBe(renderTheme(tokensCss));
  });
});
