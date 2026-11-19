import { cloneElement, type ReactElement, type ReactNode } from 'react';
import { classNames } from '../internal/class-names.ts';

export interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  breadcrumbs?: ReactNode;
  headingLevel?: 1 | 2;
  className?: string;
}

export interface AppShellProps {
  children: ReactNode;
  header?: ReactNode;
  sidebar?: ReactNode;
  sidebarLabel?: string;
  footer?: ReactNode;
  tabBar?: ReactNode;
  mainId?: string;
  className?: string;
}

export interface TopBarProps {
  start?: ReactNode;
  children?: ReactNode;
  end?: ReactNode;
  className?: string;
}

export interface TabBarItem {
  label: ReactNode;
  href: string;
  icon: ReactNode;
  current?: boolean;
  render?: ReactElement<Record<string, unknown>>;
}

export interface BottomTabBarProps {
  label: string;
  items: TabBarItem[];
  mobileOnly?: boolean;
  className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  breadcrumbs,
  headingLevel = 1,
  className,
}: PageHeaderProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <div className={classNames('ds-page-header', className)}>
      {breadcrumbs}
      <div className="ds-page-header__row">
        <Heading className="ds-page-header__title">{title}</Heading>
        {actions ? <div className="ds-page-header__actions">{actions}</div> : null}
      </div>
      {description ? <p className="ds-page-header__description">{description}</p> : null}
    </div>
  );
}

export function AppShell({
  children,
  header,
  sidebar,
  sidebarLabel,
  footer,
  tabBar,
  mainId = 'main',
  className,
}: AppShellProps) {
  return (
    <div className={classNames('ds-app-shell', className)} data-sidebar={sidebar ? '' : undefined}>
      {header ? <div className="ds-app-shell__header">{header}</div> : null}
      {sidebar ? (
        <nav className="ds-app-shell__sidebar" aria-label={sidebarLabel}>
          {sidebar}
        </nav>
      ) : null}
      <main className="ds-app-shell__main" id={mainId} tabIndex={-1}>
        {children}
      </main>
      {footer ? <footer className="ds-app-shell__footer">{footer}</footer> : null}
      {tabBar ? <div className="ds-app-shell__tabs">{tabBar}</div> : null}
    </div>
  );
}

export function TopBar({ start, children, end, className }: TopBarProps) {
  return (
    <header className={classNames('ds-top-bar', className)}>
      <div className="ds-top-bar__start">{start}</div>
      <div className="ds-top-bar__middle">{children}</div>
      <div className="ds-top-bar__end">{end}</div>
    </header>
  );
}

export function BottomTabBar({ label, items, mobileOnly = true, className }: BottomTabBarProps) {
  return (
    <nav
      className={classNames('ds-tab-bar', className)}
      aria-label={label}
      data-mobile-only={mobileOnly ? '' : undefined}
    >
      {items.map((item) => {
        const props = {
          className: 'ds-tab-bar__link',
          href: item.href,
          'aria-current': item.current ? ('page' as const) : undefined,
          children: (
            <>
              <span className="ds-tab-bar__icon" aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
            </>
          ),
        };
        return item.render ? (
          cloneElement(item.render, { key: item.href, ...props })
        ) : (
          <a key={item.href} {...props} />
        );
      })}
    </nav>
  );
}
