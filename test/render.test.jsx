import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import manifest from '../_ds_manifest.json';

// Vite needs the import graph to be statically analysable, so the components
// are globbed rather than imported from a computed path.
const modules = import.meta.glob('../components/**/*.jsx');

// Most components mount bare. The navigation ones take a required list of
// destinations and throw without it, which is correct behaviour rather than a
// defect — so they get the minimum that makes them renderable, and nothing
// more. Anything absent from this map is expected to mount with no props at
// all; if that stops being true, this test is where you find out.
const NAV_ITEMS = [{ href: '/one', label: 'One' }];
const NAV = { items: NAV_ITEMS, activeHref: '/one' };
const PROPS = {
  AppShell: { sidebarItems: NAV_ITEMS, activeHref: '/one' },
  BottomNav: NAV,
  Sidebar: NAV,
  TopbarTabs: NAV,
  SegmentedControl: { options: [{ value: 'one', label: 'One' }], value: 'one' },
};

describe('every component in the manifest', () => {
  it.each(manifest.components.map((c) => [c.name, c.sourcePath]))('%s mounts', async (name, sourcePath) => {
    const load = modules[`../${sourcePath}`];
    expect(load, `${sourcePath} is in the manifest but not on disk`).toBeTypeOf('function');

    const mod = await load();
    const Component = mod[name];
    expect(Component, `${sourcePath} does not export ${name}`).toBeTypeOf('function');

    render(<Component {...(PROPS[name] ?? {})} />);
  });
});
