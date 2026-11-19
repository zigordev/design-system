'use client';

import { Field as BaseField } from '@base-ui/react/field';
import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset';
import { createContext, type ReactElement, type ReactNode, useContext } from 'react';
import { classNames } from '../internal/class-names.ts';
import { present } from '../internal/present.ts';

const ChoiceGroupContext = createContext(false);

export interface ChoiceContent {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  className?: string;
}

interface ChoiceProps extends ChoiceContent {
  control: ReactElement;
  disabled?: boolean | undefined;
}

export function Choice({ control, label, description, error, disabled, className }: ChoiceProps) {
  const inGroup = useContext(ChoiceGroupContext);
  const hasError = !inGroup && present(error);
  const content = (
    <>
      <BaseField.Label className="ds-choice__label">
        {control}
        <span>{label}</span>
      </BaseField.Label>
      {present(description) ? (
        <BaseField.Description className="ds-choice__description">
          {description}
        </BaseField.Description>
      ) : null}
      {hasError ? (
        <BaseField.Error className="ds-field__error" match>
          {error}
        </BaseField.Error>
      ) : null}
    </>
  );
  const name = classNames('ds-choice', className);
  return inGroup ? (
    <BaseField.Item className={name} disabled={disabled}>
      {content}
    </BaseField.Item>
  ) : (
    <BaseField.Root className={name} disabled={disabled} invalid={hasError ? true : undefined}>
      {content}
    </BaseField.Root>
  );
}

export type ChoiceOrientation = 'vertical' | 'horizontal';

export interface ChoiceGroupContent {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  orientation?: ChoiceOrientation;
  className?: string;
  children: ReactNode;
}

interface ChoiceGroupProps extends ChoiceGroupContent {
  group: ReactElement;
  name?: string | undefined;
  disabled?: boolean | undefined;
}

export function ChoiceGroup({
  group,
  label,
  description,
  error,
  orientation = 'vertical',
  name,
  disabled,
  className,
  children,
}: ChoiceGroupProps) {
  const hasError = present(error);
  return (
    <BaseField.Root
      className={classNames('ds-field', className)}
      name={name}
      disabled={disabled}
      invalid={hasError ? true : undefined}
    >
      <BaseFieldset.Root className="ds-choice-group" render={group}>
        <BaseFieldset.Legend className="ds-field__label">{label}</BaseFieldset.Legend>
        {present(description) ? (
          <BaseField.Description className="ds-field__description">
            {description}
          </BaseField.Description>
        ) : null}
        <ChoiceGroupContext.Provider value={true}>
          <div className="ds-choice-group__items" data-orientation={orientation}>
            {children}
          </div>
        </ChoiceGroupContext.Provider>
      </BaseFieldset.Root>
      {hasError ? (
        <BaseField.Error className="ds-field__error" match>
          {error}
        </BaseField.Error>
      ) : (
        <BaseField.Error className="ds-field__error" />
      )}
    </BaseField.Root>
  );
}
