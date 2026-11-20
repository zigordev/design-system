'use client';

import { Slider as BaseSlider } from '@base-ui/react/slider';
import type { ReactNode } from 'react';
import { classNames } from '../internal/class-names.ts';

export interface SliderProps {
  value?: number | number[];
  defaultValue?: number | number[];
  onValueChange?: (value: number | number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: ReactNode;
  showValue?: boolean;
  thumbLabels?: string[];
  disabled?: boolean;
  name?: string;
  className?: string;
}

export function Slider({
  value,
  defaultValue,
  onValueChange,
  min,
  max,
  step,
  label,
  showValue = false,
  thumbLabels,
  disabled,
  name,
  className,
}: SliderProps) {
  const initial = value ?? defaultValue ?? 0;
  const thumbs = Array.isArray(initial) ? initial.map((_, position) => position) : [0];
  return (
    <BaseSlider.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next: number | readonly number[]) =>
        onValueChange?.(typeof next === 'number' ? next : [...next])
      }
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      name={name}
      className={classNames('ds-slider', className)}
    >
      {label || showValue ? (
        <div className="ds-slider__header">
          {label ? <BaseSlider.Label className="ds-slider__label">{label}</BaseSlider.Label> : null}
          {showValue ? <BaseSlider.Value className="ds-slider__value" /> : null}
        </div>
      ) : null}
      <BaseSlider.Control className="ds-slider__control">
        <BaseSlider.Track className="ds-slider__track">
          <BaseSlider.Indicator className="ds-slider__indicator" />
          {thumbs.map((thumb) => (
            <BaseSlider.Thumb
              key={thumb}
              index={thumb}
              className="ds-slider__thumb"
              aria-label={thumbLabels?.[thumb]}
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
