Primary app-shell navigation rail. Hides itself below `--ds-breakpoint-nav` (1024px) — pair with `BottomNav` for the mobile primary-nav equivalent, or just use `AppShell`, which wires both together automatically. Items support one level of `children` for sub-destinations (e.g. Execution → Paper/Live), auto-expanded when the parent or a child is active. `footer` pins account/status content (a user menu, an environment indicator) to the bottom of the rail.

```jsx
<Sidebar
  brand={<Logo initials="TB" wordmark="Trading Bot" href="/" />}
  items={[
    { href: '/', label: 'Overview', icon: <LayoutDashboard size={16} /> },
    { href: '/execution', label: 'Execution', icon: <LineChart size={16} />, children: [
      { href: '/execution/paper', label: 'Paper' },
      { href: '/execution/live', label: 'Live' },
    ] },
  ]}
  activeHref={pathname}
  footer={<span>local</span>}
/>
```
