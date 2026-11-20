import type { Mode } from '../index.ts';
import type { Oklch } from './color.ts';
import type { RampOverrides } from './ramp.ts';

export const brandRamps = ['accent', 'neutral'] as const;
export const statusRamps = ['danger', 'success', 'warning', 'info'] as const;
export const ramps = [...brandRamps, ...statusRamps] as const;

export type BrandRamp = (typeof brandRamps)[number];
export type StatusRamp = (typeof statusRamps)[number];
export type RampName = (typeof ramps)[number];

export type ModeOverrides = Partial<Record<Mode, RampOverrides>>;

export interface RampSeed {
  seed: Oklch;
  overrides?: ModeOverrides;
}

function darkSurfaces(lightness: number[], chroma: number): RampOverrides {
  const overrides: RampOverrides = {};
  lightness.forEach((l, index) => {
    overrides[(index + 1) as keyof RampOverrides] = { l, c: chroma + index * 0.0015 };
  });
  return overrides;
}

function brightDarkText(seed: Oklch, share: number): ModeOverrides {
  return { dark: { 11: { l: 0.8, c: seed.c * share } } };
}

const anthracite: Oklch = { l: 0.56, c: 0.024, h: 215 };
const lavender: Oklch = { l: 0.76, c: 0.12, h: 295 };

export const brandSeeds: Record<BrandRamp, RampSeed> = {
  accent: { seed: lavender, overrides: brightDarkText(lavender, 0.85) },
  neutral: {
    seed: anthracite,
    overrides: { dark: darkSurfaces([0.255, 0.285, 0.315, 0.345, 0.375, 0.415, 0.47], 0.013) },
  },
};

const danger: Oklch = { l: 0.6, c: 0.2, h: 18 };
const success: Oklch = { l: 0.64, c: 0.15, h: 155 };
const warning: Oklch = { l: 0.82, c: 0.15, h: 90 };
const info: Oklch = { l: 0.64, c: 0.13, h: 245 };

export const statusSeeds: Record<StatusRamp, RampSeed> = {
  danger: { seed: danger, overrides: brightDarkText(danger, 0.75) },
  success: { seed: success, overrides: brightDarkText(success, 0.75) },
  warning: { seed: warning, overrides: brightDarkText(warning, 0.75) },
  info: { seed: info, overrides: brightDarkText(info, 0.75) },
};

export const statusInkHue = 270;
