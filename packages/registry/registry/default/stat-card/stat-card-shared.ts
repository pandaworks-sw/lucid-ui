import { type ComponentType } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export type DeltaTone = 'up' | 'down' | 'flat';

export const DELTA_VARIANT: Record<DeltaTone, 'success' | 'destructive' | 'muted'> = {
  up: 'success',
  down: 'destructive',
  flat: 'muted',
};

export const DELTA_ICON: Record<DeltaTone, ComponentType<{ className?: string }>> = {
  up: TrendingUp,
  down: TrendingDown,
  flat: Minus,
};

export function getHeadlineSizeClass(length: number): string {
  if (length <= 10) return 'text-xl';
  if (length <= 16) return 'text-lg';
  if (length <= 24) return 'text-base';
  return 'text-sm';
}

export function getRenderedLength(
  value: number | string,
  prefix: string | undefined,
  suffix: string | undefined,
  decimals: number | undefined,
  formatter: ((value: number) => string) | undefined
): number {
  if (typeof value === 'string') return value.length;
  if (formatter) return formatter(value).length;
  const sign = value < 0 ? 1 : 0;
  const integerDigits = String(Math.trunc(Math.abs(value))).length;
  const fractional = decimals && decimals > 0 ? decimals + 1 : 0;
  return (prefix?.length ?? 0) + sign + integerDigits + fractional + (suffix?.length ?? 0);
}
