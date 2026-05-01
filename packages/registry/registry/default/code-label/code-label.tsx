import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type MouseEvent,
  type TouchEvent,
} from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Copy, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

const codeLabelVariants = cva(
  "inline-flex items-center rounded-md font-mono bg-muted/40 text-foreground dark:bg-muted/25",
  {
    variants: {
      size: {
        default: "px-3 py-1.5 text-sm",
        sm: "px-2 py-1 text-xs",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface CodeLabelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof codeLabelVariants> {
  value: string
  /**
   * Whether the copy-to-clipboard button is rendered. Defaults to `true`.
   * Pass `false` for a static inline code chip with no interactive affordance.
   */
  copyable?: boolean
}

const CodeLabel = forwardRef<HTMLDivElement, CodeLabelProps>(
  ({ className, size, value, copyable = true, onTouchStart, onTouchEnd, onTouchCancel, ...props }, ref) => {
    const { copied, copy } = useCopyToClipboard()
    const [touchRevealed, setTouchRevealed] = useState(false)
    const hideTimeoutRef = useRef<number | null>(null)

    const clearHideTimeout = () => {
      if (hideTimeoutRef.current !== null) {
        window.clearTimeout(hideTimeoutRef.current)
        hideTimeoutRef.current = null
      }
    }

    useEffect(() => clearHideTimeout, [])

    const handleCopy = async (e: MouseEvent) => {
      e.stopPropagation()
      await copy(value)
    }

    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
      clearHideTimeout()
      setTouchRevealed(true)
      onTouchStart?.(e)
    }

    const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
      clearHideTimeout()
      hideTimeoutRef.current = window.setTimeout(() => {
        setTouchRevealed(false)
        hideTimeoutRef.current = null
      }, 1200)
      onTouchEnd?.(e)
    }

    const handleTouchCancel = (e: TouchEvent<HTMLDivElement>) => {
      clearHideTimeout()
      setTouchRevealed(false)
      onTouchCancel?.(e)
    }

    return (
      <div
        data-slot="code-label"
        ref={ref}
        className={cn(codeLabelVariants({ size }), "group", className)}
        onTouchStart={copyable ? handleTouchStart : onTouchStart}
        onTouchEnd={copyable ? handleTouchEnd : onTouchEnd}
        onTouchCancel={copyable ? handleTouchCancel : onTouchCancel}
        {...props}
      >
        <span className="min-w-0 truncate">{value}</span>
        {copyable && (
          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              "inline-flex max-w-0 shrink-0 items-center justify-center overflow-hidden rounded text-muted-foreground transition-all duration-200 hover:text-foreground",
              "ml-0 opacity-0 group-hover:ml-1 group-focus-within:ml-1 group-active:ml-1 group-hover:max-w-4 group-focus-within:max-w-4 group-active:max-w-4 group-hover:opacity-100 group-focus-within:opacity-100 group-active:opacity-100",
              touchRevealed && "ml-1 max-w-4 opacity-100",
              copied && "ml-1 max-w-4 opacity-100"
            )}
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <Check className="size-3.5" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
        )}
      </div>
    )
  }
)
CodeLabel.displayName = "CodeLabel"

export { CodeLabel, codeLabelVariants }
