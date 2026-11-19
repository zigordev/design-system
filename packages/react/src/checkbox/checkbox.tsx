'use client';

import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import type { ComponentPropsWithRef } from 'react';
import {
  Choice,
  type ChoiceContent,
  ChoiceGroup,
  type ChoiceGroupContent,
} from '../choice/choice.tsx';

export type CheckboxProps = Omit<
  ComponentPropsWithRef<typeof BaseCheckbox.Root>,
  'className' | 'render' | 'nativeButton' | 'children'
> &
  ChoiceContent;

export type CheckboxGroupProps = Omit<
  ComponentPropsWithRef<typeof BaseCheckboxGroup>,
  'className' | 'render' | 'children'
> &
  ChoiceGroupContent & { name?: string };

export function Checkbox({ label, description, error, className, ...props }: CheckboxProps) {
  return (
    <Choice
      control={<BaseCheckbox.Root {...props} className="ds-checkbox" />}
      label={label}
      description={description}
      error={error}
      disabled={props.disabled}
      className={className}
    />
  );
}

export function CheckboxGroup({
  label,
  description,
  error,
  orientation,
  name,
  className,
  children,
  ...props
}: CheckboxGroupProps) {
  return (
    <ChoiceGroup
      group={<BaseCheckboxGroup {...props} />}
      label={label}
      description={description}
      error={error}
      orientation={orientation}
      name={name}
      disabled={props.disabled}
      className={className}
    >
      {children}
    </ChoiceGroup>
  );
}
