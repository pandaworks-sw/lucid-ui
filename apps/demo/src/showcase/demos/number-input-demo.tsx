import { useState } from 'react';

import { DemoSection } from '@/showcase/component-page';
import { NumberInput } from '@/components/ui/number-input';

export default function NumberInputDemo() {
  const [basic, setBasic] = useState<number | ''>(10);
  const [bounded, setBounded] = useState<number | ''>(50);
  const [percent, setPercent] = useState<number | ''>(0.25);
  const [hours, setHours] = useState<number | ''>('');
  const [errored, setErrored] = useState<number | ''>(150);

  return (
    <>
      <DemoSection
        title="Default"
        code={`import { NumberInput } from "@/components/ui/number-input"

const [value, setValue] = useState<number | "">(10)

<NumberInput
  id="quantity"
  label="Quantity"
  value={value}
  onChange={setValue}
/>`}
      >
        <div className="max-w-sm">
          <NumberInput id="quantity" label="Quantity" value={basic} onChange={setBasic} />
        </div>
      </DemoSection>

      <DemoSection title="With Min / Max + Helper Text">
        <div className="max-w-sm">
          <NumberInput
            id="bounded"
            label="Score"
            value={bounded}
            onChange={setBounded}
            minimum={0}
            maximum={100}
            step={5}
            helperText="0–100, increments of 5. Use ↑/↓ keys to step."
          />
        </div>
      </DemoSection>

      <DemoSection title="Decimal Step + Suffix">
        <div className="max-w-sm">
          <NumberInput
            id="weight"
            label="Weight"
            value={percent}
            onChange={setPercent}
            minimum={0}
            maximum={1}
            step={0.05}
            suffix="x"
            helperText="Weights are clamped to two decimals via step=0.05."
          />
        </div>
      </DemoSection>

      <DemoSection title="Empty + Required">
        <div className="max-w-sm">
          <NumberInput
            id="hours"
            label="Hours per week"
            placeholder="e.g. 40"
            required
            value={hours}
            onChange={setHours}
            minimum={0}
            maximum={168}
            suffix="h"
          />
        </div>
      </DemoSection>

      <DemoSection title="Error State">
        <div className="max-w-sm">
          <NumberInput
            id="errored"
            label="Headcount"
            value={errored}
            onChange={setErrored}
            minimum={0}
            maximum={100}
            error="Headcount must be 100 or less."
          />
        </div>
      </DemoSection>

      <DemoSection title="Disabled">
        <div className="max-w-sm">
          <NumberInput id="disabled-num" label="Locked" value={42} onChange={() => {}} disabled />
        </div>
      </DemoSection>
    </>
  );
}
