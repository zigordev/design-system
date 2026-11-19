# 0013. Email components on React Email with inlined tokens

- Status: accepted
- Date: 2026-11-19
- Supersedes: none

## Context

The estate stack says products render their messages with `@zigordev/email`, React Email on the design tokens, and send them through notifications. Email clients ignore CSS variables and most modern CSS, so the tokens cannot reach a message the way they reach a page. React Email's per-component packages, `@react-email/components` among them, are deprecated; React Email 6 ships the components from the `react-email` package, together with its preview CLI and that CLI's dependencies.

## Decision

- `@zigordev/email` holds a layout, a heading, text, a button and a footer, built on the components that `react-email` exports, and joins the linked release.
- `pnpm --filter @zigordev/email run generate` reads `@zigordev/tokens/tokens.css`, merges the light, standard and comfortable blocks for each product, resolves the `var()` chains, and writes each product's colours as hex, its lengths as pixels, its type and its radius to a committed `src/generated/themes.ts`. A test fails when that file differs from what the built tokens produce.
- Components read the product's theme from EmailLayout and inline every style. Messages are light only; mail clients decide dark mode.
- Products render with `@react-email/render`.

## Consequences

- A message takes the product's accent, radius and type without copying values by hand.
- Installing `@zigordev/email` brings the `react-email` package's CLI dependencies, such as esbuild and socket.io, into products that render email. If that weight becomes a problem, the components can be rebuilt on plain React with the same API.
- Changing a token means regenerating the themes, which the drift test enforces.

## Alternatives considered

- `@react-email/components`: deprecated.
- Our own table-based primitives: no third-party dependency, and a second way of building emails next to the one the estate stack names.
- CSS inlining at send time from the bundle: depends on parsing the whole bundle in every product, and mail clients still drop most of it.
