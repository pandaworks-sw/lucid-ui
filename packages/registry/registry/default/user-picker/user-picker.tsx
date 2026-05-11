import { useMemo, useState, type MouseEvent, type ReactNode, type TouchEvent, type WheelEvent } from 'react';
import { Check, UserCircle } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage, type AvatarSize } from '@/components/ui/avatar';
import { AvatarGroup } from '@/components/ui/avatar-group';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface UserPickerUser {
  id: string;
  name: string;
  email?: string;
  imageUrl?: string | null;
}

interface UserPickerBaseProps {
  users: UserPickerUser[];
  /** Trigger avatar dimensions. Matches the shared AvatarSize scale. */
  size?: AvatarSize;
  /** Shorthand for `size="xs"` — wins over `size` when both are set. */
  compact?: boolean;
  align?: 'start' | 'center' | 'end';
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  currentUserId?: string;
  disabled?: boolean;
  className?: string;
}

interface SingleUserPickerProps extends UserPickerBaseProps {
  mode?: 'single';
  value: string | null;
  onValueChange: (userId: string | null) => void;
  allowUnassigned?: boolean;
  placeholder?: string;
}

interface MultiUserPickerProps extends UserPickerBaseProps {
  mode: 'multi';
  value: string[];
  onValueChange: (userIds: string[]) => void;
  maxAvatarsShown?: number;
  placeholder?: string;
}

export type UserPickerProps = SingleUserPickerProps | MultiUserPickerProps;

const DEFAULT_SEARCH_PLACEHOLDER = 'Search users...';
const DEFAULT_EMPTY_MESSAGE = 'No users found.';
const DEFAULT_SINGLE_PLACEHOLDER = 'Unassigned';
const DEFAULT_MULTI_PLACEHOLDER = 'Assign users';
const SEARCH_THRESHOLD = 8;

function UserPicker(props: UserPickerProps) {
  const {
    users,
    size = 'md',
    compact = false,
    align = 'start',
    searchable,
    searchPlaceholder = DEFAULT_SEARCH_PLACEHOLDER,
    emptyMessage = DEFAULT_EMPTY_MESSAGE,
    currentUserId,
    disabled = false,
    className,
  } = props;

  const [open, setOpen] = useState(false);
  const searchIsActive = searchable !== undefined ? searchable : users.length > SEARCH_THRESHOLD;
  const effectiveSize: AvatarSize = compact ? 'xs' : size;

  if (props.mode === 'multi') {
    return (
      <MultiUserPicker
        users={users}
        value={props.value}
        onValueChange={props.onValueChange}
        placeholder={props.placeholder ?? DEFAULT_MULTI_PLACEHOLDER}
        maxAvatarsShown={props.maxAvatarsShown ?? 3}
        size={effectiveSize}
        align={align}
        searchIsActive={searchIsActive}
        searchPlaceholder={searchPlaceholder}
        emptyMessage={emptyMessage}
        currentUserId={currentUserId}
        disabled={disabled}
        className={className}
        open={open}
        onOpenChange={setOpen}
      />
    );
  }

  return (
    <SingleUserPicker
      users={users}
      value={props.value}
      onValueChange={props.onValueChange}
      allowUnassigned={props.allowUnassigned ?? true}
      placeholder={props.placeholder ?? DEFAULT_SINGLE_PLACEHOLDER}
      size={effectiveSize}
      align={align}
      searchIsActive={searchIsActive}
      searchPlaceholder={searchPlaceholder}
      emptyMessage={emptyMessage}
      currentUserId={currentUserId}
      disabled={disabled}
      className={className}
      open={open}
      onOpenChange={setOpen}
    />
  );
}

function SingleUserPicker({
  users,
  value,
  onValueChange,
  allowUnassigned,
  placeholder,
  size,
  align,
  searchIsActive,
  searchPlaceholder,
  emptyMessage,
  currentUserId,
  disabled,
  className,
  open,
  onOpenChange,
}: {
  users: UserPickerUser[];
  value: string | null;
  onValueChange: (userId: string | null) => void;
  allowUnassigned: boolean;
  placeholder: string;
  size: AvatarSize;
  align: NonNullable<UserPickerBaseProps['align']>;
  searchIsActive: boolean;
  searchPlaceholder: string;
  emptyMessage: string;
  currentUserId?: string;
  disabled: boolean;
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const selectedUser = users.find((user) => user.id === value);
  const sortedUsers = useMemo(() => moveCurrentUserFirst(users, currentUserId), [users, currentUserId]);

  const handleSelect = (userId: string | null) => {
    onValueChange(userId);
    onOpenChange(false);
  };

  return (
    <UserPickerPopover
      open={open}
      onOpenChange={onOpenChange}
      align={align}
      disabled={disabled}
      className={className}
      title={selectedUser?.name ?? placeholder}
      trigger={<UserAvatar user={selectedUser} size={size} placeholder={placeholder} />}
      searchIsActive={searchIsActive}
      searchPlaceholder={searchPlaceholder}
      emptyMessage={emptyMessage}
    >
      {allowUnassigned && (
        <CommandItem value={placeholder} onSelect={() => handleSelect(null)}>
          <Check className={cn('mr-2 h-4 w-4 shrink-0', value === null ? 'opacity-100' : 'opacity-0')} />
          <span>{placeholder}</span>
        </CommandItem>
      )}
      {sortedUsers.map((user) => (
        <CommandItem key={user.id} value={getUserSearchValue(user)} onSelect={() => handleSelect(user.id)}>
          <Check className={cn('mr-2 h-4 w-4 shrink-0', value === user.id ? 'opacity-100' : 'opacity-0')} />
          <UserMenuAvatar user={user} />
          <UserMenuText user={user} displayName={user.id === currentUserId ? 'Me' : undefined} />
        </CommandItem>
      ))}
    </UserPickerPopover>
  );
}

function MultiUserPicker({
  users,
  value,
  onValueChange,
  placeholder,
  maxAvatarsShown,
  size,
  align,
  searchIsActive,
  searchPlaceholder,
  emptyMessage,
  currentUserId,
  disabled,
  className,
  open,
  onOpenChange,
}: {
  users: UserPickerUser[];
  value: string[];
  onValueChange: (userIds: string[]) => void;
  placeholder: string;
  maxAvatarsShown: number;
  size: AvatarSize;
  align: NonNullable<UserPickerBaseProps['align']>;
  searchIsActive: boolean;
  searchPlaceholder: string;
  emptyMessage: string;
  currentUserId?: string;
  disabled: boolean;
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const selectedUsers = useMemo(() => users.filter((user) => value.includes(user.id)), [users, value]);
  const sortedUsers = useMemo(() => moveCurrentUserFirst(users, currentUserId), [users, currentUserId]);

  const handleToggle = (userId: string) => {
    const next = value.includes(userId) ? value.filter((id) => id !== userId) : [...value, userId];
    onValueChange(next);
  };

  return (
    <UserPickerPopover
      open={open}
      onOpenChange={onOpenChange}
      align={align}
      disabled={disabled}
      className={className}
      title={selectedUsers.length > 0 ? selectedUsers.map((user) => user.name).join(', ') : placeholder}
      trigger={
        selectedUsers.length > 0 ? (
          <AvatarGroup size={size} max={maxAvatarsShown}>
            {selectedUsers.map((user) => (
              <UserAvatar key={user.id} user={user} size={size} placeholder={placeholder} />
            ))}
          </AvatarGroup>
        ) : (
          <UserAvatar user={undefined} size={size} placeholder={placeholder} />
        )
      }
      searchIsActive={searchIsActive}
      searchPlaceholder={searchPlaceholder}
      emptyMessage={emptyMessage}
    >
      {sortedUsers.map((user) => {
        const isSelected = value.includes(user.id);
        return (
          <CommandItem key={user.id} value={getUserSearchValue(user)} onSelect={() => handleToggle(user.id)}>
            <div
              className={cn(
                'mr-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-primary',
                isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible'
              )}
            >
              <Check className="h-3 w-3" />
            </div>
            <UserMenuAvatar user={user} />
            <UserMenuText user={user} displayName={user.id === currentUserId ? 'Me' : undefined} />
          </CommandItem>
        );
      })}
    </UserPickerPopover>
  );
}

function UserPickerPopover({
  open,
  onOpenChange,
  align,
  disabled,
  className,
  title,
  trigger,
  searchIsActive,
  searchPlaceholder,
  emptyMessage,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  align: NonNullable<UserPickerBaseProps['align']>;
  disabled: boolean;
  className?: string;
  title: string;
  trigger: ReactNode;
  searchIsActive: boolean;
  searchPlaceholder: string;
  emptyMessage: string;
  children: ReactNode;
}) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          data-slot="user-picker"
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          title={title}
          className={cn(
            'size-auto rounded-full p-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            !disabled &&
              'cursor-pointer hover:ring-2 hover:ring-ring/40 hover:ring-offset-2 hover:ring-offset-background',
            disabled && 'cursor-not-allowed opacity-50',
            className
          )}
          disabled={disabled}
          onClick={(event: MouseEvent<HTMLButtonElement>) => event.stopPropagation()}
        >
          {trigger}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-72 p-0"
        align={align}
        onWheel={(event: WheelEvent<HTMLDivElement>) => event.stopPropagation()}
        onTouchMove={(event: TouchEvent<HTMLDivElement>) => event.stopPropagation()}
      >
        <Command>
          {searchIsActive && <CommandInput placeholder={searchPlaceholder} />}
          <CommandList className="overscroll-contain">
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>{children}</CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function UserAvatar({
  user,
  size,
  placeholder,
}: {
  user: UserPickerUser | undefined;
  size: AvatarSize;
  placeholder: string;
}) {
  return (
    <Avatar size={size} title={user?.name ?? placeholder}>
      {user?.imageUrl && <AvatarImage src={user.imageUrl} alt={user.name} />}
      {user ? (
        <AvatarFallback>{user.name}</AvatarFallback>
      ) : (
        <AvatarFallback colorize={false} className="bg-muted text-muted-foreground">
          <UserCircle className={size === 'xs' ? 'h-3 w-3' : 'h-4 w-4'} />
        </AvatarFallback>
      )}
    </Avatar>
  );
}

function UserMenuAvatar({ user }: { user: UserPickerUser }) {
  return (
    <Avatar className="h-6 w-6">
      {user.imageUrl && <AvatarImage src={user.imageUrl} alt={user.name} />}
      <AvatarFallback>{user.name}</AvatarFallback>
    </Avatar>
  );
}

function UserMenuText({ user, displayName }: { user: UserPickerUser; displayName?: string }) {
  const showEmail = user.email && user.email !== user.name;

  return (
    <div className="flex min-w-0 flex-col">
      <span className="truncate">{displayName ?? user.name}</span>
      {showEmail && <span className="truncate text-xs text-muted-foreground">{user.email}</span>}
    </div>
  );
}

function moveCurrentUserFirst(users: UserPickerUser[], currentUserId: string | undefined) {
  if (!currentUserId) {
    return users;
  }

  const currentUser = users.find((user) => user.id === currentUserId);

  if (!currentUser) {
    return users;
  }

  return [currentUser, ...users.filter((user) => user.id !== currentUserId)];
}

function getUserSearchValue(user: UserPickerUser) {
  return `${user.name} ${user.email ?? ''}`.trim();
}

export { UserPicker };
