import type { Meta, StoryObj } from '@storybook/react-vite';
import { flexRender, type SortingState } from '@tanstack/react-table';
import {
  getCoreRowModel,
  getSortedRowModel,
  type LegacyColumnDef,
  useLegacyTable,
} from '@tanstack/react-table/legacy';
import { Checkbox, Table } from '@zigordev/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

interface Position {
  id: string;
  pair: string;
  side: 'Long' | 'Short';
  size: number;
  pnl: number;
}

const positions: Position[] = [
  { id: 'btc', pair: 'BTC/EUR', side: 'Long', size: 0.42, pnl: 812.4 },
  { id: 'eth', pair: 'ETH/EUR', side: 'Short', size: 3.1, pnl: -120.75 },
  { id: 'sol', pair: 'SOL/EUR', side: 'Long', size: 48, pnl: 64.1 },
];

const money = new Intl.NumberFormat('en', { style: 'currency', currency: 'EUR' });

const columns: LegacyColumnDef<Position>[] = [
  { accessorKey: 'pair', header: 'Pair' },
  { accessorKey: 'side', header: 'Side' },
  { accessorKey: 'size', header: 'Size', meta: { numeric: true } },
  {
    accessorKey: 'pnl',
    header: 'Profit',
    meta: { numeric: true },
    cell: (info) => money.format(Number(info.getValue())),
  },
];

const ariaSort = { asc: 'ascending', desc: 'descending' } as const;

function Positions() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const table = useLegacyTable({
    data: positions,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <Table caption="Open positions">
      <thead>
        {table.getHeaderGroups().map((group) => (
          <tr key={group.id}>
            <th scope="col">
              <span className="ds-visually-hidden">Selected</span>
            </th>
            {group.headers.map((header) => {
              const direction = header.column.getIsSorted();
              const numeric = (header.column.columnDef.meta as { numeric?: boolean } | undefined)
                ?.numeric;
              return (
                <th
                  key={header.id}
                  scope="col"
                  aria-sort={direction ? ariaSort[direction] : 'none'}
                  data-numeric={numeric ? '' : undefined}
                >
                  <button
                    type="button"
                    className="ds-table__sort"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </button>
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} aria-selected={selected.includes(row.id)}>
            <td>
              <Checkbox
                label={<span className="ds-visually-hidden">{`Select ${row.original.pair}`}</span>}
                checked={selected.includes(row.id)}
                onCheckedChange={(checked) =>
                  setSelected((current) =>
                    checked ? [...current, row.id] : current.filter((id) => id !== row.id)
                  )
                }
              />
            </td>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                data-numeric={
                  (cell.column.columnDef.meta as { numeric?: boolean } | undefined)?.numeric
                    ? ''
                    : undefined
                }
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

const meta = {
  title: 'Recipes/Data grid',
  component: Positions,
} satisfies Meta<typeof Positions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SortAndSelect: Story = {
  play: async ({ canvas, userEvent }) => {
    const table = canvas.getByRole('table', { name: 'Open positions' });
    const profit = within(table).getByRole('button', { name: 'Profit' });
    await userEvent.click(profit);
    await expect(profit.closest('th')).toHaveAttribute('aria-sort', 'descending');
    await expect(within(table).getAllByRole('row')[1]).toHaveTextContent('BTC/EUR');
    await userEvent.click(profit);
    await expect(profit.closest('th')).toHaveAttribute('aria-sort', 'ascending');
    await expect(within(table).getAllByRole('row')[1]).toHaveTextContent('ETH/EUR');
    await userEvent.click(within(table).getByRole('checkbox', { name: 'Select SOL/EUR' }));
    await expect(within(table).getByRole('checkbox', { name: 'Select SOL/EUR' })).toBeChecked();
  },
};
