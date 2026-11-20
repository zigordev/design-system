'use client';

import { CopyButton } from '../copy-button/copy-button.tsx';
import { classNames } from '../internal/class-names.ts';

export interface CodeBlockProps {
  code: string;
  label: string;
  language?: string;
  copyLabel?: string;
  copiedLabel?: string;
  className?: string;
}

export function CodeBlock({
  code,
  label,
  language,
  copyLabel,
  copiedLabel,
  className,
}: CodeBlockProps) {
  return (
    <figure className={classNames('ds-code-block', className)} aria-label={label}>
      {language || (copyLabel && copiedLabel) ? (
        <div className="ds-code-block__header">
          <span>{language}</span>
          {copyLabel && copiedLabel ? (
            <CopyButton text={code} label={copyLabel} copiedLabel={copiedLabel} variant="ghost" />
          ) : null}
        </div>
      ) : null}
      <pre className="ds-code-block__code">
        <code>{code}</code>
      </pre>
    </figure>
  );
}
