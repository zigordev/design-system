import type { HTMLAttributes } from 'react';
import { classNames } from '../internal/class-names.ts';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeVariant = 'soft' | 'solid' | 'outline';
export type BadgeSize = 'sm' | 'md';

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'className'> & {
  tone?: BadgeTone;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
};

export function Badge({
  tone = 'neutral',
  variant = 'soft',
  size = 'md',
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={classNames('ds-badge', className)}
      data-tone={tone}
      data-variant={variant}
      data-size={size}
    />
  );
}
