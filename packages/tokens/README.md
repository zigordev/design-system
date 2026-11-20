# @zigordev/tokens

The design tokens for zigordev apps: one brand, a lavender accent on an anthracite base, in light and dark mode. The source is DTCG 2025.10 JSON with a resolver whose only modifier is the mode. Terrazzo builds it into CSS custom properties.

## Use

Most apps get the tokens through `@zigordev/css`, which bundles them. Install this package directly for the mode names in TypeScript or for the tokens CSS on its own:

```ts
import { defaultTheme, modes, themeAttributes, type Mode } from '@zigordev/tokens';
```

```css
@import "@zigordev/tokens/tokens.css";
```

| Export            | Holds                                                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `modes`           | The modes, `light` and `dark`                                                                                                                                |
| `Mode`, `Theme`   | Their types                                                                                                                                                  |
| `defaultTheme`    | The theme that applies when no attribute is set: dark                                                                                                        |
| `themeAttributes` | The root attribute for the mode, `data-mode`                                                                                                                 |
| `tokens.css`      | Every token as a `--ds-*` custom property: dark on `:root`, light under `data-mode="light"`, and light under `data-mode="system"` when the system prefers it |

## How the colours are made

The brand has one seed colour for the accent and one for the neutral, and each status colour has its own, in `src/palette/seeds.ts`. The generator builds twelve OKLCH steps per ramp and mode, placing the borders, solid fills and text steps by WCAG contrast targets, and writes them to `src/tokens/generated/`. A step can be overridden by hand; the theme tests still check every pairing. The accents considered for the brand, with their seeds, are in ADR 0014.
