import { DemoSection } from "@/showcase/component-page";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LabelDemo() {
  return (
    <>
      <DemoSection title="Label with Input" code={`import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

<div className="grid w-full max-w-sm gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="name@example.com" />
</div>`}>
        <div className="grid w-full max-w-sm gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="name@example.com" />
        </div>
      </DemoSection>

      <DemoSection title="Required Label">
        <div className="grid w-full max-w-sm gap-1.5">
          <Label htmlFor="fullname">
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input id="fullname" placeholder="Enter your full name" />
          <p className="text-sm text-muted-foreground">
            This field is required.
          </p>
        </div>
      </DemoSection>

      <DemoSection title="Disabled State">
        <div className="grid w-full max-w-sm gap-1.5">
          <Label htmlFor="disabled-input" className="opacity-70">
            Department
          </Label>
          <Input
            id="disabled-input"
            placeholder="Engineering"
            disabled
            value="Engineering"
          />
          <p className="text-sm text-muted-foreground">
            The label inherits the disabled appearance when its peer input is
            disabled.
          </p>
        </div>
      </DemoSection>

      <DemoSection title="Multiple Labels">
        <div className="grid w-full max-w-sm gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="first-name">
              First Name <span className="text-destructive">*</span>
            </Label>
            <Input id="first-name" placeholder="John" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="last-name">
              Last Name <span className="text-destructive">*</span>
            </Label>
            <Input id="last-name" placeholder="Doe" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="nickname">Nickname</Label>
            <Input id="nickname" placeholder="Optional" />
          </div>
        </div>
      </DemoSection>
    </>
  );
}
