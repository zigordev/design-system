# 0004. Four theme dimensions on the root element

- Status: accepted
- Date: 2026-11-19
- Plan decision: D6
- Supersedes: none

## Context

The legacy system had a dark theme for one product and a dark mode for others, no density setting and no high-contrast mode. Adding modes after the fact is what broke its dark themes.

## Decision

- A theme has four independent dimensions: product, mode, density and contrast. Each is an attribute on the root element: `data-product`, `data-mode`, `data-density` and `data-contrast`.
- Mode follows the system's light or dark setting unless `data-mode` is set. Contrast follows `prefers-contrast: more` unless `data-contrast` is set. Density defaults to comfortable.
- All four ship in the first release, together with Windows forced colours support in the component styles.
- Under `prefers-reduced-motion`, the base layer sets the motion durations to zero.

## Consequences

- An app chooses its defaults with a few attributes, and a person's system settings are respected without code.
- Every token alias resolves on the root element, which is why themes cannot be scoped to a part of the page yet.

## Alternatives considered

- Light and dark first, density and contrast later: less to test now, and the same retrofit risk as before.
- Scoping themes to any element: needs every alias redeclared on each scope; deferred until an app needs it.
