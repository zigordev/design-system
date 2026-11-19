import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, ToastProvider, useToast } from '@zigordev/react';
import { useState } from 'react';
import { expect, waitFor, within } from 'storybook/test';
import { wholePage } from '../overlay-a11y.ts';

function Undoable() {
  const toast = useToast();
  const [id, setId] = useState<string | null>(null);
  return (
    <>
      <Button onClick={() => setId(toast.add({ title: 'Archived', tone: 'neutral', timeout: 0 }))}>
        Archive
      </Button>
      <Button variant="outline" tone="neutral" onClick={() => id && toast.close(id)}>
        Hide the message
      </Button>
    </>
  );
}

function SendButton() {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast.add({
          title: 'Message sent',
          description: 'I reply within two days.',
          tone: 'success',
        })
      }
    >
      Send message
    </Button>
  );
}

const meta = {
  title: 'Components/Toast',
  component: ToastProvider,
  parameters: { a11y: wholePage },
  args: { closeLabel: 'Close', children: <SendButton /> },
} satisfies Meta<typeof ToastProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Send message' }));
    const page = within(canvasElement.ownerDocument.body);
    const title = await page.findByText('Message sent');
    const toast = title.closest('.ds-toast') as HTMLElement;
    await expect(toast).toHaveAttribute('data-tone', 'success');
    await waitFor(() => expect(within(toast).getByText('I reply within two days.')).toBeVisible());
  },
};

export const Close: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Send message' }));
    const page = within(canvasElement.ownerDocument.body);
    const title = await page.findByText('Message sent');
    const toast = title.closest('.ds-toast') as HTMLElement;
    await userEvent.hover(toast);
    await userEvent.click(await within(toast).findByRole('button', { name: 'Close' }));
    await waitFor(() => expect(page.queryByText('Message sent')).toBeNull());
  },
};

export const CloseFromCode: Story = {
  args: { children: <Undoable /> },
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Archive' }));
    const page = within(canvasElement.ownerDocument.body);
    await page.findByText('Archived');
    await userEvent.click(canvas.getByRole('button', { name: 'Hide the message' }));
    await waitFor(() => expect(page.queryByText('Archived')).toBeNull());
  },
};
