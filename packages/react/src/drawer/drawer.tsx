'use client';

import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import { XIcon } from '@zigordev/icons';
import type { ComponentProps, ReactElement, ReactNode } from 'react';
import { Button } from '../button/button.tsx';
import { classNames } from '../internal/class-names.ts';

export type DrawerSide = 'right' | 'left' | 'bottom';

export type DrawerProps = Omit<
  ComponentProps<typeof BaseDrawer.Root>,
  'children' | 'swipeDirection'
> & {
  trigger?: ReactElement;
  title: ReactNode;
  description?: ReactNode;
  closeLabel: string;
  side?: DrawerSide;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
};

const swipe = { right: 'right', left: 'left', bottom: 'down' } as const;

export function Drawer({
  trigger,
  title,
  description,
  closeLabel,
  side = 'right',
  footer,
  children,
  className,
  ...props
}: DrawerProps) {
  return (
    <BaseDrawer.Root {...props} swipeDirection={swipe[side]}>
      {trigger ? <BaseDrawer.Trigger render={trigger} /> : null}
      <BaseDrawer.Portal>
        <BaseDrawer.Backdrop className="ds-backdrop" />
        <BaseDrawer.Viewport className="ds-drawer-viewport" data-side={side}>
          <BaseDrawer.Popup className={classNames('ds-drawer', className)} data-side={side}>
            <div className="ds-dialog__header">
              <BaseDrawer.Title className="ds-dialog__title">{title}</BaseDrawer.Title>
              <BaseDrawer.Close
                render={
                  <Button variant="ghost" tone="neutral" size="sm" iconOnly aria-label={closeLabel}>
                    <XIcon />
                  </Button>
                }
              />
            </div>
            {description ? (
              <BaseDrawer.Description className="ds-dialog__description">
                {description}
              </BaseDrawer.Description>
            ) : null}
            {children}
            {footer ? <div className="ds-dialog__footer">{footer}</div> : null}
          </BaseDrawer.Popup>
        </BaseDrawer.Viewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
}

export function DrawerClose({ children }: { children: ReactElement }) {
  return <BaseDrawer.Close render={children} />;
}
