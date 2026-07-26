import React from 'react';

export function Modal({ open, title, description, children, footer, onClose, className = '', style }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000, display: 'grid', placeItems: 'center', padding: 20,
        background: 'oklch(15% 0.01 264 / 0.5)', backdropFilter: 'blur(3px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`ds-modal ${className}`.trim()}
        style={{
          width: 'min(480px, 100%)', maxHeight: 'min(90vh, calc(100vh - 40px))', overflowY: 'auto',
          background: 'var(--ds-color-surface)', border: '1px solid var(--ds-color-border)',
          borderRadius: 'var(--ds-radius-xl)', boxShadow: 'var(--ds-shadow-xl)', padding: 24,
          display: 'grid', gap: 16, fontFamily: 'var(--ds-font-sans)', ...style,
        }}
      >
        <div style={{ display: 'grid', gap: 4 }}>
          {title ? <h3 style={{ margin: 0, fontSize: 'var(--ds-text-lg)', fontWeight: 'var(--ds-weight-bold)', color: 'var(--ds-color-fg)' }}>{title}</h3> : null}
          {description ? <p style={{ margin: 0, fontSize: 'var(--ds-text-sm)', color: 'var(--ds-color-fg-muted)' }}>{description}</p> : null}
        </div>
        {children}
        {footer ? <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>{footer}</div> : null}
      </div>
    </div>
  );
}
