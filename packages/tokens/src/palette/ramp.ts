import type { Mode } from '../index.ts';
import { contrast, ink, type Oklch, type Swatch, swatch, white } from './color.ts';

export const stepNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export type StepNumber = (typeof stepNumbers)[number];
export type RampOverrides = Partial<Record<StepNumber, Partial<Oklch>>>;

export interface Ramp {
  steps: Swatch[];
  on: Swatch;
}

export interface RampOptions {
  inkHue: number;
  overrides?: RampOverrides;
  backgrounds?: Oklch[];
}

export const targets = {
  border: 3.1,
  text: 4.6,
  strong: 7.5,
  onSolid: 4.6,
} as const;

const curves: Record<Mode, { surfaces: number[]; chroma: number[] }> = {
  light: {
    surfaces: [0.993, 0.982, 0.962, 0.942, 0.918, 0.888, 0.845],
    chroma: [0.03, 0.06, 0.13, 0.2, 0.27, 0.35, 0.46, 0.64, 1, 1, 0.9, 0.55],
  },
  dark: {
    surfaces: [0.165, 0.2, 0.243, 0.275, 0.307, 0.348, 0.41],
    chroma: [0.1, 0.14, 0.26, 0.34, 0.4, 0.45, 0.52, 0.66, 1, 0.95, 0.72, 0.3],
  },
};

const lightnessStep = 0.0025;

const maxShiftForWhiteText = 0.12;

const strongStart: Record<Mode, number> = { light: 0.27, dark: 0.94 };

type Direction = 1 | -1;

function chromaFor(mode: Mode, step: StepNumber): number {
  return curves[mode].chroma[step - 1] ?? 1;
}

function at(seed: Oklch, mode: Mode, step: StepNumber, l: number): Swatch {
  return swatch({ l, c: seed.c * chromaFor(mode, step), h: seed.h });
}

function minContrast(color: Oklch, against: Oklch[]): number {
  return Math.min(...against.map((other) => contrast(color, other)));
}

export function search(
  start: number,
  direction: Direction,
  make: (l: number) => Swatch,
  accept: (candidate: Swatch) => boolean
): Swatch {
  let l = start;
  let candidate = make(l);
  while (!accept(candidate)) {
    l += direction * lightnessStep;
    if (l < 0 || l > 1) {
      throw new Error(`No lightness from ${start} meets the contrast target`);
    }
    candidate = make(l);
  }
  return candidate;
}

function textOn(solid: Oklch, inkHue: number): Oklch {
  const dark = ink(inkHue);
  return contrast(white, solid) >= contrast(dark, solid) ? white : dark;
}

function applyOverride(step: Swatch, override: Partial<Oklch> | undefined): Swatch {
  return override ? swatch({ ...step, ...override }) : step;
}

export function surfacesOf(ramp: Ramp): Swatch[] {
  return ramp.steps.slice(0, 3);
}

export function createRamp(
  seed: Oklch,
  mode: Mode,
  { inkHue, overrides = {}, backgrounds: extra = [] }: RampOptions
): Ramp {
  const light = mode === 'light';
  const towardContrast: Direction = light ? -1 : 1;
  const surfaces = curves[mode].surfaces.map((l, index) =>
    applyOverride(
      at(seed, mode, (index + 1) as StepNumber, l),
      overrides[(index + 1) as StepNumber]
    )
  );
  const backgrounds = [...surfaces.slice(0, 3), ...extra];

  const border = search(
    light ? 0.85 : 0.35,
    towardContrast,
    (l) => at(seed, mode, 8, l),
    (candidate) => minContrast(candidate, backgrounds) >= targets.border
  );

  const solidStart = light ? seed.l : Math.max(seed.l, 0.6);
  const darkText = ink(inkHue);
  const solidForWhite = search(
    solidStart,
    -1,
    (l) => at(seed, mode, 9, l),
    (candidate) => contrast(white, candidate) >= targets.onSolid
  );
  const whiteText = solidStart - solidForWhite.l <= maxShiftForWhiteText;
  const text = whiteText ? white : darkText;
  const awayFromText: Direction = whiteText ? -1 : 1;
  const solid = whiteText
    ? solidForWhite
    : search(
        solidStart,
        1,
        (l) => at(seed, mode, 9, l),
        (candidate) => contrast(darkText, candidate) >= targets.onSolid
      );
  const solidHover = search(
    solid.l + awayFromText * 0.04,
    awayFromText,
    (l) => at(seed, mode, 10, l),
    (candidate) => contrast(text, candidate) >= targets.onSolid
  );

  const muted = search(
    light ? 0.62 : 0.6,
    towardContrast,
    (l) => at(seed, mode, 11, l),
    (candidate) => minContrast(candidate, backgrounds) >= targets.text
  );
  const strong = search(
    strongStart[mode],
    towardContrast,
    (l) => at(seed, mode, 12, l),
    (candidate) => minContrast(candidate, backgrounds) >= targets.strong
  );

  const generated = [border, solid, solidHover, muted, strong];
  const steps = [
    ...surfaces,
    ...generated.map((step, index) => applyOverride(step, overrides[(index + 8) as StepNumber])),
  ];
  const finalSolid = steps[8] ?? solid;
  const on = overrides[9] ? textOn(finalSolid, inkHue) : text;
  return { steps, on: swatch(on) };
}
