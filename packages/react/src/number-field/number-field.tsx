'use client';

import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { MinusIcon, PlusIcon } from '@zigordev/icons';
import type { ComponentProps } from 'react';
import { useFieldRequired } from '../field/field-context.ts';
import { classNames } from '../internal/class-names.ts';
import type { TextInputSize } from '../text-input/text-input.tsx';

export type NumberFieldProps = Omit<
  ComponentProps<typeof BaseNumberField.Root>,
  'children' | 'className' | 'render'
> & {
  decrementLabel: string;
  incrementLabel: string;
  size?: TextInputSize;
  className?: string;
  'aria-label'?: string;
};

export function NumberField({
  decrementLabel,
  incrementLabel,
  size = 'md',
  required,
  className,
  'aria-label': label,
  ...props
}: NumberFieldProps) {
  return (
    <BaseNumberField.Root
      {...props}
      required={useFieldRequired(required)}
      className={classNames('ds-number-field', className)}
      data-size={size}
    >
      <BaseNumberField.Group className="ds-number-field__group">
        <BaseNumberField.Decrement className="ds-number-field__step" aria-label={decrementLabel}>
          <MinusIcon />
        </BaseNumberField.Decrement>
        <BaseNumberField.Input
          className="ds-text-input ds-number-field__input"
          data-size={size}
          aria-label={label}
        />
        <BaseNumberField.Increment className="ds-number-field__step" aria-label={incrementLabel}>
          <PlusIcon />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}
