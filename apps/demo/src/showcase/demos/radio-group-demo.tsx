import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { DemoSection } from "@/showcase/component-page";

export default function RadioGroupDemo() {
  const [value, setValue] = useState("comfortable");

  return (
    <div className="space-y-8">
      <DemoSection title="Default" code={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
</RadioGroup>`}>
        <RadioGroup value={value} onValueChange={setValue}>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Comfortable</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Compact</Label>
          </div>
        </RadioGroup>
        {value && (
          <p className="mt-2 text-sm text-muted-foreground">Selected: {value}</p>
        )}
      </DemoSection>

      <DemoSection title="Horizontal">
        <RadioGroup defaultValue="option-one" className="flex gap-4">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-one" id="h1" />
            <Label htmlFor="h1">Option One</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-two" id="h2" />
            <Label htmlFor="h2">Option Two</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-three" id="h3" />
            <Label htmlFor="h3">Option Three</Label>
          </div>
        </RadioGroup>
      </DemoSection>

      <DemoSection title="Disabled">
        <RadioGroup defaultValue="option-one" disabled>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-one" id="d1" />
            <Label htmlFor="d1" className="opacity-50">Selected (disabled)</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-two" id="d2" />
            <Label htmlFor="d2" className="opacity-50">Unselected (disabled)</Label>
          </div>
        </RadioGroup>
      </DemoSection>
    </div>
  );
}
