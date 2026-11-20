# 0014. One brand on anthracite with a lavender accent

- Status: accepted
- Date: 2026-11-20
- Supersedes: 0002, 0004, and the per-product themes of 0013

## Context

Records 0002 and 0004 gave every product its own skin and four theme dimensions: product, mode, density and contrast. In practice the skins made the apps look unrelated, and the owner wants the opposite: one recognisable brand whose colours and shapes are the same in every app, with each app composing the shared components in its own way for its use case. The four dimensions also multiplied the test matrix to 15 Chromium themes, which made CI slow without testing anything the owner wants to keep.

The owner chose the base and the accent on 2026-11-20 from side-by-side previews of generated palettes on real components: anthracite over carbon, then lavender from a final four of copper, apricot, indigo and lavender.

## Decision

- One brand for every app. The palette generator has one brand seed for the accent and one for the neutral, and no second accent:
  - Accent: lavender, OKLCH `0.76 0.12 295`. Its solid takes dark labels at 8.1:1 in both modes.
  - Neutral: anthracite, OKLCH `0.56 0.024 215`, a blue-grey slate close to RAL 7016. In dark mode its seven surfaces are lifted to lightness 0.255 to 0.47 with a little more chroma, so the page reads as anthracite rather than black.
  - Status: danger `0.6 0.2 18`, success `0.64 0.15 155`, warning `0.82 0.15 90`, info `0.64 0.13 245`. In dark mode the text step of the accent and of each status colour sits at lightness 0.8, so links and status text stay vivid.
  - Shape and type: trading-bot's precise corners, 4 px on buttons and fields and 6 px on cards and dialogs, and Mona Sans headings at weight 700 and normal width.
- Mode is the only theme setting, and dark is the default. On the root element, no `data-mode` or `data-mode="dark"` is dark, `data-mode="light"` is light, and `data-mode="system"` follows the system's light or dark setting.
- The focus ring uses the accent's solid in dark mode and its text step in light mode, where the pale solid would fall below 3:1 on white.
- One density and one contrast level. WCAG 2.2 AA holds for every text, border, focus and chart pairing in both modes, checked by the theme tests.
- `@zigordev/email` inlines the light mode of the brand; mail clients decide dark mode.

## Consequences

- Every app looks like the same product family, and a change to the brand is one seed change for all of them.
- The Chromium story matrix drops from 15 themes to dark and light, so the test step runs in a fraction of its former time.
- Breaking changes for consumers: `@zigordev/tokens` no longer exports `products`, `densities`, `contrasts`, `Product`, `Density` or `Contrast`; the `data-product`, `data-density` and `data-contrast` attributes and the `--ds-color-second-*` tokens are gone; Badge loses its `second` tone; `@zigordev/email` loses EmailLayout's `product` prop and exports `theme` instead of `themes`. An app that followed the system mode by removing `data-mode` now sets `data-mode="system"`.
- People who turn on increased contrast in their system no longer get a stronger theme automatically. Every pairing still meets AA, and Windows forced-colours mode keeps working through the components' forced-colours rules.
- trading-bot's dense screens use the comfortable control sizes and get their density from layout instead of a token set.

## Alternatives considered

- Keep a skin per product (0002). Rejected by the owner: the brand should be recognisable across apps, and apps should differ in composition, not in colour or shape.
- Keep the density and contrast settings. Rejected to keep one tested look; AA is enforced by tests instead of by a second contrast level.
- Carbon instead of anthracite: OKLCH `0.56 0.007 255`, a nearly neutral grey with dark surfaces from lightness 0.2. It made every accent pop but felt colder and less characterful than anthracite.
- Other accents, kept here so the brand can switch later by changing `brandSeeds.accent` in `packages/tokens/src/palette/seeds.ts` and running `pnpm --filter @zigordev/tokens run generate` and `pnpm --filter @zigordev/email run generate`. The generator picks the label colour that passes 4.5:1, and the theme tests confirm every pairing. Ratios are on anthracite in dark mode.

  | Accent      | OKLCH seed      | Button label | Character                                                                  |
  | ----------- | --------------- | ------------ | -------------------------------------------------------------------------- |
  | Copper      | `0.62 0.14 52`  | white, 4.6:1 | Deep burnt orange, warm against the slate; no margin above the minimum.    |
  | Apricot     | `0.81 0.11 60`  | dark, 9.8:1  | Soft pastel orange, very legible, little pull on the main action.          |
  | Indigo      | `0.58 0.19 280` | white, 4.6:1 | Deep blue-violet, calm and serious; close to info blue in text and charts. |
  | Signal      | `0.7 0.19 47`   | dark, 6.3:1  | Pure orange, the most energetic; sits between warning and danger.          |
  | Tangerine   | `0.75 0.18 56`  | dark, 7.7:1  | Bright yellow-orange, friendly; close to warning yellow.                   |
  | Persimmon   | `0.66 0.2 40`   | white, 4.6:1 | Red-orange; close to danger red.                                           |
  | Saffron     | `0.79 0.16 66`  | dark, 9.1:1  | Golden orange; would force warning to move to lemon.                       |
  | Electric    | `0.62 0.2 295`  | white, 4.6:1 | Balanced violet, familiar from developer tools.                            |
  | Ultraviolet | `0.64 0.24 300` | white, 4.6:1 | The most saturated violet.                                                 |
  | Orchid      | `0.64 0.2 318`  | white, 4.6:1 | Purple toward magenta, expressive.                                         |
  | Iris        | `0.73 0.17 292` | dark, 7.2:1  | Light, luminous violet.                                                    |

  Copper, apricot and indigo were the owner's other finalists; the rest were set aside earlier in the comparison.
