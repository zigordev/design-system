import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';
import { ownedTokens, tokenIds } from './owned-tokens.ts';

const resolver = new URL('../tokens/resolver.json', import.meta.url);

describe('tokenIds', () => {
  it('lists the dotted id of every token and skips $ properties', () => {
    const document = {
      $description: 'skipped',
      color: { $type: 'color', bg: { page: { $value: '{color.scale.neutral.2}' } } },
      size: { $value: { value: 1, unit: 'px' } },
    };
    expect(tokenIds(document)).toEqual(['color.bg.page', 'size']);
  });

  it('finds nothing in a value that is not a group', () => {
    expect(tokenIds(null)).toEqual([]);
    expect(tokenIds(['not', 'a', 'group'])).toEqual([]);
  });
});

describe('ownedTokens', () => {
  const owned = ownedTokens(resolver);

  it('finds the one modifier of the resolver', () => {
    expect(Object.keys(owned)).toEqual(['mode']);
  });

  it('gives every token to one modifier only', () => {
    const all = Object.values(owned).flat();
    expect(new Set(all).size).toBe(all.length);
  });

  it('gives the mode the tokens its context files declare and nothing from the base', () => {
    expect(owned.mode).toEqual(
      expect.arrayContaining(['color.scale.neutral.12', 'color.bg.page', 'color.focus.ring'])
    );
    expect(owned.mode).not.toContain('radius.button');
    expect(owned.mode).not.toContain('color.fg.muted');
  });

  it('reads contexts written inline in the resolver as well as referenced files', () => {
    const directory = mkdtempSync(join(tmpdir(), 'owned-tokens-'));
    const file = join(directory, 'resolver.json');
    const inline = {
      modifiers: {
        size: { contexts: { small: [{ gap: { $type: 'dimension', $value: '4px' } }] } },
      },
    };
    writeFileSync(file, JSON.stringify(inline));
    expect(ownedTokens(pathToFileURL(file))).toEqual({ size: ['gap'] });
  });

  it('finds no modifiers in a resolver without any', () => {
    const directory = mkdtempSync(join(tmpdir(), 'owned-tokens-'));
    const file = join(directory, 'resolver.json');
    writeFileSync(file, JSON.stringify({ sets: {} }));
    expect(ownedTokens(pathToFileURL(file))).toEqual({});
  });
});
