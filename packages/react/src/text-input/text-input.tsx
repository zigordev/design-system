'use client';

import { Input as BaseInput } from '@base-ui/react/input';
import type { ComponentPropsWithRef } from 'react';
import { useFieldRequired } from '../field/field-context.ts';
import { classNames } from '../internal/class-names.ts';

export type TextInputSize = 'sm' | 'md' | 'lg';
export type TextInputType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';

type BaseInputProps = ComponentPropsWithRef<typeof BaseInput>;

export type TextInputProps = Omit<BaseInputProps, 'className' | 'render' | 'size' | 'type'> & {
  type?: TextInputType;
  size?: TextInputSize;
  className?: string;
};

export type TextareaProps = Omit<ComponentPropsWithRef<'textarea'>, 'className'> & {
  size?: TextInputSize;
  className?: string;
  onValueChange?: BaseInputProps['onValueChange'];
};

export function TextInput({
  type = 'text',
  size = 'md',
  required,
  className,
  ...props
}: TextInputProps) {
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

export function Textarea({ size = 'md', required, className, rows = 3, ...props }: TextareaProps) {
  const inputProps = props as BaseInputProps;
  return (
    <BaseInput
      {...inputProps}
      render={<textarea rows={rows} />}
      required={useFieldRequired(required)}
      className={classNames('ds-textarea', className)}
      data-size={size}
    />
  );
}
