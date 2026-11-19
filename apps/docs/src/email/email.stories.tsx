import { render } from '@react-email/render';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmailButton, EmailFooter, EmailHeading, EmailLayout, EmailText } from '@zigordev/email';
import { expect, waitFor } from 'storybook/test';
import styles from '../docs.module.css';

function Message({ product }: { product: 'cv' | 'gpool' | 'trading-bot' }) {
  return (
    <EmailLayout
      product={product}
      preview="You have a new message"
      footer={<EmailFooter>You get this email because you have an account.</EmailFooter>}
    >
      <EmailHeading>A new message</EmailHeading>
      <EmailText>Ada wrote to you about the platform engineer role.</EmailText>
      <EmailText tone="muted">Reply within two days to keep the conversation going.</EmailText>
      <EmailButton href="https://example.com/messages/1">Read the message</EmailButton>
    </EmailLayout>
  );
}

function Preview({ html }: { html: string }) {
  return <iframe title="Email preview" srcDoc={html} className={styles.emailFrame} />;
}

const meta = {
  title: 'Email/Message',
  component: Preview,
  args: { html: '' },
  loaders: [async () => ({ html: await render(<Message product="cv" />) })],
  render: (_, { loaded }) => <Preview html={String(loaded.html)} />,
} satisfies Meta<typeof Preview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Cv: Story = {
  play: async ({ canvas }) => {
    const frame = canvas.getByTitle('Email preview') as HTMLIFrameElement;
    await waitFor(() => expect(frame.contentDocument?.body.textContent).toContain('A new message'));
  },
};

export const Gpool: Story = {
  loaders: [async () => ({ html: await render(<Message product="gpool" />) })],
  play: async ({ canvas }) => {
    const frame = canvas.getByTitle('Email preview') as HTMLIFrameElement;
    await waitFor(() =>
      expect(frame.contentDocument?.querySelector('a')?.getAttribute('href')).toBe(
        'https://example.com/messages/1'
      )
    );
  },
};
