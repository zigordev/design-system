Sticky page header — the counterpart to `Sidebar`/`BottomNav`. Never render this with nothing but `brand`: pass at least `title` or `utilities` so the desktop header always has content — that's what fixes an "empty top bar" feeling when a sidebar already owns primary nav. `brand` only renders below `--ds-breakpoint-nav` (1024px) by default, since `Sidebar` already shows it above that width; set `hideBrandOnDesktop={false}` for an app with no sidebar. `tabs` is a horizontally-scrollable row for contextual/secondary navigation (a detail page's own tab strip, or a mobile-only duplicate of primary nav); `subBar` is a second full-width row below it (a record's name + status + actions).

```jsx
// gpool-style: contextual tabs + a sub-bar
<Topbar
  tabs={<Tabs tabs={poolTabs} value={activeTab} onChange={setTab} />}
  subBar={<PoolHeaderStrip />}
  utilities={<UserMenu />}
/>

// trading-bot-style: page title + actions
<Topbar title="Promotions" actions={<Button variant="outline">Back to trades</Button>} utilities={<WsStatusDot />} />
```
