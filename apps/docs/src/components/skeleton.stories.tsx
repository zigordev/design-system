import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, Skeleton } from '@zigordev/react';
import { expect } from 'storybook/test';
import styles from '../docs.module.css';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  args: { shape: 'text', lines: 3 },
  argTypes: { shape: { control: 'inline-radio', options: ['text', 'rect', 'circle'] } },
  render: (args) => (
    <div className={styles.form} aria-busy="true">
      <Skeleton {...args} />
    </div>
  ),
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  play: async ({ canvasElement }) => {
    const group = canvasElement.querySelector('.ds-skeleton-text');
    await expect(group).toHaveAttribute('aria-hidden', 'true');
    const lines = [...canvasElement.querySelectorAll('.ds-skeleton')];
    await expect(lines).toHaveLength(3);
    const first = lines[0]?.getBoundingClientRect().width ?? 0;
    const last = lines[2]?.getBoundingClientRect().width ?? 0;
    await expect(last).toBeLessThan(first);
  },
};

export const Shapes: Story = {
  render: () => (
    <Card className={styles.card} aria-busy="true">
      <div className={styles.row}>
        <Skeleton shape="circle" />
        <div className={styles.grow}>
          <Skeleton lines={2} />
        </div>
      </div>
      <Skeleton shape="rect" />
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const circle = canvasElement.querySelector('[data-shape="circle"]')?.getBoundingClientRect();
    await expect(circle?.width).toBe(circle?.height);
    for (const placeholder of canvasElement.querySelectorAll('.ds-skeleton, .ds-skeleton-text')) {
      await expect(placeholder.closest('[aria-hidden="true"]')).not.toBeNull();
    }
  },
};
