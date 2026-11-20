import type { Meta, StoryObj } from '@storybook/react-vite';
import { PlusIcon } from '@zigordev/icons';
import { Button, Tooltip } from '@zigordev/react';
import { expect, waitFor, within } from 'storybook/test';
import { wholePage } from '../overlay-a11y.ts';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { a11y: wholePage },
  args: {
    content: 'Add match',
    delay: 0,
    children: (
      <Button iconOnly aria-label="Add match">
        <PlusIcon />
      </Button>
    ),
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OnHover: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.hover(canvas.getByRole('button', { name: 'Add match' }));
    const page = within(canvasElement.ownerDocument.body);
    await waitFor(() =>
      expect(page.getByText('Add match', { selector: '.ds-tooltip' })).toBeVisible()
    );
  },
};

export const OnFocus: Story = {
  play: async ({ canvasElement, userEvent }) => {
    await userEvent.tab();
    const page = within(canvasElement.ownerDocument.body);
    await waitFor(() =>
      expect(page.getByText('Add match', { selector: '.ds-tooltip' })).toBeVisible()
    );
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(page.queryByText('Add match', { selector: '.ds-tooltip' })).toBeNull()
    );
  },
};
