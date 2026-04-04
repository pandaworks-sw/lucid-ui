import { DemoSection } from "@/showcase/component-page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputDemo() {
  return (
    <>
      <DemoSection title="Default" code={`import { Input } from "@/components/ui/input"

<Input placeholder="Search employees..." />`}>
        <div className="max-w-sm">
          <Input />
        </div>
      </DemoSection>

      <DemoSection title="With Placeholder">
        <div className="max-w-sm">
          <Input placeholder="Search employees..." />
        </div>
      </DemoSection>

      <DemoSection title="Disabled">
        <div className="max-w-sm">
          <Input disabled placeholder="Disabled input" value="Cannot edit" />
        </div>
      </DemoSection>

      <DemoSection title="With Label">
        <div className="grid w-full max-w-sm gap-1.5">
          <Label htmlFor="employee-name">Employee Name</Label>
          <Input id="employee-name" placeholder="Enter employee name" />
        </div>
      </DemoSection>

      <DemoSection title="Email">
        <div className="grid w-full max-w-sm gap-1.5">
          <Label htmlFor="input-email">Email</Label>
          <Input
            type="email"
            id="input-email"
            placeholder="name@company.com"
          />
        </div>
      </DemoSection>

      <DemoSection title="Password">
        <div className="grid w-full max-w-sm gap-1.5">
          <Label htmlFor="input-password">Password</Label>
          <Input
            type="password"
            id="input-password"
            placeholder="Enter password"
          />
        </div>
      </DemoSection>

      <DemoSection title="Number">
        <div className="grid w-full max-w-sm gap-1.5">
          <Label htmlFor="input-number">Years of Experience</Label>
          <Input
            type="number"
            id="input-number"
            placeholder="0"
            min={0}
            max={50}
          />
        </div>
      </DemoSection>

      <DemoSection title="File">
        <div className="grid w-full max-w-sm gap-1.5">
          <Label htmlFor="input-file">Resume</Label>
          <Input type="file" id="input-file" />
        </div>
      </DemoSection>
    </>
  );
}
