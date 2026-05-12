---
name: lucid-refactor
description: Manually invoked as `/lucid-refactor <page-file-path-or-URL>` to refactor a page (and the subcomponents it renders) by swapping local components (project-local registries, vendored UI folders, custom wrappers, shadcn primitives) AND hand-rolled patterns (status pill spans, ad-hoc empty states, hand-rolled meter bars, list rows, stat cards, etc.) to equivalent components from `@pandaworks-sw/lucid-ui`. Always expands audit scope to feature subcomponents the page renders. Reads the live catalogue from GitHub Pages, inventories the dependency tree, plans clean swaps, auto-replaces hand-rolled patterns with documented lucid equivalents, applies them, and validates via lint + tsc + Playwright. NEVER overrides or restyles a lucid-ui component (consistency rule). True edge cases (className visual overrides on lucid components, missing variants, specialized layouts) are surfaced to the user as questions -- the skill never works around them silently. Does NOT auto-trigger -- only on the slash command. Does NOT trigger when `@pandaworks-sw/lucid-ui` is not listed in the project's package.json dependencies.
---

# Lucid UI -- refactor a page to use lucid components

Manually invoked: `/lucid-refactor <page-file-path-or-URL>`

Examples:

- `/lucid-refactor src/routes/360-forms/index.lazy.tsx`
- `/lucid-refactor src/features/my-actions/components/MyActionsList.tsx`
- `/lucid-refactor http://localhost:3000/some-route/page` (URL -- map it to the route file and proceed)

## Pre-flight guard (run this first, stop on fail)

Read the project's root `package.json`. The skill MUST find
`@pandaworks-sw/lucid-ui` listed under `dependencies` or
`devDependencies`. If it is not there, stop immediately and tell the user
the skill only runs in projects that consume the lucid-ui library. A
workspace package that lists itself (the lucid-ui monorepo's own root
`package.json`) does NOT count and must fail this check, which is the
intended behaviour for the source repo.

For changes inside the lucid-ui registry itself, use the user-global
`/lucid-ui` slash command instead -- that is a separate skill that lives
in `~/.claude/skills/` and edits the lucid-ui repo directly.

## Inputs

- `$1` -- page file path (relative to project root) OR a `http://localhost:<port>/...`
  URL. Examples: `src/routes/360-forms/index.lazy.tsx`,
  `src/features/my-actions/components/MyActionsList.tsx`,
  `http://localhost:3000/performanceV2/recommendations?stageType=YearEnd`.

If `$1` is a URL, map it to the corresponding router file (TanStack Router,
React Router, Next.js, etc. -- detect from the project's setup) and proceed
without asking. If `$1` is a file path that does not exist, ask the user
via AskUserQuestion for a valid path and stop.

## Audit scope (always)

**The skill always audits the page file PLUS the feature subcomponents the
page renders.** Do not ask the user whether to expand scope -- expand by
default. The page file alone is rarely the whole UI surface; status pills,
filter bars, tables, modals, and form controls usually live in feature
folders, and that is where most legacy primitives and hand-rolled patterns
hide.

Specifically in scope:

- The target page file
- Every feature subcomponent it renders, transitively (e.g.
  `EditableRecommendationsTable` -> `EditableTableRow` -> `EditableTableHeader`
  -> modals)
- Any project-local wrappers under feature folders (e.g.
  `src/features/<domain>/components/`) that contain UI primitives

Specifically NOT in scope (common project rules -- check the project's own
`CLAUDE.md` for exact paths):

- Project-local UI registries (often `src/components/ui/`) -- usually owned
  by a separate effort. NEVER edit unless the project's CLAUDE.md says you
  may.
- Vendored copies of the lucid registry (often
  `src/components/pandaworks-ui/`) -- overwritten on resync. NEVER edit.
- Auto-generated API client types (often `src/lib/api-client/types.ts`).

## Hand-rolled patterns (auto-replace, no user decision)

When you see one of the patterns below in any in-scope file, **replace it
with its lucid equivalent automatically** -- these are documented in the
lucid changelog as the canonical replacement, so they are not edge cases
requiring a user prompt.

| Hand-rolled pattern | Lucid equivalent |
|---|---|
| Inline status pill: `<span className="bg-{tone}/10 text-{tone} ...">` | `<Badge variant="success\|warning\|info\|muted\|destructive">` |
| `<Badge variant="outline" className="bg-{tone}/10 text-{tone} ...">` (className override re-creating a tone) | `<Badge variant="success\|warning\|info">` (drop className) |
| Centered empty block: `<div className="flex flex-col items-center gap-3 py-16 ...">` with icon + title + optional description | `<EmptyState icon={...} title="..." description="..." action={...} />` |
| Hand-rolled tone-aware meter bar: `<div className="h-X bg-muted"><div className="h-full bg-{tone}" style={{ width }}>` | `<MeterRow value={pct} tone="success\|warning\|info\|destructive" size="sm\|default\|lg" />` (omit `label` for bare bars) |
| Hand-rolled row primitive: `<div className="flex items-center gap-3 ...">` with leading + title + subtitle + trailing | `<ListRow leading={...} title={...} subtitle={...} trailing={...} />` |
| Hand-rolled stat tile: `<Card>` with custom delta chip + animated number | `<StatCard icon={...} label="..." value={N} delta={...} deltaTone="up\|down\|flat" />` |
| `<DropdownMenuItem className="text-destructive focus:text-destructive">` | `<DropdownMenuItem variant="destructive">` |
| Multi-cell metric `<Card>` with divider grid | `<MultiStatCard items={[...]} />` |

If a hand-rolled pattern matches one of these rows, do NOT ask -- replace
it. Mention the swap in the inventory and summary.

If the hand-rolled pattern is more specialized (sticky-column tables,
custom layouts that do not match any single lucid component, hand-rolled
banners that do not fit `Alert` variants), then it IS an edge case --
surface to the user per Step 4.

## The consistency rule (hard)

**Never override, restyle, or wrap a lucid-ui component to change its
appearance or behavior.** Lucid is the shared visual standard; local
overrides break consistency across the suite.

Forbidden in this skill:

- Adding `className` props that change visual tokens (color, spacing,
  border, radius, shadow, typography). Layout-only utilities (`mt-4`,
  `flex-1`, `w-full`) on a parent wrapper are fine.
- Wrapping a lucid component in a local file solely to add a variant the
  registry does not ship.
- Reaching into a lucid component's children to restyle subparts.
- Replacing the lucid component's icons, padding, or sizes via Tailwind
  overrides.

If the page genuinely needs something the registry does not ship, **stop
and ask the user** (see Step 4 -- Edge cases). Do NOT silently work around
it.

## Workflow

### Step 1 -- Read context

Read the following BEFORE touching any code:

1. **The target page file** (`$1`, or the route file mapped from a URL).
2. **Every feature subcomponent the page renders, transitively.** Walk the
   import graph: page -> feature components -> their child components ->
   modals / popovers. Stop the walk at the project's local UI registry, the
   vendored lucid copy (if any), `lucide-react`, `sonner`, `@tanstack/*`,
   and the lucid package itself -- those are not in scope. Use grep to spot
   legacy primitives and confirm what is already on lucid (look for imports
   from `@/components/ui`, `@/components/pandaworks-ui`, or whatever local
   UI paths the project uses, and from `@pandaworks-sw/lucid-ui`).
3. **Lucid catalogue** -- fetch the live copy:
   `https://pandaworks-sw.github.io/lucid-ui/llms.txt` (Component Catalogue
   section + Changelog at the bottom). The Changelog is authoritative for
   "replace hand-rolled X with Y" guidance. For deeper per-component docs,
   fetch on demand: `https://pandaworks-sw.github.io/lucid-ui/docs/<component>.md`.
   If the fetch fails, warn the user once with the exact message
   "I could not reach the live lucid-ui catalogue. Falling back to
   remembered components -- the list may be out of date." and continue
   with what you remember from earlier in the session.
4. **The local UI files the page (or any in-scope subcomponent) imports
   from** so you understand current behaviour:
   - Project-local UI registry (often `src/components/ui/`) -- read for
     context, never edit.
   - Vendored lucid copy (often `src/components/pandaworks-ui/`) -- being
     phased out. These imports may fail to resolve as the directory is
     removed.
   - Any custom wrapper files the page imports.
5. **If the input was a URL**, navigate to it via Playwright MCP first so
   you debug what the user sees, not what you guess.
6. **One nearby already-migrated reference** for patterns. Find a file in
   the same project that already imports from `@pandaworks-sw/lucid-ui`
   and use it as a style reference for imports, prop names, and structure.

### Step 2 -- Inventory

Build a table covering every UI component AND every hand-rolled UI pattern
across the in-scope file set (page + transitive feature subcomponents).
For each, record:

- File + line range (e.g. `EditableTableRow.tsx:33-42`)
- What it is (component import, raw HTML element pattern, hand-rolled span
  or div with tone classes, etc.)
- Source (lucid / project-local UI registry / vendored lucid copy /
  hand-rolled inline / project-local feature wrapper)
- Which props / variants / className tokens are in use

Show this inventory in the response so the user can sanity-check it. The
inventory is required even when the page itself is already on lucid -- most
legacy primitives hide one level deeper.

### Step 3 -- Plan swaps

For each inventoried item, classify into exactly one bucket:

| Bucket | Meaning | Action |
|---|---|---|
| `swap` | Exact lucid-ui equivalent with matching props | Apply directly. |
| `swap-with-prop-rename` | Equivalent exists, prop names differ (e.g. `variant` -> `tone`) | Apply with rename. Read the doc to confirm the mapping. |
| `auto-replace` | Hand-rolled pattern that matches a row in the "Hand-Rolled Patterns" table above (status pill spans, hand-rolled empty states, hand-rolled meter bars, list rows, stat cards, etc.) | Apply directly. No user prompt needed -- these are documented canonical replacements per the lucid changelog. |
| `keep` | Page-local component that has no lucid equivalent and never will (e.g. domain-specific widget, project-local pagination wrapper that already uses lucid Buttons internally) | Leave as-is, note in summary. |
| `EDGE CASE` | Anything else | STOP. Ask the user. |

`EDGE CASE` covers:

- A lucid component exists but is missing a prop / variant the page needs.
- A `className` visual override on a lucid component (color, spacing,
  border, radius, shadow, typography). Layout-only utilities (`mt-4`,
  `flex-1`, `w-full`) on a parent wrapper are fine and are NOT edge cases.
- A hand-rolled layout that does NOT match any row in the auto-replace
  table (e.g. raw `<table>` with sticky-left columns + grouped colSpan
  headers + rowSpan; hand-rolled banner whose tone does not fit any lucid
  `Alert` variant).
- A vendored component is referenced but no clean lucid mapping exists.

### Step 4 -- Edge cases (surface, never absorb)

Before any edit, surface every `EDGE CASE` to the user via a single
AskUserQuestion call. For each, list:

- The component / pattern + file:line range
- Why it is an edge case (what specifically does not match cleanly)
- The 2-3 options:
  - **a)** Skip this one (leave as-is, refactor the rest)
  - **b)** Ask the user to add / extend the lucid component first via
    the user-global `/lucid-ui` skill and pause this refactor
  - **c)** Accept a documented compromise (only if the user explicitly
    approves it; default is no)

Only proceed past this step once the user has decided on every edge case.

If there are no edge cases (everything is `swap`, `swap-with-prop-rename`,
`auto-replace`, or `keep`), skip the AskUserQuestion call and proceed
straight to Step 5.

### Step 5 -- Apply

Edit the page file AND every in-scope subcomponent that has a swap,
auto-replace, or approved-edge-case action:

- Consolidate lucid imports into a single line per file:
  `import { Badge, Button, Modal, Input } from '@pandaworks-sw/lucid-ui';`
- Replace component usages, including any approved prop renames.
- Replace hand-rolled patterns with their lucid equivalents from the
  auto-replace table.
- Drop any approved className visual overrides.
- Remove now-unused local imports.
- Do NOT touch the project's local UI registry or vendored lucid copy --
  they are out of scope (a separate effort owns the registries).
- Do NOT add new dependencies; the lucid package is already installed
  (the pre-flight guard confirmed it).

If a vendored UI import is present, it MUST be either swapped or surfaced
as an edge case in Step 4 -- those files may no longer exist on disk and
the page will not build otherwise.

### Step 6 -- Verify

Run, in order, and fix any failure before proceeding:

1. `pnpm lint` (use `pnpm lint:fix` only if Biome reports safe-fix
   candidates). If the project uses npm or yarn, swap the command.
2. `pnpm tsc --noEmit` -- catches missed prop renames the linter cannot see.
3. **Playwright validation:**
   - Navigate to the route the page renders. If the file is a sub-component,
     navigate to a route that mounts it. If the project's dev server URL
     is not obvious from the input, ask the user once.
   - Drive the golden path -- click, type, submit, navigate.
   - Check at least one edge case (empty state, dark mode toggle,
     validation, long content).
   - Take a screenshot.
   - Watch the browser console for new warnings or errors introduced by
     the refactor.

If Playwright validation cannot be performed (no UI surface, infra
unavailable, route not reachable), say so explicitly in the summary -- do
NOT silently skip it.

### Step 7 -- Summarize

**Always use this exact section structure** (markdown headings + bullets
and tables as shown). Use markdown link syntax `[filename.tsx](path/to/filename.tsx)`
for every file mention so the user can click through. The user will not
see your tool calls -- this summary is the only durable record of what
changed.

Template:

```markdown
## Summary

**Target:** <URL or file path> -> [<route file name>](<route file path>)

The route file itself was already 100% on `@pandaworks-sw/lucid-ui`. Per
default scope, the audit expanded to subcomponents this page renders.
<-- OR if the route file had swaps too, drop the "already 100%" sentence -->

### Swapped (N files)

- **[<file name>](<file path>)** -- <one-line description of the swap,
  e.g. "AppPagination wrapper -> lucid `Pagination`. Imports consolidated.">
- **[<file name>](<file path>)** -- <description>
- ... one bullet per file edited ...

### Renamed props
<list any `variant -> tone` style changes, or "None.">

### Kept (no clean lucid match)
- <component / pattern> in [<file name>](<file path>) (<why kept>)
- ...
<-- OR "None." -->

### Edge cases resolved
| # | Decision |
|---|----------|
| <short label of edge case> | <user's choice + brief outcome> |
| ... | ... |
<-- OR "None -- no edge cases needed user input." -->

### Verification
- lint OK (`pnpm lint` -- <files checked>, <issues>)
- tsc OK (`pnpm tsc --noEmit` -- exit <N>)
- Playwright OK -- <what was exercised, dark-mode status, console-error count>
  <-- OR explicit note if skipped, with reason -->

### TODOs surfaced
<list anything unfinished, OR "None -- no TODO / FIXME inserted.">

Run `/hermes-commit` next if you want to commit these changes.
```

Required behaviours:

- Always include every section heading even when the contents are "None."
  -- the structure tells the user nothing was missed.
- File mentions inside Swapped / Kept / Edge cases must use markdown link
  syntax with relative paths from the project root.
- Auto-replaced hand-rolled patterns count as Swapped (mention the lucid
  component used).
- Do NOT commit, stage, push, tag, or open a pull request from this skill
  -- close with the `/hermes-commit` line.

## Hard rules

- **Always expand scope to subcomponents.** Do not ask "should I look at
  the subcomponents too?" -- the answer is always yes. The page file is
  rarely the whole UI surface.
- **Always replace hand-rolled patterns that match the auto-replace
  table.** Do not ask the user about status pill spans, hand-rolled empty
  states, hand-rolled meter bars, list rows, stat cards, etc. -- the lucid
  changelog already documents the canonical replacement, so apply it
  directly. User prompts are reserved for true edge cases (className
  overrides on lucid, missing variants, specialized layouts).
- **No overrides.** No `className` visual overrides on lucid components.
  No local wrappers that re-style a lucid primitive. Consistency is the
  whole point of lucid. (When you find one, it IS an edge case -- surface
  to the user.)
- **No silent edge-case workarounds.** If it is not a clean swap and not
  in the auto-replace table, the user decides.
- **Never edit the project's vendored lucid copy** (often
  `src/components/pandaworks-ui/`) -- overwritten on resync.
- **Never edit the project's local UI registry** (often
  `src/components/ui/`) as part of this skill -- a separate effort owns
  those primitives. In-scope edits are the page file + feature
  subcomponents only.
- **Never hand-edit auto-generated files** (often
  `src/lib/api-client/types.ts`).
- **Never invent a lucid component name** -- verify against the live
  catalogue at `https://pandaworks-sw.github.io/lucid-ui/llms.txt` first.
- **Never commit, push, tag, or open a pull request** -- commits go
  through `/hermes-commit`.
- **Always handle dark mode** -- verify in Playwright (global rule).
- **Always use the Step 7 summary template** -- the structure is
  non-negotiable; it is the only durable record of the run.

## Common mistakes

- **Stopping at the page file.** If the route file is already on lucid,
  the legacy primitives almost always live one level deeper in feature
  folders. Always walk the import graph.
- **Asking the user about hand-rolled status pills.** They are in the
  auto-replace table -- just swap them. Asking wastes the user's time.
- **Forgetting to read the catalogue.** The lucid registry evolves; a
  component you remember missing may now exist.
- **Treating `className` overrides as harmless.** A one-off
  `className="text-red-500"` on `<Badge>` defeats the design system.
  Surface it as an edge case.
- **Mass-replacing without inventorying first.** Leads to incomplete swaps
  that compile but render wrong.
- **Editing the registry components.** That is the user-global `/lucid-ui`
  skill's job. This skill only edits the consuming page + feature
  subcomponents.
- **Skipping Playwright.** Lint + tsc cannot catch missing dark-mode
  tokens, layout shift, or visual regressions.
- **Adding a TODO when blocked.** Surface the unresolved work to the user
  instead (global rule).
- **Free-form summary.** Always use the Step 7 template -- section
  headings, markdown links, table for edge cases. Drift is forbidden.
