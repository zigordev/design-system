import type { Mode, Product } from '../index.ts';
import type { Oklch } from './color.ts';
import type { RampOverrides } from './ramp.ts';

export const productRamps = ['accent', 'second', 'neutral'] as const;
export const statusRamps = ['danger', 'success', 'warning', 'info'] as const;
export const ramps = [...productRamps, ...statusRamps] as const;

export type ProductRamp = (typeof productRamps)[number];
export type StatusRamp = (typeof statusRamps)[number];
export type RampName = (typeof ramps)[number];

export type ModeOverrides = Partial<Record<Mode, RampOverrides>>;

export interface ProductSeeds {
  accent: Oklch;
  second: Oklch;
  neutral: Oklch;
  overrides?: Partial<Record<ProductRamp, ModeOverrides>>;
}

const inkBlue: Oklch = { l: 0.52, c: 0.18, h: 270 };
const electricBlue: Oklch = { l: 0.6, c: 0.17, h: 245 };

export const productSeeds: Record<Product, ProductSeeds> = {
  cv: {
    accent: inkBlue,
    second: inkBlue,
    neutral: { l: 0.56, c: 0.02, h: 270 },
  },
  gpool: {
    accent: { l: 0.56, c: 0.16, h: 152 },
    second: { l: 0.62, c: 0.18, h: 45 },
    neutral: { l: 0.56, c: 0.024, h: 150 },
  },
  'trading-bot': {
    accent: electricBlue,
    second: electricBlue,
    neutral: { l: 0.56, c: 0.026, h: 255 },
  },
};

export const statusSeeds: Record<StatusRamp, Oklch> = {
  danger: { l: 0.58, c: 0.19, h: 27 },
  success: { l: 0.58, c: 0.14, h: 150 },
  warning: { l: 0.74, c: 0.15, h: 75 },
  info: { l: 0.58, c: 0.13, h: 240 },
};

export const statusInkHue = 270;
