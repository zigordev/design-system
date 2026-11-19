import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Drawer, Link, Stack } from '@zigordev/react';
import { expect, waitFor, within } from 'storybook/test';
import { wholePage } from '../overlay-a11y.ts';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: { a11y: wholePage },
  args: {
    trigger: (
      <Button variant="outline" tone="neutral">
        Menu
      </Button>
    ),
    title: 'Sections',
    closeLabel: 'Close',
    children: (
      <Stack as="nav" gap={3} aria-label="Sections">
        <Link href="#work">Work</Link>
        <Link href="#cases">Case studies</Link>
      </Stack>
    ),
  },
  argTypes: { side: { control: 'inline-radio', options: ['right', 'left', 'bottom'] } },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Menu' }));
    const page = within(canvasElement.ownerDocument.body);
    const drawer = await page.findByRole('dialog', { name: 'Sections' });
    await expect(drawer).toHaveAttribute('data-side', 'right');
  },
};

export const ClosesWithButton: Story = {
  args: { side: 'bottom' },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'Menu' });
    await userEvent.click(trigger);
    const page = within(canvasElement.ownerDocument.body);
    await page.findByRole('dialog', { name: 'Sections' });
    await userEvent.click(page.getByRole('button', { name: 'Close' }));
    await waitFor(() => expect(page.queryByRole('dialog')).toBeNull());
    await expect(trigger).toHaveFocus();
  },
};
