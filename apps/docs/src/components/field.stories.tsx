import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field, TextInput } from '@zigordev/react';
import { expect, waitFor } from 'storybook/test';
import styles from '../docs.module.css';

const meta = {
  title: 'Components/Field',
  component: Field,
  args: {
    label: 'Email',
    description: 'We reply within two days.',
    children: <TextInput type="email" name="email" autoComplete="email" />,
  },
  decorators: [
    (Story) => (
      <div className={styles.form}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Email');
    await expect(input).toHaveAccessibleDescription('We reply within two days.');
    await userEvent.type(input, 'ada@example.com');
    await expect(input).toHaveValue('ada@example.com');
  },
};

export const Required: Story = {
  args: {
    label: 'Name',
    description: undefined,
    required: true,
    children: <TextInput name="name" autoComplete="name" />,
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox', { name: 'Name' });
    await expect(input).toBeRequired();
    await expect(canvas.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  },
};

export const WithError: Story = {
  args: {
    label: 'Name',
    description: 'As it appears on your CV.',
    error: 'Enter your name',
    children: <TextInput name="name" autoComplete="name" />,
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox', { name: 'Name' });
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveAccessibleDescription(expect.stringContaining('Enter your name'));
    await expect(canvas.getByText('Enter your name')).toHaveClass('ds-field__error');
  },
};

export const ValidatedOnBlur: Story = {
  args: { validationMode: 'onBlur' },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox', { name: 'Email' });
    await userEvent.type(input, 'ada@');
    await userEvent.tab();
    await waitFor(() => expect(input).toHaveAttribute('aria-invalid', 'true'));
    await userEvent.type(input, 'example.com');
    await userEvent.tab();
    await waitFor(() => expect(input).not.toHaveAttribute('aria-invalid', 'true'));
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Email')).toBeDisabled();
    await expect(canvas.getByText('Email')).toHaveAttribute('data-disabled');
  },
};

export const Keyboard: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    const input = canvas.getByLabelText('Email');
    await expect(input).toHaveFocus();
    await expect(getComputedStyle(input).outlineStyle).toBe('solid');
  },
};
