'use client';

import { Popover as BasePopover } from '@base-ui/react/popover';
import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import type { ComponentProps, ReactElement, ReactNode } from 'react';
import { classNames } from '../internal/class-names.ts';
import type { OverlaySide } from '../tooltip/tooltip.tsx';

export type OverlayAlign = 'start' | 'center' | 'end';

type PopoverName =
  | { title: ReactNode; 'aria-label'?: never }
  | { title?: never; 'aria-label': string };

export type PopoverProps = Omit<ComponentProps<typeof BasePopover.Root>, 'children'> &
  PopoverName & {
    trigger: ReactElement;
    description?: ReactNode;
    children?: ReactNode;
    side?: OverlaySide;
    align?: OverlayAlign;
    className?: string;
  };

export type PreviewCardProps = Omit<ComponentProps<typeof BasePreviewCard.Root>, 'children'> & {
  trigger: ReactElement;
  children: ReactNode;
  delay?: number;
  side?: OverlaySide;
  align?: OverlayAlign;
  className?: string;
};

export function Popover({
  trigger,
  title,
  'aria-label': label,
  description,
  children,
  side = 'bottom',
  align = 'center',
  className,
  ...props
}: PopoverProps) {
  return (
    <BasePopover.Root {...props}>
      <BasePopover.Trigger render={trigger} />
      <BasePopover.Portal>
        <BasePopover.Positioner className="ds-positioner" side={side} align={align} sideOffset={8}>
          <BasePopover.Popup className={classNames('ds-popup', className)} aria-label={label}>
            {title ? (
              <BasePopover.Title className="ds-popup__title">{title}</BasePopover.Title>
            ) : null}
            {description ? (
              <BasePopover.Description className="ds-popup__description">
                {description}
              </BasePopover.Description>
            ) : null}
            {children}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}

export function PreviewCard({
  trigger,
  children,
  delay,
  side = 'bottom',
  align = 'center',
  className,
  ...props
}: PreviewCardProps) {
  return (
    <BasePreviewCard.Root {...props}>
      <BasePreviewCard.Trigger render={trigger} delay={delay} />
      <BasePreviewCard.Portal>
        <BasePreviewCard.Positioner
          className="ds-positioner"
          side={side}
          align={align}
          sideOffset={8}
        >
          <BasePreviewCard.Popup className={classNames('ds-popup', className)}>
            {children}
          </BasePreviewCard.Popup>
        </BasePreviewCard.Positioner>
      </BasePreviewCard.Portal>
    </BasePreviewCard.Root>
  );
}
