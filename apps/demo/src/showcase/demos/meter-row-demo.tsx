import { DemoSection } from "@/showcase/component-page";
import { MeterRow } from "@/components/ui/meter-row";
import { Badge } from "@/components/ui/badge";

const STATUS_DATA: Array<{
  label: string;
  count: number;
  tone: "info" | "success" | "warning" | "muted";
}> = [
  { label: "Planning", count: 2, tone: "info" },
  { label: "Active", count: 5, tone: "success" },
  { label: "On Hold", count: 1, tone: "warning" },
  { label: "Completed", count: 1, tone: "muted" },
];

const PRIORITY_DATA: Array<{
  label: string;
  count: number;
  tone: "destructive" | "warning" | "info" | "muted";
}> = [
  { label: "Urgent", count: 2, tone: "destructive" },
  { label: "High", count: 2, tone: "warning" },
  { label: "Medium", count: 3, tone: "info" },
  { label: "Low", count: 2, tone: "muted" },
];

export default function MeterRowDemo() {
  const statusMax = Math.max(...STATUS_DATA.map((d) => d.count));

  return (
    <>
      <DemoSection
        title="Plain labeled bars"
        code={`<MeterRow label="Engineering" value={13} max={13} valueLabel={13} />
<MeterRow label="Design" value={7} max={13} valueLabel={7} />`}
      >
        <div className="space-y-3">
          <MeterRow label={<span className="font-medium">Engineering</span>} value={13} max={13} valueLabel={13} />
          <MeterRow label={<span className="font-medium">Design</span>} value={7} max={13} valueLabel={7} />
          <MeterRow label={<span className="font-medium">Operations</span>} value={4} max={13} valueLabel={4} />
          <MeterRow label={<span className="font-medium">Product</span>} value={3} max={13} valueLabel={3} />
          <MeterRow label={<span className="font-medium">Marketing</span>} value={2} max={13} valueLabel={2} />
        </div>
      </DemoSection>

      <DemoSection
        title="Per-row tone with Badge label"
        code={`<MeterRow
  label={<Badge variant="success" dot>Active</Badge>}
  value={5}
  max={5}
  valueLabel={5}
  tone="success"
/>`}
      >
        <div className="space-y-3">
          {STATUS_DATA.map((d) => (
            <MeterRow
              key={d.label}
              label={<Badge variant={d.tone} dot>{d.label}</Badge>}
              value={d.count}
              max={statusMax}
              valueLabel={d.count}
              tone={d.tone}
            />
          ))}
        </div>
      </DemoSection>

      <DemoSection title="Priority distribution">
        <div className="space-y-3">
          {PRIORITY_DATA.map((d) => (
            <MeterRow
              key={d.label}
              label={
                <Badge variant={d.tone === "destructive" ? "destructive" : d.tone}>
                  {d.label}
                </Badge>
              }
              value={d.count}
              max={Math.max(...PRIORITY_DATA.map((x) => x.count))}
              valueLabel={d.count}
              tone={d.tone}
            />
          ))}
        </div>
      </DemoSection>

      <DemoSection title="Sizes (sm / default / lg)">
        <div className="space-y-3">
          <MeterRow label="Small" value={40} max={100} valueLabel="40%" size="sm" tone="info" />
          <MeterRow label="Default" value={60} max={100} valueLabel="60%" tone="info" />
          <MeterRow label="Large" value={80} max={100} valueLabel="80%" size="lg" tone="info" />
        </div>
      </DemoSection>
    </>
  );
}
