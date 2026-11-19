import { describe, expect, it } from 'vitest';
import { contrast, fitChroma, ink, inSrgb, swatch, white } from './color.ts';

const black = { l: 0, c: 0, h: 0 };

describe('contrast', () => {
  it('is 21:1 between white and black', () => {
    expect(contrast({ l: 1, c: 0, h: 0 }, black)).toBeCloseTo(21, 1);
  });

  it('gives the same ratio in either order', () => {
    const blue = { l: 0.52, c: 0.18, h: 270 };
    expect(contrast(blue, white)).toBeCloseTo(contrast(white, blue), 10);
  });
});

describe('fitChroma', () => {
  it('keeps a chroma that is already inside sRGB', () => {
    expect(fitChroma(0.6, 0.05, 250)).toBe(0.05);
  });

  it('reduces an out-of-gamut chroma to the sRGB boundary', () => {
    const chroma = fitChroma(0.9, 0.3, 150);
    expect(chroma).toBeLessThan(0.3);
    expect(inSrgb({ l: 0.9, c: chroma, h: 150 })).toBe(true);
    expect(inSrgb({ l: 0.9, c: chroma + 0.01, h: 150 })).toBe(false);
  });
});

describe('swatch', () => {
  it('rounds the coordinates and adds a six-digit hex fallback', () => {
    const result = swatch({ l: 0.520004, c: 0.18, h: 270.004 });
    expect(result).toMatchObject({ l: 0.52, h: 270 });
    expect(result.hex).toMatch(/^#[0-9a-f]{6}$/);
  });

  it('stays inside sRGB when the requested chroma is out of gamut', () => {
    const result = swatch({ l: 0.95, c: 0.4, h: 140 });
    expect(inSrgb(result)).toBe(true);
  });
});

describe('ink', () => {
  it('is a near-black in the hue it is given', () => {
    expect(ink(150)).toEqual({ l: 0.2, c: 0.02, h: 150 });
  });
});
