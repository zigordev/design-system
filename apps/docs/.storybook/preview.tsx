import '@fontsource-variable/mona-sans/wdth.css';
import '@fontsource-variable/jetbrains-mono';
import '@zigordev/css/index.css';
import type { Decorator, Preview } from '@storybook/react-vite';
import {
  contrasts,
  defaultTheme,
  densities,
  modes,
  products,
  type Theme,
  themeAttributes,
} from '@zigordev/tokens';

const dimensions = Object.keys(themeAttributes) as (keyof Theme)[];

const applyTheme: Decorator = (Story, { globals }) => {
  const root = document.documentElement;
  for (const dimension of dimensions) {
    const value = String(globals[dimension] ?? defaultTheme[dimension]);
    if (dimension === 'mode' && value === 'system') {
      root.removeAttribute(themeAttributes.mode);
    } else {
      root.setAttribute(themeAttributes[dimension], value);
    }
  }
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
    product: toolbar('Product', 'paintbrush', products),
    mode: toolbar('Mode', 'mirror', [...modes, 'system']),
    density: toolbar('Density', 'component', densities),
    contrast: toolbar('Contrast', 'contrast', contrasts),
  },
  initialGlobals: { ...defaultTheme },
  parameters: {
    a11y: { test: 'error' },
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default preview;
