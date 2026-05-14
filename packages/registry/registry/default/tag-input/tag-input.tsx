import {
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type MutableRefObject,
  type Ref,
} from 'react';
import { X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export type TagInputDelimiter = ',' | 'Enter' | 'Tab' | ' ';

export interface TagInputProps {
  value: string[];
  onChange: (next: string[]) => void;
  suggestions?: string[];
  allowFreeForm?: boolean;
  max?: number;
  validate?: (value: string) => string | null;
  delimiters?: TagInputDelimiter[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
  'aria-invalid'?: boolean | 'true' | 'false';
  'aria-describedby'?: string;
}

const DEFAULT_DELIMITERS: TagInputDelimiter[] = [',', 'Enter'];

function assignRef<T>(ref: Ref<T> | undefined, node: T | null) {
  if (typeof ref === 'function') ref(node);
  else if (ref) (ref as MutableRefObject<T | null>).current = node;
}

const TagInput = forwardRef<HTMLInputElement, TagInputProps>(function TagInput(
  {
    value,
    onChange,
    suggestions,
    allowFreeForm = true,
    max,
    validate,
    delimiters = DEFAULT_DELIMITERS,
    placeholder = 'Add a tag…',
    disabled = false,
    className,
    name,
    id: idProp,
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribedby,
  },
  ref
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      assignRef(ref, node);
    },
    [ref]
  );

  const atCap = max != null && value.length >= max;

  const filteredSuggestions = (suggestions ?? []).filter(
    (suggestion) =>
      !value.includes(suggestion) && (text === '' || suggestion.toLowerCase().includes(text.toLowerCase()))
  );

  const showSuggestions = Boolean(suggestions) && open && !atCap && filteredSuggestions.length > 0;

  function commit(raw: string): boolean {
    const trimmed = raw.trim();
    if (!trimmed) return false;
    if (value.includes(trimmed)) {
      setText('');
      return false;
    }
    if (atCap) return false;
    if (suggestions && !allowFreeForm && !suggestions.includes(trimmed)) {
      setError(`"${trimmed}" is not in the allowed list.`);
      return false;
    }
    if (validate) {
      const message = validate(trimmed);
      if (message) {
        setError(message);
        return false;
      }
    }
    setError(null);
    onChange([...value, trimmed]);
    setText('');
    return true;
  }

  function remove(index: number) {
    onChange(value.slice(0, index).concat(value.slice(index + 1)));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (disabled) return;
    if (event.key === 'Backspace' && text === '' && value.length > 0) {
      event.preventDefault();
      remove(value.length - 1);
      return;
    }
    if (delimiters.includes(event.key as TagInputDelimiter) && text.trim() !== '') {
      event.preventDefault();
      commit(text);
      return;
    }
    if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.value;
    if (delimiters.includes(',') && next.includes(',')) {
      const parts = next.split(',');
      const head = parts.slice(0, -1);
      for (const part of head) {
        commit(part);
      }
      setText(parts[parts.length - 1] ?? '');
      return;
    }
    setText(next);
    setError(null);
    if (next.length > 0) setOpen(true);
  }

  function handleSuggestionClick(suggestion: string) {
    commit(suggestion);
    inputRef.current?.focus();
  }

  return (
    <div className={cn('w-full', className)}>
      <Popover
        open={showSuggestions}
        onOpenChange={(next) => {
          if (!next) setOpen(false);
        }}
      >
        <PopoverAnchor asChild>
          <div
            data-slot="tag-input"
            data-disabled={disabled || undefined}
            aria-invalid={ariaInvalid}
            onClick={() => inputRef.current?.focus()}
            className={cn(
              'flex w-full min-h-9 flex-wrap items-center gap-1.5 rounded-md border border-input bg-input-bg px-2 py-1.5 text-sm shadow-xs transition-all duration-150 ease-out ring-offset-background',
              'focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:shadow-sm',
              disabled && 'cursor-not-allowed opacity-40 shadow-none',
              ariaInvalid && 'border-destructive focus-within:ring-destructive'
            )}
          >
            {value.map((tag, index) => (
              <Badge key={`${tag}-${index}`} variant="secondary" className="gap-1 pl-2 pr-1">
                <span className="truncate">{tag}</span>
                <button
                  type="button"
                  aria-label={`Remove ${tag}`}
                  disabled={disabled}
                  onClick={(event) => {
                    event.stopPropagation();
                    remove(index);
                  }}
                  className="-mr-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full text-secondary-foreground/70 hover:bg-foreground/10 hover:text-secondary-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <input
              ref={setInputRef}
              id={id}
              name={name}
              type="text"
              value={text}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (blurTimer.current) clearTimeout(blurTimer.current);
                setOpen(true);
              }}
              onBlur={() => {
                blurTimer.current = setTimeout(() => setOpen(false), 100);
              }}
              disabled={disabled || atCap}
              placeholder={atCap ? '' : value.length === 0 ? placeholder : ''}
              aria-invalid={ariaInvalid}
              aria-describedby={ariaDescribedby}
              className="min-w-[6rem] flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
            />
          </div>
        </PopoverAnchor>
        <PopoverContent
          align="start"
          sideOffset={4}
          className="w-(--radix-popper-anchor-width) p-1"
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <div className="max-h-60 overflow-auto">
            {filteredSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSuggestionClick(suggestion)}
                className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      {error && (
        <p className="mt-1 text-xs text-destructive-soft-fg" role="alert">
          {error}
        </p>
      )}
      {atCap && !error && <p className="mt-1 text-xs text-muted-foreground">Maximum of {max} tags reached.</p>}
    </div>
  );
});

export { TagInput };
