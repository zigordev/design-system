interface Snapshot {
  t: number;
  frames: number;
  attrs: string;
  transform: string;
  transition: string;
  animations: string[];
}

export interface CloseReport {
  label: string;
  ok: boolean;
  elapsed: number;
  frames: number;
  series: Snapshot[];
  page: Record<string, unknown>;
}

function describe(animation: Animation): string {
  const timing = animation.effect?.getComputedTiming();
  const property =
    animation instanceof CSSTransition ? animation.transitionProperty : animation.constructor.name;
  const target =
    animation.effect instanceof KeyframeEffect && animation.effect.target
      ? (animation.effect.target.getAttribute('class') ?? animation.effect.target.tagName)
      : 'none';
  return [
    target,
    property,
    animation.playState,
    animation.pending ? 'pending' : 'settled',
    `t=${Math.round(Number(animation.currentTime ?? -1))}`,
    `start=${Math.round(Number(animation.startTime ?? -1))}`,
    `end=${Math.round(Number(timing?.endTime ?? -1))}`,
    `p=${timing?.progress ?? 'null'}`,
  ].join(':');
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function watchClose(doc: Document, label: string, limit = 3000): Promise<CloseReport> {
  const win = doc.defaultView as Window;
  let frames = 0;
  let counting = true;
  const tick = () => {
    frames += 1;
    if (counting) win.requestAnimationFrame(tick);
  };
  win.requestAnimationFrame(tick);
  const start = performance.now();
  const elapsed = () => Math.round(performance.now() - start);
  const series: Snapshot[] = [];
  while (doc.querySelector('.ds-drawer') && elapsed() < 500) {
    await wait(10);
  }
  while (doc.querySelector('.ds-drawer') && elapsed() < limit) {
    const popup = doc.querySelector('.ds-drawer') as HTMLElement;
    const style = win.getComputedStyle(popup);
    series.push({
      t: elapsed(),
      frames,
      attrs: [...popup.attributes]
        .map((attribute) => attribute.name)
        .filter((name) => /^data-(open|closed|starting|ending|swip)/.test(name))
        .join(','),
      transform: style.transform,
      transition: `${style.transitionProperty} ${style.transitionDuration}`,
      animations: popup.getAnimations().map(describe),
    });
    await wait(250);
  }
  counting = false;
  const ok = !doc.querySelector('.ds-drawer');
  const report: CloseReport = {
    label,
    ok,
    elapsed: elapsed(),
    frames,
    series,
    page: ok
      ? {}
      : {
          visibility: doc.visibilityState,
          focus: doc.hasFocus(),
          timeline: Math.round(Number(doc.timeline.currentTime ?? -1)),
          documentAnimations: doc.getAnimations().map(describe),
          viewport:
            doc.querySelector('.ds-drawer-viewport')?.getAttributeNames().join(',') ?? 'gone',
          backdrop: doc.querySelector('.ds-backdrop')?.getAttributeNames().join(',') ?? 'gone',
          active: doc.activeElement?.textContent?.trim() ?? 'none',
          frameWaits: (globalThis as { frameWaits?: number[] }).frameWaits ?? [],
        },
  };
  return report;
}
