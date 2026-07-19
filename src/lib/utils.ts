import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper de shadcn/ui: combina clases de Tailwind resolviendo conflictos.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
