'use client';

import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { Choice, ChoiceGroup, type ChoiceGroupContent } from '../choice/choice.tsx';

export type RadioProps = Omit<
  ComponentPropsWithRef<typeof BaseRadio.Root>,
  'className' | 'render' | 'nativeButton' | 'children'
> & {
  label: ReactNode;
  description?: ReactNode;
  className?: string;
};

export type RadioGroupProps = Omit<
  ComponentPropsWithRef<typeof BaseRadioGroup>,
  'className' | 'render' | 'children'
> &
  ChoiceGroupContent;

export function Radio({ label, description, className, ...props }: RadioProps) {
  return (
    <Choice
      control={<BaseRadio.Root {...props} className="ds-radio" />}
      label={label}
      description={description}
      disabled={props.disabled}
      className={className}
    />
  );
}

export function RadioGroup({
  label,
  description,
  error,
  orientation,
  name,
  className,
  children,
  ...props
}: RadioGroupProps) {
  return (
    <ChoiceGroup
      group={<BaseRadioGroup {...props} />}
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
