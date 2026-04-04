import { useState } from "react";
import { DemoSection } from "@/showcase/component-page";
import { DateRangePicker } from "@/components/ui/date-range-picker";

export default function DateRangePickerDemo() {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const [presetStart, setPresetStart] = useState<Date | undefined>(
    new Date(2026, 0, 1),
  );
  const [presetEnd, setPresetEnd] = useState<Date | undefined>(
    new Date(2026, 11, 31),
  );

  return (
    <>
      <DemoSection title="Date Range Picker" code={`import { useState } from "react"
import { DateRangePicker } from "@/components/ui/date-range-picker"

const [startDate, setStartDate] = useState<Date | undefined>()
const [endDate, setEndDate] = useState<Date | undefined>()

<DateRangePicker
  startDate={startDate}
  endDate={endDate}
  onChange={([start, end]) => {
    setStartDate(start ?? undefined)
    setEndDate(end ?? undefined)
  }}
  placeholder={{ start: "Start date", end: "End date" }}
/>`}>
        <div className="grid w-full max-w-lg gap-1.5">
          <p className="text-sm text-muted-foreground">
            Select a start and end date. Each calendar includes quick-select
            shortcuts.
          </p>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={([start, end]) => {
              setStartDate(start ?? undefined);
              setEndDate(end ?? undefined);
            }}
            placeholder={{ start: "Start date", end: "End date" }}
          />
          {startDate && endDate && (
            <p className="text-sm text-muted-foreground">
              Range: {startDate.toLocaleDateString()} -{" "}
              {endDate.toLocaleDateString()}
            </p>
          )}
        </div>
      </DemoSection>

      <DemoSection title="Pre-selected Range">
        <div className="grid w-full max-w-lg gap-1.5">
          <p className="text-sm text-muted-foreground">
            A date range picker with the full year 2026 pre-selected.
          </p>
          <DateRangePicker
            startDate={presetStart}
            endDate={presetEnd}
            onChange={([start, end]) => {
              setPresetStart(start ?? undefined);
              setPresetEnd(end ?? undefined);
            }}
            placeholder={{ start: "From", end: "To" }}
          />
        </div>
      </DemoSection>

      <DemoSection title="Disabled">
        <div className="grid w-full max-w-lg gap-1.5">
          <p className="text-sm text-muted-foreground">
            A disabled date range picker that cannot be interacted with.
          </p>
          <DateRangePicker
            startDate={new Date(2026, 0, 1)}
            endDate={new Date(2026, 5, 30)}
            onChange={() => {}}
            disabled
          />
        </div>
      </DemoSection>
    </>
  );
}
