'use client';

import { type MouseEvent, type ReactNode, useEffect, useRef } from 'react';
import { classNames } from '../internal/class-names.ts';

export interface ErrorSummaryItem {
  id: string;
  message: ReactNode;
}

export interface ErrorSummaryProps {
  title: ReactNode;
  errors: ErrorSummaryItem[];
  headingLevel?: 2 | 3 | 4;
  autoFocus?: boolean;
  className?: string;
}

function focusControl(event: MouseEvent<HTMLAnchorElement>, id: string) {
  const control = document.getElementById(id);
  if (control === null) return;
  event.preventDefault();
  control.focus();
}

export function ErrorSummary({
  title,
  errors,
  headingLevel = 2,
  autoFocus = true,
  className,
}: ErrorSummaryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = errors.map(({ id }) => id).join(' ');

  useEffect(() => {
    if (autoFocus && shown !== '') ref.current?.focus();
  }, [autoFocus, shown]);

  if (errors.length === 0) return null;
  const Heading = `h${headingLevel}` as const;
  return (
    <div ref={ref} className={classNames('ds-error-summary', className)} tabIndex={-1}>
      <div className="ds-error-summary__body" role="alert">
        <Heading className="ds-error-summary__title">{title}</Heading>
        <ul className="ds-error-summary__list">
          {errors.map(({ id, message }) => (
            <li key={id}>
              <a
                className="ds-error-summary__link"
                href={`#${id}`}
                onClick={(event) => focusControl(event, id)}
              >
                {message}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
