import { classNames } from '../internal/class-names.ts';

export type SeparatorOrientation = 'horizontal' | 'vertical';

export interface SeparatorProps {
  orientation?: SeparatorOrientation;
  decorative?: boolean;
  className?: string;
}

export function Separator({
  orientation = 'horizontal',
  decorative = false,
  className,
}: SeparatorProps) {
  return (
    <hr
      className={classNames('ds-separator', className)}
      data-orientation={orientation}
      aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
      aria-hidden={decorative || undefined}
    />
  );
}
