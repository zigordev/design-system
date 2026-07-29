Top-level layout: wires `Sidebar` + `Topbar` + `BottomNav` + content together with the shared breakpoint, so you don't hand-roll the grid/flex or media queries per app. Pass the same `sidebarItems` you'd give `Sidebar` directly — `bottomNavItems` is derived automatically (first 5 items that have an `icon`) unless you pass your own pre-truncated list. `topbar` is a props bag forwarded straight to `Topbar` (everything except `brand`/`hideBrandOnDesktop`, which `AppShell` supplies itself from `hasSidebar`). **Always pass `linkComponent`** in a Next.js/React-Router app — the default is a plain `<a>`, which causes a full page reload on every nav click instead of client-side routing.

```jsx
import Link from 'next/link';

<AppShell
  brand={<Logo initials="K" wordmark="Kini" href="/pools" linkComponent={Link} />}
  sidebarItems={navItems}
  activeHref={pathname}
  sidebarFooter={<UserMenu />}
  topbar={{ utilities: <ThemeToggle /> }}
  linkComponent={Link}
>
  {children}
</AppShell>
```

## The content frame

`AppShell` owns the gutter around page content — `.ds-app-shell-content`,
24px on desktop and 16px below 640px, plus room for the bottom nav when
there is one. **Do not pad again inside it.** gpool did (`.container-app`
added another 32px at >=768px) and its screens sat visibly narrower than
kini's and the operator console's, which read as a bug and was one.

`contentMaxWidth` caps and centres the frame for apps whose screens should
not stretch across an ultra-wide monitor. Left off, content fills the
width, which is what all three apps do today.
