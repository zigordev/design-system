# @zigordev/tokens

The design tokens for zigordev apps. The source is DTCG 2025.10 JSON with a resolver for four theme dimensions: product, mode, density and contrast. Terrazzo builds it into CSS custom properties.

## Use

Most apps get the tokens through `@zigordev/css`, which bundles them. Install this package directly for the theme names in TypeScript or for the tokens CSS on its own:

```ts
import { defaultTheme, products, themeAttributes, type Product } from '@zigordev/tokens';
```

```css
@import "@zigordev/tokens/tokens.css";
```

| Export                                            | Holds                                                                                           |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `products`, `modes`, `densities`, `contrasts`     | The values of each theme dimension                                                              |
| `Product`, `Mode`, `Density`, `Contrast`, `Theme` | Their types                                                                                     |
| `defaultTheme`                                    | The theme that applies when no attribute is set                                                 |
| `themeAttributes`                                 | The root attribute for each dimension, such as `data-product`                                   |
| `tokens.css`                                      | Every token as a `--ds-*` custom property, with a block per product, mode, density and contrast |

## How the colours are made

Each product gives one seed colour per ramp in `src/palette/seeds.ts`. The generator builds twelve OKLCH steps per ramp and mode, placing the borders, solid fills and text steps by WCAG contrast targets, and writes them to `src/tokens/generated/`. A step can be overridden by hand; the theme tests still check every pairing.
