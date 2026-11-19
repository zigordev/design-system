'use client';

import { Field as BaseField } from '@base-ui/react/field';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { classNames } from '../internal/class-names.ts';
import { present } from '../internal/present.ts';
import { FieldContext } from './field-context.ts';

export type FieldProps = Omit<
  ComponentPropsWithRef<typeof BaseField.Root>,
  'className' | 'render' | 'children'
> & {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  className?: string;
  children: ReactNode;
};

export function Field({
  label,
  description,
  error,
  required = false,
  invalid,
  className,
  children,
  ...props
}: FieldProps) {
  const hasError = present(error);
  return (
    <BaseField.Root
      {...props}
      className={classNames('ds-field', className)}
      invalid={hasError ? true : invalid}
    >
      <BaseField.Label className="ds-field__label">
        {label}
        {required ? (
          <span className="ds-field__required" aria-hidden="true">
            *
          </span>
        ) : null}
      </BaseField.Label>
      {present(description) ? (
        <BaseField.Description className="ds-field__description">
          {description}
        </BaseField.Description>
      ) : null}
      <FieldContext.Provider value={{ required }}>{children}</FieldContext.Provider>
      {hasError ? (
        <BaseField.Error className="ds-field__error" match>
          {error}
        </BaseField.Error>
      ) : (
        <BaseField.Error className="ds-field__error" />
      )}
    </BaseField.Root>
  );
}
