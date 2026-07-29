The frame, scroll container and header/cell styling for a table.

```jsx
<Table caption="Standings" maxHeight="65vh">
  <thead>
    <tr><th>Team</th><th className="ds-table-num">Points</th></tr>
  </thead>
  <tbody>
    {rows.map((r) => (
      <tr key={r.id}><td>{r.team}</td><td className="ds-table-num">{r.points}</td></tr>
    ))}
  </tbody>
</Table>
```

You write the `<thead>`/`<tbody>` yourself — this styles them, it does not
generate them. `ds-table-num` right-aligns and tabular-figures a numeric
column, which is the difference between a readable column of numbers and
an unreadable one.

`maxHeight` caps the scroll container and makes the header sticky; the two
belong together, since a sticky header needs something to scroll under it.

**Not a data grid.** Sorting, pagination, column visibility and
virtualisation are a separate problem that TanStack Table solves properly,
and the operator console already uses it. Use this for presentation and
bring your own engine — reimplementing that here would be strictly worse
than what one app already has.
