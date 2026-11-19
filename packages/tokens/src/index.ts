export const products = ['cv', 'gpool', 'trading-bot'] as const;
export const modes = ['light', 'dark'] as const;
export const densities = ['comfortable', 'compact'] as const;
export const contrasts = ['standard', 'high'] as const;

export type Product = (typeof products)[number];
export type Mode = (typeof modes)[number];
export type Density = (typeof densities)[number];
export type Contrast = (typeof contrasts)[number];

export interface Theme {
  product: Product;
  mode: Mode;
  density: Density;
  contrast: Contrast;
}

export const defaultTheme: Theme = {
  product: 'cv',
  mode: 'light',
  density: 'comfortable',
  contrast: 'standard',
};

export const themeAttributes = {
  product: 'data-product',
  mode: 'data-mode',
  density: 'data-density',
  contrast: 'data-contrast',
} as const satisfies Record<keyof Theme, string>;
