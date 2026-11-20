import { ArrowDownRightIcon, ArrowUpRightIcon } from '@zigordev/icons';
import type { HTMLAttributes, ReactNode, TableHTMLAttributes } from 'react';
import { classNames } from '../internal/class-names.ts';

export interface DescriptionItem {
  id?: string;
  term: ReactNode;
  details: ReactNode;
}

export interface DescriptionListProps {
  items: DescriptionItem[];
  layout?: 'stacked' | 'columns';
  className?: string;
}

export interface TimelineItem {
  id: string;
  title: ReactNode;
  time?: ReactNode;
  dateTime?: string;
  description?: ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export interface FigureProps {
  caption?: ReactNode;
  children: ReactNode;
  className?: string;
}

export type KbdProps = Omit<HTMLAttributes<HTMLElement>, 'className'> & { className?: string };

export interface StatTileProps {
  label: ReactNode;
  value: ReactNode;
  delta?: ReactNode;
  trend?: 'up' | 'down' | 'flat';
  className?: string;
}

export type TableProps = Omit<TableHTMLAttributes<HTMLTableElement>, 'className'> & {
  caption?: string;
  scrollLabel?: string;
  className?: string;
};

const list = 'list';

export function DescriptionList({ items, layout = 'stacked', className }: DescriptionListProps) {
  return (
    <dl className={classNames('ds-description-list', className)} data-layout={layout}>
      {items.map((item) => (
        <div key={item.id ?? String(item.term)} className="ds-description-list__item">
          <dt className="ds-description-list__term">{item.term}</dt>
          <dd className="ds-description-list__details">{item.details}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={classNames('ds-timeline', className)} role={list}>
      {items.map((item) => (
        <li key={item.id} className="ds-timeline__item">
          {item.time ? (
            <time className="ds-timeline__time" dateTime={item.dateTime}>
              {item.time}
            </time>
          ) : null}
          <p className="ds-timeline__title">{item.title}</p>
          {item.description ? <p className="ds-timeline__description">{item.description}</p> : null}
        </li>
      ))}
    </ol>
  );
}

export function Figure({ caption, children, className }: FigureProps) {
  return (
    <figure className={classNames('ds-figure', className)}>
      {children}
      {caption ? <figcaption className="ds-figure__caption">{caption}</figcaption> : null}
    </figure>
  );
}

export function Kbd({ className, ...props }: KbdProps) {
  return <kbd {...props} className={classNames('ds-kbd', className)} />;
}

const trendIcons = { up: <ArrowUpRightIcon />, down: <ArrowDownRightIcon />, flat: null };

export function StatTile({ label, value, delta, trend = 'flat', className }: StatTileProps) {
  return (
    <div className={classNames('ds-stat', className)}>
      <span className="ds-stat__label">{label}</span>
      <span className="ds-stat__value">{value}</span>
      {delta ? (
        <span className="ds-stat__delta" data-trend={trend}>
          {trendIcons[trend]}
          {delta}
        </span>
      ) : null}
    </div>
  );
}

export function Table({ caption, scrollLabel, className, children, ...props }: TableProps) {
  return (
    <section className="ds-table-wrap" aria-label={scrollLabel ?? caption}>
      <table {...props} className={classNames('ds-table', className)}>
        {caption ? <caption>{caption}</caption> : null}
        {children}
      </table>
    </section>
  );
}
