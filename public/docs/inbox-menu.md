# InboxMenu

A header-level notification center. The trigger is an icon-only `Button` with a `Bell` icon and an unread-count `Badge` overlaid on the top-right corner. Clicking the trigger opens a `Popover` with a scrollable list of notifications, an optional "Mark all read" link in the header, and an optional "View all" footer link.

The component is **controlled** — the caller passes `items` and the callbacks (`onMarkAllRead`, `onItemClick`, `onViewAllClick`). InboxMenu owns the popover open state and the visual unread-badge derivation, nothing else.

## Usage

```tsx
import { InboxMenu, type InboxItem } from "@pandaworks-sw/lucid-ui";
import { AtSign, GitPullRequest } from "lucide-react";

const items: InboxItem[] = [
  {
    id: "n1",
    title: "Alice mentioned you",
    description: "mentioned you in #design",
    timestamp: "5m",
    read: false,
    icon: AtSign,
  },
  {
    id: "n2",
    title: "New pull request",
    description: "PRJ-1142 · Refactor onboarding to use Stepper",
    timestamp: "23m",
    read: true,
    icon: GitPullRequest,
  },
];

<InboxMenu
  items={items}
  onMarkAllRead={() => markAllReadOnServer()}
  onItemClick={(id) => markReadOnServer(id)}
  viewAllHref="/notifications"
/>
```

## Props

### `InboxMenuProps`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `items` | `InboxItem[]` | — | Required. The full list shown in the popover. Order is preserved. Filter / sort before passing in. |
| `onMarkAllRead` | `() => void` | — | When provided **and** there's at least one unread item, a "Mark all read" link appears in the header. The component does NOT mutate `items` — your callback should update the source and re-pass a new array. |
| `onItemClick` | `(id: string) => void` | — | Fires when a notification row is activated (click on the row, click on `href`, or Enter on focused row). |
| `viewAllHref` | `string` | — | When set, renders a "View all" link in the footer that navigates to this URL. Mutually-preferred over `onViewAllClick`. |
| `onViewAllClick` | `() => void` | — | When set (and `viewAllHref` is not), renders a "View all" button in the footer. |
| `disabled` | `boolean` | `false` | The trigger is disabled and the badge is hidden. |
| `align` | `"start" \| "center" \| "end"` | `"end"` | Forwards to `PopoverContent` `align`. Keep the default for top-right placements. |
| `emptyTitle` | `ReactNode` | `"No notifications"` | Title shown in the empty state. |
| `emptyDescription` | `ReactNode` | `"You're all caught up."` | Description shown in the empty state. |
| `triggerLabel` | `string` | `"Notifications"` | Used both as the popover header title AND as the trigger's `aria-label` (suffixed with `"(N unread)"` when unread > 0). |
| `maxBadgeCount` | `number` | `99` | Visual cap for the unread count. Counts above this render as `"99+"`. |
| `className` | `string` | — | Merged onto the root wrapper that holds the trigger + badge. |

### `InboxItem`

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Required. Forwarded to `onItemClick`. |
| `title` | `ReactNode` | Required. Renders bold when `read` is `false`. |
| `description` | `ReactNode` | Optional secondary line (clamped to 2 lines). |
| `timestamp` | `ReactNode` | Required. **Pre-formatted** — InboxMenu does NOT format dates for you. Pass `"5m"`, `"Mar 4"`, etc. |
| `read` | `boolean` | `false` if omitted. Drives the bold-title style and the unread-count badge. |
| `icon` | `ElementType` | A Lucide icon (or any component) shown in a tinted circle as the leading visual. |
| `avatarUrl` | `string` | Avatar image source. When set (or `avatarFallback` is set), takes precedence over `icon`. |
| `avatarFallback` | `string` | Avatar initials fallback. Use with `avatarUrl` (or alone, to render initials only). |
| `href` | `string` | When set, the row renders as an `<a>`. Clicking still fires `onItemClick`. |
| `onClick` | `() => void` | Optional per-row click handler. Fires before `onItemClick`. |

If `avatarUrl` / `avatarFallback` / `icon` are all absent, the row shows a simple primary-color dot on unread items.

## Patterns

- **App header**: place `<InboxMenu />` next to `<ThemeToggle />` in your `AppShellHeader`. Default `align="end"` keeps the popover anchored inside the viewport.
- **Server-backed list**: fetch notifications in the parent and pass them via `items`. On `onItemClick(id)` and `onMarkAllRead()`, fire the mutation and re-fetch (or optimistically update the array your parent owns).
- **Long lists**: the popover has `max-h-96` and scrolls; "View all" should always go to a dedicated full-page inbox for long histories.
- **Real-time updates**: just keep updating the `items` array — the unread badge re-renders from `items.filter(i => !i.read).length`.

## Accessibility

- The trigger has a dynamic `aria-label` that reflects the unread count: `"Notifications (3 unread)"`.
- The unread badge is `aria-hidden` because the same information is in the `aria-label`.
- Each row is a real focusable element (`<a>` or `<button>`) — Tab navigates through the list, Enter activates.
- Rows are wrapped in `<ul>` / `<li>`.

## When to reach for something else

- A toast that pops up when a single new event arrives? Use `Sonner` instead.
- A persistent page-level strip (system maintenance, trial expiry)? Use `ConnectionBanner` (or wait for the future `Banner` variant) — `InboxMenu` is for *user-actionable items*, not announcements.
- A user-account menu (avatar, sign-out)? Use `DropdownMenu` directly — `InboxMenu` is a *list view*, not a menu of actions.
