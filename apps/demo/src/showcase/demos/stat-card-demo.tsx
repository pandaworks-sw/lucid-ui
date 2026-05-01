import { CheckCircle2, ClipboardList, FolderKanban, Users } from 'lucide-react';
import { DemoSection } from '@/showcase/component-page';
import { StatCard } from '@/components/ui/stat-card';

export default function StatCardDemo() {
  return (
    <>
      <DemoSection
        title="Dashboard quad"
        code={`<StatCard
  icon={FolderKanban}
  label="Active projects"
  value={5}
  hint="of 9 total"
  delta="+2 QoQ"
  deltaTone="up"
/>`}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={FolderKanban}
            label="Active projects"
            value={5}
            hint="of 9 total"
            delta="+2 QoQ"
            deltaTone="up"
          />
          <StatCard
            icon={ClipboardList}
            label="Open tasks"
            value={12}
            hint="across all projects"
            delta="+11%"
            deltaTone="down"
          />
          <StatCard
            icon={CheckCircle2}
            label="Completion rate"
            value={73}
            suffix="%"
            hint="of all tasks shipped"
            delta="+4 pts"
            deltaTone="up"
          />
          <StatCard icon={Users} label="People" value={48} hint="across 5 departments" delta="±0" deltaTone="flat" />
        </div>
      </DemoSection>

      <DemoSection title="Without delta">
        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard label="Total committed budget" value={1250000} suffix=" USD" />
          <StatCard label="Active budget" value={840000} suffix=" USD" hint="67% of portfolio" />
          <StatCard label="Average progress" value={62} suffix="%" />
        </div>
      </DemoSection>

      <DemoSection
        title="String values"
        code={`<StatCard label="Status" value="Active" />
<StatCard label="Tier" value="Enterprise" hint="renews 2026-08-01" />
<StatCard label="Progress" value="8 / 10" delta="+2" deltaTone="up" />
<StatCard label="Last sync" value="N/A" hint="never run" />`}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Status" value="Active" />
          <StatCard label="Tier" value="Enterprise" hint="renews 2026-08-01" />
          <StatCard label="Progress" value="8 / 10" delta="+2" deltaTone="up" />
          <StatCard label="Last sync" value="N/A" hint="never run" />
        </div>
      </DemoSection>

      <DemoSection
        title="Auto-shrink for long values"
        code={`{/* Headline class steps down by rendered length */}
{/* ≤10 → text-xl, ≤16 → text-lg, ≤24 → text-base, >24 → text-sm */}
<StatCard label="Short" value={42} />
<StatCard label="Medium" value="Enterprise Plus" />
<StatCard label="Long" value={1234567890} suffix=" USD" />
<StatCard label="Very long" value="Quarterly recurring revenue projection" />`}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Short" value={42} hint="≤10 chars" />
          <StatCard label="Medium" value="Enterprise Plus" hint="≤16 chars" />
          <StatCard label="Long" value={1234567890} suffix=" USD" hint="≤24 chars" />
          <StatCard label="Very long" value="Quarterly recurring revenue projection" hint=">24 chars" />
        </div>
      </DemoSection>
    </>
  );
}
