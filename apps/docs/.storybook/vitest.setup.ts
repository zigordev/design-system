import { beforeEach } from 'vitest';

const waits: number[] = [];
(globalThis as { frameWaits?: number[] }).frameWaits = waits;

beforeEach(async () => {
  const start = performance.now();
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  waits.push(Math.round(performance.now() - start));
});
