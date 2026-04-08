# DetailPage

A compound layout for resource detail pages with header, 2-column grid, sidebar, and copyable meta items.

```tsx
import {
  DetailPage, DetailPageHeader, DetailPageMain,
  DetailPageContent, DetailPageSidebar, DetailPageMetaItem,
} from "@/components/ui/detail-page"

<DetailPage>
  <DetailPageHeader
    title="Ahmad Razif"
    subtitle="Software Engineer"
    icon={<Avatar />}
    backHref="/employees"
    backLabel="Employees"
    actions={<Button>Edit</Button>}
  />
  <DetailPageMain>
    <DetailPageContent>
      {/* Main content cards */}
    </DetailPageContent>
    <DetailPageSidebar>
      <DetailPageMetaItem label="Employee ID" value="EMP-001" copyable />
      <DetailPageMetaItem label="Department" value="Engineering" />
    </DetailPageSidebar>
  </DetailPageMain>
</DetailPage>
```

## DetailPageSidebarSection

A section block for the sidebar with a header row (label + optional action) and free-form children. Inspired by GitHub's issue detail sidebar.

```tsx
import { DetailPageSidebarSection } from "@/components/ui/detail-page"
import { Settings } from "lucide-react"

<DetailPageSidebar>
  <DetailPageSidebarSection
    label="Assignees"
    action={<button><Settings className="size-4" /></button>}
  >
    <p>No one – <a href="#">Assign yourself</a></p>
  </DetailPageSidebarSection>
  <DetailPageSidebarSection label="Labels">
    <p>No labels</p>
  </DetailPageSidebarSection>
</DetailPageSidebar>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Section header text |
| `action` | `ReactNode` | — | Optional action element in header row |
| `children` | `ReactNode` | — | Free-form section content |

Extends `HTMLAttributes<HTMLDivElement>` — accepts `className`, `style`, etc.
