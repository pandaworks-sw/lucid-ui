import { forwardRef, type HTMLAttributes, type ReactNode, useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EditorControls {
  /** Programmatically save (e.g. on Enter inside an <Input>). */
  save: () => void;
  /** Programmatically cancel (e.g. on Escape inside an <Input>). */
  cancel: () => void;
  /** True while the parent's `onSave` promise is in-flight. */
  isSaving: boolean;
}

export interface InlineEditableFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Field label — visible in both display + edit modes. */
  label: ReactNode;
  /** Display-mode value renderer. Render an empty/muted placeholder when not set. */
  display: ReactNode;
  /** Optional shorthand: shown in display mode when `display` resolves to falsy/empty. */
  emptyText?: string;
  /** Edit-mode form. Receives controls so the editor can wire its own keyboard shortcuts. */
  editor: (controls: EditorControls) => ReactNode;
  /** Called when Save is pressed. Component sets `isSaving` while the returned promise resolves. */
  onSave: () => void | Promise<void>;
  /** Called when Cancel is pressed. */
  onCancel?: () => void;
  /** Disable the Edit affordance entirely (e.g. when the parent is read-only / signed off). */
  disabled?: boolean;
  /** Override the default "Edit" / "Change" button label. */
  editLabel?: string;
}

/**
 * A field that toggles between a display value (with an Edit affordance) and
 * an inline editor (with Save / Cancel). Keeps the display ↔ edit state local
 * and exposes `save` / `cancel` controls into the editor render-prop so the
 * editor can wire Enter / Escape, mutation buttons, etc.
 */
const InlineEditableField = forwardRef<HTMLDivElement, InlineEditableFieldProps>(function InlineEditableField(
  { label, display, emptyText, editor, onSave, onCancel, disabled, editLabel = 'Edit', className, ...rest },
  ref
) {
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      await onSave();
      setEditing(false);
    } finally {
      setIsSaving(false);
    }
  }, [onSave]);

  const handleCancel = useCallback(() => {
    onCancel?.();
    setEditing(false);
  }, [onCancel]);

  const showEmpty =
    !editing && (display === undefined || display === null || (typeof display === 'string' && display.trim() === ''));

  return (
    <div ref={ref} data-slot="inline-editable-field" className={cn('space-y-2', className)} {...rest}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        {!editing && !disabled && (
          <Button size="sm" variant="ghost" onClick={() => setEditing(true)}>
            {editLabel}
          </Button>
        )}
      </div>

      {editing ? (
        <div className="space-y-2">
          {editor({ save: handleSave, cancel: handleCancel, isSaving })}
          <div className="flex gap-2">
            <Button size="sm" action="save" onClick={handleSave} disabled={isSaving}>
              Save
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCancel} disabled={isSaving}>
              Cancel
            </Button>
          </div>
        </div>
      ) : showEmpty ? (
        <div className="text-sm text-muted-foreground">{emptyText ?? 'Not set'}</div>
      ) : (
        <div className="text-sm">{display}</div>
      )}
    </div>
  );
});
InlineEditableField.displayName = 'InlineEditableField';

export { InlineEditableField };
