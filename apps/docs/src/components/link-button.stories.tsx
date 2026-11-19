import type { Meta, StoryObj } from '@storybook/react-vite';
import { LinkButton } from '@zigordev/react';
import { expect } from 'storybook/test';

function External() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 3h7v7M13 3 4 12" />
    </svg>
  );
}

const meta = {
  title: 'Components/LinkButton',
  component: LinkButton,
  args: { children: 'Read the case study', href: '#case-study' },
} satisfies Meta<typeof LinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'Read the case study' });
    await expect(link).toHaveAttribute('href', '#case-study');
    await expect(link).toHaveClass('ds-button');
  },
};

export const Outline: Story = {
  args: { variant: 'outline', tone: 'neutral', children: 'Visit gpool', endIcon: <External /> },
};

export const IconOnly: Story = {
  args: { iconOnly: true, 'aria-label': 'Open gpool', children: <External /> },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'Open gpool' })).toHaveAttribute(
      'data-icon-only'
    );
  },
};

export const WithRender: Story = {
  args: { render: (props) => <a {...props} data-router-link="" /> },
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'Read the case study' });
    await expect(link).toHaveAttribute('data-router-link');
    await expect(link).toHaveAttribute('href', '#case-study');
  },
};
