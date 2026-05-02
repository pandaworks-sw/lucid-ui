import { type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const trackVariants = cva('h-1.5 w-full overflow-hidden rounded-full bg-muted', {
  variants: {
    size: {
      sm: 'h-1',
      default: 'h-1.5',
      lg: 'h-2',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const fillVariants = cva('h-full rounded-full transition-[width] duration-300 ease-out', {
  variants: {
    tone: {
      default: 'bg-primary',
      success: 'bg-success',
      warning: 'bg-warning',
      info: 'bg-info',
      destructive: 'bg-destructive',
      muted: 'bg-muted-foreground/40',
    },
  },
  defaultVariants: {
    tone: 'default',
  },
});

export interface MeterRowProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'value'>,
    VariantProps<typeof trackVariants>,
    VariantProps<typeof fillVariants> {
  /**
   * Leading label (string or any node — typically a Badge for status/priority charts).
   * Optional: when omitted (and `valueLabel` is also omitted) the label row is not
   * rendered at all, leaving a bare progress bar useful for compact list rows or
   * inline tone-aware bars where the label is shown separately.
   */
  label?: ReactNode;
  /** Numeric value to render as the bar fill. */
  value: number;
  /** Maximum value used to compute the fill width. Defaults to 100. */
  max?: number;
  /**
   * Trailing value rendered next to the label. Pass a ReactNode for custom
   * formatting (e.g. currency); omit to hide.
   */
  valueLabel?: ReactNode;
}

function clampPct(value: number, max: number) {
  if (max <= 0) return 0;
  return Math.max(0, Math.min(100, (value / max) * 100));
}

function MeterRow({ className, label, value, max = 100, valueLabel, size, tone, ...props }: MeterRowProps) {
  const pct = clampPct(value, max);
  const showLabelRow = label != null || valueLabel !== undefined;

  return (
    <div data-slot="meter-row" className={cn(showLabelRow && 'space-y-1', className)} {...props}>
      {showLabelRow && (
        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="min-w-0 truncate">{label}</span>
          {valueLabel !== undefined && <span className="tabular-nums text-muted-foreground">{valueLabel}</span>}
        </div>
      )}
      <div className={cn(trackVariants({ size }))}>
        <div
          className={cn(fillVariants({ tone }))}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

export { MeterRow };
