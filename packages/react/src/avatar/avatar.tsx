'use client';

import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import { Children, type ReactNode } from 'react';
import { classNames } from '../internal/class-names.ts';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  name: string;
  src?: string;
  size?: AvatarSize;
  decorative?: boolean;
  className?: string;
}

export interface AvatarGroupProps {
  label: string;
  children: ReactNode;
  more?: { count: number; label: string };
  size?: AvatarSize;
  className?: string;
}

export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
}

export function Avatar({ name, src, size = 'md', decorative = false, className }: AvatarProps) {
  return (
    <BaseAvatar.Root
      className={classNames('ds-avatar', className)}
      data-size={size}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : name}
      aria-hidden={decorative || undefined}
    >
      {src ? <BaseAvatar.Image className="ds-avatar__image" src={src} alt="" /> : null}
      <BaseAvatar.Fallback aria-hidden="true">{initials(name)}</BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}

const list = 'list';

export function AvatarGroup({ label, children, more, size = 'md', className }: AvatarGroupProps) {
  return (
    <ul className={classNames('ds-avatar-group', className)} role={list} aria-label={label}>
      {Children.map(children, (child) => (
        <li className="ds-avatar-group__item">{child}</li>
      ))}
      {more ? (
        <li className="ds-avatar-group__item">
          <span
            className="ds-avatar"
            data-size={size}
            data-more=""
            role="img"
            aria-label={more.label}
          >
            <span aria-hidden="true">+{more.count}</span>
          </span>
        </li>
      ) : null}
    </ul>
  );
}
