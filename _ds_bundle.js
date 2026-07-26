/* @ds-bundle: {"format":4,"namespace":"SharedProductDesignSystem_e8ec2e","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Avatar","sourcePath":"components/data-display/Avatar.jsx"},{"name":"Card","sourcePath":"components/data-display/Card.jsx"},{"name":"StatTile","sourcePath":"components/data-display/StatTile.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"ToastRegion","sourcePath":"components/feedback/Toast.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Sidebar","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Modal","sourcePath":"components/overlay/Modal.jsx"}],"sourceHashes":{"components/_shared/injectStyle.js":"0bdef1a17648","components/core/Button.jsx":"3af9f32463db","components/data-display/Avatar.jsx":"22300ff6c7c6","components/data-display/Card.jsx":"ff9dbf4d4bef","components/data-display/StatTile.jsx":"3799d7bb05ce","components/feedback/Badge.jsx":"b829fa51cffb","components/feedback/EmptyState.jsx":"37907c21245b","components/feedback/Toast.jsx":"f2814eb100a2","components/forms/Checkbox.jsx":"8c3fa85e75d3","components/forms/Field.jsx":"c3e665bd819a","components/forms/Input.jsx":"c7bbe478b352","components/forms/Select.jsx":"9e903a82f1a6","components/forms/Switch.jsx":"8149cb24a953","components/navigation/Sidebar.jsx":"23a988b5911f","components/navigation/Tabs.jsx":"3f2cc1985feb","components/overlay/Modal.jsx":"7b2ec27c03c2"},"inlinedExternals":[],"unexposedExports":[{"name":"injectOnce","sourcePath":"components/_shared/injectStyle.js"}]} */

(() => {

const __ds_ns = (window.SharedProductDesignSystem_e8ec2e = window.SharedProductDesignSystem_e8ec2e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/_shared/injectStyle.js
try { (() => {
const injected = new Set();

/** Injects a <style> tag once per id. Used by design-system components to
 * define hover/focus/pseudo-state rules that inline style objects can't
 * express, without pulling in a CSS-in-JS library. */
function injectOnce(id, css) {
  if (typeof document === 'undefined') return;
  if (injected.has(id) || document.getElementById(id)) return;
  injected.add(id);
  const tag = document.createElement('style');
  tag.id = id;
  tag.textContent = css;
  document.head.appendChild(tag);
}
Object.assign(__ds_scope, { injectOnce });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/_shared/injectStyle.js", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectOnce('ds-button', `
.ds-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:1px solid transparent;border-radius:var(--ds-radius-md);font-family:var(--ds-font-sans);font-weight:var(--ds-weight-semibold);white-space:nowrap;cursor:pointer;transition:background var(--ds-duration-fast) var(--ds-ease-out),border-color var(--ds-duration-fast) var(--ds-ease-out),color var(--ds-duration-fast) var(--ds-ease-out),transform var(--ds-duration-fast) var(--ds-ease-out),box-shadow var(--ds-duration-fast) var(--ds-ease-out);}
.ds-btn:active:not(:disabled){transform:translateY(1px);}
.ds-btn:disabled{opacity:.55;cursor:not-allowed;}
.ds-btn:focus-visible{outline:2px solid var(--ds-color-accent);outline-offset:2px;}
.ds-btn-sm{height:32px;padding:0 12px;font-size:var(--ds-text-xs);}
.ds-btn-md{height:38px;padding:0 16px;font-size:var(--ds-text-sm);}
.ds-btn-lg{height:46px;padding:0 22px;font-size:var(--ds-text-base);}
.ds-btn-icon{width:38px;height:38px;padding:0;}
.ds-btn-primary{background:var(--ds-color-accent);color:var(--ds-color-accent-fg);box-shadow:var(--ds-shadow-xs);}
.ds-btn-primary:hover:not(:disabled){background:var(--ds-color-accent-hover);}
.ds-btn-secondary{background:var(--ds-color-surface-2);color:var(--ds-color-fg);border-color:var(--ds-color-border);}
.ds-btn-secondary:hover:not(:disabled){background:var(--ds-color-surface-3);}
.ds-btn-outline{background:var(--ds-color-surface);color:var(--ds-color-fg);border-color:var(--ds-color-border);}
.ds-btn-outline:hover:not(:disabled){background:var(--ds-color-surface-2);}
.ds-btn-ghost{background:transparent;color:var(--ds-color-fg-muted);}
.ds-btn-ghost:hover:not(:disabled){background:var(--ds-color-surface-2);color:var(--ds-color-fg);}
.ds-btn-danger{background:var(--ds-color-danger);color:var(--ds-color-accent-fg);}
.ds-btn-danger:hover:not(:disabled){filter:brightness(0.92);}
`);
function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  style,
  ...props
}) {
  const cls = `ds-btn ds-btn-${variant} ds-btn-${size} ${className}`.trim();
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    style: style
  }, props), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Avatar.jsx
try { (() => {
const SIZES = {
  sm: 28,
  md: 40,
  lg: 68
};
function Avatar({
  name,
  src,
  size = 'md',
  className = '',
  style
}) {
  const px = SIZES[size] ?? size;
  const initials = (name || '?').trim().slice(0, 1).toUpperCase();
  return /*#__PURE__*/React.createElement("span", {
    className: `ds-avatar ${className}`.trim(),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      width: px,
      height: px,
      borderRadius: '50%',
      background: 'var(--ds-color-accent)',
      color: 'var(--ds-color-accent-fg)',
      fontFamily: 'var(--ds-font-sans)',
      fontWeight: 'var(--ds-weight-bold)',
      fontSize: px * 0.42,
      flexShrink: 0,
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  title,
  description,
  footer,
  children,
  interactive = false,
  className = '',
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `ds-card ${className}`.trim(),
    style: {
      background: 'var(--ds-color-surface)',
      border: '1px solid var(--ds-color-border)',
      borderRadius: 'var(--ds-radius-lg)',
      boxShadow: 'var(--ds-shadow-sm)',
      overflow: 'hidden',
      cursor: interactive ? 'pointer' : undefined,
      transition: interactive ? 'transform var(--ds-duration-base) var(--ds-ease-out), box-shadow var(--ds-duration-base) var(--ds-ease-out)' : undefined,
      fontFamily: 'var(--ds-font-sans)',
      ...style
    }
  }, props), title || description ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px',
      borderBottom: children ? '1px solid var(--ds-color-border)' : undefined,
      display: 'grid',
      gap: 4
    }
  }, title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--ds-text-lg)',
      fontWeight: 'var(--ds-weight-bold)',
      color: 'var(--ds-color-fg)'
    }
  }, title) : null, description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--ds-color-fg-muted)',
      fontSize: 'var(--ds-text-sm)'
    }
  }, description) : null) : null, children ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px'
    }
  }, children) : null, footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderTop: '1px solid var(--ds-color-border)',
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, footer) : null);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Card.jsx", error: String((e && e.message) || e) }); }

// components/data-display/StatTile.jsx
try { (() => {
const TONE = {
  default: 'var(--ds-color-fg-muted)',
  accent: 'var(--ds-color-accent)',
  success: 'var(--ds-color-success)',
  warning: 'var(--ds-color-warning)',
  danger: 'var(--ds-color-danger)'
};
const DIRECTION = {
  up: 'var(--ds-color-success)',
  down: 'var(--ds-color-danger)',
  flat: 'var(--ds-color-fg-subtle)'
};
function StatTile({
  label,
  value,
  delta,
  direction = 'flat',
  hint,
  tone = 'default',
  className = '',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `ds-stat-tile ${className}`.trim(),
    style: {
      display: 'grid',
      gap: 8,
      padding: 16,
      borderRadius: 'var(--ds-radius-lg)',
      border: `1px solid ${tone === 'default' ? 'var(--ds-color-border)' : TONE[tone]}`,
      background: 'var(--ds-color-surface)',
      fontFamily: 'var(--ds-font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--ds-text-xs)',
      fontWeight: 'var(--ds-weight-bold)',
      letterSpacing: 'var(--ds-tracking-wide)',
      textTransform: 'uppercase',
      color: 'var(--ds-color-fg-subtle)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--ds-text-2xl)',
      fontWeight: 'var(--ds-weight-bold)',
      lineHeight: 1,
      color: 'var(--ds-color-fg)'
    }
  }, value), delta != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--ds-text-sm)',
      fontWeight: 'var(--ds-weight-semibold)',
      color: DIRECTION[direction]
    }
  }, delta) : null), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--ds-text-xs)',
      color: 'var(--ds-color-fg-subtle)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/StatTile.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectOnce('ds-badge', `
.ds-badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:var(--ds-radius-full);border:1px solid transparent;font-family:var(--ds-font-sans);font-size:var(--ds-text-xs);font-weight:var(--ds-weight-semibold);letter-spacing:.02em;white-space:nowrap;}
.ds-badge-neutral{background:var(--ds-color-surface-2);color:var(--ds-color-fg-muted);border-color:var(--ds-color-border);}
.ds-badge-accent{background:var(--ds-color-accent-soft);color:var(--ds-color-accent);border-color:transparent;}
.ds-badge-success{background:var(--ds-color-success-bg);color:var(--ds-color-success-fg);border-color:var(--ds-color-success-border);}
.ds-badge-warning{background:var(--ds-color-warning-bg);color:var(--ds-color-warning-fg);border-color:var(--ds-color-warning-border);}
.ds-badge-danger{background:var(--ds-color-danger-bg);color:var(--ds-color-danger-fg);border-color:var(--ds-color-danger-border);}
.ds-badge-info{background:var(--ds-color-info-bg);color:var(--ds-color-info-fg);border-color:var(--ds-color-info-border);}
.ds-badge-dot{width:6px;height:6px;border-radius:50%;background:currentColor;flex-shrink:0;}
`);
function Badge({
  variant = 'neutral',
  dot = false,
  children,
  className = '',
  ...props
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `ds-badge ds-badge-${variant} ${className}`.trim()
  }, props), dot ? /*#__PURE__*/React.createElement("span", {
    className: "ds-badge-dot"
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
function EmptyState({
  icon,
  title,
  description,
  action,
  size = 'md',
  className = '',
  style
}) {
  const pad = size === 'sm' ? '28px 20px' : '48px 32px';
  const iconSize = size === 'sm' ? 36 : 48;
  return /*#__PURE__*/React.createElement("div", {
    className: `ds-empty-state ${className}`.trim(),
    style: {
      display: 'grid',
      justifyItems: 'center',
      textAlign: 'center',
      gap: 6,
      padding: pad,
      border: '1px dashed var(--ds-color-border)',
      borderRadius: 'var(--ds-radius-lg)',
      background: 'var(--ds-color-surface)',
      fontFamily: 'var(--ds-font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: iconSize,
      height: iconSize,
      display: 'grid',
      placeItems: 'center',
      borderRadius: '50%',
      background: 'var(--ds-color-surface-2)',
      color: 'var(--ds-color-fg-subtle)',
      marginBottom: 4
    }
  }, icon ?? '—'), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--ds-text-lg)',
      fontWeight: 'var(--ds-weight-bold)',
      color: 'var(--ds-color-fg)'
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: 420,
      color: 'var(--ds-color-fg-muted)',
      fontSize: 'var(--ds-text-sm)'
    }
  }, description) : null, action ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, action) : null);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectOnce('ds-toast', `
.ds-toast-region{position:fixed;z-index:1000;right:20px;bottom:20px;display:grid;gap:8px;width:min(360px,calc(100vw - 40px));}
.ds-toast{display:flex;align-items:flex-start;gap:10px;padding:13px 16px;border:1px solid transparent;border-radius:var(--ds-radius-md);box-shadow:var(--ds-shadow-lg);font-family:var(--ds-font-sans);font-size:var(--ds-text-sm);font-weight:var(--ds-weight-semibold);text-align:left;animation:ds-toast-in var(--ds-duration-base) var(--ds-ease-out) both;}
@keyframes ds-toast-in{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
.ds-toast-success{background:var(--ds-color-success-bg);color:var(--ds-color-success-fg);border-color:var(--ds-color-success-border);}
.ds-toast-warning{background:var(--ds-color-warning-bg);color:var(--ds-color-warning-fg);border-color:var(--ds-color-warning-border);}
.ds-toast-danger{background:var(--ds-color-danger-bg);color:var(--ds-color-danger-fg);border-color:var(--ds-color-danger-border);}
.ds-toast-info{background:var(--ds-color-info-bg);color:var(--ds-color-info-fg);border-color:var(--ds-color-info-border);}
`);
function Toast({
  kind = 'info',
  children,
  onDismiss,
  className = '',
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `ds-toast ds-toast-${kind} ${className}`.trim(),
    role: "status"
  }, props), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, children), onDismiss ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onDismiss,
    "aria-label": "Dismiss",
    style: {
      background: 'none',
      border: 'none',
      color: 'var(--ds-color-fg-subtle)',
      cursor: 'pointer',
      fontSize: 'var(--ds-text-base)',
      lineHeight: 1,
      padding: 0
    }
  }, "\xD7") : null);
}
function ToastRegion({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ds-toast-region",
    "aria-live": "polite",
    "aria-atomic": "true"
  }, children);
}
Object.assign(__ds_scope, { Toast, ToastRegion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectOnce('ds-checkbox', `
.ds-checkbox{width:18px;height:18px;accent-color:var(--ds-color-accent);border-radius:4px;cursor:pointer;flex-shrink:0;}
.ds-checkbox:disabled{cursor:not-allowed;opacity:.55;}
.ds-checkbox-row{display:inline-flex;align-items:center;gap:8px;font-family:var(--ds-font-sans);font-size:var(--ds-text-sm);color:var(--ds-color-fg);cursor:pointer;}
`);
let seq = 0;
function Checkbox({
  label,
  className = '',
  style,
  id,
  ...props
}) {
  const inputId = React.useRef(id || `ds-checkbox-${++seq}`).current;
  return /*#__PURE__*/React.createElement("label", {
    className: "ds-checkbox-row",
    htmlFor: inputId,
    style: style
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: "checkbox",
    className: `ds-checkbox ${className}`.trim()
  }, props)), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function Field({
  label,
  hint,
  error,
  required,
  children,
  className = '',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `ds-field ${className}`.trim(),
    style: {
      display: 'grid',
      gap: 6,
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 'var(--ds-text-sm)',
      fontWeight: 'var(--ds-weight-semibold)',
      color: 'var(--ds-color-fg)',
      fontFamily: 'var(--ds-font-sans)'
    }
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ds-color-danger)'
    }
  }, " *") : null) : null, children, error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--ds-text-xs)',
      color: 'var(--ds-color-danger)',
      fontFamily: 'var(--ds-font-sans)'
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--ds-text-xs)',
      color: 'var(--ds-color-fg-subtle)',
      fontFamily: 'var(--ds-font-sans)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectOnce('ds-input', `
.ds-input{display:block;box-sizing:border-box;width:100%;height:38px;padding:0 12px;background:var(--ds-color-surface);border:1px solid var(--ds-color-border);border-radius:var(--ds-radius-md);font-family:var(--ds-font-sans);font-size:var(--ds-text-base);color:var(--ds-color-fg);transition:border-color var(--ds-duration-fast) var(--ds-ease-out),box-shadow var(--ds-duration-fast) var(--ds-ease-out);}
.ds-input::placeholder{color:var(--ds-color-fg-faint);}
.ds-input:hover:not(:disabled):not(:focus){border-color:var(--ds-color-border-strong);}
.ds-input:focus{outline:none;border-color:var(--ds-color-accent);box-shadow:0 0 0 3px var(--ds-color-accent-soft);}
.ds-input:disabled{background:var(--ds-color-surface-2);color:var(--ds-color-fg-faint);cursor:not-allowed;}
.ds-input-invalid{border-color:var(--ds-color-danger) !important;}
`);
function Input({
  invalid = false,
  className = '',
  ...props
}) {
  const cls = `ds-input ${invalid ? 'ds-input-invalid' : ''} ${className}`.trim();
  return /*#__PURE__*/React.createElement("input", _extends({
    className: cls
  }, props));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectOnce('ds-select', `
.ds-select-wrap{position:relative;display:inline-block;width:100%;}
.ds-select{appearance:none;-webkit-appearance:none;box-sizing:border-box;display:block;width:100%;height:38px;padding:0 34px 0 12px;background:var(--ds-color-surface);border:1px solid var(--ds-color-border);border-radius:var(--ds-radius-md);font-family:var(--ds-font-sans);font-size:var(--ds-text-base);color:var(--ds-color-fg);}
.ds-select:hover:not(:disabled){border-color:var(--ds-color-border-strong);}
.ds-select:focus{outline:none;border-color:var(--ds-color-accent);box-shadow:0 0 0 3px var(--ds-color-accent-soft);}
.ds-select:disabled{background:var(--ds-color-surface-2);color:var(--ds-color-fg-faint);cursor:not-allowed;}
.ds-select-chevron{position:absolute;right:12px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--ds-color-fg-subtle);font-size:11px;}
`);
function Select({
  children,
  className = '',
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "ds-select-wrap",
    style: style
  }, /*#__PURE__*/React.createElement("select", _extends({
    className: `ds-select ${className}`.trim()
  }, props), children), /*#__PURE__*/React.createElement("span", {
    className: "ds-select-chevron",
    "aria-hidden": "true"
  }, "\u25BE"));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectOnce('ds-switch', `
.ds-switch{position:relative;display:inline-flex;align-items:center;width:38px;height:22px;border-radius:999px;background:var(--ds-color-border-strong);border:none;padding:0;cursor:pointer;transition:background var(--ds-duration-fast) var(--ds-ease-out);flex-shrink:0;}
.ds-switch[data-checked="true"]{background:var(--ds-color-accent);}
.ds-switch:disabled{opacity:.55;cursor:not-allowed;}
.ds-switch-thumb{position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:var(--ds-shadow-sm);transition:transform var(--ds-duration-fast) var(--ds-ease-out);}
.ds-switch[data-checked="true"] .ds-switch-thumb{transform:translateX(16px);}
`);
function Switch({
  checked = false,
  onChange,
  disabled,
  className = '',
  ...props
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "switch",
    "aria-checked": checked,
    "data-checked": checked,
    disabled: disabled,
    className: `ds-switch ${className}`.trim(),
    onClick: () => onChange && onChange(!checked)
  }, props), /*#__PURE__*/React.createElement("span", {
    className: "ds-switch-thumb"
  }));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Sidebar.jsx
try { (() => {
function Sidebar({
  brand,
  items,
  activeHref,
  className = '',
  style
}) {
  return /*#__PURE__*/React.createElement("aside", {
    className: `ds-sidebar ${className}`.trim(),
    style: {
      width: 240,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      borderRight: '1px solid var(--ds-color-border)',
      background: 'var(--ds-color-surface)',
      fontFamily: 'var(--ds-font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 56,
      padding: '0 20px',
      borderBottom: '1px solid var(--ds-color-border)'
    }
  }, brand), /*#__PURE__*/React.createElement("nav", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px 12px',
      display: 'grid',
      gap: 4
    }
  }, items.map(item => {
    const active = item.href === activeHref;
    return /*#__PURE__*/React.createElement("a", {
      key: item.href,
      href: item.href,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 12px',
        borderRadius: 'var(--ds-radius-md)',
        fontSize: 'var(--ds-text-sm)',
        fontWeight: 'var(--ds-weight-semibold)',
        textDecoration: 'none',
        color: active ? 'var(--ds-color-accent)' : 'var(--ds-color-fg-muted)',
        background: active ? 'var(--ds-color-accent-soft)' : 'transparent'
      }
    }, item.icon ? /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        display: 'grid',
        placeItems: 'center',
        width: 18
      }
    }, item.icon) : null, /*#__PURE__*/React.createElement("span", null, item.label));
  })));
}
Object.assign(__ds_scope, { Sidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Sidebar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
__ds_scope.injectOnce('ds-tabs', `
.ds-tabs{display:inline-flex;align-items:center;gap:2px;padding:4px;border-radius:var(--ds-radius-full);background:var(--ds-color-surface-2);border:1px solid var(--ds-color-border);}
.ds-tab{border:0;background:transparent;padding:7px 16px;border-radius:var(--ds-radius-full);font-family:var(--ds-font-sans);font-size:var(--ds-text-sm);font-weight:var(--ds-weight-semibold);color:var(--ds-color-fg-muted);cursor:pointer;transition:background var(--ds-duration-fast) var(--ds-ease-out),color var(--ds-duration-fast) var(--ds-ease-out);}
.ds-tab:hover:not(.ds-tab-active){color:var(--ds-color-fg);}
.ds-tab-active{background:var(--ds-color-surface);color:var(--ds-color-accent);box-shadow:var(--ds-shadow-sm);}
`);
function Tabs({
  tabs,
  value,
  onChange,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `ds-tabs ${className}`.trim(),
    role: "tablist"
  }, tabs.map(tab => /*#__PURE__*/React.createElement("button", {
    key: tab.value,
    type: "button",
    role: "tab",
    "aria-selected": tab.value === value,
    className: `ds-tab ${tab.value === value ? 'ds-tab-active' : ''}`.trim(),
    onClick: () => onChange && onChange(tab.value)
  }, tab.label)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Modal.jsx
try { (() => {
function Modal({
  open,
  title,
  description,
  children,
  footer,
  onClose,
  className = '',
  style
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'grid',
      placeItems: 'center',
      padding: 20,
      background: 'oklch(15% 0.01 264 / 0.5)',
      backdropFilter: 'blur(3px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    className: `ds-modal ${className}`.trim(),
    style: {
      width: 'min(480px, 100%)',
      maxHeight: 'min(90vh, calc(100vh - 40px))',
      overflowY: 'auto',
      background: 'var(--ds-color-surface)',
      border: '1px solid var(--ds-color-border)',
      borderRadius: 'var(--ds-radius-xl)',
      boxShadow: 'var(--ds-shadow-xl)',
      padding: 24,
      display: 'grid',
      gap: 16,
      fontFamily: 'var(--ds-font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 4
    }
  }, title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--ds-text-lg)',
      fontWeight: 'var(--ds-weight-bold)',
      color: 'var(--ds-color-fg)'
    }
  }, title) : null, description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--ds-text-sm)',
      color: 'var(--ds-color-fg-muted)'
    }
  }, description) : null), children, footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 8
    }
  }, footer) : null));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Modal.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.ToastRegion = __ds_scope.ToastRegion;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Modal = __ds_scope.Modal;

})();
