import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { DemoSection } from "@/showcase/component-page";

const tags = Array.from({ length: 50 }).map((_, i) => `Tag ${i + 1}`);

export default function ScrollAreaDemo() {
  return (
    <div className="space-y-8">
      <DemoSection title="Vertical" code={`import { ScrollArea } from "@/components/ui/scroll-area"

<ScrollArea className="h-72 w-48 rounded-md border">
  <div className="p-4">
    {items.map((item) => (
      <div key={item} className="text-sm">{item}</div>
    ))}
  </div>
</ScrollArea>`}>
        <ScrollArea className="h-72 w-48 rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
            {tags.map((tag) => (
              <div key={tag}>
                <div className="text-sm">{tag}</div>
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </DemoSection>

      <DemoSection title="Horizontal">
        <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`item-${i + 1}`}
                className="w-[150px] shrink-0 rounded-md border p-4"
              >
                <div className="text-sm font-medium">Item {i + 1}</div>
                <div className="text-xs text-muted-foreground">Description</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DemoSection>
    </div>
  );
}
