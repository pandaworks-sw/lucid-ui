import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { DemoSection } from "@/showcase/component-page";

export default function ProgressDemo() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8">
      <DemoSection title="Default" code={`import { Progress } from "@/components/ui/progress"

<Progress value={66} />`}>
        <div className="w-full max-w-md">
          <Progress value={progress} />
        </div>
      </DemoSection>

      <DemoSection title="Values">
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">0%</p>
            <Progress value={0} />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">25%</p>
            <Progress value={25} />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">50%</p>
            <Progress value={50} />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">75%</p>
            <Progress value={75} />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">100%</p>
            <Progress value={100} />
          </div>
        </div>
      </DemoSection>
    </div>
  );
}
