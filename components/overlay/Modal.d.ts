import * as React from 'react';

export interface ModalProps {
  open: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export declare function Modal(props: ModalProps): JSX.Element;
