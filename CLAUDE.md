# lucid-ui

Monorepo containing the shared component library and demo showcase for Pandahrms frontend projects. Components are plain React + shadcn-style primitives, distributed as the `@pandaworks-sw/lucid-ui` npm package on GitHub Packages.

## Project Structure

```
lucid-ui/
  apps/
    demo/              # Vite showcase app (imports directly from registry)
  packages/
    registry/          # Component source files + npm-package build
      registry/
        default/       # Component source files (single source of truth)
      src/
        index.ts       # npm-package barrel — re-exports everything
        lib/utils.ts   # cn() utility
        hooks/         # Shared hooks
      tsup.config.ts   # ESM + DTS build config for the npm package
  public/
    llms.txt           # Component index + decision guide + changelog (read this first)
    docs/              # Detailed API docs per component/category (read on demand)
      button.md        # Complex components get dedicated files
      forms.md         # Simple components grouped by category
      ...
```

## Commands

```bash
pnpm dev                                    # Start demo dev server
pnpm build                                  # Build npm package + demo
pnpm --filter @pandaworks-sw/lucid-ui build:lib   # Build the npm-package output to packages/registry/dist/
pnpm lint                                   # Lint demo app
```

## Distribution

Component sources in `packages/registry/registry/default/` are packaged and published as **`@pandaworks-sw/lucid-ui`** to **GitHub Packages** (not the public npm registry). Consumers configure an `.npmrc` for the `@pandaworks-sw` scope (see [README.md](README.md) for the exact config + `GITHUB_TOKEN` setup), then `pnpm add @pandaworks-sw/lucid-ui` and `import { Button, Badge } from "@pandaworks-sw/lucid-ui"`.

**Release flow (auto)**: bump `version` in [packages/registry/package.json](packages/registry/package.json), update [CHANGELOG.md](CHANGELOG.md) under today's `## YYYY-MM-DD` heading, then push to `main`. [.github/workflows/release.yml](.github/workflows/release.yml) detects the new version (no existing `v{version}` tag), creates the tag, opens a GitHub Release using the latest dated CHANGELOG section as the body, and publishes the npm tarball to GH Packages. Pushes that don't change the version are no-ops. Manual republishes still work via [.github/workflows/publish.yml](.github/workflows/publish.yml)'s `workflow_dispatch`.

## How It Works

The demo app imports components directly from the registry package via Vite aliases:
- `@/components/ui/*` resolves to `packages/registry/registry/default/*`
- `@/lib/utils` resolves to `packages/registry/src/lib/utils`
- `@/hooks/*` resolves to `packages/registry/src/hooks/*`

Changes to source components are immediately reflected in the demo — no build step needed in dev.

## Changelogs

**Every change must be recorded in both changelogs before committing.**

- `CHANGELOG.md` -- human-readable, follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format
- `public/llms.txt` -- contains a "Changelog" section at the bottom with machine-readable per-component entries (`change`, `breaking`, `details`, `action` steps) for AI agents consuming this library

When committing, update both files under a dated heading for today (e.g., `## 2026-04-08`). A commit is considered a release — do not use `[Unreleased]`.

## Adding a Component

1. Create component in `packages/registry/registry/default/<component>/<component>.tsx`
2. Add barrel `index.ts` exporting from the component file
3. Add an `export * from '../registry/default/<component>'` line to `packages/registry/src/index.ts` (npm-package barrel) — keep alphabetical
4. Run `pnpm --filter @pandaworks-sw/lucid-ui build:lib` to verify the package still builds
5. Add a demo page in `apps/demo/src/showcase/demos/<component>-demo.tsx`
6. Add API docs to the appropriate file in `public/docs/` (dedicated file for complex components, category file for simple ones)
7. Add a catalog entry in `public/llms.txt`
8. Update changelogs (`CHANGELOG.md` and the Changelog section in `public/llms.txt`)
9. Commit. (`packages/registry/dist/` is a build artifact and is `.gitignore`d — only the published npm tarball ships it)

## Modifying a Component

1. Edit the source file in `packages/registry/registry/default/<component>/`
2. Run `pnpm --filter @pandaworks-sw/lucid-ui build:lib` to verify the package still builds
3. Verify in demo (`pnpm dev`)
4. Update the component's doc file in `public/docs/` if API changed
5. Update changelogs
6. Commit

## Consuming

The package lives on **GitHub Packages**, not the public npm registry. The consumer needs an `.npmrc` that maps the `@pandaworks-sw` scope to GitHub's registry, and a `GITHUB_TOKEN` env var with the `read:packages` scope. See [README.md](README.md#installation) for the full setup.

```bash
# After .npmrc is in place:
pnpm add @pandaworks-sw/lucid-ui
```

Then import directly:

```tsx
import { Button, Badge, Modal, StatCard } from '@pandaworks-sw/lucid-ui';
```

Required peer dependencies: `react >=19`, `react-dom >=19`, `lucide-react >=0.500`, `react-hook-form >=7`, `tailwindcss >=4`. The package ships its own design-token stylesheet at `@pandaworks-sw/lucid-ui/styles.css` — consumers wire it up in their entry CSS:

```css
@import "tailwindcss";
@import "@pandaworks-sw/lucid-ui/styles.css";

@source "../node_modules/@pandaworks-sw/lucid-ui";
```

`styles.css` contains the `:root` / `.dark` token blocks, the `@theme inline` mapping, the base layer, the `text-display-*` / `text-mono-*` utilities, and the `bg-pattern-*` utilities. The `@source` line lets Tailwind v4 see class names used inside the package's compiled JSX. Fonts (Inter, Comfortaa, JetBrains Mono) must be loaded by the consumer — see `apps/demo/index.html` for the Google Fonts `<link>` tags. The single source of truth for these tokens is [packages/registry/src/styles.css](packages/registry/src/styles.css); the demo imports the same file via [apps/demo/src/index.css](apps/demo/src/index.css).

Customizations must land upstream in this repo — you cannot fork a single component locally. If a component needs a behavior or variant it doesn't have, open a PR against lucid-ui or wrap the component in a project-local component that lives outside `@pandaworks-sw/lucid-ui`'s exports.

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

## Heading Font Policy (strict)

Comfortaa (`var(--font-display)`, Tailwind `font-display`) is reserved for **two surfaces only**:

1. The `<PageHeader>` component title — already wired internally; do not re-apply.
2. The `text-display-sm/md/lg/xl` hero/marketing utilities.

**Every other heading and text surface in the app renders in Inter (`var(--font-sans)`).** This includes `CardTitle`, `DialogTitle`, `SheetTitle`, `AccordionTrigger`, sidebar section labels, table headers, and every bare `<h1>`–`<h6>` in user-authored content.

[packages/registry/src/styles.css](packages/registry/src/styles.css) ships an explicit `h1, h2, h3, h4, h5, h6 { font-family: var(--font-sans) }` reset in `@layer base` so consumers get the policy by default.

Rules when adding or modifying components in this repo:

- **DO NOT** add a global `h1, h2, h3, h4, h5, h6 { font-family: var(--font-display) }` rule anywhere in `styles.css` or component CSS. The reset is intentional — re-introducing the global rule reverts the brand-face restriction across the entire app.
- **DO NOT** apply `font-display` (or `text-display-*`) inside `CardTitle`, `DialogTitle`, `SheetTitle`, `ModalHeader`, `SheetHeader`, `DialogHeader`, sidebar section labels, table header cells, or any internal `<h{n}>` of a non-PageHeader component. Those surfaces are deliberately Inter.
- **DO** opt a single element into Comfortaa with `className="font-display"` (or a `text-display-*` utility) only when the component is genuinely a hero/marketing surface or the lone `PageHeader` title.
- When auditing whether a change is safe, grep both this repo and consumer projects for `font-family.*var\(--font-display\)` on raw `h[1-6]` selectors — there should be **zero** matches outside the `PageHeader` component and the `text-display-*` `@utility` blocks.

## Accessibility — Core WCAG 2.1 / 2.2 Contrast Rules

Every component variant must clear these contrast minimums in **both light and dark modes** before it can ship. Treat this as a release gate, not a nice-to-have.

### Required ratios

| WCAG SC | Surface | Ratio (AA) | Ratio (AAA) |
|---|---|---|---|
| 1.4.3 Contrast (Minimum) | Normal text — body, labels, table cells, **all Badge text (`text-xs` 11px is normal text, NOT large)** | **4.5:1** | 7:1 |
| 1.4.3 Contrast (Minimum) | Large text — ≥18pt regular OR ≥14pt bold (≈ 24px regular / 18.66px bold) | **3:1** | 4.5:1 |
| 1.4.11 Non-text Contrast | Interactive UI component states & boundaries (input border, button outline, focus ring, checkbox, radio outline) vs adjacent color | **3:1** | — |
| 1.4.11 Non-text Contrast | Graphical objects required to understand content (chart bars, status icons, meter fills) | **3:1** | — |

`text-xs` ≈ 11px ≈ 8.25pt. The "large text" exception starts at 14pt bold (≈ 18.66px). Badge text **never** qualifies as large.

### Patterns that always fail — don't ship them

1. **Same chroma for bg AND text** (`bg-success/10 text-success`). A mid-luminance hex over a near-white tint of itself can never reach 4.5:1.
2. **Reusing chroma for both light and dark**. A red dark enough to clear 4.5:1 white-on-it (e.g. `#a8392a`) is too dark to use as `text-X` over a dark-mode bg. Foreground text needs **theme-specific** values.
3. **White text on the original `--danger` (`#c8543f`)**. Measures 4.38:1 — under AA. Use `--destructive-aa` (`#a8392a`, 6.3:1) for solid red controls.

> Note on Card/panel boundaries: the current Card uses `border-border/70` which sits below SC 1.4.11's 3:1 against the page bg. This is an accepted decorative gap — the card's contents (typography, internal contrast) carry the grouping, and a darker compliant border was deemed too visually heavy. If a project requires strict compliance, opt into a darker border locally rather than re-skinning the registry.

### Tokens already provisioned for AA — use these

Defined in [packages/registry/src/styles.css](packages/registry/src/styles.css), light + dark:

| Token | Purpose |
|---|---|
| `--success-soft-fg`, `--info-soft-fg`, `--warning-soft-fg`, `--destructive-soft-fg` | Text on tinted (`bg-X/10`, `bg-X/15`) backgrounds. Light-mode values are darker than `--X`; dark-mode values are lighter. |
| `--destructive-aa` | Solid red bg for controls with white text. Use INSTEAD of `--destructive` when the surface is a button/badge/banner with white-on-red text. |

The chroma tokens (`--success`, `--info`, `--warning`, `--danger`, `--destructive`, `--border`) are intentionally untouched — they remain available for non-text fills (meter bars, dots, chart fills) where 4.5:1 doesn't apply.

### Workflow — when adding or modifying a component

1. Compute contrast for every `variant × theme` pair before opening a PR. Use Stark, Figma's plugin, the WebAIM checker, or a quick local sRGB → relative-luminance script.
2. If the component has tinted-bg text, reach for the `--*-soft-fg` tokens first; only add new tokens if those don't fit.
3. If the component has solid red + white text, use `--destructive-aa`, not `--destructive`.
4. Don't ship a variant that fails AA in either theme. If a brand color literally cannot pass, the right answer is to introduce a paired AA-safe foreground/background token, not to lower the bar.
5. Document the contrast pass in the changelog entry (both `CHANGELOG.md` and `public/llms.txt`) — record measured ratios for any newly introduced color.

References: [WCAG 2.2 SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [WCAG 2.2 SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

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

## Playwright Screenshots

All Playwright screenshots **must** be saved into `.playwright/screenshot/` at the repo root. Always pass an absolute or repo-relative path under that folder when calling `mcp__playwright__browser_take_screenshot` (e.g. `filename: ".playwright/screenshot/<name>.png"`). Never let screenshots land in the repo root, `apps/`, `packages/`, or anywhere else.

The `.playwright/` folder is gitignored — screenshots are local-only diagnostics and must never be committed.

## Post-Commit Cleanup

After every commit, discard any stray untracked `.png` files outside `.playwright/screenshot/` (these are leftover Playwright screenshots from before the rule above and must never be committed). Run `git clean -f -- '*.png'` in the repo root (or remove them individually) so the working tree stays clean. The `.playwright/` folder itself is gitignored and does not need cleanup.
