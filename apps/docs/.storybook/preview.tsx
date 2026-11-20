import '@fontsource-variable/mona-sans/wdth.css';
import '@fontsource-variable/jetbrains-mono';
import '@zigordev/css/index.css';
import type { Decorator, Preview } from '@storybook/react-vite';
import { defaultTheme, modes, themeAttributes } from '@zigordev/tokens';
import { configure } from 'storybook/test';

configure({ asyncUtilTimeout: 10000 });

const applyTheme: Decorator = (Story, { globals }) => {
  document.documentElement.setAttribute(
    themeAttributes.mode,
    String(globals.mode ?? defaultTheme.mode)
  );
  return <Story />;
};

function toolbar(title: string, icon: string, values: readonly string[]) {
  return {
    description: title,
    toolbar: {
      title,
      icon,
      items: values.map((value) => ({ value, title: value })),
      dynamicTitle: true,
    },
  };
}

const preview: Preview = {
  decorators: [applyTheme],
  globalTypes: {
    mode: toolbar('Mode', 'mirror', [...modes, 'system']),
  },
  initialGlobals: { ...defaultTheme },
  parameters: {
    a11y: { test: 'error' },
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default preview;
