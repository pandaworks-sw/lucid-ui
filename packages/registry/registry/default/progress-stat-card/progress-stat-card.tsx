import { type ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export type ProgressStatTone = 'default' | 'success' | 'destructive' | 'warning' | 'info' | 'muted';

const TONE_VALUE_CLASS: Record<ProgressStatTone, string> = {
  default: 'text-foreground',
  success: 'text-success',
  destructive: 'text-destructive',
  warning: 'text-warning',
  info: 'text-info',
  muted: 'text-muted-foreground',
};

export interface ProgressStatCardItem {
  /** Caption shown below the value. */
  label: ReactNode;
  /** Stat value — typically a count or short string. */
  value: number | string;
  /** Optional tone applied to the value. Defaults to `"default"` (foreground). */
  tone?: ProgressStatTone;
}

export interface ProgressStatCardProps {
  /** Heading shown at the top-left of the card. */
  title: ReactNode;
  /** Bold trailing headline value (top-right) — e.g. `"28.6%"`. */
  value?: ReactNode;
  /** Muted trailing hint (top-right) — e.g. `"5 of 10"`. Used INSTEAD of `value` when the headline is a ratio rather than a single number. */
  valueHint?: ReactNode;
  /** Progress percentage, 0–100. */
  progress: number;
  /** Stat cells rendered below the progress bar. Renders as a 2-column grid on mobile and an evenly-spaced row on `sm:` and above. */
  items: ProgressStatCardItem[];
  className?: string;
}

function ProgressStatCard({ title, value, valueHint, progress, items, className }: ProgressStatCardProps) {
  return (
    <Card data-slot="progress-stat-card" className={cn('p-5', className)}>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {value !== undefined ? (
          <span className="text-2xl font-bold tabular-nums text-foreground">{value}</span>
        ) : valueHint !== undefined ? (
          <span className="text-sm text-muted-foreground">{valueHint}</span>
        ) : null}
      </div>
      <Progress value={progress} className="mb-4" />
      <dl className="grid grid-cols-2 gap-3 text-sm sm:auto-cols-fr sm:grid-flow-col sm:grid-cols-none">
        {items.map((item, index) => (
          <ProgressStatCardCell
            // biome-ignore lint/suspicious/noArrayIndexKey: cells are positional and stable within a single render
            key={index}
            {...item}
          />
        ))}
      </dl>
    </Card>
  );
}

function ProgressStatCardCell({ label, value, tone = 'default' }: ProgressStatCardItem) {
  return (
    <div>
      <dd className={cn('text-xl font-semibold tabular-nums', TONE_VALUE_CLASS[tone])}>{value}</dd>
      <dt className="text-xs text-muted-foreground">{label}</dt>
    </div>
  );
}

export { ProgressStatCard };
