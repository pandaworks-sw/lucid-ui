# RichTextEditor & RichTextContent

A pair of components for authoring and displaying rich text (formatted) content as an HTML string.

- **`RichTextEditor`** — a [tiptap](https://tiptap.dev)-based editor for authoring. Controlled `value`/`onChange` of an HTML string.
- **`RichTextContent`** — a read-only renderer that **sanitises** the stored HTML with DOMPurify before it reaches the DOM, so untrusted content can never run a script.

Use them together: author with `RichTextEditor`, store the HTML, display it with `RichTextContent`. Both share the same typography so authored and displayed text look identical.

> **Security:** never render stored rich-text HTML with a bare `dangerouslySetInnerHTML`. Always route it through `RichTextContent` (or the exported `sanitizeRichText`) so it is sanitised. The backend should sanitise on save as well — this is the frontend layer of defence in depth.

## Usage

### Editor

```tsx
import { RichTextEditor } from "@pandaworks-sw/lucid-ui";

const [html, setHtml] = useState("");

<RichTextEditor
  value={html}
  onChange={setHtml}
  placeholder="Write the agreement statement…"
/>
```

### Renderer

```tsx
import { RichTextContent } from "@pandaworks-sw/lucid-ui";

<RichTextContent
  html={storedStatementHtml}
  emptyFallback={<span className="text-muted-foreground">No statement yet.</span>}
/>
```

### Read-only editor vs. renderer

For display, prefer `RichTextContent` — it is lighter and sanitises. Use `RichTextEditor` with `disabled` only when you want the editor chrome visible but locked.

## RichTextEditor props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` | `string` | — | Required. Current value as an HTML string. |
| `onChange` | `(html: string) => void` | — | Required. Fires with the new HTML on every edit. |
| `placeholder` | `string` | `"Write here…"` | Hint shown while empty. |
| `disabled` | `boolean` | `false` | Read-only / non-editable; dims the toolbar. |
| `className` | `string` | — | Merged onto the wrapper. |
| `id` | `string` | — | Set on the editable surface (pairs with `<Label htmlFor>`). |
| `aria-invalid` | `boolean \| 'true' \| 'false'` | — | Tints the border / focus ring `destructive`. |
| `aria-describedby` | `string` | — | Forwarded to the editable surface. |

### Toolbar

Bold, italic, bullet list, numbered list, and link. The link button opens a small popover with a URL field; an empty URL removes the link. Links are stored with `rel="noopener noreferrer nofollow"` and `target="_blank"`.

## RichTextContent props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `html` | `string \| null \| undefined` | — | Required. Stored HTML to display. Sanitised before render. |
| `emptyFallback` | `React.ReactNode` | `null` | Rendered when the sanitised content is empty. |
| `className` | `string` | — | Merged onto the wrapper. |

## Sanitisation

`RichTextContent` and the exported `sanitizeRichText(html)` strip everything outside this allow-list:

- **Tags**: `p`, `br`, `strong`, `b`, `em`, `i`, `u`, `s`, `ul`, `ol`, `li`, `a`, `h1`, `h2`, `h3`, `blockquote`, `code`, `pre`.
- **Attributes**: `href`, `target`, `rel`.

Scripts, event handlers (`onclick`, …), `style`, and any other tag/attribute are removed.

## When to reach for something else

- Plain multi-line text with no formatting? Use `Textarea`.
- A single short string? Use `Input`.

## Accessibility

- The editable surface has `role="textbox"` and `aria-multiline="true"`.
- Each toolbar button has an `aria-label` (Bold, Italic, Bullet list, Numbered list, Add link).
- `aria-invalid` tints the border and focus ring to signal a validation error.
