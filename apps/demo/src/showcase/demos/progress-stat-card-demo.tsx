import { DemoSection } from '@/showcase/component-page';
import { ProgressStatCard } from '@/components/ui/progress-stat-card';

export default function ProgressStatCardDemo() {
  return (
    <>
      <DemoSection
        title="Cycle progress (admin) — percent headline"
        code={`<ProgressStatCard
  title="Annual Performance Review 2026"
  value="28.6%"
  progress={28.6}
  items={[
    { label: 'Published', value: 2, tone: 'success' },
    { label: 'In progress', value: 3 },
    { label: 'Overdue', value: 0, tone: 'destructive' },
    { label: 'Not started', value: 2 },
  ]}
/>`}
      >
        <ProgressStatCard
          title="Annual Performance Review 2026"
          value="28.6%"
          progress={28.6}
          items={[
            { label: 'Published', value: 2, tone: 'success' },
            { label: 'In progress', value: 3 },
            { label: 'Overdue', value: 0, tone: 'destructive' },
            { label: 'Not started', value: 2 },
          ]}
        />
      </DemoSection>

      <DemoSection
        title="Team completion (manager) — ratio hint"
        code={`<ProgressStatCard
  title="Team completion"
  valueHint="5 of 12"
  progress={42}
  items={[
    { label: 'In progress', value: 4 },
    { label: 'Completed', value: 5, tone: 'success' },
    { label: 'Overdue', value: 3, tone: 'destructive' },
  ]}
/>`}
      >
        <ProgressStatCard
          title="Team completion"
          valueHint="5 of 12"
          progress={42}
          items={[
            { label: 'In progress', value: 4 },
            { label: 'Completed', value: 5, tone: 'success' },
            { label: 'Overdue', value: 3, tone: 'destructive' },
          ]}
        />
      </DemoSection>

      <DemoSection
        title="No headline — bare progress + cells"
        code={`<ProgressStatCard
  title="Onboarding tasks"
  progress={75}
  items={[
    { label: 'Completed', value: 9, tone: 'success' },
    { label: 'Remaining', value: 3 },
  ]}
/>`}
      >
        <ProgressStatCard
          title="Onboarding tasks"
          progress={75}
          items={[
            { label: 'Completed', value: 9, tone: 'success' },
            { label: 'Remaining', value: 3 },
          ]}
        />
      </DemoSection>

      <DemoSection
        title="All tones"
        code={`<ProgressStatCard
  title="Pipeline by stage"
  value="60%"
  progress={60}
  items={[
    { label: 'Published', value: 12, tone: 'success' },
    { label: 'In review', value: 8, tone: 'info' },
    { label: 'Awaiting input', value: 4, tone: 'warning' },
    { label: 'Overdue', value: 1, tone: 'destructive' },
    { label: 'Not started', value: 5, tone: 'muted' },
  ]}
/>`}
      >
        <ProgressStatCard
          title="Pipeline by stage"
          value="60%"
          progress={60}
          items={[
            { label: 'Published', value: 12, tone: 'success' },
            { label: 'In review', value: 8, tone: 'info' },
            { label: 'Awaiting input', value: 4, tone: 'warning' },
            { label: 'Overdue', value: 1, tone: 'destructive' },
            { label: 'Not started', value: 5, tone: 'muted' },
          ]}
        />
      </DemoSection>
    </>
  );
}
