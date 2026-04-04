import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { DemoSection } from "@/showcase/component-page";

export default function SonnerDemo() {
  return (
    <div className="space-y-8">
      <Toaster />

      <DemoSection title="Default" code={`import { toast } from "sonner"
import { Button } from "@/components/ui/button"

<Button
  variant="outline"
  onClick={() => toast("Event has been created", {
    description: "Sunday, December 03, 2023 at 9:00 AM",
  })}
>
  Show Toast
</Button>`}>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() => toast("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
            })}
          >
            Show Toast
          </Button>
        </div>
      </DemoSection>

      <DemoSection title="Variants">
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() => toast.success("Changes saved successfully")}
          >
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.error("Something went wrong")}
          >
            Error
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.warning("Please review before continuing")}
          >
            Warning
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.info("New update available")}
          >
            Info
          </Button>
        </div>
      </DemoSection>

      <DemoSection title="With Action">
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() =>
              toast("File deleted", {
                action: {
                  label: "Undo",
                  onClick: () => toast.success("File restored"),
                },
              })
            }
          >
            With Undo Action
          </Button>
        </div>
      </DemoSection>

      <DemoSection title="Promise">
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() =>
              toast.promise(
                new Promise((resolve) => setTimeout(resolve, 2000)),
                {
                  loading: "Loading...",
                  success: "Data loaded successfully",
                  error: "Failed to load data",
                }
              )
            }
          >
            Promise Toast
          </Button>
        </div>
      </DemoSection>
    </div>
  );
}
