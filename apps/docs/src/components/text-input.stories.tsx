import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextInput } from '@zigordev/react';
import { expect } from 'storybook/test';
import styles from '../docs.module.css';

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  args: { 'aria-label': 'Search the case studies', type: 'search', placeholder: 'gpool, testing' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    type: { control: 'select', options: ['text', 'email', 'password', 'search', 'tel', 'url'] },
  },
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('searchbox', { name: 'Search the case studies' });
    await expect(input).toHaveClass('ds-text-input');
    await userEvent.type(input, 'release-please');
    await expect(input).toHaveValue('release-please');
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className={styles.form}>
      <TextInput {...args} size="sm" aria-label="Small" />
      <TextInput {...args} size="md" aria-label="Medium" />
      <TextInput {...args} size="lg" aria-label="Large" />
    </div>
  ),
  play: async ({ canvas }) => {
    const heights = ['Small', 'Medium', 'Large'].map(
      (name) => canvas.getByRole('searchbox', { name }).getBoundingClientRect().height
    );
    await expect(heights[0]).toBeLessThan(heights[1] ?? 0);
    await expect(heights[1]).toBeLessThan(heights[2] ?? 0);
  },
};

export const ReadOnly: Story = {
  args: { type: 'text', 'aria-label': 'Licence', defaultValue: 'UNLICENSED', readOnly: true },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox', { name: 'Licence' });
    await userEvent.type(input, 'MIT');
    await expect(input).toHaveValue('UNLICENSED');
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('searchbox')).toBeDisabled();
  },
};
