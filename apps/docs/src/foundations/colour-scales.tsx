import Color from 'colorjs.io';
import { useLayoutEffect, useRef, useState } from 'react';
import styles from '../docs.module.css';

const ramps = ['accent', 'second', 'neutral', 'danger', 'success', 'warning', 'info'] as const;
const steps = Array.from({ length: 12 }, (_, index) => index + 1);

function contrastAgainstPage(element: HTMLElement): string {
  const page = getComputedStyle(document.documentElement).backgroundColor;
  const swatch = getComputedStyle(element).backgroundColor;
  return new Color(swatch).contrast(new Color(page), 'WCAG21').toFixed(1);
}

function Scale({ ramp, theme }: { ramp: (typeof ramps)[number]; theme: string }) {
  const chips = useRef<(HTMLDivElement | null)[]>([]);
  const [ratios, setRatios] = useState<string[]>([]);

  useLayoutEffect(() => {
    if (!theme) return;
    setRatios(chips.current.map((chip) => (chip ? contrastAgainstPage(chip) : '')));
  }, [theme]);

  return (
    <section className={styles.stack}>
      <h2 className={styles.label}>{ramp}</h2>
      <div className={styles.scale}>
        {steps.map((step, index) => (
          <div key={step} className={styles.swatch}>
            <div
              ref={(element) => {
                chips.current[index] = element;
              }}
              className={styles.chip}
              style={{ backgroundColor: `var(--ds-color-scale-${ramp}-${step})` }}
            />
            <span>{step}</span>
            <span className={styles.label}>{ratios[index] ?? ''}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ColourScales({ theme }: { theme: string }) {
  return (
    <div className={styles.stack}>
      {ramps.map((ramp) => (
        <Scale key={ramp} ramp={ramp} theme={theme} />
      ))}
    </div>
  );
}
