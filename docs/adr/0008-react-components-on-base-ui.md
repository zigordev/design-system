# 0008. React components on Base UI, compiled by tsc

- Status: accepted
- Date: 2026-11-19
- Supersedes: none

## Context

Toolkit ADR 0006 puts every interactive part on Base UI. The legacy components were JSX with hand-written type declarations that drifted from the code. The apps are Next.js with server components.

## Decision

- Components are TSX on Base UI 1.9 (MIT), compiled file by file by tsc 7 on toolkit's `react-library.json` preset. No bundler.
- A file that uses Base UI or hooks starts with `"use client"`; tsc keeps the directive.
- Components only add classes and data attributes; `@zigordev/css` styles them.
- A button-styled link is a real link: `LinkButton` uses Base UI's `useRender` so it can compose with Next's `Link`, while `Button` always renders a `<button>`. Base UI's `nativeButton={false}` would give a link the button role.
- Components hold no copy. An icon-only button requires `aria-label` in its type.

## Consequences

- Types cannot drift from the code, and tree shaking keeps working.
- Each component's API is reviewed against its WAI-ARIA pattern when it arrives.

## Alternatives considered

- tsdown or Vite library mode: a bundler for little gain, and risk to the `"use client"` directives.
- Polymorphic `as` props, as in the legacy Button: lose the link semantics or the button semantics depending on the element.
