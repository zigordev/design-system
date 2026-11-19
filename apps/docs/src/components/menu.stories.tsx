import type { Meta, StoryObj } from '@storybook/react-vite';
import { PencilIcon, TrashIcon } from '@zigordev/icons';
import {
  Button,
  ContextMenu,
  Menu,
  MenuCheckboxItem,
  MenuGroup,
  MenuItem,
  MenuSeparator,
  ScopeSwitcher,
} from '@zigordev/react';
import { useState } from 'react';
import { expect, fn, waitFor, within } from 'storybook/test';
import { wholePage } from '../overlay-a11y.ts';

const rename = fn();

const meta = {
  title: 'Components/Menu',
  component: Menu,
  parameters: { a11y: wholePage },
  args: {
    trigger: (
      <Button variant="outline" tone="neutral">
        Pool actions
      </Button>
    ),
    children: (
      <>
        <MenuGroup label="Pool">
          <MenuItem icon={<PencilIcon />} onClick={rename}>
            Rename
          </MenuItem>
          <MenuCheckboxItem defaultChecked>Notifications</MenuCheckboxItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuItem icon={<TrashIcon />} tone="danger">
          Delete
        </MenuItem>
      </>
    ),
  },
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Pool actions' }));
    const page = within(canvasElement.ownerDocument.body);
    const menu = await page.findByRole('menu');
    await expect(within(menu).getAllByRole('menuitem')).toHaveLength(2);
    await expect(
      within(menu).getByRole('menuitemcheckbox', { name: 'Notifications' })
    ).toHaveAttribute('aria-checked', 'true');
  },
};

export const Keyboard: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    rename.mockClear();
    const trigger = canvas.getByRole('button', { name: 'Pool actions' });
    trigger.focus();
    await userEvent.keyboard('{Enter}');
    const page = within(canvasElement.ownerDocument.body);
    await page.findByRole('menu');
    await waitFor(() => expect(page.getByRole('menuitem', { name: 'Rename' })).toHaveFocus());
    await userEvent.keyboard('{Enter}');
    await expect(rename).toHaveBeenCalledOnce();
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};

function Pools() {
  const [pool, setPool] = useState('friends');
  return (
    <ScopeSwitcher
      label="Pool"
      value={pool}
      onValueChange={setPool}
      options={[
        { value: 'friends', label: 'Friends pool' },
        { value: 'office', label: 'Office pool' },
      ]}
    />
  );
}

export const Scope: Story = {
  render: () => <Pools />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'Pool: Friends pool' });
    await userEvent.click(trigger);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(await page.findByRole('menuitemradio', { name: 'Office pool' }));
    await waitFor(() =>
      expect(canvas.getByRole('button', { name: 'Pool: Office pool' })).toBeVisible()
    );
  },
};

export const Context: Story = {
  render: () => (
    <ContextMenu content={<MenuItem>Copy the link</MenuItem>}>
      <p>Right-click this match.</p>
    </ContextMenu>
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.pointer({
      keys: '[MouseRight]',
      target: canvas.getByText('Right-click this match.'),
    });
    const page = within(canvasElement.ownerDocument.body);
    await expect(await page.findByRole('menuitem', { name: 'Copy the link' })).toBeInTheDocument();
  },
};
