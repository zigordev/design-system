import * as React from 'react';

export interface TableProps {
  /** Uppercase strip above the header row. */
  caption?: React.ReactNode;
  /** Caps the scroll container's height, which is what makes the always-sticky header stick. */
  maxHeight?: number | string;
  /** Row hover highlight. @default true */
  hoverable?: boolean;
  /** `<thead>` / `<tbody>` — the table's own markup. */
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export declare function Table(props: TableProps): JSX.Element;
