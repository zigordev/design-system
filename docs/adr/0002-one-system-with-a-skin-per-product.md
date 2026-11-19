# 0002. One system with a skin per product

- Status: accepted
- Date: 2026-11-19
- Plan decisions: D1, D2
- Supersedes: none

## Context

cv, gpool and trading-bot do different jobs for different people: a personal CV for recruiters and engineers, a football pool for friends on their phones, and a dense console for one operator. They still share almost every interaction. The legacy system let themes change colour only, which could not make gpool feel round and friendly or trading-bot crisp and dense.

## Decision

- One design system serves every app. Components, behaviour, accessibility, the typeface family, spacing, motion, icons, status colours and elevation are shared.
- Each product sets its accent ramp, an optional second accent, a neutral tint, its corner radius, its default density, and the width and weight of the house face for headings and big numbers. It sets nothing else.
- zigordev is a signature carried by that shared craft alone. No app shows a zigordev mark or footer, and the cv is the personal home.
- The product personalities are cv: confident, precise and calm; gpool: energetic, friendly and competitive, with round corners and large touch targets; trading-bot: precise and calm, dark by default and compact, with Live mode visibly different from Paper.

## Consequences

- A fourth product starts by choosing a name, a seed colour, a radius and a density, and inherits a tested system.
- Every product setting multiplies what the tests cover, which is why the list of settings is short.

## Alternatives considered

- One look for all apps: the simplest, and it would pull a mobile game and a dense console towards the same components.
- A separate system per app: the most freedom and about three times the work.
- Cousins with their own typefaces: more personality per app, and a weaker family resemblance with more fonts to load.
