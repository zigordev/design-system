'use client';

import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import type { ComponentProps } from 'react';
import { classNames } from '../internal/class-names.ts';

type Styled<T> = Omit<T, 'className' | 'render'> & { className?: string };

export type TabsProps = Styled<ComponentProps<typeof BaseTabs.Root>>;
export type TabListProps = Styled<ComponentProps<typeof BaseTabs.List>>;
export type TabProps = Styled<ComponentProps<typeof BaseTabs.Tab>>;
export type TabPanelProps = Styled<ComponentProps<typeof BaseTabs.Panel>>;

export function Tabs({ className, ...props }: TabsProps) {
  return <BaseTabs.Root {...props} className={classNames('ds-tabs', className)} />;
}

export function TabList({ className, children, ...props }: TabListProps) {
  return (
    <BaseTabs.List {...props} className={classNames('ds-tabs__list', className)}>
      {children}
      <BaseTabs.Indicator className="ds-tabs__indicator" />
    </BaseTabs.List>
  );
}

export function Tab({ className, ...props }: TabProps) {
  return <BaseTabs.Tab {...props} className={classNames('ds-tabs__tab', className)} />;
}

export function TabPanel({ className, ...props }: TabPanelProps) {
  return <BaseTabs.Panel {...props} className={classNames('ds-tabs__panel', className)} />;
}
