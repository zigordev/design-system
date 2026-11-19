import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  CopyButton,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from '@zigordev/react';
import { expect, fn, waitFor } from 'storybook/test';

const meta = {
  title: 'Components/Toolbar',
  component: Toolbar,
  args: { 'aria-label': 'Order' },
  render: (args) => (
    <Toolbar {...args}>
      <ToolbarGroup aria-label="Side">
        <ToolbarButton>Buy</ToolbarButton>
        <ToolbarButton>Sell</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton>Cancel all</ToolbarButton>
    </Toolbar>
  ),
} satisfies Meta<typeof Toolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Keyboard: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole('toolbar', { name: 'Order' })).toBeVisible();
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: 'Buy' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('button', { name: 'Sell' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('button', { name: 'Cancel all' })).toHaveFocus();
  },
};

const writeText = fn(async () => {});

export const Copy: Story = {
  beforeEach: () => {
    const original = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    return () => {
      if (original) Object.defineProperty(navigator, 'clipboard', original);
    };
  },
  render: () => (
    <CopyButton text="pnpm add @zigordev/react" label="Copy command" copiedLabel="Copied" />
  ),
  play: async ({ canvas, userEvent }) => {
    writeText.mockClear();
    await userEvent.click(canvas.getByRole('button', { name: 'Copy command' }));
    await expect(writeText).toHaveBeenCalledWith('pnpm add @zigordev/react');
    await waitFor(() => expect(canvas.getByRole('button', { name: 'Copied' })).toBeVisible());
    await expect(canvas.getByRole('status')).toHaveTextContent('Copied');
  },
};
