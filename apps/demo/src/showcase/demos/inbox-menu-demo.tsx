import { useState } from 'react';
import { AtSign, GitPullRequest, MessageSquare, UserPlus } from 'lucide-react';
import { InboxMenu, type InboxItem } from '@/components/ui/inbox-menu';
import { DemoSection } from '@/showcase/component-page';

const SEED_ITEMS: InboxItem[] = [
  {
    id: 'n1',
    title: 'Alice mentioned you',
    description: 'mentioned you in #design — "could you take a look at the empty state?"',
    timestamp: '5m',
    read: false,
    icon: AtSign,
  },
  {
    id: 'n2',
    title: 'New pull request',
    description: 'PRJ-1142 · "Refactor onboarding to use Stepper"',
    timestamp: '23m',
    read: false,
    icon: GitPullRequest,
  },
  {
    id: 'n3',
    title: 'Bob invited you to a project',
    description: '"Customer success Q3 roadmap"',
    timestamp: '1h',
    read: false,
    icon: UserPlus,
  },
  {
    id: 'n4',
    title: 'Comment on your update',
    description: '"Looks great, ship it!"',
    timestamp: '3h',
    read: true,
    avatarFallback: 'CK',
  },
  {
    id: 'n5',
    title: 'Weekly digest ready',
    description: 'Your team shipped 12 changes last week.',
    timestamp: 'Yesterday',
    read: true,
    icon: MessageSquare,
  },
];

export default function InboxMenuDemo() {
  const [items, setItems] = useState<InboxItem[]>(SEED_ITEMS);

  function markAllRead() {
    setItems((current) => current.map((item) => ({ ...item, read: true })));
  }

  function markRead(id: string) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, read: true } : item)));
  }

  function reset() {
    setItems(SEED_ITEMS);
  }

  return (
    <div className="space-y-8">
      <DemoSection
        title="Default (unread + click to mark read)"
        code={`<InboxMenu
  items={items}
  onMarkAllRead={() => markAllReadOnServer()}
  onItemClick={(id) => markReadOnServer(id)}
  viewAllHref="/notifications"
/>`}
      >
        <div className="flex items-center gap-3">
          <InboxMenu items={items} onMarkAllRead={markAllRead} onItemClick={markRead} viewAllHref="#/inbox-menu" />
          <button
            type="button"
            onClick={reset}
            className="text-xs text-muted-foreground underline-offset-2 hover:underline"
          >
            Reset
          </button>
        </div>
      </DemoSection>

      <DemoSection title="Empty state" code={`<InboxMenu items={[]} />`}>
        <InboxMenu items={[]} />
      </DemoSection>

      <DemoSection title="High unread count (capped at 99+)" code={`<InboxMenu items={manyUnread} />`}>
        <InboxMenu
          items={Array.from({ length: 142 }, (_, index) => ({
            id: `m${index}`,
            title: `Notification #${index + 1}`,
            description: 'Body text here.',
            timestamp: '1d',
            read: false,
            icon: MessageSquare,
          }))}
        />
      </DemoSection>

      <DemoSection title="Disabled" code={`<InboxMenu items={items} disabled />`}>
        <InboxMenu items={SEED_ITEMS} disabled />
      </DemoSection>
    </div>
  );
}
