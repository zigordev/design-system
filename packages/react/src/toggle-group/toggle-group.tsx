'use client';

import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { classNames } from '../internal/class-names.ts';

export type ToggleGroupSize = 'sm' | 'md';

export type ToggleGroupProps = Omit<
  ComponentPropsWithRef<typeof BaseToggleGroup>,
  'className' | 'render'
> & {
  size?: ToggleGroupSize;
  className?: string;
};

type ToggleBase = Omit<
  ComponentPropsWithRef<typeof BaseToggle>,
  'className' | 'render' | 'nativeButton' | 'children'
> & {
  icon?: ReactNode;
  className?: string;
};

export type ToggleProps = ToggleBase &
  ({ children: ReactNode } | { children?: never; icon: ReactNode; 'aria-label': string });

export function ToggleGroup({ size = 'md', className, ...props }: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      {...props}
      className={classNames('ds-toggle-group', className)}
      data-size={size}
    />
  );
}

export function Toggle({ icon, className, children, ...props }: ToggleProps) {
  const iconOnly = children === undefined || children === null;
  return (
    <BaseToggle
      {...props}
      className={classNames('ds-toggle', className)}
      data-icon-only={iconOnly ? '' : undefined}
    >
      {icon ? (
        <span className="ds-toggle__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {children}
    </BaseToggle>
  );
}
