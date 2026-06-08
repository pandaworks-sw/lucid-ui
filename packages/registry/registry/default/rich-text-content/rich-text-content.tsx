import { forwardRef, useMemo } from 'react';

import { cn } from '@/lib/utils';
import { richTextProseClass, sanitizeRichText } from '@/components/ui/rich-text-editor/rich-text-shared';

export interface RichTextContentProps {
  /** Stored statement HTML to display. Sanitised before rendering. */
  html: string | null | undefined;
  /** Shown when there is no content (after sanitisation). */
  emptyFallback?: React.ReactNode;
  className?: string;
}

/**
 * Read-only renderer for rich-text statement HTML. The HTML is sanitised with
 * `sanitizeRichText` before it reaches the DOM, so stored statement content can
 * never run a script or inject unsafe markup. Typography matches the editor.
 */
const RichTextContent = forwardRef<HTMLDivElement, RichTextContentProps>(function RichTextContent(
  { html, emptyFallback = null, className },
  ref
) {
  const clean = useMemo(() => sanitizeRichText(html), [html]);

  if (clean.trim() === '') {
    return emptyFallback ? <>{emptyFallback}</> : null;
  }

  return (
    <div
      ref={ref}
      data-slot="rich-text-content"
      className={cn(richTextProseClass, className)}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: `clean` is sanitised by DOMPurify via sanitizeRichText — this component exists to render stored HTML safely.
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
});

export { RichTextContent };
