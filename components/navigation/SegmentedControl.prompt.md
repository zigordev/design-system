A segmented pill control — the shape you reach for when the choice is a
**mode**, not a place.

```jsx
// Mode switch in chrome — deep-linkable, and Live repaints the control
<Topbar
  mode={
    <SegmentedControl
      options={[
        { value: 'paper', label: 'Paper', href: '/execution/paper' },
        { value: 'live', label: 'Live', href: '/execution/live', tone: 'danger' },
      ]}
      value={mode}
      linkComponent={Link}
      ariaLabel="Execution mode"
    />
  }
/>

// Controlled toggle inside page content
<SegmentedControl
  options={[{ value: 'active', label: 'Active' }, { value: 'all', label: 'All' }]}
  value={filter}
  onChange={setFilter}
/>
```

**Mode vs. destination** is the call to get right. A mode keeps you on the
same screen and changes what that screen operates on (view/manage,
paper/live, test/production) — it belongs here, in `Topbar`'s `mode` slot.
A destination takes you somewhere else — that belongs in `Sidebar`, or in
`TopbarTabs` for sections within one destination. Modelling a mode as two
sidebar destinations duplicates the whole nav subtree below it and makes
"which one am I in?" a question the user has to answer by reading the URL.

Use `href` whenever the mode is reflected in the route: the control still
looks like a toggle, but each half is a real link, so modes stay
shareable and survive a refresh.

`tone: 'danger'` is for a mode with real-world consequences. Stripe's
test-mode banner is the reference: make the dangerous state impossible to
be in accidentally without noticing.
