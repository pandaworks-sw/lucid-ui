import { DemoSection } from '@/showcase/component-page';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function ThemeToggleDemo() {
  return (
    <div className="space-y-8">
      <DemoSection
        title="Default"
        code={`import { ThemeToggle } from "@/components/ui/theme-toggle"

<ThemeToggle />`}
      >
        <div className="flex justify-center">
          <ThemeToggle />
        </div>
      </DemoSection>

      <DemoSection title="In a header (align start)" code={`<ThemeToggle align="start" />`}>
        <div className="flex items-center justify-between rounded-md border bg-card p-3">
          <span className="text-sm text-muted-foreground">App header</span>
          <ThemeToggle align="start" />
        </div>
      </DemoSection>

      <DemoSection title="Ghost variant" code={`<ThemeToggle variant="ghost" />`}>
        <div className="flex justify-center">
          <ThemeToggle variant="ghost" />
        </div>
      </DemoSection>

      <DemoSection
        title="Apply stored theme at app entry (no-FOUC)"
        code={`// src/main.tsx
import { applyStoredTheme } from "@pandaworks-sw/lucid-ui";

applyStoredTheme();          // uses the default key "lucid-theme"
// applyStoredTheme("my-app-theme");  // or pass a custom key

ReactDOM.createRoot(...).render(<App />);`}
      >
        <p className="text-sm text-muted-foreground">
          Call <code className="rounded bg-muted px-1">applyStoredTheme()</code> before React mounts so the saved choice
          is applied before the first paint. Pass the same custom{' '}
          <code className="rounded bg-muted px-1">storageKey</code> to both the helper and the{' '}
          <code className="rounded bg-muted px-1">ThemeToggle</code> if you override the default.
        </p>
      </DemoSection>
    </div>
  );
}
