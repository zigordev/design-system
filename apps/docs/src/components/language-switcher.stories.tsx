import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageSwitcher } from '@zigordev/react';
import { expect } from 'storybook/test';

const meta = {
  title: 'Components/LanguageSwitcher',
  component: LanguageSwitcher,
  args: {
    label: 'Language',
    current: 'en',
    languages: [
      { code: 'en', name: 'English', href: '#en' },
      { code: 'es', name: 'Español', href: '#es' },
    ],
  },
  argTypes: { display: { control: 'inline-radio', options: ['code', 'name'] } },
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('navigation', { name: 'Language' })).toBeVisible();
    const english = canvas.getByRole('link', { name: 'EN English' });
    const spanish = canvas.getByRole('link', { name: 'ES Español' });
    await expect(english).toHaveAttribute('aria-current', 'true');
    await expect(spanish).not.toHaveAttribute('aria-current');
    await expect(spanish).toHaveAttribute('hreflang', 'es');
    await expect(spanish).toHaveAttribute('lang', 'es');
    await expect(getComputedStyle(english).textDecorationLine).toBe('underline');
  },
};

export const Names: Story = {
  args: { display: 'name', current: 'es' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'Español' })).toHaveAttribute(
      'aria-current',
      'true'
    );
  },
};
