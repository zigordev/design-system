Top-level layout: wires `Sidebar` + `Topbar` + `BottomNav` + content together with the shared breakpoint, so you don't hand-roll the grid/flex or media queries per app. Pass the same `sidebarItems` you'd give `Sidebar` directly — `bottomNavItems` is derived automatically (first 5 items that have an `icon`) unless you pass your own pre-truncated list. `topbar` is a props bag forwarded straight to `Topbar` (everything except `brand`/`hideBrandOnDesktop`, which `AppShell` supplies itself from `hasSidebar`).

```jsx
<AppShell
  brand={<Logo initials="K" wordmark="Kini" href="/pools" />}
  sidebarItems={navItems}
  activeHref={pathname}
  sidebarFooter={<UserMenu />}
  topbar={{ utilities: <ThemeToggle /> }}
>
  {children}
</AppShell>
```
