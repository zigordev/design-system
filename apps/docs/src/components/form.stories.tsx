import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, ErrorSummary, Field, Form, Textarea, TextInput } from '@zigordev/react';
import { expect, fn, waitFor } from 'storybook/test';
import styles from '../docs.module.css';

const meta = {
  title: 'Components/Form',
  component: Form,
  args: { onFormSubmit: fn() },
  render: (args) => (
    <div className={styles.form}>
      <Form {...args}>
        <Field name="name" label="Name" required>
          <TextInput autoComplete="name" />
        </Field>
        <Field name="email" label="Email" description="We reply within two days." required>
          <TextInput type="email" autoComplete="email" />
        </Field>
        <Field name="message" label="Message">
          <Textarea />
        </Field>
        <div>
          <Button type="submit">Send message</Button>
        </div>
      </Form>
    </div>
  ),
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Send message' }));
    const name = canvas.getByRole('textbox', { name: 'Name' });
    await waitFor(() => expect(name).toHaveAttribute('aria-invalid', 'true'));
    await expect(name).toHaveFocus();
    await expect(args.onFormSubmit).not.toHaveBeenCalled();

    await userEvent.type(name, 'Ada Lovelace');
    await userEvent.type(canvas.getByRole('textbox', { name: 'Email' }), 'ada@example.com');
    await userEvent.click(canvas.getByRole('button', { name: 'Send message' }));
    await waitFor(() =>
      expect(args.onFormSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Ada Lovelace', email: 'ada@example.com' }),
        expect.anything()
      )
    );
  },
};

export const ServerErrors: Story = {
  args: { errors: { email: 'This address already has a subscription' } },
  play: async ({ canvas }) => {
    const email = canvas.getByRole('textbox', { name: 'Email' });
    await expect(email).toHaveAttribute('aria-invalid', 'true');
    await expect(email).toHaveAccessibleDescription(
      expect.stringContaining('This address already has a subscription')
    );
  },
};

export const WithErrorSummary: Story = {
  render: (args) => (
    <div className={styles.form}>
      <Form {...args}>
        <ErrorSummary
          title="There is a problem"
          errors={[
            { id: 'contact-name', message: 'Enter your name' },
            { id: 'contact-email', message: 'Enter an email address like name@example.com' },
          ]}
        />
        <Field name="name" label="Name" error="Enter your name" required>
          <TextInput id="contact-name" autoComplete="name" />
        </Field>
        <Field
          name="email"
          label="Email"
          error="Enter an email address like name@example.com"
          required
        >
          <TextInput id="contact-email" type="email" autoComplete="email" defaultValue="ada@" />
        </Field>
        <div>
          <Button type="submit">Send message</Button>
        </div>
      </Form>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const summary = canvas.getByRole('alert');
    await waitFor(() => expect(summary.parentElement).toHaveFocus());
    await expect(
      canvas.getByRole('heading', { name: 'There is a problem', level: 2 })
    ).toBeVisible();
    await userEvent.click(
      canvas.getByRole('link', { name: 'Enter an email address like name@example.com' })
    );
    await expect(canvas.getByRole('textbox', { name: 'Email' })).toHaveFocus();
  },
};

export const SummaryWithoutErrors: Story = {
  render: () => <ErrorSummary title="There is a problem" errors={[]} />,
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole('alert')).toBeNull();
  },
};

export const SummaryWithoutFocus: Story = {
  render: () => (
    <ErrorSummary
      title="There is a problem"
      errors={[{ id: 'not-on-this-page', message: 'Enter your name' }]}
      headingLevel={3}
      autoFocus={false}
    />
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    await expect(canvas.getByRole('alert').parentElement).not.toHaveFocus();
    await expect(canvas.getByRole('heading', { level: 3 })).toBeVisible();
    const link = canvas.getByRole('link', { name: 'Enter your name' });
    await expect(link).toHaveAttribute('href', '#not-on-this-page');
    const keepPage = (event: Event) => event.preventDefault();
    canvasElement.ownerDocument.addEventListener('click', keepPage, { once: true });
    await userEvent.click(link);
    await expect(link).toHaveFocus();
  },
};
