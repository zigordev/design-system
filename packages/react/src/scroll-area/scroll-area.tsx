'use client';

import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area';
import type { ReactNode } from 'react';
import { classNames } from '../internal/class-names.ts';

export interface ScrollAreaProps {
  children: ReactNode;
  label?: string;
  className?: string;
}

export function ScrollArea({ children, label, className }: ScrollAreaProps) {
  return (
    <BaseScrollArea.Root className={classNames('ds-scroll-area', className)}>
      <BaseScrollArea.Viewport className="ds-scroll-area__viewport" aria-label={label}>
        <BaseScrollArea.Content>{children}</BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      <BaseScrollArea.Scrollbar orientation="vertical" className="ds-scroll-area__scrollbar">
        <BaseScrollArea.Thumb className="ds-scroll-area__thumb" />
      </BaseScrollArea.Scrollbar>
      <BaseScrollArea.Scrollbar orientation="horizontal" className="ds-scroll-area__scrollbar">
        <BaseScrollArea.Thumb className="ds-scroll-area__thumb" />
      </BaseScrollArea.Scrollbar>
    </BaseScrollArea.Root>
  );
}
