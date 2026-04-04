import { useState } from "react";
import { DemoSection } from "@/showcase/component-page";
import { DatePicker } from "@/components/ui/date-picker";

export default function DatePickerDemo() {
  const [date, setDate] = useState<Date | null>(null);
  const [preselectedDate, setPreselectedDate] = useState<Date | null>(
    new Date(),
  );

  return (
    <>
      <DemoSection title="Date Picker" code={`import { useState } from "react"
import { DatePicker } from "@/components/ui/date-picker"

const [date, setDate] = useState<Date | null>(null)

<DatePicker
  selected={date}
  onChange={setDate}
  placeholder="Pick a date"
/>`}>
        <div className="grid w-full max-w-sm gap-1.5">
          <p className="text-sm text-muted-foreground">
            Pick a date using the calendar popover.
          </p>
          <DatePicker
            selected={date}
            onChange={setDate}
            placeholder="Pick a date"
          />
          {date && (
            <p className="text-sm text-muted-foreground">
              Selected: {date.toLocaleDateString()}
            </p>
          )}
        </div>
      </DemoSection>

      <DemoSection title="Pre-selected Date">
        <div className="grid w-full max-w-sm gap-1.5">
          <p className="text-sm text-muted-foreground">
            A date picker with today pre-selected.
          </p>
          <DatePicker
            selected={preselectedDate}
            onChange={setPreselectedDate}
            placeholder="Pick a date"
          />
          {preselectedDate && (
            <p className="text-sm text-muted-foreground">
              Selected: {preselectedDate.toLocaleDateString()}
            </p>
          )}
        </div>
      </DemoSection>

      <DemoSection title="Disabled">
        <div className="grid w-full max-w-sm gap-1.5">
          <p className="text-sm text-muted-foreground">
            A disabled date picker that cannot be interacted with.
          </p>
          <DatePicker
            selected={new Date()}
            onChange={() => {}}
            placeholder="Pick a date"
            disabled
          />
        </div>
      </DemoSection>
    </>
  );
}
