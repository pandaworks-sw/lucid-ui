import {
  forwardRef,
  Children,
  isValidElement,
  cloneElement,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  type ReactElement,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, type AvatarShape } from '@/components/ui/avatar';

const avatarGroupVariants = cva('flex items-center', {
  variants: {
    size: {
      xs: '-space-x-1',
      sm: '-space-x-2',
      md: '-space-x-2',
      lg: '-space-x-3',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

const avatarSizeClass = {
  xs: 'size-5 text-[10px]',
  sm: 'size-7 text-xs',
  md: 'size-9 text-sm',
  lg: 'size-12 text-base',
} as const;

type AvatarGroupSize = keyof typeof avatarSizeClass;

export interface AvatarGroupProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof avatarGroupVariants>, 'size'> {
  /** Maximum number of avatars to display before collapsing into a "+N" tile. */
  max?: number;
  size?: AvatarGroupSize;
  shape?: AvatarShape;
}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max, size = 'sm', shape, children, ...props }, ref) => {
    const all = Children.toArray(children).filter(isValidElement) as ReactElement<
      ComponentPropsWithoutRef<typeof Avatar>
    >[];
    const visible = max != null ? all.slice(0, max) : all;
    const overflow = max != null ? all.length - visible.length : 0;

    return (
      <div ref={ref} data-slot="avatar-group" className={cn(avatarGroupVariants({ size }), className)} {...props}>
        {visible.map((child, idx) =>
          cloneElement(child, {
            key: child.key ?? idx,
            shape: child.props.shape ?? shape,
            className: cn(avatarSizeClass[size], 'ring-2 ring-background', child.props.className),
          })
        )}
        {overflow > 0 && (
          <Avatar shape={shape} className={cn(avatarSizeClass[size], 'ring-2 ring-background')}>
            <AvatarFallback className="font-medium">+{overflow}</AvatarFallback>
          </Avatar>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = 'AvatarGroup';

export { AvatarGroup, avatarGroupVariants };
