# 0006. DTCG tokens built by Terrazzo

- Status: accepted
- Date: 2026-11-19
- Supersedes: none

## Context

The tokens need one source that builds CSS custom properties now and other outputs later, such as inlined colours for email. The Design Tokens Community Group format reached a stable version, 2025.10, with a resolver module that describes sets and modifiers. Four theme dimensions (ADR 0004) are exactly what that resolver describes.

## Decision

- Tokens are DTCG 2025.10 JSON. A resolver has one base set and four modifiers: product, mode, density and contrast.
- Every token belongs to the base set or to exactly one modifier, so the resolver is orthogonal. The base set holds the role tokens; aliases between sets resolve as `var()` references.
- Terrazzo 2.10 (MIT) builds the CSS. It emits the full default theme on `:root`, then one block per modifier context with only the tokens that modifier owns, read from the context's own files. Dark mode and high contrast are emitted twice: under their media query and under their attribute.

## Consequences

- The token files are readable by any tool that speaks DTCG.
- Terrazzo's partial output (`only`) cannot resolve aliases into other sets, so the build resolves the whole theme and filters the output instead.

## Alternatives considered

- Style Dictionary 5.8 (Apache-2.0): more widely used and reads the 2025.10 values, but has no resolver support, so it would run one build per theme.
- A hand-written script: no dependency, and no standard format or validation.
