# 0003. Colours generated to contrast targets

- Status: accepted
- Date: 2026-11-19
- Plan decisions: D3, D4
- Supersedes: none

## Context

The legacy themes were written by hand per theme and patched for contrast after axe failures, and several dark themes rendered light text tokens on dark surfaces. A trial on 2026-11-19 showed that ramps built from fixed lightness steps left ten text pairings just below AA across three products.

## Decision

- Colours are authored in OKLCH. Each ramp has twelve steps with fixed jobs: 1 and 2 backgrounds, 3 to 5 control states, 6 to 8 borders, 9 and 10 solid fills, 11 muted text and 12 strong text.
- A generator builds each ramp from one seed per product and mode. Steps 1 to 7 follow a lightness curve; steps 8 to 12 are placed by contrast: borders at 3.1:1, solid fills at 4.6:1 with their text colour, muted text at 4.6:1 and strong text at 7.5:1 against the page surfaces. White text is preferred on solid fills unless it would darken the fill by more than 0.12 of lightness.
- A step can be overridden by hand in the seeds file. The theme tests check every text, border and focus pairing in every product, mode and contrast level against WCAG 2.2 AA, and against 7:1 for text and 4.5:1 for borders in high contrast.
- Status colours are shared by every product. The starting seeds refresh the existing brand hues: pitch green with sunset orange for gpool, and electric blue for trading-bot. The cv's seed is a placeholder ink blue until the owner chooses its colour.

## Consequences

- Contrast holds by construction, and a new product needs only a seed.
- Generated ramps can look mechanical; tuning happens in Storybook's colour page and through overrides.
- The generated token files are never edited by hand.

## Alternatives considered

- Hand-tuned scales in the style of Radix Colors: full control, with manual contrast fixes in every theme.
- APCA as the contrast measure: closer to perception, but WCAG 3 is still a draft and its reference library is not openly licensed.
