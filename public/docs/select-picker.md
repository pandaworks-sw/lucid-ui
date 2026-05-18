# SelectPicker

Searchable select with single/multiple mode. Use for long option lists or when search filtering is needed. Discriminated union props based on `mode`.

```tsx
import { SelectPicker } from "@/components/ui/select-picker"

// Single select
<SelectPicker
  mode="single"
  value={country}
  onChange={setCountry}
  placeholder="Select country..."
  searchPlaceholder="Search countries..."
  options={[
    { value: "my", label: "Malaysia" },
    { value: "sg", label: "Singapore" },
  ]}
/>

// Multiple select
<SelectPicker
  mode="multiple"
  value={skills}
  onChange={setSkills}
  placeholder="Select skills..."
  options={[
    { value: "react", label: "React" },
    { value: "typescript", label: "TypeScript" },
  ]}
/>
```

Props:
- `mode: "single" | "multiple"` -- Determines value/onChange types
- Single: `value: string`, `onChange: (value: string) => void`
- Multiple: `value: string[]`, `onChange: (value: string[]) => void`
- `options: { value: string; label: string }[]`
- `placeholder?: string`
- `searchPlaceholder?: string`
- `emptyMessage?: string`
- `disabled?: boolean`
- `collapseSelectedAt?: number` -- Multiple-mode only. When the number of selected items exceeds this threshold, the trigger collapses to a single `{N} selected` badge instead of rendering one chip per selection. Useful for filter bars and dense forms where many selections would otherwise wrap the trigger across multiple lines. Default: undefined (always render per-item chips).

```tsx
// Collapse to "{N} selected" once more than 3 are picked
<SelectPicker
  mode="multiple"
  value={skills}
  onChange={setSkills}
  options={options}
  collapseSelectedAt={3}
/>
```

When to use SelectPicker vs Select:
- Select: < 10 static options, no search needed
- SelectPicker: > 10 options, needs search, or multiple selection
