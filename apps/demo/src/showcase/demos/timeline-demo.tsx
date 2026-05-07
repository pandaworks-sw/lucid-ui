import { Card, CardContent } from '@/components/ui/card';
import { Timeline } from '@/components/ui/timeline';
import { DemoSection } from '@/showcase/component-page';

const RECENT = [
  {
    id: '1',
    tone: 'success' as const,
    title: 'Completed: 2.1 System Setup & Configuration',
    subtitle: 'tick · System · 7 May, 14:48',
  },
  {
    id: '2',
    tone: 'info' as const,
    title: 'Updated Special Notes',
    subtitle: 'manual · Kyson Teh · 7 May, 14:12',
  },
  {
    id: '3',
    tone: 'default' as const,
    title: 'Applied template (8 items)',
    subtitle: 'manual · Kyson Teh · 7 May, 09:31',
  },
];

const SINGLE = [
  { id: '1', tone: 'warning' as const, title: 'Project marked at risk', subtitle: 'system · 22 May, 09:00' },
];

export default function TimelineDemo() {
  return (
    <>
      <DemoSection
        title="Mixed-tone activity feed"
        code={`<Timeline
  items={[
    { id: '1', tone: 'success', title: 'Completed: 2.1 Setup', subtitle: 'tick · System · 14:48' },
    { id: '2', tone: 'info', title: 'Updated Special Notes', subtitle: 'manual · Kyson · 14:12' },
    { id: '3', tone: 'default', title: 'Applied template', subtitle: 'manual · Kyson · 09:31' },
  ]}
/>`}
      >
        <Card>
          <CardContent className="p-6">
            <Timeline items={RECENT} />
          </CardContent>
        </Card>
      </DemoSection>

      <DemoSection
        title="Single event with hidden connector"
        code={`<Timeline
  hideConnector
  items={[{ id: '1', tone: 'warning', title: 'Project marked at risk', subtitle: 'system · 09:00' }]}
/>`}
      >
        <Card>
          <CardContent className="p-6">
            <Timeline hideConnector items={SINGLE} />
          </CardContent>
        </Card>
      </DemoSection>

      <DemoSection
        title="Empty state"
        code={`<Timeline items={[]} emptyState={<EmptyState size="sm" title="No activity yet" />} />`}
      >
        <Card>
          <CardContent className="p-6">
            <Timeline
              items={[]}
              emptyState={<p className="text-sm text-muted-foreground">No activity yet — nothing has happened.</p>}
            />
          </CardContent>
        </Card>
      </DemoSection>
    </>
  );
}
