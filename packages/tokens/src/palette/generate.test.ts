import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { generatedFiles, scaleAliases, serialize } from './generate.ts';
import { ramps } from './seeds.ts';

interface ScaleDocument {
  color: { scale: Record<string, Record<string, { $value: string }>> };
}

describe('generated token files', () => {
  it.each(Object.entries(generatedFiles()))(
    '%s matches what the generator writes',
    (name, document) => {
      const committed = readFileSync(
        new URL(`../tokens/generated/${name}`, import.meta.url),
        'utf8'
      );
      expect(committed).toBe(serialize(document));
    }
  );
});

describe('scaleAliases', () => {
  it('aliases the twelve steps and the text colour of every ramp to the palette of its mode', () => {
    const document = scaleAliases('dark') as ScaleDocument;
    for (const ramp of ramps) {
      const group = document.color.scale[ramp] ?? {};
      expect(Object.keys(group)).toHaveLength(13);
      expect(group['9']?.$value).toBe(`{color.palette.${ramp}.dark.9}`);
      expect(group.on?.$value).toBe(`{color.palette.${ramp}.dark.on}`);
    }
  });
});

describe('serialize', () => {
  it('writes two-space JSON ending in a newline', () => {
    expect(serialize({ a: 1 })).toBe('{\n  "a": 1\n}\n');
  });
});
