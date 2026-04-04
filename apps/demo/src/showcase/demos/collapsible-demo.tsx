import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { DemoSection } from "@/showcase/component-page";

export default function CollapsibleDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-8">
      <DemoSection title="Basic Collapsible" code={`import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible"

<Collapsible>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>
    Content that can be collapsed.
  </CollapsibleContent>
</Collapsible>`}>
        <div className="max-w-sm">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <div className="flex items-center justify-between space-x-4">
              <h4 className="text-sm font-semibold">
                @peduarte starred 3 repositories
              </h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <div className="mt-2 rounded-md border px-4 py-3 text-sm font-mono">
              @radix-ui/primitives
            </div>
            <CollapsibleContent className="space-y-2 mt-2">
              <div className="rounded-md border px-4 py-3 text-sm font-mono">
                @radix-ui/colors
              </div>
              <div className="rounded-md border px-4 py-3 text-sm font-mono">
                @stitches/react
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </DemoSection>
    </div>
  );
}
