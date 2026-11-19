import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox, CheckboxGroup } from '@zigordev/react';
import { expect, fn } from 'storybook/test';
import styles from '../docs.module.css';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: { label: 'Send me the monthly newsletter', name: 'newsletter', onCheckedChange: fn() },
  decorators: [
    (Story) => (
      <div className={styles.form}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const checkbox = canvas.getByRole('checkbox', { name: 'Send me the monthly newsletter' });
    await expect(checkbox).not.toBeChecked();
    await userEvent.click(canvas.getByText('Send me the monthly newsletter'));
    await expect(checkbox).toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenCalledOnce();
  },
};

export const Keyboard: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    const checkbox = canvas.getByRole('checkbox');
    await expect(checkbox).toHaveFocus();
    await expect(getComputedStyle(checkbox).outlineStyle).toBe('solid');
    await userEvent.keyboard(' ');
    await expect(checkbox).toBeChecked();
  },
};

export const WithDescription: Story = {
  args: { description: 'One email a month. Unsubscribe from any email.', defaultChecked: true },
  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole('checkbox');
    await expect(checkbox).toBeChecked();
    await expect(checkbox).toHaveAccessibleDescription(
      'One email a month. Unsubscribe from any email.'
    );
  },
};

export const Indeterminate: Story = {
  args: { label: 'All topics', indeterminate: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
  },
};

export const WithError: Story = {
  args: { label: 'I agree to be contacted', error: 'Agree to be contacted to send the form' },
  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole('checkbox');
    await expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    await expect(checkbox).toHaveAccessibleDescription(
      expect.stringContaining('Agree to be contacted to send the form')
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ args, canvas, userEvent }) => {
    const checkbox = canvas.getByRole('checkbox');
    await expect(checkbox).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(canvas.getByText('Send me the monthly newsletter'));
    await expect(checkbox).not.toBeChecked();
    await expect(args.onCheckedChange).not.toHaveBeenCalled();
  },
};

export const Group: Story = {
  render: () => (
    <CheckboxGroup label="Topics" description="Choose any." name="topics" defaultValue={['design']}>
      <Checkbox value="design" label="Design systems" />
      <Checkbox value="testing" label="Testing" />
      <Checkbox value="observability" label="Observability" />
    </CheckboxGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    const group = canvas.getByRole('group', { name: 'Topics' });
    await expect(group).toHaveAccessibleDescription('Choose any.');
    await expect(canvas.getByRole('checkbox', { name: 'Design systems' })).toBeChecked();
    await userEvent.click(canvas.getByText('Testing'));
    await expect(canvas.getByRole('checkbox', { name: 'Testing' })).toBeChecked();
    await expect(canvas.getByRole('checkbox', { name: 'Observability' })).not.toBeChecked();
  },
};

export const GroupWithError: Story = {
  render: () => (
    <CheckboxGroup label="Topics" name="topics" defaultValue={[]} error="Choose at least one topic">
      <Checkbox value="design" label="Design systems" />
      <Checkbox value="testing" label="Testing" />
    </CheckboxGroup>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Choose at least one topic')).toHaveClass('ds-field__error');
  },
};
