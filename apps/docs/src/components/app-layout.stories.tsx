import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchIcon, TrophyIcon, UserIcon } from '@zigordev/icons';
import {
  AppShell,
  BottomTabBar,
  Breadcrumbs,
  Button,
  Link,
  PageHeader,
  SkipLink,
  Stack,
  TopBar,
} from '@zigordev/react';
import { expect } from 'storybook/test';

const meta = {
  title: 'Components/AppLayout',
  component: AppShell,
  parameters: { layout: 'fullscreen' },
  args: { children: null },
} satisfies Meta<typeof AppShell>;

export default meta;

type Story = StoryObj<typeof meta>;

const tabs = (
  <BottomTabBar
    label="Sections"
    mobileOnly={false}
    items={[
      { label: 'Standings', href: '#standings', icon: <TrophyIcon />, current: true },
      { label: 'Search', href: '#search', icon: <SearchIcon /> },
      { label: 'Profile', href: '#profile', icon: <UserIcon /> },
    ]}
  />
);

export const Shell: Story = {
  render: () => (
    <>
      <SkipLink>Skip to content</SkipLink>
      <AppShell
        header={
          <TopBar start={<strong>gpool</strong>} end={<Button size="sm">Join a pool</Button>} />
        }
        sidebar={
          <Stack gap={2}>
            <Link href="#standings" tone="neutral" underline="hover">
              Standings
            </Link>
            <Link href="#fixtures" tone="neutral" underline="hover">
              Fixtures
            </Link>
          </Stack>
        }
        sidebarLabel="Pool"
        tabBar={tabs}
      >
        <PageHeader
          breadcrumbs={
            <Breadcrumbs
              label="Breadcrumb"
              items={[
                { label: 'Pools', href: '#pools' },
                { label: 'Friends pool', href: '#friends' },
              ]}
            />
          }
          title="Friends pool"
          description="Twelve players, matchday 14."
          actions={
            <Button variant="outline" tone="neutral">
              Invite
            </Button>
          }
        />
      </AppShell>
    </>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('banner')).toBeVisible();
    await expect(canvas.getByRole('main')).toHaveAttribute('id', 'main');
    await expect(canvas.getByRole('heading', { level: 1, name: 'Friends pool' })).toBeVisible();
    const sections = canvas.getByRole('navigation', { name: 'Sections' });
    await expect(sections).toBeVisible();
    await expect(canvas.getByRole('link', { name: 'Standings', current: 'page' })).toBeVisible();
  },
};
