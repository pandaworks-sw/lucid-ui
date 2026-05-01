# Layout Components

Components for page structure and navigation layout.

## PageHeader

A page header with title, description, and action buttons.

```tsx
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

<PageHeader
  title="Employees"
  description="Manage your team members."
  actions={
    <Button><Plus /> Add Employee</Button>
  }
/>
```

Props:
- `title: string`
- `description?: string`
- `actions?: ReactNode`

## Stepper

Multi-step progress with completed (emerald), current (primary ring), and pending states. Horizontal (default) or vertical (`orientation="vertical"`, top-down). Optional `description` and `tooltip` render only for the **current** step (active index). Connector lines use a short fill animation (`scale` transform, ~500ms); reduced motion disables the transition.

```tsx
import { Stepper } from "@/components/ui/stepper"

<Stepper
  currentStep={1}
  steps={[
    { id: 1, title: "Details", description: "Basic info" },
    { id: 2, title: "Review", description: "Check entries" },
    { id: 3, title: "Submit" },
  ]}
/>

<Stepper
  orientation="vertical"
  currentStep={0}
  steps={[...]}
/>
```

Props:
- `steps: Step[]` -- Array of steps. Each: `{ id: number; title: string; description?: string; tooltip?: ReactNode }`
- `currentStep: number` -- Zero-based index of the current step
- `orientation?: "horizontal" | "vertical"` -- Default `horizontal`

Dependencies: popover

## Separator

```tsx
import { Separator } from "@/components/ui/separator"

<Separator />
<Separator orientation="vertical" />
```

## Breadcrumb

```tsx
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Employees</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## EmptyState

Centered empty placeholder for filtered tables, "no results" panels, and empty list/grid surfaces.

```tsx
import { EmptyState } from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"
import { FolderKanban } from "lucide-react"

<EmptyState
  icon={<FolderKanban />}
  title="No projects match these filters."
  description="Try widening the date range or removing a tag."
  action={<Button variant="outline">Clear filters</Button>}
/>
```

Props:
- `icon?: ReactNode` — leading icon, wrapped in a soft muted disc.
- `title: ReactNode` — short heading (required).
- `description?: ReactNode` — secondary copy beneath the title.
- `action?: ReactNode` — primary action, typically a Button.
- `size?: "sm" | "md" | "lg"` — controls vertical padding and icon-disc size. Default `md`.

Sizing:

| Scenario | Size |
|----------|------|
| Inline empty state inside a `Card` or `Table` body (filtered table with no results, "no items yet") | `sm` |
| Standard empty page (a route with no records yet, "Get started by creating your first X") | `md` (default) |
| Onboarding hero / dedicated empty-state landing screen | `lg` (pair with `Button size="lg"` action) |

Drop the icon for the densest inline variant. Match the action button's size to the EmptyState size — `sm` empty state → `sm` button; `lg` empty state → `lg` button.
