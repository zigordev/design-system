import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ThemeChoice, ThemeSwitcher } from '@zigordev/react';
import { useState } from 'react';
import { expect, fn } from 'storybook/test';

const change = fn();

function Controlled({ showLabels }: { showLabels?: boolean }) {
  const [value, setValue] = useState<ThemeChoice>('system');
  return (
    <ThemeSwitcher
      label="Theme"
      labels={{ light: 'Light', dark: 'Dark', system: 'System' }}
      value={value}
      onValueChange={(next) => {
        change(next);
        setValue(next);
      }}
      showLabels={showLabels}
    />
  );
}

const meta = {
  title: 'Components/ThemeSwitcher',
  component: ThemeSwitcher,
  args: {
    label: 'Theme',
    labels: { light: 'Light', dark: 'Dark', system: 'System' },
    value: 'system',
    onValueChange: fn(),
  },
  render: () => <Controlled />,
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    change.mockClear();
    await expect(canvas.getByRole('group', { name: 'Theme' })).toBeVisible();
    const system = canvas.getByRole('button', { name: 'System' });
    const dark = canvas.getByRole('button', { name: 'Dark' });
    await expect(system).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(dark);
    await expect(change).toHaveBeenLastCalledWith('dark');
    await expect(dark).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(dark);
    await expect(dark).toHaveAttribute('aria-pressed', 'true');
    await expect(change).toHaveBeenCalledTimes(1);
  },
};

export const WithLabels: Story = {
  render: () => <Controlled showLabels />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Light' })).toHaveTextContent('Light');
    await expect(canvas.getByRole('button', { name: 'Light' })).not.toHaveAttribute(
      'data-icon-only'
    );
  },
};
