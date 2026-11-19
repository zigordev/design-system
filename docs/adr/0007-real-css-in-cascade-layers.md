# 0007. Real CSS in cascade layers

- Status: accepted
- Date: 2026-11-19
- Supersedes: none

## Context

The legacy design system injected its CSS from JavaScript, so server-rendered pages arrived unstyled until hydration, a strict Content Security Policy needed exceptions, and the CSS could not be used without React. Apps style their own screens with CSS Modules (toolkit ADR 0006).

## Decision

- `@zigordev/css` ships real CSS: the tokens, a small reset, base styles and one file per component, bundled into one file by Lightning CSS 1.33 (MPL-2.0) for Baseline 2023 browsers.
- Everything sits in the layers `ds.reset`, `ds.tokens`, `ds.base`, `ds.components` and `ds.utilities`, so an app's unlayered CSS always wins.
- Components are classes with data attributes, such as `.ds-button[data-variant="outline"]`. Component-local custom properties start with `--_`.
- A test rejects raw colours, lengths and durations, any variable that is neither a design token nor local, primitive colour tokens, system colours outside forced-colors media, and anything outside the file's layer.

## Consequences

- Pages are styled on first paint, the CSP needs no exceptions, and the CSS works from plain HTML, which a browser test proves.
- The token check is a small scanner in this repo rather than a second linter beside Biome.

## Alternatives considered

- A PostCSS chain: more packages for the same bundling.
- Stylelint for the token check: a second CSS linter beside Biome.
- Shipping the sources unbundled: no build step, and a waterfall of imports for plain pages.
