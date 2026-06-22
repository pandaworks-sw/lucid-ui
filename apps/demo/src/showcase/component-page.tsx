import { useState, useRef, useEffect, useCallback } from 'react';
import { Check, Copy, Code2, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

// Anchor id from a section title. Lets the right-hand TOC deep-link to a section.
function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface ComponentPageProps {
  title: string;
  description: string;
  /** Copyable import line shown in the meta row, e.g. `import { Button } from '@pandaworks-sw/lucid-ui';` */
  importLine?: string;
  /** GitHub link to the component source, shown as a "Source" pill in the meta row. */
  sourceUrl?: string;
  children: React.ReactNode;
}

interface TocEntry {
  id: string;
  label: string;
}

export function ComponentPage({ title, description, importLine, sourceUrl, children }: ComponentPageProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<TocEntry[]>([]);
  const [activeId, setActiveId] = useState('');

  // Build the "On this page" list by scanning the sections the demo rendered,
  // then keep the active item in sync with scroll position. Re-runs when the
  // active component (title) changes, since each component renders its own set
  // of sections. `title` is an intentional re-run signal — it flips on navigation,
  // which is exactly when the rendered sections (and thus the TOC) change.
  // biome-ignore lint/correctness/useExhaustiveDependencies: title is a re-run key, not a value read inside the effect
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-toc-section]'));
    setToc(nodes.map((n) => ({ id: n.id, label: n.dataset.tocSection || n.textContent || n.id })));
    setActiveId(nodes[0]?.id ?? '');
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId((visible[0].target as HTMLElement).id);
      },
      // Activate a section once it crosses into the top third of the viewport.
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    );
    nodes.forEach((n) => {
      observer.observe(n);
    });
    return () => observer.disconnect();
  }, [title]);

  const handleTocClick = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveId(id);
  }, []);

  return (
    <div className="flex gap-10">
      <div ref={contentRef} className="min-w-0 flex-1 space-y-8">
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-base text-muted-foreground">{description}</p>
          {(importLine || sourceUrl) && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {importLine && <ImportLine code={importLine} />}
              {sourceUrl && (
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <ExternalLink className="size-3.5" />
                  Source
                </a>
              )}
            </div>
          )}
        </div>

        <div className="space-y-8">{children}</div>
      </div>

      {toc.length > 0 && (
        <aside className="hidden w-52 shrink-0 xl:block">
          <div className="sticky top-0">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">On this page</p>
            <ul className="border-l border-border">
              {toc.map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => handleTocClick(t.id)}
                    className={cn(
                      '-ml-px block border-l-2 py-1 pl-3 text-left text-sm transition-colors',
                      activeId === t.id
                        ? 'border-primary font-medium text-foreground'
                        : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                    )}
                  >
                    {t.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
}

// Copyable import chip for the page meta row (gluestack-style "Import" affordance).
function ImportLine({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => () => clearTimer(timerRef), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      clearTimer(timerRef);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  }

  return (
    <button
      onClick={copy}
      className="group inline-flex max-w-full items-center gap-2 rounded-md border bg-muted px-2.5 py-1 font-mono text-xs text-foreground transition-colors hover:bg-muted/70"
    >
      <span className="truncate">{code}</span>
      {copied ? (
        <Check className="size-3.5 shrink-0 text-foreground" />
      ) : (
        <Copy className="size-3.5 shrink-0 text-muted-foreground group-hover:text-foreground" />
      )}
    </button>
  );
}

function clearTimer(ref: React.RefObject<ReturnType<typeof setTimeout> | null>) {
  if (ref.current) clearTimeout(ref.current);
}

interface DemoSectionProps {
  title: string;
  code?: string;
  children: React.ReactNode;
}

export function DemoSection({ title, code, children }: DemoSectionProps) {
  const id = slugify(title);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => () => clearTimer(timerRef), []);

  async function copyCode() {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      clearTimer(timerRef);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  }

  return (
    <section className="scroll-mt-6 space-y-3">
      <h2 id={id} data-toc-section={title} className="text-sm font-medium text-muted-foreground">
        {title}
      </h2>
      {/* MUI-style demo card: the live demo on top, its source always shown below. */}
      <div className="overflow-hidden rounded-lg border">
        <div className="bg-card p-6">{children}</div>
        {code && (
          <>
            <div className="flex items-center justify-between border-t bg-muted/40 px-3 py-1.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Code2 className="size-3.5" />
                Code
              </span>
              <button
                onClick={copyCode}
                aria-label="Copy code"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              </button>
            </div>
            <pre className="overflow-x-auto border-t bg-muted p-4">
              <code className="font-mono text-sm text-foreground">{code}</code>
            </pre>
          </>
        )}
      </div>
    </section>
  );
}

interface ComponentSectionProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Prose section for non-demo content — Accessibility, When to use, notes.
 * Registers in the right-hand TOC like a DemoSection (MUI's closing sections).
 */
export function ComponentSection({ title, children }: ComponentSectionProps) {
  const id = slugify(title);
  return (
    <section className="scroll-mt-6 space-y-3">
      <h2 id={id} data-toc-section={title} className="text-sm font-medium text-muted-foreground">
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-foreground/90">{children}</div>
    </section>
  );
}
