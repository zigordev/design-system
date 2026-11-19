import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AlertDialog,
  AlertDialogClose,
  Button,
  Dialog,
  DialogClose,
  Field,
  TextInput,
} from '@zigordev/react';
import { expect, waitFor, within } from 'storybook/test';
import { wholePage } from '../overlay-a11y.ts';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: { a11y: wholePage },
  args: {
    trigger: <Button>Edit profile</Button>,
    title: 'Edit profile',
    description: 'Your name appears on every case study.',
    closeLabel: 'Close',
    children: (
      <Field label="Name">
        <TextInput defaultValue="Ada Lovelace" autoComplete="name" />
      </Field>
    ),
    footer: (
      <>
        <DialogClose>
          <Button variant="outline" tone="neutral">
            Cancel
          </Button>
        </DialogClose>
        <Button>Save</Button>
      </>
    ),
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Edit profile' }));
    const page = within(canvasElement.ownerDocument.body);
    const dialog = await page.findByRole('dialog', { name: 'Edit profile' });
    await expect(dialog).toHaveAccessibleDescription('Your name appears on every case study.');
    await waitFor(() =>
      expect(dialog.contains(canvasElement.ownerDocument.activeElement)).toBe(true)
    );
  },
};

export const ClosesAndReturnsFocus: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'Edit profile' });
    await userEvent.click(trigger);
    const page = within(canvasElement.ownerDocument.body);
    await page.findByRole('dialog', { name: 'Edit profile' });
    await userEvent.click(page.getByRole('button', { name: 'Cancel' }));
    await waitFor(() => expect(page.queryByRole('dialog')).toBeNull());
    await expect(trigger).toHaveFocus();
  },
};

export const Alert: Story = {
  render: () => (
    <AlertDialog
      trigger={<Button tone="danger">Delete pool</Button>}
      title="Delete this pool?"
      description="Every prediction in it goes too. This cannot be undone."
      actions={
        <>
          <AlertDialogClose>
            <Button variant="outline" tone="neutral">
              Keep pool
            </Button>
          </AlertDialogClose>
          <Button tone="danger">Delete pool</Button>
        </>
      }
    />
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Delete pool' }));
    const page = within(canvasElement.ownerDocument.body);
    const dialog = await page.findByRole('alertdialog', { name: 'Delete this pool?' });
    await expect(dialog).toHaveAccessibleDescription(
      'Every prediction in it goes too. This cannot be undone.'
    );
  },
};
