import * as React from 'react';

export interface FieldProps {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  /** Shown instead of hint, styled as an error. */
  error?: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export declare function Field(props: FieldProps): JSX.Element;
