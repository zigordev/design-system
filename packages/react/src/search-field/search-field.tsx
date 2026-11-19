'use client';

import { Input as BaseInput } from '@base-ui/react/input';
import { SearchIcon, XIcon } from '@zigordev/icons';
import { type ComponentPropsWithoutRef, useRef, useState } from 'react';
import { useFieldRequired } from '../field/field-context.ts';
import { classNames } from '../internal/class-names.ts';
import type { TextInputSize } from '../text-input/text-input.tsx';

export type SearchFieldProps = Omit<
  ComponentPropsWithoutRef<typeof BaseInput>,
  'className' | 'render' | 'type' | 'size' | 'value' | 'defaultValue' | 'onValueChange'
> & {
  clearLabel: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: TextInputSize;
  className?: string;
};

export function SearchField({
  clearLabel,
  value,
  defaultValue = '',
  onValueChange,
  size = 'md',
  required,
  className,
  ...props
}: SearchFieldProps) {
  const [inner, setInner] = useState(defaultValue);
  const input = useRef<HTMLInputElement>(null);
  const controlled = value !== undefined;
  const current = controlled ? value : inner;
  const change = (next: string) => {
    if (!controlled) setInner(next);
    onValueChange?.(next);
  };
  return (
    <div className={classNames('ds-search-field', className)}>
      <span className="ds-search-field__icon" aria-hidden="true">
        <SearchIcon />
      </span>
      <BaseInput
        {...props}
        ref={input}
        type="search"
        value={current}
        onValueChange={change}
        required={useFieldRequired(required)}
        className="ds-text-input ds-search-field__input"
        data-size={size}
      />
      {current ? (
        <button
          type="button"
          className="ds-search-field__clear"
          aria-label={clearLabel}
          onClick={() => {
            change('');
            input.current?.focus();
          }}
        >
          <XIcon />
        </button>
      ) : null}
    </div>
  );
}
