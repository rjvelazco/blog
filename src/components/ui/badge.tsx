import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@components/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md whitespace-nowrap select-none px-2 py-0.5 text-[11px] font-semibold border',
  {
    variants: {
      variant: {
        default:
          'bg-primary-100 text-primary-700 border-primary-300 dark:bg-primary-700/20 dark:text-primary-500 dark:border-primary-700/30',
        blue: 'bg-blue-50 text-blue-500 border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30',
        newGold:
          'border border-amber-300/50 bg-neutral-950 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-amber-200 shadow-[0_0_0_1px_rgba(245,158,11,0.18),0_10px_22px_rgba(0,0,0,0.28)]',
        angular:
          'bg-primary-100 text-primary-700 border-primary-300 dark:bg-primary-700/20 dark:text-primary-500 dark:border-primary-700/30',
        ngrx: 'bg-blue-50 text-blue-500 border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30',
        book: 'bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-600/20 dark:text-purple-400 dark:border-purple-600/30',
        leadership:
          'bg-gray-100 text-gray-600 border-gray-300 dark:bg-white/10 dark:text-gray-400 dark:border-white/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { Badge, badgeVariants };
