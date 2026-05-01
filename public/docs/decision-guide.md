# Decision Guide: Variants, Tones, and Surfaces

Pick **the same component for the same scenario, every time.** This guide answers "which variant?", not "which component?" — see [llms.txt](../llms.txt) for the component catalog.

The rule of thumb: if you can't decide, look up the scenario here. If your scenario isn't listed, it probably matches the closest entry — don't invent a new variant locally.

---

## Avatar shape

| Subject | Shape |
|---------|-------|
| A **person** (employee, user, assignee, commenter, "created by") | `circle` (default) |
| A **non-human entity** (project, organization, team, workspace, app, file, integration, repo, environment) | `square` |

Rationale: people are circles by SaaS convention; squares signal "this is an object, not a person." `AvatarGroup` follows the same rule per child — a group of people stays circle, a group of project tiles stays square.

```tsx
// Person
<Avatar><AvatarFallback colorize>AR</AvatarFallback></Avatar>

// Project / org / workspace
<Avatar shape="square"><AvatarFallback colorize>PW</AvatarFallback></Avatar>
```

---

## Badge tones

| Status / meaning | Variant | Use `dot`? |
|------------------|---------|------------|
| Live / approved / online / passed / paid | `success` | yes |
| Needs attention / pending review / overdue soon / partial | `warning` | yes |
| In planning / not started / informational / "scheduled" | `info` | yes |
| Failed / rejected / cancelled / overdue | `destructive` | yes |
| Archived / inactive / disabled / deprecated | `muted` | optional |
| Generic categorical tag (department, role, project key, no semantic urgency) | `secondary` | no |
| Default emphasis chip (rare — usually pick one of the semantic tones above) | `default` | no |
| Empty/draft/placeholder chip with a thin frame | `outline` | no |

**Use `dot` for status pills** (Active, On Hold, Blocked) — the dot makes the row scannable in a list. **Don't use `dot` for categorical tags** (department, project code) — those aren't a state.

---

## Alert variants

| Scenario | Variant |
|----------|---------|
| Neutral instruction or tip ("Heads up: this action affects all members") | `default` |
| Heads-up information that isn't a warning ("Your trial ends in 5 days") | `info` |
| Error, blocking failure, irreversible warning | `destructive` |

Reserve `destructive` for things the user genuinely shouldn't ignore. Don't use it for "this is a required field."

---

## MeterRow tones

Match the bar tone to what the value *means*, not to the value itself:

| Meaning | Tone |
|---------|------|
| Goal progress, capacity used, healthy utilization | `default` (primary) |
| Performance hit / passed threshold / "on track" | `success` |
| Approaching a soft limit (e.g. 80% of quota) | `warning` |
| Informational breakdown (split by category, no good/bad) | `info` or `default` |
| Hard limit exceeded / failed metric | `destructive` |
| Inactive/archived row in a breakdown chart | `muted` |

A breakdown chart of project status (Active / On Hold / Planning / Blocked) should match each row's tone to the corresponding `Badge` tone — pair the same visual language.

---

## ListRow surface

| Scenario | Surface |
|----------|---------|
| Inside a `Card` with `divide-y` (the Card frame is the boundary) | `plain` (default) |
| Standalone row not wrapped in a Card — needs its own frame (e.g. an API-key entry on a settings page) | `bordered` |
| Group of rows that should read as a soft inline list, not a card stack | `muted` |

If you're putting `bordered` rows inside a Card, you're nesting frames — use `plain` instead.

---

## Tabs variant

| Scenario | Variant |
|----------|---------|
| Section nav inside a settings page or detail page (the "primary" axis of navigation on that screen) | `line` (underline) |
| Filter chips above a list / dashboard segmented control / "All / Mine / Shared" toggle | `default` (pill) |

Rule: pill tabs are a *filter*; line tabs are a *section*. If switching the tab loads a different sub-route or a meaningfully different view, use `line`. If it just narrows the same data, use pill.

---

## StatCard deltaTone

| Direction | deltaTone |
|-----------|-----------|
| Metric went up and that's good (revenue, active users, satisfaction) | `up` |
| Metric went down and that's good (errors, support tickets, churn) | also `up` — tone follows desirability, not arrow direction |
| Metric moved against goal | `down` |
| No meaningful change (within noise) | `flat` |

Don't tie tone to the arrow — tie it to whether the change is good or bad.

---

## Modal vs Dialog vs Sheet

| Scenario | Component |
|----------|-----------|
| Multi-field form that needs sticky header/footer and breathing room (Create/Edit a record) | `Modal` |
| Short confirmation, single decision, "Are you sure?" | `Dialog` |
| Destructive confirmation with explicit cancel/destroy buttons | `AlertDialog` |
| Side panel showing a record's details without leaving the list | `Sheet` (right) |
| Slide-up filter panel on mobile, multi-step wizard panel | `Sheet` (bottom or right) |
| Toast / non-blocking feedback ("Saved", "Copy succeeded") | `Sonner` (toast) |
| Page-level error boundary | `ErrorFallback` |

If the user has to fill in more than ~3 fields, use `Modal`, not `Dialog`.

---

## Form input choice

### Text input

| Scenario | Component |
|----------|-----------|
| Single-line free text (name, title, email) | `Input` |
| Multi-line free text (description, comment, address block) | `Textarea` |
| Search/filter box that drives a list — must debounce | `SearchInput` |
| Inline ID display with copy (read-only) | `CodeLabel` |

Don't use `Input type="search"` for list filtering — it doesn't debounce. Reach for `SearchInput`.

### Dropdown / picker

| Scenario | Component |
|----------|-----------|
| Static list, < ~10 options, no search needed (e.g. status, country, role) | `Select` |
| Searchable list, longer list, async-loaded options, or any multi-select | `SelectPicker` |
| Multi-select with chips | `SelectPicker mode="multiple"` |

Threshold: if the list could ever exceed 10 options (or the user might forget the value), use `SelectPicker`.

### Date

| Scenario | Component |
|----------|-----------|
| Pick a single date | `DatePicker` |
| Pick a date range with presets ("Last 7 days", "This month") | `DateRangePicker` |
| Inline always-visible calendar (e.g. for scheduling, leave booking) | `Calendar` |

### Boolean / multi-choice

| Scenario | Component |
|----------|-----------|
| On/off setting that takes effect immediately (notifications on, dark mode on) | `Switch` |
| One-of-many list with explicit options (visible labels, mutually exclusive) | `RadioGroup` |
| One-of-many list where each option needs a description / icon / supporting copy | `SelectableCard` (single) |
| Many-of-many with explicit options | `Checkbox` per option |
| Many-of-many with rich option content | `SelectableCard` (multiple) |
| Yes/no inside a form (signing T&Cs, opt-in) | `Checkbox` |

Rule: `Switch` = immediate side effect; `Checkbox` = collected choice committed on Save. If the user clicking it changes state mid-form, use `Switch`. If it's recorded as part of a submission, use `Checkbox`.

### File upload

| Scenario | Component |
|----------|-----------|
| Big drop area as the focal point of the screen (resume upload, profile photo onboarding) | `AttachmentInput variant="dropzone"` |
| Inline upload button alongside other fields in a form | `AttachmentInput variant="compact"` |

---

## Dashboard tile choice

| Scenario | Component |
|----------|-----------|
| Single KPI with a delta chip and animated number | `StatCard` |
| Labeled bar with a number (status breakdown, capacity bar) | `MeterRow` |
| Avatar/icon + title + subtitle + trailing meta (recent activity, deadlines) | `ListRow` |
| Plain content surface (project summary, settings group) | `Card` |

`StatCard` is **only** for metric tiles — don't reach for it as a generic small card.

---

## Surfaces and elevation

The registry uses a fixed elevation ladder. Pick the surface, accept the elevation that comes with it. Do not hand-pick `shadow-*` classes on a registry component.

| Tier | Used by | Means |
|------|---------|-------|
| `shadow-none` | `link` button | Flat / inline |
| `shadow-xs` (rest), `shadow-sm` (hover) | `Card`, `Table` (standalone), `Button` brand/outline/secondary/destructive, `Input`, `Select` trigger, `Calendar`, `AttachmentInput` | Resting in-flow surface |
| `shadow-sm` | `Slider` thumb, `AppShell` inset frame, `Stepper` current step, `Select` popper | Slightly raised / interactive emphasis |
| `shadow-md` | `DropdownMenu`, `Tooltip`, `Popover`, `Dialog`, `Modal`, `AlertDialog`, `Command`, `ConnectionBanner`, sidebar floating | Popper / floating overlay |
| `shadow-xl` | `Sheet` | Top-level overlay |

`Card` does **not** have an `elevation` prop — its elevation is fixed by design so every Card on a screen reads as the same "level." If a surface needs more weight than a Card, you're reaching for the wrong primitive — use `StatCard` (which uses Card under the hood) for KPI emphasis, or `Sheet` for an overlay.

When a Table is nested in a `CardContent`, the Table's wrapper auto-drops its own elevation — no manual override needed.

---

## DropdownMenuItem variant

| Scenario | Variant |
|----------|---------|
| Standard menu action (Edit, Duplicate, Archive, View) | `default` |
| Destructive menu action (Delete, Remove, Revoke, Disable) | `destructive` |

Don't use `className="text-destructive …"` to fake a destructive item — use the prop. Reserve `destructive` for irreversible actions.

---

## Icon-only vs labelled buttons

| Scenario | Style |
|----------|-------|
| Action with a clear, named intent inside a `PageHeader` or modal footer | Labelled (`<Button action="create">Add Employee</Button>`) |
| Repeated action inside a table row (Edit, Delete, View) | Icon-only (`<Button action="edit" size="icon-sm" />`) — the row context makes the target obvious |
| Toolbar action (settings cog, refresh, sort, filter open) | Icon-only with `tooltip` |
| Action paired with another labelled action ("Save" + "Cancel") | Both labelled (don't mix labelled + icon-only in one row) |

When using icon-only, the Button's `tooltip` (or its action preset's auto-label) is mandatory for accessibility — never ship a bare icon button with no `aria-label`/`tooltip`.
