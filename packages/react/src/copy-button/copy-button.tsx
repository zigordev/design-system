'use client';

import { CheckIcon, CopyIcon } from '@zigordev/icons';
import { useEffect, useState } from 'react';
import { Button, type ButtonSize, type ButtonTone, type ButtonVariant } from '../button/button.tsx';

export interface CopyButtonProps {
  text: string;
  label: string;
  copiedLabel: string;
  iconOnly?: boolean;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  className?: string;
}

export function CopyButton({
  text,
  label,
  copiedLabel,
  iconOnly = false,
  variant = 'outline',
  tone = 'neutral',
  size = 'sm',
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const reset = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(reset);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const appearance = { variant, tone, size, className, onClick: copy };
  const icon = copied ? <CheckIcon /> : <CopyIcon />;
  return (
    <>
      {iconOnly ? (
        <Button {...appearance} iconOnly aria-label={copied ? copiedLabel : label}>
          {icon}
        </Button>
      ) : (
        <Button {...appearance} startIcon={icon}>
          {copied ? copiedLabel : label}
        </Button>
      )}
      <span className="ds-visually-hidden" role="status">
        {copied ? copiedLabel : ''}
      </span>
    </>
  );
}
