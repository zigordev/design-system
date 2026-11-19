import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, CommandPalette } from '@zigordev/react';
import { useState } from 'react';
import { expect, fn, waitFor, within } from 'storybook/test';
import { wholePage } from '../overlay-a11y.ts';

const openCases = fn();

function Palette() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" tone="neutral" onClick={() => setOpen(true)}>
        Search commands
      </Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        title="Commands"
        placeholder="Type a command"
        emptyText="No command matches"
        commands={[
          { id: 'cases', label: 'Open case studies', onSelect: openCases },
          { id: 'theme', label: 'Switch to dark mode', onSelect: () => {} },
          { id: 'contact', label: 'Write to Zigor', onSelect: () => {} },
        ]}
      />
    </>
  );
}

const meta = {
  title: 'Components/CommandPalette',
  component: CommandPalette,
  parameters: { a11y: wholePage },
  render: () => <Palette />,
} satisfies Meta<typeof CommandPalette>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FilterAndRun: Story = {
  args: { open: false, onOpenChange: () => {}, commands: [], title: 'Commands', emptyText: 'None' },
  play: async ({ canvas, canvasElement, userEvent }) => {
    openCases.mockClear();
    await userEvent.click(canvas.getByRole('button', { name: 'Search commands' }));
    const page = within(canvasElement.ownerDocument.body);
    const input = await page.findByRole('combobox', { name: 'Commands' });
    await userEvent.type(input, 'case');
    await waitFor(() => expect(page.getAllByRole('option')).toHaveLength(1));
    await userEvent.click(page.getByRole('option', { name: 'Open case studies' }));
    await expect(openCases).toHaveBeenCalledOnce();
    await waitFor(() => expect(page.queryByRole('dialog')).toBeNull());
  },
};

export const KeyboardRun: Story = {
  args: { open: false, onOpenChange: () => {}, commands: [], title: 'Commands', emptyText: 'None' },
  play: async ({ canvas, canvasElement, userEvent }) => {
    openCases.mockClear();
    await userEvent.click(canvas.getByRole('button', { name: 'Search commands' }));
    const page = within(canvasElement.ownerDocument.body);
    const input = await page.findByRole('combobox', { name: 'Commands' });
    await userEvent.type(input, 'case');
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await waitFor(() => expect(openCases).toHaveBeenCalledOnce());
  },
};

export const Open: Story = {
  args: { open: false, onOpenChange: () => {}, commands: [], title: 'Commands', emptyText: 'None' },
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Search commands' }));
    const page = within(canvasElement.ownerDocument.body);
    const dialog = await page.findByRole('dialog', { name: 'Commands' });
    await waitFor(() => expect(dialog).toBeVisible());
    await expect(await page.findAllByRole('option')).toHaveLength(3);
  },
};
