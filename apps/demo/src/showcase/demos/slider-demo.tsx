import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { DemoSection } from "@/showcase/component-page";

export default function SliderDemo() {
  const [value, setValue] = useState([50]);

  return (
    <div className="space-y-8">
      <DemoSection title="Default" code={`import { useState } from "react"
import { Slider } from "@/components/ui/slider"

const [value, setValue] = useState([50])

<Slider value={value} onValueChange={setValue} max={100} step={1} />`}>
        <div className="w-full max-w-sm space-y-2">
          <Slider value={value} onValueChange={setValue} max={100} step={1} />
          <p className="text-sm text-muted-foreground">Value: {value[0]}</p>
        </div>
      </DemoSection>

      <DemoSection title="Range">
        <div className="w-full max-w-sm">
          <Slider defaultValue={[25, 75]} max={100} step={1} />
        </div>
      </DemoSection>

      <DemoSection title="Steps">
        <div className="w-full max-w-sm">
          <Slider defaultValue={[50]} max={100} step={10} />
        </div>
      </DemoSection>

      <DemoSection title="Disabled">
        <div className="w-full max-w-sm">
          <Slider defaultValue={[50]} max={100} step={1} disabled />
        </div>
      </DemoSection>
    </div>
  );
}
