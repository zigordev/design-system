'use client';

import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import { ChevronDownIcon } from '@zigordev/icons';
import type { ComponentProps, ReactNode } from 'react';
import { classNames } from '../internal/class-names.ts';

export interface AccordionItem {
  value: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export type AccordionProps = Omit<
  ComponentProps<typeof BaseAccordion.Root>,
  'children' | 'className' | 'render'
> & {
  items: AccordionItem[];
  headingLevel?: 2 | 3 | 4;
  className?: string;
};

export function Accordion({ items, headingLevel = 3, className, ...props }: AccordionProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <BaseAccordion.Root {...props} className={classNames('ds-accordion', className)}>
      {items.map((item) => (
        <BaseAccordion.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className="ds-accordion__item"
        >
          <BaseAccordion.Header className="ds-accordion__header" render={<Heading />}>
            <BaseAccordion.Trigger className="ds-accordion__trigger">
              {item.title}
              <span className="ds-accordion__icon" aria-hidden="true">
                <ChevronDownIcon />
              </span>
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className="ds-accordion__panel">
            <div className="ds-accordion__content">{item.content}</div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}
