import type { ReactNode } from 'react';

export function present(node: ReactNode): boolean {
  return node !== undefined && node !== null && node !== false && node !== '';
}
