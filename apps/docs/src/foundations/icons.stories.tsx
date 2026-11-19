import type { Meta, StoryObj } from '@storybook/react-vite';
import * as icons from '@zigordev/icons';
import { type IconComponent, iconNames, lucideVersion, SearchIcon, SunIcon } from '@zigordev/icons';
import { expect } from 'storybook/test';
import styles from '../docs.module.css';

const components = Object.entries(icons).filter(
  (entry): entry is [string, IconComponent] =>
    entry[0].endsWith('Icon') && typeof entry[1] === 'function'
);

const meta = {
  title: 'Foundations/Icons',
  component: SunIcon,
  args: { size: 'md' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
} satisfies Meta<typeof SunIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const All: Story = {
  render: (args) => (
    <div className={styles.stack}>
      <p className={styles.label}>
        {`${components.length} icons from Lucide ${lucideVersion}, hidden from screen readers unless they get a label.`}
      </p>
      <ul className={styles.iconGrid}>
        {components.map(([name, Icon]) => (
          <li key={name} className={styles.iconCell}>
            <Icon {...args} />
            <span>{name.replace(/Icon$/, '')}</span>
          </li>
        ))}
      </ul>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const rendered = canvasElement.querySelectorAll('svg.ds-icon');
    await expect(rendered).toHaveLength(iconNames.length);
    for (const icon of rendered) {
      await expect(icon).toHaveAttribute('aria-hidden', 'true');
    }
  },
};

export const WithLabel: Story = {
  render: () => <SearchIcon label="Search" />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: 'Search' })).toHaveAttribute(
      'data-icon',
      'search'
    );
  },
};

export const WithClassName: Story = {
  render: () => <SunIcon className={styles.label} />,
  play: async ({ canvasElement }) => {
    const icon = canvasElement.querySelector('svg');
    await expect(icon).toHaveClass('ds-icon');
    await expect(icon).toHaveClass(styles.label ?? '');
  },
};

export const Sizes: Story = {
  render: () => (
    <div className={styles.row}>
      <SunIcon size="sm" />
      <SunIcon size="md" />
      <SunIcon size="lg" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const widths = [...canvasElement.querySelectorAll('svg')].map(
      (icon) => icon.getBoundingClientRect().width
    );
    await expect(widths[0]).toBeLessThan(widths[1] ?? 0);
    await expect(widths[1]).toBeLessThan(widths[2] ?? 0);
  },
};
