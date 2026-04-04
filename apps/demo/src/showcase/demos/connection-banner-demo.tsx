import { useState } from "react";
import { DemoSection } from "@/showcase/component-page";
import { ConnectionBanner } from "@/components/ui/connection-banner";
import { Button } from "@/components/ui/button";

export default function ConnectionBannerDemo() {
  const [isOnline, setIsOnline] = useState(true);

  const handleRetry = () =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsOnline(true);
        resolve();
      }, 1000);
    });

  return (
    <>
      <DemoSection
        title="Toggle connectivity"
        code={`const [isOnline, setIsOnline] = useState(true);

<ConnectionBanner
  isOnline={isOnline}
  onRetry={async () => {
    await fetch("/api/health");
    setIsOnline(true);
  }}
/>`}
      >
        <div className="space-y-4">
          <Button
            size="sm"
            variant={isOnline ? "destructive" : "default"}
            onClick={() => setIsOnline(!isOnline)}
          >
            {isOnline ? "Simulate Offline" : "Go Online"}
          </Button>

          <div className="relative h-20 overflow-hidden rounded-lg border bg-muted/30">
            <ConnectionBanner
              isOnline={isOnline}
              onRetry={handleRetry}
              className="relative"
            />
            {isOnline && (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Connected - banner is hidden
              </div>
            )}
          </div>
        </div>
      </DemoSection>
    </>
  );
}
