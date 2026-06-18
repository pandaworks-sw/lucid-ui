# DetailPage

A compound layout for resource detail pages with header, 2-column grid, non-carded content sections, sidebar, and copyable meta items. The header title is `text-2xl` and meta values are regular weight, giving the muted-label / plain-value type hierarchy of Vercel-style detail pages.

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

## DetailPageMetaBar

A horizontal, wrapping strip of `DetailPageMetaItem`s that sits under the header — the Vercel-style meta row (Registrar, Age, Nameservers, …). Use it instead of (or alongside) the sidebar when the meta fields read better as a full-width strip above the content.

```tsx
import {
  DetailPage, DetailPageHeader, DetailPageMetaBar, DetailPageMetaItem,
} from "@/components/ui/detail-page"

<DetailPage>
  <DetailPageHeader title="pandahrms.com" subtitle="Domain" />
  <DetailPageMetaBar>
    <DetailPageMetaItem label="Registrar" value="Third Party" />
    <DetailPageMetaItem label="Age" value="1/3/25" />
    <DetailPageMetaItem label="Nameservers" value="Third Party" copyable />
  </DetailPageMetaBar>
  {/* DetailPageContent ... */}
</DetailPage>
```

`DetailPageMetaItem` is layout-aware: the **same** component renders with dividers and vertical padding inside `DetailPageSidebar`, and as a borderless cell inside `DetailPageMetaBar` (spacing comes from the bar's flex gap, `gap-x-10 gap-y-4`). No prop change is needed — the bar provides the layout via context. The bar wraps to multiple rows on narrow screens.

### Props

Extends `HTMLAttributes<HTMLDivElement>` — accepts `className`, `style`, etc. Root carries `data-slot="detail-page-meta-bar"`. Put `DetailPageMetaItem` children inside it.

## DetailPageSection

A non-carded content region with a bold title, an optional muted description, and an optional action on the right. Use it to break the main content column into labeled regions with clear type hierarchy — the title/description pattern seen on Vercel-style detail pages — without wrapping every region in a `Card`.

```tsx
import {
  DetailPage, DetailPageHeader, DetailPageContent, DetailPageSection,
} from "@/components/ui/detail-page"

<DetailPage>
  <DetailPageHeader title="pandahrms.com" subtitle="Domain" />
  <DetailPageContent>
    <DetailPageSection
      title="Connected Projects"
      description="Subdomains connected to projects on this team."
      action={<Button size="sm" variant="outline">Connect</Button>}
    >
      {/* section body — list rows, table, etc. */}
    </DetailPageSection>

    <DetailPageSection
      title="DNS Records"
      description="DNS records point to services your domain uses."
    >
      {/* ... */}
    </DetailPageSection>
  </DetailPageContent>
</DetailPage>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Section title (rendered `text-lg` semibold) |
| `description` | `ReactNode` | — | Optional muted one-line description under the title |
| `action` | `ReactNode` | — | Optional action element on the right (e.g. a `Button`) |
| `children` | `ReactNode` | — | Section body |

Extends `HTMLAttributes<HTMLDivElement>` — accepts `className`, `style`, etc. The title renders in Inter (`var(--font-sans)`), not Comfortaa — `DetailPageSection` is not the `PageHeader`, so the heading-font policy keeps it in the body face.

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

## DetailPageSidebarGroup

Wraps one or more `DetailPageSidebarSection`s under an uppercase group heading. Use it to label and visually separate clusters of sections once the sidebar grows long (e.g. State / Ownership / Dates). Groups separate with whitespace; the last section inside a group drops its divider, and the first section sits flush under the heading.

```tsx
import {
  DetailPageSidebar, DetailPageSidebarGroup, DetailPageSidebarSection,
} from "@/components/ui/detail-page"

<DetailPageSidebar>
  <DetailPageSidebarGroup label="State">
    <DetailPageSidebarSection label="Status">In progress</DetailPageSidebarSection>
    <DetailPageSidebarSection label="Dev status">Ready for release</DetailPageSidebarSection>
  </DetailPageSidebarGroup>

  <DetailPageSidebarGroup label="Ownership">
    <DetailPageSidebarSection label="Support owner">Ahmad Razif</DetailPageSidebarSection>
    <DetailPageSidebarSection label="Reporter">Siti Aminah</DetailPageSidebarSection>
  </DetailPageSidebarGroup>
</DetailPageSidebar>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Group heading text (rendered uppercase, muted) |
| `children` | `ReactNode` | — | The `DetailPageSidebarSection`s in this group |

Extends `HTMLAttributes<HTMLDivElement>` — accepts `className`, `style`, etc. The heading reuses the same `text-muted-foreground` token as the section label, so it inherits the established sidebar contrast and renders in Inter (heading-font policy).
