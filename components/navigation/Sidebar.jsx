import React from 'react';

export function Sidebar({ brand, items, activeHref, className = '', style }) {
  return (
    <aside
      className={`ds-sidebar ${className}`.trim()}
      style={{
        width: 240, display: 'flex', flexDirection: 'column', height: '100%',
        borderRight: '1px solid var(--ds-color-border)', background: 'var(--ds-color-surface)',
        fontFamily: 'var(--ds-font-sans)', ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 56, padding: '0 20px', borderBottom: '1px solid var(--ds-color-border)' }}>
        {brand}
      </div>
      <nav style={{ flex: 1, overflowY: 'auto', padding: '16px 12px', display: 'grid', gap: 4 }}>
        {items.map((item) => {
          const active = item.href === activeHref;
          return (
            <a
              key={item.href}
              href={item.href}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 'var(--ds-radius-md)',
                fontSize: 'var(--ds-text-sm)', fontWeight: 'var(--ds-weight-semibold)', textDecoration: 'none',
                color: active ? 'var(--ds-color-accent)' : 'var(--ds-color-fg-muted)',
                background: active ? 'var(--ds-color-accent-soft)' : 'transparent',
              }}
            >
              {item.icon ? <span aria-hidden="true" style={{ display: 'grid', placeItems: 'center', width: 18 }}>{item.icon}</span> : null}
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
