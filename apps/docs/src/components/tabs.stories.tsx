import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tab, TabList, TabPanel, Tabs } from '@zigordev/react';
import { expect } from 'storybook/test';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  args: { defaultValue: 'approach' },
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="Case study">
        <Tab value="approach">Approach</Tab>
        <Tab value="pieces">Pieces</Tab>
        <Tab value="decisions">Decisions</Tab>
      </TabList>
      <TabPanel value="approach">One design system with a skin per product.</TabPanel>
      <TabPanel value="pieces">Tokens, CSS, React and icons.</TabPanel>
      <TabPanel value="decisions">Eleven recorded decisions.</TabPanel>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Keyboard: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole('tablist', { name: 'Case study' })).toBeVisible();
    await userEvent.tab();
    const approach = canvas.getByRole('tab', { name: 'Approach' });
    await expect(approach).toHaveFocus();
    await expect(approach).toHaveAttribute('aria-selected', 'true');
    await userEvent.keyboard('{ArrowRight}');
    const pieces = canvas.getByRole('tab', { name: 'Pieces' });
    await expect(pieces).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(pieces).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.getByRole('tabpanel', { name: 'Pieces' })).toHaveTextContent(
      'Tokens, CSS, React and icons.'
    );
  },
};

export const Click: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('tab', { name: 'Decisions' }));
    await expect(canvas.getByRole('tabpanel', { name: 'Decisions' })).toHaveTextContent(
      'Eleven recorded decisions.'
    );
  },
};
