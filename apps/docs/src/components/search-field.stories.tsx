import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field, SearchField } from '@zigordev/react';
import { expect, fn } from 'storybook/test';
import styles from '../docs.module.css';

const change = fn();

const meta = {
  title: 'Components/SearchField',
  component: SearchField,
  args: { clearLabel: 'Clear the search', placeholder: 'Ask about my work', onValueChange: change },
  render: (args) => (
    <search>
      <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
        <Field label="Ask">
          <SearchField {...args} />
        </Field>
      </form>
    </search>
  ),
} satisfies Meta<typeof SearchField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TypeAndClear: Story = {
  play: async ({ canvas, userEvent }) => {
    change.mockClear();
    const input = canvas.getByRole('searchbox', { name: 'Ask' });
    await expect(canvas.queryByRole('button', { name: 'Clear the search' })).toBeNull();
    await userEvent.type(input, 'testing');
    await expect(change).toHaveBeenLastCalledWith('testing');
    await userEvent.click(canvas.getByRole('button', { name: 'Clear the search' }));
    await expect(input).toHaveValue('');
    await expect(input).toHaveFocus();
    await expect(change).toHaveBeenLastCalledWith('');
  },
};
