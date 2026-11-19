import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronLeftIcon, ChevronRightIcon } from '@zigordev/icons';
import { Toggle, ToggleGroup } from '@zigordev/react';
import { expect, fn } from 'storybook/test';

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  args: { 'aria-label': 'Standings view', defaultValue: ['table'], onValueChange: fn() },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] } },
  render: (args) => (
    <ToggleGroup {...args}>
      <Toggle value="table">Table</Toggle>
      <Toggle value="form">Form</Toggle>
      <Toggle value="fixtures">Fixtures</Toggle>
    </ToggleGroup>
  ),
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByRole('group', { name: 'Standings view' })).toHaveClass(
      'ds-toggle-group'
    );
    const table = canvas.getByRole('button', { name: 'Table' });
    const form = canvas.getByRole('button', { name: 'Form' });
    await expect(table).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(form);
    await expect(form).toHaveAttribute('aria-pressed', 'true');
    await expect(table).toHaveAttribute('aria-pressed', 'false');
    await expect(args.onValueChange).toHaveBeenCalledWith(['form'], expect.anything());
  },
};

export const Keyboard: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    const table = canvas.getByRole('button', { name: 'Table' });
    await expect(table).toHaveFocus();
    await expect(getComputedStyle(table).outlineStyle).toBe('solid');
    await userEvent.keyboard('{ArrowRight}');
    const form = canvas.getByRole('button', { name: 'Form' });
    await expect(form).toHaveFocus();
    await userEvent.keyboard(' ');
    await expect(form).toHaveAttribute('aria-pressed', 'true');
  },
};

export const Multiple: Story = {
  args: { multiple: true, defaultValue: ['table', 'form'] },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Table' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    await expect(canvas.getByRole('button', { name: 'Form' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  },
};

export const IconOnly: Story = {
  args: { 'aria-label': 'Matchday', defaultValue: [] },
  render: (args) => (
    <ToggleGroup {...args}>
      <Toggle value="previous" icon={<ChevronLeftIcon />} aria-label="Previous matchday" />
      <Toggle value="next" icon={<ChevronRightIcon />} aria-label="Next matchday" />
    </ToggleGroup>
  ),
  play: async ({ canvas }) => {
    const previous = canvas.getByRole('button', { name: 'Previous matchday' });
    await expect(previous).toHaveAttribute('data-icon-only');
    const box = previous.getBoundingClientRect();
    await expect(box.width).toBe(box.height);
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Form' }));
    await expect(args.onValueChange).not.toHaveBeenCalled();
  },
};
