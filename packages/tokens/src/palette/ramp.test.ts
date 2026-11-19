import { describe, expect, it } from 'vitest';
import { modes } from '../index.ts';
import { contrast, type Oklch, swatch, white } from './color.ts';
import { createRamp, type Ramp, search, surfacesOf, targets } from './ramp.ts';
import { productSeeds, statusSeeds } from './seeds.ts';

const seeds: [string, Oklch][] = [
  ...Object.entries(productSeeds).flatMap(([product, seed]): [string, Oklch][] => [
    [`${product} accent`, seed.accent],
    [`${product} second`, seed.second],
    [`${product} neutral`, seed.neutral],
  ]),
  ...Object.entries(statusSeeds),
];

function step(ramp: Ramp, number: number): Oklch {
  const value = ramp.steps[number - 1];
  if (!value) throw new Error(`Step ${number} is missing`);
  return value;
}

function weakest(ramp: Ramp, number: number): number {
  return Math.min(...surfacesOf(ramp).map((surface) => contrast(step(ramp, number), surface)));
}

describe.each(modes)('createRamp in %s mode', (mode) => {
  it.each(seeds)('meets every contrast target for %s', (_, seed) => {
    const ramp = createRamp(seed, mode, { inkHue: 270 });
    expect(ramp.steps).toHaveLength(12);
    expect(weakest(ramp, 8)).toBeGreaterThanOrEqual(targets.border);
    expect(contrast(ramp.on, step(ramp, 9))).toBeGreaterThanOrEqual(targets.onSolid);
    expect(contrast(ramp.on, step(ramp, 10))).toBeGreaterThanOrEqual(targets.onSolid);
    expect(weakest(ramp, 11)).toBeGreaterThanOrEqual(targets.text);
    expect(weakest(ramp, 12)).toBeGreaterThanOrEqual(targets.strong);
  });

  it('keeps the backgrounds in order of lightness', () => {
    const ramp = createRamp(productSeeds.cv.neutral, mode, { inkHue: 270 });
    const lightness = ramp.steps.slice(0, 7).map((surface) => surface.l);
    const sorted = [...lightness].sort((a, b) => (mode === 'light' ? b - a : a - b));
    expect(lightness).toEqual(sorted);
  });
});

describe('createRamp', () => {
  it('puts white text on the product accents', () => {
    for (const mode of modes) {
      expect(createRamp(productSeeds.cv.accent, mode, { inkHue: 270 }).on).toMatchObject({
        l: white.l,
      });
    }
  });

  it('puts dark text on a light solid such as warning', () => {
    const ramp = createRamp(statusSeeds.warning, 'light', { inkHue: 270 });
    expect(ramp.on.l).toBeLessThan(0.3);
  });

  it('meets the text target against extra backgrounds it is given', () => {
    const grey = { l: 0.9, c: 0, h: 0 };
    const ramp = createRamp(productSeeds.gpool.accent, 'light', {
      inkHue: 150,
      backgrounds: [grey],
    });
    expect(contrast(step(ramp, 11), grey)).toBeGreaterThanOrEqual(targets.text);
  });

  it('applies a hand override to a step and recomputes the text colour on the solid', () => {
    const ramp = createRamp(productSeeds.cv.accent, 'light', {
      inkHue: 270,
      overrides: { 3: { l: 0.95 }, 9: { l: 0.8 } },
    });
    expect(step(ramp, 3).l).toBe(0.95);
    expect(step(ramp, 9).l).toBe(0.8);
    expect(ramp.on.l).toBeLessThan(0.3);
  });
});

describe('search', () => {
  it('fails when no lightness meets the target', () => {
    const make = (l: number) => swatch({ l, c: 0, h: 0 });
    expect(() => search(0.5, 1, make, () => false)).toThrow(/No lightness/);
  });
});
