import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link, Separator } from '@zigordev/react';
import { expect } from 'storybook/test';
import styles from '../docs.module.css';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  render: (args) => (
    <div className={styles.form}>
      <p className={styles.measure}>Work</p>
      <Separator {...args} />
      <p className={styles.measure}>Case studies</p>
    </div>
  ),
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  play: async ({ canvas }) => {
    const separator = canvas.getByRole('separator');
    await expect(separator.getBoundingClientRect().height).toBe(1);
    await expect(separator.getBoundingClientRect().width).toBeGreaterThan(1);
  },
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <nav aria-label="Elsewhere" className={styles.toolbar}>
      <Link href="#github" tone="neutral" underline="hover">
        GitHub
      </Link>
      <Separator {...args} />
      <Link href="#linkedin" tone="neutral" underline="hover">
        LinkedIn
      </Link>
    </nav>
  ),
  play: async ({ canvas }) => {
    const separator = canvas.getByRole('separator');
    await expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    await expect(separator.getBoundingClientRect().width).toBe(1);
    await expect(separator.getBoundingClientRect().height).toBeGreaterThan(1);
  },
};

export const Decorative: Story = {
  args: { decorative: true },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.queryByRole('separator')).toBeNull();
    await expect(canvasElement.querySelector('.ds-separator')).toHaveAttribute(
      'aria-hidden',
      'true'
    );
  },
};
