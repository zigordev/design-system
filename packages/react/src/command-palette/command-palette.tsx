'use client';

import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import type { ReactNode } from 'react';

export interface Command {
  id: string;
  label: string;
  onSelect: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commands: Command[];
  title: string;
  placeholder?: string;
  emptyText: ReactNode;
}

export function CommandPalette({
  open,
  onOpenChange,
  commands,
  title,
  placeholder,
  emptyText,
}: CommandPaletteProps) {
  const run = (command: Command) => {
    onOpenChange(false);
    command.onSelect();
  };
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="ds-backdrop" />
        <BaseDialog.Viewport className="ds-dialog-viewport ds-command-viewport">
          <BaseDialog.Popup className="ds-dialog ds-command" data-size="md">
            <BaseDialog.Title className="ds-visually-hidden">{title}</BaseDialog.Title>
            <BaseAutocomplete.Root
              items={commands}
              inline
              open
              itemToStringValue={(command: Command) => command.label}
            >
              <BaseAutocomplete.Input
                className="ds-text-input"
                placeholder={placeholder}
                aria-label={title}
              />
              <BaseAutocomplete.Empty className="ds-listbox__empty">
                {emptyText}
              </BaseAutocomplete.Empty>
              <BaseAutocomplete.List className="ds-command__list">
                {(command: Command) => (
                  <BaseAutocomplete.Item
                    key={command.id}
                    value={command}
                    className="ds-listbox__item"
                    onClick={() => run(command)}
                  >
                    {command.label}
                  </BaseAutocomplete.Item>
                )}
              </BaseAutocomplete.List>
            </BaseAutocomplete.Root>
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
