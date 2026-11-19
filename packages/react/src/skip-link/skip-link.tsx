import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { classNames } from '../internal/class-names.ts';

export type SkipLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'href'> & {
  target?: string;
  children: ReactNode;
  className?: string;
};

export function SkipLink({ target = 'main', className, children, ...props }: SkipLinkProps) {
  return (
    <a {...props} className={classNames('ds-skip-link', className)} href={`#${target}`}>
      {children}
    </a>
  );
}
