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
    </>
  );
}
