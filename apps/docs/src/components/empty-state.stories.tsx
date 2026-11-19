import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchIcon } from '@zigordev/icons';
import { Button, EmptyState } from '@zigordev/react';
import { expect } from 'storybook/test';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  args: {
    icon: <SearchIcon />,
    title: 'No case studies match',
    description: 'Try a shorter search, or clear the filters.',
    action: (
      <Button variant="outline" tone="neutral">
        Clear filters
      </Button>
    ),
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { level: 2, name: 'No case studies match' })
    ).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Clear filters' })).toBeVisible();
  },
};

export const InACard: Story = {
  args: { headingLevel: 3, action: undefined },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { level: 3 })).toBeVisible();
  },
};
