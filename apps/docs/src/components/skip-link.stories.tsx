import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkipLink } from '@zigordev/react';
import { expect, waitFor } from 'storybook/test';

const meta = {
  title: 'Components/SkipLink',
  component: SkipLink,
  args: { children: 'Skip to content', target: 'content' },
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <div>
      <SkipLink {...args} />
      <nav aria-label="Main">
        <a href="#work">Work</a>
      </nav>
      <main id="content" tabIndex={-1}>
        <h1>Zigor</h1>
      </main>
    </div>
  ),
} satisfies Meta<typeof SkipLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const link = canvas.getByRole('link', { name: 'Skip to content' });
    await expect(link).toHaveAttribute('href', '#content');
    await expect(link.getBoundingClientRect().bottom).toBeLessThanOrEqual(0);

    await userEvent.tab();
    await expect(link).toHaveFocus();
    await waitFor(() => expect(link.getBoundingClientRect().top).toBeGreaterThanOrEqual(0));
  },
};
