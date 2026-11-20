'use client';

import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar';
import type { ComponentProps, ReactNode } from 'react';
import { Button, type ButtonProps } from '../button/button.tsx';
import { classNames } from '../internal/class-names.ts';

export type ToolbarProps = Omit<ComponentProps<typeof BaseToolbar.Root>, 'className' | 'render'> & {
  className?: string;
};

export type ToolbarButtonProps = ButtonProps;

export function Toolbar({ className, ...props }: ToolbarProps) {
  return <BaseToolbar.Root {...props} className={classNames('ds-toolbar', className)} />;
}

export function ToolbarButton(props: ToolbarButtonProps) {
  return (
    <BaseToolbar.Button render={<Button variant="ghost" tone="neutral" size="sm" {...props} />} />
  );
}

export function ToolbarGroup({
  children,
  'aria-label': label,
}: {
  children: ReactNode;
  'aria-label'?: string;
}) {
  return (
    <BaseToolbar.Group className="ds-toolbar__group" aria-label={label}>
      {children}
    </BaseToolbar.Group>
  );
}

export function ToolbarSeparator() {
  return <BaseToolbar.Separator className="ds-toolbar__separator" />;
}
