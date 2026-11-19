'use client';

import { MonitorIcon, MoonIcon, SunIcon } from '@zigordev/icons';
import type { ReactNode } from 'react';
import { Toggle, ToggleGroup, type ToggleGroupSize } from '../toggle-group/toggle-group.tsx';

export const themeChoices = ['light', 'dark', 'system'] as const;

export type ThemeChoice = (typeof themeChoices)[number];

export interface ThemeSwitcherProps {
  value: ThemeChoice;
  onValueChange: (value: ThemeChoice) => void;
  label: string;
  labels: Record<ThemeChoice, string>;
  showLabels?: boolean;
  size?: ToggleGroupSize;
  className?: string;
}

const icons: Record<ThemeChoice, ReactNode> = {
  light: <SunIcon />,
  dark: <MoonIcon />,
  system: <MonitorIcon />,
};

function isThemeChoice(value: unknown): value is ThemeChoice {
  return themeChoices.some((choice) => choice === value);
}

export function ThemeSwitcher({
  value,
  onValueChange,
  label,
  labels,
  showLabels = false,
  size,
  className,
}: ThemeSwitcherProps) {
  return (
    <ToggleGroup
      aria-label={label}
      value={[value]}
      onValueChange={(next) => {
        const choice = next[0];
        if (isThemeChoice(choice)) onValueChange(choice);
      }}
      size={size}
      className={className}
    >
      {themeChoices.map((choice) =>
        showLabels ? (
          <Toggle key={choice} value={choice} icon={icons[choice]}>
            {labels[choice]}
          </Toggle>
        ) : (
          <Toggle key={choice} value={choice} icon={icons[choice]} aria-label={labels[choice]} />
        )
      )}
    </ToggleGroup>
  );
}
