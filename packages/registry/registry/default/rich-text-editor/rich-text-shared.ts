import DOMPurify from 'dompurify';

/**
 * Shared typography for rich-text content. Applied to BOTH the editor's editable
 * surface and the read-only `RichTextContent` renderer so authored text and
 * displayed text look identical. Uses semantic tokens only (dark-mode safe).
 */
export const richTextProseClass = cnLike(
  'text-sm leading-relaxed text-foreground',
  '[&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0',
  '[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5',
  '[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5',
  '[&_li]:my-0.5 [&_li>p]:my-0',
  '[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2',
  '[&_strong]:font-semibold [&_h1]:text-lg [&_h1]:font-semibold [&_h1]:mt-3 [&_h1]:mb-1',
  '[&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-3 [&_h2]:mb-1',
  '[&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1',
  '[&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground',
  '[&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.85em]'
);

/** Tags the rich-text statement is allowed to contain after sanitisation. */
export const RICH_TEXT_ALLOWED_TAGS = [
  'p',
  'br',
  'strong',
  'b',
  'em',
  'i',
  'u',
  's',
  'ul',
  'ol',
  'li',
  'a',
  'h1',
  'h2',
  'h3',
  'blockquote',
  'code',
  'pre',
];

/** Attributes allowed on the tags above (links carry href/target/rel only). */
export const RICH_TEXT_ALLOWED_ATTR = ['href', 'target', 'rel'];

/**
 * Sanitise stored statement HTML before it is rendered. Strips scripts, event
 * handlers, and any tag/attribute outside the allow-list above so untrusted
 * statement HTML can never run. This is the FRONTEND safety net; the backend
 * sanitises on save as well (defence in depth).
 */
export function sanitizeRichText(html: string | null | undefined): string {
  return DOMPurify.sanitize(html ?? '', {
    ALLOWED_TAGS: RICH_TEXT_ALLOWED_TAGS,
    ALLOWED_ATTR: RICH_TEXT_ALLOWED_ATTR,
  });
}

/** Tiny local class joiner so this leaf module has no cross-folder import. */
function cnLike(...parts: string[]): string {
  return parts.join(' ');
}
