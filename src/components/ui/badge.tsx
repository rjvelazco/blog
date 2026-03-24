import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@components/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md whitespace-nowrap select-none px-2 py-0.5 text-[11px] font-semibold border',
  {
    variants: {
      variant: {
        default:
          'bg-[#f4f7f5] text-[#4d7c5f] border-[#c8ddd0] dark:bg-[#4d7c5f]/20 dark:text-[#7daa8d] dark:border-[#4d7c5f]/30',
        // AA contrast with white text (previous accent was too light in dark mode).
        blue: 'bg-[#eff6ff] text-[#3b82f6] border-[#bfdbfe] dark:bg-[#3b82f6]/20 dark:text-[#93c5fd] dark:border-[#3b82f6]/30',
        newGold:
          'border border-amber-300/50 bg-neutral-950 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-amber-200 shadow-[0_0_0_1px_rgba(245,158,11,0.18),0_10px_22px_rgba(0,0,0,0.28)]',
        angular:
          'bg-[#f4f7f5] text-[#4d7c5f] border-[#c8ddd0] dark:bg-[#4d7c5f]/20 dark:text-[#7daa8d] dark:border-[#4d7c5f]/30',
        ngrx: 'bg-[#eff6ff] text-[#3b82f6] border-[#bfdbfe] dark:bg-[#3b82f6]/20 dark:text-[#93c5fd] dark:border-[#3b82f6]/30',
        book: 'bg-[#fdf4ff] text-[#9333ea] border-[#e9d5ff] dark:bg-[#9333ea]/20 dark:text-[#c084fc] dark:border-[#9333ea]/30',
        leadership:
          'bg-[#f0f0f0] text-[#555555] border-[#d4d4d4] dark:bg-white/10 dark:text-[#aaaaaa] dark:border-white/20',
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
