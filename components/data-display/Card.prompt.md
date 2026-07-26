General-purpose bordered surface — the base container for panels, list items, and grouped content.

```jsx
<Card title="Team roster" description="12 of 15 slots filled" footer={<Button size="sm">Manage</Button>}>
  <RosterList players={players} />
</Card>
```

Omit `title`/`description`/`footer` for a plain content box. Add `interactive` when the whole card is clickable (adds hover lift).
