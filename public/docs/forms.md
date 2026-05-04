# Form Components

Input controls and form elements.

## SearchInput

A search input with icon, optional clear button, and built-in debounce for filtering lists.

```tsx
import { SearchInput } from "@/components/ui/search-input"

<SearchInput
  value={query}
  onChange={setQuery}
  onSearch={handleDebouncedSearch}
  onClear={() => setQuery("")}
  placeholder="Search employees..."
  debounce={300}
/>
```

Props:
- `debounce?: number` -- Debounce delay in ms (default: 300)
- `onSearch?: (value: string) => void` -- Fires with the debounced value
- `onChange?: (value: string) => void` -- Fires immediately on every keystroke
- `onClear?: () => void` -- Shows a clear (X) button when provided and value is non-empty
- `value?: string` -- Controlled value
- `placeholder?: string` -- Placeholder text (default: "Search...")

Dependencies: input

## Input

Standard HTML input with consistent styling.

```tsx
import { Input } from "@/components/ui/input"

<Input type="email" placeholder="name@example.com" />
```

## NumberInput

A controlled numeric input with constraint handling, step-aware decimal precision, optional suffix, and inline validation messaging. Wraps `Input` and `Label`.

```tsx
import { useState } from "react"
import { NumberInput } from "@/components/ui/number-input"

const [score, setScore] = useState<number | "">(0)

<NumberInput
  id="score"
  label="Score"
  value={score}
  onChange={setScore}
  minimum={0}
  maximum={100}
  step={5}
  suffix="%"
  helperText="0–100, increments of 5."
/>
```

Behavior:

- **Empty state**: pass `""` (not `undefined`) for the empty value; the `onChange` callback fires with `""` when the field is cleared.
- **Step + decimals**: the precision shown after blur is derived from `step` (e.g. `step={0.05}` → 2 decimal places). Values are formatted with `toFixed(decimalPlaces)`.
- **Constraint messaging**: when blur (or programmatic input) clamps the value to `minimum` / `maximum`, a transient info message appears below the field for ~3 seconds. Pass an `error` string to suppress validation messaging in favor of the persistent error.
- **Keyboard stepping**: ↑ / ↓ adjust by `step` and clamp to bounds. Wheel scrolling on a focused input is intentionally blocked.
- **Suffix**: rendered as a non-interactive label inside the field (e.g. `%`, `h`, `x`); the input gets `pr-12` to make room.

Props:

- `value: number | ""` — controlled value; `""` represents an empty field.
- `onChange: (value: number | "") => void` — fires while typing (when the parsed number passes constraints) and on blur with the formatted value.
- `id?: string`, `label?: string`, `placeholder?: string`, `helperText?: string`, `error?: string`
- `required?: boolean` — adds a destructive `*` after the label.
- `disabled?: boolean`
- `minimum?: number`, `maximum?: number` — inclusive bounds. When omitted, that side is unbounded.
- `step?: number` — defaults to `1`. Drives both arrow-key increment and decimal precision.
- `suffix?: string` — short trailing label rendered inside the field.
- `onBlur?: () => void` — fires after the internal blur formatting completes.
- `className?: string` — applied to the outer wrapper.

Dependencies: input, label

## Label

Accessible label for form controls.

```tsx
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />
```

## Textarea

Multi-line text input.

```tsx
import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Enter description..." />
```

## Checkbox

Checkbox with checked, unchecked, and indeterminate states.

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>
```

## RadioGroup

Mutually exclusive radio options.

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

<RadioGroup defaultValue="option-1">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-2" id="r2" />
    <Label htmlFor="r2">Option 2</Label>
  </div>
</RadioGroup>
```

## Switch

Toggle switch for boolean on/off states.

```tsx
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

<div className="flex items-center gap-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>
```

## Select

Dropdown select built on Radix UI. Use for short, static option lists.

```tsx
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select department..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="engineering">Engineering</SelectItem>
    <SelectItem value="hr">Human Resources</SelectItem>
    <SelectItem value="finance">Finance</SelectItem>
  </SelectContent>
</Select>
```

## DatePicker

Single date picker with calendar popover.

```tsx
import { DatePicker } from "@/components/ui/date-picker"

<DatePicker
  selected={date}
  onChange={setDate}
  placeholder="Select date..."
/>
```

Props:
- `selected?: Date | null`
- `onChange?: (date: Date | null) => void`
- `placeholder?: string`
- `disabled?: boolean`

## DateRangePicker

Dual date picker with quick-select presets for date ranges.

```tsx
import { DateRangePicker } from "@/components/ui/date-range-picker"

<DateRangePicker
  startDate={start}
  endDate={end}
  onChange={([start, end]) => { setStart(start); setEnd(end); }}
  placeholder={{ start: "Start date", end: "End date" }}
/>
```

Props:
- `startDate: Date | undefined`
- `endDate: Date | undefined`
- `onChange: (dates: [Date | null, Date | null]) => void`
- `placeholder?: { start?: string; end?: string }`
- `minDate?: Date`, `maxDate?: Date`

## Slider

Range slider with single/dual thumb support.

```tsx
import { Slider } from "@/components/ui/slider"

<Slider defaultValue={[50]} max={100} step={1} />
```

## SelectableCard

Composable card for single (radio) or multi (checkbox) selection.

```tsx
import {
  SelectableCardGroup, SelectableCard,
  SelectableCardTitle, SelectableCardDescription,
} from "@/components/ui/selectable-card"

// Single select (radio)
<SelectableCardGroup type="single" value={plan} onValueChange={setPlan}>
  <SelectableCard value="basic">
    <SelectableCardTitle>Basic</SelectableCardTitle>
    <SelectableCardDescription>For individuals</SelectableCardDescription>
  </SelectableCard>
  <SelectableCard value="pro">
    <SelectableCardTitle>Pro</SelectableCardTitle>
    <SelectableCardDescription>For teams</SelectableCardDescription>
  </SelectableCard>
</SelectableCardGroup>
```

Sizes: `sm`, `default`, `lg`

Sizing:

| Scenario | Size |
|----------|------|
| Settings page choice (e.g. notification preference, role selection inside a Card) | `sm` |
| Standard onboarding step, plan picker, feature-toggle group | `default` |
| Marketing-style plan/tier picker, hero pricing page | `lg` |

All cards in the same `SelectableCardGroup` must share one size.
