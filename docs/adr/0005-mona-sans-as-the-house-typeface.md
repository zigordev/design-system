# 0005. Mona Sans as the house typeface

- Status: accepted
- Date: 2026-11-19
- Plan decision: D5
- Supersedes: none

## Context

One typeface family is the strongest resemblance between the apps (ADR 0002), and gpool needs condensed figures for its scores. A second typeface per product would weaken the family and add fonts to load. The face has to read well at 13 px in dense tables, line up its figures, cover Spanish and come from Fontsource under an open licence.

## Decision

The house typeface is Mona Sans, a variable font with widths from 75 to 125% and weights from 200 to 900, under the SIL Open Font License. Its tabular figures were confirmed in GitHub's font files on 2026-11-19. Products take their personality from its width and weight through the display tokens. Code uses JetBrains Mono. Apps install both from Fontsource.

## Consequences

- gpool's condensed scores, the cv's heavier headings and trading-bot's tabular figures come from one family.
- Apps load `@fontsource-variable/mona-sans/wdth.css` to get the width axis.

## Alternatives considered

- Inter: the safest UI face, with optical sizes, but no width axis and little identity.
- Geist: newer, with a matching mono, and no width axis either.
- Archivo, IBM Plex Sans and Instrument Sans: all have a width axis; Plex has a matching mono, and the owner preferred Mona Sans.
