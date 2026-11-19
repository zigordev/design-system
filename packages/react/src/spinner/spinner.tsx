import { classNames } from '../internal/class-names.ts';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerTone = 'accent' | 'neutral';

export interface SpinnerProps {
  label?: string;
  size?: SpinnerSize;
  tone?: SpinnerTone;
  className?: string;
}

export function Spinner({ label, size = 'md', tone = 'accent', className }: SpinnerProps) {
  if (!label) {
    return (
      <span
        className={classNames('ds-spinner', className)}
        data-size={size}
        data-tone={tone}
        aria-hidden="true"
      />
    );
  }
  return (
    <span className={classNames('ds-spinner-status', className)} role="status">
      <span className="ds-spinner" data-size={size} data-tone={tone} aria-hidden="true" />
      <span className="ds-visually-hidden">{label}</span>
    </span>
  );
}
