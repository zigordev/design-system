import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, Avatar, AvatarGroup, ScrollArea } from '@zigordev/react';
import { expect, waitFor } from 'storybook/test';
import styles from '../docs.module.css';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  args: {
    items: [
      {
        value: 'why',
        title: 'Why one design system?',
        content: 'Every app shares the tested parts.',
      },
      {
        value: 'how',
        title: 'How do the apps differ?',
        content: 'They compose the same components in their own way.',
      },
    ],
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Expand: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'Why one design system?' });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger.closest('h3')).not.toBeNull();
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await waitFor(() =>
      expect(canvas.getByText('Every app shares the tested parts.')).toBeVisible()
    );
  },
};

export const Keyboard: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: 'Why one design system?' })).toHaveFocus();
    await userEvent.tab();
    const second = canvas.getByRole('button', { name: 'How do the apps differ?' });
    await expect(second).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(second).toHaveAttribute('aria-expanded', 'true');
  },
};

export const People: Story = {
  render: () => (
    <AvatarGroup label="Pool members" more={{ count: 3, label: 'And 3 more' }}>
      <Avatar name="Ada Lovelace" />
      <Avatar name="Grace Hopper" />
    </AvatarGroup>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('list', { name: 'Pool members' })).toBeVisible();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(3);
    await expect(canvas.getByRole('img', { name: 'Ada Lovelace' })).toHaveTextContent('AL');
    await expect(canvas.getByRole('img', { name: 'And 3 more' })).toHaveTextContent('+3');
  },
};

export const Scrolling: Story = {
  render: () => (
    <ScrollArea label="Changelog" className={styles.scrollBox}>
      {Array.from({ length: 20 }, (_, entry) => (
        <p key={entry + 1}>{`Release ${entry + 1}`}</p>
      ))}
    </ScrollArea>
  ),
  play: async ({ canvasElement }) => {
    const viewport = canvasElement.querySelector('.ds-scroll-area__viewport') as HTMLElement;
    await expect(viewport.scrollHeight).toBeGreaterThan(viewport.clientHeight);
  },
};
