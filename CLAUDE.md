# design-system

One design system for every zigordev app, with a skin per product. The estate rules in `toolkit/claude/estate.md` apply here as everywhere. Read [docs/adr/README.md](docs/adr/README.md) before changing a decision.

## Layout

- `packages/tokens`: `@zigordev/tokens`. DTCG 2025.10 token files in `src/tokens/`, the resolver in `src/tokens/resolver.json`, the colour generator in `src/palette/`, and `terrazzo.config.ts`, which builds `dist/tokens.css`.
- `packages/css`: `@zigordev/css`. `src/index.css` sets the layer order and imports the tokens, `reset.css`, `base.css` and one file per component in `src/components/`. `scripts/build.ts` bundles them with Lightning CSS.
- `packages/react`: `@zigordev/react`. One folder per component in `src/`, built on Base UI.
- `apps/docs`: Storybook. Stories and MDX in `src/`, the theme toolbar in `.storybook/preview.tsx`, the test projects in `vitest.projects.ts`.

## Commands

- `pnpm install` installs the workspace and the git hooks. It needs `NODE_AUTH_TOKEN` from `gh auth token -u zigordev`.
- `pnpm run check` runs what CI runs: lint, build, typecheck and both test runs.
- `pnpm dev` starts Storybook at <http://localhost:6006>.
- `pnpm --filter @zigordev/tokens run generate` regenerates the colour scales after a seed changes.

## Rules

- Component CSS uses role tokens only: no raw colours, lengths or durations, no `--ds-color-palette-*` or `--ds-color-scale-*`, and everything inside `@layer ds.components`. `packages/css/src/lint/token-only.test.ts` enforces it.
- Styling is classes and data attributes: `.ds-<component>` with `data-variant`, `data-tone` and `data-size`. Component-local custom properties start with `--_`. No inline styles and no runtime style injection.
- A product may change only its accent, neutral tint, radius, density default and display width. Shared tokens never vary by product.
- Never edit `packages/tokens/src/tokens/generated/`. Change `src/palette/seeds.ts` and regenerate.
- A token belongs to the base set or to exactly one modifier, so the resolver stays orthogonal. The theme tests check every text, border and focus pairing in every product, mode and contrast.
- Every component has stories with play functions for its keyboard and state behaviour. The stories run with axe in every theme in Chromium and in the default theme in Firefox and WebKit.
- Components hold no copy: labels are props. Interactive parts use Base UI; links stay real links.
- The three packages are linked and always release together.
- A new decision gets a record from `docs/adr/template.md` with the next number, added to the index in the same pull request.
