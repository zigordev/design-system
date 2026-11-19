import Color from 'colorjs.io';

export interface Oklch {
  l: number;
  c: number;
  h: number;
}

export interface Swatch extends Oklch {
  hex: string;
}

export const white: Oklch = { l: 0.995, c: 0, h: 0 };

export function ink(hue: number): Oklch {
  return { l: 0.2, c: 0.02, h: hue };
}

function toColor({ l, c, h }: Oklch): Color {
  return new Color('oklch', [l, c, h]);
}

export function inSrgb(color: Oklch): boolean {
  return toColor(color).inGamut('srgb');
}

export function fitChroma(l: number, c: number, h: number): number {
  if (inSrgb({ l, c, h })) return c;
  let low = 0;
  let high = c;
  for (let i = 0; i < 24; i++) {
    const mid = (low + high) / 2;
    if (inSrgb({ l, c: mid, h })) low = mid;
    else high = mid;
  }
  return low;
}

export function contrast(a: Oklch, b: Oklch): number {
  return toColor(a).contrast(toColor(b), 'WCAG21');
}

function floorTo(value: number, digits: number): number {
  const factor = 10 ** digits;
  return Math.floor(value * factor + 1e-9) / factor;
}

function roundTo(value: number, digits: number): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export function swatch(color: Oklch): Swatch {
  const l = roundTo(color.l, 4);
  const h = roundTo(color.h, 2);
  const c = floorTo(fitChroma(l, color.c, h), 4);
  const hex = toColor({ l, c, h }).to('srgb').toString({ format: 'hex', collapse: false });
  return { l, c, h, hex };
}
