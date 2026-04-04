import { Bold, Italic, Underline } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { DemoSection } from "@/showcase/component-page";

export default function ToggleDemo() {
  return (
    <div className="space-y-8">
      <DemoSection title="Default" code={`import { Bold, Italic } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

<Toggle aria-label="Toggle bold">
  <Bold />
</Toggle>

<Toggle variant="outline" aria-label="Toggle italic">
  <Italic />
  Italic
</Toggle>`}>
        <div className="flex gap-2">
          <Toggle aria-label="Toggle bold">
            <Bold />
          </Toggle>
          <Toggle aria-label="Toggle italic">
            <Italic />
          </Toggle>
          <Toggle aria-label="Toggle underline">
            <Underline />
          </Toggle>
        </div>
      </DemoSection>

      <DemoSection title="Outline">
        <div className="flex gap-2">
          <Toggle variant="outline" aria-label="Toggle bold">
            <Bold />
          </Toggle>
          <Toggle variant="outline" aria-label="Toggle italic">
            <Italic />
          </Toggle>
        </div>
      </DemoSection>

      <DemoSection title="With Text">
        <div className="flex gap-2">
          <Toggle aria-label="Toggle bold">
            <Bold />
            Bold
          </Toggle>
          <Toggle aria-label="Toggle italic">
            <Italic />
            Italic
          </Toggle>
        </div>
      </DemoSection>

      <DemoSection title="Sizes">
        <div className="flex items-center gap-2">
          <Toggle size="sm" aria-label="Toggle small">
            <Bold />
          </Toggle>
          <Toggle size="default" aria-label="Toggle default">
            <Bold />
          </Toggle>
          <Toggle size="lg" aria-label="Toggle large">
            <Bold />
          </Toggle>
        </div>
      </DemoSection>

      <DemoSection title="Disabled">
        <Toggle disabled aria-label="Toggle disabled">
          <Bold />
        </Toggle>
      </DemoSection>
    </div>
  );
}
