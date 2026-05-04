import {
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  Activity,
  AlertTriangle,
  Info,
  XCircle,
  Archive,
} from 'lucide-react';
import { DemoSection } from '@/showcase/component-page';
import { Badge } from '@/components/ui/badge';
import { MeterRow } from '@/components/ui/meter-row';
import { ProgressStatCard } from '@/components/ui/progress-stat-card';
import { StatCard } from '@/components/ui/stat-card';

interface ToneRowProps {
  name: string;
  meaning: string;
  badge: 'success' | 'warning' | 'info' | 'destructive' | 'muted' | 'secondary';
  meterTone: 'success' | 'warning' | 'info' | 'destructive' | 'muted' | 'default';
  badgeLabel: string;
  meterValue: number;
  icon: typeof TrendingUp;
}

const TONES: ToneRowProps[] = [
  {
    name: 'success',
    meaning: 'Live, approved, healthy, on track',
    badge: 'success',
    meterTone: 'success',
    badgeLabel: 'Active',
    meterValue: 82,
    icon: Activity,
  },
  {
    name: 'warning',
    meaning: 'Approaching a soft limit, needs attention',
    badge: 'warning',
    meterTone: 'warning',
    badgeLabel: 'On Hold',
    meterValue: 64,
    icon: AlertTriangle,
  },
  {
    name: 'info',
    meaning: 'Informational, not started, planning',
    badge: 'info',
    meterTone: 'info',
    badgeLabel: 'Planning',
    meterValue: 48,
    icon: Info,
  },
  {
    name: 'destructive',
    meaning: 'Failed, rejected, hard limit exceeded',
    badge: 'destructive',
    meterTone: 'destructive',
    badgeLabel: 'Blocked',
    meterValue: 22,
    icon: XCircle,
  },
  {
    name: 'muted',
    meaning: 'Archived, inactive, deprecated',
    badge: 'muted',
    meterTone: 'muted',
    badgeLabel: 'Archived',
    meterValue: 14,
    icon: Archive,
  },
  {
    name: 'default / primary',
    meaning: 'Generic / goal progress without good-bad meaning',
    badge: 'secondary',
    meterTone: 'default',
    badgeLabel: 'Tag',
    meterValue: 56,
    icon: Sparkles,
  },
];

export default function TonesDemo() {
  return (
    <>
      <DemoSection title="Semantic tone palette">
        <div className="overflow-hidden rounded-lg border bg-background">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr className="border-b text-left">
                <th className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tone</th>
                <th className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Meaning
                </th>
                <th className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Badge
                </th>
                <th className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  MeterRow
                </th>
              </tr>
            </thead>
            <tbody>
              {TONES.map((t) => (
                <tr key={t.name} className="border-b border-border/60 last:border-b-0">
                  <td className="px-4 py-3 align-middle">
                    <span className="text-mono-sm text-foreground">{t.name}</span>
                  </td>
                  <td className="px-4 py-3 align-middle text-muted-foreground">{t.meaning}</td>
                  <td className="px-4 py-3 align-middle">
                    <Badge variant={t.badge} dot={t.badge !== 'secondary'}>
                      {t.badgeLabel}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <div className="w-32">
                      <MeterRow value={t.meterValue} tone={t.meterTone} size="sm" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          Tone is shared vocabulary across the registry — pick the tone by what the value <em>means</em>, not by what
          color you want. The same status maps to the same tone everywhere (Badge, MeterRow, ProgressStatCard, StatCard
          delta). Match the row tone to the corresponding Badge tone in any breakdown chart.
        </p>
      </DemoSection>

      <DemoSection title="Badge tones with optional dot">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="success" dot>
            Active
          </Badge>
          <Badge variant="warning" dot>
            On Hold
          </Badge>
          <Badge variant="info" dot>
            Planning
          </Badge>
          <Badge variant="destructive" dot>
            Blocked
          </Badge>
          <Badge variant="muted" dot>
            Archived
          </Badge>
          <Badge variant="secondary">Engineering</Badge>
          <Badge variant="outline">Draft</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Use <span className="text-mono-sm">dot</span> for status pills (Active, On Hold, Blocked) — the dot makes rows
          scannable in a list. Don't use <span className="text-mono-sm">dot</span> for categorical tags (department,
          project key) — those aren't a state.
        </p>
      </DemoSection>

      <DemoSection title="MeterRow tones in context">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3 rounded-lg border bg-background p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Project status breakdown
            </p>
            <MeterRow label="Active" value={42} valueLabel={42} tone="success" size="sm" />
            <MeterRow label="On Hold" value={18} valueLabel={18} tone="warning" size="sm" />
            <MeterRow label="Planning" value={24} valueLabel={24} tone="info" size="sm" />
            <MeterRow label="Blocked" value={6} valueLabel={6} tone="destructive" size="sm" />
            <MeterRow label="Archived" value={10} valueLabel={10} tone="muted" size="sm" />
          </div>
          <div className="space-y-3 rounded-lg border bg-background p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Capacity / quota usage
            </p>
            <MeterRow label="API quota" value={38} valueLabel="38%" tone="default" />
            <MeterRow label="Storage" value={72} valueLabel="72%" tone="warning" />
            <MeterRow label="Bandwidth" value={94} valueLabel="94%" tone="destructive" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Tone follows meaning, not the value itself. 94% bandwidth is destructive because it's <em>past</em> the soft
          limit, not because 94 is a big number.
        </p>
      </DemoSection>

      <DemoSection title="StatCard deltaTone — desirability, not arrow direction">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={TrendingUp}
            label="Active users"
            value={12_450}
            delta="+8.2%"
            deltaTone="up"
            hint="vs last week"
          />
          <StatCard
            icon={TrendingDown}
            label="Support tickets"
            value={132}
            delta="-14%"
            deltaTone="up"
            hint="going down is good"
          />
          <StatCard
            icon={Minus}
            label="Avg response time"
            value="4.2s"
            delta="0%"
            deltaTone="flat"
            hint="within noise"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          <span className="text-mono-sm">deltaTone</span> tracks <strong>desirability</strong>, not arrow direction. A
          metric going down can still be <span className="text-mono-sm">"up"</span> if down is the goal (errors, churn,
          latency). Use <span className="text-mono-sm">"flat"</span> for changes inside noise.
        </p>
      </DemoSection>

      <DemoSection title="ProgressStatCard with tone-aware cells">
        <div className="grid gap-4 sm:grid-cols-2">
          <ProgressStatCard
            title="Cycle progress"
            value="68%"
            progress={68}
            items={[
              { label: 'Completed', value: 18, tone: 'success' },
              { label: 'In progress', value: 7, tone: 'info' },
              { label: 'Overdue', value: 3, tone: 'destructive' },
            ]}
          />
          <ProgressStatCard
            title="Onboarding pipeline"
            valueHint="14 of 22"
            progress={64}
            items={[
              { label: 'Done', value: 14, tone: 'success' },
              { label: 'Pending', value: 5, tone: 'warning' },
              { label: 'Stalled', value: 3, tone: 'muted' },
            ]}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Stat cell tones in <span className="text-mono-sm">ProgressStatCard</span> are graphical emphasis on a count
          (treated under WCAG SC 1.4.11 / 3:1, not 1.4.3 / 4.5:1). For AA-strict text, pair the cell with a Badge or
          icon and leave the cell tone at <span className="text-mono-sm">default</span>.
        </p>
      </DemoSection>
    </>
  );
}
