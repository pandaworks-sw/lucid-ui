# TagInput

A free-form-and/or-allowlist multi-tag input. The user types into an inline input, presses Enter (or comma) to commit a chip, and Backspace on an empty input removes the last chip. Each committed value renders as a `Badge` with a built-in remove (×) button.

Three behaviours coexist in one component:

1. **Free-form** (default): users type any value.
2. **Suggestions** (`suggestions` prop): users type to filter a dropdown of known values, click to add. Free-form is still allowed.
3. **Allowlist only** (`suggestions` + `allowFreeForm={false}`): the user can only pick values from the suggestion list. Free-form commits are blocked with an inline error.

## Usage

### Free-form

```tsx
import { TagInput } from "@pandaworks-sw/lucid-ui";

const [tags, setTags] = useState<string[]>([]);

<TagInput value={tags} onChange={setTags} placeholder="Add a tag…" />
```

### With suggestions (free-form + autocomplete)

```tsx
<TagInput
  value={skills}
  onChange={setSkills}
  suggestions={["React", "TypeScript", "Tailwind CSS", "Node.js"]}
  placeholder="Search or add a skill…"
/>
```

The popover opens as the user types and shows entries from `suggestions` that already-match the current text and aren't already in `value`. Clicking a suggestion commits it.

### Allowlist only

```tsx
<TagInput
  value={categories}
  onChange={setCategories}
  suggestions={ALLOWED_CATEGORIES}
  allowFreeForm={false}
/>
```

Free-form commits surface an inline error (`"foo" is not in the allowed list.`).

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | `string[]` | — | Required. Controlled list of committed tags. |
| `onChange` | `(next: string[]) => void` | — | Required. Fires whenever the list changes (add/remove). |
| `suggestions` | `string[]` | — | When provided, opens an autocomplete popover as the user types. |
| `allowFreeForm` | `boolean` | `true` | When `false` (and `suggestions` is set), free-form commits are blocked with an inline error. |
| `max` | `number` | — | Caps the number of tags. Once reached, the input is disabled and a hint is shown. |
| `validate` | `(v: string) => string \| null` | — | Returns an error message to block a commit; the message renders inline below the input. |
| `delimiters` | `(',' \| 'Enter' \| 'Tab' \| ' ')[]` | `[',', 'Enter']` | Keys that commit the current text. Commas inside a pasted block also split into multiple tags. |
| `placeholder` | `string` | `"Add a tag…"` | Shown only when the tag list is empty. |
| `disabled` | `boolean` | `false` | Locks the entire input. |
| `className` | `string` | — | Merged onto the wrapper. |
| `name` | `string` | — | Forwarded to the inner `<input>` (useful when used inside a native form, but the component does NOT serialize to a single form field — wire it via your form library). |
| `id` | `string` | auto | `id` for the inner `<input>` (pairs with `<Label htmlFor>`). |
| `aria-invalid` | `boolean \| 'true' \| 'false'` | — | Forwards to the inner `<input>` and tints the border / focus ring `destructive`. |
| `aria-describedby` | `string` | — | Forwards to the inner `<input>`. |

## Behaviour

- **Commit triggers**: any key in `delimiters` while the input has non-empty text. Also: a comma inside the typed/pasted text splits the chunk into multiple tags.
- **Duplicates**: blocked silently. The text resets, no error.
- **Empty strings**: ignored.
- **Backspace on empty input**: removes the last chip.
- **Escape**: closes the suggestions popover.
- **Disabled**: blocks all commits and the chip × buttons.
- **Cap reached**: the input is disabled and a `Maximum of N tags reached.` hint replaces the placeholder area.

## When to reach for something else

- Picking from a static list of < 10 options (no free-form needed)? Use `SelectPicker` with `mode="multiple"`.
- Picking users specifically? Use `UserPicker`.
- A single tag chip (read-only)? Use `Badge` directly.
- Need typed values (numbers, objects)? Compose your own — `TagInput` is intentionally `string[]`-only.

## Accessibility

- The chip remove button has `aria-label="Remove <tag>"`.
- Inline error messages render with `role="alert"`.
- The component does not announce suggestions to screen readers via ARIA combobox semantics yet — power-keyboard users can still rely on Enter/Backspace.
