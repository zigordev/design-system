'use client';

import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu';
import { ChevronDownIcon } from '@zigordev/icons';
import type { ReactElement, ReactNode } from 'react';
import { classNames } from '../internal/class-names.ts';

export interface SiteNavigationLink {
  label: ReactNode;
  href: string;
  description?: ReactNode;
  current?: boolean;
  render?: ReactElement;
}

export interface SiteNavigationItem {
  label: ReactNode;
  href?: string;
  current?: boolean;
  render?: ReactElement;
  links?: SiteNavigationLink[];
}

export interface SiteNavigationProps {
  label: string;
  items: SiteNavigationItem[];
  className?: string;
}

function keyOf(item: { href?: string; label: ReactNode }): string {
  return item.href ?? String(item.label);
}

export function SiteNavigation({ label, items, className }: SiteNavigationProps) {
  return (
    <BaseNavigationMenu.Root aria-label={label} className={classNames('ds-site-nav', className)}>
      <BaseNavigationMenu.List className="ds-site-nav__list">
        {items.map((item) => (
          <BaseNavigationMenu.Item key={keyOf(item)}>
            {item.links ? (
              <>
                <BaseNavigationMenu.Trigger className="ds-site-nav__trigger">
                  {item.label}
                  <BaseNavigationMenu.Icon className="ds-site-nav__icon">
                    <ChevronDownIcon />
                  </BaseNavigationMenu.Icon>
                </BaseNavigationMenu.Trigger>
                <BaseNavigationMenu.Content>
                  <ul className="ds-site-nav__content">
                    {item.links.map((link) => (
                      <li key={link.href}>
                        <BaseNavigationMenu.Link
                          href={link.href}
                          render={link.render}
                          active={link.current}
                          aria-current={link.current ? 'page' : undefined}
                          className="ds-site-nav__content-link"
                        >
                          {link.label}
                          {link.description ? (
                            <span className="ds-site-nav__description">{link.description}</span>
                          ) : null}
                        </BaseNavigationMenu.Link>
                      </li>
                    ))}
                  </ul>
                </BaseNavigationMenu.Content>
              </>
            ) : (
              <BaseNavigationMenu.Link
                href={item.href}
                render={item.render}
                active={item.current}
                aria-current={item.current ? 'page' : undefined}
                className="ds-site-nav__link"
              >
                {item.label}
              </BaseNavigationMenu.Link>
            )}
          </BaseNavigationMenu.Item>
        ))}
      </BaseNavigationMenu.List>
      <BaseNavigationMenu.Portal>
        <BaseNavigationMenu.Positioner className="ds-positioner" sideOffset={8}>
          <BaseNavigationMenu.Popup className="ds-popup">
            <BaseNavigationMenu.Viewport />
          </BaseNavigationMenu.Popup>
        </BaseNavigationMenu.Positioner>
      </BaseNavigationMenu.Portal>
    </BaseNavigationMenu.Root>
  );
}
