import { DemoSection } from "@/showcase/component-page";

function PatternSwatch({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <div className="space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground">
        {label}
      </span>
      <div
        className={`h-40 rounded-lg border bg-background ${className}`}
      />
    </div>
  );
}

function AuroraSwatch({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <div className="space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground">
        {label}
      </span>
      <div
        className={`flex h-32 items-center justify-center rounded-lg border bg-background ${className}`}
      >
        <span className="text-sm font-medium text-muted-foreground/60">
          {label.replace("bg-pattern-aurora-", "")}
        </span>
      </div>
    </div>
  );
}

export default function PatternBackgroundDemo() {
  return (
    <>
      <DemoSection title="Structural Patterns">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <PatternSwatch
            label="bg-pattern-dots"
            className="bg-pattern-dots"
          />
          <PatternSwatch
            label="bg-pattern-grid"
            className="bg-pattern-grid"
          />
          <PatternSwatch
            label="bg-pattern-cross"
            className="bg-pattern-cross"
          />
        </div>
      </DemoSection>

      <DemoSection title="Noise Texture">
        <PatternSwatch
          label="bg-pattern-noise"
          className="bg-pattern-noise"
        />
      </DemoSection>

      <DemoSection title="Aurora (Neutral)">
        <PatternSwatch
          label="bg-pattern-aurora"
          className="bg-pattern-aurora"
        />
      </DemoSection>

      <DemoSection title="Aurora Color Variants">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <AuroraSwatch
            label="bg-pattern-aurora-blue"
            className="bg-pattern-aurora-blue"
          />
          <AuroraSwatch
            label="bg-pattern-aurora-purple"
            className="bg-pattern-aurora-purple"
          />
          <AuroraSwatch
            label="bg-pattern-aurora-peach"
            className="bg-pattern-aurora-peach"
          />
          <AuroraSwatch
            label="bg-pattern-aurora-indigo"
            className="bg-pattern-aurora-indigo"
          />
          <AuroraSwatch
            label="bg-pattern-aurora-green"
            className="bg-pattern-aurora-green"
          />
          <AuroraSwatch
            label="bg-pattern-aurora-amber"
            className="bg-pattern-aurora-amber"
          />
          <AuroraSwatch
            label="bg-pattern-aurora-rose"
            className="bg-pattern-aurora-rose"
          />
          <AuroraSwatch
            label="bg-pattern-aurora-teal"
            className="bg-pattern-aurora-teal"
          />
        </div>
      </DemoSection>

      <DemoSection title="Composition Examples">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">
              Dots + content
            </span>
            <div className="flex h-40 items-center justify-center rounded-lg border bg-pattern-dots bg-background">
              <div className="rounded-lg border bg-card px-6 py-4 shadow-sm">
                <p className="text-sm font-medium">Card on dots</p>
                <p className="text-xs text-muted-foreground">
                  Content sits cleanly on top
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">
              Grid + color wash
            </span>
            <div className="flex h-40 items-center justify-center rounded-lg border bg-pattern-grid bg-primary/3">
              <div className="rounded-lg border bg-card px-6 py-4 shadow-sm">
                <p className="text-sm font-medium">Tinted grid</p>
                <p className="text-xs text-muted-foreground">
                  Combine with bg-primary/3
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">
              Aurora + hero section
            </span>
            <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-lg border bg-pattern-aurora-blue bg-background">
              <h3 className="text-lg font-semibold">Welcome back</h3>
              <p className="text-sm text-muted-foreground">
                Your dashboard awaits
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">
              Noise + card surface
            </span>
            <div className="relative flex h-40 items-center justify-center rounded-lg border bg-pattern-noise bg-muted">
              <p className="text-sm font-medium">Textured surface</p>
            </div>
          </div>
        </div>
      </DemoSection>
    </>
  );
}
