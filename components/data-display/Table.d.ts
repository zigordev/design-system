import * as React from 'react';

export interface TableProps {
  /** Uppercase strip above the header row. */
  caption?: React.ReactNode;
  /** Floor for the table's width — below it, the frame scrolls horizontally
   *  instead of crushing columns. Required for frozen (sticky-left) columns
   *  to be worth anything. */
  minWidth?: number | string;
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
