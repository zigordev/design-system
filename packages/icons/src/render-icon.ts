import { createElement, type ReactElement, type SVGProps } from 'react';

export type IconNode = readonly (readonly [string, Readonly<Record<string, string>>])[];
export type IconSize = 'sm' | 'md' | 'lg';

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'ref'> & {
  size?: IconSize;
  label?: string;
};

export type IconComponent = (props: IconProps) => ReactElement;

export function renderIcon(
  name: string,
  nodes: IconNode,
  { size = 'md', label, className, ...props }: IconProps
): ReactElement {
  const meaning = label
    ? { role: 'img', 'aria-label': label }
    : { 'aria-hidden': true, focusable: 'false' };
  return createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      ...props,
      ...meaning,
      className: className ? `ds-icon ${className}` : 'ds-icon',
      'data-icon': name,
      'data-size': size,
    },
    ...nodes.map(([tag, attributes]) => createElement(tag, attributes))
  );
}
