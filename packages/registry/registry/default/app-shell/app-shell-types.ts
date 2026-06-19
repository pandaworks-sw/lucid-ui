import type { ComponentType, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface AppShellProps {
  branding: {
    name: string;
    logo?: string;
    href?: string;
    /** Whether to show the default wrapper box around the logo. Set to false if your logo already has its own background/container. Default: true */
    logoWrapper?: boolean;
    /** Small muted line shown under the brand name (e.g. version string, environment label). Hidden when the sidebar collapses to icon mode. */
    subtitle?: string;
  };
  navigation: NavItem[];
  /**
   * How nested navigation groups (a `NavItem` that carries `items`) are presented.
   * - `"accordion"` (default): clicking a parent expands its children in place, below it.
   * - `"drilldown"`: clicking a parent slides the whole nav panel to a new "page" that
   *   shows only that group's children, with a back row to slide back. Good for deep
   *   menu trees where an in-place accordion would get long. On mount the panel opens
   *   straight to the level that holds the active item.
   */
  navMode?: 'accordion' | 'drilldown';
  /**
   * Contextual sidebar panel. When set, the sidebar slides from the nav list to
   * this panel (e.g. a filter form) with an animated back row, and slides back
   * to the nav when you clear it.
   *
   * This is a *controlled* slot — you drive it from your own route/state. The
   * typical flow: a nav click sets both the route and `sidebarPanel`; your
   * `children` read the same state so the main content reacts (re-query,
   * re-filter). Clearing `sidebarPanel` (commonly inside `onBack`) slides the
   * sidebar back to the nav. AppShell owns only the swap + animation; it does
   * not animate the main content (that belongs to your routing layer).
   *
   * Designed for the expanded sidebar. In icon-collapsed mode the panel body is
   * hidden and only the back affordance remains, so keep the sidebar open while
   * a panel is active (e.g. via `defaultSidebarOpen`). `undefined`/`null`
   * renders the nav exactly as before — fully backward compatible.
   */
  sidebarPanel?: SidebarPanel | null;
  user?: {
    name: string;
    email?: string;
    avatar?: string;
    actions?: UserAction[];
  };
  header?: ReactNode;
  navbarActions?: ReactNode;
  children: ReactNode;
  /** Max-width for the content area. Number = pixels, string = CSS value. "none" to disable. Default: 1400 */
  maxWidth?: number | string;
  /** Custom link component to replace all <a> tags (e.g. TanStack Router's Link or Next.js Link). Default: "a" */
  linkComponent?: ComponentType<{
    href: string;
    children: ReactNode;
    className?: string;
    [key: string]: any;
  }>;
  /** Override the default content area padding classes. Replaces default "p-4". */
  contentClassName?: string;
  /**
   * Framing for the main content area.
   * - `"inset"` (default): the content floats in a rounded, bordered card with a margin around it.
   * - `"sidebar"`: the content is flush to the edges — full-width / full-height, no card frame.
   */
  variant?: 'inset' | 'sidebar';
  /**
   * Initial sidebar open state on mount. Default: `true`. Pass a value from
   * `localStorage` (or any other store) to restore the user's last preference.
   * On compact-desktop widths (768–1023px) the sidebar still auto-collapses on
   * screen-size transitions, but the initial mount honours this value so a
   * stored `false` is not overridden when the screen is already wide.
   */
  defaultSidebarOpen?: boolean;
  /**
   * Fires every time the sidebar open state changes — manual toggle, keyboard
   * shortcut (Cmd/Ctrl-B), or compact-desktop auto-collapse on resize. Use it
   * to persist the value (e.g. `localStorage.setItem('sidebar:open', String(open))`).
   */
  onSidebarOpenChange?: (open: boolean) => void;
}

export interface SidebarPanel {
  /** Title shown in the back row at the top of the panel. */
  title: string;
  /**
   * Panel body — arbitrary content (filter form, detail view, etc.). It renders
   * in the same gutter as the nav items. Hidden when the sidebar collapses to
   * icon mode.
   */
  content: ReactNode;
  /**
   * Fires when the user clicks the back row. Use it to clear `sidebarPanel`
   * (set it back to `null`) so the sidebar slides back to the nav.
   */
  onBack?: () => void;
}

export type NavItem = NavLinkItem | NavSeparatorItem;

export interface NavLinkItem {
  type?: 'link';
  label: string;
  href: string;
  icon?: LucideIcon;
  active?: boolean;
  items?: NavItem[];
}

export interface NavSeparatorItem {
  type: 'separator';
}

export interface UserAction {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: LucideIcon;
  variant?: 'default' | 'destructive';
}
