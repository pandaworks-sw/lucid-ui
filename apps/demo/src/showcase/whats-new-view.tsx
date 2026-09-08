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
    date: '2026-09-08',
    componentName: 'avatar',
    title: 'Clearer initials and accessible navigation',
    summary:
      'Avatar fills improve initial contrast. MeterRow announces its label. AppShell separators preserve valid list structure.',
    kind: 'fixed',
  },
  {
    date: '2026-09-08',
    componentName: 'typography',
    title: 'More readable text in both themes',
    summary:
      'Body text uses a clearer 12/14/16px scale. Dark supporting text, brand action text, and light focus rings now pass the tested contrast thresholds.',
    kind: 'changed',
  },
  {
    date: '2026-09-08',
    componentName: 'page-header',
    title: 'Clearer page hierarchy on small screens',
    summary: 'Page titles use 24px Comfortaa. Long titles and action groups wrap within the available width.',
    kind: 'changed',
  },
  {
    date: '2026-09-08',
    componentName: 'stat-card',
    title: 'Metrics stand out without crowding their hints',
    summary:
      'Short metric values are larger, labels are easier to read, and hints and trend chips wrap on narrow cards.',
    kind: 'changed',
  },
  {
    date: '2026-09-08',
    componentName: 'button',
    title: 'Accessible icon actions and loading state',
    summary:
      'Native icon-only buttons use tooltip or action labels as accessible-name fallbacks. Your explicit labels take precedence. Loading exposes busy state and the spinner respects reduced motion.',
    kind: 'fixed',
  },
  {
    date: '2026-09-08',
    componentName: 'animated-number',
    title: 'Numbers respect reduced motion',
    summary:
      'Numbers settle immediately when reduced motion is enabled or duration is zero or negative. Interrupted animations continue from the displayed value.',
    kind: 'fixed',
  },
  {
    date: '2026-08-02',
    componentName: 'app-shell',
    title: 'Long sidebars scroll again',
    summary:
      'When an app had more nav items than fit on screen, the sidebar quietly cut off the bottom ones — and gave you no scrollbar to reach them, so those menu entries were simply gone. The cause was the sliding nav track: it clips its off-screen pane, and that let the flex layout squash it to exactly the space available instead of its real height, so it never overflowed and never scrolled. The track now keeps its real height, so the sidebar scrolls normally and every nav item is reachable. The collapsed icon-only rail scrolls too. No API change — any sidebar with a long nav starts scrolling after upgrading.',
    kind: 'fixed',
  },
  {
    date: '2026-07-08',
    componentName: 'tabs',
    title: 'Active tab is now visible in light mode',
    summary:
      'The active tab in the default (pill) Tabs was barely visible in light mode — the sliding pill used a color almost identical to the tab track, so you could not tell which tab was selected. Dark mode was fine. The active pill now uses the card surface (white in light, a lighter grey in dark) with a subtle edge ring, so it reads clearly as a raised segmented-control tile in both themes and meets the WCAG non-text-contrast minimum. No API change — every default Tabs gets the fix; the line (underline) variant is unchanged.',
    kind: 'fixed',
  },
  {
    date: '2026-06-23',
    componentName: 'app-shell',
    title: 'Sidebar highlight follows navigation (drilldown nav)',
    summary:
      'In drilldown nav mode, the active sidebar highlight used to freeze on the page that was first loaded. It only refreshed on a full page reload, so after clicking around (client-side navigation) you would see the wrong item highlighted — often the previous page, or what looked like the next item down. The nav now rebuilds from the live navigation on every route change, so the highlighted item always matches the current page. Your drill position (which section you opened) is still kept. No API change — if you pass an active flag per nav item, this just works now.',
    kind: 'fixed',
  },
  {
    date: '2026-06-22',
    componentName: 'colors',
    title: 'Dark-mode surface blends fixed across components',
    summary:
      'In dark mode several tokens (card, popover, muted, secondary) are the same gray, so any component that filled itself with the muted or secondary color disappeared when it sat on a card — sliders, meter bars, skeletons, avatars, empty-state icons, icon badges, table selected rows, menu separators, the tabs track, and more. Those neutral fills now use the input-background token: it is the same color as before in light mode, but one step off the card in dark mode, so they stay visible. Tracks and separators use the border token. A few selection states (calendar range and today, the toggle on-state, dialog and modal close buttons) used the accent color, which equals the page background in light mode, so they vanished on a page — those now use the input background too, and the badge and split-button "secondary" variants got the same fix. No API changes; light mode looks the same and dark mode no longer hides these surfaces. An independent second review checked every fix and the contrast ratios still pass AA.',
    kind: 'fixed',
  },
  {
    date: '2026-06-22',
    componentName: 'button',
    title: 'Brand (blue) button variant removed',
    summary:
      'The blue "brand" button variant is gone from Button and SplitButton. The neutral "default" button is now the only primary button, and the create and save action presets use it too — so those buttons are now neutral gray instead of blue. This is a breaking change: any button using variant="brand" no longer compiles. Drop the prop (it falls back to default) or pick another variant; create/save presets need no change. The brand color token itself is untouched — it still drives the ghost button hover light-up and stays available for other fills. Contrast is unchanged in both light and dark mode.',
    kind: 'changed',
  },
  {
    date: '2026-06-22',
    componentName: 'app-shell',
    title: 'Sidebar inputs visible in light mode',
    summary:
      'When you put inputs inside the sidebar (a Select or Input in a sidebarPanel filter form), they used to blend into the sidebar in light mode — the field fill and the sidebar surface were the same gray, so the field looked like it had no background. The light sidebar is now one step darker (it matches the page background, like dark mode already did), so the input fill sits one step lighter and lifts off the surface. The nav hover/active highlight was darkened in step so it stays visible. Dark mode is unchanged. The placeholder text was never too light (it passes AA in both themes) — the fix was the missing fill separation. No API change; every sidebar gets the new look automatically.',
    kind: 'changed',
  },
  {
    date: '2026-06-22',
    componentName: 'button',
    title: 'Ghost buttons light up on hover',
    summary:
      'Ghost buttons no longer paint a gray background box on hover. Instead the icon or text lights up to the brand color, and the button scales up a little. Click it and it scales down with a short animation so it feels pressed. This makes icon buttons (table actions, toolbar icons, the copy button, and the arrow buttons in Pagination and Calendar) feel lighter and cleaner. Only the ghost variant changed — outline, secondary, default, brand, and link buttons look the same. No API change, so existing ghost buttons get the new hover automatically.',
    kind: 'changed',
  },
  {
    date: '2026-06-22',
    componentName: 'tabs',
    title: 'Tabs visible again in light mode',
    summary:
      'The default Tabs bar was blending into the page in light mode. After the darker app background change, the accent color and the background color became the same light gray, so the tab track and the active pill both matched the page and the whole bar vanished. The track now uses the muted surface, which is lighter than the page in light mode and a lighter inset in dark mode, so the bar reads as a clear surface in both themes and the active pill stands out against it. The active pill also gains a small shadow so it looks raised. No API change and no new colors — existing tabs get the fix automatically; text contrast stays at or above AA in both themes.',
    kind: 'fixed',
  },
  {
    date: '2026-06-22',
    componentName: 'card',
    title: 'Clearer card border',
    summary:
      'The card border is now easier to see as a panel edge. In dark mode it is a step darker so it clears the WCAG 3:1 line for component boundaries against the darker page background (the old dark border was below that line). In light mode the border is a little more visible than before but still kept soft — a fully compliant light border would be too heavy, so light mode leans on the gap between the page and the card plus the shadow to separate them. The colored gradient cards keep their own tinted borders. This is a visual change for every app that upgrades; there is no API change.',
    kind: 'fixed',
  },
  {
    date: '2026-06-22',
    componentName: 'badge',
    title: 'Soft badges readable on the darker page',
    summary:
      'The soft status badges (success, info, warning) had text that was too light to read on the new darker page background. They were tuned for white cards, but after the darker app background change they measured about 4.0:1 on the page surface — below the 4.5:1 AA minimum — which showed up on Status and Priority chips in a detail-page sidebar. The light-mode text colors are now a step darker so they pass AA both on the page background (about 4.6:1) and on white cards (about 5.4:1). The destructive soft badge already passed and dark mode already passed, so those are unchanged. The colored outline badges get a small contrast boost too. No API change and no new colors — the green, blue, and amber tones still read the same.',
    kind: 'fixed',
  },
  {
    date: '2026-06-19',
    componentName: 'colors',
    title: 'Darker app background',
    summary:
      'The app background token (--background) is now one step darker in both themes — dark goes from stone-800 to stone-900, light goes from stone-50 to stone-150. The card token is unchanged, so the gap between the page and the cards grows and cards, stat cards, inputs, and popovers lift off the page as clear raised panels instead of near-flat regions. In dark mode the page now matches the sidebar tone, so the sidebar and content read as one dark canvas with the cards floating above. No text, card, or border colors changed and no new tokens were added; body and muted text contrast stays at or above AA in both themes (it actually improves in dark mode). This is a visual change for every app that upgrades — the component API is unchanged.',
    kind: 'changed',
  },
  {
    date: '2026-06-19',
    componentName: 'badge',
    title: 'Badge colored outlines',
    summary:
      'Badge now has a colored outline for every tone: outline-primary, outline-secondary, outline-muted, outline-success, outline-warning, outline-info, and outline-destructive. Each one is a transparent chip with a tone-colored border and matching text — a lighter-weight status chip than the solid or soft fill. The border uses the same AA-safe color token as the text, so both the text (≥ 4.5:1) and the border (≥ 3:1) clear WCAG contrast in light and dark mode. The dot and icon props work with the new tones too, and no existing badge changes.',
    kind: 'changed',
  },
  {
    date: '2026-06-19',
    componentName: 'app-shell',
    title: 'App Shell contextual sidebar',
    summary:
      'AppShell now accepts a sidebarPanel prop ({ title, content, onBack }) that makes the sidebar part of the page flow. When you set it, the sidebar slides from the nav list to your panel — for example a filter form — with an animated back row, and slides back when you clear it. It is a controlled slot: a nav click sets the route and the panel, your panel content edits filter state, and your page content reads the same state so it reacts. AppShell only animates the swap; your routing layer handles the content. It is designed for the expanded sidebar (the panel body hides in icon mode), reuses the sidebar tokens so contrast is unchanged, and is fully backward compatible — omit it and the nav renders as before.',
    kind: 'changed',
  },
  {
    date: '2026-06-18',
    componentName: 'badge',
    title: 'Badge icon prop',
    summary:
      'Badge now takes an icon prop — pass any Lucide icon (like the Button icon prop) to show a leading icon. The icon sizes itself to match the badge (smaller at the xs size), so you do not add a className to the icon. It renders after the optional status dot and is aria-hidden; for icon-only badges, pair it with tooltipText for an accessible label. No new colors, so contrast is unchanged, and existing badges render the same.',
    kind: 'changed',
  },
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
