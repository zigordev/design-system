import { ChevronRightIcon } from '@zigordev/icons';
import type { ReactElement, ReactNode } from 'react';
import { classNames } from '../internal/class-names.ts';
import { Link } from '../link/link.tsx';

export interface BreadcrumbItem {
  label: ReactNode;
  href: string;
  render?: ReactElement;
}

export interface BreadcrumbsProps {
  label: string;
  items: BreadcrumbItem[];
  className?: string;
}

const list = 'list';

export function Breadcrumbs({ label, items, className }: BreadcrumbsProps) {
  const last = items.length - 1;
  return (
    <nav aria-label={label} className={classNames('ds-breadcrumbs', className)}>
      <ol className="ds-breadcrumbs__list" role={list}>
        {items.map((item, position) => (
          <li key={item.href} className="ds-breadcrumbs__item">
            {position === last ? (
              <span aria-current="page">{item.label}</span>
            ) : (
              <>
                <Link href={item.href} render={item.render} tone="neutral" underline="hover">
                  {item.label}
                </Link>
                <span className="ds-breadcrumbs__separator" aria-hidden="true">
                  <ChevronRightIcon />
                </span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
