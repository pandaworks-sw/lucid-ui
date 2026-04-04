import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { DemoSection } from "@/showcase/component-page";

export default function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-8">
      <DemoSection title="Single Date Selection" code={`import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"

const [date, setDate] = useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>`}>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
        {date && (
          <p className="mt-3 text-center text-sm text-muted-foreground">
            Selected: {date.toLocaleDateString("en-MY", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </DemoSection>
    </div>
  );
}
