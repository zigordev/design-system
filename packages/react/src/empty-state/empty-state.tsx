import type { ReactNode } from 'react';
import { classNames } from '../internal/class-names.ts';

export interface EmptyStateProps {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  headingLevel?: 2 | 3 | 4;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  headingLevel = 2,
  className,
}: EmptyStateProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <div className={classNames('ds-empty-state', className)}>
      {icon ? (
        <span className="ds-empty-state__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <Heading className="ds-empty-state__title">{title}</Heading>
      {description ? <p className="ds-empty-state__description">{description}</p> : null}
      {action ? <div>{action}</div> : null}
    </div>
  );
}
