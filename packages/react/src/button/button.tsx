'use client';

import { Button as BaseButton } from '@base-ui/react/button';
import { useRender } from '@base-ui/react/use-render';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { classNames } from '../internal/class-names.ts';

export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost';
export type ButtonTone = 'accent' | 'neutral' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface Appearance {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  className?: string;
}

interface WithText {
  iconOnly?: false;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

interface IconOnly {
  iconOnly: true;
  'aria-label': string;
  startIcon?: never;
  endIcon?: never;
}

type Content = WithText | IconOnly;

type BaseButtonProps = Omit<
  ComponentPropsWithRef<typeof BaseButton>,
  'className' | 'render' | 'nativeButton' | 'children'
>;

export type ButtonProps = BaseButtonProps &
  Appearance &
  Content & {
    children: ReactNode;
    loading?: boolean;
  };

export type LinkButtonProps = Omit<ComponentPropsWithRef<'a'>, 'className' | 'children'> &
  Appearance &
  Content & {
    children: ReactNode;
    render?: useRender.RenderProp;
  };

function appearance({ variant = 'solid', tone = 'accent', size = 'md', className }: Appearance) {
  return {
    className: classNames('ds-button', className),
    'data-variant': variant,
    'data-tone': tone,
    'data-size': size,
  };
}

function icon(node: ReactNode) {
  return (
    <span className="ds-button__icon" aria-hidden="true">
      {node}
    </span>
  );
}

function content(children: ReactNode, { iconOnly, startIcon, endIcon }: Content, loading = false) {
  if (iconOnly) {
    return loading ? <span className="ds-button__spinner" aria-hidden="true" /> : icon(children);
  }
  return (
    <>
      {loading ? (
        <span className="ds-button__spinner" aria-hidden="true" />
      ) : startIcon ? (
        icon(startIcon)
      ) : null}
      {children}
      {endIcon && !loading ? icon(endIcon) : null}
    </>
  );
}

export function Button({
  variant,
  tone,
  size,
  className,
  iconOnly,
  startIcon,
  endIcon,
  loading = false,
  disabled = false,
  focusableWhenDisabled,
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  const slots = { iconOnly, startIcon, endIcon } as Content;
  return (
    <BaseButton
      {...props}
      {...appearance({ variant, tone, size, className })}
      data-icon-only={iconOnly ? '' : undefined}
      type={type}
      disabled={disabled || loading}
      focusableWhenDisabled={focusableWhenDisabled ?? loading}
      aria-busy={loading || undefined}
    >
      {content(children, slots, loading)}
    </BaseButton>
  );
}

export function LinkButton({
  variant,
  tone,
  size,
  className,
  iconOnly,
  startIcon,
  endIcon,
  render,
  children,
  ...props
}: LinkButtonProps) {
  const slots = { iconOnly, startIcon, endIcon } as Content;
  return useRender({
    render,
    defaultTagName: 'a',
    props: {
      ...props,
      ...appearance({ variant, tone, size, className }),
      'data-icon-only': iconOnly ? '' : undefined,
      children: content(children, slots),
    },
  });
}
