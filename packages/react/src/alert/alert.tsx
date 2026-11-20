import {
  CircleCheckIcon,
  CircleExclamationPointIcon,
  InfoIcon,
  TriangleExclamationPointIcon,
  XIcon,
} from '@zigordev/icons';
import type { ReactNode } from 'react';
import { Button } from '../button/button.tsx';
import { classNames } from '../internal/class-names.ts';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

type Dismiss =
  | { onDismiss: () => void; dismissLabel: string }
  | { onDismiss?: never; dismissLabel?: never };

export type AlertProps = Dismiss & {
  tone?: AlertTone;
  title?: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
  variant?: 'inline' | 'banner';
  live?: 'polite' | 'assertive';
  className?: string;
};

const icons: Record<AlertTone, ReactNode> = {
  info: <InfoIcon />,
  success: <CircleCheckIcon />,
  warning: <TriangleExclamationPointIcon />,
  danger: <CircleExclamationPointIcon />,
  neutral: <InfoIcon />,
};

const roles = { polite: 'status', assertive: 'alert' } as const;

export function Alert({
  tone = 'info',
  title,
  children,
  action,
  variant = 'inline',
  live,
  onDismiss,
  dismissLabel,
  className,
}: AlertProps) {
  return (
    <div
      className={classNames('ds-alert', className)}
      data-tone={tone}
      data-variant={variant}
      role={live ? roles[live] : undefined}
    >
      <span className="ds-alert__icon" aria-hidden="true">
        {icons[tone]}
      </span>
      <div className="ds-alert__body">
        {title ? <p className="ds-alert__title">{title}</p> : null}
        {children ? <div>{children}</div> : null}
      </div>
      {action || onDismiss ? (
        <div className="ds-alert__actions">
          {action}
          {onDismiss ? (
            <Button
              variant="ghost"
              tone="neutral"
              size="sm"
              iconOnly
              aria-label={dismissLabel}
              onClick={onDismiss}
            >
              <XIcon />
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
