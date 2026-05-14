import { forwardRef, type ElementType, type ReactNode } from 'react';
import { Bell } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export interface InboxItem {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  timestamp: ReactNode;
  read?: boolean;
  icon?: ElementType;
  avatarUrl?: string;
  avatarFallback?: string;
  href?: string;
  onClick?: () => void;
}

export interface InboxMenuProps {
  items: InboxItem[];
  onMarkAllRead?: () => void;
  onItemClick?: (id: string) => void;
  viewAllHref?: string;
  onViewAllClick?: () => void;
  disabled?: boolean;
  className?: string;
  align?: 'start' | 'center' | 'end';
  emptyTitle?: ReactNode;
  emptyDescription?: ReactNode;
  triggerLabel?: string;
  maxBadgeCount?: number;
}

function formatBadgeCount(count: number, max: number): string {
  return count > max ? `${max}+` : String(count);
}

const InboxMenu = forwardRef<HTMLButtonElement, InboxMenuProps>(function InboxMenu(
  {
    items,
    onMarkAllRead,
    onItemClick,
    viewAllHref,
    onViewAllClick,
    disabled = false,
    className,
    align = 'end',
    emptyTitle = 'No notifications',
    emptyDescription = "You're all caught up.",
    triggerLabel = 'Notifications',
    maxBadgeCount = 99,
  },
  ref
) {
  const unread = items.filter((item) => !item.read).length;
  const hasUnread = unread > 0;

  return (
    <div className={cn('relative inline-flex', className)} data-slot="inbox-menu">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            size="icon"
            icon={Bell}
            disabled={disabled}
            aria-label={hasUnread ? `${triggerLabel} (${unread} unread)` : triggerLabel}
            data-slot="inbox-menu-trigger"
          />
        </PopoverTrigger>
        <PopoverContent
          align={align}
          sideOffset={6}
          className="w-80 max-w-[min(20rem,calc(100vw-1rem))] p-0"
          data-slot="inbox-menu-content"
        >
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-sm font-semibold">{triggerLabel}</p>
            {onMarkAllRead && hasUnread && (
              <button
                type="button"
                onClick={onMarkAllRead}
                className="text-xs font-medium text-primary hover:underline focus:underline focus:outline-none"
              >
                Mark all read
              </button>
            )}
          </div>
          <Separator />
          {items.length === 0 ? (
            <EmptyState size="sm" icon={<Bell />} title={emptyTitle} description={emptyDescription} className="px-4" />
          ) : (
            <ul className="max-h-96 divide-y overflow-y-auto" data-slot="inbox-menu-list">
              {items.map((item) => {
                const Icon = item.icon;
                const visual =
                  item.avatarUrl || item.avatarFallback ? (
                    <Avatar size="sm">
                      {item.avatarUrl && <AvatarImage src={item.avatarUrl} alt="" />}
                      {item.avatarFallback && <AvatarFallback>{item.avatarFallback}</AvatarFallback>}
                    </Avatar>
                  ) : Icon ? (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <Icon className="h-4 w-4" />
                    </span>
                  ) : (
                    <span
                      aria-hidden
                      className={cn('h-2 w-2 rounded-full', item.read ? 'bg-transparent' : 'bg-primary')}
                    />
                  );
                const rowClasses = cn(
                  'flex w-full items-start gap-3 px-4 py-3 text-left transition-colors',
                  'hover:bg-accent hover:text-accent-foreground',
                  'focus:bg-accent focus:text-accent-foreground focus:outline-none',
                  !item.read && 'bg-muted/30'
                );
                const body = (
                  <>
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center">{visual}</span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          'block truncate text-sm text-foreground',
                          item.read ? 'font-normal' : 'font-semibold'
                        )}
                      >
                        {item.title}
                      </span>
                      {item.description && (
                        <span className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{item.description}</span>
                      )}
                    </span>
                    <span className="shrink-0 whitespace-nowrap text-xs text-muted-foreground">{item.timestamp}</span>
                  </>
                );
                return (
                  <li key={item.id}>
                    {item.href ? (
                      <a href={item.href} onClick={() => onItemClick?.(item.id)} className={rowClasses}>
                        {body}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          item.onClick?.();
                          onItemClick?.(item.id);
                        }}
                        className={rowClasses}
                      >
                        {body}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          {(viewAllHref || onViewAllClick) && (
            <>
              <Separator />
              {viewAllHref ? (
                <a
                  href={viewAllHref}
                  className="block px-4 py-2.5 text-center text-xs font-medium text-primary hover:underline focus:underline focus:outline-none"
                >
                  View all
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onViewAllClick}
                  className="w-full px-4 py-2.5 text-center text-xs font-medium text-primary hover:underline focus:underline focus:outline-none"
                >
                  View all
                </button>
              )}
            </>
          )}
        </PopoverContent>
      </Popover>
      {hasUnread && !disabled && (
        <Badge
          variant="destructive"
          aria-hidden
          className="pointer-events-none absolute -right-1 -top-1 min-w-[1.125rem] justify-center px-1 py-0 text-[10px] leading-4"
        >
          {formatBadgeCount(unread, maxBadgeCount)}
        </Badge>
      )}
    </div>
  );
});

export { InboxMenu };
