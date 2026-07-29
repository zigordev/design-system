# Shared Product Design System

A technology-agnostic component + token library extracted from three existing
React/Next.js products, so all three (and future ones) can share one visual
language while each keeps its own brand skin.

## Sources

- `github.com/zigordev/kini` — football pool app. Plain CSS custom properties,
  red primary, `apps/ui` (Next.js).
- `github.com/zigordev/gpool` — football pool app v2. RGB-triplet CSS
  variables, pitch-green + sunset-orange dual accent, glassmorphism, `apps/ui`
  (Next.js).
- `github.com/zigordev/trading-bot` — operator console. Tailwind v4 +
  shadcn/ui + Radix + oklch tokens, blue accent, `apps/operator-console`
  (Next.js).

All three were read directly from GitHub (`apps/ui` / `apps/operator-console`
source, `globals.css`, and component files) — nothing here is invented from
memory. None of the three is treated as "the" brand: this system is a
deliberately neutral common denominator the three can each reskin.

## Why this shape

The three apps use three different styling technologies (plain CSS classes,
Tailwind utility classes, CVA variant classes) but are **all React**. So the
components here are plain React (`.jsx`), styled entirely through inline
styles and small injected `<style>` blocks that reference **CSS custom
properties** — no Tailwind, no CSS-in-JS library, no build step required.
That makes them:
- Directly importable into any of the three apps (all React) regardless of
  their existing CSS approach.
- Reskinnable per project by overriding the `--ds-*` tokens in `styles.css`
  — see `/themes` for three worked examples, one per source app's real
  palette.

## Theming

`styles.css` defines a neutral default theme (oklch-based, blue accent).
Each consuming project overrides `--ds-*` custom properties — either by
loading one of the example files in `/themes` after `styles.css`, or writing
its own following the same pattern. Components never hardcode a color value;
they only ever reference tokens, so a full reskin touches zero component
files.

**Themes override color only.** Shape (radius), type scale, spacing, shadow,
and motion are shared base tokens from `/tokens` and are never touched by a
theme file — every product should render the exact same component geometry,
just repainted. If a real product's shape language genuinely diverges (e.g.
fully pill-shaped controls), that's a base-token or component-variant
decision to raise explicitly, not something to fork silently per theme.

```html
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="themes/kini.css">
<html data-theme="kini">
```

## Structure

- `styles.css` — token entry point (`@import`s everything in `/tokens`).
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `radius.css`,
  `shadow.css`, `motion.css`.
- `themes/` — example reskins matching each source app's real palette
  (`kini.css`, `gpool.css`, `operator-console.css`) — read these before
  writing a fourth project's theme.
- `components/` — React primitives, grouped by concern:
  - `core/` — Button
  - `forms/` — Field, Input, DateField, Select, Checkbox, Switch
  - `feedback/` — Badge, Toast, EmptyState
  - `data-display/` — Card, StatTile, Avatar, PageHeader, Table, Section
  - `navigation/` — Sidebar, BottomNav, Topbar, AppShell, Logo,
    TopbarTabs (flush underline tabs for sections within a destination),
    SegmentedControl (pill toggle for a *mode* — view/manage,
    paper/live — in Topbar's `mode` slot, or a content-level switcher),
    ScopeSwitcher (which team/pool/workspace the app is showing, at the
    top of Sidebar)
  - `overlay/` — Modal, Menu
  - `icons/` — Icon, a curated glyph set (vendored Lucide path data, no
    npm dependency) — the one icon language for nav items, toolbar
    buttons, and any other in-product iconography. Flag, real (not
    emoji) country flag chips for language switchers, vendored from
    flag-icons the same way. GoogleMark, the "Sign in with Google"
    brand mark (white-on-color variant, for use on a colored Button).
  - `auth/` — AuthShell + AuthCard, the centered card layout for
    login / invite-accept / any single-action auth screen.
  - `_shared/injectStyle.js` — tiny helper components use to inject their
    pseudo-state CSS once (no CSS-in-JS dependency).
- `guidelines/` — foundation specimen cards (colors, type, spacing,
  radius/shadow, theming comparison).

## Navigation taxonomy

Five different things get confused with each other constantly, and every
navigation problem in the three source apps traced back to conflating two
of them. Each has one home:

| Concept | Answers | Component / slot |
| --- | --- | --- |
| **Destination** | Where am I? | `Sidebar` items, `BottomNav` |
| **Scope** | Which dataset? (team, pool, workspace) | `ScopeSwitcher` in `Sidebar`'s `scope` |
| **Mode** | What am I doing to it? (view/manage, paper/live) | `SegmentedControl` in `Topbar`'s `mode` |
| **Section** | Which part of this destination? | `TopbarTabs` in `Topbar`'s `tabs` |
| **Action** | Do a thing | `Topbar`'s `actions` |

The two failure modes worth naming:

- **A mode modelled as destinations.** Putting `paper` and `live` (or
  `view` and `manage`) in the sidebar duplicates the entire nav subtree
  beneath them, and makes "which one am I in?" something the user answers
  by reading the URL. Modes keep you on the same screen — give them
  `Topbar`'s `mode` slot and, when the route encodes them, `href` options
  so they stay deep-linkable.
- **A scope listed as a destination.** "Teams" or "Pools" sitting next to
  real destinations means the same concept exists twice, and choosing a
  scope looks like navigating. Management of the scopes themselves goes in
  `ScopeSwitcher`'s `footer` ("Manage teams…"), not beside them.

A corollary for domain hierarchies: when the same axis (say Groups /
Final / Players) is meaningful at several levels — the real tournament,
one pool's rules, my predictions — don't repeat it once per level. Make
it the section axis, and make the level a mode.

## Intentional additions

No single source defined a canonical component inventory — the three apps
each rolled their own. `Field`, `StatTile`, and `ToastRegion` don't map 1:1 to
a source component; they're small unifying wrappers around patterns that
appeared in slightly different shapes in all three (label/hint/error groups,
metric/KPI cards, toast stacks).

`Topbar`, `BottomNav`, and `AppShell` are the same kind of addition, for
navigation chrome specifically: kini had a topbar+sidebar+bottom-nav, gpool
had only a topbar (no sidebar, no primary nav on mobile), trading-bot had a
sidebar with an effectively empty desktop topbar. These three components
standardize the split (sidebar/bottom-nav = "where am I", topbar = "what can
I do here") across all three products, sharing one breakpoint
(`--ds-breakpoint-nav`, 1024px) instead of each app picking its own.

## Not included yet

- Per-product UI kit recreations (full screens) — out of scope for this pass
  per the current brief (tokens + component library only).
- A **data grid** — sorting, pagination, column visibility, virtualisation.
  `Table` covers presentation only; the operator console uses TanStack Table
  for behaviour and that is the right split, not something to reimplement here.
- No real logo/brand mark assets — none of the three source repos ship a
  logo file; each renders a text/letter mark inline (`K`, `GP`, a Lucide
  icon). `components/navigation/Logo` standardizes *how* those marks render
  (size, shape, wordmark, tagline) but still takes `initials` or an icon
  `mark` node from the caller — don't fabricate artwork; add real marks
  here once provided.
- No custom webfonts — all three load Inter via `next/font` at build time,
  so no binary lives in any repo. Link Google Fonts "Inter" (and a mono like
  JetBrains Mono) from each consuming project, or swap `--ds-font-sans`
  entirely per theme.

## Content fundamentals

Product copy across the three sources is short, functional, sentence case,
no emoji. Buttons read as verbs ("Save changes", "Delete", "Create pool").
Empty states pair a one-line title with a one-sentence description and a
single action. Toasts and errors are plain-language, no exclamation points.

## Using this in a consuming project

1. Copy `styles.css`, `tokens/`, and (optionally) one file from `themes/`
   into the project.
2. Copy the `components/` directories you need — each is self-contained
   (only imports React and its own `_shared/injectStyle.js`).
3. Link `styles.css` (+ your theme file) in the document `<head>`.
