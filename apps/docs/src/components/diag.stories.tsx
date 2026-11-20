import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Drawer, DrawerClose } from '@zigordev/react';
import { expect, waitFor, within } from 'storybook/test';
import { type CloseReport, watchClose } from '../drawer-diagnostics.ts';
import { wholePage } from '../overlay-a11y.ts';

const meta = {
  title: 'Diagnostics/Drawer',
  component: Drawer,
  parameters: { a11y: wholePage },
  args: {
    trigger: <Button>Filters</Button>,
    title: 'Filters',
    description: 'Narrow the list.',
    closeLabel: 'Close',
    footer: (
      <DrawerClose>
        <Button>Done</Button>
      </DrawerClose>
    ),
    children: <p>Every filter applies at once.</p>,
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

function cycles(label: string, side: 'left' | 'right' | 'bottom', settle: boolean): Story {
  return {
    args: { side },
    play: async ({ canvas, canvasElement, userEvent }) => {
      const doc = canvasElement.ownerDocument;
      const page = within(doc.body);
      const reports: CloseReport[] = [];
      for (let cycle = 1; cycle <= 8; cycle++) {
        await userEvent.click(canvas.getByRole('button', { name: 'Filters' }));
        const drawer = await page.findByRole('dialog', { name: 'Filters' });
        if (settle) {
          await waitFor(() => expect(drawer).not.toHaveAttribute('data-starting-style'));
          await Promise.all(drawer.getAnimations().map((animation) => animation.finished));
        }
        await userEvent.click(page.getByRole('button', { name: 'Done' }));
        const report = await watchClose(doc, `${label}-${cycle}`, 2000);
        reports.push(report);
        if (!report.ok) break;
      }
      if (reports.some((report) => !report.ok)) {
        throw new Error(`DRAWER-DIAG ${JSON.stringify(reports)}`);
      }
    },
  };
}

export const LeftImmediate = cycles('left-immediate', 'left', false);
export const LeftSettled = cycles('left-settled', 'left', true);
export const BottomImmediate = cycles('bottom-immediate', 'bottom', false);
export const RightImmediate = cycles('right-immediate', 'right', false);
