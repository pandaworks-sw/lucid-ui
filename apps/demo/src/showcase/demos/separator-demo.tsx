import { DemoSection } from "@/showcase/component-page";
import { Separator } from "@/components/ui/separator";

export default function SeparatorDemo() {
  return (
    <>
      <DemoSection title="Horizontal Separator" code={`import { Separator } from "@/components/ui/separator"

<div className="space-y-4">
  <p>Section One</p>
  <Separator />
  <p>Section Two</p>
</div>

{/* Vertical */}
<div className="flex h-5 items-center space-x-4">
  <span>Item A</span>
  <Separator orientation="vertical" />
  <span>Item B</span>
</div>`}>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Pandahrms</h3>
            <p className="text-sm text-muted-foreground">
              Human Resource Management System
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-medium">Performance</h3>
            <p className="text-sm text-muted-foreground">
              Track and manage employee performance reviews.
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-medium">Recruitment</h3>
            <p className="text-sm text-muted-foreground">
              Streamline your hiring pipeline.
            </p>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Vertical Separator">
        <div className="flex h-5 items-center space-x-4 text-sm">
          <span>Dashboard</span>
          <Separator orientation="vertical" />
          <span>Employees</span>
          <Separator orientation="vertical" />
          <span>Reports</span>
          <Separator orientation="vertical" />
          <span>Settings</span>
        </div>
      </DemoSection>

      <DemoSection title="Separator with Surrounding Content">
        <div className="space-y-4">
          <p className="text-sm">
            Separators visually divide content into clear groups. Use horizontal
            separators between stacked sections and vertical separators between
            inline items.
          </p>
          <Separator />
          <div className="flex items-center gap-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">
                Receive emails for important updates.
              </p>
            </div>
            <Separator orientation="vertical" className="h-10" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">Push Notifications</p>
              <p className="text-sm text-muted-foreground">
                Get notified on your mobile device.
              </p>
            </div>
          </div>
        </div>
      </DemoSection>
    </>
  );
}
