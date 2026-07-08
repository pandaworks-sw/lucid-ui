import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentProps,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

function Tabs({ className, orientation = 'horizontal', ...props }: ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn('group/tabs flex gap-2 data-[orientation=horizontal]:flex-col', className)}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  'relative rounded-lg p-[3px] group-data-[orientation=horizontal]/tabs:h-9 data-[variant=line]:rounded-none group/tabs-list text-muted-foreground inline-flex w-fit items-center justify-center group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col',
  {
    variants: {
      variant: {
        // Inset track (input-bg) so the bar stands out from the page AND from a card in dark mode; the neutral sliding pill marks the active tab.
        default: 'border border-border bg-input-bg',
        line: 'gap-1 bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function TabsList({
  className,
  variant = 'default',
  children,
  ...props
}: ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
  const listRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  // Slide the neutral pill to `el`. Measured with getBoundingClientRect relative to the list (minus its
  // border via clientLeft/clientTop) so the bordered track's border width doesn't offset the pill.
  const setOwner = useCallback((el: HTMLElement | null) => {
    const list = listRef.current;
    if (!list || !el) return;
    const lr = list.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    const next = {
      x: er.left - lr.left - list.clientLeft,
      y: er.top - lr.top - list.clientTop,
      width: er.width,
      height: er.height,
    };
    // Skip the state update when geometry is unchanged so observers can't loop.
    setPill((prev) =>
      prev && prev.x === next.x && prev.y === next.y && prev.width === next.width && prev.height === next.height
        ? prev
        : next
    );
  }, []);

  const ownerToActive = useCallback(() => {
    const el = listRef.current?.querySelector<HTMLElement>('[data-slot="tabs-trigger"][data-state="active"]');
    setOwner(el ?? null);
  }, [setOwner]);

  // Place the pill on the active tab before first paint (initial={false} skips the entry animation).
  useLayoutEffect(() => {
    if (variant === 'default') ownerToActive();
  }, [variant, ownerToActive]);

  // Re-place when the active tab changes (Radix flips data-state) or the list resizes.
  useEffect(() => {
    const list = listRef.current;
    if (!list || variant !== 'default') return;
    const mo = new MutationObserver(() => ownerToActive());
    mo.observe(list, { attributes: true, subtree: true, attributeFilter: ['data-state'] });
    const ro = new ResizeObserver(() => ownerToActive());
    ro.observe(list);
    return () => {
      mo.disconnect();
      ro.disconnect();
    };
  }, [variant, ownerToActive]);

  const handlePointerOver = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (variant !== 'default') return;
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-slot="tabs-trigger"]');
    if (el && listRef.current?.contains(el)) setOwner(el);
  };
  const handlePointerLeave = () => {
    if (variant === 'default') ownerToActive();
  };

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      onPointerOver={handlePointerOver}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      {variant === 'default' && pill && (
        <motion.div
          aria-hidden
          data-slot="tabs-pill"
          // Raised-card pill: `bg-card` (light #fff / dark stone-700) sits one surface
          // step off the `bg-input-bg` track in BOTH themes, with a `ring-border` edge for
          // SC 1.4.11 non-text contrast. `bg-accent` was invisible in light (accent ==
          // background == stone-150, only one step off the stone-100 track).
          className="pointer-events-none absolute left-0 top-0 z-0 rounded-md bg-card shadow-sm ring-1 ring-border"
          initial={false}
          animate={{ x: pill.x, y: pill.y, width: pill.width, height: pill.height }}
          transition={{ type: 'spring', stiffness: 450, damping: 34 }}
        />
      )}
      {children}
    </TabsPrimitive.List>
  );
}

function TabsTrigger({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative z-10 inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:outline-1',
        // Inactive label color (both variants); foreground on hover and when active.
        'text-muted-foreground hover:text-foreground data-[state=active]:text-foreground',
        // Line variant: neutral underline indicator.
        'after:bg-foreground after:absolute after:rounded-full after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-[3px] group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-[3px] group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100',
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn('flex-1 outline-none', className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
