import { DemoSection } from '@/showcase/component-page';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarGroup } from '@/components/ui/avatar-group';

const TEAM = [
  { id: '1', initials: 'AR' },
  { id: '2', initials: 'BK' },
  { id: '3', initials: 'CL' },
  { id: '4', initials: 'DM' },
  { id: '5', initials: 'EN' },
  { id: '6', initials: 'FT' },
  { id: '7', initials: 'GH' },
];

export default function AvatarGroupDemo() {
  return (
    <>
      <DemoSection
        title="With overflow"
        code={`<AvatarGroup max={3} size="md">
  {team.map(m => (
    <Avatar key={m.id}>
      <AvatarFallback colorize>{m.initials}</AvatarFallback>
    </Avatar>
  ))}
</AvatarGroup>`}
      >
        <AvatarGroup max={3} size="md">
          {TEAM.map((m) => (
            <Avatar key={m.id}>
              <AvatarFallback colorize>{m.initials}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </DemoSection>

      <DemoSection title="Without max (show all)">
        <AvatarGroup size="md">
          {TEAM.slice(0, 4).map((m) => (
            <Avatar key={m.id}>
              <AvatarFallback colorize>{m.initials}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </DemoSection>

      <DemoSection title="Sizes">
        <div className="flex flex-col gap-4">
          {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
            <div key={size} className="flex items-center gap-3">
              <span className="w-12 text-xs font-medium text-muted-foreground">{size}</span>
              <AvatarGroup size={size} max={4}>
                {TEAM.map((m) => (
                  <Avatar key={m.id}>
                    <AvatarFallback colorize>{m.initials}</AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>
            </div>
          ))}
        </div>
      </DemoSection>

      <DemoSection
        title="Square shape"
        code={`<AvatarGroup max={3} size="md" shape="square">
  …
</AvatarGroup>`}
      >
        <AvatarGroup max={3} size="md" shape="square">
          {TEAM.map((m) => (
            <Avatar key={m.id}>
              <AvatarFallback colorize>{m.initials}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </DemoSection>
    </>
  );
}
