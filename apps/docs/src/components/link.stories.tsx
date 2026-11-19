import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from '@zigordev/react';
import { expect } from 'storybook/test';
import styles from '../docs.module.css';

function External() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 3h7v7M13 3 4 12" />
    </svg>
  );
}

const meta = {
  title: 'Components/Link',
  component: Link,
  args: { children: 'the gpool case study', href: '#case-study' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['accent', 'neutral'] },
    underline: { control: 'inline-radio', options: ['always', 'hover'] },
  },
  render: (args) => (
    <p className={styles.measure}>
      Read <Link {...args} /> to see how a football pool for friends was rebuilt on one design
      system.
    </p>
  ),
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'the gpool case study' });
    await expect(link).toHaveAttribute('href', '#case-study');
    await expect(link).toHaveClass('ds-link');
    await expect(getComputedStyle(link).textDecorationLine).toBe('underline');
  },
};

export const Neutral: Story = {
  args: { tone: 'neutral' },
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link');
    const paragraph = link.closest('p') as HTMLElement;
    await expect(getComputedStyle(link).color).toBe(getComputedStyle(paragraph).color);
    await expect(getComputedStyle(link).textDecorationLine).toBe('underline');
  },
};

export const Navigation: Story = {
  render: (args) => (
    <nav aria-label="Sections">
      <ul className={styles.inlineList}>
        <li>
          <Link {...args} href="#work" underline="hover" tone="neutral" aria-current="page">
            Work
          </Link>
        </li>
        <li>
          <Link {...args} href="#cases" underline="hover" tone="neutral">
            Case studies
          </Link>
        </li>
        <li>
          <Link {...args} href="#contact" underline="hover" tone="neutral">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  ),
  play: async ({ canvas }) => {
    const current = canvas.getByRole('link', { name: 'Work' });
    const other = canvas.getByRole('link', { name: 'Case studies' });
    await expect(current).toHaveAttribute('aria-current', 'page');
    await expect(getComputedStyle(current).textDecorationLine).toBe('underline');
    await expect(getComputedStyle(other).textDecorationLine).toBe('none');
  },
};

export const WithIcon: Story = {
  args: { children: 'GitHub', href: 'https://github.com/zigordev', endIcon: <External /> },
  render: (args) => <Link {...args} />,
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'GitHub' });
    const icon = link.querySelector('.ds-link__icon');
    await expect(icon).toHaveAttribute('aria-hidden', 'true');
    await expect(icon).toHaveAttribute('data-side', 'end');
  },
};

export const WithStartIcon: Story = {
  args: { children: 'Back to the case studies', href: '#cases', startIcon: <External /> },
  render: (args) => <Link {...args} />,
  play: async ({ canvas }) => {
    const icon = canvas.getByRole('link').querySelector('.ds-link__icon');
    await expect(icon).toHaveAttribute('data-side', 'start');
  },
};

export const Keyboard: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    const link = canvas.getByRole('link');
    await expect(link).toHaveFocus();
    await expect(getComputedStyle(link).outlineStyle).toBe('solid');
  },
};

export const WithRender: Story = {
  args: { render: (props) => <a {...props} data-router-link="" /> },
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'the gpool case study' });
    await expect(link).toHaveAttribute('data-router-link');
    await expect(link).toHaveClass('ds-link');
  },
};
