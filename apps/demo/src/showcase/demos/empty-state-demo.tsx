import { Inbox, FolderKanban, Users } from 'lucide-react';
import { DemoSection } from '@/showcase/component-page';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';

export default function EmptyStateDemo() {
  return (
    <>
      <DemoSection
        title="With icon, title, description, and action"
        code={`<EmptyState
  icon={<FolderKanban />}
  title="No projects match these filters."
  description="Try widening the date range or removing a tag."
  action={<Button variant="outline">Clear filters</Button>}
/>`}
      >
        <EmptyState
          icon={<FolderKanban />}
          title="No projects match these filters."
          description="Try widening the date range or removing a tag."
          action={<Button variant="outline">Clear filters</Button>}
        />
      </DemoSection>

      <DemoSection title="Title only">
        <EmptyState title="Nothing to show yet." />
      </DemoSection>

      <DemoSection title="Sizes">
        <div className="space-y-3">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <div key={size} className="rounded-lg border">
              <EmptyState
                size={size}
                icon={<Inbox />}
                title={`Inbox · size="${size}"`}
                description={size === 'lg' ? 'Plenty of breathing room for hero empties.' : undefined}
              />
            </div>
          ))}
        </div>
      </DemoSection>

      <DemoSection title="Inside a Card content area">
        <EmptyState
          icon={<Users />}
          title="No teammates yet."
          description="Invite the first member to start assigning work."
          action={<Button variant="brand">Invite teammate</Button>}
        />
      </DemoSection>
    </>
  );
}
