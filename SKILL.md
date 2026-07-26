---
name: shared-product-design
description: Use this skill to generate consistent, on-brand interfaces across Kini, GPool, and the trading-bot operator console (or any new product joining them), using a shared token + component library that each product reskins independently. Good for production UI work and throwaway prototypes/mocks alike.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

This is a technology-agnostic design system: plain React components styled
only through CSS custom properties (`--ds-*` tokens), with no Tailwind or
CSS-in-JS dependency. Each consuming project supplies its own theme file
(see `/themes` for three real examples) rather than editing component
source.

If creating visual artifacts (mocks, prototypes), copy the needed
`components/<group>/` folders and `tokens/`+`styles.css` out and build static
HTML/React files for the user to view. If working on production code in one
of the three real repos, copy the same files in and link the project's own
theme override.

If the user invokes this skill without other guidance, ask what they want to
build, which of the three products (or a new one) it's for, and which theme
to apply — then act as an expert designer producing the interface.
