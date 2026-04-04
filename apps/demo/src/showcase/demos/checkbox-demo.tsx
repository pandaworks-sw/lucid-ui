import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DemoSection } from "@/showcase/component-page";

export default function CheckboxDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="space-y-8">
      <DemoSection title="Default" code={`import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

<div className="flex items-center gap-3">
  <Checkbox id="terms" checked={checked} onCheckedChange={setChecked} />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`}>
        <div className="flex items-center gap-3">
          <Checkbox id="default" checked={checked} onCheckedChange={(v) => setChecked(v === true)} />
          <Label htmlFor="default">Accept terms and conditions</Label>
        </div>
      </DemoSection>

      <DemoSection title="With Label">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Checkbox id="email" defaultChecked />
            <Label htmlFor="email">Email notifications</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="sms" />
            <Label htmlFor="sms">SMS notifications</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="push" />
            <Label htmlFor="push">Push notifications</Label>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Indeterminate">
        <div className="flex items-center gap-3">
          <Checkbox id="indeterminate" checked="indeterminate" />
          <Label htmlFor="indeterminate">Select all (some selected)</Label>
        </div>
      </DemoSection>

      <DemoSection title="Disabled">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Checkbox id="disabled" disabled />
            <Label htmlFor="disabled" className="opacity-50">Unchecked disabled</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="disabled-checked" disabled defaultChecked />
            <Label htmlFor="disabled-checked" className="opacity-50">Checked disabled</Label>
          </div>
        </div>
      </DemoSection>
    </div>
  );
}
