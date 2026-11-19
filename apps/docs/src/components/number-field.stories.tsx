import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateInput, Field, NumberField, OtpField, Slider } from '@zigordev/react';
import { expect, fn } from 'storybook/test';
import styles from '../docs.module.css';

const change = fn();

const meta = {
  title: 'Components/NumberField',
  component: NumberField,
  args: {
    decrementLabel: 'One goal fewer',
    incrementLabel: 'One goal more',
    defaultValue: 1,
    min: 0,
    max: 20,
    onValueChange: change,
  },
  render: (args) => (
    <div className={styles.form}>
      <Field label="Home goals">
        <NumberField {...args} />
      </Field>
    </div>
  ),
} satisfies Meta<typeof NumberField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Steps: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox', { name: 'Home goals' });
    await userEvent.click(canvas.getByRole('button', { name: 'One goal more' }));
    await expect(input).toHaveValue('2');
    await userEvent.click(canvas.getByRole('button', { name: 'One goal fewer' }));
    await userEvent.click(canvas.getByRole('button', { name: 'One goal fewer' }));
    await expect(input).toHaveValue('0');
    await expect(canvas.getByRole('button', { name: 'One goal fewer' })).toBeDisabled();
  },
};

export const ARangeSlider: Story = {
  render: () => (
    <div className={styles.form}>
      <Slider
        label="Price"
        defaultValue={[20, 80]}
        showValue
        thumbLabels={['Lowest price', 'Highest price']}
      />
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const lowest = canvas.getByRole('slider', { name: 'Lowest price' });
    await expect(lowest).toHaveAttribute('aria-valuenow', '20');
    await userEvent.tab();
    await expect(lowest).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(lowest).toHaveAttribute('aria-valuenow', '21');
    await expect(canvas.getByRole('slider', { name: 'Highest price' })).toHaveAttribute(
      'aria-valuenow',
      '80'
    );
  },
};

export const ACode: Story = {
  render: () => (
    <Field label="Verification code">
      <OtpField length={6} inputLabel={(position, length) => `Digit ${position} of ${length}`} />
    </Field>
  ),
  play: async ({ canvas, userEvent }) => {
    const first = canvas.getByRole('textbox', { name: 'Verification code' });
    await userEvent.click(first);
    await userEvent.keyboard('123');
    await expect(canvas.getByRole('textbox', { name: 'Digit 4 of 6' })).toHaveFocus();
  },
};

export const ADate: Story = {
  render: () => (
    <div className={styles.form}>
      <Field label="Start date" description="When you can start the role.">
        <DateInput type="date" />
      </Field>
    </div>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Start date');
    await expect(input).toHaveAttribute('type', 'date');
    await expect(input).toHaveAccessibleDescription('When you can start the role.');
  },
};
