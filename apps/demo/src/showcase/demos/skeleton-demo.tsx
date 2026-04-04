import { Skeleton } from "@/components/ui/skeleton";
import { DemoSection } from "@/showcase/component-page";

export default function SkeletonDemo() {
  return (
    <div className="space-y-8">
      <DemoSection title="Basic Shapes" code={`import { Skeleton } from "@/components/ui/skeleton"

<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-4 w-[200px]" />
<Skeleton className="h-12 w-12 rounded-full" />`}>
        <div className="space-y-3">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </DemoSection>

      <DemoSection title="Card Skeleton">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Content Skeleton">
        <div className="space-y-4">
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
      </DemoSection>
    </div>
  );
}
