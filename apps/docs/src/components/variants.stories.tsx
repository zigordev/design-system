import type { Meta, StoryObj } from '@storybook/react-vite';
import { InfoIcon, UserIcon } from '@zigordev/icons';
import {
  Alert,
  AppShell,
  Autocomplete,
  Avatar,
  AvatarGroup,
  BottomTabBar,
  Button,
  CodeBlock,
  CopyButton,
  Dialog,
  Drawer,
  DrawerClose,
  EmptyState,
  Field,
  Figure,
  Meter,
  PageHeader,
  Pagination,
  Popover,
  SearchField,
  SiteNavigation,
  Slider,
  StatTile,
  Table,
  Timeline,
} from '@zigordev/react';
import { type ComponentProps, useState } from 'react';
import { expect, fn, waitFor, within } from 'storybook/test';
import styles from '../docs.module.css';
import { watchClose } from '../drawer-diagnostics.ts';
import { wholePage } from '../overlay-a11y.ts';

function RouterLink(props: ComponentProps<'a'>) {
  return <a data-router-link="" {...props} />;
}

const meta = {
  title: 'Components/Variants',
  component: Alert,
  parameters: { a11y: wholePage },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BareFrame: Story = {
  render: () => (
    <AppShell mainId="content">
      <PageHeader title="Settings" headingLevel={2} />
      <BottomTabBar
        label="Sections"
        items={[
          {
            label: 'Home',
            href: '#home',
            icon: <UserIcon />,
            render: <RouterLink href="#home" />,
          },
        ]}
      />
    </AppShell>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('main')).toHaveAttribute('id', 'content');
    await expect(canvas.queryByRole('banner')).toBeNull();
    await expect(canvas.getByRole('heading', { level: 2, name: 'Settings' })).toBeVisible();
    const home = canvas.getByRole('link', { name: 'Home', hidden: true });
    await expect(home).toHaveAttribute('data-router-link');
    await expect(home.closest('nav')).toHaveAttribute('data-mobile-only');
  },
};

function Controlled() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open details</Button>
      <Dialog open={open} onOpenChange={setOpen} title="Details" closeLabel="Close" size="lg">
        <p>Nothing else here.</p>
      </Dialog>
    </>
  );
}

export const ControlledDialog: Story = {
  render: () => <Controlled />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open details' }));
    const page = within(canvasElement.ownerDocument.body);
    const dialog = await page.findByRole('dialog', { name: 'Details' });
    await expect(dialog).toHaveAttribute('data-size', 'lg');
    await expect(dialog).not.toHaveAccessibleDescription();
    await userEvent.click(page.getByRole('button', { name: 'Close' }));
    await waitFor(() => expect(page.queryByRole('dialog')).toBeNull());
  },
};

export const DrawerWithFooter: Story = {
  render: () => (
    <Drawer
      trigger={<Button>Filters</Button>}
      title="Filters"
      description="Narrow the list."
      closeLabel="Close"
      side="left"
      footer={
        <DrawerClose>
          <Button>Done</Button>
        </DrawerClose>
      }
    >
      <p>Every filter applies at once.</p>
    </Drawer>
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Filters' }));
    const page = within(canvasElement.ownerDocument.body);
    const drawer = await page.findByRole('dialog', { name: 'Filters' });
    await expect(drawer).toHaveAccessibleDescription('Narrow the list.');
    await userEvent.click(page.getByRole('button', { name: 'Done' }));
    const report = await watchClose(canvasElement.ownerDocument, 'variants-left');
    if (!report.ok) throw new Error(`Drawer stayed mounted: ${JSON.stringify(report)}`);
    const waits = (globalThis as { frameWaits?: number[] }).frameWaits ?? [];
    if (!import.meta.env.VITE_DIAG_CI) return;
    throw new Error(
      `REPORT ${JSON.stringify({ waits, elapsed: report.elapsed, frames: report.frames })}`
    );
  },
};

export const PlainPopover: Story = {
  render: () => (
    <Popover
      trigger={
        <Button variant="outline" tone="neutral">
          Help
        </Button>
      }
      aria-label="Help"
      side="top"
      align="start"
    >
      <p>Ask anything about my work.</p>
    </Popover>
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Help' }));
    const page = within(canvasElement.ownerDocument.body);
    await expect(await page.findByText('Ask anything about my work.')).toBeInTheDocument();
  },
};

const dismiss = fn();

export const AlertWithActionAndDismiss: Story = {
  render: () => (
    <Alert
      tone="neutral"
      action={<Button size="sm">Undo</Button>}
      onDismiss={dismiss}
      dismissLabel="Dismiss"
    >
      Archived.
    </Alert>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Undo' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Dismiss' })).toBeVisible();
  },
};

export const QuietPieces: Story = {
  render: () => (
    <div className={styles.stack}>
      <EmptyState title="Nothing yet" />
      <Meter label="Storage" value={30} showValue={false} />
      <StatTile label="Players" value="12" />
      <Timeline items={[{ id: 'one', title: 'Joined' }]} />
      <Figure>
        <svg role="img" aria-label="Logo" viewBox="0 0 10 10" width="40" height="40">
          <circle cx="5" cy="5" r="4" fill="currentColor" />
        </svg>
      </Figure>
      <Table scrollLabel="Players">
        <tbody>
          <tr>
            <td>Ada</td>
          </tr>
        </tbody>
      </Table>
      <CodeBlock label="Command" code="pnpm dev" />
    </div>
  ),
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole('heading', { name: 'Nothing yet' })).toBeVisible();
    await expect(canvas.getByRole('meter', { name: 'Storage' })).toBeVisible();
    await expect(canvasElement.querySelector('.ds-stat__delta')).toBeNull();
    await expect(canvasElement.querySelector('.ds-timeline__time')).toBeNull();
    await expect(canvasElement.querySelector('figcaption')).toBeNull();
    await expect(canvasElement.querySelector('caption')).toBeNull();
    await expect(canvasElement.querySelector('.ds-code-block__header')).toBeNull();
  },
};

export const People: Story = {
  render: () => (
    <div className={styles.row}>
      <Avatar name="Ada Lovelace" src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" size="lg" />
      <span>
        <Avatar name="Grace Hopper" size="sm" decorative /> Grace Hopper
      </span>
      <AvatarGroup label="Organisers">
        <Avatar name="Ada" />
      </AvatarGroup>
    </div>
  ),
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole('img', { name: 'Ada Lovelace' })).toHaveAttribute(
      'data-size',
      'lg'
    );
    await expect(canvasElement.querySelector('[aria-hidden="true"].ds-avatar')).not.toBeNull();
    await expect(canvas.getByRole('list', { name: 'Organisers' })).toBeVisible();
  },
};

const writeFails = fn(async () => {
  throw new Error('Denied');
});

export const CopyFails: Story = {
  beforeEach: () => {
    const original = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: writeFails },
    });
    return () => {
      if (original) Object.defineProperty(navigator, 'clipboard', original);
    };
  },
  render: () => <CopyButton text="pnpm dev" label="Copy" copiedLabel="Copied" iconOnly />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Copy' }));
    await expect(writeFails).toHaveBeenCalled();
    await expect(canvas.getByRole('button', { name: 'Copy' })).toBeVisible();
  },
};

function Query() {
  const [query, setQuery] = useState('gpool');
  return (
    <Field label="Search">
      <SearchField clearLabel="Clear" value={query} onValueChange={setQuery} />
    </Field>
  );
}

export const ControlledSearch: Story = {
  render: () => <Query />,
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('searchbox', { name: 'Search' });
    await expect(input).toHaveValue('gpool');
    await userEvent.click(canvas.getByRole('button', { name: 'Clear' }));
    await expect(input).toHaveValue('');
  },
};

const slide = fn();

export const SingleSlider: Story = {
  render: () => (
    <div className={styles.form}>
      <Slider defaultValue={40} onValueChange={slide} thumbLabels={['Volume']} />
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    slide.mockClear();
    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('slider', { name: 'Volume' })).toHaveAttribute(
      'aria-valuenow',
      '41'
    );
    await expect(slide).toHaveBeenCalledWith(41);
  },
};

export const EdgePages: Story = {
  render: () => (
    <div className={styles.stack}>
      {[2, 11].map((page) => (
        <Pagination
          key={page}
          label={`Pages near ${page}`}
          page={page}
          pageCount={12}
          href={(n) => `#page-${n}`}
          pageLabel={(n) => `Page ${n}`}
          previousLabel="Previous page"
          nextLabel="Next page"
        />
      ))}
    </div>
  ),
  play: async ({ canvas }) => {
    const early = within(canvas.getByRole('navigation', { name: 'Pages near 2' }));
    await expect(early.getByRole('link', { name: 'Page 3' })).toBeVisible();
    const late = within(canvas.getByRole('navigation', { name: 'Pages near 11' }));
    await expect(late.getByRole('link', { name: 'Page 10' })).toBeVisible();
  },
};

export const SuggestionsWithEmpty: Story = {
  render: () => (
    <div className={styles.form}>
      <Field label="Topic">
        <Autocomplete suggestions={['Testing']} emptyText="No topic matches" />
      </Field>
    </div>
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.type(canvas.getByRole('combobox', { name: 'Topic' }), 'zzz');
    const page = within(canvasElement.ownerDocument.body);
    const empty = await page.findByText('No topic matches');
    await waitFor(() => expect(empty).toBeVisible());
  },
};

export const NavigationWithoutLinks: Story = {
  render: () => <SiteNavigation label="Footer" items={[{ label: 'Imprint', href: '#imprint' }]} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'Imprint' })).not.toHaveAttribute('aria-current');
  },
};

export const InfoIconUse: Story = {
  render: () => (
    <EmptyState
      icon={<InfoIcon />}
      title="No alerts"
      description="All is quiet."
      headingLevel={4}
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { level: 4 })).toBeVisible();
  },
};
