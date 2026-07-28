The scope selector for the top of `Sidebar` — which team / pool /
workspace everything below it is about.

```jsx
<Sidebar
  brand={<Logo … />}
  scope={
    <ScopeSwitcher
      label="Team"
      value={selectedTeam?.name}
      items={teams.map((team) => ({
        id: team.id,
        label: team.name,
        active: team.id === selectedTeam?.id,
        onSelect: select,
      }))}
      footer={({ close }) => (
        <MenuItem onClick={() => { close(); router.push('/teams'); }}>
          Manage teams…
        </MenuItem>
      )}
    />
  }
  items={navItems}
  …
/>
```

**Scope is not a destination.** It changes *what data* the whole app is
showing, not *where you are* — so it sits above the nav list, not inside
it. A common anti-pattern is listing the scope as a nav item ("Teams",
"Pools") next to real destinations: then the same concept exists twice,
and picking a scope looks like navigating somewhere. Put management of
the scopes themselves in `footer` ("Manage teams…") rather than as a
sibling nav item.

Use it whenever most screens read from one selected entity. If only one
screen is scoped, that screen owns a filter instead — this is chrome, and
chrome should only carry state that outlives a single page.
