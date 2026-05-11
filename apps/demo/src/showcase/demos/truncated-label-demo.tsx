import { DemoSection } from '@/showcase/component-page';
import { TruncatedLabel } from '@/components/ui/truncated-label';

const EMPLOYEE_NAME = 'Alexandria Montgomery-Wellington, Senior Principal Customer Operations Strategist';

const FILE_PATH =
  '/Users/team/shared/finance/quarterly-review/2026/apac-consolidated-revenue-model-final-approved.xlsx';

const DESCRIPTION =
  'This benefits eligibility note summarizes contractor conversion history, payroll region changes, and manager approvals needed before the next enrollment window closes.';

export default function TruncatedLabelDemo() {
  return (
    <>
      <DemoSection
        title="Default (single line)"
        code={`import { TruncatedLabel } from "@/components/ui/truncated-label"

<TruncatedLabel text="Alexandria Montgomery-Wellington, Senior Principal Customer Operations Strategist" />`}
      >
        <div className="max-w-[200px] rounded-md border p-2">
          <TruncatedLabel text={EMPLOYEE_NAME} />
        </div>
      </DemoSection>

      <DemoSection title="Multi-line clamp (3 lines)">
        <div className="max-w-[260px] rounded-md border p-2">
          <TruncatedLabel text={DESCRIPTION} lines={3} />
        </div>
      </DemoSection>

      <DemoSection title="Short text (no tooltip)">
        <div className="max-w-[240px] rounded-md border p-2">
          <TruncatedLabel text="Maya Chen, Payroll Lead" />
        </div>
      </DemoSection>

      <DemoSection title="Tooltip side variants">
        <div className="flex flex-wrap gap-3">
          <div className="max-w-[160px] rounded-md border p-2">
            <TruncatedLabel text={FILE_PATH} side="top" />
          </div>
          <div className="max-w-[160px] rounded-md border p-2">
            <TruncatedLabel text={FILE_PATH} side="bottom" />
          </div>
          <div className="max-w-[160px] rounded-md border p-2">
            <TruncatedLabel text={FILE_PATH} side="right" />
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Disable tooltip">
        <div className="max-w-[220px] rounded-md border p-2">
          <TruncatedLabel text={EMPLOYEE_NAME} disableTooltip />
        </div>
      </DemoSection>
    </>
  );
}
