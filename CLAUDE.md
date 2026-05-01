# pandawork-ui

Monorepo containing the shared shadcn/ui component registry and demo showcase for Pandahrms frontend projects. Components are plain React + shadcn/ui that can be consumed by any React frontend project.

## Project Structure

```
pandawork-ui/
  apps/
    demo/              # Vite showcase app (imports directly from registry)
  packages/
    registry/          # Component source files + shadcn build
      registry/
        default/       # Component source files (single source of truth)
      src/
        lib/utils.ts   # shadcn cn() utility
        hooks/         # Shared hooks
      registry.json    # shadcn registry config
      components.json  # shadcn component config
  public/
    r/                 # Built registry JSON output (committed to git)
    llms.txt           # Component index + decision guide + changelog (read this first)
    docs/              # Detailed API docs per component/category (read on demand)
      button.md        # Complex components get dedicated files
      forms.md         # Simple components grouped by category
      ...
```

## Commands

```bash
pnpm dev                     # Start demo dev server
pnpm build                   # Build registry + demo
pnpm registry:build          # Build registry JSON output to public/r/
pnpm lint                    # Lint demo app
```

## How It Works

The demo app imports components directly from the registry package via Vite aliases:
- `@/components/ui/*` resolves to `packages/registry/registry/default/*`
- `@/lib/utils` resolves to `packages/registry/src/lib/utils`
- `@/hooks/*` resolves to `packages/registry/src/hooks/*`

Changes to registry components are immediately reflected in the demo -- no `npx shadcn add` step needed.

## Changelogs

**Every change must be recorded in both changelogs before committing.**

- `CHANGELOG.md` -- human-readable, follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format
- `public/llms.txt` -- contains a "Changelog" section at the bottom with machine-readable per-component entries (`change`, `breaking`, `details`, `action` steps) for AI agents consuming this registry

When committing, update both files under a dated heading for today (e.g., `## 2026-04-08`). A commit is considered a release — do not use `[Unreleased]`.

## Adding a Component

1. Create component in `packages/registry/registry/default/<component>/<component>.tsx`
2. Add barrel `index.ts` exporting from the component file
3. Add entry to `packages/registry/registry.json` items array
4. Run `pnpm registry:build`
5. Add a demo page in `apps/demo/src/showcase/demos/<component>-demo.tsx`
6. Add API docs to the appropriate file in `public/docs/` (dedicated file for complex components, category file for simple ones)
7. Add a catalog entry in `public/llms.txt`
8. Update changelogs (`CHANGELOG.md` and the Changelog section in `public/llms.txt`)
9. Commit everything including `public/r/` output

## Modifying a Component

1. Edit the source file in `packages/registry/registry/default/<component>/`
2. Run `pnpm registry:build`
3. Verify in demo (`pnpm dev`)
4. Update the component's doc file in `public/docs/` if API changed
5. Update changelogs
6. Commit both the source and the rebuilt `public/r/` output

## Consuming

### Where files land

All components in this registry install to `src/components/pandaworks-ui/` regardless of the consumer's `aliases.ui` setting. The destination is baked into the registry output by [packages/registry/scripts/rewrite-pandaworks-namespace.mjs](packages/registry/scripts/rewrite-pandaworks-namespace.mjs), which runs after `shadcn build` and:

1. Sets an explicit `target: "components/pandaworks-ui/<filename>"` on every file so shadcn doesn't fall back to `aliases.ui`.
2. Switches each file's `type` from `registry:ui` to `registry:component` so shadcn respects `target`.
3. Rewrites `@/components/ui/*` → `@/components/pandaworks-ui/*` inside file content so cross-component imports resolve to siblings in the new folder. Imports of `@/lib/utils` and `@/hooks/*` are left alone — those still resolve via the consumer's standard aliases.

The result for consumers: their existing `aliases.ui = "@/components/ui"` (and any other shadcn components under it) stays untouched. Pandaworks components live in a clearly-owned sibling folder. Re-running `_all` only rewrites `components/pandaworks-ui/`, so consumer-local forks of standard shadcn components survive.

### Single component

```bash
pnpm dlx shadcn@latest add https://raw.githubusercontent.com/pandaworks-software-plt/pandaworks-ui/main/public/r/<component>.json
```

Lands at `src/components/pandaworks-ui/<name>.tsx`. No `components.json` changes required.

### Whole registry

Install or refresh everything via the `_all` meta-component (auto-regenerated on every `pnpm registry:build`, so its dependency list always mirrors the current registry):

```bash
pnpm dlx shadcn@latest add https://raw.githubusercontent.com/pandaworks-software-plt/pandaworks-ui/main/public/r/_all.json --overwrite
```

Use this for first-time install of every component, or as a "I don't know what changed upstream, just sync me to latest" upgrade path. Drop `--overwrite` to be prompted per file. The `_all.ts` marker file it places at `src/components/pandaworks-ui/_all.ts` has no runtime behavior — delete it after install if you want.

The `_all` entry is generated by [packages/registry/scripts/sync-all-meta.mjs](packages/registry/scripts/sync-all-meta.mjs) before `shadcn build`. Adding, renaming, or removing components in `registry.json` requires no manual update to `_all`.

## Button Action Presets

For standard user actions, use the `action` prop on `Button` instead of manually specifying icons and variants. The `action` prop auto-resolves the correct icon, variant, and label.

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

### Additional Button Props

- **`icon`** -- Custom icon override (any Lucide icon or ElementType)
- **`tooltip`** -- Tooltip text (auto-shown for icon-only sizes; uses preset label as fallback)
- **`loading`** -- Shows a spinner, disables the button

### Button Sizing (SaaS consistency)

Pick `size` by the surrounding density, not by preference. The same scenario should always use the same size across the app.

| Scenario | Size |
|----------|------|
| `PageHeader` actions, page-level toolbar | `default` |
| Modal / Dialog / Sheet footer | `default` |
| Form submit / cancel | `default` |
| `Card` header action (top-right) | `default` |
| Inline action inside a `Table` row | `sm` |
| Inline action inside a list item / dense `Card` row | `sm` |
| Filter bars / dense toolbars above a table | `sm` |
| Marketing or landing-page hero CTA | `lg` |
| Empty-state primary action (large illustration) | `lg` |
| Onboarding / single-purpose full-screen step | `lg` |

Icon-only sizes track the text variants — `icon` with `default` rows, `icon-sm` with `sm` rows (e.g. table row icon actions), `icon-lg` only in hero contexts.

Rules of thumb:
- `default` is the SaaS default — when in doubt, use it.
- Drop to `sm` only inside a density context (table row, list item, filter bar). Don't shrink page-header buttons.
- `lg` is rarely correct inside the product. Reserve for marketing surfaces and empty states. CRUD screens should not use `lg`.
- Don't mix sizes in the same row of buttons (e.g. Save + Cancel must share a size).

## Standards

- Style: default
- Tailwind: v4 (OKLCH color space)
- CSS variables: enabled
- Base color: zinc
- Icons: Lucide
- No `"use client"` directives -- this is not a Next.js project
- No `import * as React from "react"` -- use named imports only (e.g. `import { forwardRef, type MouseEventHandler } from "react"`). With React 19's JSX transform, the namespace import is unnecessary.

## Showcase Purity Rules

There are three demo apps under `apps/demo/src/`:

- `showcase/` — per-component gallery. Each demo imports straight from `@/components/ui/*`. No local wrappers.
- `saas/` — narrative SaaS demo (kept for reference). Allowed to ship custom components and non-token styling so we have a "real-world consumer" example.
- `pure/` — **strict-purity SaaS demo.** Diagnostic harness that mirrors `saas/` view-by-view but is built only from registry components. Used to surface gaps in the registry.

`pure/` rules — enforce in code review, no exceptions:

1. **No custom UI components.** Every interactive or visual element must come from `@/components/ui/*`. Wrappers, lookalike spans, and bespoke `<div>` chips/pills/avatars are forbidden — even if "they're just one line."
2. **No hardcoded Tailwind palette colors.** No `bg-emerald-500`, `text-rose-700`, `border-amber-300`, etc. Only design tokens: `primary`, `secondary`, `muted`, `accent`, `destructive`, `foreground`, `background`, `border`, `ring`, `card`, `popover`. If you need a status color and the token doesn't exist, **stop and add the variant to the registry component** — don't paint over it locally.
3. **No inline `style={{ ... }}` on registry components** to override colors, sizes, or backgrounds. Layout-only styles (`width: <computed%>` for a chart bar) are OK and should be reviewed case-by-case.
4. **No `className` overrides that change the component's identity.** Sizing tweaks (`size-8`, `h-1.5`) are fine; `className="rounded-full bg-secondary"` on a registry Badge to fake a new variant is not — that's a missing variant, file it as a gap.
5. **Reuse the `saas/` data layer.** `pure/` should import `store`, `router`, `types`, `data` from `../saas/`. Pure-showcase is about the *view layer*, not about reinventing state.
6. **When you can't build a screen purely, log the gap.** Append to `docs/REGISTRY-GAPS.md` with file, line, what you wanted, and what the registry would need. Then make the smallest faithful approximation and `// REGISTRY-GAP:` comment the spot. Surfacing gaps is the deliverable; quietly working around them defeats the purpose.

When auditing whether a `pure/` change passes:
```bash
# These should all return zero matches inside apps/demo/src/pure/
grep -rE "bg-(emerald|rose|amber|sky|blue|red|green|purple|violet|orange|cyan|pink|indigo|fuchsia|lime|teal|slate|zinc-[0-9]|stone-[0-9]|gray-[0-9]|neutral-[0-9])-[0-9]" apps/demo/src/pure/
grep -rE "style=\{\{[^}]*background|style=\{\{[^}]*color" apps/demo/src/pure/
```

## Post-Commit Cleanup

After every commit, discard any untracked `.png` files in the repo root (these are Playwright screenshots used for visual checks during development and must never be committed). Run `git clean -f -- '*.png'` (or remove them individually) so the working tree stays clean.
