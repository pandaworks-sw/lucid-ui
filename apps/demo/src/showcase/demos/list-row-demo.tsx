import { Mail, Trash2 } from 'lucide-react';
import { DemoSection } from '@/showcase/component-page';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CodeLabel } from '@/components/ui/code-label';
import { ListRow } from '@/components/ui/list-row';

const TEAM = [
  { id: '1', name: 'Ahmad Razif', role: 'Engineering Lead', initials: 'AR' },
  { id: '2', name: 'Lee Wei Ming', role: 'Senior Engineer', initials: 'LW' },
  { id: '3', name: 'Nurul Izzah', role: 'UX Designer', initials: 'NI' },
  { id: '4', name: 'David Chen', role: 'Frontend Engineer', initials: 'DC' },
];

export default function ListRowDemo() {
  return (
    <>
      <DemoSection
        title="With avatar, title, subtitle, and trailing meta"
        code={`<ListRow
  leading={<Avatar><AvatarFallback colorize>AR</AvatarFallback></Avatar>}
  title="Ahmad Razif"
  subtitle="Engineering Lead"
  trailing={<Badge variant="success" dot>Active</Badge>}
/>`}
      >
        <Card>
          <CardContent className="divide-y p-0">
            {TEAM.map((m) => (
              <ListRow
                key={m.id}
                className="px-4"
                leading={
                  <Avatar>
                    <AvatarFallback colorize>{m.initials}</AvatarFallback>
                  </Avatar>
                }
                title={m.name}
                subtitle={m.role}
                trailing={
                  <Badge variant="success" dot>
                    Active
                  </Badge>
                }
              />
            ))}
          </CardContent>
        </Card>
      </DemoSection>

      <DemoSection
        title="Interactive (asButton) — keyboard accessible"
        code={`<ListRow
  asButton
  onClick={() => navigate(...)}
  leading={…}
  title="Notification service extraction"
  subtitle="PW-ATLAS · Atlas Platform Migration"
  trailing={<PriorityBadge priority="high" />}
/>`}
      >
        <Card>
          <CardContent className="divide-y p-0">
            {TEAM.slice(0, 3).map((m) => (
              <ListRow
                key={m.id}
                asButton
                onClick={() => alert(`Open ${m.name}`)}
                className="px-4"
                leading={
                  <Avatar>
                    <AvatarFallback colorize>{m.initials}</AvatarFallback>
                  </Avatar>
                }
                title={m.name}
                subtitle={m.role}
                trailing={<span className="text-xs text-muted-foreground">Click me</span>}
              />
            ))}
          </CardContent>
        </Card>
      </DemoSection>

      <DemoSection
        title="Bordered surface (e.g. API key list)"
        code={`<ListRow
  surface="bordered"
  title="Production · Atlas"
  subtitle={<><CodeLabel value="pw_live_•••" size="sm" /> <Badge variant="muted">read-write</Badge></>}
  trailing={<Button variant="ghost" size="icon-sm" aria-label="Revoke"><Trash2 /></Button>}
/>`}
      >
        <div className="space-y-3">
          <ListRow
            surface="bordered"
            title="Production · Atlas"
            subtitle={
              <span className="flex items-center gap-2">
                <CodeLabel value="pw_live_sk_7fc2••••c341" size="sm" />
                <Badge variant="muted">read-write</Badge>
              </span>
            }
            trailing={
              <div className="flex items-center gap-3">
                <div className="text-right text-xs text-muted-foreground">
                  <p>Created</p>
                  <p className="font-medium text-foreground">2026-02-11</p>
                </div>
                <Button variant="ghost" size="icon-sm" aria-label="Revoke key">
                  <Trash2 className="size-4" />
                </Button>
              </div>
            }
          />
          <ListRow
            surface="bordered"
            title="Staging · Luna"
            subtitle={
              <span className="flex items-center gap-2">
                <CodeLabel value="pw_test_sk_a41d••••88ef" size="sm" />
                <Badge variant="muted">read-only</Badge>
              </span>
            }
            trailing={
              <Button variant="ghost" size="icon-sm" aria-label="Revoke key">
                <Trash2 className="size-4" />
              </Button>
            }
          />
        </div>
      </DemoSection>

      <DemoSection title="Densities (sm / default / lg)">
        <Card>
          <CardContent className="divide-y p-0">
            <ListRow
              density="sm"
              className="px-4"
              leading={<Mail className="size-4 text-muted-foreground" />}
              title="Small density"
              subtitle="Tight rows for compact lists."
            />
            <ListRow
              className="px-4"
              leading={<Mail className="size-4 text-muted-foreground" />}
              title="Default density"
              subtitle="Comfortable row height."
            />
            <ListRow
              density="lg"
              className="px-4"
              leading={<Mail className="size-4 text-muted-foreground" />}
              title="Large density"
              subtitle="Roomy — for cards or settings rows."
            />
          </CardContent>
        </Card>
      </DemoSection>
    </>
  );
}
