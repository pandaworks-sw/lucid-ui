import { ExternalLink, Megaphone, Puzzle, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';

const NEW_BADGE_DAYS = 14;

function isNewComponent(since?: string): boolean {
  if (!since) return false;
  const sinceDate = new Date(`${since}T00:00:00`);
  if (Number.isNaN(sinceDate.getTime())) return false;
  const days = (Date.now() - sinceDate.getTime()) / (1000 * 60 * 60 * 24);
  return days >= 0 && days <= NEW_BADGE_DAYS;
}

export interface SidebarCategory {
  label: string;
  items: { name: string; title: string; since?: string }[];
}

interface ShowcaseSidebarProps {
  categories: SidebarCategory[];
  active: string;
  onSelect: (name: string) => void;
  whatsNewActive?: boolean;
  onSelectWhatsNew?: () => void;
}

export function ShowcaseSidebar({
  categories,
  active,
  onSelect,
  whatsNewActive = false,
  onSelectWhatsNew,
}: ShowcaseSidebarProps) {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r bg-muted/30">
      <div className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
        <img
          src={`${import.meta.env.BASE_URL}lucid-ui-logo.png`}
          alt=""
          aria-hidden="true"
          className="h-7 w-7 shrink-0"
        />
        <h1 className="text-sm font-semibold tracking-tight">Lucid UI</h1>
        <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">Registry</span>
      </div>

      <div className="px-3 pt-3">
        <ul className="space-y-0.5">
          {onSelectWhatsNew && (
            <li>
              <button
                onClick={onSelectWhatsNew}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors',
                  whatsNewActive
                    ? 'bg-primary/10 font-medium text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <Megaphone className="size-3.5 shrink-0 text-primary" />
                <span className="flex-1">What&apos;s new</span>
              </button>
            </li>
          )}
          <li>
            <button
              onClick={() => onSelect('ai-integration')}
              className={cn(
                'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors',
                active === 'ai-integration'
                  ? 'bg-primary/10 font-medium text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <Sparkles className="size-3.5 shrink-0 fill-amber-400 text-amber-500 animate-[lucid-sparkle-glow_4s_linear_infinite]" />
              <span className="flex-1">Use with AI</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelect('skills')}
              className={cn(
                'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors',
                active === 'skills'
                  ? 'bg-primary/10 font-medium text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <Puzzle className="size-3.5 shrink-0 opacity-70" />
              <span className="flex-1">Use with Claude Code</span>
            </button>
          </li>
          <li>
            <a
              href={`${import.meta.env.BASE_URL}pure-showcase`}
              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              <ExternalLink className="size-3.5 shrink-0 opacity-70" />
              <span className="flex-1">Showcase</span>
            </a>
          </li>
        </ul>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {categories.map((cat) => (
          <div key={cat.label} className="mb-4">
            <div className="mb-1 mt-4 flex items-center gap-2 px-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{cat.label}</span>
              <span aria-hidden className="h-px flex-1 bg-border" />
            </div>
            <ul className="space-y-0.5">
              {cat.items.map((item) => (
                <li key={item.name}>
                  {item.name === 'full-demo' ? (
                    <a
                      href={`${import.meta.env.BASE_URL}full-demo.html`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                    >
                      {item.title}
                      <ExternalLink className="size-3 opacity-50" />
                    </a>
                  ) : (
                    <button
                      onClick={() => onSelect(item.name)}
                      className={cn(
                        'flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors',
                        active === item.name
                          ? 'bg-primary/10 font-medium text-primary'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                      )}
                    >
                      <span className="truncate">{item.title}</span>
                      {isNewComponent(item.since) && (
                        <span
                          aria-label="New"
                          className="shrink-0 rounded bg-primary/15 px-1.5 py-0 text-[10px] font-semibold uppercase leading-4 tracking-wide text-primary"
                        >
                          New
                        </span>
                      )}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="flex items-center justify-between border-t px-4 py-3">
        <span className="text-xs text-muted-foreground">Theme</span>
        <ThemeToggle />
      </div>
    </aside>
  );
}
