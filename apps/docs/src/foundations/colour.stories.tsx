import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ColourScales } from './colour-scales.tsx';

const meta = {
  title: 'Foundations/Colour',
  component: ColourScales,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ColourScales>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scales: Story = {
  args: { theme: '' },
  render: (_, { globals }) => (
    <ColourScales
      theme={`${globals.product} ${globals.mode} ${globals.contrast} ${globals.density}`}
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('heading', { level: 2 })).toHaveLength(7);
    await expect(await canvas.findAllByText(/^\d+\.\d$/)).not.toHaveLength(0);
  },
};
