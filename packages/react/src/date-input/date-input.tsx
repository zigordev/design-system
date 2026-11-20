'use client';

import { Input as BaseInput } from '@base-ui/react/input';
import type { ComponentPropsWithRef } from 'react';
import { useFieldRequired } from '../field/field-context.ts';
import { classNames } from '../internal/class-names.ts';
import type { TextInputSize } from '../text-input/text-input.tsx';

export type DateInputType = 'date' | 'time' | 'datetime-local' | 'month';

export type DateInputProps = Omit<
  ComponentPropsWithRef<typeof BaseInput>,
  'className' | 'render' | 'size' | 'type'
> & {
  type?: DateInputType;
  size?: TextInputSize;
  className?: string;
};

export function DateInput({
  type = 'date',
  size = 'md',
  required,
  className,
  ...props
}: DateInputProps) {
  return (
    <BaseInput
      {...props}
      type={type}
      required={useFieldRequired(required)}
      className={classNames('ds-text-input', className)}
      data-size={size}
    />
  );
}
