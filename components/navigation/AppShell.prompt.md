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
