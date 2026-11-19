import type { HTMLAttributes } from 'react';
import { classNames } from '../internal/class-names.ts';

export type VisuallyHiddenProps = Omit<HTMLAttributes<HTMLSpanElement>, 'className'> & {
  className?: string;
};

export function VisuallyHidden({ className, ...props }: VisuallyHiddenProps) {
  return <span {...props} className={classNames('ds-visually-hidden', className)} />;
}
