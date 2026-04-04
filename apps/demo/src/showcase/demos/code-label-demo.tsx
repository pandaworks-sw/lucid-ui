import { DemoSection } from "@/showcase/component-page";
import { CodeLabel } from "@/components/ui/code-label";

export default function CodeLabelDemo() {
  return (
    <>
      <DemoSection title="Default" code={`import { CodeLabel } from "@/components/ui/code-label"

<CodeLabel value="pnpm dlx shadcn@latest add button" />
<CodeLabel value="EMP-2024-001" size="sm" />`}>
        <div className="flex flex-col gap-3">
          <CodeLabel value="pnpm dlx shadcn@latest add button" />
          <CodeLabel value="npm install @pandahrms/ui" />
        </div>
      </DemoSection>

      <DemoSection title="Small">
        <div className="flex flex-wrap gap-2">
          <CodeLabel value="EMP-2024-001" size="sm" />
          <CodeLabel value="REF-ABC-123" size="sm" />
          <CodeLabel value="INV-00042" size="sm" />
        </div>
      </DemoSection>

      <DemoSection title="Inline with text">
        <p className="text-sm text-muted-foreground">
          Your employee ID is{" "}
          <CodeLabel value="EMP-2024-001" size="sm" className="inline-flex" />{" "}
          -- click the icon to copy.
        </p>
      </DemoSection>
    </>
  );
}
