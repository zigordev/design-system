import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, type BadgeTone, type BadgeVariant } from '@zigordev/react';
import { expect } from 'storybook/test';
import styles from '../docs.module.css';

const tones: BadgeTone[] = ['neutral', 'accent', 'success', 'warning', 'danger', 'info'];
const variants: BadgeVariant[] = ['soft', 'solid', 'outline'];

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'Live' },
  argTypes: {
    tone: { control: 'select', options: tones },
    variant: { control: 'inline-radio', options: variants },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const badge = canvas.getByText('Live');
    await expect(badge).toHaveClass('ds-badge');
    await expect(badge).toHaveAttribute('data-tone', 'neutral');
  },
};

export const TonesAndVariants: Story = {
  render: () => (
    <div className={styles.grid3}>
      {tones.flatMap((tone) =>
        variants.map((variant) => (
          <Badge key={`${tone}-${variant}`} tone={tone} variant={variant}>
            {`${tone} ${variant}`}
          </Badge>
        ))
      )}
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll('.ds-badge')).toHaveLength(
      tones.length * variants.length
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className={styles.row}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </div>
  ),
  play: async ({ canvas }) => {
    const small = canvas.getByText('Small').getBoundingClientRect().height;
    const medium = canvas.getByText('Medium').getBoundingClientRect().height;
    await expect(small).toBeLessThan(medium);
  },
};
