import { CheckCircle, TrendingUp, Users } from 'lucide-react';
import { DemoSection } from '@/showcase/component-page';
import { MultiStatCard } from '@/components/ui/multi-stat-card';

export default function MultiStatCardDemo() {
  return (
    <>
      <DemoSection
        title="Funnel: Total / In Progress / Completed"
        code={`<MultiStatCard
  items={[
    { icon: Users, label: 'Total', value: 124, hint: 'Appraisals in stage' },
    { icon: TrendingUp, label: 'In Progress', value: 47, hint: 'Being processed' },
    { icon: CheckCircle, label: 'Completed', value: 77, hint: 'Finished reviews' },
  ]}
/>`}
      >
        <MultiStatCard
          items={[
            { icon: Users, label: 'Total', value: 124, hint: 'Appraisals in stage' },
            { icon: TrendingUp, label: 'In Progress', value: 47, hint: 'Being processed' },
            { icon: CheckCircle, label: 'Completed', value: 77, hint: 'Finished reviews' },
          ]}
        />
      </DemoSection>

      <DemoSection
        title="With deltas"
        code={`<MultiStatCard
  items={[
    { label: 'Active projects', value: 5, hint: 'of 9 total', delta: '+2 QoQ', deltaTone: 'up' },
    { label: 'Open tasks', value: 12, hint: 'across all projects', delta: '+11%', deltaTone: 'down' },
    { label: 'Completion rate', value: 73, suffix: '%', hint: 'of all tasks shipped', delta: '+4 pts', deltaTone: 'up' },
  ]}
/>`}
      >
        <MultiStatCard
          items={[
            { label: 'Active projects', value: 5, hint: 'of 9 total', delta: '+2 QoQ', deltaTone: 'up' },
            { label: 'Open tasks', value: 12, hint: 'across all projects', delta: '+11%', deltaTone: 'down' },
            {
              label: 'Completion rate',
              value: 73,
              suffix: '%',
              hint: 'of all tasks shipped',
              delta: '+4 pts',
              deltaTone: 'up',
            },
          ]}
        />
      </DemoSection>

      <DemoSection
        title="Two-cell split (string values)"
        code={`<MultiStatCard
  items={[
    { label: 'Form Start', value: '01 Sep 2025', hint: 'When form opens' },
    { label: 'Submission Due', value: '30 Apr 2026', hint: 'When form is due' },
  ]}
/>`}
      >
        <MultiStatCard
          items={[
            { label: 'Form Start', value: '01 Sep 2025', hint: 'When form opens' },
            { label: 'Submission Due', value: '30 Apr 2026', hint: 'When form is due' },
          ]}
        />
      </DemoSection>

      <DemoSection
        title="Vertical orientation"
        code={`<MultiStatCard
  orientation="vertical"
  items={[
    { icon: Users, label: 'Total', value: 124 },
    { icon: TrendingUp, label: 'In Progress', value: 47 },
    { icon: CheckCircle, label: 'Completed', value: 77 },
  ]}
  className="max-w-xs"
/>`}
      >
        <MultiStatCard
          orientation="vertical"
          items={[
            { icon: Users, label: 'Total', value: 124 },
            { icon: TrendingUp, label: 'In Progress', value: 47 },
            { icon: CheckCircle, label: 'Completed', value: 77 },
          ]}
          className="max-w-xs"
        />
      </DemoSection>

      <DemoSection
        title="Mixed with single StatCard tiles"
        code={`<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-6">
  <StatCard label="Review Period" value="01 Sep – 30 Apr" hint="Period being evaluated" />
  <StatCard label="Form Start Date" value="01 Sep 2025" hint="When form opens" />
  <StatCard label="Submission Due Date" value="30 Apr 2026" hint="When form is due" />
  <MultiStatCard
    className="sm:col-span-2 xl:col-span-3"
    items={[
      { icon: Users, label: 'Total', value: 124 },
      { icon: TrendingUp, label: 'In Progress', value: 47 },
      { icon: CheckCircle, label: 'Completed', value: 77 },
    ]}
  />
</div>`}
      >
        <MultiStatCard
          items={[
            { icon: Users, label: 'Total', value: 124, hint: 'Appraisals in stage' },
            { icon: TrendingUp, label: 'In Progress', value: 47, hint: 'Being processed' },
            { icon: CheckCircle, label: 'Completed', value: 77, hint: 'Finished reviews' },
          ]}
        />
      </DemoSection>
    </>
  );
}
