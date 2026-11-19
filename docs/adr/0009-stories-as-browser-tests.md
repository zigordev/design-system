# 0009. Stories as browser tests in every theme

- Status: accepted
- Date: 2026-11-19
- Supersedes: none

## Context

The legacy design system had HTML specimen cards and axe runs in Chromium only, with no check that a component worked in every theme. jsdom cannot compute layout, focus or colour contrast.

## Decision

- Storybook 10.6 (MIT) is the workshop and the docs site, with the Docs, a11y, Vitest and MCP addons and a toolbar for the four theme dimensions.
- Every story runs as a test in a real browser through Vitest 5.1 browser mode and Playwright (Apache-2.0). Play functions test the keyboard and the states. The a11y addon runs axe-core (MPL-2.0) and fails on any violation.
- Vitest runs one project per theme: every product, mode and contrast level in Chromium, plus compact density for each product. Firefox and WebKit run every story in the default theme.
- Coverage is measured over every package's `src` with a 90% floor. v8 coverage works only in Chromium, so `pnpm test` runs the Chromium projects with coverage, then Firefox and WebKit without it.
- The colour pairings are also checked without a browser, from the resolved tokens.

## Consequences

- A component that breaks in one product or mode fails CI.
- The MCP server lets Claude list the components and their props while building apps.
- Screenshot tests come in a later pull request, run in Playwright's Docker image so laptop and CI pixels match.

## Alternatives considered

- jsdom with Testing Library and vitest-axe: fast, with no real layout, focus or contrast.
- Ladle or React Cosmos as the workshop: lighter, with less tooling around tests and docs.
