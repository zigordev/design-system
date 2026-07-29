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

The header is always sticky — `maxHeight` is what gives it something to
stick against, by capping the scroll container.

`minWidth` sets the floor below which the frame scrolls sideways rather
than crushing columns. Any table with more than a handful of numeric
columns needs it, and a frozen first column is pointless without it —
there has to be something to scroll.

**Not a data grid.** Sorting, pagination, column visibility and
virtualisation are a separate problem that TanStack Table solves properly,
and the operator console already uses it. Use this for presentation and
bring your own engine — reimplementing that here would be strictly worse
than what one app already has.
