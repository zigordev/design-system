import type { Meta, StoryObj } from '@storybook/react-vite';
import { Meter, Progress } from '@zigordev/react';
import { expect } from 'storybook/test';
import styles from '../docs.module.css';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  args: { label: 'Uploading the report', value: 40, showValue: true },
  decorators: [
    (Story) => (
      <div className={styles.form}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Determinate: Story = {
  play: async ({ canvas }) => {
    const bar = canvas.getByRole('progressbar', { name: 'Uploading the report' });
    await expect(bar).toHaveAttribute('aria-valuenow', '40');
  },
};

export const Indeterminate: Story = {
  args: { value: null, showValue: false },
  play: async ({ canvas, canvasElement }) => {
    const bar = canvas.getByRole('progressbar', { name: 'Uploading the report' });
    await expect(bar).not.toHaveAttribute('aria-valuenow');
    await expect(canvasElement.querySelector('.ds-progress__track')).toHaveAttribute(
      'data-indeterminate'
    );
  },
};

export const AMeter: Story = {
  render: () => <Meter label="Budget used" value={72} tone="warning" />,
  play: async ({ canvas }) => {
    const meter = canvas.getByRole('meter', { name: 'Budget used' });
    await expect(meter).toHaveAttribute('aria-valuenow', '72');
  },
};
