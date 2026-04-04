import { useState } from "react";
import {
  Save,
  FileText,
  Send,
  Trash2,
  Copy,
  Download,
  Printer,
  Archive,
  Mail,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { DemoSection } from "@/showcase/component-page";
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonMenu,
  SplitButtonMenuItem,
  SplitButtonMenuSeparator,
  SplitButtonMenuLabel,
} from "@/components/ui/split-button";

export default function SplitButtonDemo() {
  const [loading, setLoading] = useState(false);

  function simulateLoading() {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }

  return (
    <div className="space-y-8">
      <DemoSection title="Basic" code={`import { Save, FileText, Send } from "lucide-react"
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonMenu,
  SplitButtonMenuItem,
} from "@/components/ui/split-button"

<SplitButton>
  <SplitButtonAction onClick={handleSave}>
    <Save /> Save
  </SplitButtonAction>
  <SplitButtonMenu>
    <SplitButtonMenuItem onSelect={handleDraft}>
      <FileText /> Save as Draft
    </SplitButtonMenuItem>
    <SplitButtonMenuItem onSelect={handleSubmit}>
      <Send /> Save and Submit
    </SplitButtonMenuItem>
  </SplitButtonMenu>
</SplitButton>`}>
        <div className="flex flex-wrap items-center gap-4">
          <SplitButton>
            <SplitButtonAction onClick={() => {}}>
              <Save /> Save
            </SplitButtonAction>
            <SplitButtonMenu>
              <SplitButtonMenuItem onSelect={() => {}}>
                <FileText /> Save as Draft
              </SplitButtonMenuItem>
              <SplitButtonMenuItem onSelect={() => {}}>
                <Send /> Save and Submit
              </SplitButtonMenuItem>
              <SplitButtonMenuItem onSelect={() => {}}>
                <CheckCircle2 /> Save and Close
              </SplitButtonMenuItem>
            </SplitButtonMenu>
          </SplitButton>
        </div>
      </DemoSection>

      <DemoSection title="Variants">
        <div className="flex flex-wrap items-center gap-4">
          <SplitButton variant="default">
            <SplitButtonAction>Primary</SplitButtonAction>
            <SplitButtonMenu>
              <SplitButtonMenuItem>Option A</SplitButtonMenuItem>
              <SplitButtonMenuItem>Option B</SplitButtonMenuItem>
            </SplitButtonMenu>
          </SplitButton>

          <SplitButton variant="secondary">
            <SplitButtonAction>Secondary</SplitButtonAction>
            <SplitButtonMenu>
              <SplitButtonMenuItem>Option A</SplitButtonMenuItem>
              <SplitButtonMenuItem>Option B</SplitButtonMenuItem>
            </SplitButtonMenu>
          </SplitButton>

          <SplitButton variant="outline">
            <SplitButtonAction>Outline</SplitButtonAction>
            <SplitButtonMenu>
              <SplitButtonMenuItem>Option A</SplitButtonMenuItem>
              <SplitButtonMenuItem>Option B</SplitButtonMenuItem>
            </SplitButtonMenu>
          </SplitButton>

          <SplitButton variant="destructive">
            <SplitButtonAction>
              <Trash2 /> Delete
            </SplitButtonAction>
            <SplitButtonMenu>
              <SplitButtonMenuItem>Delete Selected</SplitButtonMenuItem>
              <SplitButtonMenuSeparator />
              <SplitButtonMenuItem>Delete All</SplitButtonMenuItem>
            </SplitButtonMenu>
          </SplitButton>

          <SplitButton variant="ghost">
            <SplitButtonAction>Ghost</SplitButtonAction>
            <SplitButtonMenu>
              <SplitButtonMenuItem>Option A</SplitButtonMenuItem>
              <SplitButtonMenuItem>Option B</SplitButtonMenuItem>
            </SplitButtonMenu>
          </SplitButton>
        </div>
      </DemoSection>

      <DemoSection title="Sizes">
        <div className="flex flex-wrap items-end gap-4">
          <SplitButton size="sm">
            <SplitButtonAction>Small</SplitButtonAction>
            <SplitButtonMenu>
              <SplitButtonMenuItem>Option A</SplitButtonMenuItem>
              <SplitButtonMenuItem>Option B</SplitButtonMenuItem>
            </SplitButtonMenu>
          </SplitButton>

          <SplitButton size="default">
            <SplitButtonAction>Default</SplitButtonAction>
            <SplitButtonMenu>
              <SplitButtonMenuItem>Option A</SplitButtonMenuItem>
              <SplitButtonMenuItem>Option B</SplitButtonMenuItem>
            </SplitButtonMenu>
          </SplitButton>

          <SplitButton size="lg">
            <SplitButtonAction>Large</SplitButtonAction>
            <SplitButtonMenu>
              <SplitButtonMenuItem>Option A</SplitButtonMenuItem>
              <SplitButtonMenuItem>Option B</SplitButtonMenuItem>
            </SplitButtonMenu>
          </SplitButton>
        </div>
      </DemoSection>

      <DemoSection title="Loading State">
        <div className="flex flex-wrap items-center gap-4">
          <SplitButton loading={loading}>
            <SplitButtonAction onClick={simulateLoading}>
              <Save /> Save
            </SplitButtonAction>
            <SplitButtonMenu>
              <SplitButtonMenuItem>Save as Draft</SplitButtonMenuItem>
              <SplitButtonMenuItem>Save and Submit</SplitButtonMenuItem>
            </SplitButtonMenu>
          </SplitButton>
          <span className="text-sm text-muted-foreground">
            Click to simulate a 2s loading state
          </span>
        </div>
      </DemoSection>

      <DemoSection title="Disabled">
        <div className="flex flex-wrap items-center gap-4">
          <SplitButton disabled>
            <SplitButtonAction>
              <Save /> Save
            </SplitButtonAction>
            <SplitButtonMenu>
              <SplitButtonMenuItem>Save as Draft</SplitButtonMenuItem>
            </SplitButtonMenu>
          </SplitButton>

          <SplitButton variant="outline" disabled>
            <SplitButtonAction>
              <Download /> Export
            </SplitButtonAction>
            <SplitButtonMenu>
              <SplitButtonMenuItem>Export as CSV</SplitButtonMenuItem>
            </SplitButtonMenu>
          </SplitButton>
        </div>
      </DemoSection>

      <DemoSection title="With Labels and Separators">
        <div className="flex flex-wrap items-center gap-4">
          <SplitButton variant="outline">
            <SplitButtonAction>
              <Download /> Export
            </SplitButtonAction>
            <SplitButtonMenu>
              <SplitButtonMenuLabel>Export format</SplitButtonMenuLabel>
              <SplitButtonMenuItem>
                <FileText /> Export as CSV
              </SplitButtonMenuItem>
              <SplitButtonMenuItem>
                <FileText /> Export as Excel
              </SplitButtonMenuItem>
              <SplitButtonMenuSeparator />
              <SplitButtonMenuLabel>Other</SplitButtonMenuLabel>
              <SplitButtonMenuItem>
                <Printer /> Print
              </SplitButtonMenuItem>
              <SplitButtonMenuItem>
                <Mail /> Email Report
              </SplitButtonMenuItem>
            </SplitButtonMenu>
          </SplitButton>
        </div>
      </DemoSection>

      <DemoSection title="HRMS Example: Employee Form Actions">
        <div className="flex flex-wrap items-center gap-4">
          <SplitButton>
            <SplitButtonAction onClick={() => {}}>
              <Save /> Save Employee
            </SplitButtonAction>
            <SplitButtonMenu>
              <SplitButtonMenuItem onSelect={() => {}}>
                <Clock /> Save as Draft
              </SplitButtonMenuItem>
              <SplitButtonMenuItem onSelect={() => {}}>
                <Send /> Save and Send for Approval
              </SplitButtonMenuItem>
              <SplitButtonMenuItem onSelect={() => {}}>
                <CheckCircle2 /> Save and Activate
              </SplitButtonMenuItem>
              <SplitButtonMenuSeparator />
              <SplitButtonMenuItem onSelect={() => {}}>
                <Copy /> Save and Create Another
              </SplitButtonMenuItem>
            </SplitButtonMenu>
          </SplitButton>

          <SplitButton variant="outline">
            <SplitButtonAction onClick={() => {}}>
              <Download /> Export Report
            </SplitButtonAction>
            <SplitButtonMenu>
              <SplitButtonMenuItem onSelect={() => {}}>
                <FileText /> CSV
              </SplitButtonMenuItem>
              <SplitButtonMenuItem onSelect={() => {}}>
                <FileText /> Excel
              </SplitButtonMenuItem>
              <SplitButtonMenuItem onSelect={() => {}}>
                <Printer /> Print
              </SplitButtonMenuItem>
            </SplitButtonMenu>
          </SplitButton>

          <SplitButton variant="destructive">
            <SplitButtonAction onClick={() => {}}>
              <Trash2 /> Remove
            </SplitButtonAction>
            <SplitButtonMenu>
              <SplitButtonMenuItem onSelect={() => {}}>
                <Archive /> Archive Instead
              </SplitButtonMenuItem>
              <SplitButtonMenuSeparator />
              <SplitButtonMenuItem onSelect={() => {}}>
                <Trash2 /> Permanently Delete
              </SplitButtonMenuItem>
            </SplitButtonMenu>
          </SplitButton>
        </div>
      </DemoSection>
    </div>
  );
}
