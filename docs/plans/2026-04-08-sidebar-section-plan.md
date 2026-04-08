# DetailPageSidebarSection Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a `DetailPageSidebarSection` sub-component to the existing DetailPage — a GitHub-style section with header (label + action slot), free-form children, and dividers.

**Architecture:** New component added to the existing `detail-page.tsx` file. Composable sub-component following the same `forwardRef` + `data-slot` pattern as all other DetailPage sub-components. No new files — just a new export from the same module.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, forwardRef pattern

---

### Task 1: Add DetailPageSidebarSection component

**Files:**
- Modify: `packages/registry/registry/default/detail-page/detail-page.tsx`

**Step 1: Add the interface and component**

Insert before the `/* -------------------------------- Exports --------------------------------- */` section comment:

```tsx
/* ----------------------------- Sidebar Section ----------------------------- */

interface DetailPageSidebarSectionProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  action?: ReactNode
}

const DetailPageSidebarSection = forwardRef<
  HTMLDivElement,
  DetailPageSidebarSectionProps
>(({ className, label, action, children, ...props }, ref) => (
  <div
    data-slot="detail-page-sidebar-section"
    ref={ref}
    className={cn(
      "border-b py-4 first:pt-0 last:border-b-0",
      className
    )}
    {...props}
  >
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold">{label}</h3>
      {action && (
        <div className="shrink-0 text-muted-foreground">{action}</div>
      )}
    </div>
    {children && (
      <div className="mt-1.5 text-sm text-muted-foreground">{children}</div>
    )}
  </div>
))
DetailPageSidebarSection.displayName = "DetailPageSidebarSection"
```

**Step 2: Add to exports**

Update the export block to include the new component and type:

```tsx
export {
  DetailPage,
  DetailPageHeader,
  DetailPageMain,
  DetailPageContent,
  DetailPageSidebar,
  DetailPageMetaItem,
  DetailPageSidebarSection,
}
export type { DetailPageHeaderProps, DetailPageMetaItemProps, DetailPageSidebarSectionProps }
```

**Step 3: Update the barrel export**

Check `packages/registry/registry/default/detail-page/index.ts` and ensure `DetailPageSidebarSection` and `DetailPageSidebarSectionProps` are re-exported (should be automatic if it does `export * from`).

---

### Task 2: Add demo for the new sidebar section

**Files:**
- Modify: `apps/demo/src/showcase/demos/detail-page-demo.tsx`

**Step 1: Add a new demo section**

Add a third `<DemoSection>` at the end of the `DetailPageDemo` component (after the "Minimal (no sidebar)" section) showing a GitHub-issue-style sidebar. Use `Settings` icon from lucide-react for the gear action.

```tsx
import { Building2, AlertCircle, Settings } from "lucide-react";
```

New demo section:

```tsx
<DemoSection title="Sidebar sections (GitHub-style)">
  <DetailPage>
    <DetailPageHeader
      backHref="#"
      backLabel="Issues"
      title="Add sidebar section component"
      subtitle="#42"
    />
    <DetailPageMain>
      <DetailPageContent>
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The detail page sidebar should support a section pattern
              with header labels, action icons, and free-form content.
            </p>
          </CardContent>
        </Card>
      </DetailPageContent>
      <DetailPageSidebar>
        <DetailPageSidebarSection
          label="Assignees"
          action={<button className="rounded-md p-1 hover:bg-accent"><Settings className="size-4" /></button>}
        >
          <p>No one – <a href="#" className="text-primary hover:underline">Assign yourself</a></p>
        </DetailPageSidebarSection>
        <DetailPageSidebarSection
          label="Labels"
          action={<button className="rounded-md p-1 hover:bg-accent"><Settings className="size-4" /></button>}
        >
          <p>No labels</p>
        </DetailPageSidebarSection>
        <DetailPageSidebarSection label="Type">
          <p>No type</p>
        </DetailPageSidebarSection>
        <DetailPageSidebarSection label="Projects">
          <p>No projects</p>
        </DetailPageSidebarSection>
        <DetailPageSidebarSection label="Milestone">
          <p>No milestone</p>
        </DetailPageSidebarSection>
        <DetailPageSidebarSection label="Relationships">
          <p>None yet</p>
        </DetailPageSidebarSection>
      </DetailPageSidebar>
    </DetailPageMain>
  </DetailPage>
</DemoSection>
```

**Step 2: Add the import**

Add `DetailPageSidebarSection` to the existing detail-page import block.

---

### Task 3: Verify in dev server

**Step 1: Start dev server**

Run: `cd /Users/kyson/Developer/pandaworks/pandawork-ui && pnpm dev`

**Step 2: Navigate to the detail-page demo page and verify:**
- The new "Sidebar sections" demo renders correctly
- Sections have bold labels, gear icons on the right, content below
- Dividers between sections, no bottom border on the last one
- Dark mode works correctly
- Existing demos are unaffected

---

### Task 4: Build registry output

**Step 1: Build**

Run: `cd /Users/kyson/Developer/pandaworks/pandawork-ui && pnpm registry:build`

**Step 2: Verify** the built output at `public/r/detail-page.json` includes the new `DetailPageSidebarSection` export.

---

### Task 5: Update documentation

**Files:**
- Modify: `public/docs/detail-page.md`

**Step 1: Add SidebarSection docs**

Append to the end of `public/docs/detail-page.md`:

````markdown

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
````

---

### Task 6: Update changelogs

**Files:**
- Modify: `CHANGELOG.md`
- Modify: `public/llms.txt`

**Step 1: Update CHANGELOG.md**

Add under `## [Unreleased]` → `### Added`:

```markdown
- `DetailPageSidebarSection` sub-component -- GitHub-style sidebar section with header (label + action slot) and free-form children
```

**Step 2: Update public/llms.txt**

Add under `### [Unreleased]`:

```markdown
#### detail-page

- change: modified
- breaking: no
- details: Added `DetailPageSidebarSection` sub-component. A sidebar section with header row (label + optional action slot) and free-form children. Inspired by GitHub issue detail sidebar pattern.
- action:
  - Run `npx shadcn@latest add @pandaworks/detail-page --overwrite --yes` to update
  - No code changes required. Existing `DetailPageMetaItem` usage is unaffected.
  - New `DetailPageSidebarSection` is available for use alongside or instead of `DetailPageMetaItem`
```
