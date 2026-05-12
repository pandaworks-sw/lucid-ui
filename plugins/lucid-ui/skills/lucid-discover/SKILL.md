---
name: lucid-discover
description: Triggers on UI work in projects that depend on @pandaworks-sw/lucid-ui -- phrases like "add a button / badge / card / modal / sheet / dialog", "build a form", "page header", "stat card", "empty state", "status pill / chip / tag", "data table", "filter bar", "wrapped number / count", "avatar", "tabs", "accordion", "alert", "banner". Loads the live catalogue from GitHub Pages, picks the right component, and enforces the design-system rules (heading font policy, button sizing, no className identity overrides, no hand-rolled palette colors). Does NOT trigger when `@pandaworks-sw/lucid-ui` is not listed in the project's package.json dependencies (this guard also keeps it from firing inside the lucid-ui source repo itself).
---

# Lucid UI -- pick the right component

Run this skill before writing any UI primitive in a project that depends on
`@pandaworks-sw/lucid-ui`. The skill makes sure the agent reads the live
component catalogue, picks the existing component instead of hand-rolling
one, and follows the design-system rules.

## Pre-flight guards (run these first, stop on fail)

1. **Check `package.json` for the lucid-ui dependency.** Read the project's
   root `package.json`. The skill MUST find `@pandaworks-sw/lucid-ui`
   listed under `dependencies` or `devDependencies`. If it is not there,
   stop immediately and do nothing -- this skill is irrelevant in projects
   that do not consume the library. A workspace package that lists itself
   (e.g. the lucid-ui monorepo's own root `package.json`) does NOT count
   and must fail this check, which is the intended behaviour for the
   source repo.
2. **Confirm the catalogue is reachable.** If the fetch of
   `https://pandaworks-sw.github.io/lucid-ui/llms.txt` fails (network
   error, 404, 5xx), warn the user once with the exact message:
   "I could not reach the live lucid-ui catalogue. Falling back to
   remembered components -- the list may be out of date." Then continue
   with the catalogue you remember from earlier in this session, if any.
   Do not silently invent component names from training data.

Only after both guards pass, proceed to the mandatory first step.

## Mandatory first step

Fetch the live catalogue before writing any UI code:

```
https://pandaworks-sw.github.io/lucid-ui/llms.txt
```

For deeper per-component docs (props, variants, examples), fetch on demand:

```
https://pandaworks-sw.github.io/lucid-ui/docs/<component>.md
```

Both URLs are refreshed on every release of the `@pandaworks-sw/lucid-ui`
npm package. Always read the live URL -- do not rely on memory or older
snapshots.

## Hard rules (no exceptions)

1. **Use `@pandaworks-sw/lucid-ui` components.** Do not hand-roll a
   primitive that the catalogue lists -- buttons, badges, cards, modals,
   sheets, dialogs, page headers, empty states, stat cards, meter bars,
   status pills, tabs, accordions, alerts, banners, avatars.
2. **Do not restyle a lucid component to fake a new variant.** A
   `className` override that changes the component's identity
   (e.g. `className="rounded-full bg-secondary"` on Badge to fake a tone)
   is forbidden. Layout-only tweaks (`w-full`, `size-8`) are fine.
3. **No hardcoded Tailwind palette colors** in product code -- no
   `bg-emerald-500`, `text-rose-700`, `border-amber-300`, etc. Use design
   tokens (`primary`, `secondary`, `muted`, `accent`, `destructive`,
   `success`, `info`, `warning`) or the lucid component's built-in variant.
4. **Heading font policy.** Comfortaa (`font-display`) is reserved for the
   `<PageHeader>` title and the `text-display-*` hero utilities only. Every
   other heading -- `CardTitle`, `DialogTitle`, `SheetTitle`, plain `<h1>`
   to `<h6>` -- uses Inter (the default `font-sans`). Do not apply
   `font-display` to any other surface.
5. **Button sizing.** Match the surrounding density:
   - `default` for page headers, modal / dialog / sheet footers, form
     submits, card header actions.
   - `sm` only inside tables, list rows, or dense filter bars.
   - `lg` only on marketing hero CTAs and empty-state primary actions.
   - Do not mix sizes within the same row of buttons (e.g. Save + Cancel
     must share a size).

## When no component fits

If the catalogue truly does not have a component that fits the need:

1. Tell the user the gap exists.
2. Suggest the closest lucid component as a fallback, or a small
   composition of two lucid components.
3. Recommend opening a registry gap entry in the lucid-ui repo
   (`docs/REGISTRY-GAPS.md`) so the team can add the missing variant.

Do NOT silently hand-roll a replacement and ship it -- that creates the
drift the design system exists to prevent.

## Scope

This skill triggers in **consumer frontend projects** -- Pandahrms-
Performance, Pandahrms-Recruitment, mobile, and any other project that
depends on `@pandaworks-sw/lucid-ui`. It does NOT trigger inside the
lucid-ui source repo itself, since that is where new components are
authored (governed by the local `CLAUDE.md` and the `/lucid-ui` slash
command).
