repos:
  - owner/name: zigordev/kini
    branch: main
  - owner/name: zigordev/gpool
    branch: main
  - owner/name: zigordev/trading-bot
    branch: main

## Last sync
date: 2026-07-26T14:35:10Z
### Updated in this project
- Extracted color/type/spacing/radius/shadow tokens from all three apps' `globals.css` / Tailwind `@theme` blocks into `/tokens`.
- Built a neutral default theme plus three example reskins in `/themes` (kini, gpool, operator-console) matching each app's real palette.
- Authored 13 shared React components (Button, Field, Input, Select, Checkbox, Switch, Badge, Toast, EmptyState, Card, StatTile, Avatar, Tabs, Sidebar, Modal) unifying patterns found across all three.

## Screen map
| Design system area | Repo files it was built from |
|---|---|
| tokens/colors.css, tokens/typography.css | kini `apps/ui/src/app/globals.css`; gpool `apps/ui/src/app/globals.css`; trading-bot `apps/operator-console/app/globals.css` |
| themes/kini.css | kini `apps/ui/src/app/globals.css` |
| themes/gpool.css | gpool `apps/ui/src/app/globals.css`, `src/components/Logo.tsx`, `src/components/PointsBadge.tsx` |
| themes/operator-console.css | trading-bot `apps/operator-console/app/globals.css`, `components.json` |
| components/core/Button | kini `.button*` classes; gpool `.btn*` classes; trading-bot `components/ui/button.tsx` |
| components/forms/* | trading-bot `components/ui/{input,select,checkbox,switch}.tsx`; kini `.field` classes |
| components/feedback/Badge | gpool `.badge*` classes; trading-bot `components/ui/badge.tsx`; kini `.status-badge` |
| components/feedback/Toast | kini `src/contexts/ToastContext.tsx` |
| components/feedback/EmptyState | trading-bot `components/shared/empty-state.tsx`; kini `Loading.tsx` EmptyState |
| components/data-display/StatTile | trading-bot `components/shared/{kpi-tile,stat-card}.tsx`; kini `.metric-card` |
| components/data-display/Avatar | kini `.avatar` class; gpool avatar patterns |
| components/navigation/Sidebar | trading-bot `components/layout/sidebar.tsx`; kini `AppShell.tsx` |
| components/navigation/Tabs | gpool `.floating-nav*` / `.players-tab-btn` classes; trading-bot `components/ui/tabs.tsx` |
| components/overlay/Modal | trading-bot `components/ui/dialog.tsx`; kini `.modal*` classes |
