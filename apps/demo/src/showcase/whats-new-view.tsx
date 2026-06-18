import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface WhatsNewEntry {
  date: string;
  componentName: string;
  title: string;
  summary: string;
  kind: 'added' | 'changed' | 'fixed';
}

const ENTRIES: WhatsNewEntry[] = [
  {
    date: '2026-06-18',
    componentName: 'tabs',
    title: 'Tabs animated sliding pill',
    summary:
      'The default Tabs variant is now a bordered track with a neutral pill that springs to the active tab and follows the pointer on hover, returning to the active tab on leave. The pill is decorative (aria-hidden) — active state is still driven by Radix, so keyboard behaviour is unchanged. The line variant is untouched. Adds the framer-motion runtime dependency; no API change, and active-label contrast clears AA in both themes.',
    kind: 'changed',
  },
  {
    date: '2026-06-18',
    componentName: 'detail-page',
    title: 'Detail Page horizontal meta strip',
    summary:
      'New DetailPageMetaBar lays DetailPageMetaItems out as a full-width horizontal strip under the header — the Vercel domain-detail meta row (Registrar / Age / Nameservers / CDN). The same DetailPageMetaItem is layout-aware: it keeps its dividers in the sidebar and renders borderless inside the bar, with spacing from the bar gap. No call-site change is needed, and the strip wraps to multiple rows on narrow screens. No new colors, so contrast is unchanged.',
    kind: 'added',
  },
  {
    date: '2026-06-18',
    componentName: 'app-shell',
    title: 'App Shell drill-down navigation',
    summary:
      'AppShell now accepts a navMode prop ("accordion" | "drilldown", default "accordion"). "accordion" keeps the current behaviour — clicking a parent expands its children in place. The new "drilldown" mode slides the whole nav panel to a new page showing only that group\'s items, with a back row to slide back — the iOS-Settings / multi-level menu pattern. Groups can nest as deep as you need, and on mount the panel opens straight to the level that holds the active item. The "accordion" default means every existing app renders identically, and no new colors are used.',
    kind: 'changed',
  },
  {
    date: '2026-06-18',
    componentName: 'detail-page',
    title: 'Detail Page section headers',
    summary:
      'New DetailPageSection renders a non-carded content region with a bold title, an optional muted description, and an optional action on the right. Use it to break the detail-page main column into labelled regions with a clear type hierarchy — like the "section title + one-line description + action" pattern on Vercel-style detail pages — without wrapping every region in a Card. The title renders in Inter per the heading-font policy, and no new colors are used, so contrast is unchanged.',
    kind: 'added',
  },
  {
    date: '2026-06-18',
    componentName: 'detail-page',
    title: 'Detail Page typography refresh',
    summary:
      'The detail-page header title is now larger (text-2xl) and meta values render at regular weight instead of medium. Together this gives the muted-label / plain-value hierarchy of Vercel-style detail pages. The change is visual only — no API change — and keeps the same color tokens, so AA contrast holds in both light and dark modes.',
    kind: 'changed',
  },
  {
    date: '2026-06-18',
    componentName: 'app-shell',
    title: 'App Shell variant prop',
    summary:
      'AppShell now accepts a variant prop ("inset" | "sidebar", default "inset"). "inset" keeps the current look — the main content floats in a rounded, bordered card with a margin. The new "sidebar" value drops that frame, so the content sits flush to the edges: full-width, full-height, no card. The prop forwards straight to the inner Sidebar, the framing change is purely structural (no new colors), and the "inset" default means every existing app renders identically.',
    kind: 'changed',
  },
  {
    date: '2026-06-15',
    componentName: 'detail-page',
    title: 'Detail Page sidebar groups',
    summary:
      'New DetailPageSidebarGroup wraps related DetailPageSidebarSections under a small uppercase heading, so a long detail-page sidebar can be split into labelled clusters (State / Ownership / Dates / Links). Groups separate with whitespace, the first section sits flush under the heading, and the last section drops its divider. The heading reuses the existing muted-foreground token, so contrast is unchanged. Existing sidebar usage is unaffected.',
    kind: 'added',
  },
  {
    date: '2026-06-08',
    componentName: 'rich-text-editor',
    title: 'Rich Text Editor',
    summary:
      'New tiptap-based RichTextEditor: a controlled editor where value is an HTML string and onChange(html) fires on every edit. Toolbar for bold, italic, bullet and numbered lists, and links. Supports placeholder, disabled (read-only), and aria-invalid. Pair it with the new RichTextContent renderer to display the stored HTML.',
    kind: 'added',
  },
  {
    date: '2026-06-08',
    componentName: 'rich-text-content',
    title: 'Rich Text Content',
    summary:
      'New RichTextContent: a read-only renderer for stored rich-text HTML. It sanitises the HTML with DOMPurify before it reaches the DOM, so untrusted statement content can never run a script. Typography matches RichTextEditor, so authored and displayed text look identical. Use it instead of a bare dangerouslySetInnerHTML.',
    kind: 'added',
  },
  {
    date: '2026-06-02',
    componentName: 'alert-dialog',
    title: 'AlertDialogAction variant prop',
    summary:
      'AlertDialogAction now accepts a variant prop ("default" | "destructive", default "default"). The confirm action already wraps the registry Button, so the new prop forwards straight through. Pass variant="destructive" for irreversible confirmations (delete, archive) instead of hand-rolling className="bg-destructive ..." — this routes the destructive tone through Button\'s AA-compliant bg-destructive-aa token. className still merges as before, so call sites that pass no variant render identically.',
    kind: 'changed',
  },
  {
    date: '2026-05-27',
    componentName: 'meta-edit-pill',
    title: 'MetaEditPill date mode',
    summary:
      'MetaEditPill gains a new mode="date" that opens a calendar popover instead of a dropdown. Pass value as Date | null and onChange as (value: Date | null) => void; the popover closes and commits on selection. Pair with allowClear / clearLabel to show a Clear button above the calendar, or override the display format with dateFormat (date-fns). Existing single / multi call sites compile without changes.',
    kind: 'added',
  },
  {
    date: '2026-05-21',
    componentName: 'app-shell',
    title: 'AppShell sidebar persistence hooks',
    summary:
      "AppShell gains two opt-in props — defaultSidebarOpen (initial open state seed) and onSidebarOpenChange (fires on every toggle, keyboard shortcut, or compact-desktop resize). Wire them to localStorage to remember the user's last sidebar state across page reloads. The compact-desktop auto-collapse now skips initial mount, so a stored false value survives a wide-screen reload. Non-breaking; existing call sites keep their open-by-default behaviour.",
    kind: 'added',
  },
  {
    date: '2026-05-19',
    componentName: 'badge',
    title: 'Badge soft variants more visible in dark mode',
    summary:
      'The success / warning / info soft variants now use a 30% chroma tint (was 20%) in dark mode so chips no longer fade into the page or sidebar bg — the green success chip was the worst offender. The muted variant also got a dark-mode lift (stone-600 at 60% alpha + stone-200 text) so neutral chips like "closed" / "not started" read as proper chips on stone-800 / stone-900 surfaces. Light mode is unchanged.',
    kind: 'fixed',
  },
  {
    date: '2026-05-18',
    componentName: 'app-shell',
    title: 'AppShell branding subtitle',
    summary:
      'AppShell branding gains an optional `subtitle` field — a small muted line that renders under the brand name (e.g. version string, environment label, tenant name). Hides automatically when the sidebar collapses to icon mode. Non-breaking; existing call sites unchanged.',
    kind: 'added',
  },
  {
    date: '2026-05-18',
    componentName: 'card',
    title: 'CardTitle default size flipped to sm (BREAKING)',
    summary:
      'CardTitle now defaults to size="sm" (16px) instead of size="lg" (24px). Matches the SaaS-default product card title used across consumers. Hero / single-card surfaces must now opt in with size="lg" to keep the previous 24px title. Callers that already pass size are unaffected.',
    kind: 'changed',
  },
  {
    date: '2026-05-18',
    componentName: 'select-picker',
    title: 'SelectPicker collapseSelectedAt threshold',
    summary:
      'Multi-mode SelectPicker gains a collapseSelectedAt prop. When the number of selected items exceeds the threshold, the trigger collapses the per-item chips into a single "{N} selected" badge — keeps filter-bar pickers on a single line once the selection count grows.',
    kind: 'changed',
  },
  {
    date: '2026-05-18',
    componentName: 'avatar',
    title: 'Avatar transparent-PNG fix + blurred backdrop',
    summary:
      'Avatar Root now paints a bg-muted base so transparent-PNG avatars no longer bleed the page through the circle. AvatarImage also renders a self-blurred, desaturated, dimmed copy of the image behind the foreground at md / lg / xl sizes — an Apple-Music-style ambient halo. xs and sm skip the backdrop to keep dense lists cheap.',
    kind: 'fixed',
  },
  {
    date: '2026-05-18',
    componentName: 'avatar-group',
    title: 'AvatarGroup stacked separation',
    summary:
      'Each stacked avatar (and the +N overflow tile) now carries a 2px hairline border on top of the existing 2px background ring, so neighbouring circles read as clearly separated even when the avatar content is close in tone to the page background. The group also forwards the resolved size prop to each child Avatar so the new AvatarImage blurred-backdrop layer gates correctly inside groups.',
    kind: 'changed',
  },
  {
    date: '2026-05-16',
    componentName: 'table-list-cell',
    title: 'TableListCell',
    summary:
      'Two-line primary cell for Table rows: leading icon + eyebrow + title on the first line, optional flex-wrap meta strip below. Standardises the ticket / project / template listing row pattern. Ships with the sibling MetaDivider helper for separating meta groups.',
    kind: 'added',
  },
  {
    date: '2026-05-16',
    componentName: 'badge',
    title: 'Badge size variant',
    summary:
      'Badge gains a `size` prop (`default` | `xs`). `xs` produces a dense chip (`h-5 px-1.5 text-[11px] leading-none`) for meta strips inside table rows. Pairs with TableListCell. Existing call sites unaffected — `size` defaults to `default`.',
    kind: 'changed',
  },
  {
    date: '2026-05-14',
    componentName: 'inbox-menu',
    title: 'InboxMenu',
    summary:
      'Header-level notification center. Bell trigger with an unread-count badge, scrollable popover list, optional "Mark all read" + "View all" links. Controlled via items + callbacks.',
    kind: 'added',
  },
  {
    date: '2026-05-14',
    componentName: 'tag-input',
    title: 'TagInput',
    summary:
      'Free-form-and/or-allowlist multi-tag input. Type + Enter/comma to commit, Backspace to remove the last chip. Optional `suggestions` opens an autocomplete popover; `allowFreeForm={false}` locks to the suggestion list.',
    kind: 'added',
  },
  {
    date: '2026-05-14',
    componentName: 'settings-row',
    title: 'SettingsRow',
    summary:
      'Pure-layout row for /settings/* pages: title + description + helper + control + trailing slot. Inline or stacked layout. Opt-in per-row Save / Cancel via the `showSave` prop.',
    kind: 'added',
  },
  {
    date: '2026-05-14',
    componentName: 'theme-toggle',
    title: 'ThemeToggle',
    summary:
      'Icon-only dropdown that switches the app between light, dark, and system themes. Persists the choice in localStorage and ships an `applyStoredTheme()` helper for app-entry no-FOUC bootstrap.',
    kind: 'added',
  },
  {
    date: '2026-05-12',
    componentName: 'alert-dialog',
    title: 'AlertDialog motion update',
    summary:
      "Show/hide animation now slides up from the bottom, matching Modal's motion so confirmation prompts feel like part of the same family.",
    kind: 'changed',
  },
  {
    date: '2026-05-12',
    componentName: 'modal',
    title: 'Modal sizes; Dialog removed',
    summary:
      'Modal gains a `size` prop (sm / default / lg) so it can cover the old Dialog footprint. Dialog and its sub-exports are no longer public — migrate to Modal (form prompts) or AlertDialog (confirmations).',
    kind: 'changed',
  },
];

function groupByDate(entries: WhatsNewEntry[]): { date: string; items: WhatsNewEntry[] }[] {
  const map = new Map<string, WhatsNewEntry[]>();
  for (const entry of entries) {
    const list = map.get(entry.date) ?? [];
    list.push(entry);
    map.set(entry.date, list);
  }
  return Array.from(map.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([date, items]) => ({ date, items }));
}

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

function kindVariant(kind: WhatsNewEntry['kind']): 'success' | 'info' | 'warning' {
  if (kind === 'added') return 'success';
  if (kind === 'changed') return 'info';
  return 'warning';
}

export function WhatsNewView() {
  const groups = groupByDate(ENTRIES);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" aria-hidden="true" />
          <h1 className="text-2xl font-semibold tracking-tight">What's new</h1>
        </div>
        <p className="text-muted-foreground">
          A short log of recent additions, changes, and fixes in the lucid-ui registry. For the full history, see{' '}
          <a
            href="https://github.com/pandaworks-sw/lucid-ui/blob/main/CHANGELOG.md"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            CHANGELOG.md
          </a>
          .
        </p>
      </div>

      <div className="space-y-8">
        {groups.map((group) => (
          <section key={group.date} className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {formatDate(group.date)}
            </h2>
            <ul className="space-y-3">
              {group.items.map((entry) => (
                <li
                  key={`${entry.date}-${entry.componentName}-${entry.title}`}
                  className={cn('rounded-lg border bg-card p-4 transition-colors hover:border-border')}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant={kindVariant(entry.kind)} className="capitalize">
                      {entry.kind}
                    </Badge>
                    <a
                      href={`#/${entry.componentName}`}
                      className="text-sm font-semibold text-foreground hover:text-primary hover:underline"
                    >
                      {entry.title}
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground">{entry.summary}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
