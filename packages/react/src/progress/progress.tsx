'use client';

import { Meter as BaseMeter } from '@base-ui/react/meter';
import { Progress as BaseProgress } from '@base-ui/react/progress';
import type { ReactNode } from 'react';
import { classNames } from '../internal/class-names.ts';

export type ProgressTone = 'accent' | 'success' | 'warning' | 'danger';

interface Shared {
  label: ReactNode;
  min?: number;
  max?: number;
  showValue?: boolean;
  tone?: ProgressTone;
  className?: string;
}

export type ProgressProps = Shared & { value: number | null };
export type MeterProps = Shared & { value: number };

export function Progress({
  label,
  value,
  min,
  max,
  showValue = false,
  tone = 'accent',
  className,
}: ProgressProps) {
  return (
    <BaseProgress.Root
      value={value}
      min={min}
      max={max}
      className={classNames('ds-progress', className)}
      data-tone={tone}
    >
      <div className="ds-progress__header">
        <BaseProgress.Label className="ds-progress__label">{label}</BaseProgress.Label>
        {showValue ? <BaseProgress.Value className="ds-progress__value" /> : null}
      </div>
      <BaseProgress.Track className="ds-progress__track">
        <BaseProgress.Indicator className="ds-progress__indicator" />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}

export function Meter({
  label,
  value,
  min,
  max,
  showValue = true,
  tone = 'accent',
  className,
}: MeterProps) {
  return (
    <BaseMeter.Root
      value={value}
      min={min}
      max={max}
      className={classNames('ds-progress', className)}
      data-tone={tone}
    >
      <div className="ds-progress__header">
        <BaseMeter.Label className="ds-progress__label">{label}</BaseMeter.Label>
        {showValue ? <BaseMeter.Value className="ds-progress__value" /> : null}
      </div>
      <BaseMeter.Track className="ds-progress__track">
        <BaseMeter.Indicator className="ds-progress__indicator" />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}
