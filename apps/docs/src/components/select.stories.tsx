import type { Meta, StoryObj } from '@storybook/react-vite';
import { Autocomplete, Combobox, Field, Select, type SelectOption } from '@zigordev/react';
import { expect, fn, waitFor, within } from 'storybook/test';
import styles from '../docs.module.css';
import { wholePage } from '../overlay-a11y.ts';

const reasons: SelectOption[] = [
  { value: 'role', label: 'A role' },
  { value: 'project', label: 'A project' },
  { value: 'talk', label: 'A talk' },
];

const teams: SelectOption[] = [
  { value: 'rsoc', label: 'Real Sociedad' },
  { value: 'athl', label: 'Athletic Club' },
  { value: 'osas', label: 'Osasuna' },
];

const change = fn();

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: { a11y: wholePage },
  args: { options: reasons, placeholder: 'Choose a reason', onValueChange: change },
  render: (args) => (
    <div className={styles.form}>
      <Field label="Reason">
        <Select {...args} />
      </Field>
    </div>
  ),
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Choose: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    change.mockClear();
    const trigger = canvas.getByRole('combobox', { name: 'Reason' });
    await expect(trigger).toHaveTextContent('Choose a reason');
    await userEvent.click(trigger);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(await page.findByRole('option', { name: 'A project' }));
    await waitFor(() => expect(trigger).toHaveTextContent('A project'));
    await expect(change).toHaveBeenCalledWith('project');
  },
};

export const Open: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('combobox', { name: 'Reason' }));
    const page = within(canvasElement.ownerDocument.body);
    await expect(await page.findAllByRole('option')).toHaveLength(3);
  },
};

export const ComboboxFilter: Story = {
  render: () => (
    <div className={styles.form}>
      <Field label="Team">
        <Combobox options={teams} emptyText="No team matches" placeholder="Search teams" />
      </Field>
    </div>
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    const input = canvas.getByRole('combobox', { name: 'Team' });
    await userEvent.type(input, 'ath');
    const page = within(canvasElement.ownerDocument.body);
    await waitFor(() => expect(page.getAllByRole('option')).toHaveLength(1));
    await userEvent.click(page.getByRole('option', { name: 'Athletic Club' }));
    await waitFor(() => expect(input).toHaveValue('Athletic Club'));
  },
};

export const ComboboxEmpty: Story = {
  render: () => (
    <div className={styles.form}>
      <Field label="Team">
        <Combobox options={teams} emptyText="No team matches" />
      </Field>
    </div>
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.type(canvas.getByRole('combobox', { name: 'Team' }), 'zzz');
    const page = within(canvasElement.ownerDocument.body);
    const empty = await page.findByText('No team matches');
    await waitFor(() => expect(empty).toBeVisible());
  },
};

export const AutocompleteSuggests: Story = {
  render: () => (
    <div className={styles.form}>
      <Field label="Topic">
        <Autocomplete suggestions={['Design systems', 'Testing', 'Observability']} />
      </Field>
    </div>
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    const input = canvas.getByRole('combobox', { name: 'Topic' });
    await userEvent.type(input, 'tes');
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(await page.findByRole('option', { name: 'Testing' }));
    await waitFor(() => expect(input).toHaveValue('Testing'));
  },
};
