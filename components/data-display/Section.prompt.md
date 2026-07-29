A titled block of content, optionally collapsible.

```jsx
<Section
  eyebrow="Group phase"
  title="Standings"
  description="Updated as results are entered."
  trailing={<Badge>12 teams</Badge>}
  collapsible
>
  <Table>…</Table>
</Section>
```

The shape every screen reaches for: eyebrow, title, something on the right,
description, rule, content. It existed eight times over in gpool before it
lived here.

`tone` picks the container — `surface` (a card), `subtle` (a muted card),
or `plain` (just a rule under the heading, for stacking sections inside
something that is already a card). `density="compact"` shrinks the title
and padding for nested use.

When `collapsible`, the header is a real `<button>` with `aria-expanded`
and `aria-controls`. Don't reach for a `div` with `role="button"` and a
hand-rolled Enter/Space handler — that is the usual shortcut and it drops
what a button gives you for nothing.
