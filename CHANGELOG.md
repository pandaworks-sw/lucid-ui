# Changelog

All notable changes to this repository are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## 2026-05-01

### Added

- **`useIsCompactDesktop` hook.** New export from `@/hooks/use-mobile` (also re-exported via the app-shell barrel). Returns `true` when the viewport is in the 768–1023px range. AppShell uses it internally for responsive sidebar auto-collapse; consumers can use it for parallel responsive logic.
- **`getInitialName` utility + `AvatarFallback` auto-converts full names.** New helper [packages/registry/src/lib/get-initial-name.ts](packages/registry/src/lib/get-initial-name.ts) exported from `@pandaworks-sw/ui` (and from the registry's internal `@/lib` alias). Pass any string — including a full name — to `<AvatarFallback>` and it now renders a 2-character monogram automatically: `"John Doe" → "JD"`, `"Devi Marasinghe" → "DM"` (first + last), `"Eli" → "EL"` (first 2 chars of single-word names). Already-short strings like `"JD"` or `"+3"` pass through unchanged. Callers that previously hand-wrote a `getInitials` helper (e.g. `app-shell.tsx`) can drop it and pass `user.name` directly.
- **Demo registry alias `@/lib` is now a folder alias.** [apps/demo/vite.config.ts](apps/demo/vite.config.ts) replaces the file-specific `@/lib/utils` alias with a folder-level `@/lib` alias pointing at `packages/registry/src/lib/`. Existing `import { cn } from '@/lib/utils'` still resolves; new `import { cn, getInitialName } from '@/lib'` is the preferred form for registry source files.

### Changed

- **`AvatarFallback` colorize default flipped to `true` (BREAKING for consumers relying on the previous gray default).** The `colorize` prop on [packages/registry/registry/default/avatar/avatar.tsx](packages/registry/registry/default/avatar/avatar.tsx) now defaults to `true`, so `<AvatarFallback>John Doe</AvatarFallback>` renders a deterministically colored monogram out of the box. Pass `colorize={false}` to opt back into the muted (`bg-muted`) look — useful for `+N` overflow tiles, system placeholders, and other non-name fallbacks. The `+N` overflow tile inside [packages/registry/registry/default/avatar-group/avatar-group.tsx](packages/registry/registry/default/avatar-group/avatar-group.tsx) is updated to set `colorize={false}` so it keeps its neutral background.
  - **Migration:** if you previously relied on the default gray fallback for arbitrary text content, add `colorize={false}` to those `AvatarFallback` instances. Name-based avatars need no change.

### Fixed

- **AppShell: handle small screens (mobile view).** Three mobile/compact-viewport UX bugs in [packages/registry/registry/default/app-shell/app-shell.tsx](packages/registry/registry/default/app-shell/app-shell.tsx):
  1. **Mobile Sheet sidebar didn't auto-close on navigation.** When a user opened the sidebar Sheet on mobile and tapped a nav link, branding link, or a user-action link, the Sheet stayed open and the route changed underneath it — forcing the user to dismiss it manually. Each link now calls `setOpenMobile(false)` on click via a small `useMobileAutoClose` hook (no-op on desktop).
  2. **Header content could overflow on narrow viewports.** The flex children inside the navbar lacked `min-w-0` / `shrink-0`, so a wide consumer `header` (e.g. a search input with long placeholder text) wrapped or pushed `navbarActions` off-screen instead of shrinking. The header wrapper, the header content slot, the sidebar trigger, the separator, and the navbar-actions slot now have explicit `min-w-0` / `shrink-0` so consumer content shrinks gracefully.
  3. **Sidebar didn't auto-collapse at compact desktop widths (768–1023px).** The full 18rem sidebar squeezed the navbar at tablet sizes (e.g. search input was truncated to "Searc…" at 768px). AppShell now controls `SidebarProvider`'s `open` state via the new `useIsCompactDesktop` hook — the sidebar collapses to icon mode automatically inside the compact range and expands again past 1024px. Mobile (<768px) keeps using the Sheet variant.

### Added

- **Package now ships its own design-token stylesheet at `@pandaworks-sw/ui/styles.css`.** New file [packages/registry/src/styles.css](packages/registry/src/styles.css) is the single source of truth for the `:root` / `.dark` token blocks, the `@theme inline` mapping (Tailwind v4 utility generation), the base layer, the `text-display-*` / `text-mono-*` typography utilities, and the `bg-pattern-*` background utilities. [packages/registry/tsup.config.ts](packages/registry/tsup.config.ts) copies it into `dist/styles.css` via an `onSuccess` hook, and [packages/registry/package.json](packages/registry/package.json) adds an `"./styles.css": "./dist/styles.css"` subpath export. Consumers now wire up Tailwind v4 + tokens with one import — no more copying `apps/demo/src/index.css` by hand:
  ```css
  @import "tailwindcss";
  @import "@pandaworks-sw/ui/styles.css";
  @source "../node_modules/@pandaworks-sw/ui";
  ```
  The demo's [apps/demo/src/index.css](apps/demo/src/index.css) was slimmed to import from the package source so demo and package can never drift. [README.md](README.md), [CLAUDE.md](CLAUDE.md), and [public/llms.txt](public/llms.txt) updated with the new wiring instructions

### Removed

- **Unused build output, scripts, and configs.** With the npm package on GitHub Packages now the only distribution channel, the project drops the legacy build artefacts that produced a separate JSON-based component output. Existing apps still vendoring `src/components/lucid/` should migrate by adding `@pandaworks-sw/ui`, running a codemod to rewrite `from '@/components/lucid/<name>'` → `from '@pandaworks-sw/ui'`, and deleting `src/components/lucid/`. Files removed:
  - `public/r/` — entire directory of 61 generated component JSONs
  - `packages/registry/registry.json` and the per-workspace `components.json` files
  - `packages/registry/scripts/rewrite-lucid-namespace.mjs` and `packages/registry/scripts/sync-all-meta.mjs`
  - `packages/registry/registry/default/_all/` — `_all` meta-component (no runtime export)
  - `apps/demo/src/components/install-command.tsx` — demo widget that emitted a copy-paste install command
- Configs updated:
  - root `package.json` — drop `registry:build` script; `build` now runs `@pandaworks-sw/ui build:lib && @pandaworks-sw/demo build`
  - `packages/registry/package.json` — drop `registry:build` script and the `shadcn` devDep; `build` now just runs `tsup`
  - `biome.json` — drop the `!public/r` and `!packages/registry/public/r` ignore entries
  - `.github/workflows/deploy.yml` — drop `public/r` from the Pages-artifact `cp -R`
  - `apps/demo/src/showcase/component-page.tsx` — drop `<InstallCommand />` and the `installName` prop
  - `apps/demo/src/showcase/showcase-app.tsx` — drop the `installName=` arg passed to `<ComponentPage>`
  - `CLAUDE.md` and `README.md` — strip the legacy distribution-channel framing and the `pnpm registry:build` command

### Changed

- **npm package scope: `@lucid/ui` → `@pandaworks-sw/ui`; distribution moved to GitHub Packages.** GitHub Packages requires the npm scope to match the GitHub org owning the repo, so the package was renamed and the repo is moving from `pandaworks-software-plt/lucid-ui` to `pandaworks-sw/lucid-ui`. The demo workspace was renamed from `@lucid/demo` to `@pandaworks-sw/demo` for consistency. `packages/registry/package.json` adds `publishConfig.registry: "https://npm.pkg.github.com"`. New release workflow at [.github/workflows/publish.yml](.github/workflows/publish.yml) publishes the package on every GitHub Release. Consumers must add an `.npmrc` with `@pandaworks-sw:registry=https://npm.pkg.github.com` and a `GITHUB_TOKEN` (PAT with `read:packages`) before `pnpm install`; full setup in [README.md](README.md#installation)
- **Rebrand: Pandaworks UI → Lucid UI.** The npm package was renamed from `@pandaworks-ui/components` to `@lucid/ui` and the demo workspace from `@pandaworks-ui/demo` to `@lucid/demo`. The GitHub repo was renamed from `pandaworks-software-plt/pandaworks-ui` to `pandaworks-software-plt/lucid-ui` (GitHub auto-redirects old URLs). Brand text in the demo (saas-app banner, AI integration prompt, llms.txt header, README) updated accordingly. Internal-only library — no external consumers affected. Older entries in this changelog reference the previous `pandaworks-ui` / `@pandaworks-ui` names; those are kept as historical record

### Added

- npm-package distribution -- the registry now publishes as `@pandaworks-ui/components` (renamed from the previous private `@pandaworks-ui/registry` workspace package). Consumers can `pnpm add @pandaworks-ui/components` and `import { Button, Badge, … } from "@pandaworks-ui/components"`. Build pipeline: new [packages/registry/src/index.ts](packages/registry/src/index.ts) barrel re-exports all 59 component folders + hooks + `cn`; [packages/registry/tsup.config.ts](packages/registry/tsup.config.ts) emits ESM + `.d.ts` to `packages/registry/dist/` (185 KB ESM, 56 KB types, tree-shakeable, `sideEffects: false`); peer deps `react >=19`, `react-dom >=19`, `lucide-react >=0.500`, `react-hook-form >=7`, `tailwindcss >=4`

### Fixed

- Tooling -- removed deprecated `baseUrl` from [packages/registry/tsconfig.json](packages/registry/tsconfig.json) and [apps/demo/tsconfig.app.json](apps/demo/tsconfig.app.json). TypeScript 6.0 flags `baseUrl` as deprecated and 7.0 will drop it entirely; the `paths` entries in both files use relative paths that already resolve against the `tsconfig.json` location, so `baseUrl` was redundant. No build or import behavior changes -- `pnpm -F demo exec tsc --noEmit` still passes clean

### Added

- Demo showcase -- new "Use with AI" view ([apps/demo/src/showcase/ai-integration-view.tsx](apps/demo/src/showcase/ai-integration-view.tsx)) with a one-click copyable prompt that points AI coding agents (Claude Code, Cursor, Copilot, etc.) at `https://pandaworks-software-plt.github.io/pandaworks-ui/llms.txt` as the catalog and tells them how to install and use the npm package. Surfaced as a prominent "Use with AI" card at the top of the showcase sidebar, above the existing SaaS-showcase link

### Fixed

- `EmptyState` -- `EmptyStateProps` now uses `Omit<HTMLAttributes<HTMLDivElement>, "title">` to drop the conflicting HTML `title` attribute. Without this, TypeScript flagged that `title: ReactNode` (the component's prop) was incompatible with the inherited `title?: string`. Demo builds (and the GitHub Pages deploy job) failed with `TS2430` until this was fixed
- `ListRow` -- same `title` collision via the spread on lines 84 and 104. The `rest as ButtonProps` / `rest as DivProps` casts were widening the rest object back to include `title: ReactNode` from `SharedListRowProps`, which then conflicted with the HTML `title?: string` on the underlying `<button>` / `<div>`. The casts now use `Omit<…, keyof SharedListRowProps>` so the spread no longer carries `title`. Same `TS2322` deploy-time failure as above
- `SplitButton` -- new `brand` variant (mirrors `Button`'s `brand`: `bg-brand text-brand-foreground shadow-xs hover:shadow-sm`) plus matching `dividerClasses` entry (`border-l border-brand-foreground/20`). The pure-showcase Projects page already used `<SplitButton variant="brand">` for the "New project" CTA but the variant didn't exist yet, causing `TS2322` in CI

### Changed

- `StatCard` -- now ships at a single SaaS-density size (no `size` prop). Tight `px-4` padding, `text-xs` label, `size-3.5` icon, and a `text-xl` headline number replace the previous `text-3xl` headline, which ate too much screen estate inside real dashboards. **Visual breaking change** — existing `<StatCard … />` usage continues to compile but renders smaller. Audit pages that use it; very sparse grids may need tighter gaps (`gap-4` → `gap-3`) or more tiles to compensate

### Added

- `AvatarFallback` -- new optional `colorize` boolean prop. When set, the background color is derived from the first character of the fallback text (A–Z mapped to 26 evenly spaced OKLCH hues; digits and other characters fall back to a deterministic hash). Foreground is set to white and is readable in both light and dark mode. Default behavior (without `colorize`) is unchanged: `bg-muted` with the inherited foreground
- Demo -- new `/pure-showcase` route alongside `/saas-showcase`. Pure-showcase is a strict-purity rebuild of the SaaS demo using only registry components (no custom UI, no hardcoded palette colors, no inline color overrides). v1 covers Workspace and Projects; remaining tabs link to `/saas-showcase` until the P0 registry gaps are closed
- `docs/REGISTRY-GAPS.md` -- diagnostic report of registry gaps surfaced by pure-showcase: Badge missing semantic-tone variants (P0), Avatar missing square shape and AvatarGroup primitive (P0), recurring patterns to promote (`EmptyState`, `StatCard`, `MeterRow`, `ListRow`), plus `DropdownMenuItem` destructive variant and `CodeLabel` non-copyable mode
- CLAUDE.md -- "Showcase Purity Rules" section codifying the rebuild constraints and the audit grep commands for `apps/demo/src/pure/`
- `Button` sizing guidance (docs only) -- `public/docs/button.md` and CLAUDE.md gain a "Sizing guidance (SaaS consistency)" section that maps scenarios to sizes: `default` for page headers / modal footers / form actions / card-header actions, `sm` for table-row inline actions / list items / filter bars, `lg` reserved for marketing-style hero CTAs, empty states, and onboarding (not used inside CRUD screens). Icon-only sizes track the text variants. No code changes
- `Badge` -- four new semantic-tone variants (`success`, `warning`, `info`, `muted`) keyed off existing `--success` / `--info` / `--warning` / `--muted` tokens, plus an optional `dot` prop that renders a leading status dot tinted to match the variant. Closes G1 in `docs/REGISTRY-GAPS.md`
- `Avatar` -- new `shape` prop (`"circle"` (default) or `"square"`) for entity tiles like project keys; the rounded class propagates into `AvatarFallback` via `rounded-[inherit]` so square avatars stay square while images load. Closes G2
- `AvatarGroup` -- new component that horizontally stacks `Avatar` children with negative spacing, ring against the page background, and a `+N` overflow tile when `max` is exceeded. Inherits per-Avatar `shape`. Sizes: `xs` / `sm` / `md` / `lg`. Closes G3
- `EmptyState` -- new component for filtered tables/lists and "no results" panels with `icon`, `title`, `description`, and `action` slots. Three sizes (`sm` / `md` / `lg`). Closes G4
- `StatCard` -- new component composing `Card` + `AnimatedNumber` + `Badge` for dashboard stat tiles. Props: `icon`, `label`, `value`, `suffix`, `hint`, `delta`, `deltaTone` (`"up"` / `"down"` / `"flat"`). Closes G5
- `DropdownMenuItem` -- new `variant` prop (`"default"` / `"destructive"`); destructive items get red text, red icon, and a tinted destructive focus background. Replaces the `className="text-destructive focus:text-destructive"` workaround. Closes G9
- `CodeLabel` -- new `copyable` boolean prop (default `true`); pass `copyable={false}` for a static inline code chip with no copy affordance. Closes G8
- `MeterRow` -- new component for labeled horizontal bars: label slot (string or Badge node), optional `valueLabel` trailing meta, per-row `tone` (`default` / `success` / `warning` / `info` / `destructive` / `muted`), and three sizes (`sm` / `default` / `lg`). Closes G6
- `ListRow` -- new layout primitive for `leading + title + subtitle + trailing` rows. Renders as a div by default; pass `asButton` for keyboard-accessible interactive rows with focus ring. Density (`sm` / `default` / `lg`) and surface (`plain` / `bordered` / `muted`) variants. Closes G7
- Pure-showcase is now feature-complete -- all six top-level routes (Workspace, Projects, Project detail, Team, Reports, Settings) rebuilt without custom UI components or hardcoded palette colors
- Per-component sizing tables (docs only) -- "Sizing" / "Density" / "Surface" sections added to `Toggle` and `ToggleGroup` ([navigation.md](public/docs/navigation.md)), `EmptyState` ([layout.md](public/docs/layout.md)), `CodeLabel`, `AvatarGroup`, `MeterRow`, `ListRow` ([data-display.md](public/docs/data-display.md)), and `SelectableCard` ([forms.md](public/docs/forms.md)). Each maps real scenarios (table row, filter bar, dashboard card, hero, onboarding) to the right size/density/surface key
- `public/docs/decision-guide.md` -- new top-level decision guide for **variant / tone / surface choices**: Avatar shape (human → `circle`, non-human entity → `square`), Badge tones with `dot` rule, Alert variants, MeterRow tones, ListRow surface, Tabs variant (line vs pill), StatCard `deltaTone`, Modal vs Dialog vs Sheet, text-input choice (Input / Textarea / SearchInput / CodeLabel), dropdown choice (Select vs SelectPicker), date-control choice, boolean / multi-choice rules (Switch vs Checkbox vs RadioGroup vs SelectableCard), AttachmentInput dropzone vs compact, dashboard tile choice (StatCard vs MeterRow vs ListRow vs Card), **the registry's fixed elevation ladder** with a note that `Card` has no `elevation` prop (fixed at `shadow-xs` by design), DropdownMenuItem variant, and labelled vs icon-only Buttons. Linked from the Decision Guide section in `public/llms.txt`

### Fixed

- `Table` -- when nested inside `CardContent`, the table's wrapper drops its own border, rounded corners, `bg-card`, and shadow so the surrounding card frame is the only visual boundary (no more "card within a card"). Standalone `Table` usage is unchanged. `CardContent` now exposes `data-slot="card-content"` to make the nesting detectable
- `AttachmentInput`, `Button`, `SplitButton`, `PaginationEllipsis`, `BreadcrumbEllipsis` -- each now sets `position: relative` on its root so any nested `sr-only` element (which Tailwind renders as `position: absolute`) is contained within the component. Without this, those `sr-only` spans/inputs fell through every ancestor and anchored to the initial containing block (the viewport), stretching the document height and letting pages scroll past the bottom into empty space. `Button` gets the fix at the base (`buttonVariants` / `splitButtonVariants`) so consumers that nest their own `<span className="sr-only">` inside a button (e.g. `FilterButton`, `SidebarTrigger`) inherit the containment automatically

## 2026-04-23

### Added

- Demo -- SaaS-style integrated showcase at `/saas-showcase` (dashboard, projects, tasks, team, reports, settings, command palette, confirm flows) backed by an in-memory demo store
- `pnpm test:ui-audit` -- Playwright script (`scripts/ui-audit-playwright.mjs`) that serves the demo and writes baseline screenshots to `artifacts/playwright-ui-audit/`
- `public/docs/ui-visual-review-checklist.md` -- manual UI review checklist for registry and demo work

### Fixed

- `Tooltip` (`TooltipContent`) -- render through Radix `Portal` so labels escape scrollable or `overflow`/`transform` ancestors (matches `Popover` and avoids clipped or missing tooltips in the shell and demo layouts)

### Changed

- `Stepper` -- compact `size-7` markers and smaller typography; completed steps and completed track segments use emerald instead of primary; current step uses primary border with a subtle ring; optional `orientation="vertical"` for a top-down layout with a left spine; horizontal layout keeps equal `flex-1` segments before, between, and after step indicators; step `description` and `tooltip` popover only show while that step is current; track segments animate a left-to-right (horizontal) or top-to-bottom (vertical) “fill” via `transform`, respecting `prefers-reduced-motion`
- `CodeLabel` -- visual style shifted from outlined to a softer filled background; copy control is hidden by default and smoothly expands/reveals on hover/focus, appears on touch/press for mobile, and remains visible briefly after copy feedback
- `Sheet` (`SheetContent`) -- floating panel styling: viewport inset (`0.75rem`), `rounded-2xl`, stronger shadow, subtle ring, and scroll containment for long content
- `Sheet` -- removed Tailwind `animate-in` / `animate-out` / slide / fade classes on overlay and content (instant show and hide)
- `Button` -- brand, destructive, outline, and secondary variants use lighter elevation (`shadow-xs` / `hover:shadow-sm`) instead of multi-layer custom box shadows
- `Dialog` -- overlay uses `bg-black/50` with a light backdrop blur; content uses `border-border` and `shadow-md`
- `Command` -- root panel adds `border`, `shadow-md`, and Tailwind v4 descendant variants for `cmdk` group headings
- `DropdownMenu`, `Select` -- `border-border`, `min-w-32`, normalized shadows; disabled and placeholder states use `data-disabled` / `data-placeholder` attribute selectors; Select popper sizing uses Tailwind v4 arbitrary `h-(--radix-…)` / `min-w-(--radix-…)` forms
- `Popover` -- explicit `border-border` on content
- `AppShell` -- switched to inset sidebar variant for blended shell styling; inset content container now uses `rounded-3xl` with subtle border layering for a softer frame
- SaaS demo shell (`/saas-showcase`) -- dark radial background depth refined so the page backdrop is darkest, with content surfaces layered above
- Demo theme (`apps/demo/src/index.css`) -- slightly tinted card and popover surfaces; dark mode background and surface layering refined for depth
- Demo theme radius token (`apps/demo/src/index.css`) -- increased global `--radius` from `0.375rem` to `0.75rem` to make default component corners rounder
- Showcase -- richer `Form` demo examples; sidebar entry for the SaaS showcase; small copy and demo tweaks (`PageHeader`, `Sheet` demos)
- Root `package.json` -- dev dependency on Playwright for the UI audit script; demo ESLint config aligned with `typescript-eslint`

## 2026-04-08

### Added

- `DetailPageSidebarSection` sub-component -- GitHub-style sidebar section with header (label + action slot) and free-form children
- `brand` button variant -- blue primary button with inset shadow styling for key actions (create, save)

### Changed

- Merged `pandahrms-ui-registry` and `pandahrms-ui-demo` into `pandaworks-ui` monorepo
- Demo app imports components directly from the registry package (no copy-paste step required)
- GitHub Pages base path changed from `/pandahrms-ui-demo/` to `/pandaworks-ui/`
- `default` button variant reverted to standard shadcn/ui style (`bg-primary shadow-xs hover:bg-primary/90`)
- `create` and `save` action presets now use `brand` variant instead of `default`

## 2026-04-03

### Added

- Barrel `index.ts` exports for 19 components (avatar, badge, button, calendar, card, checkbox, collapsible, command, dialog, dropdown-menu, input, label, popover, separator, sheet, sidebar, toggle, tooltip, app-shell-types)
- `useCopyToClipboard` hook in `src/hooks/`
- `data-slot` attributes across 24 components for better DOM identification

### Changed

- Sonner decoupled from `next-themes` -- no longer requires ThemeProvider, improved type safety and accessibility
- Standardized all component string literals to double quotes
- Improved type safety, reuse, and accessibility across animated-number, app-shell, attachment-input, code-label, date-range-picker, detail-page, filter-bar, pagination, select-picker
- `useMobile` hook updated to use named imports

### Removed

- `pnpm-lock.yaml` from tracking (added to `.gitignore`)
- Unused dev dependencies cleaned up

## 2026-03-31

### Added

- Button `action` prop with 12 presets: create, edit, save, delete, cancel, view, export, import, archive, duplicate, print, link
- Button `icon` prop for custom icon override (any Lucide icon or ElementType)
- Button `tooltip` prop with auto-tooltip for icon-only sizes
- Button `loading` prop with spinner and auto-disable

### Changed

- AlertDialog buttons now use `Button` via `asChild` instead of raw `buttonVariants`

### Removed

- **`action-button` component** -- all 15 files removed (action-button-base, confirmable-action-button, create-button, edit-button, save-button, delete-button, cancel-button, view-button, export-button, import-button, archive-button, duplicate-button, print-button, link-button, and barrel export). Replaced by Button `action` prop.
