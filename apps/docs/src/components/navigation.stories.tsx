import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs, Pagination, SiteNavigation } from '@zigordev/react';
import { expect, waitFor, within } from 'storybook/test';
import { wholePage } from '../overlay-a11y.ts';

const meta = {
  title: 'Components/Navigation',
  component: Breadcrumbs,
  parameters: { a11y: wholePage },
  args: {
    label: 'Breadcrumb',
    items: [
      { label: 'Home', href: '#home' },
      { label: 'Case studies', href: '#cases' },
      { label: 'gpool', href: '#gpool' },
    ],
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Trail: Story = {
  play: async ({ canvas }) => {
    const trail = canvas.getByRole('navigation', { name: 'Breadcrumb' });
    await expect(within(trail).getAllByRole('link')).toHaveLength(2);
    await expect(within(trail).getByText('gpool')).toHaveAttribute('aria-current', 'page');
  },
};

export const Pages: Story = {
  render: () => (
    <Pagination
      label="Pages"
      page={5}
      pageCount={12}
      href={(page) => `#page-${page}`}
      pageLabel={(page) => `Page ${page}`}
      previousLabel="Previous page"
      nextLabel="Next page"
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'Page 5' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    await expect(canvas.getByRole('link', { name: 'Previous page' })).toHaveAttribute(
      'href',
      '#page-4'
    );
    await expect(canvas.getByRole('link', { name: 'Page 1' })).toBeVisible();
    await expect(canvas.getByRole('link', { name: 'Page 12' })).toBeVisible();
    await expect(canvas.queryByRole('link', { name: 'Page 8' })).toBeNull();
  },
};

export const FirstPage: Story = {
  render: () => (
    <Pagination
      label="Pages"
      page={1}
      pageCount={3}
      href={(page) => `#page-${page}`}
      pageLabel={(page) => `Page ${page}`}
      previousLabel="Previous page"
      nextLabel="Next page"
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole('link', { name: 'Previous page' })).toBeNull();
    await expect(canvas.getByRole('link', { name: 'Next page' })).toHaveAttribute(
      'href',
      '#page-2'
    );
  },
};

export const SiteMenu: Story = {
  render: () => (
    <SiteNavigation
      label="Main"
      items={[
        { label: 'Work', href: '#work', current: true },
        {
          label: 'Case studies',
          links: [
            { label: 'gpool', href: '#gpool', description: 'A football pool for friends.' },
            {
              label: 'trading-bot',
              href: '#trading-bot',
              description: 'A console for one operator.',
            },
          ],
        },
        { label: 'Contact', href: '#contact' },
      ]}
    />
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    await expect(canvas.getByRole('link', { name: 'Work' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    await userEvent.click(canvas.getByRole('button', { name: 'Case studies' }));
    const page = within(canvasElement.ownerDocument.body);
    const link = await page.findByRole('link', { name: /gpool/ });
    await waitFor(() => expect(link).toBeVisible());
  },
};
