import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field, Textarea } from '@zigordev/react';
import { expect } from 'storybook/test';
import styles from '../docs.module.css';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  args: { name: 'message' },
  render: (args) => (
    <div className={styles.form}>
      <Field label="Message" description="Tell me about the role and the team.">
        <Textarea {...args} />
      </Field>
    </div>
  ),
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const textarea = canvas.getByRole('textbox', { name: 'Message' });
    await expect(textarea.tagName).toBe('TEXTAREA');
    await expect(textarea).toHaveAccessibleDescription('Tell me about the role and the team.');
    await userEvent.type(textarea, 'Hello{Enter}there');
    await expect(textarea).toHaveValue('Hello\nthere');
  },
};

export const GrowsWithContent: Story = {
  play: async ({ canvas, userEvent }) => {
    const textarea = canvas.getByRole('textbox', { name: 'Message' });
    const before = textarea.getBoundingClientRect().height;
    await userEvent.type(textarea, 'One{Enter}Two{Enter}Three{Enter}Four{Enter}Five{Enter}Six');
    const after = textarea.getBoundingClientRect().height;
    if (CSS.supports('field-sizing', 'content')) {
      await expect(after).toBeGreaterThan(before);
    } else {
      await expect(after).toBe(before);
    }
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('textbox', { name: 'Message' })).toBeDisabled();
  },
};
