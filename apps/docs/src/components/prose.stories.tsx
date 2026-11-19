import type { Meta, StoryObj } from '@storybook/react-vite';
import { Prose } from '@zigordev/react';
import { expect } from 'storybook/test';

const meta = {
  title: 'Components/Prose',
  component: Prose,
  parameters: { layout: 'padded' },
  render: (args) => (
    <Prose {...args} as="article">
      <h2>Rebuilding gpool</h2>
      <p>
        gpool is a football pool for friends. The rebuild moved it onto the shared{' '}
        <a href="#design-system">design system</a> and a single PostgreSQL database.
      </p>
      <h3>What changed</h3>
      <ul>
        <li>One component library for every screen.</li>
        <li>
          Scores update through <code>pg-boss</code> jobs instead of a cron script.
        </li>
      </ul>
      <blockquote>
        <p>Every pairing meets WCAG 2.2 AA in every product and mode.</p>
      </blockquote>
      <pre>
        <code>pnpm add @zigordev/react @zigordev/css</code>
      </pre>
      <table>
        <caption>Matchday results</caption>
        <thead>
          <tr>
            <th scope="col">Player</th>
            <th scope="col">Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ada</td>
            <td>12</td>
          </tr>
          <tr>
            <td>Grace</td>
            <td>9</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <p>
        Read the <strong>case study</strong> for the details.
      </p>
    </Prose>
  ),
} satisfies Meta<typeof Prose>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Article: Story = {
  play: async ({ canvas }) => {
    const article = canvas.getByRole('article');
    await expect(article).toHaveClass('ds-prose');
    const h2 = canvas.getByRole('heading', { level: 2 });
    const h3 = canvas.getByRole('heading', { level: 3 });
    await expect(Number.parseFloat(getComputedStyle(h2).fontSize)).toBeGreaterThan(
      Number.parseFloat(getComputedStyle(h3).fontSize)
    );
    await expect(getComputedStyle(canvas.getByRole('link')).textDecorationLine).toBe('underline');
    await expect(getComputedStyle(article).maxWidth).toBe('672px');
  },
};
