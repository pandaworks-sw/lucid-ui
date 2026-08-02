import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useIsCompactDesktop } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import type { AppShellProps, NavItem, NavLinkItem, SidebarPanel, UserAction } from '@/components/ui/app-shell-types';

function DefaultLink({
  href,
  children,
  ...props
}: {
  href: string;
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}

function useMobileAutoClose() {
  const { isMobile, setOpenMobile } = useSidebar();
  return (event: MouseEvent<HTMLAnchorElement>) => {
    if (isMobile && !event.defaultPrevented) {
      setOpenMobile(false);
    }
  };
}

function NavItemFlat({
  item,
  linkComponent: Link = DefaultLink,
}: {
  item: NavLinkItem;
  linkComponent?: AppShellProps['linkComponent'];
}) {
  const handleClick = useMobileAutoClose();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={item.active} tooltip={item.label}>
        <Link href={item.href} onClick={handleClick}>
          {item.icon && <item.icon />}
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function NavItemCollapsible({
  item,
  linkComponent: Link = DefaultLink,
}: {
  item: NavLinkItem;
  linkComponent?: AppShellProps['linkComponent'];
}) {
  const hasActiveChild = item.items?.some((sub: NavItem) => sub.type !== 'separator' && sub.active);
  const handleClick = useMobileAutoClose();

  return (
    <Collapsible asChild defaultOpen={item.active || hasActiveChild} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton isActive={item.active} tooltip={item.label}>
            {item.icon && <item.icon />}
            <span>{item.label}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((sub: NavItem, index: number) =>
              sub.type === 'separator' ? (
                <SidebarSeparator key={`sep-${index}`} className="my-1" />
              ) : (
                <SidebarMenuSubItem key={sub.href}>
                  <SidebarMenuSubButton asChild isActive={sub.active}>
                    <Link href={sub.href} onClick={handleClick}>
                      {sub.icon && <sub.icon />}
                      <span>{sub.label}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              )
            )}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

function isNavGroup(item: NavItem): boolean {
  return item.type !== 'separator' && Array.isArray(item.items) && item.items.length > 0;
}

type DrilldownLevel = { label: string | null; items: NavItem[] };

/** Indices of the groups to open so the first active item is on screen. `[]` = the active item lives at the root. */
function pathToActive(items: NavItem[]): number[] | null {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type === 'separator') continue;
    if (item.active) return [];
    if (isNavGroup(item)) {
      const deeper = pathToActive(item.items!);
      if (deeper) return [i, ...deeper];
    }
  }
  return null;
}

function buildDrilldownStack(rootItems: NavItem[], path: number[]): DrilldownLevel[] {
  const levels: DrilldownLevel[] = [{ label: null, items: rootItems }];
  let current = rootItems;
  for (const index of path) {
    const group = current[index] as NavLinkItem | undefined;
    // The path is held in state across navigation changes, so an index can go stale if
    // the tree shrinks (e.g. a section drops out on a permission change). Stop drilling
    // gracefully instead of indexing into nothing.
    if (!group?.items) break;
    levels.push({ label: group.label, items: group.items });
    current = group.items;
  }
  return levels;
}

function NavItemDrilldown({
  navigation,
  linkComponent: Link = DefaultLink,
}: {
  navigation: NavItem[];
  linkComponent?: AppShellProps['linkComponent'];
}) {
  const handleClick = useMobileAutoClose();
  const initialPath = useMemo(() => pathToActive(navigation) ?? [], [navigation]);
  // Keep only the drill PATH (indices of the opened groups) and the visible depth in
  // state — never the materialized items. The stack is rebuilt from the LIVE `navigation`
  // prop every render, so each item's `active` flag tracks the current route and the
  // highlight follows client-side navigation. We seed the path once from where the active
  // item lives and do not re-open on later navigation changes, so the user's drill
  // position is preserved.
  const [path, setPath] = useState<number[]>(initialPath);
  const [active, setActive] = useState(() => initialPath.length);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [height, setHeight] = useState<number>();

  const stack = useMemo(() => buildDrilldownStack(navigation, path), [navigation, path]);
  // The path outlives navigation changes, so the rebuilt stack can be shorter than the
  // depth the user had drilled to. Clamp the visible level to what the stack now has.
  const activeLevel = Math.min(active, stack.length - 1);

  // Drive the container height from the on-screen level so the panel resizes smoothly
  // between levels of different lengths, and re-measures when the sidebar width changes.
  useLayoutEffect(() => {
    const el = panelRefs.current[activeLevel];
    if (!el) return;
    const measure = () => setHeight(el.scrollHeight);
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [activeLevel, stack]);

  const push = (groupIndex: number) => {
    setPath((prev) => [...prev.slice(0, activeLevel), groupIndex]);
    setActive(activeLevel + 1);
  };
  const back = () => setActive((value) => Math.max(0, value - 1));

  return (
    <div
      className="relative shrink-0 overflow-hidden transition-[height] duration-200 ease-out"
      style={{ height }}
      data-slot="sidebar-drilldown"
    >
      {stack.map((level, levelIndex) => {
        const isActiveLevel = levelIndex === activeLevel;
        return (
          <div
            key={levelIndex}
            ref={(el) => {
              panelRefs.current[levelIndex] = el;
            }}
            aria-hidden={!isActiveLevel}
            inert={isActiveLevel ? undefined : true}
            className="absolute top-0 left-0 w-full transition-transform duration-200 ease-out"
            style={{ transform: `translateX(${(levelIndex - activeLevel) * 100}%)` }}
          >
            {level.label !== null && (
              <button
                type="button"
                onClick={back}
                className="mb-0.5 flex w-full items-center gap-2 overflow-hidden rounded-md px-2 py-1.5 text-left text-xs font-medium text-sidebar-foreground/70 outline-hidden ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2"
              >
                <ChevronLeft className="size-4 shrink-0" />
                <span className="truncate group-data-[collapsible=icon]:hidden">{level.label}</span>
              </button>
            )}
            <SidebarMenu>
              {level.items.map((item: NavItem, index: number) => {
                if (item.type === 'separator') {
                  return <SidebarSeparator key={`sep-${index}`} className="my-1" />;
                }
                if (isNavGroup(item)) {
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton isActive={item.active} tooltip={item.label} onClick={() => push(index)}>
                        {item.icon && <item.icon />}
                        <span>{item.label}</span>
                        <ChevronRight className="ml-auto" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={item.active} tooltip={item.label}>
                      <Link href={item.href} onClick={handleClick}>
                        {item.icon && <item.icon />}
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Slides the sidebar content between two panes — the nav (pane 0) and a
 * contextual panel (pane 1) — when `panel` is set. Reuses the drilldown
 * mechanic: an absolute two-pane `translateX` track whose container height is
 * driven by the on-screen pane (measured + `ResizeObserver`) so it animates
 * between panes of different heights. The off-screen pane carries `inert` +
 * `aria-hidden` so it stays out of the tab order and the accessibility tree.
 *
 * The track is `shrink-0` because `overflow-hidden` drops its automatic minimum
 * size to zero: inside the `SidebarContent` flex column it would otherwise be
 * squashed to the free space and silently clip its own tail, leaving the last
 * nav entries invisible AND unreachable (a squashed track never overflows the
 * scroll container, so no scrollbar appears).
 */
function SidebarPanelSwitcher({ panel, children }: { panel: SidebarPanel | null; children: ReactNode }) {
  const active = panel !== null;
  // Retain the last non-null panel so its content stays on screen while the
  // panel slides out after the consumer clears `sidebarPanel`.
  const [retained, setRetained] = useState<SidebarPanel | null>(panel);
  useEffect(() => {
    if (panel) setRetained(panel);
  }, [panel]);

  const navRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number>();

  // Drive the container height from whichever pane is on screen so it resizes
  // smoothly between nav and panel, and re-measures when the panel body or the
  // sidebar width changes.
  useLayoutEffect(() => {
    const el = active ? panelRef.current : navRef.current;
    if (!el) return;
    const measure = () => setHeight(el.scrollHeight);
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [active, retained]);

  const shown = panel ?? retained;

  return (
    <div
      className="relative shrink-0 overflow-hidden transition-[height] duration-200 ease-out"
      style={{ height }}
      data-slot="sidebar-panel-switcher"
    >
      <div
        ref={navRef}
        aria-hidden={active}
        inert={active ? true : undefined}
        className="absolute top-0 left-0 w-full transition-transform duration-200 ease-out"
        style={{ transform: `translateX(${active ? -100 : 0}%)` }}
      >
        {children}
      </div>
      <div
        ref={panelRef}
        role="group"
        aria-label={shown?.title}
        aria-hidden={!active}
        inert={!active ? true : undefined}
        className="absolute top-0 left-0 w-full transition-transform duration-200 ease-out"
        style={{ transform: `translateX(${active ? 0 : 100}%)` }}
        data-slot="sidebar-panel"
      >
        {shown && (
          <SidebarGroup>
            <button
              type="button"
              onClick={shown.onBack}
              className="mb-0.5 flex w-full items-center gap-2 overflow-hidden rounded-md px-2 py-1.5 text-left text-xs font-medium text-sidebar-foreground/70 outline-hidden ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2"
            >
              <ChevronLeft className="size-4 shrink-0" />
              <span className="truncate group-data-[collapsible=icon]:hidden">{shown.title}</span>
            </button>
            <div className="group-data-[collapsible=icon]:hidden">{shown.content}</div>
          </SidebarGroup>
        )}
      </div>
    </div>
  );
}

function BrandingLink({
  branding,
  linkComponent: Link = DefaultLink,
}: {
  branding: AppShellProps['branding'];
  linkComponent?: AppShellProps['linkComponent'];
}) {
  const handleClick = useMobileAutoClose();
  return (
    <SidebarMenuButton size="lg" asChild tooltip={branding.name}>
      <Link href={branding.href ?? '/'} onClick={handleClick}>
        {branding.logo ? (
          branding.logoWrapper === false ? (
            <img src={branding.logo} alt={branding.name} className="size-8" />
          ) : (
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <img src={branding.logo} alt={branding.name} className="size-4" />
            </div>
          )
        ) : (
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-sm font-semibold">
            {branding.name.charAt(0)}
          </div>
        )}
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{branding.name}</span>
          {branding.subtitle && <span className="truncate text-xs text-muted-foreground">{branding.subtitle}</span>}
        </div>
      </Link>
    </SidebarMenuButton>
  );
}

function UserMenu({
  user,
  linkComponent: Link = DefaultLink,
}: {
  user: NonNullable<AppShellProps['user']>;
  linkComponent?: AppShellProps['linkComponent'];
}) {
  const handleClick = useMobileAutoClose();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          tooltip={user.name}
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="size-8 rounded-lg">
            {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
            <AvatarFallback className="rounded-lg">{user.name}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.name}</span>
            {user.email && <span className="truncate text-xs">{user.email}</span>}
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="size-8 rounded-lg">
              {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
              <AvatarFallback className="rounded-lg">{user.name}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              {user.email && <span className="truncate text-xs">{user.email}</span>}
            </div>
          </div>
        </DropdownMenuLabel>
        {user.actions && user.actions.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {user.actions.map((action: UserAction) => (
                <DropdownMenuItem
                  key={action.label}
                  className={cn(action.variant === 'destructive' && 'text-destructive focus:text-destructive')}
                  onClick={action.onClick}
                  asChild={!!action.href}
                >
                  {action.href ? (
                    <Link href={action.href} onClick={handleClick}>
                      {action.icon && <action.icon />}
                      {action.label}
                    </Link>
                  ) : (
                    <>
                      {action.icon && <action.icon />}
                      {action.label}
                    </>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AppShell({
  branding,
  navigation,
  user,
  header,
  navbarActions,
  children,
  maxWidth = 1400,
  linkComponent: Link = DefaultLink,
  contentClassName,
  variant = 'inset',
  navMode = 'accordion',
  sidebarPanel,
  defaultSidebarOpen = true,
  onSidebarOpenChange,
}: AppShellProps) {
  const resolvedMaxWidth: CSSProperties | undefined =
    maxWidth === 'none' ? undefined : { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth };

  const isCompact = useIsCompactDesktop();
  const [open, setOpenInternal] = useState(defaultSidebarOpen);
  const initialMountRef = useRef(true);

  const setOpen = useCallback(
    (value: boolean) => {
      setOpenInternal(value);
      onSidebarOpenChange?.(value);
    },
    [onSidebarOpenChange]
  );

  useEffect(() => {
    if (initialMountRef.current) {
      initialMountRef.current = false;
      return;
    }
    setOpen(!isCompact);
  }, [isCompact, setOpen]);

  const navGroup = (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarGroupContent>
        {navMode === 'drilldown' ? (
          <NavItemDrilldown navigation={navigation} linkComponent={Link} />
        ) : (
          <SidebarMenu>
            {navigation.map((item: NavItem, index: number) =>
              item.type === 'separator' ? (
                <SidebarSeparator key={`sep-${index}`} className="my-1" />
              ) : item.items && item.items.length > 0 ? (
                <NavItemCollapsible key={item.href} item={item} linkComponent={Link} />
              ) : (
                <NavItemFlat key={item.href} item={item} linkComponent={Link} />
              )
            )}
          </SidebarMenu>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <Sidebar variant={variant} collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <BrandingLink branding={branding} linkComponent={Link} />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          {sidebarPanel === undefined ? (
            navGroup
          ) : (
            <SidebarPanelSwitcher panel={sidebarPanel ?? null}>{navGroup}</SidebarPanelSwitcher>
          )}
        </SidebarContent>

        {user && (
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <UserMenu user={user} linkComponent={Link} />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        )}

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/60 bg-background/70 backdrop-blur supports-backdrop-filter:bg-background/60 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full min-w-0 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 shrink-0" />
            {header && (
              <>
                <Separator orientation="vertical" className="mr-2 h-4 shrink-0" />
                <div className="flex min-w-0 flex-1 items-center">{header}</div>
              </>
            )}
            {navbarActions && <div className="ml-auto flex shrink-0 items-center gap-1">{navbarActions}</div>}
          </div>
        </header>
        <div className={cn('flex-1 overflow-y-auto overflow-x-hidden min-w-0', contentClassName ?? 'p-4')}>
          <div className="mx-auto" style={resolvedMaxWidth}>
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export { AppShell };
export type {
  AppShellProps,
  NavItem,
  NavLinkItem,
  NavSeparatorItem,
  SidebarPanel,
  UserAction,
} from '@/components/ui/app-shell-types';
