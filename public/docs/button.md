# Button

A button with action presets, icon support, auto-tooltips, and loading state. Replaces the old `ActionButton` component.

Variants: `default`, `brand`, `secondary`, `outline`, `destructive`, `ghost`, `link`
Sizes: `default`, `sm`, `lg`, `icon`, `icon-sm`, `icon-lg`

Props:
- `variant` -- Visual style variant
- `size` -- Size of the button
- `asChild` -- Render as child element (Radix Slot)
- `action` -- Action preset that auto-resolves icon, variant, and label (see table below)
- `icon` -- Custom icon override (any Lucide icon or ElementType). Overrides the action preset icon
- `tooltip` -- Tooltip text. Auto-shown for icon-only sizes; falls back to preset label
- `loading` -- Shows a Loader2 spinner, disables the button

Action presets (use `action` prop instead of manually setting icon + variant):

| Action | Icon | Default Variant | Auto-Label |
|--------|------|-----------------|------------|
| `create` | Plus | brand | Create |
| `edit` | Pencil | outline | Edit |
| `save` | Save | brand | Save |
| `delete` | Trash2 | destructive | Delete |
| `cancel` | X | outline | Cancel |
| `view` | Eye | ghost | View |
| `export` | Download | outline | Export |
| `import` | Upload | outline | Import |
| `archive` | Archive | secondary | Archive |
| `duplicate` | Copy | outline | Duplicate |
| `print` | Printer | outline | Print |
| `link` | ExternalLink | ghost | Link |

Resolution order:
- **Variant**: explicit `variant` prop > action preset variant > `"default"`
- **Icon**: `loading` spinner > explicit `icon` prop > action preset icon > none
- **Children**: explicit children > action preset label (only for non-icon sizes)

```tsx
import { Button } from "@/components/ui/button"

// Action preset (auto icon + variant + label)
<Button action="create" onClick={handleCreate} />

// Icon-only with auto-tooltip
<Button action="edit" size="icon" onClick={handleEdit} />

// Custom icon on a preset
<Button action="create" icon={FilePlus}>New Template</Button>

// Override variant
<Button action="delete" variant="outline">Remove</Button>

// Loading state
<Button action="save" loading={isSaving} onClick={handleSave} />

// Standalone icon + tooltip (no action preset)
<Button icon={Settings} size="icon" tooltip="Settings" />

// Plain usage (no preset)
<Button variant="outline" size="sm">Cancel</Button>
```

Sizing guidance (SaaS consistency)

Pick `size` by the surrounding density, not by personal preference. Within a single Pandahrms app the same scenario should always use the same size.

| Scenario | Size |
|----------|------|
| `PageHeader` actions, page-level toolbar | `default` |
| Modal / Dialog / Sheet footer actions | `default` |
| Form submit / cancel buttons | `default` |
| Card header action (top-right of a `Card`) | `default` |
| Inline action inside a `Table` row | `sm` |
| Inline action inside a list item / dense `Card` row | `sm` |
| Filter bars and dense toolbars above a table | `sm` |
| Inline `Badge`-adjacent action | `sm` |
| Marketing or landing-page hero CTA | `lg` |
| Empty-state primary action (large illustration + headline) | `lg` |
| Onboarding / single-purpose full-screen step | `lg` |

Icon-only sizes track the text variants — pair `icon` with `default` rows, `icon-sm` with `sm` rows (e.g. row actions in a table), `icon-lg` only in hero contexts.

Rules of thumb:
- **`default` is the SaaS default.** If you're not sure, use `default`.
- **Drop to `sm` only inside a density context** (table row, list item, filter bar). Don't sprinkle `sm` on a page header just because the button "looks big."
- **`lg` is rarely correct inside the product.** Reserve it for marketing surfaces and empty states. CRUD screens should not use `lg`.
- **Don't mix sizes in the same row of buttons.** A `<Button action="save">` and `<Button action="cancel">` next to each other must share a size.

Confirmation dialogs: Button does not include built-in confirmation. Wrap with `AlertDialog` for destructive actions:

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button action="delete" />
  </AlertDialogTrigger>
  {/* AlertDialogContent... */}
</AlertDialog>
```

Dependencies: tooltip
