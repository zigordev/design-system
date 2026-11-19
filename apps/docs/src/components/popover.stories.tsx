import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Link, Popover, PreviewCard } from '@zigordev/react';
import { expect, waitFor, within } from 'storybook/test';
import { wholePage } from '../overlay-a11y.ts';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: { a11y: wholePage },
  args: {
    trigger: (
      <Button variant="outline" tone="neutral">
        Share
      </Button>
    ),
    title: 'Share this case study',
    description: 'Anyone with the link can read it.',
    children: <Link href="#copy">Copy the link</Link>,
  },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Share' }));
    const page = within(canvasElement.ownerDocument.body);
    const popup = await page.findByRole('dialog', { name: 'Share this case study' });
    await expect(popup).toHaveAccessibleDescription('Anyone with the link can read it.');
  },
};

export const ClosesOnEscape: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'Share' });
    await userEvent.click(trigger);
    const page = within(canvasElement.ownerDocument.body);
    await page.findByRole('dialog', { name: 'Share this case study' });
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(page.queryByRole('dialog')).toBeNull());
    await expect(trigger).toHaveFocus();
  },
};

export const LinkPreview: Story = {
  render: () => (
    <PreviewCard trigger={<Link href="#gpool">gpool</Link>} delay={0}>
      <p>A football pool for friends, rebuilt on one design system.</p>
    </PreviewCard>
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.hover(canvas.getByRole('link', { name: 'gpool' }));
    const page = within(canvasElement.ownerDocument.body);
    await waitFor(() =>
      expect(
        page.getByText('A football pool for friends, rebuilt on one design system.')
      ).toBeVisible()
    );
  },
};
