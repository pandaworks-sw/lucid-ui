import { type ComponentType, type ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { Badge } from '@/components/ui/badge';
import { type DeltaTone, DELTA_ICON, DELTA_VARIANT, getHeadlineSizeClass, getRenderedLength } from './stat-card-shared';

export interface StatCardProps {
  /** Optional leading icon shown next to the label. */
  icon?: ComponentType<{ className?: string }>;
  /** Short caption above the value. */
  label: ReactNode;
  /** Value to display. Numbers animate via `AnimatedNumber`; strings render as-is (assumed already-formatted, e.g. `"N/A"`, `"8/10"`, `"Active"`). */
  value: number | string;
  /** Text prepended to the value (e.g. "$", "RM"). Numeric values only. */
  prefix?: string;
  /** Suffix appended to the value (e.g. "%"). Numeric values only. */
  suffix?: string;
  /** Number of decimal places. Numeric values only; ignored when `formatter` is provided. */
  decimals?: number;
  /** Custom number formatter (e.g. `(n) => n.toLocaleString()`). Numeric values only; overrides decimals/prefix/suffix. */
  formatter?: (value: number) => string;
  /** Hint shown below the value. */
  hint?: ReactNode;
  /** Trend chip text (e.g. "+12%"). */
  delta?: string;
  /** Trend tone — controls icon and color. Defaults to "up". */
  deltaTone?: DeltaTone;
  className?: string;
}

function StatCard({
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
  className,
}: StatCardProps) {
  const DeltaIcon = DELTA_ICON[deltaTone];
  const headlineLength = getRenderedLength(value, prefix, suffix, decimals, formatter);

  return (
    <Card data-slot="stat-card" className={cn('relative overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between gap-3 px-5 pt-4 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        {Icon && <Icon className="size-4 shrink-0 text-muted-foreground" />}
      </CardHeader>
      <CardContent className="flex flex-col gap-2 px-5 pb-4">
        <div
          className={cn(
            'min-w-0 break-words font-semibold tracking-tight tabular-nums',
            headlineLength <= 10 ? 'text-3xl' : getHeadlineSizeClass(headlineLength)
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
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          {hint && <span>{hint}</span>}
          {delta && (
            <Badge variant={DELTA_VARIANT[deltaTone]}>
              <DeltaIcon className="size-3" />
              {delta}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export { StatCard };
