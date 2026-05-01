import { type HTMLAttributes, type ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center gap-3 text-center",
  {
    variants: {
      size: {
        sm: "py-8",
        md: "py-16",
        lg: "py-24",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

const iconWrapVariants = cva(
  "flex items-center justify-center rounded-full bg-muted text-muted-foreground",
  {
    variants: {
      size: {
        sm: "size-10 [&_svg]:size-4",
        md: "size-12 [&_svg]:size-5",
        lg: "size-14 [&_svg]:size-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export interface EmptyStateProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  icon?: ReactNode
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
}

function EmptyState({
  className,
  size,
  icon,
  title,
  description,
  action,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(emptyStateVariants({ size }), className)}
      {...props}
    >
      {icon && <div className={cn(iconWrapVariants({ size }))}>{icon}</div>}
      <p className="text-sm font-medium">{title}</p>
      {description && (
        <p className="max-w-sm text-xs text-muted-foreground">{description}</p>
      )}
      {action}
    </div>
  )
}

export { EmptyState, emptyStateVariants }
