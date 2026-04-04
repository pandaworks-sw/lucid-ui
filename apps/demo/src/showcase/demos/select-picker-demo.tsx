import { useState } from "react";
import { Apple, Cherry, Citrus, Grape } from "lucide-react";
import { DemoSection } from "@/showcase/component-page";
import { SelectPicker } from "@/components/ui/select-picker";

const fruitOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "grape", label: "Grape" },
  { value: "mango", label: "Mango" },
  { value: "orange", label: "Orange" },
  { value: "strawberry", label: "Strawberry" },
];

const iconOptions = [
  {
    value: "apple",
    label: "Apple",
    icon: <Apple className="h-4 w-4" />,
    subtitle: "Sweet and crunchy",
  },
  {
    value: "cherry",
    label: "Cherry",
    icon: <Cherry className="h-4 w-4" />,
    subtitle: "Small and tart",
  },
  {
    value: "grape",
    label: "Grape",
    icon: <Grape className="h-4 w-4" />,
    subtitle: "Juicy clusters",
  },
  {
    value: "orange",
    label: "Orange",
    icon: <Citrus className="h-4 w-4" />,
    subtitle: "Rich in vitamin C",
  },
];

const roleOptions = [
  {
    value: "admin",
    label: "Admin",
    subtitle: "Full access to all resources",
  },
  {
    value: "editor",
    label: "Editor",
    subtitle: "Can edit and publish content",
  },
  {
    value: "viewer",
    label: "Viewer",
    subtitle: "Read-only access",
  },
];

const skillOptions = [
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "nextjs", label: "Next.js" },
  { value: "tailwind", label: "Tailwind CSS" },
  { value: "nodejs", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "docker", label: "Docker" },
  { value: "postgresql", label: "PostgreSQL" },
];

export default function SelectPickerDemo() {
  const [singleValue, setSingleValue] = useState("");
  const [iconValue, setIconValue] = useState("");
  const [subtitleValue, setSubtitleValue] = useState("");
  const [multipleValues, setMultipleValues] = useState<string[]>([]);
  const [multiIconValues, setMultiIconValues] = useState<string[]>([]);

  return (
    <>
      <DemoSection title="Single Select" code={`import { SelectPicker } from "@/components/ui/select-picker"

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
]

<SelectPicker
  mode="single"
  value={value}
  onChange={setValue}
  placeholder="Select a fruit..."
  options={options}
/>`}>
        <div className="grid w-full max-w-sm gap-1.5">
          <p className="text-sm text-muted-foreground">
            Select a single item from the dropdown. Supports search filtering.
          </p>
          <SelectPicker
            mode="single"
            value={singleValue}
            onChange={setSingleValue}
            placeholder="Select a fruit..."
            options={fruitOptions}
          />
          {singleValue && (
            <p className="text-sm text-muted-foreground">
              Selected: {fruitOptions.find((o) => o.value === singleValue)?.label}
            </p>
          )}
        </div>
      </DemoSection>

      <DemoSection title="With Icons and Subtitles" code={`import { Apple, Cherry, Grape, Citrus } from "lucide-react"

const options = [
  {
    value: "apple",
    label: "Apple",
    icon: <Apple className="h-4 w-4" />,
    subtitle: "Sweet and crunchy",
  },
  {
    value: "cherry",
    label: "Cherry",
    icon: <Cherry className="h-4 w-4" />,
    subtitle: "Small and tart",
  },
]

<SelectPicker
  mode="single"
  value={value}
  onChange={setValue}
  placeholder="Select a fruit..."
  options={options}
/>`}>
        <div className="grid w-full max-w-sm gap-1.5">
          <p className="text-sm text-muted-foreground">
            Options can include icons and subtitles. Icons appear in the trigger when selected.
          </p>
          <SelectPicker
            mode="single"
            value={iconValue}
            onChange={setIconValue}
            placeholder="Select a fruit..."
            options={iconOptions}
          />
        </div>
      </DemoSection>

      <DemoSection title="Subtitle Only" code={`const options = [
  { value: "admin", label: "Admin", subtitle: "Full access to all resources" },
  { value: "editor", label: "Editor", subtitle: "Can edit and publish content" },
  { value: "viewer", label: "Viewer", subtitle: "Read-only access" },
]

<SelectPicker
  mode="single"
  value={value}
  onChange={setValue}
  placeholder="Select a role..."
  options={options}
/>`}>
        <div className="grid w-full max-w-sm gap-1.5">
          <p className="text-sm text-muted-foreground">
            Subtitles can be used without icons to add descriptive text.
          </p>
          <SelectPicker
            mode="single"
            value={subtitleValue}
            onChange={setSubtitleValue}
            placeholder="Select a role..."
            options={roleOptions}
          />
        </div>
      </DemoSection>

      <DemoSection title="Multiple Select" code={`import { SelectPicker } from "@/components/ui/select-picker"

const options = [
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "nextjs", label: "Next.js" },
]

<SelectPicker
  mode="multiple"
  value={values}
  onChange={setValues}
  placeholder="Select skills..."
  options={options}
/>`}>
        <div className="grid w-full max-w-sm gap-1.5">
          <p className="text-sm text-muted-foreground">
            Select multiple items. Selected items appear as removable badges.
          </p>
          <SelectPicker
            mode="multiple"
            value={multipleValues}
            onChange={setMultipleValues}
            placeholder="Select skills..."
            options={skillOptions}
          />
          {multipleValues.length > 0 && (
            <p className="text-sm text-muted-foreground">
              Selected ({multipleValues.length}):{" "}
              {multipleValues
                .map((v) => skillOptions.find((o) => o.value === v)?.label)
                .join(", ")}
            </p>
          )}
        </div>
      </DemoSection>

      <DemoSection title="Multiple with Icons" code={`const options = [
  { value: "apple", label: "Apple", icon: <Apple className="h-4 w-4" />, subtitle: "Sweet" },
  { value: "cherry", label: "Cherry", icon: <Cherry className="h-4 w-4" />, subtitle: "Tart" },
]

<SelectPicker
  mode="multiple"
  value={values}
  onChange={setValues}
  placeholder="Select fruits..."
  options={options}
/>`}>
        <div className="grid w-full max-w-sm gap-1.5">
          <p className="text-sm text-muted-foreground">
            Multiple select with icons and subtitles. Icons appear in badges.
          </p>
          <SelectPicker
            mode="multiple"
            value={multiIconValues}
            onChange={setMultiIconValues}
            placeholder="Select fruits..."
            options={iconOptions}
          />
        </div>
      </DemoSection>

      <DemoSection title="Disabled">
        <div className="grid w-full max-w-sm gap-1.5">
          <p className="text-sm text-muted-foreground">
            A disabled select picker that cannot be interacted with.
          </p>
          <SelectPicker
            mode="single"
            value="apple"
            onChange={() => {}}
            placeholder="Select a fruit..."
            options={fruitOptions}
            disabled
          />
        </div>
      </DemoSection>
    </>
  );
}
