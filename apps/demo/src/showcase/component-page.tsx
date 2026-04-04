import { useState, useRef, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import { InstallCommand } from "@/components/install-command";
import { cn } from "@/lib/utils";

interface ComponentPageProps {
  title: string;
  description: string;
  installName: string;
  children: React.ReactNode;
}

export function ComponentPage({
  title,
  description,
  installName,
  children,
}: ComponentPageProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <InstallCommand name={installName} />

      <div className="space-y-8">{children}</div>
    </div>
  );
}

interface DemoSectionProps {
  title: string;
  code?: string;
  children: React.ReactNode;
}

export function DemoSection({ title, code, children }: DemoSectionProps) {
  const [view, setView] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  async function copyCode() {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard not available */ }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
        {code && (
          <div className="flex items-center gap-0.5 rounded-md border bg-muted p-0.5">
            <button
              onClick={() => setView("preview")}
              className={cn(
                "rounded-sm px-2.5 py-1 text-xs font-medium transition-colors",
                view === "preview"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Preview
            </button>
            <button
              onClick={() => setView("code")}
              className={cn(
                "rounded-sm px-2.5 py-1 text-xs font-medium transition-colors",
                view === "code"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Code
            </button>
          </div>
        )}
      </div>
      {view === "preview" || !code ? (
        <div className="rounded-lg border bg-background p-6">{children}</div>
      ) : (
        <div className="relative rounded-lg border bg-muted">
          <button
            onClick={copyCode}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </button>
          <pre className="overflow-x-auto p-4 pr-10">
            <code className="text-sm font-mono text-foreground">{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
