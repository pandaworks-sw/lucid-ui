import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DemoSection } from "@/showcase/component-page";

export default function TextareaDemo() {
  return (
    <div className="space-y-8">
      <DemoSection title="Default" code={`import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Type your message here." />`}>
        <div className="grid w-full max-w-sm gap-1.5">
          <Textarea placeholder="Type your message here." />
        </div>
      </DemoSection>

      <DemoSection title="With Label">
        <div className="grid w-full max-w-sm gap-1.5">
          <Label htmlFor="message">Your message</Label>
          <Textarea id="message" placeholder="Type your message here." />
          <p className="text-sm text-muted-foreground">Your message will be sent to support.</p>
        </div>
      </DemoSection>

      <DemoSection title="Disabled">
        <div className="grid w-full max-w-sm gap-1.5">
          <Textarea disabled placeholder="This textarea is disabled." />
        </div>
      </DemoSection>
    </div>
  );
}
