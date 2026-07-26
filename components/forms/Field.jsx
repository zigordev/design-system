import React from 'react';

export function Field({ label, hint, error, required, children, className = '', style }) {
  return (
    <div className={`ds-field ${className}`.trim()} style={{ display: 'grid', gap: 6, ...style }}>
      {label ? (
        <label style={{ fontSize: 'var(--ds-text-sm)', fontWeight: 'var(--ds-weight-semibold)', color: 'var(--ds-color-fg)', fontFamily: 'var(--ds-font-sans)' }}>
          {label}
          {required ? <span style={{ color: 'var(--ds-color-danger)' }}> *</span> : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <span style={{ fontSize: 'var(--ds-text-xs)', color: 'var(--ds-color-danger)', fontFamily: 'var(--ds-font-sans)' }}>{error}</span>
      ) : hint ? (
        <span style={{ fontSize: 'var(--ds-text-xs)', color: 'var(--ds-color-fg-subtle)', fontFamily: 'var(--ds-font-sans)' }}>{hint}</span>
      ) : null}
    </div>
  );
}
