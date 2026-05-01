import { DemoSection } from "@/showcase/component-page";
import { Badge } from "@/components/ui/badge";

export default function BadgeDemo() {
  return (
    <>
      <DemoSection title="Default" code={`import { Badge } from "@/components/ui/badge"

<Badge>Active</Badge>
<Badge variant="secondary">Pending</Badge>
<Badge variant="destructive">Rejected</Badge>
<Badge variant="outline">Remote</Badge>`}>
        <div className="flex flex-wrap gap-2">
          <Badge>Active</Badge>
          <Badge>Full-time</Badge>
          <Badge>Approved</Badge>
        </div>
      </DemoSection>

      <DemoSection title="Secondary">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Pending</Badge>
          <Badge variant="secondary">Draft</Badge>
          <Badge variant="secondary">In Review</Badge>
        </div>
      </DemoSection>

      <DemoSection title="Destructive">
        <div className="flex flex-wrap gap-2">
          <Badge variant="destructive">Rejected</Badge>
          <Badge variant="destructive">Overdue</Badge>
          <Badge variant="destructive">Terminated</Badge>
        </div>
      </DemoSection>

      <DemoSection title="Outline">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Remote</Badge>
          <Badge variant="outline">Part-time</Badge>
          <Badge variant="outline">Contract</Badge>
        </div>
      </DemoSection>

      <DemoSection title="Truncation with Tooltip" code={`// Long text auto-truncates; hover for full text via tooltip
<Badge className="max-w-30">Senior Software Engineer Lead</Badge>

// Custom tooltip text
<Badge tooltipText="Performance Management Department">PMD</Badge>`}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="max-w-30">Senior Software Engineer Lead</Badge>
          <Badge variant="secondary" className="max-w-25">Performance Management Department</Badge>
          <Badge variant="outline" tooltipText="Performance Management Department">PMD</Badge>
        </div>
      </DemoSection>

      <DemoSection title="Semantic tones" code={`<Badge variant="success">Active</Badge>
<Badge variant="warning">On Hold</Badge>
<Badge variant="info">Planning</Badge>
<Badge variant="muted">Archived</Badge>`}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">On Hold</Badge>
          <Badge variant="info">Planning</Badge>
          <Badge variant="muted">Archived</Badge>
        </div>
      </DemoSection>

      <DemoSection title="With status dot" code={`<Badge variant="success" dot>Active</Badge>
<Badge variant="warning" dot>On Hold</Badge>
<Badge variant="info" dot>Planning</Badge>
<Badge variant="destructive" dot>Failed</Badge>`}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="success" dot>Active</Badge>
          <Badge variant="warning" dot>On Hold</Badge>
          <Badge variant="info" dot>Planning</Badge>
          <Badge variant="destructive" dot>Failed</Badge>
          <Badge variant="muted" dot>Archived</Badge>
        </div>
      </DemoSection>

      <DemoSection title="All Variants">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="muted">Muted</Badge>
        </div>
      </DemoSection>
    </>
  );
}
