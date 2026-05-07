import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const iconBadgeVariants = cva('inline-flex items-center justify-center shrink-0 transition-colors', {
  variants: {
    tone: {
      default: 'bg-muted text-muted-foreground',
      info: 'bg-info/10 text-info',
      success: 'bg-success/10 text-success',
      warning: 'bg-warning/15 text-warning',
      destructive: 'bg-destructive/10 text-destructive',
      muted: 'bg-muted text-muted-foreground',
      primary: 'bg-primary/10 text-primary',
    },
    size: {
      sm: 'size-8',
      md: 'size-12',
      lg: 'size-16',
    },
    shape: {
      rounded: 'rounded-xl',
      circle: 'rounded-full',
      square: 'rounded-md',
    },
  },
  defaultVariants: {
    tone: 'default',
    size: 'md',
    shape: 'rounded',
  },
});

const iconSizeClass = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
} as const;

export interface IconBadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof iconBadgeVariants> {
  /** Icon node to render — typically a Lucide icon component element. */
  children: ReactNode;
}

/**
 * Decorative icon container with semantic-tone background + icon color.
 * Use for hero-page icons (auth pages, setup wizard, empty states, status flags)
 * — not for clickable controls. For an interactive element use `Button` instead.
 */
const IconBadge = forwardRef<HTMLSpanElement, IconBadgeProps>(function IconBadge(
  { tone, size = 'md', shape, className, children, ...rest },
  ref
) {
  return (
    <span
      ref={ref}
      data-slot="icon-badge"
      className={cn(iconBadgeVariants({ tone, size, shape }), className)}
      {...rest}
    >
      <span aria-hidden="true" className={cn('flex items-center justify-center', iconSizeClass[size ?? 'md'])}>
        {children}
      </span>
    </span>
  );
});
IconBadge.displayName = 'IconBadge';

export { IconBadge };
