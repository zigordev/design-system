Mobile primary-navigation bar — the counterpart to `Sidebar` below `--ds-breakpoint-nav` (1024px). Pass 3-5 pre-truncated items (icon required, unlike `Sidebar`'s optional icon). Contextual/secondary tabs (a detail page's own tabs) belong in `Topbar`'s `tabs` slot instead, never here — this bar is primary destinations only. `AppShell` renders this automatically alongside `Sidebar`, so you rarely construct it directly. Pass `linkComponent` in a router-based app — the default plain `<a>` causes a full page reload on every click.

```jsx
<BottomNav
  items={[
    { href: '/', label: 'Home', icon: <Home size={18} /> },
    { href: '/pools', label: 'Pools', icon: <Trophy size={18} /> },
  ]}
  activeHref={pathname}
/>
```
