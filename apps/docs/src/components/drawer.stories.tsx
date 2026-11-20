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

export const FollowsTheDrag: Story = {
  args: { side: 'left' },
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Menu' }));
    const page = within(canvasElement.ownerDocument.body);
    const drawer = await page.findByRole('dialog', { name: 'Sections' });
    await waitFor(() => expect(drawer.getBoundingClientRect().left).toBe(0));
    const title = page.getByRole('heading', { name: 'Sections' });
    const box = title.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    await userEvent.pointer([
      { keys: '[MouseLeft>]', target: title, coords: { clientX: x, clientY: y } },
      { target: title, coords: { clientX: x - 12, clientY: y } },
      { target: title, coords: { clientX: x - 24, clientY: y } },
    ]);
    const before = drawer.getBoundingClientRect().left;
    await userEvent.pointer({ target: title, coords: { clientX: x - 60, clientY: y } });
    await expect(drawer.getBoundingClientRect().left - before).toBeCloseTo(-36, 0);
    await userEvent.pointer([
      { target: title, coords: { clientX: x, clientY: y } },
      { keys: '[/MouseLeft]', target: title, coords: { clientX: x, clientY: y } },
    ]);
    await userEvent.click(page.getByRole('button', { name: 'Close' }));
    await waitFor(() => expect(page.queryByRole('dialog')).toBeNull());
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
