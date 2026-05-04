import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { DemoSection } from '@/showcase/component-page';
import { cn } from '@/lib/utils';

interface SwatchProps {
  /** The label rendered under the swatch — typically the token name (e.g. `--stone-200`) */
  label: string;
  /** Tailwind classes that paint the swatch surface. Use token-driven utilities (`bg-stone-200`, `bg-success/15`). */
  swatchClassName: string;
  /** Optional hex / token value, shown as a copyable mono caption */
  value?: string;
  /** Optional second-line note (e.g. "AA: 6.6:1 on bg-success/15") */
  note?: string;
  /** When the swatch surface is white-ish in light mode and dark in dark mode, set to `true` so we add a hairline border for visibility. */
  bordered?: boolean;
}

function Swatch({ label, swatchClassName, value, note, bordered }: SwatchProps) {
  const [copied, setCopied] = useState(false);

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard not available */
    }
  }

  return (
    <div className="space-y-1.5">
      <div className={cn('h-16 w-full rounded-md', bordered && 'ring-1 ring-inset ring-border', swatchClassName)} />
      <div className="space-y-0.5">
        <p className="text-xs font-medium text-foreground">{label}</p>
        {value && (
          <button
            onClick={() => copy(value)}
            className="group flex items-center gap-1 text-mono-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>{value}</span>
            {copied ? (
              <Check className="size-3 text-success" />
            ) : (
              <Copy className="size-3 opacity-0 group-hover:opacity-100" />
            )}
          </button>
        )}
        {note && <p className="text-xs text-muted-foreground">{note}</p>}
      </div>
    </div>
  );
}

interface ScaleSwatchProps {
  /** The token name, e.g. `--stone-200` */
  token: string;
  /** Hex value for the light theme */
  hex: string;
  /** Tailwind class to paint it (e.g. `bg-stone-200`) */
  className: string;
}

function ScaleSwatch({ token, hex, className }: ScaleSwatchProps) {
  return <Swatch label={token} swatchClassName={className} value={hex} bordered />;
}

const STONE_SCALE: ScaleSwatchProps[] = [
  { token: '--stone-50', hex: '#F7F9FB', className: 'bg-stone-50' },
  { token: '--stone-100', hex: '#EFF3F6', className: 'bg-stone-100' },
  { token: '--stone-150', hex: '#E5EBEF', className: 'bg-stone-150' },
  { token: '--stone-200', hex: '#D8DFE5', className: 'bg-stone-200' },
  { token: '--stone-300', hex: '#BCC5CD', className: 'bg-stone-300' },
  { token: '--stone-400', hex: '#8B97A1', className: 'bg-stone-400' },
  { token: '--stone-500', hex: '#5F6B75', className: 'bg-stone-500' },
  { token: '--stone-600', hex: '#424C55', className: 'bg-stone-600' },
  { token: '--stone-700', hex: '#2C343B', className: 'bg-stone-700' },
  { token: '--stone-800', hex: '#1C2229', className: 'bg-stone-800' },
  { token: '--stone-900', hex: '#11161B', className: 'bg-stone-900' },
  { token: '--stone-950', hex: '#080B0E', className: 'bg-stone-950' },
];

const PANDA_SCALE: ScaleSwatchProps[] = [
  { token: '--panda-50', hex: '#E7F7FD', className: 'bg-panda-50' },
  { token: '--panda-100', hex: '#C7ECFA', className: 'bg-panda-100' },
  { token: '--panda-200', hex: '#92DAF3', className: 'bg-panda-200' },
  { token: '--panda-300', hex: '#54C4EB', className: 'bg-panda-300' },
  { token: '--panda-400', hex: '#20B0E0', className: 'bg-panda-400' },
  { token: '--panda-500', hex: '#0E97C7', className: 'bg-panda-500' },
  { token: '--panda-600', hex: '#0879A2', className: 'bg-panda-600' },
  { token: '--panda-700', hex: '#0A607F', className: 'bg-panda-700' },
  { token: '--panda-800', hex: '#0C495F', className: 'bg-panda-800' },
  { token: '--panda-900', hex: '#08323F', className: 'bg-panda-900' },
];

interface SemanticSwatchProps {
  token: string;
  hex: string;
  className: string;
  note?: string;
}

const SEMANTIC_BG: SemanticSwatchProps[] = [
  { token: '--success', hex: '#4F8A52', className: 'bg-success', note: 'White text foreground' },
  { token: '--info', hex: '#3D7DD9', className: 'bg-info', note: 'White text foreground' },
  { token: '--warning', hex: '#C98A2B', className: 'bg-warning', note: 'White text foreground' },
  { token: '--danger', hex: '#C8543F', className: 'bg-danger', note: 'Chroma — non-text fills only' },
  {
    token: '--destructive-aa',
    hex: '#A8392A',
    className: 'bg-destructive-aa',
    note: 'AA-safe red for white-on-red controls (6.3:1)',
  },
];

const SEMANTIC_THEME: SemanticSwatchProps[] = [
  { token: '--background', hex: 'stone-50 / stone-800', className: 'bg-background' },
  { token: '--foreground', hex: 'stone-800 / stone-150', className: 'bg-foreground' },
  { token: '--card', hex: '#FFFFFF / stone-700', className: 'bg-card' },
  { token: '--popover', hex: '#FFFFFF / stone-700', className: 'bg-popover' },
  { token: '--primary', hex: 'stone-800 / stone-150', className: 'bg-primary' },
  { token: '--secondary', hex: 'stone-100 / stone-700', className: 'bg-secondary' },
  { token: '--muted', hex: 'stone-100 / stone-700', className: 'bg-muted' },
  { token: '--accent', hex: 'stone-150 / stone-600', className: 'bg-accent' },
  { token: '--brand', hex: 'panda-400', className: 'bg-brand', note: 'Primary action color (CTAs)' },
  {
    token: '--destructive',
    hex: 'var(--danger)',
    className: 'bg-destructive',
    note: 'Aliases --danger; non-text fills',
  },
  { token: '--border', hex: 'stone-200 / stone-600', className: 'bg-border' },
  { token: '--input', hex: 'stone-200 / stone-600', className: 'bg-input', note: 'Field border' },
  {
    token: '--input-bg',
    hex: 'stone-100 / stone-800',
    className: 'bg-input-bg',
    note: 'Field surface (Input, Textarea, outline Button)',
  },
  { token: '--ring', hex: 'panda-400', className: 'bg-ring', note: 'Focus ring' },
];

const CHART_TOKENS: SemanticSwatchProps[] = [
  { token: '--chart-1', hex: 'panda-400 / panda-300', className: 'bg-chart-1' },
  { token: '--chart-2', hex: 'panda-600 / panda-500', className: 'bg-chart-2' },
  { token: '--chart-3', hex: 'var(--info)', className: 'bg-chart-3' },
  { token: '--chart-4', hex: 'var(--success)', className: 'bg-chart-4' },
  { token: '--chart-5', hex: 'var(--warning)', className: 'bg-chart-5' },
];

interface SoftPairProps {
  /** Label like "success on bg-success/15" */
  label: string;
  /** Tailwind bg class for the soft tint (e.g. `bg-success/15`) */
  bgClassName: string;
  /** Tailwind text class (e.g. `text-success-soft-fg`) */
  textClassName: string;
  /** Light-mode contrast ratio, e.g. "4.7:1" */
  light: string;
  /** Dark-mode contrast ratio, e.g. "7.4:1" */
  dark: string;
}

function SoftFgPair({ label, bgClassName, textClassName, light, dark }: SoftPairProps) {
  return (
    <div className="space-y-1.5">
      <div
        className={cn(
          'flex items-center justify-center rounded-md px-3 py-4 text-sm font-semibold',
          bgClassName,
          textClassName
        )}
      >
        Sample text
      </div>
      <div className="space-y-0.5">
        <p className="text-xs font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">
          Light <span className="text-mono-sm">{light}</span> · Dark <span className="text-mono-sm">{dark}</span>
        </p>
      </div>
    </div>
  );
}

export default function ColorsDemo() {
  return (
    <>
      <DemoSection title="Stone scale (cool neutrals)">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {STONE_SCALE.map((s) => (
            <ScaleSwatch key={s.token} {...s} />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          The neutral foundation. Use these directly via Tailwind utilities (
          <span className="text-mono-sm">bg-stone-200</span>, <span className="text-mono-sm">text-stone-600</span>) only
          when you genuinely need a specific neutral step. For most app surfaces, prefer the semantic theme tokens below
          — they re-map automatically across light and dark.
        </p>
      </DemoSection>

      <DemoSection title="Panda blue (brand accent)">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
          {PANDA_SCALE.map((s) => (
            <ScaleSwatch key={s.token} {...s} />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          The Pandahrms brand accent. <span className="text-mono-sm">--brand</span> and{' '}
          <span className="text-mono-sm">--ring</span> resolve to <span className="text-mono-sm">--panda-400</span>. Use
          the scale directly only for chart/data-viz tints; for CTAs reach for{' '}
          <span className="text-mono-sm">bg-brand</span>.
        </p>
      </DemoSection>

      <DemoSection title="Semantic chroma">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {SEMANTIC_BG.map((s) => (
            <Swatch key={s.token} label={s.token} swatchClassName={s.className} value={s.hex} note={s.note} />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          The chroma layer. <span className="text-mono-sm">--success</span>,{' '}
          <span className="text-mono-sm">--info</span>, <span className="text-mono-sm">--warning</span>, and{' '}
          <span className="text-mono-sm">--danger</span> are used as non-text fills (meter bars, dots, status icons,
          chart fills) where 4.5:1 doesn't apply. For text-on-tinted-bg pairings, use the AA tokens below.
        </p>
      </DemoSection>

      <DemoSection title="WCAG AA pairings (text on soft tint)">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <SoftFgPair
            label="text-success-soft-fg"
            bgClassName="bg-success/15 dark:bg-success/20"
            textClassName="text-success-soft-fg"
            light="~4.7:1"
            dark="~7.4:1"
          />
          <SoftFgPair
            label="text-info-soft-fg"
            bgClassName="bg-info/15 dark:bg-info/20"
            textClassName="text-info-soft-fg"
            light="~4.7:1"
            dark="~7.2:1"
          />
          <SoftFgPair
            label="text-warning-soft-fg"
            bgClassName="bg-warning/15 dark:bg-warning/20"
            textClassName="text-warning-soft-fg"
            light="~5.2:1"
            dark="~7.2:1"
          />
          <SoftFgPair
            label="text-destructive-soft-fg"
            bgClassName="bg-destructive/15 dark:bg-destructive/20"
            textClassName="text-destructive-soft-fg"
            light="~5.5:1"
            dark="~7.0:1"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          The chroma tokens cannot pass 4.5:1 against their own tints. Use{' '}
          <span className="text-mono-sm">--success-soft-fg</span>, <span className="text-mono-sm">--info-soft-fg</span>,{' '}
          <span className="text-mono-sm">--warning-soft-fg</span>, and{' '}
          <span className="text-mono-sm">--destructive-soft-fg</span> for text on tinted-bg controls (Badge soft
          variants, banners, info pills). Light-mode values are darker than the chroma; dark-mode values are lighter.
        </p>
      </DemoSection>

      <DemoSection title="Theme tokens (light + dark adaptive)">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {SEMANTIC_THEME.map((s) => (
            <Swatch key={s.token} label={s.token} swatchClassName={s.className} value={s.hex} note={s.note} bordered />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          The shadcn-style adaptive layer. These tokens swap values between light and dark mode automatically — reach
          for these by default when painting app surfaces. The hex column shows the resolved value in light / dark.
        </p>
      </DemoSection>

      <DemoSection title="Chart tokens">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CHART_TOKENS.map((s) => (
            <Swatch key={s.token} label={s.token} swatchClassName={s.className} value={s.hex} />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Five-step palette for charts and data viz. Defined separately from the brand scale so chart accents stay
          stable when the brand shifts.
        </p>
      </DemoSection>
    </>
  );
}
