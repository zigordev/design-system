import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from '@zigordev/react';
import { expect } from 'storybook/test';
import styles from '../docs.module.css';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  args: { label: 'Loading the case studies' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    tone: { control: 'inline-radio', options: ['accent', 'neutral'] },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole('status')).toHaveTextContent('Loading the case studies');
    const spinner = canvasElement.querySelector('.ds-spinner');
    await expect(spinner).toHaveAttribute('aria-hidden', 'true');
    await expect(getComputedStyle(spinner as Element).animationName).toBe('ds-spinner-spin');
  },
};

export const Decorative: Story = {
  args: { label: undefined },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.queryByRole('status')).toBeNull();
    await expect(canvasElement.querySelector('.ds-spinner')).toHaveAttribute('aria-hidden', 'true');
  },
};

export const SizesAndTones: Story = {
  args: { label: undefined },
  render: () => (
    <div className={styles.row}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="md" tone="neutral" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const widths = [...canvasElement.querySelectorAll('.ds-spinner')].map(
      (spinner) => spinner.getBoundingClientRect().width
    );
    await expect(widths[0]).toBeLessThan(widths[1] ?? 0);
    await expect(widths[1]).toBeLessThan(widths[2] ?? 0);
  },
};
