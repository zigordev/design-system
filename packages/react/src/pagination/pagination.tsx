import { ChevronLeftIcon, ChevronRightIcon } from '@zigordev/icons';
import type { ReactNode } from 'react';
import { classNames } from '../internal/class-names.ts';

export interface PaginationProps {
  label: string;
  page: number;
  pageCount: number;
  href: (page: number) => string;
  pageLabel: (page: number) => string;
  previousLabel: string;
  nextLabel: string;
  className?: string;
}

type Entry = number | 'start-gap' | 'end-gap';

export function pageWindow(page: number, pageCount: number): Entry[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, offset) => offset + 1);
  const start = Math.max(2, Math.min(page - 1, pageCount - 4));
  const end = Math.min(pageCount - 1, Math.max(page + 1, 5));
  const middle = Array.from({ length: end - start + 1 }, (_, offset) => start + offset);
  return [
    1,
    ...(start > 2 ? (['start-gap'] as const) : []),
    ...middle,
    ...(end < pageCount - 1 ? (['end-gap'] as const) : []),
    pageCount,
  ];
}

function Step({ to, label, children }: { to: string | null; label: string; children: ReactNode }) {
  return to ? (
    <a className="ds-pagination__link" href={to} aria-label={label}>
      {children}
    </a>
  ) : (
    <span className="ds-pagination__link" data-disabled="" aria-hidden="true">
      {children}
    </span>
  );
}

export function Pagination({
  label,
  page,
  pageCount,
  href,
  pageLabel,
  previousLabel,
  nextLabel,
  className,
}: PaginationProps) {
  return (
    <nav aria-label={label} className={classNames('ds-pagination', className)}>
      <ul className="ds-pagination__list">
        <li>
          <Step to={page > 1 ? href(page - 1) : null} label={previousLabel}>
            <ChevronLeftIcon aria-hidden="true" />
          </Step>
        </li>
        {pageWindow(page, pageCount).map((entry) => (
          <li key={entry}>
            {typeof entry === 'number' ? (
              <a
                className="ds-pagination__link"
                href={href(entry)}
                aria-label={pageLabel(entry)}
                aria-current={entry === page ? 'page' : undefined}
              >
                {entry}
              </a>
            ) : (
              <span className="ds-pagination__gap" aria-hidden="true">
                …
              </span>
            )}
          </li>
        ))}
        <li>
          <Step to={page < pageCount ? href(page + 1) : null} label={nextLabel}>
            <ChevronRightIcon aria-hidden="true" />
          </Step>
        </li>
      </ul>
    </nav>
  );
}
