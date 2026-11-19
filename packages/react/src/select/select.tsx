'use client';

import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete';
import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { Select as BaseSelect } from '@base-ui/react/select';
import { CheckIcon, ChevronDownIcon } from '@zigordev/icons';
import type { ReactNode } from 'react';
import { useFieldRequired } from '../field/field-context.ts';
import { classNames } from '../internal/class-names.ts';
import type { TextInputSize } from '../text-input/text-input.tsx';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ListControl {
  name?: string;
  disabled?: boolean;
  required?: boolean;
  size?: TextInputSize;
  className?: string;
  'aria-label'?: string;
}

export type SelectProps = ListControl & {
  options: SelectOption[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
};

export type ComboboxProps = ListControl & {
  options: SelectOption[];
  value?: SelectOption | null;
  defaultValue?: SelectOption | null;
  onValueChange?: (option: SelectOption | null) => void;
  placeholder?: string;
  emptyText: ReactNode;
};

export type AutocompleteProps = Omit<ListControl, 'required'> & {
  suggestions: string[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyText?: ReactNode;
};

export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  name,
  disabled,
  required,
  size = 'md',
  className,
  'aria-label': label,
}: SelectProps) {
  return (
    <BaseSelect.Root
      items={options}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => onValueChange?.(next)}
      name={name}
      disabled={disabled}
      required={useFieldRequired(required)}
    >
      <BaseSelect.Trigger
        className={classNames('ds-select', className)}
        data-size={size}
        aria-label={label}
      >
        <BaseSelect.Value className="ds-select__value" placeholder={placeholder} />
        <BaseSelect.Icon className="ds-select__icon">
          <ChevronDownIcon />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner className="ds-positioner" sideOffset={4}>
          <BaseSelect.Popup className="ds-popup ds-listbox">
            <BaseSelect.List>
              {options.map((option) => (
                <BaseSelect.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="ds-listbox__item"
                >
                  <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                  <BaseSelect.ItemIndicator className="ds-listbox__indicator">
                    <CheckIcon />
                  </BaseSelect.ItemIndicator>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}

export function Combobox({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  emptyText,
  name,
  disabled,
  required,
  size = 'md',
  className,
  'aria-label': label,
}: ComboboxProps) {
  return (
    <BaseCombobox.Root
      items={options}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next: SelectOption | null) => onValueChange?.(next)}
      itemToStringLabel={(option: SelectOption) => option.label}
      itemToStringValue={(option: SelectOption) => option.value}
      isItemEqualToValue={(option: SelectOption, current: SelectOption) =>
        option.value === current.value
      }
      name={name}
      disabled={disabled}
      required={useFieldRequired(required)}
    >
      <div className={classNames('ds-combobox', className)}>
        <BaseCombobox.Input
          className="ds-text-input ds-combobox__input"
          data-size={size}
          placeholder={placeholder}
          aria-label={label}
        />
        <span className="ds-combobox__icon" aria-hidden="true">
          <ChevronDownIcon />
        </span>
      </div>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner className="ds-positioner" sideOffset={4}>
          <BaseCombobox.Popup className="ds-popup ds-listbox">
            <BaseCombobox.Empty className="ds-listbox__empty">{emptyText}</BaseCombobox.Empty>
            <BaseCombobox.List>
              {(option: SelectOption) => (
                <BaseCombobox.Item
                  key={option.value}
                  value={option}
                  disabled={option.disabled}
                  className="ds-listbox__item"
                >
                  <span>{option.label}</span>
                  <BaseCombobox.ItemIndicator className="ds-listbox__indicator">
                    <CheckIcon />
                  </BaseCombobox.ItemIndicator>
                </BaseCombobox.Item>
              )}
            </BaseCombobox.List>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
}

export function Autocomplete({
  suggestions,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  emptyText,
  name,
  disabled,
  size = 'md',
  className,
  'aria-label': label,
}: AutocompleteProps) {
  return (
    <BaseAutocomplete.Root
      items={suggestions}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next: string) => onValueChange?.(next)}
      name={name}
      disabled={disabled}
    >
      <BaseAutocomplete.Input
        className={classNames('ds-text-input', className)}
        data-size={size}
        placeholder={placeholder}
        aria-label={label}
      />
      <BaseAutocomplete.Portal>
        <BaseAutocomplete.Positioner className="ds-positioner" sideOffset={4}>
          <BaseAutocomplete.Popup className="ds-popup ds-listbox">
            {emptyText ? (
              <BaseAutocomplete.Empty className="ds-listbox__empty">
                {emptyText}
              </BaseAutocomplete.Empty>
            ) : null}
            <BaseAutocomplete.List>
              {(suggestion: string) => (
                <BaseAutocomplete.Item
                  key={suggestion}
                  value={suggestion}
                  className="ds-listbox__item"
                >
                  {suggestion}
                </BaseAutocomplete.Item>
              )}
            </BaseAutocomplete.List>
          </BaseAutocomplete.Popup>
        </BaseAutocomplete.Positioner>
      </BaseAutocomplete.Portal>
    </BaseAutocomplete.Root>
  );
}
