import type { HTMLAttributes } from 'react';
import { classNames } from '../internal/class-names.ts';

export type ProseProps = Omit<HTMLAttributes<HTMLElement>, 'className'> & {
  as?: 'div' | 'article' | 'section';
  className?: string;
};

export function Prose({ as: Element = 'div', className, ...props }: ProseProps) {
  return <Element {...props} className={classNames('ds-prose', className)} />;
}
