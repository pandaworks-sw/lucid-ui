import { forwardRef, useEffect, useState, type MutableRefObject, type Ref } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, Link2, List, ListOrdered } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

import { richTextProseClass } from './rich-text-shared';

export interface RichTextEditorProps {
  /** Current value as an HTML string. */
  value: string;
  /** Called with the new HTML string on every edit. */
  onChange: (html: string) => void;
  /** Hint shown while the editor is empty. */
  placeholder?: string;
  /** Read-only / non-editable. */
  disabled?: boolean;
  className?: string;
  id?: string;
  'aria-invalid'?: boolean | 'true' | 'false';
  'aria-describedby'?: string;
}

function assignRef<T>(ref: Ref<T> | undefined, node: T | null) {
  if (typeof ref === 'function') ref(node);
  else if (ref) (ref as MutableRefObject<T | null>).current = node;
}

const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(function RichTextEditor(
  {
    value,
    onChange,
    placeholder = 'Write here…',
    disabled = false,
    className,
    id,
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribedby,
  },
  ref
) {
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const editor = useEditor({
    immediatelyRender: false,
    editable: !disabled,
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: false,
          HTMLAttributes: { rel: 'noopener noreferrer nofollow', target: '_blank' },
        },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor: instance }) => onChange(instance.getHTML()),
    editorProps: {
      attributes: {
        id: id ?? '',
        role: 'textbox',
        'aria-multiline': 'true',
        'aria-invalid': ariaInvalid ? 'true' : 'false',
        ...(ariaDescribedby ? { 'aria-describedby': ariaDescribedby } : {}),
        class: cn('min-h-28 w-full px-3 py-2 outline-none', richTextProseClass),
      },
    },
  });

  // Keep the editor in sync when the value changes from outside (e.g. a reset
  // or loading a default statement). Do not emit an update for an external set.
  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value ?? '', { emitUpdate: false });
    }
  }, [value, editor]);

  useEffect(() => {
    editor?.setEditable(!disabled);
  }, [disabled, editor]);

  function openLinkPopover() {
    setLinkUrl((editor?.getAttributes('link').href as string) ?? '');
    setLinkOpen(true);
  }

  function applyLink() {
    if (!editor) return;
    const url = linkUrl.trim();
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
    setLinkOpen(false);
  }

  return (
    <div
      ref={(node) => assignRef(ref, node)}
      data-slot="rich-text-editor"
      data-disabled={disabled || undefined}
      aria-invalid={ariaInvalid}
      className={cn(
        'w-full rounded-md border border-input bg-input-bg text-sm shadow-xs transition-all duration-150 ease-out ring-offset-background',
        'focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:shadow-sm',
        disabled && 'cursor-not-allowed opacity-40 shadow-none',
        ariaInvalid && 'border-destructive focus-within:ring-destructive',
        className
      )}
    >
      <div
        className={cn(
          'flex flex-wrap items-center gap-0.5 border-b border-border/70 px-1.5 py-1',
          disabled && 'pointer-events-none'
        )}
      >
        <Toggle
          size="sm"
          aria-label="Bold"
          pressed={editor?.isActive('bold') ?? false}
          onPressedChange={() => editor?.chain().focus().toggleBold().run()}
          disabled={disabled}
        >
          <Bold className="size-4" />
        </Toggle>
        <Toggle
          size="sm"
          aria-label="Italic"
          pressed={editor?.isActive('italic') ?? false}
          onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
          disabled={disabled}
        >
          <Italic className="size-4" />
        </Toggle>
        <Separator orientation="vertical" className="mx-1 h-5" />
        <Toggle
          size="sm"
          aria-label="Bullet list"
          pressed={editor?.isActive('bulletList') ?? false}
          onPressedChange={() => editor?.chain().focus().toggleBulletList().run()}
          disabled={disabled}
        >
          <List className="size-4" />
        </Toggle>
        <Toggle
          size="sm"
          aria-label="Numbered list"
          pressed={editor?.isActive('orderedList') ?? false}
          onPressedChange={() => editor?.chain().focus().toggleOrderedList().run()}
          disabled={disabled}
        >
          <ListOrdered className="size-4" />
        </Toggle>
        <Separator orientation="vertical" className="mx-1 h-5" />
        <Popover open={linkOpen} onOpenChange={setLinkOpen}>
          <PopoverTrigger asChild>
            <Toggle
              size="sm"
              aria-label="Add link"
              pressed={editor?.isActive('link') ?? false}
              onPressedChange={openLinkPopover}
              disabled={disabled}
            >
              <Link2 className="size-4" />
            </Toggle>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-72 space-y-2 p-2">
            <Input
              value={linkUrl}
              onChange={(event) => setLinkUrl(event.target.value)}
              placeholder="https://example.com"
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  applyLink();
                }
              }}
              aria-label="Link URL"
            />
            <div className="flex justify-end gap-2">
              <Button type="button" size="sm" variant="ghost" onClick={() => setLinkOpen(false)}>
                Cancel
              </Button>
              <Button type="button" size="sm" onClick={applyLink}>
                {linkUrl.trim() === '' ? 'Remove' : 'Apply'}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
});

export { RichTextEditor };
