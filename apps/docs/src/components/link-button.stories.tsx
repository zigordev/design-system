import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowUpRightIcon } from '@zigordev/icons';
import { LinkButton } from '@zigordev/react';
import { expect } from 'storybook/test';

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
  args: {
    variant: 'outline',
    tone: 'neutral',
    children: 'Visit gpool',
    endIcon: <ArrowUpRightIcon />,
  },
};

export const IconOnly: Story = {
  args: { iconOnly: true, 'aria-label': 'Open gpool', children: <ArrowUpRightIcon /> },
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
