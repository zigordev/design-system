The title block at the top of a screen's content.

```jsx
<PageHeader
  eyebrow={team.name}
  title="Pools"
  description="Review and manage your football pools."
  actions={<Button variant="primary">Create pool</Button>}
/>
```

**Page content, not chrome** — it scrolls away with the screen. `Topbar`
has its own `title`/`actions` slots for the sticky variant. Pick one per
screen: rendering both is the most common way an app ends up stating the
same thing twice in two different type sizes, which is what a reader
notices first.

Rule of thumb: use `Topbar.title` when the screen is a workspace you act
inside and the context must stay pinned while scrolling; use `PageHeader`
when the screen reads as a document with a beginning.
