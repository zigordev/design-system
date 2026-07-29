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

`caption` and `footer` are strips inside the frame, above and below the
table. A **string** caption gets uppercase label typography; **any other
node** is left alone — otherwise a caption holding a search box would
uppercase the search box. `footer` is where pagination controls go, so
they sit in the frame rather than floating under it.

`density="compact"` is for stat tables — ten numeric columns where the
default padding is what pushes the table off a phone screen. Prose-ish
tables (a few wide columns) should stay at the default.

## The parts around the table

`TableSortHeader`, `TablePager` and `TableEmpty` are the three things every
table grows, and every app had invented its own version of each — three
different sort indicators (text arrows, Lucide icons, `▲▼↕`) for the same
interaction.

```jsx
<Table
  density="compact"
  footer={
    <TablePager
      summary={t('table.range', { start, end, total })}
      rowsLabel={t('table.rows')}
      page={page} pageCount={pageCount} onPageChange={setPage}
      pageSize={pageSize} pageSizeOptions={[10, 25, 50, 100]} onPageSizeChange={setPageSize}
    />
  }
>
  <thead>
    <tr>
      <th><TableSortHeader direction={sortKey === 'name' ? dir : null} onSort={() => sort('name')}>Name</TableSortHeader></th>
    </tr>
  </thead>
  <tbody>
    {rows.length ? rows.map(...) : <TableEmpty>{t('table.noResults')}</TableEmpty>}
  </tbody>
</Table>
```

None of them hold state. `direction`/`onSort` and `page`/`onPageChange` come
from whatever drives the table — TanStack, a `useState` pair, the server.
`TablePager` is 1-based; TanStack's `pageIndex` is 0-based, so convert at the
boundary. Pass `summary` and `rowsLabel` already translated: the design
system has no `t`.

**Not a data grid.** Sorting, pagination, column visibility and
virtualisation are a separate problem that TanStack Table solves properly,
and the operator console already uses it. Use this for presentation and
bring your own engine — reimplementing that here would be strictly worse
than what one app already has.
