import { forwardRef, useCallback, useEffect, useState, type HTMLAttributes } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';

export interface TruncatedLabelProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** The full text to display. */
  text: string;
  /** Number of lines before truncation. 1 = single-line ellipsis, >1 = multi-line clamp. Default 1. */
  lines?: number;
  /** Side of the tooltip popup. Default 'top'. */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Alignment of the tooltip popup. Default 'center'. */
  align?: 'start' | 'center' | 'end';
  /** Tooltip open delay in ms. Default 200. */
  delayDuration?: number;
  /** Force-disable the tooltip even when truncated. Default false. */
  disableTooltip?: boolean;
}

const TruncatedLabel = forwardRef<HTMLSpanElement, TruncatedLabelProps>(
  (
    {
      className,
      text,
      lines = 1,
      side = 'top',
      align = 'center',
      delayDuration = 200,
      disableTooltip = false,
      style,
      ...props
    },
    ref
  ) => {
    const [node, setNode] = useState<HTMLSpanElement | null>(null);
    const [isTruncated, setIsTruncated] = useState(false);
    const isSingleLine = lines <= 1;
    const tooltipEnabled = isTruncated && !disableTooltip;

    const setRefs = useCallback(
      (n: HTMLSpanElement | null) => {
        setNode(n);
        if (typeof ref === 'function') {
          ref(n);
        } else if (ref) {
          ref.current = n;
        }
      },
      [ref]
    );

    useEffect(() => {
      if (!node) return;

      const check = () => {
        setIsTruncated(isSingleLine ? node.scrollWidth > node.clientWidth : node.scrollHeight > node.clientHeight);
      };

      check();

      const observer = new ResizeObserver(check);
      observer.observe(node);
      return () => observer.disconnect();
    }, [node, text, isSingleLine]);

    const span = (
      <span
        {...props}
        ref={setRefs}
        tabIndex={props.tabIndex ?? (tooltipEnabled ? 0 : undefined)}
        className={cn(isSingleLine ? 'block truncate' : 'block overflow-hidden', className)}
        style={
          isSingleLine
            ? style
            : {
                ...style,
                display: '-webkit-box',
                WebkitLineClamp: lines,
                WebkitBoxOrient: 'vertical' as const,
              }
        }
      >
        {text}
      </span>
    );

    if (disableTooltip || !isTruncated) {
      return span;
    }

    return (
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild>{span}</TooltipTrigger>
        <TooltipContent side={side} align={align} className="max-w-xs break-words">
          {text}
        </TooltipContent>
      </Tooltip>
    );
  }
);
TruncatedLabel.displayName = 'TruncatedLabel';

export { TruncatedLabel };
