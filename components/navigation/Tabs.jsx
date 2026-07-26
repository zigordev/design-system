import React from 'react';
import { injectOnce } from '../_shared/injectStyle.js';

injectOnce('ds-tabs', `
.ds-tabs{display:inline-flex;align-items:center;gap:2px;padding:4px;border-radius:var(--ds-radius-full);background:var(--ds-color-surface-2);border:1px solid var(--ds-color-border);}
.ds-tab{border:0;background:transparent;padding:7px 16px;border-radius:var(--ds-radius-full);font-family:var(--ds-font-sans);font-size:var(--ds-text-sm);font-weight:var(--ds-weight-semibold);color:var(--ds-color-fg-muted);cursor:pointer;transition:background var(--ds-duration-fast) var(--ds-ease-out),color var(--ds-duration-fast) var(--ds-ease-out);}
.ds-tab:hover:not(.ds-tab-active){color:var(--ds-color-fg);}
.ds-tab-active{background:var(--ds-color-surface);color:var(--ds-color-accent);box-shadow:var(--ds-shadow-sm);}
`);

export function Tabs({ tabs, value, onChange, className = '' }) {
  return (
    <div className={`ds-tabs ${className}`.trim()} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          role="tab"
          aria-selected={tab.value === value}
          className={`ds-tab ${tab.value === value ? 'ds-tab-active' : ''}`.trim()}
          onClick={() => onChange && onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
