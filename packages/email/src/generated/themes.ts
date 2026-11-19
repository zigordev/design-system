import type { EmailTheme } from '../build/themes.ts';

export const themes = {
  "cv": {
    "colors": {
      "page": "#f9f9fa",
      "raised": "#fcfdfd",
      "text": "#24262c",
      "muted": "#696d78",
      "border": "#d8dadf",
      "accent": "#435bcf",
      "accentOn": "#fdfdfd",
      "accentText": "#4c65cc"
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
  },
  "gpool": {
    "colors": {
      "page": "#f8f9f8",
      "raised": "#fcfdfc",
      "text": "#222823",
      "muted": "#647066",
      "border": "#d6dcd7",
      "accent": "#008643",
      "accentOn": "#fdfdfd",
      "accentText": "#007e3f"
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
      "button": "9999px",
      "card": "20px"
    },
    "width": "640px"
  },
  "trading-bot": {
    "colors": {
      "page": "#f8f9fa",
      "raised": "#fcfdfd",
      "text": "#22272d",
      "muted": "#646e7b",
      "border": "#d6dae0",
      "accent": "#0078be",
      "accentOn": "#fdfdfd",
      "accentText": "#0072b4"
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
  }
} satisfies Record<string, EmailTheme>;
