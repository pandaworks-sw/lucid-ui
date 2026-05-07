import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const cardGroupVariants = cva('grid gap-4', {
  variants: {
    columns: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4',
    },
    gap: {
      sm: 'gap-2',
      default: 'gap-4',
      lg: 'gap-6',
    },
  },
  defaultVariants: {
    columns: 3,
    gap: 'default',
  },
});

export interface CardGroupProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title'>,
    VariantProps<typeof cardGroupVariants> {
  /** Optional shared header rendered above the grid. */
  title?: ReactNode;
  /** Trailing action shown next to `title` (only rendered when `title` is set). */
  action?: ReactNode;
}

/**
 * Responsive grid container for groups of related cards. Auto-collapses to
 * single-column on mobile and 2 columns on `md`. Always use this instead of a
 * hand-rolled `<div className="grid grid-cols-...">`.
 */
const CardGroup = forwardRef<HTMLElement, CardGroupProps>(function CardGroup(
  { columns, gap, title, action, className, children, ...rest },
  ref
) {
  return (
    <section ref={ref} data-slot="card-group" className={cn('space-y-3', className)} {...rest}>
      {(title || action) && (
        <header className="flex items-center justify-between">
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          {action && <div className="shrink-0">{action}</div>}
        </header>
      )}
      <div data-slot="card-group-grid" className={cn(cardGroupVariants({ columns, gap }))}>
        {children}
      </div>
    </section>
  );
});
CardGroup.displayName = 'CardGroup';

export { CardGroup };
