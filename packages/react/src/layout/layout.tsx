import type { HTMLAttributes } from 'react';
import { classNames } from '../internal/class-names.ts';

export type LayoutGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
export type LayoutElement =
  | 'div'
  | 'section'
  | 'article'
  | 'aside'
  | 'header'
  | 'footer'
  | 'main'
  | 'nav'
  | 'ul'
  | 'ol';

type LayoutProps = Omit<HTMLAttributes<HTMLElement>, 'className'> & {
  as?: LayoutElement;
  gap?: LayoutGap;
  className?: string;
};

export type StackProps = LayoutProps & { align?: 'stretch' | 'start' | 'center' | 'end' };

export type InlineProps = LayoutProps & {
  align?: 'center' | 'start' | 'end' | 'baseline' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
  wrap?: boolean;
};

export type GridProps = LayoutProps & { min?: 'sm' | 'md' | 'lg' };

export type ContainerProps = Omit<HTMLAttributes<HTMLElement>, 'className'> & {
  as?: LayoutElement;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

function listRole(element: LayoutElement): 'list' | undefined {
  return element === 'ul' || element === 'ol' ? 'list' : undefined;
}

export function Stack({
  as: Element = 'div',
  gap = 4,
  align = 'stretch',
  className,
  ...props
}: StackProps) {
  return (
    <Element
      role={listRole(Element)}
      {...props}
      className={classNames('ds-stack', className)}
      data-gap={gap}
      data-align={align}
    />
  );
}

export function Inline({
  as: Element = 'div',
  gap = 2,
  align = 'center',
  justify = 'start',
  wrap = true,
  className,
  ...props
}: InlineProps) {
  return (
    <Element
      role={listRole(Element)}
      {...props}
      className={classNames('ds-inline', className)}
      data-gap={gap}
      data-align={align}
      data-justify={justify}
      data-wrap={wrap}
    />
  );
}

export function Grid({ as: Element = 'div', gap = 4, min = 'md', className, ...props }: GridProps) {
  return (
    <Element
      role={listRole(Element)}
      {...props}
      className={classNames('ds-grid', className)}
      data-gap={gap}
      data-min={min}
    />
  );
}

export function Container({
  as: Element = 'div',
  size = 'lg',
  className,
  ...props
}: ContainerProps) {
  return <Element {...props} className={classNames('ds-container', className)} data-size={size} />;
}
