# 0012. A curated Lucide set in its own package

- Status: accepted
- Date: 2026-11-19
- Supersedes: none

## Context

Wave 1 needs icons: arrows for links and buttons, the theme switcher's sun, moon and monitor, status marks, and contact icons for the cv. The foundation plan named a curated Lucide set, shipped as React components and an SVG sprite. The legacy system pasted Lucide path data by hand, so updates and the licence notice depended on someone remembering them. Lucide 1.x has since renamed icons such as `alert-circle`, which hand-copied data would never notice.

## Decision

- `@zigordev/icons` holds the icons the products use, listed by Lucide name in `src/names.ts`. It joins the linked release of the other three packages.
- `pnpm --filter @zigordev/icons run generate` reads `lucide-static`, a development dependency under the ISC licence, and writes two committed files: `src/generated/icons.ts`, one React component per icon that calls a shared `renderIcon`, and `src/generated/sprite.svg`, one symbol per icon. A test fails when they differ from what the installed `lucide-static` produces.
- Icons are hidden from screen readers unless they get a `label`. They take `size` (`sm`, `md`, `lg`) and draw with `currentColor`. `@zigordev/css` sizes them through `.ds-icon`.
- The package ships Lucide's licence as `LICENSE-lucide`.
- An icon outside the list is added here by name in a pull request, never drawn or imported in an app. Brand marks are not Lucide's job and wait for their own decision.

## Consequences

- Apps import only the icons they use, and plain HTML pages use the sprite.
- Updating `lucide-static` is a Renovate pull request. If a listed icon changed, the test fails until someone regenerates and reviews the change.
- The generated module is excluded from Biome, like the generated tokens.

## Alternatives considered

- `lucide-react` in each app: no curation, and a second way to draw icons beside the design system.
- Hand-copied path data, as before: no update path, and the licence notice is easy to lose.
- Another set, such as Phosphor or Heroicons: Lucide has the stroke style and breadth wanted, and the plan already chose it.
