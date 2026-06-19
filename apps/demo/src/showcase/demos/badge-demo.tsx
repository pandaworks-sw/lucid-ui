import { CheckCircle2, Clock, GitBranch, Star, Zap } from 'lucide-react';

import { DemoSection } from '@/showcase/component-page';
import { Badge } from '@/components/ui/badge';

export default function BadgeDemo() {
  return (
    <>
      <DemoSection
        title="Default"
        code={`import { Badge } from "@/components/ui/badge"

<Badge>Active</Badge>
<Badge variant="secondary">Pending</Badge>
<Badge variant="destructive">Rejected</Badge>
<Badge variant="outline">Remote</Badge>`}
      >
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

      <DemoSection
        title="Truncation with Tooltip"
        code={`// Long text auto-truncates; hover for full text via tooltip
<Badge className="max-w-30">Senior Software Engineer Lead</Badge>

// Custom tooltip text
<Badge tooltipText="Performance Management Department">PMD</Badge>`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="max-w-30">Senior Software Engineer Lead</Badge>
          <Badge variant="secondary" className="max-w-25">
            Performance Management Department
          </Badge>
          <Badge variant="outline" tooltipText="Performance Management Department">
            PMD
          </Badge>
        </div>
      </DemoSection>

      <DemoSection
        title="Colored outlines"
        code={`// Transparent fill + tone-tinted border and text — one outline per tone.
<Badge variant="outline-primary">Primary</Badge>
<Badge variant="outline-secondary">Secondary</Badge>
<Badge variant="outline-muted">Muted</Badge>
<Badge variant="outline-success">Active</Badge>
<Badge variant="outline-warning">On Hold</Badge>
<Badge variant="outline-info">Planning</Badge>
<Badge variant="outline-destructive">Rejected</Badge>

// Compose with dot / icon like any other variant
<Badge variant="outline-success" dot>Active</Badge>
<Badge variant="outline-info" icon={Zap}>Beta</Badge>`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline-primary">Primary</Badge>
          <Badge variant="outline-secondary">Secondary</Badge>
          <Badge variant="outline-muted">Muted</Badge>
          <Badge variant="outline-success">Active</Badge>
          <Badge variant="outline-warning">On Hold</Badge>
          <Badge variant="outline-info">Planning</Badge>
          <Badge variant="outline-destructive">Rejected</Badge>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant="outline-success" dot>
            Active
          </Badge>
          <Badge variant="outline-warning" dot>
            On Hold
          </Badge>
          <Badge variant="outline-info" icon={Zap}>
            Beta
          </Badge>
          <Badge variant="outline-destructive" icon={Clock}>
            Overdue
          </Badge>
        </div>
      </DemoSection>

      <DemoSection
        title="Semantic tones"
        code={`<Badge variant="success">Active</Badge>
<Badge variant="warning">On Hold</Badge>
<Badge variant="info">Planning</Badge>
<Badge variant="muted">Archived</Badge>`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">On Hold</Badge>
          <Badge variant="info">Planning</Badge>
          <Badge variant="muted">Archived</Badge>
        </div>
      </DemoSection>

      <DemoSection
        title="With status dot"
        code={`<Badge variant="success" dot>Active</Badge>
<Badge variant="warning" dot>On Hold</Badge>
<Badge variant="info" dot>Planning</Badge>
<Badge variant="destructive" dot>Failed</Badge>`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="success" dot>
            Active
          </Badge>
          <Badge variant="warning" dot>
            On Hold
          </Badge>
          <Badge variant="info" dot>
            Planning
          </Badge>
          <Badge variant="destructive" dot>
            Failed
          </Badge>
          <Badge variant="muted" dot>
            Archived
          </Badge>
        </div>
      </DemoSection>

      <DemoSection
        title="With icon"
        code={`import { CheckCircle2, Clock, Star, Zap } from "lucide-react"

// Pass any Lucide icon to the \`icon\` prop — it sizes to match the badge.
<Badge variant="success" icon={CheckCircle2}>Verified</Badge>
<Badge variant="warning" icon={Clock}>Pending</Badge>
<Badge variant="info" icon={Zap}>Beta</Badge>
<Badge variant="outline" icon={Star}>Featured</Badge>

// Works at the smaller \`xs\` size too
<Badge size="xs" variant="muted" icon={GitBranch}>main</Badge>`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="success" icon={CheckCircle2}>
            Verified
          </Badge>
          <Badge variant="warning" icon={Clock}>
            Pending
          </Badge>
          <Badge variant="info" icon={Zap}>
            Beta
          </Badge>
          <Badge variant="outline" icon={Star}>
            Featured
          </Badge>
          <Badge size="xs" variant="muted" icon={GitBranch}>
            main
          </Badge>
          <Badge variant="default" icon={Star} tooltipText="Featured" />
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
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant="outline-primary">Outline Primary</Badge>
          <Badge variant="outline-secondary">Outline Secondary</Badge>
          <Badge variant="outline-muted">Outline Muted</Badge>
          <Badge variant="outline-success">Outline Success</Badge>
          <Badge variant="outline-warning">Outline Warning</Badge>
          <Badge variant="outline-info">Outline Info</Badge>
          <Badge variant="outline-destructive">Outline Destructive</Badge>
        </div>
      </DemoSection>
    </>
  );
}
