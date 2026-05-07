import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const dotVariants = cva(
  'relative z-10 flex size-2.5 shrink-0 items-center justify-center rounded-full ring-4 ring-background',
  {
    variants: {
      tone: {
        default: 'bg-muted-foreground',
        info: 'bg-info',
        success: 'bg-success',
        warning: 'bg-warning',
        destructive: 'bg-destructive',
        muted: 'bg-muted-foreground',
      },
    },
    defaultVariants: {
      tone: 'default',
    },
  }
);

export type TimelineItemTone = NonNullable<VariantProps<typeof dotVariants>['tone']>;

export interface TimelineItem {
  /** Stable identifier — used as React key. */
  id: string;
  /** Visual tone for the connector dot. Falls back to the Timeline's `defaultTone`. */
  tone?: TimelineItemTone;
  /**
   * Optional icon override — when provided, replaces the dot. The icon should
   * already include its own color/sizing classes.
   */
  icon?: ReactNode;
  /** Primary line of the entry. */
  title: ReactNode;
  /** Subdued line below the title — typically actor / type / timestamp. */
  subtitle?: ReactNode;
  /** Right-side trailing slot — typically a timestamp pill or status badge. */
  meta?: ReactNode;
}

export interface TimelineProps extends Omit<HTMLAttributes<HTMLOListElement>, 'children'> {
  /** Events to render, top to bottom. */
  items: TimelineItem[];
  /** Default tone applied to items that don't specify their own. */
  defaultTone?: TimelineItemTone;
  /** Hide the connector line — useful for single-event compact lists. */
  hideConnector?: boolean;
  /** Rendered when `items` is empty. */
  emptyState?: ReactNode;
}

const Timeline = forwardRef<HTMLOListElement, TimelineProps>(function Timeline(
  { items, defaultTone = 'default', hideConnector, emptyState, className, ...rest },
  ref
) {
  if (items.length === 0) {
    if (!emptyState) return null;
    return <>{emptyState}</>;
  }

  return (
    <ol ref={ref} data-slot="timeline" className={cn('relative space-y-4', className)} {...rest}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const tone = item.tone ?? defaultTone;
        return (
          <li key={item.id} data-slot="timeline-item" className="relative flex gap-3 pl-0.5 last:pb-0">
            <div className="relative flex flex-col items-center">
              {item.icon ? (
                <span
                  data-slot="timeline-icon"
                  className="relative z-10 flex size-5 shrink-0 items-center justify-center text-muted-foreground"
                >
                  {item.icon}
                </span>
              ) : (
                <span data-slot="timeline-dot" className={cn(dotVariants({ tone }))} />
              )}
              {!hideConnector && !isLast && (
                <span
                  aria-hidden="true"
                  data-slot="timeline-connector"
                  className="absolute top-2.5 bottom-[-1rem] w-px bg-border"
                />
              )}
            </div>
            <div className="flex min-w-0 flex-1 items-start justify-between gap-3 pb-1">
              <div className="min-w-0 flex-1 space-y-0.5">
                <div className="text-sm leading-snug">{item.title}</div>
                {item.subtitle && <div className="text-xs text-muted-foreground">{item.subtitle}</div>}
              </div>
              {item.meta && <div className="shrink-0 text-xs text-muted-foreground">{item.meta}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
});
Timeline.displayName = 'Timeline';

export { Timeline };
