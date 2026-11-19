'use client';

import { useRender } from '@base-ui/react/use-render';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { classNames } from '../internal/class-names.ts';

export type LinkTone = 'accent' | 'neutral';
export type LinkUnderline = 'always' | 'hover';

export type LinkProps = Omit<ComponentPropsWithRef<'a'>, 'className'> & {
  tone?: LinkTone;
  underline?: LinkUnderline;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
  render?: useRender.RenderProp;
};

function icon(node: ReactNode, side: 'start' | 'end') {
  return (
    <span className="ds-link__icon" data-side={side} aria-hidden="true">
      {node}
    </span>
  );
}

export function Link({
  tone = 'accent',
  underline = 'always',
  startIcon,
  endIcon,
  className,
  render,
  children,
  ...props
}: LinkProps) {
  return useRender({
    render,
    defaultTagName: 'a',
    props: {
      ...props,
      className: classNames('ds-link', className),
      'data-tone': tone,
      'data-underline': underline,
      children: (
        <>
          {startIcon ? icon(startIcon, 'start') : null}
          {children}
          {endIcon ? icon(endIcon, 'end') : null}
        </>
      ),
    },
  });
}
