import { DemoSection } from '@/showcase/component-page';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function AvatarDemo() {
  return (
    <>
      <DemoSection
        title="Default"
        code={`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="/avatar.png" alt="John Doe" />
  <AvatarFallback>John Doe</AvatarFallback>
</Avatar>`}
      >
        <p className="text-sm text-muted-foreground">
          Pass a full name as the fallback's children — it auto-converts to 2-character initials and a deterministic
          background color is applied. Already-short strings (e.g. <code className="font-mono text-xs">JD</code>) pass
          through unchanged.
        </p>
        <div className="flex items-center gap-4 pt-3">
          <Avatar>
            <AvatarFallback>John Doe</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-sm text-muted-foreground">Software Engineer</p>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Sizes">
        <div className="flex items-end gap-4">
          <div className="flex flex-col items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">SM</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">Small</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar>
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">Default</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar className="h-12 w-12">
              <AvatarFallback>LG</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">Large</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">XL</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">Extra Large</span>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Group">
        <div className="flex -space-x-3">
          <Avatar className="border-2 border-background">
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-background">
            <AvatarFallback>BK</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-background">
            <AvatarFallback>CL</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-background">
            <AvatarFallback>DM</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-background">
            <AvatarFallback colorize={false} className="text-xs">
              +3
            </AvatarFallback>
          </Avatar>
        </div>
      </DemoSection>

      <DemoSection
        title="From full name"
        code={`<Avatar>
  <AvatarFallback>Alice Reyes</AvatarFallback>
</Avatar>`}
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The fallback runs string children through <code className="font-mono text-xs">getInitialName</code> (from{' '}
            <code className="font-mono text-xs">@/lib</code>), so each name renders as a 2-character monogram — "Alice
            Reyes" → "AR", "Devi Marasinghe" → "DM", "Eli" → "EL".
          </p>
          {[
            { name: 'Alice Reyes', role: 'HR Manager' },
            { name: 'Bob Kim', role: 'Team Lead' },
            { name: 'Clara Lee', role: 'Designer' },
            { name: 'Devi Marasinghe', role: 'Recruiter' },
          ].map((person) => (
            <div key={person.name} className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{person.name}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{person.name}</p>
                <p className="text-sm text-muted-foreground">{person.role}</p>
              </div>
            </div>
          ))}
        </div>
      </DemoSection>

      <DemoSection
        title="Square shape"
        code={`<Avatar shape="square">
  <AvatarFallback colorize>PW</AvatarFallback>
</Avatar>`}
      >
        <p className="text-sm text-muted-foreground">
          Pass <code className="font-mono text-xs">shape="square"</code> to switch from the default circle to a
          rounded-square tile. Useful for project keys, app icons, and other "thing" identities (vs people).
        </p>
        <div className="flex items-center gap-4 pt-3">
          <Avatar shape="square">
            <AvatarFallback colorize>PW</AvatarFallback>
          </Avatar>
          <Avatar shape="square">
            <AvatarFallback colorize>AT</AvatarFallback>
          </Avatar>
          <Avatar shape="square">
            <AvatarFallback colorize>NV</AvatarFallback>
          </Avatar>
          <Avatar shape="square" className="size-12">
            <AvatarFallback colorize>LU</AvatarFallback>
          </Avatar>
        </div>
      </DemoSection>

      <DemoSection
        title="Color palette (default)"
        code={`<Avatar>
  <AvatarFallback>A</AvatarFallback>
</Avatar>`}
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Each fallback derives its background from the first character — A–Z map to 26 evenly spaced OKLCH hues,
            digits and other characters fall back to a deterministic hash. This is on by default; pass{' '}
            <code className="font-mono text-xs">colorize={'{false}'}</code> to opt out.
          </p>
          <div className="flex flex-wrap gap-2">
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
              <Avatar key={letter}>
                <AvatarFallback>{letter}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </DemoSection>

      <DemoSection
        title="Plain (opt out of color)"
        code={`<Avatar>
  <AvatarFallback colorize={false}>JD</AvatarFallback>
</Avatar>`}
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            For neutral monograms (e.g. system tiles, placeholders), set{' '}
            <code className="font-mono text-xs">colorize={'{false}'}</code> to drop back to the muted background.
          </p>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback colorize={false}>JD</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback colorize={false}>+3</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback colorize={false}>?</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </DemoSection>
    </>
  );
}
