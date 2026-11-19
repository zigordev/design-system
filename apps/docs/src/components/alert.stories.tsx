import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, type AlertTone, Button } from '@zigordev/react';
import { expect, fn } from 'storybook/test';
import styles from '../docs.module.css';

const tones: AlertTone[] = ['info', 'success', 'warning', 'danger', 'neutral'];

const meta = {
  title: 'Components/Alert',
  component: Alert,
  args: { title: 'Your message was sent', children: 'I reply within two days.', tone: 'success' },
  argTypes: { tone: { control: 'select', options: tones } },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Tones: Story = {
  render: () => (
    <div className={styles.stack}>
      {tones.map((tone) => (
        <Alert key={tone} tone={tone} title={`A ${tone} message`}>
          The text explains what happened and what to do next.
        </Alert>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll('.ds-alert')).toHaveLength(tones.length);
    await expect(canvasElement.querySelector('[role="status"], [role="alert"]')).toBeNull();
  },
};

const dismiss = fn();

export const LiveAndDismissible: Story = {
  args: { live: 'polite', onDismiss: dismiss, dismissLabel: 'Dismiss' },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole('status')).toHaveTextContent('Your message was sent');
    await userEvent.click(canvas.getByRole('button', { name: 'Dismiss' }));
    await expect(dismiss).toHaveBeenCalledOnce();
  },
};

export const Banner: Story = {
  args: {
    variant: 'banner',
    tone: 'warning',
    title: 'Paper trading',
    children: 'Orders are simulated. Nothing reaches the exchange.',
    action: (
      <Button size="sm" variant="outline" tone="neutral">
        Go live
      </Button>
    ),
  },
  parameters: { layout: 'fullscreen' },
  play: async ({ canvasElement }) => {
    const banner = canvasElement.querySelector('.ds-alert') as HTMLElement;
    await expect(banner).toHaveAttribute('data-variant', 'banner');
    await expect(getComputedStyle(banner).borderTopLeftRadius).toBe('0px');
  },
};
