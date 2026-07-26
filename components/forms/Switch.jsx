import React from 'react';
import { injectOnce } from '../_shared/injectStyle.js';

injectOnce('ds-switch', `
.ds-switch{position:relative;display:inline-flex;align-items:center;width:38px;height:22px;border-radius:999px;background:var(--ds-color-border-strong);border:none;padding:0;cursor:pointer;transition:background var(--ds-duration-fast) var(--ds-ease-out);flex-shrink:0;}
.ds-switch[data-checked="true"]{background:var(--ds-color-accent);}
.ds-switch:disabled{opacity:.55;cursor:not-allowed;}
.ds-switch-thumb{position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:var(--ds-shadow-sm);transition:transform var(--ds-duration-fast) var(--ds-ease-out);}
.ds-switch[data-checked="true"] .ds-switch-thumb{transform:translateX(16px);}
`);

export function Switch({ checked = false, onChange, disabled, className = '', ...props }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-checked={checked}
      disabled={disabled}
      className={`ds-switch ${className}`.trim()}
      onClick={() => onChange && onChange(!checked)}
      {...props}
    >
      <span className="ds-switch-thumb" />
    </button>
  );
}
