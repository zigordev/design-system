import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  CodeBlock,
  DescriptionList,
  Figure,
  Kbd,
  StatTile,
  Table,
  Timeline,
} from '@zigordev/react';
import { expect, fn, waitFor } from 'storybook/test';
import styles from '../docs.module.css';

const meta = {
  title: 'Components/DataDisplay',
  component: DescriptionList,
  args: {
    items: [
      { term: 'Role', details: 'Platform engineer' },
      { term: 'Location', details: 'Donostia, remote' },
    ],
  },
  argTypes: { layout: { control: 'inline-radio', options: ['stacked', 'columns'] } },
} satisfies Meta<typeof DescriptionList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Descriptions: Story = {
  args: { layout: 'columns' },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll('dt')).toHaveLength(2);
    await expect(canvasElement.querySelector('dd')).toHaveTextContent('Platform engineer');
  },
};

export const Experience: Story = {
  render: () => (
    <Timeline
      items={[
        {
          id: 'now',
          time: '2024 – now',
          title: 'Platform engineer',
          description: 'One design system for every app.',
        },
        {
          id: 'before',
          time: '2020 – 2024',
          title: 'Full-stack developer',
          description: 'Products for engineers.',
        },
      ]}
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('list')).toBeVisible();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(2);
  },
};

export const Results: Story = {
  render: () => (
    <div className={styles.form}>
      <Table caption="Matchday results">
        <thead>
          <tr>
            <th scope="col">Player</th>
            <th scope="col" data-numeric="">
              Points
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ada</td>
            <td data-numeric="">12</td>
          </tr>
          <tr aria-selected="true">
            <td>Grace</td>
            <td data-numeric="">9</td>
          </tr>
        </tbody>
      </Table>
    </div>
  ),
  play: async ({ canvas }) => {
    const table = canvas.getByRole('table', { name: 'Matchday results' });
    await expect(table).toBeVisible();
    await expect(getComputedStyle(canvas.getByText('12')).textAlign).toBe('end');
  },
};

export const Numbers: Story = {
  render: () => (
    <div className={styles.row}>
      <StatTile label="Points" value="1,284" delta="+12% this week" trend="up" />
      <StatTile label="Drawdown" value="3.4%" delta="-0.8%" trend="down" />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('+12% this week')).toHaveAttribute('data-trend', 'up');
  },
};

export const Shortcut: Story = {
  render: () => (
    <p>
      Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search.
    </p>
  ),
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll('kbd')).toHaveLength(2);
  },
};

export const AFigure: Story = {
  render: () => (
    <Figure caption="The gpool standings on a phone.">
      <svg role="img" aria-label="Standings" viewBox="0 0 320 120" width="320" height="120">
        <rect width="320" height="120" fill="currentColor" opacity="0.1" />
      </svg>
    </Figure>
  ),
  play: async ({ canvas }) => {
    const figure = canvas.getByRole('figure');
    await expect(figure.querySelector('figcaption')).toHaveTextContent(
      'The gpool standings on a phone.'
    );
  },
};

const writeText = fn(async () => {});

export const Code: Story = {
  beforeEach: () => {
    const original = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    return () => {
      if (original) Object.defineProperty(navigator, 'clipboard', original);
    };
  },
  render: () => (
    <CodeBlock
      label="Install command"
      language="bash"
      code="pnpm add @zigordev/react @zigordev/css"
      copyLabel="Copy"
      copiedLabel="Copied"
    />
  ),
  play: async ({ canvas, userEvent }) => {
    writeText.mockClear();
    await expect(canvas.getByRole('figure', { name: 'Install command' })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Copy' }));
    await expect(writeText).toHaveBeenCalledWith('pnpm add @zigordev/react @zigordev/css');
    await waitFor(() => expect(canvas.getByRole('button', { name: 'Copied' })).toBeVisible());
  },
};
