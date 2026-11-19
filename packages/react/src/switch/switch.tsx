'use client';

import { Switch as BaseSwitch } from '@base-ui/react/switch';
import type { ComponentPropsWithRef } from 'react';
import { Choice, type ChoiceContent } from '../choice/choice.tsx';

export type SwitchProps = Omit<
  ComponentPropsWithRef<typeof BaseSwitch.Root>,
  'className' | 'render' | 'nativeButton' | 'children'
> &
  ChoiceContent;

export function Switch({ label, description, error, className, ...props }: SwitchProps) {
  return (
    <Choice
      control={<BaseSwitch.Root {...props} className="ds-switch" />}
      label={label}
      description={description}
      error={error}
      disabled={props.disabled}
      className={className}
    />
  );
}
