import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DemoSection } from "@/showcase/component-page";

export default function SwitchDemo() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="space-y-8">
      <DemoSection title="Default" code={`import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

<div className="flex items-center gap-2">
  <Switch id="airplane" checked={enabled} onCheckedChange={setEnabled} />
  <Label htmlFor="airplane">Airplane Mode</Label>
</div>`}>
        <div className="flex items-center gap-2">
          <Switch id="airplane" checked={enabled} onCheckedChange={setEnabled} />
          <Label htmlFor="airplane">Airplane Mode</Label>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Status: {enabled ? "On" : "Off"}
        </p>
      </DemoSection>

      <DemoSection title="With Labels">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Switch id="wifi" defaultChecked />
            <Label htmlFor="wifi">Wi-Fi</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="bluetooth" />
            <Label htmlFor="bluetooth">Bluetooth</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="notifications" defaultChecked />
            <Label htmlFor="notifications">Notifications</Label>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Disabled">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Switch id="disabled-off" disabled />
            <Label htmlFor="disabled-off" className="opacity-50">Disabled (off)</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="disabled-on" disabled defaultChecked />
            <Label htmlFor="disabled-on" className="opacity-50">Disabled (on)</Label>
          </div>
        </div>
      </DemoSection>
    </div>
  );
}
