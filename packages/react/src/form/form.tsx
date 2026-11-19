'use client';

import { Form as BaseForm } from '@base-ui/react/form';
import type { ComponentPropsWithRef } from 'react';
import { classNames } from '../internal/class-names.ts';

export type FormProps = Omit<ComponentPropsWithRef<typeof BaseForm>, 'className' | 'render'> & {
  className?: string;
};

export function Form({ className, ...props }: FormProps) {
  return <BaseForm {...props} className={classNames('ds-form', className)} />;
}
