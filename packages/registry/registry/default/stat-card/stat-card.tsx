import { type ComponentType, type ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { Badge } from '@/components/ui/badge';

type DeltaTone = 'up' | 'down' | 'flat';

const DELTA_VARIANT: Record<DeltaTone, 'success' | 'destructive' | 'muted'> = {
  up: 'success',
  down: 'destructive',
  flat: 'muted',
};

const DELTA_ICON: Record<DeltaTone, ComponentType<{ className?: string }>> = {
  up: TrendingUp,
  down: TrendingDown,
  flat: Minus,
};

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

  return (
    <Card data-slot="stat-card" className={cn('relative overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between px-4 pt-3 pb-1">
        <CardTitle className="text-xs font-medium text-muted-foreground">{label}</CardTitle>
        {Icon && <Icon className="size-3.5 text-muted-foreground" />}
      </CardHeader>
      <CardContent className="space-y-0.5 px-4 pb-3">
        <div className="text-xl font-semibold tracking-tight">
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
      </CardContent>
    </Card>
  );
}

export { StatCard };
