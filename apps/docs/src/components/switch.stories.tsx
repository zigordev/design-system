import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from '@zigordev/react';
import { expect, fn } from 'storybook/test';
import styles from '../docs.module.css';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  args: { label: 'Show prices with tax', name: 'tax', onCheckedChange: fn() },
  decorators: [
    (Story) => (
      <div className={styles.form}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const toggle = canvas.getByRole('switch', { name: 'Show prices with tax' });
    await expect(toggle).not.toBeChecked();
    await userEvent.click(toggle);
    await expect(toggle).toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  },
};

export const Keyboard: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    const toggle = canvas.getByRole('switch');
    await expect(toggle).toHaveFocus();
    await expect(getComputedStyle(toggle).outlineStyle).toBe('solid');
    await userEvent.keyboard(' ');
    await expect(toggle).toBeChecked();
    await userEvent.keyboard('{Enter}');
    await expect(toggle).not.toBeChecked();
  },
};

export const WithDescription: Story = {
  args: { description: 'Prices include 21% VAT.', defaultChecked: true },
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole('switch');
    await expect(toggle).toBeChecked();
    await expect(toggle).toHaveAccessibleDescription('Prices include 21% VAT.');
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ args, canvas, userEvent }) => {
    const toggle = canvas.getByRole('switch');
    await userEvent.click(toggle);
    await expect(toggle).not.toBeChecked();
    await expect(args.onCheckedChange).not.toHaveBeenCalled();
  },
};
