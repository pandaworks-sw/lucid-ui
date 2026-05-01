# Data Display Components

Components for presenting data and content.

## Badge

Variants: `default`, `secondary`, `destructive`, `outline`, `success`, `warning`, `info`, `muted`.

```tsx
import { Badge } from "@/components/ui/badge"

<Badge>Active</Badge>
<Badge variant="secondary">Pending</Badge>
<Badge variant="destructive">Rejected</Badge>
<Badge variant="outline">Draft</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">On Hold</Badge>
<Badge variant="info">Planning</Badge>
<Badge variant="muted">Archived</Badge>
```

Pass `dot` to render a leading status dot tinted to match the variant — useful for status pills:

```tsx
<Badge variant="success" dot>Active</Badge>
<Badge variant="warning" dot>On Hold</Badge>
<Badge variant="info" dot>Planning</Badge>
```

Props:
- `variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" | "muted"`
- `dot?: boolean` — render a leading status dot tinted to match the variant
- `tooltipText?: string` — override the auto-tooltip text (defaults to the children text content when truncated)

When the children text is a string, Badge wraps the chip in a Tooltip automatically so long labels stay readable when truncated.

## Avatar

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>John Doe</AvatarFallback>
</Avatar>
```

`AvatarFallback` runs string children through `getInitialName` (exported from `@pandaworks-sw/ui` and from `@/lib`), so a full name is auto-converted to a 2-character monogram: `"John Doe" → "JD"`, `"Devi Marasinghe" → "DM"`, `"Eli" → "EL"`. Already-short strings (e.g. `"JD"`) pass through unchanged.

By default the fallback is colorized — the background color is derived from the first rendered character (A–Z map to 26 evenly spaced OKLCH hues, digits and other characters fall back to a deterministic hash). Foreground is white and works in both light and dark mode.

```tsx
// auto-initials + auto-color (default)
<Avatar><AvatarFallback>John Doe</AvatarFallback></Avatar>

// neutral muted background — opt out for system tiles, "+N" overflow, placeholders
<Avatar><AvatarFallback colorize={false}>+3</AvatarFallback></Avatar>
```

Pass `shape="square"` for an entity-style rounded-square tile (project icons, app logos, anything that isn't a person):

```tsx
<Avatar shape="square">
  <AvatarFallback>Pandaworks</AvatarFallback>
</Avatar>
```

Props (`Avatar`):
- `shape?: "circle" | "square"` — defaults to `"circle"`. Square uses `rounded-md`. The shape propagates into `AvatarFallback` via `rounded-[inherit]`.

Props (`AvatarFallback`):
- `colorize?: boolean` -- derive background color from the first rendered character (default: `true`). Pass `colorize={false}` to fall back to `bg-muted`.

If you need the initials helper outside the Avatar (e.g. for `aria-label`, sorting, or non-Avatar UI), import it directly:

```tsx
import { getInitialName } from "@pandaworks-sw/ui"; // or "@/lib" inside the registry

getInitialName("John Doe");        // → "JD"
getInitialName("Devi Marasinghe"); // → "DM"
getInitialName("Eli");             // → "EL"
getInitialName("");                // → ""
```

Custom `style` and `className` still take precedence — pass your own `backgroundColor`/`color` to override the computed values.

## AvatarGroup

A horizontal stack of overlapping Avatars with a `+N` overflow tile.

```tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarGroup } from "@/components/ui/avatar-group"

<AvatarGroup max={3} size="md">
  {team.map(m => (
    <Avatar key={m.id}>
      <AvatarFallback colorize>{m.initials}</AvatarFallback>
    </Avatar>
  ))}
</AvatarGroup>
```

Props:
- `max?: number` — show this many avatars then collapse the rest into a `+N` tile. Omit to show all.
- `size?: "xs" | "sm" | "md" | "lg"` — tile size. Default `sm`.
- `shape?: "circle" | "square"` — group-level shape; per-`Avatar` `shape` wins if set.

Each child `Avatar`'s `className` is merged with the group's size and ring classes — children don't need their own size className.

Sizing:

| Scenario | Size |
|----------|------|
| Inline assignee stack inside a `Table` row, `ListRow`, or activity feed | `xs` |
| Card-tile member preview, project tile assignees, dense filter bar | `sm` (default) |
| Detail page sidebar / dashboard card "team" widget | `md` |
| Hero member showcase, marketing or onboarding surface | `lg` |

Shape rule: `circle` for people, `square` for non-human entities (project teams stay circle even though the host card is for a project — the avatars themselves represent humans). See the Avatar shape rule.

## Card

```tsx
import {
  Card, CardHeader, CardTitle,
  CardDescription, CardContent, CardFooter,
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>Footer actions</CardFooter>
</Card>
```

## Table

```tsx
import {
  Table, TableHeader, TableBody,
  TableRow, TableHead, TableCell,
} from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Ahmad</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

Standalone, the table renders inside its own bordered, rounded, shadowed wrapper. When nested inside `CardContent`, the wrapper auto-drops its border, rounding, background, and shadow so the surrounding card frame is the only visual boundary -- pair `<CardContent className="p-0">` with `<Table>` for a flush card-table layout.

## Calendar

```tsx
import { Calendar } from "@/components/ui/calendar"

<Calendar mode="single" selected={date} onSelect={setDate} />
```

## Skeleton

```tsx
import { Skeleton } from "@/components/ui/skeleton"

<Skeleton className="h-4 w-50" />
<Skeleton className="h-12 w-12 rounded-full" />
```

## Progress

```tsx
import { Progress } from "@/components/ui/progress"

<Progress value={60} />
```

## CodeLabel

Inline monospace label with optional copy-to-clipboard button.

```tsx
import { CodeLabel } from "@/components/ui/code-label"

<CodeLabel value="EMP-2024-001" />
<CodeLabel value="npm install" size="sm" />
<CodeLabel value="PW-ATLAS" copyable={false} />
```

Props:
- `value: string` — text to display (and copy when `copyable`).
- `size?: "default" | "sm"` — chip size.
- `copyable?: boolean` — show the hover-revealed copy button. Default `true`. Pass `false` for a static inline code chip with no interactive affordance (e.g. when listing many keys in a summary table).

Sizing:

| Scenario | Size |
|----------|------|
| Standalone inline ID or command on a detail page, in a `PageHeader`, or in a Card header | `default` |
| Inline ID inside a `Table` row, a list, or a dense filter bar | `sm` |

## MeterRow

Labeled horizontal bar with optional trailing value and per-row tone. Replaces the hand-rolled `<div className="h-1.5 w-full bg-muted"><div style={{ width: \`${pct}%\` }} />` pattern.

```tsx
import { MeterRow } from "@/components/ui/meter-row"
import { Badge } from "@/components/ui/badge"

<MeterRow label="Engineering" value={13} max={13} valueLabel={13} />

<MeterRow
  label={<Badge variant="success" dot>Active</Badge>}
  value={5}
  max={statusMax}
  valueLabel={5}
  tone="success"
/>
```

Props:
- `label: ReactNode` — leading label. Plain string or any node (typically a Badge for status/priority charts).
- `value: number` — numeric value used for the fill width.
- `max?: number` — maximum value used to compute width. Defaults to `100`.
- `valueLabel?: ReactNode` — trailing value text/node. Omit to hide.
- `tone?: "default" | "success" | "warning" | "info" | "destructive" | "muted"` — bar fill color. Default `default` (primary).
- `size?: "sm" | "default" | "lg"` — track height (`h-1` / `h-1.5` / `h-2`). Default `default`.

The bar exposes `role="progressbar"` with `aria-valuenow` clamped to `0–100`.

Sizing:

| Scenario | Size |
|----------|------|
| Compact list row indicator (next to many rows of data, dense `Table` cell) | `sm` |
| Dashboard breakdown chart, filter bar, standard `Card` content | `default` |
| Hero KPI breakdown or a single highlighted metric | `lg` |

## ListRow

`leading + title + subtitle + trailing` layout primitive. Use for activity feeds, deadline lists, team lists, and any "icon + text + meta" row.

```tsx
import { ListRow } from "@/components/ui/list-row"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

<ListRow
  leading={<Avatar><AvatarFallback colorize>AR</AvatarFallback></Avatar>}
  title="Ahmad Razif"
  subtitle="Engineering Lead · ahmad@…"
  trailing={<Badge variant="success" dot>Active</Badge>}
/>
```

For clickable rows, pass `asButton` — the row renders as a `<button>` with a focus ring and a hover background:

```tsx
<ListRow
  asButton
  onClick={() => navigate(...)}
  leading={<MemberAvatar member={assignee} />}
  title="Notification service extraction"
  subtitle="PW-ATLAS · Atlas Platform Migration"
  trailing={<PriorityBadge priority="high" />}
/>
```

Props:
- `leading?: ReactNode` — icon/avatar slot.
- `title: ReactNode` — primary line (required). Truncated.
- `subtitle?: ReactNode` — secondary line (subdued, smaller, truncated).
- `trailing?: ReactNode` — meta/action slot.
- `asButton?: boolean` — render as `<button>` with keyboard interactivity. Pairs with `onClick`.
- `density?: "sm" | "default" | "lg"` — vertical padding.
- `surface?: "plain" | "bordered" | "muted"` — `bordered` adds a card frame and inset padding (use for standalone rows like API keys); `muted` adds a soft fill.
- `interactive?: boolean` — explicitly opt into the hover/focus styles. Inferred from `asButton` or `onClick`; rarely needs to be set manually.

Density:

| Scenario | Density |
|----------|---------|
| Activity feed, comment stream, long scrolling list (12+ rows) | `sm` |
| Member list, deadline list, dashboard "Recent X" card | `default` |
| Settings list (one row per setting), API-key list, "1-of-few" rows on a detail page | `lg` |

Surface:

| Scenario | Surface |
|----------|---------|
| Inside a `Card` with `divide-y` (the Card frame is the boundary) | `plain` (default) |
| Standalone row not wrapped in a Card — needs its own frame (e.g. an API-key entry on a settings page) | `bordered` |
| Group of rows that should read as a soft inline list (no card needed, but distinct from page bg) | `muted` |

For wrapped lists, place `ListRow`s inside a Card with `divide-y` and an inset class on each row (e.g. `className="px-4"`):

```tsx
<Card>
  <CardContent className="divide-y p-0">
    {items.map(item => <ListRow key={item.id} className="px-4" … />)}
  </CardContent>
</Card>
```

## StatCard

Dashboard stat tile composed from `Card`, `AnimatedNumber`, and `Badge`.

```tsx
import { StatCard } from "@/components/ui/stat-card"
import { FolderKanban } from "lucide-react"

<StatCard
  icon={FolderKanban}
  label="Active projects"
  value={5}
  hint="of 9 total"
  delta="+2 QoQ"
  deltaTone="up"
/>
```

Props:
- `icon?: ComponentType<{ className?: string }>` — leading icon shown in the header.
- `label: ReactNode` — short caption above the value.
- `value: number` — numeric value, animated when it changes via `AnimatedNumber`.
- `suffix?: string` — appended to the value (e.g. `"%"`).
- `hint?: ReactNode` — text below the value.
- `delta?: string` — trend chip text (e.g. `"+12%"`).
- `deltaTone?: "up" | "down" | "flat"` — controls the trend chip's tone. `"up"` → success, `"down"` → destructive, `"flat"` → muted. Defaults to `"up"`.

`StatCard` ships at a single SaaS-density size — tight padding (`px-4`), `text-xs` label, `size-3.5` icon, and a `text-xl` headline number — so multiple tiles fit comfortably on a dashboard without dominating the page. Don't override these via `className` to "go bigger"; if you need a hero number, use a plain `Card` with custom typography.

## AnimatedNumber

A number display that animates smoothly between values using requestAnimationFrame with easeOutQuad easing.

```tsx
import { AnimatedNumber } from "@/components/ui/animated-number"

<AnimatedNumber value={85} suffix="%" />
<AnimatedNumber value={1234.56} prefix="RM " decimals={2} duration={800} />
<AnimatedNumber value={count} formatter={(v) => v.toLocaleString()} />
```

Props:
- `value: number` -- Target value to animate to
- `duration?: number` -- Animation duration in ms (default: 500)
- `suffix?: string` -- Text appended after the number (e.g., "%", "pts")
- `prefix?: string` -- Text prepended before the number (e.g., "$", "RM")
- `decimals?: number` -- Number of decimal places (default: 0)
- `formatter?: (value: number) => string` -- Custom formatter (overrides decimals)

## ExpandableText

A text component that collapses long content with configurable visible lines. Uses `<pre>` internally for newline support.

```tsx
import { ExpandableText } from "@/components/ui/expandable-text"

<ExpandableText visibleLines={3}>
  {longDescription}
</ExpandableText>

<ExpandableText
  visibleLines={2}
  showMoreLabel="Read more"
  showLessLabel="Read less"
>
  {multiLineText}
</ExpandableText>
```

Props:
- `visibleLines?: number` -- Lines shown before collapsing (default: 3)
- `showMoreLabel?: string` -- Expand trigger label (default: "Show more")
- `showLessLabel?: string` -- Collapse trigger label (default: "Show less")
