export const modes = ['light', 'dark'] as const;

export type Mode = (typeof modes)[number];

export interface Theme {
  mode: Mode;
}

export const defaultTheme: Theme = {
  mode: 'dark',
};

export const themeAttributes = {
  mode: 'data-mode',
} as const satisfies Record<keyof Theme, string>;
