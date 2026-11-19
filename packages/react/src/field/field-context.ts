'use client';

import { createContext, useContext } from 'react';

interface FieldContextValue {
  required: boolean;
}

export const FieldContext = createContext<FieldContextValue>({ required: false });

export function useFieldRequired(required: boolean | undefined): boolean {
  const field = useContext(FieldContext);
  return required ?? field.required;
}
