# design-system

One design system for every zigordev app, with a skin per product. cv, gpool and trading-bot share the same components, behaviour, accessibility, typeface, spacing and motion. Each product sets its own accent colour, a matching neutral tint, its corner radius and its default density.

## Why it exists

The legacy design system copied CSS into apps, injected styles from JavaScript, patched dark mode theme by theme and had no density or high-contrast mode. This repo rebuilds it from scratch: tokens in an open standard, real CSS files that style the first paint, thin React components on accessible primitives, and tests that check every colour pairing and every component in every product and mode. The decisions behind it are in [docs/adr](docs/adr/README.md).

## What it ships

| Package                                         | Holds                                                                                                                                                                  |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@zigordev/tokens`](packages/tokens/README.md) | The design tokens: DTCG 2025.10 sources with a resolver for product, mode, density and contrast, built into CSS custom properties, plus the theme names for TypeScript |
| [`@zigordev/css`](packages/css/README.md)       | The tokens, a small reset, base styles and every component style, in cascade layers, bundled into one file                                                             |
| [`@zigordev/react`](packages/react/README.md)   | React components on Base UI, styled by `@zigordev/css`                                                                                                                 |

`apps/docs` is the Storybook site: the component catalogue, the foundations pages and the test harness. It is not published; `pnpm dev` runs it locally.

## Technologies and tools

Node.js 26 and pnpm 12, pinned in `mise.toml`, with TypeScript 7. Tokens are written in the DTCG 2025.10 format and built by Terrazzo. CSS is bundled by Lightning CSS. Components use React 19 and Base UI. Storybook 10 documents them, and its stories run as tests in Chromium, Firefox and WebKit through Vitest browser mode and Playwright, with axe checking accessibility. Biome lints and formats, lefthook runs the git hooks, commitlint checks commit messages, release-please versions the packages, and Renovate keeps dependencies current. The house typeface is Mona Sans, with JetBrains Mono for code, both from Fontsource.

## Dependencies

Nothing at runtime: the packages are static files. Building needs toolkit's presets from GitHub Packages, and CI calls toolkit's shared workflows.

## Quick start

```bash
git clone git@github.com:zigordev/design-system.git ~/Desktop/Personal/zigordev/design-system
cd ~/Desktop/Personal/zigordev/design-system
mise install
export NODE_AUTH_TOKEN="$(gh auth token -u zigordev)"
pnpm install
pnpm run check
pnpm dev
```

Installing needs a GitHub token with `read:packages` and one line in `~/.npmrc`; [docs/local-first-start.md](docs/local-first-start.md) has the details. [docs/user-manual.md](docs/user-manual.md) is the integration guide for apps, and [docs/cloud-first-deploy.md](docs/cloud-first-deploy.md) explains how a release reaches them.
