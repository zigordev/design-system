Section tabs for Topbar's `tabs` slot — sit flush in the topbar row, active
tab gets a bottom-border underline (the standard GitHub/Linear/Vercel
dashboard tab look), not a floating pill container.

```jsx
<Topbar
  ...
  tabs={
    <TopbarTabs
      items={[
        { href: '/pools/123/ranking', label: t('poolDetail.tabs.ranking') },
        { href: '/pools/123/groups', label: t('poolDetail.tabs.groupPhase'), icon: <Icon name="users" size={15} />, badge: <Badge>{count}</Badge> },
      ]}
      activeHref={pathname}
      linkComponent={Link}
    />
  }
/>
```

`activeHref`/`linkComponent` follow the exact same convention as `Sidebar`
and `BottomNav` — a tab is active on an exact match or when `activeHref`
starts with `${item.href}/`, so nested routes under a tab still highlight
it.

This is a different component from `Tabs` (the pill/segmented-control
switcher) on purpose — `Tabs` is for a controlled, non-navigational toggle
inside page content (view switchers, filters); `TopbarTabs` is real
navigation (each tab is a link) living in the chrome. Don't reach for one
where the other fits: a page-content filter shouldn't get an underline,
and topbar section navigation shouldn't get a rounded pill container.
