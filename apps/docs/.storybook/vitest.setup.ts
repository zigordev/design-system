import { beforeEach } from 'vitest';

const waits: number[] = [];
(globalThis as { frameWaits?: number[] }).frameWaits = waits;

beforeEach(() => {
  const start = performance.now();
  requestAnimationFrame(() => waits.push(Math.round(performance.now() - start)));
});
