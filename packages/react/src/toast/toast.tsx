'use client';

import { Toast as BaseToast } from '@base-ui/react/toast';
import { XIcon } from '@zigordev/icons';
import type { ReactNode } from 'react';

export type ToastTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

export interface ToastOptions {
  title: ReactNode;
  description?: ReactNode;
  tone?: ToastTone;
  timeout?: number;
}

export interface ToastProviderProps {
  children: ReactNode;
  closeLabel: string;
  limit?: number;
  timeout?: number;
}

function ToastList({ closeLabel }: { closeLabel: string }) {
  const { toasts } = BaseToast.useToastManager();
  return toasts.map((toast) => (
    <BaseToast.Root
      key={toast.id}
      toast={toast}
      className="ds-toast"
      data-tone={toast.type ?? 'info'}
    >
      <BaseToast.Content>
        <BaseToast.Title className="ds-toast__title" />
        <BaseToast.Description className="ds-toast__description" />
      </BaseToast.Content>
      <BaseToast.Close
        className="ds-button"
        data-variant="ghost"
        data-tone="neutral"
        data-size="sm"
        data-icon-only=""
        aria-label={closeLabel}
      >
        <span className="ds-button__icon" aria-hidden="true">
          <XIcon />
        </span>
      </BaseToast.Close>
    </BaseToast.Root>
  ));
}

export function ToastProvider({
  children,
  closeLabel,
  limit = 3,
  timeout = 5000,
}: ToastProviderProps) {
  return (
    <BaseToast.Provider limit={limit} timeout={timeout}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className="ds-toast-viewport">
          <ToastList closeLabel={closeLabel} />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}

export function useToast() {
  const manager = BaseToast.useToastManager();
  return {
    add: ({ title, description, tone = 'info', timeout }: ToastOptions) =>
      manager.add({ title, description, type: tone, timeout }),
    close: (id: string) => manager.close(id),
  };
}
