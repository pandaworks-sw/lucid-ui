import {
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const listRowVariants = cva(
  "flex w-full items-center gap-3 text-left transition-colors",
  {
    variants: {
      density: {
        sm: "py-2",
        default: "py-3",
        lg: "py-4",
      },
      surface: {
        plain: "",
        bordered: "rounded-lg border bg-card px-3",
        muted: "rounded-lg bg-muted/40 px-3",
      },
      interactive: {
        true: "cursor-pointer hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        false: "",
      },
    },
    defaultVariants: {
      density: "default",
      surface: "plain",
      interactive: false,
    },
  },
)

interface SharedListRowProps extends VariantProps<typeof listRowVariants> {
  /** Leading visual (avatar, icon, etc.). */
  leading?: ReactNode
  /** Primary line. Required. */
  title: ReactNode
  /** Secondary line (subdued). */
  subtitle?: ReactNode
  /** Trailing slot — meta text, badges, action button, etc. */
  trailing?: ReactNode
  /** className passthrough */
  className?: string
}

type DivProps = SharedListRowProps & Omit<HTMLAttributes<HTMLDivElement>, keyof SharedListRowProps>
type ButtonProps = SharedListRowProps & {
  asButton: true
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedListRowProps>

export type ListRowProps = (DivProps & { asButton?: false }) | ButtonProps

const ListRow = forwardRef<HTMLDivElement | HTMLButtonElement, ListRowProps>(
  function ListRow(
    { leading, title, subtitle, trailing, density, surface, interactive, className, ...rest },
    ref,
  ) {
    const isButton = (rest as ButtonProps).asButton === true
    const inferredInteractive =
      interactive ?? (isButton || typeof (rest as DivProps).onClick === "function")

    const body = (
      <>
        {leading && <span className="shrink-0">{leading}</span>}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium">{title}</span>
          {subtitle && (
            <span className="block truncate text-xs text-muted-foreground">{subtitle}</span>
          )}
        </span>
        {trailing && <span className="shrink-0">{trailing}</span>}
      </>
    )

    if (isButton) {
      const { asButton: _omit, ...buttonRest } = rest as ButtonProps
      void _omit
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          data-slot="list-row"
          className={cn(
            listRowVariants({
              density,
              surface,
              interactive: inferredInteractive ? true : false,
            }),
            className,
          )}
          {...buttonRest}
        >
          {body}
        </button>
      )
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        data-slot="list-row"
        className={cn(
          listRowVariants({
            density,
            surface,
            interactive: inferredInteractive ? true : false,
          }),
          className,
        )}
        {...(rest as DivProps)}
      >
        {body}
      </div>
    )
  },
)
ListRow.displayName = "ListRow"

export { ListRow }
