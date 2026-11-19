'use client';

import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { CheckIcon, ChevronDownIcon } from '@zigordev/icons';
import type { ComponentProps, ReactElement, ReactNode } from 'react';
import { Button } from '../button/button.tsx';
import { classNames } from '../internal/class-names.ts';
import type { OverlayAlign } from '../popover/popover.tsx';
import type { OverlaySide } from '../tooltip/tooltip.tsx';

type Styled<T> = Omit<T, 'className' | 'render'> & { className?: string };

export type MenuProps = Omit<ComponentProps<typeof BaseMenu.Root>, 'children'> & {
  trigger: ReactElement;
  children: ReactNode;
  side?: OverlaySide;
  align?: OverlayAlign;
  className?: string;
};

export type MenuItemProps = Styled<ComponentProps<typeof BaseMenu.Item>> & {
  icon?: ReactNode;
  tone?: 'neutral' | 'danger';
};

export type MenuLinkItemProps = Omit<ComponentProps<typeof BaseMenu.LinkItem>, 'className'> & {
  icon?: ReactNode;
  className?: string;
};

export type MenuCheckboxItemProps = Styled<ComponentProps<typeof BaseMenu.CheckboxItem>>;
export type MenuRadioGroupProps = Styled<ComponentProps<typeof BaseMenu.RadioGroup>> & {
  label?: ReactNode;
};
export type MenuRadioItemProps = Styled<ComponentProps<typeof BaseMenu.RadioItem>>;

export interface ContextMenuProps {
  children: ReactNode;
  content: ReactNode;
  className?: string;
}

export interface ScopeOption {
  value: string;
  label: string;
}

export interface ScopeSwitcherProps {
  label: string;
  value: string;
  options: ScopeOption[];
  onValueChange: (value: string) => void;
  className?: string;
}

function itemIcon(icon: ReactNode) {
  return icon ? (
    <span className="ds-menu__icon" aria-hidden="true">
      {icon}
    </span>
  ) : null;
}

export function Menu({
  trigger,
  children,
  side = 'bottom',
  align = 'start',
  className,
  ...props
}: MenuProps) {
  return (
    <BaseMenu.Root {...props}>
      <BaseMenu.Trigger render={trigger} />
      <BaseMenu.Portal>
        <BaseMenu.Positioner className="ds-positioner" side={side} align={align} sideOffset={4}>
          <BaseMenu.Popup className={classNames('ds-popup ds-menu', className)}>
            {children}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}

export function MenuItem({ icon, tone = 'neutral', className, children, ...props }: MenuItemProps) {
  return (
    <BaseMenu.Item {...props} className={classNames('ds-menu__item', className)} data-tone={tone}>
      {itemIcon(icon)}
      {children}
    </BaseMenu.Item>
  );
}

export function MenuLinkItem({ icon, className, children, ...props }: MenuLinkItemProps) {
  return (
    <BaseMenu.LinkItem {...props} className={classNames('ds-menu__item', className)}>
      {itemIcon(icon)}
      {children}
    </BaseMenu.LinkItem>
  );
}

export function MenuSeparator() {
  return <BaseMenu.Separator className="ds-menu__separator" />;
}

export function MenuGroup({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <BaseMenu.Group>
      <BaseMenu.GroupLabel className="ds-menu__label">{label}</BaseMenu.GroupLabel>
      {children}
    </BaseMenu.Group>
  );
}

export function MenuCheckboxItem({ className, children, ...props }: MenuCheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem {...props} className={classNames('ds-menu__item', className)}>
      <span className="ds-menu__indicator-slot">
        <BaseMenu.CheckboxItemIndicator className="ds-menu__indicator">
          <CheckIcon />
        </BaseMenu.CheckboxItemIndicator>
      </span>
      {children}
    </BaseMenu.CheckboxItem>
  );
}

export function MenuRadioGroup({ label, children, className, ...props }: MenuRadioGroupProps) {
  return (
    <BaseMenu.RadioGroup {...props} className={className}>
      {label ? <BaseMenu.GroupLabel className="ds-menu__label">{label}</BaseMenu.GroupLabel> : null}
      {children}
    </BaseMenu.RadioGroup>
  );
}

export function MenuRadioItem({ className, children, ...props }: MenuRadioItemProps) {
  return (
    <BaseMenu.RadioItem {...props} className={classNames('ds-menu__item', className)}>
      <span className="ds-menu__indicator-slot">
        <BaseMenu.RadioItemIndicator className="ds-menu__indicator">
          <CheckIcon />
        </BaseMenu.RadioItemIndicator>
      </span>
      {children}
    </BaseMenu.RadioItem>
  );
}

export function ContextMenu({ children, content, className }: ContextMenuProps) {
  return (
    <BaseContextMenu.Root>
      <BaseContextMenu.Trigger className={className}>{children}</BaseContextMenu.Trigger>
      <BaseContextMenu.Portal>
        <BaseContextMenu.Positioner className="ds-positioner">
          <BaseContextMenu.Popup className="ds-popup ds-menu">{content}</BaseContextMenu.Popup>
        </BaseContextMenu.Positioner>
      </BaseContextMenu.Portal>
    </BaseContextMenu.Root>
  );
}

export function ScopeSwitcher({
  label,
  value,
  options,
  onValueChange,
  className,
}: ScopeSwitcherProps) {
  const current = options.find((option) => option.value === value);
  return (
    <Menu
      trigger={
        <Button
          variant="outline"
          tone="neutral"
          endIcon={<ChevronDownIcon />}
          className={className}
        >
          <span className="ds-visually-hidden">{label}: </span>
          {current?.label ?? value}
        </Button>
      }
    >
      <MenuRadioGroup
        label={label}
        value={value}
        onValueChange={(next) => onValueChange(String(next))}
      >
        {options.map((option) => (
          <MenuRadioItem key={option.value} value={option.value}>
            {option.label}
          </MenuRadioItem>
        ))}
      </MenuRadioGroup>
    </Menu>
  );
}
