import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRightIcon, PlusIcon } from '@zigordev/icons';
import { Button, type ButtonTone, type ButtonVariant } from '@zigordev/react';
import { expect, fn } from 'storybook/test';
import styles from '../docs.module.css';

const variants: ButtonVariant[] = ['solid', 'soft', 'outline', 'ghost'];
const tones: ButtonTone[] = ['accent', 'neutral', 'danger'];

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Save changes', onClick: fn() },
  argTypes: {
    variant: { control: 'inline-radio', options: variants },
    tone: { control: 'inline-radio', options: tones },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Save changes' }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className={styles.grid}>
      {tones.flatMap((tone) =>
        variants.map((variant) => (
          <Button key={`${tone}-${variant}`} {...args} tone={tone} variant={variant}>
            {`${variant} ${tone}`}
          </Button>
        ))
      )}
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('button')).toHaveLength(variants.length * tones.length);
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className={styles.row}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  args: { children: 'Add match', startIcon: <PlusIcon /> },
  render: (args) => (
    <div className={styles.row}>
      <Button {...args} />
      <Button endIcon={<ArrowRightIcon />} variant="outline" tone="neutral">
        Next matchday
      </Button>
    </div>
  ),
};

export const IconOnly: Story = {
  args: { iconOnly: true, 'aria-label': 'Add match', children: <PlusIcon /> },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Add match' });
    await expect(button).toHaveAttribute('data-icon-only');
  },
};

export const Keyboard: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('button')).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button');
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Loading: Story = {
  args: { loading: true, startIcon: <PlusIcon />, endIcon: <ArrowRightIcon /> },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: 'Save changes' });
    await expect(button).toHaveAttribute('aria-busy', 'true');
    await expect(button).toHaveAttribute('aria-disabled', 'true');
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const LoadingIconOnly: Story = {
  args: { iconOnly: true, 'aria-label': 'Add match', children: <PlusIcon />, loading: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Add match' })).toHaveAttribute(
      'aria-busy',
      'true'
    );
  },
};
