# design-system

One brand for every zigordev app: a lavender accent on an anthracite base, dark by default ([ADR 0014](docs/adr/0014-one-brand-on-anthracite-with-a-lavender-accent.md)). The estate rules in `toolkit/claude/estate.md` apply here as everywhere. Read [docs/adr/README.md](docs/adr/README.md) before changing a decision.

## Layout

- `packages/tokens`: `@zigordev/tokens`. DTCG 2025.10 token files in `src/tokens/`, the resolver in `src/tokens/resolver.json`, the colour generator in `src/palette/`, and `terrazzo.config.ts`, which builds `dist/tokens.css`.
- `packages/css`: `@zigordev/css`. `src/index.css` sets the layer order and imports the tokens, `reset.css`, `base.css` and one file per component in `src/components/`. `scripts/build.ts` bundles them with Lightning CSS.
- `packages/react`: `@zigordev/react`. One folder per component in `src/`, built on Base UI.
- `packages/icons`: `@zigordev/icons`. The curated Lucide names in `src/names.ts`, `renderIcon`, and the generated components and sprite in `src/generated/`.
- `packages/email`: `@zigordev/email`. React Email components that inline the light theme from `src/generated/theme.ts`.
- `apps/docs`: Storybook. Stories and MDX in `src/`, the mode toolbar in `.storybook/preview.tsx`, the test projects in `vitest.projects.ts`.

## Commands

- `pnpm install` installs the workspace and the git hooks. It needs `NODE_AUTH_TOKEN` from `gh auth token -u zigordev`.
- `pnpm run check` runs what CI runs: lint, build, typecheck and the unit tests.
- `pnpm run test:browsers` runs the browser tests CI skips for now ([ADR 0015](docs/adr/0015-browser-tests-run-before-push.md)): every story in Chromium with the coverage gate, the plain HTML pages, and the stories in Firefox and WebKit. The pre-push hook runs it after `check`.
- `pnpm dev` starts Storybook at <http://localhost:6006>.
- `pnpm --filter @zigordev/tokens run generate` regenerates the colour scales after a seed changes.
- `pnpm --filter @zigordev/icons run generate` regenerates the icons after `src/names.ts` or `lucide-static` changes.
- `pnpm --filter @zigordev/email run generate` regenerates the email theme after the tokens change.

## Rules

- One brand: the accent, neutral, shapes and type are the same in every app, and apps differ only in how they compose components. Never add per-app tokens, skins or theme settings. Changing the brand means changing a seed in `packages/tokens/src/palette/seeds.ts`; ADR 0014 lists the alternatives already compared.
- Component CSS uses role tokens only: no raw colours, lengths or durations, no `--ds-color-palette-*` or `--ds-color-scale-*`, and everything inside `@layer ds.components`. `packages/css/src/lint/token-only.test.ts` enforces it.
- Styling is classes and data attributes: `.ds-<component>` with `data-variant`, `data-tone` and `data-size`. Component-local custom properties start with `--_`. No inline styles and no runtime style injection.
- Never edit `packages/tokens/src/tokens/generated/`. Change `src/palette/seeds.ts` and regenerate.
- A token belongs to the base set or to the mode modifier, so the resolver stays orthogonal.
- Components hold no copy: labels are props. Interactive parts use Base UI; links stay real links.
- The five packages are linked and always release together.
- Never edit `packages/icons/src/generated/`. Change `src/names.ts` and regenerate; apps never draw or import icons from elsewhere.
- A new decision gets a record from `docs/adr/template.md` with the next number, added to the index in the same pull request.

## Accessibility

Every token, style and component added to the design system meets these, in both modes, before it merges:

- Contrast, WCAG 2.2 AA: text 4.5:1, or 3:1 from 24 px regular or 18.66 px bold; borders that identify a control, focus rings and chart marks 3:1 against every surface they can sit on. A new colour role gets its pairings in `packages/tokens/src/themes.test.ts`.
- Colour never carries meaning alone: status, errors and chart series pair it with an icon, text, a sign or a pattern.
- Keyboard: everything interactive is reachable and operable with the keyboard in a logical order, following its WAI-ARIA pattern. Escape closes overlays, and modals keep focus inside and return it to the trigger.
- Focus: a visible `:focus-visible` ring of `--ds-focus-width` in `--ds-color-focus-ring`, never removed or hidden.
- Target size: interactive targets are at least 24 by 24 CSS pixels, or spaced so a 24-pixel circle around each does not overlap another.
- Names and semantics: every control has an accessible name, native elements come before ARIA, and states such as expanded, selected and invalid are exposed.
- Motion: `prefers-reduced-motion` is respected, and nothing flashes more than three times a second.
- Forced colours: components stay usable in Windows forced-colours mode, with borders and focus drawn in system colours.
- Zoom and reflow: content works at 200% zoom and at 320 CSS pixels wide without horizontal scrolling, and styles use logical properties.
- Tests: every component has stories with play functions for its keyboard and state behaviour. axe reports no violations in every story in both modes in Chromium and in the default dark mode in Firefox and WebKit, and the plain HTML pages pass axe in both modes.
