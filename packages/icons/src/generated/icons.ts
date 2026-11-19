import type { ReactElement } from 'react';
import { type IconNode, type IconProps, renderIcon } from '../render-icon.ts';

export const lucideVersion = '1.75.0';

const arrowDownRightNodes: IconNode = [['path', { d: 'm7 7 10 10' }], ['path', { d: 'M17 7v10H7' }]];

export function ArrowDownRightIcon(props: IconProps): ReactElement {
  return renderIcon('arrow-down-right', arrowDownRightNodes, props);
}

const arrowLeftNodes: IconNode = [['path', { d: 'm12 19-7-7 7-7' }], ['path', { d: 'M19 12H5' }]];

export function ArrowLeftIcon(props: IconProps): ReactElement {
  return renderIcon('arrow-left', arrowLeftNodes, props);
}

const arrowRightNodes: IconNode = [['path', { d: 'M5 12h14' }], ['path', { d: 'm12 5 7 7-7 7' }]];

export function ArrowRightIcon(props: IconProps): ReactElement {
  return renderIcon('arrow-right', arrowRightNodes, props);
}

const arrowUpRightNodes: IconNode = [['path', { d: 'M7 7h10v10' }], ['path', { d: 'M7 17 17 7' }]];

export function ArrowUpRightIcon(props: IconProps): ReactElement {
  return renderIcon('arrow-up-right', arrowUpRightNodes, props);
}

const briefcaseNodes: IconNode = [['path', { d: 'M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' }], ['rect', { width: '20', height: '14', x: '2', y: '6', rx: '2' }]];

export function BriefcaseIcon(props: IconProps): ReactElement {
  return renderIcon('briefcase', briefcaseNodes, props);
}

const calendarNodes: IconNode = [['path', { d: 'M8 2v3' }], ['path', { d: 'M16 2v3' }], ['rect', { x: '3', y: '3', width: '18', height: '18', rx: '2' }], ['path', { d: 'M3 9h18' }]];

export function CalendarIcon(props: IconProps): ReactElement {
  return renderIcon('calendar', calendarNodes, props);
}

const checkNodes: IconNode = [['path', { d: 'M20 6 9 17l-5-5' }]];

export function CheckIcon(props: IconProps): ReactElement {
  return renderIcon('check', checkNodes, props);
}

const chevronDownNodes: IconNode = [['path', { d: 'm6 9 6 6 6-6' }]];

export function ChevronDownIcon(props: IconProps): ReactElement {
  return renderIcon('chevron-down', chevronDownNodes, props);
}

const chevronLeftNodes: IconNode = [['path', { d: 'm15 18-6-6 6-6' }]];

export function ChevronLeftIcon(props: IconProps): ReactElement {
  return renderIcon('chevron-left', chevronLeftNodes, props);
}

const chevronRightNodes: IconNode = [['path', { d: 'm9 18 6-6-6-6' }]];

export function ChevronRightIcon(props: IconProps): ReactElement {
  return renderIcon('chevron-right', chevronRightNodes, props);
}

const chevronUpNodes: IconNode = [['path', { d: 'm18 15-6-6-6 6' }]];

export function ChevronUpIcon(props: IconProps): ReactElement {
  return renderIcon('chevron-up', chevronUpNodes, props);
}

const circleCheckNodes: IconNode = [['circle', { cx: '12', cy: '12', r: '10' }], ['path', { d: 'm16 9-5.5 5.5L8 12' }]];

export function CircleCheckIcon(props: IconProps): ReactElement {
  return renderIcon('circle-check', circleCheckNodes, props);
}

const circleExclamationPointNodes: IconNode = [['circle', { cx: '12', cy: '12', r: '10' }], ['line', { x1: '12', x2: '12', y1: '8', y2: '12' }], ['line', { x1: '12', x2: '12.01', y1: '16', y2: '16' }]];

export function CircleExclamationPointIcon(props: IconProps): ReactElement {
  return renderIcon('circle-exclamation-point', circleExclamationPointNodes, props);
}

const circleXNodes: IconNode = [['circle', { cx: '12', cy: '12', r: '10' }], ['path', { d: 'm15 9-6 6' }], ['path', { d: 'm9 9 6 6' }]];

export function CircleXIcon(props: IconProps): ReactElement {
  return renderIcon('circle-x', circleXNodes, props);
}

const clockNodes: IconNode = [['circle', { cx: '12', cy: '12', r: '10' }], ['path', { d: 'M12 6v6l4 2' }]];

export function ClockIcon(props: IconProps): ReactElement {
  return renderIcon('clock', clockNodes, props);
}

const codeNodes: IconNode = [['path', { d: 'm16 18 6-6-6-6' }], ['path', { d: 'm8 6-6 6 6 6' }]];

export function CodeIcon(props: IconProps): ReactElement {
  return renderIcon('code', codeNodes, props);
}

const copyNodes: IconNode = [['rect', { width: '14', height: '14', x: '8', y: '8', rx: '2', ry: '2' }], ['path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' }]];

export function CopyIcon(props: IconProps): ReactElement {
  return renderIcon('copy', copyNodes, props);
}

const downloadNodes: IconNode = [['path', { d: 'M12 15V3' }], ['path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }], ['path', { d: 'm7 10 5 5 5-5' }]];

export function DownloadIcon(props: IconProps): ReactElement {
  return renderIcon('download', downloadNodes, props);
}

const ellipsisNodes: IconNode = [['circle', { cx: '12', cy: '12', r: '1' }], ['circle', { cx: '19', cy: '12', r: '1' }], ['circle', { cx: '5', cy: '12', r: '1' }]];

export function EllipsisIcon(props: IconProps): ReactElement {
  return renderIcon('ellipsis', ellipsisNodes, props);
}

const externalLinkNodes: IconNode = [['path', { d: 'M15 3h6v6' }], ['path', { d: 'M10 14 21 3' }], ['path', { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' }]];

export function ExternalLinkIcon(props: IconProps): ReactElement {
  return renderIcon('external-link', externalLinkNodes, props);
}

const fileTextNodes: IconNode = [['path', { d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z' }], ['path', { d: 'M14 2v5a1 1 0 0 0 1 1h5' }], ['path', { d: 'M10 9H8' }], ['path', { d: 'M16 13H8' }], ['path', { d: 'M16 17H8' }]];

export function FileTextIcon(props: IconProps): ReactElement {
  return renderIcon('file-text', fileTextNodes, props);
}

const funnelNodes: IconNode = [['path', { d: 'M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z' }]];

export function FunnelIcon(props: IconProps): ReactElement {
  return renderIcon('funnel', funnelNodes, props);
}

const globeNodes: IconNode = [['circle', { cx: '12', cy: '12', r: '10' }], ['path', { d: 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20' }], ['path', { d: 'M2 12h20' }]];

export function GlobeIcon(props: IconProps): ReactElement {
  return renderIcon('globe', globeNodes, props);
}

const graduationCapNodes: IconNode = [['path', { d: 'M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z' }], ['path', { d: 'M22 10v6' }], ['path', { d: 'M6 12.5V16a6 3 0 0 0 12 0v-3.5' }]];

export function GraduationCapIcon(props: IconProps): ReactElement {
  return renderIcon('graduation-cap', graduationCapNodes, props);
}

const infoNodes: IconNode = [['circle', { cx: '12', cy: '12', r: '10' }], ['path', { d: 'M12 16v-4' }], ['path', { d: 'M12 8h.01' }]];

export function InfoIcon(props: IconProps): ReactElement {
  return renderIcon('info', infoNodes, props);
}

const languagesNodes: IconNode = [['path', { d: 'm5 8 6 6' }], ['path', { d: 'm4 14 6-6 2-3' }], ['path', { d: 'M2 5h12' }], ['path', { d: 'M7 2h1' }], ['path', { d: 'm22 22-5-10-5 10' }], ['path', { d: 'M14 18h6' }]];

export function LanguagesIcon(props: IconProps): ReactElement {
  return renderIcon('languages', languagesNodes, props);
}

const linkNodes: IconNode = [['path', { d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' }], ['path', { d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' }]];

export function LinkIcon(props: IconProps): ReactElement {
  return renderIcon('link', linkNodes, props);
}

const logInNodes: IconNode = [['path', { d: 'm10 17 5-5-5-5' }], ['path', { d: 'M15 12H3' }], ['path', { d: 'M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4' }]];

export function LogInIcon(props: IconProps): ReactElement {
  return renderIcon('log-in', logInNodes, props);
}

const logOutNodes: IconNode = [['path', { d: 'm16 17 5-5-5-5' }], ['path', { d: 'M21 12H9' }], ['path', { d: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' }]];

export function LogOutIcon(props: IconProps): ReactElement {
  return renderIcon('log-out', logOutNodes, props);
}

const mailNodes: IconNode = [['path', { d: 'm22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7' }], ['rect', { x: '2', y: '4', width: '20', height: '16', rx: '2' }]];

export function MailIcon(props: IconProps): ReactElement {
  return renderIcon('mail', mailNodes, props);
}

const mapPinNodes: IconNode = [['path', { d: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0' }], ['circle', { cx: '12', cy: '10', r: '3' }]];

export function MapPinIcon(props: IconProps): ReactElement {
  return renderIcon('map-pin', mapPinNodes, props);
}

const menuNodes: IconNode = [['path', { d: 'M4 5h16' }], ['path', { d: 'M4 12h16' }], ['path', { d: 'M4 19h16' }]];

export function MenuIcon(props: IconProps): ReactElement {
  return renderIcon('menu', menuNodes, props);
}

const minusNodes: IconNode = [['path', { d: 'M5 12h14' }]];

export function MinusIcon(props: IconProps): ReactElement {
  return renderIcon('minus', minusNodes, props);
}

const monitorNodes: IconNode = [['rect', { width: '20', height: '14', x: '2', y: '3', rx: '2' }], ['line', { x1: '8', x2: '16', y1: '21', y2: '21' }], ['line', { x1: '12', x2: '12', y1: '17', y2: '21' }]];

export function MonitorIcon(props: IconProps): ReactElement {
  return renderIcon('monitor', monitorNodes, props);
}

const moonNodes: IconNode = [['path', { d: 'M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401' }]];

export function MoonIcon(props: IconProps): ReactElement {
  return renderIcon('moon', moonNodes, props);
}

const pencilNodes: IconNode = [['path', { d: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z' }], ['path', { d: 'm15 5 4 4' }]];

export function PencilIcon(props: IconProps): ReactElement {
  return renderIcon('pencil', pencilNodes, props);
}

const phoneNodes: IconNode = [['path', { d: 'M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384' }]];

export function PhoneIcon(props: IconProps): ReactElement {
  return renderIcon('phone', phoneNodes, props);
}

const plusNodes: IconNode = [['path', { d: 'M5 12h14' }], ['path', { d: 'M12 5v14' }]];

export function PlusIcon(props: IconProps): ReactElement {
  return renderIcon('plus', plusNodes, props);
}

const refreshCwNodes: IconNode = [['path', { d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8' }], ['path', { d: 'M21 3v5h-5' }], ['path', { d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16' }], ['path', { d: 'M8 16H3v5' }]];

export function RefreshCwIcon(props: IconProps): ReactElement {
  return renderIcon('refresh-cw', refreshCwNodes, props);
}

const searchNodes: IconNode = [['path', { d: 'm21 21-4.34-4.34' }], ['circle', { cx: '11', cy: '11', r: '8' }]];

export function SearchIcon(props: IconProps): ReactElement {
  return renderIcon('search', searchNodes, props);
}

const sendNodes: IconNode = [['path', { d: 'M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z' }], ['path', { d: 'm21.854 2.147-10.94 10.939' }]];

export function SendIcon(props: IconProps): ReactElement {
  return renderIcon('send', sendNodes, props);
}

const settingsNodes: IconNode = [['path', { d: 'M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915' }], ['circle', { cx: '12', cy: '12', r: '3' }]];

export function SettingsIcon(props: IconProps): ReactElement {
  return renderIcon('settings', settingsNodes, props);
}

const share2Nodes: IconNode = [['circle', { cx: '18', cy: '5', r: '3' }], ['circle', { cx: '6', cy: '12', r: '3' }], ['circle', { cx: '18', cy: '19', r: '3' }], ['line', { x1: '8.59', x2: '15.42', y1: '13.51', y2: '17.49' }], ['line', { x1: '15.41', x2: '8.59', y1: '6.51', y2: '10.49' }]];

export function Share2Icon(props: IconProps): ReactElement {
  return renderIcon('share-2', share2Nodes, props);
}

const sparklesNodes: IconNode = [['path', { d: 'M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z' }], ['path', { d: 'M20 2v4' }], ['path', { d: 'M22 4h-4' }], ['circle', { cx: '4', cy: '20', r: '2' }]];

export function SparklesIcon(props: IconProps): ReactElement {
  return renderIcon('sparkles', sparklesNodes, props);
}

const sunNodes: IconNode = [['circle', { cx: '12', cy: '12', r: '4' }], ['path', { d: 'M12 2v2' }], ['path', { d: 'M12 20v2' }], ['path', { d: 'm4.93 4.93 1.41 1.41' }], ['path', { d: 'm17.66 17.66 1.41 1.41' }], ['path', { d: 'M2 12h2' }], ['path', { d: 'M20 12h2' }], ['path', { d: 'm6.34 17.66-1.41 1.41' }], ['path', { d: 'm19.07 4.93-1.41 1.41' }]];

export function SunIcon(props: IconProps): ReactElement {
  return renderIcon('sun', sunNodes, props);
}

const trashNodes: IconNode = [['path', { d: 'M10 11v6' }], ['path', { d: 'M14 11v6' }], ['path', { d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6' }], ['path', { d: 'M3 6h18' }], ['path', { d: 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' }]];

export function TrashIcon(props: IconProps): ReactElement {
  return renderIcon('trash', trashNodes, props);
}

const trendingUpNodes: IconNode = [['path', { d: 'M16 7h6v6' }], ['path', { d: 'm22 7-8.5 8.5-5-5L2 17' }]];

export function TrendingUpIcon(props: IconProps): ReactElement {
  return renderIcon('trending-up', trendingUpNodes, props);
}

const triangleExclamationPointNodes: IconNode = [['path', { d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3' }], ['path', { d: 'M12 9v4' }], ['path', { d: 'M12 17h.01' }]];

export function TriangleExclamationPointIcon(props: IconProps): ReactElement {
  return renderIcon('triangle-exclamation-point', triangleExclamationPointNodes, props);
}

const trophyNodes: IconNode = [['path', { d: 'M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2' }], ['path', { d: 'M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2' }], ['path', { d: 'M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3' }], ['path', { d: 'M4 22h16' }], ['path', { d: 'M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z' }], ['path', { d: 'M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3' }]];

export function TrophyIcon(props: IconProps): ReactElement {
  return renderIcon('trophy', trophyNodes, props);
}

const userNodes: IconNode = [['path', { d: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' }], ['circle', { cx: '12', cy: '7', r: '4' }]];

export function UserIcon(props: IconProps): ReactElement {
  return renderIcon('user', userNodes, props);
}

const usersNodes: IconNode = [['path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }], ['path', { d: 'M16 3.128a4 4 0 0 1 0 7.744' }], ['path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87' }], ['circle', { cx: '9', cy: '7', r: '4' }]];

export function UsersIcon(props: IconProps): ReactElement {
  return renderIcon('users', usersNodes, props);
}

const walletNodes: IconNode = [['path', { d: 'M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1' }], ['path', { d: 'M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4' }]];

export function WalletIcon(props: IconProps): ReactElement {
  return renderIcon('wallet', walletNodes, props);
}

const xNodes: IconNode = [['path', { d: 'M18 6 6 18' }], ['path', { d: 'm6 6 12 12' }]];

export function XIcon(props: IconProps): ReactElement {
  return renderIcon('x', xNodes, props);
}
