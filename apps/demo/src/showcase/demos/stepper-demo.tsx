import { useState } from "react";
import { DemoSection } from "@/showcase/component-page";
import { Stepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";

const basicSteps = [
  { id: 1, title: "Details" },
  { id: 2, title: "Review" },
  { id: 3, title: "Approval" },
  { id: 4, title: "Complete" },
];

const stepsWithDescriptions = [
  { id: 1, title: "Details", description: "Fill in employee information" },
  { id: 2, title: "Review", description: "Check all entries are correct" },
  { id: 3, title: "Approval", description: "Manager signs off" },
  { id: 4, title: "Complete", description: "Process finalized" },
];

const stepsWithTooltip = [
  { id: 1, title: "Details", description: "Fill in employee information" },
  {
    id: 2,
    title: "Review",
    description: "Hover for details",
    tooltip: (
      <div className="space-y-1">
        <p className="font-medium text-sm">Review checklist</p>
        <ul className="list-disc pl-4 text-xs text-muted-foreground">
          <li>Verify personal details</li>
          <li>Confirm department assignment</li>
          <li>Check salary band</li>
        </ul>
      </div>
    ),
  },
  { id: 3, title: "Approval", description: "Manager signs off" },
  { id: 4, title: "Complete", description: "Process finalized" },
];

export default function StepperDemo() {
  const [step1, setStep1] = useState(1);
  const [step2, setStep2] = useState(0);
  const [step3, setStep3] = useState(1);

  return (
    <>
      <DemoSection
        title="Basic"
        code={`const [currentStep, setCurrentStep] = useState(1);

<Stepper
  steps={[
    { id: 1, title: "Details" },
    { id: 2, title: "Review" },
    { id: 3, title: "Approval" },
    { id: 4, title: "Complete" },
  ]}
  currentStep={currentStep}
/>`}
      >
        <div className="space-y-4">
          <Stepper steps={basicSteps} currentStep={step1} />
          <div className="flex justify-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setStep1(Math.max(0, step1 - 1))}
              disabled={step1 === 0}
            >
              Previous
            </Button>
            <Button
              size="sm"
              onClick={() => setStep1(Math.min(basicSteps.length, step1 + 1))}
              disabled={step1 === basicSteps.length}
            >
              Next
            </Button>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="With descriptions">
        <div className="space-y-4">
          <Stepper steps={stepsWithDescriptions} currentStep={step2} />
          <div className="flex justify-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setStep2(Math.max(0, step2 - 1))}
              disabled={step2 === 0}
            >
              Previous
            </Button>
            <Button
              size="sm"
              onClick={() =>
                setStep2(Math.min(stepsWithDescriptions.length, step2 + 1))
              }
              disabled={step2 === stepsWithDescriptions.length}
            >
              Next
            </Button>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="With tooltip">
        <div className="space-y-4">
          <Stepper steps={stepsWithTooltip} currentStep={step3} />
          <div className="flex justify-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setStep3(Math.max(0, step3 - 1))}
              disabled={step3 === 0}
            >
              Previous
            </Button>
            <Button
              size="sm"
              onClick={() =>
                setStep3(Math.min(stepsWithTooltip.length, step3 + 1))
              }
              disabled={step3 === stepsWithTooltip.length}
            >
              Next
            </Button>
          </div>
        </div>
      </DemoSection>
    </>
  );
}
