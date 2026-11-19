import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, VisuallyHidden } from '@zigordev/react';
import { expect } from 'storybook/test';

const meta = {
  title: 'Components/VisuallyHidden',
  component: VisuallyHidden,
  args: { children: 'Trading mode:' },
  render: (args) => (
    <p>
      <VisuallyHidden {...args} /> <Badge tone="danger">Live</Badge>
    </p>
  ),
} satisfies Meta<typeof VisuallyHidden>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const hidden = canvas.getByText('Trading mode:');
    await expect(hidden).toHaveClass('ds-visually-hidden');
    await expect(hidden.getBoundingClientRect().width).toBeLessThanOrEqual(1);
    await expect(hidden.closest('p')).toHaveTextContent('Trading mode: Live');
  },
};
