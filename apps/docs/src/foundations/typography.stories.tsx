import type { Meta, StoryObj } from '@storybook/react-vite';
import styles from '../docs.module.css';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;

function Typography() {
  return (
    <div className={styles.stack}>
      <p className={styles.display}>Matchday 3 closes in 2 hours</p>
      {sizes.map((size) => (
        <div key={size}>
          <p className={styles.label}>{`font-size-${size}`}</p>
          <p className={styles.specimen} style={{ fontSize: `var(--ds-font-size-${size})` }}>
            Predictions lock when the first match kicks off.
          </p>
        </div>
      ))}
      <div>
        <p className={styles.label}>Tabular figures</p>
        <p className={styles.figures}>
          +1,111.11 €
          <br />
          −8,808.80 €
        </p>
      </div>
    </div>
  );
}

const meta = {
  title: 'Foundations/Typography',
  component: Typography,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Typography>;

export default meta;

export const Scale: StoryObj<typeof meta> = {};
