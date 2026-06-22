import { type ElementType, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 max-w-full truncate',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-input-bg text-secondary-foreground hover:bg-input-bg/80',
        destructive: 'border-transparent bg-destructive-aa text-destructive-foreground hover:bg-destructive-aa/90',
        outline: 'text-foreground',
        success: 'border-transparent bg-success/15 text-success-soft-fg dark:bg-success/30',
        warning: 'border-transparent bg-warning/15 text-warning-soft-fg dark:bg-warning/30',
        info: 'border-transparent bg-info/15 text-info-soft-fg dark:bg-info/30',
        muted: 'border-transparent bg-muted text-muted-foreground dark:bg-stone-600/60 dark:text-stone-200',
        // Colored outlines: transparent fill, tone-tinted border + text. Border color
        // equals the text token, so border contrast == text contrast (>= 4.5:1, above
        // the 3:1 non-text minimum) in both themes. Tone meaning is carried by both.
        'outline-primary': 'border-primary text-primary',
        'outline-secondary': 'border-secondary-foreground text-secondary-foreground',
        'outline-muted': 'border-muted-foreground text-muted-foreground',
        'outline-success': 'border-success-soft-fg text-success-soft-fg',
        'outline-warning': 'border-warning-soft-fg text-warning-soft-fg',
        'outline-info': 'border-info-soft-fg text-info-soft-fg',
        'outline-destructive': 'border-destructive-soft-fg text-destructive-soft-fg',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs [&_svg]:size-3.5',
        xs: 'h-5 px-1.5 text-[11px] leading-none [&_svg]:size-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const dotVariants = cva('size-1.5 shrink-0 rounded-full', {
  variants: {
    variant: {
      default: 'bg-primary-foreground/80',
      secondary: 'bg-secondary-foreground/60',
      destructive: 'bg-destructive-foreground/80',
      outline: 'bg-foreground/40',
      success: 'bg-success',
      warning: 'bg-warning',
      info: 'bg-info',
      muted: 'bg-muted-foreground/60',
      'outline-primary': 'bg-primary',
      'outline-secondary': 'bg-secondary-foreground/60',
      'outline-muted': 'bg-muted-foreground/60',
      'outline-success': 'bg-success',
      'outline-warning': 'bg-warning',
      'outline-info': 'bg-info',
      'outline-destructive': 'bg-destructive-aa',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface BadgeProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  /** Override the tooltip text. Defaults to the children text content. */
  tooltipText?: string;
  /** Show a leading status dot tinted to match the variant. */
  dot?: boolean;
  /** Leading icon (any Lucide icon or component). Sized to match the badge. */
  icon?: ElementType;
}

function Badge({ className, variant, size, children, tooltipText, dot, icon: Icon, ...props }: BadgeProps) {
  const label = tooltipText ?? (typeof children === 'string' ? children : undefined);

  const badge = (
    <div data-slot="badge" className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && <span aria-hidden className={cn(dotVariants({ variant }))} />}
      {Icon && <Icon aria-hidden className="shrink-0" />}
      {children}
    </div>
  );

  if (!label) return badge;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{badge}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export { Badge, badgeVariants };
