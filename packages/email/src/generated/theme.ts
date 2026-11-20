import type { EmailTheme } from '../build/themes.ts';

export const theme = {
  "colors": {
    "page": "#f8f9fa",
    "raised": "#fcfdfd",
    "text": "#1f282a",
    "muted": "#5f7074",
    "border": "#d4dcdd",
    "accent": "#b7a1f5",
    "accentOn": "#0b181c",
    "accentText": "#7562a8"
  },
  "font": "\"Mona Sans Variable\", \"Mona Sans\", system-ui, -apple-system, \"Segoe UI\", \"Roboto\", sans-serif",
  "fontSize": {
    "sm": "13px",
    "md": "15px",
    "xl": "20px"
  },
  "space": {
    "sm": "8px",
    "md": "16px",
    "lg": "32px"
  },
  "radius": {
    "button": "4px",
    "card": "6px"
  },
  "width": "640px"
} satisfies EmailTheme;
