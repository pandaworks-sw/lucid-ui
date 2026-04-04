import { AlertCircle, Info, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DemoSection } from "@/showcase/component-page";

export default function AlertDemo() {
  return (
    <div className="space-y-8">
      <DemoSection title="Default" code={`import { Terminal } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components using the CLI.
  </AlertDescription>
</Alert>`}>
        <Alert className="max-w-lg">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the CLI.
          </AlertDescription>
        </Alert>
      </DemoSection>

      <DemoSection title="Destructive">
        <Alert variant="destructive" className="max-w-lg">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Your session has expired. Please log in again.
          </AlertDescription>
        </Alert>
      </DemoSection>

      <DemoSection title="Info">
        <Alert variant="info" className="max-w-lg">
          <Info className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            Your account has been updated successfully.
          </AlertDescription>
        </Alert>
      </DemoSection>
    </div>
  );
}
