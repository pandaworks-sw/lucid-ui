import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DemoSection } from "@/showcase/component-page";

export default function SelectDemo() {
  return (
    <div className="space-y-8">
      <DemoSection title="Basic Select" code={`import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select a fruit..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="cherry">Cherry</SelectItem>
  </SelectContent>
</Select>`}>
        <div className="max-w-xs">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="cherry">Cherry</SelectItem>
              <SelectItem value="durian">Durian</SelectItem>
              <SelectItem value="elderberry">Elderberry</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </DemoSection>

      <DemoSection title="With Default Value">
        <div className="max-w-xs">
          <Select defaultValue="banana">
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="cherry">Cherry</SelectItem>
              <SelectItem value="durian">Durian</SelectItem>
              <SelectItem value="elderberry">Elderberry</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </DemoSection>

      <DemoSection title="Disabled">
        <div className="max-w-xs">
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Cannot select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </DemoSection>
    </div>
  );
}
