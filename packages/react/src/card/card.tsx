import type { HTMLAttributes } from 'react';
import { classNames } from '../internal/class-names.ts';
import { Link, type LinkProps } from '../link/link.tsx';

export type CardVariant = 'raised' | 'outline' | 'sunken';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardElement = 'div' | 'article' | 'section' | 'li';

export type CardProps = Omit<HTMLAttributes<HTMLElement>, 'className'> & {
  as?: CardElement;
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
};

export type CardLinkProps = Omit<LinkProps, 'tone' | 'underline'>;

export function Card({
  as: Element = 'div',
  variant = 'raised',
  padding = 'md',
  className,
  ...props
}: CardProps) {
  return (
    <Element
      {...props}
      className={classNames('ds-card', className)}
      data-variant={variant}
      data-padding={padding}
    />
  );
}

export function CardLink({ className, ...props }: CardLinkProps) {
  return (
    <Link
      {...props}
      tone="neutral"
      underline="hover"
      className={classNames('ds-card__link', className)}
    />
  );
}
