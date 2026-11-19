'use client';

import { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import type { ComponentProps } from 'react';
import { classNames } from '../internal/class-names.ts';

export type OtpFieldProps = Omit<
  ComponentProps<typeof BaseOTPField.Root>,
  'children' | 'className' | 'render'
> & {
  length: number;
  inputLabel: (position: number, length: number) => string;
  className?: string;
};

export function OtpField({ length, inputLabel, className, ...props }: OtpFieldProps) {
  const positions = Array.from({ length }, (_, offset) => offset + 1);
  return (
    <BaseOTPField.Root {...props} length={length} className={classNames('ds-otp-field', className)}>
      {positions.map((position) => (
        <BaseOTPField.Input
          key={position}
          className="ds-text-input ds-otp-field__input"
          aria-label={position === 1 ? undefined : inputLabel(position, length)}
        />
      ))}
    </BaseOTPField.Root>
  );
}
