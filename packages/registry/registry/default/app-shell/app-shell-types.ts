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
