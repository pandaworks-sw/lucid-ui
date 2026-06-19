# AppShell

A data-driven application layout with collapsible sidebar, header bar, and user menu.

```tsx
import { AppShell } from "@/components/ui/app-shell"
import { Users, LayoutDashboard, LogOut } from "lucide-react"

<AppShell
  branding={{ name: "MyApp", logo: "/logo.png", href: "/" }}
  navigation={[
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Users", href: "/users", icon: Users, active: true },
    {
      label: "Settings",
      href: "#",
      icon: Settings,
      items: [
        { label: "General", href: "/settings/general" },
        { label: "Security", href: "/settings/security" },
      ],
    },
  ]}
  user={{
    name: "Ahmad Razif",
    email: "ahmad@company.com",
    avatar: "/avatar.jpg",
    actions: [
      { label: "Profile", href: "/profile", icon: User },
      { label: "Sign Out", onClick: handleSignOut, icon: LogOut, variant: "destructive" },
    ],
  }}
  header={<Breadcrumbs />}
  navbarActions={<NotificationBell />}
>
  {children}
</AppShell>
```

Props:
- `branding: { name: string; logo?: string; href?: string; logoWrapper?: boolean; subtitle?: string }` -- App branding in sidebar header. `subtitle` renders a small muted line under the brand name (e.g. version string, environment label) and hides automatically when the sidebar collapses to icon mode.
- `navigation: NavItem[]` -- Sidebar nav items. Each: `{ label, href, icon?, active?, items?: NavItem[] }`
- `user?: { name, email?, avatar?, actions?: UserAction[] }` -- User menu in sidebar footer
- `header?: ReactNode` -- Content next to sidebar trigger in the top bar
- `navbarActions?: ReactNode` -- Right-aligned actions in the top bar (search, notifications)
- `children: ReactNode` -- Main content area
- `navMode?: 'accordion' | 'drilldown'` -- How a nested group (a `NavItem` with `items`) opens (default: `'accordion'`). `'accordion'` expands the group's children in place, below the parent. `'drilldown'` slides the whole nav panel to a new page showing only that group's children, with a back row to slide back — good for deep menu trees (groups nest to any depth). On mount the panel opens to the level that holds the active item.
- `variant?: 'inset' | 'sidebar'` -- Content framing (default: `'inset'`). `'inset'` floats the main content in a rounded, bordered card with a margin around it. `'sidebar'` makes the content flush to the edges — full-width / full-height, no card frame.
- `sidebarPanel?: { title: string; content: ReactNode; onBack?: () => void } | null` -- A **controlled** contextual panel. When set, the sidebar slides from the nav list to your panel (e.g. a filter form) with an animated back row, and slides back when you clear it. You drive it from your own route/state; the typical loop is: a nav click sets both the route and `sidebarPanel`, your `content` edits filter state, and your `children` read that same state so the main content reacts (re-query / re-filter). `onBack` fires on the back row — use it to set `sidebarPanel` back to `null`. AppShell owns only the swap + animation (it does not animate the main content — that belongs to your routing layer). Designed for the expanded sidebar: in icon-collapsed mode the panel body is hidden and only the back affordance remains, so keep the sidebar open while a panel is active (e.g. via `defaultSidebarOpen`). Omitting the prop (or `null`) renders the nav exactly as before — fully backward compatible.
- `defaultSidebarOpen?: boolean` -- Initial sidebar open state on mount (default: `true`). Pass a value read from `localStorage` (or any other store) to restore the user's last preference. The compact-desktop (768–1023px) auto-collapse still runs on screen-size transitions, but skips initial mount — so a stored `false` is honoured when the screen is already wide.
- `onSidebarOpenChange?: (open: boolean) => void` -- Fires every time the sidebar open state changes (manual toggle, Cmd/Ctrl-B shortcut, or compact-desktop auto-collapse on resize). Use it to persist the value.

Example — persist to `localStorage`:

```tsx
const SIDEBAR_KEY = 'sidebar:open';

function App() {
  const initialOpen = typeof window === 'undefined'
    ? true
    : window.localStorage.getItem(SIDEBAR_KEY) !== 'false';

  return (
    <AppShell
      branding={...}
      navigation={...}
      defaultSidebarOpen={initialOpen}
      onSidebarOpenChange={(open) => window.localStorage.setItem(SIDEBAR_KEY, String(open))}
    >
      {children}
    </AppShell>
  );
}
```

Example — drill-down navigation (sliding, page-by-page menu):

```tsx
<AppShell
  branding={{ name: "Acme", href: "/" }}
  navMode="drilldown"
  navigation={[
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
      // clicking "Settings" slides to a page with these items;
      // "Billing" carries its own items, so it slides one level deeper
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
  {children}
</AppShell>
```

Example — contextual sidebar (nav swaps to filters, content reacts):

```tsx
function ProjectsShell() {
  const [view, setView] = useState<"home" | "projects">("home");
  const [status, setStatus] = useState("all");

  return (
    <AppShell
      branding={{ name: "Acme", href: "/" }}
      // your router Link / onClick sets `view`; AppShell renders the panel from it
      navigation={[
        { label: "Dashboard", href: "/", active: view === "home" },
        { label: "Projects", href: "/projects", active: view === "projects" },
      ]}
      sidebarPanel={
        view === "projects"
          ? {
              title: "Projects",
              onBack: () => setView("home"), // slide back to the nav
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
  );
}
```

Dependencies: sidebar, button, separator, sheet, tooltip, dropdown-menu, collapsible, avatar
