Primary app-shell navigation rail — the left sidebar every product here uses (Kini and GPool collapse this to a bottom tab bar on mobile; the operator console hides it below `lg`). This component renders the desktop rail only; add your own breakpoint swap to a bottom nav.

```jsx
<Sidebar
  brand={<Logo />}
  items={[{ href: '/pools', label: 'Pools', icon: <PoolsIcon /> }, { href: '/stats', label: 'Stats' }]}
  activeHref={pathname}
/>
```
