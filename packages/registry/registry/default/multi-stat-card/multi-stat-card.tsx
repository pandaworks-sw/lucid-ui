import { type ComponentType, type ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { Badge } from '@/components/ui/badge';
import {
  type DeltaTone,
  DELTA_ICON,
  DELTA_VARIANT,
  getHeadlineSizeClass,
  getRenderedLength,
} from '../stat-card/stat-card-shared';

export interface MultiStatCardItem {
  /** Optional leading icon shown next to the cell label. */
  icon?: ComponentType<{ className?: string }>;
  /** Short caption above the value. */
  label: ReactNode;
  /** Value to display. Numbers animate via `AnimatedNumber`; strings render as-is. */
  value: number | string;
  /** Text prepended to the value (e.g. "$", "RM"). Numeric values only. */
  prefix?: string;
  /** Suffix appended to the value (e.g. "%"). Numeric values only. */
  suffix?: string;
  /** Number of decimal places. Numeric values only; ignored when `formatter` is provided. */
  decimals?: number;
  /** Custom number formatter. Numeric values only; overrides decimals/prefix/suffix. */
  formatter?: (value: number) => string;
  /** Hint shown below the value. */
  hint?: ReactNode;
  /** Trend chip text (e.g. "+12%"). */
  delta?: string;
  /** Trend tone — controls icon and color. Defaults to "up". */
  deltaTone?: DeltaTone;
}

export interface MultiStatCardProps {
  /** Two or more cells rendered inside one shared card surface. */
  items: MultiStatCardItem[];
  /** Layout direction. `horizontal` uses vertical dividers; `vertical` uses horizontal dividers. Defaults to `horizontal`. */
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

function MultiStatCard({ items, orientation = 'horizontal', className }: MultiStatCardProps) {
  return (
    <Card data-slot="multi-stat-card" className={cn('relative overflow-hidden', className)}>
      <div className={cn(orientation === 'horizontal' ? 'flex divide-x' : 'flex flex-col divide-y')}>
        {items.map((item, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: cells are positional and stable within a single render
          <MultiStatCardCell key={index} {...item} />
        ))}
      </div>
    </Card>
  );
}

function MultiStatCardCell({
  icon: Icon,
  label,
  value,
  prefix,
  suffix,
  decimals,
  formatter,
  hint,
  delta,
  deltaTone = 'up',
}: MultiStatCardItem) {
  const DeltaIcon = DELTA_ICON[deltaTone];

  return (
    <div className="min-w-0 flex-1 space-y-0.5 px-4 py-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        {Icon && <Icon className="size-3.5 text-muted-foreground" />}
      </div>
      <div
        className={cn(
          'min-w-0 font-semibold tracking-tight',
          getHeadlineSizeClass(getRenderedLength(value, prefix, suffix, decimals, formatter))
        )}
      >
        {typeof value === 'string' ? (
          value
        ) : formatter ? (
          <AnimatedNumber value={value} prefix={prefix} decimals={decimals} formatter={formatter} />
        ) : (
          <>
            {prefix && <span className="text-sm font-medium text-muted-foreground">{prefix}</span>}
            <AnimatedNumber value={value} decimals={decimals} />
            {suffix && <span className="text-sm font-medium text-muted-foreground">{suffix}</span>}
          </>
        )}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {hint && <span>{hint}</span>}
        {delta && (
          <Badge variant={DELTA_VARIANT[deltaTone]}>
            <DeltaIcon className="size-3" />
            {delta}
          </Badge>
        )}
      </div>
    </div>
  );
}

export { MultiStatCard };
