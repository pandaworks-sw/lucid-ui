import { useCallback, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';
import {
  BarChart3,
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
import type { NavItem, SidebarPanel } from '@/components/ui/app-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search-input';
import { SelectPicker } from '@/components/ui/select-picker';
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

type ProjectStatus = 'active' | 'done' | 'archived';

const PROJECTS: { id: string; name: string; owner: string; status: ProjectStatus }[] = [
  { id: 'p1', name: 'Onboarding revamp', owner: 'Sara Lee', status: 'active' },
  { id: 'p2', name: 'Billing migration', owner: 'Tomas Roy', status: 'active' },
  { id: 'p3', name: 'Mobile push notifications', owner: 'Aiko Tan', status: 'done' },
  { id: 'p4', name: 'Q1 analytics dashboard', owner: 'Sara Lee', status: 'done' },
  { id: 'p5', name: 'Legacy importer', owner: 'Tomas Roy', status: 'archived' },
  { id: 'p6', name: 'Design tokens cleanup', owner: 'Aiko Tan', status: 'active' },
];

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'active', label: 'Active' },
  { value: 'done', label: 'Done' },
  { value: 'archived', label: 'Archived' },
];

const STATUS_BADGE: Record<ProjectStatus, { label: string; variant: 'info' | 'success' | 'muted' }> = {
  active: { label: 'Active', variant: 'info' },
  done: { label: 'Done', variant: 'success' },
  archived: { label: 'Archived', variant: 'muted' },
};

/**
 * Live example of the contextual sidebar. Clicking "Projects" in the nav slides
 * the sidebar to a filter panel and switches the main content to a project list
 * that reacts to those filters. The back row clears the panel and slides back.
 */
function ContextualSidebarShowcase() {
  const [view, setView] = useState<'home' | 'projects'>('home');
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  // A nav click drives both the route (view) and the sidebar panel — exactly how
  // you would wire it to a real router's Link.
  const handleNavigate = useCallback((href: string) => {
    if (href === '#/projects') {
      setView('projects');
    } else {
      setView('home');
    }
  }, []);

  const NavLink = useCallback(
    ({
      href,
      children,
      onClick,
      ...props
    }: {
      href: string;
      children: ReactNode;
      onClick?: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
    }) => (
      <a
        href={href}
        onClick={(event) => {
          event.preventDefault();
          onClick?.(event); // preserve AppShell's mobile auto-close
          handleNavigate(href);
        }}
        {...props}
      >
        {children}
      </a>
    ),
    [handleNavigate]
  );

  const navigation: NavItem[] = [
    { label: 'Dashboard', href: '#/dashboard', icon: LayoutDashboard, active: view === 'home' },
    { label: 'Projects', href: '#/projects', icon: FolderKanban, active: view === 'projects' },
    { label: 'Reports', href: '#/reports', icon: BarChart3 },
  ];

  const filtered = PROJECTS.filter(
    (p) => (status === 'all' || p.status === status) && p.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  const filterPanel: SidebarPanel = {
    title: 'Projects',
    onBack: () => setView('home'),
    content: (
      <div className="flex flex-col gap-3 px-1 py-1">
        <SearchInput value={query} onChange={setQuery} placeholder="Search projects..." onClear={() => setQuery('')} />
        <SelectPicker mode="single" value={status} onChange={setStatus} options={STATUS_OPTIONS} />
        {(status !== 'all' || query !== '') && (
          <Button
            variant="ghost"
            size="sm"
            className="self-start"
            onClick={() => {
              setStatus('all');
              setQuery('');
            }}
          >
            Clear filters
          </Button>
        )}
      </div>
    ),
  };

  return (
    <AppShell
      branding={{ name: 'Acme Inc', subtitle: 'Contextual sidebar', href: '#' }}
      navigation={navigation}
      linkComponent={NavLink}
      sidebarPanel={view === 'projects' ? filterPanel : null}
      variant="sidebar"
      maxWidth="none"
      user={{ name: 'Sara Lee', email: 'sara@acme.com', actions: [{ label: 'Sign out' }] }}
      header={<span className="text-sm font-medium">{view === 'projects' ? 'Projects' : 'Dashboard'}</span>}
    >
      {view === 'projects' ? (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Showing <strong className="text-foreground">{filtered.length}</strong> of {PROJECTS.length} projects — the
            list reacts to the filters in the sidebar.
          </p>
          <div className="space-y-2">
            {filtered.map((p) => {
              const badge = STATUS_BADGE[p.status];
              return (
                <div key={p.id} className="flex items-center justify-between gap-3 rounded-lg border bg-card p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{p.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{p.owner}</p>
                  </div>
                  <Badge variant={badge.variant}>{badge.label}</Badge>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                No projects match these filters.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center rounded-lg border border-dashed bg-muted/30 p-8 text-center text-sm text-muted-foreground">
          Open <strong className="mx-1 text-foreground">Projects</strong> in the sidebar — the nav slides away and turns
          into filters, and this area becomes a filtered project list.
        </div>
      )}
    </AppShell>
  );
}

const CONTEXTUAL_CODE = `import { useState } from "react"
import { AppShell } from "@/components/ui/app-shell"
import { SearchInput } from "@/components/ui/search-input"
import { SelectPicker } from "@/components/ui/select-picker"

function ProjectsShell() {
  const [view, setView] = useState<"home" | "projects">("home")
  const [status, setStatus] = useState("all")

  return (
    <AppShell
      navigation={[
        { label: "Dashboard", href: "/", active: view === "home" },
        { label: "Projects", href: "/projects", active: view === "projects" },
      ]}
      // your Link / router click sets view; AppShell renders the panel
      sidebarPanel={
        view === "projects"
          ? {
              title: "Projects",
              onBack: () => setView("home"),
              content: (
                <SelectPicker mode="single" value={status} onChange={setStatus} options={STATUS_OPTIONS} />
              ),
            }
          : null
      }
    >
      {/* children read the SAME state, so the content reacts to the filters */}
      {view === "projects" ? <ProjectList status={status} /> : <Home />}
    </AppShell>
  )
}`;

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
                <code className="text-xs">sidebarPanel</code> -- a controlled contextual panel ({'{'} title, content,
                onBack {'}'}); when set, the sidebar slides from the nav to your panel (e.g. filters) and the main
                content reacts to the same state (see below)
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
            Set <code className="text-xs">navMode="drilldown"</code> to turn nested groups into a sliding, page-by-page
            menu. Clicking a group slides the panel to a new page that shows only that group's items, with a back row to
            slide back. Groups can nest as deep as you need. The default (<code className="text-xs">"accordion"</code>)
            keeps expanding children in place instead.
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

      <DemoSection title="Contextual sidebar (sidebarPanel)" code={CONTEXTUAL_CODE}>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Pass <code className="text-xs">sidebarPanel</code> to make the sidebar itself part of the page flow. When
            you set it, the sidebar slides from the nav list to your panel (e.g. a filter form) with an animated back
            row, and slides back when you clear it. It is a <strong>controlled</strong> slot — you drive it from your
            own route/state, and your content reads the same state so it reacts.
          </p>

          {/*
            Same embedding trick as the drilldown demo: AppShell owns the full
            screen, so we clamp the height and re-root its fixed sidebar to this box.
          */}
          <div className="relative h-[520px] w-full overflow-hidden rounded-xl border [transform:translateZ(0)] [&_[data-slot=sidebar-container]]:h-full [&_[data-slot=sidebar-wrapper]]:min-h-full">
            <ContextualSidebarShowcase />
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>The loop has three parts you own; AppShell only animates the swap:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                A nav click sets your state (here <code className="text-xs">view</code>) and, from it,{' '}
                <code className="text-xs">sidebarPanel</code>.
              </li>
              <li>
                The panel <code className="text-xs">content</code> edits filter state (
                <code className="text-xs">status</code>, search) that lives above the shell.
              </li>
              <li>
                Your <code className="text-xs">children</code> read that same state, so the list re-filters live. The
                back row calls <code className="text-xs">onBack</code> to clear the panel.
              </li>
            </ul>
            <p className="text-xs">
              Designed for the expanded sidebar — in icon-collapsed mode the panel body is hidden and only the back
              affordance remains, so keep the sidebar open while a panel is active.
            </p>
          </div>
        </div>
      </DemoSection>
    </>
  );
}
