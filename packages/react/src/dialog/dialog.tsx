'use client';

import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { XIcon } from '@zigordev/icons';
import type { ComponentProps, ReactElement, ReactNode } from 'react';
import { Button } from '../button/button.tsx';
import { classNames } from '../internal/class-names.ts';

export type DialogSize = 'sm' | 'md' | 'lg';

export type DialogProps = Omit<ComponentProps<typeof BaseDialog.Root>, 'children'> & {
  trigger?: ReactElement;
  title: ReactNode;
  description?: ReactNode;
  closeLabel: string;
  footer?: ReactNode;
  size?: DialogSize;
  children?: ReactNode;
  className?: string;
};

export type AlertDialogProps = Omit<ComponentProps<typeof BaseAlertDialog.Root>, 'children'> & {
  trigger?: ReactElement;
  title: ReactNode;
  description: ReactNode;
  actions: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function Dialog({
  trigger,
  title,
  description,
  closeLabel,
  footer,
  size = 'md',
  children,
  className,
  ...props
}: DialogProps) {
  return (
    <BaseDialog.Root {...props}>
      {trigger ? <BaseDialog.Trigger render={trigger} /> : null}
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="ds-backdrop" />
        <BaseDialog.Viewport className="ds-dialog-viewport">
          <BaseDialog.Popup className={classNames('ds-dialog', className)} data-size={size}>
            <div className="ds-dialog__header">
              <BaseDialog.Title className="ds-dialog__title">{title}</BaseDialog.Title>
              <BaseDialog.Close
                render={
                  <Button variant="ghost" tone="neutral" size="sm" iconOnly aria-label={closeLabel}>
                    <XIcon />
                  </Button>
                }
              />
            </div>
            {description ? (
              <BaseDialog.Description className="ds-dialog__description">
                {description}
              </BaseDialog.Description>
            ) : null}
            {children}
            {footer ? <div className="ds-dialog__footer">{footer}</div> : null}
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

export function DialogClose({ children }: { children: ReactElement }) {
  return <BaseDialog.Close render={children} />;
}

export function AlertDialog({
  trigger,
  title,
  description,
  actions,
  children,
  className,
  ...props
}: AlertDialogProps) {
  return (
    <BaseAlertDialog.Root {...props}>
      {trigger ? <BaseAlertDialog.Trigger render={trigger} /> : null}
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop className="ds-backdrop" />
        <BaseAlertDialog.Viewport className="ds-dialog-viewport">
          <BaseAlertDialog.Popup className={classNames('ds-dialog', className)} data-size="sm">
            <BaseAlertDialog.Title className="ds-dialog__title">{title}</BaseAlertDialog.Title>
            <BaseAlertDialog.Description className="ds-dialog__description">
              {description}
            </BaseAlertDialog.Description>
            {children}
            <div className="ds-dialog__footer">{actions}</div>
          </BaseAlertDialog.Popup>
        </BaseAlertDialog.Viewport>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}

export function AlertDialogClose({ children }: { children: ReactElement }) {
  return <BaseAlertDialog.Close render={children} />;
}
