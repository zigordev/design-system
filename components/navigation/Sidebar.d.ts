import * as React from 'react';

export interface SidebarNavItem {
  href: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface SidebarProps {
  brand: React.ReactNode;
  items: SidebarNavItem[];
  activeHref: string;
  className?: string;
  style?: React.CSSProperties;
}

export declare function Sidebar(props: SidebarProps): JSX.Element;
