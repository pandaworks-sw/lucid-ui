import { DemoSection } from "@/showcase/component-page";
import { ErrorFallback } from "@/components/ui/error-fallback";
import { Button } from "@/components/ui/button";

const sampleError = new Error("TypeError: Cannot read properties of undefined (reading 'map')");
const handleReset = () => alert("Reset clicked");

export default function ErrorFallbackDemo() {
  return (
    <>
      <DemoSection
        title="Root variant"
        code={`<ErrorFallback
  error={error}
  onReset={() => window.location.reload()}
  variant="root"
/>`}
      >
        <ErrorFallback
          error={sampleError}
          onReset={handleReset}
          variant="root"
          className="min-h-75"
        />
      </DemoSection>

      <DemoSection
        title="Route variant"
        code={`<ErrorFallback
  error={error}
  onReset={resetErrorBoundary}
  variant="route"
/>`}
      >
        <ErrorFallback
          error={sampleError}
          onReset={handleReset}
          variant="route"
        />
      </DemoSection>

      <DemoSection
        title="With dev details"
        code={`<ErrorFallback
  error={error}
  onReset={resetErrorBoundary}
  showDevDetails
/>`}
      >
        <ErrorFallback
          error={sampleError}
          onReset={handleReset}
          variant="route"
          showDevDetails
        />
      </DemoSection>

      <DemoSection
        title="Custom secondary action"
        code={`<ErrorFallback
  error={error}
  onReset={resetErrorBoundary}
  variant="route"
  secondaryAction={<Button className="flex-1">Go to Dashboard</Button>}
/>`}
      >
        <ErrorFallback
          error={sampleError}
          onReset={handleReset}
          variant="route"
          secondaryAction={
            <Button className="flex-1" onClick={() => alert("Navigate to dashboard")}>
              Go to Dashboard
            </Button>
          }
        />
      </DemoSection>
    </>
  );
}
