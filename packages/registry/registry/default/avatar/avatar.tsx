import { forwardRef, type ComponentPropsWithoutRef, type CSSProperties, type ElementRef, type ReactNode } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn, getInitialName } from '@/lib';

type AvatarShape = 'circle' | 'square';

const shapeClass = (shape?: AvatarShape) => (shape === 'square' ? 'rounded-md' : 'rounded-full');

type AvatarProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
  shape?: AvatarShape;
};

const Avatar = forwardRef<ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, shape, ...props }, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      data-shape={shape ?? 'circle'}
      className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden', shapeClass(shape), className)}
      {...props}
    />
  )
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = forwardRef<
  ElementRef<typeof AvatarPrimitive.Image>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn('aspect-square h-full w-full', className)} {...props} />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AVATAR_HUE_STEP = 360 / 26;

function getColorizeChar(children: ReactNode): string | null {
  if (typeof children === 'string' || typeof children === 'number') {
    const text = String(children).trim();
    return text.length > 0 ? text[0] : null;
  }
  if (Array.isArray(children)) {
    for (const child of children) {
      const found = getColorizeChar(child);
      if (found) return found;
    }
  }
  return null;
}

function getAvatarHue(char: string): number {
  const code = char.toUpperCase().charCodeAt(0);
  let index: number;
  if (code >= 65 && code <= 90) {
    index = code - 65;
  } else if (code >= 48 && code <= 57) {
    index = ((code - 48) * 31) % 26;
  } else {
    index = (((code * 7) % 26) + 26) % 26;
  }
  return index * AVATAR_HUE_STEP;
}

type AvatarFallbackProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
  colorize?: boolean;
};

const AvatarFallback = forwardRef<ElementRef<typeof AvatarPrimitive.Fallback>, AvatarFallbackProps>(
  ({ className, colorize = true, children, style, ...props }, ref) => {
    const displayChildren = typeof children === 'string' ? getInitialName(children) || children : children;

    let computedStyle: CSSProperties | undefined = style;
    if (colorize) {
      const char = getColorizeChar(displayChildren);
      if (char) {
        const hue = getAvatarHue(char);
        computedStyle = {
          backgroundColor: `oklch(0.62 0.14 ${hue})`,
          color: '#ffffff',
          ...style,
        };
      }
    }
    return (
      <AvatarPrimitive.Fallback
        ref={ref}
        className={cn(
          // Inherit the parent Avatar's rounded-* (full or md) so square avatars
          // don't show a round fallback while loading.
          'flex h-full w-full items-center justify-center rounded-[inherit] bg-muted',
          className
        )}
        style={computedStyle}
        {...props}
      >
        {displayChildren}
      </AvatarPrimitive.Fallback>
    );
  }
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
export type { AvatarShape };
