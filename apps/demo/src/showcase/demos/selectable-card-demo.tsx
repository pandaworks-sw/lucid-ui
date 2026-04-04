import { useState } from "react";
import { DemoSection } from "@/showcase/component-page";
import { SelectableCard } from "@/components/ui/selectable-card";
import { RadioGroup } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import {
  FileTextIcon,
  BarChart3Icon,
  UsersIcon,
  ShieldCheckIcon,
  ZapIcon,
  LayersIcon,
} from "lucide-react";

function SingleSelectDemo() {
  const [value, setValue] = useState("performance");

  return (
    <RadioGroup value={value} onValueChange={setValue} className="grid gap-3">
      <SelectableCard value="performance">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <BarChart3Icon className="size-5" />
          </div>
          <div>
            <p className="font-medium">Performance Reviews</p>
            <p className="text-sm text-muted-foreground">
              Track and manage employee performance evaluations
            </p>
          </div>
        </div>
      </SelectableCard>
      <SelectableCard value="recruitment">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <UsersIcon className="size-5" />
          </div>
          <div>
            <p className="font-medium">Recruitment</p>
            <p className="text-sm text-muted-foreground">
              Manage job postings, candidates, and hiring pipelines
            </p>
          </div>
        </div>
      </SelectableCard>
      <SelectableCard value="compliance">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ShieldCheckIcon className="size-5" />
          </div>
          <div>
            <p className="font-medium">Compliance</p>
            <p className="text-sm text-muted-foreground">
              Ensure regulatory compliance across departments
            </p>
          </div>
        </div>
      </SelectableCard>
    </RadioGroup>
  );
}

function MultiSelectDemo() {
  const [features, setFeatures] = useState({
    notifications: true,
    analytics: false,
    export: false,
  });

  return (
    <div className="grid gap-3">
      <SelectableCard
        checked={features.notifications}
        onCheckedChange={(checked) =>
          setFeatures((prev) => ({ ...prev, notifications: checked }))
        }
      >
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
            <ZapIcon className="size-5" />
          </div>
          <div>
            <p className="font-medium">Push Notifications</p>
            <p className="text-sm text-muted-foreground">
              Get notified about important updates in real-time
            </p>
          </div>
        </div>
      </SelectableCard>
      <SelectableCard
        checked={features.analytics}
        onCheckedChange={(checked) =>
          setFeatures((prev) => ({ ...prev, analytics: checked }))
        }
      >
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
            <BarChart3Icon className="size-5" />
          </div>
          <div>
            <p className="font-medium">Advanced Analytics</p>
            <p className="text-sm text-muted-foreground">
              Detailed insights and trend analysis for your team
            </p>
          </div>
        </div>
      </SelectableCard>
      <SelectableCard
        checked={features.export}
        onCheckedChange={(checked) =>
          setFeatures((prev) => ({ ...prev, export: checked }))
        }
      >
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400">
            <FileTextIcon className="size-5" />
          </div>
          <div>
            <p className="font-medium">Export Reports</p>
            <p className="text-sm text-muted-foreground">
              Generate and download PDF or Excel reports
            </p>
          </div>
        </div>
      </SelectableCard>
    </div>
  );
}

function SizeVariantsDemo() {
  const [smValue, setSmValue] = useState("sm-a");
  const [lgValue, setLgValue] = useState("lg-a");

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">Small</p>
        <RadioGroup
          value={smValue}
          onValueChange={setSmValue}
          className="grid gap-2"
        >
          <SelectableCard value="sm-a" size="sm">
            <p className="text-sm font-medium">Option A</p>
          </SelectableCard>
          <SelectableCard value="sm-b" size="sm">
            <p className="text-sm font-medium">Option B</p>
          </SelectableCard>
        </RadioGroup>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">Large</p>
        <RadioGroup
          value={lgValue}
          onValueChange={setLgValue}
          className="grid gap-3"
        >
          <SelectableCard value="lg-a" size="lg">
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <LayersIcon className="size-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Enterprise Plan</p>
                  <Badge variant="secondary">Recommended</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Unlimited users, advanced security, and priority support
                </p>
                <p className="mt-1 text-lg font-bold">$99/month</p>
              </div>
            </div>
          </SelectableCard>
          <SelectableCard value="lg-b" size="lg">
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                <LayersIcon className="size-6" />
              </div>
              <div>
                <p className="font-semibold">Starter Plan</p>
                <p className="text-sm text-muted-foreground">
                  Up to 10 users, basic features included
                </p>
                <p className="mt-1 text-lg font-bold">$29/month</p>
              </div>
            </div>
          </SelectableCard>
        </RadioGroup>
      </div>
    </div>
  );
}

function DisabledDemo() {
  return (
    <RadioGroup defaultValue="enabled" className="grid gap-3">
      <SelectableCard value="enabled">
        <p className="font-medium">Available Option</p>
      </SelectableCard>
      <SelectableCard value="disabled" disabled>
        <p className="font-medium">Disabled Option</p>
      </SelectableCard>
    </RadioGroup>
  );
}

export default function SelectableCardDemo() {
  return (
    <>
      <DemoSection title="Single Select (Radio)" code={`import { SelectableCard } from "@/components/ui/selectable-card"
import { RadioGroup } from "@/components/ui/radio-group"

<RadioGroup value={value} onValueChange={setValue} className="grid gap-3">
  <SelectableCard value="option-a">
    <p className="font-medium">Option A</p>
    <p className="text-sm text-muted-foreground">Description for option A</p>
  </SelectableCard>
  <SelectableCard value="option-b">
    <p className="font-medium">Option B</p>
    <p className="text-sm text-muted-foreground">Description for option B</p>
  </SelectableCard>
</RadioGroup>`}>
        <div className="max-w-lg">
          <SingleSelectDemo />
        </div>
      </DemoSection>

      <DemoSection title="Multi Select (Checkbox)">
        <div className="max-w-lg">
          <MultiSelectDemo />
        </div>
      </DemoSection>

      <DemoSection title="Size Variants">
        <div className="max-w-lg">
          <SizeVariantsDemo />
        </div>
      </DemoSection>

      <DemoSection title="Disabled">
        <div className="max-w-lg">
          <DisabledDemo />
        </div>
      </DemoSection>
    </>
  );
}
