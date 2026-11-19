import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio, RadioGroup } from '@zigordev/react';
import { expect, fn } from 'storybook/test';
import styles from '../docs.module.css';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  args: {
    label: 'How should I reply?',
    name: 'reply',
    defaultValue: 'email',
    onValueChange: fn(),
    children: (
      <>
        <Radio value="email" label="Email" />
        <Radio value="phone" label="Phone" description="Weekdays, 10:00 to 18:00." />
        <Radio value="none" label="No reply needed" />
      </>
    ),
  },
  argTypes: { orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] } },
  decorators: [
    (Story) => (
      <div className={styles.form}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByRole('radiogroup', { name: 'How should I reply?' })).toBeVisible();
    await expect(canvas.getByRole('radio', { name: 'Email' })).toBeChecked();
    await userEvent.click(canvas.getByText('Phone'));
    await expect(canvas.getByRole('radio', { name: 'Phone' })).toBeChecked();
    await expect(canvas.getByRole('radio', { name: 'Email' })).not.toBeChecked();
    await expect(args.onValueChange).toHaveBeenCalledWith('phone', expect.anything());
  },
};

export const Keyboard: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    const email = canvas.getByRole('radio', { name: 'Email' });
    await expect(email).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    const phone = canvas.getByRole('radio', { name: 'Phone' });
    await expect(phone).toHaveFocus();
    await expect(phone).toBeChecked();
    await expect(phone).toHaveAccessibleDescription('Weekdays, 10:00 to 18:00.');
  },
};

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  play: async ({ canvas }) => {
    const [first, second] = canvas.getAllByRole('radio');
    await expect(first?.getBoundingClientRect().top).toBe(second?.getBoundingClientRect().top);
  },
};

export const WithError: Story = {
  args: { defaultValue: undefined, error: 'Choose how I should reply' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Choose how I should reply')).toHaveClass('ds-field__error');
    await expect(canvas.getByRole('radiogroup')).toHaveAccessibleDescription(
      expect.stringContaining('Choose how I should reply')
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    for (const radio of canvas.getAllByRole('radio')) {
      await expect(radio).toHaveAttribute('aria-disabled', 'true');
    }
  },
};
