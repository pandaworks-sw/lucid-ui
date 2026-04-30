import { DemoSection } from "@/showcase/component-page";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AvatarDemo() {
  return (
    <>
      <DemoSection title="Default" code={`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="/avatar.png" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`}>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
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
            <AvatarFallback className="text-xs">+3</AvatarFallback>
          </Avatar>
        </div>
      </DemoSection>

      <DemoSection title="With Names">
        <div className="space-y-4">
          {[
            { initials: "AR", name: "Alice Reyes", role: "HR Manager" },
            { initials: "BK", name: "Bob Kim", role: "Team Lead" },
            { initials: "CL", name: "Clara Lee", role: "Designer" },
          ].map((person) => (
            <div key={person.initials} className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{person.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{person.name}</p>
                <p className="text-sm text-muted-foreground">{person.role}</p>
              </div>
            </div>
          ))}
        </div>
      </DemoSection>

      <DemoSection title="Colorized" code={`<Avatar>
  <AvatarFallback colorize>JD</AvatarFallback>
</Avatar>`}>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Pass <code className="font-mono text-xs">colorize</code> to derive a
            background color from the first character (A–Z mapped to 26 evenly
            spaced hues).
          </p>
          <div className="flex flex-wrap gap-2">
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
              <Avatar key={letter}>
                <AvatarFallback colorize>{letter}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="space-y-3 pt-2">
            {[
              { initials: "AR", name: "Alice Reyes" },
              { initials: "BK", name: "Bob Kim" },
              { initials: "CL", name: "Clara Lee" },
              { initials: "DM", name: "Devi Marasinghe" },
              { initials: "EN", name: "Eli Ng" },
              { initials: "FT", name: "Farah Tan" },
            ].map((person) => (
              <div key={person.initials} className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback colorize>{person.initials}</AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">{person.name}</p>
              </div>
            ))}
          </div>
        </div>
      </DemoSection>
    </>
  );
}
