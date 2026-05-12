# Modal

An opinionated modal with sticky header, scrollable body, and sticky footer. Use for form modals and complex content that may overflow. Replaces the previous low-level `Dialog` exports (removed in `0.9.0`) — for confirmation prompts, use `AlertDialog` instead.

```tsx
import {
  Modal, ModalTrigger, ModalClose, ModalContent,
  ModalHeader, ModalBody, ModalFooter,
} from "@pandaworks-sw/lucid-ui"

<Modal>
  <ModalTrigger asChild>
    <Button>Open Modal</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader title="Edit Employee" description="Update employee details." />
    <ModalBody>
      {/* Scrollable content */}
    </ModalBody>
    <ModalFooter>
      <ModalClose asChild><Button variant="outline">Cancel</Button></ModalClose>
      <Button>Save</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

## `ModalContent` props

- `size?: 'sm' | 'default' | 'lg'` — controls the modal footprint. Default `default`.

| `size` | Width class | When to use |
|---|---|---|
| `sm` | `max-w-lg` (≈ 32rem / 512px) | Compact form prompts: clone, rename, single-field input, simple confirm-with-details. Matches the footprint of the removed `Dialog` component. |
| `default` | `sm:min-w-4xl max-w-4xl` (≈ 56rem / 896px) | Standard form modal: edit employee, create ticket, multi-field forms. |
| `lg` | `sm:min-w-5xl max-w-6xl` (≈ 72rem / 1152px) | Data-heavy modals: detail viewer, side-by-side comparison, embedded table. |

The root receives `data-slot="modal-content"` and `data-size="<size>"` for theming hooks.

## `ModalHeader` props

- `title: string` — Header title
- `description?: string` — Optional description below title
- `showCloseButton?: boolean` — Show X close button (default: `true`)

## Migrating from `Dialog` (removed in `0.9.0`)

| Old | New |
|---|---|
| `<Dialog>` | `<Modal>` |
| `<DialogTrigger>` | `<ModalTrigger>` |
| `<DialogContent>` | `<ModalContent size="sm">` (matches old `max-w-lg` footprint) |
| `<DialogHeader><DialogTitle>...</DialogTitle><DialogDescription>...</DialogDescription></DialogHeader>` | `<ModalHeader title="..." description="..." />` |
| Manual content `<div>` | `<ModalBody>` |
| `<DialogFooter>` | `<ModalFooter>` |
| `<DialogClose>` | `<ModalClose>` |

For confirmation prompts (delete, discard, etc.), migrate to [`AlertDialog`](feedback.md#alertdialog) instead — it disables overlay-click-to-dismiss and is purpose-built for destructive confirmations.
