import { describe, expect, it } from 'vitest';
import { supportedBrowsers, targets } from './targets.ts';

describe('targets', () => {
  it('encodes every supported browser version the way Lightning CSS expects', () => {
    expect(targets.safari).toBe((16 << 16) | (4 << 8));
    expect(targets.chrome).toBe(111 << 16);
    expect(Object.keys(targets).sort()).toEqual(Object.keys(supportedBrowsers).sort());
  });
});
