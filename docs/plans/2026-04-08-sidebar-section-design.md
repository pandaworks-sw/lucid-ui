# DetailPageSidebarSection — Design

**Date:** 2026-04-08
**Scope:** Enhance `DetailPageSidebar` with a new `DetailPageSidebarSection` sub-component

## Problem

The current sidebar uses `DetailPageMetaItem` — compact label/value pairs suited for metadata. GitHub-style detail pages use a richer section pattern: bold header with an action icon (gear), free-form content below, and dividers between sections. The existing MetaItem can't express this.

## Solution

Add `DetailPageSidebarSection` to `detail-page.tsx` — a section with a header row (label + optional action slot) and children slot for content.

### API

```tsx
interface DetailPageSidebarSectionProps extends HTMLAttributes<HTMLDivElement> {
  label: string        // Section header (e.g. "Assignees")
  action?: ReactNode   // Optional action in header row (icon button, dropdown trigger)
}
```

Children are a free-form ReactNode.

### Visual structure

```
┌─────────────────────────────┐
│ Label                    ⚙  │  header: bold label + action
│ Content (children)          │  ReactNode children
├─────────────────────────────┤  divider (hidden on last)
│ Label                    ⚙  │
│ Content                     │
└─────────────────────────────┘
```

### Styling

- Container: `py-4 first:pt-0 last:border-b-0 border-b`
- Header: `flex items-center justify-between`
- Label: `text-sm font-semibold`
- Action: rendered as-is
- Children wrapper: `mt-1.5 text-sm text-muted-foreground`

### Coexistence with MetaItem

`DetailPageMetaItem` is kept unchanged. Both can be used in the same sidebar — `SidebarSection` for rich sections, `MetaItem` for compact key-value pairs.

## Changes

1. **detail-page.tsx** — Add `DetailPageSidebarSection` component + export
2. **detail-page-demo.tsx** — Add a new demo section showing GitHub-style sidebar
3. **registry.json** — No change (same file, new export)
4. **public/r/** — Rebuild registry output
5. **public/docs/** — Update detail-page docs
6. **Changelogs** — Update both CHANGELOG.md and public/llms.txt
