import { DemoSection } from '@/showcase/component-page';

interface FontFamilyProps {
  name: string;
  token: string;
  utility: string;
  role: string;
  className: string;
}

const FONT_FAMILIES: FontFamilyProps[] = [
  {
    name: 'Inter',
    token: '--font-sans',
    utility: 'font-sans (default)',
    role: "Body, headings, labels — every surface that isn't PageHeader or a hero.",
    className: 'font-sans',
  },
  {
    name: 'Comfortaa',
    token: '--font-display',
    utility: 'font-display + text-display-*',
    role: 'PageHeader title and hero/marketing surfaces ONLY.',
    className: 'font-display',
  },
  {
    name: 'JetBrains Mono',
    token: '--font-mono',
    utility: 'font-mono + text-mono-*',
    role: 'Code, IDs, copyable values, tabular numerics where mono helps scanning.',
    className: 'font-mono',
  },
];

interface TextSizeProps {
  /** Tailwind utility (`text-xs`, `text-sm`, ...) */
  utility: string;
  /** Pixel size + line-height summary, e.g. "11px / 1.5" */
  meta: string;
  /** Default font weight applied by the token */
  weight: string;
  /** Sample text */
  sample: string;
  /** When set, paint this as a "display"-style preview (Comfortaa) */
  display?: boolean;
  /** When set, paint this as mono */
  mono?: boolean;
  /** Notes (e.g. letter-spacing) */
  note?: string;
}

const BODY_SCALE: TextSizeProps[] = [
  {
    utility: 'text-xs',
    meta: '11px / 1.5',
    weight: '600',
    note: 'letter-spacing 0.04em',
    sample: 'Eyebrow / Badge / Caption',
  },
  { utility: 'text-sm', meta: '13px / 1.5', weight: '500', sample: 'Secondary body, labels, helper text' },
  { utility: 'text-base', meta: '14px / 1.55', weight: '400', sample: 'Default body copy' },
  { utility: 'text-md', meta: '15px / 1.55', weight: '400', sample: 'Slightly emphasized body' },
  { utility: 'text-lg', meta: '17px / 1.5', weight: '500', sample: 'Section subheading' },
  { utility: 'text-xl', meta: '20px / 1.45', weight: '500', sample: 'Card / Dialog title' },
];

const DISPLAY_SCALE: TextSizeProps[] = [
  { utility: 'text-display-sm', meta: '28px / 1.2', weight: '500', display: true, sample: 'PageHeader title size' },
  { utility: 'text-display-md', meta: '40px / 1.15', weight: '600', display: true, sample: 'Hero subhead' },
  {
    utility: 'text-display-lg',
    meta: '56px / 1.1',
    weight: '600',
    display: true,
    note: 'letter-spacing -0.01em',
    sample: 'Hero headline',
  },
  {
    utility: 'text-display-xl',
    meta: '72px / 1.05',
    weight: '600',
    display: true,
    note: 'letter-spacing -0.02em',
    sample: 'Marketing hero',
  },
];

const MONO_SCALE: TextSizeProps[] = [
  { utility: 'text-mono-sm', meta: '11px / 1.5', weight: '400', mono: true, sample: 'X-1A2B3C' },
  {
    utility: 'text-mono-md',
    meta: '13px / 1.5',
    weight: '400',
    mono: true,
    sample: 'pnpm add @pandaworks-sw/lucid-ui',
  },
];

function TextSizeRow({ utility, meta, weight, sample, display, mono, note }: TextSizeProps) {
  const fontClass = display ? 'font-display' : mono ? 'font-mono' : 'font-sans';
  return (
    <div className="grid grid-cols-1 gap-2 border-b border-border/60 py-3 last:border-b-0 sm:grid-cols-[180px_1fr]">
      <div className="flex flex-col gap-0.5">
        <span className="text-mono-sm text-foreground">{utility}</span>
        <span className="text-xs text-muted-foreground">
          {meta} · weight {weight}
          {note ? ` · ${note}` : ''}
        </span>
      </div>
      <div className={`${utility} ${fontClass} text-foreground`}>{sample}</div>
    </div>
  );
}

export default function TypographyDemo() {
  return (
    <>
      <DemoSection title="Font families">
        <div className="space-y-4">
          {FONT_FAMILIES.map((f) => (
            <div key={f.name} className="rounded-lg border bg-background p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className={`text-2xl ${f.className}`}>{f.name}</div>
                <div className="flex flex-col items-end gap-0.5 text-right">
                  <span className="text-mono-sm text-muted-foreground">{f.token}</span>
                  <span className="text-mono-sm text-muted-foreground">{f.utility}</span>
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{f.role}</p>
              <div className={`mt-4 ${f.className} text-base text-foreground`}>
                The quick brown fox jumps over the lazy dog. 0123456789
              </div>
            </div>
          ))}
        </div>
      </DemoSection>

      <DemoSection title="Body scale (Inter)">
        <div className="rounded-lg border bg-background px-5">
          {BODY_SCALE.map((row) => (
            <TextSizeRow key={row.utility} {...row} />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Body sizes override Tailwind defaults. Each token carries its own line-height, weight, and (where relevant)
          letter-spacing — you don't need to pair the size class with a separate weight class.{' '}
          <span className="text-mono-sm">text-md</span> is new and slots between{' '}
          <span className="text-mono-sm">text-base</span> and <span className="text-mono-sm">text-lg</span>.
        </p>
      </DemoSection>

      <DemoSection title="Display scale (Comfortaa)">
        <div className="rounded-lg border bg-background px-5">
          {DISPLAY_SCALE.map((row) => (
            <TextSizeRow key={row.utility} {...row} />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Reserved for hero/marketing surfaces and the <span className="text-mono-sm">PageHeader</span> title (which
          wires <span className="text-mono-sm">font-display</span> internally — do not re-apply). Reach for these
          utilities directly only when you genuinely need the brand display face.
        </p>
      </DemoSection>

      <DemoSection title="Mono scale (JetBrains Mono)">
        <div className="rounded-lg border bg-background px-5">
          {MONO_SCALE.map((row) => (
            <TextSizeRow key={row.utility} {...row} />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Use mono for IDs, copyable code, and surfaces where character alignment matters. For inline copyable values,
          prefer the <span className="text-mono-sm">CodeLabel</span> component over hand-rolled mono spans.
        </p>
      </DemoSection>

      <DemoSection title="Heading font policy (strict)">
        <div className="rounded-lg border bg-background p-5 space-y-4">
          <p className="text-sm text-foreground">
            Comfortaa is reserved for <strong>two surfaces only</strong>: the{' '}
            <span className="text-mono-sm">PageHeader</span> title (already wired internally) and the{' '}
            <span className="text-mono-sm">text-display-*</span> utilities. Every other heading renders in Inter.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-success/40 bg-success/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-success-soft-fg">Correct</p>
              <h3 className="mt-2 text-lg font-semibold text-foreground">Card / Dialog / Section title</h3>
              <p className="text-sm text-muted-foreground">Renders in Inter via the base-layer reset.</p>
              <h3 className="mt-3 font-display text-display-sm text-foreground">Marketing hero</h3>
              <p className="text-sm text-muted-foreground">
                Opt in with <span className="text-mono-sm">font-display</span> or{' '}
                <span className="text-mono-sm">text-display-*</span> per element.
              </p>
            </div>

            <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-destructive-soft-fg">Don't</p>
              <pre className="mt-2 overflow-x-auto rounded-sm bg-muted p-2 text-mono-sm text-foreground">{`/* anywhere in globals.css */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
}`}</pre>
              <p className="mt-2 text-sm text-muted-foreground">
                A global heading rule defeats the policy and leaks Comfortaa onto card titles, dialog titles, sidebar
                labels, and user-authored content. The package ships an explicit Inter reset — keep it.
              </p>
            </div>
          </div>
        </div>
      </DemoSection>
    </>
  );
}
