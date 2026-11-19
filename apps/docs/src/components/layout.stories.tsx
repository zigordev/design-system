import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Card, Container, Grid, Inline, Stack } from '@zigordev/react';
import { expect } from 'storybook/test';

function gapBetween(first: Element | undefined, second: Element | undefined, axis: 'x' | 'y') {
  const a = first?.getBoundingClientRect();
  const b = second?.getBoundingClientRect();
  if (!a || !b) return Number.NaN;
  return axis === 'y' ? b.top - a.bottom : b.left - a.right;
}

function spaceToken(step: number): number {
  const probe = document.createElement('div');
  probe.style.inlineSize = `var(--ds-space-${step})`;
  document.body.append(probe);
  const width = probe.getBoundingClientRect().width;
  probe.remove();
  return width;
}

const meta = {
  title: 'Components/Layout',
  component: Stack,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StackOfCards: Story = {
  render: () => (
    <Stack as="ul" gap={6}>
      <li>
        <Card>Work</Card>
      </li>
      <li>
        <Card>Case studies</Card>
      </li>
      <li>
        <Card>Contact</Card>
      </li>
    </Stack>
  ),
  play: async ({ canvas, canvasElement }) => {
    const list = canvas.getByRole('list');
    await expect(list).toHaveClass('ds-stack');
    const items = [...canvasElement.querySelectorAll('li')];
    await expect(gapBetween(items[0], items[1], 'y')).toBeCloseTo(spaceToken(6), 0);
  },
};

export const InlineBadges: Story = {
  render: () => (
    <Inline as="ul" gap={2} aria-label="Technologies">
      {['Next.js', 'PostgreSQL', 'OpenTelemetry', 'Playwright'].map((name) => (
        <li key={name}>
          <Badge size="sm">{name}</Badge>
        </li>
      ))}
    </Inline>
  ),
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole('list', { name: 'Technologies' })).toHaveClass('ds-inline');
    const items = [...canvasElement.querySelectorAll('li')];
    await expect(gapBetween(items[0], items[1], 'x')).toBeCloseTo(spaceToken(2), 0);
  },
};

export const ResponsiveGrid: Story = {
  render: () => (
    <Grid as="ul" min="sm">
      {['gpool', 'cv', 'trading-bot', 'notifications'].map((name) => (
        <li key={name}>
          <Card>{name}</Card>
        </li>
      ))}
    </Grid>
  ),
  play: async ({ canvasElement }) => {
    const grid = canvasElement.querySelector('.ds-grid') as HTMLElement;
    const columns = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
    const expected = Math.max(
      1,
      Math.floor((grid.clientWidth + spaceToken(4)) / (12 * 16 + spaceToken(4)))
    );
    await expect(columns).toBe(expected);
  },
};

export const CentredContainer: Story = {
  render: () => (
    <Container size="sm">
      <Card>Content stays within the container width, with gutters on small screens.</Card>
    </Container>
  ),
  play: async ({ canvasElement }) => {
    const container = canvasElement.querySelector('.ds-container') as HTMLElement;
    await expect(getComputedStyle(container).maxWidth).toBe('640px');
    await expect(getComputedStyle(container).marginLeft).toBe(
      getComputedStyle(container).marginRight
    );
  },
};
