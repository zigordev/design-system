import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Button, Card, CardLink } from '@zigordev/react';
import { expect, fn } from 'storybook/test';
import styles from '../docs.module.css';

const meta = {
  title: 'Components/Card',
  component: Card,
  args: { variant: 'raised', padding: 'md' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['raised', 'outline', 'sunken'] },
    padding: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] },
  },
  render: (args) => (
    <Card {...args} as="article" className={styles.card}>
      <h3 className={styles.cardTitle}>gpool</h3>
      <p className={styles.measure}>A football pool for friends, rebuilt on one design system.</p>
      <div className={styles.row}>
        <Badge size="sm">Next.js</Badge>
        <Badge size="sm">PostgreSQL</Badge>
      </div>
    </Card>
  ),
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const card = canvas.getByRole('article');
    await expect(card).toHaveClass('ds-card');
    await expect(card).toHaveAttribute('data-variant', 'raised');
  },
};

export const Variants: Story = {
  render: () => (
    <div className={styles.cards}>
      {(['raised', 'outline', 'sunken'] as const).map((variant) => (
        <Card key={variant} variant={variant} className={styles.card}>
          <h3 className={styles.cardTitle}>{variant}</h3>
          <p className={styles.measure}>Cards group one subject.</p>
        </Card>
      ))}
    </div>
  ),
};

const open = fn();
const save = fn();

export const WithLink: Story = {
  render: (args) => (
    <Card {...args} as="article" className={styles.card}>
      <h3 className={styles.cardTitle}>
        <CardLink
          href="#gpool"
          onClick={(event) => {
            event.preventDefault();
            open();
          }}
        >
          gpool
        </CardLink>
      </h3>
      <p className={styles.measure}>A football pool for friends, rebuilt on one design system.</p>
      <div>
        <Button size="sm" variant="outline" tone="neutral" onClick={save}>
          Save for later
        </Button>
      </div>
    </Card>
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    const link = canvas.getByRole('link', { name: 'gpool' });
    const text = canvas.getByText('A football pool for friends, rebuilt on one design system.');
    const box = text.getBoundingClientRect();
    const covering = canvasElement.ownerDocument.elementFromPoint(
      box.left + box.width / 2,
      box.top + box.height / 2
    );
    await expect(covering).toBe(link);

    const button = canvas.getByRole('button', { name: 'Save for later' });
    const area = button.getBoundingClientRect();
    const onButton = canvasElement.ownerDocument.elementFromPoint(
      area.left + area.width / 2,
      area.top + area.height / 2
    );
    await expect(button.contains(onButton)).toBe(true);
    await userEvent.click(button);
    await expect(save).toHaveBeenCalledOnce();

    await userEvent.click(link);
    await expect(open).toHaveBeenCalledOnce();
  },
};

export const LinkKeyboard: Story = {
  render: WithLink.render,
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    const link = canvas.getByRole('link', { name: 'gpool' });
    await expect(link).toHaveFocus();
    await expect(getComputedStyle(link, '::after').outlineStyle).toBe('solid');
  },
};
