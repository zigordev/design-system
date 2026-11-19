import { classNames } from '../internal/class-names.ts';

export type SkeletonShape = 'text' | 'rect' | 'circle';

export interface SkeletonProps {
  shape?: SkeletonShape;
  lines?: number;
  className?: string;
}

export function Skeleton({ shape = 'text', lines = 1, className }: SkeletonProps) {
  if (shape !== 'text' || lines <= 1) {
    return (
      <span
        className={classNames('ds-skeleton', className)}
        data-shape={shape}
        aria-hidden="true"
      />
    );
  }
  const keys = Array.from({ length: lines }, (_, line) => `line-${line + 1}`);
  return (
    <span className={classNames('ds-skeleton-text', className)} aria-hidden="true">
      {keys.map((key) => (
        <span key={key} className="ds-skeleton" data-shape="text" />
      ))}
    </span>
  );
}
