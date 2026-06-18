import {
  Calendar,
  CreditCard,
  FileText,
  FolderKanban,
  HelpCircle,
  LayoutDashboard,
  ListTodo,
  Receipt,
  Settings,
  ShieldCheck,
  Users,
  Wallet,
} from 'lucide-react';

import { AppShell } from '@/components/ui/app-shell';
import type { NavItem } from '@/components/ui/app-shell';
import { DemoSection } from '@/showcase/component-page';

const DRILLDOWN_NAV: NavItem[] = [
  { label: 'Dashboard', href: '#/dashboard', icon: LayoutDashboard, active: true },
  {
    label: 'Workspace',
    href: '#/workspace',
    icon: FolderKanban,
    items: [
      { label: 'Projects', href: '#/workspace/projects', icon: FolderKanban },
      { label: 'Tasks', href: '#/workspace/tasks', icon: ListTodo },
      { label: 'Calendar', href: '#/workspace/calendar', icon: Calendar },
    ],
  },
  {
    label: 'Settings',
    href: '#/settings',
    icon: Settings,
    items: [
      { label: 'General', href: '#/settings/general', icon: Settings },
      { label: 'Members', href: '#/settings/members', icon: Users },
      {
        label: 'Billing',
        href: '#/settings/billing',
        icon: CreditCard,
        items: [
          { label: 'Plan', href: '#/settings/billing/plan', icon: ShieldCheck },
          { label: 'Invoices', href: '#/settings/billing/invoices', icon: Receipt },
          { label: 'Payment methods', href: '#/settings/billing/payment', icon: Wallet },
        ],
      },
    ],
  },
  { type: 'separator' },
  { label: 'Docs', href: '#/docs', icon: FileText },
  { label: 'Help', href: '#/help', icon: HelpCircle },
];

const DRILLDOWN_CODE = `import { AppShell } from "@/components/ui/app-shell"
import { LayoutDashboard, FolderKanban, Settings, CreditCard } from "lucide-react"

<AppShell
  branding={{ name: "Acme", href: "/" }}
  navMode="drilldown"
  navigation={[
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    {
      label: "Workspace",
      href: "/workspace",
      icon: FolderKanban,
      items: [
        { label: "Projects", href: "/workspace/projects" },
        { label: "Tasks", href: "/workspace/tasks" },
      ],
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
      // groups can nest — drilling into "Billing" slides one level deeper
      items: [
        { label: "General", href: "/settings/general" },
        {
          label: "Billing",
          href: "/settings/billing",
          icon: CreditCard,
          items: [
            { label: "Plan", href: "/settings/billing/plan" },
            { label: "Invoices", href: "/settings/billing/invoices" },
          ],
        },
      ],
    },
  ]}
>
  {/* Page content */}
</AppShell>`;

export default function AppShellDemo() {
  return (
    <>
      <DemoSection
        title="App Shell Layout"
        code={`import { AppShell } from "@/components/ui/app-shell"
import { Users, LayoutDashboard } from "lucide-react"

<AppShell
  branding={{ name: "MyApp", href: "/" }}
  navigation={[
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Users", href: "/users", icon: Users, active: true },
  ]}
  user={{
    name: "John Doe",
    email: "john@example.com",
    actions: [
      { label: "Sign Out", onClick: () => {} },
    ],
  }}
  header={<span>Page Title</span>}
  variant="inset"
  maxWidth={1400}
  contentClassName="p-4"
>
  {/* Page content */}
</AppShell>`}
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The App Shell provides a complete application layout with a collapsible sidebar, header bar, and user menu.
            It accepts data-driven configuration for navigation, branding, and user actions.
          </p>
          <div className="rounded-lg border bg-muted/50 p-8 dark:bg-muted/20">
            <pre className="text-xs text-muted-foreground">
              {`┌──────────┬──────────────────────────────────────┐
│          │  [=] | Breadcrumbs      [Search] [Bell]│  <- header + navbarActions
│ Sidebar  ├──────────────────────────────────────┤
│          │  Page Title           [Action] [Action]│  <- PageHeader component
│ Nav 1    │  Description text                     │
│ Nav 2    ├──────────────────────────────────────┤
│ Nav 3    │                                       │
│          │     Main Content Area                 │
│  [User]  │                                       │
└──────────┴──────────────────────────────────────┘`}
            </pre>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>The navbar supports two content slots:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <code className="text-xs">header</code> -- breadcrumbs or custom content next to the sidebar trigger
              </li>
              <li>
                <code className="text-xs">navbarActions</code> -- global actions (search, notifications) right-aligned
              </li>
              <li>
                <code className="text-xs">branding.logoWrapper</code> -- set to false if your logo already has its own
                background/container (default: true)
              </li>
              <li>
                <code className="text-xs">branding.subtitle</code> -- small muted line under the brand name (e.g.
                version string or environment label); hidden when the sidebar collapses to icon mode
              </li>
              <li>
                <code className="text-xs">linkComponent</code> -- custom link component for client-side navigation (e.g.
                TanStack Router Link, Next.js Link)
              </li>
              <li>
                <code className="text-xs">variant</code> -- content framing: <code className="text-xs">"inset"</code>{' '}
                (default) floats the content in a rounded, bordered card with a margin;{' '}
                <code className="text-xs">"sidebar"</code> makes the content flush — full-width / full-height, no card
                frame
              </li>
              <li>
                <code className="text-xs">navMode</code> -- how nested groups open:{' '}
                <code className="text-xs">"accordion"</code> (default) expands children in place;{' '}
                <code className="text-xs">"drilldown"</code> slides to a new menu page (see below)
              </li>
              <li>
                <code className="text-xs">maxWidth</code> -- constrains the content area width (default: 1400px)
              </li>
              <li>
                <code className="text-xs">contentClassName</code> -- overrides default content padding
              </li>
            </ul>
            <p>
              For page-specific titles and actions, use the <strong>PageHeader</strong> component inside the content
              area.
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            See the <strong>Full Demo</strong> page in the sidebar for a live example of the App Shell with a complete
            employee management interface.
          </p>
        </div>
      </DemoSection>

      <DemoSection title="Drill-down navigation (navMode)" code={DRILLDOWN_CODE}>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Set <code className="text-xs">navMode="drilldown"</code> to turn nested groups into a sliding,
            page-by-page menu. Clicking a group slides the panel to a new page that shows only that group's items, with a
            back row to slide back. Groups can nest as deep as you need. The default (
            <code className="text-xs">"accordion"</code>) keeps expanding children in place instead.
          </p>

          {/*
            AppShell owns the full screen (fixed sidebar + min-h-svh wrapper). To embed it
            in this doc box we clamp the height, hide overflow, and add a transform so the
            fixed sidebar is positioned relative to the box instead of the viewport.
          */}
          <div className="relative h-[520px] w-full overflow-hidden rounded-xl border [transform:translateZ(0)] [&_[data-slot=sidebar-container]]:h-full [&_[data-slot=sidebar-wrapper]]:min-h-full">
            <AppShell
              branding={{ name: 'Acme Inc', subtitle: 'Drill-down nav', href: '#' }}
              navMode="drilldown"
              navigation={DRILLDOWN_NAV}
              variant="sidebar"
              maxWidth="none"
              user={{ name: 'Sara Lee', email: 'sara@acme.com', actions: [{ label: 'Sign out' }] }}
              header={<span className="text-sm font-medium">Dashboard</span>}
            >
              <div className="flex h-full items-center justify-center rounded-lg border border-dashed bg-muted/30 p-8 text-center text-sm text-muted-foreground">
                Open <strong className="mx-1 text-foreground">Workspace</strong> or
                <strong className="mx-1 text-foreground">Settings</strong> in the sidebar — the menu slides to that
                group. Inside Settings, open <strong className="mx-1 text-foreground">Billing</strong> to go one level
                deeper.
              </div>
            </AppShell>
          </div>

          <p className="text-xs text-muted-foreground">
            On mount the panel opens straight to the level that holds the active item. The accordion mode is unchanged —
            drilldown is fully opt-in per shell.
          </p>
        </div>
      </DemoSection>
    </>
  );
}
