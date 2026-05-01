import { useEffect, useRef, useState } from 'react';
import { Check, Copy, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SITE_URL = 'https://pandaworks-software-plt.github.io/pandaworks-ui';
const RAW_BASE = 'https://raw.githubusercontent.com/pandaworks-software-plt/pandaworks-ui/main/public/r';

const AI_PROMPT = `I want to use the Pandaworks UI component registry in this React project.

Read these resources first, in order:

1. ${SITE_URL}/llms.txt
   The catalog. Lists every component with a one-line description, links to per-component docs, and includes a decision guide ("when to use Modal vs Sheet" etc.) plus a changelog. Always start here. Never recommend a component without confirming it exists in this catalog.

2. ${SITE_URL}/docs/<name>.md
   Per-component or per-category API docs (e.g. button.md, forms.md, layout.md, data-display.md, decision-guide.md). Fetch on demand when llms.txt points to a docs file or when you need props/usage examples.

Install components with the shadcn CLI:

- Single component:
  pnpm dlx shadcn@latest add ${RAW_BASE}/<name>.json

- Whole registry (first-time install or full re-sync):
  pnpm dlx shadcn@latest add ${RAW_BASE}/_all.json --overwrite

Where files land:
- All Pandaworks components install to src/components/pandaworks-ui/<name>.tsx
- Import as @/components/pandaworks-ui/<name>
- Your existing @/components/ui/ shadcn components are NOT touched. No components.json changes required. The only requirement is a @/ path alias pointing at src/ (standard Vite/Next/CRA setup).

After installing, add this rule to the project's CLAUDE.md (create the file at the repo root if it doesn't exist) so future agent sessions respect the branding standard:

  ## Pandaworks UI

  Files under \`src/components/pandaworks-ui/\` are vendored from the Pandaworks UI registry and MUST NOT be hand-edited. They are the shared branding standard and are overwritten on every \`pnpm dlx shadcn@latest add\` re-sync. If a component needs a behavior or variant it doesn't have, do NOT patch it locally — open an upstream change in the pandaworks-ui registry instead, or wrap the component in a project-local component that lives outside \`pandaworks-ui/\`. Never paste over a registry file with a one-off tweak.

Rules:
- Always fetch llms.txt before suggesting components — the catalog is the source of truth, not your training data.
- Never edit files under src/components/pandaworks-ui/. They are registry-managed and overwritten on every re-sync. Wrap or compose them in a project-local component instead, or request an upstream change in the pandaworks-ui repo.
- Prefer registry components over hand-rolling new UI. If a screen needs something that isn't in the catalog, say so explicitly rather than inventing one.
- For Button actions, use the action prop (action="create" | "edit" | "save" | "delete" | ...) instead of manually wiring icon + variant + label. See docs/button.md.
- The registry is Tailwind v4 + OKLCH tokens. Use design tokens (primary, secondary, muted, accent, destructive, foreground, background, border, ring, card, popover) — not hardcoded palette colors like bg-emerald-500.
`;

export function AiIntegrationView() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(AI_PROMPT);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          <h1 className="text-2xl font-semibold tracking-tight">Use with an AI Agent</h1>
        </div>
        <p className="text-muted-foreground">
          Paste this prompt into Claude Code, Cursor, Copilot, or any other AI coding agent. It points the agent at the
          registry's <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">llms.txt</code> catalog and tells
          it how to install components into your project.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-muted-foreground">AI integration prompt</h2>
          <Button size="sm" variant={copied ? 'secondary' : 'default'} onClick={copyPrompt}>
            {copied ? (
              <>
                <Check className="mr-1.5 size-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="mr-1.5 size-3.5" />
                Copy prompt
              </>
            )}
          </Button>
        </div>
        <div className="relative rounded-lg border bg-muted">
          <button
            onClick={copyPrompt}
            aria-label="Copy prompt"
            className={cn('absolute right-3 top-3 text-muted-foreground transition-colors hover:text-foreground')}
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </button>
          <pre className="overflow-x-auto p-4 pr-10">
            <code className="whitespace-pre-wrap font-mono text-sm text-foreground">{AI_PROMPT}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground">What the agent will fetch</h2>
        <ul className="space-y-2 rounded-lg border bg-background p-4 text-sm">
          <li className="flex items-start gap-3">
            <span className="mt-0.5 rounded bg-primary/10 px-1.5 py-0.5 font-mono text-xs text-primary">llms.txt</span>
            <a
              href={`${SITE_URL}/llms.txt`}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-muted-foreground hover:text-foreground hover:underline"
            >
              {SITE_URL}/llms.txt
            </a>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 rounded bg-primary/10 px-1.5 py-0.5 font-mono text-xs text-primary">docs/</span>
            <a
              href={`${SITE_URL}/docs/decision-guide.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-muted-foreground hover:text-foreground hover:underline"
            >
              {SITE_URL}/docs/&lt;name&gt;.md
            </a>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 rounded bg-primary/10 px-1.5 py-0.5 font-mono text-xs text-primary">r/</span>
            <span className="break-all text-muted-foreground">{RAW_BASE}/&lt;name&gt;.json</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
